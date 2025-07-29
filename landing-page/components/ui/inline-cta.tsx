'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface InlineCTAProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function InlineCTA({ 
  text, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: InlineCTAProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300';
      case 'subtle':
        return 'bg-transparent text-brand-600 hover:text-brand-700 hover:underline';
      default:
        return 'bg-brand-600 text-white hover:bg-brand-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  const baseStyles = variant === 'subtle' 
    ? 'inline-flex items-center font-semibold transition-colors duration-200'
    : 'inline-flex items-center font-semibold rounded-lg transition-colors duration-200';

  return (
    <Link
      href={href}
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {text}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}