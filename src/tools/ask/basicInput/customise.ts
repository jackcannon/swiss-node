import { ObjectTools, OfType, symbols } from 'swiss-ak';
import { WrapFn, colr } from '../../colr';
import { LineCounter, getLineCounter } from '../../out';
import { FormatItemsFn, FormatPromptFn, itemsFormatters, promptFormatters } from './formatters';

//<!-- DOCS: 131 -->

interface BoxSymbols {
  horizontal: string;
  vertical: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  separatorLeft: string;
  separatorHorizontal: string;
  separatorRight: string;
}
const boxSymbols: { [key in 'thin' | 'thick']: BoxSymbols } = {
  thin: {
    horizontal: '─',
    vertical: '│',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    separatorLeft: '├',
    separatorHorizontal: '─',
    separatorRight: '┤'
  },
  thick: {
    horizontal: '━',
    vertical: '┃',
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
    separatorLeft: '┠',
    separatorHorizontal: '─',
    separatorRight: '┨'
  }
};

// We don't want to spam load an bunch on colr instances if we don't need to
let askOptions: AskOptionsStored | null = null;
const populateAskOptions = (): AskOptionsStored => {
  if (askOptions) return askOptions;

  const darkestGrey = colr.grey2;

  askOptions = {
    general: {
      themeColour: 'yellow',
      lc: getLineCounter(),
      boxType: 'thick',
      beeps: true,
      maxItemsOnScreen: 10,
      scrollMargin: 2,
      fileExplorerColumnWidth: 25,
      fileExplorerMaxItems: 15,
      tableSelectMaxHeightPercentage: 75,
      timelineSpeed: 1,
      timelineFastSpeed: 5
    },
    text: {
      boolTrueKeys: 'Yy',
      boolFalseKeys: 'Nn',
      boolYes: 'yes',
      boolNo: 'no',
      boolYesNoSeparator: '/',
      boolYN: '(Y/n)',
      selectAll: '[Select All]',
      done: 'done',
      items: (count: number) => `[${count} items]`,
      countdown: (s) => `Starting in ${s}s...`,
      file: 'File',
      directory: 'Directory',
      loading: 'Loading...',
      selected: (count: number) => `${count} selected`,

      specialNewFolderEnterNothingCancel: 'Enter nothing to cancel',
      specialNewFolderAddingFolderTo: 'Adding folder to ',
      specialNewFolderQuestion: (hl) => `What do you want to ${hl('name')} the new folder?`,

      specialSaveFileSavingFileTo: 'Saving file to ',
      specialSaveFileQuestion: (hl) => `What do you want to ${hl('name')} the file?`
    },
    formatters: {
      formatPrompt: promptFormatters.oneLine,
      formatItems: itemsFormatters.block
    },
    colours: {
      decoration: {
        normal: darkestGrey,
        error: colr.dark.red.dim,
        done: darkestGrey
      },
      questionText: {
        normal: colr.white.bold,
        error: colr.white.bold,
        done: colr.white.bold
      },
      specialIcon: {
        normal: colr.dark.cyan,
        error: colr.dark.red,
        done: colr.dark.green
      },
      openingIcon: {
        normal: darkestGrey,
        error: colr.dark.red,
        done: darkestGrey
      },
      promptIcon: getSetFromSingle(colr.yellow.dim),
      result: getSetFromSingle(colr.dark.yellow),
      resultText: getSetFromSingle(colr.dark.yellow),
      resultNumber: getSetFromSingle(colr.dark.cyan),
      resultBoolean: getSetFromSingle(colr.dark.green),
      resultArray: getSetFromSingle(colr.lightBlack),
      resultDate: getSetFromSingle(colr.light.blue),
      loadingIcon: getSetFromSingle(colr.grey2),
      errorMsg: getSetFromSingle(colr.red),
      item: getSetFromSingle(colr.grey4),
      itemIcon: getSetFromSingle(colr),
      itemHover: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },
      itemHoverIcon: getSetFromSingle(colr),
      itemBlockHover: {
        normal: colr.yellowBg.black,
        error: colr.dangerBg,
        done: colr.yellowBg.black
      },
      itemBlockHoverIcon: getSetFromSingle(colr.black),
      itemSelected: getSetFromSingle(colr.grey4),
      itemSelectedIcon: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },
      itemUnselected: getSetFromSingle(colr.grey4),
      itemUnselectedIcon: getSetFromSingle(colr),
      scrollbarTrack: getSetFromSingle(colr.reset.lightBlack),
      scrollbarBar: getSetFromSingle(colr.reset.lightBlack.inverse),
      selectAllText: getSetFromSingle(colr.grey3),
      boolYNText: getSetFromSingle(darkestGrey),
      countdown: {
        normal: colr.lightBlack,
        error: colr.dark.red.dim,
        done: colr.dark.green.dim
      },
      pause: getSetFromSingle(colr.grey4),

      specialHover: {
        normal: colr.darkBg.yellowBg.black,
        error: colr.redBg.black,
        done: colr.darkBg.yellowBg.black
      },
      specialSelected: getSetFromSingle(colr.darkBg.whiteBg.black),
      specialHighlight: getSetFromSingle(colr.yellow),
      specialNormal: getSetFromSingle(colr.white),
      specialFaded: getSetFromSingle(colr.grey3),
      specialHint: getSetFromSingle(darkestGrey),

      specialInactiveHover: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveSelected: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveHighlight: getSetFromSingle(colr.grey4),
      specialInactiveNormal: getSetFromSingle(colr.grey3),
      specialInactiveFaded: getSetFromSingle(colr.grey2),
      specialInactiveHint: getSetFromSingle(colr.black),

      specialInfo: getSetFromSingle(colr.grey2),
      specialErrorMsg: getSetFromSingle(colr.red),
      specialErrorIcon: getSetFromSingle(colr),

      tableSelectHover: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },

      timelineTrack: getSetFromSingle(darkestGrey),
      timelineTrackActive: getSetFromSingle(colr.grey3),
      timelineHandle: getSetFromSingle(colr.grey4),
      timelineHandleActive: getSetFromSingle(colr.yellow)
    },
    symbols: {
      specialIcon: {
        normal: '?',
        error: symbols.CROSS,
        done: symbols.TICK
      },
      openingIcon: {
        normal: symbols.TRI_DWN,
        error: symbols.TRI_DWN,
        done: symbols.TRI_RGT
      },
      promptIcon: {
        normal: symbols.CHEV_RGT,
        error: symbols.CHEV_RGT,
        done: '‣'
      },
      errorMsgPrefix: getSetFromSingle('!'),

      itemIcon: getSetFromSingle(' '),
      itemHoverIcon: getSetFromSingle(symbols.CURSOR),
      itemSelectedIcon: getSetFromSingle(symbols.RADIO_FULL),
      itemUnselectedIcon: getSetFromSingle(symbols.RADIO_EMPTY),
      scrollUpIcon: getSetFromSingle(symbols.ARROW_UPP),
      scrollDownIcon: getSetFromSingle(symbols.ARROW_DWN),
      scrollbarTrack: getSetFromSingle('│'), // ╎ ┇ │ ║
      scrollbarTrackTrimTop: getSetFromSingle('╷'), // ┰ ┬ ╥
      scrollbarTrackTrimBottom: getSetFromSingle('╵'), // ┸ ┴ ╨
      scrollbarBar: getSetFromSingle(' '),
      scrollbarBarTrimTop: getSetFromSingle('▀'),
      scrollbarBarTrimBottom: getSetFromSingle('▄'),

      // ⌄˰˅˄⌃▼▲▽△▾▴▿▵
      separatorLine: getSetFromSingle('┄'),
      separatorNodeDown: getSetFromSingle('▿'),
      separatorNodeNone: getSetFromSingle('◦'),
      separatorNodeUp: getSetFromSingle('▵'),

      specialErrorIcon: getSetFromSingle(' ! '),

      folderOpenableIcon: getSetFromSingle('›'),
      fileOpenableIcon: getSetFromSingle(' '),

      timelineTrack: getSetFromSingle('█'),
      timelineHandle: getSetFromSingle('┃'),
      timelineBar: getSetFromSingle('█')
    }
  };
  return askOptions as AskOptionsStored;
};

