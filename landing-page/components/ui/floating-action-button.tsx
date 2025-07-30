'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';

interface FloatingActionButtonProps {
  onOpenApplication: (variant: 'pilot' | 'full') => void;
}

export function FloatingActionButton({ onOpenApplication }: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-64 transform transition-all duration-300">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-900 mb-3">
              Ready to get started?
            </div>
            
            <button
              onClick={() => {
                onOpenApplication('pilot');
                setIsExpanded(false);
              }}
              className="w-full bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors text-left"
            >
              <div className="font-semibold">🎯 Free 7-Day Pilot</div>
              <div className="text-xs text-green-600 mt-1">Test our approach risk-free</div>
            </button>
            
            <button
              onClick={() => {
                onOpenApplication('full');
                setIsExpanded(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-left"
            >
              <div className="font-semibold">🚀 Get Scripts - $990</div>
              <div className="text-xs text-blue-100 mt-1">48-hour delivery guaranteed</div>
            </button>
          </div>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-gray-600 text-white rotate-45'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}