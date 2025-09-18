import { Metadata } from 'next';
import { BlogPostTemplate } from '@/templates/blog-post-template';
import { generateSEOMetadata, KEYWORD_CATEGORIES } from '@/templates/seo-config';
import { MarketingBudgetCalculator } from '@/components/calculators/marketing-budget-calculator';

const POST_CONFIG = {
  title: 'Home Services Marketing Budget Calculator: What 90% of Contractors Get Wrong',
  description: 'Free marketing budget calculator for home services contractors. Discover why 90% of contractors waste money and get our proven budget allocation framework from $250MM+ managed campaigns.',
  keywords: [
    ...KEYWORD_CATEGORIES.budget_optimization,
    ...KEYWORD_CATEGORIES.tools_calculators,
    'home services marketing budget',
    'contractor marketing calculator',
    'plumbing advertising budget',
    'HVAC marketing budget',
    'roofing advertising spend',
    'home improvement marketing',
    'service business marketing budget',
    'contractor advertising budget calculator',
    'home services advertising spend',
    'local business marketing budget'
  ],
  slug: '/blog/home-services-marketing-budget-guide-contractors',
  category: 'Service Business Marketing',
  readingTime: 14,
  image: '/images/og/og-home-services-marketing-budget.png',
  publishedDate: '2025-01-15',
  modifiedDate: '2025-01-15',
  articleSection: 'Marketing Tools'
};

export const metadata: Metadata = generateSEOMetadata(POST_CONFIG);

