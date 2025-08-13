'use client';

import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

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

const defaultArticles: RelatedArticle[] = [
  {
    title: 'Mobile App CAC Crisis: 2025 Acquisition Cost Reduction Guide',
    slug: '/blog/mobile-app-cac-crisis-2025-guide',
    description: 'Reduce customer acquisition costs with proven strategies',
    category: 'Mobile App Marketing',
    readingTime: 12,
    priority: 'high'
  },
  {
    title: 'ASO ROI Calculator: Measure Mobile App Marketing Returns',
    slug: '/blog/aso-roi-calculator-guide',
    description: 'Comprehensive framework for App Store Optimization ROI',
    category: 'Tools & Calculators',
    readingTime: 10,
    priority: 'high'
  },
  {
    title: 'Freemium to Premium: Conversion Optimization Framework',
    slug: '/blog/freemium-conversion-optimization-framework',
    description: 'Transform free users into premium customers',
    category: 'Mobile App Marketing',
    readingTime: 15,
    priority: 'high'
  },
  {
    title: 'D2C Subscription Marketing Playbook: Growth Strategy Guide',
    slug: '/blog/d2c-subscription-marketing-playbook',
    description: 'Comprehensive D2C growth strategies for subscription businesses',
    category: 'Strategy Guides',
    readingTime: 18,
    priority: 'high'
  },
  {
    title: 'AI Creative Development for Mobile Apps',
    slug: '/blog/ai-creative-development-mobile-apps',
    description: 'Master AI-powered creative development for mobile marketing',
    category: 'AI & Technology',
    readingTime: 14,
    priority: 'high'
  },
  {
    title: 'Creative Fatigue Solutions for Subscription Companies',
    slug: '/blog/creative-fatigue-subscription-companies',
    description: 'Combat audience saturation with strategic creative intelligence',
    category: 'Creative Strategy',
    readingTime: 8,
    priority: 'medium'
  },
  {
    title: 'Competitive Creative Analysis for Growth Teams',
    slug: '/blog/competitive-creative-analysis-growth-teams',
    description: 'Strategic intelligence for competitive advantage',
    category: 'Competitive Intelligence',
    readingTime: 9,
    priority: 'medium'
  },
  {
    title: 'LTV:CAC Optimization Growth Team Playbook',
    slug: '/blog/ltv-cac-ratio-optimization-growth-teams',
    description: 'Master LTV:CAC ratio optimization for sustainable growth',
    category: 'CAC & Attribution',
    readingTime: 11,
    priority: 'medium'
  }
];

export function RelatedArticles({ 
  currentSlug, 
  category, 
  articles = defaultArticles,
  className = '' 
}: RelatedArticlesProps) {
  // Filter out current article and prioritize related articles
  const filteredArticles = articles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => {
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
          
          {/* Strategic CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Implement These Strategies?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Get weekly creative intelligence and competitor analysis delivered to your inbox every Monday.
            </p>
            <Link
              href="/#service-tiers"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start with 10 Free Hooks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}