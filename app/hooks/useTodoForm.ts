import { useState } from 'react';
import { useTodoStore } from '@/app/store/todoStore';
import { todoFormSchema } from '@/app/lib/validation';
import { ZodError } from 'zod';

export const useTodoForm = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedData = todoFormSchema.parse({ text });
      addTodo(validatedData.text);
      setText('');
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0];
        if (firstError) {
          setError(firstError.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError(null);
  };

  return {
    text,
    error,
    handleSubmit,
    handleInputChange,
  };
};
