import InputTasks from '@/app/customComponents/InputTasks';
import TodoHeader from '@/app/customComponents/TodoHeader';
import TasksList from '@/app/customComponents/TasksList';

export default function ToDoContainer() {
  return (
    <div className="w-full max-w-md mx-auto">
      <TodoHeader />
      <InputTasks />
      <TasksList />
    </div>
  );
}
