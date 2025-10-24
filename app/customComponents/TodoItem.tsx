'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface TodoItemProps {
  text: string;
}

export default function TodoItem({ text }: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-md hover:border-yellow-500/50 transition-colors">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleCheckboxChange}
        className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black"
      />
      <span
        className={`text-white flex-1 ${
          isCompleted ? 'line-through text-gray-400' : ''
        }`}
      >
        {text}
      </span>
    </div>
  );
}
