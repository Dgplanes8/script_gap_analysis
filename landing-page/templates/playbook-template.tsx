'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { BookOpen, ChevronDown, ChevronUp, Clock, Users, Target, Download, CheckCircle, TrendingUp, DollarSign, ArrowRight, Zap, Play, Building2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';
import { StructuredData } from '@/components/schema/structured-data';

interface PlaybookModule {
  title: string;
  duration: string;
  description: string;
  topics: string[];
  content?: React.ReactNode;
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
}

interface SuccessMetric {
  metric: string;
  value: string;
  description: string;
}

interface PlaybookTemplateProps {
  // SEO & Meta Data
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  
  // Playbook Content
  headline: string;
  subtitle: string;
  introduction: React.ReactNode;
  modules: PlaybookModule[];
  caseStudies?: CaseStudy[];
  successMetrics?: SuccessMetric[];
  
  // Lead Magnets
  leadMagnetTitle?: string;
  leadMagnetDescription?: string;
  downloadTitle?: string;
  
  // CTA Configuration
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

/**
 * SEO-Optimized Playbook Template for Apsics Media
 * 
 * Features:
 * - Interactive module system with progressive disclosure
 * - Startup-focused methodology and case studies
 * - Multiple lead capture points and assessment forms
 * - Mobile-responsive design with touch interactions
 * - Social proof and success metrics
 */
export function PlaybookTemplate({
  title,
  description,
  keywords,
  slug,
  headline,
  subtitle,
  introduction,
  modules = [],
  caseStudies = [],
  successMetrics = [],
  leadMagnetTitle = "Get This Complete Playbook FREE",
  leadMagnetDescription = "Join 1,200+ startup founders implementing proven growth strategies",
  downloadTitle = "Download Complete Playbook",
  primaryCtaText = "Start Your FREE Week",
  primaryCtaLink = "/#service-tiers",
  secondaryCtaText = "Get FREE Templates",
  secondaryCtaLink = "/free-hooks"
}: PlaybookTemplateProps) {
  
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData
        pageType="generic"
        title={title}
        description={description}
        slug={slug}
        additionalSchemas={[
          {
            '@type': 'Course',
            name: title,
            description: description,
            provider: {
              '@type': 'Organization',
              name: 'Apsics Media'
            },
            educationalLevel: 'Intermediate',
            audience: {
              '@type': 'Audience',
              audienceType: 'Startup Founders'
            }
          }
        ]}
      />

      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-white pt-16 lg:pt-20">

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                COMPREHENSIVE PLAYBOOK
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {headline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle}
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Startup Founders
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Marketing Teams  
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Step-by-Step Implementation
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="max-w-lg mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText={downloadTitle}
                  variant="hero"
                  source="playbook_hero"
                />
                <p className="text-sm text-gray-600 mt-3">
                  Get instant access • Used by 1,200+ startup founders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {introduction}
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        {successMetrics.length > 0 && (
          <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                  Proven Results from Startup Teams
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {successMetrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {metric.value}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">
                        {metric.metric}
                      </div>
                      <div className="text-sm text-gray-600">
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Modules */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Complete Implementation Roadmap
              </h2>
              
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-left flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {module.duration} • {module.description}
                          </p>
                        </div>
                      </div>
                      {expandedModule === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedModule === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {module.content && (
                          <div className="prose prose-sm max-w-none">
                            {module.content}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Content Lead Magnet */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
                <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {leadMagnetTitle}
                </h2>
                <p className="text-gray-700 mb-6">
                  {leadMagnetDescription}. Get step-by-step implementation guides, templates, and proven frameworks.
                </p>
                <div className="max-w-md mx-auto">
                  <SimpleAirtableForm 
                    buttonText="Get Complete Access"
                    source="playbook_mid_content"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                  Real Startup Success Stories
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {caseStudies.map((study, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {study.company}
                          </h3>
                          <p className="text-sm text-gray-600">{study.industry}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                        <p className="text-gray-700 mb-4">{study.challenge}</p>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                        <p className="text-gray-700 mb-4">{study.solution}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Results:</h4>
                        <ul className="space-y-1">
                          {study.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-green-800">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Strategy Assessment CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Implement This Playbook?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get weekly strategic guidance and proven ad templates designed specifically for startup teams. Start your first week FREE.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href={primaryCtaLink}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {primaryCtaText}
                </a>
                <a
                  href={secondaryCtaLink}
                  className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 bg-white font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {secondaryCtaText}
                </a>
              </div>
              
              <p className="text-sm text-gray-400">
                First week FREE • No commitment • Weekly strategic guidance every Monday
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

/**
 * Generate metadata for the playbook template
 */
export function generatePlaybookMetadata({
  title,
  description,
  keywords,
  slug
}: {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}): Metadata {
  return {
    title: `${title} | Apsics Media`,
    description: description,
    keywords: keywords.join(', '),
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      url: `https://apsicsmedia.com${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
    alternates: {
      canonical: slug,
    }
  };
}