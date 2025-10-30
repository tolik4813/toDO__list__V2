'use client';

interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TagBadge({ label, active, onClick }: TagBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-0.5 text-xs rounded-md border transition-colors duration-200 ${
        active
          ? 'bg-yellow-500 text-black border-yellow-500'
          : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
}
