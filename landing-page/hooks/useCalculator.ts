import { useState, useCallback } from 'react';
import { CalculatorState, CalculatorQuestion, CalculatorResults } from '@/lib/calculators/types';

interface UseCalculatorOptions {
  questions: CalculatorQuestion[];
  calculateResults: (inputs: Record<string, any>) => CalculatorResults;
  onComplete?: (results: CalculatorResults) => void;
}

export function useCalculator(options: UseCalculatorOptions) {
  const [state, setState] = useState<CalculatorState>({
    currentStep: 1,
    totalSteps: options.questions.length,
    inputs: {},
    results: null,
    isComplete: false,
    errors: {}
  });

  const updateInput = useCallback((key: string, value: any) => {
    setState(prev => ({
      ...prev,
      inputs: { ...prev.inputs, [key]: value },
      errors: { ...prev.errors, [key]: '' } // Clear error when user updates
    }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    const currentQuestion = options.questions[state.currentStep - 1];
    if (!currentQuestion) return true;

    const value = state.inputs[currentQuestion.id];
    const validation = currentQuestion.validation;

    if (validation?.required && (!value || value === '')) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [currentQuestion.id]: 'This field is required' }
      }));
      return false;
    }

    if (validation?.min && typeof value === 'number' && value < validation.min) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [currentQuestion.id]: `Minimum value is ${validation.min}` }
      }));
      return false;
    }

    if (validation?.max && typeof value === 'number' && value > validation.max) {
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [currentQuestion.id]: `Maximum value is ${validation.max}` }
      }));
      return false;
    }

    return true;
  }, [state.currentStep, state.inputs, options.questions]);

  const nextStep = useCallback(() => {
    if (!validateCurrentStep()) return;

    setState(prev => {
      const newStep = Math.min(prev.currentStep + 1, prev.totalSteps);
      return { ...prev, currentStep: newStep };
    });
  }, [validateCurrentStep]);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, prev.totalSteps))
    }));
  }, []);

  const calculateAndComplete = useCallback(() => {
    if (!validateCurrentStep()) return;

    const results = options.calculateResults(state.inputs);
    setState(prev => ({
      ...prev,
      results,
      isComplete: true
    }));

    options.onComplete?.(results);
  }, [state.inputs, validateCurrentStep, options]);

  const reset = useCallback(() => {
    setState({
      currentStep: 1,
      totalSteps: options.questions.length,
      inputs: {},
      results: null,
      isComplete: false,
      errors: {}
    });
  }, [options.questions.length]);

  const getCurrentQuestion = useCallback(() => {
    return options.questions[state.currentStep - 1];
  }, [state.currentStep, options.questions]);

  const getProgress = useCallback(() => {
    return (state.currentStep / state.totalSteps) * 100;
  }, [state.currentStep, state.totalSteps]);

  const canProceed = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;

    const value = state.inputs[currentQuestion.id];
    const hasError = state.errors[currentQuestion.id];
    
    if (currentQuestion.validation?.required) {
      return !hasError && value && value !== '';
    }
    
    return !hasError;
  }, [getCurrentQuestion, state.inputs, state.errors]);

  return {
    state,
    updateInput,
    nextStep,
    prevStep,
    goToStep,
    calculateAndComplete,
    reset,
    getCurrentQuestion,
    getProgress,
    canProceed,
    isFirstStep: state.currentStep === 1,
    isLastStep: state.currentStep === state.totalSteps
  };
}