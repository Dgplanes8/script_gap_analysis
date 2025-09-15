'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'TechFlow',
    quote: 'Cut our creative research time by 15+ hours weekly. The performance scoring helps us focus on concepts that actually convert.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Growth',
    company: 'StartupLab',
    quote: 'Finally, creative intelligence that matches our startup speed. No more guessing what content will work.',
    rating: 5
  }
];

export function SocialProofClean() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="mb-3">
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              Success Stories
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Strategic Intelligence That Delivers Results
          </h2>
          <p className="text-lg text-gray-600">
            See what startup founders say about our proven creative frameworks
          </p>
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Attribution */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Join startup founders getting strategic creative intelligence weekly
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Weekly Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">No Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}