import { useState } from 'react';
import { useTodoStore } from '@/app/store/todoStore';
import { todoFormSchema } from '@/app/lib/validation';
import { ZodError } from 'zod';
import { UI_TEXT } from '@/app/lib/constants';

type ErrorType = 'validation' | 'network' | 'unexpected';

interface ErrorState {
  message: string;
  type: ErrorType;
}

export const useTodoForm = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<ErrorState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTodo = useTodoStore(state => state.addTodo);

  const clearError = () => setError(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      const validatedData = todoFormSchema.parse({ text });
      await addTodo(validatedData.text);
      setText('');
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0];
        if (firstError) {
          setError({
            message: firstError.message,
            type: 'validation',
          });
        }
      } else if (err instanceof Error) {
        setError({
          message:
            err.message.includes('network') || err.message.includes('fetch')
              ? UI_TEXT.ERROR_NETWORK
              : err.message,
          type:
            err.message.includes('network') || err.message.includes('fetch')
              ? 'network'
              : 'unexpected',
        });
      } else {
        setError({
          message: UI_TEXT.ERROR_UNEXPECTED,
          type: 'unexpected',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) clearError();
  };

  return {
    text,
    error,
    isSubmitting,
    handleSubmit,
    handleInputChange,
    clearError,
  };
};
