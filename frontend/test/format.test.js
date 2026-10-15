import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatScore } from '../src/format.js';

test('formats a valid score', () => {
  assert.equal(formatScore(85), '85%');
});

test('rejects an out-of-range score', () => {
  assert.throws(() => formatScore(120), RangeError);
});

test('rejects negative scores', () => {
  assert.throws(() => formatScore(-1), RangeError);
});

test('accepts both boundaries', () => {
  assert.equal(formatScore(0), '0%');
  assert.equal(formatScore(100), '100%');
});
