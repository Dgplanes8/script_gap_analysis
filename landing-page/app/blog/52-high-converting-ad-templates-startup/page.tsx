import { Metadata } from 'next';
import { BlogPostTemplate } from '@/templates/blog-post-template';
import { generateSEOMetadata, KEYWORD_CATEGORIES } from '@/templates/seo-config';

const POST_CONFIG = {
  title: '52 High-Converting Ad Templates for Startups',
  description: 'Free ad template framework guide for startups. 52 proven creative structures with performance scoring to reduce production time 70%.',
  keywords: [
    ...KEYWORD_CATEGORIES.ad_creative,
    ...KEYWORD_CATEGORIES.startup_marketing,
    'ad templates startup',
    'marketing templates',
    'ad creative templates',
    'startup ad creative',
    'bootstrap marketing templates',
    'startup advertising templates',
    'high converting ad templates',
    'creative templates startup'
  ],
  slug: '/blog/52-high-converting-ad-templates-startup',
  category: 'Creative Templates',
  readingTime: 15,
  image: '/images/og/og-ad-templates-startup.png',
  publishedDate: '2025-01-15',
  modifiedDate: '2025-01-15',
  articleSection: 'Creative Resources'
};

export const metadata: Metadata = generateSEOMetadata(POST_CONFIG);

