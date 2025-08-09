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
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              Fortune 100 Proven Methodology
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ $100M+ AD SPEND MANAGED
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ 10+ YEARS EXPERIENCE
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ SYSTEMATIC APPROACH
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fortune 100 Systematic Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The same systematic 11-phase methodology used to manage $100M+ in ad spend for Fortune 100 companies, 
              now adapted for weekly trend intelligence delivery. Unlike agencies that focus on execution, we provide 
              strategic transformation enhanced with AI research tools and competitive analysis.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
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

          {/* Strategic Advantage */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Fortune 100 Methodology Works for Subscription Businesses
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Unlike agencies that jump straight to creative execution, our systematic approach ensures every 
                decision is strategic, data-driven, and aligned with your specific business goals. You get the 
                same strategic rigor used by Fortune 100 companies, adapted for subscription business models.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Systematic Process</h4>
                <p className="text-sm text-gray-600">11-phase methodology ensures nothing is left to chance</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategic Focus</h4>
                <p className="text-sm text-gray-600">Focus on business transformation, not just creative output</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                <p className="text-sm text-gray-600">Validated across $100M+ in managed ad spend</p>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => onOpenApplication && onOpenApplication('full')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 inline-flex items-center"
              >
                Book Strategic Consultation
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Free consultation • Custom strategic assessment • No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}