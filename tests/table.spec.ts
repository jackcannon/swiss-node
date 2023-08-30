import * as swissnode from '../src/index';

describe('table', () => {
  describe('print', () => {
    it(`exists as 'table.print'`, () => {
      expect(swissnode.table.print).toBeDefined();
    });
  });

  describe('printObjects', () => {
    it(`exists as 'table.printObjects'`, () => {
      expect(swissnode.table.printObjects).toBeDefined();
    });
  });

  describe('markdown', () => {
    it(`exists as 'table.markdown'`, () => {
      expect(swissnode.table.markdown).toBeDefined();
    });
  });

  describe('getLines', () => {
    it(`exists as 'table.getLines'`, () => {
      expect(swissnode.table.getLines).toBeDefined();
    });
  });

  describe('utils', () => {
    it(`exists as 'table.utils'`, () => {
      expect(swissnode.table.utils).toBeDefined();
    });

    describe('objectsToTable', () => {
      it(`exists as 'table.utils.objectsToTable'`, () => {
        expect(swissnode.table.utils.objectsToTable).toBeDefined();
      });
    });

    describe('transpose', () => {
      it(`exists as 'table.utils.transpose'`, () => {
        expect(swissnode.table.utils.transpose).toBeDefined();
      });
    });

    describe('concatRows', () => {
      it(`exists as 'table.utils.concatRows'`, () => {
        expect(swissnode.table.utils.concatRows).toBeDefined();
      });
    });

    describe('getFormat', () => {
      it(`exists as 'table.utils.getFormat'`, () => {
        expect(swissnode.table.utils.getFormat).toBeDefined();
      });
    });
  });
});
