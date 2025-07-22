import { symbols } from 'swiss-ak';
import { WrapFn, colr } from '../colr';
import { out } from '../out';

const seperatorChar = ` ${colr.grey2(symbols.CHEV_RGT)} `;

//<!-- DOCS: 250 -->
/**<!-- DOCS: out.getBreadcrumb ###! @ -->
 * getBreadcrumb
 *
 * - `out.getBreadcrumb`
 * - `getBreadcrumb`
 *
 * Provides a consistent format and style for questions/prompts
 *
 * ```typescript
 * const bread = getBreadcrumb();
 * bread() // ''
 * bread('a') // 'a'
 * bread('a', 'b') // 'a › b'
 * bread('a', 'b', 'c') // 'a › b › c'
 *
 * const sub = bread.sub('a', 'b');
 * sub(); // 'a › b'
 * sub('c') // 'a › b › c'
 * sub('c', 'd') // 'a › b › c › d'
 *
 * const subsub = sub.sub('c', 'd');
 * subsub(); // 'a › b › c › d'
 * subsub('e'); // 'a › b › c › d › e'
 * ```
 * @param {...string} [baseNames] - Base names to add to the breadcrumb
 * @returns {Breadcrumb} - Breadcrumb object
 */
export const getBreadcrumb = (...baseNames: string[]): Breadcrumb => {
  let current = [];
  let colours: WrapFn[] = [colr.primary, colr.secondary, colr.blue, colr.red, colr.green, colr.cyan];

  const setColours = (newColours: WrapFn[]) => {
    colours = newColours;
  };

  const add = (...names: string[]) => current.push(...names);

  const getColouredName = (name: string, index: number, arr: string[]) =>
    out.utils.hasColor(name) || index === arr.length - 1 ? name : colours[index % colours.length](name);
  const getColouredNames = (...tempNames: string[]) => getNames(...tempNames).map(getColouredName);

  const getNames = (...tempNames: string[]) => [...baseNames, ...current, ...tempNames];

  const sub = (...tempNames: string[]) => getBreadcrumb(...getNames(...tempNames));

  const otherChars = '? ' + ' > ';
  const spaceForInput = 25;

  const get = (...tempNames: string[]) =>
    colr.bold(
      out.truncate(
        getColouredNames(...tempNames)
          .join(seperatorChar)
          .trim(),
        out.utils.getTerminalWidth() - (otherChars.length - spaceForInput)
      )
    );

  const result: Breadcrumb = (...tempNames: string[]) => sub(...tempNames);

  result.setColours = setColours;
  result.add = add;
  result.getNames = getNames;
  result.sub = sub;
  result.get = get;
  result.toString = get;

  return result;
};

/**<!-- DOCS: out.Breadcrumb #### -->
 * Breadcrumb
 *
 * - `out.Breadcrumb`
 * - `Breadcrumb`
 *
 * Return type for getBreadcrumb
 */
export type Breadcrumb = {
  (...tempNames: string[]): Breadcrumb;
  setColours: (colours: WrapFn[]) => void;
  add: (...names: string[]) => number;
  getNames: (...tempNames: string[]) => any[];
  sub: (...tempNames: string[]) => Breadcrumb;
  get(...tempNames: string[]): string;
  toString(): string;
};