export default function HomeServicesMarketingBudgetPage() {
  const faqData = [
    {
      question: "What percentage of revenue should home services companies spend on marketing?",
      answer: "Home services companies typically allocate 5-12% of revenue to marketing, with newer businesses investing up to 20%. Based on our analysis of $250MM+ in campaigns, the sweet spot is 8-10% for established contractors and 12-15% for growth-focused businesses."
    },
    {
      question: "How much should I spend on Google Ads vs Facebook Ads for my contracting business?",
      answer: "For home services, we recommend 60-70% of digital ad spend on Google Ads (high intent searches) and 20-30% on Facebook/Instagram (brand awareness and retargeting). The remaining 10-20% should test other platforms like Nextdoor or LinkedIn for commercial clients."
    },
    {
      question: "What's the biggest budget mistake contractors make?",
      answer: "The #1 mistake is not tracking cost per acquisition (CPA) by service type. Many contractors spend equally on all services, but our data shows emergency services typically convert 3x better than planned work. This misallocation can waste 40% of your budget."
    },
    {
      question: "Should I hire a marketing agency or do it myself with a smaller budget?",
      answer: "If your monthly marketing budget is under $3,000, start with DIY using proven templates and frameworks. Above $5,000/month, agencies become cost-effective. Between $3,000-$5,000, consider hybrid approaches with our strategic guidance plus your execution."
    },
    {
      question: "How do I calculate ROI for my home services marketing?",
      answer: "Track Customer Lifetime Value (CLV) vs Customer Acquisition Cost (CAC). For home services, aim for a 4:1 CLV to CAC ratio minimum. Factor in repeat business and referrals - many contractors undervalue these, making profitable campaigns look unprofitable."
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
      headline="Home Services Marketing Budget Calculator: What 90% of Contractors Get Wrong"
      subtitle="Discover the proven budget allocation framework from $250MM+ in managed campaigns that helps contractors maximize ROI and stop wasting money on ineffective channels."
      introduction={
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-3">⚠️ The $50,000 Budget Mistake</h3>
            <p className="text-red-700 leading-relaxed">
              Last month, a roofing contractor showed us his marketing dashboard. He'd spent $4,200 on Facebook ads with zero leads, 
              $3,800 on Google Ads getting low-quality calls, and $1,500 on a "marketing guru's" course that taught outdated tactics. 
              <strong className="block mt-2">Total waste: $9,500 in one month. $114,000 annually.</strong>
            </p>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            After analyzing over <strong>$250 million in managed media spend</strong> across 1,200+ home services campaigns, 
            we've identified the exact budget allocation framework that separates profitable contractors from those burning cash.
          </p>
          
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-brand-800 mb-2">What You'll Get In This Guide:</h3>
            <ul className="text-brand-700 space-y-2">
              <li>✅ Interactive budget calculator with industry benchmarks</li>
              <li>✅ The 60/20/20 allocation rule that works for 89% of contractors</li>
              <li>✅ Service-specific budget recommendations (plumbing vs roofing vs HVAC)</li>
              <li>✅ ROI tracking templates to measure what actually works</li>
              <li>✅ Emergency vs planned work budget split strategies</li>
            </ul>
          </div>
        </div>
      }
      mainContent={
        <div className="space-y-12">
          {/* Budget Calculator Section */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Home Services Marketing Budget Calculator</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Calculate your optimal marketing budget allocation based on your revenue, service types, and growth goals. 
                This calculator uses data from $250MM+ in managed campaigns.
              </p>
            </div>
            <MarketingBudgetCalculator />
          </section>

          {/* The 90% Mistake Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Why 90% of Contractors Waste Their Marketing Budget</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">❌ What Most Contractors Do</h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Split budget equally across all services</li>
                  <li>• Chase the cheapest cost-per-click</li>
                  <li>• Ignore customer lifetime value</li>
                  <li>• Set budgets based on "gut feeling"</li>
                  <li>• Don't track cost per acquisition by service</li>
                  <li>• Focus on vanity metrics (impressions, clicks)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">✅ What Top 10% Do Instead</h3>
                <ul className="space-y-3 text-green-700">
                  <li>• Allocate based on service profitability</li>
                  <li>• Optimize for customer acquisition cost</li>
                  <li>• Factor in repeat business value</li>
                  <li>• Use data-driven budget decisions</li>
                  <li>• Track ROI by service and channel</li>
                  <li>• Focus on revenue and profit metrics</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Real Example: HVAC Company Budget Optimization</h3>
              <p className="text-gray-700 mb-4">
                A Dallas HVAC company was spending $6,000/month equally across heating repair, AC installation, and maintenance contracts. 
                After analyzing their data, we discovered:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <strong>Emergency Repairs:</strong><br/>
                  $180 avg ticket, 8.5% conversion<br/>
                  <span className="text-green-600">$21 CAC → $159 profit</span>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <strong>AC Installation:</strong><br/>
                  $5,200 avg ticket, 2.1% conversion<br/>
                  <span className="text-green-600">$95 CAC → $5,105 profit</span>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <strong>Maintenance:</strong><br/>
                  $120 avg ticket, 12% conversion<br/>
                  <span className="text-orange-600">$45 CAC → $75 profit</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Result:</strong> We shifted 60% of budget to emergency repairs and installations, 
                increasing total profit by $18,400/month while reducing overall ad spend by $800.
              </p>
            </div>
          </section>

          {/* The 60/20/20 Framework */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">The Proven 60/20/20 Budget Allocation Framework</h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              After analyzing 1,200+ home services campaigns, this allocation framework consistently delivers 
              the highest ROI for contractors across all service types.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-800">60%</div>
                  <h3 className="text-xl font-semibold text-blue-800">High-Intent Channels</h3>
                </div>
                <ul className="space-y-2 text-blue-700">
                  <li>• Google Ads (Search)</li>
                  <li>• Google Local Services</li>
                  <li>• Bing Ads</li>
                  <li>• SEO investment</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <strong>Why 60%:</strong> People searching "emergency plumber" or "AC repair near me" 
                  have immediate intent and convert 6-8x higher than cold traffic.
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-800">20%</div>
                  <h3 className="text-xl font-semibold text-green-800">Brand & Retargeting</h3>
                </div>
                <ul className="space-y-2 text-green-700">
                  <li>• Facebook/Instagram Ads</li>
                  <li>• Retargeting campaigns</li>
                  <li>• YouTube advertising</li>
                  <li>• Content marketing</li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <strong>Why 20%:</strong> Builds brand awareness for future needs and captures 
                  people who visited your site but didn't call immediately.
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-800">20%</div>
                  <h3 className="text-xl font-semibold text-purple-800">Testing & Innovation</h3>
                </div>
                <ul className="space-y-2 text-purple-700">
                  <li>• New platform testing</li>
                  <li>• Creative experiments</li>
                  <li>• Seasonal campaigns</li>
                  <li>• Referral programs</li>
                </ul>
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <strong>Why 20%:</strong> Discovers new profitable channels and stays ahead 
                  of market changes without risking your core budget.
                </div>
              </div>
            </div>
          </section>

          {/* Service-Specific Recommendations */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Service-Specific Budget Recommendations</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🔧 Plumbing Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Budget Allocation:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Emergency repairs: 45%</li>
                      <li>• Water heater replacement: 25%</li>
                      <li>• Drain cleaning: 20%</li>
                      <li>• New construction: 10%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Metrics:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Target CAC: $25-45</li>
                      <li>• Avg ticket: $180-450</li>
                      <li>• Peak hours: 6-10am, 5-9pm</li>
                      <li>• Seasonal: +30% winter</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🏠 Roofing Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Budget Allocation:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Storm damage: 35%</li>
                      <li>• Roof replacement: 30%</li>
                      <li>• Repairs: 25%</li>
                      <li>• Maintenance: 10%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Metrics:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Target CAC: $150-300</li>
                      <li>• Avg ticket: $8,500-15,000</li>
                      <li>• Weather dependent</li>
                      <li>• Long sales cycle (30-90 days)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">❄️ HVAC Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Budget Allocation:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Emergency repairs: 40%</li>
                      <li>• System replacement: 35%</li>
                      <li>• Maintenance: 15%</li>
                      <li>• Tune-ups: 10%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Metrics:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Target CAC: $45-120</li>
                      <li>• Avg ticket: $280-6,500</li>
                      <li>• Seasonal peaks: Summer/Winter</li>
                      <li>• High repeat business value</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ROI Tracking Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">How to Track ROI Like the Top 10%</h2>
            
            <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-brand-800 mb-4">📊 Essential Tracking Setup</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Must-Track Metrics:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Cost per acquisition (CPA) by service</li>
                    <li>• Customer lifetime value (CLV)</li>
                    <li>• Conversion rate by traffic source</li>
                    <li>• Average ticket size by channel</li>
                    <li>• Return on ad spend (ROAS)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Tracking Tools Needed:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Call tracking (CallRail, CallTrackingMetrics)</li>
                    <li>• CRM with source attribution</li>
                    <li>• Google Analytics 4 with goals</li>
                    <li>• Ad platform conversion tracking</li>
                    <li>• Monthly profit/loss reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 CLV Calculation for Home Services</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Most contractors only track initial job value, missing 60-70% of total customer worth. 
                  Here's how to calculate true CLV:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">CLV Formula:</h4>
                  <div className="font-mono text-sm bg-white p-3 rounded border">
                    CLV = (Average Job Value × Jobs Per Year × Customer Lifespan) + Referral Value
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">Example: Plumbing Company</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• Avg job: $285</li>
                      <li>• Jobs per year: 2.3</li>
                      <li>• Customer lifespan: 8 years</li>
                      <li>• Referrals: 0.4 per customer</li>
                      <li><strong>CLV: $5,244 + $2,098 = $7,342</strong></li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Acceptable CAC Range</h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Conservative (20:1): $367</li>
                      <li>• Aggressive (5:1): $1,468</li>
                      <li>• Most profitable (10:1): $734</li>
                      <li><strong>Target CAC: $500-800</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Guide */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Step-by-Step Implementation Guide</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Audit Your Current Spending</h3>
                  <p className="text-gray-600 mt-1">
                    Gather 3 months of data on ad spend, leads generated, conversions, and revenue by channel. 
                    Calculate current CAC and ROAS for each service type.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Calculate Service Profitability</h3>
                  <p className="text-gray-600 mt-1">
                    Determine profit margin and CLV for each service. Factor in material costs, labor, 
                    repeat business potential, and referral value.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Apply 60/20/20 Framework</h3>
                  <p className="text-gray-600 mt-1">
                    Reallocate budget using the framework, prioritizing highest-profit services 
                    within each category. Start with conservative changes and test over 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Set Up Proper Tracking</h3>
                  <p className="text-gray-600 mt-1">
                    Implement call tracking, conversion tracking, and CRM attribution. 
                    Create weekly reporting dashboards for key metrics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Monitor and Optimize Monthly</h3>
                  <p className="text-gray-600 mt-1">
                    Review performance monthly, adjusting budget allocation based on ROI data. 
                    Scale winning campaigns and pause underperformers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories: Real Results from Our Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Phoenix HVAC Company</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> $8,500/month budget, inconsistent leads</p>
                  <p><strong>Solution:</strong> Applied 60/20/20 framework, focused on emergency repairs</p>
                  <p><strong>Results:</strong> 156% increase in qualified leads, 89% increase in revenue</p>
                  <p><strong>CAC:</strong> Reduced from $180 to $67 per customer</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Seattle Plumbing Services</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> High competition, low profit margins</p>
                  <p><strong>Solution:</strong> Service-specific budgeting, CLV optimization</p>
                  <p><strong>Results:</strong> 234% ROI improvement in 4 months</p>
                  <p><strong>Growth:</strong> Scaled from $45K to $78K monthly revenue</p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps CTA */}
          <section className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Marketing Budget?</h2>
            <p className="text-xl mb-6 opacity-90">
              Get our complete home services marketing templates and weekly strategic guidance 
              based on insights from $250MM+ in managed campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-white text-brand-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-xl transition-transform duration-200 shadow-lg hover:scale-[1.02] active:scale-95"
              >
                Start Your FREE Week
              </button>
              <button className="text-white underline hover:no-underline font-medium">
                Download Free Budget Template →
              </button>
            </div>
          </section>
        </div>
      }
      faqSection={faqData}
      leadMagnetTitle="Get the Complete Home Services Marketing Budget Template"
      leadMagnetDescription="Download our proven budget allocation spreadsheet plus weekly strategic insights from $250MM+ in managed campaigns."
    />
  );
}
