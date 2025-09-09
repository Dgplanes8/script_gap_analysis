'use client';

import { useState } from 'react';
import { ArrowRight, Play, Check, Star, TrendingUp, Users, Zap } from 'lucide-react';
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
  title = "Get 3x More Customers From Your Ad Budget",
  subtitle = "Weekly ad templates designed for startup teams with limited budgets. No marketing experience needed - just copy, paste, and launch campaigns that actually convert.",
  ctaText = "Start Free Week",
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
    { icon: Users, text: "1,200+ startup founders" },
    { icon: TrendingUp, text: "$250MM+ managed spend" },
    { icon: Zap, text: "Fortune 100 methodology" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-grid-16" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 1,200+ startup founders
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg"
                onClick={scrollToServiceTiers}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600">
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-orange-500" />
                    <span>{indicator.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9/5 from 200+ reviews</span>
            </div>
          </div>

          {/* Visual/Demo */}
          <div className="relative">
            {!isVideoPlaying ? (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  {/* Placeholder for demo/video thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group cursor-pointer"
                       onClick={() => setIsVideoPlaying(true)}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <Play className="h-10 w-10 text-gray-700 ml-1" />
                      </div>
                      <p className="text-white font-semibold">Watch: From Zero to Launch in 5 Minutes</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">3x</div>
                        <div className="text-sm text-gray-600">Higher CTR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">47%</div>
                        <div className="text-sm text-gray-600">Lower CAC</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">5 min</div>
                        <div className="text-sm text-gray-600">To Launch</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <Button 
                      variant="secondary"
                      onClick={() => setIsVideoPlaying(false)}
                    >
                      Close Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-semibold">First Week FREE</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">Weekly Delivery</div>
              <div className="text-xs opacity-90">Every Monday</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}