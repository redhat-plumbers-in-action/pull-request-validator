import { CustomOctokit } from './octokit';
import { CheckRuns, PullRequestApi, Status } from './schema/pull-request';
import { IgnoreChecks } from './schema/config';
import { PullRequestReviews } from './reviews/pull-request-reviews';
export declare class PullRequest {
    readonly number: number;
    readonly ref: string;
    readonly owner: string;
    readonly repo: string;
    readonly octokit: CustomOctokit;
    currentLabels: string[];
    reviews: PullRequestReviews;
    constructor(number: number, ref: string, owner: string, repo: string, octokit: CustomOctokit);
    getPullRequest(): Promise<PullRequestApi>;
    getLabels(): Promise<void>;
    isCIGreen(ignoredChecks: IgnoreChecks): Promise<{
        result: boolean;
        message: string;
    }>;
    getCheckRuns(): Promise<CheckRuns>;
    getStatus(): Promise<Status>;
    isSuccess(results: CheckRuns): boolean;
    isFailedOrPending(results: CheckRuns): {
        failed: string[];
        pending: string[];
    };
    isFailedOrPendingStatuses(results: Status['statuses']): {
        error: string[];
        failed: string[];
        pending: string[];
    };
}
