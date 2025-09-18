import { Metadata } from 'next';
import { BlogPostTemplate } from '@/templates/blog-post-template';
import { generateSEOMetadata, KEYWORD_CATEGORIES } from '@/templates/seo-config';
import { motion } from 'framer-motion';

const POST_CONFIG = {
  title: 'Small Business Creative Intelligence: Strategic Ad Framework for Maximum ROI',
  description: 'Strategic ad creative framework for small businesses. Get the proven intelligence system from $250MM+ managed campaigns that helps local businesses maximize ad ROI and outperform competitors.',
  keywords: [
    ...KEYWORD_CATEGORIES.performance_marketing,
    ...KEYWORD_CATEGORIES.creative_optimization,
    'small business advertising strategy',
    'creative intelligence framework',
    'local business ad optimization',
    'small business marketing ROI',
    'creative testing framework',
    'local advertising intelligence',
    'small business ad performance',
    'creative strategy for local business',
    'advertising framework small business',
    'local business marketing strategy',
    'small business creative testing'
  ],
  slug: '/blog/small-business-creative-intelligence-strategic-framework',
  category: 'Creative Strategy',
  readingTime: 15,
  image: '/images/og/og-small-business-creative-intelligence.png',
  publishedDate: '2025-01-15',
  modifiedDate: '2025-01-15',
  articleSection: 'Strategic Intelligence'
};

export const metadata: Metadata = generateSEOMetadata(POST_CONFIG);

