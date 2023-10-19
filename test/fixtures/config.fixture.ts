import { Config } from '../../src/config';

export interface ConfigTestContext {
  configs: Config[];
}

export const configContextFixture: ConfigTestContext = {
  configs: [
    new Config({
      labels: {
        'missing-review': 'needs-review',
        'changes-requested': 'changes-requested',
        'missing-failing-ci': 'needs-ci',
        'waiving-failing-ci': 'ci-waived',
      },
      'ignore-checks': ['Bad CI', 'Super Bad CI'],
    }),
  ],
};
