import { beforeEach, describe, expect, it, test } from 'vitest';

import {
  PullRequestReviewsTestContext,
  pullRequestReviewsContextFixture,
} from '../fixtures/pull-request-reviews.fixture';
import {
  reviewsAPIResponseApproved1,
  reviewsAPIResponseApproved2,
  reviewsAPIResponseReviewed,
  reviewsAPIResponseRequestedChanges,
  reviewsAPIResponseApprovedWithRequestedChanges,
  reviewsAPIResponseNoReview,
  reviewsAPIResponseApprovedByNonMember,
  reviewsAPIResponseApproved1Raw,
  reviewsAPIResponseApproved2Raw,
  reviewsAPIResponseReviewedRaw,
  reviewsAPIResponseNoReviewRaw,
  reviewsAPIResponseRequestedChangesRaw,
  reviewsAPIResponseApprovedWithRequestedChangesRaw,
  reviewsAPIResponseApprovedByNonMemberRaw,
} from '../fixtures/api/reviews.fixture';
import { requestedReviewersAPIResponseNobody } from '../fixtures/api/requested-reviewers.fixture';

describe('Pull Request Reviews Object', () => {
  beforeEach<PullRequestReviewsTestContext>(context => {
    context.pullRequestsReviews =
      pullRequestReviewsContextFixture.pullRequestsReviews;
  });

  it<PullRequestReviewsTestContext>('can be instantiated', context =>
    expect(context.pullRequestsReviews).toBeDefined());

  test<PullRequestReviewsTestContext>('isReviewed()', context => {
    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApproved1Raw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApproved2Raw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseReviewedRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(false);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseNoReviewRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(false);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseRequestedChangesRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApprovedWithRequestedChangesRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApprovedByNonMemberRaw as any,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isReviewed()).toEqual(true);
  });

  test<PullRequestReviewsTestContext>('memberReviews()', context => {
    let reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseApproved1
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "bluca" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 1040025539,
          "state": "APPROVED",
          "submitted_at": "2022-07-15T09:13:56Z",
          "user": {
            "login": "bluca",
            "type": "User",
          },
        },
        "poettering" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 1040441004,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2022-07-15T15:31:39Z",
          "user": {
            "login": "poettering",
            "type": "User",
          },
        },
        "yuwata" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 1043777861,
          "state": "APPROVED",
          "submitted_at": "2022-07-19T16:43:51Z",
          "user": {
            "login": "yuwata",
            "type": "User",
          },
        },
      }
    `);

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseApproved2
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "yuwata" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 1590802650,
          "state": "APPROVED",
          "submitted_at": "2023-08-23T05:55:00Z",
          "user": {
            "login": "yuwata",
            "type": "User",
          },
        },
      }
    `);

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseReviewed
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "evverx" => {
          "author_association": "MEMBER",
          "body": "@yuwata first of all, thank you very much for asking a question whether \`test-execute\` passed or not in https://github.com/systemd/systemd/issues/9700#issuecomment-418128016. If you hadn't, we apparently would have kept waiting for the next release to discover the regression. I kind of weighed the pros and cons of changing the tests and I'm afraid I have to say that it's not worth it at least until the test suite is run regularly. Not to worry, of course. It's just my opinion and others may disagree with me, which is totally fine :-) Just my 2 cents.",
          "id": 153289240,
          "state": "DISMISSED",
          "submitted_at": "2018-09-07T10:34:33Z",
          "user": {
            "login": "evverx",
            "type": "User",
          },
        },
      }
    `);

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseNoReview
    );
    expect(reviews).toMatchInlineSnapshot('Map {}');

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseRequestedChanges
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "poettering" => {
          "author_association": "MEMBER",
          "body": "some comments. I'll leave the final review to @yuwata",
          "id": 613745872,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2021-03-16T21:43:53Z",
          "user": {
            "login": "poettering",
            "type": "User",
          },
        },
        "yuwata" => {
          "author_association": "MEMBER",
          "body": "Now, looks good for me. But several minor coding style issues. Also, please rebase.

      And sorry for late review.",
          "id": 664366138,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2021-05-20T13:29:52Z",
          "user": {
            "login": "yuwata",
            "type": "User",
          },
        },
      }
    `);

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "poettering" => {
          "author_association": "MEMBER",
          "body": "looks good, but of course i have no expertise in wireguard. also no idea how gennl works...

      @ssahani could you also please have a look?",
          "id": 82796235,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2017-12-12T11:59:05Z",
          "user": {
            "login": "poettering",
            "type": "User",
          },
        },
        "keszybz" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 87500013,
          "state": "APPROVED",
          "submitted_at": "2018-01-09T12:26:55Z",
          "user": {
            "login": "keszybz",
            "type": "User",
          },
        },
      }
    `);

    reviews = context.pullRequestsReviews.memberReviews(
      reviewsAPIResponseApprovedByNonMember
    );
    expect(reviews).toMatchInlineSnapshot(`
      Map {
        "poettering" => {
          "author_association": "MEMBER",
          "body": "",
          "id": 1040441004,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2022-07-15T15:31:39Z",
          "user": {
            "login": "poettering",
            "type": "User",
          },
        },
        "yuwata" => {
          "author_association": "MEMBER",
          "body": "@poettering's comments are not addressed. Several additional comments.",
          "id": 1040959840,
          "state": "CHANGES_REQUESTED",
          "submitted_at": "2022-07-16T06:51:56Z",
          "user": {
            "login": "yuwata",
            "type": "User",
          },
        },
      }
    `);
  });

  test<PullRequestReviewsTestContext>('isApproved()', context => {
    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApproved1Raw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApproved2Raw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseReviewedRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(false);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseNoReviewRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(false);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseRequestedChangesRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(false);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApprovedWithRequestedChangesRaw,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(true);

    context.pullRequestsReviews.initialize({
      reviews: reviewsAPIResponseApprovedByNonMemberRaw as any,
      reviewRequests: requestedReviewersAPIResponseNobody,
    });
    expect(context.pullRequestsReviews.isApproved()).toEqual(false);
  });
});
