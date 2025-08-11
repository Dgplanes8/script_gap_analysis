import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BookOpen, TrendingUp, Calculator, Target, Users, Zap } from 'lucide-react';
import { BlogCTASection } from '@/components/blog/blog-cta-section';

export const metadata: Metadata = {
  title: 'Blog & Resources - Weekly Trend Intelligence for Subscription Marketing | Apsics Media',
  description: 'Comprehensive guides, tools, and frameworks for subscription business marketing. CAC reduction, attribution modeling, creative strategy, and weekly trend intelligence.',
  keywords: 'subscription marketing guides, CAC reduction, marketing attribution, creative strategy, growth marketing resources',
  openGraph: {
    title: 'Blog & Resources - Weekly Trend Intelligence for Subscription Marketing',
    description: 'Comprehensive guides and tools for subscription business marketing success.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

const articles = [
  // Marketing Strategy Guides
  {
    category: 'Strategy Guides',
    icon: BookOpen,
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    articles: [
      {
        title: 'SaaS Growth Marketing Guide',
        slug: '/saas-growth-marketing-guide',
        description: 'Comprehensive guide for SaaS growth strategies'
      },
      {
        title: 'Consumer Subscription Marketing Guide',
        slug: '/consumer-subscription-marketing-guide',
        description: 'Marketing strategies for consumer subscription businesses'
      },
      {
        title: 'Subscription Marketing Strategy Guide',
        slug: '/subscription-marketing-strategy-guide',
        description: 'Complete subscription marketing framework'
      },
      {
        title: 'Weekly Trend Intelligence Guide',
        slug: '/weekly-trend-intelligence-guide',
        description: 'How to leverage trend intelligence for marketing'
      }
    ]
  },
  
  // CAC & Attribution Frameworks
  {
    category: 'CAC & Attribution',
    icon: Target,
    color: 'bg-green-50 border-green-200 text-green-800',
    articles: [
      {
        title: 'CAC Reduction Guide',
        slug: '/cac-reduction-guide',
        description: 'Step-by-step customer acquisition cost optimization'
      },
      {
        title: 'Reduce Customer Acquisition Cost for Subscription Business',
        slug: '/reduce-customer-acquisition-cost-subscription-business',
        description: 'Subscription-specific CAC reduction strategies'
      },
      {
        title: 'LTV CAC Ratio Optimization: Growth Team Playbook',
        slug: '/blog/ltv-cac-ratio-optimization-growth-teams',
        description: 'Master LTV:CAC ratio optimization for sustainable growth with proven strategies to improve unit economics'
      },
      {
        title: 'Marketing Attribution Framework',
        slug: '/marketing-attribution-framework',
        description: 'Complete attribution modeling guide'
      },
      {
        title: 'Consumer Attribution Framework',
        slug: '/consumer-attribution-framework',
        description: 'Attribution strategies for consumer brands'
      }
    ]
  },

  // Customer Retention & Lifecycle
  {
    category: 'Retention & Lifecycle',
    icon: Users,
    color: 'bg-teal-50 border-teal-200 text-teal-800',
    articles: [
      {
        title: 'Subscription Churn Rate Optimization: 7 Data-Driven Strategies',
        slug: '/blog/subscription-churn-rate-optimization',
        description: 'Reduce subscription churn with proven strategies for growth teams and data-driven retention frameworks'
      },
      {
        title: 'Retention Marketing Automation for SaaS Growth',
        slug: '/blog/retention-marketing-automation-saas-growth',
        description: 'Advanced retention automation strategies beyond email sequences for SaaS growth teams'
      }
    ]
  },
  
  // Creative & Content Strategy
  {
    category: 'Creative Strategy',
    icon: Zap,
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    articles: [
      {
        title: 'Weekly Creative Intelligence for Subscription Marketing',
        slug: '/blog/weekly-creative-intelligence-subscription-marketing',
        description: 'Transform subscription marketing with weekly creative concepts delivered every Monday'
      },
      {
        title: 'Competitive Creative Analysis for Growth Teams',
        slug: '/blog/competitive-creative-analysis-growth-teams',
        description: 'Systematic frameworks for analyzing competitor strategies and adapting winning concepts'
      },
      {
        title: 'Creative Fatigue Solutions for Subscription Companies',
        slug: '/blog/creative-fatigue-subscription-companies',
        description: 'Combat creative fatigue with systematic solutions and maintain consistent acquisition costs'
      },
      {
        title: 'Growth Team Creative Bottlenecks: Agency Alternative',
        slug: '/blog/growth-team-creative-bottlenecks',
        description: 'Eliminate creative bottlenecks with weekly delivery systems that accelerate growth'
      },
      {
        title: 'Trend-Based Creative Development for Subscription Business',
        slug: '/blog/trend-based-creative-development',
        description: 'Leverage social media trends for high-performing ad concepts and audience expansion'
      },
      {
        title: 'Facebook Ad Hooks for D2C Subscription Marketing',
        slug: '/facebook-ad-hooks-d2c-subscription-marketing',
        description: 'Platform-specific hook strategies'
      },
      {
        title: 'TikTok Hooks for Subscription Business Marketing',
        slug: '/tiktok-hooks-subscription-business-marketing',
        description: 'TikTok-optimized creative strategies'
      },
      {
        title: 'Subscription Business Viral Content Calendar',
        slug: '/subscription-business-viral-content-calendar',
        description: 'Content planning framework'
      },
      {
        title: 'AI-Enhanced Creative Intelligence',
        slug: '/ai-enhanced-creative-intelligence',
        description: 'AI-powered creative optimization'
      }
    ]
  },
  
  // Competitive Analysis & Intelligence
  {
    category: 'Competitive Intelligence',
    icon: TrendingUp,
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    articles: [
      {
        title: 'Enterprise vs Agency Strategies',
        slug: '/fortune-100-vs-agency-strategies',
        description: 'Strategic comparison analysis'
      },
      {
        title: 'Competitor Analysis Weekly Workflow',
        slug: '/competitor-analysis-weekly-workflow',
        description: 'Systematic competitive intelligence process'
      }
    ]
  },
  
  // Tools and Calculators
  {
    category: 'Tools & Calculators',
    icon: Calculator,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    articles: [
      {
        title: 'CAC Optimization Calculator',
        slug: '/cac-optimization-calculator',
        description: 'Interactive CAC optimization tool'
      },
      {
        title: 'SaaS Creative Strategy ROI Calculator',
        slug: '/saas-creative-strategy-roi-calculator',
        description: 'Creative investment ROI calculator'
      },
      {
        title: 'Revenue Growth Benchmarking',
        slug: '/revenue-growth-benchmarking',
        description: 'Performance benchmarking tool'
      }
    ]
  }
];

export default function BlogPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                Strategic Resources Library
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Weekly Trend Intelligence Blog & Resources
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive guides, tools, and frameworks for growth marketing teams at subscription companies. 
                All optimized for weekly creative intelligence and performance marketing success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#service-tiers"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get 10 Free Hooks First
                </Link>
                <Link
                  href="/#service-tiers"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  See Weekly Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                  <div className="text-gray-600">Interactive Calculators</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                  <div className="text-gray-600">Subscription-Focused</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles by Category */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {articles.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex} className="mb-16 last:mb-0">
                    <div className="flex items-center mb-8">
                      <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {category.category}
                      </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.articles.map((article, articleIndex) => (
                        <Link
                          key={articleIndex}
                          href={article.slug}
                          className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-blue-200 group"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {article.description}
                          </p>
                          <div className="text-blue-600 font-semibold group-hover:underline">
                            Read Guide →
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Implement Weekly Creative Intelligence?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with 10 free hooks, then choose the weekly plan that fits your growth goals. 
                Fresh concepts delivered every Monday, not every month.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#service-tiers"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Get My 10 Free Hooks
                </Link>
                <Link
                  href="/#service-tiers"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  See Weekly Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}