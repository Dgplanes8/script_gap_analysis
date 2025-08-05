import { Metadata } from 'next';
import { Star, ArrowRight, TrendingUp, Users, Target, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/layout/hero';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { CTASection } from '@/components/layout/cta-section';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export const metadata: Metadata = {
  title: 'Thank You - Monday Morning Marketer',
  description:
    'Thank you for your interest in Monday Morning Marketer. Your next steps and what to expect.',
};

export default function SuccessPage() {
  // Get source from URL params to show dynamic content
  const getHeadlineVariant = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      
      switch(source) {
        case 'call':
          return {
            title: "Booked! Bring a control ad + your median CTR/TSR.",
            subtitle: "We'll confirm scope and eligibility for the free pilot. Expect 12 scripts + 6 thumbnails within 48–72 business hours of the brief."
          };
        case 'order':
          return {
            title: "Order received. We'll review your intake within 4 business hours.",
            subtitle: "Your 48‑hour clock starts after intake completion. Watch for two emails: payment receipt and intake form confirmation. You can reply to either with questions."
          };
        case 'newsletter':
          return {
            title: "Welcome to Monday Morning Ideas — your first issue arrives next Monday at 8am ET.",
            subtitle: "Check your inbox for a welcome email and your '10 Hook Bank' PDF. Every Monday you'll get 3 hooks worth testing, 1 creative teardown, and 1 mini test idea."
          };
        default:
          return {
            title: "Thank You for Your Interest!",
            subtitle: "We're excited to help you create high-converting ad scripts that turn customer language into profitable campaigns."
          };
      }
    }
    
    return {
      title: "Thank You for Your Interest!",
      subtitle: "We're excited to help you create high-converting ad scripts that turn customer language into profitable campaigns."
    };
  };
  
  const { title, subtitle } = getHeadlineVariant();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText="View Service Tiers"
        secondaryCtaText="Book Consultation"
        secondaryCtaLink="/#service-tiers"
        background="gradient"
        showEmailCapture={false}
      />

      {/* Next Steps Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Happens Next?
              </h2>
              <p className="text-xl text-gray-600">
                Here's what to expect in the coming days.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Booked a Call</h3>
                <p className="text-gray-600">
                  We'll confirm scope and eligibility for the free pilot. Bring your control ad and median CTR/TSR data.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Ordered</h3>
                <p className="text-gray-600">
                  Watch for payment receipt and intake form. Your 48-hour delivery clock starts after intake completion.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Subscribed</h3>
                <p className="text-gray-600">
                  Check your inbox for a welcome email and your 10 Hook Bank PDF. First issue Monday at 8am ET.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Our Programs
              </h2>
              <p className="text-xl text-gray-600">
                Choose the right path for your business goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pilot Program Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-brand-300 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Free 7-Day Pilot
                  </h3>
                  <p className="text-gray-600">
                    Test our script system with 3 concepts for your fitness/sports app.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>12 scripts (3 concepts × 4 variants)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>6 storyboard thumbnails</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>1-week test matrix</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Mid-week iteration</span>
                  </li>
                </ul>
                
                <Link
                  href="/#service-tiers"
                  className="w-full btn-primary text-center block"
                >
                  Learn About Pilot
                </Link>
              </div>
              
              {/* $990 Pack Card */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-8 shadow-lg text-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    $990 Script System
                  </h3>
                  <p className="text-brand-100">
                    12 shoot-ready scripts in 48 hours with full test plan.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>12 platform-optimized scripts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>6 thumbnails + Mini Angle Map</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>Complete test plan (60/20/20 split)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>48-hour delivery guarantee</span>
                  </li>
                </ul>
                
                <Link
                  href="/#service-tiers"
                  className="w-full bg-white text-brand-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center block"
                >
                  View $990 Pack
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Follow Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Stay Connected
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Follow us for daily hook ideas, creative breakdowns, and testing insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://twitter.com/mondaymorningmarketer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Follow on X
              </a>
              
              <a
                href="https://linkedin.com/company/monday-morning-marketer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Haven't Subscribed Yet?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get weekly hook ideas, creative breakdowns, and mini test ideas for subscription apps. Every Monday at 8am ET.
              </p>
              
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText="Subscribe to Monday Morning Ideas"
                variant="cta"
              />
              
              <p className="text-sm text-gray-500 mt-4">
                Plus get your free 10 Hook Bank PDF with proven customer-language hooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Questions? We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our process, timeline, or which program is right for you?
            </p>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Contact us:</strong> <a href="mailto:mondaymorningmarketer@gmail.com" className="text-brand-600 hover:underline">mondaymorningmarketer@gmail.com</a>
              </p>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>IP/Scope:</strong> You own delivered scripts, thumbnails, and summaries. Internal tools, prompts, and raw research remain our IP.</p>
                <p><strong>Refund Policy:</strong> Full refund if scoped deliverables aren't provided within 72 business hours of intake completion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}