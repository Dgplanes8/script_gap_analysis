'use client';

import { useState } from 'react';
import { BarChart3, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface BenchmarkInputs {
  creativeTestingFrequency: string;
  attributionModel: string;
  customerResearch: string;
  creativeOptimization: string;
  performanceMeasurement: string;
  currentGrowthRate: string;
  industryType: string;
  companySize: string;
}

export function RevenueGrowthBenchmarkTool() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState<BenchmarkInputs>({
    creativeTestingFrequency: '',
    attributionModel: '',
    customerResearch: '',
    creativeOptimization: '',
    performanceMeasurement: '',
    currentGrowthRate: '',
    industryType: '',
    companySize: ''
  });

  const [results, setResults] = useState<{
    overallScore: number;
    categoryScores: {
      targeting: number;
      messaging: number;
      velocity: number;
      optimization: number;
    };
    benchmarkComparison: string;
    growthPotential: number;
    recommendations: string[];
    industryPosition: string;
  } | null>(null);

  const totalSteps = 8;

  const questions = [
    {
      id: 'creativeTestingFrequency',
      title: 'How frequently do you test new creative variations?',
      options: [
        { value: 'rarely', label: 'Rarely or never (0-2 per month)', score: 1 },
        { value: 'occasionally', label: 'Occasionally (3-5 per month)', score: 2 },
        { value: 'regularly', label: 'Regularly (6-10 per month)', score: 3 },
        { value: 'systematically', label: 'Systematically (15+ per month)', score: 4 }
      ]
    },
    {
      id: 'attributionModel',
      title: 'What attribution model do you use to measure creative performance?',
      options: [
        { value: 'none', label: 'No formal attribution tracking', score: 1 },
        { value: 'lastclick', label: 'Last-click attribution', score: 2 },
        { value: 'firstclick', label: 'First-click attribution', score: 2 },
        { value: 'multitouch', label: 'Multi-touch attribution modeling', score: 4 }
      ]
    },
    {
      id: 'customerResearch',
      title: 'How do you incorporate customer insights into creative development?',
      options: [
        { value: 'internal', label: 'Internal assumptions and opinions', score: 1 },
        { value: 'basic', label: 'Basic surveys or feedback forms', score: 2 },
        { value: 'interviews', label: 'Customer interviews and focus groups', score: 3 },
        { value: 'systematic', label: 'Systematic voice-of-customer research', score: 4 }
      ]
    },
    {
      id: 'creativeOptimization',
      title: 'How do you approach creative optimization?',
      options: [
        { value: 'intuition', label: 'Based on intuition and best practices', score: 1 },
        { value: 'basic', label: 'Basic A/B testing of headlines/images', score: 2 },
        { value: 'structured', label: 'Structured testing with control groups', score: 3 },
        { value: 'advanced', label: 'Advanced multivariate testing and personalization', score: 4 }
      ]
    },
    {
      id: 'performanceMeasurement',
      title: 'How do you measure creative strategy impact on revenue?',
      options: [
        { value: 'basic', label: 'Basic metrics (clicks, impressions)', score: 1 },
        { value: 'conversion', label: 'Conversion tracking and CAC measurement', score: 2 },
        { value: 'lifetime', label: 'LTV and cohort analysis', score: 3 },
        { value: 'predictive', label: 'Predictive modeling and revenue attribution', score: 4 }
      ]
    },
    {
      id: 'currentGrowthRate',
      title: 'What is your current monthly recurring revenue (MRR) growth rate?',
      options: [
        { value: 'negative', label: 'Negative or flat growth', score: 1 },
        { value: 'slow', label: '1-5% monthly growth', score: 2 },
        { value: 'moderate', label: '6-12% monthly growth', score: 3 },
        { value: 'fast', label: '13%+ monthly growth', score: 4 }
      ]
    },
    {
      id: 'industryType',
      title: 'What type of subscription business are you?',
      options: [
        { value: 'b2b-saas', label: 'B2B SaaS', score: 0 },
        { value: 'b2c-saas', label: 'B2C SaaS', score: 0 },
        { value: 'ecommerce', label: 'E-commerce subscription', score: 0 },
        { value: 'media', label: 'Media/Content subscription', score: 0 }
      ]
    },
    {
      id: 'companySize',
      title: 'What is your current ARR range?',
      options: [
        { value: 'early', label: 'Under $500K ARR', score: 0 },
        { value: 'growth', label: '$500K - $2M ARR', score: 0 },
        { value: 'scale', label: '$2M - $10M ARR', score: 0 },
        { value: 'enterprise', label: '$10M+ ARR', score: 0 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setInputs(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < totalSteps) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => calculateBenchmark(), 500);
    }
  };

  const calculateBenchmark = () => {
    const scores = questions.slice(0, 6).map(q => {
      const option = q.options.find(opt => opt.value === inputs[q.id as keyof BenchmarkInputs]);
      return option?.score || 1;
    });

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = 24;
    const overallScore = Math.round((totalScore / maxScore) * 100);

    // Calculate category scores
    const categoryScores = {
      targeting: Math.round(((scores[1] + scores[2]) / 8) * 100), // Attribution + Customer Research
      messaging: Math.round(((scores[2] + scores[3]) / 8) * 100), // Customer Research + Optimization
      velocity: Math.round(((scores[0] + scores[3]) / 8) * 100), // Testing Frequency + Optimization
      optimization: Math.round(((scores[3] + scores[4]) / 8) * 100) // Optimization + Measurement
    };

    // Determine benchmark comparison
    let benchmarkComparison = '';
    let industryPosition = '';
    if (overallScore >= 80) {
      benchmarkComparison = 'Top 10%';
      industryPosition = 'Industry Leader';
    } else if (overallScore >= 65) {
      benchmarkComparison = 'Top 25%';
      industryPosition = 'Above Average';
    } else if (overallScore >= 45) {
      benchmarkComparison = 'Average';
      industryPosition = 'Industry Average';
    } else {
      benchmarkComparison = 'Below Average';
      industryPosition = 'Significant Opportunity';
    }

    // Calculate growth potential
    const currentGrowthScore = scores[5];
    const growthPotential = Math.round((4 - currentGrowthScore) * 100 + overallScore);

    // Generate recommendations
    const recommendations = [];
    if (scores[0] < 3) recommendations.push("Implement systematic creative testing (target 15+ variants/month)");
    if (scores[1] < 3) recommendations.push("Upgrade to multi-touch attribution modeling");
    if (scores[2] < 3) recommendations.push("Develop voice-of-customer research program");
    if (scores[3] < 3) recommendations.push("Build structured A/B testing framework");
    if (scores[4] < 3) recommendations.push("Implement revenue attribution and LTV analysis");
    if (recommendations.length === 0) recommendations.push("Focus on advanced personalization and predictive modeling");

    setResults({
      overallScore,
      categoryScores,
      benchmarkComparison,
      growthPotential,
      recommendations,
      industryPosition
    });
  };

  const currentQuestion = questions[currentStep - 1];

  if (results) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4 mr-2" />
            Your Benchmark Results
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Creative Strategy Performance Analysis
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Overall Score */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="50"
                  stroke="#E5E7EB" strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60" cy="60" r="50"
                  stroke="#10B981" strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${results.overallScore * 3.14} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{results.overallScore}</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-emerald-600">{results.benchmarkComparison}</div>
              <div className="text-sm text-gray-600">{results.industryPosition}</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Category Performance</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Audience Targeting</span>
                  <span>{results.categoryScores.targeting}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${results.categoryScores.targeting}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Message Resonance</span>
                  <span>{results.categoryScores.messaging}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${results.categoryScores.messaging}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Creative Velocity</span>
                  <span>{results.categoryScores.velocity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${results.categoryScores.velocity}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Performance Optimization</span>
                  <span>{results.categoryScores.optimization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${results.categoryScores.optimization}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Potential */}
        <div className="bg-emerald-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold mb-4 text-emerald-800 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Revenue Growth Potential
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                {results.growthPotential}% Improvement Potential
              </div>
              <p className="text-emerald-700 text-sm">
                Based on optimization opportunities identified in your creative strategy
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-emerald-700">Projected improvements:</div>
              <ul className="text-sm text-emerald-600 space-y-1">
                <li>• 25-40% increase in conversion rates</li>
                <li>• 20-35% reduction in CAC</li>
                <li>• 15-25% faster revenue growth</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold mb-4 text-blue-800 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Priority Recommendations
          </h4>
          <ul className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start text-sm text-blue-800">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">
                  {index + 1}
                </div>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Industry Comparison */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold mb-4 text-gray-800">Industry Comparison</h4>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-red-600">Bottom 25%</div>
              <div className="text-sm text-gray-600">Score: 0-40</div>
              <div className="text-xs text-gray-500">Ad-hoc approach</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">Average</div>
              <div className="text-sm text-gray-600">Score: 41-65</div>
              <div className="text-xs text-gray-500">Basic optimization</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">Top 25%</div>
              <div className="text-sm text-gray-600">Score: 66-100</div>
              <div className="text-xs text-gray-500">Systematic approach</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              results.overallScore >= 66 ? 'bg-green-100 text-green-800' :
              results.overallScore >= 41 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              Your Position: {results.benchmarkComparison}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 text-center">
          <h4 className="font-semibold mb-2 text-white">Ready to Optimize Your Creative Strategy?</h4>
          <p className="text-blue-100 text-sm mb-4">
            Get a personalized growth strategy session to implement these recommendations
          </p>
          <ConsultationBookingCTA 
            variant="secondary"
            text="Book Free Growth Strategy Session"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
          <BarChart3 className="h-4 w-4 mr-2" />
          Creative Strategy Benchmark
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Question {currentStep} of {totalSteps}
        </h3>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {currentQuestion && (
        <div className="max-w-2xl mx-auto">
          <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQuestion.title}
          </h4>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all duration-200 flex items-center justify-between"
              >
                <span className="text-gray-800">{option.label}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This assessment takes about 2 minutes to complete</p>
      </div>
    </div>
  );
}