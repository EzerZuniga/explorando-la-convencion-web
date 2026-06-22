"use client";

import { Component, ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-50  p-8"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold text-gray-900  mb-4">
              Algo salió mal
            </h1>
            <p className="text-gray-600  mb-6">
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            <pre className="text-left bg-gray-100  rounded-lg p-4 text-sm text-red-600  overflow-auto max-h-40 mb-6">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-text hover:bg-brand-text/90 text-white font-semibold rounded-lg transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
