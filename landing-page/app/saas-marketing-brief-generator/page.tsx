export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';
import { StudioFoundingOfferCard } from '@/components/alytics/studio-founding-offer-card';
import { SoftwareApplicationSchema } from '@/components/schema/software-application-schema';
import { FAQSection, SPECIALIZED_FAQS } from '@/components/schema/faq-schema';

export const metadata: Metadata = {
  title: 'Free SaaS Marketing Brief Generator - Growth Team Tool | APSICS Media',
  description: 'Generate execution-ready SaaS marketing briefs in 60 seconds. Target audience, ICP, growth metrics, positioning—built for B2B SaaS teams. Free 10 credits/month, no signup.',
  keywords: 'saas marketing brief generator, b2b saas marketing brief, saas campaign brief tool, saas growth marketing brief, startup marketing brief generator, b2b marketing brief template, saas positioning brief, product marketing brief saas, growth team brief tool, saas advertising brief',
  openGraph: {
    title: 'Free SaaS Marketing Brief Generator - Growth Team Tool',
    description: 'Generate execution-ready SaaS marketing briefs in 60 seconds. Target audience, ICP, growth metrics, positioning for B2B SaaS.',
    type: 'website',
    url: 'https://apsicsmedia.com/saas-marketing-brief-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SaaS Marketing Brief Generator',
    description: 'Generate B2B SaaS marketing briefs in 60 seconds from $250M intelligence.',
  },
  alternates: {
    canonical: '/saas-marketing-brief-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Dynamic import - reuses main brief generator
const TemplatedCreativeBriefGeneratorClient = nextDynamic(() => import('../creative-brief-generator/templated-client-page'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#126DFB]"></div>
    </div>
  ),
  ssr: false
});

export default function SaaSMarketingBriefGeneratorPage() {
  const config = getToolConfig('creative-brief-generator');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <>
      <SoftwareApplicationSchema
        name="SaaS Marketing Brief Generator"
        description="Generate execution-ready SaaS marketing briefs with ICP analysis, growth metrics, and positioning frameworks built from $250M in B2B intelligence."
        url="/saas-marketing-brief-generator"
        category="BusinessApplication"
        aggregateRating={{
          ratingValue: '4.9',
          ratingCount: '89'
        }}
        featureList={[
          'ICP and buyer persona analysis',
          'SaaS-specific positioning frameworks',
          'Growth metric integration',
          'PLG and sales-led strategy options',
          'Stage-appropriate messaging (PMF to scale)',
          'Free 10 monthly credits'
        ]}
      />

      {/* SaaS-Specific Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 B2B SAAS OPTIMIZED
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              SaaS Marketing Brief Generator for Growth Teams
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
              Generate execution-ready marketing briefs with ICP analysis, growth metrics, and positioning frameworks.
              Built specifically for B2B SaaS companies from seed to Series B.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                ✓ ICP Analysis
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                ✓ Growth Metrics
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                ✓ Positioning Framework
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                ✓ Stage-Appropriate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why SaaS Briefs Are Different */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why SaaS Marketing Briefs Require Specialized Frameworks
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">ICP Over Demographics</h3>
              <p className="text-sm text-gray-600">
                SaaS briefs need Ideal Customer Profile definition: company size, tech stack, pain points, buying committee—not just age/location.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Metrics That Matter</h3>
              <p className="text-sm text-gray-600">
                CAC, LTV, MRR, churn rate, activation rate. SaaS briefs must align creative with unit economics and growth metrics.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold text-gray-900 mb-2">Journey Complexity</h3>
              <p className="text-sm text-gray-600">
                Multi-touch attribution, free trial optimization, PLG motions, sales enablement—SaaS marketing is a complex system.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6">
            <p className="text-sm text-gray-700">
              <strong>What makes our SaaS brief generator different:</strong> Built from analyzing $250M+ in B2B SaaS
              marketing performance. Our briefs include stage-specific frameworks (pre-PMF to growth stage), PLG vs sales-led
              considerations, and metrics-driven creative direction that aligns with your unit economics.
            </p>
          </div>
        </div>
      </section>

      <AIToolTemplate
        config={config.template}
        secondaryHeaderProps={config.secondaryHeader}
        headerComponent={<AlyticsNavbar />}
        foundersClubContent={<StudioFoundingOfferCard />}
        processContent={<ProcessSection config={config.process} />}
        pricingContent={<SimplePricingSection />}
      >
        <TemplatedCreativeBriefGeneratorClient />
      </AIToolTemplate>

      {/* SaaS-Specific Brief Components */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included in a SaaS Marketing Brief
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">1. ICP & Buyer Persona Analysis</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Company size (employees, revenue) and industry vertical</li>
                <li>• Tech stack and integration requirements</li>
                <li>• Buying committee roles and decision criteria</li>
                <li>• Current solution and switching costs</li>
                <li>• Jobs-to-be-done framework analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">2. Positioning & Messaging</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Category positioning (leader, challenger, niche)</li>
                <li>• Core value proposition tied to business outcomes</li>
                <li>• Competitive differentiation and moats</li>
                <li>• Pain point → solution → outcome narrative</li>
                <li>• Feature-benefit mapping for key capabilities</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">3. Growth Metrics & Goals</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Target CAC and payback period</li>
                <li>• Conversion rates by funnel stage</li>
                <li>• Trial-to-paid activation metrics</li>
                <li>• Expected LTV:CAC ratio improvement</li>
                <li>• Channel-specific performance benchmarks</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">4. Campaign Strategy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• PLG (product-led growth) vs sales-led approach</li>
                <li>• Channel strategy (paid social, content, outbound)</li>
                <li>• Funnel stage targeting (awareness, consideration, decision)</li>
                <li>• Creative concept direction and messaging angles</li>
                <li>• Success metrics and optimization framework</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Brief Use Cases */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Common SaaS Marketing Brief Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">🚀 Launch Campaigns</h3>
              <p className="text-sm text-gray-600 mb-3">
                New product launch, feature release, or market entry campaigns with positioning and go-to-market strategy.
              </p>
              <div className="text-xs text-gray-500">
                Ideal for: Series A+ companies launching new offerings
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">📈 Growth Experiments</h3>
              <p className="text-sm text-gray-600 mb-3">
                Testing new channels, messaging angles, or audience segments with clear hypothesis and success metrics.
              </p>
              <div className="text-xs text-gray-500">
                Ideal for: Growth stage companies optimizing CAC
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">🎯 ICP Expansion</h3>
              <p className="text-sm text-gray-600 mb-3">
                Expanding to new verticals, company sizes, or use cases with adapted positioning and messaging.
              </p>
              <div className="text-xs text-gray-500">
                Ideal for: Post-PMF companies scaling ICP
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-3">🔄 Reactivation Campaigns</h3>
              <p className="text-sm text-gray-600 mb-3">
                Churned user winback or trial user activation campaigns with retention-focused messaging.
              </p>
              <div className="text-xs text-gray-500">
                Ideal for: SaaS companies with churn challenges
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            More Marketing Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="/creative-brief-generator"
              className="block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border hover:border-[#126DFB] transition-colors"
            >
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-bold text-gray-900 mb-2">General Brief Generator</h3>
              <p className="text-sm text-gray-600">Multi-industry creative brief generator</p>
            </a>

            <a
              href="/ai-ad-script-generator"
              className="block p-6 bg-white rounded-lg border hover:border-[#126DFB] transition-colors"
            >
              <div className="text-2xl mb-2">🎬</div>
              <h3 className="font-bold text-gray-900 mb-2">Ad Script Generator</h3>
              <p className="text-sm text-gray-600">Platform-native video ad scripts</p>
            </a>
          </div>

          <div className="text-center mt-8">
            <a
              href="/ai-ad-iteration-tool"
              className="inline-block text-[#126DFB] hover:text-[#0F5AD6] font-semibold"
              >
              View All Marketing Tools →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section for Featured Snippets */}
      <FAQSection
        faqs={SPECIALIZED_FAQS.saas_brief_generator}
        title="SaaS Marketing Brief Generator: Frequently Asked Questions"
        subtitle="Master SaaS marketing briefs with answers tailored for B2B growth teams"
        variant="default"
      />
    </>
  );
}
