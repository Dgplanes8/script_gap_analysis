import { MetadataRoute } from 'next';

export default function imageSitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';

  // Blog featured images
  const blogImages = [
    '/images/blog/ai-creative-development-featured.jpg',
    '/images/blog/aso-roi-calculator-featured.jpg',
    '/images/blog/d2c-marketing-featured.jpg',
    '/images/blog/freemium-conversion-featured.jpg',
    '/images/blog/mobile-app-cac-crisis-featured.jpg',
  ];

  // Open Graph images
  const ogImages = [
    '/images/og/og-ad-templates-startup.png',
    '/images/og/og-cac-optimization-calculator.png',
    '/images/og/og-competitive-creative-analysis.png',
    '/images/og/og-creative-fatigue-prevention.png',
    '/images/og/og-default-blog.png',
    '/images/og/og-ltv-cac-optimization.png',
    '/images/og/og-marketing-roi-calculator.png',
    '/images/og/og-retention-marketing-automation.png',
    '/images/og/og-startup-marketing-budget-calculator.png',
    '/images/og/og-weekly-creative-intelligence.png',
  ];

  // Main site images
  const siteImages = [
    '/images/og-image.png',
    '/images/logo.png',
    '/images/about-og.jpg',
    '/images/competitive-analysis-og.jpg',
    '/images/examples-og.jpg',
    '/images/faq-og.jpg',
    '/images/free-hooks-og.jpg',
    '/images/how-it-works-og.jpg',
    '/images/strategy-importance-og.jpg',
    '/images/tools-og.jpg',
    '/images/video-guide-og.jpg',
  ];

  // Creative development process images
  const processImages = [
    '/images/1_Customer-Research-Pain-and-Dream-Outcomes.webp',
    '/images/2_Concept-Ideation-Three-Big-Ideas.webp',
    '/images/3_Performance-Prediction-and-Messaging.webp',
    '/images/4_Scripts-and-Headlines-Bringing-Concepts-to-Life.webp',
  ];

  // AI-generated concept images
  const conceptImages = [
    '/images/Gemini_Generated_Image_5h69xr5h69xr5h69.webp',
    '/images/Gemini_Generated_Image_8iqfh58iqfh58iqf.webp',
    '/images/Gemini_Generated_Image_9amt099amt099amt.webp',
    '/images/Gemini_Generated_Image_9r6sef9r6sef9r6s.webp',
    '/images/Gemini_Generated_Image_av63zqav63zqav63.webp',
    '/images/Gemini_Generated_Image_lic7h2lic7h2lic7.webp',
  ];

  // Combine all images
  const allImages = [
    ...blogImages,
    ...ogImages,
    ...siteImages,
    ...processImages,
    ...conceptImages,
  ];

  return allImages.map((image) => ({
    url: `${baseUrl}${image}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}