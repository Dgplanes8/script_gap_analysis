'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, CreditCard, RefreshCw, LogOut, Menu, X } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import { fetchUserProfile } from '@/lib/utils/supabase-helpers';
import type { User } from '@supabase/supabase-js';
import { useCallback } from 'react';

interface AuthenticatedHeaderProps {
  className?: string;
}

export function AuthenticatedHeader({ className = '' }: AuthenticatedHeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [creditsError, setCreditsError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createBrowserClient();

  const loadCredits = useCallback(
    async (userId: string) => {
      setCreditsLoading(true);
      setCreditsError(null);
      try {
        const { data, error } = await fetchUserProfile(supabase, userId);

        if (error) {
          console.error('Error loading profile:', error);
          setCredits(null);
          setCreditsError(error);
          return;
        }

        setCredits(typeof data?.credits_remaining === 'number' ? data.credits_remaining : null);
      } catch (error) {
        console.error('Error loading credits:', error);
        setCredits(null);
        setCreditsError('Unable to load credits. Try refreshing.');
      } finally {
        setCreditsLoading(false);
      }
    },
    [supabase],
  );

  // Load user and credits on mount
  useEffect(() => {
    async function loadUserData() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const sessionCredits = user.user_metadata?.credits_remaining;
          if (typeof sessionCredits === 'number') {
            setCredits(sessionCredits);
          }

          // Load credits from user metadata or credits table
          await loadCredits(user.id);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setCredits(null);
        setCreditsLoading(false);
        setCreditsError(null);
      } else if (session?.user) {
        setUser(session.user);
        const sessionCredits = session.user.user_metadata?.credits_remaining;
        if (typeof sessionCredits === 'number') {
          setCredits(sessionCredits);
        }
        loadCredits(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadCredits]);

  async function refreshCredits() {
    if (!user) return;
    await loadCredits(user.id);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  async function handleContactUs() {
    const subject = encodeURIComponent('APSICS Media Inquiry');
    const body = encodeURIComponent(`Hi Brian,\n\nI'm reaching out regarding APSICS Media services.\n\nBest regards,\n${user?.email || 'A user'}`);
    window.location.href = `mailto:brian@apsicsmedia.com?subject=${subject}&body=${body}`;
  }

  // Don't render if user is not authenticated
  if (!user && !loading) return null;

  const navLinks = [
    { href: '/ai-ad-script-generator', label: 'Script Generator' },
    { href: '/creative-brief-generator', label: 'Brief Generator' },
    { href: '/ai-ad-iteration-tool', label: 'Iteration Tool' },
    // { href: '/custom-ad-iteration-tool', label: 'Custom Ad Iteration' } // Hidden for now
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white font-bold text-xl px-3 py-2 rounded-lg shadow-lg">
                AM
              </div>
              <span className="font-bold text-lg text-gray-900 hidden sm:block">
                APSICS Media
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#126DFB] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            {/* Credits Counter */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span
                  className="text-sm font-medium text-gray-700"
                  title={creditsError ?? undefined}
                >
                  {creditsLoading ? '…' : typeof credits === 'number' ? `${credits} credits` : '—'}
                </span>
                <button
                  onClick={refreshCredits}
                  disabled={creditsLoading}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${creditsLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}

            {/* Contact Us Button */}
            <button
              onClick={handleContactUs}
              className="flex items-center space-x-2 bg-[#126DFB] hover:bg-[#0F5AD6] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Us</span>
            </button>

            {/* User Menu / Sign Out */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">

            {/* Mobile Credits Counter */}
            {user && (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {loading ? 'Loading...' : `${credits || 0} credits remaining`}
                  </span>
                </div>
                <button
                  onClick={refreshCredits}
                  disabled={loading}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-[#126DFB] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile User Info */}
            {user && (
              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">
                  Signed in as: {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
