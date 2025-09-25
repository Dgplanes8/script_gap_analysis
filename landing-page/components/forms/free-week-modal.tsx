'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SimpleAirtableForm } from './simple-airtable-form';

interface FreeWeekModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  source?: string;
  tier?: string;
}

export function FreeWeekModal({
  isOpen,
  onClose,
  title = "Claim Your Free Credits",
  subtitle = "Create your free APSICS Media account and unlock 10 AI credits every month.",
  source = "free-week-popup",
  tier
}: FreeWeekModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header */}
          <div className="text-center px-8 pt-8 pb-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8">
            <SimpleAirtableForm
              buttonText="Claim My Free Credits"
              buttonClassName="w-full bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] hover:from-[#0F5AD6] hover:to-[#126DFB] text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
              source={source}
              tier={tier}
              onSuccess={() => {
                // Modal will close automatically when form redirects to success page
                onClose();
              }}
              onError={() => {
                // Keep modal open on error so user can retry
              }}
            />
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <div className="text-xs text-gray-500">
              10 credits reload every month • No card required • Upgrade anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
