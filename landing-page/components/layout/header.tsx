'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenApplication?: (variant: 'pilot' | 'full') => void;
}

export function Header({ onOpenApplication }: HeaderProps) {
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
              MMM
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Monday Morning Marketer
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
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button
                    onClick={() => scrollToSection('service-tiers')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Strategic Partnerships
                  </button>
                  <button
                    onClick={() => scrollToSection('strategic-process')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Our Process
                  </button>
                </div>
              </div>
            </div>
            <Link
              href="mailto:hello@mondaymorningmarketer.com"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => scrollToSection('strategic-resources')}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Free Resources
            </button>
            <button
              onClick={() => scrollToSection('consultation')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              <button
                onClick={() => scrollToSection('service-tiers')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Strategic Partnerships
              </button>
              <button
                onClick={() => scrollToSection('strategic-process')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Our Process
              </button>
              <Link
                href="mailto:hello@mondaymorningmarketer.com"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    scrollToSection('strategic-resources');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Free Resources
                </button>
                <button
                  onClick={() => {
                    scrollToSection('consultation');
                    setIsOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  Book Consultation
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}