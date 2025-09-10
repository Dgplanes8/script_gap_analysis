'use client';

import { TrendingUp, Target, Building2, Users, Zap } from 'lucide-react';
import { HeroEnhanced } from '@/components/layout/hero-enhanced';
import { ServiceTiersEnhanced } from '@/components/layout/service-tiers-enhanced';
import { Header } from '@/components/layout/header';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Footer } from '@/components/layout/footer';
import { StartupObjectionPreemption } from '@/components/landing/startup-objection-preemption';
import { ConsultationProvider } from '@/components/contexts/consultation-context';


export default function HomePage() {

  return (
    <ConsultationProvider>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <HeroEnhanced
        title="Get Fresh Content Ideas + Custom Scripts That Convert"
        subtitle="Weekly content ideas + fully customized scripts for UGC, paid ads, and social media. Built from trending content intelligence and tailored to your specific needs."
        ctaText="Start Free Week"
        showEmailCapture={false}
      />

      {/* Value Proposition Section - Core problem/solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Stop Creating Content in the Dark
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Most founders create content without knowing what's trending or converting. We deliver fresh content ideas + custom scripts based on real trending data and performance intelligence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You're Creating Content Blindly</h3>
                <p className="text-gray-600">
                  Creating content without knowing what's trending or converting. Every post is a guess instead of strategic intelligence.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You Don't Have Content Intelligence</h3>
                <p className="text-gray-600">
                  Running your startup while trying to track trending content? You need custom scripts that work immediately.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You Get Trending Intelligence</h3>
                <p className="text-gray-600">
                  Our custom content ideas + scripts are based on real trending data. Launch with confidence, scale what converts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers Section - Prioritized for better conversion */}
      <section id="service-tiers">
        <ServiceTiersEnhanced />
      </section>

      {/* Benefits Section - Framer Style */}
      <section className="framer-section-padding framer-bg">
        <div className="framer-container">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="mb-4">
              <span className="framer-bg-light-blue framer-text-blue px-4 py-2 rounded-full framer-body-small font-medium">
                Benefits
              </span>
            </div>
            <h2 className="framer-heading-2 text-gray-900 mb-4 max-w-4xl mx-auto">
              Custom Content Intelligence That Delivers Results
            </h2>
            <p className="framer-body-bold framer-text max-w-3xl mx-auto">
              Get trending content ideas + fully customized scripts for UGC, paid ads, and social media that actually convert.
            </p>
          </div>
          
          {/* Benefits Grid - 6 Cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">Custom Content Ideas</h3>
              <p className="framer-body framer-text">
                Fresh content concepts based on trending data, customized for your specific audience and goals.
              </p>
            </div>
            
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">UGC + Paid Ad Scripts</h3>
              <p className="framer-body framer-text">
                Fully-customized scripts for user-generated content and paid advertising across all platforms.
              </p>
            </div>
            
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">Trending Intelligence</h3>
              <p className="framer-body framer-text">
                Real-time analysis of what's converting in social media and paid ads to keep your content fresh.
              </p>
            </div>
            
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">Custom Weekly Delivery</h3>
              <p className="framer-body framer-text">
                Personalized content concepts + scripts delivered every Monday, tailored to your brand and goals.
              </p>
            </div>
            
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">Platform-Specific Scripts</h3>
              <p className="framer-body framer-text">
                Custom scripts optimized for TikTok, Instagram, Facebook, LinkedIn - each platform's unique requirements.
              </p>
            </div>
            
            <div className="framer-feature-card text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="framer-heading-5 mb-3">Performance Intelligence</h3>
              <p className="framer-body framer-text">
                $250MM+ managed spend experience + trending data analysis for maximum conversion potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Delivery Showcase - Framer Style */}
      <section className="framer-section-padding framer-bg-white">
        <div className="framer-container">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="mb-4">
              <span className="framer-bg-light-blue framer-text-blue px-4 py-2 rounded-full framer-body-small font-medium">
                Weekly Delivery
              </span>
            </div>
            <h2 className="framer-heading-2 text-gray-900 mb-4 max-w-4xl mx-auto">
              See What You'll Receive Every Monday
            </h2>
            <p className="framer-body-bold framer-text max-w-3xl mx-auto">
              Get a behind-the-scenes look at the exact templates, scripts, and insights delivered to your inbox.
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Template Gallery */}
            <div>
              <div className="framer-card">
                <h3 className="framer-heading-4 mb-6">This Week's Creative Templates</h3>
                
                {/* Template Previews Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-2"></div>
                      <span className="framer-body-small text-gray-600">[TikTok Template]</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                      <span className="framer-body-small text-gray-600">[Facebook Template]</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2"></div>
                      <span className="framer-body-small text-gray-600">[Instagram Template]</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2"></div>
                      <span className="framer-body-small text-gray-600">[LinkedIn Template]</span>
                    </div>
                  </div>
                </div>
                
                {/* Asset Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="framer-body-small text-yellow-800">
                    <strong>[ASSET NEEDED]:</strong> Screenshots of actual weekly template deliveries
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right: Sample Scripts & Performance */}
            <div>
              <div className="framer-card mb-6">
                <h3 className="framer-heading-4 mb-4">Sample Script Delivery</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="framer-body-small font-medium">Hook Performance Score</span>
                    <span className="framer-text-blue font-bold">23/25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 mb-4">
                  <p className="framer-body-small text-gray-600 italic">
                    "Stop scrolling if you're tired of paying $50+ for basic SaaS tools that do half of what you need..."
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="framer-body-small">Platform: TikTok + Instagram</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="framer-body-small">Target: SaaS founders</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span className="framer-body-small">Framework: Problem-Agitate-Solution</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="framer-body-small text-yellow-800">
                  <strong>[ASSET NEEDED]:</strong> Screenshots of custom script deliveries with trending analysis and performance scores
                </p>
              </div>
            </div>
          </div>
          
          {/* Weekly Process Steps */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="framer-heading-5 mb-2">Monday Morning Delivery</h3>
              <p className="framer-body framer-text">Fresh concepts arrive in your inbox every Monday at 9 AM EST</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="framer-heading-5 mb-2">Copy & Customize</h3>
              <p className="framer-body framer-text">Use our templates as-is or customize for your specific product</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="framer-heading-5 mb-2">Launch & Scale</h3>
              <p className="framer-body framer-text">Go live within 10 minutes and scale what works best</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Social Proof - Framer Style */}
      <section className="framer-section-padding framer-bg">
        <div className="framer-container">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="mb-4">
              <span className="framer-bg-light-blue framer-text-blue px-4 py-2 rounded-full framer-body-small font-medium">
                Testimonials
              </span>
            </div>
            <h2 className="framer-heading-2 text-gray-900 mb-4 max-w-4xl mx-auto">
              Hear what others say about us
            </h2>
            <p className="framer-body-bold framer-text max-w-3xl mx-auto">
              See what top teams say after switching to a smarter creative intelligence platform.
            </p>
          </div>
          
          {/* Testimonial Cards Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-16">
            <div className="framer-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" style={{backgroundImage: 'url(/api/placeholder/48/48)'}}></div>
                <div>
                  <h4 className="framer-body-bold">Sarah Chen</h4>
                  <p className="framer-body-small framer-text">Founder, TechFlow</p>
                </div>
              </div>
              <p className="framer-body framer-text italic mb-4">
                "We used these templates to track onboarding drop-off and spotted a friction point instantly. After one small UX tweak, our activation rate jumped by 23%."
              </p>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-4">
                <span className="framer-body-small text-yellow-800">[ASSET NEEDED: Real client photo]</span>
              </div>
            </div>
            
            <div className="framer-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" style={{backgroundImage: 'url(/api/placeholder/48/48)'}}></div>
                <div>
                  <h4 className="framer-body-bold">Marcus Rodriguez</h4>
                  <p className="framer-body-small framer-text">CEO, GrowthLab</p>
                </div>
              </div>
              <p className="framer-body framer-text italic mb-4">
                "I've tried nearly every ad template service out there, and this is by far the most intuitive. No need for devs to set things up—our marketing team was running campaigns independently in hours."
              </p>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-4">
                <span className="framer-body-small text-yellow-800">[ASSET NEEDED: Real client photo]</span>
              </div>
            </div>
            
            <div className="framer-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" style={{backgroundImage: 'url(/api/placeholder/48/48)'}}></div>
                <div>
                  <h4 className="framer-body-bold">Elena Park</h4>
                  <p className="framer-body-small framer-text">Head of Growth, StartupCo</p>
                </div>
              </div>
              <p className="framer-body framer-text italic mb-4">
                "It's like creative intelligence finally caught up with startup needs. We use these templates not just for ads—but to tell our brand story. It's become our go-to resource for every launch."
              </p>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-4">
                <span className="framer-body-small text-yellow-800">[ASSET NEEDED: Real client photo]</span>
              </div>
            </div>
          </div>
          
          {/* Company Logos */}
          <div className="text-center">
            <h3 className="framer-heading-5 mb-8">Trusted by startup teams at</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 1]</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 2]</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 3]</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 4]</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 5]</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="framer-body-small text-gray-500">[Startup Logo 6]</span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8 max-w-2xl mx-auto">
              <p className="framer-body-small text-yellow-800">
                <strong>[ASSET NEEDED]:</strong> Actual startup client logos and authentic testimonials with photos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Objection Preemption - Address budget, time, and results concerns */}
      <StartupObjectionPreemption />



      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our weekly ad strategy service
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does weekly billing work?
                </h3>
                <p className="text-gray-600">
                  Your first week is completely FREE. After that, you're billed weekly and can cancel anytime. No long-term contracts.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's included in my first free week?
                </h3>
                <p className="text-gray-600">
                  Full access to your chosen tier for 7 days. You'll receive winning ad templates and launch instructions exactly like paying customers.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How is this different from agencies?
                </h3>
                <p className="text-gray-600">
                  Agencies require $5K-15K/month minimums with 6-month contracts. We start at $5/week with no contracts. Built for startups with limited budgets.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I change tiers anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! Upgrade or downgrade immediately. Need more concepts this week? Upgrade. Scaling back? Drop to a lower tier. You're in complete control.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I get started?
                </h3>
                <p className="text-gray-600">
                  Choose your tier below and start your FREE week trial. No payment required upfront, no contracts, no commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Free Week Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join startup teams getting winning ad templates every Monday. Lock in launch pricing with no commitment.
            </p>
            
            <button
              onClick={() => {
                const serviceSection = document.getElementById('service-tiers');
                if (serviceSection) {
                  serviceSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#service-tiers';
                }
              }}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Choose Your Plan - Start Free
            </button>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-lg opacity-90 mb-2">Questions?</p>
              <a 
                href="mailto:brian@apsicsmedia.com" 
                className="text-orange-300 hover:text-orange-200 font-semibold text-lg"
              >
                brian@apsicsmedia.com
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        title="Wait! Get Your Free Templates Before You Go"
        subtitle="Join startup founders getting winning ad templates every Monday + instant access to our 10 Free Templates PDF."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </ConsultationProvider>
  );
}