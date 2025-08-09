'use client';

import { TrendingUp, Users, Award, Target, DollarSign, Building2, ArrowRight } from 'lucide-react';
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
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              Performance Marketing Expertise
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ 10+ YEARS EXPERIENCE
              </div>
              <div className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ SUBSCRIPTION FOCUS
              </div>
              <div className="bg-navy-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ 48-HOUR DELIVERY
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Growth Leaders at Subscription Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              10+ years optimizing campaigns specifically for subscription and recurring revenue businesses. 
              Unlike agencies that take weeks for creative concepts, we deliver fresh ideas every Monday 
              with competitor intelligence and audience expansion strategies.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="bg-orange-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">48 Hours</div>
              <div className="text-sm text-gray-600">Creative Delivery</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
              <div className="bg-teal-600 rounded-full p-3 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-teal-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6">
              <div className="bg-navy-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-navy-600 mb-2">200+</div>
              <div className="text-sm text-gray-600">Growth Leaders Served</div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-yellow-400 mr-3" />
                <h3 className="text-2xl font-bold">Corporate Excellence</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Subscription Business Focus</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Specialized exclusively in subscription and recurring revenue models, understanding the unique challenges 
                    of LTV optimization, churn prevention, and sustainable customer acquisition at scale.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Growth-Stage Companies</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Focused on helping 5-75 employee subscription companies scale beyond their initial audiences, 
                    providing creative concepts and audience expansion strategies for teams managing serious ad budgets.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Speed & Optimization</h4>
                  <p className="text-gray-300 leading-relaxed">
                    48-hour creative concept delivery when agencies take weeks. Built for performance marketers 
                    who need constant creative testing fuel to maintain growth velocity and competitive advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Advantage */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Growth Leaders Choose Us Over Traditional Agencies
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Unlike agencies that take weeks for concept delivery, our approach gets you fresh creative ideas 
                every Monday. Built specifically for subscription companies who understand their growth challenges 
                and need creative concepts that actually move the needle.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Speed Advantage</h4>
                <p className="text-sm text-gray-600">48-hour delivery vs 2-week agency turnarounds</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Growth Focus</h4>
                <p className="text-sm text-gray-600">Built specifically for subscription business models</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-navy-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                <p className="text-sm text-gray-600">200+ growth leaders already getting fresh concepts weekly</p>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => onOpenApplication && onOpenApplication('full')}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 inline-flex items-center"
              >
                Book Growth Assessment
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Free assessment • Growth bottleneck analysis • No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}