import { WrapFn, colr } from '../../colr';
import { Breadcrumb, ansi, out } from '../../out';

import { AskOptionsForState, getAskOptions } from './customise';
import { PromptChoiceFull } from './getFullChoices';
import { ScrolledItems, getScrollbar } from './getScrolledItems';

const SELECT_ALL = Symbol.for('SWISS.NODE.ASK.SELECT.ALL');

export type FormatPromptFn = (
  question: string | Breadcrumb,
  value: string,
  items: string | undefined,
  errorMessage: string | undefined,
  theme: AskOptionsForState,
  isComplete: boolean,
  isExit: boolean
) => string;

export const promptFormatters: { [key: string]: FormatPromptFn } = {
  oneLine: (
    question: string | Breadcrumb,
    value: string,
    items: string | undefined,
    errorMessage: string | undefined,
    theme: AskOptionsForState,
    isComplete: boolean,
    isExit: boolean
  ) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;

    const maxWidth = process.stdout.columns - 4;
    const message = typeof question === 'string' ? question : question.get();

    const specialIcon = col.specialIcon(sym.specialIcon);
    const questionText = col.questionText(message);
    const promptIcon = col.promptIcon(out.center(sym.promptIcon, 3));
    const joinerWidth = out.getWidth(promptIcon);

    let mainPrompt = out.wrap(`${specialIcon} ${questionText}`, maxWidth);
    let mainPromptWidth = out.getWidth(mainPrompt.split('\n').slice(-1)[0] as string);

    let valueOut = '';
    let forceNewLine = false;
    if (value !== undefined) {
      let maxWidthValue = maxWidth - mainPromptWidth;
      forceNewLine = maxWidthValue < maxWidth * 0.333;
      if (forceNewLine) maxWidthValue = maxWidth - 3;
      const paddingWidth = (forceNewLine ? 0 : mainPromptWidth) + joinerWidth;

      // Single line
      const result = out.truncateStart(value, maxWidthValue);
      valueOut = col.result(result);
    }

    let itemsOut = '';
    if (items !== undefined && !isExit) {
      const itemLines = items.split('\n');
      itemsOut = '\n' + itemLines.map((line) => out.truncate(line, maxWidth)).join('\n');
    }

    let errorOut = '';
    if (errorMessage?.length) {
      const errorIcon = sym.errorMsgPrefix;
      errorOut = errorMessage?.length
        ? '\n' + col.errorMsg(errorIcon + ' ' + out.truncate(errorMessage, maxWidth - (2 + out.getWidth(errorIcon))))
        : '';
    }

    return `${mainPrompt}${forceNewLine ? '\n' : ''}${promptIcon}${valueOut}${itemsOut}${errorOut}`;
  },
  halfBox: (
    question: string | Breadcrumb,
    value: string,
    items: string | undefined,
    errorMessage: string | undefined,
    theme: AskOptionsForState,
    isComplete: boolean,
    isExit: boolean
  ) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;

    let hasValue = !value.startsWith(ansi.null);
    let hasItems = items !== undefined;
    if (hasValue && hasItems && isExit) hasValue = false;

    const maxWidth = process.stdout.columns - 4;
    const HORI_LINE_LENGTH = 2;

    const openingIcon = col.openingIcon(sym.openingIcon);
    const promptIcon = col.promptIcon(sym.promptIcon);
    const vertLine = col.decoration(box.vertical);

    const questionLines = out.wrap(question, maxWidth).split('\n');
    const questionLinesOut = questionLines.map((line, i) => `${i === 0 ? openingIcon : vertLine} ${col.questionText(line)}`).join('\n');

    // Used when there is a value/result
    let resultLinesOut = '';
    if (hasValue) {
      const resultLines = out.wrap(value, maxWidth).split('\n');
      resultLinesOut = '\n' + resultLines.map((line, i) => `${vertLine} ${promptIcon} ${col.result(line)}`).join('\n');
    }

    // Used when there are items
    let itemsOut = '';
    if (hasItems) {
      const itemLines = items.split('\n');
      itemsOut = '\n' + itemLines.map((line) => `${vertLine} ${out.truncate(line, maxWidth)}`).join('\n');
    }

    // Used when there is both a result/value and items
    let bothSeparator = '';
    if (hasValue && hasItems) {
      const sepLine = box.separatorLeft + box.separatorHorizontal.repeat(HORI_LINE_LENGTH - 1);
      bothSeparator = '\n' + col.decoration(sepLine);
    }

    const endLine = '\n' + col.decoration(box.bottomLeft + box.horizontal.repeat(HORI_LINE_LENGTH - 1));
    const errorMsgOut = errorMessage?.length ? col.errorMsg(' ' + out.truncate(errorMessage, maxWidth - 3)) : '';

    return `${questionLinesOut}${resultLinesOut}${bothSeparator}${itemsOut}${endLine}${errorMsgOut}`;
  },
  halfBoxClosed: (
    question: string | Breadcrumb,
    value: string,
    items: string | undefined,
    errorMessage: string | undefined,
    theme: AskOptionsForState,
    isComplete: boolean,
    isExit: boolean
  ) => {
    if (isComplete || isExit) return promptFormatters.oneLine(question, value, items, errorMessage, theme, isComplete, isExit);
    return promptFormatters.halfBox(question, value, items, errorMessage, theme, isComplete, isExit);
  },
  fullBox: (
    question: string | Breadcrumb,
    value: string,
    items: string | undefined,
    errorMessage: string | undefined,
    theme: AskOptionsForState,
    isComplete: boolean,
    isExit: boolean
  ) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;

    let hasValue = !value.startsWith(ansi.null);
    let hasItems = items !== undefined;
    if (hasValue && hasItems && isExit) hasValue = false;

    const maxWidth = process.stdout.columns - 4;
    const maxQuestionWidth = maxWidth - 4;

    const vertLine = col.decoration(box.vertical);
    const topLeftCorner = col.decoration(box.topLeft);
    const bottomLeftCorner = col.decoration(box.bottomLeft);

    const wrapBoxLine = (line: string, wrapFn: WrapFn) => {
      const lineOut = out.left(line, maxWidth - 4, ' ', true);
      return `${vertLine} ${wrapFn(lineOut)} ${vertLine}`;
    };

    const questionLines = out.wrap(question, maxQuestionWidth).split('\n');
    const questionLinesOut = questionLines
      .map((line, i) => {
        if (i === 0) {
          const padChars = box.horizontal.repeat(maxQuestionWidth - out.getWidth(line));
          return `${topLeftCorner} ${col.questionText(line)} ${col.decoration(padChars + box.topRight)}`;
        }
        return wrapBoxLine(line, col.questionText);
      })
      .join('\n');

    // Used when there is a value/result
    let resultLinesOut = '';
    if (hasValue) {
      const resultLines = out.wrap(value, maxWidth - 4).split('\n');
      resultLinesOut = '\n' + resultLines.map((line, i) => wrapBoxLine(line, col.result)).join('\n');
    }

    // Used when there are items
    let itemsOut = '';
    if (hasItems) {
      const itemLines = items.split('\n');
      itemsOut = '\n' + itemLines.map((line) => wrapBoxLine(out.truncate(line, maxWidth), colr)).join('\n');
    }

    // Used when there is both a result/value and items
    let bothSeparator = '';
    if (hasValue && hasItems) {
      bothSeparator = '\n' + col.decoration(`${box.separatorLeft}${box.separatorHorizontal.repeat(maxWidth - 2)}${box.separatorRight}`);
    }

    const bottomLineText = errorMessage?.length && !isComplete ? col.errorMsg(out.truncate(' ' + errorMessage + ' ', maxWidth - 4)) : '';
    const bottomLineBars = box.horizontal.repeat(maxWidth - 2 - out.getWidth(bottomLineText));
    const bottomLine = `${bottomLeftCorner}${bottomLineText}${col.decoration(bottomLineBars + box.bottomRight)}`;

    return `${questionLinesOut}${resultLinesOut}${bothSeparator}${itemsOut}
${bottomLine}`;
  },
  fullBoxClosed: (
    question: string | Breadcrumb,
    value: string,
    items: string | undefined,
    errorMessage: string | undefined,
    theme: AskOptionsForState,
    isComplete: boolean,
    isExit: boolean
  ) => {
    if (isComplete || isExit) return promptFormatters.oneLine(question, value, items, errorMessage, theme, isComplete, isExit);
    return promptFormatters.fullBox(question, value, items, errorMessage, theme, isComplete, isExit);
  }
};

