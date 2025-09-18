'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink, Target, Users, Zap } from 'lucide-react';
import { internalLinkingService, InternalLink } from '@/lib/internal-linking';

interface SmartInternalLinksProps {
  currentSlug: string;
  variant?: 'sidebar' | 'inline' | 'footer' | 'cluster';
  limit?: number;
  title?: string;
  className?: string;
}

/**
 * Smart Internal Links Component
 * Automatically suggests relevant internal links based on content relationships
 */
export function SmartInternalLinks({
  currentSlug,
  variant = 'sidebar',
  limit = 6,
  title,
  className = ''
}: SmartInternalLinksProps) {
  const relatedLinks = internalLinkingService.getRelatedArticles(currentSlug, limit);
  
  if (relatedLinks.length === 0) {
    return null;
  }

  const componentTitle = title || getVariantTitle(variant);

  const variantClasses = {
    sidebar: 'bg-gray-50 rounded-lg p-6',
    inline: 'bg-blue-50 border border-blue-200 rounded-lg p-6 my-8',
    footer: 'bg-gray-100 rounded-lg p-8',
    cluster: 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          {componentTitle}
        </h3>
      </div>
      
      <div className="space-y-4">
        {relatedLinks.map((link, index) => (
          <InternalLinkCard
            key={index}
            link={link}
            variant={variant}
            showRelevanceScore={false}
          />
        ))}
      </div>
      
      {variant === 'footer' && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View all articles
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Contextual Internal Links - for inline content suggestions
 */
interface ContextualLinksProps {
  currentSlug: string;
  keywords: string[];
  limit?: number;
  className?: string;
}

export function ContextualLinks({
  currentSlug,
  keywords,
  limit = 3,
  className = ''
}: ContextualLinksProps) {
  const contextualLinks = internalLinkingService.getContextualLinks(currentSlug, keywords, limit);
  
  if (contextualLinks.length === 0) {
    return null;
  }

  return (
    <div className={`border-l-4 border-blue-500 bg-blue-50 p-4 my-6 ${className}`}>
      <div className="flex items-start">
        <Target className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Related Resources
          </h4>
          <ul className="space-y-2">
            {contextualLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.url}
                  className="text-blue-700 hover:text-blue-900 text-sm underline decoration-blue-300 hover:decoration-blue-500"
                >
                  {link.title}
                </Link>
                <p className="text-xs text-blue-600 mt-1">
                  {link.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Content Cluster Navigation
 */
interface ClusterNavigationProps {
  currentSlug: string;
  className?: string;
}

export function ClusterNavigation({
  currentSlug,
  className = ''
}: ClusterNavigationProps) {
  const clusterData = internalLinkingService.getClusterNavigation(currentSlug);
  
  if (!clusterData.pillarPage && clusterData.supportingContent.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 ${className}`}>
      <div className="flex items-center mb-4">
        <Users className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Complete Content Series
        </h3>
      </div>

      {/* Pillar Page */}
      {clusterData.pillarPage && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-1" />
            Main Guide
          </h4>
          <InternalLinkCard
            link={clusterData.pillarPage}
            variant="cluster"
            isPillar={true}
          />
        </div>
      )}

      {/* Supporting Content */}
      {clusterData.supportingContent.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-900 mb-3">
            Related Articles
          </h4>
          <div className="space-y-3">
            {clusterData.supportingContent.map((link, index) => (
              <InternalLinkCard
                key={index}
                link={link}
                variant="cluster"
                isCompact={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {clusterData.relatedTools.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-blue-900 mb-3">
            Free Tools & Resources
          </h4>
          <div className="space-y-2">
            {clusterData.relatedTools.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="flex items-center p-3 bg-white rounded border border-blue-200 hover:border-blue-300 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                    {link.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {link.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Internal Link Card Component
 */
interface InternalLinkCardProps {
  link: InternalLink;
  variant?: 'sidebar' | 'inline' | 'footer' | 'cluster';
  isPillar?: boolean;
  isCompact?: boolean;
  showRelevanceScore?: boolean;
}

function InternalLinkCard({
  link,
  variant = 'sidebar',
  isPillar = false,
  isCompact = false,
  showRelevanceScore = false
}: InternalLinkCardProps) {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'Copywriting Strategy': BookOpen,
      'Content Marketing': Users,
      'Growth Marketing': Target,
      'Mobile Marketing': Zap,
      'SaaS Marketing': ExternalLink,
      'Tools': ExternalLink
    };
    
    const Icon = icons[category] || BookOpen;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Copywriting Strategy': 'text-purple-600 bg-purple-100',
      'Content Marketing': 'text-green-600 bg-green-100',
      'Growth Marketing': 'text-blue-600 bg-blue-100',
      'Mobile Marketing': 'text-orange-600 bg-orange-100',
      'SaaS Marketing': 'text-indigo-600 bg-indigo-100',
      'Tools': 'text-gray-600 bg-gray-100'
    };
    
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  const baseClasses = "block p-4 rounded-lg border transition-all duration-200 hover:shadow-md group";
  const pillarClasses = isPillar 
    ? "border-blue-300 bg-blue-100 hover:border-blue-400" 
    : "border-gray-200 bg-white hover:border-gray-300";
  
  const compactClasses = isCompact 
    ? "p-3" 
    : "p-4";

  return (
    <Link
      href={link.url}
      className={`${baseClasses} ${pillarClasses} ${compactClasses}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${getCategoryColor(link.category)}`}>
              {getCategoryIcon(link.category)}
              <span className="ml-1">{link.category}</span>
            </span>
            {isPillar && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Zap className="h-3 w-3 mr-1" />
                Main Guide
              </span>
            )}
          </div>
          
          <h4 className={`font-semibold text-gray-900 group-hover:text-blue-900 mb-1 ${isCompact ? 'text-sm' : 'text-base'}`}>
            {link.title}
          </h4>
          
          <p className={`text-gray-600 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {link.description}
          </p>
          
          {showRelevanceScore && (
            <div className="mt-2 text-xs text-gray-500">
              Relevance: {Math.round(link.relevanceScore * 100)}%
            </div>
          )}
        </div>
        
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 ml-3 flex-shrink-0" />
      </div>
    </Link>
  );
}

/**
 * Utility function to get variant-specific titles
 */
function getVariantTitle(variant: string): string {
  const titles: Record<string, string> = {
    sidebar: 'Related Articles',
    inline: 'You Might Also Like',
    footer: 'Continue Reading',
    cluster: 'Complete Guide Series'
  };
  
  return titles[variant] || 'Related Content';
}

/**
 * Inline Link Suggestion - for use within blog content
 */
interface InlineLinkProps {
  text: string;
  href: string;
  description?: string;
  external?: boolean;
}

export function InlineLink({
  text,
  href,
  description,
  external = false
}: InlineLinkProps) {
  const linkClass = "text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 transition-colors";
  
  return (
    <span className="inline-block">
      <Link
        href={href}
        className={linkClass}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {text}
        {external && <ExternalLink className="h-3 w-3 inline ml-1" />}
      </Link>
      {description && (
        <span className="text-xs text-gray-500 ml-1">
          ({description})
        </span>
      )}
    </span>
  );
}