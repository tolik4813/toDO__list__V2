import { FaEdit } from 'react-icons/fa';
import { CSS_CLASSES } from '@/app/lib/constants';

interface TodoActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TodoActions({
  isEditing,
  onEdit,
  onDelete,
}: TodoActionsProps) {
  return (
    <div className="flex gap-2">
      {!isEditing && (
        <button
          onClick={onEdit}
          className={CSS_CLASSES.EDIT_BUTTON}
          aria-label="Edit task"
          title="Edit task"
        >
          <FaEdit className="w-3 h-3" />
        </button>
      )}
      <button
        onClick={onDelete}
        className={CSS_CLASSES.DELETE_BUTTON}
        aria-label="Delete task"
        title="Delete task"
      >
        x
      </button>
    </div>
  );
}
