'use client';

import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface FreeWeekButtonProps {
  label?: string;
  source?: string;
  variant?: 'primary' | 'secondary' | 'link';
  className?: string;
  children?: ReactNode;
}

export function FreeWeekButton({
  label,
  source = 'page-cta',
  variant = 'primary',
  className,
  children,
}: FreeWeekButtonProps) {
  const buttonClasses = useMemo(() => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#126DFB]';

    switch (variant) {
      case 'secondary':
        return clsx(
          base,
          'border border-brand-200 bg-white px-6 py-3 text-sm text-brand-600 hover:border-brand-400 hover:text-brand-700 hover:shadow-md',
          className
        );
      case 'link':
        return clsx(
          base,
          'px-0 py-0 text-sm text-brand-600 hover:text-brand-700',
          className
        );
      default:
        return clsx(
          base,
          'bg-brand-500 px-6 py-3 text-sm text-white shadow-lg hover:bg-brand-600 hover:shadow-xl',
          className
        );
    }
  }, [variant, className]);

  return (
    <Link
      href="/#service-tiers"
      className={buttonClasses}
      data-source={source}
    >
      {children ?? label ?? 'Start Free Week Trial'}
      {variant !== 'link' && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
