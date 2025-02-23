import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('Progress Bar', () => {
  describe('getProgressBar', () => {
    multiTest(
      [
        [swissnode.getProgressBar, 'getProgressBar'],
        [swissnode.progressBar.getProgressBar, 'progressBar.getProgressBar']
      ],
      (getProgressBar, name) => {
        it(should` exist as ${name}`, () => {
          expect(getProgressBar).toBeDefined();
        });
      }
    );
  });

  describe('getFullOptions', () => {
    singleTest(swissnode.progressBar.getFullOptions, 'getFullOptions', (getFullOptions, name) => {
      it(should` exist as ${name}`, () => {
        expect(getFullOptions).toBeDefined();
      });
    });
  });

  describe('printLn', () => {
    singleTest(swissnode.progressBar.utils.printLn, 'progressBar.printLn', (printLn, name) => {
      it(should` exist as ${name}`, () => {
        expect(printLn).toBeDefined();
      });
    });
  });
});

describe('Multibar Manager', () => {
  describe('getMultiBarManager', () => {
    singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
      it(should` exist as ${name}`, () => {
        expect(getMultiBarManager).toBeDefined();
      });
    });
  });

  describe('getFullMultiBarManagerOptions', () => {
    singleTest(swissnode.progressBar.getFullMultiBarManagerOptions, 'progressBar.getFullMultiBarManagerOptions', (getOptions, name) => {
      it(should` exist as ${name}`, () => {
        expect(getOptions).toBeDefined();
      });
    });
  });
  describe('multiPrintFn', () => {
    singleTest(swissnode.progressBar.utils.multiPrintFn, 'progressBar.multiPrintFn', (multiPrintFn, name) => {
      it(should` exist as ${name}`, () => {
        expect(multiPrintFn).toBeDefined();
      });

      // no tests
    });
  });
});
