import { beforeEach, describe, expect, it, test } from 'vitest';

import {
  PullRequestTestContext,
  pullRequestContextFixture,
} from '../fixtures/pull-request.fixture';
import {
  reviewsAPIResponseApproved1,
  reviewsAPIResponseApproved2,
  reviewsAPIResponseReviewed,
  reviewsAPIResponseRequestedChanges,
  reviewsAPIResponseApprovedWithRequestedChanges,
  reviewsAPIResponseNoReview,
  reviewsAPIResponseApprovedByNonMember,
} from '../fixtures/api/reviews.fixture';
import {
  statusAPIResponseFailed,
  statusAPIResponseFailedAndPending,
  statusAPIResponseSuccess,
} from '../fixtures/api/status.fixture';
import {
  checkRunsAPIResponseFailed,
  checkRunsAPIResponseSuccess,
} from '../fixtures/api/check-runs.fixture';

describe('Pull Request Object', () => {
  beforeEach<PullRequestTestContext>(context => {
    context.pullRequests = pullRequestContextFixture.pullRequests;
  });

  it<PullRequestTestContext>('can be instantiated', context =>
    expect(context.pullRequests).toBeDefined());

  test.todo('isCIGreen()');
  test<PullRequestTestContext>('isSuccess()', context => {
    let success = context.pullRequests.isSuccess(
      checkRunsAPIResponseSuccess.check_runs
    );
    expect(success).toEqual(true);

    success = context.pullRequests.isSuccess(
      checkRunsAPIResponseFailed.check_runs
    );
    expect(success).toEqual(false);
  });

  test<PullRequestTestContext>('isFailedOrPending()', context => {
    let { failed, pending } = context.pullRequests.isFailedOrPending(
      checkRunsAPIResponseSuccess.check_runs
    );
    expect(failed).toEqual([]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests.isFailedOrPending(
      checkRunsAPIResponseFailed.check_runs
    ));
    expect(failed).toEqual([
      '`Pull Request Validator[failure]`',
      '`Tracker Validator[failure]`',
      '`Tracker Validation[failure]`',
    ]);
    expect(pending).toEqual([]);
  });

  test<PullRequestTestContext>('isFailedOrPendingStatuses()', context => {
    let { failed, pending } = context.pullRequests.isFailedOrPendingStatuses(
      statusAPIResponseSuccess.statuses
    );
    expect(failed).toEqual([]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests.isFailedOrPendingStatuses(
      statusAPIResponseFailed.statuses
    ));
    expect(failed).toEqual([
      '`CentOS CI (CentOS Stream 9 + sanitizers)[failure]`',
      '`CentOS CI (CentOS Stream 9)[failure]`',
    ]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests.isFailedOrPendingStatuses(
      statusAPIResponseFailedAndPending.statuses
    ));
    expect(failed).toEqual(['`CentOS CI (CentOS Stream 9)[failure]`']);
    expect(pending).toEqual([
      '`CentOS CI (CentOS Stream 9 + sanitizers)[pending]`',
    ]);
  });

  test<PullRequestTestContext>('isReviewed()', context => {
    let reviewed = context.pullRequests.isReviewed(reviewsAPIResponseApproved1);
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests.isReviewed(reviewsAPIResponseApproved2);
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests.isReviewed(reviewsAPIResponseReviewed);
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests.isReviewed(reviewsAPIResponseNoReview);
    expect(reviewed).toEqual(false);

    reviewed = context.pullRequests.isReviewed(
      reviewsAPIResponseRequestedChanges
    );
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests.isReviewed(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests.isReviewed(
      reviewsAPIResponseApprovedByNonMember
    );
    expect(reviewed).toEqual(true);
  });

  test.todo('isMemberReviewed()');

  test<PullRequestTestContext>('memberReviews()', context => {
    let reviews = context.pullRequests.memberReviews(
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

    reviews = context.pullRequests.memberReviews(reviewsAPIResponseApproved2);
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

    reviews = context.pullRequests.memberReviews(reviewsAPIResponseReviewed);
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

    reviews = context.pullRequests.memberReviews(reviewsAPIResponseNoReview);
    expect(reviews).toMatchInlineSnapshot('Map {}');

    reviews = context.pullRequests.memberReviews(
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

    reviews = context.pullRequests.memberReviews(
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

    reviews = context.pullRequests.memberReviews(
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

  test<PullRequestTestContext>('isApproved()', context => {
    let approved = context.pullRequests.isApproved(reviewsAPIResponseApproved1);
    expect(approved).toEqual(true);

    approved = context.pullRequests.isApproved(reviewsAPIResponseApproved2);
    expect(approved).toEqual(true);

    approved = context.pullRequests.isApproved(reviewsAPIResponseReviewed);
    expect(approved).toEqual(false);

    approved = context.pullRequests.isApproved(reviewsAPIResponseNoReview);
    expect(approved).toEqual(false);

    approved = context.pullRequests.isApproved(
      reviewsAPIResponseRequestedChanges
    );
    expect(approved).toEqual(false);

    approved = context.pullRequests.isApproved(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(approved).toEqual(true);

    approved = context.pullRequests.isApproved(
      reviewsAPIResponseApprovedByNonMember
    );
    expect(approved).toEqual(false);
  });

  test<PullRequestTestContext>('isMemberApproved()', context => {
    let approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseApproved1
    );
    expect(approved).toEqual(true);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseApproved2
    );
    expect(approved).toEqual(true);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseReviewed
    );
    expect(approved).toEqual(false);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseNoReview
    );
    expect(approved).toEqual(false);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseRequestedChanges
    );
    expect(approved).toEqual(false);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(approved).toEqual(true);

    approved = context.pullRequests.isMemberApproved(
      reviewsAPIResponseApprovedByNonMember
    );
    expect(approved).toEqual(false);
  });
});
