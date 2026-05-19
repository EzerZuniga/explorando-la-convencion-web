import React from 'react';
import { cn } from '@/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div
      className={cn(
        sizes[size],
        'border-brand-primary/25 border-t-brand-primary dark:border-brand-text dark:border-t-brand-secondary rounded-full animate-spin',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
