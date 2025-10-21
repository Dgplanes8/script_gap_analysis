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
  ],

  creative_brief_generator: [
    {
      question: 'What is a creative brief generator and how does it work?',
      answer: 'A creative brief generator uses AI to automatically create <strong>execution-ready marketing briefs in 60 seconds</strong>. Unlike templates that require manual filling, generators analyze your inputs and produce complete briefs with target audience analysis, positioning frameworks, campaign strategy, and deliverables—built from $250M+ in ad performance data.'
    },
    {
      question: 'How is an AI brief generator different from using templates?',
      answer: '<strong>Templates are static documents you fill in manually</strong>, while AI generators create custom briefs instantly based on your specific inputs. Generators provide strategic recommendations, audience insights, and positioning frameworks that templates can\'t. It\'s the difference between a blank form and an intelligent system that builds strategy for you.'
    },
    {
      question: 'Do I need marketing experience to use a creative brief generator?',
      answer: 'No. Creative brief generators are designed for <strong>founders, growth teams, and marketers without extensive briefing experience</strong>. The AI handles strategic frameworks, audience analysis, and positioning—you just provide your product/service details and goals. Perfect for startups and small teams executing agency-level campaigns.'
    },
    {
      question: 'What should be included in a creative brief?',
      answer: 'A complete creative brief includes: <strong>campaign objectives, target audience analysis, key messaging and positioning, competitive landscape, creative direction and tone, deliverables and specifications, success metrics, and timeline</strong>. AI generators ensure you don\'t miss critical components that affect campaign performance.'
    },
    {
      question: 'How often should I create new creative briefs?',
      answer: 'Create new briefs for <strong>each distinct campaign or major creative refresh</strong>—typically monthly or quarterly depending on your testing velocity. Consistent briefing ensures your creative stays aligned with strategy, prevents scope creep, and maintains quality as you scale content production.'
    },
    {
      question: 'Can creative brief generators work for any industry?',
      answer: 'Yes, but <strong>industry-specific generators perform better</strong>. Generic generators lack the nuanced frameworks needed for SaaS (ICP analysis, PLG motions), D2C (subscription mechanics), or mobile apps (UA metrics). Look for generators with vertical expertise or use specialized tools for your industry.'
    },
    {
      question: 'Are free creative brief generators as good as paid services?',
      answer: 'Free generators with <strong>usage limits (like 10 monthly credits) offer full functionality</strong> without compromise. The quality comes from the underlying intelligence, not the price. Paid tiers typically add volume, team collaboration, and advanced features—but free tiers are perfect for testing and small teams.'
    },
    {
      question: 'How long does it take to generate a creative brief with AI?',
      answer: 'AI creative brief generators produce <strong>complete briefs in 30-60 seconds</strong>. This includes target audience analysis, positioning frameworks, campaign strategy, and deliverables. Compare this to 2-4 hours for manual briefing—generators let you iterate faster and test more creative concepts.'
    }
  ],

  ad_script_generator: [
    {
      question: 'What is an ad script generator and how does it create scripts?',
      answer: 'An ad script generator uses AI trained on <strong>$250M+ in ad performance data</strong> to create platform-native video ad scripts in 30 seconds. It analyzes your product, audience, and goals to generate hooks, storylines, CTAs, and visual cues optimized for TikTok, Instagram Reels, YouTube Shorts, or Meta ads.'
    },
    {
      question: 'Do ad script generators work for TikTok and Instagram Reels?',
      answer: 'Yes, the best generators create <strong>platform-specific scripts</strong> optimized for each channel. TikTok scripts emphasize trend integration and native feel. Reels scripts focus on visual storytelling. YouTube Shorts scripts prioritize retention. Generic scripts fail—you need platform-native optimization for performance.'
    },
    {
      question: 'Can I use AI-generated scripts for UGC creator campaigns?',
      answer: 'Absolutely. <strong>UGC-optimized generators create creator-friendly scripts</strong> with natural testimonial flow, authentic language, and flexible delivery. Send these as guidelines (not word-for-word scripts) so creators add their personality while hitting your key messaging points. Best UGC comes from structured creative freedom.'
    },
    {
      question: 'How long should my video ad script be?',
      answer: '<strong>TikTok/Reels: 15-30 seconds. YouTube Shorts: 30-60 seconds. Meta/Facebook: 15-30 seconds.</strong> Generators automatically optimize length for each platform. Shorter scripts (15-20 sec) perform best for cold traffic, while 30-60 sec works for retargeting and warm audiences with higher intent.'
    },
    {
      question: 'What makes a video ad script high-converting?',
      answer: 'High-converting scripts include: <strong>3-second pattern interrupt hook, relatable problem identification, clear benefit demonstration (not features), social proof or credibility markers, and native-feeling CTA</strong>. The best generators structure scripts using proven frameworks like Problem-Agitate-Solution or Discovery Story formats.'
    },
    {
      question: 'Can ad script generators create scripts for different industries?',
      answer: 'Yes, but <strong>performance varies by generator training</strong>. Generic generators work for broad use cases. Vertical-specific scripts (SaaS demos, D2C product reveals, mobile app showcases) require generators trained on industry-specific data. Look for generators with examples in your category for best results.'
    },
    {
      question: 'Should I write scripts myself or use a generator?',
      answer: 'Use generators to <strong>create multiple script variations in minutes</strong>, then customize the top performers. Manual scripting takes hours per script and lacks data-backed frameworks. Generators let you test 10-15 script angles quickly, identify winners, then refine. It\'s about velocity and testing volume, not perfection.'
    },
    {
      question: 'How do I customize generated scripts for my brand voice?',
      answer: 'Customize by: <strong>adjusting tone/language to match your brand, adding specific product details and benefits, inserting your unique value props, and including brand-specific CTAs</strong>. Use the generated structure and hooks as framework, but personalize the delivery. Think of generators as strategic starting points, not final outputs.'
    }
  ],

  ad_iteration_tool: [
    {
      question: 'What is an ad iteration tool and how does it improve ads?',
      answer: 'An ad iteration tool <strong>analyzes your existing ads and generates optimized versions</strong> with higher conversion potential. It uses a 25-point performance scoring system to identify weaknesses (hook strength, benefit clarity, CTA effectiveness) and creates improved versions in 60 seconds—showing you exactly what to test next.'
    },
    {
      question: 'How does the 25-point ad scoring system work?',
      answer: 'The 25-point system evaluates: <strong>Hook impact (1-5 pts), emotional resonance (1-5 pts), benefit clarity (1-5 pts), CTA strength (1-5 pts), visual direction (1-5 pts), and platform optimization (1-5 pts)</strong>. Ads scoring 20+ typically outperform by 2-3x. The system identifies your biggest opportunities for quick wins.'
    },
    {
      question: 'Can ad analyzers improve TikTok and Meta ads?',
      answer: 'Yes, the best analyzers are <strong>platform-specific and understand each channel\'s unique requirements</strong>. TikTok analysis focuses on native feel and trend integration. Meta analysis emphasizes problem-solution clarity and benefit demonstration. Generic feedback fails—you need platform-optimized recommendations.'
    },
    {
      question: 'Should I iterate my winning ads or focus on new creative?',
      answer: '<strong>Do both</strong>. Iterate winning ads to extend their lifespan (adds 2-4 weeks of performance). Create new angles for fresh testing. Iteration is faster and lower-risk than starting from scratch. Many brands get 3-5 versions from one winner before moving to entirely new concepts.'
    },
    {
      question: 'How often should I iterate my ad creative?',
      answer: 'Iterate when performance drops <strong>15-20% from peak, or proactively every 2-3 weeks</strong> to stay ahead of creative fatigue. Weekly iteration keeps campaigns fresh and prevents the dreaded performance cliff. Best practice: launch new iteration while current ad still performs, ensuring no gap in results.'
    },
    {
      question: 'What&apos;s the difference between ad iteration and A/B testing?',
      answer: '<strong>Iteration creates strategically improved versions</strong> based on framework analysis (better hooks, clearer benefits). A/B testing compares random variations. Iteration is directional improvement. Testing is validation. Do both: iterate to create better versions, then test to confirm improvement before scaling spend.'
    },
    {
      question: 'Can free ad analyzers match paid creative agencies?',
      answer: 'Free analyzers with <strong>AI trained on $250M+ ad performance often outperform junior-level agency feedback</strong>—and deliver in 60 seconds vs 3-5 business days. Agencies add strategic depth and custom creative production. Use free tools for rapid iteration and testing, agencies for major campaigns and brand work.'
    },
    {
      question: 'How do I know if my ad iteration actually improved performance?',
      answer: 'Test the iterated version <strong>head-to-head against your original using 50/50 budget split</strong> for 3-7 days. Look for 15%+ improvement in key metrics (CTR, CPC, CPA, or ROAS). If iteration wins, it becomes your new control. If original wins, try a different iteration angle. Always validate with real spend.'
    }
  ],

  tiktok_script_generator: [
    {
      question: 'What makes TikTok ad scripts different from other platforms?',
      answer: 'TikTok scripts require <strong>ultra-fast hooks (3 seconds max), casual conversational language, trend integration, and native content feel</strong>. Corporate or polished scripts get scrolled past. TikTok&apos;s algorithm and audience expect content that feels organic, not like ads. Platform-specific generators understand these nuances.'
    },
    {
      question: 'How do I make my TikTok ads go viral?',
      answer: 'Viral TikTok ads leverage: <strong>trending sounds/formats, pattern interrupt hooks, native storytelling (not selling), comment-bait elements, and shareability</strong>. Focus on entertainment value first, product second. Use generators trained on viral TikTok content to identify trending structures, then customize for your brand.'
    },
    {
      question: 'Should TikTok ad scripts be different than organic TikTok scripts?',
      answer: '<strong>The best TikTok ads look exactly like organic content</strong>. Use the same hooks, pacing, and storytelling as viral organic posts. The only difference: strategic product integration and clear (but native-feeling) CTA. If viewers can immediately tell it&apos;s an ad, performance suffers. Blend in to stand out.'
    },
    {
      question: 'How long should TikTok ad scripts be?',
      answer: 'TikTok ads perform best at <strong>15-30 seconds for cold traffic, up to 45 seconds for retargeting</strong>. Hook must land in first 3 seconds. Attention drops significantly after 30 seconds for cold audiences. Test shorter (15-20 sec) for awareness, longer (30-45 sec) for conversion-focused campaigns with warm traffic.'
    },
    {
      question: 'Do free TikTok script generators understand TikTok trends?',
      answer: 'The best free generators are <strong>trained on viral TikTok performance data and updated with trending formats</strong>. They understand platform-specific psychology, current content patterns, and native language. Generic generators lack this context. Look for TikTok-specific tools with recent training data for best results.'
    }
  ],

  ugc_script_generator: [
    {
      question: 'What makes UGC scripts different from regular ad scripts?',
      answer: 'UGC scripts prioritize <strong>authentic testimonial feel, natural creator language, conversational delivery, and real person perspective</strong> over polished ad copy. They include filler words, personal stories, and flexible delivery room. Best UGC scripts sound like genuine recommendations, not scripted ads.'
    },
    {
      question: 'Should I send UGC creators word-for-word scripts or guidelines?',
      answer: 'Send <strong>structured guidelines with &quot;must-mention&quot; points</strong>, not word-for-word scripts. Best UGC happens when creators add personality while hitting key messages. Provide: hook options, key benefits to cover, specific product details, and CTA—then let creators deliver naturally. Over-scripted UGC loses authenticity.'
    },
    {
      question: 'How do I find UGC creators to use these scripts?',
      answer: 'Find creators on <strong>platforms like Billo, Aspire, Trend, or directly on TikTok/Instagram</strong>. Look for micro-creators (5K-50K followers) with engagement rates above 3%. Send them your generated script as a creative brief. Budget $150-$500 per creator for 3-5 video variations. Test multiple creators with same script.'
    },
    {
      question: 'Can UGC scripts work across TikTok, Reels, and YouTube Shorts?',
      answer: 'Yes, <strong>UGC scripts are inherently platform-agnostic</strong> because they focus on authentic storytelling, not platform-specific tricks. The same UGC script can work across TikTok, Reels, and Shorts with minimal adaptation. Focus on the testimonial structure, not platform mechanics. Authenticity translates everywhere.'
    },
    {
      question: 'Why do UGC ads perform better than brand-produced ads?',
      answer: 'UGC ads outperform because of <strong>trust through authenticity, pattern interrupt (doesn&apos;t look like an ad), relatable messengers vs brand voices, and social proof of real people</strong>. Studies show UGC ads convert 3-4x better than polished brand ads because they feel like recommendations from friends, not marketing.'
    }
  ],

  saas_brief_generator: [
    {
      question: 'What makes SaaS marketing briefs different from general briefs?',
      answer: 'SaaS briefs require <strong>ICP analysis (not demographics), tech stack context, buying committee mapping, stage-specific positioning (pre-PMF to scale), PLG vs sales-led considerations, and unit economics alignment</strong>. Generic briefs miss the complexity of B2B buying cycles and SaaS business models.'
    },
    {
      question: 'Should SaaS briefs focus on features or benefits?',
      answer: '<strong>Focus on business outcomes, not features</strong>. SaaS buyers care about: revenue impact, time savings, team efficiency, risk reduction. Connect features to specific ROI. Example: Don\'t say "real-time analytics"—say "reduce decision latency from days to minutes, increasing revenue per customer by 15%."'
    },
    {
      question: 'How do SaaS marketing briefs address long sales cycles?',
      answer: 'SaaS briefs must account for <strong>multi-touch attribution, nurture campaigns, and buying committee education</strong>. Include: awareness content (problem education), consideration content (solution comparison), decision content (ROI validation), and customer success content (expansion/retention). Map creative to full funnel, not just top.'
    },
    {
      question: 'What metrics should SaaS marketing briefs include?',
      answer: 'Include: <strong>Target CAC and payback period, MQL to SQL conversion goals, trial-to-paid activation rate, expected LTV:CAC ratio, and channel-specific CPA targets</strong>. Briefs should align creative direction with unit economics so campaigns are profitable from launch, not just high-volume.'
    },
    {
      question: 'Should early-stage SaaS companies use the same briefs as growth-stage?',
      answer: 'No. <strong>Pre-PMF companies focus on value prop testing and ICP validation. Post-PMF focus on scaling proven channels</strong>. Early-stage briefs emphasize learning and iteration. Growth-stage briefs optimize efficiency. Use stage-appropriate generators that understand where you are in the journey.'
    }
  ]
};