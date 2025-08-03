export interface ApplicationFormData {
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  productName: string;
  productDescription: string;
  monthlyRevenue: string;
  currentChannels: string[];
  primaryChannel: string;
  monthlyAdSpend: string;
  currentCTR: string;
  currentConversionRate: string;
  biggestChallenge: string;
  goals: string;
  timeline: string;
  additionalInfo: string;
}

export interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'pilot' | 'full';
}

export interface FormSectionProps {
  formData: ApplicationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleChannelChange?: (channel: string) => void;
}

export { MARKETING_CHANNELS } from '@/types/shared';