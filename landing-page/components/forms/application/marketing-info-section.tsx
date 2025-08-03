'use client';

import { Target } from 'lucide-react';
import { FormSectionProps, MARKETING_CHANNELS } from './form-types';

interface MarketingInfoSectionProps extends FormSectionProps {
  handleChannelChange: (channel: string) => void;
}

export function MarketingInfoSection({ formData, handleInputChange, handleChannelChange }: MarketingInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2 text-purple-600" />
        Current Marketing
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Which paid channels are you currently using? (Select all that apply) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MARKETING_CHANNELS.map((channel) => (
              <label key={channel} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.currentChannels.includes(channel)}
                  onChange={() => handleChannelChange(channel)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{channel}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your primary acquisition channel? *
          </label>
          <select
            name="primaryChannel"
            value={formData.primaryChannel}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select primary channel...</option>
            {MARKETING_CHANNELS.map((channel) => (
              <option key={channel} value={channel}>{channel}</option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Ad Spend
            </label>
            <select
              name="monthlyAdSpend"
              value={formData.monthlyAdSpend}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select range...</option>
              <option value="$0-$5k">$0 - $5,000</option>
              <option value="$5k-$25k">$5,000 - $25,000</option>
              <option value="$25k-$50k">$25,000 - $50,000</option>
              <option value="$50k-$100k">$50,000 - $100,000</option>
              <option value="$100k+">$100,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Average CTR (if known)
            </label>
            <input
              type="text"
              name="currentCTR"
              value={formData.currentCTR}
              onChange={handleInputChange}
              placeholder="e.g., 1.2%"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}