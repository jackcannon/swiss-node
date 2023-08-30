import * as swissnode from '../src/index';

describe('keyListener', () => {
  describe('getKeyListener', () => {
    it(`exists as 'getKeyListener'`, () => {
      expect(swissnode.getKeyListener).toBeDefined();
    });
  });
});