type OptionsState = 'normal' | 'error' | 'done';

// Dont recalulate these every time. Reset them when 'customise' is called
const cachedOptionsForStates: { [key in OptionsState]: AskOptionsForState } = {
  normal: undefined,
  error: undefined,
  done: undefined
};

export const getAskOptions = (): AskOptionsStored => {
  if (!askOptions) populateAskOptions();
  return askOptions;
};

export const getOptionsStateName = (isDone: boolean, isError: boolean): OptionsState => (isDone ? 'done' : isError ? 'error' : 'normal');

export const getAskOptionsForState = (isDone: boolean, isError: boolean): AskOptionsForState => {
  if (!askOptions) populateAskOptions();

  const state = getOptionsStateName(isDone, isError);

  if (cachedOptionsForStates[state]) return cachedOptionsForStates[state];

  const getPropertiesForState = <T extends unknown, U extends unknown>(obj: T): OfType<T, U> =>
    ObjectTools.mapValues(obj, (key: string, value: U) => {
      if (typeof value !== 'object') return value;
      const valueSet = value as unknown as AskOptionsItemSet<U>;
      return valueSet[state];
    });

  const optsForState = {
    general: askOptions.general,
    text: askOptions.text,
    formatters: askOptions.formatters,
    colours: getPropertiesForState<AskOptionsStoredColours, WrapFn>(askOptions.colours),
    symbols: getPropertiesForState<AskOptionsStoredSymbols, string>(askOptions.symbols) as OfType<AskOptionsStoredSymbols, string> & {
      boxType: 'thin' | 'thick';
    },
    boxSymbols: boxSymbols[askOptions.general.boxType]
  };

  cachedOptionsForStates[state] = optsForState;

  return optsForState;
};

const getSetFromSingle = <T extends unknown>(item: T): AskOptionsItemSet<T> => ({
  normal: item,
  error: item,
  done: item
});
const processThemeItem = <T extends unknown>(item: AskOptionsItem<T>, defaultItem: AskOptionsItemSet<T>): AskOptionsItemSet<T> => {
  if (item === undefined || item === null) return defaultItem;

  if (typeof item !== 'object') {
    return getSetFromSingle(item);
  }
  const itemSet = item as AskOptionsItemSet<T>;
  if (item && (itemSet.normal !== undefined || itemSet.error !== undefined || itemSet.done !== undefined)) {
    return {
      normal: itemSet.normal ?? defaultItem.normal,
      error: itemSet.error ?? defaultItem.error,
      done: itemSet.done ?? defaultItem.done
    };
  }
  return defaultItem;
};

