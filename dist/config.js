import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import deepmerge from 'deepmerge';
import { configSchema } from './schema/config';
export class Config {
    constructor(config) {
        const parsedConfig = configSchema.parse(config);
        this.labels = parsedConfig.labels;
        this.ignoreChecks = parsedConfig['ignore-checks'];
    }
    static async getConfig(octokit) {
        const path = getInput('config-path', { required: true });
        const retrievedConfig = (await octokit.config.get(Object.assign(Object.assign({}, context.repo), { path, defaults: configs => deepmerge.all([this.defaults, ...configs]) }))).config;
        debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);
        if (Config.isConfigEmpty(retrievedConfig)) {
            throw new Error(`Missing configuration. Please setup 'Tracker Validator' Action using 'pull-request-validator.yml' file.`);
        }
        return new this(retrievedConfig);
    }
    static isConfigEmpty(config) {
        return config === null || config === undefined;
    }
}
Config.defaults = {
    labels: {
        'missing-review': 'pr/missing-review',
        'changes-requested': 'pr/changes-requested',
        'missing-failing-ci': 'pr/failing-ci',
        'waiving-failing-ci': 'ci-waived',
    },
    'ignore-checks': [
        'Pull Request Validator',
        'Advanced Commit Linter',
        'Tracker Validator',
        'Auto Merge',
    ],
};
//# sourceMappingURL=config.js.map