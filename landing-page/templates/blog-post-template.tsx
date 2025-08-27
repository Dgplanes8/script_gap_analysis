import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Target, Share2, BookOpen } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';
import { SocialSharing } from '@/components/blog/social-sharing';
import { RelatedArticles } from '@/components/blog/related-articles';
import { BreadcrumbNavigation } from '@/components/blog/breadcrumb-navigation';
import { ArticleStructuredData } from '@/components/blog/article-structured-data';

interface BlogPostTemplateProps {
  // SEO & Meta Data
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  category: string;
  readingTime: number;
  
  // Article Content
  headline: string;
  subtitle: string;
  introduction: React.ReactNode;
  mainContent: React.ReactNode;
  faqSection?: Array<{
    question: string;
    answer: string;
  }>;
  
  // CTA Configuration
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  
  // Lead Magnets
  leadMagnetTitle?: string;
  leadMagnetDescription?: string;
  
  // Related Content
  relatedCategory?: string;
}

/**
 * SEO-Optimized Blog Post Template for Apsics Media
 * 
 * Features:
 * - Complete SEO optimization with structured data
 * - Startup-focused ICP targeting and messaging
 * - Multiple conversion points and lead magnets
 * - Mobile-responsive design
 * - Social sharing integration
 * - Related articles cross-linking
 */
export function BlogPostTemplate({
  title,
  description,
  keywords,
  slug,
  category,
  readingTime,
  headline,
  subtitle,
  introduction,
  mainContent,
  faqSection = [],
  primaryCtaText = "Start Your FREE Week",
  primaryCtaLink = "/#service-tiers",
  secondaryCtaText = "Download MY Templates",
  secondaryCtaLink = "/free-hooks",
  leadMagnetTitle = "Get Weekly Ad Templates for FREE",
  leadMagnetDescription = "Join 1,200+ startup founders getting winning templates every Monday",
  relatedCategory = category
}: BlogPostTemplateProps) {
  
  const breadcrumbItems = [
    { name: 'Blog', href: '/blog' },
    { name: title, href: slug }
  ];

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <article className="min-h-screen bg-white pt-16 lg:pt-20">
        {/* Structured Data for SEO */}
        <ArticleStructuredData
          title={title}
          description={description}
          slug={slug}
          category={category}
          keywords={keywords}
          readingTime={readingTime}
        />

        {/* Breadcrumb Navigation */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors w-fit"
              >
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Back to Blog
              </Link>
              
              <BreadcrumbNavigation items={breadcrumbItems} />
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                {category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {headline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Startup Founders
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Marketing Teams
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {readingTime} min read
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction Section */}
              <div className="prose prose-lg max-w-none mb-12">
                {introduction}
              </div>

              {/* Lead Magnet - Above the Fold */}
              <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 mb-12 text-center border-2 border-orange-200">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {leadMagnetTitle}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    {leadMagnetDescription}
                  </p>
                  <div className="max-w-md mx-auto">
                    <EmailCaptureForm
                      placeholder="Enter your work email"
                      buttonText={secondaryCtaText}
                      variant="hero"
                      source="blog_lead_magnet"
                    />
                  </div>
                </div>
              </section>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none mb-12">
                {mainContent}
              </div>

              {/* FAQ Section for Featured Snippets */}
              {faqSection.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    {faqSection.map((faq, index) => (
                      <div key={index} className="border-l-4 border-orange-500 pl-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Social Sharing */}
              <section className="border-t border-gray-200 pt-8 mb-12">
                <SocialSharing
                  title={title}
                  url={`https://apsicsmedia.com${slug}`}
                  description={description}
                  className="justify-center"
                />
              </section>

              {/* Main CTA Section - Startup Focused */}
              <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 text-center border-2 border-orange-200">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                    🚀 Ready to Launch Winning Campaigns?
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Get Weekly Ad Templates Designed for Startup Teams
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Start your first week FREE. Get proven ad templates every Monday that help startup founders launch successful campaigns without the trial-and-error.
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        href={primaryCtaLink}
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                      >
                        {primaryCtaText}
                      </Link>
                      <Link
                        href={secondaryCtaLink}
                        className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                      >
                        {secondaryCtaText}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      First week FREE • No commitment • Weekly templates delivered every Monday
                    </p>
                  </div>
                </div>
              </section>

              {/* Alternative CTA with Form */}
              <section className="mt-12">
                <div className="max-w-lg mx-auto">
                  <SimpleAirtableForm 
                    buttonText="Get My FREE Week of Templates"
                    source="blog_bottom_cta"
                  />
                </div>
              </section>

            </div>
          </div>
        </main>

        {/* Related Articles */}
        <RelatedArticles 
          currentSlug={slug}
          category={relatedCategory}
        />
      </article>

      {/* Footer */}
      <Footer />
    </>
  );
}

/**
 * Generate metadata for the blog post template
 * This ensures consistent SEO optimization across all blog posts
 */
export function generateBlogPostMetadata({
  title,
  description,
  keywords,
  slug
}: {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}): Metadata {
  return {
    title: `${title} | Apsics Media`,
    description: description,
    keywords: keywords.join(', '),
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://apsicsmedia.com${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
    alternates: {
      canonical: slug,
    }
  };
}