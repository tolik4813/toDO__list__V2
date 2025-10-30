'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/app/store/todoStore';
import { Todo } from '@/app/types/todo';
import { CSS_CLASSES } from '@/app/lib/constants';
import { useTodoEdit } from '@/app/hooks/useTodoEdit';
import TodoContent from '@/app/customComponents/todo/TodoContent';
import TodoActions from '@/app/customComponents/todo/TodoActions';
import TagInput from '@/app/customComponents/tags/TagInput';
import TagBadge from '@/app/customComponents/tags/TagBadge';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const removeTodo = useTodoStore(state => state.removeTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const [editTags, setEditTags] = useState<string[]>(todo.tags || []);

  const {
    isEditing,
    editText,
    inputRef,
    handleEdit,
    handleSave,
    handleKeyDown,
    setEditText,
  } = useTodoEdit(todo);

  const handleCheckboxChange = useCallback(() => {
    toggleTodo(todo.id);
  }, [toggleTodo, todo.id]);

  const handleDelete = useCallback(() => {
    removeTodo(todo.id);
  }, [removeTodo, todo.id]);

  const showTags = useMemo(() => (todo.tags || []).length > 0, [todo.tags]);

  return (
    <div
      className={`${
        todo.completed ? CSS_CLASSES.ITEM_COMPLETED : CSS_CLASSES.ITEM
      } animate-in slide-in-from-top-2 duration-300 ${
        isEditing ? 'border-yellow-500/50 bg-gray-800/80' : ''
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleCheckboxChange}
        className={CSS_CLASSES.CHECKBOX}
        disabled={isEditing}
      />

      <TodoContent
        isEditing={isEditing}
        text={todo.text}
        completed={todo.completed}
        editText={editText}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        onChange={e => setEditText(e.target.value)}
      />

      {/* Tags row */}
      {!isEditing && showTags && (
        <div className="flex flex-wrap gap-2 ml-2">
          {(todo.tags || []).map(tag => (
            <TagBadge key={tag} label={`#${tag}`} />
          ))}
        </div>
      )}

      {isEditing && (
        <div className="flex-1 ml-2">
          <TagInput
            value={editTags}
            onChange={setEditTags}
            placeholder="#work, #home"
          />
          <div className="h-2" />
          <button
            type="button"
            onClick={() => updateTodo(todo.id, editText, editTags)}
            className="text-xs text-gray-300 hover:text-white underline"
          >
            Save tags
          </button>
        </div>
      )}

      <TodoActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default memo(TodoItem);
