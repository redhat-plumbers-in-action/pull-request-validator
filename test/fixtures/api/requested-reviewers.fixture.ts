import { Endpoints } from '@octokit/types';

export const requestedReviewersAPIResponseNobody: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['response']['data'] =
  {
    users: [],
    teams: [],
  };
