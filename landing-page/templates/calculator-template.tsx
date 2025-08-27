'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { Calculator, TrendingUp, DollarSign, Target, Zap, ArrowRight, BarChart3, Download, Play } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';
import { StructuredData } from '@/components/schema/structured-data';

interface CalculatorInputs {
  [key: string]: number | string;
}

interface CalculatorResults {
  [key: string]: number | string;
}

interface CalculatorField {
  name: string;
  label: string;
  type: 'range' | 'select' | 'number';
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string | number; label: string }>;
  defaultValue: number | string;
  formatDisplay?: (value: number | string) => string;
}

interface PresetScenario {
  name: string;
  description: string;
  values: CalculatorInputs;
}

interface CalculatorTemplateProps {
  // SEO & Meta Data
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  
  // Calculator Configuration
  headline: string;
  subtitle: string;
  introduction: React.ReactNode;
  calculatorTitle: string;
  fields: CalculatorField[];
  presetScenarios?: PresetScenario[];
  calculateResults: (inputs: CalculatorInputs) => CalculatorResults;
  formatResult?: (key: string, value: number | string) => string;
  
  // Results Configuration
  resultsTitle: string;
  resultsDescription: string;
  mainResultKey: string;
  additionalResults?: string[];
  
  // Trust Indicators
  trustIndicators?: string[];
  
  // CTA Configuration
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  
  // Lead Magnets
  leadCaptureTitle?: string;
  leadCaptureDescription?: string;
}

/**
 * SEO-Optimized Calculator Template for Apsics Media
 * 
 * Features:
 * - Dynamic calculation with real-time updates
 * - Startup-focused preset scenarios
 * - Lead capture at results stage
 * - Mobile-responsive design with touch interactions
 * - Structured data for WebApplication schema
 * - Social proof and trust indicators
 */
export function CalculatorTemplate({
  title,
  description,
  keywords,
  slug,
  headline,
  subtitle,
  introduction,
  calculatorTitle,
  fields,
  presetScenarios = [],
  calculateResults,
  formatResult = (key, value) => String(value),
  resultsTitle,
  resultsDescription,
  mainResultKey,
  additionalResults = [],
  trustIndicators = [
    'Fortune 100 methodology',
    'Real performance data',
    'Scenario modeling included'
  ],
  primaryCtaText = "Start Your FREE Week",
  primaryCtaLink = "/#service-tiers",
  secondaryCtaText = "Get FREE Templates",
  secondaryCtaLink = "/free-hooks",
  leadCaptureTitle = "Get Your Personalized Results",
  leadCaptureDescription = "Enter your email to receive detailed analysis and next steps"
}: CalculatorTemplateProps) {
  
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const initialInputs: CalculatorInputs = {};
    fields.forEach(field => {
      initialInputs[field.name] = field.defaultValue;
    });
    return initialInputs;
  });
  
  const [results, setResults] = useState<CalculatorResults>({});
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  useEffect(() => {
    const newResults = calculateResults(inputs);
    setResults(newResults);
    setShowResults(true);
  }, [inputs, calculateResults]);

  const handleInputChange = (fieldName: string, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const applyPreset = (scenario: PresetScenario) => {
    setInputs(scenario.values);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
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
            '@type': 'WebApplication',
            name: title,
            applicationCategory: 'BusinessApplication',
            description: description,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: `Free ${calculatorTitle} with strategic recommendations`
            },
            provider: {
              '@type': 'Organization',
              name: 'Apsics Media',
              url: 'https://apsicsmedia.com'
            },
            featureList: [
              'Real-time calculations',
              'Scenario modeling',
              'Industry benchmarks',
              'Strategic recommendations'
            ]
          }
        ]}
      />

      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 pt-16 lg:pt-20">

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              FREE CALCULATOR
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {headline}
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {indicator}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-center text-gray-700">
              {introduction}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Calculator Inputs */}
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {calculatorTitle}
                </h2>
                
                <div className="space-y-6">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      
                      {field.type === 'range' && (
                        <div className="relative">
                          <input
                            type="range"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={inputs[field.name]}
                            onChange={(e) => handleInputChange(field.name, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{field.formatDisplay ? field.formatDisplay(field.min!) : field.min}</span>
                            <span className="font-semibold text-gray-900">
                              {field.formatDisplay ? field.formatDisplay(inputs[field.name]) : inputs[field.name]}
                            </span>
                            <span>{field.formatDisplay ? field.formatDisplay(field.max!) : field.max}</span>
                          </div>
                        </div>
                      )}
                      
                      {field.type === 'select' && (
                        <select
                          value={inputs[field.name]}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {field.type === 'number' && (
                        <input
                          type="number"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={inputs[field.name]}
                          onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Preset Scenarios */}
                {presetScenarios.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Quick Scenarios:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {presetScenarios.map((scenario, index) => (
                        <button
                          key={index}
                          onClick={() => applyPreset(scenario)}
                          className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="font-semibold">{scenario.name}</div>
                          <div className="text-gray-500">{scenario.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results Display */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 lg:p-8 border border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {resultsTitle}
                </h2>
                
                {showResults && (
                  <div className="space-y-6">
                    {/* Main Result Highlight */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
                      <div className="text-4xl font-bold mb-2">
                        {formatResult(mainResultKey, results[mainResultKey])}
                      </div>
                      <div className="text-green-100 capitalize">
                        {mainResultKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>

                    {/* Additional Results */}
                    {additionalResults.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {additionalResults.map((key) => (
                          <div key={key} className="bg-white rounded-lg p-4 border border-green-200">
                            <div className="text-2xl font-bold text-green-600">
                              {formatResult(key, results[key])}
                            </div>
                            <div className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-700">
                      {resultsDescription}
                    </p>

                    {/* Results Lead Capture */}
                    {!showLeadCapture ? (
                      <div className="text-center pt-4">
                        <button
                          onClick={() => setShowLeadCapture(true)}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                          Get Detailed Analysis
                        </button>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg p-6 border-2 border-green-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {leadCaptureTitle}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {leadCaptureDescription}
                        </p>
                        <EmailCaptureForm
                          placeholder="Enter your work email"
                          buttonText="Get Analysis"
                          variant="cta"
                          source="calculator_results"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Achieve These Results?
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Start your first week FREE. Get weekly ad templates and strategic guidance designed specifically for startup teams.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href={primaryCtaLink}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      {primaryCtaText}
                    </a>
                    <a
                      href={secondaryCtaLink}
                      className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      {secondaryCtaText}
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    First week FREE • No commitment • Weekly templates delivered every Monday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative Form CTA */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <SimpleAirtableForm 
                buttonText="Start My FREE Week"
                source="calculator_bottom_cta"
              />
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
 * Generate metadata for the calculator template
 */
export function generateCalculatorMetadata({
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