'use client';

import { useConsultation } from '@/components/contexts/consultation-context';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation';

export function ConsultationModal() {
  const { isModalOpen, closeModal } = useConsultation();

  return (
    <StrategicConsultationForm 
      isOpen={isModalOpen} 
      onClose={closeModal} 
    />
  );
}