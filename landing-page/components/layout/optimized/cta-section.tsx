'use client';

import Link from 'next/link';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { CTABanner } from '../shared';

interface OptimizedCTASectionProps {
  title: string;
  description?: string;
  primaryButton: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  showEmailCapture?: boolean;
  emailCapture?: {
    placeholder?: string;
    buttonText?: string;
  };
  background?: 'gradient' | 'solid' | 'pattern';
  size?: 'sm' | 'md' | 'lg';
}

export function OptimizedCTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  showEmailCapture = false,
  emailCapture,
  background = 'gradient',
  size = 'md'
}: OptimizedCTASectionProps) {
  const handlePrimaryClick = () => {
    if (primaryButton.onClick) {
      primaryButton.onClick();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryButton?.onClick) {
      secondaryButton.onClick();
    }
  };

  if (showEmailCapture) {
    return (
      <CTABanner
        title={title}
        description={description}
        background={background}
        size={size}
        primaryButton={{
          text: primaryButton.text,
          onClick: handlePrimaryClick
        }}
        secondaryButton={secondaryButton ? {
          text: secondaryButton.text,
          onClick: handleSecondaryClick
        } : undefined}
      >
        <div className="max-w-md mx-auto mt-8">
          <EmailCaptureForm
            placeholder={emailCapture?.placeholder || "Enter your email address"}
            buttonText={emailCapture?.buttonText || "Get Started"}
            variant="cta"
          />
        </div>
      </CTABanner>
    );
  }

  return (
    <CTABanner
      title={title}
      description={description}
      background={background}
      size={size}
      primaryButton={{
        text: primaryButton.text,
        onClick: handlePrimaryClick
      }}
      secondaryButton={secondaryButton ? {
        text: secondaryButton.text,
        onClick: handleSecondaryClick
      } : undefined}
    />
  );
}