const applyPartialOptionsToAskOptions = (options: Partial<ask.AskOptions>) => {
  if (!askOptions) populateAskOptions();

  askOptions.general = {
    themeColour: options?.general?.themeColour ?? askOptions.general.themeColour,
    lc: options?.general?.lc ?? askOptions.general.lc,
    boxType: options?.general?.boxType ?? askOptions.general.boxType,
    beeps: options?.general?.beeps ?? askOptions.general.beeps,
    maxItemsOnScreen: options?.general?.maxItemsOnScreen ?? askOptions.general.maxItemsOnScreen,
    scrollMargin: options?.general?.scrollMargin ?? askOptions.general.scrollMargin,
    fileExplorerColumnWidth: options?.general?.fileExplorerColumnWidth ?? askOptions.general.fileExplorerColumnWidth,
    fileExplorerMaxItems: options?.general?.fileExplorerMaxItems ?? askOptions.general.fileExplorerMaxItems,
    tableSelectMaxHeightPercentage: options?.general?.tableSelectMaxHeightPercentage ?? askOptions.general.tableSelectMaxHeightPercentage,
    timelineSpeed: options?.general?.timelineSpeed ?? askOptions.general.timelineSpeed,
    timelineFastSpeed: options?.general?.timelineFastSpeed ?? askOptions.general.timelineFastSpeed
  };

  askOptions.text = {
    boolTrueKeys: options?.text?.boolTrueKeys ?? askOptions.text.boolTrueKeys,
    boolFalseKeys: options?.text?.boolFalseKeys ?? askOptions.text.boolFalseKeys,
    boolYes: options?.text?.boolYes ?? askOptions.text.boolYes,
    boolNo: options?.text?.boolNo ?? askOptions.text.boolNo,
    boolYesNoSeparator: options?.text?.boolYesNoSeparator ?? askOptions.text.boolYesNoSeparator,
    boolYN: options?.text?.boolYN ?? askOptions.text.boolYN,
    selectAll: options?.text?.selectAll ?? askOptions.text.selectAll,
    done: options?.text?.done ?? askOptions.text.done,
    items: options?.text?.items ?? askOptions.text.items,
    countdown: options?.text?.countdown ?? askOptions.text.countdown,
    file: options?.text?.file ?? askOptions.text.file,
    directory: options?.text?.directory ?? askOptions.text.directory,
    loading: options?.text?.loading ?? askOptions.text.loading,
    selected: options?.text?.selected ?? askOptions.text.selected,

    specialNewFolderEnterNothingCancel: options?.text?.specialNewFolderEnterNothingCancel ?? askOptions.text.specialNewFolderEnterNothingCancel,
    specialNewFolderAddingFolderTo: options?.text?.specialNewFolderAddingFolderTo ?? askOptions.text.specialNewFolderAddingFolderTo,
    specialNewFolderQuestion: options?.text?.specialNewFolderQuestion ?? askOptions.text.specialNewFolderQuestion,

    specialSaveFileSavingFileTo: options?.text?.specialSaveFileSavingFileTo ?? askOptions.text.specialSaveFileSavingFileTo,
    specialSaveFileQuestion: options?.text?.specialSaveFileQuestion ?? askOptions.text.specialSaveFileQuestion
  };

  askOptions.formatters = {
    formatPrompt: (() => {
      if (!options?.formatters?.formatPrompt) return askOptions.formatters.formatPrompt;
      if (typeof options.formatters.formatPrompt === 'string' && promptFormatters[options.formatters.formatPrompt]) {
        return promptFormatters[options.formatters.formatPrompt];
      }
      if (typeof options.formatters.formatPrompt === 'function') {
        return options.formatters.formatPrompt;
      }
      return askOptions.formatters.formatPrompt;
    })(),
    formatItems: (() => {
      if (!options?.formatters?.formatItems) return askOptions.formatters.formatItems;
      if (typeof options.formatters.formatItems === 'string' && itemsFormatters[options.formatters.formatItems]) {
        return itemsFormatters[options.formatters.formatItems];
      }
      if (typeof options.formatters.formatItems === 'function') {
        return options.formatters.formatItems;
      }
      return askOptions.formatters.formatItems;
    })()
  };
  askOptions.colours = {
    decoration: processThemeItem(options?.colours?.decoration, askOptions.colours.decoration),
    questionText: processThemeItem(options?.colours?.questionText, askOptions.colours.questionText),
    specialIcon: processThemeItem(options?.colours?.specialIcon, askOptions.colours.specialIcon),
    openingIcon: processThemeItem(options?.colours?.openingIcon, askOptions.colours.openingIcon),
    promptIcon: processThemeItem(options?.colours?.promptIcon, askOptions.colours.promptIcon),
    result: processThemeItem(options?.colours?.result, askOptions.colours.result),
    resultText: processThemeItem(options?.colours?.resultText, askOptions.colours.resultText),
    resultNumber: processThemeItem(options?.colours?.resultNumber, askOptions.colours.resultNumber),
    resultBoolean: processThemeItem(options?.colours?.resultBoolean, askOptions.colours.resultBoolean),
    resultArray: processThemeItem(options?.colours?.resultArray, askOptions.colours.resultArray),
    resultDate: processThemeItem(options?.colours?.resultDate, askOptions.colours.resultDate),
    loadingIcon: processThemeItem(options?.colours?.loadingIcon, askOptions.colours.loadingIcon),
    errorMsg: processThemeItem(options?.colours?.errorMsg, askOptions.colours.errorMsg),
    item: processThemeItem(options?.colours?.item, askOptions.colours.item),
    itemIcon: processThemeItem(options?.colours?.itemIcon, askOptions.colours.itemIcon),
    itemHover: processThemeItem(options?.colours?.itemHover, askOptions.colours.itemHover),
    itemHoverIcon: processThemeItem(options?.colours?.itemHoverIcon, askOptions.colours.itemHoverIcon),
    itemBlockHover: processThemeItem(options?.colours?.itemBlockHover, askOptions.colours.itemBlockHover),
    itemBlockHoverIcon: processThemeItem(options?.colours?.itemBlockHoverIcon, askOptions.colours.itemBlockHoverIcon),
    itemSelected: processThemeItem(options?.colours?.itemSelected, askOptions.colours.itemSelected),
    itemSelectedIcon: processThemeItem(options?.colours?.itemSelectedIcon, askOptions.colours.itemSelectedIcon),
    itemUnselected: processThemeItem(options?.colours?.itemUnselected, askOptions.colours.itemUnselected),
    itemUnselectedIcon: processThemeItem(options?.colours?.itemUnselectedIcon, askOptions.colours.itemUnselectedIcon),
    scrollbarTrack: processThemeItem(options?.colours?.scrollbarTrack, askOptions.colours.scrollbarTrack),
    scrollbarBar: processThemeItem(options?.colours?.scrollbarBar, askOptions.colours.scrollbarBar),
    selectAllText: processThemeItem(options?.colours?.selectAllText, askOptions.colours.selectAllText),
    boolYNText: processThemeItem(options?.colours?.boolYNText, askOptions.colours.boolYNText),
    countdown: processThemeItem(options?.colours?.countdown, askOptions.colours.countdown),
    pause: processThemeItem(options?.colours?.pause, askOptions.colours.pause),

    specialHover: processThemeItem(options?.colours?.specialHover, askOptions.colours.specialHover),
    specialSelected: processThemeItem(options?.colours?.specialSelected, askOptions.colours.specialSelected),
    specialHighlight: processThemeItem(options?.colours?.specialHighlight, askOptions.colours.specialHighlight),
    specialNormal: processThemeItem(options?.colours?.specialNormal, askOptions.colours.specialNormal),
    specialFaded: processThemeItem(options?.colours?.specialFaded, askOptions.colours.specialFaded),
    specialHint: processThemeItem(options?.colours?.specialHint, askOptions.colours.specialHint),
    specialInactiveHover: processThemeItem(options?.colours?.specialInactiveHover, askOptions.colours.specialInactiveHover),
    specialInactiveSelected: processThemeItem(options?.colours?.specialInactiveSelected, askOptions.colours.specialInactiveSelected),
    specialInactiveHighlight: processThemeItem(options?.colours?.specialInactiveHighlight, askOptions.colours.specialInactiveHighlight),
    specialInactiveNormal: processThemeItem(options?.colours?.specialInactiveNormal, askOptions.colours.specialInactiveNormal),
    specialInactiveFaded: processThemeItem(options?.colours?.specialInactiveFaded, askOptions.colours.specialInactiveFaded),
    specialInactiveHint: processThemeItem(options?.colours?.specialInactiveHint, askOptions.colours.specialInactiveHint),
    specialInfo: processThemeItem(options?.colours?.specialInfo, askOptions.colours.specialInfo),
    specialErrorMsg: processThemeItem(options?.colours?.specialErrorMsg, askOptions.colours.specialErrorMsg),
    specialErrorIcon: processThemeItem(options?.colours?.specialErrorIcon, askOptions.colours.specialErrorIcon),

    tableSelectHover: processThemeItem(options?.colours?.tableSelectHover, askOptions.colours.tableSelectHover),

    timelineTrack: processThemeItem(options?.colours?.timelineTrack, askOptions.colours.timelineTrack),
    timelineTrackActive: processThemeItem(options?.colours?.timelineTrackActive, askOptions.colours.timelineTrackActive),
    timelineHandle: processThemeItem(options?.colours?.timelineHandle, askOptions.colours.timelineHandle),
    timelineHandleActive: processThemeItem(options?.colours?.timelineHandleActive, askOptions.colours.timelineHandleActive)
  };

  askOptions.symbols = {
    specialIcon: processThemeItem(options?.symbols?.specialIcon, askOptions.symbols.specialIcon),
    openingIcon: processThemeItem(options?.symbols?.openingIcon, askOptions.symbols.openingIcon),
    promptIcon: processThemeItem(options?.symbols?.promptIcon, askOptions.symbols.promptIcon),
    errorMsgPrefix: processThemeItem(options?.symbols?.errorMsgPrefix, askOptions.symbols.errorMsgPrefix),

    itemIcon: processThemeItem(options?.symbols?.itemIcon, askOptions.symbols.itemIcon),
    itemHoverIcon: processThemeItem(options?.symbols?.itemHoverIcon, askOptions.symbols.itemHoverIcon),
    itemSelectedIcon: processThemeItem(options?.symbols?.itemSelectedIcon, askOptions.symbols.itemSelectedIcon),
    itemUnselectedIcon: processThemeItem(options?.symbols?.itemUnselectedIcon, askOptions.symbols.itemUnselectedIcon),
    scrollUpIcon: processThemeItem(options?.symbols?.scrollUpIcon, askOptions.symbols.scrollUpIcon),
    scrollDownIcon: processThemeItem(options?.symbols?.scrollDownIcon, askOptions.symbols.scrollDownIcon),
    scrollbarTrack: processThemeItem(options?.symbols?.scrollbarTrack, askOptions.symbols.scrollbarTrack),
    scrollbarTrackTrimTop: processThemeItem(options?.symbols?.scrollbarTrackTrimTop, askOptions.symbols.scrollbarTrackTrimTop),
    scrollbarTrackTrimBottom: processThemeItem(options?.symbols?.scrollbarTrackTrimBottom, askOptions.symbols.scrollbarTrackTrimBottom),
    scrollbarBar: processThemeItem(options?.symbols?.scrollbarBar, askOptions.symbols.scrollbarBar),
    scrollbarBarTrimTop: processThemeItem(options?.symbols?.scrollbarBarTrimTop, askOptions.symbols.scrollbarBarTrimTop),
    scrollbarBarTrimBottom: processThemeItem(options?.symbols?.scrollbarBarTrimBottom, askOptions.symbols.scrollbarBarTrimBottom),

    separatorLine: processThemeItem(options?.symbols?.separatorLine, askOptions.symbols.separatorLine),
    separatorNodeDown: processThemeItem(options?.symbols?.separatorNodeDown, askOptions.symbols.separatorNodeDown),
    separatorNodeNone: processThemeItem(options?.symbols?.separatorNodeNone, askOptions.symbols.separatorNodeNone),
    separatorNodeUp: processThemeItem(options?.symbols?.separatorNodeUp, askOptions.symbols.separatorNodeUp),

    specialErrorIcon: processThemeItem(options?.symbols?.specialErrorIcon, askOptions.symbols.specialErrorIcon),
    folderOpenableIcon: processThemeItem(options?.symbols?.folderOpenableIcon, askOptions.symbols.folderOpenableIcon),
    fileOpenableIcon: processThemeItem(options?.symbols?.fileOpenableIcon, askOptions.symbols.fileOpenableIcon),

    timelineTrack: processThemeItem(options?.symbols?.timelineTrack, askOptions.symbols.timelineTrack),
    timelineHandle: processThemeItem(options?.symbols?.timelineHandle, askOptions.symbols.timelineHandle),
    timelineBar: processThemeItem(options?.symbols?.timelineBar, askOptions.symbols.timelineBar)
  };
};

