'use client';

import { X, CheckCircle } from 'lucide-react';

interface SuccessConfirmationProps {
  onClose: () => void;
  handleOverlayClick: (e: React.MouseEvent) => void;
}

export function SuccessConfirmation({ onClose, handleOverlayClick }: SuccessConfirmationProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative animate-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Strategic Consultation Booked!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your interest in our Strategic Ad Intelligence System. 
            We'll review your information and reach out within 24 hours to schedule 
            your personalized strategic consultation.
          </p>
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-indigo-900 mb-3">What to Expect:</h3>
            <ul className="text-sm text-indigo-800 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                30-minute strategic assessment call
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                Custom ROI projection for your business
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                Personalized implementation roadmap
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                No-obligation strategic guidance
              </li>
            </ul>
          </div>
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}