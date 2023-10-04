import { CustomOctokit } from './octokit';
import { PullRequest } from './pull-request';
declare function action(octokit: CustomOctokit, owner: string, repo: string, pr: PullRequest): Promise<string>;
export default action;
