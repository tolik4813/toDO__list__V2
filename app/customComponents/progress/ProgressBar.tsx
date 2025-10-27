'use client';

import { useMemo } from 'react';
import { useTodoStore } from '@/app/store/todoStore';

export default function ProgressBar() {
  const todos = useTodoStore(state => state.todos);

  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    const completedCount = todos.filter(todo => todo.completed).length;
    return Math.round((completedCount / todos.length) * 100);
  }, [todos]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="w-full sm:w-96 mx-auto mb-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Progress</span>
        <span className="text-sm text-gray-400">
          {completedCount}/{totalCount}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className="bg-yellow-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center text-xs text-gray-500 mt-1">{progress}%</div>
    </div>
  );
}
