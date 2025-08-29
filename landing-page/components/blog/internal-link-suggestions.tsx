'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { getInternalLinkSuggestions, generateContextualLink, type InternalLink } from '@/templates/internal-links-config';

interface InternalLinkSuggestionsProps {
  currentSlug: string;
  currentCategory: string;
  content?: string;
  className?: string;
  title?: string;
  limit?: number;
}

/**
 * Intelligent Internal Link Suggestions Component
 * 
 * Automatically suggests relevant internal links based on:
 * - Current page category and content
 * - SEO link equity distribution strategy
 * - User navigation patterns
 */
export function InternalLinkSuggestions({
  currentSlug,
  currentCategory,
  content = '',
  className = '',
  title = 'Related Resources',
  limit = 3
}: InternalLinkSuggestionsProps) {
  
  const suggestions = getInternalLinkSuggestions(currentSlug, currentCategory, content, limit);
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section className={`bg-blue-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((link, index) => (
          <Link
            key={link.slug}
            href={link.slug}
            className="flex items-start group p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                {link.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {link.category}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1 ml-3" />
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900 font-medium"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Browse All Resources
        </Link>
      </div>
    </section>
  );
}

/**
 * Contextual Link Insertion Component
 * 
 * Inserts contextual internal links within article content
 */
export function ContextualLinks({
  currentSlug,
  currentCategory,
  content,
  className = ''
}: {
  currentSlug: string;
  currentCategory: string;
  content: string;
  className?: string;
}) {
  
  const suggestions = getInternalLinkSuggestions(currentSlug, currentCategory, content, 2);
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gray-50 border-l-4 border-orange-500 p-4 my-6 ${className}`}>
      <div className="space-y-2">
        {suggestions.map((link, index) => (
          <p key={link.slug} className="text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: generateContextualLink(link) }} />
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * Category Navigation Component
 * 
 * Helps users discover content by category with internal link optimization
 */
export function CategoryNavigation({
  currentCategory,
  className = ''
}: {
  currentCategory: string;
  className?: string;
}) {
  
  const categories = [
    { name: 'Marketing Tools', slug: '/blog?category=tools', color: 'bg-green-100 text-green-800', count: 3 },
    { name: 'Creative Strategy', slug: '/blog?category=creative', color: 'bg-purple-100 text-purple-800', count: 4 },
    { name: 'Strategy Guides', slug: '/blog?category=strategy', color: 'bg-blue-100 text-blue-800', count: 6 },
    { name: 'Analytics & Measurement', slug: '/blog?category=analytics', color: 'bg-orange-100 text-orange-800', count: 2 },
    { name: 'Budget Planning', slug: '/blog?category=budget', color: 'bg-teal-100 text-teal-800', count: 2 }
  ];

  return (
    <nav className={`${className}`}>
      <h4 className="font-semibold text-gray-900 mb-3">Explore by Category</h4>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.slug}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors hover:opacity-80 ${
              category.name === currentCategory 
                ? category.color 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} ({category.count})
          </Link>
        ))}
      </div>
    </nav>
  );
}

/**
 * Popular Articles Component
 * 
 * Features high-performing content for link equity distribution
 */
export function PopularArticles({
  currentSlug,
  className = ''
}: {
  currentSlug: string;
  className?: string;
}) {
  
  const popularArticles = [
    {
      title: 'Startup Marketing Budget Calculator 2025',
      slug: '/blog/startup-marketing-budget-calculator-2025',
      description: 'Calculate optimal ad spend allocation',
      category: 'Marketing Tools',
      views: '12.5K'
    },
    {
      title: '52 High-Converting Ad Templates',
      slug: '/blog/52-high-converting-ad-templates-startup',
      description: 'Proven creative structures for startups',
      category: 'Creative Resources',
      views: '8.2K'
    },
    {
      title: 'CAC Optimization Calculator',
      slug: '/blog/cac-optimization-calculator',
      description: 'Reduce customer acquisition costs',
      category: 'Marketing Optimization',
      views: '6.8K'
    }
  ].filter(article => article.slug !== currentSlug);

  return (
    <section className={`${className}`}>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
        Most Popular Resources
      </h4>
      <div className="space-y-3">
        {popularArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={article.slug}
            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors text-sm line-clamp-2">
                  {article.title}
                </h5>
                <p className="text-xs text-gray-600 mt-1">{article.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{article.category}</span>
                  <span className="text-xs text-orange-600 font-medium">{article.views} views</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}