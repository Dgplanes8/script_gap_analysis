'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';

interface SocialSharingProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

export function SocialSharing({ title, url, description = '', className = '' }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=apsicsmedia`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, 'share', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center text-gray-600">
        <Share2 className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Share:</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => openShareWindow(shareUrls.twitter)}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => openShareWindow(shareUrls.linkedin)}
          className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => openShareWindow(shareUrls.facebook)}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </button>
        
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-full transition-colors ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}