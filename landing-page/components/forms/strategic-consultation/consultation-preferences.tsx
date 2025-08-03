'use client';

import { Calendar } from 'lucide-react';
import { FormSectionProps } from './form-types';

export function ConsultationPreferences({ formData, handleInputChange }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-orange-600" />
        Consultation Preferences
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Consultation Method *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="consultationPreference"
              value="phone"
              checked={formData.consultationPreference === 'phone'}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Phone Call</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="consultationPreference"
              value="video"
              checked={formData.consultationPreference === 'video'}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Video Call (Zoom)</span>
          </label>
        </div>
      </div>
    </div>
  );
}