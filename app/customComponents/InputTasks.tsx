import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function InputTasks() {
  return (
    <div className="flex justify-center gap-2">
      <Input
        placeholder="Enter your task..."
        className="bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none"
      />
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-colors">
        Add Task
      </Button>
    </div>
  );
}
