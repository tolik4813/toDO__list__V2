'use client';

import { lazy, Suspense, memo } from 'react';
import { CSS_CLASSES } from '@/app/lib/constants';

const TodoItem = lazy(() => import('@/app/customComponents/todo/TodoItem'));
const TodoActions = lazy(
  () => import('@/app/customComponents/todo/TodoActions')
);
const TodoContent = lazy(
  () => import('@/app/customComponents/todo/TodoContent')
);

function LoadingFallback() {
  return (
    <div className="animate-pulse">
      <div className={`${CSS_CLASSES.ITEM} opacity-50`}>
        <div className="w-4 h-4 bg-gray-600 rounded"></div>
        <div className="flex-1 h-4 bg-gray-600 rounded"></div>
        <div className="w-8 h-4 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}

interface LazyWrapperProps {
  children: React.ReactNode;
}

function LazyWrapper({ children }: LazyWrapperProps) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}

export { TodoItem, TodoActions, TodoContent, LazyWrapper };
export default memo(LazyWrapper);
