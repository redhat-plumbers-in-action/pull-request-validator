import { getBooleanInput, getInput, setFailed, setOutput } from '@actions/core';
import { Endpoints } from '@octokit/types';
import { z } from 'zod';

import '@total-typescript/ts-reset';

import action from './action';
import { ValidationError } from './error';
import { getOctokit } from './octokit';
import { PullRequest } from './pull-request';
import { updateStatusCheck } from './util';

import { pullRequestMetadataSchema } from './schema/input';

const octokit = getOctokit(getInput('token', { required: true }));

const owner = z
  .string()
  .min(1)
  .parse(process.env.GITHUB_REPOSITORY?.split('/')[0]);
const repo = z
  .string()
  .min(1)
  .parse(process.env.GITHUB_REPOSITORY?.split('/')[1]);

const prMetadataUnsafe = JSON.parse(
  getInput('pr-metadata', { required: true })
);

const prMetadata = pullRequestMetadataSchema.parse(prMetadataUnsafe);
const commitSha = prMetadata.commits[prMetadata.commits.length - 1].sha;

const setStatus = getBooleanInput('set-status', { required: true });
let checkRunID:
  | Endpoints['POST /repos/{owner}/{repo}/check-runs']['response']['data']['id']
  | undefined;

if (setStatus) {
  checkRunID = (
    await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
      owner,
      repo,
      name: 'Pull Request Validator',
      head_sha: commitSha,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      output: {
        title: 'Pull Request Validator',
        summary: 'Pull Request Validator in progress ...',
      },
    })
  ).data.id;
}

const statusTitle = getInput('status-title', { required: true });

try {
  const pr = new PullRequest(
    prMetadata.number,
    commitSha,
    owner,
    repo,
    octokit
  );
  await pr.getLabels();
  let message = await action(octokit, owner, repo, pr);

  if (setStatus && checkRunID) {
    await updateStatusCheck(
      octokit,
      checkRunID,
      owner,
      repo,
      'completed' as unknown as undefined,
      'success',
      message
    );
  }

  if (statusTitle.length > 0) {
    message = `### ${statusTitle}\n\n${message}`;
  }

  setOutput('status', JSON.stringify(message));
} catch (error) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  if (setStatus && checkRunID) {
    await updateStatusCheck(
      octokit,
      checkRunID,
      owner,
      repo,
      'completed' as unknown as undefined,
      'failure',
      message
    );
  }

  if (statusTitle.length > 0) {
    message = `### ${statusTitle}\n\n${message}`;
  }

  // set status output only if error was thrown by us
  if (error instanceof ValidationError) {
    setOutput('status', JSON.stringify(message));
  }

  setFailed(message);
}
