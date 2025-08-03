'use client';

import { useState } from 'react';
import { GuideNavigation } from './guide-navigation';
import { CalculatorSection } from './calculator-section';
import { StrategicFramework } from './strategic-framework';
import { ImplementationGuide } from './implementation-guide';
import { CaseStudySection } from './case-study-section';

interface CACCalculatorData {
  monthlyRevenue: number;
  currentCAC: number;
  monthlyAcquisitions: number;
  customerLTV: number;
  adSpend: number;
  conversionRate: number;
}

export function CACReductionGuideContent() {
  const [calculatorData, setCalculatorData] = useState<CACCalculatorData>({
    monthlyRevenue: 0,
    currentCAC: 0,
    monthlyAcquisitions: 0,
    customerLTV: 0,
    adSpend: 0,
    conversionRate: 0
  });
  
  const [showCalculatorResults, setShowCalculatorResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <GuideNavigation />

      <CalculatorSection
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
        showCalculatorResults={showCalculatorResults}
        setShowCalculatorResults={setShowCalculatorResults}
      />

      <article className="prose prose-lg max-w-none">
        <StrategicFramework />

        <ImplementationGuide
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />

        <CaseStudySection />
      </article>
    </div>
  );
}