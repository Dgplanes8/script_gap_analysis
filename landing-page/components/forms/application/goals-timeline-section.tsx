'use client';

import { Clock } from 'lucide-react';
import { FormSectionProps } from './form-types';

export function GoalsTimelineSection({ formData, handleInputChange }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-orange-600" />
        Goals & Timeline
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your biggest challenge with current ad creative? *
          </label>
          <textarea
            name="biggestChallenge"
            value={formData.biggestChallenge}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Low CTR, high cost per acquisition, ads feel generic..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your main goals for the next 90 days? *
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Increase CTR by 25%, reduce CAC, scale to $50k/month..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When do you need to start testing new creative?
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select timeline...</option>
            <option value="ASAP">ASAP - This week</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1-2 months">1-2 months</option>
            <option value="Just exploring">Just exploring options</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything else you'd like us to know?
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any specific requirements, questions, or additional context..."
          />
        </div>
      </div>
    </div>
  );
}