const setThemeColour = <
  T extends
    | 'white'
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'darkWhite'
    | 'lightBlack'
    | 'darkRed'
    | 'darkGreen'
    | 'darkYellow'
    | 'darkBlue'
    | 'darkMagenta'
    | 'darkCyan'
    | 'grey'
    | 'gray',
  B extends `${T}Bg`
>(
  colour: T
) => {
  const permitted = [
    'white',
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'darkWhite',
    'lightBlack',
    'darkRed',
    'darkGreen',
    'darkYellow',
    'darkBlue',
    'darkMagenta',
    'darkCyan',
    'grey',
    'gray'
  ] as T[];
  if (!permitted.includes(colour)) {
    colour = 'yellow' as T;
  }

  const txtProp = colour;
  const bgProp = (colour + 'Bg') as B;

  applyPartialOptionsToAskOptions({
    general: {
      themeColour: colour
    },
    colours: {
      promptIcon: colr[txtProp].dim,
      result: colr.dark[txtProp],
      resultText: colr.dark[txtProp],
      itemHover: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },
      itemBlockHover: {
        normal: colr[bgProp].black,
        done: colr[bgProp].black
      },
      itemSelectedIcon: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },
      specialHover: {
        normal: colr.darkBg[bgProp].black,
        done: colr.darkBg[bgProp].black
      },
      specialHighlight: colr[txtProp],

      tableSelectHover: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },

      timelineHandleActive: colr[txtProp]
    }
  });
};

/**<!-- DOCS: ask.customise #### @ -->
 * customise
 *
 * - `ask.customise`
 *
 * Customise the behaviour/appearance of the `ask` prompts.
 *
 * See `ask.AskOptions` for the options available.
 *
 * ```typescript
 * ask.customise({ general: { themeColour: 'magenta' } }); // change the theme colour to magenta
 * ask.customise({ general: { lc } }); // set a line counter for that all prompts will add to when complete
 * ask.customise({ formatters: { formatPrompt: 'fullBox' } }); // change the format of the prompt
 * ```
 * @param {Partial<ask.AskOptions>} options
 * @returns {void}
 */
export const customise = (options: Partial<ask.AskOptions>) => {
  applyPartialOptionsToAskOptions(options);

  if (options?.general?.themeColour !== undefined) {
    setThemeColour(options.general.themeColour);
  }

  // Clear and (re)generate the cached state versions
  cachedOptionsForStates.normal = undefined;
  cachedOptionsForStates.error = undefined;
  cachedOptionsForStates.done = undefined;

  getAskOptionsForState(false, false);
  getAskOptionsForState(false, true);
  getAskOptionsForState(true, false);
};

/**
 * AskOptionsItemSet<T>
 *
 * Set of options, one for each state (normal, error, done)
 */
export type AskOptionsItemSet<T> = { [key in OptionsState]: T };

/**
 * AskOptionsItem<T>
 *
 * Either a single value, or a set of values, one for each state (normal, error, done)
 *
 * When single value, it is used for all states
 */
export type AskOptionsItem<T> = T | Partial<AskOptionsItemSet<T>>;

