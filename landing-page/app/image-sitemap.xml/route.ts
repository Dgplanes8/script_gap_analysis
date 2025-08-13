import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';
  
  // Define image assets for better SEO indexing
  const imageUrls = [
    {
      url: `${baseUrl}/images/og-image.jpg`,
      caption: 'Strategic Ad Intelligence - Weekly Creative Intelligence for Subscription Businesses',
      geoLocation: 'United States',
      title: 'Strategic Ad Intelligence Logo',
      license: `${baseUrl}/terms`
    },
    {
      url: `${baseUrl}/images/logo.png`,
      caption: 'Strategic Ad Intelligence Company Logo',
      title: 'Company Logo',
      license: `${baseUrl}/terms`
    },
    // Blog article featured images (placeholder structure for future images)
    {
      url: `${baseUrl}/images/blog/mobile-app-cac-crisis-featured.jpg`,
      caption: 'Mobile App Customer Acquisition Cost Crisis Guide Infographic',
      title: 'Mobile App CAC Crisis 2025',
      license: `${baseUrl}/terms`
    },
    {
      url: `${baseUrl}/images/blog/aso-roi-calculator-featured.jpg`,
      caption: 'ASO ROI Calculator Framework Visualization',
      title: 'ASO ROI Measurement Guide',
      license: `${baseUrl}/terms`
    },
    {
      url: `${baseUrl}/images/blog/freemium-conversion-featured.jpg`,
      caption: 'Freemium to Premium Conversion Psychology Diagram',
      title: 'Freemium Conversion Framework',
      license: `${baseUrl}/terms`
    },
    {
      url: `${baseUrl}/images/blog/d2c-marketing-featured.jpg`,
      caption: 'D2C Subscription Marketing Strategy Visualization',
      title: 'D2C Marketing Playbook 2025',
      license: `${baseUrl}/terms`
    },
    {
      url: `${baseUrl}/images/blog/ai-creative-development-featured.jpg`,
      caption: 'AI-Powered Creative Development Process Flow',
      title: 'AI Creative Development Guide',
      license: `${baseUrl}/terms`
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imageUrls.map(image => `
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
      ${image.geoLocation ? `<image:geo_location>${image.geoLocation}</image:geo_location>` : ''}
      <image:license>${image.license}</image:license>
    </image:image>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}