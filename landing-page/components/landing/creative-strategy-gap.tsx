'use client';

import { Building2, Users, DollarSign, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

export function CreativeStrategyGap() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              THE CREATIVE ADVANTAGE GAP
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Big Companies Win at Advertising (And Startups Don't)
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Big companies have dedicated creative strategists. Startups have founders wearing 10 hats. 
              This creates an unfair advantage - until now.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Big Companies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Big Companies</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <DollarSign className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">$150K+ Creative Strategists</div>
                    <div className="text-sm text-gray-600">Full-time employees focused solely on creative strategy</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <Users className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dedicated Creative Teams</div>
                    <div className="text-sm text-gray-600">Copywriters, designers, video producers, analysts</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Systematic Creative Testing</div>
                    <div className="text-sm text-gray-600">5-10 new creatives weekly with performance tracking</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <Building2 className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Agency Relationships</div>
                    <div className="text-sm text-gray-600">$10K-50K/month creative agencies on retainer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Startups */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Early-Stage Startups</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Founder Wears All Hats</div>
                    <div className="text-sm text-gray-600">CEO, product, sales, marketing - no time for creative strategy</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <DollarSign className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Bootstrap Budget Constraints</div>
                    <div className="text-sm text-gray-600">Can't afford $5K-15K/month agency minimums</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Random Creative Testing</div>
                    <div className="text-sm text-gray-600">Guessing what works, wasting budget on bad creative</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <Users className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">DIY Everything</div>
                    <div className="text-sm text-gray-600">Learning ad platforms + creative strategy simultaneously</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Gap Statistics */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              The Numbers Don't Lie
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">98%</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Startups Launch Without Strategy</h4>
                <p className="text-gray-600 text-sm">
                  Most founders launch ads with random creative, no systematic approach, and wonder why campaigns fail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">$150K</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Creative Strategist Salary</h4>
                <p className="text-gray-600 text-sm">
                  Big companies pay $150K+/year for creative strategists. Startups can't afford this but need the same advantage.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">$5</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Weekly Creative Strategy</h4>
                <p className="text-gray-600 text-sm">
                  Get professional-level creative strategy for what big companies spend on office coffee per employee.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Level the Playing Field
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get the same strategic creative intelligence that big companies use - 
              delivered weekly at startup-friendly pricing. From a proven ad strategist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const serviceSection = document.getElementById('service-tiers');
                  if (serviceSection) {
                    serviceSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                <span>Start Your Free Week</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={() => window.location.href = '/free-hooks'}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Get Free Sample Hooks
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}