export namespace ask {
  /**<!-- DOCS: ask.AskOptions ###! 194 -->
   * AskOptions
   *
   * - `ask.AskOptions`
   *
   * Options to customise the behaviour/appearance of the `ask` prompts.
   *
   * Use with `ask.customise` to set these options.
   */
  export interface AskOptions {
    /**<!-- DOCS: ask.AskOptions.general #### 195 -->
     * `general` Options
     *
     * - `ask.AskOptions.general`
     *
     * General options for customising ask prompts
     *
     * | Name                           | Type                | Description                                                        |
     * |--------------------------------|---------------------|--------------------------------------------------------------------|
     * | themeColour                    | `string` (Colour)   | Set the main theme colour                                          |
     * | lc                             | `LineCounter`       | A line counter that all ask prompts will add to when complete      |
     * | boxType                        | `'thin' \| 'thick'` | What type of box drawing lines to use                              |
     * | beeps                          | `boolean`           | Whether to make an audio beeps when appropriate                    |
     * | maxItemsOnScreen               | `number`            | How many select/multiselect items to have on screen at most        |
     * | scrollMargin                   | `number`            | How much space to leaving when 'scrolling' lists of items          |
     * | fileExplorerColumnWidth        | `number`            | How wide to make each panel of the fileExplorer interface          |
     * | fileExplorerMaxItems           | `number`            | How many items to show in each panel of the fileExplorer interface |
     * | tableSelectMaxHeightPercentage | `number`            | Percent of terminal height to use at max for table selects         |
     * | timelineSpeed                  | `number`            | How many frames to move on a timeline at a time                    |
     * | timelineFastSpeed              | `number`            | How many frames to move on a timeline at a time (fast mode)        |
     */
    general?: {
      /** Set the main theme colour */
      themeColour?:
        | 'white'
        | 'black'
        | 'red'
        | 'green'
        | 'yellow'
        | 'blue'
        | 'magenta'
        | 'cyan'
        | 'darkWhite'
        | 'lightBlack'
        | 'darkRed'
        | 'darkGreen'
        | 'darkYellow'
        | 'darkBlue'
        | 'darkMagenta'
        | 'darkCyan'
        | 'grey'
        | 'gray';
      /** A line counter that all ask prompts will add to when complete */
      lc?: LineCounter;
      /** What type of box drawing lines to use */
      boxType?: 'thin' | 'thick';
      /** Whether to make an audio beeps when appropriate */
      beeps?: boolean;
      /** How many select/multiselect items to have on screen at most */
      maxItemsOnScreen?: number;
      /** How much space to leaving when 'scrolling' lists of items */
      scrollMargin?: number;
      /** How wide to make each panel of the fileExplorer interface */
      fileExplorerColumnWidth?: number;
      /** How many items to show in each panel of the fileExplorer interface */
      fileExplorerMaxItems?: number;
      /** Percent of terminal height to use at max for table selects */
      tableSelectMaxHeightPercentage?: number;
      /** How many frames to move on a timeline at a time */
      timelineSpeed?: number;
      /** How many frames to move on a timeline at a time (fast mode) */
      timelineFastSpeed?: number;
    };
    /**<!-- DOCS: ask.AskOptions.text #### 195 -->
     * `text` Options
     *
     * - `ask.AskOptions.text`
     *
     * English natural-language elements that you may wish to localise
     *
     * | Name                               | Type                       | Description                                                 |
     * |------------------------------------|----------------------------|-------------------------------------------------------------|
     * | boolTrueKeys                       | `string`                   | What buttons to use to indicate `true` for boolean prompts  |
     * | boolFalseKeys                      | `string`                   | What buttons to use to indicate `false` for boolean prompts |
     * | boolYes                            | `string`                   | 'Yes'                                                       |
     * | boolNo                             | `string`                   | 'No'                                                        |
     * | boolYesNoSeparator                 | `string`                   | '/'                                                         |
     * | boolYN                             | `string`                   | '(Y/n)'                                                     |
     * | selectAll                          | `string`                   | '[Select All]'                                              |
     * | done                               | `string`                   | 'done'                                                      |
     * | items                              | `(num: number) => string`  | '[X items]'                                                 |
     * | countdown                          | `(secs: number) => string` | 'Starting in Xs...'                                         |
     * | file                               | `string`                   | 'File'                                                      |
     * | directory                          | `string`                   | 'Directory'                                                 |
     * | loading                            | `string`                   | 'Loading...'                                                |
     * | selected                           | `(num: number) => string`  | 'X selected'                                                |
     * | specialNewFolderEnterNothingCancel | `string`                   | 'Enter nothing to cancel'                                   |
     * | specialNewFolderAddingFolderTo     | `string`                   | 'Adding folder to '                                         |
     * | specialNewFolderQuestion           | `(hl: any) => string`      | 'What do you want to name the new folder?'                  |
     * | specialSaveFileSavingFileTo        | `string`                   | 'Saving file to '                                           |
     * | specialSaveFileQuestion            | `(hl: any) => string`      | 'What do you want to name the file?'                        |
     */
    text?: {
      /** What buttons to use to indicate `true` for boolean prompts */
      boolTrueKeys?: string;
      /** What buttons to use to indicate `false` for boolean prompts */
      boolFalseKeys?: string;
      /** 'Yes' */
      boolYes?: string;
      /** 'No' */
      boolNo?: string;
      /** '/' */
      boolYesNoSeparator?: string;
      /** '(Y/n)' */
      boolYN?: string;
      /** '[Select All]' */
      selectAll?: string;
      /** 'done' */
      done?: string;
      /** '[X items]' */
      items?: (count: number) => string;
      /** 'Starting in Xs...' */
      countdown?: (secondsRemaining: number) => string;
      /** 'File' */
      file?: string;
      /** 'Directory' */
      directory?: string;
      /** 'Loading...' */
      loading?: string;
      /** 'X selected' */
      selected?: (count: number) => string;

      /** 'Enter nothing to cancel' */
      specialNewFolderEnterNothingCancel?: string;
      /** 'Adding folder to ' */
      specialNewFolderAddingFolderTo?: string;
      /** 'What do you want to name the new folder?' */
      specialNewFolderQuestion?: (hl: any) => string;

      /** 'Saving file to ' */
      specialSaveFileSavingFileTo?: string;
      /** 'What do you want to name the file?' */
      specialSaveFileQuestion?: (hl: any) => string;
    };
    /**<!-- DOCS: ask.AskOptions.formatters ####! 195 -->
     * `formatters` Options
     *
     * - `ask.AskOptions.formatters`
     *
     * Functions for formatting how the prompts should display
     */
    formatters?: {
      /**<!-- DOCS: ask.AskOptions.formatters.formatPrompt ##### 195 -->
       * `formatPrompt`
       *
       * - `ask.AskOptions.formatters.formatPrompt`
       *
       * How to format the prompts
       *
       * Presets: `oneLine`, `halfBox`, `halfBoxClosed`, `fullBox`, `fullBoxClosed`
       *
       * Type:
       * ```typescript
       * (
       *   question: string | Breadcrumb,
       *   value: string,
       *   items: string | undefined,
       *   errorMessage: string | undefined,
       *   theme: AskOptionsForState,
       *   isComplete: boolean,
       *   isExit: boolean
       * ) => string;
       * ```
       */
      formatPrompt?: 'oneLine' | 'halfBox' | 'halfBoxClosed' | 'fullBox' | 'fullBoxClosed' | FormatPromptFn;
      /**<!-- DOCS: ask.AskOptions.formatters.formatItems ##### 195 -->
       * `formatItems`
       *
       * - `ask.AskOptions.formatters.formatItems`
       *
       * How to format lists of items
       *
       * Presets: `block`, `blockAlt`, `simple`, `simpleAlt`
       *
       * Type:
       * ```typescript
       * <T extends unknown>(
       *   allItems: PromptChoiceFull<T>[],
       *   scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
       *   selected: number[] | undefined,
       *   type: 'single' | 'multi',
       *   theme: AskOptionsForState,
       *   isExit: boolean
       * ) => string;
       * ```
       */
      formatItems?: 'block' | 'blockAlt' | 'simple' | 'simpleAlt' | FormatItemsFn;
    };
    /**<!-- DOCS: ask.AskOptions.colours #### 195 -->
     * `colours` Options
     *
     * - `ask.AskOptions.colours`
     *
     * Colours for all the different elements
     *
     * All colours can be a single `WrapFn` value, or a set of `WrapFn` values, one for each state (normal, error, done)
     * When single value, it is used for all states. When only a few states are set, the others will remain unchanged.
     *
     * | Name                     | Description                                                                                     |
     * |--------------------------|-------------------------------------------------------------------------------------------------|
     * | decoration               | General decoration and cosmetics                                                                |
     * | questionText             | The text of the question of the prompt                                                          |
     * | specialIcon              | Special icon for the 'state'                                                                    |
     * | openingIcon              | The initial/opening icon                                                                        |
     * | promptIcon               | The icon that indicates where you are typing                                                    |
     * | result                   | General result                                                                                  |
     * | resultText               | String results                                                                                  |
     * | resultNumber             | Number results                                                                                  |
     * | resultBoolean            | Boolean results                                                                                 |
     * | resultArray              | Array results                                                                                   |
     * | resultDate               | Date results                                                                                    |
     * | loadingIcon              | Icon for ask.loading                                                                            |
     * | errorMsg                 | The error message (if there is one)                                                             |
     * | item                     | A normal item in a list                                                                         |
     * | itemIcon                 | Icon for a normal item in a list                                                                |
     * | itemHover                | A hovered item in a list                                                                        |
     * | itemHoverIcon            | Icon for a hovered item in a list                                                               |
     * | itemBlockHover           | A hovered item in a list (block mode)                                                           |
     * | itemBlockHoverIcon       | Icon for a hovered item in a list (block mode)                                                  |
     * | itemSelected             | A selected item in a list                                                                       |
     * | itemSelectedIcon         | Icon for a selected item in a list                                                              |
     * | itemUnselected           | An unselected item in a list                                                                    |
     * | itemUnselectedIcon       | Icon for an unselected item in a list                                                           |
     * | scrollbarTrack           | The track for the scrollbar                                                                     |
     * | scrollbarBar             | The bar for the scrollbar                                                                       |
     * | selectAllText            | 'Select All' item in a multi-select                                                             |
     * | boolYNText               | The '(Y/n)' bit for the booleanYN prompt                                                        |
     * | countdown                | ask.countdown                                                                                   |
     * | pause                    | ask.pause                                                                                       |
     * | specialHover             | The focus of what the user is controlling (for dates, fileExplorer, etc)                        |
     * | specialSelected          | Something that has been selected (for dates, fileExplorer, etc)                                 |
     * | specialHighlight         | More important that normal (e.g. date within a range) (for dates, fileExplorer, etc)            |
     * | specialNormal            | Normal items (for dates, fileExplorer, etc)                                                     |
     * | specialFaded             | Not important (for dates, fileExplorer, etc)                                                    |
     * | specialHint              | Hints/tips/advice (for dates, fileExplorer, etc)                                                |
     * | specialInactiveHover     | The focus of what the user is controlling (Inactive) (for dates, fileExplorer, etc)             |
     * | specialInactiveSelected  | Something that has been selected (Inactive) (for dates, fileExplorer, etc)                      |
     * | specialInactiveHighlight | More important that normal (e.g. date within a range) (Inactive) (for dates, fileExplorer, etc) |
     * | specialInactiveNormal    | Normal items (Inactive) (for dates, fileExplorer, etc)                                          |
     * | specialInactiveFaded     | Not important (Inactive) (for dates, fileExplorer, etc)                                         |
     * | specialInactiveHint      | Hints/tips/advice (Inactive) (for dates, fileExplorer, etc)                                     |
     * | specialInfo              | Action bar at bottom (for dates, fileExplorer, etc)                                             |
     * | specialErrorMsg          | Error messages (for dates, fileExplorer, etc)                                                   |
     * | specialErrorIcon         | Icon for errors (for dates, fileExplorer, etc)                                                  |
     * | tableSelectHover         | Hover for table selects only (shouldn't be 'block'/bg styles)                                   |
     * | timelineTrack            | The (inactive) track of a timeline                                                              |
     * | timelineTrackActive      | The active track of a timeline                                                                  |
     * | timelineHandle           | The (inactive) control handle on a timeline                                                     |
     * | timelineHandleActive     | The active control handle on a timeline                                                         |
     */
    colours?: {
      /** General decoration and cosmetics */
      decoration?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The text of the question of the prompt */
      questionText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Special icon for the 'state' */
      specialIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The initial/opening icon */
      openingIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The icon that indicates where you are typing */
      promptIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** General result */
      result?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** String results */
      resultText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Number results */
      resultNumber?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Boolean results */
      resultBoolean?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Array results */
      resultArray?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Date results */
      resultDate?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for ask.loading */
      loadingIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The error message (if there is one) */
      errorMsg?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** A normal item in a list */
      item?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for a normal item in a list */
      itemIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** A hovered item in a list */
      itemHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for a hovered item in a list */
      itemHoverIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** A hovered item in a list (block mode) */
      itemBlockHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for a hovered item in a list (block mode) */
      itemBlockHoverIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** A selected item in a list */
      itemSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for a selected item in a list */
      itemSelectedIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** An unselected item in a list */
      itemUnselected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for an unselected item in a list */
      itemUnselectedIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The track for the scrollbar */
      scrollbarTrack?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The bar for the scrollbar */
      scrollbarBar?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** 'Select All' item in a multi-select */
      selectAllText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The '(Y/n)' bit for the booleanYN prompt */
      boolYNText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** ask.countdown */
      countdown?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** ask.pause */
      pause?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };

