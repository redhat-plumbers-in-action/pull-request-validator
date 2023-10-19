import { Octokit } from '@octokit/core';
import { config } from '@probot/octokit-plugin-config';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const CustomOctokit = Octokit.plugin(config, paginateRest);

export type CustomOctokit = InstanceType<typeof CustomOctokit>;

export function getOctokit(token: string) {
  return new CustomOctokit({
    auth: token,
  });
}
