import { debug, notice } from '@actions/core';
import { z } from 'zod';
import { checkRunsSchema, pullRequestApiSchema, reviewsSchema, statusSchema, } from './schema/pull-request';
export class PullRequest {
    constructor(number, ref, owner, repo, octokit) {
        this.number = number;
        this.ref = ref;
        this.owner = owner;
        this.repo = repo;
        this.octokit = octokit;
        this.currentLabels = [];
    }
    async getPullRequest() {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
            owner: this.owner,
            repo: this.repo,
            pull_number: this.number,
        });
        return pullRequestApiSchema.parse(data);
    }
    async getLabels() {
        this.currentLabels = z
            .array(z.object({ name: z.string() }).transform(label => label.name))
            .parse((await this.octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/labels', {
            owner: this.owner,
            repo: this.repo,
            issue_number: this.number,
        })).data);
    }
    async isCIGreen(ignoredChecks) {
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
        }
        else {
            checkRunsSuccess = false;
            const failedChecks = this.isFailedOrPending(checkRuns);
            message += `Failed or pending checks - ${failedChecks.failed.concat(failedChecks.pending)}`;
        }
        debug(`Checking CI status for ${status.total_count} statuses`);
        if (status.state === 'success') {
            debug(`All Statuses finished successfully`);
            statusSuccess = true;
        }
        else if (status.total_count === 0) {
            debug(`No Statuses found`);
            statusSuccess = true;
        }
        else {
            statusSuccess = false;
            const failedStatuses = this.isFailedOrPendingStatuses(status.statuses);
            message.length > 0 && (message += '\t');
            message += `Failed or pending statuses - ${failedStatuses.failed.concat(failedStatuses.pending)}`;
        }
        return { result: checkRunsSuccess && statusSuccess, message };
    }
    async getCheckRuns() {
        const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
            per_page: 100,
        });
        return checkRunsSchema.parse(data);
    }
    //! NOTICE: This works only for commits with less than 100 statuses
    //! When using pagination from octokit, we lose access to the total_count and overall state
    async getStatus() {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/status', {
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
            per_page: 100,
        });
        return statusSchema.parse(data);
    }
    isSuccess(results) {
        return results.every(item => item.conclusion === 'success' && item.status === 'completed');
    }
    isFailedOrPending(results) {
        const failed = results
            .filter(item => item.conclusion !== 'success' && item.status === 'completed')
            .map(item => `\`${item.name}[${item.conclusion}]\``);
        const pending = results
            .filter(item => item.status !== 'completed')
            .map(item => `\`${item.name}[${item.status}]\``);
        return { failed, pending };
    }
    isFailedOrPendingStatuses(results) {
        const failed = results
            .filter(item => item.state === 'failure')
            .map(item => `\`${item.context}[${item.state}]\``);
        const pending = results
            .filter(item => item.state === 'pending')
            .map(item => `\`${item.context}[${item.state}]\``);
        return { failed, pending };
    }
    async getReviews() {
        const data = await this.octokit.paginate('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
            owner: this.owner,
            repo: this.repo,
            pull_number: this.number,
            per_page: 100,
        });
        return reviewsSchema.parse(data);
    }
    isReviewed(reviews) {
        if (this.isMemberReviewed(reviews)) {
            debug('Member has reviewed the PR');
            return true;
        }
        debug('Member has not reviewed the PR');
        return false;
    }
    // PR is considered as reviewed if a member has requested changes or approved it
    isMemberReviewed(reviews) {
        const memberReviews = this.memberReviews(reviews);
        return memberReviews.size > 0;
    }
    // Return a map of the latest review for each member
    // For all members is required visibility to public otherwise the author_association is not available
    memberReviews(reviews) {
        const memberReviews = reviews.filter(review => review.state !== 'COMMENTED' &&
            (review.author_association === 'MEMBER' ||
                review.author_association === 'OWNER' ||
                review.author_association === 'COLLABORATOR'));
        let latestMemberReviews = new Map();
        for (let review of memberReviews) {
            let prev = latestMemberReviews.get(review.user.login);
            if (prev && prev.id > review.id) {
                continue;
            }
            latestMemberReviews.set(review.user.login, review);
        }
        return latestMemberReviews;
    }
    isApproved(reviews) {
        if (this.isMemberApproved(reviews)) {
            debug('Member has approved the PR');
            return true;
        }
        debug('Member has not approved the PR');
        return false;
    }
    isMemberApproved(reviews) {
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
//# sourceMappingURL=pull-request.js.map