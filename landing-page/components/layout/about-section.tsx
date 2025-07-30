'use client';

import { TrendingUp, Users, Award, Target, DollarSign, Building2 } from 'lucide-react';
import Link from 'next/link';

interface AboutSectionProps {
  onOpenApplication?: (variant: 'pilot' | 'full') => void;
}

export function AboutSection({ onOpenApplication }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Proven Track Record with Fortune 100 Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Over 10+ years managing $100M+ in ad spend for household brand names and Fortune 100 companies, 
              plus successfully launching and scaling two subscription products with consistent year-over-year growth.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="bg-blue-600 rounded-full p-3 w-fit mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$100M+</div>
              <div className="text-sm text-gray-600">Ad Spend Managed</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="bg-green-600 rounded-full p-3 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="bg-purple-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Fortune 100</div>
              <div className="text-sm text-gray-600">Companies Served</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="bg-orange-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Products Scaled</div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Corporate Experience */}
            <div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Award className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-2xl font-bold">Corporate Excellence</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Fortune 100 & Household Brands</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Managed multi-million dollar ad campaigns for globally recognized brands, optimizing performance 
                      across all major platforms while maintaining strict ROI requirements and brand guidelines.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Performance Marketing Expertise</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Specialized in subscription and recurring revenue models, developing customer acquisition 
                      strategies that balance growth with profitability across diverse market segments.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Scale & Optimization</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Proven ability to scale campaigns from thousands to millions in monthly spend while 
                      maintaining or improving key performance metrics through data-driven optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Entrepreneurial Success */}
            <div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-blue-200 mr-3" />
                  <h3 className="text-2xl font-bold">Entrepreneurial Success</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-200 mb-2">Two Successful Product Launches</h4>
                    <p className="text-blue-100 leading-relaxed">
                      Founded and scaled two subscription-based products from concept to consistent profitability, 
                      applying the same customer-language methodology I use for client campaigns.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-200 mb-2">Consistent YoY Growth</h4>
                    <p className="text-blue-100 leading-relaxed">
                      Both products achieved sustainable year-over-year growth through systematic testing, 
                      optimization, and deep understanding of customer psychology and purchase behavior.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-200 mb-2">Real-World Application</h4>
                    <p className="text-blue-100 leading-relaxed">
                      Every strategy, framework, and hook I develop is battle-tested on my own products first, 
                      ensuring you get tactics that work in real subscription business environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why This Experience Matters for Your Subscription Business
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              I've seen what works at Fortune 100 scale and what works for scrappy startups. Most importantly, 
              I understand the unique challenges of subscription businesses because I've built them myself. 
              You're getting strategies that have been proven at every level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {onOpenApplication ? (
                <>
                  <button
                    onClick={() => onOpenApplication('full')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Get Your Scripts Now - $990
                  </button>
                  <button
                    onClick={() => onOpenApplication('pilot')}
                    className="border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Start Free Pilot First
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/990"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Get Your Scripts Now - $990
                  </Link>
                  <Link
                    href="/pilot"
                    className="border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Start Free Pilot First
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}