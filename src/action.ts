import { Config } from './config';
import { CustomOctokit } from './octokit';
import { PullRequest } from './pull-request';
import {
  getFailedMessage,
  getSuccessMessage,
  raise,
  removeLabel,
  setLabels,
} from './util';

async function action(
  octokit: CustomOctokit,
  owner: string,
  repo: string,
  pr: PullRequest
): Promise<string> {
  let message: string[] = [];
  let err: string[] = [];
  let labels: { add: string[]; remove: string[] } = { add: [], remove: [] };

  const config = await Config.getConfig(octokit);

  const isCiWaived = pr.currentLabels.includes(
    config.labels['waiving-failing-ci']
  );
  const ciPassed = await pr.isCIGreen(config.ignoreChecks);
  if (!ciPassed.result && !isCiWaived) {
    labels.add.push(config.labels['missing-failing-ci']);
    err.push(`🔴 ${ciPassed.message}`);
  } else {
    if (pr.currentLabels.includes(config.labels['missing-failing-ci'])) {
      removeLabel(
        octokit,
        owner,
        repo,
        pr.number,
        config.labels['missing-failing-ci']
      );
    }

    isCiWaived
      ? message.push(`🟡 CI - Waived`)
      : message.push(`🟢 CI - All checks have passed`);
  }

  await pr.reviews.initialize();
  if (!pr.reviews.isReviewed()) {
    labels.add.push(config.labels['missing-review']);
    err.push(`🔴 Review - Missing review from a member.`);
  } else {
    if (pr.currentLabels.includes(config.labels['missing-review'])) {
      removeLabel(
        octokit,
        owner,
        repo,
        pr.number,
        config.labels['missing-review']
      );
    }
    message.push(`🟢 Review - Reviewed by a member`);

    if (!pr.reviews.isApproved()) {
      labels.add.push(config.labels['changes-requested']);
      err.push(`🔴 Approval - missing or changes were requested.`);
    } else {
      if (pr.currentLabels.includes(config.labels['changes-requested'])) {
        removeLabel(
          octokit,
          owner,
          repo,
          pr.number,
          config.labels['changes-requested']
        );
      }
      message.push(`🟢 Approval - Changes were approved`);
    }
  }

  setLabels(octokit, owner, repo, pr.number, labels.add);

  if (err.length > 0) {
    raise(getFailedMessage(err) + '\n\n' + getSuccessMessage(message));
  }

  return getSuccessMessage(message);
}

export default action;
