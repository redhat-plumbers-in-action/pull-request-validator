import { getOctokit } from '../../src/octokit';
import { PullRequestReviews } from '../../src/reviews/pull-request-reviews';

export interface PullRequestReviewsTestContext {
  pullRequestsReviews: PullRequestReviews;
}

export const pullRequestReviewsContextFixture: PullRequestReviewsTestContext = {
  pullRequestsReviews: new PullRequestReviews(
    1,
    'bfecee1edf7970c1d7704a7cef2523e3917f908e',
    'redhat-plumbers-in-action',
    'pull-request-validator',
    getOctokit('token')
  ),
};
