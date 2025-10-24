'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoForm } from '@/app/hooks/useTodoForm';
import { CSS_CLASSES } from '@/app/lib/constants';

export default function InputTasks() {
  const { text, error, handleSubmit, handleInputChange } = useTodoForm();

  return (
    <form onSubmit={handleSubmit} className={CSS_CLASSES.FORM_CONTAINER}>
      <div className={CSS_CLASSES.FORM_ROW}>
        <Input
          value={text}
          onChange={handleInputChange}
          placeholder="Enter your task..."
          className={CSS_CLASSES.INPUT}
        />
        <Button type="submit" className={CSS_CLASSES.BUTTON_PRIMARY}>
          Add Task
        </Button>
      </div>
      {error && <div className={CSS_CLASSES.ERROR_CONTAINER}>{error}</div>}
    </form>
  );
}
