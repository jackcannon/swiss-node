import { ObjectTools, OfType, symbols } from 'swiss-ak';
import { WrapFn, colr } from '../../colr';
import { FormatItemsFn, FormatPromptFn, promptFormatters, itemsFormatters } from './formatters';
import { LineCounter, getLineCounter } from '../../out';

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
  askOptions = {
    general: {
      themeColour: 'yellow',
      lc: getLineCounter(),
      boxType: 'thick',
      maxItemsOnScreen: 10,
      scrollMargin: 2,
      fileExplorerColumnWidth: 25,
      fileExplorerMaxItems: 15
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
        normal: colr.grey1,
        error: colr.dark.red.dim,
        done: colr.grey1
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
        normal: colr.grey1,
        error: colr.dark.red,
        done: colr.grey1
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
      scrollbarTrack: getSetFromSingle(colr.lightBlack),
      scrollbarBar: getSetFromSingle(colr.lightBlackBg.black),
      selectAllText: getSetFromSingle(colr.grey3),
      boolYNText: getSetFromSingle(colr.grey),
      countdown: {
        normal: colr.lightBlack,
        error: colr.dark.red.dim,
        done: colr.dark.green.dim
      },
      pause: getSetFromSingle(colr.grey4),

      // special is for datetime, fileExplorer, etc
      // level 1 important
      specialHover: {
        normal: colr.darkBg.yellowBg.black,
        error: colr.redBg.black,
        done: colr.darkBg.yellowBg.black
      },
      // level 2 important
      specialSelected: getSetFromSingle(colr.darkBg.whiteBg.black),
      // level 3 important - intermediary dates in a range, etc
      specialHighlight: getSetFromSingle(colr.yellow),
      // normal regular things
      specialNormal: getSetFromSingle(colr.white), // colr.dark.white
      // faded for things like dates in a different month
      specialFaded: getSetFromSingle(colr.grey3),
      // hints for button presses, etc
      specialHint: getSetFromSingle(colr.grey1),

      specialInactiveHover: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveSelected: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveHighlight: getSetFromSingle(colr.grey4),
      specialInactiveNormal: getSetFromSingle(colr.grey3),
      specialInactiveFaded: getSetFromSingle(colr.grey2),
      specialInactiveHint: getSetFromSingle(colr.black),

      specialInfo: getSetFromSingle(colr), // the button info bar are the bottom of special prompts
      specialErrorMsg: getSetFromSingle(colr.red), // The error message display for special prompts
      specialErrorIcon: getSetFromSingle(colr) // Icon for the error message display for special prompts
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
      scrollbarTrack: getSetFromSingle('┇'),
      scrollbarBar: getSetFromSingle(' '),

      // ⌄˰˅˄⌃▼▲▽△▾▴▿▵
      separatorLine: getSetFromSingle('┄'),
      separatorNodeDown: getSetFromSingle('▿'),
      separatorNodeNone: getSetFromSingle('◦'),
      separatorNodeUp: getSetFromSingle('▵'),

      specialErrorIcon: getSetFromSingle(' ! '),

      folderOpenableIcon: getSetFromSingle('›'),
      fileOpenableIcon: getSetFromSingle(' ')
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
    maxItemsOnScreen: options?.general?.maxItemsOnScreen ?? askOptions.general.maxItemsOnScreen,
    scrollMargin: options?.general?.scrollMargin ?? askOptions.general.scrollMargin,
    fileExplorerColumnWidth: options?.general?.fileExplorerColumnWidth ?? askOptions.general.fileExplorerColumnWidth,
    fileExplorerMaxItems: options?.general?.fileExplorerMaxItems ?? askOptions.general.fileExplorerMaxItems
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
    specialErrorIcon: processThemeItem(options?.colours?.specialErrorIcon, askOptions.colours.specialErrorIcon)
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
    scrollbarBar: processThemeItem(options?.symbols?.scrollbarBar, askOptions.symbols.scrollbarBar),

    separatorLine: processThemeItem(options?.symbols?.separatorLine, askOptions.symbols.separatorLine),
    separatorNodeDown: processThemeItem(options?.symbols?.separatorNodeDown, askOptions.symbols.separatorNodeDown),
    separatorNodeNone: processThemeItem(options?.symbols?.separatorNodeNone, askOptions.symbols.separatorNodeNone),
    separatorNodeUp: processThemeItem(options?.symbols?.separatorNodeUp, askOptions.symbols.separatorNodeUp),

    specialErrorIcon: processThemeItem(options?.symbols?.specialErrorIcon, askOptions.symbols.specialErrorIcon),
    folderOpenableIcon: processThemeItem(options?.symbols?.folderOpenableIcon, askOptions.symbols.folderOpenableIcon),
    fileOpenableIcon: processThemeItem(options?.symbols?.fileOpenableIcon, askOptions.symbols.fileOpenableIcon)
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
      specialHighlight: colr[txtProp]
    }
  });
};

