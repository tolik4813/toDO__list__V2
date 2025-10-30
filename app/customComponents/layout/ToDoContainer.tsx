'use client';
import InputTasks from '@/app/customComponents/form/InputTasks';
import SearchInput from '@/app/customComponents/form/SearchInput';
import SortDropdown from '@/app/customComponents/form/SortDropdown';
import FilterButtons from '@/app/customComponents/filter/FilterButtons';
import TodoHeader from '@/app/customComponents/todo/TodoHeader';
import TasksList from '@/app/customComponents/todo/TasksList';
import ProgressBar from '@/app/customComponents/progress/ProgressBar';
import ErrorBoundary from '@/app/customComponents/layout/ErrorBoundary';
import { useUiStore } from '@/app/store/uiStore';

export default function ToDoContainer() {
  const showSearch = useUiStore(s => s.showSearch);
  const showProgress = useUiStore(s => s.showProgress);
  const showFilterButtons = useUiStore(s => s.showFilterButtons);
  const showSortDropdown = useUiStore(s => s.showSortDropdown);
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <TodoHeader />
      <ErrorBoundary>
        <div className="space-y-4">
          <InputTasks />
          {showSearch && <SearchInput />}
          {showProgress && <ProgressBar />}
          {showFilterButtons && <FilterButtons />}
          {showSortDropdown && <SortDropdown />}
          <TasksList />
        </div>
      </ErrorBoundary>
    </div>
  );
}
