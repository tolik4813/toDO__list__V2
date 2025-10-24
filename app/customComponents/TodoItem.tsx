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

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);
  };

  return (
    <div className={CSS_CLASSES.TODO_ITEM}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleCheckboxChange}
        className={CSS_CLASSES.CHECKBOX}
      />
      <span
        className={`${CSS_CLASSES.TODO_TEXT} ${
          todo.completed ? CSS_CLASSES.TODO_TEXT_COMPLETED : ''
        }`}
      >
        {todo.text}
      </span>
    </div>
  );
}
