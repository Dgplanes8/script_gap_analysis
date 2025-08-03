'use client';

import { BaseComponentProps } from '@/types/shared';

interface CTABannerProps extends BaseComponentProps {
  title: string;
  description?: string;
  primaryButton: {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  background?: 'gradient' | 'solid' | 'pattern';
  size?: 'sm' | 'md' | 'lg';
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  solid: 'bg-indigo-600',
  pattern: 'bg-indigo-600 bg-opacity-90 relative overflow-hidden'
};

const sizeClasses = {
  sm: {
    container: 'py-12',
    title: 'text-2xl',
    description: 'text-lg'
  },
  md: {
    container: 'py-16',
    title: 'text-3xl',
    description: 'text-xl'
  },
  lg: {
    container: 'py-20',
    title: 'text-4xl',
    description: 'text-2xl'
  }
};

export function CTABanner({
  title,
  description,
  primaryButton,
  secondaryButton,
  background = 'gradient',
  size = 'md',
  className = ''
}: CTABannerProps) {
  const classes = sizeClasses[size];
  
  return (
    <section className={`${backgroundClasses[background]} ${classes.container} ${className}`}>
      {background === 'pattern' && (
        <div className="absolute inset-0 bg-indigo-600 bg-opacity-90">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 opacity-90" />
        </div>
      )}
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`${classes.title} font-bold text-white mb-4`}>
          {title}
        </h2>
        
        {description && (
          <p className={`${classes.description} text-indigo-100 mb-8 max-w-2xl mx-auto`}>
            {description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={primaryButton.onClick}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
              primaryButton.variant === 'secondary'
                ? 'bg-white text-indigo-600 hover:bg-gray-50'
                : 'bg-white text-indigo-600 hover:bg-gray-50 shadow-lg hover:shadow-xl'
            }`}
          >
            {primaryButton.text}
          </button>
          
          {secondaryButton && (
            <button
              onClick={secondaryButton.onClick}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-200"
            >
              {secondaryButton.text}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}