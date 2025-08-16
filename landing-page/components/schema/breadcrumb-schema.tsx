'use client';

import Script from 'next/script';
import { generateBreadcrumbSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { BreadcrumbSchemaProps } from '@/lib/schema/types';

/**
 * Breadcrumb schema component for navigation structure
 * Used on all pages except homepage
 */
export function BreadcrumbSchema({ items, className }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const schema = generateBreadcrumbSchema(items);
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `breadcrumb-schema-${items[items.length - 1]?.href?.replace(/[^a-z0-9]/gi, '-') || 'default'}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}