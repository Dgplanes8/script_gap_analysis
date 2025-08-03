'use client';

import { BaseComponentProps } from '@/types/shared';
import { Card } from './card';

interface FeatureCardProps extends BaseComponentProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  badge?: string;
  variant?: 'default' | 'highlighted';
}

export function FeatureCard({
  icon,
  title,
  description,
  link,
  badge,
  variant = 'default',
  className = ''
}: FeatureCardProps) {
  const isHighlighted = variant === 'highlighted';
  
  return (
    <Card 
      variant={isHighlighted ? 'gradient' : 'elevated'}
      hover
      className={`relative ${isHighlighted ? 'ring-2 ring-indigo-500' : ''} ${className}`}
    >
      {badge && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
            {badge}
          </span>
        </div>
      )}
      
      {icon && (
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
          isHighlighted ? 'bg-indigo-600' : 'bg-indigo-100'
        }`}>
          <div className={isHighlighted ? 'text-white' : 'text-indigo-600'}>
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      
      {link && (
        <a 
          href={link.href}
          className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          {link.text}
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </Card>
  );
}