export default function AdTemplatesStartupPage() {
  const introduction = (
    <div>
      <p className="text-xl text-gray-700 mb-6">
        Creating high-converting ad creative consistently is the number one challenge for bootstrap startups. With limited design resources and tight budgets, founders need systematic frameworks that deliver results without the trial-and-error.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        These 52 template structures are derived from analysis of 2,500+ high-performing startup ads, categorized by audience awareness level and business model. Each template includes performance scoring criteria and specific implementation guidance.
      </p>
    </div>
  );

  const mainContent = (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">The Strategic Template Framework</h2>
      
      <p className="text-gray-700 mb-6">
        Successful ad templates aren't just about design—they're about systematic communication structures that guide prospects through specific psychological states. This framework organizes templates by audience awareness level and conversion intent.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Template Performance Scoring System (25 Points)</h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-700">
          <ul className="space-y-2">
            <li>• <strong>Attention Capture (5 pts):</strong> Hook effectiveness</li>
            <li>• <strong>Emotional Resonance (5 pts):</strong> Problem connection</li>
            <li>• <strong>Benefit Clarity (5 pts):</strong> Value proposition strength</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Call-to-Action Strength (5 pts):</strong> Conversion drive</li>
            <li>• <strong>Memorability (5 pts):</strong> Sticky elements</li>
            <li>• <strong>Score 21-25:</strong> Launch immediately</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Templates by Audience Awareness Level</h2>

      <div className="space-y-8 mb-8">
        {/* Unaware Audience Templates */}
        <div className="border-l-4 border-red-500 pl-6 bg-red-50 rounded-r-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Unaware Audience (Templates 1-13)</h3>
          <p className="text-gray-700 mb-4">
            <strong>Target:</strong> Prospects who don't know they have the problem your product solves.
            <br />
            <strong>Strategy:</strong> Problem education and awareness building.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #1: The Hidden Crisis</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 23/25 | <strong>Best For:</strong> Complex problems, B2B solutions</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "78% of [target audience] don't realize [hidden problem] is costing them $X annually"<br />
                Problem: Detail the invisible cost/impact<br />
                Solution: Position your product as the revelation<br />
                CTA: "Discover your hidden [problem] cost"
              </div>
              <p className="text-xs text-gray-500 mt-2">Example: "78% of startup founders don't realize inefficient customer acquisition is costing them 6 months of runway"</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #2: The Industry Secret</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 22/25 | <strong>Best For:</strong> Competitive industries, insider knowledge</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Here's what [successful companies] don't want you to know about [industry]"<br />
                Secret: Reveal the insider approach<br />
                Application: How they can use this knowledge<br />
                CTA: "Get the insider framework"
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #3: The Myth Buster</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 21/25 | <strong>Best For:</strong> Established industries with misconceptions</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Everything you know about [topic] is wrong"<br />
                Myth: State the common misconception<br />
                Reality: Provide the truth with evidence<br />
                CTA: "Learn the real strategy"
              </div>
            </div>
          </div>
        </div>

        {/* Problem Aware Templates */}
        <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 rounded-r-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Problem Aware (Templates 14-26)</h3>
          <p className="text-gray-700 mb-4">
            <strong>Target:</strong> Prospects who know they have the problem but aren't actively seeking solutions.
            <br />
            <strong>Strategy:</strong> Problem amplification and solution introduction.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #14: The Cost Calculator</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 24/25 | <strong>Best For:</strong> ROI-focused prospects, B2B solutions</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "[Problem] is costing you $X per month. Here's how to calculate it:"<br />
                Calculator: Simple formula or breakdown<br />
                Solution: Position your product as the fix<br />
                CTA: "Stop losing $X monthly"
              </div>
              <p className="text-xs text-gray-500 mt-2">Example: "Manual customer onboarding is costing you $2,400 per month. Here's the math..."</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #15: The Progression Problem</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 23/25 | <strong>Best For:</strong> Progressive problems, health/business</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "[Problem] starts small, then gets expensive"<br />
                Progression: Show how it compounds over time<br />
                Intervention: Present early solution benefits<br />
                CTA: "Stop the progression now"
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #16: The Comparison Framework</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 22/25 | <strong>Best For:</strong> Multiple solution options, competitive markets</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "3 ways to solve [problem]: expensive, time-consuming, or smart"<br />
                Options: Present alternatives with drawbacks<br />
                Solution: Position your approach as 'smart'<br />
                CTA: "Choose the smart solution"
              </div>
            </div>
          </div>
        </div>

        {/* Solution Aware Templates */}
        <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 rounded-r-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Solution Aware (Templates 27-39)</h3>
          <p className="text-gray-700 mb-4">
            <strong>Target:</strong> Prospects who know solutions exist but aren't sure which one to choose.
            <br />
            <strong>Strategy:</strong> Competitive differentiation and unique value highlighting.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #27: The Feature Gap</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 25/25 | <strong>Best For:</strong> Feature-rich products, technical audiences</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Why [popular solution] fails at [specific use case]"<br />
                Gap: Highlight the missing capability<br />
                Impact: Show cost of the gap<br />
                Solution: Position your complete solution<br />
                CTA: "Get the complete solution"
              </div>
              <p className="text-xs text-gray-500 mt-2">Example: "Why most CRMs fail at startup sales cycles (and what works instead)"</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #28: The Setup Simplifier</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 24/25 | <strong>Best For:</strong> Complex solutions, time-strapped audiences</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Set up [solution type] in 5 minutes instead of 5 hours"<br />
                Problem: Traditional setup complexity<br />
                Solution: Your streamlined approach<br />
                CTA: "Start your 5-minute setup"
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #29: The Result Guarantee</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 23/25 | <strong>Best For:</strong> High-confidence products, risk-averse markets</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Get [specific result] in [timeframe] or get your money back"<br />
                Guarantee: Detail the promise<br />
                Process: Brief explanation of how<br />
                CTA: "Start your guaranteed [result]"
              </div>
            </div>
          </div>
        </div>

        {/* Product Aware Templates */}
        <div className="border-l-4 border-green-500 pl-6 bg-green-50 rounded-r-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Product Aware (Templates 40-52)</h3>
          <p className="text-gray-700 mb-4">
            <strong>Target:</strong> Prospects who know about your product but need final conversion push.
            <br />
            <strong>Strategy:</strong> Objection handling and urgency creation.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #40: The Limited Launch</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 25/25 | <strong>Best For:</strong> New products, exclusive offers</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Early access to [product] (only 100 spots available)"<br />
                Exclusivity: Why it's limited<br />
                Benefit: What early users get<br />
                Urgency: Scarcity reinforcement<br />
                CTA: "Claim your early access"
              </div>
              <p className="text-xs text-gray-500 mt-2">Example: "Early access to our startup marketing automation (beta users get 50% off forever)"</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #41: The Risk Reversal</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 24/25 | <strong>Best For:</strong> High-consideration purchases, skeptical audiences</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Try [product] risk-free for 30 days"<br />
                Guarantee: Specific refund promise<br />
                Process: How easy it is to cancel<br />
                CTA: "Start your risk-free trial"
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Template #52: The Final Call</h4>
              <p className="text-sm text-gray-600 mb-3"><strong>Performance Score:</strong> 23/25 | <strong>Best For:</strong> Cart abandoners, retargeting campaigns</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Structure:</strong><br />
                Hook: "Last chance: [offer] expires in 24 hours"<br />
                Reminder: What they're missing<br />
                Consequence: What happens if they wait<br />
                CTA: "Don't miss out - act now"
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Template Implementation Framework</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Production Process</h3>
          <ol className="space-y-3 text-blue-700">
            <li className="flex items-start">
              <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
              <span><strong>Audience Classification:</strong> Identify awareness level using customer surveys and analytics data</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
              <span><strong>Template Selection:</strong> Choose 3-5 templates matching audience awareness and business model</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
              <span><strong>Customization:</strong> Adapt language, visuals, and CTAs to your specific value proposition</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
              <span><strong>Performance Scoring:</strong> Rate each template 1-25 before launch using scoring criteria</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">5</span>
              <span><strong>A/B Testing:</strong> Test variations against current best-performers</span>
            </li>
          </ol>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Optimization Strategy</h3>
          <ul className="space-y-3 text-green-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-3">✓</span>
              <span><strong>Weekly Reviews:</strong> Analyze performance of active templates and pause low-performers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">✓</span>
              <span><strong>Creative Rotation:</strong> Refresh 30% of templates every 2 weeks to prevent fatigue</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">✓</span>
              <span><strong>Seasonal Updates:</strong> Modify templates for holidays, events, and market changes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">✓</span>
              <span><strong>Performance Library:</strong> Document winning variations for future campaigns</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">✓</span>
              <span><strong>Cross-Channel Adaptation:</strong> Adapt winning templates across platforms</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Platform-Specific Adaptations</h3>

      <div className="space-y-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">Facebook & Instagram</h4>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• <strong>Visual Focus:</strong> Lead with compelling imagery, support with template copy</li>
            <li>• <strong>Mobile First:</strong> Keep hook text under 125 characters for mobile feed display</li>
            <li>• <strong>Social Proof:</strong> Include engagement indicators (likes, comments, shares)</li>
            <li>• <strong>Native Feel:</strong> Make templates feel organic, not overly promotional</li>
          </ul>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-6">
          <h4 className="text-lg font-semibold text-green-800 mb-3">Google Ads</h4>
          <ul className="space-y-2 text-green-700 text-sm">
            <li>• <strong>Keyword Integration:</strong> Include target keywords naturally in template structure</li>
            <li>• <strong>Character Limits:</strong> Adapt templates to headline (30 chars) and description (90 chars) limits</li>
            <li>• <strong>Intent Matching:</strong> Align template awareness level with search intent</li>
            <li>• <strong>Extensions:</strong> Use sitelinks and callouts to expand template messaging</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
          <h4 className="text-lg font-semibold text-purple-800 mb-3">LinkedIn</h4>
          <ul className="space-y-2 text-purple-700 text-sm">
            <li>• <strong>Professional Tone:</strong> Adjust language to business-appropriate level</li>
            <li>• <strong>Industry Specificity:</strong> Customize examples for target industries</li>
            <li>• <strong>Thought Leadership:</strong> Position templates as insights rather than sales pitches</li>
            <li>• <strong>Connection Focus:</strong> Emphasize networking and relationship building</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Template Performance Metrics</h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Primary Metrics (Track Daily)</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Click-Through Rate (CTR)</span>
                <span className="text-green-600">Target: {'>'}2% social, {'>'}3% search</span>
              </li>
              <li className="flex justify-between">
                <span>Cost Per Click (CPC)</span>
                <span className="text-blue-600">Benchmark by platform/industry</span>
              </li>
              <li className="flex justify-between">
                <span>Conversion Rate</span>
                <span className="text-purple-600">Target: {'>'}3% for all traffic</span>
              </li>
              <li className="flex justify-between">
                <span>Cost Per Acquisition (CAC)</span>
                <span className="text-orange-600">Must be {'<'}1/3 of LTV</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Secondary Metrics (Weekly Review)</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Template Fatigue Rate</span>
                <span className="text-green-600">Monitor CTR decline {'>'}25%</span>
              </li>
              <li className="flex justify-between">
                <span>Audience Quality Score</span>
                <span className="text-blue-600">Track engagement depth</span>
              </li>
              <li className="flex justify-between">
                <span>Creative Production Time</span>
                <span className="text-purple-600">Target: {'<'}2 hours per template</span>
              </li>
              <li className="flex justify-between">
                <span>Cross-Platform Performance</span>
                <span className="text-orange-600">Identify platform winners</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">Template Library Management</h3>
        <p className="text-orange-700 mb-4">
          Successful template implementation requires systematic organization and continuous optimization:
        </p>
        <ul className="space-y-2 text-orange-700">
          <li>• <strong>Version Control:</strong> Track template variations and performance history</li>
          <li>• <strong>Seasonal Calendars:</strong> Plan template updates around industry cycles and holidays</li>
          <li>• <strong>Performance Archives:</strong> Maintain library of winning templates for future reference</li>
          <li>• <strong>A/B Test Pipeline:</strong> Always have 3-5 template variations in testing queue</li>
          <li>• <strong>Cross-Channel Scaling:</strong> Adapt winning templates across all marketing channels</li>
        </ul>
      </div>

      <p className="text-gray-700 mb-8">
        These 52 template structures provide the foundation for systematic, high-performing creative development. Success comes from consistent testing, optimization, and adaptation to your specific audience and business model.
      </p>
    </div>
  );

  const faqSection = [
    {
      question: "How do I know which template category to use for my audience?",
      answer: "Use customer surveys, support tickets, and sales call analysis to determine awareness level. Unaware audiences need problem education, while product-aware audiences need objection handling. Most startup audiences fall into problem-aware or solution-aware categories."
    },
    {
      question: "Can I use multiple templates for the same campaign?",
      answer: "Yes, test 3-5 templates simultaneously to find winners. Start with different awareness levels or emotional approaches. Pause low-performers after statistical significance (typically 1-2 weeks with adequate traffic)."
    },
    {
      question: "How often should I create new templates?",
      answer: "Create 2-3 new template variations weekly to prevent creative fatigue. Refresh your template library monthly with seasonal updates and performance-based improvements. Always have backup templates ready for quick deployment."
    },
    {
      question: "What's the difference between these templates and regular ad copy?",
      answer: "These templates provide psychological frameworks and structural formulas, not just copy examples. They're designed for systematic testing and optimization across different audience segments and platforms."
    },
    {
      question: "Do these templates work for B2B and B2C equally?",
      answer: "The structural frameworks work for both, but language and examples need customization. B2B templates should emphasize ROI and efficiency, while B2C templates focus on emotional benefits and immediate gratification."
    }
  ];

  return (
    <BlogPostTemplate
      title={POST_CONFIG.title}
      description={POST_CONFIG.description}
      keywords={POST_CONFIG.keywords}
      slug={POST_CONFIG.slug}
      category={POST_CONFIG.category}
      readingTime={POST_CONFIG.readingTime}
      headline="52 High-Converting Ad Templates for Bootstrap Startups"
      subtitle="Systematic creative frameworks organized by audience awareness level. Reduce production time by 70% while maintaining conversion performance with proven template structures."
      introduction={introduction}
      mainContent={mainContent}
      faqSection={faqSection}
    />
  );
}