'use client';

import { TrendingUp, Target, DollarSign, Users, BarChart3, Building2 } from 'lucide-react';

export function CreativePerformanceData() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BarChart3 className="h-4 w-4 mr-2" />
              DATA-BACKED INSIGHTS
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Creative Is Your Campaign's Make-or-Break Factor
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Meta, TikTok, and LinkedIn all confirm: creative quality determines campaign success more than targeting, budget, or bidding strategy.
            </p>
          </div>

          {/* Key Statistics Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">Campaign Success</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Meta research confirms 80% of campaign performance comes from creative quality, not targeting or bidding strategies.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">5-10</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">Creative Variations</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Successful campaigns require 5-10 creative variations per week to combat creative fatigue and maintain performance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5x</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">Better Results</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Same budget, strategic creative gets 5x better results than random creative testing. Strategy beats guesswork.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Evidence */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              The Creative Performance Reality
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <BarChart3 className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Creative Fatigue Kills Campaigns</h4>
                    <p className="text-gray-600">
                      Ad performance drops 40% after 3-7 days without fresh creative. Most startups launch one ad and wonder why it stops working.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Platform Algorithms Prioritize Creative</h4>
                    <p className="text-gray-600">
                      Facebook, TikTok, and LinkedIn all use creative engagement as their primary ranking factor. Good creative = lower costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Building2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Big Companies Have Creative Teams</h4>
                    <p className="text-gray-600">
                      Big companies employ creative strategists earning $150K+/year. Startups can't afford this but need the same advantage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Budget Efficiency Through Strategy</h4>
                    <p className="text-gray-600">
                      Strategic creative testing wastes less budget than random guesswork. Get winning concepts faster with proven frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-gray-200 pt-8 mt-8 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Get Professional-Level Creative Strategy for Your Startup
              </h4>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Strategic ad hooks and creative scripts delivered weekly. No $150K/year creative strategist required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  See Weekly Plans
                </button>
                <button
                  onClick={() => window.location.href = '/free-hooks'}
                  className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Get Free Hooks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}