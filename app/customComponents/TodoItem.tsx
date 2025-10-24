'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/app/store/todoStore';
import { Todo } from '@/app/types/todo';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore(state => state.toggleTodo);

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-800 border border-gray-700 rounded-md hover:border-yellow-500/50 transition-colors">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleCheckboxChange}
        className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black mt-0.5 flex-shrink-0"
      />
      <span
        className={`text-white flex-1 break-all whitespace-normal ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.text}
      </span>
    </div>
  );
}
