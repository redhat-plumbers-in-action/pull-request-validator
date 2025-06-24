import { describe, expect, test } from 'vitest';

import {
  getFailedMessage,
  getSuccessMessage,
  makeList,
  raise,
} from '../../src/util';

describe('Test Util functions', () => {
  test('getFailedMessage()', () => {
    expect(getFailedMessage([])).toBe('');
    expect(getFailedMessage(['CI failed', 'PR needs review']))
      .toMatchInlineSnapshot(`
        "#### Failed

        CI failed
        PR needs review"
      `);
  });

  test('getSuccessMessage()', () => {
    expect(getSuccessMessage([])).toBe('');
    expect(getSuccessMessage(['CI passed', 'PR reviewed']))
      .toMatchInlineSnapshot(`
        "#### Success

        CI passed
        PR reviewed"
      `);
  });

  test('raise()', () =>
    expect(() => raise('test error')).toThrowError('test error'));

  test('makeList()', () => {
    let list = ['item1', 'item2', 'item3'];
    expect(makeList(list)).toMatchInlineSnapshot(`
      "* item1
      * item2
      * item3"
    `);

    list = [];
    expect(makeList(list)).toBe('');
  });
});
