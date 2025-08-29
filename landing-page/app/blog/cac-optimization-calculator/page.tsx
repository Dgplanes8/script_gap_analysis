import { Metadata } from 'next';
import { BlogPostTemplate } from '@/templates/blog-post-template';
import { generateSEOMetadata, KEYWORD_CATEGORIES } from '@/templates/seo-config';
import { CACOptimizationCalculator } from '@/components/calculators/cac-optimization-calculator';

const POST_CONFIG = {
  title: 'CAC Optimization Calculator: Reduce Customer Acquisition Costs by 40%',
  description: 'Free CAC optimization calculator for startups. Analyze acquisition costs, identify improvement opportunities, and optimize channel performance instantly.',
  keywords: [
    ...KEYWORD_CATEGORIES.budget_optimization,
    ...KEYWORD_CATEGORIES.startup_marketing,
    ...KEYWORD_CATEGORIES.tools_calculators,
    'CAC calculator',
    'customer acquisition cost optimization',
    'startup CAC reduction',
    'CAC optimization tool',
    'customer acquisition cost calculator',
    'startup metrics calculator',
    'marketing efficiency calculator'
  ],
  slug: '/blog/cac-optimization-calculator',
  category: 'Performance Marketing',
  readingTime: 11
};

export const metadata: Metadata = generateSEOMetadata(POST_CONFIG);

