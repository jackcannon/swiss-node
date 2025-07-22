import { Breadcrumb, LineCounter } from '../out';
import { getAskOptions, getAskOptionsForState } from './basicInput/customise';
import { valueDisplays } from './basicInput/valueDisplays';

//<!-- DOCS: 140 -->

export const getImitateOutput = (
  question: string | Breadcrumb,
  result?: any,
  isComplete: boolean = true,
  isError: boolean = false,
  errorMsg: string | undefined = isError ? '' : undefined,
  lc?: LineCounter
) => {
  const theme = getAskOptionsForState(isComplete, isError);

  const resultText = valueDisplays.anyByType(result, isComplete, isError);
  const output = theme.formatters.formatPrompt(question, resultText, undefined, errorMsg, theme, isComplete, false);
  if (lc) {
    const lines = output.split('\n');
    lc.add(lines.length);
  }
  return output;
};

// Like ask.imitate, but doesn't add lines to options.general.lc line counter
export const untrackedImitate = (
  question: string | Breadcrumb,
  result?: any,
  isComplete: boolean = true,
  isError: boolean = false,
  errorMsg: string | undefined = isError ? '' : undefined,
  lc?: LineCounter
) => {
  const output = getImitateOutput(question, result, isComplete, isError, errorMsg, lc);
  console.log(output);
};

/**<!-- DOCS: ask.imitate #### @ -->
 * imitate
 *
 * - `ask.imitate`
 *
 * Imitate the display of a prompt
 *
 * ```typescript
 * imitate('What is your name?', 'Jack', true);
 *
 * ask.imitate('What is your name?', 'Jack', true);
 * ```
 * @param {string | Breadcrumb} question - Question to ask
 * @param {any} [result] - Result to display
 * @param {boolean} [isComplete=true] - Whether the result is complete
 * @param {boolean} [isError=false] - Whether the result is an error
 * @param {string} [errorMessage] - Error message
 * @param {LineCounter} [lc] - Line counter
 * @returns {void}
 */
export const imitate = (
  question: string | Breadcrumb,
  result?: any,
  isComplete: boolean = true,
  isError: boolean = false,
  errorMessage?: string,
  lc?: LineCounter
): void => {
  const options = getAskOptions();
  const output = getImitateOutput(question, result, isComplete, isError, isError ? errorMessage : undefined);

  console.log(output);

  const lines = output.split('\n');

  if (options.general.lc) options.general.lc.add(lines.length);
  if (lc && lc !== options.general.lc) lc.add(lines.length);
};
