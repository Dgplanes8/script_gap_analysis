'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight } from 'lucide-react';
import { trackEmailSignup, trackFormAbandonment } from '@/components/analytics';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCaptureFormProps {
  placeholder?: string;
  buttonText?: string;
  variant?: 'hero' | 'cta' | 'inline';
  source?: string; // Track where the signup came from
  onSubmit?: (data: EmailFormData) => Promise<void>;
}

export function EmailCaptureForm({
  placeholder = 'Enter your work email address',
  buttonText = 'Claim Free Week',
  variant = 'inline',
  source = 'unknown',
  onSubmit,
}: EmailCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleFormSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission logic
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            source: source,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to subscribe');
        }
      }
      
      // Track successful signup
      trackEmailSignup(source);
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      trackFormAbandonment('email_signup', 'submission_error');
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Your 10 Free Hooks Are Coming!
        </h3>
        <p className="text-green-700">
          Check your email for your Hook Bank PDF and weekly creative intelligence newsletter.
        </p>
      </div>
    );
  }

  const inputClasses = {
    hero: 'form-input text-gray-900 text-lg min-h-[48px] text-base sm:text-lg',
    cta: 'form-input text-gray-900 min-h-[44px] text-base',
    inline: 'form-input text-gray-900 min-h-[44px] text-base',
  };

  const buttonClasses = {
    hero: 'btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 min-h-[48px] flex-shrink-0',
    cta: 'btn-primary text-base px-4 sm:px-6 py-3 min-h-[44px] flex-shrink-0',
    inline: 'btn-primary text-base px-4 sm:px-6 py-3 min-h-[44px] flex-shrink-0',
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <div className={`flex ${variant === 'hero' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-3 items-stretch`}>
        <div className="flex-1">
          <input
            type="email"
            placeholder={placeholder}
            className={inputClasses[variant]}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClasses[variant]} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            'Subscribing...'
          ) : (
            <span className="flex items-center justify-center text-center">
              <span className="truncate">{buttonText}</span>
              <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </span>
          )}
        </button>
      </div>
      
      <div className="text-sm text-gray-600 text-center bg-gray-50 rounded-lg p-3">
        <div className="font-medium">Join 1,200+ growth marketers getting weekly concepts</div>
        <div className="mt-1">Get your 10 Hook Bank PDF instantly • Unsubscribe anytime</div>
      </div>
    </form>
  );
}