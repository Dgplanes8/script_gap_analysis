export interface StrategicConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  currentARR: string;
  targetARR: string;
  currentCAC: string;
  monthlyAdSpend: string;
  primaryChallenge: string;
  timeline: string;
  previousExperience: string;
  specificGoals: string;
  consultationPreference: 'phone' | 'video';
}

export interface StrategicConsultationFormProps {
  isOpen?: boolean;
  onClose: () => void;
}

export interface FormSectionProps {
  formData: StrategicConsultationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}