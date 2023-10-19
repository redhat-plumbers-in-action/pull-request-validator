import { debug, notice } from '@actions/core';
import { z } from 'zod';

import { CustomOctokit } from './octokit';

import {
  CheckRuns,
  PullRequestApi,
  Reviews,
  Status,
  checkRunsSchema,
  pullRequestApiSchema,
  reviewsSchema,
  statusSchema,
} from './schema/pull-request';
import { IgnoreChecks } from './schema/config';

export class PullRequest {
  currentLabels: string[] = [];

  constructor(
    readonly number: number,
    readonly ref: string,
    readonly owner: string,
    readonly repo: string,
    readonly octokit: CustomOctokit
  ) {}

  async getPullRequest(): Promise<PullRequestApi> {
    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        owner: this.owner,
        repo: this.repo,
        pull_number: this.number,
      }
    );

    return pullRequestApiSchema.parse(data);
  }

  async getLabels(): Promise<void> {
    this.currentLabels = z
      .array(z.object({ name: z.string() }).transform(label => label.name))
      .parse(
        (
          await this.octokit.request(
            'GET /repos/{owner}/{repo}/issues/{issue_number}/labels',
            {
              owner: this.owner,
              repo: this.repo,
              issue_number: this.number,
            }
          )
        ).data
      );
  }

  async isCIGreen(
    ignoredChecks: IgnoreChecks
  ): Promise<{ result: boolean; message: string }> {
    let checkRuns = await this.getCheckRuns();
    const status = await this.getStatus();
    let checkRunsSuccess = false;
    let statusSuccess = false;
    let message = '';

    checkRuns = checkRuns.filter(check => !ignoredChecks.includes(check.name));

    debug(`Checking CI status for ${checkRuns.length} check runs`);
    if (this.isSuccess(checkRuns)) {
      debug(`All check runs finished successfully`);
      checkRunsSuccess = true;
    } else {
      checkRunsSuccess = false;
      const failedChecks = this.isFailedOrPending(checkRuns);
      message += `Failed or pending checks - ${failedChecks.failed.concat(
        failedChecks.pending
      )}`;
    }

    debug(`Checking CI status for ${status.total_count} statuses`);
    if (status.state === 'success') {
      debug(`All Statuses finished successfully`);
      statusSuccess = true;
    } else if (status.total_count === 0) {
      debug(`No Statuses found`);
      statusSuccess = true;
    } else {
      statusSuccess = false;
      const failedStatuses = this.isFailedOrPendingStatuses(status.statuses);
      message.length > 0 && (message += '\t');
      message += `Failed or pending statuses - ${failedStatuses.failed.concat(
        failedStatuses.pending
      )}`;
    }

    return { result: checkRunsSuccess && statusSuccess, message };
  }

  async getCheckRuns(): Promise<CheckRuns> {
    const data = await this.octokit.paginate(
      'GET /repos/{owner}/{repo}/commits/{ref}/check-runs',
      {
        owner: this.owner,
        repo: this.repo,
        ref: this.ref,
        per_page: 100,
      }
    );

    return checkRunsSchema.parse(data);
  }

  //! NOTICE: This works only for commits with less than 100 statuses
  //! When using pagination from octokit, we lose access to the total_count and overall state
  async getStatus(): Promise<Status> {
    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/commits/{ref}/status',
      {
        owner: this.owner,
        repo: this.repo,
        ref: this.ref,
        per_page: 100,
      }
    );

    return statusSchema.parse(data);
  }

  isSuccess(results: CheckRuns): boolean {
    return results.every(
      item => item.conclusion === 'success' && item.status === 'completed'
    );
  }

  isFailedOrPending(results: CheckRuns): {
    failed: string[];
    pending: string[];
  } {
    const failed = results
      .filter(
        item => item.conclusion !== 'success' && item.status === 'completed'
      )
      .map(item => `\`${item.name}[${item.conclusion}]\``);
    const pending = results
      .filter(item => item.status !== 'completed')
      .map(item => `\`${item.name}[${item.status}]\``);

    return { failed, pending };
  }

  isFailedOrPendingStatuses(results: Status['statuses']): {
    failed: string[];
    pending: string[];
  } {
    const failed = results
      .filter(item => item.state === 'failure')
      .map(item => `\`${item.context}[${item.state}]\``);
    const pending = results
      .filter(item => item.state === 'pending')
      .map(item => `\`${item.context}[${item.state}]\``);

    return { failed, pending };
  }

  async getReviews(): Promise<Reviews> {
    const data = await this.octokit.paginate(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
      {
        owner: this.owner,
        repo: this.repo,
        pull_number: this.number,
        per_page: 100,
      }
    );

    return reviewsSchema.parse(data);
  }

  isReviewed(reviews: Reviews): boolean {
    if (this.isMemberReviewed(reviews)) {
      debug('Member has reviewed the PR');
      return true;
    }

    debug('Member has not reviewed the PR');
    return false;
  }

  // PR is considered as reviewed if a member has requested changes or approved it
  isMemberReviewed(reviews: Reviews): boolean {
    const memberReviews = this.memberReviews(reviews);

    return memberReviews.size > 0;
  }

  // Return a map of the latest review for each member
  // For all members is required visibility to public otherwise the author_association is not available
  memberReviews(reviews: Reviews): Map<string, Reviews[number]> {
    const memberReviews = reviews.filter(
      review =>
        review.state !== 'COMMENTED' &&
        (review.author_association === 'MEMBER' ||
          review.author_association === 'OWNER' ||
          review.author_association === 'COLLABORATOR')
    );

    let latestMemberReviews: Map<string, Reviews[number]> = new Map();
    for (let review of memberReviews) {
      let prev = latestMemberReviews.get(review.user.login);
      if (prev && prev.id > review.id) {
        continue;
      }

      latestMemberReviews.set(review.user.login, review);
    }

    return latestMemberReviews;
  }

  isApproved(reviews: Reviews): boolean {
    if (this.isMemberApproved(reviews)) {
      debug('Member has approved the PR');
      return true;
    }

    debug('Member has not approved the PR');
    return false;
  }

  isMemberApproved(reviews: Reviews): boolean {
    const memberReviews = this.memberReviews(reviews);
    let approved = false;

    memberReviews.forEach((review, login) => {
      if (review.state === 'APPROVED') {
        notice(`🕵️ Member '${login}' has approved the PR`);
        approved = true;
      }
    });

    return approved;
  }
}
