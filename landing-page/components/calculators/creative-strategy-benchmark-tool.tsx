'use client';

import { useState, useEffect } from 'react';
import { Target, BarChart3, Lightbulb, ArrowRight, Star, TrendingUp, Award } from 'lucide-react';
import { useConsultation } from '@/components/contexts/consultation-context';

interface BenchmarkInputs {
  creativeProcessType: string;
  scriptsPerMonth: number;
  testingFrequency: string;
  performanceTracking: string;
  currentPerformance: string;
}

interface BenchmarkResults {
  maturityScore: number;
  industryPercentile: number;
  recommendedTier: string;
  gapAnalysis: string[];
  priorityActions: string[];
  competitiveAdvantage: string;
}

export function CreativeStrategyBenchmarkTool() {
  const { openModal: openConsultation } = useConsultation();
  const [inputs, setInputs] = useState<BenchmarkInputs>({
    creativeProcessType: '',
    scriptsPerMonth: 5,
    testingFrequency: '',
    performanceTracking: '',
    currentPerformance: ''
  });

  const [results, setResults] = useState<BenchmarkResults>({
    maturityScore: 0,
    industryPercentile: 0,
    recommendedTier: 'Concept Starter',
    gapAnalysis: [],
    priorityActions: [],
    competitiveAdvantage: 'Beginner'
  });

  const calculateBenchmark = (inputData: BenchmarkInputs) => {
    let maturityScore = 0;
    const gapAnalysis: string[] = [];
    const priorityActions: string[] = [];

    // Process Type Scoring (0-30 points)
    if (inputData.creativeProcessType === 'systematic') {
      maturityScore += 30;
    } else if (inputData.creativeProcessType === 'structured') {
      maturityScore += 20;
      gapAnalysis.push('Process systematization needed');
      priorityActions.push('Implement systematic creative development framework');
    } else if (inputData.creativeProcessType === 'ad-hoc') {
      maturityScore += 10;
      gapAnalysis.push('Creative process lacks structure');
      priorityActions.push('Establish structured creative workflow');
    } else {
      maturityScore += 5;
      gapAnalysis.push('No defined creative process');
      priorityActions.push('Build foundational creative strategy framework');
    }

    // Scripts Per Month Scoring (0-25 points)
    if (inputData.scriptsPerMonth >= 20) {
      maturityScore += 25;
    } else if (inputData.scriptsPerMonth >= 10) {
      maturityScore += 20;
    } else if (inputData.scriptsPerMonth >= 5) {
      maturityScore += 15;
      gapAnalysis.push('Limited creative output volume');
      priorityActions.push('Scale creative production to 10+ scripts monthly');
    } else {
      maturityScore += 10;
      gapAnalysis.push('Very low creative output');
      priorityActions.push('Increase creative output to minimum 5 scripts monthly');
    }

    // Testing Frequency Scoring (0-20 points)
    if (inputData.testingFrequency === 'continuous') {
      maturityScore += 20;
    } else if (inputData.testingFrequency === 'weekly') {
      maturityScore += 15;
    } else if (inputData.testingFrequency === 'monthly') {
      maturityScore += 10;
      gapAnalysis.push('Infrequent testing cycles');
      priorityActions.push('Implement weekly creative testing cycles');
    } else {
      maturityScore += 5;
      gapAnalysis.push('No systematic testing');
      priorityActions.push('Establish continuous creative testing process');
    }

    // Performance Tracking Scoring (0-15 points)
    if (inputData.performanceTracking === 'advanced') {
      maturityScore += 15;
    } else if (inputData.performanceTracking === 'basic') {
      maturityScore += 10;
      gapAnalysis.push('Limited performance analytics');
      priorityActions.push('Implement advanced creative performance tracking');
    } else {
      maturityScore += 5;
      gapAnalysis.push('No performance tracking');
      priorityActions.push('Set up creative performance measurement system');
    }

    // Current Performance Scoring (0-10 points)
    if (inputData.currentPerformance === 'excellent') {
      maturityScore += 10;
    } else if (inputData.currentPerformance === 'good') {
      maturityScore += 8;
    } else if (inputData.currentPerformance === 'average') {
      maturityScore += 6;
      gapAnalysis.push('Performance below potential');
      priorityActions.push('Optimize creative strategy for better performance');
    } else {
      maturityScore += 4;
      gapAnalysis.push('Poor creative performance');
      priorityActions.push('Immediate creative strategy overhaul needed');
    }

    // Calculate percentile
    let industryPercentile = 0;
    if (maturityScore >= 85) {
      industryPercentile = 95;
    } else if (maturityScore >= 75) {
      industryPercentile = 80;
    } else if (maturityScore >= 65) {
      industryPercentile = 65;
    } else if (maturityScore >= 50) {
      industryPercentile = 45;
    } else if (maturityScore >= 35) {
      industryPercentile = 25;
    } else {
      industryPercentile = 10;
    }

    // Determine competitive advantage level
    let competitiveAdvantage = 'Beginner';
    if (maturityScore >= 85) {
      competitiveAdvantage = 'Industry Leader';
    } else if (maturityScore >= 75) {
      competitiveAdvantage = 'Advanced Practitioner';
    } else if (maturityScore >= 65) {
      competitiveAdvantage = 'Competent Performer';
    } else if (maturityScore >= 50) {
      competitiveAdvantage = 'Developing Capability';
    } else {
      competitiveAdvantage = 'Beginner';
    }

    // Determine recommended tier
    let recommendedTier = 'Concept Starter';
    if (maturityScore >= 70) {
      recommendedTier = 'Performance Accelerator';
    } else if (maturityScore >= 50) {
      recommendedTier = 'Intelligence Accelerator';
    }

    return {
      maturityScore,
      industryPercentile,
      recommendedTier,
      gapAnalysis: gapAnalysis.slice(0, 3), // Limit to top 3 gaps
      priorityActions: priorityActions.slice(0, 3), // Limit to top 3 actions
      competitiveAdvantage
    };
  };

  useEffect(() => {
    const newResults = calculateBenchmark(inputs);
    setResults(newResults);
  }, [inputs]);

  const handleInputChange = (field: keyof BenchmarkInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return 'bg-green-100 text-green-800';
    if (percentile >= 65) return 'bg-blue-100 text-blue-800';
    if (percentile >= 45) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <BarChart3 className="h-4 w-4 mr-2" />
            Creative Strategy Benchmark Analysis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Analyze Your Creative Strategy Maturity
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Benchmark your current creative development process against industry leaders and 
            identify specific opportunities for acceleration with Apsics Media.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                Your Current Creative Process
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Creative Development Process
                  </label>
                  <select
                    value={inputs.creativeProcessType}
                    onChange={(e) => handleInputChange('creativeProcessType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select your process type</option>
                    <option value="none">No defined process</option>
                    <option value="ad-hoc">Ad-hoc creative development</option>
                    <option value="structured">Structured with templates</option>
                    <option value="systematic">Systematic methodology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scripts Developed Per Month
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={inputs.scriptsPerMonth}
                    onChange={(e) => handleInputChange('scriptsPerMonth', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1</span>
                    <span className="font-semibold">{inputs.scriptsPerMonth} scripts/month</span>
                    <span>30+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testing & Optimization Frequency
                  </label>
                  <select
                    value={inputs.testingFrequency}
                    onChange={(e) => handleInputChange('testingFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select testing frequency</option>
                    <option value="none">No systematic testing</option>
                    <option value="monthly">Monthly testing cycles</option>
                    <option value="weekly">Weekly testing cycles</option>
                    <option value="continuous">Continuous optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Performance Tracking Sophistication
                  </label>
                  <select
                    value={inputs.performanceTracking}
                    onChange={(e) => handleInputChange('performanceTracking', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select tracking level</option>
                    <option value="none">No performance tracking</option>
                    <option value="basic">Basic metrics (CTR, CPC)</option>
                    <option value="advanced">Advanced analytics & attribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Creative Performance
                  </label>
                  <select
                    value={inputs.currentPerformance}
                    onChange={(e) => handleInputChange('currentPerformance', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Rate your current performance</option>
                    <option value="poor">Below expectations</option>
                    <option value="average">Meeting basic goals</option>
                    <option value="good">Consistently strong results</option>
                    <option value="excellent">Industry-leading performance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                Your Benchmark Results
              </h3>

              <div className="space-y-6">
                {/* Maturity Score */}
                <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <div className={`text-4xl font-bold ${getScoreColor(results.maturityScore)} mb-2`}>
                    {results.maturityScore}/100
                  </div>
                  <div className="text-gray-800 font-semibold">Creative Strategy Maturity Score</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getPercentileColor(results.industryPercentile)}`}>
                    {results.industryPercentile}th percentile
                  </div>
                </div>

                {/* Competitive Advantage Level */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                    Competitive Advantage Level
                  </h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {results.competitiveAdvantage}
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on industry benchmarks and best practices
                  </div>
                </div>

                {/* Gap Analysis */}
                {results.gapAnalysis.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Top Strategic Gaps</h4>
                    <ul className="space-y-2">
                      {results.gapAnalysis.map((gap, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-red-500 mr-2">•</span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Priority Actions */}
                {results.priorityActions.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Priority Actions</h4>
                    <ul className="space-y-2">
                      {results.priorityActions.map((action, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <Star className="h-4 w-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 text-indigo-600 mr-2" />
                    Recommended Apsics Media Tier
                  </h4>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {results.recommendedTier}
                  </div>
                  <div className="text-sm text-gray-600">
                    Optimized for your current maturity level and growth potential
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start">
              <BarChart3 className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Benchmark Methodology
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This analysis evaluates your creative strategy across five key dimensions: process systematization, 
                  output volume, testing sophistication, performance tracking, and current results. Scores are calibrated 
                  against industry leaders and best practices from 10+ years of performance marketing experience.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Accelerate Your Creative Strategy?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Book a free consultation to get a personalized action plan for reaching the next 
                maturity level and outperforming your competition.
              </p>
              <button
                onClick={openConsultation}
                className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
              >
                <Target className="h-5 w-5 mr-2" />
                Get My Custom Strategy Plan
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <p className="text-sm mt-4 opacity-80">
                Free consultation • Custom action plan • 48-hour script acceleration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}