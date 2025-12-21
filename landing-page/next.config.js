/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  // Updated 2024-12-21: Clean build to resolve RSC module cache issues
};

module.exports = nextConfig;