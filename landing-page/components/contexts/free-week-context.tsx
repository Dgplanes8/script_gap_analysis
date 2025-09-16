'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FreeWeekContextType {
  isModalOpen: boolean;
  modalProps: {
    title?: string;
    subtitle?: string;
    source?: string;
    tier?: string;
  };
  openModal: (props?: {
    title?: string;
    subtitle?: string;
    source?: string;
    tier?: string;
  }) => void;
  closeModal: () => void;
}

const FreeWeekContext = createContext<FreeWeekContextType | undefined>(undefined);

export function FreeWeekProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{
    title?: string;
    subtitle?: string;
    source?: string;
    tier?: string;
  }>({});

  const openModal = (props?: {
    title?: string;
    subtitle?: string;
    source?: string;
    tier?: string;
  }) => {
    setModalProps({
      title: props?.title || "Start Your FREE Week Trial",
      subtitle: props?.subtitle || "Get trending creative concepts and custom scripts delivered every Monday",
      source: props?.source || "free-week-cta",
      tier: props?.tier
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProps({});
  };

  return (
    <FreeWeekContext.Provider value={{
      isModalOpen,
      modalProps,
      openModal,
      closeModal
    }}>
      {children}
    </FreeWeekContext.Provider>
  );
}

export function useFreeWeek() {
  const context = useContext(FreeWeekContext);
  if (context === undefined) {
    throw new Error('useFreeWeek must be used within a FreeWeekProvider');
  }
  return context;
}