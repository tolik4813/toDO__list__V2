import InputTasks from '@/app/customComponents/form/InputTasks';
import TodoHeader from '@/app/customComponents/todo/TodoHeader';
import TasksList from '@/app/customComponents/todo/TasksList';

export default function ToDoContainer() {
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <TodoHeader />
      <InputTasks />
      <TasksList />
    </div>
  );
}
