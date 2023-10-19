import { Octokit } from '@octokit/core';
import { config } from '@probot/octokit-plugin-config';
import { paginateRest } from '@octokit/plugin-paginate-rest';
const CustomOctokit = Octokit.plugin(config, paginateRest);
export function getOctokit(token) {
    return new CustomOctokit({
        auth: token,
    });
}
//# sourceMappingURL=octokit.js.map