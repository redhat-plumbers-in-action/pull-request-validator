var _a, _b;
import { getBooleanInput, getInput, setFailed, setOutput } from '@actions/core';
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
    .parse((_a = process.env.GITHUB_REPOSITORY) === null || _a === void 0 ? void 0 : _a.split('/')[0]);
const repo = z
    .string()
    .min(1)
    .parse((_b = process.env.GITHUB_REPOSITORY) === null || _b === void 0 ? void 0 : _b.split('/')[1]);
const prMetadataUnsafe = JSON.parse(getInput('pr-metadata', { required: true }));
const prMetadata = pullRequestMetadataSchema.parse(prMetadataUnsafe);
const commitSha = prMetadata.commits[prMetadata.commits.length - 1].sha;
const setStatus = getBooleanInput('set-status', { required: true });
let checkRunID;
if (setStatus) {
    checkRunID = (await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
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
    })).data.id;
}
const statusTitle = getInput('status-title', { required: true });
try {
    const pr = new PullRequest(prMetadata.number, commitSha, owner, repo, octokit);
    await pr.getLabels();
    let message = await action(octokit, owner, repo, pr);
    if (setStatus && checkRunID) {
        await updateStatusCheck(octokit, checkRunID, owner, repo, 'completed', 'success', message);
    }
    if (statusTitle.length > 0) {
        message = `### ${statusTitle}\n\n${message}`;
    }
    setOutput('status', JSON.stringify(message));
}
catch (error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else {
        message = JSON.stringify(error);
    }
    if (setStatus && checkRunID) {
        await updateStatusCheck(octokit, checkRunID, owner, repo, 'completed', 'failure', message);
    }
    if (statusTitle.length > 0) {
        message = `### ${statusTitle}\n\n${message}`;
    }
    // set status output only if error was thrown by us
    if (error instanceof ValidationError) {
        setOutput('status', JSON.stringify(message));
    }
    else {
        setFailed(message);
    }
}
//# sourceMappingURL=main.js.map