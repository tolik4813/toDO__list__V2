import { Input } from '@/components/ui/input';
import { CSS_CLASSES } from '@/app/lib/constants';

interface TodoContentProps {
  isEditing: boolean;
  text: string;
  completed: boolean;
  editText: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoContent({
  isEditing,
  text,
  completed,
  editText,
  inputRef,
  onKeyDown,
  onBlur,
  onChange,
}: TodoContentProps) {
  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={editText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={CSS_CLASSES.EDIT_INPUT}
      />
    );
  }

  return (
    <span
      className={`${CSS_CLASSES.TEXT} ${
        completed ? CSS_CLASSES.TEXT_COMPLETED : ''
      }`}
    >
      {text}
    </span>
  );
}
