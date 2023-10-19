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
} from '../fixtures/api/reviews.fixture';
import {
  statusAPIResponseFailed,
  statusAPIResponseFailedAndPending,
  statusAPIResponseSuccess,
} from '../fixtures/api/status.fixture';

describe('Pull Request Object', () => {
  beforeEach<PullRequestTestContext>(context => {
    context.pullRequests = pullRequestContextFixture.pullRequests;
  });

  it<PullRequestTestContext>('can be instantiated', context =>
    context.pullRequests.map(prItem => expect(prItem).toBeDefined()));

  test.todo('isCIGreen()');
  test.todo('isSuccess()');
  test.todo('isFailedOrPending()');

  test<PullRequestTestContext>('isFailedOrPendingStatuses()', context => {
    let { failed, pending } = context.pullRequests[0].isFailedOrPendingStatuses(
      statusAPIResponseSuccess.statuses
    );
    expect(failed).toEqual([]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests[0].isFailedOrPendingStatuses(
      statusAPIResponseFailed.statuses
    ));
    expect(failed).toEqual([
      '`CentOS CI (CentOS Stream 9 + sanitizers)[failure]`',
      '`CentOS CI (CentOS Stream 9)[failure]`',
    ]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests[0].isFailedOrPendingStatuses(
      statusAPIResponseFailedAndPending.statuses
    ));
    expect(failed).toEqual(['`CentOS CI (CentOS Stream 9)[failure]`']);
    expect(pending).toEqual([
      '`CentOS CI (CentOS Stream 9 + sanitizers)[pending]`',
    ]);
  });

  test<PullRequestTestContext>('isReviewed()', context => {
    let reviewed = context.pullRequests[0].isReviewed(
      reviewsAPIResponseApproved1
    );
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests[0].isReviewed(reviewsAPIResponseApproved2);
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests[0].isReviewed(reviewsAPIResponseReviewed);
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests[0].isReviewed(reviewsAPIResponseNoReview);
    expect(reviewed).toEqual(false);

    reviewed = context.pullRequests[0].isReviewed(
      reviewsAPIResponseRequestedChanges
    );
    expect(reviewed).toEqual(true);

    reviewed = context.pullRequests[0].isReviewed(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(reviewed).toEqual(true);
  });

  test.todo('isMemberReviewed()');
  test.todo('memberReviews()');

  test<PullRequestTestContext>('isApproved()', context => {
    let approved = context.pullRequests[0].isApproved(
      reviewsAPIResponseApproved1
    );
    expect(approved).toEqual(true);

    approved = context.pullRequests[0].isApproved(reviewsAPIResponseApproved2);
    expect(approved).toEqual(true);

    approved = context.pullRequests[0].isApproved(reviewsAPIResponseReviewed);
    expect(approved).toEqual(false);

    approved = context.pullRequests[0].isApproved(reviewsAPIResponseNoReview);
    expect(approved).toEqual(false);

    approved = context.pullRequests[0].isApproved(
      reviewsAPIResponseRequestedChanges
    );
    expect(approved).toEqual(false);

    approved = context.pullRequests[0].isApproved(
      reviewsAPIResponseApprovedWithRequestedChanges
    );
    expect(approved).toEqual(true);
  });

  test.todo('isMemberApproved()');
});
