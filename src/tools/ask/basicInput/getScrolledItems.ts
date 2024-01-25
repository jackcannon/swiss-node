import { PromptChoiceFull } from './getFullChoices';

export interface ScrolledItems<T> {
  items: PromptChoiceFull<T>[];
  startingIndex: number;
  hoveredIndex: number;
  doesScrollUp: boolean;
  doesScrollDown: boolean;
}

export const getScrolledItems = <T extends unknown>(
  items: PromptChoiceFull<T>[],
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
