import { CustomOctokit } from './octokit';
import { CheckRuns, CheckSuites, PullRequestApi, Reviews } from './schema/pull-request';
import { IgnoreChecks } from './schema/config';
export declare class PullRequest {
    readonly number: number;
    readonly ref: string;
    readonly owner: string;
    readonly repo: string;
    readonly octokit: CustomOctokit;
    currentLabels: string[];
    constructor(number: number, ref: string, owner: string, repo: string, octokit: CustomOctokit);
    getPullRequest(): Promise<PullRequestApi>;
    getLabels(): Promise<void>;
    isCIGreen(ignoredChecks: IgnoreChecks): Promise<{
        result: boolean;
        message: string;
    }>;
    getCheckRuns(): Promise<CheckRuns>;
    getCheckSuites(): Promise<CheckSuites>;
    isSuccess(results: CheckRuns['check_runs'] | CheckSuites['check_suites']): boolean;
    isFailedOrMissing(results: CheckRuns['check_runs']): {
        failed: string[];
        missing: string[];
    };
    getReviews(): Promise<Reviews>;
    isReviewed(reviews: Reviews): boolean;
    isMemberReviewed(reviews: Reviews): boolean;
    memberReviews(reviews: Reviews): Map<string, Reviews[number]>;
    isApproved(reviews: Reviews): boolean;
    isMemberApproved(reviews: Reviews): boolean;
}