      /** The focus of what the user is controlling (for dates, fileExplorer, etc) */
      specialHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Something that has been selected (for dates, fileExplorer, etc) */
      specialSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** More important that normal (e.g. date within a range) (for dates, fileExplorer, etc) */
      specialHighlight?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Normal items (for dates, fileExplorer, etc) */
      specialNormal?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Not important (for dates, fileExplorer, etc) */
      specialFaded?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Hints/tips/advice (for dates, fileExplorer, etc) */
      specialHint?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The focus of what the user is controlling (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Something that has been selected (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** More important that normal (e.g. date within a range) (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveHighlight?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Normal items (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveNormal?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Not important (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveFaded?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Hints/tips/advice (Inactive) (for dates, fileExplorer, etc) */
      specialInactiveHint?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Action bar at bottom (for dates, fileExplorer, etc) */
      specialInfo?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Error messages (for dates, fileExplorer, etc) */
      specialErrorMsg?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** Icon for errors (for dates, fileExplorer, etc) */
      specialErrorIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };

      /** Hover for table selects only (shouldn't be 'block'/bg styles) */
      tableSelectHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };

      /** The (inactive) track of a timeline */
      timelineTrack?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The active track of a timeline */
      timelineTrackActive?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The (inactive) control handle on a timeline */
      timelineHandle?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      /** The active control handle on a timeline */
      timelineHandleActive?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
    };
    /**<!-- DOCS: ask.AskOptions.symbols #### 195 -->
     * `symbols` Options
     *
     * - `ask.AskOptions.symbols`
     *
     * Variety of symbols and 'icons' for different aspects of the display
     *
     * All symbols can be a single `string` value, or a set of `string` values, one for each state (normal, error, done)
     * When single value, it is used for all states. When only a few states are set, the others will remain unchanged.
     *
     * | Name                     | Description                                                               |
     * |--------------------------|---------------------------------------------------------------------------|
     * | specialIcon              | Special icon for the 'state'                                              |
     * | openingIcon              | The initial/opening icon                                                  |
     * | promptIcon               | The icon that indicates where you are typing                              |
     * | errorMsgPrefix           | Icon shown before error messages                                          |
     * | itemIcon                 | Icon for a normal item in a list                                          |
     * | itemHoverIcon            | Icon for a hovered item in a list                                         |
     * | itemSelectedIcon         | Icon for a selected item in a list                                        |
     * | itemUnselectedIcon       | Icon for an unselected item in a list                                     |
     * | scrollUpIcon             | Used to indicate you can scroll up                                        |
     * | scrollDownIcon           | Used to indicate you can scroll down                                      |
     * | scrollbarTrack           | The track part of the scrollbar                                           |
     * | scrollbarTrackTrimTop    | The trimmed top of the track (half height)                                |
     * | scrollbarTrackTrimBottom | The trimmed bottom of the track (half height)                             |
     * | scrollbarBar             | The bar part of the scrollbar                                             |
     * | scrollbarBarTrimTop      | The trimmed top of the bar (half height)                                  |
     * | scrollbarBarTrimBottom   | The trimmed bottom of the bar (half height)                               |
     * | separatorLine            | Line added by ask.separator                                               |
     * | separatorNodeDown        | Node is ask.separator line that indicates 'down'                          |
     * | separatorNodeNone        | Node is ask.separator line that breaks up the pattern                     |
     * | separatorNodeUp          | Node is ask.separator line that indicates 'up'                            |
     * | specialErrorIcon         | Icon for errors (for dates, fileExplorer, etc)                            |
     * | folderOpenableIcon       | Shown at end of line for folders to show they can be opened (right-wards) |
     * | fileOpenableIcon         | File version of folderOpenableIcon. Typically empty                       |
     * | timelineTrack            | The track of a timeline                                                   |
     * | timelineHandle           | The control handle on a timeline                                          |
     * | timelineBar              | The 'bar' (active portion) of a timeline                                  |
     */
    symbols?: {
      /** Special icon for the 'state' */
      specialIcon?: string | { normal?: string; error?: string; done?: string };
      /** The initial/opening icon */
      openingIcon?: string | { normal?: string; error?: string; done?: string };
      /** The icon that indicates where you are typing */
      promptIcon?: string | { normal?: string; error?: string; done?: string };
      /** Icon shown before error messages */
      errorMsgPrefix?: string | { normal?: string; error?: string; done?: string };

      /** Icon for a normal item in a list */
      itemIcon?: string | { normal?: string; error?: string; done?: string };
      /** Icon for a hovered item in a list */
      itemHoverIcon?: string | { normal?: string; error?: string; done?: string };
      /** Icon for a selected item in a list */
      itemSelectedIcon?: string | { normal?: string; error?: string; done?: string };
      /** Icon for an unselected item in a list */
      itemUnselectedIcon?: string | { normal?: string; error?: string; done?: string };
      /** Used to indicate you can scroll up */
      scrollUpIcon?: string | { normal?: string; error?: string; done?: string };
      /** Used to indicate you can scroll down */
      scrollDownIcon?: string | { normal?: string; error?: string; done?: string };
      /** The track part of the scrollbar */
      scrollbarTrack?: string | { normal?: string; error?: string; done?: string };
      /** The trimmed top of the track (half height) */
      scrollbarTrackTrimTop?: string | { normal?: string; error?: string; done?: string };
      /** The trimmed bottom of the track (half height) */
      scrollbarTrackTrimBottom?: string | { normal?: string; error?: string; done?: string };
      /** The bar part of the scrollbar */
      scrollbarBar?: string | { normal?: string; error?: string; done?: string };
      /** The trimmed top of the bar (half height) */
      scrollbarBarTrimTop?: string | { normal?: string; error?: string; done?: string };
      /** The trimmed bottom of the bar (half height) */
      scrollbarBarTrimBottom?: string | { normal?: string; error?: string; done?: string };

      /** Line added by ask.separator */
      separatorLine?: string | { normal?: string; error?: string; done?: string };
      /** Node is ask.separator line that indicates 'down' */
      separatorNodeDown?: string | { normal?: string; error?: string; done?: string };
      /** Node is ask.separator line that breaks up the pattern */
      separatorNodeNone?: string | { normal?: string; error?: string; done?: string };
      /** Node is ask.separator line that indicates 'up' */
      separatorNodeUp?: string | { normal?: string; error?: string; done?: string };

      /** Icon for errors (for dates, fileExplorer, etc)  */
      specialErrorIcon?: string | { normal?: string; error?: string; done?: string };

      /** Shown at end of line for folders to show they can be opened (right-wards) */
      folderOpenableIcon?: string | { normal?: string; error?: string; done?: string };
      /** File version of folderOpenableIcon. Typically empty */
      fileOpenableIcon?: string | { normal?: string; error?: string; done?: string };

      /** The track of a timeline */
      timelineTrack?: string | { normal?: string; error?: string; done?: string };
      /** The control handle on a timeline */
      timelineHandle?: string | { normal?: string; error?: string; done?: string };
      /** The 'bar' (active portion) of a timeline */
      timelineBar?: string | { normal?: string; error?: string; done?: string };
    };
  }
}

// AskOptionsStored is what is actually stored in the askOptions variable
interface AskOptionsStored extends ask.AskOptions {
  general: AskOptionsStoredGeneral;
  text: AskOptionsStoredText;
  formatters: AskOptionsStoredFormatters;
  colours: AskOptionsStoredColours;
  symbols: AskOptionsStoredSymbols;
}

interface AskOptionsStoredGeneral {
  themeColour:
    | 'white'
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'darkWhite'
    | 'lightBlack'
    | 'darkRed'
    | 'darkGreen'
    | 'darkYellow'
    | 'darkBlue'
    | 'darkMagenta'
    | 'darkCyan'
    | 'grey'
    | 'gray';
  lc: LineCounter;
  boxType: 'thin' | 'thick';
  beeps: boolean;
  maxItemsOnScreen: number;
  scrollMargin: number;
  fileExplorerColumnWidth: number;
  fileExplorerMaxItems: number;
  tableSelectMaxHeightPercentage: number;
  timelineSpeed: number;
  timelineFastSpeed: number;
}

interface AskOptionsStoredText {
  boolTrueKeys: string;
  boolFalseKeys: string;
  boolYes: string;
  boolNo: string;
  boolYesNoSeparator: string;
  boolYN: string;
  selectAll: string;
  done: string;
  items: (count: number) => string;
  countdown: (secondsRemaining: number) => string;
  file: string;
  directory: string;
  loading: string;
  selected: (count: number) => string;

