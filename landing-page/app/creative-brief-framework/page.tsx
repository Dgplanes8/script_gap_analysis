import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Target, Layers, CheckCircle } from 'lucide-react';
import { CreativeBriefStructure } from '@/components/creative/creative-brief-structure';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { ServiceTiers } from '@/components/layout/service-tiers';

export const metadata: Metadata = {
  title: 'Creative Brief Framework - Marketing Brief Template & Strategic Process | Creative Brief Guide',
  description: 'Master our proven creative brief framework and marketing brief template used by subscription companies to increase conversion rates 3x faster. Streamline creative development from concept to high-converting execution.',
  keywords: 'creative brief framework, marketing brief template, advertising brief, creative brief template, strategic creative process, marketing brief, creative development framework, subscription marketing brief, campaign brief template, creative strategy framework',
  openGraph: {
    title: 'Creative Brief Framework - Marketing Brief Template & Strategic Process',
    description: 'Master the creative brief framework and marketing brief template that helps subscription companies increase conversions 3x faster. From concept to high-converting execution.',
    images: [
      {
        url: '/og-images/creative-brief-framework.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative Brief Framework Guide',
      },
    ],
  },
};

export default function CreativeBriefFrameworkPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/"
                className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-100 to-blue-100 text-brand-800 rounded-full text-sm font-semibold mb-6">
                  <FileText className="h-4 w-4 mr-2" />
                  Creative Brief Framework
                </div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Creative Brief Framework - Marketing Brief Template & Strategic Process
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Master the creative brief framework and marketing brief template that subscription companies use to increase conversions 3x faster. Transform concepts into high-converting assets with our systematic creative development process.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Target className="h-8 w-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Strategic Focus</h3>
                  <p className="text-gray-600 text-sm">Every brief aligns creative execution with business objectives and audience psychology.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Layers className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Systematic Process</h3>
                  <p className="text-gray-600 text-sm">Repeatable framework that ensures consistency across all creative development projects.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <CheckCircle className="h-8 w-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Production-Ready</h3>
                  <p className="text-gray-600 text-sm">Briefs include all technical specifications and performance requirements for immediate execution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Brief Structure */}
        <CreativeBriefStructure />

        {/* Framework Deep Dive */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Framework Components Explained
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Strategic Foundation</h3>
                  <p className="text-gray-600 mb-6">
                    Every creative brief starts with strategic clarity. Without clear objectives and audience understanding, even the best creative execution will fail to drive results.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-brand-50 rounded-lg">
                      <h4 className="font-semibold text-brand-900 mb-2">Business Objectives</h4>
                      <ul className="text-sm text-brand-800 space-y-1">
                        <li>• Primary conversion goal</li>
                        <li>• Target cost per acquisition</li>
                        <li>• Attribution window requirements</li>
                        <li>• Brand positioning considerations</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Audience Psychology</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Awareness level assessment</li>
                        <li>• Pain point prioritization</li>
                        <li>• Emotional trigger mapping</li>
                        <li>• Platform behavior patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Creative Strategy Development</h3>
                  <p className="text-gray-600 mb-6">
                    Bridge the gap between strategic objectives and creative execution with our proven concept development process.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Concept Generation</h4>
                        <p className="text-sm text-gray-600">Develop 3-5 strategic concepts based on audience insights and competitive analysis.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Hook Development</h4>
                        <p className="text-sm text-gray-600">Create platform-specific hooks that align with each concept's strategic positioning.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Performance Scoring</h4>
                        <p className="text-sm text-gray-600">Evaluate each concept using our 25-point performance prediction framework.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Production Specifications</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Technical Requirements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Platform dimensions</li>
                        <li>• Duration specifications</li>
                        <li>• File format requirements</li>
                        <li>• Quality standards</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Creative Elements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Visual style guidelines</li>
                        <li>• Brand asset requirements</li>
                        <li>• Color palette specifications</li>
                        <li>• Typography guidelines</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Performance Metrics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Success criteria definition</li>
                        <li>• Testing methodology</li>
                        <li>• Optimization parameters</li>
                        <li>• Reporting requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Implementation Guidelines</h3>
                  <p className="text-gray-600 mb-6">
                    Ensure successful creative execution with clear implementation and testing protocols.
                  </p>
                  
                  <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
                    <h4 className="font-semibold text-brand-900 mb-3">Best Practices Checklist</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-sm text-brand-800 space-y-2">
                        <li>✓ Hook tested within first 3 seconds</li>
                        <li>✓ Clear value proposition communicated</li>
                        <li>✓ Single, specific call-to-action</li>
                        <li>✓ Brand assets properly integrated</li>
                      </ul>
                      <ul className="text-sm text-brand-800 space-y-2">
                        <li>✓ Platform optimization verified</li>
                        <li>✓ Performance benchmarks established</li>
                        <li>✓ A/B testing variations prepared</li>
                        <li>✓ Attribution tracking implemented</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Tiers CTA */}
        <section id="service-tiers">
          <ServiceTiers />
        </section>
      </main>

      <Footer />
    </>
  );
}