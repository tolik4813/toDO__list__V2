import { useState, useEffect, useRef } from 'react';
import { useTodoStore } from '@/app/store/todoStore';
import { Todo } from '@/app/types/todo';

export const useTodoEdit = (todo: Todo) => {
  const removeTodo = useTodoStore(state => state.removeTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText === '') {
      removeTodo(todo.id);
    } else if (trimmedText !== todo.text) {
      updateTodo(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return {
    isEditing,
    editText,
    inputRef,
    handleEdit,
    handleSave,
    handleCancel,
    handleKeyDown,
    setEditText,
  };
};
