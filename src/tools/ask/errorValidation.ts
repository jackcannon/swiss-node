import { ask } from '../ask';

export interface ErrorInfo {
  isError: boolean;
  errorMessage: string | undefined;
}

export const getErrorInfoFromValidationResult = (validateResult: ask.ValidationResponse): ErrorInfo => {
  const isError =
    validateResult instanceof Error ||
    (validateResult as unknown as Error)?.message !== undefined ||
    typeof validateResult === 'string' ||
    validateResult === false;

  const errorMessage = (() => {
    if (validateResult instanceof Error || (validateResult as unknown as Error)?.message !== undefined) {
      return (validateResult as unknown as Error).message;
    }
    if (typeof validateResult === 'string') return validateResult;
    if (validateResult === false) return '';
    return undefined;
  })();

  return {
    isError,
    errorMessage
  };
};
