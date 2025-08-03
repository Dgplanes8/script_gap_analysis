'use client';

import { BaseComponentProps } from '@/types/shared';

interface GridContainerProps extends BaseComponentProps {
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
};

function getGridClasses(columns: GridContainerProps['columns'], responsive: boolean) {
  if (!columns) {
    return responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1';
  }

  let classes = '';
  
  if (columns.sm) classes += `grid-cols-${columns.sm} `;
  if (columns.md) classes += `md:grid-cols-${columns.md} `;
  if (columns.lg) classes += `lg:grid-cols-${columns.lg} `;
  if (columns.xl) classes += `xl:grid-cols-${columns.xl}`;
  
  return classes.trim();
}

export function GridContainer({
  children,
  className = '',
  columns,
  gap = 'lg',
  responsive = true
}: GridContainerProps) {
  const gridClasses = getGridClasses(columns, responsive);
  
  return (
    <div className={`grid ${gridClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}