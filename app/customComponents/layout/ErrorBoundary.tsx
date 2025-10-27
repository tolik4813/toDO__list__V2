'use client';

import { Component, ReactNode } from 'react';
import { CSS_CLASSES } from '@/app/lib/constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="mt-6">
            <div className={`${CSS_CLASSES.ERROR} text-center`}>
              <h3 className="text-lg font-semibold mb-2">
                Something went wrong
              </h3>
              <p className="text-sm mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() =>
                  this.setState({ hasError: false, error: undefined })
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
