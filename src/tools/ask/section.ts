import { ArrayTools } from 'swiss-ak';
import { getLineCounter, LineCounter } from '../out/lineCounter';
import { out } from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { ask } from '../ask';
import { colr } from '../colr';

//<!-- DOCS: 150 -->
/**<!-- DOCS: ask.separator ### @ -->
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
 * @returns {number}
 */
export const separator = (
  version: 'down' | 'none' | 'up' = 'down',
  spacing: number = 8,
  offset: number = 0,
  width: number = out.utils.getTerminalWidth() - 2
): number => {
  // ⌄˰˅˄⌃▼▲▽△▾▴▿▵
  const lineChar = '┄';
  const chars = {
    down: '▿',
    none: '◦',
    up: '▵'
  };
  const line = ArrayTools.repeat(Math.floor(width / spacing) - offset, chars[version]).join(lineChar.repeat(spacing - 1));
  console.log(colr.gray1(out.center(line, undefined, lineChar)));
  return 1;
};

type UnwrapPromFunc<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;

type UnwrapPromFuncs<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [UnwrapPromFunc<Head>, ...UnwrapPromFuncs<Tail>] : [];

/**<!-- DOCS: ask.section ### @ -->
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
 *
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
 * @param {(lc: LineCounter, separator: () => void) => void | Promise<any>} [sectionFn]
 * @param {...QuesT} [questionFns]
 * @returns {Promise<UnwrapPromFuncs<QuesT>>}
 */
export const section = async <
  QuesT extends [...((qst?: string | Breadcrumb, results?: any[], lc?: LineCounter, separator?: () => void) => Promise<any>)[]]
>(
  question: string | Breadcrumb,
  sectionFn?: (lc: LineCounter, separator: () => void) => void | Promise<any>,
  ...questionFns: QuesT
): Promise<UnwrapPromFuncs<QuesT>> => {
  const lc = getLineCounter();
  const sep = () => lc.add(separator('none', undefined, 1));

  if (sectionFn) {
    lc.add(separator('down'));
    await sectionFn(lc, sep);
    lc.add(separator('up'));
  }

  const results = [] as any[];
  if (questionFns.length) {
    for (let questionFn of questionFns) {
      const checkpoint = lc.checkpoint();
      results.push(await lc.wrap(1, () => questionFn(question, results as UnwrapPromFuncs<QuesT>, lc, sep)));

      lc.clearToCheckpoint(checkpoint);
    }
  }

  lc.clear();
  if (question) {
    let resultOut: any = 'done';
    if (results.length === 1) {
      resultOut = results[0];
    }
    if (results.length > 1) {
      if (typeof results[0] === 'boolean') {
        resultOut = results[0];
      }
      resultOut = results;
    }

    ask.imitate(true, question, resultOut);
  }
  return results as UnwrapPromFuncs<QuesT>;
};
