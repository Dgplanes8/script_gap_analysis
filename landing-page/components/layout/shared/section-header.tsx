'use client';

import { BaseComponentProps } from '@/types/shared';

interface SectionHeaderProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center';
}

const sizeClasses = {
  sm: {
    title: 'text-2xl font-bold',
    subtitle: 'text-lg',
    description: 'text-base'
  },
  md: {
    title: 'text-3xl font-bold',
    subtitle: 'text-xl',
    description: 'text-lg'
  },
  lg: {
    title: 'text-4xl font-bold',
    subtitle: 'text-2xl',
    description: 'text-xl'
  },
  xl: {
    title: 'text-5xl font-bold',
    subtitle: 'text-3xl',
    description: 'text-2xl'
  }
};

export function SectionHeader({
  title,
  subtitle,
  description,
  badge,
  size = 'lg',
  alignment = 'center',
  className = '',
  children
}: SectionHeaderProps) {
  const alignmentClasses = alignment === 'center' ? 'text-center' : 'text-left';
  const classes = sizeClasses[size];

  return (
    <div className={`mb-12 ${alignmentClasses} ${className}`}>
      {badge && (
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {badge}
          </span>
        </div>
      )}
      
      {subtitle && (
        <p className={`${classes.subtitle} text-indigo-600 font-semibold mb-2`}>
          {subtitle}
        </p>
      )}
      
      <h2 className={`${classes.title} text-gray-900 mb-4`}>
        {title}
      </h2>
      
      {description && (
        <p className={`${classes.description} text-gray-600 max-w-3xl ${
          alignment === 'center' ? 'mx-auto' : ''
        }`}>
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
}