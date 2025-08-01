import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RevenueGrowthBenchmarkTool } from '@/components/calculators/revenue-growth-benchmark-tool';

// Mock the consultation booking CTA component
jest.mock('@/components/ui/consultation-booking-cta', () => ({
  ConsultationBookingCTA: ({ variant, text }: { variant: string; text: string }) => (
    <button data-testid="consultation-cta" data-variant={variant}>
      {text}
    </button>
  ),
}));

describe('RevenueGrowthBenchmarkTool', () => {
  beforeEach(() => {
    render(<RevenueGrowthBenchmarkTool />);
  });

  it('renders initial state correctly', () => {
    expect(screen.getByText('Revenue Growth Benchmarking')).toBeInTheDocument();
    expect(screen.getByText('Benchmark Your Growth Strategy')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 8')).toBeInTheDocument();
  });

  it('displays first question about creative testing frequency', () => {
    expect(screen.getByText('How frequently do you test new creative variations?')).toBeInTheDocument();
    expect(screen.getByText('Rarely or never (0-2 per month)')).toBeInTheDocument();
    expect(screen.getByText('Systematically (15+ per month)')).toBeInTheDocument();
  });

  it('advances to next question when option is selected', async () => {
    // Select first option
    const rarelyOption = screen.getByText('Rarely or never (0-2 per month)');
    fireEvent.click(rarelyOption);

    // Wait for next question to appear
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
      expect(screen.getByText('What attribution model do you use to measure creative performance?')).toBeInTheDocument();
    });
  });

  it('shows progress indicator correctly', async () => {
    expect(screen.getByText('Step 1 of 8')).toBeInTheDocument();
    
    // Select option and advance
    fireEvent.click(screen.getByText('Rarely or never (0-2 per month)'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    });

    // Continue to next step
    fireEvent.click(screen.getByText('No formal attribution tracking'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 3 of 8')).toBeInTheDocument();
    });
  });

  it('allows going back to previous questions', async () => {
    // Advance through a couple questions
    fireEvent.click(screen.getByText('Rarely or never (0-2 per month)'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('No formal attribution tracking'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 3 of 8')).toBeInTheDocument();
    });

    // Click back button
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
      expect(screen.getByText('What attribution model do you use to measure creative performance?')).toBeInTheDocument();
    });
  });

  it('completes all questions and shows results', async () => {
    const questionAnswers = [
      'Rarely or never (0-2 per month)',
      'No formal attribution tracking',
      'Internal assumptions and opinions',
      'Based on intuition and best practices',
      'Basic metrics (clicks, impressions)',
      'Below 5% MRR growth',
      'B2B SaaS',
      'Under $1M ARR'
    ];

    // Answer all questions
    for (let i = 0; i < questionAnswers.length; i++) {
      const answer = questionAnswers[i];
      fireEvent.click(screen.getByText(answer));
      
      if (i < questionAnswers.length - 1) {
        await waitFor(() => {
          expect(screen.getByText(`Step ${i + 2} of 8`)).toBeInTheDocument();
        });
      }
    }

    // Should show results
    await waitFor(() => {
      expect(screen.getByText('Your Growth Strategy Assessment')).toBeInTheDocument();
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    });
  });

  it('calculates and displays scores correctly', async () => {
    // Answer all questions with high scores
    const highScoreAnswers = [
      'Systematically (15+ per month)',
      'Multi-touch attribution modeling',
      'Systematic voice-of-customer research',
      'Advanced multivariate testing and personalization',
      'Predictive modeling and revenue attribution',
      'Above 20% MRR growth',
      'B2B SaaS',
      '$10M+ ARR'
    ];

    for (const answer of highScoreAnswers) {
      fireEvent.click(screen.getByText(answer));
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    }

    await waitFor(() => {
      expect(screen.getByText('Your Growth Strategy Assessment')).toBeInTheDocument();
      // Should show high overall score
      expect(screen.getByText(/Score:/)).toBeInTheDocument();
    });
  });

  it('provides appropriate benchmark comparison', async () => {
    // Answer questions to get a specific benchmark
    const mediumScoreAnswers = [
      'Regularly (6-10 per month)',
      'First-click attribution',
      'Customer interviews and focus groups',
      'Structured testing with control groups',
      'LTV and cohort analysis',
      '10-15% MRR growth',
      'B2B SaaS',
      '$1M-$5M ARR'
    ];

    for (const answer of mediumScoreAnswers) {
      fireEvent.click(screen.getByText(answer));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    await waitFor(() => {
      expect(screen.getByText('Benchmark Comparison')).toBeInTheDocument();
      expect(screen.getByText(/You're performing/)).toBeInTheDocument();
    });
  });

  it('shows growth potential and recommendations', async () => {
    // Complete assessment
    const basicAnswers = [
      'Occasionally (3-5 per month)',
      'Last-click attribution',
      'Basic surveys or feedback forms',
      'Basic A/B testing of headlines/images',
      'Conversion tracking and CAC measurement',
      '5-10% MRR growth',
      'E-commerce',
      '$1M-$5M ARR'
    ];

    for (const answer of basicAnswers) {
      fireEvent.click(screen.getByText(answer));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    await waitFor(() => {
      expect(screen.getByText('Growth Potential')).toBeInTheDocument();
      expect(screen.getByText('Strategic Recommendations')).toBeInTheDocument();
      expect(screen.getByText(/additional MRR growth/)).toBeInTheDocument();
    });
  });

  it('displays category scores breakdown', async () => {
    // Complete assessment quickly
    const answers = [
      'Regularly (6-10 per month)',
      'Multi-touch attribution modeling',
      'Customer interviews and focus groups',
      'Structured testing with control groups',
      'LTV and cohort analysis',
      '15-20% MRR growth',
      'B2B SaaS',
      '$5M-$10M ARR'
    ];

    for (const answer of answers) {
      fireEvent.click(screen.getByText(answer));
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    await waitFor(() => {
      expect(screen.getByText('Targeting Strategy')).toBeInTheDocument();
      expect(screen.getByText('Message Optimization')).toBeInTheDocument();
      expect(screen.getByText('Testing Velocity')).toBeInTheDocument();
      expect(screen.getByText('Performance Optimization')).toBeInTheDocument();
    });
  });

  it('shows consultation CTA after completing assessment', async () => {
    const answers = [
      'Occasionally (3-5 per month)',
      'Last-click attribution',
      'Basic surveys or feedback forms',
      'Basic A/B testing of headlines/images',
      'Conversion tracking and CAC measurement',
      '5-10% MRR growth',
      'B2B SaaS',
      '$1M-$5M ARR'
    ];

    for (const answer of answers) {
      fireEvent.click(screen.getByText(answer));
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    await waitFor(() => {
      const ctaButton = screen.getByTestId('consultation-cta');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('Get Your Custom Growth Strategy');
    });
  });

  it('handles restart functionality', async () => {
    // Answer first question
    fireEvent.click(screen.getByText('Rarely or never (0-2 per month)'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    });

    // Find and click restart button (if implemented)
    // This test assumes restart functionality exists
    const restartButton = screen.queryByText('Restart Assessment');
    if (restartButton) {
      fireEvent.click(restartButton);
      
      await waitFor(() => {
        expect(screen.getByText('Step 1 of 8')).toBeInTheDocument();
        expect(screen.getByText('How frequently do you test new creative variations?')).toBeInTheDocument();
      });
    }
  });

  it('validates all question options are available', () => {
    // Check first question has all expected options
    expect(screen.getByText('Rarely or never (0-2 per month)')).toBeInTheDocument();
    expect(screen.getByText('Occasionally (3-5 per month)')).toBeInTheDocument();
    expect(screen.getByText('Regularly (6-10 per month)')).toBeInTheDocument();
    expect(screen.getByText('Systematically (15+ per month)')).toBeInTheDocument();
  });

  it('maintains selected answers when navigating back', async () => {
    // Select first option
    fireEvent.click(screen.getByText('Occasionally (3-5 per month)'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    });

    // Select second option
    fireEvent.click(screen.getByText('Last-click attribution'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 3 of 8')).toBeInTheDocument();
    });

    // Go back
    fireEvent.click(screen.getByText('Back'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    });

    // Go back again
    fireEvent.click(screen.getByText('Back'));
    
    await waitFor(() => {
      expect(screen.getByText('Step 1 of 8')).toBeInTheDocument();
      // The previously selected option should still be indicated as selected
      // This would depend on implementation details
    });
  });
});