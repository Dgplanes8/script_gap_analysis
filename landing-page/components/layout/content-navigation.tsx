'use client';

import Link from 'next/link';
import { Calculator, BookOpen, PieChart, FileText, TrendingUp, Target, ArrowRight, Play, Facebook, TrendingDown } from 'lucide-react';

const contentPieces = [
  {
    title: '25 TikTok Hooks for Subscriptions',
    href: '/tiktok-hooks-subscription-business-marketing',
    icon: Play,
    description: 'Proven TikTok hooks that convert for subscription businesses with psychology breakdowns',
    cta: 'Get Hooks',
    color: 'purple'
  },
  {
    title: 'Facebook Ad Hooks for D2C',
    href: '/facebook-ad-hooks-d2c-subscription-marketing',
    icon: Facebook,
    description: '15 winning Facebook ad hook formulas with A/B testing frameworks',
    cta: 'Master Hooks',
    color: 'blue'
  },
  {
    title: 'Reduce CAC by 20% Strategy',
    href: '/reduce-customer-acquisition-cost-subscription-business',
    icon: TrendingDown,
    description: 'Fortune 100 methodology to reduce customer acquisition cost without increasing ad spend',
    cta: 'Reduce CAC',
    color: 'green'
  },
  {
    title: 'CAC Optimization Calculator',
    href: '/cac-optimization-calculator',
    icon: Calculator,
    description: 'Calculate potential CAC reduction and get optimization recommendations',
    cta: 'Calculate Savings',
    color: 'indigo'
  },
  {
    title: 'Creative Strategy ROI Calculator',
    href: '/saas-creative-strategy-roi-calculator',
    icon: PieChart,
    description: 'Model creative optimization scenarios and calculate ROI impact',
    cta: 'Calculate ROI',
    color: 'emerald'
  },
  {
    title: 'SaaS Growth Marketing Guide',
    href: '/saas-growth-marketing-guide',
    icon: TrendingUp,
    description: 'Channel assessment tool and optimization playbook for SaaS growth',
    cta: 'Start Assessment',
    color: 'green'
  },
  {
    title: 'Consumer Subscription Marketing',
    href: '/consumer-subscription-marketing-guide',
    icon: TrendingUp,
    description: 'D2C channel optimization and growth strategy for consumer subscriptions',
    cta: 'Get D2C Strategy',
    color: 'purple'
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
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'text-indigo-600',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    slate: {
      bg: 'bg-slate-50',
      icon: 'text-slate-600',
      button: 'bg-slate-600 hover:bg-slate-700 text-white'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700 text-white'
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
                  
                  <Link href={piece.href}>
                    <button className={`${colors.button} px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center`}>
                      {piece.cta}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
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
              <div key={piece.href} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${colors.bg} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {piece.title}
                  </h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    {piece.description}
                  </p>
                  
                  <Link href={piece.href}>
                    <button className={`${colors.button} w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center`}>
                      {piece.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
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