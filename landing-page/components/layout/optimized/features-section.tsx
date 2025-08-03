'use client';

import { LucideIcon } from 'lucide-react';
import { SectionContainer, SectionHeader, GridContainer, FeatureCard } from '../shared';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
}

interface OptimizedFeaturesProps {
  title: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  background?: 'white' | 'gray' | 'gradient';
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  badge?: string;
}

export function OptimizedFeaturesSection({
  title,
  subtitle,
  description,
  features,
  background = 'white',
  columns,
  badge
}: OptimizedFeaturesProps) {
  return (
    <SectionContainer background={background} padding="xl">
      <SectionHeader 
        title={title}
        subtitle={subtitle}
        description={description}
        badge={badge}
      />
      
      <GridContainer columns={columns || { sm: 1, md: 2, lg: 3 }}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <FeatureCard
              key={index}
              icon={<Icon className="h-6 w-6" />}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              variant={feature.highlighted ? 'highlighted' : 'default'}
            />
          );
        })}
      </GridContainer>
    </SectionContainer>
  );
}