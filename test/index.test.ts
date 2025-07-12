import { leftDiff, leftDiffDeep } from '../src';

const abcd = ['a', 'b', 'c', 'd'];
const cdef = ['c', 'd', 'e', 'f'];
const defg = ['d', 'e', 'f', 'g'];
const mixed = ['a', 1, 'b', 'c'];
const nested = ['a', 1, ['b', ['c']]];

describe('leftDiff', () => {
  expectCommonFunctionalities(leftDiff);
  describe('calculation with deeply nested arrays', () => {
    expect(leftDiff(nested, abcd)).toEqual([1, ['b', ['c']]]);
    expect(leftDiff(abcd, nested)).toEqual(['b', 'c', 'd']);
  });
});

describe('leftDiffDeep', () => {
  expectCommonFunctionalities(leftDiffDeep);
  describe('calculation with deeply nested arrays', () => {
    expect(leftDiffDeep(nested, abcd)).toEqual([1]);
    expect(leftDiffDeep(abcd, nested)).toEqual(['d']);
  });
});

function expectCommonFunctionalities(fn: Function) {
  describe('input validation', () => {
    it('returns empty array when both arrays are empty', () => {
      expect(fn([], [])).toEqual([]);
    });
    it('return empty array when any arg is not array', () => {
      expect(fn([], {})).toEqual([]);
      expect(fn([], null)).toEqual([]);
      expect(fn(null, null)).toEqual([]);
      expect(fn([], undefined)).toEqual([]);
      expect(fn('string', [])).toEqual([]);
      expect(fn([undefined], 'string')).toEqual([]);
      expect(fn([], 1)).toEqual([]);
      expect(fn([], false)).toEqual([]);
    });
  });

  describe('calculation with 2 args', () => {
    it('returns elements in arr1 but not in arr2', () => {
      expect(fn(abcd, cdef)).toEqual(['a', 'b']);
      expect(fn(abcd, defg)).toEqual(['a', 'b', 'c']);
      expect(fn(abcd, mixed)).toEqual(['d']);
      expect(fn(mixed, cdef)).toEqual(['a', 1, 'b']);
    });
    it('returns empty array when both arrays are equal', () => {
      expect(fn(abcd, abcd)).toEqual([]);
      expect(fn([], [])).toEqual([]);
    });
    it('returns empty array when first array is empty', () => {
      expect(fn([], cdef)).toEqual([]);
      expect(fn([], defg)).toEqual([]);
    });
    it('returns arr1 when arr2 is empty', () => {
      expect(fn(abcd, [])).toEqual(abcd);
      expect(fn(cdef, [])).toEqual(cdef);
    });
  });

  describe('calculation with more than 2 args', () => {
    it('returns elements in first array but not in any of the others', () => {
      expect(fn(abcd, cdef, defg)).toEqual(['a', 'b']);
    });
    it('returns empty array when first array is empty', () => {
      expect(fn([], cdef, defg)).toEqual([]);
      expect(fn([], [], defg)).toEqual([]);
    });
    it('returns first array when all other arrays are empty', () => {
      expect(fn(abcd, [], [])).toEqual(abcd);
      expect(fn(cdef, [], [])).toEqual(cdef);
    });
    it('returns empty array when all arrays are equal', () => {
      expect(fn(abcd, abcd, abcd)).toEqual([]);
      expect(fn([], [], [])).toEqual([]);
    });
    it('returns elements in first array but not in any of the others when some arrays are empty', () => {
      expect(fn(abcd, cdef, [])).toEqual(['a', 'b']);
      expect(fn(abcd, [], defg)).toEqual(['a', 'b', 'c']);
    });
  });
}
