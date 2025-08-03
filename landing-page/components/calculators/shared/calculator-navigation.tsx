'use client';

import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react';

interface CalculatorNavigationProps {
  canProceed: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCalculate: () => void;
  loading?: boolean;
}

export function CalculatorNavigation({
  canProceed,
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onCalculate,
  loading = false
}: CalculatorNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </button>

      {isLastStep ? (
        <button
          onClick={onCalculate}
          disabled={!canProceed || loading}
          className="flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Calculator className="h-5 w-5 mr-2" />
          {loading ? 'Calculating...' : 'Calculate Results'}
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      )}
    </div>
  );
}