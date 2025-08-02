'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

interface ExitIntentPopupProps {
  title?: string;
  subtitle?: string;
}

export function ExitIntentPopup({ 
  title = "Wait! Get Your Free Hook Bank Before You Go",
  subtitle = "Join 1,200+ marketers getting winning hooks every Monday + instant access to our 10 Hook Bank PDF."
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the viewport from the top
      if (e.clientY <= 0 && !hasTriggered && !isDismissed) {
        setIsVisible(true);
        hasTriggered = true;
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    // Add event listeners after a short delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('keydown', handleEscape);
    }, 5000); // Wait 5 seconds before enabling exit intent

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative animate-in zoom-in duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          <EmailCaptureForm
            placeholder="Enter your email for instant access"
            buttonText="Get My Hook Bank"
            variant="cta"
            source="exit-intent-popup"
          />

          <div className="text-center mt-4">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              No thanks, I'll pass on the free hooks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}