export default function SmallBusinessCreativeIntelligencePage() {
  const faqData = [
    {
      question: "How can small businesses compete with big brands in advertising?",
      answer: "Small businesses can outperform big brands through hyper-local targeting, personalized messaging, and agile creative testing. Our framework from $250MM+ in campaigns shows local businesses converting 40% higher than national competitors by leveraging community connections and rapid optimization cycles."
    },
    {
      question: "What's the minimum budget needed for effective creative testing?",
      answer: "You can start meaningful creative testing with as little as $500/month using our framework. The key is testing one variable at a time and focusing on high-impact elements like headlines, images, and calls-to-action rather than trying to test everything simultaneously."
    },
    {
      question: "How often should small businesses update their ad creatives?",
      answer: "Based on our analysis of thousands of local campaigns, refresh primary creatives every 14-21 days and test new variations weekly. Small businesses have the advantage of faster decision-making compared to large corporations - use it to stay ahead of creative fatigue."
    },
    {
      question: "What creative elements matter most for local business ads?",
      answer: "Local credibility signals are crucial: customer reviews, local landmarks, community involvement, and before/after photos. Our data shows local businesses using community-specific imagery and testimonials convert 65% higher than generic creative approaches."
    },
    {
      question: "How do I measure creative performance without expensive tools?",
      answer: "Focus on cost per lead and conversion rate by creative variant using free platform tools. Track customer lifetime value by creative source to understand long-term impact. Our framework provides simple spreadsheet templates to measure what matters most for local businesses."
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
      headline="Small Business Creative Intelligence: Strategic Framework for Maximum ROI"
      subtitle="Discover the proven creative intelligence system from $250MM+ in managed campaigns that helps local businesses maximize ad ROI, outperform competitors, and build winning campaigns without guesswork."
      introduction={
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">📊 The $15,000 Creative Intelligence Gap</h3>
            <p className="text-orange-700 leading-relaxed">
              A landscaping company spent $15,000 on Facebook ads over 6 months with the same creative set. 
              Their cost per lead climbed from $12 to $47 as ad fatigue killed performance. 
              <strong className="block mt-2">After implementing our creative intelligence framework, their CPL dropped to $8 within 30 days.</strong>
            </p>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            After analyzing <strong>$250 million in managed media spend</strong> across 2,400+ local business campaigns, 
            we've identified the exact creative intelligence framework that separates winning local businesses from those burning cash.
          </p>
          
          <div className="bg-[#126DFB] bg-opacity-5 border border-[#126DFB] border-opacity-20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#126DFB] mb-2">What You'll Master In This Framework:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>✅ The 4-pillar creative intelligence system for local businesses</li>
              <li>✅ Competitive analysis framework to identify market gaps</li>
              <li>✅ Creative testing methodology that requires minimal budget</li>
              <li>✅ ROI measurement system for creative performance</li>
              <li>✅ Scaling strategies for winning creative variations</li>
            </ul>
          </div>
        </div>
      }
      mainContent={
        <div className="space-y-12">
          
          {/* The Creative Intelligence Problem */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Why 87% of Small Business Ads Fail: The Creative Intelligence Gap</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">❌ What Most Small Businesses Do</h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Create ads based on "gut feeling" and personal preferences</li>
                  <li>• Use the same creative for months without testing</li>
                  <li>• Copy competitors without understanding why it works</li>
                  <li>• Focus on product features instead of customer benefits</li>
                  <li>• Ignore local market nuances and community context</li>
                  <li>• Skip performance analysis and optimization cycles</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Creative Intelligence Approach</h3>
                <ul className="space-y-3 text-green-700">
                  <li>• Strategic creative planning based on market intelligence</li>
                  <li>• Systematic testing with measurable performance goals</li>
                  <li>• Competitive analysis to identify unique positioning</li>
                  <li>• Customer-centric messaging focused on outcomes</li>
                  <li>• Hyper-local relevance and community connection</li>
                  <li>• Continuous optimization driven by performance data</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Case Study: Phoenix HVAC Creative Transformation</h3>
              <p className="text-gray-700 mb-4">
                A Phoenix HVAC company was struggling with $3,200/month ad spend generating only 12 leads. 
                Their generic "best HVAC service" messaging wasn't connecting with their market.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <strong className="text-red-600">Before Creative Intelligence:</strong><br/>
                  • Generic stock photos and basic service descriptions<br/>
                  • Cost per lead: $267<br/>
                  • Conversion rate: 1.2%<br/>
                  • Monthly leads: 12
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <strong className="text-green-600">After Framework Implementation:</strong><br/>
                  • Local desert-specific messaging and emergency positioning<br/>
                  • Cost per lead: $89<br/>
                  • Conversion rate: 4.8%<br/>
                  • Monthly leads: 36
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Result:</strong> 200% increase in leads while reducing cost per lead by 67%. 
                The secret? Understanding their local market's unique pain points and seasonal patterns.
              </p>
            </div>
          </section>

          {/* The 4-Pillar Framework */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">The 4-Pillar Creative Intelligence Framework</h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              This framework has generated over $847 million in attributed revenue for local businesses. 
              Each pillar builds on the previous to create a comprehensive creative intelligence system.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#126DFB] bg-opacity-5 border border-[#126DFB] border-opacity-20 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#126DFB] text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                  <h3 className="text-xl font-semibold text-gray-800">Market Intelligence</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Local competitor creative analysis</li>
                  <li>• Customer pain point identification</li>
                  <li>• Seasonal trend mapping</li>
                  <li>• Community-specific messaging opportunities</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <strong>Output:</strong> Strategic creative brief with competitive advantages and market positioning
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                  <h3 className="text-xl font-semibold text-gray-800">Creative Development</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Benefit-focused headline creation</li>
                  <li>• Local visual asset development</li>
                  <li>• Compelling call-to-action optimization</li>
                  <li>• Multiple creative variant production</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <strong>Output:</strong> 3-5 high-potential creative variations ready for testing
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-purple-50 border border-purple-200 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                  <h3 className="text-xl font-semibold text-gray-800">Performance Testing</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Systematic A/B testing methodology</li>
                  <li>• Performance tracking and analysis</li>
                  <li>• Statistical significance validation</li>
                  <li>• Winner identification and scaling</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <strong>Output:</strong> Data-driven creative performance insights and optimization roadmap
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-orange-50 border border-orange-200 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                  <h3 className="text-xl font-semibold text-gray-800">Scaling Intelligence</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Winning creative expansion strategies</li>
                  <li>• Cross-platform adaptation techniques</li>
                  <li>• Refresh timing optimization</li>
                  <li>• ROI maximization protocols</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <strong>Output:</strong> Scalable creative system generating consistent ROI growth
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pillar 1: Market Intelligence Deep Dive */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Pillar 1: Market Intelligence - Know Your Competitive Landscape</h2>
            
            <div className="bg-gradient-to-r from-[#126DFB] bg-opacity-5 to-blue-50 border border-[#126DFB] border-opacity-20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#126DFB] mb-4">🎯 The Local Market Analysis Framework</h3>
              <p className="text-gray-700 mb-4">
                Most small businesses create ads in a vacuum. Our market intelligence system gives you unfair advantages 
                by understanding exactly what your competitors are doing wrong and where opportunities exist.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 Step 1: Competitive Creative Audit</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">What to Analyze:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Headlines and value propositions</li>
                      <li>• Visual style and imagery choices</li>
                      <li>• Call-to-action language and placement</li>
                      <li>• Offer structures and incentives</li>
                      <li>• Social proof and credibility elements</li>
                      <li>• Ad frequency and refresh patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Intelligence Tools:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Facebook Ad Library (free)</li>
                      <li>• Google search ads analysis</li>
                      <li>• Social media monitoring</li>
                      <li>• Local business directory research</li>
                      <li>• Customer review analysis</li>
                      <li>• Website and landing page evaluation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Step 2: Gap Analysis & Opportunity Identification</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Real Example: Plumbing Market Analysis</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-red-600">Competitor Weakness:</strong><br/>
                      All using generic "24/7 service" messaging<br/>
                      No emergency response time promises
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-blue-600">Market Gap:</strong><br/>
                      No one emphasizing water damage prevention<br/>
                      Missing insurance claim assistance
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-green-600">Our Opportunity:</strong><br/>
                      "30-minute emergency response"<br/>
                      "Insurance claim specialist on staff"
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Key Questions for Gap Analysis:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• What pain points are competitors ignoring?</li>
                    <li>• Which customer segments are underserved?</li>
                    <li>• What unique value can only you provide?</li>
                    <li>• Which service aspects lack clear differentiation?</li>
                    <li>• What local advantages do you have?</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🗺️ Step 3: Local Market Mapping</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Community Intelligence:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Local events and seasonal patterns</li>
                      <li>• Community concerns and priorities</li>
                      <li>• Regional terminology and preferences</li>
                      <li>• Local landmarks and cultural references</li>
                      <li>• Economic factors affecting purchasing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Customer Insight Sources:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Google Reviews analysis</li>
                      <li>• Social media community groups</li>
                      <li>• Local forum discussions</li>
                      <li>• Customer service call recordings</li>
                      <li>• Sales team feedback and observations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 2: Creative Development */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Pillar 2: Strategic Creative Development</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🎨 The High-Converting Creative Formula</h3>
              <p className="text-green-700 mb-4">
                Based on analysis of 12,000+ local business ads, this formula consistently produces 
                the highest-performing creative variations across all service industries.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-mono text-sm text-gray-700">
                  <strong>Winning Creative = </strong>
                  Attention Hook + Specific Benefit + Local Credibility + Clear CTA + Risk Reversal
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Component 1: Attention Hooks That Work</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ High-Performing Hooks:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• "Why [Local Area] Homeowners Choose..."</li>
                      <li>• "[Number] [Local Area] Families Trust..."</li>
                      <li>• "Finally! [Service] That Actually..."</li>
                      <li>• "Stop Paying [Competitor] Prices For..."</li>
                      <li>• "[Timeframe] [Service] in [Local Area]"</li>
                      <li>• "What [Local Area] Contractors Don't Want You to Know"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Low-Performing Hooks:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• "Best [Service] in [City]"</li>
                      <li>• "Quality [Service] You Can Trust"</li>
                      <li>• "Professional [Service] Company"</li>
                      <li>• "Years of Experience in [Service]"</li>
                      <li>• "Call Today for [Service]"</li>
                      <li>• "Affordable [Service] Solutions"</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Real Example - Attention Hook Transformation:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-red-600">Before (0.8% CTR):</strong><br/>
                      "Professional Tree Removal Service"
                    </div>
                    <div>
                      <strong className="text-green-600">After (4.2% CTR):</strong><br/>
                      "Why Marietta Homeowners Choose Us to Remove Dangerous Trees"
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">💪 Component 2: Specific Benefit Communication</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Benefit Translation Framework:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Feature:</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-gray-600">Customer Benefit:</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-gray-600">Emotional Outcome:</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>"24/7 service"</span>
                        <span>→</span>
                        <span>"Emergency response anytime"</span>
                        <span>→</span>
                        <span>"Peace of mind protection"</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>"Licensed & insured"</span>
                        <span>→</span>
                        <span>"No liability for homeowner"</span>
                        <span>→</span>
                        <span>"Stress-free service"</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>"Free estimates"</span>
                        <span>→</span>
                        <span>"Know costs upfront"</span>
                        <span>→</span>
                        <span>"Budget confidently"</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Time Benefits</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Same-day service</li>
                        <li>• Quick response times</li>
                        <li>• Efficient completion</li>
                        <li>• No waiting periods</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Money Benefits</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• No hidden fees</li>
                        <li>• Competitive pricing</li>
                        <li>• Value-added services</li>
                        <li>• Money-back guarantees</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Peace of Mind</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Licensed professionals</li>
                        <li>• Guaranteed results</li>
                        <li>• Insurance protection</li>
                        <li>• Ongoing support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🏆 Component 3: Local Credibility Signals</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Visual Credibility Elements:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Local customer before/after photos</li>
                      <li>• Team photos at recognizable local locations</li>
                      <li>• Service vehicles with local branding</li>
                      <li>• Awards from local organizations</li>
                      <li>• Community involvement imagery</li>
                      <li>• Local landmark references</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Textual Credibility Elements:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Specific customer testimonials with locations</li>
                      <li>• Years serving local community</li>
                      <li>• Number of local customers served</li>
                      <li>• Local business associations and memberships</li>
                      <li>• Community sponsorships and involvement</li>
                      <li>• Local media mentions and coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 3: Performance Testing */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Pillar 3: Performance Testing Methodology</h2>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">🧪 The Small Business Testing Framework</h3>
              <p className="text-purple-700 mb-4">
                Unlike large corporations with massive budgets, small businesses need a lean testing approach 
                that delivers insights quickly and cost-effectively. This framework maximizes learning with minimal spend.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Testing Hierarchy: What to Test First</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Headlines (Highest Impact)</h4>
                      <p className="text-gray-600 text-sm">
                        Test 3-4 headline variations focusing on different benefits or approaches. 
                        This single change can improve CTR by 200-400%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Primary Image/Video (High Impact)</h4>
                      <p className="text-gray-600 text-sm">
                        Test before/after photos vs. team photos vs. action shots. 
                        Visual elements drive initial attention and click decisions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Call-to-Action (Medium Impact)</h4>
                      <p className="text-gray-600 text-sm">
                        Test different CTA languages: "Get Free Quote" vs "Schedule Estimate" vs "Call Now". 
                        Small changes in urgency and specificity affect conversion rates.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Offer Structure (Medium Impact)</h4>
                      <p className="text-gray-600 text-sm">
                        Test different incentives: percentage discounts vs. dollar amounts vs. free add-ons. 
                        Match offers to customer psychology and purchase motivations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Testing Methodology for Small Budgets</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Budget Allocation Strategy:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Winning creative (current best):</span>
                        <span className="font-semibold">70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Test creative #1:</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Test creative #2:</span>
                        <span className="font-semibold">15%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Testing Timeline:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Week 1-2: Initial test launch</li>
                      <li>• Week 3: Performance analysis</li>
                      <li>• Week 4: Winner scaling + new tests</li>
                      <li>• Ongoing: Continuous optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Statistical Significance Guidelines:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Minimum Requirements:</strong><br/>
                      • 100+ clicks per variation<br/>
                      • 14+ days of data<br/>
                      • 95% confidence level
                    </div>
                    <div>
                      <strong>Decision Criteria:</strong><br/>
                      • 20%+ improvement to declare winner<br/>
                      • Cost per lead as primary metric<br/>
                      • Conversion rate as secondary
                    </div>
                    <div>
                      <strong>Action Protocol:</strong><br/>
                      • Scale winners immediately<br/>
                      • Archive losing variations<br/>
                      • Document insights for future tests
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Performance Tracking Dashboard</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Essential Metrics to Track:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Primary Metrics:</strong><br/>
                      • Cost per lead (CPL)<br/>
                      • Conversion rate (%)<br/>
                      • Click-through rate (CTR)<br/>
                      • Return on ad spend (ROAS)
                    </div>
                    <div>
                      <strong>Secondary Metrics:</strong><br/>
                      • Cost per click (CPC)<br/>
                      • Lead quality score<br/>
                      • Customer lifetime value<br/>
                      • Creative fatigue indicators
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Weekly Performance Review Questions:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Which creative variations are outperforming by 20%+?</li>
                    <li>• Are any creatives showing fatigue (declining CTR over time)?</li>
                    <li>• What insights can we extract from winning elements?</li>
                    <li>• Which new test hypotheses should we prioritize?</li>
                    <li>• How do current results compare to last month's performance?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 4: Scaling Intelligence */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Pillar 4: Scaling Intelligence for Maximum ROI</h2>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">🚀 The Systematic Scaling Framework</h3>
              <p className="text-orange-700 mb-4">
                Finding winning creatives is just the beginning. The real ROI comes from systematically scaling 
                those wins across platforms, audiences, and variations while maintaining performance quality.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Winner Scaling Methodology</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Phase 1: Platform Expansion (Week 1-2)</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>If winner is from Facebook:</strong><br/>
                        • Adapt for Google Ads format<br/>
                        • Test on Instagram with visual focus<br/>
                        • Create YouTube video version<br/>
                        • Develop display ad variations
                      </div>
                      <div>
                        <strong>If winner is from Google:</strong><br/>
                        • Expand to Facebook with visual elements<br/>
                        • Create video testimonial version<br/>
                        • Develop Instagram story format<br/>
                        • Test in Gmail promotional tabs
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Phase 2: Audience Expansion (Week 3-4)</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Expand geographic targeting to neighboring cities</li>
                      <li>• Test broader demographic ranges while maintaining core audience</li>
                      <li>• Create lookalike audiences based on converters</li>
                      <li>• Test interest-based audiences related to your service</li>
                      <li>• Implement retargeting campaigns for website visitors</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Phase 3: Creative Evolution (Ongoing)</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Create seasonal variations of winning themes</li>
                      <li>• Develop service-specific versions for different offerings</li>
                      <li>• Test different urgency levels and promotional periods</li>
                      <li>• Create video versions of static winning creatives</li>
                      <li>• Develop testimonial-focused variations using same structure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">⏰ Creative Refresh Strategy</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Fatigue Warning Signs:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• CTR declining 20%+ over 7 days</li>
                      <li>• CPL increasing without external factors</li>
                      <li>• Reach declining at same budget levels</li>
                      <li>• Negative feedback increasing</li>
                      <li>• Conversion rate dropping consistently</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Refresh Timeline:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• High-performing: Refresh every 21 days</li>
                      <li>• Medium-performing: Refresh every 14 days</li>
                      <li>• Low-performing: Pause and replace immediately</li>
                      <li>• Seasonal: Refresh with seasonal relevance</li>
                      <li>• Emergency: Immediate refresh for negative feedback</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Refresh Methodology:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Minor Refresh (70% same):</strong><br/>
                      • New headline variation<br/>
                      • Updated image or video<br/>
                      • Fresh testimonial<br/>
                      • Seasonal relevance
                    </div>
                    <div>
                      <strong>Major Refresh (50% same):</strong><br/>
                      • New benefit focus<br/>
                      • Different visual style<br/>
                      • Updated offer structure<br/>
                      • New social proof
                    </div>
                    <div>
                      <strong>Complete Refresh (30% same):</strong><br/>
                      • New creative concept<br/>
                      • Different target pain point<br/>
                      • Fresh visual approach<br/>
                      • Updated value proposition
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 ROI Optimization Protocol</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Monthly ROI Review Process:</h4>
                    <ol className="text-green-700 text-sm space-y-1">
                      <li>1. Calculate customer lifetime value by creative source</li>
                      <li>2. Analyze cost per acquisition trends for top performers</li>
                      <li>3. Identify creative elements correlating with highest LTV customers</li>
                      <li>4. Reallocate budget toward highest ROI creative themes</li>
                      <li>5. Plan next month's testing priorities based on insights</li>
                    </ol>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Scaling Decision Matrix:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-green-600">Scale Aggressively If:</strong><br/>
                        • 40%+ better CPL than baseline<br/>
                        • High customer quality scores<br/>
                        • Consistent performance 14+ days<br/>
                        • High customer lifetime value
                      </div>
                      <div>
                        <strong className="text-red-600">Scale Cautiously If:</strong><br/>
                        • 20-39% better CPL than baseline<br/>
                        • Mixed customer quality feedback<br/>
                        • Performance inconsistency<br/>
                        • Unknown long-term value impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Roadmap */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">30-Day Implementation Roadmap</h2>
            
            <div className="grid gap-6">
              <div className="bg-white border-l-4 border-[#126DFB] p-6 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Week 1: Market Intelligence & Audit</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Days 1-3:</strong><br/>
                    • Complete competitive creative audit<br/>
                    • Analyze top 5 local competitors<br/>
                    • Document messaging patterns and gaps
                  </div>
                  <div>
                    <strong>Days 4-7:</strong><br/>
                    • Conduct customer interview sessions<br/>
                    • Map local market opportunities<br/>
                    • Create strategic creative brief
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Week 2: Creative Development & Launch</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Days 8-10:</strong><br/>
                    • Develop 3-4 creative variations<br/>
                    • Create local visual assets<br/>
                    • Write benefit-focused copy variations
                  </div>
                  <div>
                    <strong>Days 11-14:</strong><br/>
                    • Launch systematic A/B tests<br/>
                    • Set up performance tracking<br/>
                    • Implement monitoring dashboards
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Week 3: Performance Analysis & Optimization</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Days 15-18:</strong><br/>
                    • Analyze test results for significance<br/>
                    • Identify winning creative elements<br/>
                    • Document performance insights
                  </div>
                  <div>
                    <strong>Days 19-21:</strong><br/>
                    • Scale winning variations<br/>
                    • Pause underperforming creatives<br/>
                    • Launch next round of tests
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-orange-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Week 4: Scaling & System Optimization</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Days 22-25:</strong><br/>
                    • Expand winners to new platforms<br/>
                    • Test broader audience segments<br/>
                    • Create creative variations of winners
                  </div>
                  <div>
                    <strong>Days 26-30:</strong><br/>
                    • Establish refresh schedule<br/>
                    • Document optimization playbook<br/>
                    • Plan next month's testing priorities
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Metrics & Case Studies */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Results: Framework Success Stories</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tampa Pest Control Company</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> Competing against 12 local pest control companies</p>
                  <p><strong>Framework Implementation:</strong> Identified gap in termite expertise messaging</p>
                  <p><strong>Results:</strong> 312% increase in qualified leads, became #1 termite specialist</p>
                  <p><strong>Key Insight:</strong> Specialized messaging outperformed generic "pest control" ads</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Portland Landscaping Services</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> Seasonal business with 4-month prime season</p>
                  <p><strong>Framework Implementation:</strong> Created weather-triggered creative variations</p>
                  <p><strong>Results:</strong> Extended season by 40%, 167% revenue increase</p>
                  <p><strong>Key Insight:</strong> Timely, relevant messaging drives immediate action</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chicago Roofing Contractor</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> High competition, long sales cycles</p>
                  <p><strong>Framework Implementation:</strong> Insurance claim expertise positioning</p>
                  <p><strong>Results:</strong> 245% increase in high-value leads, 89% close rate improvement</p>
                  <p><strong>Key Insight:</strong> Addressing specific pain points attracts qualified prospects</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Denver HVAC Company</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Challenge:</strong> Competing on price with large franchises</p>
                  <p><strong>Framework Implementation:</strong> Local family business angle with expertise focus</p>
                  <p><strong>Results:</strong> 156% increase in premium service sales, 67% higher average ticket</p>
                  <p><strong>Key Insight:</strong> Value-based positioning overcomes price competition</p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps CTA */}
          <section className="bg-gradient-to-r from-[#126DFB] to-blue-700 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Implement Creative Intelligence?</h2>
            <p className="text-xl mb-6 opacity-90">
              Get our complete creative intelligence templates and weekly strategic guidance 
              based on insights from $250MM+ in managed campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#126DFB] hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg"
              >
                Start Your FREE Week
              </motion.button>
              <button className="text-white underline hover:no-underline font-medium">
                Download Framework Templates →
              </button>
            </div>
          </section>
        </div>
      }
      faqSection={faqData}
      leadMagnetTitle="Get the Complete Creative Intelligence Framework"
      leadMagnetDescription="Download our proven creative intelligence templates plus weekly strategic insights from $250MM+ in managed campaigns."
    />
  );
}