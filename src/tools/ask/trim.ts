import { getDeferred, hours, MathsTools, ms, ObjectTools, seconds, symbols } from 'swiss-ak';

import { ActionBarConfig, getActionBar } from '../../utils/actionBar';
import { colr } from '../colr';
import { getKeyListener } from '../keyListener';
import { ansi, Breadcrumb, LineCounter, out } from '../out';
import { getLineCounter } from '../out/lineCounter';
import { getAskOptions, getAskOptionsForState } from './basicInput/customise';
import { ErrorInfo, getErrorInfoFromValidationResult } from './errorValidation';
import { getImitateOutput, imitate } from './imitate';

//<!-- DOCS: 125 -->

const toTimeCode = (frame: number, frameRate: number = 60, includeHours: boolean = false, includeMinutes: boolean = true) => {
  const frLength = out.getWidth(Math.round(frameRate) + '');
  const toSecs: ms = seconds(Math.floor(frame / frameRate));
  const remaining = Math.round(frame % frameRate);

  let cut = includeHours ? 11 : 14;
  if (!includeMinutes) cut = 17;
  const time = new Date(toSecs).toISOString().slice(cut, 19);

  return `${time}.${(remaining + '').padStart(frLength, '0')}`;
};

export interface Handles<T = any> {
  start: T;
  end: T;
}
const getNextHandle = (tool: string): string => {
  const all: string[] = ['start', 'end'];
  return all[(all.indexOf(tool) + 1) % all.length];
};

const getTrimActionBar = () => {
  const { general: gen } = getAskOptions();
  const actionBarConfig: ActionBarConfig = {
    move: {
      keys: '← →',
      label: `Move ${gen.timelineSpeed} frame${gen.timelineSpeed > 1 ? 's' : ''}`
    },
    moveFast: {
      keys: '↑ ↓',
      label: `Move ${gen.timelineFastSpeed} frame${gen.timelineFastSpeed > 1 ? 's' : ''}`
    },
    switch: {
      keys: 'tab',
      label: 'Switch Handle'
    },
    return: {
      keys: '⮐ ',
      label: 'Submit'
    }
  };
  return getActionBar(['move', 'moveFast', 'switch', 'return'], actionBarConfig);
};

/**<!-- DOCS: ask.trim ### @ -->
 * trim
 *
 * - `ask.trim`
 *
 * Get a start and end frame from the user
 * @param {string | Breadcrumb} question
 * @param {number} totalFrames
 * @param {number} [frameRate=60]
 * @param {Partial<Handles<number>>} [initial]
 * @param {(handles: Handles<number>) => Error | string | boolean | void} [validate]
 * @param {LineCounter} [lc]
 * @returns {Promise<Handles<number>>}
 */
