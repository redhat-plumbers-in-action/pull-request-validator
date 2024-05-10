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