export type FormatItemsFn = <T extends unknown>(
  allItems: PromptChoiceFull<T>[],
  scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
  selected: number[] | undefined,
  type: 'single' | 'multi',
  theme: AskOptionsForState,
  isExit: boolean
) => string;

// This does all the legwork for the standard item formatter.
// The outputTemplate is a function that takes the styled elements and puts them together
const standardItemFormatter = <T extends unknown>(
  allItems: PromptChoiceFull<T>[],
  scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
  selected: number[] | undefined,
  type: 'single' | 'multi',
  theme: AskOptionsForState,
  isExit: boolean,
  isBlock: boolean,
  itemOutputTemplate: (
    item: PromptChoiceFull<T>,
    wrapFn: WrapFn,
    scrollIcon: string,
    hoverIcon: string,
    selectIcon: string,
    isHovered: boolean,
    isSelected: boolean
  ) => string
) => {
  const { colours: col, symbols: sym, boxSymbols: box } = theme;

  const askOptions = getAskOptions();

  const colItemHover = isBlock ? col.itemBlockHover : col.itemHover;
  const colItemHoverIcon = isBlock ? col.itemBlockHoverIcon : col.itemHoverIcon;

  const itemSelectedIcon = col.itemSelectedIcon(out.left(sym.itemSelectedIcon, 2));
  const itemHoveredSelectedIcon = isBlock ? colItemHoverIcon(out.left(sym.itemSelectedIcon, 2)) : itemSelectedIcon;
  const itemUnselectedIcon = col.itemUnselectedIcon(out.left(sym.itemUnselectedIcon, 2));

  const itemHoverIcon = colItemHoverIcon(sym.itemHoverIcon);
  const itemHoverIconWidth = out.getWidth(sym.itemHoverIcon);

  let displayItems = scrolledItems.items;
  let hoveredIndex = scrolledItems.hoveredIndex;
  if (isExit) {
    displayItems = [scrolledItems.items[scrolledItems.hoveredIndex]];
    hoveredIndex = 0;
  }
  // scrollbar
  const hasScrollbar = !isExit && allItems.length > displayItems.length;
  let scrollbar: string[] = hasScrollbar ? getScrollbar(allItems, scrolledItems, theme) : [];

  return displayItems
    .map((item, index) => {
      let scrollIcon = ' ';
      let selectIcon = '';

      scrollIcon = hasScrollbar ? scrollbar[index] || ' ' : ' ';

      const isHovered = hoveredIndex === index;
      const isSelected = type === 'multi' && selected !== undefined && selected.includes(item.index);

      if (type === 'multi' && selected !== undefined) {
        const selectedIcon = isHovered ? itemHoveredSelectedIcon : itemSelectedIcon;
        selectIcon = selected.includes(item.index) ? selectedIcon : itemUnselectedIcon;
      }

      const hoverIcon = isHovered ? itemHoverIcon : ' '.repeat(itemHoverIconWidth);

      const normalWrapFn = type === 'single' ? col.itemUnselected : selected?.includes(item.index) ? col.itemSelected : col.itemUnselected;
      const wrapFn = isHovered ? colItemHover : item.value === SELECT_ALL ? col.selectAllText : normalWrapFn;

      return itemOutputTemplate(item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected);
    })
    .join('\n');
};

