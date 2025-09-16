'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FloatingLogoProps {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  platform: 'tiktok' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'snapchat';
  size: 'sm' | 'md' | 'lg';
  delay: number;
}

// Social Platform Icon Components
function TikTokIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21,7V9a1,1,0,0,1-1,1,8,8,0,0,1-4-1.08V15.5A6.5,6.5,0,1,1,6.53,9.72a1,1,0,0,1,1.47.9v2.52a.92.92,0,0,1-.28.62,2.49,2.49,0,0,0,2,4.23A2.61,2.61,0,0,0,12,15.35V3a1,1,0,0,1,1-1h2.11a1,1,0,0,1,1,.83A4,4,0,0,0,20,6,1,1,0,0,1,21,7Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
      <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
      <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
      <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.24759 4.07011C8.42981 2.66637 10.1045 2 12 2C13.9392 2 15.604 2.78414 16.7639 4.21322C17.7942 5.48259 18.3772 7.1971 18.4826 9.1902C18.5118 9.19446 18.5425 9.19891 18.5749 9.20362L18.5955 9.20661C18.7648 9.23117 18.9679 9.26103 19.179 9.3019C19.9604 9.45323 21.2931 9.83505 21.7522 11.2659C21.9827 11.9846 21.8669 12.6509 21.4644 13.1786C21.1168 13.6343 20.6205 13.897 20.2664 14.0565C20.0896 14.1362 19.9144 14.2043 19.7668 14.2605C20.1122 15.1966 20.7141 16.1598 21.3801 17.0322C22.0073 17.8538 21.8414 18.8955 21.5172 19.574C21.1925 20.2537 20.4899 21.031 19.4684 21.0753C18.8903 21.1004 18.2833 21.1596 17.6791 21.2695C17.4062 21.3192 17.0841 21.4286 16.6839 21.5939C16.4453 21.6925 16.2264 21.79 15.9902 21.8953C15.8025 21.9789 15.6038 22.0674 15.3754 22.1653C14.4345 22.5685 13.2798 23 12 23C10.7201 23 9.56542 22.5685 8.62452 22.1653C8.39619 22.0674 8.19749 21.9789 8.00977 21.8953C7.7735 21.79 7.55463 21.6925 7.31601 21.5939C6.91585 21.4286 6.5938 21.3192 6.32087 21.2695C5.71667 21.1596 5.10964 21.1004 4.53154 21.0753C3.51004 21.031 2.8074 20.2537 2.48273 19.574C2.15858 18.8955 1.99263 17.8538 2.61986 17.0322C3.29007 16.1543 3.89533 15.1844 4.23963 14.2428C4.10623 14.1891 3.94976 14.1248 3.79112 14.0506C3.4447 13.8885 2.97483 13.6299 2.62849 13.1959C2.24058 12.7098 2.07004 12.083 2.22151 11.365C2.54568 9.82833 3.99142 9.44433 4.75598 9.30082C4.97305 9.26008 5.18352 9.23035 5.36087 9.20574C5.37272 9.2041 5.38436 9.20248 5.39582 9.2009C5.43821 9.19502 5.47796 9.18951 5.51542 9.18424C5.61483 7.05895 6.19378 5.32139 7.24759 4.07011Z" />
    </svg>
  );
}

function FloatingLogo({ position, platform, size, delay }: FloatingLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const platformConfig = {
    tiktok: { color: 'text-brand-500', icon: TikTokIcon },
    facebook: { color: 'text-blue-600', icon: FacebookIcon },
    instagram: { color: 'text-brand-600', icon: InstagramIcon },
    linkedin: { color: 'text-blue-700', icon: LinkedInIcon },
    youtube: { color: 'text-brand-600', icon: YouTubeIcon },
    snapchat: { color: 'text-brand-400', icon: SnapchatIcon }
  };

  const config = platformConfig[platform];
  const IconComponent = config.icon;

  const floatingAnimation = {
    y: [-8, 8, -8],
    rotate: [0, 3, 0],
    transition: {
      duration: 6 + (delay * 0.3),
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay + 2 // Delay start for performance
    }
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${config.color} opacity-20 blur-[1px] flex items-center justify-center`}
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
    >
      <IconComponent className="w-full h-full" />
    </motion.div>
  );
}

export function FloatingLogos() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering on server
  if (!isMounted) {
    return <div className="absolute inset-0 pointer-events-none overflow-hidden" />;
  }

  const logos = [
    {
      position: { top: '20%', left: '10%' },
      platform: 'tiktok' as const,
      size: 'md' as const,
      delay: 0.2
    },
    {
      position: { top: '15%', right: '15%' },
      platform: 'facebook' as const,
      size: 'lg' as const,
      delay: 0.5
    },
    {
      position: { top: '50%', left: '5%' },
      platform: 'instagram' as const,
      size: 'sm' as const,
      delay: 0.8
    },
    {
      position: { top: '60%', right: '8%' },
      platform: 'linkedin' as const,
      size: 'md' as const,
      delay: 1.1
    },
    {
      position: { bottom: '30%', left: '12%' },
      platform: 'youtube' as const,
      size: 'sm' as const,
      delay: 1.4
    },
    {
      position: { bottom: '25%', right: '20%' },
      platform: 'snapchat' as const,
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
          platform={logo.platform}
          size={logo.size}
          delay={logo.delay}
        />
      ))}
    </div>
  );
}