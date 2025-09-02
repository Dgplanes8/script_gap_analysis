'use client';

import React, { useState } from 'react';
import { useFormTracking } from '@/hooks/useFormTracking';

interface TrackedFormProps {
  children: React.ReactNode;
  formName: string;
  formType: string;
  onSubmit?: (formData: any) => void;
  onFormComplete?: (formData: any) => void;
  onFormAbandonment?: (step: string) => void;
  className?: string;
  [key: string]: any; // Allow additional props
}

export function TrackedForm({
  children,
  formName,
  formType,
  onSubmit,
  onFormComplete,
  onFormAbandonment,
  className = '',
  ...props
}: TrackedFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const {
    isFormStarted,
    currentStep,
    startForm,
    trackStep,
    completeForm,
    abandonForm,
  } = useFormTracking({
    formName,
    formType,
    onFormComplete,
    onFormAbandonment,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Get form data
    const formElement = event.currentTarget;
    const formDataObj = new FormData(formElement);
    const data: Record<string, any> = {};
    
    // Use Array.from to avoid iteration issues
    Array.from(formDataObj.entries()).forEach(([key, value]) => {
      data[key] = value;
    });
    
    // Complete the form
    completeForm(data);
    
    // Call the original onSubmit if provided
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    
    // Start form tracking on first interaction
    if (!isFormStarted) {
      startForm();
    }
    
    // Track form step
    trackStep('input_change', { [name]: value });
    
    // Update local form data
    setFormData((prev: Record<string, any>) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = event.target;
    
    // Start form tracking on first focus
    if (!isFormStarted) {
      startForm();
    }
    
    // Track form step
    trackStep('field_focus', { focused_field: name });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    
    // Track form step
    trackStep('field_blur', { blurred_field: name, field_value: value });
  };

  // Clone children and add tracking props
  const childrenWithTracking = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onChange: (event: any) => {
          // Call the original onChange if it exists
          if (child.props.onChange) {
            child.props.onChange(event);
          }
          handleInputChange(event);
        },
        onFocus: (event: any) => {
          // Call the original onFocus if it exists
          if (child.props.onFocus) {
            child.props.onFocus(event);
          }
          handleFocus(event);
        },
        onBlur: (event: any) => {
          // Call the original onBlur if it exists
          if (child.props.onBlur) {
            child.props.onBlur(event);
          }
          handleBlur(event);
        },
      });
    }
    return child;
  });

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      {...props}
    >
      {childrenWithTracking}
    </form>
  );
}

// Enhanced tracked form with step-by-step tracking
interface EnhancedTrackedFormProps extends TrackedFormProps {
  steps?: string[];
  currentStepIndex?: number;
  onStepChange?: (stepIndex: number, stepData: any) => void;
}

export function EnhancedTrackedForm({
  children,
  formName,
  formType,
  steps = [],
  currentStepIndex = 0,
  onStepChange,
  onSubmit,
  onFormComplete,
  onFormAbandonment,
  className = '',
  ...props
}: EnhancedTrackedFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStepIdx, setCurrentStepIdx] = useState(currentStepIndex);

  const {
    isFormStarted,
    currentStep,
    startForm,
    trackStep,
    completeForm,
    abandonForm,
  } = useFormTracking({
    formName,
    formType,
    onFormComplete,
    onFormAbandonment,
  });

  const handleStepChange = (stepIndex: number, stepData?: any) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStepIdx(stepIndex);
      
      // Track step change
      const stepName = steps[stepIndex];
      trackStep(stepName, stepData);
      
      if (onStepChange) {
        onStepChange(stepIndex, stepData);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Get form data
    const formElement = event.currentTarget;
    const formDataObj = new FormData(formElement);
    const data: Record<string, any> = {};
    
    // Use Array.from to avoid iteration issues
    Array.from(formDataObj.entries()).forEach(([key, value]) => {
      data[key] = value;
    });
    
    // Complete the form
    completeForm(data);
    
    // Call the original onSubmit if provided
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
      
      {/* Step navigation buttons */}
      {steps.length > 1 && (
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => handleStepChange(currentStepIdx - 1)}
            disabled={currentStepIdx === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Step {currentStepIdx + 1} of {steps.length}
          </span>
          
          <button
            type="button"
            onClick={() => handleStepChange(currentStepIdx + 1)}
            disabled={currentStepIdx === steps.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
} 