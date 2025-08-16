'use client';

import Script from 'next/script';
import { generateOrganizationSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { SchemaComponentProps } from '@/lib/schema/types';

/**
 * Organization schema component for company information
 * Used on homepage and key landing pages
 */
export function OrganizationSchema({ className }: SchemaComponentProps = {}) {
  const schema = generateOrganizationSchema();
  const jsonLD = formatSchemaAsJsonLD(schema);

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}