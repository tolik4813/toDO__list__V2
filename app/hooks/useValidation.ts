import { useState, useCallback } from 'react';
import { ZodError } from 'zod';
import { UI_TEXT } from '@/app/lib/constants';

export type ErrorType = 'validation' | 'network' | 'unexpected';

export interface ValidationError {
  message: string;
  type: ErrorType;
}

export const useValidation = () => {
  const [error, setError] = useState<ValidationError | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleValidationError = useCallback((err: unknown): ValidationError => {
    if (err instanceof ZodError) {
      const firstError = err.issues[0];
      if (firstError) {
        return {
          message: firstError.message,
          type: 'validation',
        };
      }
    } else if (err instanceof Error) {
      const isNetworkError =
        err.message.includes('network') || err.message.includes('fetch');
      return {
        message: isNetworkError ? UI_TEXT.ERROR_NETWORK : err.message,
        type: isNetworkError ? 'network' : 'unexpected',
      };
    }

    return {
      message: UI_TEXT.ERROR_UNEXPECTED,
      type: 'unexpected',
    };
  }, []);

  const setValidationError = useCallback(
    (err: unknown) => {
      setError(handleValidationError(err));
    },
    [handleValidationError]
  );

  return {
    error,
    clearError,
    setValidationError,
  };
};
