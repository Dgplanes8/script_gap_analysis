import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock the email capture form
jest.mock('@/components/forms/email-capture-form', () => ({
  EmailCaptureForm: ({ 
    placeholder, 
    buttonText, 
    source 
  }: { 
    placeholder: string; 
    buttonText: string; 
    source: string;
  }) => (
    <form data-testid="email-capture-form" data-source={source}>
      <input placeholder={placeholder} type="email" data-testid="email-input" />
      <button type="submit" data-testid="submit-button">{buttonText}</button>
    </form>
  ),
}));

// Mock the consultation booking CTA
jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant?: string; text?: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text || 'Book Consultation'}
    </button>
  ),
}));

// Mock the content navigation
jest.mock('@/components/layout/content-navigation', () => ({
  ContentNavigation: ({ currentPath, variant }: { currentPath: string; variant?: string }) => (
    <nav data-testid="content-navigation" data-current-path={currentPath} data-variant={variant}>
      <a href="/cac-reduction-guide">CAC Reduction Guide</a>
      <a href="/revenue-growth-benchmarking">Revenue Growth Benchmarking</a>
      <a href="/marketing-attribution-framework">Marketing Attribution Framework</a>
      <a href="/1m-arr-marketing-playbook">$1M ARR Marketing Playbook</a>
    </nav>
  ),
}));

