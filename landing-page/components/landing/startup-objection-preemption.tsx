'use client';

import { DollarSign, Clock, AlertCircle, TrendingUp, Shield, CheckCircle } from 'lucide-react';

export function StartupObjectionPreemption() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="h-4 w-4 mr-2" />
              EVERYTHING YOU NEED TO LAUNCH SUCCESSFUL ADS
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              "But I'm Not Sure If This Will Work for My Startup..."
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Every startup founder worries about the same things. Here's why our weekly ad strategy service is built specifically for your concerns.
            </p>
          </div>

          {/* Objection Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Budget Concern */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                "I Can't Afford to Waste Money"
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>$5/week starting price</strong> - Less than a daily coffee. No $5K agency minimums.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>First week FREE</strong> - Experience the value before paying a penny.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Cancel anytime</strong> - No contracts, no commitments, no risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Time Concern */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                "I Don't Have Time to Learn"
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Ready-to-use templates</strong> - Copy, paste, launch. No learning curve.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Step-by-step instructions</strong> - Exactly what to do, when to do it.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Monday delivery</strong> - Fits into your weekly planning routine.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Concern */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                "How Do I Know It'll Work?"
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Proven methodologies</strong> - Based on $250MM+ in managed ad spend.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Performance scoring system</strong> - Each template rated for success probability.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    <strong>Free week trial</strong> - Experience results before committing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Risk Reversal */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center">
            <div className="mb-6">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">
                Zero-Risk Startup Guarantee
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-xl font-bold mb-2">FREE First Week</div>
                <p className="text-sm opacity-90">Experience full value before paying anything</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-xl font-bold mb-2">Cancel Anytime</div>
                <p className="text-sm opacity-90">No contracts, no commitments, no questions asked</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-xl font-bold mb-2">Startup Pricing</div>
                <p className="text-sm opacity-90">Built for bootstrap budgets, not enterprise wallets</p>
              </div>
            </div>
            
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              If our weekly ad templates don't help you launch better campaigns in your first week, 
              simply cancel - no questions asked, no risk to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const serviceSection = document.getElementById('service-tiers');
                  if (serviceSection) {
                    serviceSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Start My FREE Week Today
              </button>
              <button
                onClick={() => window.location.href = '/free-hooks'}
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Get Free Templates First
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}