import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock all the components that the pages use
jest.mock('@/components/forms/email-capture-form', () => ({
  EmailCaptureForm: ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div data-testid="email-capture-form">
      <input placeholder={placeholder} />
      <button>{buttonText}</button>
    </div>
  ),
}));

jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant?: string; text?: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text || 'Book Consultation'}
    </button>
  ),
}));

jest.mock('@/components/layout/content-navigation', () => ({
  ContentNavigation: ({ currentPath }: { currentPath: string }) => (
    <nav data-testid="content-navigation" data-current-path={currentPath}>
      Content Navigation
    </nav>
  ),
}));

jest.mock('@/components/calculators/cac-reduction-calculator', () => ({
  CACReductionCalculator: () => (
    <div data-testid="cac-reduction-calculator">CAC Reduction Calculator</div>
  ),
}));

jest.mock('@/components/calculators/revenue-growth-benchmark-tool', () => ({
  RevenueGrowthBenchmarkTool: () => (
    <div data-testid="revenue-growth-benchmark-tool">Revenue Growth Benchmark Tool</div>
  ),
}));

jest.mock('@/components/calculators/attribution-modeling-tool', () => ({
  AttributionModelingTool: () => (
    <div data-testid="attribution-modeling-tool">Attribution Modeling Tool</div>
  ),
}));

describe('New Pages Rendering Tests', () => {
  describe('CAC Reduction Guide Page', () => {
    let CACReductionGuidePage: React.ComponentType;

    beforeAll(async () => {
      // Dynamically import the page component
      const module = await import('@/app/cac-reduction-guide/page');
      CACReductionGuidePage = module.default;
    });

    it('renders the CAC Reduction Guide page correctly', () => {
      render(<CACReductionGuidePage />);

      // Check for key elements
      expect(screen.getByText('Customer Acquisition Cost Reduction:')).toBeInTheDocument();
      expect(screen.getByText('Step-by-Step Implementation Guide')).toBeInTheDocument();
      expect(screen.getByText('Fortune 100 Proven Methodology')).toBeInTheDocument();
      expect(screen.getByTestId('cac-reduction-calculator')).toBeInTheDocument();
    });

    it('includes proper SEO structured data', () => {
      render(<CACReductionGuidePage />);
      
      // Check for structured data script
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      expect(structuredDataScript).toBeInTheDocument();
      
      if (structuredDataScript) {
        const structuredData = JSON.parse(structuredDataScript.textContent || '{}');
        expect(structuredData['@type']).toBe('Article');
        expect(structuredData.headline).toContain('Customer Acquisition Cost Reduction');
      }
    });

    it('displays implementation guide contents', () => {
      render(<CACReductionGuidePage />);
      
      expect(screen.getByText('Strategic Foundation Assessment')).toBeInTheDocument();
      expect(screen.getByText('Audience Intelligence Framework')).toBeInTheDocument();
      expect(screen.getByText('Channel Optimization Strategy')).toBeInTheDocument();
      expect(screen.getByText('Implementation Roadmap')).toBeInTheDocument();
    });

    it('includes 90-day implementation checklist', () => {
      render(<CACReductionGuidePage />);
      
      expect(screen.getByText('90-Day Implementation Checklist')).toBeInTheDocument();
      expect(screen.getByText('Days 1-30: Foundation')).toBeInTheDocument();
      expect(screen.getByText('Days 31-60: Optimization')).toBeInTheDocument();
      expect(screen.getByText('Days 61-90: Scale')).toBeInTheDocument();
    });

    it('shows consultation CTAs', () => {
      render(<CACReductionGuidePage />);
      
      const ctaButtons = screen.getAllByTestId('consultation-cta');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });

    it('includes email capture form', () => {
      render(<CACReductionGuidePage />);
      
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();
    });

    it('shows related resources section', () => {
      render(<CACReductionGuidePage />);
      
      expect(screen.getByText('Related Strategic Resources')).toBeInTheDocument();
      expect(screen.getByText('CAC Optimization Calculator')).toBeInTheDocument();
      expect(screen.getByText('$1M ARR Marketing Playbook')).toBeInTheDocument();
      expect(screen.getByText('Marketing Attribution Framework')).toBeInTheDocument();
    });
  });

  describe('Revenue Growth Benchmarking Page', () => {
    let RevenueGrowthBenchmarkingPage: React.ComponentType;

    beforeAll(async () => {
      const module = await import('@/app/revenue-growth-benchmarking/page');
      RevenueGrowthBenchmarkingPage = module.default;
    });

    it('renders the Revenue Growth Benchmarking page correctly', () => {
      render(<RevenueGrowthBenchmarkingPage />);

      expect(screen.getByText(/Revenue Growth/)).toBeInTheDocument();
      expect(screen.getByText(/Benchmarking/)).toBeInTheDocument();
      expect(screen.getByTestId('revenue-growth-benchmark-tool')).toBeInTheDocument();
    });

    it('includes proper SEO structured data', () => {
      render(<RevenueGrowthBenchmarkingPage />);
      
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      expect(structuredDataScript).toBeInTheDocument();
      
      if (structuredDataScript) {
        const structuredData = JSON.parse(structuredDataScript.textContent || '{}');
        expect(structuredData['@type']).toBe('Article');
        expect(structuredData.headline).toContain('Revenue Growth');
      }
    });

    it('displays consultation CTAs', () => {
      render(<RevenueGrowthBenchmarkingPage />);
      
      const ctaButtons = screen.getAllByTestId('consultation-cta');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });

    it('includes email capture form', () => {
      render(<RevenueGrowthBenchmarkingPage />);
      
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();
    });

    it('shows content navigation', () => {
      render(<RevenueGrowthBenchmarkingPage />);
      
      expect(screen.getByTestId('content-navigation')).toBeInTheDocument();
    });
  });

  describe('Marketing Attribution Framework Page', () => {
    let MarketingAttributionFrameworkPage: React.ComponentType;

    beforeAll(async () => {
      const module = await import('@/app/marketing-attribution-framework/page');
      MarketingAttributionFrameworkPage = module.default;
    });

    it('renders the Marketing Attribution Framework page correctly', () => {
      render(<MarketingAttributionFrameworkPage />);

      expect(screen.getByText(/Marketing Attribution/)).toBeInTheDocument();
      expect(screen.getByText(/Framework/)).toBeInTheDocument();
      expect(screen.getByTestId('attribution-modeling-tool')).toBeInTheDocument();
    });

    it('includes proper SEO structured data', () => {
      render(<MarketingAttributionFrameworkPage />);
      
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      expect(structuredDataScript).toBeInTheDocument();
      
      if (structuredDataScript) {
        const structuredData = JSON.parse(structuredDataScript.textContent || '{}');
        expect(structuredData['@type']).toBe('Article');
        expect(structuredData.headline).toContain('Marketing Attribution');
      }
    });

    it('displays consultation CTAs', () => {
      render(<MarketingAttributionFrameworkPage />);
      
      const ctaButtons = screen.getAllByTestId('consultation-cta');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });

    it('includes email capture form', () => {
      render(<MarketingAttributionFrameworkPage />);
      
      expect(screen.getByTestId('email-capture-form')).toBeInTheDocument();
    });

    it('shows content navigation', () => {
      render(<MarketingAttributionFrameworkPage />);
      
      expect(screen.getByTestId('content-navigation')).toBeInTheDocument();
    });
  });
});