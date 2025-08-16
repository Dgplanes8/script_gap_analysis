import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Zap, Target, TrendingUp } from 'lucide-react';
import { HookGeneratorDemo } from '@/components/creative/hook-generator-demo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServiceTiers } from '@/components/layout/service-tiers';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export const metadata: Metadata = {
  title: 'Free Ad Hook Generator - Copywriting Templates & Creative Scripts | Hook Generator Tool',
  description: 'Generate high-converting ad hooks and copywriting templates for TikTok, Facebook, and Instagram. Reduce CAC by 25% with our free hook generator using conversion psychology and viral content analysis.',
  keywords: 'ad hook generator, copywriting templates, creative hooks, facebook ad templates, tiktok hooks, hook generator tool, viral content generator, conversion copywriting, social media hooks, creative scripts, ad copywriting, subscription marketing hooks',
  openGraph: {
    title: 'Free Ad Hook Generator - Copywriting Templates & Creative Scripts',
    description: 'Generate viral ad hooks and copywriting templates for TikTok, Facebook & Instagram. Reduce CAC by 25% with our free hook generator using conversion psychology.',
    images: [
      {
        url: '/og-images/hook-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Hook Generator Tool for Social Media Advertising',
      },
    ],
  },
};

export default function HookGeneratorPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                  <Zap className="h-4 w-4 mr-2" />
                  Hook Generation System
                </div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Free Hook Generator - Create High-Converting Ad Hooks & Copywriting Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Generate viral ad hooks and creative scripts optimized for TikTok, Facebook, and Instagram. Our free hook generator creates copywriting templates that reduce CAC by 25% using audience psychology and conversion optimization.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Target className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Audience-Aware</h3>
                  <p className="text-gray-600 text-sm">Hooks optimized for 5 different awareness levels, from unaware to most-aware audiences.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Zap className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Platform-Native</h3>
                  <p className="text-gray-600 text-sm">Tailored for TikTok's casual tone, Facebook's problem-solution focus, and Instagram's visual storytelling.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Performance-Scored</h3>
                  <p className="text-gray-600 text-sm">Each hook receives a 25-point performance score based on attention, emotion, clarity, CTA power, and memorability.</p>
                </div>
              </div>

              {/* Email CTA */}
              <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl border">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Get 10 Proven High-Converting Hooks
                  </h2>
                  <p className="text-gray-600">
                    Start with our Hook Bank PDF featuring 10 battle-tested hooks that have generated millions in ad spend. Join 1,200+ growth marketers getting weekly creative intelligence.
                  </p>
                </div>
                <EmailCaptureForm 
                  source="hook-generator-hero"
                  variant="cta"
                  buttonText="Get My 10 Free Hooks"
                  placeholder="Enter your work email address"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Hook Generator */}
        <HookGeneratorDemo />

        {/* Hook Writing Framework */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Hook Writing Framework
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">The Curiosity + Big Promise Formula</h3>
                  <p className="text-gray-600 mb-6">
                    Every high-performing hook combines two essential elements: curiosity that stops the scroll and a big promise that creates desire. Here's how we structure it:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Curiosity Elements</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Pattern interrupts ("POV:", "Wait, what?")</li>
                        <li>• Specific numbers ("$5K/month", "7 days")</li>
                        <li>• Controversial statements</li>
                        <li>• Behind-the-scenes reveals</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Big Promise Elements</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Clear transformation outcome</li>
                        <li>• Time-specific results</li>
                        <li>• Problem elimination</li>
                        <li>• Status achievement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Platform-Specific Optimization</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">TikTok Hooks</h4>
                      <p className="text-sm text-gray-600 mb-3">Casual, conversational, trend-aware</p>
                      <div className="text-xs text-gray-500">
                        "POV: You're spending $5K/month on ads but..."
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Facebook Hooks</h4>
                      <p className="text-sm text-gray-600 mb-3">Problem-focused, benefit-driven</p>
                      <div className="text-xs text-gray-500">
                        "The Hidden Reason Your Ads Stop Working After 7 Days..."
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Instagram Hooks</h4>
                      <p className="text-sm text-gray-600 mb-3">Visual storytelling, lifestyle-focused</p>
                      <div className="text-xs text-gray-500">
                        "Finally. Creative concepts that don't require waiting..."
                      </div>
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