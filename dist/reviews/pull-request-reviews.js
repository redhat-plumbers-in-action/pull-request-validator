import { debug, notice } from '@actions/core';
import { reviewRequestsSchema, reviewsSchema, } from '../schema/pull-request';
export class PullRequestReviews {
    constructor(number, ref, owner, repo, octokit) {
        this.number = number;
        this.ref = ref;
        this.owner = owner;
        this.repo = repo;
        this.octokit = octokit;
        this.reviews = new Map();
        this.reviewRequests = [];
    }
    //? This have to be run right after the constructor!
    async initialize(mock) {
        await this.getReviews(mock && mock.reviews);
        await this.getReviewRequests(mock && mock.reviewRequests);
    }
    async getReviews(mock) {
        const data = mock ||
            (await this.octokit.paginate('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
                owner: this.owner,
                repo: this.repo,
                pull_number: this.number,
                per_page: 100,
            }));
        const reviews = reviewsSchema.parse(data);
        // We only care about the latest reviews from members
        this.reviews = this.memberReviews(reviews);
    }
    async getReviewRequests(mock) {
        const data = mock ||
            (await this.octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers', {
                owner: this.owner,
                repo: this.repo,
                pull_number: this.number,
            }))['data'];
        this.reviewRequests = reviewRequestsSchema.parse(data.users);
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
    isReviewed() {
        if (this.reviews.size > 0) {
            debug('Member has reviewed the PR');
            return true;
        }
        debug('Member has not reviewed the PR');
        return false;
    }
    isApproved() {
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
//# sourceMappingURL=pull-request-reviews.js.map