import { ask } from '../../ask';

export const getFullChoices = <T extends unknown>(choices: ask.PromptChoice<T>[]): PromptChoiceFull<T>[] =>
  choices
    .map((choice) => (typeof choice === 'string' ? { value: choice } : choice) as { title?: string; value: T; selected?: boolean })
    .map((choice, index: number) => ({
      title: choice.title || '' + choice.value,
      value: choice.value,
      preselected: choice.selected || false,
      index
    }));

export interface PromptChoiceFull<T> {
  title: string;
  value: T;
  preselected: boolean;
  index: number;
}
