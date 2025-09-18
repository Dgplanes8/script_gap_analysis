import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { BookOpen, TrendingUp, Calculator, Target, Users, Zap } from 'lucide-react';
import { BlogCTASection } from '@/components/blog/blog-cta-section';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: '47 Revenue Growth Strategies That Generated $250M+ (Free Access)',
  description: 'Get the exact playbooks, calculators, and frameworks we used to scale 500+ brands. CAC reduction, conversion optimization, creative intelligence—all free.',
  keywords: 'revenue growth guides, conversion optimization, performance marketing, creative intelligence, business growth resources, ROI optimization, marketing performance',
  openGraph: {
    title: '47 Revenue Growth Strategies That Generated $250M+ (Free Access)',
    description: 'Get the exact playbooks, calculators, and frameworks we used to scale 500+ brands. CAC reduction, conversion optimization, creative intelligence.',
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
    color: 'bg-brand-50 border-brand-200 text-brand-800',
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
  
  // Creative & Content Strategy
  {
    category: 'Creative Strategy',
    icon: Zap,
    color: 'bg-brand-50 border-brand-200 text-brand-800',
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
    color: 'bg-brand-50 border-brand-200 text-brand-800',
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
        <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-6">
              <BookOpen className="w-4 h-4 text-[#126DFB]" />
              <span className="text-sm font-medium text-gray-700">Strategic Resources Library</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Weekly Trend Intelligence <span className="text-[#126DFB]">Blog & Resources</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Comprehensive guides, tools, and frameworks for growth marketing teams at subscription companies. 
              All optimized for weekly creative intelligence and performance marketing success.
            </p>
              
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FreeWeekButton source="blog-cta" className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg">Start Free Week Trial</FreeWeekButton>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-[#126DFB] mb-2">5</div>
                <div className="text-gray-600">Interactive Calculators</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-[#126DFB] mb-2">100%</div>
                <div className="text-gray-600">Subscription-Focused</div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles by Category */}
        <section className="py-20 bg-white relative">
          <div className="max-w-6xl mx-auto px-6">
            {articles.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex} className="mb-16 last:mb-0">
                  <div className="flex items-center mb-8">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {category.category}
                    </h2>
                  </div>
                    
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.articles.map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href={article.slug}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-[#126DFB] hover:transform hover:-translate-y-1 group"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#126DFB] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        <div className="text-[#126DFB] font-semibold group-hover:underline">
                          Read Guide →
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Implement Weekly Creative Intelligence?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Start with 10 free hooks, then choose the weekly plan that fits your growth goals. 
              Fresh concepts delivered every Monday, not every month.
            </p>
              
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FreeWeekButton source="blog-cta" className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg">Start Free Week Trial</FreeWeekButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
