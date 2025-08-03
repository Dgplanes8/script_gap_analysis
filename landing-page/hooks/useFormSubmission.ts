import { useState } from 'react';
import { submitToAirtable, trackFormSubmission } from '@/lib/business-logic/form-submission';

interface UseFormSubmissionOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  trackingEventName?: string;
  trackingFormType?: string;
  additionalData?: Record<string, any>;
}

interface FormSubmissionState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  message: string;
  error: any;
}

export function useFormSubmission(options: UseFormSubmissionOptions = {}) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    message: '',
    error: null
  });

  const submit = async (formData: Record<string, any>) => {
    setState(prev => ({ ...prev, isSubmitting: true, message: '', error: null }));

    try {
      const result = await submitToAirtable(formData, options.additionalData);
      
      if (result.success) {
        setState({
          isSubmitting: false,
          isSubmitted: true,
          message: result.message,
          error: null
        });

        // Track successful submission
        if (options.trackingEventName && options.trackingFormType) {
          trackFormSubmission(options.trackingEventName, options.trackingFormType);
        }

        options.onSuccess?.();
      } else {
        setState({
          isSubmitting: false,
          isSubmitted: false,
          message: result.message,
          error: result.error
        });
        options.onError?.(result.error);
      }
    } catch (error) {
      setState({
        isSubmitting: false,
        isSubmitted: false,
        message: 'Something went wrong. Please try again.',
        error
      });
      options.onError?.(error);
    }
  };

  const reset = () => {
    setState({
      isSubmitting: false,
      isSubmitted: false,
      message: '',
      error: null
    });
  };

  return {
    ...state,
    submit,
    reset
  };
}