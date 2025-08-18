import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate responsive image sources
  const imageName = src.replace(/\.[^/.]+$/, ''); // Remove extension
  const basePath = src.startsWith('/') ? src : `/${src}`;

  // Create WebP and AVIF sources for better compression
  const sources = [
    {
      srcSet: `${imageName}-sm.avif 640w, ${imageName}-md.avif 828w, ${imageName}-lg.avif 1200w, ${imageName}-xl.avif 1920w`,
      type: 'image/avif',
    },
    {
      srcSet: `${imageName}-sm.webp 640w, ${imageName}-md.webp 828w, ${imageName}-lg.webp 1200w, ${imageName}-xl.webp 1920w`,
      type: 'image/webp',
    },
  ];

  // Fallback to Next.js Image for automatic optimization
  if (hasError) {
    return (
      <Image
        src={basePath}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
      />
    );
  }

  return (
    <picture className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      {/* Modern formats for supported browsers */}
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          type={source.type}
          sizes={sizes}
        />
      ))}
      
      {/* Fallback image */}
      <Image
        src={basePath}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
      />
    </picture>
  );
}

// Utility function to generate blur placeholder
export function generateBlurDataURL(width: number = 4, height: number = 3): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Server-side fallback
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient blur placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Pre-defined blur placeholder for common use
export const DEFAULT_BLUR_DATA_URL = generateBlurDataURL();

// Component for hero images with optimized LCP
export function HeroImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className={className}
      priority={true} // Critical for LCP
      sizes="100vw"
      quality={90}
      placeholder="blur"
      blurDataURL={DEFAULT_BLUR_DATA_URL}
    />
  );
}

// Component for card images
export function CardImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      quality={85}
      placeholder="blur"
      blurDataURL={DEFAULT_BLUR_DATA_URL}
    />
  );
}