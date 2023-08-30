import * as swissnode from '../src/index';

describe('LogTools', () => {
  describe('getLogStr', () => {
    it(`exists as 'LogTools.getLogStr'`, () => {
      expect(swissnode.LogTools.getLogStr).toBeDefined();
    });

    it(`exists as 'getLogStr'`, () => {
      expect(swissnode.getLogStr).toBeDefined();
    });
  });

  describe('processLogContents', () => {
    it(`exists as 'LogTools.processLogContents'`, () => {
      expect(swissnode.LogTools.processLogContents).toBeDefined();
    });

    it(`exists as 'processLogContents'`, () => {
      expect(swissnode.processLogContents).toBeDefined();
    });
  });

  describe('getLog', () => {
    it(`exists as 'LogTools.getLog'`, () => {
      expect(swissnode.LogTools.getLog).toBeDefined();
    });

    it(`exists as 'getLog'`, () => {
      expect(swissnode.getLog).toBeDefined();
    });
  });
});