export default function CACOptimizationCalculatorPage() {
  const introduction = (
    <div>
      <p className="text-xl text-gray-700 mb-6">
        Customer Acquisition Cost (CAC) optimization is critical for startup survival. With 78% of startups failing due to inefficient unit economics, reducing CAC by just 20% can extend runway by 6+ months.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        This comprehensive calculator analyzes your current CAC across channels, identifies optimization opportunities, and provides actionable strategies to reduce acquisition costs while maintaining growth velocity.
      </p>
    </div>
  );

  const mainContent = (
    <div>
      {/* Interactive Calculator Section */}
      <section className="my-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            CAC Optimization Calculator
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Analyze your customer acquisition costs, identify inefficiencies, and get specific optimization recommendations.
          </p>
          <CACOptimizationCalculator />
        </div>
      </section>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding CAC Optimization</h2>
      
      <p className="text-gray-700 mb-6">
        Customer Acquisition Cost represents the total cost of convincing a potential customer to buy your product or service. For startups, CAC optimization isn't just about reducing costs—it's about finding the optimal balance between acquisition speed, cost efficiency, and customer quality.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. CAC Calculation Framework</h3>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">Complete CAC Formula:</h4>
        <div className="bg-white rounded-lg p-4 mb-4">
          <code className="text-blue-600 text-lg">
            CAC = (Marketing Spend + Sales Costs + Technology Costs) / New Customers Acquired
          </code>
        </div>
        <div className="space-y-2 text-blue-700">
          <p><strong>Marketing Spend:</strong> Paid ads, content creation, events, PR</p>
          <p><strong>Sales Costs:</strong> Sales team salaries, commissions, tools, travel</p>
          <p><strong>Technology Costs:</strong> Marketing automation, CRM, analytics tools</p>
          <p><strong>Time Period:</strong> Typically calculated monthly or quarterly</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. CAC Benchmarks by Industry</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">SaaS & Software</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between">
              <span>SMB SaaS ($10-$100 MRR)</span>
              <span className="font-semibold">$50-$200</span>
            </li>
            <li className="flex justify-between">
              <span>Mid-Market ($100-$1K MRR)</span>
              <span className="font-semibold">$200-$1,000</span>
            </li>
            <li className="flex justify-between">
              <span>Enterprise (>$1K MRR)</span>
              <span className="font-semibold">$1,000-$10,000</span>
            </li>
            <li className="flex justify-between border-t pt-2">
              <span>Target LTV:CAC Ratio</span>
              <span className="font-semibold text-green-600">3:1 minimum</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">E-commerce & Consumer</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between">
              <span>Fashion & Apparel</span>
              <span className="font-semibold">$20-$80</span>
            </li>
            <li className="flex justify-between">
              <span>Health & Beauty</span>
              <span className="font-semibold">$30-$120</span>
            </li>
            <li className="flex justify-between">
              <span>Food & Beverage</span>
              <span className="font-semibold">$15-$60</span>
            </li>
            <li className="flex justify-between border-t pt-2">
              <span>Target LTV:CAC Ratio</span>
              <span className="font-semibold text-green-600">4:1 minimum</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Channel-Specific CAC Optimization</h3>

      <div className="space-y-6 mb-8">
        <div className="border-l-4 border-blue-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Paid Social Media (Facebook, Instagram, LinkedIn)</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>Optimization Levers:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Creative refresh cycles (prevent fatigue)</li>
              <li>• Audience targeting refinement</li>
              <li>• Bid strategy optimization</li>
              <li>• Landing page conversion improvements</li>
              <li>• Funnel friction reduction</li>
            </ul>
            <p className="text-sm text-blue-600 mt-2">Average CAC reduction potential: 25-40%</p>
          </div>
        </div>
        
        <div className="border-l-4 border-green-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Search Engine Marketing (Google, Bing)</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>Optimization Levers:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Keyword intent alignment</li>
              <li>• Ad copy performance testing</li>
              <li>• Quality Score improvements</li>
              <li>• Negative keyword optimization</li>
              <li>• Geographic and temporal targeting</li>
            </ul>
            <p className="text-sm text-green-600 mt-2">Average CAC reduction potential: 30-50%</p>
          </div>
        </div>
        
        <div className="border-l-4 border-purple-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Content Marketing & SEO</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>Optimization Levers:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Content topic optimization for conversion intent</li>
              <li>• SEO technical improvements</li>
              <li>• Content distribution strategy</li>
              <li>• Lead magnet conversion optimization</li>
              <li>• Email nurture sequence improvements</li>
            </ul>
            <p className="text-sm text-purple-600 mt-2">Average CAC reduction potential: 40-60%</p>
          </div>
        </div>
        
        <div className="border-l-4 border-orange-500 pl-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Email Marketing & Automation</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>Optimization Levers:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Segmentation and personalization</li>
              <li>• Send time optimization</li>
              <li>• Subject line and content testing</li>
              <li>• Automation workflow improvements</li>
              <li>• Re-engagement campaign optimization</li>
            </ul>
            <p className="text-sm text-orange-600 mt-2">Average CAC reduction potential: 20-35%</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. The 40% CAC Reduction Framework</h3>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-green-800 mb-4">Systematic Optimization Approach:</h4>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Phase 1: Audit & Baseline (Week 1-2)</h5>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Calculate current CAC by channel and campaign</li>
              <li>• Identify highest-volume, highest-CAC channels</li>
              <li>• Analyze customer quality metrics (LTV, retention, engagement)</li>
              <li>• Map customer journey conversion points and friction</li>
              <li>• Document current attribution model and tracking setup</li>
            </ul>
            <div className="mt-2 text-xs text-green-700 bg-green-100 rounded p-2">
              Target: Complete visibility into CAC drivers and customer quality by channel
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Phase 2: Quick Wins Implementation (Week 3-4)</h5>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Pause or reduce budget on worst-performing campaigns</li>
              <li>• Optimize landing pages for top-traffic campaigns</li>
              <li>• Implement basic conversion tracking improvements</li>
              <li>• Add negative keywords and audience exclusions</li>
              <li>• Test new creative formats on best-performing channels</li>
            </ul>
            <div className="mt-2 text-xs text-green-700 bg-green-100 rounded p-2">
              Target: 10-15% CAC reduction through low-effort optimizations
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Phase 3: Strategic Optimization (Week 5-8)</h5>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Implement advanced attribution modeling</li>
              <li>• Launch systematic A/B testing program</li>
              <li>• Develop channel-specific optimization strategies</li>
              <li>• Create automated bidding and budget rules</li>
              <li>• Build predictive CAC modeling system</li>
            </ul>
            <div className="mt-2 text-xs text-green-700 bg-green-100 rounded p-2">
              Target: Additional 15-20% CAC reduction through systematic improvements
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Phase 4: Advanced Optimization (Week 9-12)</h5>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Implement customer lifetime value optimization</li>
              <li>• Launch referral and retention programs</li>
              <li>• Develop predictive customer scoring models</li>
              <li>• Create cross-channel attribution system</li>
              <li>• Build automated optimization workflows</li>
            </ul>
            <div className="mt-2 text-xs text-green-700 bg-green-100 rounded p-2">
              Target: Final 10-15% CAC reduction through advanced strategies
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Common CAC Optimization Mistakes</h3>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-red-800 mb-4">Avoid These Critical Errors:</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-red-500 mr-3 text-lg">✗</span>
            <div>
              <h5 className="font-semibold text-red-800">Optimizing for CAC Instead of Unit Economics</h5>
              <p className="text-red-700 text-sm">Low CAC with poor customer quality destroys long-term value. Focus on CAC:LTV ratio optimization.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-red-500 mr-3 text-lg">✗</span>
            <div>
              <h5 className="font-semibold text-red-800">Making Changes Without Statistical Significance</h5>
              <p className="text-red-700 text-sm">Require 95% confidence and 2+ weeks data before making optimization decisions.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-red-500 mr-3 text-lg">✗</span>
            <div>
              <h5 className="font-semibold text-red-800">Ignoring Customer Journey Attribution</h5>
              <p className="text-red-700 text-sm">Last-click attribution misallocates credit. Use multi-touch attribution for accurate CAC calculation.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="text-red-500 mr-3 text-lg">✗</span>
            <div>
              <h5 className="font-semibold text-red-800">Cutting Budget on Learning Channels</h5>
              <p className="text-red-700 text-sm">New channels need 90+ days to optimize. Premature budget cuts prevent finding scalable channels.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced CAC Optimization Strategies</h2>

      <div className="space-y-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Cohort-Based CAC Analysis</h3>
          <p className="text-blue-700 mb-4">
            Analyze CAC performance by customer cohorts (acquisition month, channel, campaign) to identify patterns and optimization opportunities.
          </p>
          <ul className="space-y-1 text-blue-700">
            <li>• Track CAC trends by acquisition month</li>
            <li>• Compare customer quality across cohorts</li>
            <li>• Identify seasonal CAC patterns</li>
            <li>• Measure long-term payback periods</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Predictive CAC Modeling</h3>
          <p className="text-purple-700 mb-4">
            Use historical data to predict future CAC trends and optimize budget allocation proactively.
          </p>
          <ul className="space-y-1 text-purple-700">
            <li>• Seasonal adjustment factors</li>
            <li>• Competitive impact modeling</li>
            <li>• Budget scaling efficiency curves</li>
            <li>• Market saturation indicators</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Cross-Channel Attribution Optimization</h3>
          <p className="text-green-700 mb-4">
            Optimize budget allocation based on true multi-touch customer journeys rather than last-click attribution.
          </p>
          <ul className="space-y-1 text-green-700">
            <li>• Implement data-driven attribution models</li>
            <li>• Track assisted conversions and view-through impacts</li>
            <li>• Optimize for customer journey efficiency</li>
            <li>• Balance brand and performance marketing investments</li>
          </ul>
        </div>
      </div>

      <p className="text-gray-700 mb-8">
        CAC optimization is an ongoing process, not a one-time fix. Successful startups review CAC performance weekly, implement optimization tests monthly, and conduct comprehensive audits quarterly to maintain efficient growth.
      </p>
    </div>
  );

  const faqSection = [
    {
      question: "What's a good CAC for a startup?",
      answer: "A good CAC depends on your LTV. Target a 3:1 LTV:CAC ratio minimum for SaaS (ideally 5:1+) and 4:1 for e-commerce. CAC should be recoverable within 12-18 months for SaaS and 6-12 months for consumer businesses."
    },
    {
      question: "How quickly can I reduce my CAC?",
      answer: "Quick wins (10-15% reduction) can be achieved in 2-4 weeks through campaign optimization and landing page improvements. Systematic optimization typically delivers 25-40% reduction over 8-12 weeks with proper implementation."
    },
    {
      question: "Should I focus on reducing CAC or increasing LTV?",
      answer: "Both are important, but focus depends on your current metrics. If CAC payback period >18 months, prioritize CAC reduction. If customers churn quickly, focus on LTV improvement through retention and upselling."
    },
    {
      question: "How do I calculate CAC for organic channels?",
      answer: "Include all costs: content creation, SEO tools, staff time, and technology costs. Divide by customers acquired through organic channels. Even 'free' channels have real costs that should be tracked."
    },
    {
      question: "When should I pause a high-CAC channel?",
      answer: "Pause when CAC exceeds LTV (negative unit economics) or payback period exceeds 24 months. For new channels, give 90+ days to optimize before making permanent decisions."
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
      headline="CAC Optimization Calculator"
      subtitle="Systematic framework to reduce customer acquisition costs by 40% while maintaining growth velocity and customer quality."
      introduction={introduction}
      mainContent={mainContent}
      faqSection={faqSection}
    />
  );
}