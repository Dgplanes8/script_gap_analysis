'use client';

import { useEffect } from 'react';

interface ConvertKitFormProps {
  formId: string;
  className?: string;
  backgroundColor?: string;
}

export function ConvertKitForm({ 
  formId, 
  className = "", 
  backgroundColor = "transparent" 
}: ConvertKitFormProps) {
  useEffect(() => {
    // Load ConvertKit script if not already loaded
    if (!document.querySelector(`script[data-uid="${formId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-uid', formId);
      script.src = `https://f.convertkit.com/ckjs/ck.5.js`;
      document.head.appendChild(script);
    }
  }, [formId]);

  return (
    <div 
      className={`convertkit-form ${className}`}
      style={{ backgroundColor }}
    >
      <div className="ck-form-container" data-uid={formId}></div>
    </div>
  );
}