'use client';

import { motion } from 'framer-motion';

interface FloatingLogoProps {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  size: 'sm' | 'md' | 'lg';
  delay: number;
}

function FloatingLogo({ position, color, shape, size, delay }: FloatingLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'rounded-lg transform rotate-45'
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: shape === 'triangle' ? [45, 50, 45] : [0, 5, 0],
    transition: {
      duration: 4 + (delay * 0.5),
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay
    }
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${color} ${shapeClasses[shape]} opacity-20 blur-[1px]`}
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.2, 0.15], 
        scale: [0, 1, 1.05, 1],
        ...floatingAnimation
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: "backOut"
      }}
    />
  );
}

export function FloatingLogos() {
  const logos = [
    {
      position: { top: '20%', left: '10%' },
      color: 'bg-blue-400',
      shape: 'circle' as const,
      size: 'md' as const,
      delay: 0.2
    },
    {
      position: { top: '15%', right: '15%' },
      color: 'bg-orange-400',
      shape: 'square' as const,
      size: 'lg' as const,
      delay: 0.5
    },
    {
      position: { top: '50%', left: '5%' },
      color: 'bg-purple-400',
      shape: 'triangle' as const,
      size: 'sm' as const,
      delay: 0.8
    },
    {
      position: { top: '60%', right: '8%' },
      color: 'bg-green-400',
      shape: 'circle' as const,
      size: 'md' as const,
      delay: 1.1
    },
    {
      position: { bottom: '30%', left: '12%' },
      color: 'bg-pink-400',
      shape: 'square' as const,
      size: 'sm' as const,
      delay: 1.4
    },
    {
      position: { bottom: '25%', right: '20%' },
      color: 'bg-indigo-400',
      shape: 'circle' as const,
      size: 'lg' as const,
      delay: 1.7
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {logos.map((logo, index) => (
        <FloatingLogo
          key={index}
          position={logo.position}
          color={logo.color}
          shape={logo.shape}
          size={logo.size}
          delay={logo.delay}
        />
      ))}
    </div>
  );
}