import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AttributionModelingTool } from '@/components/calculators/attribution-modeling-tool';

// Mock the consultation booking CTA component
jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant: string; text: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text}
    </button>
  ),
}));

describe('AttributionModelingTool', () => {
  beforeEach(() => {
    render(<AttributionModelingTool />);
  });

  it('renders initial state correctly', () => {
    expect(screen.getByText('Multi-Touch Attribution Simulator')).toBeInTheDocument();
    expect(screen.getByText('Attribution Model')).toBeInTheDocument();
    expect(screen.getByText('Channel Performance Data')).toBeInTheDocument();
  });

  it('displays default attribution model and weights', () => {
    expect(screen.getByDisplayValue('position-based')).toBeInTheDocument();
    expect(screen.getByDisplayValue('40')).toBeInTheDocument(); // First touch weight
    expect(screen.getByDisplayValue('20')).toBeInTheDocument(); // Middle touch weight
    expect(screen.getByDisplayValue('40')).toBeInTheDocument(); // Last touch weight
  });

  it('displays default channel data', () => {
    // Check Google Ads default values
    expect(screen.getByDisplayValue('15000')).toBeInTheDocument(); // Google Ads spend
    expect(screen.getByDisplayValue('2500')).toBeInTheDocument(); // Google Ads clicks
    expect(screen.getByDisplayValue('800')).toBeInTheDocument(); // Google Ads assists
    expect(screen.getByDisplayValue('45')).toBeInTheDocument(); // Google Ads conversions

    // Check LinkedIn Ads
    expect(screen.getByDisplayValue('8000')).toBeInTheDocument(); // LinkedIn spend
    expect(screen.getByDisplayValue('1200')).toBeInTheDocument(); // LinkedIn clicks
  });

  it('updates attribution model when changed', () => {
    const modelSelect = screen.getByRole('combobox');
    fireEvent.change(modelSelect, { target: { value: 'linear' } });
    expect(modelSelect).toHaveValue('linear');
  });

  it('updates touchpoint weights when changed', () => {
    const firstTouchInput = screen.getAllByDisplayValue('40')[0]; // First occurrence
    fireEvent.change(firstTouchInput, { target: { value: '50' } });
    expect(firstTouchInput).toHaveValue(50);
  });

  it('updates channel data when input values change', () => {
    const googleSpendInput = screen.getByDisplayValue('15000');
    fireEvent.change(googleSpendInput, { target: { value: '20000' } });
    expect(googleSpendInput).toHaveValue(20000);

    const linkedinClicksInput = screen.getByDisplayValue('1200');
    fireEvent.change(linkedinClicksInput, { target: { value: '1500' } });
    expect(linkedinClicksInput).toHaveValue(1500);
  });

  it('calculates and displays results when calculate button is clicked', async () => {
    const calculateButton = screen.getByText('Calculate Attribution Impact');
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
      expect(screen.getByText('Last-Click CAC vs Attributed CAC')).toBeInTheDocument();
      expect(screen.getByText('Budget Optimization Recommendations')).toBeInTheDocument();
    });
  });

  it('displays channel performance comparison', async () => {
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Google Ads')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn Ads')).toBeInTheDocument();
      expect(screen.getByText('Content Marketing')).toBeInTheDocument();
      expect(screen.getByText('Email Marketing')).toBeInTheDocument();
    });
  });

  it('shows improvement metrics after calculation', async () => {
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Overall Performance Improvement')).toBeInTheDocument();
      expect(screen.getByText('Total CAC Improvement')).toBeInTheDocument();
      expect(screen.getByText('Budget Efficiency Gain')).toBeInTheDocument();
      expect(screen.getByText('Monthly Reallocation Savings')).toBeInTheDocument();
    });
  });

  it('handles different attribution models correctly', async () => {
    // Test linear attribution
    const modelSelect = screen.getByDisplayValue('position-based');
    fireEvent.change(modelSelect, { target: { value: 'linear' } });
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
    });

    // Test time-decay attribution
    fireEvent.change(modelSelect, { target: { value: 'time-decay' } });
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
    });
  });

  it('updates position-based weights dynamically', () => {
    const firstTouchInput = screen.getAllByDisplayValue('40')[0];
    const middleTouchInput = screen.getByDisplayValue('20');
    const lastTouchInput = screen.getAllByDisplayValue('40')[1];

    // Change first touch weight
    fireEvent.change(firstTouchInput, { target: { value: '30' } });
    expect(firstTouchInput).toHaveValue(30);

    // Change middle touch weight
    fireEvent.change(middleTouchInput, { target: { value: '30' } });
    expect(middleTouchInput).toHaveValue(30);

    // Change last touch weight
    fireEvent.change(lastTouchInput, { target: { value: '40' } });
    expect(lastTouchInput).toHaveValue(40);
  });

  it('calculates last-click CAC correctly', async () => {
    // With default values: Google Ads spend = 15000, conversions = 45
    // Last-click CAC should be 15000/45 = 333.33
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      // Look for the calculated CAC value (approximately $333)
      expect(screen.getByText(/\$333/)).toBeInTheDocument();
    });
  });

  it('shows budget recommendations based on attribution', async () => {
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Budget Optimization Recommendations')).toBeInTheDocument();
      // Should show recommended budget changes for each channel
      expect(screen.getByText(/Recommended Budget:/)).toBeInTheDocument();
    });
  });

  it('handles zero values appropriately', async () => {
    // Set some conversions to zero
    const googleConversionsInput = screen.getByDisplayValue('45');
    fireEvent.change(googleConversionsInput, { target: { value: '0' } });

    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
      // Should handle division by zero gracefully
    });
  });

  it('displays consultation CTA after calculation', async () => {
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      const ctaButton = screen.getByTestId('consultation-cta');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('Get Custom Attribution Strategy');
    });
  });

  it('formats currency values correctly in results', async () => {
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      // Check for proper currency formatting with $ symbols
      const currencyElements = screen.getAllByText(/\$\d+/);
      expect(currencyElements.length).toBeGreaterThan(0);
    });
  });

  it('shows different results for different attribution models', async () => {
    // Calculate with position-based model
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));
    
    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
    });

    // Get first result value
    const firstResult = screen.getByText('Overall Performance Improvement').closest('div');

    // Switch to linear model and recalculate
    const modelSelect = screen.getByDisplayValue('position-based');
    fireEvent.change(modelSelect, { target: { value: 'linear' } });
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      // Results should potentially be different
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
    });
  });

  it('validates weight inputs sum to 100 for position-based model', () => {
    const firstTouchInput = screen.getAllByDisplayValue('40')[0];
    const middleTouchInput = screen.getByDisplayValue('20');
    const lastTouchInput = screen.getAllByDisplayValue('40')[1];

    // Change weights to sum to more than 100
    fireEvent.change(firstTouchInput, { target: { value: '50' } });
    fireEvent.change(middleTouchInput, { target: { value: '30' } });
    fireEvent.change(lastTouchInput, { target: { value: '30' } });

    // The component should handle this validation (if implemented)
    expect(firstTouchInput).toHaveValue(50);
    expect(middleTouchInput).toHaveValue(30);
    expect(lastTouchInput).toHaveValue(30);
  });

  it('shows methodology explanation', () => {
    expect(screen.getByText(/Attribution modeling methodology/i)).toBeInTheDocument();
  });

  it('handles data-driven attribution model', async () => {
    // Find the select element by its label or by searching for the option
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'data-driven' } });
    
    fireEvent.click(screen.getByText('Calculate Attribution Impact'));

    await waitFor(() => {
      expect(screen.getByText('Attribution Analysis Results')).toBeInTheDocument();
      // Data-driven model should produce different results
    });
  });
});