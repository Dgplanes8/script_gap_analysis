'use client';

import { useState } from 'react';
import { Check, ArrowRight, Zap, Target, Crown, Building2, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useConsultation } from '@/components/contexts/consultation-context';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';
import { trackWeeklyTrialClick, trackEvent } from '@/components/analytics/gtm';

export function ServiceTiersEnhanced() {
  const { openModal: openConsultation } = useConsultation();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showAirtableForm, setShowAirtableForm] = useState(false);

  const lifetimeOffer = {
    id: 'founders-special',
    name: 'FOUNDER\'S SPECIAL',
    icon: Crown,
    price: '$50',
    period: 'lifetime',
    yearlyPrice: 'One-time payment',
    description: 'Limited-time lifetime access - everything in GROWTH tier forever',
    features: [
      '2 custom content ideas + 4 scripts weekly',
      'All platforms (TikTok, Instagram, Facebook, LinkedIn)',
      'Trending analysis + competitor insights',
      'Priority email support'
    ],
    badge: 'LIMITED - FIRST 100 FOUNDERS',
    badgeVariant: 'destructive' as const,
    popular: false,
    lifetime: true,
    ideal: 'Early adopters who want lifetime access (normally $1,820/year)'
  };

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      price: '$15',
      period: '/week',
      yearlyPrice: '$60/month',
      description: 'Perfect for solo founders getting started with custom content',
      features: [
        '1 custom content idea + 2 scripts weekly',
        'TikTok + Instagram optimization',
        'Email delivery Monday mornings',
        '7-day FREE trial'
      ],
      badge: 'Great for beginners',
      badgeVariant: 'secondary' as const,
      popular: false,
      ideal: 'Solo founders ($500-$2K monthly ad spend)'
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: TrendingUp,
      price: '$35',
      period: '/week',
      yearlyPrice: '$140/month',
      description: 'For growing startups with comprehensive trending content intelligence',
      features: [
        '2 custom content ideas + 4 scripts weekly',
        'All platforms (TikTok, Instagram, Facebook, LinkedIn)',
        'Trending analysis + competitor insights',
        'Priority email support',
        '7-day FREE trial'
      ],
      badge: 'MOST POPULAR',
      badgeVariant: 'default' as const,
      popular: true,
      ideal: 'Growing startups ($2K-$10K monthly ad spend)'
    },
    {
      id: 'scale',
      name: 'Scale',
      icon: Building2,
      price: '$99',
      period: '/week',
      yearlyPrice: '$396/month',
      description: 'For scaling teams needing direct access and personalized support',
      features: [
        '3 custom content ideas + 6 scripts weekly',
        'All platforms + emerging channels',
        'Direct team access via Slack',
        'Weekly 30-min strategy calls',
        '7-day FREE trial'
      ],
      badge: 'Premium Support',
      badgeVariant: 'outline' as const,
      popular: false,
      ideal: 'Scaling teams ($10K+ monthly ad spend)'
    }
  ];

  const handleTierSelect = (tier: any) => {
    setSelectedTier(tier.name);
    setShowAirtableForm(true);
    trackEvent('service_tier_selected', {
      tier_name: tier.name,
      tier_price: tier.price
    });
  };

  return (
    <section id="service-tiers" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Weekly Creative Intelligence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Pricing, Powerful Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your plan or grab our limited-time lifetime offer. All plans include fresh custom content + scripts delivered every Monday morning.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Check className="h-4 w-4 text-brand-600" />
            <span>7-day FREE trial</span>
            <span>•</span>
            <Check className="h-4 w-4 text-brand-600" />
            <span>No commitment</span>
            <span>•</span>
            <Check className="h-4 w-4 text-brand-600" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Lifetime Offer - Special Highlight */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="framer-card relative overflow-hidden border-2 border-brand-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Urgent Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-2 rounded-full shadow-lg">
                  <span className="framer-body-small font-bold">⚡ LIMITED TIME - FIRST 100 FOUNDERS</span>
                </div>
              </div>
              
              <div className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-600">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="heading-3 mb-3">{lifetimeOffer.name}</h3>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="heading-1 brand-text-blue">{lifetimeOffer.price}</span>
                  <span className="body-regular brand-text-secondary ml-2">{lifetimeOffer.period}</span>
                </div>
                
                <div className="body-small brand-text-secondary mb-6">
                  Normally ${(35 * 52).toLocaleString()}/year
                </div>
                
                <p className="body-regular brand-text-secondary mb-6 leading-relaxed">
                  {lifetimeOffer.description}
                </p>
                
                <ul className="space-y-3 mb-6 text-left">
                  {lifetimeOffer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-brand-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="body-small brand-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => {
                    setSelectedTier(lifetimeOffer.name);
                    setShowAirtableForm(true);
                    trackEvent('lifetime_offer_selected', {
                      tier_name: lifetimeOffer.name,
                      tier_price: lifetimeOffer.price
                    });
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white btn-primary border-0 mb-4"
                >
                  <span className="font-semibold">Claim Strategic Intelligence Access - $50</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <p className="body-small brand-text-blue font-medium">
                  {lifetimeOffer.ideal}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Pricing Cards - Framer Style */}
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 max-w-5xl mx-auto mb-16">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div 
                key={tier.id} 
                className={`framer-card relative transition-all duration-300 ${
                  tier.popular 
                    ? 'ring-2 ring-blue-500 transform scale-105 shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full shadow-lg">
                      <span className="body-small font-medium">MOST POPULAR</span>
                    </div>
                  </div>
                )}
                
                {/* Header */}
                <div className={`text-center pb-6 ${tier.popular ? 'pt-8' : 'pt-0'}`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      tier.popular ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <h3 className="heading-4 mb-3">{tier.name}</h3>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="heading-2 brand-text-primary">{tier.price}</span>
                    <span className="body-regular brand-text-secondary ml-1">{tier.period}</span>
                  </div>
                  
                  <div className="body-small brand-text-secondary mb-4">
                    ({tier.yearlyPrice})
                  </div>
                  
                  {!tier.popular && (
                    <div className="mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full body-small">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="px-0">
                  <p className="text-center mb-6 framer-body framer-text leading-relaxed">
                    {tier.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-brand-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="framer-body-small framer-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-6 p-4 framer-bg rounded-lg">
                    <p className="framer-body-small font-medium mb-2 framer-text">Ideal for:</p>
                    <p className="framer-body-small framer-text leading-relaxed">{tier.ideal}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-0">
                  <button 
                    onClick={() => handleTierSelect(tier)}
                    className={`w-full btn-framer transition-all duration-200 ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' 
                        : 'bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-900 hover:bg-blue-50'
                    }`}
                  >
                    <span className="framer-body-bold">Claim Free Credits</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Tier Call-to-Action - Simplified */}
        <div className="mt-16 text-center">
          <div className="max-w-xl mx-auto framer-card bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-brand-400 mr-2" />
              <h3 className="framer-heading-4 text-white">Enterprise</h3>
            </div>
            
            <p className="framer-body text-gray-300 mb-6">
              Need custom solutions? Let's talk about your specific requirements.
            </p>
            
            <button 
              onClick={() => openConsultation()}
              className="bg-brand-500 hover:bg-brand-600 text-white btn-framer border-0"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span className="framer-body-bold">Book Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Airtable Form Modal - Framer Style */}
        {showAirtableForm && selectedTier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="framer-bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="framer-heading-5">Claim Your Free Credits</h3>
                <button
                  onClick={() => setShowAirtableForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <p className="framer-body framer-text mb-6">
                Selected plan: <strong className="framer-text-blue">{selectedTier}</strong>
              </p>
              
              <SimpleAirtableForm 
                tier={selectedTier}
                onSuccess={() => setShowAirtableForm(false)}
              />
            </div>
          </div>
        )}
        
        {/* Trust Indicators - Framer Style */}
        <div className="mt-16 text-center">
          <h4 className="framer-heading-5 mb-6">Blindly trusted by</h4>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {/* Company Logo Placeholders */}
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="framer-body-small text-gray-500">[Logo 1]</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="framer-body-small text-gray-500">[Logo 2]</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="framer-body-small text-gray-500">[Logo 3]</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="framer-body-small text-gray-500">[Logo 4]</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="framer-body-small text-gray-500">[Logo 5]</span>
            </div>
          </div>
        </div>
        
        {/* Money Back Guarantee - Framer Style */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-brand-50 text-brand-800 px-6 py-3 rounded-full">
            <Check className="h-5 w-5 mr-2" />
            <span className="framer-body-small font-medium">7-day free trial • Cancel anytime • No long-term contracts</span>
          </div>
        </div>
      </div>
    </section>
  );
}