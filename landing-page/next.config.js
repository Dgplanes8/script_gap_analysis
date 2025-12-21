/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  // Force clean build to clear stale RSC module references
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;