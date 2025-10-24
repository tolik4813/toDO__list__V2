'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoForm } from '@/app/hooks/useTodoForm';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';

export default function InputTasks() {
  const { text, error, handleSubmit, handleInputChange } = useTodoForm();

  return (
    <form onSubmit={handleSubmit} className={CSS_CLASSES.CONTAINER}>
      <div className={CSS_CLASSES.ROW}>
        <Input
          value={text}
          onChange={handleInputChange}
          placeholder={UI_TEXT.PLACEHOLDER}
          className={CSS_CLASSES.INPUT}
        />
        <Button type="submit" className={CSS_CLASSES.BUTTON}>
          {UI_TEXT.ADD_BUTTON}
        </Button>
      </div>
      {error && <div className={CSS_CLASSES.ERROR}>{error}</div>}
    </form>
  );
}
