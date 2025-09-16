'use client';

import { ArrowRight } from 'lucide-react';

interface ConsultationBookingCTAProps {
  variant?: 'primary' | 'secondary' | 'header';
  text?: string;
  className?: string;
}

export function ConsultationBookingCTA({ 
  variant = 'primary', 
  text = 'Claim Free Week',
  className = ''
}: ConsultationBookingCTAProps) {
  const baseClasses = 'inline-flex items-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-green-500 px-8 py-3 rounded-lg text-lg',
    secondary: 'bg-white text-brand-600 border-2 border-brand-600 hover:bg-brand-50 focus:ring-green-500 px-6 py-2 rounded-lg',
    header: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-green-500 px-4 py-2 rounded-lg text-sm'
  };

  const handleClick = () => {
    // Track free week claim click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'free_week_claim_click', {
        event_category: 'lead_generation',
        event_label: variant
      });
    }
    
    // Navigate to service tiers
    const serviceSection = document.getElementById('service-tiers');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#service-tiers';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {text}
      <ArrowRight className="h-5 w-5 ml-2" />
    </button>
  );
}