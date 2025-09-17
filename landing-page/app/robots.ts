import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog/', '/blog/*', '/tools/', '/calculators/', '/frameworks/', '/guides/'],
      disallow: ['/api/', '/admin/', '/.well-known/', '/private/', '/temp/', '/draft/'],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`
    ],
  };
}