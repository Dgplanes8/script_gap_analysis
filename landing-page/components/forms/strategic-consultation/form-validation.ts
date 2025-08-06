import { StrategicConsultationFormData } from './form-types';

export const validateRequiredFields = (formData: StrategicConsultationFormData): boolean => {
  const requiredFields: (keyof StrategicConsultationFormData)[] = [
    'fullName',
    'email',
    'company',
    'monthlyAdSpend',
    'packageInterest'
  ];
  
  return requiredFields.every(field => formData[field].trim() !== '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitialFormData = (): StrategicConsultationFormData => ({
  fullName: '',
  email: '',
  company: '',
  monthlyAdSpend: '',
  packageInterest: ''
});