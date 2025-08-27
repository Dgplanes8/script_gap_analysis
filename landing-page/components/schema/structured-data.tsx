'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { generatePageSchemaGraph, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { generateTemplateSchemaGraph } from '@/lib/schema/template-schemas';
import { DEFAULT_FAQS } from '@/lib/schema/types';

interface StructuredDataProps {
  pageType?: 'homepage' | 'article' | 'blog' | 'calculator' | 'playbook' | 'service' | 'generic';
  title?: string;
  description?: string;
  slug?: string;
  breadcrumbs?: Array<{ name: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  additionalSchemas?: any[];
  className?: string;
  
  // Template-specific props
  category?: string;
  keywords?: string[];
  readingTime?: number;
  features?: string[];
  modules?: Array<{ title: string; description: string; duration?: string }>;
}

/**
 * Enhanced structured data component that generates comprehensive schemas
 * for all template types with proper SEO optimization
 */
export function StructuredData({
  pageType = 'generic',
  title = 'Apsics Media - Weekly Trend Intelligence for Subscription Businesses',
  description = 'Get viral scripts every Monday based on trending formats + competitor analysis. Weekly trend intelligence for growth marketing teams at subscription companies starting at $67/month.',
  slug,
  breadcrumbs,
  faqs = [],
  additionalSchemas = [],
  className,
  category,
  keywords,
  readingTime,
  features,
  modules
}: StructuredDataProps = {}) {
  const pathname = usePathname();
  const finalSlug = slug || pathname;
  
  // Generate breadcrumbs based on finalSlug (except for homepage)
  const generatedBreadcrumbs = breadcrumbs || (finalSlug === '/' ? [] : generateBreadcrumbsFromPath(finalSlug));
  
  // Use comprehensive template schema generation
  const schemaGraph = generateTemplateSchemaGraph({
    pageType: pageType === 'article' ? 'blog' : pageType as any,
    title,
    description,
    slug: finalSlug,
    breadcrumbs: generatedBreadcrumbs,
    faqs: faqs.length > 0 ? faqs : (pageType === 'homepage' || finalSlug === '/' ? [...DEFAULT_FAQS] : []),
    additionalSchemas
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