import { getOctokit } from '../../src/octokit';
import { PullRequest } from '../../src/pull-request';

export interface PullRequestTestContext {
  pullRequests: PullRequest;
}

export const pullRequestContextFixture: PullRequestTestContext = {
  pullRequests: new PullRequest(
    1,
    'bfecee1edf7970c1d7704a7cef2523e3917f908e',
    'redhat-plumbers-in-action',
    'pull-request-validator',
    getOctokit('token')
  ),
};
