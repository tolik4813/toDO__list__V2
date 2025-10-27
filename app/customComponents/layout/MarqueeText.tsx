'use client';

export default function MarqueeText() {
  const messages = [
    'Organize your day, crush your goals',
    'Productivity starts with clarity',
    'Stay focused, get things done',
    'Every task completed is a small victory',
    'Plan wisely, execute flawlessly',
    'Turn your to-do list into a done list',
  ];

  return (
    <div className="w-full border-b mb-5 mt-[-25px] border-yellow-500/30 overflow-hidden bg-black h-8 flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {messages.map((msg, idx) => (
          <span key={idx} className="text-white text-sm font-medium mr-12">
            {msg}
          </span>
        ))}
        {messages.map((msg, idx) => (
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
