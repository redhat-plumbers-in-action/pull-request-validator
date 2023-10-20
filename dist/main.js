var _a, _b;
import { getInput, setFailed } from '@actions/core';
import { z } from 'zod';
import '@total-typescript/ts-reset';
import action from './action';
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
const checkRunID = (await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
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
try {
    const pr = new PullRequest(prMetadata.number, commitSha, owner, repo, octokit);
    await pr.getLabels();
    const message = await action(octokit, owner, repo, pr);
    await updateStatusCheck(octokit, checkRunID, owner, repo, 'completed', 'success', message);
}
catch (error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else {
        message = JSON.stringify(error);
    }
    setFailed(message);
    await updateStatusCheck(octokit, checkRunID, owner, repo, 'completed', 'failure', message);
}
//# sourceMappingURL=main.js.map