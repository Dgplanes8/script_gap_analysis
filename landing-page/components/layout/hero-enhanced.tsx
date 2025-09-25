'use client';

import { useState } from 'react';
import { ArrowRight, Play, Check, Star, TrendingUp, Users, Zap, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface HeroEnhancedProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showEmailCapture?: boolean;
}

export function HeroEnhanced({
  title = "Get Fresh Content Ideas + Custom Scripts That Convert",
  subtitle = "Weekly content ideas + fully customized scripts for UGC, paid ads, and social media. Built from trending content intelligence and tailored to your specific needs.",
  ctaText = "Claim Free Credits",
  showEmailCapture = false
}: HeroEnhancedProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const scrollToServiceTiers = () => {
    const element = document.getElementById('service-tiers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustIndicators = [
    { icon: Users, text: "100+ growing businesses" },
    { icon: TrendingUp, text: "Trending content intelligence" },
    { icon: Zap, text: "Custom UGC + paid ad scripts" }
  ];

  const floatingLogos = [
    { top: "30px", left: "60px", rotation: "-8deg" },
    { top: "250px", left: "60px", rotation: "-8deg" },
    { top: "30px", right: "60px", rotation: "8deg" },
    { top: "250px", right: "80px", rotation: "8deg" }
  ];

  return (
    <section className="relative overflow-hidden framer-bg">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-grid-16" />
      
      {/* Floating Logo Elements - Framer Style */}
      {floatingLogos.map((logo, index) => (
        <div
          key={index}
          className="absolute w-fit h-fit z-10 opacity-20 hover:opacity-40 transition-opacity duration-300"
          style={{
            top: logo.top,
            left: logo.left,
            right: logo.right,
            transform: `rotate(${logo.rotation})`,
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-500 rounded-xl flex items-center justify-center">
            <Zap className="h-8 w-8 text-white" />
          </div>
        </div>
      ))}
      
      <div className="relative framer-container framer-hero-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left relative z-20">
            {/* Trust Badge - Framer Style */}
            <div className="mb-6 inline-flex items-center framer-bg-light-blue rounded-full px-4 py-2 framer-gap-10">
              <div className="flex items-center -space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" style={{backgroundImage: 'url(/api/placeholder/24/24)'}} />
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" style={{backgroundImage: 'url(/api/placeholder/24/24)'}} />
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" style={{backgroundImage: 'url(/api/placeholder/24/24)'}} />
              </div>
              <span className="framer-body-small framer-text">Fresh trending content + custom scripts weekly</span>
            </div>

            {/* Headline - Framer Typography */}
            <h1 className="framer-heading-1 text-gray-900 mb-6 max-w-2xl">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="framer-body-bold framer-text mb-8 max-w-xl">
              {subtitle}
            </p>

            {/* CTA Button - Framer Style */}
            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={scrollToServiceTiers}
                className="btn-framer w-fit"
              >
                {ctaText}
              </button>
              
              {/* No Credit Card Required - Framer Style */}
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CreditCard className="h-5 w-5 framer-text-blue" />
                <span className="framer-body-small framer-text">No credit card required</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600">
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-brand-500" />
                    <span>{indicator.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <span className="framer-body framer-text font-medium">4.9/5 from 200+ reviews</span>
            </div>
          </div>

          {/* Visual/Demo - Framer Style */}
          <div className="relative z-10">
            <div className="framer-card overflow-hidden">
              {!isVideoPlaying ? (
                <>
                  {/* Demo Image Placeholder */}
                  <div className="aspect-[1.533] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group cursor-pointer rounded-2xl overflow-hidden"
                       onClick={() => setIsVideoPlaying(true)}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <Play className="h-10 w-10 text-gray-700 ml-1" />
                      </div>
                      <p className="text-white framer-body-bold">Watch: From Zero to Launch in 5 Minutes</p>
                    </div>
                    
                    {/* Placeholder text for missing asset */}
                    <div className="absolute bottom-4 left-4 bg-brand-100 text-brand-800 px-3 py-1 rounded text-sm">
                      [ASSET NEEDED: Demo Video/Screenshot]
                    </div>
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-gray-900 flex items-center justify-center rounded-2xl">
                  <Button 
                    variant="secondary"
                    onClick={() => setIsVideoPlaying(false)}
                  >
                    Close Demo
                  </Button>
                </div>
              )}
            </div>
            
            {/* Quick Stats - Framer Style */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="framer-heading-3 text-brand-600">3x</div>
                <div className="framer-body-small framer-text">Higher CTR</div>
              </div>
              <div>
                <div className="framer-heading-3 text-brand-600">47%</div>
                <div className="framer-body-small framer-text">Lower CAC</div>
              </div>
              <div>
                <div className="framer-heading-3 framer-text-blue">5 min</div>
                <div className="framer-body-small framer-text">To Launch</div>
              </div>
            </div>

            {/* Floating Elements - Framer Style */}
            <div className="absolute -top-4 -right-4 framer-bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-500" />
                <span className="framer-body-small font-semibold">First Week FREE</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-brand-500 text-white p-4 rounded-xl shadow-lg z-20">
              <div className="framer-body-small font-semibold">Weekly Delivery</div>
              <div className="text-xs opacity-90">Every Monday</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}