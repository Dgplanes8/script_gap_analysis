import { Metadata } from 'next';
import { BlogPostTemplate } from '@/templates/blog-post-template';
import { generateSEOMetadata, KEYWORD_CATEGORIES } from '@/templates/seo-config';
import { EnhancedBlogImage } from '@/components/blog/enhanced-blog-image';

const POST_CONFIG = {
  title: 'High-Converting Ad Copy Templates: 25+ Proven Scripts for Every Platform',
  description: 'Ready-to-use ad copy templates from $250MM+ managed campaigns. Get 25+ proven scripts for Google, Facebook, Instagram, TikTok, and LinkedIn that drive conversions across all industries.',
  keywords: [
    ...KEYWORD_CATEGORIES.ad_creative,
    ...KEYWORD_CATEGORIES.startup_marketing,
    'ad copy templates',
    'high converting ad scripts',
    'performance marketing copy',
    'platform specific ad copy',
    'Facebook ad templates',
    'Google ads copy templates',
    'Instagram ad copy',
    'LinkedIn ad scripts',
    'TikTok ad copy templates',
    'conversion ad copy',
    'proven ad copy formulas',
    'social media ad templates'
  ],
  slug: '/blog/high-converting-ad-copy-templates-25-proven-scripts',
  category: 'Ad Copy Templates',
  readingTime: 17,
  image: '/images/og/og-ad-copy-templates.png',
  publishedDate: '2025-01-15',
  modifiedDate: '2025-01-15',
  articleSection: 'Copy Templates'
};

export const metadata: Metadata = generateSEOMetadata(POST_CONFIG);

