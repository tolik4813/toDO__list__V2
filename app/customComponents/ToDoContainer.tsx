import InputTasks from '@/app/customComponents/InputTasks';
import TodoHeader from '@/app/customComponents/TodoHeader';
import TasksList from '@/app/customComponents/TasksList';

export default function ToDoContainer() {
  return (
    <div className="w-120 min-h-120">
      <TodoHeader />
      <InputTasks />
      <TasksList />
    </div>
  );
}
