'use client';

import { ArrowRight, Clock, Shield, Target } from 'lucide-react';

interface EnhancedCTAButtonProps {
  variant: 'pilot' | 'full';
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
}

export function EnhancedCTAButton({ 
  variant, 
  onClick, 
  className = '',
  size = 'md',
  showIcons = true
}: EnhancedCTAButtonProps) {
  const getConfig = () => {
    if (variant === 'pilot') {
      return {
        text: 'Start Free 7-Day Pilot',
        subtext: 'Test our approach risk-free',
        bgClass: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
        icon: Target,
        badge: '🎯 FREE'
      };
    } else {
      return {
        text: 'Get Scripts Now - $990',
        subtext: '48-hour delivery guaranteed',
        bgClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        icon: Clock,
        badge: '🚀 FAST'
      };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <button
      onClick={onClick}
      className={`
        ${config.bgClass}
        text-white font-semibold rounded-lg 
        transition-all duration-200 
        transform hover:scale-105 hover:shadow-xl
        flex items-center justify-center space-x-2
        ${getSizeClasses()}
        ${className}
      `}
    >
      {showIcons && size !== 'sm' && (
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {config.badge}
          </span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <span className="flex items-center">
          {config.text}
          <ArrowRight className="ml-2 h-4 w-4" />
        </span>
        {size === 'lg' && (
          <span className="text-xs opacity-90 mt-1">
            {config.subtext}
          </span>
        )}
      </div>
    </button>
  );
}