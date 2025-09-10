'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { trackEmailSignup, trackFormAbandonment } from '@/components/analytics';
import { trackNewsletterSignup, trackFormStart } from '@/components/analytics/gtm';

const newsletterSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

const decorativeVariants = {
  hidden: { opacity: 0, scale: 0, rotate: 0 },
  visible: {
    opacity: 0.8,
    scale: 1,
    rotate: 16,
    transition: {
      duration: 1,
      delay: 0.8,
      ease: "backOut"
    }
  }
};

const floatAnimation = {
  y: [-8, 8, -8],
  rotate: [16, 20, 16],
  transition: {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity
  }
};

export function NewsletterSection() {
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

  const handleFormSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          source: 'alytics-newsletter-section',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
      
      // Track successful signup
      trackEmailSignup('alytics-newsletter-section');
      trackNewsletterSignup(data.email, 'alytics-newsletter-section');
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      trackFormAbandonment('newsletter_signup', 'submission_error', 'alytics-newsletter-section');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Our Newsletter!
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Thank you for joining our community! Check your email for confirmation and get ready to receive weekly content intelligence insights every Monday morning.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Decorative Floating Element */}
        <motion.div
          variants={decorativeVariants}
          initial="hidden"
          whileInView="visible"
          animate={floatAnimation}
          viewport={{ once: true }}
          className="absolute top-16 right-8 md:right-16 w-16 h-11 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl opacity-80 hidden md:block"
          style={{ transform: 'rotate(16deg)' }}
        >
          <div className="w-full h-full bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-14"
        >
          
          {/* Section Header */}
          <div className="text-center">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Mail className="w-4 h-4 mr-2" />
                Join Our Newsletter
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight"
            >
              Join Our Newsletter and Grow With Us
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Get the latest content intelligence insights, trending analysis, and custom script ideas delivered straight to your email inbox every Monday morning.
            </motion.p>
          </div>

          {/* Newsletter Form */}
          <motion.div
            variants={itemVariants}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <label 
                    htmlFor="newsletter-name"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Name
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    onFocus={() => trackFormStart('newsletter')}
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
                  <label 
                    htmlFor="newsletter-email"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Email
                  </label>
                  <input
                    id="newsletter-email"
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
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" }}
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
                <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                  <div className="font-medium">Join 100+ startup founders</div>
                  <div className="mt-1">Weekly insights • Trending analysis • Unsubscribe anytime</div>
                </div>

              </form>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}