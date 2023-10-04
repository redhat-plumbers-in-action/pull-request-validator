import { debug } from '@actions/core';
import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

// Update check run - check completed + conclusion
// https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#update-a-check-run
// ! Allow specifying workflow run when creating a checkrun from a GitHub workflow
// !FIXME: Issue - https://github.com/orgs/community/discussions/14891#discussioncomment-6110666
// !FIXME: Issue - https://github.com/orgs/community/discussions/24616
export async function updateStatusCheck(
  octokit: Octokit,
  checkID: number,
  owner: string,
  repo: string,
  status: Endpoints['POST /repos/{owner}/{repo}/check-runs']['parameters']['status'],
  conclusion: Endpoints['POST /repos/{owner}/{repo}/check-runs']['parameters']['conclusion'],
  message: string
) {
  await octokit.request(
    'PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}',
    {
      owner,
      repo,
      check_run_id: checkID,
      status,
      completed_at: new Date().toISOString(),
      conclusion,
      output: {
        title: 'Tracker Validation',
        summary: message,
      },
    }
  );
}

export function getFailedMessage(error: string[]): string {
  if (error.length === 0) {
    return '';
  }

  return '### Failed' + '\n\n' + error.join('\n');
}

export function getSuccessMessage(message: string[]): string {
  if (message.length === 0) {
    return '';
  }

  return '### Success' + '\n\n' + message.join('\n');
}

export async function setLabels(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  labels: string[]
) {
  if (labels.length === 0) {
    debug('No labels to set');
    return;
  }

  await octokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
    {
      owner,
      repo,
      issue_number: issueNumber,
      labels,
    }
  );
}

export async function removeLabel(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  label: string
) {
  await octokit.request(
    'DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}',
    {
      owner,
      repo,
      issue_number: issueNumber,
      name: label,
    }
  );
}

export function raise(error: string): never {
  throw new Error(error);
}
