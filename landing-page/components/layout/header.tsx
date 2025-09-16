'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useConsultation } from '@/components/contexts/consultation-context';
import { useFreeWeek } from '@/components/contexts/free-week-context';

interface HeaderProps {
  onOpenApplication?: (variant: 'pilot' | 'full') => void;
}

export function Header({ onOpenApplication }: HeaderProps) {
  const { openModal } = useConsultation();
  const { openModal: openFreeWeekModal } = useFreeWeek();

  const openConsultation = () => {
    openModal();
  };
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
            <div className="bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white font-bold text-xl sm:text-2xl px-3 py-2 rounded-lg shadow-lg">
              AM
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-900 hidden sm:block">
              Apsics Media
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('about')}
              className="text-gray-700 hover:text-[#126DFB] font-medium transition-colors"
            >
              About
            </button>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#126DFB] font-medium transition-colors"
            >
              Blog & Guides
            </Link>
            <button
              onClick={() => handleNavigation('hooks-offer')}
              className="text-gray-700 hover:text-[#126DFB] font-medium transition-colors"
            >
              Free Templates
            </button>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#126DFB] font-medium transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/tools"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#126DFB] transition-colors"
                  >
                    Strategy Calculators & Tools
                  </Link>
                  <Link
                    href="/cac-reduction-guide"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#126DFB] transition-colors"
                  >
                    CAC Reduction Guide
                  </Link>
                  <Link
                    href="/revenue-growth-benchmarking"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#126DFB] transition-colors"
                  >
                    Revenue Benchmarking
                  </Link>
                  <Link
                    href="/weekly-creative-intelligence-playbook"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#126DFB] transition-colors"
                  >
                    Creative Intelligence Playbook
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => openFreeWeekModal({
                title: "Start Your FREE Week Trial",
                subtitle: "Get trending creative concepts and custom scripts delivered every Monday",
                source: "header-cta"
              })}
              className="btn-primary"
            >
              Start Free Week Trial
            </button>
            <button
              onClick={() => window.location.href = '/free-hooks'}
              className="btn-secondary"
            >
              Get Free Templates
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-gray-700 hover:text-[#126DFB] transition-colors bg-white border border-gray-300 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span className="text-sm font-medium">{isOpen ? 'Close' : ''}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-6 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="space-y-6">
              <button
                onClick={() => handleNavigation('about')}
                className="block w-full text-left text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
              >
                About
              </button>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Blog & Guides
              </Link>
              <button
                onClick={() => handleNavigation('hooks-offer')}
                className="block w-full text-left text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
              >
                Free Templates
              </button>
              <Link
                href="/cac-reduction-guide"
                className="block text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                CAC Reduction Guide
              </Link>
              <Link
                href="/revenue-growth-benchmarking"
                className="block text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Benchmarking Tool
              </Link>
              <Link
                href="/saas-creative-strategy-roi-calculator"
                className="block text-gray-700 hover:text-[#126DFB] font-medium transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                ROI Calculator
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-6 space-y-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    openFreeWeekModal({
                      title: "Start Your FREE Week Trial",
                      subtitle: "Get trending creative concepts and custom scripts delivered every Monday",
                      source: "header-mobile-cta"
                    });
                    setIsOpen(false);
                  }}
                  className="btn-primary w-full text-lg"
                >
                  Start Free Week Trial
                </button>
                <button
                  onClick={() => {
                    window.location.href = '/free-hooks';
                    setIsOpen(false);
                  }}
                  className="btn-secondary w-full text-lg"
                >
                  Get Free Templates
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}