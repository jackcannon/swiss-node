import { ArrayTools } from 'swiss-ak';
import { getLineCounter, LineCounter } from '../out/lineCounter';
import { out } from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { ask } from '../ask';
import { getAskOptionsForState } from './basicInput/customise';

//<!-- DOCS: 150 -->

type QuestionFunc<T> = (qst: string | Breadcrumb, results: any[], lc: LineCounter) => Promise<T>;
type TupleFromQuestionFuncs<T extends QuestionFunc<any>[]> = {
  [K in keyof T]: T[K] extends QuestionFunc<infer U> ? U : never;
};

/**<!-- DOCS: ask.section #### @ -->
 * section
 *
 * - `ask.section`
 *
 * Allows information to be displayed before a question, and follow up questions to be asked, while only leaving the 'footprint' of a single question afterwards.
 *
 * ```typescript
 * const ans1 = await ask.text('Question 1:');
 * const ans2 = await ask.section('Question 2:',
 *   (lc: LineCounter) => {
 *     lc.log('Some information');
 *   },
 *   (qst) => ask.text(qst),
 *   () => ask.text('Question 2b:')
 * );
 * ```
 *
 * During the section, it looks like this:
 * ```
 * Question 1: answer1
 * ┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
 * Some information
 * ┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
 * Question 2: answer2
 * Question 2b: answer2b
 * ```
 *
 * After the last question in the section has been submitted, it looks like this:
 * ```
 * Question 1: answer1
 * Question 2a: [ answer2, answer2b ]
 * ```
 * @param {string | Breadcrumb} question
 * @param {(lc: LineCounter) => void | Promise<any>} [sectionHeader]
 * @param {...[...T]} [questionFns]
 * @returns {Promise<TupleFromQuestionFuncs<T>>}
 */
export const section = async <T extends QuestionFunc<any>[]>(
  question: string | Breadcrumb,
  sectionHeader?: (lc: LineCounter) => void | Promise<any>,
  ...questionFns: [...T]
): Promise<TupleFromQuestionFuncs<T>> => {
  const theme = getAskOptionsForState(false, false);

  const originalLC = theme.general.lc;
  const tempLC = getLineCounter();
  theme.general.lc = tempLC;

  if (sectionHeader) {
    separator('down');
    await sectionHeader(tempLC);
    separator('up');
  }

  const results = [] as any[];
  if (questionFns.length) {
    for (let questionFn of questionFns) {
      const checkpoint = tempLC.checkpoint();
      results.push(await questionFn(question, results, tempLC));

      tempLC.clearToCheckpoint(checkpoint);
    }
  }

  tempLC.clear();

  theme.general.lc = originalLC;
  if (question) {
    let resultOut: any = theme.text.done;
    if (results.length === 1) {
      resultOut = results[0];
    }
    if (results.length > 1) {
      if (typeof results[0] === 'boolean') {
        resultOut = results[0];
      }
      resultOut = results;
    }

    ask.imitate(question, resultOut, true);
  }
  return results as TupleFromQuestionFuncs<T>;
};

/**<!-- DOCS: ask.separator #### @ -->
 * separator
 *
 * - `ask.separator`
 *
 * Prints a separator line to the console.
 *
 * ```typescript
 * ask.separator('down');
 * // ┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄
 *
 * ask.separator('none', 15);
 * // ┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄
 *
 * ask.separator('up', 5, 2);
 * // ┄┄┄┄┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄┄┄┄┄
 * ```
 * @param {'down' | 'none' | 'up'} [version='down']
 * @param {number} [spacing=8]
 * @param {number} [offset=0]
 * @param {number} [width=out.utils.getTerminalWidth() - 2]
 * @param {LineCounter} [lc]
 * @returns {void}
 */
export const separator = (
  version: 'down' | 'none' | 'up' = 'down',
  spacing: number = 8,
  offset: number = 0,
  width: number = out.utils.getTerminalWidth() - 2,
  lc?: LineCounter
): void => {
  const theme = getAskOptionsForState(false, false);

  const lineChar = theme.symbols.separatorLine;
  const chars = {
    down: theme.symbols.separatorNodeDown,
    none: theme.symbols.separatorNodeNone,
    up: theme.symbols.separatorNodeUp
  };
  const line = ArrayTools.repeat(Math.floor(width / spacing) - offset, chars[version]).join(lineChar.repeat(spacing - 1));
  const output = out.center(line, undefined, lineChar);
  console.log(theme.colours.decoration(output));

  const numLines = out.utils.getNumLines(output);

  if (theme.general.lc) theme.general.lc.add(numLines);
  if (lc && lc !== theme.general.lc) lc.add(numLines);
};

type UnwrapPromFunc<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;

type UnwrapPromFuncs<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [UnwrapPromFunc<Head>, ...UnwrapPromFuncs<Tail>] : [];
