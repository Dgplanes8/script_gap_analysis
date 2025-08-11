'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsultationContextType {
  isModalOpen: boolean;
  openModal: (packageId?: string) => void;
  closeModal: () => void;
  selectedPackage: string | null;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const openModal = (packageId?: string) => {
    if (packageId) {
      setSelectedPackage(packageId);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null); // Reset selected package on close
  };

  return (
    <ConsultationContext.Provider value={{ isModalOpen, openModal, closeModal, selectedPackage }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (context === undefined) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
}