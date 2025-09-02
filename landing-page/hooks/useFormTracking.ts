import { useEffect, useRef, useState } from 'react';
import { trackFormStart, trackFormComplete, trackFormAbandonment } from '@/components/analytics';

interface UseFormTrackingProps {
  formName: string;
  formType: string;
  onFormComplete?: (formData: any) => void;
  onFormAbandonment?: (step: string) => void;
}

export function useFormTracking({
  formName,
  formType,
  onFormComplete,
  onFormAbandonment,
}: UseFormTrackingProps) {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const formStartTime = useRef<Date | null>(null);
  const lastInteractionTime = useRef<Date | null>(null);
  const formData = useRef<any>({});

  // Track form start
  const startForm = () => {
    if (!isFormStarted) {
      setIsFormStarted(true);
      formStartTime.current = new Date();
      lastInteractionTime.current = new Date();
      trackFormStart(formName, formType);
    }
  };

  // Track form step
  const trackStep = (step: string, stepData?: any) => {
    if (!isFormStarted) {
      startForm();
    }
    
    setCurrentStep(step);
    lastInteractionTime.current = new Date();
    
    if (stepData) {
      formData.current = { ...formData.current, ...stepData };
    }
  };

  // Track form completion
  const completeForm = (finalData?: any) => {
    if (isFormStarted) {
      const finalFormData = { ...formData.current, ...finalData };
      trackFormComplete(formName, formType, finalFormData);
      
      if (onFormComplete) {
        onFormComplete(finalFormData);
      }
      
      // Reset form state
      setIsFormStarted(false);
      setCurrentStep('');
      formStartTime.current = null;
      lastInteractionTime.current = null;
      formData.current = {};
    }
  };

  // Track form abandonment
  const abandonForm = (reason?: string) => {
    if (isFormStarted) {
      const abandonmentStep = reason || currentStep || 'unknown';
      trackFormAbandonment(formName, formType, abandonmentStep);
      
      if (onFormAbandonment) {
        onFormAbandonment(abandonmentStep);
      }
      
      // Reset form state
      setIsFormStarted(false);
      setCurrentStep('');
      formStartTime.current = null;
      lastInteractionTime.current = null;
      formData.current = {};
    }
  };

  // Auto-abandonment detection (if user leaves page without completing)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isFormStarted) {
        abandonForm('page_unload');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && isFormStarted) {
        // User switched tabs or minimized browser
        // Don't abandon immediately, but track the interaction
        lastInteractionTime.current = new Date();
      }
    };

    // Check for abandonment after 5 minutes of inactivity
    const checkAbandonment = () => {
      if (isFormStarted && lastInteractionTime.current) {
        const timeSinceLastInteraction = Date.now() - lastInteractionTime.current.getTime();
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
        
        if (timeSinceLastInteraction > fiveMinutes) {
          abandonForm('inactivity_timeout');
        }
      }
    };

    const abandonmentInterval = setInterval(checkAbandonment, 30000); // Check every 30 seconds

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(abandonmentInterval);
    };
  }, [isFormStarted, formName, formType, onFormAbandonment]);

  return {
    isFormStarted,
    currentStep,
    startForm,
    trackStep,
    completeForm,
    abandonForm,
    formData: formData.current,
  };
} 