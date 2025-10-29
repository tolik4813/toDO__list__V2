'use client';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function TodoHeader() {
  const { t } = useTranslate();
  return (
    <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
      {t('app.title', 'To-Do List')}
    </h2>
  );
}
