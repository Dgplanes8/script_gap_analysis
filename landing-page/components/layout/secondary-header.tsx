'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Plans & Pricing', href: '/#pricing' },
];

const navItemClass = 'text-sm font-medium text-gray-700 transition-colors hover:text-[#126DFB]';

export function SecondaryHeader() {
  const { openModal } = useFreeWeek();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerFreeWeek = (source: string) => {
    openModal({
      title: 'Start Your FREE Week Trial',
      subtitle: 'Get trending creative concepts and custom scripts delivered every Monday',
      source,
    });
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  const headerClass = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
    : 'bg-white/85 backdrop-blur-sm border-b border-transparent';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-[#126DFB] to-[#0F5AD6] px-3 py-2 text-lg font-semibold text-white shadow-lg sm:text-xl">
            AM
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-semibold text-gray-900">APSICS Media</span>
            <span className="text-xs font-medium text-gray-500">Weekly creative intelligence</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 sm:hidden">APSICS</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={navItemClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <button
            onClick={() => triggerFreeWeek('secondary-header-cta')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#126DFB] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0F5AD6]"
          >
            Start Free Week Trial
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:text-[#126DFB] lg:hidden"
          aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg lg:hidden">
          <nav className="space-y-3 px-4 pb-6 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#126DFB]"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <button
                onClick={() => {
                  triggerFreeWeek('secondary-header-mobile-cta');
                  closeMobileMenu();
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#126DFB] px-5 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#0F5AD6]"
              >
                Start Free Week Trial
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
