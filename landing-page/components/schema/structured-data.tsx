'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { generatePageSchemaGraph, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { DEFAULT_FAQS } from '@/lib/schema/types';

interface StructuredDataProps {
  pageType?: 'homepage' | 'article' | 'calculator' | 'generic';
  title?: string;
  description?: string;
  slug?: string;
  additionalSchemas?: any[];
  className?: string;
}

/**
 * Master structured data component that generates appropriate schemas
 * based on the current page and provided props
 */
export function StructuredData({
  pageType = 'generic',
  title = 'Apsics Media - Weekly Trend Intelligence for Subscription Businesses',
  description = 'Get viral scripts every Monday based on trending formats + competitor analysis. Weekly trend intelligence for growth marketing teams at subscription companies starting at $67/month.',
  slug,
  additionalSchemas = [],
  className
}: StructuredDataProps = {}) {
  const pathname = usePathname();
  const finalSlug = slug || pathname;
  
  // Generate breadcrumbs based on finalSlug (except for homepage)
  const breadcrumbs = finalSlug === '/' ? [] : generateBreadcrumbsFromPath(finalSlug);
  
  // Add FAQ schema for homepage and key pages
  const schemas = [...additionalSchemas];
  if (pageType === 'homepage' || finalSlug === '/') {
    schemas.push({
      '@type': 'FAQPage',
      mainEntity: DEFAULT_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  const schemaGraph = generatePageSchemaGraph({
    pageType,
    title,
    description,
    slug: finalSlug,
    breadcrumbs,
    additionalSchemas: schemas
  });

  const jsonLD = formatSchemaAsJsonLD(schemaGraph);

  return (
    <Script
      id="structured-data-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}

/**
 * Generate breadcrumb items from URL pathname
 */
function generateBreadcrumbsFromPath(pathname: string): Array<{ name: string; href: string }> {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', href: '/' }];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert URL segments to readable names
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      href: currentPath
    });
  });
  
  return breadcrumbs;
}