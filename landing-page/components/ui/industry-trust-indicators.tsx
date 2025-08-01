'use client';

import { Building2, Users, TrendingUp, Target } from 'lucide-react';

interface IndustryTrustIndicatorsProps {
  variant?: 'logos' | 'categories' | 'metrics';
  className?: string;
}

export function IndustryTrustIndicators({ 
  variant = 'categories', 
  className = '' 
}: IndustryTrustIndicatorsProps) {
  
  if (variant === 'metrics') {
    return (
      <section className={`py-12 bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              Trusted by subscription businesses across industries
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600">$1.2M+</div>
              <div className="text-sm text-gray-600">Ad Spend Optimized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">127</div>
              <div className="text-sm text-gray-600">Scripts Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">34%</div>
              <div className="text-sm text-gray-600">Average CTR Improvement</div>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Results based on client campaigns over the last 12 months
          </p>
        </div>
      </section>
    );
  }

  if (variant === 'categories') {
    const industries = [
      { icon: Building2, name: 'SaaS Platforms', description: 'Cloud software & productivity tools' },
      { icon: Users, name: 'Subscription Services', description: 'Content, streaming & digital products' },
      { icon: TrendingUp, name: 'E-Commerce', description: 'Subscription boxes & recurring commerce' },
      { icon: Target, name: 'Education Tech', description: 'Online learning & skill development' },
    ];

    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted Across Subscription Industries
            </h2>
            <p className="text-gray-600">
              Serving businesses from $500K to $10M+ ARR with Fortune 100 methodology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default 'logos' variant - generic industry types without specific names
  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 mb-6">
          Trusted by Performance Marketing Teams At
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
          <div className="text-sm font-medium">SaaS Platforms</div>
          <div className="text-sm font-medium">Subscription Services</div>
          <div className="text-sm font-medium">E-Learning Companies</div>
          <div className="text-sm font-medium">Content Platforms</div>
          <div className="text-sm font-medium">Cloud Software</div>
        </div>
      </div>
    </section>
  );
}