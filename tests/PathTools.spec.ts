import * as swissnode from '../src/index';

describe('PathTools', () => {
  describe('explodePath', () => {
    it(`exists as 'PathTools.explodePath'`, () => {
      expect(swissnode.PathTools.explodePath).toBeDefined();
    });

    it(`exists as 'explodePath'`, () => {
      expect(swissnode.explodePath).toBeDefined();
    });
  });

  describe('removeTrailSlash', () => {
    it(`exists as 'PathTools.removeTrailSlash'`, () => {
      expect(swissnode.PathTools.removeTrailSlash).toBeDefined();
    });
  });

  describe('trailSlash', () => {
    it(`exists as 'PathTools.trailSlash'`, () => {
      expect(swissnode.PathTools.trailSlash).toBeDefined();
    });
  });

  describe('removeDoubleSlashes', () => {
    it(`exists as 'PathTools.removeDoubleSlashes'`, () => {
      expect(swissnode.PathTools.removeDoubleSlashes).toBeDefined();
    });
  });
});
