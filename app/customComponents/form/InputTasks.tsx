'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoForm } from '@/app/hooks/useTodoForm';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import { VscDebugRestart } from 'react-icons/vsc';

export default function InputTasks() {
  const { text, error, isSubmitting, handleSubmit, handleInputChange } =
    useTodoForm();
  const { clearCompleted, todoCount } = useTodoSelectors();

  const hasCompletedTasks = todoCount.completed > 0;

  const handleClearCompleted = () => {
    clearCompleted();
  };

  return (
    <form onSubmit={handleSubmit} className={CSS_CLASSES.CONTAINER}>
      <div className={CSS_CLASSES.ROW}>
        <Input
          value={text}
          onChange={handleInputChange}
          placeholder={UI_TEXT.PLACEHOLDER}
          className={CSS_CLASSES.INPUT}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          className={CSS_CLASSES.BUTTON}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : UI_TEXT.ADD_BUTTON}
        </Button>
        {hasCompletedTasks && (
          <Button
            type="button"
            onClick={handleClearCompleted}
            className={CSS_CLASSES.CLEAR_BUTTON}
            title="Clear completed tasks"
          >
            <VscDebugRestart className="w-4 h-4" />
          </Button>
        )}
      </div>
      {error && (
        <div
          className={`${CSS_CLASSES.ERROR} ${
            error.type === 'validation'
              ? 'border-red-500'
              : error.type === 'network'
                ? 'border-orange-500'
                : 'border-gray-500'
          }`}
        >
          {error.message}
        </div>
      )}
    </form>
  );
}
