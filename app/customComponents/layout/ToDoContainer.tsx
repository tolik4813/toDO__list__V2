import InputTasks from '@/app/customComponents/form/InputTasks';
import SearchInput from '@/app/customComponents/form/SearchInput';
import SortDropdown from '@/app/customComponents/form/SortDropdown';
import FilterButtons from '@/app/customComponents/filter/FilterButtons';
import TodoHeader from '@/app/customComponents/todo/TodoHeader';
import TasksList from '@/app/customComponents/todo/TasksList';
import ProgressBar from '@/app/customComponents/progress/ProgressBar';
import ErrorBoundary from '@/app/customComponents/layout/ErrorBoundary';

export default function ToDoContainer() {
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <TodoHeader />
      <ErrorBoundary>
        <div className="space-y-4">
          <InputTasks />
          <SearchInput />
          <ProgressBar />
          <FilterButtons />
          <SortDropdown />
          <TasksList />
        </div>
      </ErrorBoundary>
    </div>
  );
}
