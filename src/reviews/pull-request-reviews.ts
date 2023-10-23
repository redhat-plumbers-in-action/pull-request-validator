import { debug, notice } from '@actions/core';
import { Endpoints } from '@octokit/types';

import { CustomOctokit } from '../octokit';

import {
  ReviewRequests,
  Reviews,
  reviewRequestsSchema,
  reviewsSchema,
} from '../schema/pull-request';

export class PullRequestReviews {
  reviews = new Map<string, Reviews[number]>();
  reviewRequests: ReviewRequests = [];

  constructor(
    readonly number: number,
    readonly ref: string,
    readonly owner: string,
    readonly repo: string,
    readonly octokit: CustomOctokit
  ) {}

  //? This have to be run right after the constructor!
  async initialize(mock?: {
    reviews: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data'];
    reviewRequests: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['response']['data'];
  }) {
    await this.getReviews(mock && mock.reviews);
    await this.getReviewRequests(mock && mock.reviewRequests);
  }

  async getReviews(
    mock?: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data']
  ) {
    const data =
      mock ||
      (await this.octokit.paginate(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
        {
          owner: this.owner,
          repo: this.repo,
          pull_number: this.number,
          per_page: 100,
        }
      ));

    const reviews = reviewsSchema.parse(data);
    // We only care about the latest reviews from members
    this.reviews = this.memberReviews(reviews);
  }

  async getReviewRequests(
    mock?: Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['response']['data']
  ) {
    const data =
      mock ||
      (
        await this.octokit.request(
          'GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
          {
            owner: this.owner,
            repo: this.repo,
            pull_number: this.number,
          }
        )
      )['data'];

    this.reviewRequests = reviewRequestsSchema.parse(data.users);
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

  isReviewed(): boolean {
    // When new review is requested, the review is removed from the reviews list
    const members = this.reviews.keys();
    for (const member of members) {
      if (this.reviewRequests.includes(member)) {
        this.reviews.delete(member);
        notice(`🔬 New review requested from '${member}'`);
      }
    }

    this.reviews.forEach((review, login) => {
      if (review.state === 'DISMISSED') {
        notice(`❓ Review from '${login}' was dismissed`);
        this.reviews.delete(login);
      }
    });

    if (this.reviews.size > 0) {
      debug('Member has reviewed the PR');
      return true;
    }

    debug('Member has not reviewed the PR');
    return false;
  }

  isApproved(): boolean {
    let approved = false;

    this.reviews.forEach((review, login) => {
      if (review.state === 'APPROVED') {
        notice(`🕵️ Member '${login}' has approved the PR`);
        approved = true;
      }
    });

    return approved;
  }
}
