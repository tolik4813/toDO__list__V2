'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoForm } from '@/app/hooks/useTodoForm';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import { VscDebugRestart } from 'react-icons/vsc';
import { useTranslate } from '@/app/hooks/useTranslate';
import TagInput from '@/app/customComponents/tags/TagInput';
import { useState } from 'react';
import { useUiStore } from '@/app/store/uiStore';

export default function InputTasks() {
  const { t } = useTranslate();
  const { text, error, isSubmitting, handleSubmit, handleInputChange } =
    useTodoForm();
  const { clearCompleted, todoCount } = useTodoSelectors();
  const [tags, setTags] = useState<string[]>([]);
  const showTagInput = useUiStore(s => s.showTagInput);

  const hasCompletedTasks = todoCount.completed > 0;

  const handleClearCompleted = () => {
    clearCompleted();
  };

  return (
    <form
      onSubmit={e => handleSubmit(e, { tags })}
      className={CSS_CLASSES.CONTAINER}
    >
      <div className={CSS_CLASSES.ROW}>
        <Input
          value={text}
          onChange={handleInputChange}
          placeholder={t('app.placeholders.taskInput', UI_TEXT.PLACEHOLDER)}
          className={CSS_CLASSES.INPUT}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          className={CSS_CLASSES.BUTTON}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('todo.adding', 'Adding...')
            : t('app.addTask', UI_TEXT.ADD_BUTTON)}
        </Button>
        {hasCompletedTasks && (
          <Button
            type="button"
            onClick={handleClearCompleted}
            className={CSS_CLASSES.CLEAR_BUTTON}
            title={t('app.actions.clearCompleted', 'Clear completed')}
          >
            <VscDebugRestart className="w-4 h-4" />
          </Button>
        )}
      </div>
      {showTagInput && (
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder={t('app.tags.placeholder', 'Add tags (comma or Enter)')}
        />
      )}
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
