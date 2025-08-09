'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useConsultation } from '@/components/contexts/consultation-context';

interface HeaderProps {
  onOpenApplication?: (variant: 'pilot' | 'full') => void;
}

export function Header({ onOpenApplication }: HeaderProps) {
  const { openModal: openConsultation } = useConsultation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavigation = (target: string) => {
    setIsOpen(false);
    
    if (target === 'about') {
      // Always navigate to dedicated About page
      window.location.href = '/about';
    } else if (target === 'hooks-offer') {
      // Always navigate to dedicated Free Hooks page
      window.location.href = '/free-hooks';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-lg">
              AM
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Apsics Media
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('about')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('hooks-offer')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Free Hooks
            </button>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/cac-reduction-guide"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    CAC Reduction Guide
                  </Link>
                  <Link
                    href="/revenue-growth-benchmarking"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Benchmarking Tool
                  </Link>
                  <Link
                    href="/saas-creative-strategy-roi-calculator"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    ROI Calculator
                  </Link>
                  <button
                    onClick={openConsultation}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Strategic Consultation
                  </button>
                </div>
              </div>
            </div>
            <Link
              href="mailto:brian@apsicsmedia.com"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => window.location.href = '/free-hooks'}
              className="btn btn-tertiary"
            >
              Get 10 Free Hooks
            </button>
            <button
              onClick={openConsultation}
              className="btn btn-primary"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" aria-label="Close menu" /> : <Menu className="h-6 w-6" aria-label="Open menu" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white/95 backdrop-blur-md">
            <nav className="space-y-4">
              <button
                onClick={() => handleNavigation('about')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('hooks-offer')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Free Hooks
              </button>
              <Link
                href="/cac-reduction-guide"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                CAC Reduction Guide
              </Link>
              <Link
                href="/revenue-growth-benchmarking"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Benchmarking Tool
              </Link>
              <Link
                href="/saas-creative-strategy-roi-calculator"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                ROI Calculator
              </Link>
              <button
                onClick={() => {
                  openConsultation();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Strategic Consultation
              </button>
              <Link
                href="mailto:brian@apsicsmedia.com"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    window.location.href = '/free-hooks';
                    setIsOpen(false);
                  }}
                  className="btn btn-tertiary w-full"
                >
                  Get 10 Free Hooks
                </button>
                <button
                  onClick={() => {
                    openConsultation();
                    setIsOpen(false);
                  }}
                  className="btn btn-primary w-full"
                >
                  Book Strategy Call
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}