
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-sun-bg border border-sun-border rounded-sm">
          <div className="bg-red-50 p-4 rounded-full mb-6">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h2 className="font-serif text-2xl text-sun-primary mb-2">Something went wrong</h2>
          <p className="text-sun-secondary mb-8 max-w-md">
            Our systems encountered an unexpected error. Don't worry, your data is safe.
          </p>
          <div className="flex gap-4">
            <Button onClick={this.handleRetry} variant="outline" className="gap-2">
              <RefreshCw size={16} /> Reload Application
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 p-4 bg-gray-100 rounded text-left w-full max-w-2xl overflow-auto text-xs font-mono text-red-700">
              {this.state.error.toString()}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