export const trim = async (
  question: string | Breadcrumb,
  totalFrames: number,
  frameRate: number = 60,
  initial?: Partial<Handles<number>>,
  validate?: (handles: Handles<number>) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<Handles<number>> => {
  const deferred = getDeferred<Handles<number>>();
  const askOptions = getAskOptions();
  const tempLC = getLineCounter();

  const totalLength: ms = seconds(Math.floor(totalFrames / frameRate));
  const showHours = totalLength > hours(1);

  let errorInfo: ErrorInfo = getErrorInfoFromValidationResult(true);

  let activeHandle: string = 'start';

  const handles: Handles<number> = {
    start: initial?.start !== undefined ? MathsTools.clamp(initial.start, 0, totalFrames - 1) : 0,
    end: initial?.end !== undefined ? MathsTools.clamp(initial.end, 0, totalFrames - 1) : totalFrames - 1
  };

  let cacheTermSize: [number, number] = [0, 0];
  let cacheActionBar: string = '';

  const operation = {
    calc: () => {
      const termSize: [number, number] = [process.stdout.columns, process.stdout.rows];
      if (termSize[0] != cacheTermSize[0] || termSize[1] != cacheTermSize[1]) {
        cacheTermSize = termSize;

        // calc based on changed terminal size
        cacheActionBar = getTrimActionBar();
      }
    },
    validate: () => {
      if (!validate) return;
      const result = operation.getResult();
      const validationResult = validate(result);
      errorInfo = getErrorInfoFromValidationResult(validationResult);
    },
    getResult: (): Handles<number> => ({ start: handles.start, end: handles.end }),
    getResultOutput: (isComplete: boolean = false): string => {
      const { colours: col } = getAskOptionsForState(false, errorInfo.isError);
      const result = operation.getResult();

      const startOut = col.resultNumber(result.start + colr.dim(` (${toTimeCode(result.start, frameRate, showHours)})`));
      const endOut = col.resultNumber(result.end + colr.dim(` (${toTimeCode(result.end, frameRate, showHours)})`));

      return `${startOut} ${col.decoration(symbols.ARROW_RGT)} ${endOut}`;
    },
    display: () => {
      operation.calc();
      const width = out.utils.getTerminalWidth();

      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;

      const totalSpace = width - 2;
      const handlePositions: Handles<number> = ObjectTools.mapValues(handles, (_k, value: number) =>
        Math.floor((value / (totalFrames - 1)) * totalSpace)
      );

      const befSpace = Math.max(0, handlePositions.start);
      const barSpace = Math.max(0, handlePositions.end - handlePositions.start);
      const aftSpace = Math.max(0, totalSpace - handlePositions.end);

      const actvHand = col.timelineHandleActive(sym.timelineHandle);
      const inactvHand = col.timelineHandle(sym.timelineHandle);
      const handStart = activeHandle == 'start' ? actvHand : inactvHand;
      const handEnd = activeHandle == 'end' ? actvHand : inactvHand;

      const getHandleLabels = () => {
        const handleLabelsRaw: Handles<string[]> = ObjectTools.mapValues(handles, (_k, value: number) => [
          // ` ${value} `,
          ` ${toTimeCode(value, frameRate, showHours)} `,
          ''
        ]);
        const handleLabelWidths: Handles<number> = ObjectTools.mapValues(handleLabelsRaw, (_k, value: string[]) =>
          Math.max(...value.map((s) => out.getWidth(s)))
        );
        const handleAligns: Handles<string> = {
          start: handleLabelWidths.start > befSpace ? 'left' : 'right',
          end: handleLabelWidths.end > aftSpace ? 'right' : 'left'
        };
        const handleLabels: Handles<string[]> = ObjectTools.mapValues(handleLabelsRaw, (key, value: string[]) =>
          value.map((l) => out.align(l, handleAligns[key], handleLabelWidths[key], ' ', true))
        );

        const strtBef = handleAligns.start === 'right';
        const endBef = handleAligns.end === 'right';

        const potentialMaxLabelSpace = handlePositions.end - handlePositions.start;
        if (!strtBef && potentialMaxLabelSpace < handleLabelWidths.start) {
          handleLabels.start = handleLabels.start.map((s) => s.slice(0, Math.max(0, potentialMaxLabelSpace - 1)));
          handleLabelWidths.start = Math.max(...handleLabels.start.map((s) => out.getWidth(s)));
        }
        if (endBef && potentialMaxLabelSpace < handleLabelWidths.end) {
          handleLabels.end = handleLabels.end.map((s) => s.slice(s.length - Math.max(0, potentialMaxLabelSpace - 1)));
          handleLabelWidths.end = Math.max(...handleLabels.end.map((s) => out.getWidth(s)));
        }

        const befLabelSpace = Math.max(0, befSpace - (strtBef ? handleLabelWidths.start : 0));
        const barLabelSpace = Math.max(0, barSpace - (!strtBef ? handleLabelWidths.start : 0) - (endBef ? handleLabelWidths.end : 0));
        const aftLabelSpace = Math.max(0, aftSpace - (!endBef ? handleLabelWidths.end : 0));

        const bef = ' '.repeat(befLabelSpace);
        const bar = ' '.repeat(barLabelSpace);
        const aft = ' '.repeat(aftLabelSpace);

        // This is cursed
        const handle1 = `${bef}${strtBef ? handleLabels.start[0] : ''}${handStart}${!strtBef ? handleLabels.start[0] : ''}${bar}${
          endBef ? handleLabels.end[0] : ''
        }${handEnd}${!endBef ? handleLabels.end[0] : ''}${aft}`;

        const handle2 = `${bef}${strtBef ? handleLabels.start[1] : ''}${handStart}${!strtBef ? handleLabels.start[1] : ''}${bar}${
          endBef ? handleLabels.end[1] : ''
        }${handEnd}${!endBef ? handleLabels.end[1] : ''}${aft}`;

        return handle1 + '\n' + handle2;
      };

      const getBar = () => {
        const actvHand = col.timelineHandleActive(sym.timelineBar);
        const inactvHand = col.timelineHandle(sym.timelineBar);

        const handStart = activeHandle == 'start' ? actvHand : inactvHand;
        const handEnd = activeHandle == 'end' ? actvHand : inactvHand;

        const bef = col.timelineTrack(sym.timelineTrack.repeat(befSpace));
        const bar = col.timelineTrackActive(sym.timelineBar.repeat(barSpace));
        const aft = col.timelineTrack(sym.timelineTrack.repeat(aftSpace));
        return `${bef}${handStart}${bar}${handEnd}${aft}`;
      };

      const getBottomLabels = () => {
        const startVideoLabel = `[${toTimeCode(0, frameRate, showHours)}]`;
        const endVideoLabel = `[${toTimeCode(totalFrames - 1, frameRate, showHours)}]`;
        const trimmedVideoLabel = toTimeCode(handles.end - handles.start, frameRate, showHours);

        const availSpace = width - (out.getWidth(startVideoLabel) + out.getWidth(endVideoLabel) + out.getWidth(trimmedVideoLabel));
        const centerPosition = handlePositions.start + Math.floor((handlePositions.end - handlePositions.start) / 2);
        const centerInSpace = centerPosition - out.getWidth(startVideoLabel) - Math.floor(out.getWidth(trimmedVideoLabel) / 2) + 1;

        const bef = ' '.repeat(Math.max(0, Math.min(availSpace, centerInSpace)));
        const aft = ' '.repeat(Math.max(0, Math.min(availSpace, availSpace - centerInSpace)));

        return `${startVideoLabel}${bef}${trimmedVideoLabel}${aft}${endVideoLabel}`;
      };

      const getInstructions = () => col.specialInfo(cacheActionBar);

      let output = ansi.cursor.hide + tempLC.ansi.moveHome();
      output += getImitateOutput(question, operation.getResultOutput(false), false, errorInfo.isError, errorInfo.errorMessage);
      output += '\n';
      output += '\n' + getHandleLabels();
      output += '\n' + getBar();
      output += '\n' + getBottomLabels();
      output += '\n';
      output += '\n' + getInstructions();
      tempLC.overwrite(output);
    }
  };

  const userActions = {
    swapHandle: () => (activeHandle = getNextHandle(activeHandle)),
    adjustHandle: (amount: number) => {
      handles[activeHandle] += amount;
      if (handles[activeHandle] < 0) handles[activeHandle] = 0;
      if (handles[activeHandle] > totalFrames - 1) handles[activeHandle] = totalFrames - 1;
      if (handles.end <= handles.start) {
        const oldStart = handles.start;
        const oldEnd = handles.end;
        handles.end = oldStart;
        handles.start = oldEnd;
        userActions.swapHandle();
      }
      operation.validate();
    },

    exit: () => {
      kl.stop();
      tempLC.clear();
      process.stdout.write(ansi.cursor.show);
      imitate(question, operation.getResultOutput(true), false, true, undefined, lc);
      process.exit();
    },

    submit: () => {
      operation.validate();
      if (errorInfo.isError) {
        if (askOptions.general.beeps) process.stdout.write(ansi.beep);
        return;
      }
      kl.stop();
      tempLC.clear();
      process.stdout.write(ansi.cursor.show);
      const fixedHandles: Handles<number> = operation.getResult();
      imitate(question, operation.getResultOutput(true), true, false, undefined, lc);
      deferred.resolve(fixedHandles);
    }
  };

  const kl = getKeyListener((keyName: string) => {
    switch (keyName) {
      case 'exit':
      case 'esc':
        return userActions.exit();
      case 'return':
        return userActions.submit();
      case 'tab':
        userActions.swapHandle();
        break;
      case 'left':
        userActions.adjustHandle(-askOptions.general.timelineSpeed);
        break;
      case 'right':
        userActions.adjustHandle(askOptions.general.timelineSpeed);
        break;
      case 'up':
        userActions.adjustHandle(askOptions.general.timelineFastSpeed);
        break;
      case 'down':
        userActions.adjustHandle(-askOptions.general.timelineFastSpeed);
        break;
    }

    operation.display();
  }, true);

  operation.validate();
  operation.display();

  return deferred.promise;
};
