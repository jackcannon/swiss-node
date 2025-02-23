import * as swissnode from '../';
import * as swissak from 'swiss-ak';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

const IS_DEBUG = false; // controls whether to actually print the progress bar to stdout

const printSpies = (isStdOut: boolean = true, isConsole: boolean = true) => ({
  stdout: isStdOut
    ? {
        // @ts-ignore
        clearLine: process?.stdout?.clearLine ? jest.spyOn(process.stdout, 'clearLine') : jest.spyOn({ fn: swissak.fn.noop }, 'fn'),
        // @ts-ignore
        cursorTo: process?.stdout?.cursorTo ? jest.spyOn(process.stdout, 'cursorTo') : jest.spyOn({ fn: swissak.fn.noop }, 'fn'),
        // @ts-ignore
        moveCursor: process?.stdout?.moveCursor ? jest.spyOn(process.stdout, 'moveCursor') : jest.spyOn({ fn: swissak.fn.noop }, 'fn'),
        // @ts-ignore
        write: process?.stdout?.write ? jest.spyOn(process.stdout, 'write') : jest.spyOn({ fn: swissak.fn.noop }, 'fn')
      }
    : {},
  cnsle: isConsole
    ? {
        // log: jest.spyOn(console, 'log')
        log: (() => {
          const stub = jest.fn();
          console.log = stub;
          return stub;
        })()
      }
    : {}
});

const testProgressBar = (
  opts: swissnode.progressBar.ProgressBarOptions,
  max: number,
  fn: (max: number, options?: swissnode.progressBar.ProgressBarOptions) => swissnode.ProgressBar = swissnode.getProgressBar
) => {
  const printFn = jest.fn((line, ...args: any) => {
    if (IS_DEBUG) console.log('PRINTED:', '`' + line + '`', ...args);
  });
  const bar = fn(max, {
    maxWidth: 50,
    printFn,
    ...opts
  });
  return {
    bar,
    printFn,
    printCalls: printFn.mock.calls
  };
};

