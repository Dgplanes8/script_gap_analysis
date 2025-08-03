import { ApplicationFormData } from './form-types';

export function getInitialFormData(): ApplicationFormData {
  return {
    email: '',
    firstName: '',
    lastName: '',
    businessName: '',
    productName: '',
    productDescription: '',
    monthlyRevenue: '',
    currentChannels: [],
    primaryChannel: '',
    monthlyAdSpend: '',
    currentCTR: '',
    currentConversionRate: '',
    biggestChallenge: '',
    goals: '',
    timeline: '',
    additionalInfo: ''
  };
}

export function resetFormData(setFormData: (data: ApplicationFormData) => void) {
  setFormData(getInitialFormData());
}