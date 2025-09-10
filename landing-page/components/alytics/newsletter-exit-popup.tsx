'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Mail, ArrowRight, TrendingUp } from 'lucide-react';
import { trackEmailSignup, trackFormAbandonment } from '@/components/analytics';
import { trackNewsletterSignup, trackFormStart } from '@/components/analytics/gtm';

const newsletterSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterExitPopupProps {
  title?: string;
  subtitle?: string;
}

export function NewsletterExitPopup({ 
  title = "Don't Miss Out on Weekly Content Intelligence!",
  subtitle = "Join 100+ startup founders getting trending content ideas and custom scripts delivered every Monday morning."
}: NewsletterExitPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  useEffect(() => {
    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the viewport from the top
      if (e.clientY <= 0 && !hasTriggered && !isDismissed && !isSubmitted) {
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
    }, 8000); // Wait 8 seconds before enabling exit intent

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDismissed, isSubmitted]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleFormSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          source: 'alytics-exit-popup',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
      
      // Track successful signup
      trackEmailSignup('alytics-exit-popup');
      trackNewsletterSignup(data.email, 'alytics-exit-popup');
      
      setIsSubmitted(true);
      reset();
      
      // Auto-close after success
      setTimeout(() => {
        setIsVisible(false);
        setIsDismissed(true);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      trackFormAbandonment('newsletter_signup', 'submission_error', 'alytics-exit-popup');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {isSubmitted ? (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="p-8 text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Our Newsletter!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for joining! Check your email for confirmation and get ready for weekly content intelligence.
              </p>
            </motion.div>
          ) : (
            <div className="p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    onFocus={() => trackFormStart('newsletter_exit_popup')}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    'Joining Newsletter...'
                  ) : (
                    <>
                      Join the Newsletter
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>

                {/* Trust Badge */}
                <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                  <div className="font-medium">Weekly insights • Trending analysis</div>
                  <div className="mt-1">Unsubscribe anytime • No spam, ever</div>
                </div>

              </form>

              {/* Decline Option */}
              <div className="text-center mt-6">
                <button
                  onClick={handleClose}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  No thanks, I'll create content the hard way
                </button>
              </div>
              
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}