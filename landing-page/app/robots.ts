import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog/', '/blog/*'],
      disallow: ['/api/', '/admin/', '/.well-known/', '/private/'],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`
    ],
  };
}