describe('Navigation and Forms Integration Tests', () => {
  describe('Internal Links Functionality', () => {
    let CACReductionGuidePage: React.ComponentType;

    beforeAll(async () => {
      const module = await import('@/app/cac-reduction-guide/page');
      CACReductionGuidePage = module.default;
    });

    it('includes proper internal links in related resources', () => {
      render(<CACReductionGuidePage />);

      // Check for internal links to other pages
      expect(screen.getByText('Use Calculator →')).toBeInTheDocument();
      expect(screen.getByText('Download Playbook →')).toBeInTheDocument();
      expect(screen.getByText('Learn Framework →')).toBeInTheDocument();

      // Check the href attributes
      const calculatorLink = screen.getByText('Use Calculator →').closest('a');
      const playbookLink = screen.getByText('Download Playbook →').closest('a');
      const frameworkLink = screen.getByText('Learn Framework →').closest('a');

      expect(calculatorLink).toHaveAttribute('href', '/cac-optimization-calculator');
      expect(playbookLink).toHaveAttribute('href', '/1m-arr-marketing-playbook');
      expect(frameworkLink).toHaveAttribute('href', '/marketing-attribution-framework');
    });

    it('displays content navigation component', () => {
      render(<CACReductionGuidePage />);

      const contentNav = screen.getByTestId('content-navigation');
      expect(contentNav).toBeInTheDocument();
      expect(contentNav).toHaveAttribute('data-current-path', '/cac-reduction-guide');
      expect(contentNav).toHaveAttribute('data-variant', 'horizontal');
    });

    it('shows navigation links to related content', () => {
      render(<CACReductionGuidePage />);

      // Check for navigation links within the content navigation
      const contentNav = screen.getByTestId('content-navigation');
      expect(contentNav).toBeInTheDocument();
      
      // Check that the navigation contains the expected links
      expect(contentNav).toHaveTextContent('CAC Reduction Guide');
      expect(contentNav).toHaveTextContent('Revenue Growth Benchmarking');
      expect(contentNav).toHaveTextContent('Marketing Attribution Framework');
    });
  });

  describe('Email Capture Forms', () => {
    let CACReductionGuidePage: React.ComponentType;

    beforeAll(async () => {
      const module = await import('@/app/cac-reduction-guide/page');
      CACReductionGuidePage = module.default;
    });

    it('displays email capture form with correct properties', () => {
      render(<CACReductionGuidePage />);

      const emailForm = screen.getByTestId('email-capture-form');
      expect(emailForm).toBeInTheDocument();
      expect(emailForm).toHaveAttribute('data-source', 'cac-reduction-guide');

      // Check for form elements
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('shows correct placeholder and button text', () => {
      render(<CACReductionGuidePage />);

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      expect(emailInput).toHaveAttribute('placeholder', 'Enter your business email');
      expect(submitButton).toHaveTextContent('Get Implementation Kit');
    });

    it('includes form validation attributes', () => {
      render(<CACReductionGuidePage />);

      const emailInput = screen.getByTestId('email-input');
      expect(emailInput).toHaveAttribute('type', 'email');
    });
  });

  describe('Consultation CTAs', () => {
    let CACReductionGuidePage: React.ComponentType;

    beforeAll(async () => {
      const module = await import('@/app/cac-reduction-guide/page');
      CACReductionGuidePage = module.default;
    });

    it('displays multiple consultation CTAs throughout the page', () => {
      render(<CACReductionGuidePage />);

      const ctaButtons = screen.getAllByTestId('consultation-cta');
      expect(ctaButtons.length).toBeGreaterThan(2); // Multiple CTAs throughout the page
    });

    it('shows CTAs with different variants and text', () => {
      render(<CACReductionGuidePage />);

      const ctaButtons = screen.getAllByTestId('consultation-cta');
      
      // Check that different variants exist
      const variants = ctaButtons.map(button => button.getAttribute('data-variant'));
      expect(variants).toContain('header');
      expect(variants).toContain('primary');
      expect(variants).toContain('secondary');

      // Check for specific CTA text
      expect(screen.getByText('Get Free CAC Audit')).toBeInTheDocument();
      expect(screen.getByText('Book Free CAC Strategy Session')).toBeInTheDocument();
    });
  });

  describe('Form Integration Across Pages', () => {
    it('shows email capture forms on all major content pages', async () => {
      // Test CAC Reduction Guide
      const cacModule = await import('@/app/cac-reduction-guide/page');
      const { rerender } = render(<cacModule.default />);
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();

      // Test Revenue Growth Benchmarking
      const revenueModule = await import('@/app/revenue-growth-benchmarking/page');
      rerender(<revenueModule.default />);
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();

      // Test Marketing Attribution Framework
      const attributionModule = await import('@/app/marketing-attribution-framework/page');
      rerender(<attributionModule.default />);
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();
    });

    it('uses appropriate source tracking for different pages', async () => {
      // Test CAC Reduction Guide source
      const cacModule = await import('@/app/cac-reduction-guide/page');
      const { rerender } = render(<cacModule.default />);
      let emailForm = screen.getByTestId('email-capture-form');
      expect(emailForm).toHaveAttribute('data-source', 'cac-reduction-guide');

      // Test Revenue Growth Benchmarking source (if implemented)
      const revenueModule = await import('@/app/revenue-growth-benchmarking/page');
      rerender(<revenueModule.default />);
      emailForm = screen.getByTestId('email-capture-form');
      // The source should be page-specific for proper tracking
      expect(emailForm).toHaveAttribute('data-source');
    });
  });

  describe('SEO and Meta Tags', () => {
    it('includes canonical URLs for all new pages', async () => {
      // Test pages include proper metadata
      const cacModule = await import('@/app/cac-reduction-guide/page');
      expect(cacModule.metadata).toBeDefined();
      expect(cacModule.metadata.alternates?.canonical).toBe('/cac-reduction-guide');

      const revenueModule = await import('@/app/revenue-growth-benchmarking/page');
      expect(revenueModule.metadata).toBeDefined();
      expect(revenueModule.metadata.alternates?.canonical).toBe('/revenue-growth-benchmarking');

      const attributionModule = await import('@/app/marketing-attribution-framework/page');
      expect(attributionModule.metadata).toBeDefined();
      expect(attributionModule.metadata.alternates?.canonical).toBe('/marketing-attribution-framework');
    });

    it('includes proper OpenGraph metadata', async () => {
      const cacModule = await import('@/app/cac-reduction-guide/page');
      expect(cacModule.metadata.openGraph?.title).toContain('Customer Acquisition Cost Reduction');
      expect(cacModule.metadata.openGraph?.type).toBe('article');

      const revenueModule = await import('@/app/revenue-growth-benchmarking/page');
      expect(revenueModule.metadata.openGraph?.title).toContain('Revenue Growth');
      expect(revenueModule.metadata.openGraph?.type).toBe('article');

      const attributionModule = await import('@/app/marketing-attribution-framework/page');
      expect(attributionModule.metadata.openGraph?.title).toContain('Marketing Attribution');
      expect(attributionModule.metadata.openGraph?.type).toBe('article');
    });

    it('includes relevant keywords for SEO', async () => {
      const cacModule = await import('@/app/cac-reduction-guide/page');
      expect(cacModule.metadata.keywords).toContain('customer acquisition cost');
      expect(cacModule.metadata.keywords).toContain('subscription business');

      const revenueModule = await import('@/app/revenue-growth-benchmarking/page');
      expect(revenueModule.metadata.keywords).toContain('revenue growth');
      expect(revenueModule.metadata.keywords).toContain('creative strategy');

      const attributionModule = await import('@/app/marketing-attribution-framework/page');
      expect(attributionModule.metadata.keywords).toContain('marketing attribution');
      expect(attributionModule.metadata.keywords).toContain('multi-touch attribution');
    });
  });

  describe('Sitemap Integration', () => {
    it('includes all new pages in sitemap with correct priorities', async () => {
      const sitemapModule = await import('@/app/sitemap');
      const sitemap = sitemapModule.default();

      // Check that new pages are included
      const urls = sitemap.map(entry => entry.url);
      
      expect(urls.some(url => url.includes('/cac-reduction-guide'))).toBe(true);
      expect(urls.some(url => url.includes('/revenue-growth-benchmarking'))).toBe(true);
      expect(urls.some(url => url.includes('/marketing-attribution-framework'))).toBe(true);

      // Check priorities are set correctly
      const cacEntry = sitemap.find(entry => entry.url.includes('/cac-reduction-guide'));
      const revenueEntry = sitemap.find(entry => entry.url.includes('/revenue-growth-benchmarking'));
      const attributionEntry = sitemap.find(entry => entry.url.includes('/marketing-attribution-framework'));

      expect(cacEntry?.priority).toBe(0.9);
      expect(revenueEntry?.priority).toBe(0.9);
      expect(attributionEntry?.priority).toBe(0.9);
    });

    it('sets appropriate change frequencies', async () => {
      const sitemapModule = await import('@/app/sitemap');
      const sitemap = sitemapModule.default();

      const newPages = sitemap.filter(entry => 
        entry.url.includes('/cac-reduction-guide') ||
        entry.url.includes('/revenue-growth-benchmarking') ||
        entry.url.includes('/marketing-attribution-framework')
      );

      newPages.forEach(page => {
        expect(page.changeFrequency).toBe('weekly');
      });
    });
  });
});