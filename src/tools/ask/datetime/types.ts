export type DateTimeHandler<T> = (isActive: boolean, initial: T, displayCb: (lines: string[]) => any, isRange?: boolean) => DateTimeHandlerObj<T>;
export type DateTimeHandlerObj<T> = {
  getValue: () => T;
  setActive: (isActive: boolean) => void;
  triggerDisplay: () => void;
  inputKey: (key: string, num?: number) => void;
};
