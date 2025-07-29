'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required').optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCaptureFormProps {
  placeholder?: string;
  buttonText?: string;
  variant?: 'hero' | 'cta' | 'inline';
  showFirstName?: boolean;
  onSubmit?: (data: EmailFormData) => Promise<void>;
}

export function EmailCaptureForm({
  placeholder = 'Enter your email address',
  buttonText = 'Get Started',
  variant = 'inline',
  showFirstName = false,
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
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Failed to subscribe');
        }
      }
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
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
          Thank you for subscribing!
        </h3>
        <p className="text-green-700">
          Check your email for your first marketing insight and exclusive resources.
        </p>
      </div>
    );
  }

  const inputClasses = {
    hero: 'form-input text-gray-900 text-lg',
    cta: 'form-input text-gray-900',
    inline: 'form-input text-gray-900',
  };

  const buttonClasses = {
    hero: 'btn-primary text-lg px-8 py-3 whitespace-nowrap',
    cta: 'btn-primary px-6 py-3 whitespace-nowrap',
    inline: 'btn-primary px-6 py-3 whitespace-nowrap',
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <div className={`flex ${variant === 'hero' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-3`}>
        {showFirstName && (
          <div className="flex-1">
            <input
              type="text"
              placeholder="First name"
              className={inputClasses[variant]}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
        )}
        
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
            <span className="flex items-center">
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </button>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Join 2,847+ marketers getting weekly insights. Unsubscribe anytime.
      </p>
    </form>
  );
}