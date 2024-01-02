import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('table', () => {
  describe('print', () => {
    singleTest(swissnode.table.print, 'swissnode.table.print', (print, name) => {
      it(should` exist as ${name}`, () => {
        expect(print).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('printObjects', () => {
    singleTest(swissnode.table.printObjects, 'swissnode.table.printObjects', (printObjects, name) => {
      it(should` exist as ${name}`, () => {
        expect(printObjects).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('markdown', () => {
    singleTest(swissnode.table.markdown, 'swissnode.table.markdown', (markdown, name) => {
      it(should` exist as ${name}`, () => {
        expect(markdown).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('getLines', () => {
    singleTest(swissnode.table.getLines, 'swissnode.table.getLines', (getLines, name) => {
      it(should` exist as ${name}`, () => {
        expect(getLines).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('utils', () => {
    it(should` exist as 'table.utils'`, () => {
      expect(swissnode.table.utils).toBeDefined();
    });

    describe('objectsToTable', () => {
      singleTest(swissnode.table.utils.objectsToTable, 'swissnode.table.utils.objectsToTable', (objectsToTable, name) => {
        it(should` exist as ${name}`, () => {
          expect(objectsToTable).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('transpose', () => {
      singleTest(swissnode.table.utils.transpose, 'swissnode.table.utils.transpose', (transpose, name) => {
        it(should` exist as ${name}`, () => {
          expect(transpose).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('concatRows', () => {
      singleTest(swissnode.table.utils.concatRows, 'swissnode.table.utils.concatRows', (concatRows, name) => {
        it(should` exist as ${name}`, () => {
          expect(concatRows).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getFormat', () => {
      singleTest(swissnode.table.utils.getFormat, 'swissnode.table.utils.getFormat', (getFormat, name) => {
        it(should` exist as ${name}`, () => {
          expect(getFormat).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });
  });
});
