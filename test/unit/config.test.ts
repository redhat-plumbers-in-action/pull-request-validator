import { describe, it, expect, beforeEach } from 'vitest';

import { Config } from '../../src/config';

import {
  configContextFixture,
  ConfigTestContext,
} from '../fixtures/config.fixture';

describe('Config Object', () => {
  beforeEach<ConfigTestContext>(context => {
    context.configs = configContextFixture.configs;
  });

  it<ConfigTestContext>('can be instantiated', context =>
    context.configs.map(configItem => expect(configItem).toBeDefined()));

  it<ConfigTestContext>('isConfigEmpty()', context => {
    expect(Config.isConfigEmpty(null)).toBe(true);
    expect(Config.isConfigEmpty(undefined)).toBe(true);
    expect(Config.isConfigEmpty({})).toBe(false);
  });
});

// describe('Get Config', () => {
//   beforeEach<IConfigTestContext>(context => {
//     context.configs = configContextFixture.configs;
//   });

//   it<IConfigTestContext>('can get default config', async context => {
//     const jiraToken =
//       process.env['INPUT_CONFIG_PATH'] ?? '.github/pull-request-validator.yml';

//     nock('https://api.github.com')
//       .get('/repos/octocat/hello-world/contents/.github%2Fmy-app.yml')
//       .reply(200, 'comment: Thank you for creating the issue');

//     const octokit = new Octokit();
//     const config = await Config.getConfig(octokit as any);

//     assert.deepStrictEqual(
//       { labels: config.labels, 'ignore-checks': config.ignoreChecks },
//       Config.defaults
//     );
//   });

//   it<IConfigTestContext>('can get config from file', async context => {
//     const jiraToken =
//       process.env['INPUT_CONFIG_PATH'] ?? '.github/pull-request-validator.yml';

//     nock('https://api.github.com')
//       .get('/repos/octocat/hello-world/contents/.github%2Fmy-app.yml')
//       .reply(404)
//       .get('/repos/octocat/.github/contents/.github%2Fmy-app.yml')
//       .reply(404);

//     const octokit = new Octokit();
//     const config = await Config.getConfig(octokit as any);

//     assert.deepStrictEqual(config, {} as any);
//   });
// });
