'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Download, ExternalLink } from 'lucide-react';
import { pexelsService, PexelsPhoto, ImageUtils } from '@/lib/pexels-api';

interface EnhancedBlogImageProps {
  keywords: string[];
  topic: string;
  alt?: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatio?: 'wide' | 'standard';
  className?: string;
  showPhotographer?: boolean;
  sizes?: string;
}

/**
 * Enhanced Blog Image Component with Pexels Integration
 * Automatically fetches high-quality, SEO-optimized images for blog posts
 */
export function EnhancedBlogImage({
  keywords,
  topic,
  alt,
  fallbackSrc = '/images/og/og-default-blog.png',
  priority = false,
  aspectRatio = 'wide',
  className = '',
  showPhotographer = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: EnhancedBlogImageProps) {
  const [imageData, setImageData] = useState<{
    url: string;
    alt: string;
    photographer?: string;
    photographerUrl?: string;
    width: number;
    height: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await pexelsService.getBlogHeaderImage(keywords, aspectRatio);
        
        if (result) {
          setImageData(result);
        } else {
          // Use fallback
          setImageData({
            url: fallbackSrc,
            alt: alt || `Professional image for ${keywords.join(', ')} - APSICS Media`,
            width: 1200,
            height: 630
          });
        }
      } catch (err) {
        console.error('Error fetching blog image:', err);
        setError(err instanceof Error ? err.message : 'Failed to load image');
        
        // Use fallback on error
        setImageData({
          url: fallbackSrc,
          alt: alt || `Professional image for ${keywords.join(', ')} - APSICS Media`,
          width: 1200,
          height: 630
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchImage();
  }, [keywords, aspectRatio, fallbackSrc, alt]);

  if (isLoading) {
    return (
      <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Camera className="h-12 w-12" />
        </div>
      </div>
    );
  }

  if (!imageData) {
    return null;
  }

  const imageProps = ImageUtils.getOptimizedImageProps(
    imageData.url,
    imageData.alt,
    priority
  );

  return (
    <figure className={`relative group ${className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          {...imageProps}
          src={imageData.url}
          alt={imageData.alt}
          width={imageData.width}
          height={imageData.height}
          sizes={sizes}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          style={{
            aspectRatio: aspectRatio === 'wide' ? '16/9' : '4/3'
          }}
        />
        
        {/* Overlay with photographer info on hover */}
        {showPhotographer && imageData.photographer && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center space-x-2 text-sm">
                <Camera className="h-4 w-4" />
                <span>Photo by {imageData.photographer}</span>
                {imageData.photographerUrl && (
                  <a
                    href={imageData.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {showPhotographer && imageData.photographer && (
        <figcaption className="mt-3 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>
              Photo by{' '}
              {imageData.photographerUrl ? (
                <a
                  href={imageData.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {imageData.photographer}
                </a>
              ) : (
                <span className="font-medium">{imageData.photographer}</span>
              )}
              {' '}on Pexels
            </span>
          </div>
        </figcaption>
      )}

      {/* Error state (hidden, for debugging) */}
      {error && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-red-600">
          Debug: {error}
        </div>
      )}
    </figure>
  );
}

/**
 * Blog Hero Image - Optimized for blog post headers
 */
interface BlogHeroImageProps extends Omit<EnhancedBlogImageProps, 'aspectRatio'> {
  title: string;
  overlay?: boolean;
}

export function BlogHeroImage({
  title,
  keywords,
  topic,
  overlay = false,
  className = '',
  ...props
}: BlogHeroImageProps) {
  return (
    <div className={`relative ${className}`}>
      <EnhancedBlogImage
        keywords={keywords}
        topic={topic}
        aspectRatio="wide"
        priority={true}
        className="w-full"
        {...props}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg">
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Inline Blog Image - For use within blog content
 */
interface InlineBlogImageProps extends EnhancedBlogImageProps {
  caption?: string;
  position?: 'left' | 'right' | 'center' | 'full';
}

export function InlineBlogImage({
  caption,
  position = 'center',
  className = '',
  ...props
}: InlineBlogImageProps) {
  const positionClasses = {
    left: 'float-left mr-6 mb-4 max-w-md',
    right: 'float-right ml-6 mb-4 max-w-md',
    center: 'mx-auto my-8',
    full: 'w-full my-8'
  };

  return (
    <figure className={`${positionClasses[position]} ${className}`}>
      <EnhancedBlogImage
        aspectRatio={position === 'full' ? 'wide' : 'standard'}
        showPhotographer={false}
        {...props}
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Image Gallery for multiple blog images
 */
interface BlogImageGalleryProps {
  images: Array<{
    keywords: string[];
    topic: string;
    alt?: string;
    caption?: string;
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function BlogImageGallery({
  images,
  columns = 3,
  className = ''
}: BlogImageGalleryProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 my-8 ${className}`}>
      {images.map((image, index) => (
        <InlineBlogImage
          key={index}
          keywords={image.keywords}
          topic={image.topic}
          alt={image.alt}
          caption={image.caption}
          position="center"
          aspectRatio="standard"
        />
      ))}
    </div>
  );
}