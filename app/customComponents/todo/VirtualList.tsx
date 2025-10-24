'use client';

import { memo, useMemo, useState, useEffect, useRef } from 'react';
import { Todo } from '@/app/types/todo';
import TodoItem from '@/app/customComponents/todo/TodoItem';

interface VirtualListProps {
  items: Todo[];
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
}

function VirtualList({
  items,
  itemHeight = 80,
  containerHeight = 400,
  overscan = 5,
}: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      index: startIndex + index,
    }));
  }, [items, startIndex, endIndex]);

  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (items.length === 0) {
    return (
      <div className="mt-6">
        <div className="text-center text-gray-400 py-8 animate-pulse">
          No tasks yet. Add your first task above!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map(item => (
              <div
                key={item.id}
                style={{ height: itemHeight }}
                className="flex items-center"
              >
                <TodoItem todo={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VirtualList);