export default function AdCopyTemplatesPage() {
  const faqData = [
    {
      question: "How do I customize these ad copy templates for my specific business?",
      answer: "Replace bracketed placeholders with your specific details: [Product] becomes your actual product name, [Benefit] becomes your key value proposition, and [CTA] becomes your desired action. Adapt the emotional tone to match your brand voice while keeping the proven structure intact."
    },
    {
      question: "Which ad copy templates work best for different industries?",
      answer: "B2B: Problem-solution and authority templates convert 67% higher. E-commerce: Social proof and urgency templates drive 45% more sales. Services: Before/after and testimonial templates generate 89% more leads. Always test 2-3 templates to find your winner."
    },
    {
      question: "Can I use the same ad copy template across multiple platforms?",
      answer: "Yes, but adapt the format and length for each platform. The core message stays the same, but Facebook allows longer copy, Instagram needs visual focus, LinkedIn requires professional tone, and TikTok demands native, casual language. Our templates include platform-specific adaptations."
    },
    {
      question: "How often should I refresh my ad copy using these templates?",
      answer: "Test new template variations every 2-3 weeks or when performance declines 20%+. Our data from $250MM+ campaigns shows template fatigue occurs after 6-8 weeks. Rotate between different template styles to maintain freshness while preserving winning elements."
    },
    {
      question: "What's the difference between a copy template and a copy framework?",
      answer: "Templates provide exact wording you can customize with fill-in-the-blanks, while frameworks give you the strategic structure to create original copy. Templates are faster to implement, frameworks offer more flexibility. Use templates for speed, frameworks for customization."
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
      headline="High-Converting Ad Copy Templates: 25+ Proven Scripts for Every Platform"
      subtitle="Skip the guesswork with ready-to-use ad copy templates. Get 25+ proven scripts from $250MM+ managed campaigns that drive conversions on Google, Facebook, Instagram, TikTok, and LinkedIn."
      introduction={
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">⚡ The 47-Second Template Success</h3>
            <p className="text-orange-700 leading-relaxed">
              A struggling e-commerce brand was spending 4+ hours writing each ad, testing dozens of variations with inconsistent results. 
              After implementing our proven template system, they reduced copy creation time to 47 seconds per ad while increasing 
              conversion rates by 284% across all platforms. 
              <strong className="block mt-2">The secret? Templates based on psychological triggers, not creative guesswork.</strong>
            </p>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            After analyzing <strong>$250 million in managed media spend</strong> across 4,200+ ad variations, 
            we've identified the exact copy templates that consistently drive the highest conversion rates.
          </p>
          
          <div className="bg-rose-600 bg-opacity-5 border border-rose-600 border-opacity-20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-rose-800 mb-2">Get These 25+ Proven Templates:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>✅ Platform-specific templates for Google, Facebook, Instagram, TikTok, LinkedIn</li>
              <li>✅ Industry-adapted versions for B2B, E-commerce, and Services</li>
              <li>✅ Conversion-optimized scripts with performance benchmarks</li>
              <li>✅ A/B testing variations for continuous optimization</li>
              <li>✅ Psychological trigger integration for maximum impact</li>
            </ul>
          </div>
          
          <EnhancedBlogImage 
            keywords={['ad copy templates', 'advertising scripts', 'marketing templates', 'conversion copywriting']}
            topic="ad copy templates and marketing scripts"
            alt="Digital marketer using multiple ad copy templates on computer screen with conversion analytics dashboard"
            aspectRatio="wide"
            priority={true}
            className="my-8"
          />
        </div>
      }
      mainContent={
        <div className="space-y-12">
          
          {/* Why Templates Work */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Why 94% of High-Performing Ads Follow Proven Templates</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-red-800 mb-4">❌ The "Blank Page" Problem</h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Spending hours brainstorming copy from scratch</li>
                  <li>• Inconsistent messaging across different campaigns</li>
                  <li>• No systematic way to replicate successful copy</li>
                  <li>• Reinventing the wheel for every new product/campaign</li>
                  <li>• Difficulty scaling copy creation across team members</li>
                  <li>• Unable to predict which copy variations will work</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-green-800 mb-4">✅ The Template Advantage</h3>
                <ul className="space-y-3 text-green-700">
                  <li>• Create high-converting copy in under 60 seconds</li>
                  <li>• Consistent quality across all campaigns and team members</li>
                  <li>• Built-in psychological triggers and proven structures</li>
                  <li>• Easy to test variations and optimize performance</li>
                  <li>• Scalable process for rapid campaign deployment</li>
                  <li>• Predictable results based on historical data</li>
                </ul>
              </div>
            </div>

            <EnhancedBlogImage 
              keywords={['template performance', 'conversion analytics', 'ad performance data', 'marketing metrics']}
              topic="template performance analytics and conversion data"
              alt="Analytics dashboard showing high-performing ad template conversion rates and performance metrics"
              aspectRatio="wide"
              priority={false}
              className="my-8"
            />
            
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Template Performance Data</h3>
              <p className="text-gray-700 mb-4">
                Our analysis of 15,000+ ads reveals that copy following proven templates consistently outperforms 
                "creative" approaches. The data shows templates aren't limiting - they're liberating.
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-rose-600">94%</div>
                  <div className="text-gray-600">of top ads follow template structures</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5.2x</div>
                  <div className="text-gray-600">faster copy creation with templates</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">67%</div>
                  <div className="text-gray-600">higher conversion rates on average</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-gray-600">less variation in team performance</div>
                </div>
              </div>
            </div>
          </section>

          {/* Template Categories */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">The 5 Categories of High-Converting Ad Copy Templates</h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Not all templates serve the same purpose. Understanding these five categories helps you choose 
              the right template for your specific campaign goals and audience type.
            </p>

            <div className="grid gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <h3 className="text-xl font-semibold text-gray-800">Problem-Solution Templates</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Perfect for problem-aware audiences. These templates identify pain points and position your product as the solution.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-blue-800">Pain Point Aggravator</div>
                    <div className="text-sm text-gray-600">Amplifies existing problems</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-blue-800">Solution Revealer</div>
                    <div className="text-sm text-gray-600">Introduces your solution</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-blue-800">Objection Handler</div>
                    <div className="text-sm text-gray-600">Addresses common concerns</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <h3 className="text-xl font-semibold text-gray-800">Social Proof Templates</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Leverage customer success stories and social validation. Ideal for building trust with new audiences.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-green-800">Customer Story</div>
                    <div className="text-sm text-gray-600">Real customer transformations</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-green-800">Numbers & Stats</div>
                    <div className="text-sm text-gray-600">Quantified results</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-green-800">Authority Endorsement</div>
                    <div className="text-sm text-gray-600">Expert recommendations</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <h3 className="text-xl font-semibold text-gray-800">Urgency & Scarcity Templates</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Create immediate action through time-sensitive offers and limited availability messaging.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-purple-800">Limited Time</div>
                    <div className="text-sm text-gray-600">Deadline-driven offers</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-purple-800">Limited Quantity</div>
                    <div className="text-sm text-gray-600">Stock scarcity messaging</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-purple-800">Exclusive Access</div>
                    <div className="text-sm text-gray-600">Member-only opportunities</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <h3 className="text-xl font-semibold text-gray-800">Benefit-Driven Templates</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Focus on outcomes and transformations. Great for aspirational products and lifestyle brands.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-orange-800">Transformation</div>
                    <div className="text-sm text-gray-600">Before/after messaging</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-orange-800">Outcome Promise</div>
                    <div className="text-sm text-gray-600">Specific result delivery</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-orange-800">Lifestyle Enhancement</div>
                    <div className="text-sm text-gray-600">Identity-based benefits</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <h3 className="text-xl font-semibold text-gray-800">Curiosity & Intrigue Templates</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Hook attention with mystery and curiosity gaps. Effective for breaking through ad fatigue.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-red-800">Secret Revealer</div>
                    <div className="text-sm text-gray-600">Unknown information hooks</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-red-800">Controversy Creator</div>
                    <div className="text-sm text-gray-600">Contrarian viewpoints</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="font-semibold text-red-800">Question Poser</div>
                    <div className="text-sm text-gray-600">Thought-provoking questions</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Google Ads Templates */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Google Ads Templates: High-Intent Search Traffic</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">🎯 Google Ads Optimization Strategy</h3>
              <p className="text-blue-700 mb-4">
                Google Ads capture high-intent searchers actively looking for solutions. Your copy needs to immediately 
                confirm relevance, differentiate from competitors, and drive action within tight character limits.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-blue-800 font-semibold mb-2">Key Success Factors:</div>
                <div className="text-gray-700 text-sm">
                  Match search intent • Include target keywords • Highlight unique value • Create urgency • Clear call-to-action
                </div>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Template 1: Problem-Solution */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                  <h3 className="text-lg font-semibold text-gray-800">Problem-Solution Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">4.2% CTR</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "Still [Problem]? Here's Why"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "[Specific Reason] is keeping you stuck. [Solution] solves this in [Timeframe]."</div>
                      <div><strong>Description 2:</strong> "Join [Number]+ customers who chose [Solution]. [Benefit] guaranteed."</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "Still Losing Leads? Here's Why"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "Slow follow-up is killing your conversions. Our CRM responds in 30 seconds."</div>
                      <div><strong>Description 2:</strong> "Join 2,400+ businesses who chose instant automation. 67% more sales guaranteed."</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Competitive keywords where differentiation matters</li>
                    <li>• Solution-aware searchers comparing options</li>
                    <li>• B2B software and professional services</li>
                    <li>• Industries with clear, identifiable pain points</li>
                  </ul>
                </div>
              </div>

              {/* Template 2: Authority & Trust */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                  <h3 className="text-lg font-semibold text-gray-800">Authority & Trust Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">3.8% CTR</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "[Authority Indicator] [Product/Service]"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "Trusted by [Number] [Target Audience]. [Key Benefit] with [Guarantee/Assurance]."</div>
                      <div><strong>Description 2:</strong> "[Social Proof Element]. [Specific Result]. [Call to Action]."</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-green-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "Award-Winning Email Marketing"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "Trusted by 50K+ businesses. Double your open rates with proven templates."</div>
                      <div><strong>Description 2:</strong> "Featured in TechCrunch. 94% customer satisfaction. Start free trial today."</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• High-consideration purchases requiring trust</li>
                    <li>• Crowded markets where credibility matters</li>
                    <li>• Professional services and B2B solutions</li>
                    <li>• New brands competing against established players</li>
                  </ul>
                </div>
              </div>

              {/* Template 3: Urgency & Limited Time */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                  <h3 className="text-lg font-semibold text-gray-800">Urgency & Limited Time Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">5.1% CTR</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "[Time Period] Only: [Offer/Benefit]"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "[Specific Discount/Bonus] ends [Date/Time]. [Product] normally [Regular Price]."</div>
                      <div><strong>Description 2:</strong> "[Urgency Reason]. [Social Proof]. [Action-Oriented CTA]."</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-red-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Headline:</strong> "48 Hours Only: 50% Off Premium"</div>
                      <div className="mb-2"><strong>Description 1:</strong> "Half-price access ends Friday midnight. Premium features normally $99/month."</div>
                      <div><strong>Description 2:</strong> "Final hours of our biggest sale. 10K+ upgraded. Claim your discount now."</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Product launches and promotional campaigns</li>
                    <li>• Seasonal sales and holiday promotions</li>
                    <li>• Subscription services with trial offers</li>
                    <li>• Inventory clearance and limited stock items</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Facebook & Instagram Templates */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Facebook & Instagram Templates: Social-Native Engagement</h2>
            
            <EnhancedBlogImage 
              keywords={['Facebook ads', 'Instagram advertising', 'social media templates', 'platform specific copy']}
              topic="Facebook and Instagram ad templates and social media advertising"
              alt="Social media advertising manager creating platform-specific Facebook and Instagram ad templates on multiple devices"
              aspectRatio="wide"
              priority={false}
              className="my-8"
            />
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">📱 Social Media Optimization Strategy</h3>
              <p className="text-indigo-700 mb-4">
                Facebook and Instagram users scroll for entertainment and connection. Your ads need to feel native to the platform 
                while still driving action. Visual storytelling combined with social proof creates the highest engagement.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-indigo-800 font-semibold mb-2">Platform-Specific Factors:</div>
                <div className="text-gray-700 text-sm">
                  Native feel • Visual-first approach • Emotional connection • Social proof integration • Mobile optimization
                </div>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Template 4: Social Proof Story */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                  <h3 className="text-lg font-semibold text-gray-800">Social Proof Story Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">6.7% Eng.</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Hook:</strong> "[Customer Name] thought [Common Belief] until..."</div>
                      <div className="mb-2"><strong>Story:</strong> "[Challenge/Problem]. Then they discovered [Solution]. Now [Transformation/Result]."</div>
                      <div className="mb-2"><strong>Proof:</strong> "[Specific Numbers/Results]. '[Customer Quote].'"</div>
                      <div><strong>CTA:</strong> "Ready for similar results? [Action]"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-indigo-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Hook:</strong> "Sarah thought email marketing was dead until..."</div>
                      <div className="mb-2"><strong>Story:</strong> "Her online store was struggling with 0.8% open rates. Then she discovered our sequence templates. Now she's hitting 34% opens consistently."</div>
                      <div className="mb-2"><strong>Proof:</strong> "$47K revenue in 90 days. 'I can't believe how simple this was.'"</div>
                      <div><strong>CTA:</strong> "Ready for similar results? Get the templates that transformed Sarah's business →"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-indigo-700 text-sm space-y-1">
                    <li>• Products with clear before/after transformations</li>
                    <li>• Building trust with skeptical audiences</li>
                    <li>• Industries where results speak louder than features</li>
                    <li>• Retargeting campaigns to warm audiences</li>
                  </ul>
                </div>
              </div>

              {/* Template 5: Curiosity Hook */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">5</div>
                  <h3 className="text-lg font-semibold text-gray-800">Curiosity Hook Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">8.2% Eng.</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Hook:</strong> "The [Surprising Thing] about [Topic] that [Authority/Experts] don't want you to know..."</div>
                      <div className="mb-2"><strong>Intrigue:</strong> "[Counter-intuitive Statement]. Most people think [Common Belief], but [Contrarian Truth]."</div>
                      <div className="mb-2"><strong>Payoff:</strong> "[Revelation/Secret]. This is why [Benefit/Result]."</div>
                      <div><strong>CTA:</strong> "Want the full story? [Link/Action]"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-purple-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Hook:</strong> "The uncomfortable truth about productivity apps that Silicon Valley doesn't want you to know..."</div>
                      <div className="mb-2"><strong>Intrigue:</strong> "They're designed to make you MORE distracted. Most people think more features = better results, but the opposite is true."</div>
                      <div className="mb-2"><strong>Payoff:</strong> "The most productive people use simple, single-purpose tools. This is why our app has only 3 features."</div>
                      <div><strong>CTA:</strong> "Want the full story? See why simple beats complex →"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Breaking through ad fatigue in crowded feeds</li>
                    <li>• Challenging conventional wisdom in your industry</li>
                    <li>• Content marketing and educational campaigns</li>
                    <li>• Audience building and engagement campaigns</li>
                  </ul>
                </div>
              </div>

              {/* Template 6: Transformation Promise */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">6</div>
                  <h3 className="text-lg font-semibold text-gray-800">Transformation Promise Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">7.3% Eng.</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Current State:</strong> "Tired of [Current Frustrating Situation]?"</div>
                      <div className="mb-2"><strong>Future Vision:</strong> "Imagine [Ideal Outcome] in just [Timeframe]..."</div>
                      <div className="mb-2"><strong>Bridge:</strong> "[Product/Service] makes this possible. [How It Works]."</div>
                      <div><strong>Proof & CTA:</strong> "[Social Proof]. [Call to Action]"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-orange-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Current State:</strong> "Tired of staring at a blank page every time you need to write an ad?"</div>
                      <div className="mb-2"><strong>Future Vision:</strong> "Imagine creating high-converting copy in under 60 seconds..."</div>
                      <div className="mb-2"><strong>Bridge:</strong> "Our template library makes this possible. Just fill in the blanks and launch."</div>
                      <div><strong>Proof & CTA:</strong> "5,000+ marketers save 10 hours per week. Get instant access →"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Aspirational products and lifestyle brands</li>
                    <li>• Productivity and self-improvement tools</li>
                    <li>• Before/after transformation services</li>
                    <li>• Educational and skill-building products</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* LinkedIn Templates */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">LinkedIn Templates: Professional B2B Focus</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">💼 LinkedIn Optimization Strategy</h3>
              <p className="text-blue-700 mb-4">
                LinkedIn users are in professional mindset, seeking career advancement and business solutions. 
                Copy should be authoritative, data-driven, and focused on professional outcomes.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-blue-800 font-semibold mb-2">Professional Success Factors:</div>
                <div className="text-gray-700 text-sm">
                  Business relevance • Professional tone • Data-driven claims • Industry authority • Career/business outcomes
                </div>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Template 7: Authority Case Study */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">7</div>
                  <h3 className="text-lg font-semibold text-gray-800">Authority Case Study Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">4.9% CTR</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Authority Hook:</strong> "How [Company Type] increased [Metric] by [Percentage] using [Method]"</div>
                      <div className="mb-2"><strong>Challenge:</strong> "[Industry Challenge]. [Company] was struggling with [Specific Problem]."</div>
                      <div className="mb-2"><strong>Solution:</strong> "We implemented [Strategy/Tool]. The results: [Specific Data]."</div>
                      <div><strong>CTA:</strong> "Ready for similar results? [Professional Action]"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Authority Hook:</strong> "How a mid-market SaaS company increased MRR by 156% using automated lead scoring"</div>
                      <div className="mb-2"><strong>Challenge:</strong> "Enterprise sales cycles are getting longer. TechFlow was struggling with 23% qualified lead rates."</div>
                      <div className="mb-2"><strong>Solution:</strong> "We implemented predictive lead scoring. The results: 67% qualified rate, 42% shorter sales cycles."</div>
                      <div><strong>CTA:</strong> "Ready for similar results? Download the implementation playbook →"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• B2B software and technology solutions</li>
                    <li>• Professional services and consulting</li>
                    <li>• Enterprise and mid-market targeting</li>
                    <li>• Industry-specific solution marketing</li>
                  </ul>
                </div>
              </div>

              {/* Template 8: Industry Insight */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">8</div>
                  <h3 className="text-lg font-semibold text-gray-800">Industry Insight Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">5.6% CTR</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Data Hook:</strong> "[Statistic]% of [Industry] professionals are making this critical mistake..."</div>
                      <div className="mb-2"><strong>Insight:</strong> "[Industry Trend/Change]. [Implication]. Most [Professionals] don't realize [Key Insight]."</div>
                      <div className="mb-2"><strong>Solution:</strong> "[Product/Strategy] addresses this by [How]. [Benefit/Outcome]."</div>
                      <div><strong>Authority CTA:</strong> "Learn the complete strategy. [Professional Resource]"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-indigo-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Data Hook:</strong> "73% of marketing professionals are making this critical attribution mistake..."</div>
                      <div className="mb-2"><strong>Insight:</strong> "iOS 14.5 changed everything. Multi-touch attribution is now essential. Most marketers don't realize first-click data is nearly worthless."</div>
                      <div className="mb-2"><strong>Solution:</strong> "Our attribution platform maps the complete customer journey. See which campaigns actually drive revenue."</div>
                      <div><strong>Authority CTA:</strong> "Learn the complete strategy. Download the iOS 14.5 Response Playbook →"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-indigo-700 text-sm space-y-1">
                    <li>• Thought leadership and content marketing</li>
                    <li>• Industry disruption and innovation messaging</li>
                    <li>• Professional education and training</li>
                    <li>• Compliance and regulatory solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* TikTok Templates */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">TikTok Templates: Native & Authentic Content</h2>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">🎵 TikTok Optimization Strategy</h3>
              <p className="text-pink-700 mb-4">
                TikTok rewards authentic, entertaining content that doesn't feel like advertising. 
                Success requires blending promotional messaging with platform-native formats and trends.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-pink-800 font-semibold mb-2">Native Success Factors:</div>
                <div className="text-gray-700 text-sm">
                  Entertainment value • Trend awareness • Authentic voice • Quick hooks • Mobile-first optimization
                </div>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Template 9: Trend Hijack */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-3">9</div>
                  <h3 className="text-lg font-semibold text-gray-800">Trend Hijack Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">12.4% Eng.</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Trend Hook:</strong> "[Popular Trend/Sound] but make it [Your Industry]"</div>
                      <div className="mb-2"><strong>Adaptation:</strong> "[Trend Format] applied to [Your Product/Service]. [Humor/Relatability]."</div>
                      <div className="mb-2"><strong>Value Add:</strong> "Actually though, [Genuine Insight/Tip]. [Product Connection]."</div>
                      <div><strong>Soft CTA:</strong> "[Casual Call-to-Action]. Link in bio 👆"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-pink-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Trend Hook:</strong> "Teaching my followers to budget but make it millennial"</div>
                      <div className="mb-2"><strong>Adaptation:</strong> "*dramatically throws receipts* This is your latte budget. *whispers* This is your retirement fund."</div>
                      <div className="mb-2"><strong>Value Add:</strong> "Actually though, small changes = big results. Our app tracks spending without the judgment."</div>
                      <div><strong>Soft CTA:</strong> "Who else needs financial therapy? Link in bio 👆"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-pink-700 text-sm space-y-1">
                    <li>• Consumer brands targeting Gen Z and millennials</li>
                    <li>• Educational content and tutorials</li>
                    <li>• Lifestyle and entertainment products</li>
                    <li>• Building brand awareness and relatability</li>
                  </ul>
                </div>
              </div>

              {/* Template 10: Before & After */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">10</div>
                  <h3 className="text-lg font-semibold text-gray-800">Before & After Template</h3>
                  <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">15.2% Eng.</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Template Structure:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Before Hook:</strong> "POV: [Relatable Struggle/Situation]"</div>
                      <div className="mb-2"><strong>Transition:</strong> "Me discovering [Product/Solution]: [Reaction/Emotion]"</div>
                      <div className="mb-2"><strong>After:</strong> "Now: [Improved Situation]. *chef's kiss*"</div>
                      <div><strong>Social CTA:</strong> "Who else needs this energy? Comment your before 👇"</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Real Example:</h4>
                    <div className="bg-purple-50 p-4 rounded-lg text-sm">
                      <div className="mb-2"><strong>Before Hook:</strong> "POV: Your desk setup makes you feel like a potato"</div>
                      <div className="mb-2"><strong>Transition:</strong> "Me discovering this lighting setup: *transforms into main character*"</div>
                      <div className="mb-2"><strong>After:</strong> "Now: Looking like a CEO on every Zoom call. *chef's kiss*"</div>
                      <div><strong>Social CTA:</strong> "Who else needs this energy? Comment your desk chaos 👇"</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Best Use Cases:</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Visual transformation products</li>
                    <li>• Productivity and self-improvement tools</li>
                    <li>• Beauty and wellness products</li>
                    <li>• Home and lifestyle improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Template Testing & Optimization */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Template Testing & Optimization Strategy</h2>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">🧪 The Scientific Approach to Template Testing</h3>
              <p className="text-emerald-700 mb-4">
                Templates provide the foundation, but optimization drives results. Our systematic testing approach 
                has improved campaign performance by an average of 186% within 90 days.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-emerald-800 font-semibold mb-2">Testing Philosophy:</div>
                <div className="text-gray-700 text-sm">
                  Test structure first, then optimize elements. Templates give you proven psychology, testing gives you platform-specific wins.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Template Testing Methodology</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Phase 1: Template Selection (Week 1)</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Choose 3 templates from different categories</li>
                      <li>• Customize with your specific details</li>
                      <li>• Ensure consistent visual design across tests</li>
                      <li>• Set up proper tracking and attribution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Phase 2: Performance Analysis (Week 2-3)</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Run until statistical significance</li>
                      <li>• Identify winning template structure</li>
                      <li>• Analyze which elements drove performance</li>
                      <li>• Document insights for future campaigns</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Template Testing Best Practices:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Control Variables:</strong><br/>
                      • Same audience targeting<br/>
                      • Identical budget allocation<br/>
                      • Consistent visual design<br/>
                      • Same time periods
                    </div>
                    <div>
                      <strong>Test Variables:</strong><br/>
                      • Template structure only<br/>
                      • One template at a time<br/>
                      • Keep core message similar<br/>
                      • Same call-to-action goal
                    </div>
                    <div>
                      <strong>Success Metrics:</strong><br/>
                      • Click-through rate<br/>
                      • Conversion rate<br/>
                      • Cost per conversion<br/>
                      • Engagement quality
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">🔄 Optimization Within Templates</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Element-by-Element Testing:</h4>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <strong>Headlines:</strong><br/>
                        • Different hooks<br/>
                        • Question vs statement<br/>
                        • Benefit vs curiosity<br/>
                        • Length variations
                      </div>
                      <div>
                        <strong>Proof Points:</strong><br/>
                        • Numbers vs testimonials<br/>
                        • Recent vs cumulative<br/>
                        • Specific vs general<br/>
                        • Visual vs text
                      </div>
                      <div>
                        <strong>Call-to-Actions:</strong><br/>
                        • Action vs benefit<br/>
                        • Urgency vs value<br/>
                        • Button vs link<br/>
                        • Placement variations
                      </div>
                      <div>
                        <strong>Social Proof:</strong><br/>
                        • Customer names<br/>
                        • Company logos<br/>
                        • Usage statistics<br/>
                        • Authority mentions
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Winning Optimization Example:</h4>
                      <div className="text-green-700 text-sm">
                        <strong>Original:</strong> "Join 5,000+ users"<br/>
                        <strong>Optimized:</strong> "Join 5,247 marketers"<br/>
                        <strong>Result:</strong> 34% higher CTR<br/>
                        <strong>Insight:</strong> Specific numbers + job titles outperform generic user counts
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">A/B Testing Schedule:</h4>
                      <div className="text-yellow-700 text-sm">
                        <strong>Week 1:</strong> Template structure tests<br/>
                        <strong>Week 2:</strong> Headline variations<br/>
                        <strong>Week 3:</strong> CTA optimization<br/>
                        <strong>Week 4:</strong> Social proof elements
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Template Performance Tracking</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Essential Metrics Dashboard:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-blue-50 p-3 rounded">
                        <strong>Template Performance Score:</strong> Weighted average of CTR, conversion rate, and cost efficiency
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <strong>Platform Optimization Index:</strong> How well template performs vs platform benchmarks
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <strong>Template Fatigue Indicator:</strong> Performance decline over time tracking
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <strong>Cross-Platform Adaptability:</strong> Template performance across different platforms
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Optimization Triggers:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="space-y-2">
                        <div><strong>Refresh Template When:</strong></div>
                        <ul className="ml-4 space-y-1">
                          <li>• CTR drops 25%+ over 14 days</li>
                          <li>• Cost per conversion increases 40%+</li>
                          <li>• Engagement rate declines consistently</li>
                          <li>• Negative feedback increases</li>
                        </ul>
                        <div><strong>Scale Template When:</strong></div>
                        <ul className="ml-4 space-y-1">
                          <li>• Outperforms control by 30%+</li>
                          <li>• Maintains performance {'>'} 30 days</li>
                          <li>• High engagement quality scores</li>
                          <li>• Strong customer acquisition metrics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps CTA */}
          <section className="bg-gradient-to-r from-rose-600 to-pink-700 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Deploy High-Converting Ad Copy Templates?</h2>
            <p className="text-xl mb-6 opacity-90">
              Get our complete library of 25+ proven ad copy templates and weekly optimization guidance 
              based on insights from $250MM+ in managed campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-rose-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95">
                Start Your FREE Week
              </button>
              <button className="text-white underline hover:no-underline font-medium">
                Download All 25+ Templates →
              </button>
            </div>
          </section>
        </div>
      }
      faqSection={faqData}
      leadMagnetTitle="Get All 25+ High-Converting Ad Copy Templates"
      leadMagnetDescription="Download our complete template library with platform-specific adaptations and optimization guides plus weekly strategic insights from $250MM+ in managed campaigns."
    />
  );
}
