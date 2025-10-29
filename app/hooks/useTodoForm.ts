import { useState } from 'react';
import { useTodoStore } from '@/app/store/todoStore';
import { todoFormSchema } from '@/app/lib/validators';
import { useValidation } from '@/app/hooks/useValidation';

export const useTodoForm = () => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTodo = useTodoStore(state => state.addTodo);
  const { error, clearError, setValidationError } = useValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      const validatedData = todoFormSchema.parse({ text });
      await addTodo(validatedData.text);
      setText('');
    } catch (err) {
      setValidationError(err);
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
