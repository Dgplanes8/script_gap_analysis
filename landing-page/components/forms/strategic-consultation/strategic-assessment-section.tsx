'use client';

import { Target } from 'lucide-react';
import { FormSectionProps } from './form-types';

export function StrategicAssessmentSection({ formData, handleInputChange }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2 text-purple-600" />
        Strategic Assessment <span className="text-sm font-normal text-gray-500">(Optional)</span>
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Growth Challenge
          </label>
          <select
            name="primaryChallenge"
            value={formData.primaryChallenge}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select primary challenge</option>
            <option value="High CAC / expensive acquisition">High CAC / expensive acquisition</option>
            <option value="Low conversion rates">Low conversion rates</option>
            <option value="Creative performance declining">Creative performance declining</option>
            <option value="Scaling marketing profitably">Scaling marketing profitably</option>
            <option value="Attribution and measurement">Attribution and measurement</option>
            <option value="Channel diversification">Channel diversification</option>
            <option value="Strategic positioning">Strategic positioning</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline for Implementation
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select timeline</option>
            <option value="ASAP - this month">ASAP - this month</option>
            <option value="Next 1-2 months">Next 1-2 months</option>
            <option value="Next 3-6 months">Next 3-6 months</option>
            <option value="Planning for next year">Planning for next year</option>
            <option value="Just exploring options">Just exploring options</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Experience with Strategic Marketing
          </label>
          <textarea
            name="previousExperience"
            value={formData.previousExperience}
            onChange={handleInputChange}
            rows={3}
            placeholder="Tell us about your experience with agencies, consultants, or internal marketing teams..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specific Goals for This Partnership
          </label>
          <textarea
            name="specificGoals"
            value={formData.specificGoals}
            onChange={handleInputChange}
            rows={3}
            placeholder="What specific outcomes are you looking to achieve? e.g., reduce CAC by 30%, scale to $2M ARR, improve creative performance..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}