'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/app/store/todoStore';
import { Todo } from '@/app/types/todo';
import { CSS_CLASSES } from '@/app/lib/constants';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const removeTodo = useTodoStore(state => state.removeTodo);

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  return (
    <div
      className={`${
        todo.completed ? CSS_CLASSES.ITEM_COMPLETED : CSS_CLASSES.ITEM
      } animate-in slide-in-from-top-2 duration-300`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleCheckboxChange}
        className={CSS_CLASSES.CHECKBOX}
      />
      <span
        className={`${CSS_CLASSES.TEXT} ${
          todo.completed ? CSS_CLASSES.TEXT_COMPLETED : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        className={CSS_CLASSES.DELETE_BUTTON}
        aria-label="Delete task"
        title="Delete task"
      >
        x
      </button>
    </div>
  );
}
