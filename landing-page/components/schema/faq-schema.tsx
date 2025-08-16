'use client';

import Script from 'next/script';
import { generateFAQSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { FAQSchemaProps, DEFAULT_FAQS } from '@/lib/schema/types';

/**
 * FAQ schema component for frequently asked questions
 * Used on key landing pages and service pages
 */
export function FAQSchema({ faqs = [...DEFAULT_FAQS], className }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = generateFAQSchema(faqs);
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `faq-schema-${Date.now()}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}