import { describe, expect, test } from 'vitest';

import { getFailedMessage, getSuccessMessage, raise } from '../../src/util';

describe('Test Util functions', () => {
  test('getFailedMessage()', () => {
    expect(getFailedMessage([])).toBe('');
    expect(getFailedMessage(['CI failed', 'PR needs review']))
      .toMatchInlineSnapshot(`
      "### Failed

      CI failed
      PR needs review"
    `);
  });

  test('getSuccessMessage()', () => {
    expect(getSuccessMessage([])).toBe('');
    expect(getSuccessMessage(['CI passed', 'PR reviewed']))
      .toMatchInlineSnapshot(`
      "### Success

      CI passed
      PR reviewed"
    `);
  });

  test('raise()', () =>
    expect(() => raise('test error')).toThrowError('test error'));
});
