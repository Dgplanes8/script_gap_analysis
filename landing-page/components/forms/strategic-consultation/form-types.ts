export interface StrategicConsultationFormData {
  fullName: string;
  email: string;
  company: string;
  monthlyAdSpend: string;
  packageInterest: string;
}

export interface StrategicConsultationFormProps {
  isOpen?: boolean;
  onClose: () => void;
}

export interface FormSectionProps {
  formData: StrategicConsultationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}