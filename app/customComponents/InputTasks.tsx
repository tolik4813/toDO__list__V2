'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoForm } from '@/app/hooks/useTodoForm';

export default function InputTasks() {
  const { text, error, handleSubmit, handleInputChange } = useTodoForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex justify-center gap-2">
        <Input
          value={text}
          onChange={handleInputChange}
          placeholder="Enter your task..."
          className="bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none"
        />
        <Button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-colors"
        >
          Add Task
        </Button>
      </div>
      {error && (
        <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-md p-2">
          {error}
        </div>
      )}
    </form>
  );
}
