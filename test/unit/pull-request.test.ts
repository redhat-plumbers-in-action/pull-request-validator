import { beforeEach, describe, expect, it, test } from 'vitest';

import {
  PullRequestTestContext,
  pullRequestContextFixture,
} from '../fixtures/pull-request.fixture';
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
    let success = context.pullRequests.isSuccess(checkRunsAPIResponseSuccess);
    expect(success).toEqual(true);

    success = context.pullRequests.isSuccess(checkRunsAPIResponseFailed);
    expect(success).toEqual(false);
  });

  test<PullRequestTestContext>('isFailedOrPending()', context => {
    let { failed, pending } = context.pullRequests.isFailedOrPending(
      checkRunsAPIResponseSuccess
    );
    expect(failed).toEqual([]);
    expect(pending).toEqual([]);

    ({ failed, pending } = context.pullRequests.isFailedOrPending(
      checkRunsAPIResponseFailed
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
});
