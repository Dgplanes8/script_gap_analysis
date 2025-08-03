'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

interface CACCalculatorData {
  monthlyRevenue: number;
  currentCAC: number;
  monthlyAcquisitions: number;
  customerLTV: number;
  adSpend: number;
  conversionRate: number;
}

interface CalculatorSectionProps {
  calculatorData: CACCalculatorData;
  setCalculatorData: (data: CACCalculatorData | ((prev: CACCalculatorData) => CACCalculatorData)) => void;
  showCalculatorResults: boolean;
  setShowCalculatorResults: (show: boolean) => void;
}

export function CalculatorSection({
  calculatorData,
  setCalculatorData,
  showCalculatorResults,
  setShowCalculatorResults
}: CalculatorSectionProps) {
  const calculateCACReduction = () => {
    setShowCalculatorResults(true);
  };

  const potentialSavings = calculatorData.currentCAC > 0 && calculatorData.monthlyAcquisitions > 0 
    ? (calculatorData.currentCAC * 0.35 * calculatorData.monthlyAcquisitions * 12)
    : 0;

  return (
    <section className="mb-16">
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CAC Reduction Potential Calculator
          </h2>
          <p className="text-gray-600">
            Calculate your potential savings using our Fortune 100 optimization framework
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CAC ($)
                </label>
                <input
                  type="number"
                  value={calculatorData.currentCAC || ''}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, currentCAC: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Acquisitions
                </label>
                <input
                  type="number"
                  value={calculatorData.monthlyAcquisitions || ''}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, monthlyAcquisitions: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 150"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer LTV ($)
                </label>
                <input
                  type="number"
                  value={calculatorData.customerLTV || ''}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, customerLTV: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 1800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Ad Spend ($)
                </label>
                <input
                  type="number"
                  value={calculatorData.adSpend || ''}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, adSpend: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 45000"
                />
              </div>
            </div>

            <button
              onClick={calculateCACReduction}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Calculate Reduction Potential
            </button>
          </div>

          <div className="space-y-6">
            {showCalculatorResults ? (
              <>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">Optimization Potential</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">35%</div>
                      <div className="text-sm text-green-700">Average CAC Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">${potentialSavings.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Annual Savings Potential</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-indigo-900 mb-3">Get Your Custom Implementation Plan</h4>
                  <EmailCaptureForm
                    placeholder="Enter your work email"
                    buttonText="Get Custom Plan"
                    variant="cta"
                    source="cac-calculator-results"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your metrics to see optimization potential</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}