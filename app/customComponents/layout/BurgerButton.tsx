'use client';
import { CiMenuBurger } from 'react-icons/ci';
import { useUiStore } from '@/app/store/uiStore';

export default function BurgerButton() {
  const isOpen = useUiStore(s => s.isMenuOpen);
  const setOpen = useUiStore(s => s.setMenuOpen);

  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={() => setOpen(!isOpen)}
      className="h-9 w-9 rounded-md border border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center justify-center"
    >
      <CiMenuBurger className="h-5 w-5" />
    </button>
  );
}
