'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { ApplicationFormProps } from './form-types';
import { getInitialFormData, resetFormData } from './form-validation';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { ContactInfoSection } from './contact-info-section';
import { BusinessInfoSection } from './business-info-section';
import { MarketingInfoSection } from './marketing-info-section';
import { GoalsTimelineSection } from './goals-timeline-section';
import { SubmitSection } from './submit-section';

export function ApplicationForm({ isOpen, onClose, variant = 'full' }: ApplicationFormProps) {
  const [formData, setFormData] = useState(getInitialFormData());
  
  const { isSubmitting, message: submitMessage, submit } = useFormSubmission({
    onSuccess: () => {
      setTimeout(() => {
        onClose();
        resetFormData(setFormData);
      }, 3000);
    },
    additionalData: {
      applicationSource: variant === 'pilot' ? 'Free Pilot Application' : 'Full Service Application'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChannelChange = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      currentChannels: prev.currentChannels.includes(channel)
        ? prev.currentChannels.filter(c => c !== channel)
        : [...prev.currentChannels, channel]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {variant === 'pilot' ? 'Free 7-Day Pilot Application' : '$990 Script System Application'}
            </h2>
            <p className="text-gray-600 mt-1">
              Tell us about your subscription business so we can create the perfect scripts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <ContactInfoSection formData={formData} handleInputChange={handleInputChange} />
          <BusinessInfoSection formData={formData} handleInputChange={handleInputChange} />
          <MarketingInfoSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleChannelChange={handleChannelChange}
          />
          <GoalsTimelineSection formData={formData} handleInputChange={handleInputChange} />
          <SubmitSection 
            submitMessage={submitMessage}
            isSubmitting={isSubmitting}
            variant={variant}
            onClose={onClose}
          />
        </form>
      </div>
    </div>
  );
}