'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Plans & Pricing', href: '/#service-tiers' },
];

const navItemClass = 'text-sm font-semibold text-gray-700 transition-colors hover:text-brand-600';

type NavLink = {
  label: string;
  href: string;
};

export type SecondaryHeaderProps = {
  links?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function SecondaryHeader({
  links = NAV_LINKS,
  ctaHref = '/#service-tiers',
  ctaLabel = 'Claim 10 Free Credits',
}: SecondaryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const headerClass = isScrolled
    ? 'bg-white shadow-lg border-b border-gray-100'
    : 'bg-white border-b border-transparent';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-300 md:block ${headerClass}`}>
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 px-3 py-2 text-base font-semibold text-white shadow-lg sm:text-lg">
            AM
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-lg font-semibold text-gray-900">APSICS Media</span>
            <span className="text-xs font-medium text-gray-500 tracking-wide">Creative intelligence</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 sm:hidden">APSICS</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className={navItemClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:text-brand-600 lg:hidden"
          aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <nav className="space-y-3 px-4 pb-6 pt-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-600"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href={ctaHref}
                onClick={closeMobileMenu}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-600"
              >
                {ctaLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export { SecondaryHeader as Header };
