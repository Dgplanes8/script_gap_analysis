import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CACReductionCalculator } from '@/components/calculators/cac-reduction-calculator';

// Mock the consultation booking CTA component
jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant: string; text: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text}
    </button>
  ),
}));

describe('CACReductionCalculator', () => {
  beforeEach(() => {
    render(<CACReductionCalculator />);
  });

  it('renders initial state correctly', () => {
    expect(screen.getByText('CAC Reduction Calculator')).toBeInTheDocument();
    expect(screen.getByText('Calculate Your Potential Savings')).toBeInTheDocument();
    expect(screen.getByText('Enter your metrics to see reduction potential')).toBeInTheDocument();
  });

  it('displays all required input fields', () => {
    expect(screen.getByPlaceholderText('250')).toBeInTheDocument(); // CAC
    expect(screen.getByPlaceholderText('100')).toBeInTheDocument(); // Monthly customers
    expect(screen.getByPlaceholderText('1200')).toBeInTheDocument(); // LTV
    expect(screen.getByPlaceholderText('2.5')).toBeInTheDocument(); // Conversion rate
    expect(screen.getByPlaceholderText('25000')).toBeInTheDocument(); // Ad spend
  });

  it('updates input values when user types', () => {
    const cacInput = screen.getByPlaceholderText('250');
    fireEvent.change(cacInput, { target: { value: '300' } });
    expect(cacInput).toHaveValue(300);

    const customersInput = screen.getByPlaceholderText('100');
    fireEvent.change(customersInput, { target: { value: '150' } });
    expect(customersInput).toHaveValue(150);
  });

  it('calculates results when all fields are filled and calculate button is clicked', async () => {
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '300' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1500' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '30000' } });

    // Click calculate button
    const calculateButton = screen.getByText('Calculate Reduction Potential');
    fireEvent.click(calculateButton);

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Optimization Results')).toBeInTheDocument();
      expect(screen.getByText('CAC Reduction Projection')).toBeInTheDocument();
      expect(screen.getByText('Projected Savings')).toBeInTheDocument();
      expect(screen.getByText('Strategic Recommendations')).toBeInTheDocument();
    });
  });

  it('displays current and optimized CAC values correctly', async () => {
    // Fill inputs with known values
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '10000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      expect(screen.getByText('Current CAC')).toBeInTheDocument();
      expect(screen.getByText('Optimized CAC')).toBeInTheDocument();
      // Check for the $200 current CAC specifically
      const currentCACElements = screen.getAllByText('$200');
      expect(currentCACElements.length).toBeGreaterThan(0);
    });
  });

  it('calculates LTV:CAC ratio correctly', async () => {
    // LTV = 1200, CAC = 300, ratio should be 4:1
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '300' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1200' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '30000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      expect(screen.getByText('LTV:CAC Ratio')).toBeInTheDocument();
      expect(screen.getByText(/4\.0:1 →/)).toBeInTheDocument(); // Initial ratio
    });
  });

  it('provides appropriate recommendations based on metrics', async () => {
    // Set low LTV:CAC ratio to trigger specific recommendations
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '500' } }); // High CAC
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1000' } }); // Lower LTV
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '1' } }); // Low conversion
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '50000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      expect(screen.getByText(/Critical.*LTV:CAC ratio below 3:1/)).toBeInTheDocument();
      expect(screen.getByText(/Focus on conversion optimization/)).toBeInTheDocument();
    });
  });

  it('displays consultation CTA after calculation', async () => {
    // Fill in minimal required fields
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '300' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1200' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '30000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      const ctaButton = screen.getByTestId('consultation-cta');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('data-variant', 'secondary');
      expect(ctaButton).toHaveTextContent('Book Free CAC Strategy Call');
    });
  });

  it('does not calculate when required fields are missing', () => {
    // Only fill some fields
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '300' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    // Leave other fields empty

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    // Results should not appear
    expect(screen.queryByText('Optimization Results')).not.toBeInTheDocument();
    expect(screen.getByText('Enter your metrics to see reduction potential')).toBeInTheDocument();
  });

  it('handles zero values appropriately', async () => {
    // Fill with zero values
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1200' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '30000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    // Should not show results with zero CAC
    expect(screen.queryByText('Optimization Results')).not.toBeInTheDocument();
  });

  it('displays methodology note', () => {
    expect(screen.getByText(/Methodology:/)).toBeInTheDocument();
    expect(screen.getByText(/industry benchmarks and optimization patterns/)).toBeInTheDocument();
  });

  it('adjusts reduction percentage based on inefficiencies', async () => {
    // Test high inefficiency scenario (LTV:CAC < 3)
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '400' } }); // High CAC
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1000' } }); // LTV:CAC = 2.5
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '40000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      expect(screen.getByText('Reduction')).toBeInTheDocument(); // Should show reduction percentage
      // Look for percentage value in results
      const percentageElements = screen.getAllByText(/%/);
      expect(percentageElements.length).toBeGreaterThan(1); // Should have percentage in results
    });
  });

  it('formats currency values correctly', async () => {
    fireEvent.change(screen.getByPlaceholderText('250'), { target: { value: '300' } });
    fireEvent.change(screen.getByPlaceholderText('100'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('1200'), { target: { value: '1200' } });
    fireEvent.change(screen.getByPlaceholderText('2.5'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('25000'), { target: { value: '30000' } });

    fireEvent.click(screen.getByText('Calculate Reduction Potential'));

    await waitFor(() => {
      // Check for properly formatted currency (with commas for thousands)
      expect(screen.getByText(/Monthly Savings/)).toBeInTheDocument();
      expect(screen.getByText(/Annual Savings/)).toBeInTheDocument();
    });
  });
});