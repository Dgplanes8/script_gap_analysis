import { useCallback } from 'react';
import { trackClick } from '@/components/analytics';

interface UseClickTrackingProps {
  elementName: string;
  elementType: string;
  pageSection?: string;
  onTrack?: (event: MouseEvent) => void;
}

export function useClickTracking({
  elementName,
  elementType,
  pageSection,
  onTrack,
}: UseClickTrackingProps) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Track the click event
    trackClick(elementName, elementType, pageSection);
    
    // Call the optional onTrack callback
    if (onTrack) {
      onTrack(event.nativeEvent);
    }
  }, [elementName, elementType, pageSection, onTrack]);

  return { handleClick };
}

// Enhanced click tracking with additional data
export function useEnhancedClickTracking({
  elementName,
  elementType,
  pageSection,
  additionalData = {},
  onTrack,
}: UseClickTrackingProps & { additionalData?: Record<string, any> }) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Track the click event with additional data
    trackClick(elementName, elementType, pageSection);
    
    // Push additional data to GTM dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'click',
        element_name: elementName,
        element_type: elementType,
        page_section: pageSection || 'main',
        page_path: window.location.pathname,
        timestamp: new Date().toISOString(),
        ...additionalData,
      });
    }
    
    // Call the optional onTrack callback
    if (onTrack) {
      onTrack(event.nativeEvent);
    }
  }, [elementName, elementType, pageSection, additionalData, onTrack]);

  return { handleClick };
}

// Hook for tracking button clicks specifically
export function useButtonTracking({
  buttonName,
  buttonType = 'button',
  pageSection,
  buttonValue,
  onTrack,
}: {
  buttonName: string;
  buttonType?: string;
  pageSection?: string;
  buttonValue?: string | number;
  onTrack?: (event: MouseEvent) => void;
}) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Track the button click
    trackClick(buttonName, buttonType, pageSection);
    
    // Push button-specific data to GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_name: buttonName,
        button_type: buttonType,
        button_value: buttonValue,
        page_section: pageSection || 'main',
        page_path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Call the optional onTrack callback
    if (onTrack) {
      onTrack(event.nativeEvent);
    }
  }, [buttonName, buttonType, pageSection, buttonValue, onTrack]);

  return { handleClick };
}

// Hook for tracking link clicks
export function useLinkTracking({
  linkName,
  linkUrl,
  linkType = 'link',
  pageSection,
  onTrack,
}: {
  linkName: string;
  linkUrl: string;
  linkType?: string;
  pageSection?: string;
  onTrack?: (event: MouseEvent) => void;
}) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the link click
    trackClick(linkName, linkType, pageSection);
    
    // Push link-specific data to GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'link_click',
        link_name: linkName,
        link_url: linkUrl,
        link_type: linkType,
        page_section: pageSection || 'main',
        page_path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Call the optional onTrack callback
    if (onTrack) {
      onTrack(event.nativeEvent);
    }
  }, [linkName, linkUrl, linkType, pageSection, onTrack]);

  return { handleClick };
}

// Hook for tracking CTA (Call-to-Action) clicks
export function useCTATracking({
  ctaName,
  ctaType = 'cta',
  pageSection,
  ctaValue,
  onTrack,
}: {
  ctaName: string;
  ctaType?: string;
  pageSection?: string;
  ctaValue?: string | number;
  onTrack?: (event: MouseEvent) => void;
}) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Track the CTA click
    trackClick(ctaName, ctaType, pageSection);
    
    // Push CTA-specific data to GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        cta_name: ctaName,
        cta_type: ctaType,
        cta_value: ctaValue,
        page_section: pageSection || 'main',
        page_path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Call the optional onTrack callback
    if (onTrack) {
      onTrack(event.nativeEvent);
    }
  }, [ctaName, ctaType, pageSection, ctaValue, onTrack]);

  return { handleClick };
} 