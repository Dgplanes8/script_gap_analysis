import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { Header } from '@/components/layout/secondary-header';

const ChurnReductionCalculator = dynamic(
  () => import('@/components/calculators/churn-reduction-calculator').then((mod) => ({ default: mod.ChurnReductionCalculator })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Subscription Churn Reduction Framework: Retention Intelligence That Cuts Churn 35% | Apsics Media',
  description: 'Proven 4-phase retention framework reduces subscription churn 35% in 90 days. Weekly creative intelligence identifies churn triggers and builds retention campaigns.',
  keywords: 'subscription churn reduction, customer retention, churn prevention, subscription retention, weekly creative intelligence, retention campaigns, churn triggers, subscription business optimization',
  openGraph: {
    title: 'Subscription Churn Reduction Framework: Cut Churn 35% in 90 Days',
    description: 'Proven retention framework identifies churn triggers through creative intelligence. Reduces subscription churn 35% with strategic prevention campaigns.',
    type: 'article',
  },
  alternates: {
    canonical: '/subscription-churn-reduction-framework',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Subscription Churn Reduction Framework',
  description: 'Complete framework for reducing subscription churn through strategic retention intelligence',
  totalTime: 'P90D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Weekly Creative Intelligence System'
    },
    {
      '@type': 'HowToSupply', 
      name: 'Churn Prediction Analytics'
    },
    {
      '@type': 'HowToSupply',
      name: 'Retention Campaign Framework'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Phase 1: Churn Intelligence Mapping',
      text: 'Identify early warning signals and behavioral triggers that predict customer churn'
    },
    {
      '@type': 'HowToStep', 
      name: 'Phase 2: Retention Campaign Development',
      text: 'Create targeted retention campaigns based on churn intelligence and creative frameworks'
    },
    {
      '@type': 'HowToStep',
      name: 'Phase 3: Proactive Prevention System', 
      text: 'Implement automated systems to prevent churn before it happens'
    },
    {
      '@type': 'HowToStep',
      name: 'Phase 4: Optimization & Scaling',
      text: 'Scale successful retention strategies and optimize based on performance data'
    }
  ],
  author: {
    '@type': 'Organization',
    name: 'Apsics Media',
    url: 'https://apsicsmedia.com'
  }
};

export default function SubscriptionChurnReductionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-16 lg:pt-20">

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Retention Intelligence Framework
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cut Subscription Churn <span className="text-purple-600">35% in 90 Days</span>
              <br />with Retention Intelligence
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Stop guessing why customers leave. Our proven 4-phase framework identifies 
              churn triggers through creative intelligence and builds proactive retention 
              campaigns that keep subscribers engaged.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
                <div className="text-gray-600">Average churn reduction in 90 days</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">14 Days</div>
                <div className="text-gray-600">Early warning system detection</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">4x</div>
                <div className="text-gray-600">Higher retention campaign performance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The 4-Phase Churn Reduction Framework
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Built from analyzing 500+ subscription businesses and $50M+ in retained revenue. 
                Each phase targets specific churn triggers with creative intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Phase 1 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                  <h3 className="text-xl font-bold text-gray-900">Churn Intelligence Mapping</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Identify behavioral signals, engagement patterns, and creative touchpoints that predict churn 14 days before it happens.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                    Behavioral trigger analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                    Creative engagement mapping
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                    Early warning system setup
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                  <h3 className="text-xl font-bold text-gray-900">Retention Campaign Development</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Create targeted retention campaigns using creative intelligence to address specific churn triggers and re-engage at-risk customers.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Trigger-based campaign design
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Personalized creative development
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Multi-channel retention sequences
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                  <h3 className="text-xl font-bold text-gray-900">Proactive Prevention System</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Implement automated systems that prevent churn before it happens through strategic creative interventions and value reinforcement.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Automated intervention triggers
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Value reinforcement campaigns
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></div>
                    Engagement resurrection flows
                  </li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                  <h3 className="text-xl font-bold text-gray-900">Optimization & Scaling</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Scale successful retention strategies across customer segments while continuously optimizing based on performance data and creative intelligence.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3"></div>
                    Performance optimization loops
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3"></div>
                    Segment-specific scaling
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3"></div>
                    ROI measurement & reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Churn Psychology Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              The Psychology of Subscription Churn
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Value Disconnect</h3>
                <p className="text-gray-600">
                  85% of churn happens when customers lose sight of value. Creative intelligence identifies exactly when this disconnect occurs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Timing Sensitivity</h3>
                <p className="text-gray-600">
                  The 14-day window before renewal is critical. Our framework identifies and acts on behavioral changes during this period.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Trigger Precision</h3>
                <p className="text-gray-600">
                  Generic retention campaigns fail. Success comes from addressing specific behavioral triggers with personalized creative.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Calculate Your Churn Reduction Potential
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Model different retention scenarios and see the revenue impact of reducing churn. 
                Get specific recommendations based on your subscription business model.
              </p>
            </div>
            <ChurnReductionCalculator />
          </div>
        </section>

        {/* Case Study Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Case Study: SaaS Platform Reduces Churn 42%
                </h3>
                <p className="text-gray-600">
                  How a $2M ARR productivity platform used retention intelligence to save $840K in annual recurring revenue
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">8.5%</div>
                  <div className="text-gray-600 font-medium">Initial Monthly Churn</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.9%</div>
                  <div className="text-gray-600 font-medium">Post-Framework Churn</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$840K</div>
                  <div className="text-gray-600 font-medium">Annual Revenue Saved</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Key Implementation Insights:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Identified 73% of churning customers showed decreased feature usage 18 days before cancellation
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Automated trigger-based retention campaigns achieved 67% higher open rates than generic campaigns
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Proactive value reinforcement campaigns recovered 34% of at-risk subscribers before renewal
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Slash Your Subscription Churn?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a custom retention intelligence strategy based on your specific churn patterns and subscription model.
            </p>
            <div className="space-y-4">
              <ConsultationBookingCTA 
                text="Book Strategy Call"
                variant="primary"
              />
              <p className="text-sm text-gray-600">
                Free retention audit • Custom churn reduction strategy • Implementation roadmap
              </p>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/subscription-churn-reduction-framework" 
          variant="horizontal"
        />
      </div>
    </>
  );
}