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

  const tiers = [
    {
      id: 'creative-starter',
      name: 'Creative Starter',
      icon: Zap,
      price: '$5',
      period: '/week',
      yearlyPrice: '$20/month',
      description: 'Perfect for first-time advertisers with 1 concept weekly and platform setup guidance',
      features: [
        '1 high-converting creative concept weekly',
        '2 ready-to-test scripts per concept',
        'Single platform optimization (TikTok, Facebook, OR Instagram)',
        'Basic trend insights & reasoning',
        'Email delivery with implementation tips',
        'Community access for questions'
      ],
      badge: 'Perfect for solopreneurs',
      badgeVariant: 'secondary' as const,
      popular: false,
      ideal: 'Solo founders and early-stage startups with $500-$2K monthly ad spend testing creative approaches'
    },
    {
      id: 'trend-tracker',
      name: 'Trend Tracker',
      icon: TrendingUp,
      price: '$15',
      period: '/week',
      yearlyPrice: '$60/month',
      description: 'For growing startups with strategic concepts and multi-platform guidance',
      features: [
        '1 strategic creative concept every Monday',
        '2 ready-to-develop scripts per concept',
        'Multi-platform optimization (TikTok + Facebook + Instagram)',
        'Trend analysis & competitive insights',
        'Performance scoring (25-point framework)',
        'Priority email support',
        'Campaign setup guidance',
        'Weekly performance tips'
      ],
      badge: 'MOST POPULAR',
      badgeVariant: 'default' as const,
      popular: true,
      ideal: 'Bootstrap and early-stage startups with initial traction ($2K-$10K monthly ad spend)'
    },
    {
      id: 'competitive-edge',
      name: 'Competitive Edge',
      icon: Target,
      price: '$35',
      period: '/week',
      yearlyPrice: '$140/month',
      description: 'Strategic advantage with competitor intelligence and multiple weekly concepts',
      features: [
        '2 creative concepts weekly (1 trend-based + 1 competitor-inspired)',
        '4 weekly scripts - 2 per concept',
        'Full platform optimization (TikTok, Facebook, Instagram, LinkedIn)',
        'Competitive intelligence reports',
        'Advanced performance analytics',
        'Priority Slack channel access',
        'Custom brief consultations',
        'A/B testing recommendations'
      ],
      badge: 'Best Value',
      badgeVariant: 'outline' as const,
      popular: false,
      ideal: 'Small marketing teams needing competitive intelligence ($10K-$50K monthly ad spend)'
    },
    {
      id: 'market-intelligence',
      name: 'Market Intelligence',
      icon: Crown,
      price: '$99',
      period: '/week',
      yearlyPrice: '$396/month',
      description: 'Comprehensive creative intelligence with direct team access',
      features: [
        '3 creative concepts delivered weekly',
        '6 ready-to-test scripts - 2 per concept',
        'Complete platform coverage + emerging channels',
        'Direct team access for strategic support',
        'Custom competitor tracking',
        'Weekly strategy calls (30 min)',
        'Priority response (same day)',
        'Custom landing page reviews'
      ],
      badge: 'Premium Support',
      badgeVariant: 'outline' as const,
      popular: false,
      ideal: 'Scaling startups with comprehensive needs ($50K+ monthly ad spend)'
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
            Choose Your Creative Intelligence Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            All plans include fresh creative concepts delivered every Monday morning. 
            Start with your first week FREE - no commitment required.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Check className="h-4 w-4 text-green-600" />
            <span>First week FREE</span>
            <span>•</span>
            <Check className="h-4 w-4 text-green-600" />
            <span>No commitment</span>
            <span>•</span>
            <Check className="h-4 w-4 text-green-600" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card 
                key={tier.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  tier.popular 
                    ? 'border-2 border-orange-500 shadow-lg scale-105' 
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className={`text-center ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 my-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600">{tier.period}</span>
                  </div>
                  <div className="text-sm text-gray-500">({tier.yearlyPrice})</div>
                  <Badge variant={tier.badgeVariant} className="mt-2">
                    {tier.badge}
                  </Badge>
                </CardHeader>

                <CardContent className="px-6">
                  <CardDescription className="text-center mb-6 text-gray-600">
                    {tier.description}
                  </CardDescription>
                  
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Button 
                    onClick={() => handleTierSelect(tier)}
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                        : ''
                    }`}
                    size="lg"
                  >
                    Start Free Week
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Enterprise Section */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-gray-300 mt-1">
                    Custom creative concepts with dedicated account management
                  </p>
                </div>
              </div>
              <Button 
                variant="secondary"
                onClick={() => openConsultation()}
                size="lg"
              >
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Modal */}
        {showAirtableForm && selectedTier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Start Your Free Week</h3>
              <p className="text-gray-600 mb-6">
                Selected plan: <strong>{selectedTier}</strong>
              </p>
              <SimpleAirtableForm 
                tier={selectedTier}
                onSuccess={() => setShowAirtableForm(false)}
              />
              <Button 
                variant="ghost" 
                onClick={() => setShowAirtableForm(false)}
                className="w-full mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}