const testMultiBarManager = (
  opts: swissnode.progressBar.MultiBarManagerOptions,
  fn: (options?: swissnode.progressBar.MultiBarManagerOptions) => swissak.MultiBarManager = swissak.getMultiBarManager
) => {
  const printFn = jest.fn((line, ...args: any) => {
    if (IS_DEBUG) console.log('PRINTED:', '`' + line + '`', ...args);
  });
  const manager = fn({
    printFn,
    ...opts,
    overrideOptions: {
      maxWidth: 50,
      ...(opts?.overrideOptions || {})
    }
  });
  return {
    manager,
    printFn,
    printCalls: printFn.mock.calls
  };
};

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

        it(should` return a progress bar object`, () => {
          const { bar } = testProgressBar({}, 100, getProgressBar);

          expect(bar).toBeDefined();

          expect(bar.max).toBeDefined();
          expect(typeof bar.max).toBe('number');

          expect(bar.update).toBeDefined();
          expect(typeof bar.update).toBe('function');

          expect(bar.next).toBeDefined();
          expect(typeof bar.next).toBe('function');

          expect(bar.set).toBeDefined();
          expect(typeof bar.set).toBe('function');

          expect(bar.reset).toBeDefined();
          expect(typeof bar.reset).toBe('function');

          expect(bar.start).toBeDefined();
          expect(typeof bar.start).toBe('function');

          expect(bar.finish).toBeDefined();
          expect(typeof bar.finish).toBe('function');
        });

        it(should` run a basic progress bar`, () => {
          const { bar, printCalls } = testProgressBar({}, 100, getProgressBar);

          bar.set(25);
          expect(printCalls.at(-1)).toEqual(['▕█████████                           ▏ [ 25 / 100]']);

          bar.set(50);
          expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);

          bar.set(75);
          expect(printCalls.at(-1)).toEqual(['▕███████████████████████████         ▏ [ 75 / 100]']);
        });

        kitchenSink.toEqual(
          'max',
          (v) => {
            const { bar } = testProgressBar({}, v as any, getProgressBar);
            return bar.max;
          },
          kitchenSink.safe.num(undefined, true, -1, undefined, -1),
          kitchenSink.samples.num
        );
        kitchenSink.toEqual(
          'options',
          (v) => {
            const { bar, printCalls } = testProgressBar(v as any, 100, getProgressBar);
            bar.update();
            return printCalls.at(-1);
          },
          kitchenSink.safe.obj({}, false, {}),
          kitchenSink.samples.general
        );
      }
    );
  });

  describe('Progress Bar instance', () => {
    describe('update', () => {
      it(should` exist as 'update' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.update).toBeDefined();
      });

      it(should` print a line`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.update();
        expect(printCalls.length).toEqual(1);
        expect(printCalls.at(-1)).toEqual(['▕                                    ▏ [  0 / 100]']);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.update();
        expect(output).toEqual('▕                                    ▏ [  0 / 100]');
      });
    });
    describe('next', () => {
      it(should` exist as 'next' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.next).toBeDefined();
      });

      it(should` print a line`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.next();
        expect(printCalls.length).toEqual(1);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.next();
        expect(output).toEqual('▕                                    ▏ [  1 / 100]');
      });

      it(should` added 1 to the progress`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.next();
        expect(printCalls.at(-1)).toEqual(['▕                                    ▏ [  1 / 100]']);
        bar.next();
        expect(printCalls.at(-1)).toEqual(['▕█                                   ▏ [  2 / 100]']);
        bar.next();
        expect(printCalls.at(-1)).toEqual(['▕█                                   ▏ [  3 / 100]']);
      });
    });
    describe('set', () => {
      it(should` exist as 'set' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.set).toBeDefined();
      });

      it(should` print a line`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.set(50);
        expect(printCalls.length).toEqual(1);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.set(50);
        expect(output).toEqual('▕██████████████████                  ▏ [ 50 / 100]');
      });

      it(should` set the progress bar value`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(25);
        expect(printCalls.at(-1)).toEqual(['▕█████████                           ▏ [ 25 / 100]']);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);

        bar.set(75);
        expect(printCalls.at(-1)).toEqual(['▕███████████████████████████         ▏ [ 75 / 100]']);
      });

      kitchenSink.toEqual(
        'newCurrent',
        (v) => {
          const { bar, printCalls } = testProgressBar({}, 100);
          bar.set(v as any);
          return printCalls.at(-1);
        },
        kitchenSink.safe.num(undefined, true, 0, undefined),
        kitchenSink.samples.num
      );
    });
    describe('reset', () => {
      it(should` exist as 'reset' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.reset).toBeDefined();
      });

      it(should` print a line`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.reset();
        expect(printCalls.length).toEqual(1);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.reset();
        expect(output).toEqual('▕                                    ▏ [  0 / 100]');
      });

      it(should` reset the progress bar to 0`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);

        bar.reset();
        expect(printCalls.at(-1)).toEqual(['▕                                    ▏ [  0 / 100]']);
      });
    });
    describe('start', () => {
      it(should` exist as 'start' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.start).toBeDefined();
      });

      it(should` print 2 lines`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.start();
        expect(printCalls.length).toEqual(2);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.start();
        expect(output).toEqual('▕                                    ▏ [  0 / 100]');
      });

      it(should` start the progress bar`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.start();
        expect(printCalls.at(0)).toEqual([]); // empty line
        expect(printCalls.at(1)).toEqual(['▕                                    ▏ [  0 / 100]']);
      });
    });
    describe('finish', () => {
      it(should` exist as 'finish' on a progress bar object`, () => {
        const { bar } = testProgressBar({}, 100);
        expect(bar.finish).toBeDefined();
      });

      it(should` print 2 lines`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        expect(printCalls.length).toEqual(0);
        bar.finish();
        expect(printCalls.length).toEqual(2);
      });
      it(should` return the progress bar line`, () => {
        const { bar } = testProgressBar({}, 100);

        const output = bar.finish();
        expect(output).toEqual('▕                                    ▏ [  0 / 100]');
      });

      it(should` finish the progress bar`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(100);
        expect(printCalls.length).toEqual(1);
        expect(printCalls.at(0)).toEqual(['▕████████████████████████████████████▏ [100 / 100]']);

        bar.finish();
        expect(printCalls.length).toEqual(3);
        expect(printCalls.at(1)).toEqual(['▕████████████████████████████████████▏ [100 / 100]']);
        expect(printCalls.at(2)).toEqual([]); // empty line
      });
    });
  });

  describe('Progress Bar options', () => {
    describe('prefix', () => {
      // description: String to show to left of progress bar
      // default: ''
      // safeFn: safe.str(v, true, dflt)

      it(should` not prefix the progress bar if no prefix given`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` prefix the progress bar with 'Example'`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Example▕███████████████              ▏ [ 50 / 100]']);
      });
      it(should` prefix the progress bar with 'A Really Long String Example'`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'A Really Long String Example' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['A Really Long String Example▕████    ▏ [ 50 / 100]']);
      });
      it(should` prefix the progress bar with 'A Really Really Really Long String Example'`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'A Really Really Really Long String Example' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['A Really Really Really Long Str▕███  ▏ [ 50 / 100]']);
      });
    });
    describe('prefixWidth', () => {
      // description: Min width of prefix - `10` => `Example˽˽˽`
      // default: 0
      // safeFn: safe.num(v, true, 0, undefined, dflt)

      it(should` set the min width of the prefix to default`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'EG', prefixWidth: undefined }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['EG▕█████████████████                 ▏ [ 50 / 100]']);
      });
      it(should` set the min width of the prefix to 10`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', prefixWidth: 10 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Example   ▕█████████████             ▏ [ 50 / 100]']);
      });
      it(should` set the min width of the prefix to 20`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', prefixWidth: 20 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Example             ▕████████        ▏ [ 50 / 100]']);
      });
    });
    describe('maxPrefixWidth', () => {
      // description: Max width of prefix
      // default: Infinity
      // safeFn: safe.num(v, true, 0, undefined, dflt)

      it(should` set the max width of the prefix to default`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', maxPrefixWidth: undefined }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Example▕███████████████              ▏ [ 50 / 100]']);
      });

      it(should` set the max width of the prefix to 5`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', maxPrefixWidth: 5 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Examp▕████████████████               ▏ [ 50 / 100]']);
      });

      it(should` set the max width of the prefix to 2`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', maxPrefixWidth: 2 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Ex▕█████████████████                 ▏ [ 50 / 100]']);
      });
    });
    describe('maxWidth', () => {
      // description: The maximum width the entire string may extend
      // default: process?.stdout?.columns !== undefined ? process.stdout.columns : 100
      // safeFn: safe.num(v, true, 0, undefined, dflt)

      it(should` set the max width to the default`, () => {
        process.stdout.columns = 120;
        const { bar, printCalls } = testProgressBar({ maxWidth: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual([
          '▕█████████████████████████████████████████████████████                                                     ▏ [ 50 / 100]'
        ]);
      });
      it(should` set the max width to 10`, () => {
        const { bar, printCalls } = testProgressBar({ maxWidth: 10 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕▏ [ 50 / 100]']);
      });
      it(should` set the max width to 20`, () => {
        const { bar, printCalls } = testProgressBar({ maxWidth: 20 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕███   ▏ [ 50 / 100]']);
      });
      it(should` set the max width to 30`, () => {
        const { bar, printCalls } = testProgressBar({ maxWidth: 30 }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕████████        ▏ [ 50 / 100]']);
      });
    });
    describe('wrapperFn', () => {
      // description: function to wrap the printed string (eg `chalk.cyan)`
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ wrapperFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the printed string with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ wrapperFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['{{▕██████████████████                  ▏ [ 50 / 100]}}']);
      });
      it(should` wrap the printed string with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ wrapperFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['_▕██████████████████                  ▏ [ 50 / 100]_']);
      });
    });
    describe('barWrapFn', () => {
      // description: function to wrap the bar
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ barWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the bar with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ barWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕{{██████████████████                  }}▏ [ 50 / 100]']);
      });
      it(should` wrap the bar with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ barWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕_██████████████████                  _▏ [ 50 / 100]']);
      });
    });
    describe('barProgWrapFn', () => {
      // description: function to wrap the 'complete' segment of the bar
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ barProgWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the 'complete' segment of the bar with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ barProgWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕{{██████████████████}}                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the 'complete' segment of the bar with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ barProgWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕_██████████████████_                  ▏ [ 50 / 100]']);
      });
    });
    describe('barCurrentWrapFn', () => {
      // description: function to wrap the 'current' segment of the bar
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ barCurrentWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the 'current' segment of the bar with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar(
          {
            barCurrentWrapFn: (str) => `{{${str}}}`,
            showCurrent: true
          },
          3
        );
        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████{{▞▞▞▞▞▞▞▞▞▞▞▞▞▞}}             ▏ [1 / 3]']);
      });
      it(should` wrap the 'current' segment of the bar with underscores`, () => {
        const { bar, printCalls } = testProgressBar(
          {
            barCurrentWrapFn: (str) => `_${str}_`,
            showCurrent: true
          },
          3
        );
        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████_▞▞▞▞▞▞▞▞▞▞▞▞▞▞_             ▏ [1 / 3]']);
      });
    });
    describe('barEmptyWrapFn', () => {
      // description: function to wrap the empty/track part of the line
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ barEmptyWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the empty/track part of the line with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ barEmptyWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████{{                  }}▏ [ 50 / 100]']);
      });
      it(should` wrap the empty/track part of the line with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ barEmptyWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████_                  _▏ [ 50 / 100]']);
      });
    });

    describe('prefixWrapFn', () => {
      // description: function to wrap the prefix
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', prefixWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['Example▕███████████████              ▏ [ 50 / 100]']);
      });
      it(should` wrap the empty/track part of the line with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', prefixWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['{{Example}}▕███████████████              ▏ [ 50 / 100]']);
      });
      it(should` wrap the empty/track part of the line with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ prefix: 'Example', prefixWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['_Example_▕███████████████              ▏ [ 50 / 100]']);
      });
    });
    describe('countWrapFn', () => {
      // description: function to wrap the count
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ countWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` wrap the empty/track part of the line with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ countWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ {{[ 50 / 100]}}']);
      });
      it(should` wrap the empty/track part of the line with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ countWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ _[ 50 / 100]_']);
      });
    });
    describe('percentWrapFn', () => {
      // description: function to wrap the percent
      // default: fn.noact
      // safeFn: safe.func(v, dflt)

      it(should` do nothing when nothing given`, () => {
        const { bar, printCalls } = testProgressBar({ showPercent: true, percentWrapFn: undefined }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕███████████████              ▏ [ 50 / 100] ( 50%)']);
      });
      it(should` wrap the empty/track part of the line with double curly brackets`, () => {
        const { bar, printCalls } = testProgressBar({ showPercent: true, percentWrapFn: (str) => `{{${str}}}` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕███████████████              ▏ [ 50 / 100] {{( 50%)}}']);
      });
      it(should` wrap the empty/track part of the line with underscores`, () => {
        const { bar, printCalls } = testProgressBar({ showPercent: true, percentWrapFn: (str) => `_${str}_` }, 100);
        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕███████████████              ▏ [ 50 / 100] _( 50%)_']);
      });
    });

    describe('showCount', () => {
      // description: Show numerical values of the count - `[11 / 15]`
      // default: true
      // safeFn: safe.bool(v, dflt)

      it(should` show the count when default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` show the count when true`, () => {
        const { bar, printCalls } = testProgressBar({ showCount: true }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` not show the count when false`, () => {
        const { bar, printCalls } = testProgressBar({ showCount: false }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕████████████████████████                        ▏']);
      });
    });
    describe('showPercent', () => {
      // description: Show percentage completed - `( 69%)`
      // default: false
      // safeFn: safe.bool(v, dflt)

      it(should` not show the percentage when default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` show the percentage when true`, () => {
        const { bar, printCalls } = testProgressBar({ showPercent: true }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕███████████████              ▏ [ 50 / 100] ( 50%)']);
      });
      it(should` not show the percentage when false`, () => {
        const { bar, printCalls } = testProgressBar({ showPercent: false }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
    });
    describe('countWidth', () => {
      // description: Min width of nums for showCount - `3` => `[  1 /  15]`
      // default: 0
      // safeFn: safe.num(v, true, 0, undefined, dflt)

      it(should` set the min width of the count to default`, () => {
        const { bar, printCalls } = testProgressBar({}, 9);

        bar.set(3);
        expect(printCalls.at(-1)).toEqual(['▕█████████████                           ▏ [3 / 9]']);
      });
      it(should` set the min width of the count to 1`, () => {
        const { bar, printCalls } = testProgressBar({ countWidth: 1 }, 9);

        bar.set(3);
        expect(printCalls.at(-1)).toEqual(['▕█████████████                           ▏ [3 / 9]']);
      });
      it(should` set the min width of the count to 2`, () => {
        const { bar, printCalls } = testProgressBar({ countWidth: 2 }, 9);

        bar.set(3);
        expect(printCalls.at(-1)).toEqual(['▕█████████████                         ▏ [ 3 /  9]']);
      });
      it(should` set the min width of the count to 3`, () => {
        const { bar, printCalls } = testProgressBar({ countWidth: 3 }, 9);

        bar.set(3);
        expect(printCalls.at(-1)).toEqual(['▕████████████                        ▏ [  3 /   9]']);
      });
      it(should` set the min width of the count to 4`, () => {
        const { bar, printCalls } = testProgressBar({ countWidth: 4 }, 9);

        bar.set(3);
        expect(printCalls.at(-1)).toEqual(['▕███████████                       ▏ [   3 /    9]']);
      });
    });
    describe('progChar', () => {
      // description: Character to use for progress section of bar
      // default: '█'
      // safeFn: safe.str(v, false, dflt)

      it(should` set the progress character to default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` set the progress character to 'X'`, () => {
        const { bar, printCalls } = testProgressBar({ progChar: 'X' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕XXXXXXXXXXXXXXXXXX                  ▏ [ 50 / 100]']);
      });
      it(should` set the progress character to '='`, () => {
        const { bar, printCalls } = testProgressBar({ progChar: '=' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕==================                  ▏ [ 50 / 100]']);
      });
    });
    describe('emptyChar', () => {
      // description: Character to use for empty (rail) section of bar
      // default: ' '
      // safeFn: safe.str(v, false, dflt)

      it(should` set the empty character to default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` set the empty character to 'X'`, () => {
        const { bar, printCalls } = testProgressBar({ emptyChar: 'X' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████XXXXXXXXXXXXXXXXXX▏ [ 50 / 100]']);
      });
      it(should` set the empty character to '='`, () => {
        const { bar, printCalls } = testProgressBar({ emptyChar: '=' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████==================▏ [ 50 / 100]']);
      });
    });
    describe('startChar', () => {
      // description: Character to start the progress bar with
      // default: '▕'
      // safeFn: safe.str(v, false, dflt)

      it(should` set the start character to default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` set the start character to 'X'`, () => {
        const { bar, printCalls } = testProgressBar({ startChar: 'X' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['X██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` set the start character to '='`, () => {
        const { bar, printCalls } = testProgressBar({ startChar: '=' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['=██████████████████                  ▏ [ 50 / 100]']);
      });
    });
    describe('endChar', () => {
      // description: Character to end the progress bar with
      // default: '▏'
      // safeFn: safe.str(v, false, dflt)

      it(should` set the end character to default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` set the end character to 'X'`, () => {
        const { bar, printCalls } = testProgressBar({ endChar: 'X' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  X [ 50 / 100]']);
      });
      it(should` set the end character to '='`, () => {
        const { bar, printCalls } = testProgressBar({ endChar: '=' }, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  = [ 50 / 100]']);
      });
    });
    describe('showCurrent', () => {
      // description: Show the 'current' segment of the bar seperately
      // default: false
      // safeFn: safe.bool(v, dflt)

      it(should` not show the current segment when default`, () => {
        const { bar, printCalls } = testProgressBar({}, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████                           ▏ [1 / 3]']);
      });
      it(should` show the current segment when true`, () => {
        const { bar, printCalls } = testProgressBar({ showCurrent: true }, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████▞▞▞▞▞▞▞▞▞▞▞▞▞▞             ▏ [1 / 3]']);
      });
      it(should` not show the current segment when false`, () => {
        const { bar, printCalls } = testProgressBar({ showCurrent: false }, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████                           ▏ [1 / 3]']);
      });
    });
    describe('currentChar', () => {
      // description: Character to use the the 'current' segment
      // default: '▞'
      // safeFn: safe.str(v, false, dflt)

      it(should` set the current character to default`, () => {
        const { bar, printCalls } = testProgressBar({ showCurrent: true }, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████▞▞▞▞▞▞▞▞▞▞▞▞▞▞             ▏ [1 / 3]']);
      });
      it(should` set the current character to 'X'`, () => {
        const { bar, printCalls } = testProgressBar({ showCurrent: true, currentChar: 'X' }, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████XXXXXXXXXXXXXX             ▏ [1 / 3]']);
      });
      it(should` set the current character to '='`, () => {
        const { bar, printCalls } = testProgressBar({ showCurrent: true, currentChar: '=' }, 3);

        bar.set(1);
        expect(printCalls.at(-1)).toEqual(['▕█████████████==============             ▏ [1 / 3]']);
      });
    });
    describe('print', () => {
      // description: Whether or not to print/output/log the progress bar
      // default: true
      // safeFn: safe.bool(v, dflt)

      it(should` print/not print the progress bar when default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        const output = bar.set(50);
        const expctd = '▕██████████████████                  ▏ [ 50 / 100]';

        expect(output).toEqual(expctd);

        expect(printCalls.length).toEqual(1);
        expect(printCalls.at(-1)).toEqual([expctd]);
      });
      it(should` print the progress bar when true`, () => {
        const { bar, printCalls } = testProgressBar({ print: true }, 100);

        const output = bar.set(50);
        const expctd = '▕██████████████████                  ▏ [ 50 / 100]';

        expect(output).toEqual(expctd);

        expect(printCalls.length).toEqual(1);
        expect(printCalls.at(-1)).toEqual([expctd]);
      });
      it(should` print the progress bar when true`, () => {
        const { bar, printCalls } = testProgressBar({ print: false }, 100);

        const output = bar.set(50);
        const expctd = '▕██████████████████                  ▏ [ 50 / 100]';

        expect(output).toEqual(expctd);
        expect(printCalls.length).toEqual(0);
      });
    });
    describe('printFn', () => {
      // description: Function to use to print the progress bar
      // default: progressBar.printLn
      // safeFn: safe.func(v, dflt)

      it(should` print normally with default`, () => {
        const { bar, printCalls } = testProgressBar({}, 100);

        bar.set(50);
        expect(printCalls.at(-1)).toEqual(['▕██████████████████                  ▏ [ 50 / 100]']);
      });
      it(should` print using the provided function`, () => {
        const stub = jest.fn((line) => `{{ ${line} }}`);
        const { bar, printCalls } = testProgressBar({ printFn: stub }, 100);

        expect(printCalls.length).toEqual(0);
        expect(stub.mock.calls.length).toEqual(0);

        const output = bar.set(50);

        expect(output).toEqual('▕██████████████████                  ▏ [ 50 / 100]');
        expect(printCalls.length).toEqual(0);
        expect(stub.mock.calls.length).toEqual(1);
      });
    });
  });

  describe('getFullOptions', () => {
    singleTest(swissnode.progressBar.getFullOptions, 'getFullOptions', (getFullOptions, name) => {
      it(should` exist as ${name}`, () => {
        expect(getFullOptions).toBeDefined();
      });

      it(should` produce a full options object`, () => {
        const opts = getFullOptions({});

        process.stdout.columns = 120;

        const stringified = Object.fromEntries(
          Object.entries(opts).map(([k, v]) => {
            let newVal = v;
            if (typeof v === 'function') {
              newVal = v.toString().substring(0, 50);
            }
            return [k, newVal];
          })
        );

        expect(stringified).toEqual({
          prefix: '',
          prefixWidth: 0,
          maxPrefixWidth: Infinity,
          maxWidth: 120,
          wrapperFn: swissak.fn.noact.toString().substring(0, 50),
          barWrapFn: swissak.fn.noact.toString().substring(0, 50),
          barProgWrapFn: swissak.fn.noact.toString().substring(0, 50),
          barCurrentWrapFn: swissak.fn.noact.toString().substring(0, 50),
          barEmptyWrapFn: swissak.fn.noact.toString().substring(0, 50),
          prefixWrapFn: swissak.fn.noact.toString().substring(0, 50),
          countWrapFn: swissak.fn.noact.toString().substring(0, 50),
          percentWrapFn: swissak.fn.noact.toString().substring(0, 50),
          showCount: true,
          showPercent: false,
          countWidth: 0,
          progChar: '█',
          emptyChar: ' ',
          startChar: '▕',
          endChar: '▏',
          showCurrent: false,
          currentChar: '▞',
          print: true,
          printFn: swissnode.progressBar.utils.printLn.toString().substring(0, 50)
        });
      });

      describe('prefix', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.prefix).toEqual('');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ prefix: 'test' });
          expect(opts.prefix).toEqual('test');
        });
        kitchenSink.toEqual(
          'prefix',
          (v) => getFullOptions({ prefix: v as any }).prefix,
          kitchenSink.safe.str('', true, ''),
          kitchenSink.samples.general
        );
      });
      describe('prefixWidth', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.prefixWidth).toEqual(0);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ prefixWidth: 10 });
          expect(opts.prefixWidth).toEqual(10);
        });
        kitchenSink.toEqual(
          'prefixWidth',
          (v) => getFullOptions({ prefixWidth: v as any }).prefixWidth,
          kitchenSink.safe.num(0, true, 0, undefined, 0),
          kitchenSink.samples.num
        );
      });
      describe('maxPrefixWidth', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.maxPrefixWidth).toEqual(Infinity);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ maxPrefixWidth: 10 });
          expect(opts.maxPrefixWidth).toEqual(10);
        });
        kitchenSink.toEqual(
          'maxPrefixWidth',
          (v) => getFullOptions({ maxPrefixWidth: v as any }).maxPrefixWidth,
          kitchenSink.safe.num(Infinity, true, 0, undefined, Infinity),
          kitchenSink.samples.num
        );
      });
      describe('maxWidth', () => {
        process.stdout.columns = 120;

        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.maxWidth).toEqual(120);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ maxWidth: 10 });
          expect(opts.maxWidth).toEqual(10);
        });
        kitchenSink.toEqual(
          'maxWidth',
          (v) => getFullOptions({ maxWidth: v as any }).maxWidth,
          kitchenSink.safe.num(120, true, 0, undefined, 120),
          kitchenSink.samples.num
        );
      });
      describe('wrapperFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.wrapperFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ wrapperFn: swissak.fn.noact });
          expect(opts.wrapperFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'wrapperFn',
          (v) => getFullOptions({ wrapperFn: v as any }).wrapperFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('barWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.barWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ barWrapFn: swissak.fn.noact });
          expect(opts.barWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'barWrapFn',
          (v) => getFullOptions({ barWrapFn: v as any }).barWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('barProgWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.barProgWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ barProgWrapFn: swissak.fn.noact });
          expect(opts.barProgWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'barProgWrapFn',
          (v) => getFullOptions({ barProgWrapFn: v as any }).barProgWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('barCurrentWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.barCurrentWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ barCurrentWrapFn: swissak.fn.noact });
          expect(opts.barCurrentWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'barCurrentWrapFn',
          (v) => getFullOptions({ barCurrentWrapFn: v as any }).barCurrentWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('barEmptyWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.barEmptyWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ barEmptyWrapFn: swissak.fn.noact });
          expect(opts.barEmptyWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'barEmptyWrapFn',
          (v) => getFullOptions({ barEmptyWrapFn: v as any }).barEmptyWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('prefixWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.prefixWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ prefixWrapFn: swissak.fn.noact });
          expect(opts.prefixWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'prefixWrapFn',
          (v) => getFullOptions({ prefixWrapFn: v as any }).prefixWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('countWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.countWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ countWrapFn: swissak.fn.noact });
          expect(opts.countWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'countWrapFn',
          (v) => getFullOptions({ countWrapFn: v as any }).countWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('percentWrapFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.percentWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ percentWrapFn: swissak.fn.noact });
          expect(opts.percentWrapFn.toString()).toEqual(swissak.fn.noact.toString());
        });
        kitchenSink.toEqual(
          'percentWrapFn',
          (v) => getFullOptions({ percentWrapFn: v as any }).percentWrapFn.toString(),
          (v) => kitchenSink.safe.func(swissak.fn.noact, swissak.fn.noact)(v).toString(),
          kitchenSink.samples.general
        );
      });
      describe('showCount', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.showCount).toEqual(true);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ showCount: false });
          expect(opts.showCount).toEqual(false);
        });
        kitchenSink.toEqual(
          'showCount',
          (v) => getFullOptions({ showCount: v as any }).showCount,
          kitchenSink.safe.bool(true, true),
          kitchenSink.samples.general
        );
      });
      describe('showPercent', () => {
        // description: Show percentage completed - `( 69%)`
        // default: false
        // safeFn: safe.bool(v, dflt)

        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.showPercent).toEqual(false);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ showPercent: true });
          expect(opts.showPercent).toEqual(true);
        });
        kitchenSink.toEqual(
          'showPercent',
          (v) => getFullOptions({ showPercent: v as any }).showPercent,
          kitchenSink.safe.bool(false, false),
          kitchenSink.samples.general
        );
      });
      describe('countWidth', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.countWidth).toEqual(0);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ countWidth: 10 });
          expect(opts.countWidth).toEqual(10);
        });
        kitchenSink.toEqual(
          'countWidth',
          (v) => getFullOptions({ countWidth: v as any }).countWidth,
          kitchenSink.safe.num(0, true, 0, undefined, 0),
          kitchenSink.samples.num
        );
      });
      describe('progChar', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.progChar).toEqual('█');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ progChar: 'test' });
          expect(opts.progChar).toEqual('test');
        });
        kitchenSink.toEqual(
          'progChar',
          (v) => getFullOptions({ progChar: v as any }).progChar,
          kitchenSink.safe.str('█', false, '█'),
          kitchenSink.samples.general
        );
      });
      describe('emptyChar', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.emptyChar).toEqual(' ');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ emptyChar: 'test' });
          expect(opts.emptyChar).toEqual('test');
        });
        kitchenSink.toEqual(
          'emptyChar',
          (v) => getFullOptions({ emptyChar: v as any }).emptyChar,
          kitchenSink.safe.str(' ', false, ' '),
          kitchenSink.samples.general
        );
      });
      describe('startChar', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.startChar).toEqual('▕');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ startChar: 'test' });
          expect(opts.startChar).toEqual('test');
        });
        kitchenSink.toEqual(
          'startChar',
          (v) => getFullOptions({ startChar: v as any }).startChar,
          kitchenSink.safe.str('▕', false, '▕'),
          kitchenSink.samples.general
        );
      });
      describe('endChar', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.endChar).toEqual('▏');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ endChar: 'test' });
          expect(opts.endChar).toEqual('test');
        });
        kitchenSink.toEqual(
          'endChar',
          (v) => getFullOptions({ endChar: v as any }).endChar,
          kitchenSink.safe.str('▏', false, '▏'),
          kitchenSink.samples.general
        );
      });
      describe('showCurrent', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.showCurrent).toEqual(false);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ showCurrent: true });
          expect(opts.showCurrent).toEqual(true);
        });
        kitchenSink.toEqual(
          'showCurrent',
          (v) => getFullOptions({ showCurrent: v as any }).showCurrent,
          kitchenSink.safe.bool(false, false),
          kitchenSink.samples.general
        );
      });
      describe('currentChar', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.currentChar).toEqual('▞');
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ currentChar: 'test' });
          expect(opts.currentChar).toEqual('test');
        });
        kitchenSink.toEqual(
          'currentChar',
          (v) => getFullOptions({ currentChar: v as any }).currentChar,
          kitchenSink.safe.str('▞', false, '▞'),
          kitchenSink.samples.general
        );
      });
      describe('print', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.print).toEqual(true);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ print: false });
          expect(opts.print).toEqual(false);
        });
        kitchenSink.toEqual(
          'print',
          (v) => getFullOptions({ print: v as any }).print,
          kitchenSink.safe.bool(true, true),
          kitchenSink.samples.general
        );
      });
      describe('printFn', () => {
        it(should` default correctly`, () => {
          const opts = getFullOptions({});
          expect(opts.printFn).toEqual(swissnode.progressBar.utils.printLn);
        });
        it(should` set correctly`, () => {
          const opts = getFullOptions({ printFn: swissak.fn.noact });
          expect(opts.printFn).toEqual(swissak.fn.noact);
        });
        kitchenSink.toEqual(
          'printFn',
          (v) => getFullOptions({ printFn: v as any }).printFn,
          kitchenSink.safe.func(swissnode.progressBar.utils.printLn, swissnode.progressBar.utils.printLn),
          kitchenSink.samples.general
        );
      });
    });
  });

  describe('printLn', () => {
    singleTest(swissnode.progressBar.utils.printLn, 'progressBar.printLn', (printLn, name) => {
      it(should` exist as ${name}`, () => {
        expect(printLn).toBeDefined();
      });

      // when jest runs all the tests, these functions aren't available

      it(should` print a string to stdout`, () => {
        const { stdout, cnsle } = printSpies();
        printLn('test');
        expect(stdout.clearLine).toHaveBeenCalledWith(0);
        expect(stdout.cursorTo).toHaveBeenCalledWith(0);
        expect(stdout.moveCursor).toHaveBeenCalledWith(0, -1);
        expect(stdout.clearLine).toHaveBeenCalledWith(0);
        expect(stdout.write).toHaveBeenCalledWith('test');
        expect(stdout.write).toHaveBeenCalledWith('\n');
      });

      it(should` print an empty line to stdout if given string is empty`, () => {
        const { stdout, cnsle } = printSpies();
        printLn('');
        expect(stdout.write).toHaveBeenCalledWith('\n');
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

      it(should` have the correct functions`, () => {
        const { manager } = testMultiBarManager({}, getMultiBarManager);

        expect(manager.add).toBeDefined();
        expect(typeof manager.add).toBe('function');

        expect(manager.remove).toBeDefined();
        expect(typeof manager.remove).toBe('function');

        expect(manager.update).toBeDefined();
        expect(typeof manager.update).toBe('function');
      });

      kitchenSink.toEqual(
        'options',
        (v) => {
          const { manager, printCalls } = testMultiBarManager(v as any);
          manager.addNew(100, {}).set(50);
          return printCalls.at(-1);
        },
        kitchenSink.safe.obj({}, true),
        kitchenSink.samples.general
      );
    });
  });

  describe('MultiBarManager instance', () => {
    describe('add', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` exist as ${name + '.add'}`, () => {
          const instance = getMultiBarManager();
          expect(instance.add).toBeDefined();
          expect(typeof instance.add).toBe('function');
        });

        it(should` add a new progress bar`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = testProgressBar({}, 100).bar;
          manager.add(bar1);

          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar1);
        });
        it(should` add multiple progress bars`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = testProgressBar({}, 100).bar;
          manager.add(bar1);
          const bar2 = testProgressBar({}, 100).bar;
          manager.add(bar2);
          const bar3 = testProgressBar({}, 100).bar;
          manager.add(bar3);

          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);
        });

        kitchenSink.toEqual(
          'bar',
          (v) => {
            const { manager, printCalls } = testMultiBarManager({});
            manager.add(v as any);
            return printCalls.at(-1);
          },
          kitchenSink.safe.obj({}),
          kitchenSink.samples.general
        );
        kitchenSink.toEqual(
          'removeWhenFinished',
          (v) => {
            const { manager, printCalls } = testMultiBarManager({});
            const { bar } = testProgressBar({}, 100);
            manager.add(bar, v as any);
            return printCalls.at(-1);
          },
          kitchenSink.safe.bool(false, false),
          kitchenSink.samples.general
        );
      });
    });
    describe('addNew', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` exist as ${name + '.addNew'}`, () => {
          const instance = getMultiBarManager();
          expect(instance.addNew).toBeDefined();
          expect(typeof instance.addNew).toBe('function');
        });

        it(should` add a new progress bar`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          manager.addNew(100, {});

          expect(manager.getBars().length).toBe(1);
        });
        it(should` add multiple progress bars`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          manager.addNew(100, {});
          manager.addNew(100, {});
          manager.addNew(100, {});

          expect(manager.getBars().length).toBe(3);
        });

        kitchenSink.toEqual(
          'max',
          (v) => {
            const { manager, printCalls } = testMultiBarManager({});
            manager.addNew(v as any);
            return printCalls.at(-1);
          },
          kitchenSink.safe.num(undefined, true, -1, undefined, -1),
          kitchenSink.samples.general
        );
        kitchenSink.toEqual(
          'options',
          (v) => {
            const { manager, printCalls } = testMultiBarManager({});
            manager.addNew(100, v as any);
            return printCalls.at(-1);
          },
          kitchenSink.safe.obj({}, false, {}),
          kitchenSink.samples.general
        );
      });
    });
    describe('remove', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` exist as ${name + '.remove'}`, () => {
          const instance = getMultiBarManager();
          expect(instance.remove).toBeDefined();
          expect(typeof instance.remove).toBe('function');
        });

        it(should` remove the bars`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = testProgressBar({}, 100).bar;
          manager.add(bar1);
          const bar2 = testProgressBar({}, 100).bar;
          manager.add(bar2);
          const bar3 = testProgressBar({}, 100).bar;
          manager.add(bar3);

          expect(manager.getBars().length).toBe(3);

          manager.remove(bar2);
          expect(manager.getBars().length).toBe(2);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar3);

          manager.remove(bar1);
          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar3);

          manager.remove(bar3);
          expect(manager.getBars().length).toBe(0);
        });

        kitchenSink.toEqual(
          'bar',
          (v) => {
            const { manager, printCalls } = testMultiBarManager({});
            const { bar } = testProgressBar({}, 100);
            manager.add(bar);
            manager.remove(v as any);
            return printCalls.at(-1);
          },
          kitchenSink.safe.obj({}),
          kitchenSink.samples.general
        );
      });
    });
    describe('update', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` exist as ${name + '.update'}`, () => {
          const instance = getMultiBarManager();
          expect(instance.update).toBeDefined();
          expect(typeof instance.update).toBe('function');
        });

        it(should` render a print`, async () => {
          const { manager, printCalls } = testMultiBarManager({}, getMultiBarManager);

          manager.addNew(100, {});

          await swissak.wait(50); // wait for queue
          const numCallsBefore = printCalls.length;
          manager.update();
          await swissak.wait(50); // wait for queue
          const numCallsAfter = printCalls.length;

          expect(numCallsAfter).toBe(numCallsBefore + 1);

          expect(printCalls.at(-1)).toEqual([1, '▕                                    ▏ [  0 / 100]']);
        });
        it(should` render a print with multiple bars`, async () => {
          const { manager, printCalls } = testMultiBarManager({}, getMultiBarManager);

          expect(printCalls.length).toBe(0);
          const bar1 = manager.addNew(99, {});
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(1);
          const bar2 = manager.addNew(50, {});
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(2);
          const bar3 = manager.addNew(10, {});
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(3);

          bar1.set(25);
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(4);
          bar2.set(25);
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(5);
          bar3.set(8);
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(6);

          manager.update();
          await swissak.wait(50); // wait for queue
          expect(printCalls.length).toBe(7);

          expect(printCalls.at(-1)).toEqual([
            3,
            [
              '▕██████████                            ▏ [25 / 99]',
              '▕███████████████████                   ▏ [25 / 50]',
              '▕██████████████████████████████        ▏ [ 8 / 10]'
            ].join('\n')
          ]);
        });
      });
    });
    describe('getBars', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` exist as ${name + '.getBars'}`, () => {
          const instance = getMultiBarManager();
          expect(instance.getBars).toBeDefined();
          expect(typeof instance.getBars).toBe('function');
        });

        it(should` get the bar`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          manager.addNew(100, {});

          const result = manager.getBars();

          expect(result).toBeInstanceOf(Array);
          expect(result.length).toBe(1);
        });
        it(should` get the bars`, () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          manager.addNew(100, {});
          manager.addNew(100, {});
          manager.addNew(100, {});

          const result = manager.getBars();

          expect(result).toBeInstanceOf(Array);
          expect(result.length).toBe(3);
        });
      });
    });
  });

  describe('MultiBarManager options', () => {
    describe('numSlots', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: number;
        // Description: Shorthand for setting both minSlots and maxSlots
        // Default: `undefined`

        it(should` mean the output always has 3 lines`, async () => {
          const numSlots = 3;
          const { manager, printCalls } = testMultiBarManager({ numSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);
        });

        it(should` mean the output always has 5 lines`, async () => {
          const numSlots = 5;
          const { manager, printCalls } = testMultiBarManager({ numSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);

          manager.addNew(99, {}).set(25); // 6
          manager.addNew(50, {}).set(25); // 7
          manager.addNew(10, {}).set(8); // 8
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toEqual(numSlots);
        });
      });
    });
    describe('minSlots', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: number;
        // Description: The min number of lines to print at a time
        // Default: `0`

        it(should` mean the output always has at least 3 lines`, async () => {
          const minSlots = 3;
          const { manager, printCalls } = testMultiBarManager({ minSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);
        });

        it(should` mean the output always has at least 5 lines`, async () => {
          const minSlots = 5;
          const { manager, printCalls } = testMultiBarManager({ minSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);

          manager.addNew(99, {}).set(25); // 6
          manager.addNew(50, {}).set(25); // 7
          manager.addNew(10, {}).set(8); // 8
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeGreaterThanOrEqual(minSlots);
        });
      });
    });
    describe('maxSlots', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: number;
        // Description: The max number of lines to print at a time
        // Default: `Infinity`

        it(should` mean the output always has no more than 3 lines`, async () => {
          const maxSlots = 3;
          const { manager, printCalls } = testMultiBarManager({ maxSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);
        });

        it(should` mean the output always has no more than 5 lines`, async () => {
          const maxSlots = 5;
          const { manager, printCalls } = testMultiBarManager({ maxSlots }, getMultiBarManager);

          manager.addNew(99, {}).set(25); // 1
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);

          manager.addNew(50, {}).set(25); // 2
          manager.addNew(10, {}).set(8); // 3
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);

          manager.addNew(50, {}).set(25); // 4
          manager.addNew(10, {}).set(8); // 5
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);

          manager.addNew(99, {}).set(25); // 6
          manager.addNew(50, {}).set(25); // 7
          manager.addNew(10, {}).set(8); // 8
          await swissak.wait(50); // wait for queue
          // @ts-ignore
          expect(printCalls.at(-1)[1].split('\n').length).toBeLessThanOrEqual(maxSlots);
        });
      });
    });
    describe('removeFinished', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: boolean;
        // Description: Remove progress bars from the manager when they finish
        // Default: `false`

        it(should` not remove the bars by default`, async () => {
          const { manager } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          await swissak.wait(50); // wait for queue

          expect(manager.getBars().length).toBe(3);

          bar2.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);

          bar1.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);

          bar3.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);
        });
        it(should` remove the bars when true`, async () => {
          const { manager } = testMultiBarManager({ removeFinished: true }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          await swissak.wait(50); // wait for queue

          expect(manager.getBars().length).toBe(3);

          bar2.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(2);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar3);

          bar1.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar3);

          bar3.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(0);
        });
        it(should` not remove the bars when false`, async () => {
          const { manager } = testMultiBarManager({ removeFinished: false }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          expect(manager.getBars().length).toBe(3);

          bar2.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);

          bar1.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);

          bar3.finish();
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar2);
          expect(manager.getBars()[2]).toBe(bar3);
        });
      });
    });
    describe('alignBottom', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: boolean;
        // Description: Align the bars to the bottom of the print space
        // Default: `false`

        it(should` align the bars to the top by default`, async () => {
          const { manager, printCalls } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          await swissak.wait(50); // wait for queue

          expect(manager.getBars().length).toBe(3);

          manager.remove(bar2);
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(2);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar3);

          manager.remove(bar1);
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar3);

          expect(printCalls.at(-1)).toEqual([2, '▕███████████████████████████         ▏ [ 75 / 100]']);
        });
        it(should` align the bars to the bottom when true`, async () => {
          const { manager, printCalls } = testMultiBarManager({ alignBottom: true }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          await swissak.wait(50); // wait for queue

          expect(manager.getBars().length).toBe(3);

          manager.remove(bar2);
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(2);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar3);

          manager.remove(bar1);
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar3);

          expect(printCalls.at(-1)).toEqual([
            3,
            [
              // 3 lines
              '',
              '',
              '▕███████████████████████████         ▏ [ 75 / 100]'
            ].join('\n')
          ]);
        });
        it(should` align the bars to the top when false`, async () => {
          const { manager, printCalls } = testMultiBarManager({ alignBottom: false }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(3);

          manager.remove(bar2);
          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(2);
          expect(manager.getBars()[0]).toBe(bar1);
          expect(manager.getBars()[1]).toBe(bar3);

          manager.remove(bar1);

          await swissak.wait(50); // wait for queue
          expect(manager.getBars().length).toBe(1);
          expect(manager.getBars()[0]).toBe(bar3);

          await swissak.wait(50); // wait for queue
          expect(printCalls.at(-1)).toEqual([2, '▕███████████████████████████         ▏ [ 75 / 100]']);
        });
      });
    });
    describe('overrideOptions', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: progressBar.ProgressBarOptions;
        // Description: Override the options of the progress bars
        // Default: `{}` (No overrides)

        it(should` override the progChar option`, async () => {
          const { manager, printCalls } = testMultiBarManager({ overrideOptions: { progChar: 'X' } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            3,
            [
              // 3 lines
              '▕XXXXXXXXX                           ▏ [ 25 / 100]',
              '▕XXXXXXXXXXXXXXXXXX                  ▏ [ 50 / 100]',
              '▕XXXXXXXXXXXXXXXXXXXXXXXXXXX         ▏ [ 75 / 100]'
            ].join('\n')
          ]);
        });
        it(should` override the showPercent option`, async () => {
          const { manager, printCalls } = testMultiBarManager({ overrideOptions: { showPercent: true } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            3,
            [
              // 3 lines
              '▕███████                      ▏ [ 25 / 100] ( 25%)',
              '▕███████████████              ▏ [ 50 / 100] ( 50%)',
              '▕██████████████████████       ▏ [ 75 / 100] ( 75%)'
            ].join('\n')
          ]);
        });
      });
    });

    describe('variableOptions', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        it(should` rotate the wrapperFn values amongst the bars - using array`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager({ variableOptions: { wrapperFn: wraps } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '(1)▕█████████                           ▏ [ 25 / 100](1)',
              '(2)▕██████████████████                  ▏ [ 50 / 100](2)',
              '(3)▕███████████████████████████         ▏ [ 75 / 100](3)',
              '(1)▕████                                ▏ [ 10 / 100](1)',
              '(2)▕██████████████████████              ▏ [ 60 / 100](2)',
              '(3)▕████████████████████████████████    ▏ [ 90 / 100](3)'
            ].join('\n')
          ]);
        });
        it(should` rotate the wrapperFn values amongst the bars - using function`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            // @ts-ignore
            { variableOptions: { wrapperFn: (bar, i) => wraps[i % wraps.length] } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '(1)▕█████████                           ▏ [ 25 / 100](1)',
              '(2)▕██████████████████                  ▏ [ 50 / 100](2)',
              '(3)▕███████████████████████████         ▏ [ 75 / 100](3)',
              '(1)▕████                                ▏ [ 10 / 100](1)',
              '(2)▕██████████████████████              ▏ [ 60 / 100](2)',
              '(3)▕████████████████████████████████    ▏ [ 90 / 100](3)'
            ].join('\n')
          ]);
        });

        it(should` rotate the barWrapFn values amongst the bars - using array`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager({ variableOptions: { barWrapFn: wraps } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕(1)█████████                           (1)▏ [ 25 / 100]',
              '▕(2)██████████████████                  (2)▏ [ 50 / 100]',
              '▕(3)███████████████████████████         (3)▏ [ 75 / 100]',
              '▕(1)████                                (1)▏ [ 10 / 100]',
              '▕(2)██████████████████████              (2)▏ [ 60 / 100]',
              '▕(3)████████████████████████████████    (3)▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });
        it(should` rotate the barWrapFn values amongst the bars - using function`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            // @ts-ignore
            { variableOptions: { barWrapFn: (bar, i) => wraps[i % wraps.length] } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕(1)█████████                           (1)▏ [ 25 / 100]',
              '▕(2)██████████████████                  (2)▏ [ 50 / 100]',
              '▕(3)███████████████████████████         (3)▏ [ 75 / 100]',
              '▕(1)████                                (1)▏ [ 10 / 100]',
              '▕(2)██████████████████████              (2)▏ [ 60 / 100]',
              '▕(3)████████████████████████████████    (3)▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });

        it(should` rotate the barProgWrapFn values amongst the bars - using array`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager({ variableOptions: { barProgWrapFn: wraps } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕(1)█████████(1)                           ▏ [ 25 / 100]',
              '▕(2)██████████████████(2)                  ▏ [ 50 / 100]',
              '▕(3)███████████████████████████(3)         ▏ [ 75 / 100]',
              '▕(1)████(1)                                ▏ [ 10 / 100]',
              '▕(2)██████████████████████(2)              ▏ [ 60 / 100]',
              '▕(3)████████████████████████████████(3)    ▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });
        it(should` rotate the barProgWrapFn values amongst the bars - using function`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            // @ts-ignore
            { variableOptions: { barProgWrapFn: (bar, i) => wraps[i % wraps.length] } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕(1)█████████(1)                           ▏ [ 25 / 100]',
              '▕(2)██████████████████(2)                  ▏ [ 50 / 100]',
              '▕(3)███████████████████████████(3)         ▏ [ 75 / 100]',
              '▕(1)████(1)                                ▏ [ 10 / 100]',
              '▕(2)██████████████████████(2)              ▏ [ 60 / 100]',
              '▕(3)████████████████████████████████(3)    ▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });

        it(should` rotate the barCurrentWrapFn values amongst the bars - using array`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            { variableOptions: { barCurrentWrapFn: wraps }, overrideOptions: { showCurrent: true } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(5, {});
          const bar2 = manager.addNew(5, {});
          const bar3 = manager.addNew(5, {});
          const bar4 = manager.addNew(5, {});
          const bar5 = manager.addNew(5, {});
          const bar6 = manager.addNew(5, {});

          bar1.set(2);
          bar2.set(3);
          bar3.set(4);
          bar4.set(1);
          bar5.set(5);
          bar6.set(3);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕████████████████(1)▞▞▞▞▞▞▞▞(1)                ▏ [2 / 5]',
              '▕████████████████████████(2)▞▞▞▞▞▞▞▞(2)        ▏ [3 / 5]',
              '▕████████████████████████████████(3)▞▞▞▞▞▞▞▞(3)▏ [4 / 5]',
              '▕████████(1)▞▞▞▞▞▞▞▞(1)                        ▏ [1 / 5]',
              '▕████████████████████████████████████████(2)(2)▏ [5 / 5]',
              '▕████████████████████████(3)▞▞▞▞▞▞▞▞(3)        ▏ [3 / 5]'
            ].join('\n')
          ]);
        });
        it(should` rotate the barCurrentWrapFn values amongst the bars - using function`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            // @ts-ignore
            { variableOptions: { barCurrentWrapFn: (bar, i) => wraps[i % wraps.length] }, overrideOptions: { showCurrent: true } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(5, {});
          const bar2 = manager.addNew(5, {});
          const bar3 = manager.addNew(5, {});
          const bar4 = manager.addNew(5, {});
          const bar5 = manager.addNew(5, {});
          const bar6 = manager.addNew(5, {});

          bar1.set(2);
          bar2.set(3);
          bar3.set(4);
          bar4.set(1);
          bar5.set(5);
          bar6.set(3);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕████████████████(1)▞▞▞▞▞▞▞▞(1)                ▏ [2 / 5]',
              '▕████████████████████████(2)▞▞▞▞▞▞▞▞(2)        ▏ [3 / 5]',
              '▕████████████████████████████████(3)▞▞▞▞▞▞▞▞(3)▏ [4 / 5]',
              '▕████████(1)▞▞▞▞▞▞▞▞(1)                        ▏ [1 / 5]',
              '▕████████████████████████████████████████(2)(2)▏ [5 / 5]',
              '▕████████████████████████(3)▞▞▞▞▞▞▞▞(3)        ▏ [3 / 5]'
            ].join('\n')
          ]);
        });

        it(should` rotate the barEmptyWrapFn values amongst the bars - using array`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager({ variableOptions: { barEmptyWrapFn: wraps } }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕█████████(1)                           (1)▏ [ 25 / 100]',
              '▕██████████████████(2)                  (2)▏ [ 50 / 100]',
              '▕███████████████████████████(3)         (3)▏ [ 75 / 100]',
              '▕████(1)                                (1)▏ [ 10 / 100]',
              '▕██████████████████████(2)              (2)▏ [ 60 / 100]',
              '▕████████████████████████████████(3)    (3)▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });
        it(should` rotate the barEmptyWrapFn values amongst the bars - using function`, async () => {
          const wraps = [(s) => `(1)${s}(1)`, (s) => `(2)${s}(2)`, (s) => `(3)${s}(3)`];
          const { manager, printCalls } = testMultiBarManager(
            // @ts-ignore
            { variableOptions: { barEmptyWrapFn: (bar, i) => wraps[i % wraps.length] } },
            getMultiBarManager
          );

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});
          const bar4 = manager.addNew(100, {});
          const bar5 = manager.addNew(100, {});
          const bar6 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);
          bar4.set(10);
          bar5.set(60);
          bar6.set(90);

          await swissak.wait(50); // wait for queue

          expect(printCalls.at(-1)).toEqual([
            6,
            [
              // 6 lines
              '▕█████████(1)                           (1)▏ [ 25 / 100]',
              '▕██████████████████(2)                  (2)▏ [ 50 / 100]',
              '▕███████████████████████████(3)         (3)▏ [ 75 / 100]',
              '▕████(1)                                (1)▏ [ 10 / 100]',
              '▕██████████████████████(2)              (2)▏ [ 60 / 100]',
              '▕████████████████████████████████(3)    (3)▏ [ 90 / 100]'
            ].join('\n')
          ]);
        });
      });
    });

    describe('print', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: boolean;
        // Description: Whether or not to print the bars
        // Default: `true`

        it(should` print by default`, async () => {
          const { manager, printCalls } = testMultiBarManager({}, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue

          expect(printCalls.length).toEqual(6);
        });
        it(should` print when true`, async () => {
          const { manager, printCalls } = testMultiBarManager({ print: true }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue

          expect(printCalls.length).toEqual(6);
        });
        it(should` not print when false`, async () => {
          const { manager, printCalls } = testMultiBarManager({ print: false }, getMultiBarManager);

          expect(manager.getBars().length).toBe(0);

          const bar1 = manager.addNew(100, {});
          const bar2 = manager.addNew(100, {});
          const bar3 = manager.addNew(100, {});

          bar1.set(25);
          bar2.set(50);
          bar3.set(75);

          await swissak.wait(50); // wait for queue

          expect(printCalls.length).toEqual(0);
        });
      });
    });
    describe('printFn', () => {
      singleTest(swissnode.progressBar.getMultiBarManager, 'progressBar.getMultiBarManager', (getMultiBarManager, name) => {
        // Type: (previousDrawnLines: number, output: string) => void;
        // Description: The function to use to print the bars
        // Default: progressBar.utils.multiPrintFn
        // no tests as it's covered by all the tests that use testMultiBarManager
      });
    });
  });

  describe('getFullMultiBarManagerOptions', () => {
    singleTest(swissnode.progressBar.getFullMultiBarManagerOptions, 'progressBar.getFullMultiBarManagerOptions', (getOptions, name) => {
      it(should` exist as ${name}`, () => {
        expect(getOptions).toBeDefined();
      });

      it(should` produce a full options object`, () => {
        const opts = getOptions({});

        process.stdout.columns = 120;

        expect(opts).toEqual({
          alignBottom: false,
          maxSlots: Infinity,
          minSlots: 0,
          numSlots: null,
          overrideOptions: {},
          print: true,
          printFn: swissnode.progressBar.utils.multiPrintFn,
          removeFinished: false,
          variableOptions: {}
        });
      });

      describe('numSlots', () => {
        // Type: number;
        // Description: Shorthand for setting both minSlots and maxSlots
        // Default: `undefined`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.numSlots).toEqual(null);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ numSlots: 12 });
          expect(opts.numSlots).toEqual(12);
        });
        kitchenSink.toEqual(
          'numSlots',
          (v) => getOptions({ numSlots: v as any }).numSlots,
          // @ts-ignore
          (v) => (v === undefined ? undefined : kitchenSink.safe.num(undefined, true, 0, undefined, null)(v)),
          kitchenSink.samples.general
        );
      });

      describe('minSlots', () => {
        // Type: number;
        // Description: The min number of lines to print at a time
        // Default: `0`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.minSlots).toEqual(0);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ minSlots: 12 });
          expect(opts.minSlots).toEqual(12);
        });
        kitchenSink.toEqual(
          'minSlots',
          (v) => getOptions({ minSlots: v as any }).minSlots,
          kitchenSink.safe.num(0, true, 0, undefined, 0),
          kitchenSink.samples.num
        );
      });
      describe('maxSlots', () => {
        // Type: number;
        // Description: The max number of lines to print at a time
        // Default: `Infinity`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.maxSlots).toEqual(Infinity);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ maxSlots: 12 });
          expect(opts.maxSlots).toEqual(12);
        });
        kitchenSink.toEqual(
          'maxSlots',
          (v) => getOptions({ maxSlots: v as any }).maxSlots,
          (v) => {
            if (v === Infinity) return Infinity;
            if (v === undefined) return Infinity;
            return kitchenSink.safe.num(undefined, true, 0, undefined, undefined)(v);
          },
          kitchenSink.samples.num
        );
      });
      describe('removeFinished', () => {
        // Type: boolean;
        // Description: Remove progress bars from the manager when they finish
        // Default: `false`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.removeFinished).toEqual(false);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ removeFinished: true });
          expect(opts.removeFinished).toEqual(true);
        });
        kitchenSink.toEqual(
          'removeFinished',
          (v) => getOptions({ removeFinished: v as any }).removeFinished,
          kitchenSink.safe.bool(false, false),
          kitchenSink.samples.general
        );
      });
      describe('alignBottom', () => {
        // Type: boolean;
        // Description: Align the bars to the bottom of the print space
        // Default: `false`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.alignBottom).toEqual(false);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ alignBottom: true });
          expect(opts.alignBottom).toEqual(true);
        });
        kitchenSink.toEqual(
          'alignBottom',
          (v) => getOptions({ alignBottom: v as any }).alignBottom,
          kitchenSink.safe.bool(false, false),
          kitchenSink.samples.general
        );
      });
      describe('overrideOptions', () => {
        // Type: progressBar.ProgressBarOptions;
        // Description: Override the options of the progress bars
        // Default: `{}` (No overrides)

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.overrideOptions).toEqual({});
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ overrideOptions: { showPercent: true } });
          expect(opts.overrideOptions).toEqual({ showPercent: true });
        });
        kitchenSink.toEqual(
          'overrideOptions',
          (v) => getOptions({ overrideOptions: v as any }).overrideOptions,
          kitchenSink.safe.obj({}, true, {}),
          kitchenSink.samples.general
        );
      });
      describe('variableOptions', () => {
        // Type: MultiBarVariableOptionsConfig;
        // Description: Override options differently for each bar
        // Default: `{}` (No variable options)

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.variableOptions).toEqual({});
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ variableOptions: { showPercent: [true, false, false, true] } });
          expect(opts.variableOptions).toEqual({ showPercent: [true, false, false, true] });
        });
        kitchenSink.toEqual(
          'variableOptions',
          (v) => getOptions({ variableOptions: v as any }).variableOptions,
          kitchenSink.safe.obj({}, true, {}),
          kitchenSink.samples.general
        );
      });
      describe('print', () => {
        // Type: boolean;
        // Description: Whether or not to print the bars
        // Default: `true`

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.print).toEqual(true);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ print: false });
          expect(opts.print).toEqual(false);
        });
        kitchenSink.toEqual('print', (v) => getOptions({ print: v as any }).print, kitchenSink.safe.bool(true, true), kitchenSink.samples.general);
      });
      describe('printFn', () => {
        // Type: (previousDrawnLines: number, output: string) => void;
        // Description: The function to use to print the bars
        // Default: progressBar.utils.multiPrintFn

        it(should` default correctly`, () => {
          const opts = getOptions({});
          expect(opts.printFn).toEqual(swissnode.progressBar.utils.multiPrintFn);
        });
        it(should` set correctly`, () => {
          const opts = getOptions({ printFn: swissak.fn.noact });
          expect(opts.printFn).toEqual(swissak.fn.noact);
        });
        kitchenSink.toEqual(
          'printFn',
          (v) => getOptions({ printFn: v as any }).printFn,
          kitchenSink.safe.func(swissnode.progressBar.utils.multiPrintFn, swissnode.progressBar.utils.multiPrintFn),
          kitchenSink.samples.general
        );
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
