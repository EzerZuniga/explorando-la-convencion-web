import React from 'react';
import { cn } from '@/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={cn('wp-card', hover && 'wp-card-interactive', className)}
    >
      {children}
    </div>
  );
};

export default Card;
