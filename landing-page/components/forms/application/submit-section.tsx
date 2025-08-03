'use client';

interface SubmitSectionProps {
  submitMessage: string;
  isSubmitting: boolean;
  variant: 'pilot' | 'full';
  onClose: () => void;
}

export function SubmitSection({ submitMessage, isSubmitting, variant, onClose }: SubmitSectionProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      {submitMessage && (
        <div className={`mb-4 p-4 rounded-lg ${
          submitMessage.includes('successfully') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : `Submit ${variant === 'pilot' ? 'Pilot' : 'Full Service'} Application`}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        We typically respond to applications within 24 hours. Your information is kept confidential.
      </p>
    </div>
  );
}