'use client';

import { TrendingUp, Target, DollarSign, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/calculators/calculations';
import { CalculatorResults as ResultsType } from '@/lib/calculators/types';

interface CalculatorResultsProps {
  results: ResultsType;
  title?: string;
  onReset?: () => void;
}

export function CalculatorResults({ results, title = "Your Results", onReset }: CalculatorResultsProps) {
  const renderMetricCard = (icon: React.ReactNode, label: string, value: string | number, change?: number, isPercentage = false) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-100 rounded-lg mr-3">
            {icon}
          </div>
          <span className="text-sm font-medium text-gray-600">{label}</span>
        </div>
        {change !== undefined && (
          <span className={`text-sm font-medium ${
            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change > 0 ? '+' : ''}{isPercentage ? formatPercentage(change) : formatCurrency(change)}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {typeof value === 'number' ? (isPercentage ? formatPercentage(value) : formatCurrency(value)) : value}
      </p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">Based on your inputs, here's your optimization potential</p>
      </div>

      {/* Current vs Optimized Performance */}
      {results.currentPerformance && results.optimizedPerformance && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Performance</h3>
            <div className="space-y-4">
              {Object.entries(results.currentPerformance).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-semibold">
                    {key.includes('Rate') || key.includes('ROAS') || key.includes('CTR') || key.includes('CVR')
                      ? formatPercentage(value)
                      : formatCurrency(value)
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimized Performance</h3>
            <div className="space-y-4">
              {Object.entries(results.optimizedPerformance).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-semibold text-green-600">
                    {key.includes('Rate') || key.includes('ROAS') || key.includes('CTR') || key.includes('CVR')
                      ? formatPercentage(value)
                      : formatCurrency(value)
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Improvements */}
      {results.improvements && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Improvements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(results.improvements).map(([key, value]) => {
              const isPercentage = key.includes('Improvement') || key.includes('Reduction');
              const icon = key.includes('Revenue') ? <DollarSign className="h-5 w-5 text-indigo-600" /> :
                          key.includes('Conversions') ? <Target className="h-5 w-5 text-indigo-600" /> :
                          <TrendingUp className="h-5 w-5 text-indigo-600" />;
              
              return renderMetricCard(
                icon,
                key.replace(/([A-Z])/g, ' $1').trim(),
                value,
                undefined,
                isPercentage
              );
            })}
          </div>
        </div>
      )}

      {/* Score Display */}
      {results.score !== undefined && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full border-4 border-indigo-200 mb-4">
            <span className="text-2xl font-bold text-indigo-600">{results.score}</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">Overall Score</p>
        </div>
      )}

      {/* Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="bg-white rounded-lg p-6">
            <ul className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {onReset && (
        <div className="text-center">
          <button
            onClick={onReset}
            className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Start New Calculation
          </button>
        </div>
      )}
    </div>
  );
}