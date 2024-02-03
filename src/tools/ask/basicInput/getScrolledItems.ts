import { ArrayTools } from 'swiss-ak';
import { AskOptionsForState } from './customise';

export interface ScrolledItems<T> {
  items: T[];
  startingIndex: number;
  hoveredIndex: number;
  doesScrollUp: boolean;
  doesScrollDown: boolean;
}

export const getScrolledItems = <T extends unknown>(
  items: T[],
  hovered: number,
  lastStartingIndex: number | undefined,
  maxShow: number = 10,
  margin: number = 2
): ScrolledItems<T> => {
  if (items.length <= maxShow) {
    return {
      items,
      startingIndex: 0,
      hoveredIndex: hovered,
      doesScrollUp: false,
      doesScrollDown: false
    };
  }

  const BUFFER = Math.max(0, Math.min(Math.ceil((maxShow - 1) / 2), margin));

  // Use the previous index as a starting point, or try to get the hovered item in the middle of the list
  let startingIndex = lastStartingIndex ?? Math.max(0, hovered - Math.floor(maxShow / 2));

  // Make sure the starting index is not out of bounds at the top, and the hovered item is visible
  startingIndex = Math.max(0, Math.min(hovered - BUFFER, startingIndex));

  // Make sure the starting index is not out of bounds at the bottom, and the hovered item is visible
  startingIndex = Math.min(items.length - maxShow, Math.max(hovered + (BUFFER + 1) - maxShow, startingIndex));

  return {
    items: items.slice(startingIndex, startingIndex + maxShow),
    startingIndex,
    hoveredIndex: hovered - startingIndex,
    doesScrollUp: startingIndex > 0,
    doesScrollDown: startingIndex + maxShow < items.length
  };
};

export const getScrollbar = <T>(
  allItems: T[],
  scrolledItems: ScrolledItems<T>,
  theme: AskOptionsForState,
  height: number = scrolledItems.items.length,
  trimmedEndTop: boolean = false,
  trimmedEndBottom: boolean = false
): string[] => {
  const { colours: col, symbols: sym, boxSymbols: box } = theme;

  const trackIcon = col.scrollbarTrack(sym.scrollbarTrack);
  const barIcon = col.scrollbarBar(sym.scrollbarBar);
  const upIcon = col.scrollbarBar(sym.scrollUpIcon);
  const downIcon = col.scrollbarBar(sym.scrollDownIcon);

  const trackTrimTopIcon = col.scrollbarTrack(sym.scrollbarTrackTrimTop);
  const trackTrimBottomIcon = col.scrollbarTrack(sym.scrollbarTrackTrimBottom);
  const barTrimTopIcon = col.scrollbarBar(sym.scrollbarBarTrimTop);
  const barTrimBottomIcon = col.scrollbarBar(sym.scrollbarBarTrimBottom);

  const amountShown = scrolledItems.items.length / allItems.length;
  const barHeight = Math.max(1, Math.round(height * amountShown));
  const emptyTrackHeight = Math.max(0, height - barHeight);

  const barProgress = scrolledItems.startingIndex / (allItems.length - scrolledItems.items.length);
  const roundFn = barProgress < 0.33 ? Math.ceil : barProgress < 0.66 ? Math.round : Math.floor;
  const trackStartHeight = roundFn(emptyTrackHeight * barProgress);
  const trackEndHeight = Math.max(0, height - (trackStartHeight + barHeight));

  const scrollbarBar = ArrayTools.repeat(barHeight, barIcon);
  if (scrolledItems.doesScrollUp && barHeight >= 2) scrollbarBar[0] = upIcon;
  if (scrolledItems.doesScrollDown && barHeight >= 2) scrollbarBar[scrollbarBar.length - 1] = downIcon;

  const result = [...ArrayTools.repeat(trackStartHeight, trackIcon), ...scrollbarBar, ...ArrayTools.repeat(trackEndHeight, trackIcon)];

  if (trimmedEndTop) {
    result[0] = trackStartHeight === 0 ? barTrimTopIcon : trackTrimTopIcon;
  }
  if (trimmedEndBottom) {
    result[result.length - 1] = trackEndHeight === 0 ? barTrimBottomIcon : trackTrimBottomIcon;
  }
  return result;
};