/**<!-- DOCS: ask.customise #### @ -->
 * customise
 *
 * - `ask.customise`
 *
 * TODO docs
 *
 * ```typescript
 * TODO example
 * ```
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

export type AskOptionsItemSet<T> = { [key in OptionsState]: T };
export type AskOptionsItem<T> = T | Partial<AskOptionsItemSet<T>>;

export namespace ask {
  /**<!-- DOCS: ask.AskOptions ### 198 -->
   * AskOptions
   *
   * - `ask.AskOptions`
   *
   * Options to customise the behaviour/appearance of the `ask` prompts.
   *
   * TODO tables
   */
  export interface AskOptions {
    general?: {
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
      lc?: LineCounter;
      boxType?: 'thin' | 'thick';
      maxItemsOnScreen?: number;
      scrollMargin?: number;
      fileExplorerColumnWidth?: number;
      fileExplorerMaxItems?: number;
    };
    text?: {
      boolTrueKeys?: string;
      boolFalseKeys?: string;
      boolYes?: string;
      boolNo?: string;
      boolYesNoSeparator?: string;
      boolYN?: string;
      selectAll?: string;
      done?: string;
      items?: (count: number) => string;
      countdown?: (secondsRemaining: number) => string;
      file?: string;
      directory?: string;
      loading?: string;
      selected?: (count: number) => string;

      specialNewFolderEnterNothingCancel?: string;
      specialNewFolderAddingFolderTo?: string;
      specialNewFolderQuestion?: (hl: any) => string;

      specialSaveFileSavingFileTo?: string;
      specialSaveFileQuestion?: (hl: any) => string;
    };
    formatters?: {
      formatPrompt?: 'oneLine' | 'halfBox' | 'halfBoxClosed' | 'fullBox' | 'fullBoxClosed' | FormatPromptFn;
      formatItems?: 'block' | 'blockAlt' | 'simple' | 'simpleAlt' | FormatItemsFn;
    };
    colours?: {
      decoration?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      questionText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      openingIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      promptIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      result?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      resultText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      resultNumber?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      resultBoolean?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      resultArray?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      resultDate?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      loadingIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      errorMsg?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      item?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemHoverIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemBlockHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemBlockHoverIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemSelectedIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemUnselected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      itemUnselectedIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      scrollbarTrack?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      scrollbarBar?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      selectAllText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      boolYNText?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      countdown?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      pause?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };

      // special is for datetime, fileExplorer, etc
      specialHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialHighlight?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialNormal?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialFaded?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialHint?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveHover?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveSelected?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveHighlight?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveNormal?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveFaded?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInactiveHint?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialInfo?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialErrorMsg?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
      specialErrorIcon?: WrapFn | { normal?: WrapFn; error?: WrapFn; done?: WrapFn };
    };
    symbols?: {
      specialIcon?: string | { normal?: string; error?: string; done?: string };
      openingIcon?: string | { normal?: string; error?: string; done?: string };
      promptIcon?: string | { normal?: string; error?: string; done?: string };
      errorMsgPrefix?: string | { normal?: string; error?: string; done?: string };

      itemIcon?: string | { normal?: string; error?: string; done?: string };
      itemHoverIcon?: string | { normal?: string; error?: string; done?: string };
      itemSelectedIcon?: string | { normal?: string; error?: string; done?: string };
      itemUnselectedIcon?: string | { normal?: string; error?: string; done?: string };
      scrollUpIcon?: string | { normal?: string; error?: string; done?: string };
      scrollDownIcon?: string | { normal?: string; error?: string; done?: string };
      scrollbarTrack?: string | { normal?: string; error?: string; done?: string };
      scrollbarBar?: string | { normal?: string; error?: string; done?: string };

      separatorLine?: string | { normal?: string; error?: string; done?: string };
      separatorNodeDown?: string | { normal?: string; error?: string; done?: string };
      separatorNodeNone?: string | { normal?: string; error?: string; done?: string };
      separatorNodeUp?: string | { normal?: string; error?: string; done?: string };

      specialErrorIcon?: string | { normal?: string; error?: string; done?: string };

      folderOpenableIcon?: string | { normal?: string; error?: string; done?: string };
      fileOpenableIcon?: string | { normal?: string; error?: string; done?: string };
    };
  }
}

