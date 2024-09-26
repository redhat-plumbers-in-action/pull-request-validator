import { Endpoints } from '@octokit/types';
import { CustomOctokit } from '../octokit';
import { ReviewRequests, Reviews } from '../schema/pull-request';
export declare class PullRequestReviews {
    readonly number: number;
    readonly ref: string;
    readonly owner: string;
    readonly repo: string;
    readonly octokit: CustomOctokit;
    reviews: Map<string, {
        id: number;
        state: string;
        body: string;
        author_association: string;
        user: {
            type: string;
            login: string;
        };
        submitted_at: string;
    }>;
    reviewRequests: ReviewRequests;
    constructor(number: number, ref: string, owner: string, repo: string, octokit: CustomOctokit);
    initialize(mock?: {
        reviews: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data'];
        reviewRequests: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['response']['data'];
    }): Promise<void>;
    getReviews(mock?: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data']): Promise<void>;
    getReviewRequests(mock?: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['response']['data']): Promise<void>;
    memberReviews(reviews: Reviews): Map<string, Reviews[number]>;
    isReviewed(requiredReviews: number): boolean;
    isApproved(): boolean;
}
