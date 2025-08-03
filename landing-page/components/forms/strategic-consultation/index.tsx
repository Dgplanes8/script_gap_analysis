'use client';

import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { StrategicConsultationFormProps } from './form-types';
import { getInitialFormData } from './form-validation';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { ContactInfoSection } from './contact-info-section';
import { BusinessMetricsSection } from './business-metrics-section';
import { StrategicAssessmentSection } from './strategic-assessment-section';
import { ConsultationPreferences } from './consultation-preferences';
import { SuccessConfirmation } from './success-confirmation';

export function StrategicConsultationForm({ isOpen = true, onClose }: StrategicConsultationFormProps) {
  const [formData, setFormData] = useState(getInitialFormData());
  
  const { isSubmitting, isSubmitted, submit } = useFormSubmission({
    trackingEventName: 'strategic_consultation_booking',
    trackingFormType: 'premium_positioning',
    additionalData: {
      type: 'strategic_consultation',
      source: 'strategic_landing_page'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isSubmitted) {
    return <SuccessConfirmation onClose={onClose} handleOverlayClick={handleOverlayClick} />;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Book Your Strategic Consultation
            </h2>
            <p className="text-gray-600">
              Free 30-minute strategic assessment with custom ROI projection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <ContactInfoSection formData={formData} handleInputChange={handleInputChange} />
            <BusinessMetricsSection formData={formData} handleInputChange={handleInputChange} />
            <StrategicAssessmentSection formData={formData} handleInputChange={handleInputChange} />
            <ConsultationPreferences formData={formData} handleInputChange={handleInputChange} />

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2">What Happens Next:</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>1. We'll review your information and reach out within 24 hours</li>
                  <li>2. Schedule a 30-minute strategic assessment call</li>
                  <li>3. Receive a custom ROI projection and implementation roadmap</li>
                  <li>4. Get strategic guidance with no obligation to proceed</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Booking Consultation...' : 'Book Strategic Consultation'}
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
                Free consultation • No obligation • We respect your privacy and won't share your information
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}