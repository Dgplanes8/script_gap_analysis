'use client';

import { useState, useId } from 'react';
import Script from 'next/script';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { generateFAQSchema, formatSchemaAsJsonLD } from '@/lib/schema/utils';
import { FAQSchemaProps, DEFAULT_FAQS } from '@/lib/schema/types';

/**
 * FAQ schema component for frequently asked questions
 * Used on key landing pages and service pages
 */
export function FAQSchema({ faqs = [...DEFAULT_FAQS], className }: FAQSchemaProps) {
  const id = useId();

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = generateFAQSchema(faqs);
  const jsonLD = formatSchemaAsJsonLD(schema);
  const scriptId = `faq-schema${id}`;

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
 * Re-exported from faq-data.ts to prevent RSC module resolution errors
 * (Client components can't export data that's imported in server components)
 */
export { SPECIALIZED_FAQS } from './faq-data';
