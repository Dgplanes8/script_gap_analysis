'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  content: string;
  metrics: {
    before: string;
    after: string;
    improvement: string;
  };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Growth Director',
    company: 'Streaming Platform',
    avatar: '/api/placeholder/64/64',
    content: 'The customer-language approach was a revelation. Our scripts went from generic subscription messaging to speaking directly to busy professionals struggling with content discovery. The difference was immediate.',
    metrics: {
      before: '1.2% CTR',
      after: '3.8% CTR',
      improvement: '+217% improvement'
    },
    rating: 5
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    title: 'Marketing Lead',
    company: 'Meal Delivery Service',
    avatar: '/api/placeholder/64/64',
    content: 'I was spending $127K/month on ads that barely moved the needle. MMM scripts cut our CAC by 34% in the first week. The ROI was undeniable.',
    metrics: {
      before: '$47 CAC',
      after: '$31 CAC',
      improvement: '-34% reduction'
    },
    rating: 5
  },
  {
    id: '3',
    name: 'Jessica Thompson',
    title: 'CEO',
    company: 'E-Learning Platform',
    avatar: '/api/placeholder/64/64',
    content: 'We tried 6 different agencies and freelancers before finding MMM. Finally, scripts that actually understand our customers real pain points about skill development anxiety.',
    metrics: {
      before: '2.1% CTR',
      after: '4.2% CTR',
      improvement: '+100% improvement'
    },
    rating: 5
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Performance Marketing Manager',
    company: 'Cloud Storage Service',
    avatar: '/api/placeholder/64/64',
    content: 'The 48-hour delivery is real. What impressed me most was how they captured the exact language our customers use in reviews. It felt authentic, not salesy.',
    metrics: {
      before: '1.8% CTR',
      after: '3.1% CTR',
      improvement: '+72% improvement'
    },
    rating: 5
  },
  {
    id: '5',
    name: 'Emma Wilson',
    title: 'Head of Growth',
    company: 'Content Management Platform',
    avatar: '/api/placeholder/64/64',
    content: 'Started with the pilot program, upgraded immediately. The scripts helped us break through a 6-month plateau in our Facebook ad performance.',
    metrics: {
      before: '2.3% CTR',
      after: '3.9% CTR',
      improvement: '+70% improvement'
    },
    rating: 5
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our customer-language approach has transformed ad performance for 127+ businesses
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-brand-200" />
            
            <div className="mb-8">
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-900 leading-relaxed mb-6">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-sm font-medium text-red-600 mb-1">Before</div>
                  <div className="text-lg font-bold text-red-700">
                    {testimonials[currentIndex].metrics.before}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-600 mb-1">After</div>
                  <div className="text-lg font-bold text-green-700">
                    {testimonials[currentIndex].metrics.after}
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-600 mb-1">Result</div>
                  <div className="text-lg font-bold text-blue-700">
                    {testimonials[currentIndex].metrics.improvement}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].title} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-brand-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Join 127+ Businesses Getting Better Results
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-600">34%</div>
                <div className="text-sm text-gray-600">Avg CTR Improvement</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Pilot → Full Upgrade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}