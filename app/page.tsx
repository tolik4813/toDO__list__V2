import ToDoContainer from '@/app/customComponents/layout/ToDoContainer';
import MarqueeText from '@/app/customComponents/layout/MarqueeText';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-8 pb-8">
      <MarqueeText />
      <ToDoContainer />
    </div>
  );
}
