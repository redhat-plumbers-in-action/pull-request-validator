import { debug } from '@actions/core';
import { z } from 'zod';

import { CustomOctokit } from './octokit';

import {
  CheckRuns,
  PullRequestApi,
  Status,
  checkRunsSchema,
  pullRequestApiSchema,
  statusSchema,
} from './schema/pull-request';
import { IgnoreChecks } from './schema/config';
import { PullRequestReviews } from './reviews/pull-request-reviews';

export class PullRequest {
  currentLabels: string[] = [];
  reviews: PullRequestReviews;

  constructor(
    readonly number: number,
    readonly ref: string,
    readonly owner: string,
    readonly repo: string,
    readonly octokit: CustomOctokit
  ) {
    this.reviews = new PullRequestReviews(number, ref, owner, repo, octokit);
  }

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
      message += `Failed or pending statuses - ${failedStatuses.error.concat(
        failedStatuses.failed,
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
    error: string[];
    failed: string[];
    pending: string[];
  } {
    const error = results
      .filter(item => item.state === 'error')
      .map(item => `\`${item.context}[${item.state}]\``);
    const failed = results
      .filter(item => item.state === 'failure')
      .map(item => `\`${item.context}[${item.state}]\``);
    const pending = results
      .filter(item => item.state === 'pending')
      .map(item => `\`${item.context}[${item.state}]\``);

    return { error, failed, pending };
  }
}
