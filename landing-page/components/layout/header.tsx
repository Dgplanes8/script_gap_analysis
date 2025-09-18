'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '/#how-it-works' },
  { label: 'Plans & Pricing', href: '/#service-tiers' },
];

function HeaderLink({ label, href, onNavigate }: { label: string; href: string; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="text-sm font-medium text-gray-700 transition-colors hover:text-[#126DFB]"
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsOpen(false);

  const headerStyles = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
    : 'bg-white/85 backdrop-blur-sm border-b border-transparent';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerStyles}`}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-[#126DFB] to-[#0F5AD6] px-3 py-2 text-lg font-semibold text-white shadow-lg sm:text-xl">
            AM
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-semibold text-gray-900">APSICS Media</span>
            <span className="text-xs font-medium text-gray-500">Creative intelligence that converts</span>
          </div>
          <span className="sm:hidden text-sm font-semibold text-gray-900">APSICS Media</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <HeaderLink key={link.label} label={link.label} href={link.href} onNavigate={closeMobileMenu} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/#service-tiers"
            className="inline-flex items-center gap-2 rounded-xl bg-[#126DFB] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0F5AD6]"
          >
            Start Free Week Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:text-[#126DFB] lg:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg lg:hidden">
          <nav className="space-y-3 px-4 pb-6 pt-4">
            {NAV_LINKS.map((link) => (
              <HeaderLink key={link.label} label={link.label} href={link.href} onNavigate={closeMobileMenu} />
            ))}
            <div className="pt-4">
              <Link
                href="/#service-tiers"
                onClick={closeMobileMenu}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#126DFB] px-5 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#0F5AD6]"
              >
                Start Free Week Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
