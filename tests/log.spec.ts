import * as swissnode from '../src/index';

describe('log', () => {
  describe('log', () => {
    it(`exists as 'log'`, () => {
      expect(swissnode.log).toBeDefined();
    });
  });
  describe('createLogger', () => {
    it(`exists as 'createLogger'`, () => {
      expect(swissnode.createLogger).toBeDefined();
    });
  });
});
