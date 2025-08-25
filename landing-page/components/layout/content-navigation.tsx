'use client';

import Link from 'next/link';
import { Calculator, BookOpen, PieChart, FileText, TrendingUp, Target, ArrowRight, Play, Facebook, TrendingDown, Zap, Users, BarChart3 } from 'lucide-react';

const contentPieces = [
  {
    title: 'Weekly Creative Intelligence Playbook',
    href: '/weekly-creative-intelligence-playbook',
    icon: BookOpen,
    description: 'Complete Fortune 100 methodology for systematic creative development and performance optimization',
    cta: 'Master Framework',
    color: 'orange',
    featured: true
  },
  {
    title: '52 High-Converting Hooks Library',
    href: '/52-high-converting-ad-hooks-library',
    icon: Zap,
    description: 'Performance-scored hooks with strategic analysis and implementation frameworks',
    cta: 'Browse Hooks',
    color: 'orange'
  },
  {
    title: 'Creative Fatigue Prevention',
    href: '/creative-fatigue-prevention-framework',
    icon: TrendingDown,
    description: 'Systematic approach to preventing audience saturation and maintaining performance',
    cta: 'Prevent Fatigue',
    color: 'orange'
  },
  {
    title: '25 TikTok Hooks for Subscriptions',
    href: '/tiktok-hooks-subscription-business-marketing',
    icon: Play,
    description: 'Proven TikTok hooks that convert for subscription businesses with psychology breakdowns',
    cta: 'Get Hooks',
    color: 'orange'
  },
  {
    title: 'Facebook Ad Hooks for D2C',
    href: '/facebook-ad-hooks-d2c-subscription-marketing',
    icon: Facebook,
    description: '15 winning Facebook ad hook formulas with A/B testing frameworks',
    cta: 'Master Hooks',
    color: 'orange'
  },
  {
    title: 'Reduce CAC by 20% Strategy',
    href: '/reduce-customer-acquisition-cost-subscription-business',
    icon: TrendingDown,
    description: 'Fortune 100 methodology to reduce customer acquisition cost without increasing ad spend',
    cta: 'Reduce CAC',
    color: 'orange'
  },
  {
    title: 'CAC Optimization Calculator',
    href: '/cac-optimization-calculator',
    icon: Calculator,
    description: 'Calculate potential CAC reduction and get optimization recommendations',
    cta: 'Calculate Savings',
    color: 'orange'
  },
  {
    title: 'Creative Strategy ROI Calculator',
    href: '/saas-creative-strategy-roi-calculator',
    icon: PieChart,
    description: 'Model creative optimization scenarios and calculate ROI impact',
    cta: 'Calculate ROI',
    color: 'orange'
  },
  {
    title: 'SaaS Growth Marketing Guide',
    href: '/saas-growth-marketing-guide',
    icon: TrendingUp,
    description: 'Channel assessment tool and optimization playbook for SaaS growth',
    cta: 'Start Assessment',
    color: 'orange'
  },
  {
    title: 'Consumer Subscription Marketing',
    href: '/consumer-subscription-marketing-guide',
    icon: TrendingUp,
    description: 'D2C channel optimization and growth strategy for consumer subscriptions',
    cta: 'Get D2C Strategy',
    color: 'orange'
  },
  {
    title: 'Revenue Growth Benchmarking',
    href: '/revenue-growth-benchmarking',
    icon: BarChart3,
    description: 'Benchmark your revenue growth against industry standards and get optimization insights',
    cta: 'Benchmark Growth',
    color: 'orange'
  },
  {
    title: '25-Point Performance Scoring',
    href: '/25-point-performance-scoring-system',
    icon: Target,
    description: 'Predict creative performance with systematic evaluation methodology',
    cta: 'Learn Scoring',
    color: 'orange'
  },
  {
    title: 'Creative Brief Framework',
    href: '/creative-brief-framework',
    icon: FileText,
    description: 'Strategic template system for briefing creative teams consistently',
    cta: 'Get Templates',
    color: 'orange'
  },
  {
    title: 'Mobile App CAC Optimization 2025',
    href: '/mobile-app-cac-optimization-2025',
    icon: TrendingDown,
    description: 'Combat the mobile app CAC crisis with data-driven creative intelligence reducing costs 25%',
    cta: 'Reduce CAC',
    color: 'orange',
    featured: true
  },
  {
    title: 'Subscription CAC Reduction Framework',
    href: '/subscription-business-cac-reduction-framework',
    icon: Target,
    description: '3-phase systematic framework to reduce subscription business acquisition costs',
    cta: 'Get Framework',
    color: 'orange'
  },
  {
    title: 'D2C Subscription Marketing Strategy',
    href: '/d2c-subscription-marketing-strategy',
    icon: Users,
    description: 'Consumer psychology-driven marketing strategies for D2C subscription businesses',
    cta: 'Learn Strategy',
    color: 'orange'
  },
  {
    title: 'Freemium to Premium Conversion',
    href: '/freemium-to-premium-conversion-optimization',
    icon: TrendingUp,
    description: 'Behavioral psychology framework for optimizing freemium to premium conversions',
    cta: 'Optimize Conversion',
    color: 'orange'
  },
  {
    title: 'Churn Reduction Framework',
    href: '/subscription-churn-reduction-framework',
    icon: TrendingDown,
    description: 'Cut subscription churn 35% with retention intelligence and proactive prevention',
    cta: 'Reduce Churn',
    color: 'orange'
  },
  {
    title: 'Hook Generator Methodology',
    href: '/hook-generator',
    icon: Zap,
    description: 'Systematic approach to creating high-converting hooks with proven frameworks',
    cta: 'Master Method',
    color: 'orange'
  },
  {
    title: 'Implementation Guide',
    href: '/creative-intelligence-implementation-guide',
    icon: BookOpen,
    description: 'Complete 8-week roadmap for implementing creative intelligence methodology',
    cta: 'Start Implementation',
    color: 'orange'
  },
  {
    title: 'Consumer Attribution Framework',
    href: '/consumer-attribution-framework',
    icon: Target,
    description: 'Advanced attribution modeling for consumer subscription businesses',
    cta: 'Model Attribution',
    color: 'orange'
  },
  {
    title: 'Marketing Attribution Framework',
    href: '/marketing-attribution-framework',
    icon: PieChart,
    description: 'Comprehensive attribution methodology for multi-channel marketing campaigns',
    cta: 'Get Framework',
    color: 'orange'
  },
  {
    title: 'Ad Formats Guide',
    href: '/ad-formats-guide',
    icon: BookOpen,
    description: 'Complete guide to high-converting ad formats across all platforms',
    cta: 'Explore Formats',
    color: 'orange'
  }
];

