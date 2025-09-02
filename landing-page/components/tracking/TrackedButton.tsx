'use client';

import React from 'react';
import { useButtonTracking } from '@/hooks/useClickTracking';

interface TrackedButtonProps {
  children: React.ReactNode;
  buttonName: string;
  buttonType?: string;
  pageSection?: string;
  buttonValue?: string | number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any; // Allow additional props
}

export function TrackedButton({
  children,
  buttonName,
  buttonType = 'button',
  pageSection,
  buttonValue,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: TrackedButtonProps) {
  const { handleClick } = useButtonTracking({
    buttonName,
    buttonType,
    pageSection,
    buttonValue,
    onTrack: onClick ? (event) => onClick(event as any) : undefined,
  });

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Enhanced tracked button with additional GTM data
interface EnhancedTrackedButtonProps extends TrackedButtonProps {
  additionalData?: Record<string, any>;
}

export function EnhancedTrackedButton({
  children,
  buttonName,
  buttonType = 'button',
  pageSection,
  buttonValue,
  additionalData = {},
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: EnhancedTrackedButtonProps) {
  const { handleClick } = useButtonTracking({
    buttonName,
    buttonType,
    pageSection,
    buttonValue,
    onTrack: (event) => {
      // Push additional data to GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'enhanced_button_click',
          button_name: buttonName,
          button_type: buttonType,
          button_value: buttonValue,
          page_section: pageSection || 'main',
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
          ...additionalData,
        });
      }
      
      if (onClick) {
        onClick(event as any);
      }
    },
  });

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
} 