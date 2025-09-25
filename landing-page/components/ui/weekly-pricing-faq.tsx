'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: 'billing' | 'pricing' | 'service' | 'general';
}

const weeklyPricingFAQs: FAQItem[] = [
  {
    question: 'How does weekly billing work?',
    answer: 'You\'re billed every week for continued access. Your first week is completely FREE. After that, you can cancel anytime before your next weekly billing cycle. It\'s the most flexible pricing in the industry.',
    category: 'billing'
  },
  {
    question: 'Why weekly pricing instead of monthly like everyone else?',
    answer: 'Because we deliver weekly! Pay for what you get, when you get it. If you only need creative concepts for 2 weeks, pay for 2 weeks. If you need to pause for a month, restart anytime. Revolutionary pricing for revolutionary delivery.',
    category: 'pricing'
  },
  {
    question: 'What\'s included in the first week FREE trial?',
    answer: 'Full access to your chosen tier for 7 days. You\'ll receive your first creative concepts, scripts, and insights exactly as paying customers do. Experience our Monday delivery system with zero commitment.',
    category: 'service'
  },
  {
    question: 'Can I upgrade or downgrade tiers weekly?',
    answer: 'Yes! Changes take effect immediately. Need more concepts this week? Upgrade to Competitive Edge. Scaling back? Drop to Creative Starter. You\'re in complete control of your investment.',
    category: 'pricing'
  },
  {
    question: 'Is the $5/week pricing limited time?',
    answer: 'The first 50 customers lock in launch pricing forever. After that, new customer pricing will increase. Early adopters get grandfathered pricing and never see price increases.',
    category: 'pricing'
  },
  {
    question: 'What if I want to pause for a few weeks?',
    answer: 'Just cancel before your next billing cycle and restart whenever you\'re ready. Your pricing tier and any early adopter benefits are preserved. No reactivation fees, no hassles.',
    category: 'billing'
  },
  {
    question: 'How is this different from agencies charging thousands per month?',
    answer: 'Agencies charge $800-2,000+ per week with 6-month contracts and 2-week turnarounds. We start at $5/week with no contracts and Monday delivery. Plus, you only pay for weeks you actually want service.',
    category: 'general'
  },
  {
    question: 'Can I really cancel after just one week?',
    answer: 'Absolutely! After your FREE first week, you can cancel anytime before your next weekly billing cycle. No questions asked, no penalties. Restart whenever you want with the same benefits.',
    category: 'billing'
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'We\'ll pause your service and send a friendly reminder. No late fees or penalties. Once payment is updated, your service resumes immediately with the same tier and pricing.',
    category: 'billing'
  },
  {
    question: 'Do you offer annual discounts for weekly pricing?',
    answer: 'Our weekly pricing is already revolutionary. We focus on flexibility over discounts. Pay only for the weeks you need service, which often saves more than any annual discount could offer.',
    category: 'pricing'
  }
];

interface WeeklyPricingFAQProps {
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
  maxItems?: number;
  variant?: 'default' | 'compact' | 'detailed';
}

export function WeeklyPricingFAQ({ 
  title = "Weekly Pricing FAQ",
  subtitle = "Common questions about our revolutionary weekly pricing model",
  showCategories = true,
  maxItems,
  variant = 'default'
}: WeeklyPricingFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const categories = ['all', 'billing', 'pricing', 'service', 'general'];
  
  const filteredFAQs = selectedCategory === 'all' 
    ? weeklyPricingFAQs 
    : weeklyPricingFAQs.filter(faq => faq.category === selectedCategory);
    
  const displayFAQs = maxItems ? filteredFAQs.slice(0, maxItems) : filteredFAQs;

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <section className={`${isCompact ? 'py-8' : 'py-16'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${isCompact ? 'text-left' : 'text-center'}`}>
          
          {/* Header */}
          <div className={`${isCompact ? 'mb-6' : 'mb-12'}`}>
            <div className={`inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4 ${isCompact ? '' : 'mb-6'}`}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Weekly Pricing Questions
            </div>
            <h2 className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-4`}>
              {title}
            </h2>
            <p className={`${isCompact ? 'text-base' : 'text-lg'} text-gray-600`}>
              {subtitle}
            </p>
          </div>

          {/* Category Filter */}
          {showCategories && !isCompact && (
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Items */}
          <div className="space-y-4">
            {displayFAQs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 pr-4`}>
                      {faq.question}
                    </h3>
                    {isDetailed && faq.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.has(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {openItems.has(index) && (
                  <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
                    <p className={`${isCompact ? 'text-sm' : 'text-base'} text-gray-700 pt-4 leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          {!isCompact && (
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Still have questions about weekly pricing?
                </h3>
                <p className="text-gray-600 mb-4">
                  Claim your 10 free monthly credits and test every generator before you upgrade.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                  Claim Free Credits
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Export individual FAQ data for use in other components
export { weeklyPricingFAQs };
export type { FAQItem };
