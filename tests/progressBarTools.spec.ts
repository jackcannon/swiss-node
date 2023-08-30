import * as swissnode from '../src/index';

describe('progressBarTools', () => {
  describe('print', () => {
    it(`exists as 'progressBarTools.getColouredProgressBarOpts'`, () => {
      expect(swissnode.progressBarTools.getColouredProgressBarOpts).toBeDefined();
    });
  });
});
