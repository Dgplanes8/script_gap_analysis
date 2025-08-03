'use client';

import { CalculatorQuestion as QuestionType } from '@/lib/calculators/types';

interface CalculatorQuestionProps {
  question: QuestionType;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export function CalculatorQuestion({ question, value, onChange, error }: CalculatorQuestionProps) {
  const renderInput = () => {
    switch (question.type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500">{option.description}</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'input':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={question.placeholder}
            min={question.min}
            max={question.max}
            step={question.step}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        );

      case 'range':
        return (
          <div className="space-y-4">
            <input
              type="range"
              value={value || question.min || 0}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              min={question.min}
              max={question.max}
              step={question.step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{question.min}{question.unit}</span>
              <span className="font-medium text-indigo-600">
                {value || question.min || 0}{question.unit}
              </span>
              <span>{question.max}{question.unit}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-gray-600">{question.description}</p>
        )}
      </div>
      
      <div className="space-y-2">
        {renderInput()}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {question.unit && question.type === 'input' && (
          <p className="text-sm text-gray-500">Value in {question.unit}</p>
        )}
      </div>
    </div>
  );
}