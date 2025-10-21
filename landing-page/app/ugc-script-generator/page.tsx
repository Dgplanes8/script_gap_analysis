export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ToolHeader } from '@/components/shared/tool-header';
import { SoftwareApplicationSchema } from '@/components/schema/software-application-schema';
import { FAQSection, SPECIALIZED_FAQS } from '@/components/schema/faq-schema';

export const metadata: Metadata = {
  title: 'Free UGC Script Generator - Creator-Ready Ad Scripts in 30 Seconds | APSICS',
  description: 'Generate authentic UGC ad scripts optimized for creator voice. Platform-agnostic, creator-friendly format from $250M intelligence. Free 10 credits/month, no signup required.',
  keywords: 'ugc script generator, ugc script generator free, user generated content script, ugc creator script, ugc ad script, authentic ugc script, creator script generator, ugc video script, influencer script generator, creator ad script template',
  openGraph: {
    title: 'Free UGC Script Generator - Creator-Ready Ad Scripts',
    description: 'Generate authentic UGC ad scripts optimized for creator voice in 30 seconds. Platform-agnostic, creator-friendly format.',
    type: 'website',
    url: 'https://apsicsmedia.com/ugc-script-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UGC Script Generator',
    description: 'Generate creator-ready UGC ad scripts in 30 seconds from $250M ad intelligence.',
  },
  alternates: {
    canonical: '/ugc-script-generator',
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

export default function UGCScriptGeneratorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name="UGC Script Generator"
        description="Generate authentic user-generated content scripts optimized for creator voice. Platform-agnostic, creator-friendly format from $250M intelligence."
        url="/ugc-script-generator"
        category="BusinessApplication"
        aggregateRating={{
          ratingValue: '4.9',
          ratingCount: '318'
        }}
        featureList={[
          'Authentic creator voice optimization',
          'Platform-agnostic script format',
          'Creator-friendly structure',
          'Natural testimonial flow',
          'Hooks designed for real people',
          'Free 10 monthly credits'
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
        <ToolHeader fallback={<AlyticsNavbar />} />

        {/* UGC-Specific Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎬 UGC CREATOR OPTIMIZED
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Generate Creator-Ready UGC Scripts in 30 Seconds
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Authentic scripts that sound like real people, not ads. Creator-friendly format with natural testimonial flow,
                built from analyzing $250M in UGC ad performance.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Authentic Creator Voice
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Natural Testimonials
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Platform-Agnostic
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  ✓ Creator-Friendly
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why UGC Scripts Are Different */}
        <section className="py-8 px-4 bg-white border-b">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why User-Generated Content Scripts Require Authentic Optimization
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-bold text-gray-900 mb-2">Trust Through Authenticity</h3>
                <p className="text-sm text-gray-600">
                  UGC ads that feel scripted fail. Scripts must sound like real testimonials from actual users to maintain trust.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">🎭</div>
                <h3 className="font-bold text-gray-900 mb-2">Creator Comfort</h3>
                <p className="text-sm text-gray-600">
                  Scripts written for creators (not actors) with natural pauses, conversational language, and flexible delivery.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-gray-900 mb-2">Cross-Platform Ready</h3>
                <p className="text-sm text-gray-600">
                  UGC scripts work across TikTok, Reels, Shorts, and Stories with minimal adaptation needed.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6">
              <p className="text-sm text-gray-700">
                <strong>What makes our UGC scripts different:</strong> We analyze what makes UGC content convert at 3-4x
                the rate of traditional ads. Our scripts balance authenticity with persuasion, giving creators natural-sounding
                copy that drives results.
              </p>
            </div>
          </div>
        </section>

        {/* Main Tool */}
        <div className="pt-8 md:pt-12">
          <AdScriptGeneratorClient />
        </div>

        {/* UGC Script Structure */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The UGC Script Formula That Converts
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-600 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Relatable Problem Hook (3-5 seconds)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Start with a problem your audience instantly relates to. Use "I" language and casual tone.
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Example: "Okay so I used to spend like 2 hours planning my content calendar every week..."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-pink-500">
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-600 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Discovery Story (10-15 seconds)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Share how you found the product/service naturally. Include skepticism if authentic.
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Example: "Then my friend told me about [Product]. I was skeptical at first but decided to try it..."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-600 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Transformation + Specifics (10-15 seconds)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Show the before/after with specific details. Real numbers, real timelines.
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Example: "Now it takes me like 20 minutes max. I've posted 3x more consistently for 2 months straight."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Natural Recommendation (3-5 seconds)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Soft CTA that feels like a genuine recommendation to a friend.
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Example: "If you struggle with content planning, seriously just try it. Link in my bio."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UGC Best Practices */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              UGC Script Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-bold text-gray-900 mb-3">✓ Do This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Use conversational filler words ("like", "so", "honestly")</li>
                  <li>• Include natural pauses and transitions</li>
                  <li>• Mention specific results/numbers</li>
                  <li>• Add personal story elements</li>
                  <li>• Keep language casual and relatable</li>
                  <li>• Allow room for creator personality</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-bold text-gray-900 mb-3">✗ Avoid This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Corporate buzzwords and jargon</li>
                  <li>• Overly polished, scripted feel</li>
                  <li>• Listing features instead of benefits</li>
                  <li>• Aggressive sales language</li>
                  <li>• Perfect grammar (too formal)</li>
                  <li>• Generic testimonials without specifics</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">💡 Pro Tip for Brands</h3>
              <p className="text-sm text-gray-700">
                Send UGC scripts to creators as <strong>guidelines, not word-for-word scripts</strong>. The best UGC
                happens when creators add their own personality while hitting your key messaging points. Include
                "must-mention" points and let them fill in their authentic voice.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              More Script Generator Tools
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href="/tiktok-ad-script-generator"
                className="block p-6 bg-gradient-to-br from-cyan-50 to-pink-50 rounded-lg border hover:border-[#126DFB] transition-colors"
              >
                <div className="text-2xl mb-2">🎵</div>
                <h3 className="font-bold text-gray-900 mb-2">TikTok Scripts</h3>
                <p className="text-sm text-gray-600">Platform-native scripts for TikTok virality</p>
              </a>

              <a
                href="/ai-ad-script-generator"
                className="block p-6 bg-white rounded-lg border hover:border-[#126DFB] transition-colors"
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
          faqs={SPECIALIZED_FAQS.ugc_script_generator}
          title="UGC Script Generator: Frequently Asked Questions"
          subtitle="Everything you need to know about creating authentic user-generated content scripts"
          variant="default"
        />
      </div>
    </>
  );
}
