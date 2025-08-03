'use client';

import { CalculatorProps } from '@/lib/calculators/types';
import { useCalculator } from '@/hooks/useCalculator';
import { CalculatorProgress } from './calculator-progress';
import { CalculatorQuestion } from './calculator-question';
import { CalculatorNavigation } from './calculator-navigation';
import { CalculatorResults } from './calculator-results';

export function BaseCalculator({
  title,
  description,
  questions,
  calculateResults,
  onComplete,
  className = ''
}: CalculatorProps) {
  const {
    state,
    updateInput,
    nextStep,
    prevStep,
    calculateAndComplete,
    reset,
    getCurrentQuestion,
    getProgress,
    canProceed,
    isFirstStep,
    isLastStep
  } = useCalculator({ questions, calculateResults, onComplete });

  const currentQuestion = getCurrentQuestion();

  if (state.isComplete && state.results) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <CalculatorResults 
          results={state.results} 
          title={`${title} - Results`}
          onReset={reset}
        />
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Progress */}
      <CalculatorProgress 
        currentStep={state.currentStep}
        totalSteps={state.totalSteps}
        progress={getProgress()}
      />

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        {currentQuestion && (
          <CalculatorQuestion
            question={currentQuestion}
            value={state.inputs[currentQuestion.id]}
            onChange={(value) => updateInput(currentQuestion.id, value)}
            error={state.errors[currentQuestion.id]}
          />
        )}
      </div>

      {/* Navigation */}
      <CalculatorNavigation
        canProceed={canProceed()}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={prevStep}
        onNext={nextStep}
        onCalculate={calculateAndComplete}
      />
    </div>
  );
}