  specialNewFolderEnterNothingCancel: string;
  specialNewFolderAddingFolderTo: string;
  specialNewFolderQuestion: (hl: any) => string;

  specialSaveFileSavingFileTo: string;
  specialSaveFileQuestion: (hl: any) => string;
}

interface AskOptionsStoredFormatters {
  formatPrompt: FormatPromptFn;
  formatItems: FormatItemsFn;
}
interface AskOptionsStoredColours {
  decoration: AskOptionsItemSet<WrapFn>;
  questionText: AskOptionsItemSet<WrapFn>;
  specialIcon: AskOptionsItemSet<WrapFn>;
  openingIcon: AskOptionsItemSet<WrapFn>;
  promptIcon: AskOptionsItemSet<WrapFn>;
  result: AskOptionsItemSet<WrapFn>;
  resultText: AskOptionsItemSet<WrapFn>;
  resultNumber: AskOptionsItemSet<WrapFn>;
  resultBoolean: AskOptionsItemSet<WrapFn>;
  resultArray: AskOptionsItemSet<WrapFn>;
  resultDate: AskOptionsItemSet<WrapFn>;
  loadingIcon: AskOptionsItemSet<WrapFn>;
  errorMsg: AskOptionsItemSet<WrapFn>;
  item: AskOptionsItemSet<WrapFn>;
  itemIcon: AskOptionsItemSet<WrapFn>;
  itemHover: AskOptionsItemSet<WrapFn>;
  itemHoverIcon: AskOptionsItemSet<WrapFn>;
  itemBlockHover: AskOptionsItemSet<WrapFn>;
  itemBlockHoverIcon: AskOptionsItemSet<WrapFn>;
  itemSelected: AskOptionsItemSet<WrapFn>;
  itemSelectedIcon: AskOptionsItemSet<WrapFn>;
  itemUnselected: AskOptionsItemSet<WrapFn>;
  itemUnselectedIcon: AskOptionsItemSet<WrapFn>;
  scrollbarTrack: AskOptionsItemSet<WrapFn>;
  scrollbarBar: AskOptionsItemSet<WrapFn>;
  selectAllText: AskOptionsItemSet<WrapFn>;
  boolYNText: AskOptionsItemSet<WrapFn>;
  countdown: AskOptionsItemSet<WrapFn>;
  pause: AskOptionsItemSet<WrapFn>;

