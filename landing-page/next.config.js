/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.apsicsmedia.com',
          },
        ],
        destination: 'https://apsicsmedia.com/:path*',
        permanent: true, // This creates a 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;