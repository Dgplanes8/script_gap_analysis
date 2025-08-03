// Optimized layout components using shared infrastructure
export { OptimizedFeaturesSection } from './features-section';
export { OptimizedMetricsSection } from './metrics-section';
export { OptimizedCTASection } from './cta-section';

// Re-export shared layout components for convenience
export * from '../shared';

// Example usage configurations
export const COMMON_METRICS = {
  subscription: [
    {
      value: "1.2M+",
      label: "Ad Spend Optimized",
      prefix: "$",
      description: "Total advertising budget optimized"
    },
    {
      value: "127",
      label: "Scripts Delivered",
      description: "Custom creative scripts created"
    },
    {
      value: "34%",
      label: "Average CTR Improvement",
      description: "Typical click-through rate increase"
    }
  ],
  saas: [
    {
      value: "58%",
      label: "Average CAC Reduction",
      description: "Cost per acquisition decrease"
    },
    {
      value: "240%",
      label: "Revenue Growth",
      description: "Average client revenue increase"
    },
    {
      value: "190%",
      label: "Conversion Rate Lift",
      description: "Improvement in conversion performance"
    }
  ]
} as const;