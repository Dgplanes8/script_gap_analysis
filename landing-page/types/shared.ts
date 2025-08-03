// Shared form interfaces
export interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

// Business metrics interface shared across forms
export interface BusinessMetrics {
  monthlyRevenue?: string;
  currentARR?: string;
  targetARR?: string;
  currentCAC?: string;
  monthlyAdSpend?: string;
}

// Contact preferences
export type ContactPreference = 'phone' | 'video' | 'email';

// Common form states
export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitMessage: string;
}

// Modal/Dialog interfaces
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Download/Lead magnet types
export type LeadMagnetType = 'case_study' | 'methodology' | 'guide' | 'template';

export interface DownloadRequest {
  type: LeadMagnetType;
  resourceId?: string | number;
  source: string;
}

// Analytics/Tracking
export interface TrackingEvent {
  eventName: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Common UI component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Marketing channels (shared across forms)
export const MARKETING_CHANNELS = [
  'Facebook Ads',
  'Google Ads',
  'TikTok Ads',
  'Instagram Ads',
  'YouTube Ads',
  'LinkedIn Ads',
  'Twitter Ads',
  'Snapchat Ads',
  'Pinterest Ads',
  'Email Marketing',
  'Influencer Marketing',
  'Organic Social',
  'SEO/Content',
  'Other'
] as const;

export type MarketingChannel = typeof MARKETING_CHANNELS[number];

// Revenue ranges (shared across forms)
export const REVENUE_RANGES = [
  '$0-$10k',
  '$10k-$50k',
  '$50k-$100k',
  '$100k-$500k',
  '$500k-$1M',
  '$1M+'
] as const;

export type RevenueRange = typeof REVENUE_RANGES[number];

// Timeline options (shared across forms)
export const TIMELINE_OPTIONS = [
  'ASAP - this week',
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  'Just exploring options'
] as const;

export type TimelineOption = typeof TIMELINE_OPTIONS[number];