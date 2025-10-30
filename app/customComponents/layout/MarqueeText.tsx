'use client';
import { useTranslate } from '@/app/hooks/useTranslate';
import { MARQUEE_FALLBACKS } from '@/app/lib/i18nFallbacks';
import { useUiStore } from '@/app/store/uiStore';

export default function MarqueeText() {
  const { t, get } = useTranslate();
  const showMarquee = useUiStore(s => s.showMarquee);
  if (!showMarquee) return null;
  const dictKey = 'marquee.messages';
  const messages = get(dictKey) as string[] | undefined;

  const items =
    Array.isArray(messages) && messages.length > 0
      ? messages
      : MARQUEE_FALLBACKS.map((fallback, idx) =>
          t(`marquee.messages.${idx}`, fallback)
        );

  return (
    <div className="w-full border-b mb-5 mt-[-25px] border-yellow-500/30 overflow-hidden bg-black h-8 flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((msg, idx) => (
          <span key={idx} className="text-white text-sm font-medium mr-12">
            {msg}
          </span>
        ))}
        {items.map((msg, idx) => (
          <span
            key={`duplicate-${idx}`}
            className="text-white text-sm font-medium mr-12"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
