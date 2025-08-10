'use client';

import { useState } from 'react';

export function usePopupForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return {
    isPopupOpen,
    openPopup,
    closePopup,
  };
}