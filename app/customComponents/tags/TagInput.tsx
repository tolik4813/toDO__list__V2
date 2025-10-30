'use client';
import { useMemo, useState } from 'react';
import TagBadge from '@/app/customComponents/tags/TagBadge';
import { useTodoStore } from '@/app/store/todoStore';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  onBlur?: () => void;
}

export default function TagInput({
  value,
  onChange,
  placeholder,
  onBlur,
}: TagInputProps) {
  const todos = useTodoStore(s => s.todos);
  const [draft, setDraft] = useState('');

  const suggestions = useMemo(() => {
    const set = new Set<string>();
    todos.forEach(t => (t.tags || []).forEach(tag => set.add(tag)));
    return Array.from(set)
      .filter(tag => tag.toLowerCase().includes(draft.toLowerCase()))
      .slice(0, 6);
  }, [todos, draft]);

  const addTag = (tag: string) => {
    if (!tag) return;
    const normalized = tag.trim();
    if (!normalized) return;
    if (value.includes(normalized)) return;
    onChange([...value, normalized]);
    setDraft('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap gap-2">
        {value.map(tag => (
          <TagBadge
            key={tag}
            label={tag}
            active
            onClick={() => removeTag(tag)}
          />
        ))}
      </div>
      <div className="relative">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={onBlur}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(draft.replace(/,$/, ''));
            }
          }}
          placeholder={placeholder || '#work, #home'}
          className="bg-gray-800 border-gray-600 text-white rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
        />
        {draft && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-700 bg-gray-800 shadow-lg">
            {suggestions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => addTag(s)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 text-gray-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