export const itemsFormatters: { [key: string]: FormatItemsFn } = {
  simple: <T extends unknown>(
    allItems: PromptChoiceFull<T>[],
    scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
    selected: number[] | undefined,
    type: 'single' | 'multi',
    theme: AskOptionsForState,
    isExit: boolean
  ) => {
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));

    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${hoverIcon} ${selectIcon}${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, false, templateFn);
  },
  simpleAlt: <T extends unknown>(
    allItems: PromptChoiceFull<T>[],
    scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
    selected: number[] | undefined,
    type: 'single' | 'multi',
    theme: AskOptionsForState,
    isExit: boolean
  ) => {
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));

    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${selectIcon}${hoverIcon} ${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, false, templateFn);
  },
  block: <T extends unknown>(
    allItems: PromptChoiceFull<T>[],
    scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
    selected: number[] | undefined,
    type: 'single' | 'multi',
    theme: AskOptionsForState,
    isExit: boolean
  ) => {
    if (isExit) return itemsFormatters.simple(allItems, scrolledItems, selected, type, theme, isExit);

    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));

    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${hoverIcon} ${selectIcon}${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, true, templateFn);
  },
  blockAlt: <T extends unknown>(
    allItems: PromptChoiceFull<T>[],
    scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
    selected: number[] | undefined,
    type: 'single' | 'multi',
    theme: AskOptionsForState,
    isExit: boolean
  ) => {
    if (isExit) return itemsFormatters.simpleAlt(allItems, scrolledItems, selected, type, theme, isExit);

    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));

    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${selectIcon}${hoverIcon} ${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, true, templateFn);
  }
};
