'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StickyCTAProps {
  text: string;
  href: string;
  variant?: 'pilot' | 'package' | 'newsletter';
}

export function StickyCTA({ text, href, variant = 'pilot' }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after user scrolls past the hero section (roughly 100vh)
      if (window.scrollY > window.innerHeight && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'package':
        return 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800';
      case 'newsletter':
        return 'bg-gray-900 text-white hover:bg-gray-800';
      default:
        return 'bg-green-600 text-white hover:bg-green-700';
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto max-w-md">
        <div className={`rounded-lg shadow-lg p-4 ${getVariantStyles()} relative`}>
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          
          <Link
            href={href}
            className="flex items-center justify-between text-sm font-semibold"
          >
            <span>{text}</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}