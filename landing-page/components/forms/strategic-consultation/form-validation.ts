import { StrategicConsultationFormData } from './form-types';

export const validateRequiredFields = (formData: StrategicConsultationFormData): boolean => {
  const requiredFields: (keyof StrategicConsultationFormData)[] = [
    'firstName',
    'lastName', 
    'email',
    'company',
    'title'
  ];
  
  return requiredFields.every(field => formData[field].trim() !== '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitialFormData = (): StrategicConsultationFormData => ({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  title: '',
  currentARR: '',
  targetARR: '',
  currentCAC: '',
  monthlyAdSpend: '',
  primaryChallenge: '',
  timeline: '',
  previousExperience: '',
  specificGoals: '',
  consultationPreference: 'phone'
});