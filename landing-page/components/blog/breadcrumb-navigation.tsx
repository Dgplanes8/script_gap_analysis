'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BLOG_CATEGORY_HIERARCHY } from '@/templates/internal-links-config';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  category?: string;
  className?: string;
}

interface EnhancedBreadcrumbNavigationProps {
  title: string;
  category: string;
  slug: string;
  className?: string;
}

export function BreadcrumbNavigation({ items, category, className = '' }: BreadcrumbNavigationProps) {
  // Generate structured data for rich snippets
  const generateStructuredData = () => {
    const itemListElements = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://apsicsmedia.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://apsicsmedia.com${item.href}`
      }))
    ];

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElements
    };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Breadcrumb"
      >
        <Link 
          href="/"
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Home"
        >
          <Home className="h-4 w-4" />
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {index === items.length - 1 ? (
              <span 
                className="text-gray-900 font-medium truncate max-w-xs"
                aria-current="page"
                title={item.name}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors truncate max-w-xs"
                title={item.name}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

/**
 * Enhanced breadcrumb navigation with automatic category hierarchy
 */
export function EnhancedBreadcrumbNavigation({
  title,
  category,
  slug,
  className = ''
}: EnhancedBreadcrumbNavigationProps) {
  const items = [
    { name: 'Blog', href: '/blog' },
    { name: category, href: `/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: title, href: slug }
  ];

  return <BreadcrumbNavigation items={items} category={category} className={className} />;
}