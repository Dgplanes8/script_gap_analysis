'use client';

import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { getInternalLinkSuggestions } from '@/templates/internal-links-config';

interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
  category: string;
  readingTime?: number;
  priority?: 'high' | 'medium' | 'low';
}

interface RelatedArticlesProps {
  currentSlug: string;
  category?: string;
  articles?: RelatedArticle[];
  className?: string;
}

// All available articles for intelligent selection
const allArticles: RelatedArticle[] = [
  // High-priority cornerstone content
  {
    title: 'Startup Marketing Budget Calculator 2025',
    slug: '/blog/startup-marketing-budget-calculator-2025',
    description: 'Calculate optimal ad spend allocation across channels with strategic recommendations',
    category: 'Marketing Tools',
    readingTime: 12,
    priority: 'high'
  },
  {
    title: 'Startup Marketing ROI Calculator',
    slug: '/blog/startup-marketing-roi-calculator',
    description: 'Track ROAS, attribution, and predictive metrics with comprehensive analysis',
    category: 'Marketing Analytics',
    readingTime: 13,
    priority: 'high'
  },
  {
    title: 'CAC Optimization Calculator for Startups',
    slug: '/blog/cac-optimization-calculator',
    description: 'Reduce customer acquisition costs with data-driven optimization strategies',
    category: 'Marketing Optimization',
    readingTime: 11,
    priority: 'high'
  },
  {
    title: '52 High-Converting Ad Templates for Startups',
    slug: '/blog/52-high-converting-ad-templates-startup',
    description: 'Proven creative structures with performance scoring to reduce production time 70%',
    category: 'Creative Resources',
    readingTime: 15,
    priority: 'high'
  },
  {
    title: 'Creative Fatigue Prevention Framework',
    slug: '/blog/creative-fatigue-prevention-framework',
    description: 'Maintain ad performance and reduce CAC increases with systematic refresh cycles',
    category: 'Creative Strategy',
    readingTime: 10,
    priority: 'high'
  },
  // Supporting content
  {
    title: 'Weekly Creative Intelligence for Subscription Marketing',
    slug: '/blog/weekly-creative-intelligence-subscription-marketing',
    description: 'Transform subscription marketing with weekly creative concepts delivered every Monday',
    category: 'Creative Strategy',
    readingTime: 8,
    priority: 'medium'
  },
  {
    title: 'Competitive Creative Analysis for Growth Teams',
    slug: '/blog/competitive-creative-analysis-growth-teams',
    description: 'Systematic frameworks for analyzing competitor strategies and adapting winning concepts',
    category: 'Strategy',
    readingTime: 9,
    priority: 'medium'
  },
  {
    title: 'LTV CAC Ratio Optimization Playbook',
    slug: '/blog/ltv-cac-ratio-optimization-growth-teams',
    description: 'Master LTV:CAC ratio optimization for sustainable growth with proven strategies',
    category: 'Strategy',
    readingTime: 11,
    priority: 'medium'
  },
  {
    title: 'SaaS Retention Marketing Automation',
    slug: '/blog/retention-marketing-automation-saas-growth',
    description: 'Advanced retention automation strategies beyond email sequences for SaaS growth teams',
    category: 'Strategy',
    readingTime: 14,
    priority: 'medium'
  }
];

export function RelatedArticles({ 
  currentSlug, 
  category, 
  articles = allArticles,
  className = '' 
}: RelatedArticlesProps) {
  // Use intelligent internal linking algorithm
  const internalLinkSuggestions = getInternalLinkSuggestions(
    currentSlug,
    category || '',
    '',
    4
  );
  
  // Convert internal link suggestions to article format and combine with manual selection
  const suggestedArticles = internalLinkSuggestions.map(link => ({
    title: link.title,
    slug: link.slug,
    description: `${link.context.replace('{anchor}', link.anchor)} - ${link.category}`,
    category: link.category,
    readingTime: 8,
    priority: 'high' as const
  }));
  
  // Combine intelligent suggestions with manual articles, prioritize suggestions
  const combinedArticles = [...suggestedArticles, ...articles]
    .filter((article, index, self) => 
      article.slug !== currentSlug && 
      index === self.findIndex(a => a.slug === article.slug) // Remove duplicates
    );
    
  // Apply intelligent sorting
  const filteredArticles = combinedArticles
    .sort((a, b) => {
      // Prioritize cornerstone content from internal linking system
      const cornerstoneUrls = ['/blog/startup-marketing-budget-calculator-2025', '/blog/startup-marketing-roi-calculator', '/blog/cac-optimization-calculator'];
      const aIsCornerstone = cornerstoneUrls.includes(a.slug) ? 1 : 0;
      const bIsCornerstone = cornerstoneUrls.includes(b.slug) ? 1 : 0;
      if (aIsCornerstone !== bIsCornerstone) return bIsCornerstone - aIsCornerstone;
      
      // Prioritize same category articles
      if (category) {
        if (a.category === category && b.category !== category) return -1;
        if (b.category === category && a.category !== category) return 1;
      }
      
      // Then prioritize by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority || 'medium'];
      const bPriority = priorityOrder[b.priority || 'medium'];
      return bPriority - aPriority;
    })
    .slice(0, 3); // Show top 3 related articles

  return (
    <section className={`bg-gray-50 py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Continue Reading</h2>
            <Link 
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={article.slug}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                  {article.readingTime && (
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readingTime} min
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:underline">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
                
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    Popular
                  </div>
                )}
              </Link>
            ))}
          </div>
          
          {/* Strategic CTA with Internal Links */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Marketing Strategy?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Start with our free tools and templates, then upgrade to weekly strategic intelligence for sustained growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog/startup-marketing-budget-calculator-2025"
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Try Budget Calculator
              </Link>
              <Link
                href="/blog/52-high-converting-ad-templates-startup"
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Get Ad Templates
              </Link>
            </div>
            <p className="text-sm opacity-80 mt-4">
              <Link href="/#service-tiers" className="underline hover:no-underline">
                Or explore weekly intelligence plans →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}