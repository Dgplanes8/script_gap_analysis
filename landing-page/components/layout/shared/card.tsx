'use client';

import { BaseComponentProps } from '@/types/shared';

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const variantClasses = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  bordered: 'bg-white border border-gray-200',
  gradient: 'bg-gradient-to-br from-white to-gray-50 shadow-sm'
};

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12'
};

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl'
};

export function Card({
  children,
  className = '',
  variant = 'elevated',
  padding = 'lg',
  rounded = 'lg',
  hover = false,
  clickable = false,
  onClick
}: CardProps) {
  const baseClasses = [
    variantClasses[variant],
    paddingClasses[padding],
    roundedClasses[rounded]
  ].join(' ');

  const interactiveClasses = [
    hover && 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
    clickable && 'cursor-pointer',
    onClick && 'cursor-pointer'
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}