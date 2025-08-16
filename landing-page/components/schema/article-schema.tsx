'use client';

import Script from 'next/script';
import { generateArticleSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { ArticleSchemaProps } from '@/lib/schema/types';

/**
 * Article schema component for blog posts
 * Includes proper author attribution as per requirements
 */
export function ArticleSchema({
  title,
  description,
  slug,
  publishedDate,
  modifiedDate,
  category,
  keywords = [],
  readingTime = 8,
  className
}: ArticleSchemaProps) {
  const schema = generateArticleSchema({
    title,
    description,
    slug,
    publishedDate,
    modifiedDate,
    category,
    keywords,
    readingTime
  });
  
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `article-schema-${slug.replace(/[^a-z0-9]/gi, '-')}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}