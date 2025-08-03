'use client';

import { Target, TrendingDown, Users, DollarSign } from 'lucide-react';

export function StrategicFramework() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Customer Acquisition Cost Reduction Matters for Subscription Businesses</h2>
      <p className="text-lg text-gray-700 mb-6">
        Customer Acquisition Cost (CAC) is the most critical metric for subscription business growth. With the average B2B SaaS CAC increasing by 60% over the past five years, systematic CAC reduction has become essential for sustainable growth and profitability.
      </p>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Industry Benchmark Alert</h3>
            <p className="text-yellow-700">
              Fortune 100 companies achieve CAC reduction of 25-45% through systematic optimization. 
              Companies that don't optimize CAC see 15-20% annual increases due to increased competition and rising ad costs.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Fortune 100 CAC Reduction Framework</h3>
      <p className="text-gray-700 mb-6">
        This implementation guide is based on methodologies used by Fortune 100 companies to manage over $100M in annual ad spend. The framework focuses on four core pillars:
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-indigo-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Precision Targeting</h4>
          <p className="text-gray-600 text-sm">Advanced audience segmentation using behavioral data and predictive modeling to eliminate wasted ad spend.</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingDown className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Attribution Accuracy</h4>
          <p className="text-gray-600 text-sm">Multi-touch attribution modeling to accurately measure and optimize CAC across all touchpoints.</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Creative Intelligence</h4>
          <p className="text-gray-600 text-sm">Data-driven creative optimization using customer language analysis and performance scoring.</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-orange-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Channel Optimization</h4>
          <p className="text-gray-600 text-sm">Systematic budget allocation and channel mix optimization based on true CAC performance.</p>
        </div>
      </div>
    </section>
  );
}