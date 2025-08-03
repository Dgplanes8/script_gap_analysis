'use client';

import { BaseComponentProps } from '@/types/shared';

interface SectionContainerProps extends BaseComponentProps {
  id?: string;
  background?: 'white' | 'gray' | 'gradient' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  centered?: boolean;
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-slate-50 to-gray-100',
  dark: 'bg-gray-900'
};

const paddingClasses = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20'
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

export function SectionContainer({
  children,
  className = '',
  id,
  background = 'white',
  padding = 'lg',
  maxWidth = '7xl',
  centered = true
}: SectionContainerProps) {
  return (
    <section 
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${
        centered ? 'text-center' : ''
      }`}>
        {children}
      </div>
    </section>
  );
}