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
  test.todo('memberReviews()');

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
