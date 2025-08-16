'use client';

import Script from 'next/script';
import { generateWebApplicationSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { WebApplicationSchemaProps } from '@/lib/schema/types';

/**
 * Web Application schema component for calculator tools
 * Used on calculator and tool pages
 */
export function WebApplicationSchema({
  name,
  description,
  slug,
  features = [],
  category = 'BusinessApplication',
  className
}: WebApplicationSchemaProps) {
  const schema = generateWebApplicationSchema({
    name,
    description,
    slug,
    features,
    category
  });
  
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `webapp-schema-${slug.replace(/[^a-z0-9]/gi, '-')}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}