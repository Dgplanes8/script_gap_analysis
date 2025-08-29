'use client';

import { useState } from 'react';
import Script from 'next/script';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { generateFAQSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { FAQSchemaProps, DEFAULT_FAQS } from '@/lib/schema/types';

/**
 * FAQ schema component for frequently asked questions
 * Used on key landing pages and service pages
 */
export function FAQSchema({ faqs = [...DEFAULT_FAQS], className }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = generateFAQSchema(faqs);
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `faq-schema-${Date.now()}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}

/**
 * FAQ Section Component with Structured Data and Visual Display
 * Optimized for featured snippets and user engagement
 */
interface FAQSectionProps {
  faqs?: { question: string; answer: string; }[];
  title?: string;
  subtitle?: string;
  pageUrl?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function FAQSection({ 
  faqs = [...DEFAULT_FAQS],
  title = 'Frequently Asked Questions',
  subtitle,
  pageUrl,
  className = '',
  variant = 'default'
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const containerClass = variant === 'compact' 
    ? 'py-12 bg-gray-50' 
    : variant === 'featured'
    ? 'py-20 bg-gradient-to-br from-blue-50 to-indigo-50'
    : 'py-16 bg-gray-50';

  return (
    <>
      <FAQSchema faqs={faqs} />
      
      <section className={`${containerClass} ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                <HelpCircle className="h-4 w-4 mr-2" />
                Get Answers
              </div>
              
              <h2 className={`font-bold text-gray-900 mb-4 ${
                variant === 'featured' ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'
              }`}>
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openItems.includes(index);
                
                return (
                  <div 
                    key={index}
                    id={`faq-${index + 1}`}
                    className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
                      isOpen 
                        ? 'border-blue-200 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div 
                        id={`faq-answer-${index}`}
                        className="px-6 pb-6"
                      >
                        <div 
                          className="text-gray-700 leading-relaxed prose prose-blue max-w-none"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Contact CTA */}
            {variant !== 'compact' && (
              <div className="mt-12 text-center">
                <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Still Have Questions?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get personalized answers about weekly creative intelligence for your business
                  </p>
                  <a
                    href="mailto:brian@apsicsmedia.com"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Email Us Directly
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Specialized FAQ Sets for Different Page Types
 * Optimized for featured snippets and specific user journeys
 */
export const SPECIALIZED_FAQS = {
  startup_marketing: [
    {
      question: 'What is the average marketing budget for early-stage startups?',
      answer: 'Early-stage startups typically allocate <strong>$500-$5K monthly</strong> for marketing and advertising, representing 5-15% of revenue. Bootstrap companies often start with $500-$1K while Series A startups may spend $2K-$5K monthly. The key is to start small and scale based on proven channels.'
    },
    {
      question: 'How do startups create effective ad campaigns without marketing experience?',
      answer: 'Successful startup ad campaigns focus on <strong>clear value propositions</strong>, target specific pain points, use customer language, and test iteratively. Templates and proven frameworks help founders launch campaigns faster without extensive marketing experience. Start with proven structures rather than creating from scratch.'
    },
    {
      question: 'What is a good Customer Acquisition Cost (CAC) for startups?',
      answer: 'A good CAC for startups is typically <strong>1/3 of Customer Lifetime Value (LTV)</strong>. For SaaS startups, CAC should be recovered within 12-18 months. B2B startups often see CACs of $200-$500, while B2C ranges from $20-$200 depending on the industry.'
    },
    {
      question: 'How often should startups refresh their ad creative?',
      answer: 'Ad creative should be updated <strong>weekly</strong> to prevent fatigue and maintain performance. Fresh creative maintains audience engagement and prevents declining click-through rates. Weekly updates align with platform algorithm preferences and keep campaigns performing optimally.'
    }
  ],

  ad_templates: [
    {
      question: 'Do ad templates actually work for small businesses?',
      answer: 'Yes, ad templates are highly effective for small businesses and startups. They provide <strong>proven frameworks that reduce creation time by 70%</strong> while maintaining professional quality. Templates help founders without design experience launch effective campaigns using structures that have already been tested and optimized.'
    },
    {
      question: 'How do I customize templates for my specific business?',
      answer: 'Customize templates by replacing placeholder text with your <strong>specific value proposition</strong>, target audience language, and unique benefits. Focus on your customer\'s exact pain points and use their terminology. The framework stays the same, but the messaging becomes authentically yours.'
    },
    {
      question: 'What makes an ad template high-converting?',
      answer: 'High-converting templates include: <strong>attention-grabbing hooks</strong>, clear problem identification, specific benefits (not features), social proof elements, and strong calls-to-action. The best templates follow proven psychological triggers like scarcity, authority, and social validation.'
    }
  ],

  calculators: [
    {
      question: 'How accurate are marketing calculators for business planning?',
      answer: 'Marketing calculators provide <strong>directionally accurate estimates</strong> based on industry benchmarks and best practices. They\'re most effective for initial planning and scenario modeling. Always validate calculator results with your actual data and market conditions for final decisions.'
    },
    {
      question: 'Should I use multiple calculators when planning my marketing strategy?',
      answer: 'Yes, using multiple calculators gives you a <strong>comprehensive view</strong> of your marketing strategy. Combine budget, ROI, and CAC calculators to understand the full picture of your marketing investments and expected returns across different scenarios.'
    },
    {
      question: 'How frequently should I update my marketing calculations?',
      answer: 'Update your marketing calculations <strong>monthly or quarterly</strong> as you gather more performance data. Initial estimates should be refined with actual conversion rates, customer lifetime values, and channel performance metrics from your campaigns.'
    }
  ],

  service_plans: [
    {
      question: 'How is weekly creative delivery different from monthly agencies?',
      answer: 'Weekly delivery means <strong>fresh concepts every Monday</strong>, not waiting 30 days for new creative. This aligns with platform algorithm preferences and prevents creative fatigue. Monthly delivery often means your ads lose performance while waiting for new concepts.'
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can <strong>change plans anytime</strong> with no penalties or fees. Upgrade when you need more concepts, downgrade when scaling back. All plans are month-to-month with no long-term contracts or commitments.'
    },
    {
      question: 'Do you work with businesses outside of subscription models?',
      answer: 'While our expertise is optimized for <strong>subscription and recurring revenue businesses</strong> (SaaS, D2C subscriptions, memberships), our trend intelligence methodology works for any business needing consistent creative testing and performance optimization.'
    }
  ]
};