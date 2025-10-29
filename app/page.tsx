import ToDoContainer from '@/app/customComponents/layout/ToDoContainer';
import MarqueeText from '@/app/customComponents/layout/MarqueeText';
import ErrorBoundary from '@/app/customComponents/layout/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-8 pb-8">
      <ErrorBoundary>
        <MarqueeText />
      </ErrorBoundary>
      <ToDoContainer />
    </div>
  );
}
