export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ToolHeader } from '@/components/shared/tool-header';
import { SoftwareApplicationSchema } from '@/components/schema/software-application-schema';
import { FAQSection, SPECIALIZED_FAQS } from '@/components/schema/faq-schema';

export const metadata: Metadata = {
  title: 'Free TikTok Ad Script Generator - Viral Video Scripts in 30 Seconds | APSICS',
  description: 'Generate platform-native TikTok ad scripts optimized for virality. Trend-integrated hooks, native feel, creator-ready copy from $250M intelligence. Free 10 credits/month, no signup.',
  keywords: 'tiktok ad script generator, tiktok script generator free, tiktok video ad script, tiktok advertising script, viral tiktok script, tiktok ad copy generator, tiktok marketing script, tiktok creator script, tiktok ad template, platform native tiktok ads',
  openGraph: {
    title: 'Free TikTok Ad Script Generator - Viral Video Scripts',
    description: 'Generate platform-native TikTok ad scripts optimized for virality in 30 seconds. Trend-integrated, creator-ready copy.',
    type: 'website',
    url: 'https://apsicsmedia.com/tiktok-ad-script-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TikTok Ad Script Generator',
    description: 'Generate viral TikTok ad scripts in 30 seconds from $250M ad intelligence.',
  },
  alternates: {
    canonical: '/tiktok-ad-script-generator',
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

// Dynamic import - reuses main script generator
const AdScriptGeneratorClient = nextDynamic(() => import('../ai-ad-script-generator/client-page'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#126DFB]"></div>
    </div>
  ),
  ssr: false
});

export default function TikTokAdScriptGeneratorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name="TikTok Ad Script Generator"
        description="Generate platform-native TikTok ad scripts optimized for virality. Trend-integrated hooks, native feel, creator-ready copy from $250M intelligence."
        url="/tiktok-ad-script-generator"
        category="BusinessApplication"
        aggregateRating={{
          ratingValue: '4.8',
          ratingCount: '243'
        }}
        featureList={[
          'TikTok-native script generation',
          'Viral hook creation',
          'Trend integration',
          'Platform algorithm optimization',
          'Creator-ready format',
          'Free 10 monthly credits'
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
        <ToolHeader fallback={<AlyticsNavbar />} />

        {/* TikTok-Specific Hero Section */}
        <section className="bg-gradient-to-r from-[#00f2ea] via-[#ff0050] to-[#000000] text-white py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <div className="inline-flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎵 TIKTOK OPTIMIZED
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Generate Viral TikTok Ad Scripts in 30 Seconds
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Platform-native scripts optimized for TikTok's algorithm. Trend-integrated hooks, creator-ready format,
                and virality-focused copy from $250M in ad testing.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Trend-Integrated Hooks
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Native TikTok Feel
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Algorithm Optimized
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Creator Format
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why TikTok Scripts Are Different */}
        <section className="py-8 px-4 bg-white border-b">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why TikTok Ad Scripts Require Platform-Specific Optimization
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">3-Second Hook Rule</h3>
                <p className="text-sm text-gray-600">
                  TikTok users scroll faster than any platform. Your hook must capture attention in 3 seconds or you've lost them.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">🎭</div>
                <h3 className="font-bold text-gray-900 mb-2">Native Content Wins</h3>
                <p className="text-sm text-gray-600">
                  Ads that feel like organic TikToks perform 3x better. Polished, corporate copy gets scrolled past instantly.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-gray-900 mb-2">Trend Integration</h3>
                <p className="text-sm text-gray-600">
                  Leveraging current TikTok trends, sounds, and formats increases completion rates by 40%+.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6">
              <p className="text-sm text-gray-700">
                <strong>What makes our TikTok scripts different:</strong> Built from analyzing $250M+ in TikTok ad performance,
                our generator understands platform-specific psychology, trending formats, and native content patterns that drive results.
              </p>
            </div>
          </div>
        </section>

        {/* Main Tool */}
        <div className="pt-8 md:pt-12">
          <AdScriptGeneratorClient />
        </div>

        {/* TikTok-Specific Tips */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              TikTok Ad Script Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-bold text-gray-900 mb-3">✓ Do This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Start with pattern interrupt or trending hook</li>
                  <li>• Use casual, conversational language</li>
                  <li>• Keep scripts 15-30 seconds max</li>
                  <li>• Include visual cues and transitions</li>
                  <li>• Add trending sound suggestions</li>
                  <li>• Make CTA feel native, not salesy</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-bold text-gray-900 mb-3">✗ Avoid This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Corporate, formal language</li>
                  <li>• Scripts longer than 60 seconds</li>
                  <li>• Heavy product features (focus benefits)</li>
                  <li>• Ignoring current TikTok trends</li>
                  <li>• Over-produced, staged feeling</li>
                  <li>• Direct "buy now" without value first</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              More Script Generator Tools
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href="/ugc-script-generator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border hover:border-[#126DFB] transition-colors"
              >
                <div className="text-2xl mb-2">🎬</div>
                <h3 className="font-bold text-gray-900 mb-2">UGC Scripts</h3>
                <p className="text-sm text-gray-600">Creator-ready scripts for authentic content</p>
              </a>

              <a
                href="/ai-ad-script-generator"
                className="block p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border hover:border-[#126DFB] transition-colors"
              >
                <div className="text-2xl mb-2">✨</div>
                <h3 className="font-bold text-gray-900 mb-2">General Script Generator</h3>
                <p className="text-sm text-gray-600">Multi-platform ad script creation</p>
              </a>
            </div>

            <div className="text-center mt-8">
              <a
                href="/creative-brief-generator"
                className="inline-block text-[#126DFB] hover:text-[#0F5AD6] font-semibold"
              >
                View All Marketing Tools →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section for Featured Snippets */}
        <FAQSection
          faqs={SPECIALIZED_FAQS.tiktok_script_generator}
          title="TikTok Ad Script Generator: Frequently Asked Questions"
          subtitle="Master TikTok ad scripts with answers to the most common questions"
          variant="default"
        />
      </div>
    </>
  );
}