interface ContentNavigationProps {
  currentPath?: string;
  variant?: 'horizontal' | 'grid';
  showTitle?: boolean;
}

export function ContentNavigation({ 
  currentPath, 
  variant = 'grid',
  showTitle = true 
}: ContentNavigationProps) {
  // Filter out non-existent pages and current path
  const filteredContent = contentPieces
    .filter(piece => {
      // Hide non-existent pages
      if (piece.href === '/1m-arr-marketing-playbook') {
        return false;
      }
      // Hide current path if specified
      return currentPath ? piece.href !== currentPath : true;
    });

  const colorClasses = {
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700 text-white'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    indigo: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    purple: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700 text-white'
    },
    emerald: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    blue: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700 text-white'
    },
    slate: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    green: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700 text-white'
    }
  };

  if (variant === 'horizontal') {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {showTitle && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Explore More Strategic Resources
              </h2>
              <p className="text-gray-600">
                Additional tools and guides to optimize your marketing performance
              </p>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            {filteredContent.map((piece) => {
              const IconComponent = piece.icon;
              const colors = colorClasses[piece.color as keyof typeof colorClasses];
              
              return (
                <div key={piece.href} className={`${colors.bg} rounded-xl p-6 flex-1`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-white rounded-lg mr-3">
                        <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {piece.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm">
                    {piece.description}
                  </p>
                  
                  <Link 
                    href={piece.href}
                    className={`${colors.button} px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center inline-flex`}
                  >
                    {piece.cta}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Strategic Resource Library
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to optimize your marketing performance and scale revenue
            </p>
          </div>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          {filteredContent.map((piece) => {
            const IconComponent = piece.icon;
            const colors = colorClasses[piece.color as keyof typeof colorClasses];
            
            return (
              <div key={piece.href} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full min-h-[400px]">
                <div className={`${colors.bg} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {piece.title}
                  </h3>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-700 mb-6 flex-1">
                    {piece.description}
                  </p>
                  
                  <Link 
                    href={piece.href} 
                    className={`${colors.button} w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center mt-auto`}
                  >
                    {piece.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}