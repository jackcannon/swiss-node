import exp from 'constants';
import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('colr', () => {
  swissnode.colr.setOutputMode('ANSI');

  describe('styles', () => {
    describe('light', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.light'}`, () => {
          expect(colr.light).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.light).toBe('function');
          expect(typeof colr.light.red).toBe('function');
          expect(typeof colr.light.light).toBe('function');
          expect(typeof colr.light.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.light('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.light(input)).toEqual(
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\na multiline string\nwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.light(...input)).toEqual('\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m');
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.light(123)).toEqual('123');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.light(true)).toEqual('true');
        });
        it(should` wrap a null`, () => {
          expect(colr.light(null)).toEqual('');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.light(undefined)).toEqual('');
        });
        it(should` wrap an object`, () => {
          expect(colr.light({ name: 'foo' })).toEqual('{"name":"foo"}');
        });
        it(should` wrap an array`, () => {
          expect(colr.light(['foo', 'bar'])).toEqual('[foo, bar]');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.light('this is a test')).toEqual('this is a test');
          expect(colr.light.light('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.light('this is a test')).toEqual('this is a test');
          expect(colr.light.dark('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.light('this is a test')).toEqual('this is a test');
          expect(colr.light.lightBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.light('this is a test')).toEqual('this is a test');
          expect(colr.light.darkBg('this is a test')).toEqual('this is a test');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.light('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.light.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.light('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.light.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.light('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
          expect(colr.light.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.light('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.light.darkBlue.lightGreenBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.light.$`test with ${'word'} in middle`).toEqual('test with word in middle');
        });
      });
    });

    describe('dark', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.dark'}`, () => {
          expect(colr.dark).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.dark).toBe('function');
          expect(typeof colr.dark.red).toBe('function');
          expect(typeof colr.dark.light).toBe('function');
          expect(typeof colr.dark.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.dark('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.dark(input)).toEqual(
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\na multiline string\nwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.dark(...input)).toEqual('\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m');
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.dark(123)).toEqual('123');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.dark(true)).toEqual('true');
        });
        it(should` wrap a null`, () => {
          expect(colr.dark(null)).toEqual('');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.dark(undefined)).toEqual('');
        });
        it(should` wrap an object`, () => {
          expect(colr.dark({ name: 'foo' })).toEqual('{"name":"foo"}');
        });
        it(should` wrap an array`, () => {
          expect(colr.dark(['foo', 'bar'])).toEqual('[foo, bar]');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.dark('this is a test')).toEqual('this is a test');
          expect(colr.dark.light('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.dark('this is a test')).toEqual('this is a test');
          expect(colr.dark.dark('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.dark('this is a test')).toEqual('this is a test');
          expect(colr.dark.lightBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.dark('this is a test')).toEqual('this is a test');
          expect(colr.dark.darkBg('this is a test')).toEqual('this is a test');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.dark('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.dark.red('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.dark('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.dark.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.dark('this is a test')).toEqual('\u001b[31m\u001b[103mthis is a test\u001b[49m\u001b[39m');
          expect(colr.dark.red.yellowBg('this is a test')).toEqual('\u001b[31m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.dark('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.dark.darkBlue.lightGreenBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.dark.$`test with ${'word'} in middle`).toEqual('test with word in middle');
        });
      });
    });

    describe('lightBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightBg'}`, () => {
          expect(colr.lightBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightBg).toBe('function');
          expect(typeof colr.lightBg.red).toBe('function');
          expect(typeof colr.lightBg.light).toBe('function');
          expect(typeof colr.lightBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightBg(input)).toEqual(
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\na multiline string\nwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightBg(...input)).toEqual(
            '\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightBg(123)).toEqual('123');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightBg(true)).toEqual('true');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightBg(null)).toEqual('');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightBg(undefined)).toEqual('');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightBg({ name: 'foo' })).toEqual('{"name":"foo"}');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightBg(['foo', 'bar'])).toEqual('[foo, bar]');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightBg('this is a test')).toEqual('this is a test');
          expect(colr.lightBg.light('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightBg('this is a test')).toEqual('this is a test');
          expect(colr.lightBg.dark('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightBg('this is a test')).toEqual('this is a test');
          expect(colr.lightBg.lightBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightBg('this is a test')).toEqual('this is a test');
          expect(colr.lightBg.darkBg('this is a test')).toEqual('this is a test');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.lightBg.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.lightBg.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightBg.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightBg.darkBlue.lightGreenBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightBg.$`test with ${'word'} in middle`).toEqual('test with word in middle');
        });
      });
    });

    describe('darkBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkBg'}`, () => {
          expect(colr.darkBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkBg).toBe('function');
          expect(typeof colr.darkBg.red).toBe('function');
          expect(typeof colr.darkBg.light).toBe('function');
          expect(typeof colr.darkBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkBg(input)).toEqual(
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\na multiline string\nwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkBg(...input)).toEqual('\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m');
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkBg(123)).toEqual('123');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkBg(true)).toEqual('true');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkBg(null)).toEqual('');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkBg(undefined)).toEqual('');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkBg({ name: 'foo' })).toEqual('{"name":"foo"}');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkBg(['foo', 'bar'])).toEqual('[foo, bar]');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkBg('this is a test')).toEqual('this is a test');
          expect(colr.darkBg.light('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkBg('this is a test')).toEqual('this is a test');
          expect(colr.darkBg.dark('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkBg('this is a test')).toEqual('this is a test');
          expect(colr.darkBg.lightBg('this is a test')).toEqual('this is a test');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkBg('this is a test')).toEqual('this is a test');
          expect(colr.darkBg.darkBg('this is a test')).toEqual('this is a test');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.darkBg.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.darkBg.yellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkBg('this is a test')).toEqual('\u001b[91m\u001b[43mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkBg.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[43mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkBg.darkBlue.lightGreenBg('this is a test')).toEqual('\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m');
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkBg.$`test with ${'word'} in middle`).toEqual('test with word in middle');
        });
      });
    });

    describe('red', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.red'}`, () => {
          expect(colr.red).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.red).toBe('function');
          expect(typeof colr.red.red).toBe('function');
          expect(typeof colr.red.light).toBe('function');
          expect(typeof colr.red.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.red(input)).toEqual(
            '\u001b[91mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[91m in\u001b[39m\n\u001b[91ma multiline string\u001b[39m\n\u001b[91mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[91m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.red(...input)).toEqual(
            '\u001b[91m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[91m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[91m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.red(123)).toEqual('\u001b[91m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.red(true)).toEqual('\u001b[91mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.red(null)).toEqual('\u001b[91m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.red(undefined)).toEqual('\u001b[91m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.red({ name: 'foo' })).toEqual('\u001b[91m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.red(['foo', 'bar'])).toEqual('\u001b[91m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.red.light('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.red('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.red.dark('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.red.lightBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.red('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.red.darkBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.red('this is a test')).toEqual('\u001b[91m\u001b[91mthis is a test\u001b[39m\u001b[39m');
          expect(colr.red.red('this is a test')).toEqual('\u001b[91m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.red('this is a test')).toEqual('\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m');
          expect(colr.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.red('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.red.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.red('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[91mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.red.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[91m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.red.$`test with ${'word'} in middle`).toEqual('test with \u001b[91mword\u001b[39m in middle');
        });
      });
    });

    describe('darkRed', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkRed'}`, () => {
          expect(colr.darkRed).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkRed).toBe('function');
          expect(typeof colr.darkRed.red).toBe('function');
          expect(typeof colr.darkRed.light).toBe('function');
          expect(typeof colr.darkRed.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkRed('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkRed(input)).toEqual(
            '\u001b[31mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[31m in\u001b[39m\n\u001b[31ma multiline string\u001b[39m\n\u001b[31mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[31m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkRed(...input)).toEqual(
            '\u001b[31m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[31m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[31m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkRed(123)).toEqual('\u001b[31m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkRed(true)).toEqual('\u001b[31mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkRed(null)).toEqual('\u001b[31m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkRed(undefined)).toEqual('\u001b[31m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkRed({ name: 'foo' })).toEqual('\u001b[31m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkRed(['foo', 'bar'])).toEqual('\u001b[31m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkRed('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.darkRed.light('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkRed('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.darkRed.dark('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkRed('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.darkRed.lightBg('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkRed('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.darkRed.darkBg('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkRed('this is a test')).toEqual('\u001b[91m\u001b[31mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkRed.red('this is a test')).toEqual('\u001b[31m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkRed('this is a test')).toEqual('\u001b[103m\u001b[31mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkRed.yellowBg('this is a test')).toEqual('\u001b[31m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkRed('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[31mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.darkRed.red.yellowBg('this is a test')).toEqual('\u001b[31m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkRed('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[31mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkRed.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[31m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkRed.$`test with ${'word'} in middle`).toEqual('test with \u001b[31mword\u001b[39m in middle');
        });
      });
    });

    describe('lightRed', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightRed'}`, () => {
          expect(colr.lightRed).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightRed).toBe('function');
          expect(typeof colr.lightRed.red).toBe('function');
          expect(typeof colr.lightRed.light).toBe('function');
          expect(typeof colr.lightRed.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightRed('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightRed(input)).toEqual(
            '\u001b[91mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[91m in\u001b[39m\n\u001b[91ma multiline string\u001b[39m\n\u001b[91mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[91m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightRed(...input)).toEqual(
            '\u001b[91m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[91m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[91m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightRed(123)).toEqual('\u001b[91m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightRed(true)).toEqual('\u001b[91mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightRed(null)).toEqual('\u001b[91m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightRed(undefined)).toEqual('\u001b[91m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightRed({ name: 'foo' })).toEqual('\u001b[91m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightRed(['foo', 'bar'])).toEqual('\u001b[91m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightRed('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.lightRed.light('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightRed('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.lightRed.dark('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightRed('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.lightRed.lightBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightRed('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
          expect(colr.lightRed.darkBg('this is a test')).toEqual('\u001b[91mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightRed('this is a test')).toEqual('\u001b[91m\u001b[91mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightRed.red('this is a test')).toEqual('\u001b[91m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightRed('this is a test')).toEqual('\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightRed.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightRed('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.lightRed.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightRed('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[91mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightRed.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[91m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightRed.$`test with ${'word'} in middle`).toEqual('test with \u001b[91mword\u001b[39m in middle');
        });
      });
    });

    describe('green', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.green'}`, () => {
          expect(colr.green).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.green).toBe('function');
          expect(typeof colr.green.red).toBe('function');
          expect(typeof colr.green.light).toBe('function');
          expect(typeof colr.green.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.green('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.green(input)).toEqual(
            '\u001b[92mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[92m in\u001b[39m\n\u001b[92ma multiline string\u001b[39m\n\u001b[92mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.green(...input)).toEqual(
            '\u001b[92m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[92m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.green(123)).toEqual('\u001b[92m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.green(true)).toEqual('\u001b[92mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.green(null)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.green(undefined)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.green({ name: 'foo' })).toEqual('\u001b[92m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.green(['foo', 'bar'])).toEqual('\u001b[92m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.green('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.green.light('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.green('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
          expect(colr.green.dark('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.green('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.green.lightBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.green('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.green.darkBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.green('this is a test')).toEqual('\u001b[91m\u001b[92mthis is a test\u001b[39m\u001b[39m');
          expect(colr.green.red('this is a test')).toEqual('\u001b[92m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.green('this is a test')).toEqual('\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m');
          expect(colr.green.yellowBg('this is a test')).toEqual('\u001b[92m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.green('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.green.red.yellowBg('this is a test')).toEqual('\u001b[92m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.green('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.green.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[92m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.green.$`test with ${'word'} in middle`).toEqual('test with \u001b[92mword\u001b[39m in middle');
        });
      });
    });

    describe('darkGreen', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkGreen'}`, () => {
          expect(colr.darkGreen).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkGreen).toBe('function');
          expect(typeof colr.darkGreen.red).toBe('function');
          expect(typeof colr.darkGreen.light).toBe('function');
          expect(typeof colr.darkGreen.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkGreen('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkGreen(input)).toEqual(
            '\u001b[32mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[32m in\u001b[39m\n\u001b[32ma multiline string\u001b[39m\n\u001b[32mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[32m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkGreen(...input)).toEqual(
            '\u001b[32m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[32m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[32m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkGreen(123)).toEqual('\u001b[32m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkGreen(true)).toEqual('\u001b[32mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkGreen(null)).toEqual('\u001b[32m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkGreen(undefined)).toEqual('\u001b[32m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkGreen({ name: 'foo' })).toEqual('\u001b[32m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkGreen(['foo', 'bar'])).toEqual('\u001b[32m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkGreen('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
          expect(colr.darkGreen.light('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkGreen('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
          expect(colr.darkGreen.dark('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkGreen('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
          expect(colr.darkGreen.lightBg('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkGreen('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
          expect(colr.darkGreen.darkBg('this is a test')).toEqual('\u001b[32mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkGreen('this is a test')).toEqual('\u001b[91m\u001b[32mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkGreen.red('this is a test')).toEqual('\u001b[32m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkGreen('this is a test')).toEqual('\u001b[103m\u001b[32mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkGreen.yellowBg('this is a test')).toEqual('\u001b[32m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkGreen('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[32mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkGreen.red.yellowBg('this is a test')).toEqual(
            '\u001b[32m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkGreen('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[32mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkGreen.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[32m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkGreen.$`test with ${'word'} in middle`).toEqual('test with \u001b[32mword\u001b[39m in middle');
        });
      });
    });

    describe('lightGreen', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightGreen'}`, () => {
          expect(colr.lightGreen).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightGreen).toBe('function');
          expect(typeof colr.lightGreen.red).toBe('function');
          expect(typeof colr.lightGreen.light).toBe('function');
          expect(typeof colr.lightGreen.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightGreen('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightGreen(input)).toEqual(
            '\u001b[92mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[92m in\u001b[39m\n\u001b[92ma multiline string\u001b[39m\n\u001b[92mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightGreen(...input)).toEqual(
            '\u001b[92m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[92m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightGreen(123)).toEqual('\u001b[92m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightGreen(true)).toEqual('\u001b[92mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightGreen(null)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightGreen(undefined)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightGreen({ name: 'foo' })).toEqual('\u001b[92m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightGreen(['foo', 'bar'])).toEqual('\u001b[92m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightGreen('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.lightGreen.light('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightGreen('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.lightGreen.dark('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightGreen('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.lightGreen.lightBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightGreen('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.lightGreen.darkBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightGreen('this is a test')).toEqual('\u001b[91m\u001b[92mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightGreen.red('this is a test')).toEqual('\u001b[92m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightGreen('this is a test')).toEqual('\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightGreen.yellowBg('this is a test')).toEqual('\u001b[92m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightGreen('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightGreen.red.yellowBg('this is a test')).toEqual(
            '\u001b[92m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightGreen('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightGreen.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[92m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightGreen.$`test with ${'word'} in middle`).toEqual('test with \u001b[92mword\u001b[39m in middle');
        });
      });
    });

    describe('yellow', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.yellow'}`, () => {
          expect(colr.yellow).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.yellow).toBe('function');
          expect(typeof colr.yellow.red).toBe('function');
          expect(typeof colr.yellow.light).toBe('function');
          expect(typeof colr.yellow.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.yellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.yellow(input)).toEqual(
            '\u001b[93mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[93m in\u001b[39m\n\u001b[93ma multiline string\u001b[39m\n\u001b[93mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.yellow(...input)).toEqual(
            '\u001b[93m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[93m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.yellow(123)).toEqual('\u001b[93m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.yellow(true)).toEqual('\u001b[93mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.yellow(null)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.yellow(undefined)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.yellow({ name: 'foo' })).toEqual('\u001b[93m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.yellow(['foo', 'bar'])).toEqual('\u001b[93m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.yellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.yellow.light('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.yellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.yellow.dark('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.yellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.yellow.lightBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.yellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.yellow.darkBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.yellow('this is a test')).toEqual('\u001b[91m\u001b[93mthis is a test\u001b[39m\u001b[39m');
          expect(colr.yellow.red('this is a test')).toEqual('\u001b[93m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.yellow('this is a test')).toEqual('\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m');
          expect(colr.yellow.yellowBg('this is a test')).toEqual('\u001b[93m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.yellow('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.yellow.red.yellowBg('this is a test')).toEqual('\u001b[93m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.yellow('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.yellow.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[93m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.yellow.$`test with ${'word'} in middle`).toEqual('test with \u001b[93mword\u001b[39m in middle');
        });
      });
    });

    describe('darkYellow', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkYellow'}`, () => {
          expect(colr.darkYellow).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkYellow).toBe('function');
          expect(typeof colr.darkYellow.red).toBe('function');
          expect(typeof colr.darkYellow.light).toBe('function');
          expect(typeof colr.darkYellow.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkYellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkYellow(input)).toEqual(
            '\u001b[33mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[33m in\u001b[39m\n\u001b[33ma multiline string\u001b[39m\n\u001b[33mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[33m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkYellow(...input)).toEqual(
            '\u001b[33m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[33m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[33m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkYellow(123)).toEqual('\u001b[33m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkYellow(true)).toEqual('\u001b[33mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkYellow(null)).toEqual('\u001b[33m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkYellow(undefined)).toEqual('\u001b[33m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkYellow({ name: 'foo' })).toEqual('\u001b[33m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkYellow(['foo', 'bar'])).toEqual('\u001b[33m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkYellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.darkYellow.light('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkYellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.darkYellow.dark('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkYellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.darkYellow.lightBg('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkYellow('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.darkYellow.darkBg('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkYellow('this is a test')).toEqual('\u001b[91m\u001b[33mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkYellow.red('this is a test')).toEqual('\u001b[33m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkYellow('this is a test')).toEqual('\u001b[103m\u001b[33mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkYellow.yellowBg('this is a test')).toEqual('\u001b[33m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkYellow('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[33mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkYellow.red.yellowBg('this is a test')).toEqual(
            '\u001b[33m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkYellow('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[33mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkYellow.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[33m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkYellow.$`test with ${'word'} in middle`).toEqual('test with \u001b[33mword\u001b[39m in middle');
        });
      });
    });

    describe('lightYellow', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightYellow'}`, () => {
          expect(colr.lightYellow).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightYellow).toBe('function');
          expect(typeof colr.lightYellow.red).toBe('function');
          expect(typeof colr.lightYellow.light).toBe('function');
          expect(typeof colr.lightYellow.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightYellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightYellow(input)).toEqual(
            '\u001b[93mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[93m in\u001b[39m\n\u001b[93ma multiline string\u001b[39m\n\u001b[93mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightYellow(...input)).toEqual(
            '\u001b[93m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[93m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightYellow(123)).toEqual('\u001b[93m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightYellow(true)).toEqual('\u001b[93mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightYellow(null)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightYellow(undefined)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightYellow({ name: 'foo' })).toEqual('\u001b[93m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightYellow(['foo', 'bar'])).toEqual('\u001b[93m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightYellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.lightYellow.light('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightYellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.lightYellow.dark('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightYellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.lightYellow.lightBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightYellow('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.lightYellow.darkBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightYellow('this is a test')).toEqual('\u001b[91m\u001b[93mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightYellow.red('this is a test')).toEqual('\u001b[93m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightYellow('this is a test')).toEqual('\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightYellow.yellowBg('this is a test')).toEqual('\u001b[93m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightYellow('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightYellow.red.yellowBg('this is a test')).toEqual(
            '\u001b[93m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightYellow('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightYellow.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[93m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightYellow.$`test with ${'word'} in middle`).toEqual('test with \u001b[93mword\u001b[39m in middle');
        });
      });
    });

    describe('blue', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.blue'}`, () => {
          expect(colr.blue).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.blue).toBe('function');
          expect(typeof colr.blue.red).toBe('function');
          expect(typeof colr.blue.light).toBe('function');
          expect(typeof colr.blue.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.blue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.blue(input)).toEqual(
            '\u001b[94mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[94m in\u001b[39m\n\u001b[94ma multiline string\u001b[39m\n\u001b[94mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.blue(...input)).toEqual(
            '\u001b[94m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[94m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.blue(123)).toEqual('\u001b[94m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.blue(true)).toEqual('\u001b[94mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.blue(null)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.blue(undefined)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.blue({ name: 'foo' })).toEqual('\u001b[94m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.blue(['foo', 'bar'])).toEqual('\u001b[94m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.blue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.blue.light('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.blue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
          expect(colr.blue.dark('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.blue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.blue.lightBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.blue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.blue.darkBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.blue('this is a test')).toEqual('\u001b[91m\u001b[94mthis is a test\u001b[39m\u001b[39m');
          expect(colr.blue.red('this is a test')).toEqual('\u001b[94m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.blue('this is a test')).toEqual('\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m');
          expect(colr.blue.yellowBg('this is a test')).toEqual('\u001b[94m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.blue('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.blue.red.yellowBg('this is a test')).toEqual('\u001b[94m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.blue('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.blue.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[94m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.blue.$`test with ${'word'} in middle`).toEqual('test with \u001b[94mword\u001b[39m in middle');
        });
      });
    });

    describe('darkBlue', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkBlue'}`, () => {
          expect(colr.darkBlue).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkBlue).toBe('function');
          expect(typeof colr.darkBlue.red).toBe('function');
          expect(typeof colr.darkBlue.light).toBe('function');
          expect(typeof colr.darkBlue.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkBlue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkBlue(input)).toEqual(
            '\u001b[34mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[34m in\u001b[39m\n\u001b[34ma multiline string\u001b[39m\n\u001b[34mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[34m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkBlue(...input)).toEqual(
            '\u001b[34m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[34m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[34m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkBlue(123)).toEqual('\u001b[34m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkBlue(true)).toEqual('\u001b[34mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkBlue(null)).toEqual('\u001b[34m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkBlue(undefined)).toEqual('\u001b[34m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkBlue({ name: 'foo' })).toEqual('\u001b[34m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkBlue(['foo', 'bar'])).toEqual('\u001b[34m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkBlue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
          expect(colr.darkBlue.light('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkBlue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
          expect(colr.darkBlue.dark('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkBlue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
          expect(colr.darkBlue.lightBg('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkBlue('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
          expect(colr.darkBlue.darkBg('this is a test')).toEqual('\u001b[34mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkBlue('this is a test')).toEqual('\u001b[91m\u001b[34mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkBlue.red('this is a test')).toEqual('\u001b[34m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkBlue('this is a test')).toEqual('\u001b[103m\u001b[34mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkBlue.yellowBg('this is a test')).toEqual('\u001b[34m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkBlue('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[34mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.darkBlue.red.yellowBg('this is a test')).toEqual('\u001b[34m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkBlue('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[34mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlue.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[34m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkBlue.$`test with ${'word'} in middle`).toEqual('test with \u001b[34mword\u001b[39m in middle');
        });
      });
    });

    describe('lightBlue', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightBlue'}`, () => {
          expect(colr.lightBlue).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightBlue).toBe('function');
          expect(typeof colr.lightBlue.red).toBe('function');
          expect(typeof colr.lightBlue.light).toBe('function');
          expect(typeof colr.lightBlue.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightBlue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightBlue(input)).toEqual(
            '\u001b[94mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[94m in\u001b[39m\n\u001b[94ma multiline string\u001b[39m\n\u001b[94mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightBlue(...input)).toEqual(
            '\u001b[94m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[94m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightBlue(123)).toEqual('\u001b[94m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightBlue(true)).toEqual('\u001b[94mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightBlue(null)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightBlue(undefined)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightBlue({ name: 'foo' })).toEqual('\u001b[94m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightBlue(['foo', 'bar'])).toEqual('\u001b[94m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightBlue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.lightBlue.light('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightBlue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.lightBlue.dark('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightBlue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.lightBlue.lightBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightBlue('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.lightBlue.darkBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightBlue('this is a test')).toEqual('\u001b[91m\u001b[94mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightBlue.red('this is a test')).toEqual('\u001b[94m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightBlue('this is a test')).toEqual('\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightBlue.yellowBg('this is a test')).toEqual('\u001b[94m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightBlue('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlue.red.yellowBg('this is a test')).toEqual(
            '\u001b[94m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightBlue('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlue.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[94m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightBlue.$`test with ${'word'} in middle`).toEqual('test with \u001b[94mword\u001b[39m in middle');
        });
      });
    });

    describe('magenta', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.magenta'}`, () => {
          expect(colr.magenta).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.magenta).toBe('function');
          expect(typeof colr.magenta.red).toBe('function');
          expect(typeof colr.magenta.light).toBe('function');
          expect(typeof colr.magenta.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.magenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.magenta(input)).toEqual(
            '\u001b[95mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[95m in\u001b[39m\n\u001b[95ma multiline string\u001b[39m\n\u001b[95mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.magenta(...input)).toEqual(
            '\u001b[95m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[95m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.magenta(123)).toEqual('\u001b[95m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.magenta(true)).toEqual('\u001b[95mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.magenta(null)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.magenta(undefined)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.magenta({ name: 'foo' })).toEqual('\u001b[95m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.magenta(['foo', 'bar'])).toEqual('\u001b[95m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.magenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.magenta.light('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.magenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
          expect(colr.magenta.dark('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.magenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.magenta.lightBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.magenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.magenta.darkBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.magenta('this is a test')).toEqual('\u001b[91m\u001b[95mthis is a test\u001b[39m\u001b[39m');
          expect(colr.magenta.red('this is a test')).toEqual('\u001b[95m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.magenta('this is a test')).toEqual('\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m');
          expect(colr.magenta.yellowBg('this is a test')).toEqual('\u001b[95m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.magenta('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.magenta.red.yellowBg('this is a test')).toEqual('\u001b[95m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.magenta('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.magenta.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[95m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.magenta.$`test with ${'word'} in middle`).toEqual('test with \u001b[95mword\u001b[39m in middle');
        });
      });
    });

    describe('darkMagenta', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkMagenta'}`, () => {
          expect(colr.darkMagenta).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkMagenta).toBe('function');
          expect(typeof colr.darkMagenta.red).toBe('function');
          expect(typeof colr.darkMagenta.light).toBe('function');
          expect(typeof colr.darkMagenta.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkMagenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkMagenta(input)).toEqual(
            '\u001b[35mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[35m in\u001b[39m\n\u001b[35ma multiline string\u001b[39m\n\u001b[35mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[35m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkMagenta(...input)).toEqual(
            '\u001b[35m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[35m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[35m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkMagenta(123)).toEqual('\u001b[35m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkMagenta(true)).toEqual('\u001b[35mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkMagenta(null)).toEqual('\u001b[35m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkMagenta(undefined)).toEqual('\u001b[35m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkMagenta({ name: 'foo' })).toEqual('\u001b[35m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkMagenta(['foo', 'bar'])).toEqual('\u001b[35m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkMagenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
          expect(colr.darkMagenta.light('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkMagenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
          expect(colr.darkMagenta.dark('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkMagenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
          expect(colr.darkMagenta.lightBg('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkMagenta('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
          expect(colr.darkMagenta.darkBg('this is a test')).toEqual('\u001b[35mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkMagenta('this is a test')).toEqual('\u001b[91m\u001b[35mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkMagenta.red('this is a test')).toEqual('\u001b[35m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkMagenta('this is a test')).toEqual('\u001b[103m\u001b[35mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkMagenta.yellowBg('this is a test')).toEqual('\u001b[35m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkMagenta('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[35mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkMagenta.red.yellowBg('this is a test')).toEqual(
            '\u001b[35m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkMagenta('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[35mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkMagenta.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[35m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkMagenta.$`test with ${'word'} in middle`).toEqual('test with \u001b[35mword\u001b[39m in middle');
        });
      });
    });

    describe('lightMagenta', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightMagenta'}`, () => {
          expect(colr.lightMagenta).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightMagenta).toBe('function');
          expect(typeof colr.lightMagenta.red).toBe('function');
          expect(typeof colr.lightMagenta.light).toBe('function');
          expect(typeof colr.lightMagenta.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightMagenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightMagenta(input)).toEqual(
            '\u001b[95mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[95m in\u001b[39m\n\u001b[95ma multiline string\u001b[39m\n\u001b[95mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightMagenta(...input)).toEqual(
            '\u001b[95m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[95m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightMagenta(123)).toEqual('\u001b[95m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightMagenta(true)).toEqual('\u001b[95mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightMagenta(null)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightMagenta(undefined)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightMagenta({ name: 'foo' })).toEqual('\u001b[95m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightMagenta(['foo', 'bar'])).toEqual('\u001b[95m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightMagenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.lightMagenta.light('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightMagenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.lightMagenta.dark('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightMagenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.lightMagenta.lightBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightMagenta('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.lightMagenta.darkBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightMagenta('this is a test')).toEqual('\u001b[91m\u001b[95mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightMagenta.red('this is a test')).toEqual('\u001b[95m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightMagenta('this is a test')).toEqual('\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightMagenta.yellowBg('this is a test')).toEqual('\u001b[95m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightMagenta('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightMagenta.red.yellowBg('this is a test')).toEqual(
            '\u001b[95m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightMagenta('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightMagenta.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[95m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightMagenta.$`test with ${'word'} in middle`).toEqual('test with \u001b[95mword\u001b[39m in middle');
        });
      });
    });

    describe('cyan', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.cyan'}`, () => {
          expect(colr.cyan).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.cyan).toBe('function');
          expect(typeof colr.cyan.red).toBe('function');
          expect(typeof colr.cyan.light).toBe('function');
          expect(typeof colr.cyan.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.cyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.cyan(input)).toEqual(
            '\u001b[96mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[96m in\u001b[39m\n\u001b[96ma multiline string\u001b[39m\n\u001b[96mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[96m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.cyan(...input)).toEqual(
            '\u001b[96m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[96m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[96m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.cyan(123)).toEqual('\u001b[96m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.cyan(true)).toEqual('\u001b[96mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.cyan(null)).toEqual('\u001b[96m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.cyan(undefined)).toEqual('\u001b[96m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.cyan({ name: 'foo' })).toEqual('\u001b[96m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.cyan(['foo', 'bar'])).toEqual('\u001b[96m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.cyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.cyan.light('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.cyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
          expect(colr.cyan.dark('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.cyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.cyan.lightBg('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.cyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.cyan.darkBg('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.cyan('this is a test')).toEqual('\u001b[91m\u001b[96mthis is a test\u001b[39m\u001b[39m');
          expect(colr.cyan.red('this is a test')).toEqual('\u001b[96m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.cyan('this is a test')).toEqual('\u001b[103m\u001b[96mthis is a test\u001b[39m\u001b[49m');
          expect(colr.cyan.yellowBg('this is a test')).toEqual('\u001b[96m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.cyan('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[96mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.cyan.red.yellowBg('this is a test')).toEqual('\u001b[96m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.cyan('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[96mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.cyan.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[96m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.cyan.$`test with ${'word'} in middle`).toEqual('test with \u001b[96mword\u001b[39m in middle');
        });
      });
    });

    describe('darkCyan', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkCyan'}`, () => {
          expect(colr.darkCyan).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkCyan).toBe('function');
          expect(typeof colr.darkCyan.red).toBe('function');
          expect(typeof colr.darkCyan.light).toBe('function');
          expect(typeof colr.darkCyan.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkCyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkCyan(input)).toEqual(
            '\u001b[36mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[36m in\u001b[39m\n\u001b[36ma multiline string\u001b[39m\n\u001b[36mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[36m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkCyan(...input)).toEqual(
            '\u001b[36m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[36m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[36m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkCyan(123)).toEqual('\u001b[36m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkCyan(true)).toEqual('\u001b[36mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkCyan(null)).toEqual('\u001b[36m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkCyan(undefined)).toEqual('\u001b[36m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkCyan({ name: 'foo' })).toEqual('\u001b[36m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkCyan(['foo', 'bar'])).toEqual('\u001b[36m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkCyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
          expect(colr.darkCyan.light('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkCyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
          expect(colr.darkCyan.dark('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkCyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
          expect(colr.darkCyan.lightBg('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkCyan('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
          expect(colr.darkCyan.darkBg('this is a test')).toEqual('\u001b[36mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkCyan('this is a test')).toEqual('\u001b[91m\u001b[36mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkCyan.red('this is a test')).toEqual('\u001b[36m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkCyan('this is a test')).toEqual('\u001b[103m\u001b[36mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkCyan.yellowBg('this is a test')).toEqual('\u001b[36m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkCyan('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[36mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.darkCyan.red.yellowBg('this is a test')).toEqual('\u001b[36m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkCyan('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[36mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkCyan.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[36m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkCyan.$`test with ${'word'} in middle`).toEqual('test with \u001b[36mword\u001b[39m in middle');
        });
      });
    });

    describe('lightCyan', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightCyan'}`, () => {
          expect(colr.lightCyan).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightCyan).toBe('function');
          expect(typeof colr.lightCyan.red).toBe('function');
          expect(typeof colr.lightCyan.light).toBe('function');
          expect(typeof colr.lightCyan.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightCyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightCyan(input)).toEqual(
            '\u001b[96mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[96m in\u001b[39m\n\u001b[96ma multiline string\u001b[39m\n\u001b[96mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[96m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightCyan(...input)).toEqual(
            '\u001b[96m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[96m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[96m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightCyan(123)).toEqual('\u001b[96m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightCyan(true)).toEqual('\u001b[96mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightCyan(null)).toEqual('\u001b[96m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightCyan(undefined)).toEqual('\u001b[96m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightCyan({ name: 'foo' })).toEqual('\u001b[96m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightCyan(['foo', 'bar'])).toEqual('\u001b[96m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightCyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.lightCyan.light('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightCyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.lightCyan.dark('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightCyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.lightCyan.lightBg('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightCyan('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
          expect(colr.lightCyan.darkBg('this is a test')).toEqual('\u001b[96mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightCyan('this is a test')).toEqual('\u001b[91m\u001b[96mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightCyan.red('this is a test')).toEqual('\u001b[96m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightCyan('this is a test')).toEqual('\u001b[103m\u001b[96mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightCyan.yellowBg('this is a test')).toEqual('\u001b[96m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightCyan('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[96mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightCyan.red.yellowBg('this is a test')).toEqual(
            '\u001b[96m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightCyan('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[96mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightCyan.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[96m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightCyan.$`test with ${'word'} in middle`).toEqual('test with \u001b[96mword\u001b[39m in middle');
        });
      });
    });

    describe('white', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.white'}`, () => {
          expect(colr.white).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.white).toBe('function');
          expect(typeof colr.white.red).toBe('function');
          expect(typeof colr.white.light).toBe('function');
          expect(typeof colr.white.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.white('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.white(input)).toEqual(
            '\u001b[97mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[97m in\u001b[39m\n\u001b[97ma multiline string\u001b[39m\n\u001b[97mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.white(...input)).toEqual(
            '\u001b[97m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[97m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.white(123)).toEqual('\u001b[97m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.white(true)).toEqual('\u001b[97mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.white(null)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.white(undefined)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.white({ name: 'foo' })).toEqual('\u001b[97m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.white(['foo', 'bar'])).toEqual('\u001b[97m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.white('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.white.light('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.white('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.white.dark('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.white('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.white.lightBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.white('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.white.darkBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.white('this is a test')).toEqual('\u001b[91m\u001b[97mthis is a test\u001b[39m\u001b[39m');
          expect(colr.white.red('this is a test')).toEqual('\u001b[97m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.white('this is a test')).toEqual('\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m');
          expect(colr.white.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.white('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.white.red.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.white('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.white.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[97m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.white.$`test with ${'word'} in middle`).toEqual('test with \u001b[97mword\u001b[39m in middle');
        });
      });
    });

    describe('darkWhite', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkWhite'}`, () => {
          expect(colr.darkWhite).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkWhite).toBe('function');
          expect(typeof colr.darkWhite.red).toBe('function');
          expect(typeof colr.darkWhite.light).toBe('function');
          expect(typeof colr.darkWhite.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkWhite('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkWhite(input)).toEqual(
            '\u001b[37mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[37m in\u001b[39m\n\u001b[37ma multiline string\u001b[39m\n\u001b[37mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[37m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkWhite(...input)).toEqual(
            '\u001b[37m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[37m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[37m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkWhite(123)).toEqual('\u001b[37m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkWhite(true)).toEqual('\u001b[37mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkWhite(null)).toEqual('\u001b[37m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkWhite(undefined)).toEqual('\u001b[37m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkWhite({ name: 'foo' })).toEqual('\u001b[37m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkWhite(['foo', 'bar'])).toEqual('\u001b[37m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkWhite('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.darkWhite.light('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkWhite('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.darkWhite.dark('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkWhite('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.darkWhite.lightBg('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkWhite('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.darkWhite.darkBg('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkWhite('this is a test')).toEqual('\u001b[91m\u001b[37mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkWhite.red('this is a test')).toEqual('\u001b[37m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkWhite('this is a test')).toEqual('\u001b[103m\u001b[37mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkWhite.yellowBg('this is a test')).toEqual('\u001b[37m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkWhite('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[37mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkWhite.red.yellowBg('this is a test')).toEqual(
            '\u001b[37m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkWhite('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[37mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkWhite.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[37m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkWhite.$`test with ${'word'} in middle`).toEqual('test with \u001b[37mword\u001b[39m in middle');
        });
      });
    });

    describe('lightWhite', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightWhite'}`, () => {
          expect(colr.lightWhite).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightWhite).toBe('function');
          expect(typeof colr.lightWhite.red).toBe('function');
          expect(typeof colr.lightWhite.light).toBe('function');
          expect(typeof colr.lightWhite.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightWhite('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightWhite(input)).toEqual(
            '\u001b[97mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[97m in\u001b[39m\n\u001b[97ma multiline string\u001b[39m\n\u001b[97mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightWhite(...input)).toEqual(
            '\u001b[97m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[97m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightWhite(123)).toEqual('\u001b[97m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightWhite(true)).toEqual('\u001b[97mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightWhite(null)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightWhite(undefined)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightWhite({ name: 'foo' })).toEqual('\u001b[97m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightWhite(['foo', 'bar'])).toEqual('\u001b[97m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightWhite('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.lightWhite.light('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightWhite('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.lightWhite.dark('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightWhite('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.lightWhite.lightBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightWhite('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.lightWhite.darkBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightWhite('this is a test')).toEqual('\u001b[91m\u001b[97mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightWhite.red('this is a test')).toEqual('\u001b[97m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightWhite('this is a test')).toEqual('\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightWhite.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightWhite('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightWhite.red.yellowBg('this is a test')).toEqual(
            '\u001b[97m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightWhite('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightWhite.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[97m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightWhite.$`test with ${'word'} in middle`).toEqual('test with \u001b[97mword\u001b[39m in middle');
        });
      });
    });

    describe('redBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.redBg'}`, () => {
          expect(colr.redBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.redBg).toBe('function');
          expect(typeof colr.redBg.red).toBe('function');
          expect(typeof colr.redBg.light).toBe('function');
          expect(typeof colr.redBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.redBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.redBg(input)).toEqual(
            '\u001b[101mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[101m\u001b[39m in\u001b[49m\n\u001b[101ma multiline string\u001b[49m\n\u001b[101mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[101m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.redBg(...input)).toEqual(
            '\u001b[101m\u001b[31m\u001b[103mword\u001b[49m\u001b[101m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[101m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.redBg(123)).toEqual('\u001b[101m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.redBg(true)).toEqual('\u001b[101mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.redBg(null)).toEqual('\u001b[101m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.redBg(undefined)).toEqual('\u001b[101m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.redBg({ name: 'foo' })).toEqual('\u001b[101m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.redBg(['foo', 'bar'])).toEqual('\u001b[101m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.redBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.redBg.light('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.redBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.redBg.dark('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.redBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.redBg.lightBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.redBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
          expect(colr.redBg.darkBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.redBg('this is a test')).toEqual('\u001b[91m\u001b[101mthis is a test\u001b[49m\u001b[39m');
          expect(colr.redBg.red('this is a test')).toEqual('\u001b[101m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.redBg('this is a test')).toEqual('\u001b[103m\u001b[101mthis is a test\u001b[49m\u001b[49m');
          expect(colr.redBg.yellowBg('this is a test')).toEqual('\u001b[101m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.redBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[101mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.redBg.red.yellowBg('this is a test')).toEqual('\u001b[101m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.redBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[101mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.redBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[101m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.redBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[101mword\u001b[49m in middle');
        });
      });
    });

    describe('darkRedBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkRedBg'}`, () => {
          expect(colr.darkRedBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkRedBg).toBe('function');
          expect(typeof colr.darkRedBg.red).toBe('function');
          expect(typeof colr.darkRedBg.light).toBe('function');
          expect(typeof colr.darkRedBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkRedBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkRedBg(input)).toEqual(
            '\u001b[41mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[41m\u001b[39m in\u001b[49m\n\u001b[41ma multiline string\u001b[49m\n\u001b[41mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[41m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkRedBg(...input)).toEqual(
            '\u001b[41m\u001b[31m\u001b[103mword\u001b[49m\u001b[41m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[41m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkRedBg(123)).toEqual('\u001b[41m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkRedBg(true)).toEqual('\u001b[41mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkRedBg(null)).toEqual('\u001b[41m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkRedBg(undefined)).toEqual('\u001b[41m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkRedBg({ name: 'foo' })).toEqual('\u001b[41m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkRedBg(['foo', 'bar'])).toEqual('\u001b[41m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkRedBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
          expect(colr.darkRedBg.light('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkRedBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
          expect(colr.darkRedBg.dark('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkRedBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
          expect(colr.darkRedBg.lightBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkRedBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
          expect(colr.darkRedBg.darkBg('this is a test')).toEqual('\u001b[41mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkRedBg('this is a test')).toEqual('\u001b[91m\u001b[41mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkRedBg.red('this is a test')).toEqual('\u001b[41m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkRedBg('this is a test')).toEqual('\u001b[103m\u001b[41mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkRedBg.yellowBg('this is a test')).toEqual('\u001b[41m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkRedBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[41mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkRedBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[41m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkRedBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[41mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkRedBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[41m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkRedBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[41mword\u001b[49m in middle');
        });
      });
    });

    describe('lightRedBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightRedBg'}`, () => {
          expect(colr.lightRedBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightRedBg).toBe('function');
          expect(typeof colr.lightRedBg.red).toBe('function');
          expect(typeof colr.lightRedBg.light).toBe('function');
          expect(typeof colr.lightRedBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightRedBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightRedBg(input)).toEqual(
            '\u001b[101mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[101m\u001b[39m in\u001b[49m\n\u001b[101ma multiline string\u001b[49m\n\u001b[101mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[101m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightRedBg(...input)).toEqual(
            '\u001b[101m\u001b[31m\u001b[103mword\u001b[49m\u001b[101m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[101m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightRedBg(123)).toEqual('\u001b[101m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightRedBg(true)).toEqual('\u001b[101mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightRedBg(null)).toEqual('\u001b[101m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightRedBg(undefined)).toEqual('\u001b[101m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightRedBg({ name: 'foo' })).toEqual('\u001b[101m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightRedBg(['foo', 'bar'])).toEqual('\u001b[101m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightRedBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.lightRedBg.light('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightRedBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.lightRedBg.dark('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightRedBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.lightRedBg.lightBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightRedBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
          expect(colr.lightRedBg.darkBg('this is a test')).toEqual('\u001b[101mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightRedBg('this is a test')).toEqual('\u001b[91m\u001b[101mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightRedBg.red('this is a test')).toEqual('\u001b[101m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightRedBg('this is a test')).toEqual('\u001b[103m\u001b[101mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightRedBg.yellowBg('this is a test')).toEqual('\u001b[101m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightRedBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[101mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightRedBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[101m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightRedBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[101mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightRedBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[101m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightRedBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[101mword\u001b[49m in middle');
        });
      });
    });

    describe('greenBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.greenBg'}`, () => {
          expect(colr.greenBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.greenBg).toBe('function');
          expect(typeof colr.greenBg.red).toBe('function');
          expect(typeof colr.greenBg.light).toBe('function');
          expect(typeof colr.greenBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.greenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.greenBg(input)).toEqual(
            '\u001b[102mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[102m\u001b[39m in\u001b[49m\n\u001b[102ma multiline string\u001b[49m\n\u001b[102mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[102m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.greenBg(...input)).toEqual(
            '\u001b[102m\u001b[31m\u001b[103mword\u001b[49m\u001b[102m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[102m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.greenBg(123)).toEqual('\u001b[102m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.greenBg(true)).toEqual('\u001b[102mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.greenBg(null)).toEqual('\u001b[102m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.greenBg(undefined)).toEqual('\u001b[102m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.greenBg({ name: 'foo' })).toEqual('\u001b[102m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.greenBg(['foo', 'bar'])).toEqual('\u001b[102m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.greenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.greenBg.light('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.greenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.greenBg.dark('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.greenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.greenBg.lightBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.greenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
          expect(colr.greenBg.darkBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.greenBg('this is a test')).toEqual('\u001b[91m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.greenBg.red('this is a test')).toEqual('\u001b[102m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.greenBg('this is a test')).toEqual('\u001b[103m\u001b[102mthis is a test\u001b[49m\u001b[49m');
          expect(colr.greenBg.yellowBg('this is a test')).toEqual('\u001b[102m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.greenBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[102mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.greenBg.red.yellowBg('this is a test')).toEqual('\u001b[102m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.greenBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[102mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.greenBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[102m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.greenBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[102mword\u001b[49m in middle');
        });
      });
    });

    describe('darkGreenBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkGreenBg'}`, () => {
          expect(colr.darkGreenBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkGreenBg).toBe('function');
          expect(typeof colr.darkGreenBg.red).toBe('function');
          expect(typeof colr.darkGreenBg.light).toBe('function');
          expect(typeof colr.darkGreenBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkGreenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkGreenBg(input)).toEqual(
            '\u001b[42mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[42m\u001b[39m in\u001b[49m\n\u001b[42ma multiline string\u001b[49m\n\u001b[42mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[42m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkGreenBg(...input)).toEqual(
            '\u001b[42m\u001b[31m\u001b[103mword\u001b[49m\u001b[42m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[42m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkGreenBg(123)).toEqual('\u001b[42m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkGreenBg(true)).toEqual('\u001b[42mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkGreenBg(null)).toEqual('\u001b[42m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkGreenBg(undefined)).toEqual('\u001b[42m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkGreenBg({ name: 'foo' })).toEqual('\u001b[42m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkGreenBg(['foo', 'bar'])).toEqual('\u001b[42m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkGreenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
          expect(colr.darkGreenBg.light('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkGreenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
          expect(colr.darkGreenBg.dark('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkGreenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
          expect(colr.darkGreenBg.lightBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkGreenBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
          expect(colr.darkGreenBg.darkBg('this is a test')).toEqual('\u001b[42mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkGreenBg('this is a test')).toEqual('\u001b[91m\u001b[42mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkGreenBg.red('this is a test')).toEqual('\u001b[42m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkGreenBg('this is a test')).toEqual('\u001b[103m\u001b[42mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkGreenBg.yellowBg('this is a test')).toEqual('\u001b[42m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkGreenBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[42mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkGreenBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[42m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkGreenBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[42mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkGreenBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[42m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkGreenBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[42mword\u001b[49m in middle');
        });
      });
    });

    describe('lightGreenBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightGreenBg'}`, () => {
          expect(colr.lightGreenBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightGreenBg).toBe('function');
          expect(typeof colr.lightGreenBg.red).toBe('function');
          expect(typeof colr.lightGreenBg.light).toBe('function');
          expect(typeof colr.lightGreenBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightGreenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightGreenBg(input)).toEqual(
            '\u001b[102mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[102m\u001b[39m in\u001b[49m\n\u001b[102ma multiline string\u001b[49m\n\u001b[102mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[102m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightGreenBg(...input)).toEqual(
            '\u001b[102m\u001b[31m\u001b[103mword\u001b[49m\u001b[102m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[102m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightGreenBg(123)).toEqual('\u001b[102m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightGreenBg(true)).toEqual('\u001b[102mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightGreenBg(null)).toEqual('\u001b[102m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightGreenBg(undefined)).toEqual('\u001b[102m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightGreenBg({ name: 'foo' })).toEqual('\u001b[102m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightGreenBg(['foo', 'bar'])).toEqual('\u001b[102m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightGreenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.lightGreenBg.light('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightGreenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.lightGreenBg.dark('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightGreenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.lightGreenBg.lightBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightGreenBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
          expect(colr.lightGreenBg.darkBg('this is a test')).toEqual('\u001b[102mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightGreenBg('this is a test')).toEqual('\u001b[91m\u001b[102mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightGreenBg.red('this is a test')).toEqual('\u001b[102m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightGreenBg('this is a test')).toEqual('\u001b[103m\u001b[102mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightGreenBg.yellowBg('this is a test')).toEqual('\u001b[102m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightGreenBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[102mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightGreenBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[102m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightGreenBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[102mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightGreenBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[102m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightGreenBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[102mword\u001b[49m in middle');
        });
      });
    });

    describe('yellowBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.yellowBg'}`, () => {
          expect(colr.yellowBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.yellowBg).toBe('function');
          expect(typeof colr.yellowBg.red).toBe('function');
          expect(typeof colr.yellowBg.light).toBe('function');
          expect(typeof colr.yellowBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.yellowBg(input)).toEqual(
            '\u001b[103mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[103m\u001b[39m in\u001b[49m\n\u001b[103ma multiline string\u001b[49m\n\u001b[103mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[103m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.yellowBg(...input)).toEqual(
            '\u001b[103m\u001b[31m\u001b[103mword\u001b[49m\u001b[103m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[103m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.yellowBg(123)).toEqual('\u001b[103m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.yellowBg(true)).toEqual('\u001b[103mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.yellowBg(null)).toEqual('\u001b[103m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.yellowBg(undefined)).toEqual('\u001b[103m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.yellowBg({ name: 'foo' })).toEqual('\u001b[103m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.yellowBg(['foo', 'bar'])).toEqual('\u001b[103m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.yellowBg.light('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.yellowBg.dark('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.yellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.yellowBg.lightBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.yellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.yellowBg.darkBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.yellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
          expect(colr.yellowBg.red('this is a test')).toEqual('\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.yellowBg('this is a test')).toEqual('\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m');
          expect(colr.yellowBg.yellowBg('this is a test')).toEqual('\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.yellowBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.yellowBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[103m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.yellowBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[103mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.yellowBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[103m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.yellowBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[103mword\u001b[49m in middle');
        });
      });
    });

    describe('darkYellowBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkYellowBg'}`, () => {
          expect(colr.darkYellowBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkYellowBg).toBe('function');
          expect(typeof colr.darkYellowBg.red).toBe('function');
          expect(typeof colr.darkYellowBg.light).toBe('function');
          expect(typeof colr.darkYellowBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkYellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkYellowBg(input)).toEqual(
            '\u001b[43mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[43m\u001b[39m in\u001b[49m\n\u001b[43ma multiline string\u001b[49m\n\u001b[43mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[43m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkYellowBg(...input)).toEqual(
            '\u001b[43m\u001b[31m\u001b[103mword\u001b[49m\u001b[43m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[43m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkYellowBg(123)).toEqual('\u001b[43m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkYellowBg(true)).toEqual('\u001b[43mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkYellowBg(null)).toEqual('\u001b[43m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkYellowBg(undefined)).toEqual('\u001b[43m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkYellowBg({ name: 'foo' })).toEqual('\u001b[43m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkYellowBg(['foo', 'bar'])).toEqual('\u001b[43m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkYellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.darkYellowBg.light('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkYellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.darkYellowBg.dark('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkYellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.darkYellowBg.lightBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkYellowBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
          expect(colr.darkYellowBg.darkBg('this is a test')).toEqual('\u001b[43mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkYellowBg('this is a test')).toEqual('\u001b[91m\u001b[43mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkYellowBg.red('this is a test')).toEqual('\u001b[43m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkYellowBg('this is a test')).toEqual('\u001b[103m\u001b[43mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkYellowBg.yellowBg('this is a test')).toEqual('\u001b[43m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkYellowBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[43mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkYellowBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[43m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkYellowBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[43mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkYellowBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[43m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkYellowBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[43mword\u001b[49m in middle');
        });
      });
    });

    describe('lightYellowBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightYellowBg'}`, () => {
          expect(colr.lightYellowBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightYellowBg).toBe('function');
          expect(typeof colr.lightYellowBg.red).toBe('function');
          expect(typeof colr.lightYellowBg.light).toBe('function');
          expect(typeof colr.lightYellowBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightYellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightYellowBg(input)).toEqual(
            '\u001b[103mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[103m\u001b[39m in\u001b[49m\n\u001b[103ma multiline string\u001b[49m\n\u001b[103mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[103m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightYellowBg(...input)).toEqual(
            '\u001b[103m\u001b[31m\u001b[103mword\u001b[49m\u001b[103m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[103m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightYellowBg(123)).toEqual('\u001b[103m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightYellowBg(true)).toEqual('\u001b[103mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightYellowBg(null)).toEqual('\u001b[103m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightYellowBg(undefined)).toEqual('\u001b[103m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightYellowBg({ name: 'foo' })).toEqual('\u001b[103m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightYellowBg(['foo', 'bar'])).toEqual('\u001b[103m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightYellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.lightYellowBg.light('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightYellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.lightYellowBg.dark('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightYellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.lightYellowBg.lightBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightYellowBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
          expect(colr.lightYellowBg.darkBg('this is a test')).toEqual('\u001b[103mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightYellowBg('this is a test')).toEqual('\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightYellowBg.red('this is a test')).toEqual('\u001b[103m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightYellowBg('this is a test')).toEqual('\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightYellowBg.yellowBg('this is a test')).toEqual('\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightYellowBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[103mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightYellowBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[103m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightYellowBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[103mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightYellowBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[103m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightYellowBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[103mword\u001b[49m in middle');
        });
      });
    });

    describe('blueBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.blueBg'}`, () => {
          expect(colr.blueBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.blueBg).toBe('function');
          expect(typeof colr.blueBg.red).toBe('function');
          expect(typeof colr.blueBg.light).toBe('function');
          expect(typeof colr.blueBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.blueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.blueBg(input)).toEqual(
            '\u001b[104mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[104m\u001b[39m in\u001b[49m\n\u001b[104ma multiline string\u001b[49m\n\u001b[104mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[104m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.blueBg(...input)).toEqual(
            '\u001b[104m\u001b[31m\u001b[103mword\u001b[49m\u001b[104m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[104m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.blueBg(123)).toEqual('\u001b[104m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.blueBg(true)).toEqual('\u001b[104mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.blueBg(null)).toEqual('\u001b[104m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.blueBg(undefined)).toEqual('\u001b[104m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.blueBg({ name: 'foo' })).toEqual('\u001b[104m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.blueBg(['foo', 'bar'])).toEqual('\u001b[104m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.blueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.blueBg.light('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.blueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.blueBg.dark('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.blueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.blueBg.lightBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.blueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
          expect(colr.blueBg.darkBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.blueBg('this is a test')).toEqual('\u001b[91m\u001b[104mthis is a test\u001b[49m\u001b[39m');
          expect(colr.blueBg.red('this is a test')).toEqual('\u001b[104m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.blueBg('this is a test')).toEqual('\u001b[103m\u001b[104mthis is a test\u001b[49m\u001b[49m');
          expect(colr.blueBg.yellowBg('this is a test')).toEqual('\u001b[104m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.blueBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[104mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.blueBg.red.yellowBg('this is a test')).toEqual('\u001b[104m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.blueBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[104mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.blueBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[104m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.blueBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[104mword\u001b[49m in middle');
        });
      });
    });

    describe('darkBlueBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkBlueBg'}`, () => {
          expect(colr.darkBlueBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkBlueBg).toBe('function');
          expect(typeof colr.darkBlueBg.red).toBe('function');
          expect(typeof colr.darkBlueBg.light).toBe('function');
          expect(typeof colr.darkBlueBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkBlueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkBlueBg(input)).toEqual(
            '\u001b[44mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[44m\u001b[39m in\u001b[49m\n\u001b[44ma multiline string\u001b[49m\n\u001b[44mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[44m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkBlueBg(...input)).toEqual(
            '\u001b[44m\u001b[31m\u001b[103mword\u001b[49m\u001b[44m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[44m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkBlueBg(123)).toEqual('\u001b[44m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkBlueBg(true)).toEqual('\u001b[44mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkBlueBg(null)).toEqual('\u001b[44m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkBlueBg(undefined)).toEqual('\u001b[44m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkBlueBg({ name: 'foo' })).toEqual('\u001b[44m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkBlueBg(['foo', 'bar'])).toEqual('\u001b[44m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkBlueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
          expect(colr.darkBlueBg.light('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkBlueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
          expect(colr.darkBlueBg.dark('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkBlueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
          expect(colr.darkBlueBg.lightBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkBlueBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
          expect(colr.darkBlueBg.darkBg('this is a test')).toEqual('\u001b[44mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkBlueBg('this is a test')).toEqual('\u001b[91m\u001b[44mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkBlueBg.red('this is a test')).toEqual('\u001b[44m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkBlueBg('this is a test')).toEqual('\u001b[103m\u001b[44mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkBlueBg.yellowBg('this is a test')).toEqual('\u001b[44m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkBlueBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[44mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlueBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[44m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkBlueBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[44mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlueBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[44m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkBlueBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[44mword\u001b[49m in middle');
        });
      });
    });

    describe('lightBlueBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightBlueBg'}`, () => {
          expect(colr.lightBlueBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightBlueBg).toBe('function');
          expect(typeof colr.lightBlueBg.red).toBe('function');
          expect(typeof colr.lightBlueBg.light).toBe('function');
          expect(typeof colr.lightBlueBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightBlueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightBlueBg(input)).toEqual(
            '\u001b[104mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[104m\u001b[39m in\u001b[49m\n\u001b[104ma multiline string\u001b[49m\n\u001b[104mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[104m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightBlueBg(...input)).toEqual(
            '\u001b[104m\u001b[31m\u001b[103mword\u001b[49m\u001b[104m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[104m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightBlueBg(123)).toEqual('\u001b[104m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightBlueBg(true)).toEqual('\u001b[104mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightBlueBg(null)).toEqual('\u001b[104m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightBlueBg(undefined)).toEqual('\u001b[104m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightBlueBg({ name: 'foo' })).toEqual('\u001b[104m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightBlueBg(['foo', 'bar'])).toEqual('\u001b[104m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightBlueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.lightBlueBg.light('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightBlueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.lightBlueBg.dark('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightBlueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.lightBlueBg.lightBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightBlueBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
          expect(colr.lightBlueBg.darkBg('this is a test')).toEqual('\u001b[104mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightBlueBg('this is a test')).toEqual('\u001b[91m\u001b[104mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightBlueBg.red('this is a test')).toEqual('\u001b[104m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightBlueBg('this is a test')).toEqual('\u001b[103m\u001b[104mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightBlueBg.yellowBg('this is a test')).toEqual('\u001b[104m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightBlueBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[104mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlueBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[104m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightBlueBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[104mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlueBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[104m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightBlueBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[104mword\u001b[49m in middle');
        });
      });
    });

    describe('magentaBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.magentaBg'}`, () => {
          expect(colr.magentaBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.magentaBg).toBe('function');
          expect(typeof colr.magentaBg.red).toBe('function');
          expect(typeof colr.magentaBg.light).toBe('function');
          expect(typeof colr.magentaBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.magentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.magentaBg(input)).toEqual(
            '\u001b[105mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[105m\u001b[39m in\u001b[49m\n\u001b[105ma multiline string\u001b[49m\n\u001b[105mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[105m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.magentaBg(...input)).toEqual(
            '\u001b[105m\u001b[31m\u001b[103mword\u001b[49m\u001b[105m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[105m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.magentaBg(123)).toEqual('\u001b[105m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.magentaBg(true)).toEqual('\u001b[105mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.magentaBg(null)).toEqual('\u001b[105m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.magentaBg(undefined)).toEqual('\u001b[105m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.magentaBg({ name: 'foo' })).toEqual('\u001b[105m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.magentaBg(['foo', 'bar'])).toEqual('\u001b[105m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.magentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.magentaBg.light('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.magentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.magentaBg.dark('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.magentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.magentaBg.lightBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.magentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
          expect(colr.magentaBg.darkBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.magentaBg('this is a test')).toEqual('\u001b[91m\u001b[105mthis is a test\u001b[49m\u001b[39m');
          expect(colr.magentaBg.red('this is a test')).toEqual('\u001b[105m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.magentaBg('this is a test')).toEqual('\u001b[103m\u001b[105mthis is a test\u001b[49m\u001b[49m');
          expect(colr.magentaBg.yellowBg('this is a test')).toEqual('\u001b[105m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.magentaBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[105mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.magentaBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[105m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.magentaBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[105mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.magentaBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[105m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.magentaBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[105mword\u001b[49m in middle');
        });
      });
    });

    describe('darkMagentaBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkMagentaBg'}`, () => {
          expect(colr.darkMagentaBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkMagentaBg).toBe('function');
          expect(typeof colr.darkMagentaBg.red).toBe('function');
          expect(typeof colr.darkMagentaBg.light).toBe('function');
          expect(typeof colr.darkMagentaBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkMagentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkMagentaBg(input)).toEqual(
            '\u001b[45mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[45m\u001b[39m in\u001b[49m\n\u001b[45ma multiline string\u001b[49m\n\u001b[45mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[45m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkMagentaBg(...input)).toEqual(
            '\u001b[45m\u001b[31m\u001b[103mword\u001b[49m\u001b[45m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[45m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkMagentaBg(123)).toEqual('\u001b[45m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkMagentaBg(true)).toEqual('\u001b[45mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkMagentaBg(null)).toEqual('\u001b[45m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkMagentaBg(undefined)).toEqual('\u001b[45m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkMagentaBg({ name: 'foo' })).toEqual('\u001b[45m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkMagentaBg(['foo', 'bar'])).toEqual('\u001b[45m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkMagentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
          expect(colr.darkMagentaBg.light('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkMagentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
          expect(colr.darkMagentaBg.dark('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkMagentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
          expect(colr.darkMagentaBg.lightBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkMagentaBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
          expect(colr.darkMagentaBg.darkBg('this is a test')).toEqual('\u001b[45mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkMagentaBg('this is a test')).toEqual('\u001b[91m\u001b[45mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkMagentaBg.red('this is a test')).toEqual('\u001b[45m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkMagentaBg('this is a test')).toEqual('\u001b[103m\u001b[45mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkMagentaBg.yellowBg('this is a test')).toEqual('\u001b[45m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkMagentaBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[45mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkMagentaBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[45m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkMagentaBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[45mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkMagentaBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[45m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkMagentaBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[45mword\u001b[49m in middle');
        });
      });
    });

    describe('lightMagentaBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightMagentaBg'}`, () => {
          expect(colr.lightMagentaBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightMagentaBg).toBe('function');
          expect(typeof colr.lightMagentaBg.red).toBe('function');
          expect(typeof colr.lightMagentaBg.light).toBe('function');
          expect(typeof colr.lightMagentaBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightMagentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightMagentaBg(input)).toEqual(
            '\u001b[105mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[105m\u001b[39m in\u001b[49m\n\u001b[105ma multiline string\u001b[49m\n\u001b[105mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[105m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightMagentaBg(...input)).toEqual(
            '\u001b[105m\u001b[31m\u001b[103mword\u001b[49m\u001b[105m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[105m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightMagentaBg(123)).toEqual('\u001b[105m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightMagentaBg(true)).toEqual('\u001b[105mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightMagentaBg(null)).toEqual('\u001b[105m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightMagentaBg(undefined)).toEqual('\u001b[105m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightMagentaBg({ name: 'foo' })).toEqual('\u001b[105m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightMagentaBg(['foo', 'bar'])).toEqual('\u001b[105m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightMagentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.lightMagentaBg.light('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightMagentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.lightMagentaBg.dark('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightMagentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.lightMagentaBg.lightBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightMagentaBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
          expect(colr.lightMagentaBg.darkBg('this is a test')).toEqual('\u001b[105mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightMagentaBg('this is a test')).toEqual('\u001b[91m\u001b[105mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightMagentaBg.red('this is a test')).toEqual('\u001b[105m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightMagentaBg('this is a test')).toEqual('\u001b[103m\u001b[105mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightMagentaBg.yellowBg('this is a test')).toEqual('\u001b[105m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightMagentaBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[105mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightMagentaBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[105m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightMagentaBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[105mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightMagentaBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[105m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightMagentaBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[105mword\u001b[49m in middle');
        });
      });
    });

    describe('cyanBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.cyanBg'}`, () => {
          expect(colr.cyanBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.cyanBg).toBe('function');
          expect(typeof colr.cyanBg.red).toBe('function');
          expect(typeof colr.cyanBg.light).toBe('function');
          expect(typeof colr.cyanBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.cyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.cyanBg(input)).toEqual(
            '\u001b[106mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[106m\u001b[39m in\u001b[49m\n\u001b[106ma multiline string\u001b[49m\n\u001b[106mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[106m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.cyanBg(...input)).toEqual(
            '\u001b[106m\u001b[31m\u001b[103mword\u001b[49m\u001b[106m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[106m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.cyanBg(123)).toEqual('\u001b[106m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.cyanBg(true)).toEqual('\u001b[106mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.cyanBg(null)).toEqual('\u001b[106m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.cyanBg(undefined)).toEqual('\u001b[106m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.cyanBg({ name: 'foo' })).toEqual('\u001b[106m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.cyanBg(['foo', 'bar'])).toEqual('\u001b[106m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.cyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.cyanBg.light('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.cyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.cyanBg.dark('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.cyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.cyanBg.lightBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.cyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
          expect(colr.cyanBg.darkBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.cyanBg('this is a test')).toEqual('\u001b[91m\u001b[106mthis is a test\u001b[49m\u001b[39m');
          expect(colr.cyanBg.red('this is a test')).toEqual('\u001b[106m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.cyanBg('this is a test')).toEqual('\u001b[103m\u001b[106mthis is a test\u001b[49m\u001b[49m');
          expect(colr.cyanBg.yellowBg('this is a test')).toEqual('\u001b[106m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.cyanBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[106mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.cyanBg.red.yellowBg('this is a test')).toEqual('\u001b[106m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.cyanBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[106mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.cyanBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[106m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.cyanBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[106mword\u001b[49m in middle');
        });
      });
    });

    describe('darkCyanBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkCyanBg'}`, () => {
          expect(colr.darkCyanBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkCyanBg).toBe('function');
          expect(typeof colr.darkCyanBg.red).toBe('function');
          expect(typeof colr.darkCyanBg.light).toBe('function');
          expect(typeof colr.darkCyanBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkCyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkCyanBg(input)).toEqual(
            '\u001b[46mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[46m\u001b[39m in\u001b[49m\n\u001b[46ma multiline string\u001b[49m\n\u001b[46mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[46m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkCyanBg(...input)).toEqual(
            '\u001b[46m\u001b[31m\u001b[103mword\u001b[49m\u001b[46m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[46m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkCyanBg(123)).toEqual('\u001b[46m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkCyanBg(true)).toEqual('\u001b[46mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkCyanBg(null)).toEqual('\u001b[46m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkCyanBg(undefined)).toEqual('\u001b[46m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkCyanBg({ name: 'foo' })).toEqual('\u001b[46m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkCyanBg(['foo', 'bar'])).toEqual('\u001b[46m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkCyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
          expect(colr.darkCyanBg.light('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkCyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
          expect(colr.darkCyanBg.dark('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkCyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
          expect(colr.darkCyanBg.lightBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkCyanBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
          expect(colr.darkCyanBg.darkBg('this is a test')).toEqual('\u001b[46mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkCyanBg('this is a test')).toEqual('\u001b[91m\u001b[46mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkCyanBg.red('this is a test')).toEqual('\u001b[46m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkCyanBg('this is a test')).toEqual('\u001b[103m\u001b[46mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkCyanBg.yellowBg('this is a test')).toEqual('\u001b[46m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkCyanBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[46mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkCyanBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[46m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkCyanBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[46mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkCyanBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[46m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkCyanBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[46mword\u001b[49m in middle');
        });
      });
    });

    describe('lightCyanBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightCyanBg'}`, () => {
          expect(colr.lightCyanBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightCyanBg).toBe('function');
          expect(typeof colr.lightCyanBg.red).toBe('function');
          expect(typeof colr.lightCyanBg.light).toBe('function');
          expect(typeof colr.lightCyanBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightCyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightCyanBg(input)).toEqual(
            '\u001b[106mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[106m\u001b[39m in\u001b[49m\n\u001b[106ma multiline string\u001b[49m\n\u001b[106mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[106m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightCyanBg(...input)).toEqual(
            '\u001b[106m\u001b[31m\u001b[103mword\u001b[49m\u001b[106m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[106m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightCyanBg(123)).toEqual('\u001b[106m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightCyanBg(true)).toEqual('\u001b[106mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightCyanBg(null)).toEqual('\u001b[106m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightCyanBg(undefined)).toEqual('\u001b[106m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightCyanBg({ name: 'foo' })).toEqual('\u001b[106m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightCyanBg(['foo', 'bar'])).toEqual('\u001b[106m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightCyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.lightCyanBg.light('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightCyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.lightCyanBg.dark('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightCyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.lightCyanBg.lightBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightCyanBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
          expect(colr.lightCyanBg.darkBg('this is a test')).toEqual('\u001b[106mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightCyanBg('this is a test')).toEqual('\u001b[91m\u001b[106mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightCyanBg.red('this is a test')).toEqual('\u001b[106m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightCyanBg('this is a test')).toEqual('\u001b[103m\u001b[106mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightCyanBg.yellowBg('this is a test')).toEqual('\u001b[106m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightCyanBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[106mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightCyanBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[106m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightCyanBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[106mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightCyanBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[106m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightCyanBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[106mword\u001b[49m in middle');
        });
      });
    });

    describe('whiteBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.whiteBg'}`, () => {
          expect(colr.whiteBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.whiteBg).toBe('function');
          expect(typeof colr.whiteBg.red).toBe('function');
          expect(typeof colr.whiteBg.light).toBe('function');
          expect(typeof colr.whiteBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.whiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.whiteBg(input)).toEqual(
            '\u001b[107mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[107m\u001b[39m in\u001b[49m\n\u001b[107ma multiline string\u001b[49m\n\u001b[107mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[107m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.whiteBg(...input)).toEqual(
            '\u001b[107m\u001b[31m\u001b[103mword\u001b[49m\u001b[107m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[107m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.whiteBg(123)).toEqual('\u001b[107m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.whiteBg(true)).toEqual('\u001b[107mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.whiteBg(null)).toEqual('\u001b[107m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.whiteBg(undefined)).toEqual('\u001b[107m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.whiteBg({ name: 'foo' })).toEqual('\u001b[107m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.whiteBg(['foo', 'bar'])).toEqual('\u001b[107m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.whiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.whiteBg.light('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.whiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.whiteBg.dark('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.whiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.whiteBg.lightBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.whiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
          expect(colr.whiteBg.darkBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.whiteBg('this is a test')).toEqual('\u001b[91m\u001b[107mthis is a test\u001b[49m\u001b[39m');
          expect(colr.whiteBg.red('this is a test')).toEqual('\u001b[107m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.whiteBg('this is a test')).toEqual('\u001b[103m\u001b[107mthis is a test\u001b[49m\u001b[49m');
          expect(colr.whiteBg.yellowBg('this is a test')).toEqual('\u001b[107m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.whiteBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[107mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.whiteBg.red.yellowBg('this is a test')).toEqual('\u001b[107m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.whiteBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[107mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.whiteBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[107m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.whiteBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[107mword\u001b[49m in middle');
        });
      });
    });

    describe('darkWhiteBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkWhiteBg'}`, () => {
          expect(colr.darkWhiteBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkWhiteBg).toBe('function');
          expect(typeof colr.darkWhiteBg.red).toBe('function');
          expect(typeof colr.darkWhiteBg.light).toBe('function');
          expect(typeof colr.darkWhiteBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkWhiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkWhiteBg(input)).toEqual(
            '\u001b[47mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[47m\u001b[39m in\u001b[49m\n\u001b[47ma multiline string\u001b[49m\n\u001b[47mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[47m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkWhiteBg(...input)).toEqual(
            '\u001b[47m\u001b[31m\u001b[103mword\u001b[49m\u001b[47m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[47m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkWhiteBg(123)).toEqual('\u001b[47m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkWhiteBg(true)).toEqual('\u001b[47mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkWhiteBg(null)).toEqual('\u001b[47m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkWhiteBg(undefined)).toEqual('\u001b[47m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkWhiteBg({ name: 'foo' })).toEqual('\u001b[47m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkWhiteBg(['foo', 'bar'])).toEqual('\u001b[47m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkWhiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
          expect(colr.darkWhiteBg.light('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkWhiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
          expect(colr.darkWhiteBg.dark('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkWhiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
          expect(colr.darkWhiteBg.lightBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkWhiteBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
          expect(colr.darkWhiteBg.darkBg('this is a test')).toEqual('\u001b[47mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkWhiteBg('this is a test')).toEqual('\u001b[91m\u001b[47mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkWhiteBg.red('this is a test')).toEqual('\u001b[47m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkWhiteBg('this is a test')).toEqual('\u001b[103m\u001b[47mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkWhiteBg.yellowBg('this is a test')).toEqual('\u001b[47m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkWhiteBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[47mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkWhiteBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[47m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkWhiteBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[47mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkWhiteBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[47m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkWhiteBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[47mword\u001b[49m in middle');
        });
      });
    });

    describe('lightWhiteBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightWhiteBg'}`, () => {
          expect(colr.lightWhiteBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightWhiteBg).toBe('function');
          expect(typeof colr.lightWhiteBg.red).toBe('function');
          expect(typeof colr.lightWhiteBg.light).toBe('function');
          expect(typeof colr.lightWhiteBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightWhiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightWhiteBg(input)).toEqual(
            '\u001b[107mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[107m\u001b[39m in\u001b[49m\n\u001b[107ma multiline string\u001b[49m\n\u001b[107mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[107m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightWhiteBg(...input)).toEqual(
            '\u001b[107m\u001b[31m\u001b[103mword\u001b[49m\u001b[107m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[107m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightWhiteBg(123)).toEqual('\u001b[107m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightWhiteBg(true)).toEqual('\u001b[107mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightWhiteBg(null)).toEqual('\u001b[107m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightWhiteBg(undefined)).toEqual('\u001b[107m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightWhiteBg({ name: 'foo' })).toEqual('\u001b[107m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightWhiteBg(['foo', 'bar'])).toEqual('\u001b[107m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightWhiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.lightWhiteBg.light('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightWhiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.lightWhiteBg.dark('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightWhiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.lightWhiteBg.lightBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightWhiteBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
          expect(colr.lightWhiteBg.darkBg('this is a test')).toEqual('\u001b[107mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightWhiteBg('this is a test')).toEqual('\u001b[91m\u001b[107mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightWhiteBg.red('this is a test')).toEqual('\u001b[107m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightWhiteBg('this is a test')).toEqual('\u001b[103m\u001b[107mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightWhiteBg.yellowBg('this is a test')).toEqual('\u001b[107m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightWhiteBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[107mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightWhiteBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[107m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightWhiteBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[107mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightWhiteBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[107m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightWhiteBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[107mword\u001b[49m in middle');
        });
      });
    });

    describe('black', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.black'}`, () => {
          expect(colr.black).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.black).toBe('function');
          expect(typeof colr.black.red).toBe('function');
          expect(typeof colr.black.light).toBe('function');
          expect(typeof colr.black.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.black('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.black(input)).toEqual(
            '\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[30m in\u001b[39m\n\u001b[30ma multiline string\u001b[39m\n\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.black(...input)).toEqual(
            '\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.black(123)).toEqual('\u001b[30m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.black(true)).toEqual('\u001b[30mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.black(null)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.black(undefined)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.black({ name: 'foo' })).toEqual('\u001b[30m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.black(['foo', 'bar'])).toEqual('\u001b[30m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.black('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.black.light('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.black('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.black.dark('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.black('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.black.lightBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.black('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.black.darkBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.black('this is a test')).toEqual('\u001b[91m\u001b[30mthis is a test\u001b[39m\u001b[39m');
          expect(colr.black.red('this is a test')).toEqual('\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.black('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.black.yellowBg('this is a test')).toEqual('\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.black('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.black.red.yellowBg('this is a test')).toEqual('\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.black('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.black.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.black.$`test with ${'word'} in middle`).toEqual('test with \u001b[30mword\u001b[39m in middle');
        });
      });
    });

    describe('darkBlack', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkBlack'}`, () => {
          expect(colr.darkBlack).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkBlack).toBe('function');
          expect(typeof colr.darkBlack.red).toBe('function');
          expect(typeof colr.darkBlack.light).toBe('function');
          expect(typeof colr.darkBlack.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkBlack('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkBlack(input)).toEqual(
            '\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[30m in\u001b[39m\n\u001b[30ma multiline string\u001b[39m\n\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkBlack(...input)).toEqual(
            '\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkBlack(123)).toEqual('\u001b[30m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkBlack(true)).toEqual('\u001b[30mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkBlack(null)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkBlack(undefined)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkBlack({ name: 'foo' })).toEqual('\u001b[30m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkBlack(['foo', 'bar'])).toEqual('\u001b[30m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkBlack('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.darkBlack.light('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkBlack('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.darkBlack.dark('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkBlack('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.darkBlack.lightBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkBlack('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.darkBlack.darkBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkBlack('this is a test')).toEqual('\u001b[91m\u001b[30mthis is a test\u001b[39m\u001b[39m');
          expect(colr.darkBlack.red('this is a test')).toEqual('\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkBlack('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.darkBlack.yellowBg('this is a test')).toEqual('\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkBlack('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlack.red.yellowBg('this is a test')).toEqual(
            '\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkBlack('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlack.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkBlack.$`test with ${'word'} in middle`).toEqual('test with \u001b[30mword\u001b[39m in middle');
        });
      });
    });

    describe('lightBlack', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightBlack'}`, () => {
          expect(colr.lightBlack).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightBlack).toBe('function');
          expect(typeof colr.lightBlack.red).toBe('function');
          expect(typeof colr.lightBlack.light).toBe('function');
          expect(typeof colr.lightBlack.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightBlack('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightBlack(input)).toEqual(
            '\u001b[90mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[90m in\u001b[39m\n\u001b[90ma multiline string\u001b[39m\n\u001b[90mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[90m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightBlack(...input)).toEqual(
            '\u001b[90m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[90m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[90m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightBlack(123)).toEqual('\u001b[90m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightBlack(true)).toEqual('\u001b[90mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightBlack(null)).toEqual('\u001b[90m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightBlack(undefined)).toEqual('\u001b[90m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightBlack({ name: 'foo' })).toEqual('\u001b[90m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightBlack(['foo', 'bar'])).toEqual('\u001b[90m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightBlack('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.lightBlack.light('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightBlack('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.lightBlack.dark('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightBlack('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.lightBlack.lightBg('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightBlack('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.lightBlack.darkBg('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightBlack('this is a test')).toEqual('\u001b[91m\u001b[90mthis is a test\u001b[39m\u001b[39m');
          expect(colr.lightBlack.red('this is a test')).toEqual('\u001b[90m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightBlack('this is a test')).toEqual('\u001b[103m\u001b[90mthis is a test\u001b[39m\u001b[49m');
          expect(colr.lightBlack.yellowBg('this is a test')).toEqual('\u001b[90m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightBlack('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[90mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlack.red.yellowBg('this is a test')).toEqual(
            '\u001b[90m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightBlack('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[90mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlack.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[90m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightBlack.$`test with ${'word'} in middle`).toEqual('test with \u001b[90mword\u001b[39m in middle');
        });
      });
    });

    describe('blackBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.blackBg'}`, () => {
          expect(colr.blackBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.blackBg).toBe('function');
          expect(typeof colr.blackBg.red).toBe('function');
          expect(typeof colr.blackBg.light).toBe('function');
          expect(typeof colr.blackBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.blackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.blackBg(input)).toEqual(
            '\u001b[40mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[40m\u001b[39m in\u001b[49m\n\u001b[40ma multiline string\u001b[49m\n\u001b[40mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[40m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.blackBg(...input)).toEqual(
            '\u001b[40m\u001b[31m\u001b[103mword\u001b[49m\u001b[40m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[40m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.blackBg(123)).toEqual('\u001b[40m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.blackBg(true)).toEqual('\u001b[40mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.blackBg(null)).toEqual('\u001b[40m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.blackBg(undefined)).toEqual('\u001b[40m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.blackBg({ name: 'foo' })).toEqual('\u001b[40m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.blackBg(['foo', 'bar'])).toEqual('\u001b[40m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.blackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.blackBg.light('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.blackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.blackBg.dark('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.blackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.blackBg.lightBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.blackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.blackBg.darkBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.blackBg('this is a test')).toEqual('\u001b[91m\u001b[40mthis is a test\u001b[49m\u001b[39m');
          expect(colr.blackBg.red('this is a test')).toEqual('\u001b[40m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.blackBg('this is a test')).toEqual('\u001b[103m\u001b[40mthis is a test\u001b[49m\u001b[49m');
          expect(colr.blackBg.yellowBg('this is a test')).toEqual('\u001b[40m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.blackBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[40mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.blackBg.red.yellowBg('this is a test')).toEqual('\u001b[40m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.blackBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[40mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.blackBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[40m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.blackBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[40mword\u001b[49m in middle');
        });
      });
    });

    describe('darkBlackBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.darkBlackBg'}`, () => {
          expect(colr.darkBlackBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.darkBlackBg).toBe('function');
          expect(typeof colr.darkBlackBg.red).toBe('function');
          expect(typeof colr.darkBlackBg.light).toBe('function');
          expect(typeof colr.darkBlackBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.darkBlackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.darkBlackBg(input)).toEqual(
            '\u001b[40mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[40m\u001b[39m in\u001b[49m\n\u001b[40ma multiline string\u001b[49m\n\u001b[40mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[40m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.darkBlackBg(...input)).toEqual(
            '\u001b[40m\u001b[31m\u001b[103mword\u001b[49m\u001b[40m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[40m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.darkBlackBg(123)).toEqual('\u001b[40m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.darkBlackBg(true)).toEqual('\u001b[40mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.darkBlackBg(null)).toEqual('\u001b[40m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.darkBlackBg(undefined)).toEqual('\u001b[40m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.darkBlackBg({ name: 'foo' })).toEqual('\u001b[40m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.darkBlackBg(['foo', 'bar'])).toEqual('\u001b[40m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.darkBlackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.darkBlackBg.light('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.darkBlackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.darkBlackBg.dark('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.darkBlackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.darkBlackBg.lightBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.darkBlackBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
          expect(colr.darkBlackBg.darkBg('this is a test')).toEqual('\u001b[40mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.darkBlackBg('this is a test')).toEqual('\u001b[91m\u001b[40mthis is a test\u001b[49m\u001b[39m');
          expect(colr.darkBlackBg.red('this is a test')).toEqual('\u001b[40m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.darkBlackBg('this is a test')).toEqual('\u001b[103m\u001b[40mthis is a test\u001b[49m\u001b[49m');
          expect(colr.darkBlackBg.yellowBg('this is a test')).toEqual('\u001b[40m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.darkBlackBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[40mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlackBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[40m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.darkBlackBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[40mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.darkBlackBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[40m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.darkBlackBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[40mword\u001b[49m in middle');
        });
      });
    });

    describe('lightBlackBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.lightBlackBg'}`, () => {
          expect(colr.lightBlackBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.lightBlackBg).toBe('function');
          expect(typeof colr.lightBlackBg.red).toBe('function');
          expect(typeof colr.lightBlackBg.light).toBe('function');
          expect(typeof colr.lightBlackBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.lightBlackBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.lightBlackBg(input)).toEqual(
            '\u001b[100mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[100m\u001b[39m in\u001b[49m\n\u001b[100ma multiline string\u001b[49m\n\u001b[100mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[100m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.lightBlackBg(...input)).toEqual(
            '\u001b[100m\u001b[31m\u001b[103mword\u001b[49m\u001b[100m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[100m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.lightBlackBg(123)).toEqual('\u001b[100m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.lightBlackBg(true)).toEqual('\u001b[100mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.lightBlackBg(null)).toEqual('\u001b[100m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.lightBlackBg(undefined)).toEqual('\u001b[100m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.lightBlackBg({ name: 'foo' })).toEqual('\u001b[100m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.lightBlackBg(['foo', 'bar'])).toEqual('\u001b[100m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.lightBlackBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.lightBlackBg.light('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.lightBlackBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.lightBlackBg.dark('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.lightBlackBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.lightBlackBg.lightBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.lightBlackBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.lightBlackBg.darkBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.lightBlackBg('this is a test')).toEqual('\u001b[91m\u001b[100mthis is a test\u001b[49m\u001b[39m');
          expect(colr.lightBlackBg.red('this is a test')).toEqual('\u001b[100m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.lightBlackBg('this is a test')).toEqual('\u001b[103m\u001b[100mthis is a test\u001b[49m\u001b[49m');
          expect(colr.lightBlackBg.yellowBg('this is a test')).toEqual('\u001b[100m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.lightBlackBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[100mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlackBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[100m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.lightBlackBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[100mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.lightBlackBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[100m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.lightBlackBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[100mword\u001b[49m in middle');
        });
      });
    });

    describe('grey', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey'}`, () => {
          expect(colr.grey).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey).toBe('function');
          expect(typeof colr.grey.red).toBe('function');
          expect(typeof colr.grey.light).toBe('function');
          expect(typeof colr.grey.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey(input)).toEqual(
            '\u001b[90mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[90m in\u001b[39m\n\u001b[90ma multiline string\u001b[39m\n\u001b[90mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[90m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey(...input)).toEqual(
            '\u001b[90m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[90m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[90m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey(123)).toEqual('\u001b[90m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey(true)).toEqual('\u001b[90mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey(null)).toEqual('\u001b[90m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey(undefined)).toEqual('\u001b[90m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey({ name: 'foo' })).toEqual('\u001b[90m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey(['foo', 'bar'])).toEqual('\u001b[90m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.grey.light('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.grey.dark('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.grey.lightBg('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
          expect(colr.grey.darkBg('this is a test')).toEqual('\u001b[90mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey('this is a test')).toEqual('\u001b[91m\u001b[90mthis is a test\u001b[39m\u001b[39m');
          expect(colr.grey.red('this is a test')).toEqual('\u001b[90m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey('this is a test')).toEqual('\u001b[103m\u001b[90mthis is a test\u001b[39m\u001b[49m');
          expect(colr.grey.yellowBg('this is a test')).toEqual('\u001b[90m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[90mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.grey.red.yellowBg('this is a test')).toEqual('\u001b[90m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[90mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[90m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey.$`test with ${'word'} in middle`).toEqual('test with \u001b[90mword\u001b[39m in middle');
        });
      });
    });

    describe('greyBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.greyBg'}`, () => {
          expect(colr.greyBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.greyBg).toBe('function');
          expect(typeof colr.greyBg.red).toBe('function');
          expect(typeof colr.greyBg.light).toBe('function');
          expect(typeof colr.greyBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.greyBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.greyBg(input)).toEqual(
            '\u001b[100mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[100m\u001b[39m in\u001b[49m\n\u001b[100ma multiline string\u001b[49m\n\u001b[100mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[100m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.greyBg(...input)).toEqual(
            '\u001b[100m\u001b[31m\u001b[103mword\u001b[49m\u001b[100m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[100m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.greyBg(123)).toEqual('\u001b[100m123\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.greyBg(true)).toEqual('\u001b[100mtrue\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.greyBg(null)).toEqual('\u001b[100m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.greyBg(undefined)).toEqual('\u001b[100m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.greyBg({ name: 'foo' })).toEqual('\u001b[100m{"name":"foo"}\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.greyBg(['foo', 'bar'])).toEqual('\u001b[100m[foo, bar]\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.greyBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.greyBg.light('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.greyBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.greyBg.dark('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.greyBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.greyBg.lightBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.greyBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
          expect(colr.greyBg.darkBg('this is a test')).toEqual('\u001b[100mthis is a test\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.greyBg('this is a test')).toEqual('\u001b[91m\u001b[100mthis is a test\u001b[49m\u001b[39m');
          expect(colr.greyBg.red('this is a test')).toEqual('\u001b[100m\u001b[91mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.greyBg('this is a test')).toEqual('\u001b[103m\u001b[100mthis is a test\u001b[49m\u001b[49m');
          expect(colr.greyBg.yellowBg('this is a test')).toEqual('\u001b[100m\u001b[103mthis is a test\u001b[49m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.greyBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[100mthis is a test\u001b[49m\u001b[49m\u001b[39m');
          expect(colr.greyBg.red.yellowBg('this is a test')).toEqual('\u001b[100m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.greyBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[100mthis is a test\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.greyBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[100m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.greyBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[100mword\u001b[49m in middle');
        });
      });
    });

    describe('grey0', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey0'}`, () => {
          expect(colr.grey0).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey0).toBe('function');
          expect(typeof colr.grey0.red).toBe('function');
          expect(typeof colr.grey0.light).toBe('function');
          expect(typeof colr.grey0.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey0('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey0(input)).toEqual(
            '\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[30m in\u001b[39m\n\u001b[30ma multiline string\u001b[39m\n\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey0(...input)).toEqual(
            '\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[30m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey0(123)).toEqual('\u001b[30m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey0(true)).toEqual('\u001b[30mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey0(null)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey0(undefined)).toEqual('\u001b[30m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey0({ name: 'foo' })).toEqual('\u001b[30m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey0(['foo', 'bar'])).toEqual('\u001b[30m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey0('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.grey0.light('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey0('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.grey0.dark('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey0('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.grey0.lightBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey0('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
          expect(colr.grey0.darkBg('this is a test')).toEqual('\u001b[30mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey0('this is a test')).toEqual('\u001b[91m\u001b[30mthis is a test\u001b[39m\u001b[39m');
          expect(colr.grey0.red('this is a test')).toEqual('\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey0('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.grey0.yellowBg('this is a test')).toEqual('\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey0('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.grey0.red.yellowBg('this is a test')).toEqual('\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey0('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey0.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey0.$`test with ${'word'} in middle`).toEqual('test with \u001b[30mword\u001b[39m in middle');
        });
      });
    });

    describe('grey1', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey1'}`, () => {
          expect(colr.grey1).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey1).toBe('function');
          expect(typeof colr.grey1.red).toBe('function');
          expect(typeof colr.grey1.light).toBe('function');
          expect(typeof colr.grey1.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey1('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey1(input)).toEqual(
            '\u001b[90m\u001b[2mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[90m in\u001b[22m\u001b[39m\n\u001b[90m\u001b[2ma multiline string\u001b[22m\u001b[39m\n\u001b[90m\u001b[2mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[90m\u001b[22m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey1(...input)).toEqual(
            '\u001b[90m\u001b[2m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[90m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[90m\u001b[22m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey1(123)).toEqual('\u001b[90m\u001b[2m123\u001b[22m\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey1(true)).toEqual('\u001b[90m\u001b[2mtrue\u001b[22m\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey1(null)).toEqual('\u001b[90m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey1(undefined)).toEqual('\u001b[90m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey1({ name: 'foo' })).toEqual('\u001b[90m\u001b[2m{"name":"foo"}\u001b[22m\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey1(['foo', 'bar'])).toEqual('\u001b[90m\u001b[2m[foo, bar]\u001b[22m\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey1('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey1.light('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey1('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey1.dark('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey1('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey1.lightBg('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey1('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey1.darkBg('this is a test')).toEqual('\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey1('this is a test')).toEqual('\u001b[91m\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[39m');
          expect(colr.grey1.red('this is a test')).toEqual('\u001b[90m\u001b[2m\u001b[91mthis is a test\u001b[39m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey1('this is a test')).toEqual('\u001b[103m\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m');
          expect(colr.grey1.yellowBg('this is a test')).toEqual('\u001b[90m\u001b[2m\u001b[103mthis is a test\u001b[49m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey1('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey1.red.yellowBg('this is a test')).toEqual(
            '\u001b[90m\u001b[2m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey1('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[90m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey1.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[90m\u001b[2m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey1.$`test with ${'word'} in middle`).toEqual('test with \u001b[90m\u001b[2mword\u001b[22m\u001b[39m in middle');
        });
      });
    });

    describe('grey2', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey2'}`, () => {
          expect(colr.grey2).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey2).toBe('function');
          expect(typeof colr.grey2.red).toBe('function');
          expect(typeof colr.grey2.light).toBe('function');
          expect(typeof colr.grey2.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey2('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey2(input)).toEqual(
            '\u001b[37m\u001b[2mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[37m in\u001b[22m\u001b[39m\n\u001b[37m\u001b[2ma multiline string\u001b[22m\u001b[39m\n\u001b[37m\u001b[2mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[37m\u001b[22m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey2(...input)).toEqual(
            '\u001b[37m\u001b[2m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[37m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[37m\u001b[22m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey2(123)).toEqual('\u001b[37m\u001b[2m123\u001b[22m\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey2(true)).toEqual('\u001b[37m\u001b[2mtrue\u001b[22m\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey2(null)).toEqual('\u001b[37m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey2(undefined)).toEqual('\u001b[37m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey2({ name: 'foo' })).toEqual('\u001b[37m\u001b[2m{"name":"foo"}\u001b[22m\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey2(['foo', 'bar'])).toEqual('\u001b[37m\u001b[2m[foo, bar]\u001b[22m\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey2('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey2.light('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey2('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey2.dark('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey2('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey2.lightBg('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey2('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey2.darkBg('this is a test')).toEqual('\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey2('this is a test')).toEqual('\u001b[91m\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[39m');
          expect(colr.grey2.red('this is a test')).toEqual('\u001b[37m\u001b[2m\u001b[91mthis is a test\u001b[39m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey2('this is a test')).toEqual('\u001b[103m\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m');
          expect(colr.grey2.yellowBg('this is a test')).toEqual('\u001b[37m\u001b[2m\u001b[103mthis is a test\u001b[49m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey2('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey2.red.yellowBg('this is a test')).toEqual(
            '\u001b[37m\u001b[2m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey2('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[37m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey2.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[37m\u001b[2m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey2.$`test with ${'word'} in middle`).toEqual('test with \u001b[37m\u001b[2mword\u001b[22m\u001b[39m in middle');
        });
      });
    });

    describe('grey3', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey3'}`, () => {
          expect(colr.grey3).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey3).toBe('function');
          expect(typeof colr.grey3.red).toBe('function');
          expect(typeof colr.grey3.light).toBe('function');
          expect(typeof colr.grey3.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey3('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey3(input)).toEqual(
            '\u001b[97m\u001b[2mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[97m in\u001b[22m\u001b[39m\n\u001b[97m\u001b[2ma multiline string\u001b[22m\u001b[39m\n\u001b[97m\u001b[2mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[97m\u001b[22m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey3(...input)).toEqual(
            '\u001b[97m\u001b[2m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[97m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[97m\u001b[22m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey3(123)).toEqual('\u001b[97m\u001b[2m123\u001b[22m\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey3(true)).toEqual('\u001b[97m\u001b[2mtrue\u001b[22m\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey3(null)).toEqual('\u001b[97m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey3(undefined)).toEqual('\u001b[97m\u001b[2m\u001b[22m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey3({ name: 'foo' })).toEqual('\u001b[97m\u001b[2m{"name":"foo"}\u001b[22m\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey3(['foo', 'bar'])).toEqual('\u001b[97m\u001b[2m[foo, bar]\u001b[22m\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey3('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey3.light('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey3('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey3.dark('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey3('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey3.lightBg('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey3('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.grey3.darkBg('this is a test')).toEqual('\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey3('this is a test')).toEqual('\u001b[91m\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[39m');
          expect(colr.grey3.red('this is a test')).toEqual('\u001b[97m\u001b[2m\u001b[91mthis is a test\u001b[39m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey3('this is a test')).toEqual('\u001b[103m\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m');
          expect(colr.grey3.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[2m\u001b[103mthis is a test\u001b[49m\u001b[22m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey3('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey3.red.yellowBg('this is a test')).toEqual(
            '\u001b[97m\u001b[2m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey3('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[97m\u001b[2mthis is a test\u001b[22m\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey3.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[97m\u001b[2m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[22m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey3.$`test with ${'word'} in middle`).toEqual('test with \u001b[97m\u001b[2mword\u001b[22m\u001b[39m in middle');
        });
      });
    });

    describe('grey4', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey4'}`, () => {
          expect(colr.grey4).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey4).toBe('function');
          expect(typeof colr.grey4.red).toBe('function');
          expect(typeof colr.grey4.light).toBe('function');
          expect(typeof colr.grey4.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey4('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey4(input)).toEqual(
            '\u001b[37mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[37m in\u001b[39m\n\u001b[37ma multiline string\u001b[39m\n\u001b[37mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[37m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey4(...input)).toEqual(
            '\u001b[37m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[37m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[37m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey4(123)).toEqual('\u001b[37m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey4(true)).toEqual('\u001b[37mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey4(null)).toEqual('\u001b[37m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey4(undefined)).toEqual('\u001b[37m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey4({ name: 'foo' })).toEqual('\u001b[37m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey4(['foo', 'bar'])).toEqual('\u001b[37m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey4('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.grey4.light('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey4('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.grey4.dark('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey4('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.grey4.lightBg('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey4('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
          expect(colr.grey4.darkBg('this is a test')).toEqual('\u001b[37mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey4('this is a test')).toEqual('\u001b[91m\u001b[37mthis is a test\u001b[39m\u001b[39m');
          expect(colr.grey4.red('this is a test')).toEqual('\u001b[37m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey4('this is a test')).toEqual('\u001b[103m\u001b[37mthis is a test\u001b[39m\u001b[49m');
          expect(colr.grey4.yellowBg('this is a test')).toEqual('\u001b[37m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey4('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[37mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.grey4.red.yellowBg('this is a test')).toEqual('\u001b[37m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey4('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[37mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey4.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[37m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey4.$`test with ${'word'} in middle`).toEqual('test with \u001b[37mword\u001b[39m in middle');
        });
      });
    });

    describe('grey5', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.grey5'}`, () => {
          expect(colr.grey5).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.grey5).toBe('function');
          expect(typeof colr.grey5.red).toBe('function');
          expect(typeof colr.grey5.light).toBe('function');
          expect(typeof colr.grey5.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.grey5('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.grey5(input)).toEqual(
            '\u001b[97mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[97m in\u001b[39m\n\u001b[97ma multiline string\u001b[39m\n\u001b[97mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.grey5(...input)).toEqual(
            '\u001b[97m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[97m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[97m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.grey5(123)).toEqual('\u001b[97m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.grey5(true)).toEqual('\u001b[97mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.grey5(null)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.grey5(undefined)).toEqual('\u001b[97m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.grey5({ name: 'foo' })).toEqual('\u001b[97m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.grey5(['foo', 'bar'])).toEqual('\u001b[97m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.grey5('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.grey5.light('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.grey5('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.grey5.dark('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.grey5('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.grey5.lightBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.grey5('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
          expect(colr.grey5.darkBg('this is a test')).toEqual('\u001b[97mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.grey5('this is a test')).toEqual('\u001b[91m\u001b[97mthis is a test\u001b[39m\u001b[39m');
          expect(colr.grey5.red('this is a test')).toEqual('\u001b[97m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.grey5('this is a test')).toEqual('\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m');
          expect(colr.grey5.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.grey5('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.grey5.red.yellowBg('this is a test')).toEqual('\u001b[97m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.grey5('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[97mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.grey5.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[97m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.grey5.$`test with ${'word'} in middle`).toEqual('test with \u001b[97mword\u001b[39m in middle');
        });
      });
    });

    describe('primary', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.primary'}`, () => {
          expect(colr.primary).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.primary).toBe('function');
          expect(typeof colr.primary.red).toBe('function');
          expect(typeof colr.primary.light).toBe('function');
          expect(typeof colr.primary.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.primary('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.primary(input)).toEqual(
            '\u001b[93mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[93m in\u001b[39m\n\u001b[93ma multiline string\u001b[39m\n\u001b[93mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.primary(...input)).toEqual(
            '\u001b[93m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[93m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[93m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.primary(123)).toEqual('\u001b[93m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.primary(true)).toEqual('\u001b[93mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.primary(null)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.primary(undefined)).toEqual('\u001b[93m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.primary({ name: 'foo' })).toEqual('\u001b[93m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.primary(['foo', 'bar'])).toEqual('\u001b[93m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.primary('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.primary.light('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.primary('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.primary.dark('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.primary('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.primary.lightBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.primary('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
          expect(colr.primary.darkBg('this is a test')).toEqual('\u001b[93mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.primary('this is a test')).toEqual('\u001b[91m\u001b[93mthis is a test\u001b[39m\u001b[39m');
          expect(colr.primary.red('this is a test')).toEqual('\u001b[93m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.primary('this is a test')).toEqual('\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m');
          expect(colr.primary.yellowBg('this is a test')).toEqual('\u001b[93m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.primary('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.primary.red.yellowBg('this is a test')).toEqual('\u001b[93m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.primary('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[93mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.primary.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[93m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.primary.$`test with ${'word'} in middle`).toEqual('test with \u001b[93mword\u001b[39m in middle');
        });
      });
    });

    describe('secondary', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.secondary'}`, () => {
          expect(colr.secondary).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.secondary).toBe('function');
          expect(typeof colr.secondary.red).toBe('function');
          expect(typeof colr.secondary.light).toBe('function');
          expect(typeof colr.secondary.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.secondary('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.secondary(input)).toEqual(
            '\u001b[95mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[95m in\u001b[39m\n\u001b[95ma multiline string\u001b[39m\n\u001b[95mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.secondary(...input)).toEqual(
            '\u001b[95m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[95m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[95m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.secondary(123)).toEqual('\u001b[95m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.secondary(true)).toEqual('\u001b[95mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.secondary(null)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.secondary(undefined)).toEqual('\u001b[95m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.secondary({ name: 'foo' })).toEqual('\u001b[95m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.secondary(['foo', 'bar'])).toEqual('\u001b[95m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.secondary('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.secondary.light('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.secondary('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.secondary.dark('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.secondary('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.secondary.lightBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.secondary('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
          expect(colr.secondary.darkBg('this is a test')).toEqual('\u001b[95mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.secondary('this is a test')).toEqual('\u001b[91m\u001b[95mthis is a test\u001b[39m\u001b[39m');
          expect(colr.secondary.red('this is a test')).toEqual('\u001b[95m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.secondary('this is a test')).toEqual('\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m');
          expect(colr.secondary.yellowBg('this is a test')).toEqual('\u001b[95m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.secondary('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.secondary.red.yellowBg('this is a test')).toEqual(
            '\u001b[95m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.secondary('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[95mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.secondary.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[95m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.secondary.$`test with ${'word'} in middle`).toEqual('test with \u001b[95mword\u001b[39m in middle');
        });
      });
    });

    describe('success', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.success'}`, () => {
          expect(colr.success).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.success).toBe('function');
          expect(typeof colr.success.red).toBe('function');
          expect(typeof colr.success.light).toBe('function');
          expect(typeof colr.success.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.success('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.success(input)).toEqual(
            '\u001b[92mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[92m in\u001b[39m\n\u001b[92ma multiline string\u001b[39m\n\u001b[92mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.success(...input)).toEqual(
            '\u001b[92m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[92m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[92m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.success(123)).toEqual('\u001b[92m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.success(true)).toEqual('\u001b[92mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.success(null)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.success(undefined)).toEqual('\u001b[92m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.success({ name: 'foo' })).toEqual('\u001b[92m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.success(['foo', 'bar'])).toEqual('\u001b[92m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.success('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.success.light('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.success('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.success.dark('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.success('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.success.lightBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.success('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
          expect(colr.success.darkBg('this is a test')).toEqual('\u001b[92mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.success('this is a test')).toEqual('\u001b[91m\u001b[92mthis is a test\u001b[39m\u001b[39m');
          expect(colr.success.red('this is a test')).toEqual('\u001b[92m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.success('this is a test')).toEqual('\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m');
          expect(colr.success.yellowBg('this is a test')).toEqual('\u001b[92m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.success('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.success.red.yellowBg('this is a test')).toEqual('\u001b[92m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.success('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[92mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.success.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[92m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.success.$`test with ${'word'} in middle`).toEqual('test with \u001b[92mword\u001b[39m in middle');
        });
      });
    });

    describe('danger', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.danger'}`, () => {
          expect(colr.danger).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.danger).toBe('function');
          expect(typeof colr.danger.red).toBe('function');
          expect(typeof colr.danger.light).toBe('function');
          expect(typeof colr.danger.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.danger('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.danger(input)).toEqual(
            '\u001b[31mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[31m in\u001b[39m\n\u001b[31ma multiline string\u001b[39m\n\u001b[31mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[31m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.danger(...input)).toEqual(
            '\u001b[31m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[31m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[31m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.danger(123)).toEqual('\u001b[31m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.danger(true)).toEqual('\u001b[31mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.danger(null)).toEqual('\u001b[31m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.danger(undefined)).toEqual('\u001b[31m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.danger({ name: 'foo' })).toEqual('\u001b[31m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.danger(['foo', 'bar'])).toEqual('\u001b[31m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.danger('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.danger.light('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.danger('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.danger.dark('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.danger('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.danger.lightBg('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.danger('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
          expect(colr.danger.darkBg('this is a test')).toEqual('\u001b[31mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.danger('this is a test')).toEqual('\u001b[91m\u001b[31mthis is a test\u001b[39m\u001b[39m');
          expect(colr.danger.red('this is a test')).toEqual('\u001b[31m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.danger('this is a test')).toEqual('\u001b[103m\u001b[31mthis is a test\u001b[39m\u001b[49m');
          expect(colr.danger.yellowBg('this is a test')).toEqual('\u001b[31m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.danger('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[31mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.danger.red.yellowBg('this is a test')).toEqual('\u001b[31m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.danger('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[31mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.danger.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[31m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.danger.$`test with ${'word'} in middle`).toEqual('test with \u001b[31mword\u001b[39m in middle');
        });
      });
    });

    describe('warning', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.warning'}`, () => {
          expect(colr.warning).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.warning).toBe('function');
          expect(typeof colr.warning.red).toBe('function');
          expect(typeof colr.warning.light).toBe('function');
          expect(typeof colr.warning.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.warning('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.warning(input)).toEqual(
            '\u001b[33mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[33m in\u001b[39m\n\u001b[33ma multiline string\u001b[39m\n\u001b[33mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[33m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.warning(...input)).toEqual(
            '\u001b[33m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[33m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[33m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.warning(123)).toEqual('\u001b[33m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.warning(true)).toEqual('\u001b[33mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.warning(null)).toEqual('\u001b[33m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.warning(undefined)).toEqual('\u001b[33m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.warning({ name: 'foo' })).toEqual('\u001b[33m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.warning(['foo', 'bar'])).toEqual('\u001b[33m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.warning('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.warning.light('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.warning('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.warning.dark('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.warning('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.warning.lightBg('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.warning('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
          expect(colr.warning.darkBg('this is a test')).toEqual('\u001b[33mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.warning('this is a test')).toEqual('\u001b[91m\u001b[33mthis is a test\u001b[39m\u001b[39m');
          expect(colr.warning.red('this is a test')).toEqual('\u001b[33m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.warning('this is a test')).toEqual('\u001b[103m\u001b[33mthis is a test\u001b[39m\u001b[49m');
          expect(colr.warning.yellowBg('this is a test')).toEqual('\u001b[33m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.warning('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[33mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.warning.red.yellowBg('this is a test')).toEqual('\u001b[33m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.warning('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[33mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.warning.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[33m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.warning.$`test with ${'word'} in middle`).toEqual('test with \u001b[33mword\u001b[39m in middle');
        });
      });
    });

    describe('info', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.info'}`, () => {
          expect(colr.info).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.info).toBe('function');
          expect(typeof colr.info.red).toBe('function');
          expect(typeof colr.info.light).toBe('function');
          expect(typeof colr.info.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.info('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.info(input)).toEqual(
            '\u001b[94mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m\u001b[94m in\u001b[39m\n\u001b[94ma multiline string\u001b[39m\n\u001b[94mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.info(...input)).toEqual(
            '\u001b[94m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m\u001b[94m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[94m\u001b[39m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.info(123)).toEqual('\u001b[94m123\u001b[39m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.info(true)).toEqual('\u001b[94mtrue\u001b[39m');
        });
        it(should` wrap a null`, () => {
          expect(colr.info(null)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.info(undefined)).toEqual('\u001b[94m\u001b[39m');
        });
        it(should` wrap an object`, () => {
          expect(colr.info({ name: 'foo' })).toEqual('\u001b[94m{"name":"foo"}\u001b[39m');
        });
        it(should` wrap an array`, () => {
          expect(colr.info(['foo', 'bar'])).toEqual('\u001b[94m[foo, bar]\u001b[39m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.info('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.info.light('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.info('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.info.dark('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.info('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.info.lightBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.info('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
          expect(colr.info.darkBg('this is a test')).toEqual('\u001b[94mthis is a test\u001b[39m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.info('this is a test')).toEqual('\u001b[91m\u001b[94mthis is a test\u001b[39m\u001b[39m');
          expect(colr.info.red('this is a test')).toEqual('\u001b[94m\u001b[91mthis is a test\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.info('this is a test')).toEqual('\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m');
          expect(colr.info.yellowBg('this is a test')).toEqual('\u001b[94m\u001b[103mthis is a test\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.info('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.info.red.yellowBg('this is a test')).toEqual('\u001b[94m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.info('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[94mthis is a test\u001b[39m\u001b[49m\u001b[39m'
          );
          expect(colr.info.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[94m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.info.$`test with ${'word'} in middle`).toEqual('test with \u001b[94mword\u001b[39m in middle');
        });
      });
    });

    describe('primaryBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.primaryBg'}`, () => {
          expect(colr.primaryBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.primaryBg).toBe('function');
          expect(typeof colr.primaryBg.red).toBe('function');
          expect(typeof colr.primaryBg.light).toBe('function');
          expect(typeof colr.primaryBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.primaryBg(input)).toEqual(
            '\u001b[103m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[103m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[103m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[103m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[103m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.primaryBg(...input)).toEqual(
            '\u001b[103m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[103m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[103m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.primaryBg(123)).toEqual('\u001b[103m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.primaryBg(true)).toEqual('\u001b[103m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.primaryBg(null)).toEqual('\u001b[103m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.primaryBg(undefined)).toEqual('\u001b[103m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.primaryBg({ name: 'foo' })).toEqual('\u001b[103m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.primaryBg(['foo', 'bar'])).toEqual('\u001b[103m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.primaryBg.light('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.primaryBg.dark('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.primaryBg.lightBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.primaryBg.darkBg('this is a test')).toEqual('\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.primaryBg('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.primaryBg.red('this is a test')).toEqual('\u001b[103m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.primaryBg('this is a test')).toEqual('\u001b[103m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.primaryBg.yellowBg('this is a test')).toEqual('\u001b[103m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.primaryBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.primaryBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[103m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.primaryBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[103m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.primaryBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[103m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.primaryBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[103m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('secondaryBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.secondaryBg'}`, () => {
          expect(colr.secondaryBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.secondaryBg).toBe('function');
          expect(typeof colr.secondaryBg.red).toBe('function');
          expect(typeof colr.secondaryBg.light).toBe('function');
          expect(typeof colr.secondaryBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.secondaryBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.secondaryBg(input)).toEqual(
            '\u001b[105m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[105m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[105m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[105m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[105m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.secondaryBg(...input)).toEqual(
            '\u001b[105m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[105m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[105m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.secondaryBg(123)).toEqual('\u001b[105m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.secondaryBg(true)).toEqual('\u001b[105m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.secondaryBg(null)).toEqual('\u001b[105m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.secondaryBg(undefined)).toEqual('\u001b[105m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.secondaryBg({ name: 'foo' })).toEqual('\u001b[105m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.secondaryBg(['foo', 'bar'])).toEqual('\u001b[105m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.secondaryBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.secondaryBg.light('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.secondaryBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.secondaryBg.dark('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.secondaryBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.secondaryBg.lightBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.secondaryBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.secondaryBg.darkBg('this is a test')).toEqual('\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.secondaryBg('this is a test')).toEqual('\u001b[91m\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.secondaryBg.red('this is a test')).toEqual('\u001b[105m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.secondaryBg('this is a test')).toEqual('\u001b[103m\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.secondaryBg.yellowBg('this is a test')).toEqual('\u001b[105m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.secondaryBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.secondaryBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[105m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.secondaryBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[105m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.secondaryBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[105m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.secondaryBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[105m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('successBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.successBg'}`, () => {
          expect(colr.successBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.successBg).toBe('function');
          expect(typeof colr.successBg.red).toBe('function');
          expect(typeof colr.successBg.light).toBe('function');
          expect(typeof colr.successBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.successBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.successBg(input)).toEqual(
            '\u001b[102m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[102m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[102m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[102m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[102m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.successBg(...input)).toEqual(
            '\u001b[102m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[102m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[102m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.successBg(123)).toEqual('\u001b[102m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.successBg(true)).toEqual('\u001b[102m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.successBg(null)).toEqual('\u001b[102m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.successBg(undefined)).toEqual('\u001b[102m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.successBg({ name: 'foo' })).toEqual('\u001b[102m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.successBg(['foo', 'bar'])).toEqual('\u001b[102m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.successBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.successBg.light('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.successBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.successBg.dark('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.successBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.successBg.lightBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.successBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.successBg.darkBg('this is a test')).toEqual('\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.successBg('this is a test')).toEqual('\u001b[91m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.successBg.red('this is a test')).toEqual('\u001b[102m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.successBg('this is a test')).toEqual('\u001b[103m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.successBg.yellowBg('this is a test')).toEqual('\u001b[102m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.successBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.successBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[102m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.successBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[102m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.successBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[102m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.successBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[102m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('dangerBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.dangerBg'}`, () => {
          expect(colr.dangerBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.dangerBg).toBe('function');
          expect(typeof colr.dangerBg.red).toBe('function');
          expect(typeof colr.dangerBg.light).toBe('function');
          expect(typeof colr.dangerBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.dangerBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.dangerBg(input)).toEqual(
            '\u001b[41m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[41m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[41m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[41m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[41m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.dangerBg(...input)).toEqual(
            '\u001b[41m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[41m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[41m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.dangerBg(123)).toEqual('\u001b[41m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.dangerBg(true)).toEqual('\u001b[41m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.dangerBg(null)).toEqual('\u001b[41m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.dangerBg(undefined)).toEqual('\u001b[41m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.dangerBg({ name: 'foo' })).toEqual('\u001b[41m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.dangerBg(['foo', 'bar'])).toEqual('\u001b[41m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.dangerBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.dangerBg.light('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.dangerBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.dangerBg.dark('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.dangerBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.dangerBg.lightBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.dangerBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.dangerBg.darkBg('this is a test')).toEqual('\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.dangerBg('this is a test')).toEqual('\u001b[91m\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.dangerBg.red('this is a test')).toEqual('\u001b[41m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.dangerBg('this is a test')).toEqual('\u001b[103m\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.dangerBg.yellowBg('this is a test')).toEqual('\u001b[41m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.dangerBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.dangerBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[41m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.dangerBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[41m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.dangerBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[41m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.dangerBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[41m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('warningBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.warningBg'}`, () => {
          expect(colr.warningBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.warningBg).toBe('function');
          expect(typeof colr.warningBg.red).toBe('function');
          expect(typeof colr.warningBg.light).toBe('function');
          expect(typeof colr.warningBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.warningBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.warningBg(input)).toEqual(
            '\u001b[43m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[43m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[43m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[43m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[43m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.warningBg(...input)).toEqual(
            '\u001b[43m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[43m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[43m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.warningBg(123)).toEqual('\u001b[43m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.warningBg(true)).toEqual('\u001b[43m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.warningBg(null)).toEqual('\u001b[43m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.warningBg(undefined)).toEqual('\u001b[43m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.warningBg({ name: 'foo' })).toEqual('\u001b[43m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.warningBg(['foo', 'bar'])).toEqual('\u001b[43m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.warningBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.warningBg.light('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.warningBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.warningBg.dark('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.warningBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.warningBg.lightBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.warningBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.warningBg.darkBg('this is a test')).toEqual('\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.warningBg('this is a test')).toEqual('\u001b[91m\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.warningBg.red('this is a test')).toEqual('\u001b[43m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.warningBg('this is a test')).toEqual('\u001b[103m\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.warningBg.yellowBg('this is a test')).toEqual('\u001b[43m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.warningBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.warningBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[43m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.warningBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[43m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.warningBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[43m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.warningBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[43m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('infoBg', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.infoBg'}`, () => {
          expect(colr.infoBg).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.infoBg).toBe('function');
          expect(typeof colr.infoBg.red).toBe('function');
          expect(typeof colr.infoBg.light).toBe('function');
          expect(typeof colr.infoBg.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.infoBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.infoBg(input)).toEqual(
            '\u001b[104m\u001b[30mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[104m\u001b[39m\u001b[30m in\u001b[39m\u001b[49m\n\u001b[104m\u001b[30ma multiline string\u001b[39m\u001b[49m\n\u001b[104m\u001b[30mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[104m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.infoBg(...input)).toEqual(
            '\u001b[104m\u001b[30m\u001b[31m\u001b[103mword\u001b[49m\u001b[104m\u001b[39m\u001b[30m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[104m\u001b[39m\u001b[30m\u001b[39m\u001b[49m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.infoBg(123)).toEqual('\u001b[104m\u001b[30m123\u001b[39m\u001b[49m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.infoBg(true)).toEqual('\u001b[104m\u001b[30mtrue\u001b[39m\u001b[49m');
        });
        it(should` wrap a null`, () => {
          expect(colr.infoBg(null)).toEqual('\u001b[104m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.infoBg(undefined)).toEqual('\u001b[104m\u001b[30m\u001b[39m\u001b[49m');
        });
        it(should` wrap an object`, () => {
          expect(colr.infoBg({ name: 'foo' })).toEqual('\u001b[104m\u001b[30m{"name":"foo"}\u001b[39m\u001b[49m');
        });
        it(should` wrap an array`, () => {
          expect(colr.infoBg(['foo', 'bar'])).toEqual('\u001b[104m\u001b[30m[foo, bar]\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.infoBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.infoBg.light('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.infoBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.infoBg.dark('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.infoBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.infoBg.lightBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.infoBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
          expect(colr.infoBg.darkBg('this is a test')).toEqual('\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.infoBg('this is a test')).toEqual('\u001b[91m\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[39m');
          expect(colr.infoBg.red('this is a test')).toEqual('\u001b[104m\u001b[30m\u001b[91mthis is a test\u001b[39m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.infoBg('this is a test')).toEqual('\u001b[103m\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m');
          expect(colr.infoBg.yellowBg('this is a test')).toEqual('\u001b[104m\u001b[30m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[49m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.infoBg('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.infoBg.red.yellowBg('this is a test')).toEqual(
            '\u001b[104m\u001b[30m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.infoBg('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[104m\u001b[30mthis is a test\u001b[39m\u001b[49m\u001b[49m\u001b[39m'
          );
          expect(colr.infoBg.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[104m\u001b[30m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[39m\u001b[49m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.infoBg.$`test with ${'word'} in middle`).toEqual('test with \u001b[104m\u001b[30mword\u001b[39m\u001b[49m in middle');
        });
      });
    });

    describe('reset', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.reset'}`, () => {
          expect(colr.reset).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.reset).toBe('function');
          expect(typeof colr.reset.red).toBe('function');
          expect(typeof colr.reset.light).toBe('function');
          expect(typeof colr.reset.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.reset('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.reset(input)).toEqual(
            '\u001b[0mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[0m\n\u001b[0ma multiline string\u001b[0m\n\u001b[0mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[0m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.reset(...input)).toEqual(
            '\u001b[0m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[0m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.reset(123)).toEqual('\u001b[0m123\u001b[0m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.reset(true)).toEqual('\u001b[0mtrue\u001b[0m');
        });
        it(should` wrap a null`, () => {
          expect(colr.reset(null)).toEqual('\u001b[0m\u001b[0m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.reset(undefined)).toEqual('\u001b[0m\u001b[0m');
        });
        it(should` wrap an object`, () => {
          expect(colr.reset({ name: 'foo' })).toEqual('\u001b[0m{"name":"foo"}\u001b[0m');
        });
        it(should` wrap an array`, () => {
          expect(colr.reset(['foo', 'bar'])).toEqual('\u001b[0m[foo, bar]\u001b[0m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.reset('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
          expect(colr.reset.light('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.reset('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
          expect(colr.reset.dark('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.reset('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
          expect(colr.reset.lightBg('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.reset('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
          expect(colr.reset.darkBg('this is a test')).toEqual('\u001b[0mthis is a test\u001b[0m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.reset('this is a test')).toEqual('\u001b[91m\u001b[0mthis is a test\u001b[0m\u001b[39m');
          expect(colr.reset.red('this is a test')).toEqual('\u001b[0m\u001b[91mthis is a test\u001b[39m\u001b[0m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.reset('this is a test')).toEqual('\u001b[103m\u001b[0mthis is a test\u001b[0m\u001b[49m');
          expect(colr.reset.yellowBg('this is a test')).toEqual('\u001b[0m\u001b[103mthis is a test\u001b[49m\u001b[0m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.reset('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[0mthis is a test\u001b[0m\u001b[49m\u001b[39m');
          expect(colr.reset.red.yellowBg('this is a test')).toEqual('\u001b[0m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[0m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.reset('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[0mthis is a test\u001b[0m\u001b[49m\u001b[39m'
          );
          expect(colr.reset.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[0m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[0m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.reset.$`test with ${'word'} in middle`).toEqual('test with \u001b[0mword\u001b[0m in middle');
        });
      });
    });

    describe('bold', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.bold'}`, () => {
          expect(colr.bold).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.bold).toBe('function');
          expect(typeof colr.bold.red).toBe('function');
          expect(typeof colr.bold.light).toBe('function');
          expect(typeof colr.bold.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.bold('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.bold(input)).toEqual(
            '\u001b[1mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[22m\n\u001b[1ma multiline string\u001b[22m\n\u001b[1mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[22m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.bold(...input)).toEqual(
            '\u001b[1m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[22m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.bold(123)).toEqual('\u001b[1m123\u001b[22m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.bold(true)).toEqual('\u001b[1mtrue\u001b[22m');
        });
        it(should` wrap a null`, () => {
          expect(colr.bold(null)).toEqual('\u001b[1m\u001b[22m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.bold(undefined)).toEqual('\u001b[1m\u001b[22m');
        });
        it(should` wrap an object`, () => {
          expect(colr.bold({ name: 'foo' })).toEqual('\u001b[1m{"name":"foo"}\u001b[22m');
        });
        it(should` wrap an array`, () => {
          expect(colr.bold(['foo', 'bar'])).toEqual('\u001b[1m[foo, bar]\u001b[22m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.bold('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
          expect(colr.bold.light('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.bold('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
          expect(colr.bold.dark('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.bold('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
          expect(colr.bold.lightBg('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.bold('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
          expect(colr.bold.darkBg('this is a test')).toEqual('\u001b[1mthis is a test\u001b[22m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.bold('this is a test')).toEqual('\u001b[91m\u001b[1mthis is a test\u001b[22m\u001b[39m');
          expect(colr.bold.red('this is a test')).toEqual('\u001b[1m\u001b[91mthis is a test\u001b[39m\u001b[22m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.bold('this is a test')).toEqual('\u001b[103m\u001b[1mthis is a test\u001b[22m\u001b[49m');
          expect(colr.bold.yellowBg('this is a test')).toEqual('\u001b[1m\u001b[103mthis is a test\u001b[49m\u001b[22m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.bold('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[1mthis is a test\u001b[22m\u001b[49m\u001b[39m');
          expect(colr.bold.red.yellowBg('this is a test')).toEqual('\u001b[1m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[22m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.bold('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[1mthis is a test\u001b[22m\u001b[49m\u001b[39m'
          );
          expect(colr.bold.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[1m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[22m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.bold.$`test with ${'word'} in middle`).toEqual('test with \u001b[1mword\u001b[22m in middle');
        });
      });
    });

    describe('dim', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.dim'}`, () => {
          expect(colr.dim).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.dim).toBe('function');
          expect(typeof colr.dim.red).toBe('function');
          expect(typeof colr.dim.light).toBe('function');
          expect(typeof colr.dim.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.dim('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.dim(input)).toEqual(
            '\u001b[2mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[22m\n\u001b[2ma multiline string\u001b[22m\n\u001b[2mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[22m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.dim(...input)).toEqual(
            '\u001b[2m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[22m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.dim(123)).toEqual('\u001b[2m123\u001b[22m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.dim(true)).toEqual('\u001b[2mtrue\u001b[22m');
        });
        it(should` wrap a null`, () => {
          expect(colr.dim(null)).toEqual('\u001b[2m\u001b[22m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.dim(undefined)).toEqual('\u001b[2m\u001b[22m');
        });
        it(should` wrap an object`, () => {
          expect(colr.dim({ name: 'foo' })).toEqual('\u001b[2m{"name":"foo"}\u001b[22m');
        });
        it(should` wrap an array`, () => {
          expect(colr.dim(['foo', 'bar'])).toEqual('\u001b[2m[foo, bar]\u001b[22m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.dim('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
          expect(colr.dim.light('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.dim('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
          expect(colr.dim.dark('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.dim('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
          expect(colr.dim.lightBg('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.dim('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
          expect(colr.dim.darkBg('this is a test')).toEqual('\u001b[2mthis is a test\u001b[22m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.dim('this is a test')).toEqual('\u001b[91m\u001b[2mthis is a test\u001b[22m\u001b[39m');
          expect(colr.dim.red('this is a test')).toEqual('\u001b[2m\u001b[91mthis is a test\u001b[39m\u001b[22m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.dim('this is a test')).toEqual('\u001b[103m\u001b[2mthis is a test\u001b[22m\u001b[49m');
          expect(colr.dim.yellowBg('this is a test')).toEqual('\u001b[2m\u001b[103mthis is a test\u001b[49m\u001b[22m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.dim('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[2mthis is a test\u001b[22m\u001b[49m\u001b[39m');
          expect(colr.dim.red.yellowBg('this is a test')).toEqual('\u001b[2m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[22m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.dim('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[2mthis is a test\u001b[22m\u001b[49m\u001b[39m'
          );
          expect(colr.dim.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[2m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[22m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.dim.$`test with ${'word'} in middle`).toEqual('test with \u001b[2mword\u001b[22m in middle');
        });
      });
    });

    describe('italic', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.italic'}`, () => {
          expect(colr.italic).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.italic).toBe('function');
          expect(typeof colr.italic.red).toBe('function');
          expect(typeof colr.italic.light).toBe('function');
          expect(typeof colr.italic.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.italic('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.italic(input)).toEqual(
            '\u001b[3mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[23m\n\u001b[3ma multiline string\u001b[23m\n\u001b[3mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[23m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.italic(...input)).toEqual(
            '\u001b[3m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[23m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.italic(123)).toEqual('\u001b[3m123\u001b[23m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.italic(true)).toEqual('\u001b[3mtrue\u001b[23m');
        });
        it(should` wrap a null`, () => {
          expect(colr.italic(null)).toEqual('\u001b[3m\u001b[23m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.italic(undefined)).toEqual('\u001b[3m\u001b[23m');
        });
        it(should` wrap an object`, () => {
          expect(colr.italic({ name: 'foo' })).toEqual('\u001b[3m{"name":"foo"}\u001b[23m');
        });
        it(should` wrap an array`, () => {
          expect(colr.italic(['foo', 'bar'])).toEqual('\u001b[3m[foo, bar]\u001b[23m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.italic('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
          expect(colr.italic.light('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.italic('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
          expect(colr.italic.dark('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.italic('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
          expect(colr.italic.lightBg('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.italic('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
          expect(colr.italic.darkBg('this is a test')).toEqual('\u001b[3mthis is a test\u001b[23m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.italic('this is a test')).toEqual('\u001b[91m\u001b[3mthis is a test\u001b[23m\u001b[39m');
          expect(colr.italic.red('this is a test')).toEqual('\u001b[3m\u001b[91mthis is a test\u001b[39m\u001b[23m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.italic('this is a test')).toEqual('\u001b[103m\u001b[3mthis is a test\u001b[23m\u001b[49m');
          expect(colr.italic.yellowBg('this is a test')).toEqual('\u001b[3m\u001b[103mthis is a test\u001b[49m\u001b[23m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.italic('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[3mthis is a test\u001b[23m\u001b[49m\u001b[39m');
          expect(colr.italic.red.yellowBg('this is a test')).toEqual('\u001b[3m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[23m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.italic('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[3mthis is a test\u001b[23m\u001b[49m\u001b[39m'
          );
          expect(colr.italic.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[3m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[23m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.italic.$`test with ${'word'} in middle`).toEqual('test with \u001b[3mword\u001b[23m in middle');
        });
      });
    });

    describe('overline', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.overline'}`, () => {
          expect(colr.overline).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.overline).toBe('function');
          expect(typeof colr.overline.red).toBe('function');
          expect(typeof colr.overline.light).toBe('function');
          expect(typeof colr.overline.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.overline('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.overline(input)).toEqual(
            '\u001b[53mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[55m\n\u001b[53ma multiline string\u001b[55m\n\u001b[53mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[55m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.overline(...input)).toEqual(
            '\u001b[53m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[55m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.overline(123)).toEqual('\u001b[53m123\u001b[55m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.overline(true)).toEqual('\u001b[53mtrue\u001b[55m');
        });
        it(should` wrap a null`, () => {
          expect(colr.overline(null)).toEqual('\u001b[53m\u001b[55m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.overline(undefined)).toEqual('\u001b[53m\u001b[55m');
        });
        it(should` wrap an object`, () => {
          expect(colr.overline({ name: 'foo' })).toEqual('\u001b[53m{"name":"foo"}\u001b[55m');
        });
        it(should` wrap an array`, () => {
          expect(colr.overline(['foo', 'bar'])).toEqual('\u001b[53m[foo, bar]\u001b[55m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.overline('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
          expect(colr.overline.light('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.overline('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
          expect(colr.overline.dark('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.overline('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
          expect(colr.overline.lightBg('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.overline('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
          expect(colr.overline.darkBg('this is a test')).toEqual('\u001b[53mthis is a test\u001b[55m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.overline('this is a test')).toEqual('\u001b[91m\u001b[53mthis is a test\u001b[55m\u001b[39m');
          expect(colr.overline.red('this is a test')).toEqual('\u001b[53m\u001b[91mthis is a test\u001b[39m\u001b[55m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.overline('this is a test')).toEqual('\u001b[103m\u001b[53mthis is a test\u001b[55m\u001b[49m');
          expect(colr.overline.yellowBg('this is a test')).toEqual('\u001b[53m\u001b[103mthis is a test\u001b[49m\u001b[55m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.overline('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[53mthis is a test\u001b[55m\u001b[49m\u001b[39m');
          expect(colr.overline.red.yellowBg('this is a test')).toEqual('\u001b[53m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[55m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.overline('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[53mthis is a test\u001b[55m\u001b[49m\u001b[39m'
          );
          expect(colr.overline.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[53m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[55m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.overline.$`test with ${'word'} in middle`).toEqual('test with \u001b[53mword\u001b[55m in middle');
        });
      });
    });

    describe('underline', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.underline'}`, () => {
          expect(colr.underline).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.underline).toBe('function');
          expect(typeof colr.underline.red).toBe('function');
          expect(typeof colr.underline.light).toBe('function');
          expect(typeof colr.underline.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.underline('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.underline(input)).toEqual(
            '\u001b[4mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[24m\n\u001b[4ma multiline string\u001b[24m\n\u001b[4mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[24m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.underline(...input)).toEqual(
            '\u001b[4m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[24m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.underline(123)).toEqual('\u001b[4m123\u001b[24m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.underline(true)).toEqual('\u001b[4mtrue\u001b[24m');
        });
        it(should` wrap a null`, () => {
          expect(colr.underline(null)).toEqual('\u001b[4m\u001b[24m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.underline(undefined)).toEqual('\u001b[4m\u001b[24m');
        });
        it(should` wrap an object`, () => {
          expect(colr.underline({ name: 'foo' })).toEqual('\u001b[4m{"name":"foo"}\u001b[24m');
        });
        it(should` wrap an array`, () => {
          expect(colr.underline(['foo', 'bar'])).toEqual('\u001b[4m[foo, bar]\u001b[24m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.underline('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
          expect(colr.underline.light('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.underline('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
          expect(colr.underline.dark('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.underline('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
          expect(colr.underline.lightBg('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.underline('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
          expect(colr.underline.darkBg('this is a test')).toEqual('\u001b[4mthis is a test\u001b[24m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.underline('this is a test')).toEqual('\u001b[91m\u001b[4mthis is a test\u001b[24m\u001b[39m');
          expect(colr.underline.red('this is a test')).toEqual('\u001b[4m\u001b[91mthis is a test\u001b[39m\u001b[24m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.underline('this is a test')).toEqual('\u001b[103m\u001b[4mthis is a test\u001b[24m\u001b[49m');
          expect(colr.underline.yellowBg('this is a test')).toEqual('\u001b[4m\u001b[103mthis is a test\u001b[49m\u001b[24m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.underline('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[4mthis is a test\u001b[24m\u001b[49m\u001b[39m');
          expect(colr.underline.red.yellowBg('this is a test')).toEqual('\u001b[4m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[24m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.underline('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[4mthis is a test\u001b[24m\u001b[49m\u001b[39m'
          );
          expect(colr.underline.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[4m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[24m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.underline.$`test with ${'word'} in middle`).toEqual('test with \u001b[4mword\u001b[24m in middle');
        });
      });
    });

    describe('strikethrough', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.strikethrough'}`, () => {
          expect(colr.strikethrough).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.strikethrough).toBe('function');
          expect(typeof colr.strikethrough.red).toBe('function');
          expect(typeof colr.strikethrough.light).toBe('function');
          expect(typeof colr.strikethrough.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.strikethrough('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.strikethrough(input)).toEqual(
            '\u001b[9mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[29m\n\u001b[9ma multiline string\u001b[29m\n\u001b[9mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[29m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.strikethrough(...input)).toEqual(
            '\u001b[9m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[29m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.strikethrough(123)).toEqual('\u001b[9m123\u001b[29m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.strikethrough(true)).toEqual('\u001b[9mtrue\u001b[29m');
        });
        it(should` wrap a null`, () => {
          expect(colr.strikethrough(null)).toEqual('\u001b[9m\u001b[29m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.strikethrough(undefined)).toEqual('\u001b[9m\u001b[29m');
        });
        it(should` wrap an object`, () => {
          expect(colr.strikethrough({ name: 'foo' })).toEqual('\u001b[9m{"name":"foo"}\u001b[29m');
        });
        it(should` wrap an array`, () => {
          expect(colr.strikethrough(['foo', 'bar'])).toEqual('\u001b[9m[foo, bar]\u001b[29m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.strikethrough('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
          expect(colr.strikethrough.light('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.strikethrough('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
          expect(colr.strikethrough.dark('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.strikethrough('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
          expect(colr.strikethrough.lightBg('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.strikethrough('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
          expect(colr.strikethrough.darkBg('this is a test')).toEqual('\u001b[9mthis is a test\u001b[29m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.strikethrough('this is a test')).toEqual('\u001b[91m\u001b[9mthis is a test\u001b[29m\u001b[39m');
          expect(colr.strikethrough.red('this is a test')).toEqual('\u001b[9m\u001b[91mthis is a test\u001b[39m\u001b[29m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.strikethrough('this is a test')).toEqual('\u001b[103m\u001b[9mthis is a test\u001b[29m\u001b[49m');
          expect(colr.strikethrough.yellowBg('this is a test')).toEqual('\u001b[9m\u001b[103mthis is a test\u001b[49m\u001b[29m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.strikethrough('this is a test')).toEqual(
            '\u001b[91m\u001b[103m\u001b[9mthis is a test\u001b[29m\u001b[49m\u001b[39m'
          );
          expect(colr.strikethrough.red.yellowBg('this is a test')).toEqual(
            '\u001b[9m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[29m'
          );
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.strikethrough('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[9mthis is a test\u001b[29m\u001b[49m\u001b[39m'
          );
          expect(colr.strikethrough.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[9m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[29m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.strikethrough.$`test with ${'word'} in middle`).toEqual('test with \u001b[9mword\u001b[29m in middle');
        });
      });
    });

    describe('inverse', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.inverse'}`, () => {
          expect(colr.inverse).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.inverse).toBe('function');
          expect(typeof colr.inverse.red).toBe('function');
          expect(typeof colr.inverse.light).toBe('function');
          expect(typeof colr.inverse.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.inverse('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.inverse(input)).toEqual(
            '\u001b[7mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[27m\n\u001b[7ma multiline string\u001b[27m\n\u001b[7mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[27m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.inverse(...input)).toEqual(
            '\u001b[7m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[27m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.inverse(123)).toEqual('\u001b[7m123\u001b[27m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.inverse(true)).toEqual('\u001b[7mtrue\u001b[27m');
        });
        it(should` wrap a null`, () => {
          expect(colr.inverse(null)).toEqual('\u001b[7m\u001b[27m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.inverse(undefined)).toEqual('\u001b[7m\u001b[27m');
        });
        it(should` wrap an object`, () => {
          expect(colr.inverse({ name: 'foo' })).toEqual('\u001b[7m{"name":"foo"}\u001b[27m');
        });
        it(should` wrap an array`, () => {
          expect(colr.inverse(['foo', 'bar'])).toEqual('\u001b[7m[foo, bar]\u001b[27m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.inverse('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
          expect(colr.inverse.light('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.inverse('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
          expect(colr.inverse.dark('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.inverse('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
          expect(colr.inverse.lightBg('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.inverse('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
          expect(colr.inverse.darkBg('this is a test')).toEqual('\u001b[7mthis is a test\u001b[27m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.inverse('this is a test')).toEqual('\u001b[91m\u001b[7mthis is a test\u001b[27m\u001b[39m');
          expect(colr.inverse.red('this is a test')).toEqual('\u001b[7m\u001b[91mthis is a test\u001b[39m\u001b[27m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.inverse('this is a test')).toEqual('\u001b[103m\u001b[7mthis is a test\u001b[27m\u001b[49m');
          expect(colr.inverse.yellowBg('this is a test')).toEqual('\u001b[7m\u001b[103mthis is a test\u001b[49m\u001b[27m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.inverse('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[7mthis is a test\u001b[27m\u001b[49m\u001b[39m');
          expect(colr.inverse.red.yellowBg('this is a test')).toEqual('\u001b[7m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[27m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.inverse('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[7mthis is a test\u001b[27m\u001b[49m\u001b[39m'
          );
          expect(colr.inverse.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[7m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[27m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.inverse.$`test with ${'word'} in middle`).toEqual('test with \u001b[7mword\u001b[27m in middle');
        });
      });
    });

    describe('hidden', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.hidden'}`, () => {
          expect(colr.hidden).toBeDefined();
        });

        it(should` have ColrFn properties`, () => {
          expect(typeof colr.hidden).toBe('function');
          expect(typeof colr.hidden.red).toBe('function');
          expect(typeof colr.hidden.light).toBe('function');
          expect(typeof colr.hidden.darkYellowBg).toBe('function');
        });

        // basics
        it(should` wrap a string`, () => {
          expect(colr.hidden('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
        });
        it(should` wrap a complex string`, () => {
          const input = [
            'this is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in',
            'a multiline string',
            'with \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m'
          ].join('\n');

          expect(colr.hidden(input)).toEqual(
            '\u001b[8mthis is \u001b[31m\u001b[103ma word\u001b[49m\u001b[39m in\u001b[28m\n\u001b[8ma multiline string\u001b[28m\n\u001b[8mwith \u001b[34m\u001b[102mstyled sections\u001b[49m\u001b[39m\u001b[28m'
          );
        });
        it(should` wrap multiple args`, () => {
          const input = ['\u001b[31m\u001b[103mword\u001b[49m\u001b[39m', 'with', '\u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m'];

          expect(colr.hidden(...input)).toEqual(
            '\u001b[8m\u001b[31m\u001b[103mword\u001b[49m\u001b[39m with \u001b[34m\u001b[102mstyles\u001b[49m\u001b[39m\u001b[28m'
          );
        });

        // input types
        it(should` wrap a number`, () => {
          expect(colr.hidden(123)).toEqual('\u001b[8m123\u001b[28m');
        });
        it(should` wrap a boolean`, () => {
          expect(colr.hidden(true)).toEqual('\u001b[8mtrue\u001b[28m');
        });
        it(should` wrap a null`, () => {
          expect(colr.hidden(null)).toEqual('\u001b[8m\u001b[28m');
        });
        it(should` wrap a undefined`, () => {
          expect(colr.hidden(undefined)).toEqual('\u001b[8m\u001b[28m');
        });
        it(should` wrap an object`, () => {
          expect(colr.hidden({ name: 'foo' })).toEqual('\u001b[8m{"name":"foo"}\u001b[28m');
        });
        it(should` wrap an array`, () => {
          expect(colr.hidden(['foo', 'bar'])).toEqual('\u001b[8m[foo, bar]\u001b[28m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.hidden('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
          expect(colr.hidden.light('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.hidden('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
          expect(colr.hidden.dark('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.hidden('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
          expect(colr.hidden.lightBg('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.hidden('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
          expect(colr.hidden.darkBg('this is a test')).toEqual('\u001b[8mthis is a test\u001b[28m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.hidden('this is a test')).toEqual('\u001b[91m\u001b[8mthis is a test\u001b[28m\u001b[39m');
          expect(colr.hidden.red('this is a test')).toEqual('\u001b[8m\u001b[91mthis is a test\u001b[39m\u001b[28m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.hidden('this is a test')).toEqual('\u001b[103m\u001b[8mthis is a test\u001b[28m\u001b[49m');
          expect(colr.hidden.yellowBg('this is a test')).toEqual('\u001b[8m\u001b[103mthis is a test\u001b[49m\u001b[28m');
        });
        it(should` chain modifiers - red.yellowBg`, () => {
          expect(colr.red.yellowBg.hidden('this is a test')).toEqual('\u001b[91m\u001b[103m\u001b[8mthis is a test\u001b[28m\u001b[49m\u001b[39m');
          expect(colr.hidden.red.yellowBg('this is a test')).toEqual('\u001b[8m\u001b[91m\u001b[103mthis is a test\u001b[49m\u001b[39m\u001b[28m');
        });
        it(should` chain modifiers - darkBlue.lightGreenBg`, () => {
          expect(colr.darkBlue.lightGreenBg.hidden('this is a test')).toEqual(
            '\u001b[34m\u001b[102m\u001b[8mthis is a test\u001b[28m\u001b[49m\u001b[39m'
          );
          expect(colr.hidden.darkBlue.lightGreenBg('this is a test')).toEqual(
            '\u001b[8m\u001b[34m\u001b[102mthis is a test\u001b[49m\u001b[39m\u001b[28m'
          );
        });

        // template literals
        it(should` wrap a template literal`, () => {
          expect(colr.hidden.$`test with ${'word'} in middle`).toEqual('test with \u001b[8mword\u001b[28m in middle');
        });
      });
    });
  });

  describe('sets', () => {
    describe('red', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        colr.setOutputMode('ANSI');
        it(should` exist as ${name + 'sets.red'}`, () => {
          expect(colr.sets.red).toBeDefined();
        });
        it(should` exist as ${name + 'red.sets.red'}`, () => {
          expect(colr.red.sets.red).toBeDefined();
        });
        it(should` exist as ${name + 'dark.red.sets.red'}`, () => {
          expect(colr.dark.red.sets.red).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.red.text).toBe('function');
          expect(typeof colr.sets.red.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.red.text('hello world')).toEqual('\u001b[91mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.red.bg('hello world')).toEqual('\u001b[101mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.red.text('hello world')).toEqual('\u001b[91mhello world\u001b[39m');
          expect(colr.sets.red.text.light('hello world')).toEqual('\u001b[91mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.red.text('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
          expect(colr.sets.red.text.dark('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.red.bg('hello world')).toEqual('\u001b[101mhello world\u001b[49m');
          expect(colr.sets.red.bg.lightBg('hello world')).toEqual('\u001b[101mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.red.bg('hello world')).toEqual('\u001b[41mhello world\u001b[49m');
          expect(colr.sets.red.bg.darkBg('hello world')).toEqual('\u001b[41mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.red.text('hello world')).toEqual('\u001b[91m\u001b[91mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.red.bg('hello world')).toEqual('\u001b[91m\u001b[101mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.red.text('hello world')).toEqual('\u001b[103m\u001b[91mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.red.bg('hello world')).toEqual('\u001b[103m\u001b[101mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('green', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.green'}`, () => {
          expect(colr.sets.green).toBeDefined();
        });
        it(should` exist as ${name + 'green.sets.green'}`, () => {
          expect(colr.green.sets.green).toBeDefined();
        });
        it(should` exist as ${name + 'dark.green.sets.green'}`, () => {
          expect(colr.dark.green.sets.green).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.green.text).toBe('function');
          expect(typeof colr.sets.green.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.green.text('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.green.bg('hello world')).toEqual('\u001b[102mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.green.text('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
          expect(colr.sets.green.text.light('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.green.text('hello world')).toEqual('\u001b[32mhello world\u001b[39m');
          expect(colr.sets.green.text.dark('hello world')).toEqual('\u001b[32mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.green.bg('hello world')).toEqual('\u001b[102mhello world\u001b[49m');
          expect(colr.sets.green.bg.lightBg('hello world')).toEqual('\u001b[102mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.green.bg('hello world')).toEqual('\u001b[42mhello world\u001b[49m');
          expect(colr.sets.green.bg.darkBg('hello world')).toEqual('\u001b[42mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.green.text('hello world')).toEqual('\u001b[91m\u001b[92mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.green.bg('hello world')).toEqual('\u001b[91m\u001b[102mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.green.text('hello world')).toEqual('\u001b[103m\u001b[92mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.green.bg('hello world')).toEqual('\u001b[103m\u001b[102mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('yellow', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.yellow'}`, () => {
          expect(colr.sets.yellow).toBeDefined();
        });
        it(should` exist as ${name + 'yellow.sets.yellow'}`, () => {
          expect(colr.yellow.sets.yellow).toBeDefined();
        });
        it(should` exist as ${name + 'dark.yellow.sets.yellow'}`, () => {
          expect(colr.dark.yellow.sets.yellow).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.yellow.text).toBe('function');
          expect(typeof colr.sets.yellow.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.yellow.text('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.yellow.bg('hello world')).toEqual('\u001b[103mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.yellow.text('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
          expect(colr.sets.yellow.text.light('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.yellow.text('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
          expect(colr.sets.yellow.text.dark('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.yellow.bg('hello world')).toEqual('\u001b[103mhello world\u001b[49m');
          expect(colr.sets.yellow.bg.lightBg('hello world')).toEqual('\u001b[103mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.yellow.bg('hello world')).toEqual('\u001b[43mhello world\u001b[49m');
          expect(colr.sets.yellow.bg.darkBg('hello world')).toEqual('\u001b[43mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.yellow.text('hello world')).toEqual('\u001b[91m\u001b[93mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.yellow.bg('hello world')).toEqual('\u001b[91m\u001b[103mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.yellow.text('hello world')).toEqual('\u001b[103m\u001b[93mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.yellow.bg('hello world')).toEqual('\u001b[103m\u001b[103mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('blue', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.blue'}`, () => {
          expect(colr.sets.blue).toBeDefined();
        });
        it(should` exist as ${name + 'blue.sets.blue'}`, () => {
          expect(colr.blue.sets.blue).toBeDefined();
        });
        it(should` exist as ${name + 'dark.blue.sets.blue'}`, () => {
          expect(colr.dark.blue.sets.blue).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.blue.text).toBe('function');
          expect(typeof colr.sets.blue.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.blue.text('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.blue.bg('hello world')).toEqual('\u001b[104mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.blue.text('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
          expect(colr.sets.blue.text.light('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.blue.text('hello world')).toEqual('\u001b[34mhello world\u001b[39m');
          expect(colr.sets.blue.text.dark('hello world')).toEqual('\u001b[34mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.blue.bg('hello world')).toEqual('\u001b[104mhello world\u001b[49m');
          expect(colr.sets.blue.bg.lightBg('hello world')).toEqual('\u001b[104mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.blue.bg('hello world')).toEqual('\u001b[44mhello world\u001b[49m');
          expect(colr.sets.blue.bg.darkBg('hello world')).toEqual('\u001b[44mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.blue.text('hello world')).toEqual('\u001b[91m\u001b[94mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.blue.bg('hello world')).toEqual('\u001b[91m\u001b[104mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.blue.text('hello world')).toEqual('\u001b[103m\u001b[94mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.blue.bg('hello world')).toEqual('\u001b[103m\u001b[104mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('magenta', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.magenta'}`, () => {
          expect(colr.sets.magenta).toBeDefined();
        });
        it(should` exist as ${name + 'magenta.sets.magenta'}`, () => {
          expect(colr.magenta.sets.magenta).toBeDefined();
        });
        it(should` exist as ${name + 'dark.magenta.sets.magenta'}`, () => {
          expect(colr.dark.magenta.sets.magenta).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.magenta.text).toBe('function');
          expect(typeof colr.sets.magenta.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.magenta.text('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.magenta.bg('hello world')).toEqual('\u001b[105mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.magenta.text('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
          expect(colr.sets.magenta.text.light('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.magenta.text('hello world')).toEqual('\u001b[35mhello world\u001b[39m');
          expect(colr.sets.magenta.text.dark('hello world')).toEqual('\u001b[35mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.magenta.bg('hello world')).toEqual('\u001b[105mhello world\u001b[49m');
          expect(colr.sets.magenta.bg.lightBg('hello world')).toEqual('\u001b[105mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.magenta.bg('hello world')).toEqual('\u001b[45mhello world\u001b[49m');
          expect(colr.sets.magenta.bg.darkBg('hello world')).toEqual('\u001b[45mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.magenta.text('hello world')).toEqual('\u001b[91m\u001b[95mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.magenta.bg('hello world')).toEqual('\u001b[91m\u001b[105mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.magenta.text('hello world')).toEqual('\u001b[103m\u001b[95mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.magenta.bg('hello world')).toEqual('\u001b[103m\u001b[105mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('cyan', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.cyan'}`, () => {
          expect(colr.sets.cyan).toBeDefined();
        });
        it(should` exist as ${name + 'cyan.sets.cyan'}`, () => {
          expect(colr.cyan.sets.cyan).toBeDefined();
        });
        it(should` exist as ${name + 'dark.cyan.sets.cyan'}`, () => {
          expect(colr.dark.cyan.sets.cyan).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.cyan.text).toBe('function');
          expect(typeof colr.sets.cyan.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.cyan.text('hello world')).toEqual('\u001b[96mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.cyan.bg('hello world')).toEqual('\u001b[106mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.cyan.text('hello world')).toEqual('\u001b[96mhello world\u001b[39m');
          expect(colr.sets.cyan.text.light('hello world')).toEqual('\u001b[96mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.cyan.text('hello world')).toEqual('\u001b[36mhello world\u001b[39m');
          expect(colr.sets.cyan.text.dark('hello world')).toEqual('\u001b[36mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.cyan.bg('hello world')).toEqual('\u001b[106mhello world\u001b[49m');
          expect(colr.sets.cyan.bg.lightBg('hello world')).toEqual('\u001b[106mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.cyan.bg('hello world')).toEqual('\u001b[46mhello world\u001b[49m');
          expect(colr.sets.cyan.bg.darkBg('hello world')).toEqual('\u001b[46mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.cyan.text('hello world')).toEqual('\u001b[91m\u001b[96mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.cyan.bg('hello world')).toEqual('\u001b[91m\u001b[106mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.cyan.text('hello world')).toEqual('\u001b[103m\u001b[96mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.cyan.bg('hello world')).toEqual('\u001b[103m\u001b[106mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('white', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.white'}`, () => {
          expect(colr.sets.white).toBeDefined();
        });
        it(should` exist as ${name + 'white.sets.white'}`, () => {
          expect(colr.white.sets.white).toBeDefined();
        });
        it(should` exist as ${name + 'dark.white.sets.white'}`, () => {
          expect(colr.dark.white.sets.white).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.white.text).toBe('function');
          expect(typeof colr.sets.white.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.white.text('hello world')).toEqual('\u001b[97mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.white.bg('hello world')).toEqual('\u001b[107mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.white.text('hello world')).toEqual('\u001b[97mhello world\u001b[39m');
          expect(colr.sets.white.text.light('hello world')).toEqual('\u001b[97mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.white.text('hello world')).toEqual('\u001b[37mhello world\u001b[39m');
          expect(colr.sets.white.text.dark('hello world')).toEqual('\u001b[37mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.white.bg('hello world')).toEqual('\u001b[107mhello world\u001b[49m');
          expect(colr.sets.white.bg.lightBg('hello world')).toEqual('\u001b[107mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.white.bg('hello world')).toEqual('\u001b[47mhello world\u001b[49m');
          expect(colr.sets.white.bg.darkBg('hello world')).toEqual('\u001b[47mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.white.text('hello world')).toEqual('\u001b[91m\u001b[97mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.white.bg('hello world')).toEqual('\u001b[91m\u001b[107mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.white.text('hello world')).toEqual('\u001b[103m\u001b[97mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.white.bg('hello world')).toEqual('\u001b[103m\u001b[107mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('black', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.black'}`, () => {
          expect(colr.sets.black).toBeDefined();
        });
        it(should` exist as ${name + 'black.sets.black'}`, () => {
          expect(colr.black.sets.black).toBeDefined();
        });
        it(should` exist as ${name + 'dark.black.sets.black'}`, () => {
          expect(colr.dark.black.sets.black).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.black.text).toBe('function');
          expect(typeof colr.sets.black.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.black.text('hello world')).toEqual('\u001b[30mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.black.bg('hello world')).toEqual('\u001b[40mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.black.text('hello world')).toEqual('\u001b[30mhello world\u001b[39m');
          expect(colr.sets.black.text.light('hello world')).toEqual('\u001b[30mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.black.text('hello world')).toEqual('\u001b[30mhello world\u001b[39m');
          expect(colr.sets.black.text.dark('hello world')).toEqual('\u001b[30mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.black.bg('hello world')).toEqual('\u001b[40mhello world\u001b[49m');
          expect(colr.sets.black.bg.lightBg('hello world')).toEqual('\u001b[40mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.black.bg('hello world')).toEqual('\u001b[40mhello world\u001b[49m');
          expect(colr.sets.black.bg.darkBg('hello world')).toEqual('\u001b[40mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.black.text('hello world')).toEqual('\u001b[91m\u001b[30mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.black.bg('hello world')).toEqual('\u001b[91m\u001b[40mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.black.text('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.black.bg('hello world')).toEqual('\u001b[103m\u001b[40mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('lightBlack', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.lightBlack'}`, () => {
          expect(colr.sets.lightBlack).toBeDefined();
        });
        it(should` exist as ${name + 'lightBlack.sets.lightBlack'}`, () => {
          expect(colr.lightBlack.sets.lightBlack).toBeDefined();
        });
        it(should` exist as ${name + 'dark.lightBlack.sets.lightBlack'}`, () => {
          expect(colr.dark.lightBlack.sets.lightBlack).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.lightBlack.text).toBe('function');
          expect(typeof colr.sets.lightBlack.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.lightBlack.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.lightBlack.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.lightBlack.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.lightBlack.text.light('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.lightBlack.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.lightBlack.text.dark('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.lightBlack.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.lightBlack.bg.lightBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.lightBlack.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.lightBlack.bg.darkBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.lightBlack.text('hello world')).toEqual('\u001b[91m\u001b[90mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.lightBlack.bg('hello world')).toEqual('\u001b[91m\u001b[100mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.lightBlack.text('hello world')).toEqual('\u001b[103m\u001b[90mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.lightBlack.bg('hello world')).toEqual('\u001b[103m\u001b[100mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('grey', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.grey'}`, () => {
          expect(colr.sets.grey).toBeDefined();
        });
        it(should` exist as ${name + 'grey.sets.grey'}`, () => {
          expect(colr.grey.sets.grey).toBeDefined();
        });
        it(should` exist as ${name + 'dark.grey.sets.grey'}`, () => {
          expect(colr.dark.grey.sets.grey).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.grey.text).toBe('function');
          expect(typeof colr.sets.grey.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.grey.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.grey.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.grey.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.grey.text.light('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.grey.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.grey.text.dark('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.grey.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.grey.bg.lightBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.grey.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.grey.bg.darkBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.grey.text('hello world')).toEqual('\u001b[91m\u001b[90mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.grey.bg('hello world')).toEqual('\u001b[91m\u001b[100mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.grey.text('hello world')).toEqual('\u001b[103m\u001b[90mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.grey.bg('hello world')).toEqual('\u001b[103m\u001b[100mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('gray', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.gray'}`, () => {
          expect(colr.sets.gray).toBeDefined();
        });
        it(should` exist as ${name + 'gray.sets.gray'}`, () => {
          expect(colr.gray.sets.gray).toBeDefined();
        });
        it(should` exist as ${name + 'dark.gray.sets.gray'}`, () => {
          expect(colr.dark.gray.sets.gray).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.gray.text).toBe('function');
          expect(typeof colr.sets.gray.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.gray.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.gray.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.gray.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.gray.text.light('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.gray.text('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
          expect(colr.sets.gray.text.dark('hello world')).toEqual('\u001b[90mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.gray.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.gray.bg.lightBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.gray.bg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
          expect(colr.sets.gray.bg.darkBg('hello world')).toEqual('\u001b[100mhello world\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.gray.text('hello world')).toEqual('\u001b[91m\u001b[90mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.gray.bg('hello world')).toEqual('\u001b[91m\u001b[100mhello world\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.gray.text('hello world')).toEqual('\u001b[103m\u001b[90mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.gray.bg('hello world')).toEqual('\u001b[103m\u001b[100mhello world\u001b[49m\u001b[49m');
        });
      });
    });

    describe('primary', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.primary'}`, () => {
          expect(colr.sets.primary).toBeDefined();
        });
        it(should` exist as ${name + 'primary.sets.primary'}`, () => {
          expect(colr.primary.sets.primary).toBeDefined();
        });
        it(should` exist as ${name + 'dark.primary.sets.primary'}`, () => {
          expect(colr.dark.primary.sets.primary).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.primary.text).toBe('function');
          expect(typeof colr.sets.primary.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.primary.text('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.primary.bg('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.primary.text('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
          expect(colr.sets.primary.text.light('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.primary.text('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
          expect(colr.sets.primary.text.dark('hello world')).toEqual('\u001b[93mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.primary.bg('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.primary.bg.lightBg('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.primary.bg('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.primary.bg.darkBg('hello world')).toEqual('\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.primary.text('hello world')).toEqual('\u001b[91m\u001b[93mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.primary.bg('hello world')).toEqual('\u001b[91m\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.primary.text('hello world')).toEqual('\u001b[103m\u001b[93mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.primary.bg('hello world')).toEqual('\u001b[103m\u001b[103m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });

    describe('secondary', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.secondary'}`, () => {
          expect(colr.sets.secondary).toBeDefined();
        });
        it(should` exist as ${name + 'secondary.sets.secondary'}`, () => {
          expect(colr.secondary.sets.secondary).toBeDefined();
        });
        it(should` exist as ${name + 'dark.secondary.sets.secondary'}`, () => {
          expect(colr.dark.secondary.sets.secondary).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.secondary.text).toBe('function');
          expect(typeof colr.sets.secondary.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.secondary.text('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.secondary.bg('hello world')).toEqual('\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.secondary.text('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
          expect(colr.sets.secondary.text.light('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.secondary.text('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
          expect(colr.sets.secondary.text.dark('hello world')).toEqual('\u001b[95mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.secondary.bg('hello world')).toEqual('\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.secondary.bg.lightBg('hello world')).toEqual('\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.secondary.bg('hello world')).toEqual('\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.secondary.bg.darkBg('hello world')).toEqual('\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.secondary.text('hello world')).toEqual('\u001b[91m\u001b[95mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.secondary.bg('hello world')).toEqual('\u001b[91m\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.secondary.text('hello world')).toEqual('\u001b[103m\u001b[95mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.secondary.bg('hello world')).toEqual('\u001b[103m\u001b[105m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });

    describe('success', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.success'}`, () => {
          expect(colr.sets.success).toBeDefined();
        });
        it(should` exist as ${name + 'success.sets.success'}`, () => {
          expect(colr.success.sets.success).toBeDefined();
        });
        it(should` exist as ${name + 'dark.success.sets.success'}`, () => {
          expect(colr.dark.success.sets.success).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.success.text).toBe('function');
          expect(typeof colr.sets.success.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.success.text('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.success.bg('hello world')).toEqual('\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.success.text('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
          expect(colr.sets.success.text.light('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.success.text('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
          expect(colr.sets.success.text.dark('hello world')).toEqual('\u001b[92mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.success.bg('hello world')).toEqual('\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.success.bg.lightBg('hello world')).toEqual('\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.success.bg('hello world')).toEqual('\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.success.bg.darkBg('hello world')).toEqual('\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.success.text('hello world')).toEqual('\u001b[91m\u001b[92mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.success.bg('hello world')).toEqual('\u001b[91m\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.success.text('hello world')).toEqual('\u001b[103m\u001b[92mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.success.bg('hello world')).toEqual('\u001b[103m\u001b[102m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });

    describe('danger', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.danger'}`, () => {
          expect(colr.sets.danger).toBeDefined();
        });
        it(should` exist as ${name + 'danger.sets.danger'}`, () => {
          expect(colr.danger.sets.danger).toBeDefined();
        });
        it(should` exist as ${name + 'dark.danger.sets.danger'}`, () => {
          expect(colr.dark.danger.sets.danger).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.danger.text).toBe('function');
          expect(typeof colr.sets.danger.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.danger.text('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.danger.bg('hello world')).toEqual('\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.danger.text('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
          expect(colr.sets.danger.text.light('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.danger.text('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
          expect(colr.sets.danger.text.dark('hello world')).toEqual('\u001b[31mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.danger.bg('hello world')).toEqual('\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.danger.bg.lightBg('hello world')).toEqual('\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.danger.bg('hello world')).toEqual('\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.danger.bg.darkBg('hello world')).toEqual('\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.danger.text('hello world')).toEqual('\u001b[91m\u001b[31mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.danger.bg('hello world')).toEqual('\u001b[91m\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.danger.text('hello world')).toEqual('\u001b[103m\u001b[31mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.danger.bg('hello world')).toEqual('\u001b[103m\u001b[41m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });

    describe('warning', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.warning'}`, () => {
          expect(colr.sets.warning).toBeDefined();
        });
        it(should` exist as ${name + 'warning.sets.warning'}`, () => {
          expect(colr.warning.sets.warning).toBeDefined();
        });
        it(should` exist as ${name + 'dark.warning.sets.warning'}`, () => {
          expect(colr.dark.warning.sets.warning).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.warning.text).toBe('function');
          expect(typeof colr.sets.warning.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.warning.text('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.warning.bg('hello world')).toEqual('\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.warning.text('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
          expect(colr.sets.warning.text.light('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.warning.text('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
          expect(colr.sets.warning.text.dark('hello world')).toEqual('\u001b[33mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.warning.bg('hello world')).toEqual('\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.warning.bg.lightBg('hello world')).toEqual('\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.warning.bg('hello world')).toEqual('\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.warning.bg.darkBg('hello world')).toEqual('\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.warning.text('hello world')).toEqual('\u001b[91m\u001b[33mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.warning.bg('hello world')).toEqual('\u001b[91m\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.warning.text('hello world')).toEqual('\u001b[103m\u001b[33mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.warning.bg('hello world')).toEqual('\u001b[103m\u001b[43m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });

    describe('info', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + 'sets.info'}`, () => {
          expect(colr.sets.info).toBeDefined();
        });
        it(should` exist as ${name + 'info.sets.info'}`, () => {
          expect(colr.info.sets.info).toBeDefined();
        });
        it(should` exist as ${name + 'dark.info.sets.info'}`, () => {
          expect(colr.dark.info.sets.info).toBeDefined();
        });

        it(should` have ColrSet properties`, () => {
          expect(typeof colr.sets.info.text).toBe('function');
          expect(typeof colr.sets.info.bg).toBe('function');
        });

        // basics
        it(should` wrap a string with text colour`, () => {
          expect(colr.sets.info.text('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
        });
        it(should` wrap a string with bg colour`, () => {
          expect(colr.sets.info.bg('hello world')).toEqual('\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // modifiers
        it(should` wrap a string with 'light'`, () => {
          expect(colr.light.sets.info.text('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
          expect(colr.sets.info.text.light('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
        });
        it(should` wrap a string with 'dark'`, () => {
          expect(colr.dark.sets.info.text('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
          expect(colr.sets.info.text.dark('hello world')).toEqual('\u001b[94mhello world\u001b[39m');
        });
        it(should` wrap a string with 'lightBg'`, () => {
          expect(colr.lightBg.sets.info.bg('hello world')).toEqual('\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.info.bg.lightBg('hello world')).toEqual('\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m');
        });
        it(should` wrap a string with 'darkBg'`, () => {
          expect(colr.darkBg.sets.info.bg('hello world')).toEqual('\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m');
          expect(colr.sets.info.bg.darkBg('hello world')).toEqual('\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m');
        });

        // chaining
        it(should` chain modifiers - red`, () => {
          expect(colr.red.sets.info.text('hello world')).toEqual('\u001b[91m\u001b[94mhello world\u001b[39m\u001b[39m');
          expect(colr.red.sets.info.bg('hello world')).toEqual('\u001b[91m\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[39m');
        });
        it(should` chain modifiers - yellowBg`, () => {
          expect(colr.yellowBg.sets.info.text('hello world')).toEqual('\u001b[103m\u001b[94mhello world\u001b[39m\u001b[49m');
          expect(colr.yellowBg.sets.info.bg('hello world')).toEqual('\u001b[103m\u001b[104m\u001b[30mhello world\u001b[39m\u001b[49m\u001b[49m');
        });
      });
    });
  });

  describe('helpers', () => {
    describe('template', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.$'}`, () => {
          expect(colr.$).toBeDefined();
        });
        it(should` exist as ${name + '.template'}`, () => {
          expect(colr.template).toBeDefined();
        });

        it(should` wrap a template literal - $`, () => {
          expect(colr.red.$`test with ${'word'} in middle`).toEqual('test with \u001b[91mword\u001b[39m in middle');
        });
        it(should` wrap a multiple sections - $`, () => {
          expect(colr.red.$`one ${'two'} three ${'four'} five ${'six'}`).toEqual(
            'one \u001b[91mtwo\u001b[39m three \u001b[91mfour\u001b[39m five \u001b[91msix\u001b[39m'
          );
        });
        it(should` wrap a template literal - template`, () => {
          expect(colr.red.template`test with ${'word'} in middle`).toEqual('test with \u001b[91mword\u001b[39m in middle');
        });
        it(should` wrap a multiple sections - template`, () => {
          expect(colr.red.template`one ${'two'} three ${'four'} five ${'six'}`).toEqual(
            'one \u001b[91mtwo\u001b[39m three \u001b[91mfour\u001b[39m five \u001b[91msix\u001b[39m'
          );
        });
      });
    });

    describe('clear', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.clear'}`, () => {
          expect(colr.clear).toBeDefined();
        });

        it(should` clear style ANSI code in a string`, () => {
          const input = colr.red('hello world');
          expect(input).toEqual('\u001b[91mhello world\u001b[39m');
          const result = colr.clear(input);
          expect(result).toEqual('hello world');
        });

        it(should` clear style ANSI code in a string - multiple styles`, () => {
          const colouredString = [
            colr.darkRed('darkRed'),
            colr.lightRed('lightRed'),
            colr.darkGreen('darkGreen'),
            colr.lightGreen('lightGreen'),
            colr.darkYellow('darkYellow'),
            colr.lightYellow('lightYellow'),
            colr.darkBlue('darkBlue'),
            colr.lightBlue('lightBlue'),
            colr.darkMagenta('darkMagenta'),
            colr.lightMagenta('lightMagenta'),
            colr.darkCyan('darkCyan'),
            colr.lightCyan('lightCyan'),
            colr.darkBlack('darkBlack'),
            colr.lightBlack('lightBlack'),
            colr.darkWhite('darkWhite'),
            colr.lightWhite('lightWhite'),
            colr.darkRedBg('darkRedBg'),
            colr.lightRedBg('lightRedBg'),
            colr.darkGreenBg('darkGreenBg'),
            colr.lightGreenBg('lightGreenBg'),
            colr.darkYellowBg('darkYellowBg'),
            colr.lightYellowBg('lightYellowBg'),
            colr.darkBlueBg('darkBlueBg'),
            colr.lightBlueBg('lightBlueBg'),
            colr.darkMagentaBg('darkMagentaBg'),
            colr.lightMagentaBg('lightMagentaBg'),
            colr.darkCyanBg('darkCyanBg'),
            colr.lightCyanBg('lightCyanBg'),
            colr.darkBlackBg('darkBlackBg'),
            colr.lightBlackBg('lightBlackBg'),
            colr.darkWhiteBg('darkWhiteBg'),
            colr.lightWhiteBg('lightWhiteBg'),
            colr.reset('reset'),
            colr.bold('bold'),
            colr.dim('dim'),
            colr.italic('italic'),
            colr.overline('overline'),
            colr.underline('underline'),
            colr.strikethrough('strikethrough'),
            colr.inverse('inverse'),
            colr.hidden('hidden')
          ].join(' ');
          const result = colr.clear(colouredString);
          expect(result).toEqual(
            'darkRed lightRed darkGreen lightGreen darkYellow lightYellow darkBlue lightBlue darkMagenta lightMagenta darkCyan lightCyan darkBlack lightBlack darkWhite lightWhite darkRedBg lightRedBg darkGreenBg lightGreenBg darkYellowBg lightYellowBg darkBlueBg lightBlueBg darkMagentaBg lightMagentaBg darkCyanBg lightCyanBg darkBlackBg lightBlackBg darkWhiteBg lightWhiteBg reset bold dim italic overline underline strikethrough inverse hidden'
          );
        });

        kitchenSink.toEqual('text', (v) => colr.clear(v), kitchenSink.safe.str(undefined), kitchenSink.samples.general);
      });
    });

    describe('debug', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.debug'}`, () => {
          expect(colr.debug).toBeDefined();
        });

        it(should` replace style ANSI code in a string`, () => {
          const result = colr.debug(colr.red('hello world'));
          expect(result).toEqual('(RED>)hello world(<)');
        });
        it(should` replace style ANSI code in a string - multiple styles`, () => {
          const colouredString = [
            colr.darkRed('darkRed'),
            colr.lightRed('lightRed'),
            colr.darkGreen('darkGreen'),
            colr.lightGreen('lightGreen'),
            colr.darkYellow('darkYellow'),
            colr.lightYellow('lightYellow'),
            colr.darkBlue('darkBlue'),
            colr.lightBlue('lightBlue'),
            colr.darkMagenta('darkMagenta'),
            colr.lightMagenta('lightMagenta'),
            colr.darkCyan('darkCyan'),
            colr.lightCyan('lightCyan'),
            colr.darkBlack('darkBlack'),
            colr.lightBlack('lightBlack'),
            colr.darkWhite('darkWhite'),
            colr.lightWhite('lightWhite'),
            colr.darkRedBg('darkRedBg'),
            colr.lightRedBg('lightRedBg'),
            colr.darkGreenBg('darkGreenBg'),
            colr.lightGreenBg('lightGreenBg'),
            colr.darkYellowBg('darkYellowBg'),
            colr.lightYellowBg('lightYellowBg'),
            colr.darkBlueBg('darkBlueBg'),
            colr.lightBlueBg('lightBlueBg'),
            colr.darkMagentaBg('darkMagentaBg'),
            colr.lightMagentaBg('lightMagentaBg'),
            colr.darkCyanBg('darkCyanBg'),
            colr.lightCyanBg('lightCyanBg'),
            colr.darkBlackBg('darkBlackBg'),
            colr.lightBlackBg('lightBlackBg'),
            colr.darkWhiteBg('darkWhiteBg'),
            colr.lightWhiteBg('lightWhiteBg'),
            colr.reset('reset'),
            colr.bold('bold'),
            colr.dim('dim'),
            colr.italic('italic'),
            colr.overline('overline'),
            colr.underline('underline'),
            colr.strikethrough('strikethrough'),
            colr.inverse('inverse'),
            colr.hidden('hidden')
          ].join(' ');
          const result = colr.debug(colouredString);
          expect(result).toEqual(
            '(red>)darkRed(<) (RED>)lightRed(<) (grn>)darkGreen(<) (GRN>)lightGreen(<) (ylw>)darkYellow(<) (YLW>)lightYellow(<) (blu>)darkBlue(<) (BLU>)lightBlue(<) (mag>)darkMagenta(<) (MAG>)lightMagenta(<) (cyn>)darkCyan(<) (CYN>)lightCyan(<) (blk>)darkBlack(<) (BLK>)lightBlack(<) (wht>)darkWhite(<) (WHT>)lightWhite(<) {red>}darkRedBg{<} {RED>}lightRedBg{<} {grn>}darkGreenBg{<} {GRN>}lightGreenBg{<} {ylw>}darkYellowBg{<} {YLW>}lightYellowBg{<} {blu>}darkBlueBg{<} {BLU>}lightBlueBg{<} {mag>}darkMagentaBg{<} {MAG>}lightMagentaBg{<} {cyn>}darkCyanBg{<} {CYN>}lightCyanBg{<} {blk>}darkBlackBg{<} {BLK>}lightBlackBg{<} {wht>}darkWhiteBg{<} {WHT>}lightWhiteBg{<} [<rst]reset[<rst] [bld>]bold[<dim] [dim>]dim[<dim] [itl>]italic[<itl] [ovr>]overline[<ovr] [und>]underline[<und] [str>]strikethrough[<str] [inv>]inverse[<inv] [hdn>]hidden[<hdn]'
          );
        });
      });
    });

    describe('setOutputMode', () => {
      singleTest(swissnode.colr, 'colr', (colr, name) => {
        it(should` exist as ${name + '.setOutputMode'}`, () => {
          expect(colr.setOutputMode).toBeDefined();
        });

        describe('ANSI', () => {
          it(should` set output mode to ${'ANSI'}`, () => {
            colr.setOutputMode('ANSI');
            expect(colr.getOutputMode()).toEqual('ANSI');
          });

          it(should` wrap a string with ANSI code`, () => {
            colr.setOutputMode('ANSI');
            const output = colr.red('hello world');
            const expected = '\u001b[91mhello world\u001b[39m';
            expect(output).toEqual(expected);
          });

          it(should` wrap a string with ANSI code - multiple styles`, () => {
            colr.setOutputMode('ANSI');
            const output = colr.blue(`this is a ${colr.red('test')} of colr`);
            const expected = '\u001b[94mthis is a \u001b[91mtest\u001b[39m\u001b[94m of colr\u001b[39m';
            expect(output).toEqual(expected);
          });
          it(should` wrap a string with ANSI code - multiple styles and backgrounds`, () => {
            colr.setOutputMode('ANSI');
            const output = colr.blue.yellowBg(`this is a ${colr.red.greenBg('test')} of colr`);
            const expected =
              '\u001b[94m\u001b[103mthis is a \u001b[91m\u001b[102mtest\u001b[49m\u001b[103m\u001b[39m\u001b[94m of colr\u001b[49m\u001b[39m';
            expect(output).toEqual(expected);
          });
        });

        describe('DEBUG', () => {
          it(should` set output mode to ${'DEBUG'}`, () => {
            colr.setOutputMode('DEBUG');
            expect(colr.getOutputMode()).toEqual('DEBUG');
          });

          it(should` wrap a string with DEBUG notation`, () => {
            colr.setOutputMode('DEBUG');
            const output = colr.red('hello world');
            const expected = '(RED>)hello world(<)';
            expect(output).toEqual(expected);
          });

          it(should` wrap a string with DEBUG notation - multiple styles`, () => {
            colr.setOutputMode('DEBUG');
            const output = colr.blue(`this is a ${colr.red('test')} of colr`);
            const expected = '(BLU>)this is a (RED>)test(<)(BLU>) of colr(<)';
            expect(output).toEqual(expected);
          });
          it(should` wrap a string with DEBUG notation - multiple styles and backgrounds`, () => {
            colr.setOutputMode('DEBUG');
            const output = colr.blue.yellowBg(`this is a ${colr.red.greenBg('test')} of colr`);
            const expected = '(BLU>){YLW>}this is a (RED>){GRN>}test{<}{YLW>}(<)(BLU>) of colr{<}(<)';
            expect(output).toEqual(expected);
          });
        });

        describe('NONE', () => {
          it(should` set output mode to ${'NONE'}`, () => {
            colr.setOutputMode('NONE');
            expect(colr.getOutputMode()).toEqual('NONE');
          });

          it(should` NOT style the string`, () => {
            colr.setOutputMode('NONE');
            const output = colr.red('hello world');
            const expected = 'hello world';
            expect(output).toEqual(expected);
          });

          it(should` NOT style the string - multiple styles`, () => {
            colr.setOutputMode('NONE');
            const output = colr.blue(`this is a ${colr.red('test')} of colr`);
            const expected = 'this is a test of colr';
            expect(output).toEqual(expected);
          });
          it(should` NOT style the string - multiple styles and backgrounds`, () => {
            colr.setOutputMode('NONE');
            const output = colr.blue.yellowBg(`this is a ${colr.red.greenBg('test')} of colr`);
            const expected = 'this is a test of colr';
            expect(output).toEqual(expected);
          });
        });
      });
    });
  });
});
