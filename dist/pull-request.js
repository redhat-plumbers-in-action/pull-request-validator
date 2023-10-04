import { debug, notice } from '@actions/core';
import { z } from 'zod';
import { checkRunsSchema, checkSuitesSchema, pullRequestApiSchema, reviewsSchema, } from './schema/pull-request';
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
        const checkRuns = await this.getCheckRuns();
        const checkSuites = await this.getCheckSuites();
        let checkRunsSuccess = false;
        let checkSuitesSuccess = false;
        let message = '';
        checkRuns.check_runs = checkRuns.check_runs.filter(check => !ignoredChecks.includes(check.name));
        notice(`🔍 Checking CI status for ${checkRuns.total_count} check runs`);
        if (this.isSuccess(checkRuns.check_runs)) {
            debug(`🔍 Check runs status is success`);
            checkRunsSuccess = true;
        }
        else {
            checkRunsSuccess = false;
            const failedChecks = this.isFailedOrMissing(checkRuns.check_runs);
            message = `Failed or missing checks - ${failedChecks.failed.concat(failedChecks.missing)}`;
        }
        // notice(`🔍 Checking CI status for ${checkSuites.total_count} check suites`);
        // if (this.isSuccess(checkSuites.check_suites)) {
        //   debug(`🔍 Check suites status is success`);
        //   checkSuitesSuccess = true;
        // } else {
        //   debug(`🔍 Check suites status is failed`);
        //   checkSuitesSuccess = false;
        // }
        return { result: checkRunsSuccess /* && checkSuitesSuccess */, message };
    }
    // Check runs are always associated with the latest commit in the PR
    // !FIXME: This works only for PRs with less than 100 check runs
    async getCheckRuns() {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
            per_page: 100,
        });
        return checkRunsSchema.parse(data);
    }
    // Check suites are always associated with the entire PR
    // !FIXME: This works only for PRs with less than 100 check suites
    async getCheckSuites() {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-suites', {
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
            per_page: 100,
        });
        return checkSuitesSchema.parse(data);
    }
    isSuccess(results) {
        return results.every(item => item.conclusion === 'success' && item.status === 'completed');
    }
    isFailedOrMissing(results) {
        const failed = results
            .filter(item => item.conclusion !== 'success' && item.status === 'completed')
            .map(item => `\`${item.name}[${item.conclusion}]\``);
        const missing = results
            .filter(item => item.status !== 'completed')
            .map(item => `\`${item.name}[${item.status}]\``);
        return { failed, missing };
    }
    async getReviews() {
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
            owner: this.owner,
            repo: this.repo,
            pull_number: this.number,
            per_page: 100,
        });
        return reviewsSchema.parse(data);
    }
    isReviewed(reviews) {
        if (this.isMemberReviewed(reviews)) {
            notice(`🔍 Member has reviewed the PR`);
            return true;
        }
        debug(`🔍 Member has not reviewed the PR`);
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
            notice(`🔍 Member has approved the PR`);
            return true;
        }
        notice(`🔍 Member has not approved the PR`);
        return false;
    }
    isMemberApproved(reviews) {
        const memberReviews = this.memberReviews(reviews);
        let approved = false;
        memberReviews.forEach((review, login) => {
            if (review.state === 'APPROVED') {
                notice(`🔍 Member ${login} has approved the PR`);
                approved = true;
            }
        });
        return approved;
    }
}
//# sourceMappingURL=pull-request.js.map