  specialHover: AskOptionsItemSet<WrapFn>;
  specialSelected: AskOptionsItemSet<WrapFn>;
  specialHighlight: AskOptionsItemSet<WrapFn>;
  specialNormal: AskOptionsItemSet<WrapFn>;
  specialFaded: AskOptionsItemSet<WrapFn>;
  specialHint: AskOptionsItemSet<WrapFn>;
  specialInactiveHover: AskOptionsItemSet<WrapFn>;
  specialInactiveSelected: AskOptionsItemSet<WrapFn>;
  specialInactiveHighlight: AskOptionsItemSet<WrapFn>;
  specialInactiveNormal: AskOptionsItemSet<WrapFn>;
  specialInactiveFaded: AskOptionsItemSet<WrapFn>;
  specialInactiveHint: AskOptionsItemSet<WrapFn>;
  specialInfo: AskOptionsItemSet<WrapFn>;
  specialErrorMsg: AskOptionsItemSet<WrapFn>;
  specialErrorIcon: AskOptionsItemSet<WrapFn>;

  tableSelectHover: AskOptionsItemSet<WrapFn>;

  timelineTrack: AskOptionsItemSet<WrapFn>;
  timelineTrackActive: AskOptionsItemSet<WrapFn>;
  timelineHandle: AskOptionsItemSet<WrapFn>;
  timelineHandleActive: AskOptionsItemSet<WrapFn>;
}
interface AskOptionsStoredSymbols {
  specialIcon: AskOptionsItemSet<string>;
  openingIcon: AskOptionsItemSet<string>;
  promptIcon: AskOptionsItemSet<string>;
  errorMsgPrefix: AskOptionsItemSet<string>;

  itemIcon: AskOptionsItemSet<string>;
  itemHoverIcon: AskOptionsItemSet<string>;
  itemSelectedIcon: AskOptionsItemSet<string>;
  itemUnselectedIcon: AskOptionsItemSet<string>;
  scrollUpIcon: AskOptionsItemSet<string>;
  scrollDownIcon: AskOptionsItemSet<string>;
  scrollbarTrack: AskOptionsItemSet<string>;
  scrollbarTrackTrimTop: AskOptionsItemSet<string>;
  scrollbarTrackTrimBottom: AskOptionsItemSet<string>;
  scrollbarBar: AskOptionsItemSet<string>;
  scrollbarBarTrimTop: AskOptionsItemSet<string>;
  scrollbarBarTrimBottom: AskOptionsItemSet<string>;

  separatorLine: AskOptionsItemSet<string>;
  separatorNodeDown: AskOptionsItemSet<string>;
  separatorNodeNone: AskOptionsItemSet<string>;
  separatorNodeUp: AskOptionsItemSet<string>;

  specialErrorIcon: AskOptionsItemSet<string>;
  folderOpenableIcon: AskOptionsItemSet<string>; // used in fileExplorer to show a folder can be opened
  fileOpenableIcon: AskOptionsItemSet<string>; // shown at end of row for files (usually just a space)

  timelineTrack: AskOptionsItemSet<string>;
  timelineHandle: AskOptionsItemSet<string>;
  timelineBar: AskOptionsItemSet<string>;
}

export interface AskOptionsForState {
  general: AskOptionsStoredGeneral;
  text: AskOptionsStoredText;
  formatters: AskOptionsStoredFormatters;
  colours: OfType<AskOptionsStoredColours, WrapFn>;
  symbols: OfType<AskOptionsStoredSymbols, string> & { boxType: 'thin' | 'thick' };
  boxSymbols: BoxSymbols;
}
