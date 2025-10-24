import TodoItem from '@/app/customComponents/TodoItem';

export default function TasksList() {
  return (
    <div className="mt-6 space-y-2">
      <TodoItem text="Sample task - click checkbox to test" />
    </div>
  );
}
