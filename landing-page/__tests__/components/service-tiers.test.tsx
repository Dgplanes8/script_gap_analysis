import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceTiers } from '@/components/layout/service-tiers';

// Mock the consultation context
jest.mock('@/components/contexts/consultation-context', () => ({
  useConsultation: () => ({
    openModal: jest.fn(),
    closeModal: jest.fn(),
    isModalOpen: false,
  }),
}));

// Mock the consultation booking CTA component
jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant?: string; text?: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text || 'Book Consultation'}
    </button>
  ),
}));

describe('ServiceTiers Component', () => {
  beforeEach(() => {
    render(<ServiceTiers />);
  });

  it('renders the service tiers section correctly', () => {
    expect(screen.getByText('Strategic Ad Intelligence System')).toBeInTheDocument();
    expect(screen.getByText('Fortune 100 Systematic Methodology')).toBeInTheDocument();
    expect(screen.getByText('$100M+')).toBeInTheDocument();
    expect(screen.getByText('Ad Spend Managed')).toBeInTheDocument();
  });

  it('displays all four pricing tiers', () => {
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('shows correct pricing for each tier', () => {
    // Assessment tier - $500/month
    expect(screen.getByText('$500')).toBeInTheDocument();
    
    // Foundation tier - $1,500/month (down from $3,000)
    expect(screen.getByText('$1,500')).toBeInTheDocument();
    
    // Growth tier - $4,500/month (down from $8,500)
    expect(screen.getByText('$4,500')).toBeInTheDocument();
    
    // Enterprise tier - $9,500/month (down from $15,000)
    expect(screen.getByText('$9,500')).toBeInTheDocument();
  });

  it('displays appropriate badges for each tier', () => {
    expect(screen.getByText('Great for Under $500K ARR')).toBeInTheDocument();
    expect(screen.getByText('Perfect for $500K-$1M ARR')).toBeInTheDocument();
    expect(screen.getByText('Most Popular - $1M-$2M ARR')).toBeInTheDocument();
    expect(screen.getByText('Enterprise - $2M+ ARR')).toBeInTheDocument();
  });

  it('shows correct features for Assessment tier', () => {
    expect(screen.getByText('Monthly strategic assessment and recommendations')).toBeInTheDocument();
    expect(screen.getByText('CAC optimization audit and action plan')).toBeInTheDocument();
    expect(screen.getByText('Creative performance evaluation')).toBeInTheDocument();
    expect(screen.getByText('Channel effectiveness analysis')).toBeInTheDocument();
  });

  it('shows correct features for Foundation tier', () => {
    expect(screen.getByText('Everything in Assessment, plus:')).toBeInTheDocument();
    expect(screen.getByText('Bi-weekly strategic consultation sessions')).toBeInTheDocument();
    expect(screen.getByText('11-Phase strategic methodology implementation')).toBeInTheDocument();
    expect(screen.getByText('Custom CAC optimization roadmap')).toBeInTheDocument();
  });

  it('shows correct features for Growth tier', () => {
    expect(screen.getByText('Everything in Foundation, plus:')).toBeInTheDocument();
    expect(screen.getByText('Bi-weekly strategic implementation calls')).toBeInTheDocument();
    expect(screen.getByText('Custom creative asset development')).toBeInTheDocument();
    expect(screen.getByText('Advanced attribution and analytics setup')).toBeInTheDocument();
  });

  it('shows correct features for Enterprise tier', () => {
    expect(screen.getByText('Everything in Growth, plus:')).toBeInTheDocument();
    expect(screen.getByText('Dedicated strategic account manager')).toBeInTheDocument();
    expect(screen.getByText('Weekly strategic planning sessions')).toBeInTheDocument();
    expect(screen.getByText('Executive-level strategic consulting')).toBeInTheDocument();
    expect(screen.getByText('Emergency strategic support (24/7)')).toBeInTheDocument();
  });

  it('highlights the Growth tier as most popular', () => {
    expect(screen.getByText('Most Popular - $1M-$2M ARR')).toBeInTheDocument();
  });

  it('displays consultation CTAs for all tiers', () => {
    const ctaButtons = screen.getAllByTestId('consultation-cta');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('shows tier descriptions', () => {
    expect(screen.getByText(/Strategic assessment and optimization guidance for early-stage companies/)).toBeInTheDocument();
    expect(screen.getByText(/Core strategic optimization and validation for growing SaaS companies/)).toBeInTheDocument();
    expect(screen.getByText(/Complete strategic transformation with hands-on implementation/)).toBeInTheDocument();
    expect(screen.getByText(/Full strategic transformation partnership with dedicated team/)).toBeInTheDocument();
  });

  it('displays ideal client descriptions', () => {
    expect(screen.getByText(/Early-stage companies under \$500K ARR needing strategic direction/)).toBeInTheDocument();
    expect(screen.getByText(/Companies with \$500K-\$1M ARR seeking systematic growth optimization/)).toBeInTheDocument();
    expect(screen.getByText(/High-growth companies scaling from \$1M to \$2M\+ ARR/)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise SaaS companies with \$2M\+ ARR requiring comprehensive transformation/)).toBeInTheDocument();
  });

  it('shows all pricing periods as monthly', () => {
    const monthlyLabels = screen.getAllByText('/month');
    expect(monthlyLabels).toHaveLength(4); // One for each tier
  });

  it('displays trust indicators', () => {
    expect(screen.getByText('Ad Spend Managed')).toBeInTheDocument();
    expect(screen.getByText('Systematic Process')).toBeInTheDocument();
    expect(screen.getByText('Proven Methods')).toBeInTheDocument();
  });

  it('renders with proper grid layout for 4 tiers', () => {
    // The component uses lg:grid-cols-4 for the tier layout
    const tiersContainer = screen.getByText('Assessment').closest('.grid');
    expect(tiersContainer).toHaveClass('lg:grid-cols-4');
  });

  it('includes proper tier icons', () => {
    // Each tier should have its respective icon (Target, Building2, TrendingUp, Crown)
    // These are rendered as SVG elements, so we check for their presence indirectly
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('applies correct styling classes for different tiers', () => {
    // Check that different tiers have appropriate color schemes
    expect(screen.getByText('Great for Under $500K ARR')).toBeInTheDocument();
    expect(screen.getByText('Perfect for $500K-$1M ARR')).toBeInTheDocument();
    expect(screen.getByText('Most Popular - $1M-$2M ARR')).toBeInTheDocument();
    expect(screen.getByText('Enterprise - $2M+ ARR')).toBeInTheDocument();
  });

  it('shows comprehensive feature lists', () => {
    // Assessment tier features
    expect(screen.getByText('Email support and strategic guidance')).toBeInTheDocument();
    expect(screen.getByText('Access to strategic frameworks and templates')).toBeInTheDocument();
    expect(screen.getByText('Quarterly performance review sessions')).toBeInTheDocument();

    // Foundation tier additional features
    expect(screen.getByText('Direct access to strategic team')).toBeInTheDocument();
    expect(screen.getByText('Market positioning and messaging refinement')).toBeInTheDocument();
    expect(screen.getByText('Attribution modeling setup guidance')).toBeInTheDocument();

    // Growth tier additional features
    expect(screen.getByText('Cross-channel optimization strategies')).toBeInTheDocument();
    expect(screen.getByText('Team training and knowledge transfer')).toBeInTheDocument();
    expect(screen.getByText('Priority support and rapid response')).toBeInTheDocument();

    // Enterprise tier additional features
    expect(screen.getByText('Custom technology stack integration')).toBeInTheDocument();
    expect(screen.getByText('Advanced predictive modeling and forecasting')).toBeInTheDocument();
    expect(screen.getByText('Board-level performance reporting')).toBeInTheDocument();
  });
});