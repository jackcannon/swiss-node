import * as swissnode from '../src/index';

describe('waiters', () => {
  describe('nextTick', () => {
    it(`exists as 'nextTick'`, () => {
      expect(swissnode.nextTick).toBeDefined();
    });
    it(`exists as 'waiters.nextTick'`, () => {
      expect(swissnode.waiters.nextTick).toBeDefined();
    });
  });
});
