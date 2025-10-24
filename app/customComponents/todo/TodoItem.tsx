'use client';

import { memo, useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/app/store/todoStore';
import { Todo } from '@/app/types/todo';
import { CSS_CLASSES } from '@/app/lib/constants';
import { useTodoEdit } from '@/app/hooks/useTodoEdit';
import TodoContent from '@/app/customComponents/todo/TodoContent';
import TodoActions from '@/app/customComponents/todo/TodoActions';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const removeTodo = useTodoStore(state => state.removeTodo);

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

      <TodoActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default memo(TodoItem);
