'use client';

import { TrendingUp, Users, Award, Target, DollarSign, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-brand-100 text-brand-800 rounded-full text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              Performance Marketing Expertise
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ STARTUP FOCUSED
              </div>
              <div className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ SUBSCRIPTION FOCUS
              </div>
              <div className="bg-navy-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✓ WEEKLY DELIVERY
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Weekly Ad Strategy from a Fellow Startup Founder
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <strong>Built by a founder, for founders.</strong> Professional ad strategies delivered weekly for startup teams who can't afford expensive agencies. 
              Get winning creative concepts every Monday with proven frameworks from someone who's been in your shoes.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-6">
              <div className="bg-brand-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-600 mb-2">Weekly</div>
              <div className="text-sm text-gray-600">Creative Delivery</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-6">
              <div className="bg-brand-600 rounded-full p-3 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-6">
              <div className="bg-brand-600 rounded-full p-3 w-fit mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-600 mb-2">$250MM+</div>
              <div className="text-sm text-gray-600">Media Spend Managed</div>
            </div>
          </div>


          {/* Strategic Advantage */}
          <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Startup Founders Choose Weekly Ad Strategy
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Unlike expensive agencies ($5K-15K/month), get professional ad strategies for $5-35/week. 
                Built specifically for startup founders who need winning campaigns but can't afford traditional marketing services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Save Time & Money</h4>
                <p className="text-sm text-gray-600">Weekly delivery vs expensive agencies or DIY guesswork</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Startup Focus</h4>
                <p className="text-sm text-gray-600">Built specifically for early-stage startup budgets and needs</p>
              </div>
              <div className="text-center bg-white rounded-xl p-6">
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-navy-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Launch Success</h4>
                <p className="text-sm text-gray-600">Help founders launch winning campaigns from day one</p>
              </div>
            </div>
            
            {/* Strategic Methodology Showcase */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-50 rounded-2xl p-8 mb-12 border border-brand-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Systematic Proven Methodology
                </h3>
                <p className="text-lg text-gray-600">
                  Our proven frameworks that power the weekly creative intelligence service
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/weekly-creative-intelligence-playbook" className="group">
                  <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                      <TrendingUp className="h-6 w-6 text-brand-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete proven methodology for systematic creative development and strategic implementation</p>
                    <span className="text-brand-600 text-sm font-medium group-hover:text-brand-700">Learn the Complete Framework →</span>
                  </div>
                </Link>
                
                <Link href="/25-point-performance-scoring-system" className="group">
                  <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                      <Target className="h-6 w-6 text-brand-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">25-Point Performance Scoring</h4>
                    <p className="text-sm text-gray-600 mb-3">Research-backed framework for predicting creative performance before testing, saving time and budget</p>
                    <span className="text-brand-600 text-sm font-medium group-hover:text-brand-700">See the Scoring System →</span>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => {
                  const serviceSection = document.getElementById('service-tiers');
                  if (serviceSection) {
                    serviceSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#service-tiers';
                  }
                }}
                className="bg-gradient-to-r from-brand-600 to-brand-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-brand-700 hover:to-brand-700 transition-all duration-200 inline-flex items-center"
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