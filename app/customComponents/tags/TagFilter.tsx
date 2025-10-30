'use client';
import { useMemo } from 'react';
import { useTodoStore } from '@/app/store/todoStore';
import { useUiStore } from '@/app/store/uiStore';
import TagBadge from '@/app/customComponents/tags/TagBadge';

export default function TagFilter() {
  const todos = useTodoStore(s => s.todos);
  const selectedTags = useUiStore(s => s.selectedTags);
  const setSelectedTags = useUiStore(s => s.setSelectedTags);

  const tags = useMemo(() => {
    const set = new Set<string>();
    todos.forEach(t => (t.tags || []).forEach(tag => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [todos]);

  if (tags.length === 0) return null;

  const toggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="hidden sm:flex items-center gap-2 max-w-[50vw] overflow-x-auto no-scrollbar">
      {tags.map(tag => (
        <TagBadge
          key={tag}
          label={`#${tag}`}
          active={selectedTags.includes(tag)}
          onClick={() => toggle(tag)}
        />
      ))}
      {selectedTags.length > 0 && (
        <button
          type="button"
          onClick={() => setSelectedTags([])}
          className="ml-2 text-xs text-gray-200 hover:text-white underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
