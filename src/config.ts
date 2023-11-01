import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import deepmerge from 'deepmerge';

import { CustomOctokit } from './octokit';
import { configSchema, ConfigLabels, IgnoreChecks } from './schema/config';

export class Config {
  static readonly defaults = {
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
  labels: ConfigLabels;
  ignoreChecks: IgnoreChecks;

  constructor(config: unknown) {
    const parsedConfig = configSchema.parse(config);
    this.labels = parsedConfig.labels;
    this.ignoreChecks = parsedConfig['ignore-checks'];
  }

  static async getConfig(octokit: CustomOctokit): Promise<Config> {
    const path = getInput('config-path', { required: true });

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
        defaults: configs =>
          deepmerge.all([this.defaults, ...configs]) as Partial<Config>,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    if (Config.isConfigEmpty(retrievedConfig)) {
      throw new Error(
        `Missing configuration. Please setup 'Tracker Validator' Action using 'pull-request-validator.yml' file.`
      );
    }

    return new this(retrievedConfig);
  }

  static isConfigEmpty(config: unknown) {
    return config === null || config === undefined;
  }
}
