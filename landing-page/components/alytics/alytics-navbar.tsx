'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const TOOLS_LINKS = [
  { label: 'Free Hook Generator', href: '/hook-generator' },
  { label: 'AI Script Generator', href: '/ai-ad-script-generator' },
  { label: 'Creative Brief Generator', href: '/creative-brief-generator' },
  { label: 'AI Ad Iterator', href: '/ai-ad-iteration-tool' },
];

export function AlyticsNavbar() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-tools-dropdown]')) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-[1200px] mx-auto px-12 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo + Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="19.5" height="19.5" rx="5" fill="#126DFB"/>
                <path d="M6.20229 5.82143L8.70262 3.3211C8.82111 3.2026 9.02372 3.28653 9.02372 3.4541V8.45476C9.02372 8.55864 8.9395 8.64286 8.83562 8.64286H3.83496C3.66739 8.64286 3.58346 8.44025 3.70196 8.32176L6.20229 5.82143Z" fill="white"/>
                <path d="M13.7264 5.82143L11.2261 3.3211C11.1076 3.2026 10.905 3.28653 10.905 3.4541V8.45476C10.905 8.55864 10.9892 8.64286 11.0931 8.64286H16.0937C16.2613 8.64286 16.3452 8.44025 16.2268 8.32176L13.7264 5.82143Z" fill="white"/>
                <path d="M13.7264 13.3453L11.2261 15.8456C11.1076 15.9641 10.905 15.8802 10.905 15.7126V10.7119C10.905 10.608 10.9892 10.5238 11.0931 10.5238H16.0937C16.2613 10.5238 16.3452 10.7264 16.2268 10.8449L13.7264 13.3453Z" fill="white"/>
                <path d="M6.20278 13.3453L8.70311 15.8456C8.8216 15.9641 9.0242 15.8802 9.0242 15.7126V10.7119C9.0242 10.608 8.93999 10.5238 8.83611 10.5238H3.83545C3.66788 10.5238 3.58395 10.7264 3.70245 10.8449L6.20278 13.3453Z" fill="white"/>
              </svg>
            </div>
            <span className="text-2xl font-semibold text-gray-900">APSICS Media</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            <motion.a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors text-base font-medium relative group"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              How It Works
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
            
            {/* Tools Dropdown */}
            <div className="relative" data-tools-dropdown>
              <motion.button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors text-base font-medium relative group flex items-center gap-1"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
                />
              </motion.button>

              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg z-50"
                >
                  <div className="p-2">
                    {TOOLS_LINKS.map((tool) => (
                      <Link
                        key={tool.label}
                        href={tool.href}
                        onClick={() => setIsToolsOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#126DFB]"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.a
              href="#service-tiers"
              className="text-gray-600 hover:text-gray-900 transition-colors text-base font-medium relative group"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Pricing
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
            
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="#service-tiers"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(18, 109, 251, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              Claim Free Credits
            </motion.a>
          </motion.div>

        </div>
      </div>
    </motion.nav>
  );
}
