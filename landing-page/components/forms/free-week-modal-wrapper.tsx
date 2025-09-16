'use client';

import { useFreeWeek } from '@/components/contexts/free-week-context';
import { FreeWeekModal } from './free-week-modal';

export function FreeWeekModalWrapper() {
  const { isModalOpen, modalProps, closeModal } = useFreeWeek();

  return (
    <FreeWeekModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={modalProps.title}
      subtitle={modalProps.subtitle}
      source={modalProps.source}
      tier={modalProps.tier}
    />
  );
}