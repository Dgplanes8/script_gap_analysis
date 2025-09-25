'use client';

import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { HelpCircle, Plus, Minus, ArrowRight, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

// Metadata for this page is handled by Next.js App Router
// Since this is a client component, we'll add metadata via Head component if needed

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-gray-500 flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-gray-600 leading-relaxed whitespace-pre-line">{answer}</div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do weekly ad templates work?",
          answer: "Every Monday morning, you receive 1-3 strategic creative concepts with 2-6 complete ad scripts. Each template includes the strategic reasoning behind it, platform-specific optimization notes, and implementation guidance. You customize the scripts with your brand voice and create the visuals using our production guides."
        },
        {
          question: "Do I need marketing experience to use these templates?",
          answer: "No marketing experience required. Our templates include step-by-step implementation guides, strategic explanations, and specific instructions for platform setup. Many successful users are first-time advertisers who follow our systematic approach."
        },
        {
          question: "How quickly can I launch my first campaign?",
          answer: "Most business owners launch their first campaign within 3-5 days of receiving templates. Monday: receive templates, Tuesday: customize content, Wednesday: create visuals, Thursday: set up campaigns, Friday: launch and test. Total time investment: 5-9 hours spread across the week."
        },
        {
          question: "What if I don't have design or video skills?",
          answer: "Our templates are designed for DIY implementation. We provide specific guidance for tools like Canva (graphics), CapCut (video editing), and smartphone video production. Many successful campaigns are created entirely with free tools and smartphone cameras."
        }
      ]
    },
    {
      category: "Service Details",
      questions: [
        {
          question: "What exactly do I receive each Monday?",
          answer: "• 1-3 strategic creative concepts with performance scores\n• 2-6 complete ad scripts optimized for each platform\n• Strategic reasoning and audience psychology insights\n• Implementation guides for TikTok, Facebook, Instagram\n• Budget allocation recommendations\n• Performance tracking frameworks"
        },
        {
          question: "Can I customize the templates for my brand?",
          answer: "Absolutely. Templates are designed to be customized with your brand voice, value proposition, and specific offers. We provide customization guidelines and preserve the strategic framework while allowing full personalization."
        },
        {
          question: "Do you create the actual videos/graphics for me?",
          answer: "No, we provide strategic templates and production guides. You create the visuals using our step-by-step instructions. This keeps costs low while giving you full control over brand presentation. We teach you the process rather than doing it for you."
        },
        {
          question: "How are these different from AI-generated templates?",
          answer: "Our templates are created using proven strategic frameworks from $250MM+ in managed ad spend. Each concept includes audience psychology research, competitive intelligence, and performance scoring. AI tools create generic content; we create strategic intelligence designed to convert your specific audience."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "Why do you charge weekly instead of monthly?",
          answer: "Startup cash flow is unpredictable. Weekly billing gives you flexibility to pause during tight months and restart when ready. No long-term contracts or commitments - just pay for the weeks you need creative intelligence."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Yes, cancel or pause anytime with no penalties. We understand startup life - sometimes you need to focus on product development or fundraising. Restart whenever you're ready to scale marketing again."
        },
        {
          question: "Is there a free trial?",
          answer: "Yes! Download our free template collection to experience our strategic approach. If you like the quality and methodology, upgrade to weekly delivery for fresh concepts every Monday."
        },
        {
          question: "What's the difference between service tiers?",
          answer: "Creative Starter ($5/week): 1 concept + 2 scripts\nTrend Tracker ($15/week): 1 concept + 2 scripts + trend analysis\nCompetitive Edge ($35/week): 2 concepts + 4 scripts + competitor insights\nMarket Intelligence ($99/week): 3 concepts + 6 scripts + strategic support\n\nAll tiers include implementation guides and strategic reasoning."
        }
      ]
    },
    {
      category: "Implementation Support",
      questions: [
        {
          question: "Do you help with campaign setup and targeting?",
          answer: "Each template includes platform-specific setup guides with targeting recommendations, budget allocation strategies, and optimization tips. For Market Intelligence tier ($99/week), you get direct access to strategic support for campaign questions."
        },
        {
          question: "What if my campaigns aren't performing well?",
          answer: "First, ensure you're following the implementation guides completely. Most performance issues stem from incomplete setup or targeting misalignment. Market Intelligence tier includes troubleshooting support. We also provide optimization frameworks to systematically improve results."
        },
        {
          question: "Do you provide training on ad platform setup?",
          answer: "Yes, every template includes step-by-step platform setup instructions. We also maintain updated guides for Facebook Ads Manager, TikTok Ads, and Instagram advertising. Our video production guide covers DIY creation with professional results."
        },
        {
          question: "Can you help me analyze my campaign results?",
          answer: "Our templates include performance tracking frameworks and key metrics to monitor. Market Intelligence tier includes result analysis support. We teach you to fish rather than fishing for you - building your long-term marketing capabilities."
        }
      ]
    },
    {
      category: "Strategy & Results",
      questions: [
        {
          question: "How do you ensure templates will work for my specific business?",
          answer: "Our templates use proven psychological frameworks and strategic principles that work across industries. We provide customization guidelines to adapt concepts for your specific audience, value proposition, and market positioning while preserving the strategic foundation."
        },
        {
          question: "What kind of results should I expect?",
          answer: "Results vary by industry, implementation quality, and market conditions. Our systematic approach typically achieves 3.2x higher conversion rates than random creative attempts. Most business owners see positive ROI within 30 days when following our complete methodology."
        },
        {
          question: "How do you stay current with platform changes and trends?",
          answer: "We continuously monitor platform updates, algorithm changes, and trending content patterns. This intelligence is integrated into weekly templates, ensuring your campaigns leverage current best practices and trending formats."
        },
        {
          question: "Do you provide industry-specific templates?",
          answer: "Our strategic frameworks work across industries, but we provide sector-specific customization guidance. SaaS, e-commerce, professional services, and other common startup verticals get tailored implementation notes within the broader strategic template."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "How are templates delivered?",
          answer: "Templates are delivered via email every Monday morning by 9 AM PST. You receive a comprehensive PDF with all concepts, scripts, strategic insights, and implementation guides. No special software or platform access required."
        },
        {
          question: "Can I access previous weeks' templates?",
          answer: "Yes, you retain access to all templates you've received during your subscription. Build a library of proven concepts that you can adapt and reuse as your business grows."
        },
        {
          question: "Do you integrate with ad platforms or tools?",
          answer: "Currently, we focus on strategic template delivery rather than tool integrations. This keeps our service simple, affordable, and platform-agnostic. You can use our templates with any ad platform or marketing tool you prefer."
        },
        {
          question: "What if I need templates for a specific launch or campaign?",
          answer: "Our weekly delivery system provides consistent strategic intelligence. For time-sensitive launches, start your subscription 1-2 weeks before your planned launch date. Market Intelligence tier can accommodate specific strategic consultation for major campaigns."
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap(category => 
    category.questions.map((q, index) => ({
      ...q,
      categoryIndex: faqs.indexOf(category),
      questionIndex: index,
      globalIndex: faqs.slice(0, faqs.indexOf(category))
        .reduce((sum, cat) => sum + cat.questions.length, 0) + index
    }))
  );

  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="faq"
        title="FAQ - Weekly Ad Templates for Startups"
        description="Get answers to common questions about weekly ad templates for startups. Pricing, delivery, customization, and implementation support."
        slug="/faq"
        additionalSchemas={[
          {
            '@type': 'FAQPage',
            mainEntity: allQuestions.slice(0, 10).map(q => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer
              }
            }))
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <HelpCircle className="h-4 w-4 mr-2" />
                FREQUENTLY ASKED QUESTIONS
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to Know About Weekly Ad Templates
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Common questions from business owners about our creative intelligence service. Can't find your answer? Contact us directly.
              </p>
              
              {/* Quick Access */}
              <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Jump to Section:</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {faqs.map((category, index) => (
                    <a
                      key={category.category}
                      href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      {category.category}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        {faqs.map((category, categoryIndex) => (
          <section 
            key={category.category}
            id={category.category.toLowerCase().replace(/\s+/g, '-')}
            className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = faqs.slice(0, categoryIndex)
                      .reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex;
                    
                    return (
                      <FAQItem
                        key={`${categoryIndex}-${questionIndex}`}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === globalIndex}
                        onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Still Have Questions */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized answers from our founder. We respond to all inquiries within 24 hours.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Support</h3>
                  <p className="text-gray-600 mb-4">
                    Get detailed answers to specific questions about templates, implementation, or strategy.
                  </p>
                  <a
                    href="mailto:brian@apsicsmedia.com"
                    className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors duration-200 inline-flex items-center"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    brian@apsicsmedia.com
                  </a>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Consultation</h3>
                  <p className="text-gray-600 mb-4">
                    Book a call to discuss your specific marketing challenges and how our templates can help.
                  </p>
                  <Link
                    href="/tools"
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Free Call
                  </Link>
                </div>
              </div>

              {/* Common Next Steps */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-8">
                  Most business owners start with our free templates, then upgrade to weekly delivery when they see the quality and strategic depth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <FreeWeekButton source="faq-cta" className="bg-brand-600 text-white hover:bg-brand-700 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg">Claim 10 Free Credits</FreeWeekButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