// What is actually stored in `askOptions`
export interface AskOptionsStored extends ask.AskOptions {
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
  maxItemsOnScreen: number;
  scrollMargin: number;
  fileExplorerColumnWidth: number;
  fileExplorerMaxItems: number;
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

  // special is for datetime, fileExplorer, etc
  specialHover: AskOptionsItemSet<WrapFn>; // level 1 important
  specialSelected: AskOptionsItemSet<WrapFn>; // level 2 important
  specialHighlight: AskOptionsItemSet<WrapFn>; // level 3 important - intermediary dates in a range, etc
  specialNormal: AskOptionsItemSet<WrapFn>; // normal regular things
  specialFaded: AskOptionsItemSet<WrapFn>; // faded for things like dates in a different month
  specialHint: AskOptionsItemSet<WrapFn>; // hints for button presses, etc
  specialInactiveHover: AskOptionsItemSet<WrapFn>;
  specialInactiveSelected: AskOptionsItemSet<WrapFn>;
  specialInactiveHighlight: AskOptionsItemSet<WrapFn>;
  specialInactiveNormal: AskOptionsItemSet<WrapFn>;
  specialInactiveFaded: AskOptionsItemSet<WrapFn>;
  specialInactiveHint: AskOptionsItemSet<WrapFn>;
  specialInfo: AskOptionsItemSet<WrapFn>; // the button info bar are the bottom of special prompts
  specialErrorMsg: AskOptionsItemSet<WrapFn>; // The error message display for special prompts
  specialErrorIcon: AskOptionsItemSet<WrapFn>; // Icon for the error message display for special prompts
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
  scrollbarBar: AskOptionsItemSet<string>;

  separatorLine: AskOptionsItemSet<string>;
  separatorNodeDown: AskOptionsItemSet<string>;
  separatorNodeNone: AskOptionsItemSet<string>;
  separatorNodeUp: AskOptionsItemSet<string>;

  specialErrorIcon: AskOptionsItemSet<string>;
  folderOpenableIcon: AskOptionsItemSet<string>; // used in fileExplorer to show a folder can be opened
  fileOpenableIcon: AskOptionsItemSet<string>; // shown at end of row for files (usually just a space)
}

export interface AskOptionsForState {
  general: AskOptionsStoredGeneral;
  text: AskOptionsStoredText;
  formatters: AskOptionsStoredFormatters;
  colours: OfType<AskOptionsStoredColours, WrapFn>;
  symbols: OfType<AskOptionsStoredSymbols, string> & { boxType: 'thin' | 'thick' };
  boxSymbols: BoxSymbols;
}
