'use client';

import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyProps {
  client: string;
  category: string;
  spend: string;
  improvement: string;
  metric: string;
  description: string;
  highlight?: boolean;
}

function CaseStudyCard({ client, category, spend, improvement, metric, description, highlight = false }: CaseStudyProps) {
  return (
    <div className={`rounded-2xl p-8 ${highlight ? 'bg-gradient-to-br from-brand-600 to-brand-700 text-white' : 'bg-white shadow-lg border border-gray-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>
            {client}
          </h3>
          <p className={`text-sm ${highlight ? 'text-brand-100' : 'text-gray-600'}`}>
            {category}
          </p>
        </div>
        <div className={`p-3 rounded-full ${highlight ? 'bg-white/20' : 'bg-brand-100'}`}>
          <TrendingUp className={`h-6 w-6 ${highlight ? 'text-white' : 'text-brand-600'}`} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-brand-600'}`}>
            {spend}
          </div>
          <div className={`text-sm ${highlight ? 'text-brand-100' : 'text-gray-600'}`}>
            Spent on our scripts
          </div>
        </div>
        <div>
          <div className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-green-600'}`}>
            {improvement}
          </div>
          <div className={`text-sm ${highlight ? 'text-brand-100' : 'text-gray-600'}`}>
            {metric} improvement
          </div>
        </div>
      </div>
      
      <p className={`${highlight ? 'text-brand-50' : 'text-gray-700'} mb-6`}>
        {description}
      </p>
      
      <div className={`text-sm ${highlight ? 'text-brand-100' : 'text-gray-500'}`}>
        "The customer-language hooks from Monday Morning Marketer completely transformed our ad performance."
      </div>
    </div>
  );
}

interface CaseStudiesSectionProps {
  className?: string;
}

export function CaseStudiesSection({ className = '' }: CaseStudiesSectionProps) {
  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how fitness and sports apps like yours used our customer-language hooks to dramatically improve their ad performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <CaseStudyCard
            client="FitTracker Pro"
            category="Fitness Tracking App"
            spend="$127K"
            improvement="+42%"
            metric="CTR"
            description="Struggled with generic fitness messaging. Our review-based hooks tapped into their users' real motivations around accountability and progress tracking."
            highlight={true}
          />
          
          <CaseStudyCard
            client="SportSync"
            category="Sports Community App"
            spend="$89K"
            improvement="+38%"
            metric="CVR"
            description="Their ads weren't resonating with serious athletes. We mined Reddit discussions to find the exact language competitive sports enthusiasts use."
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <CaseStudyCard
            client="Yoga Journey"
            category="Wellness App"
            spend="$156K"
            improvement="+51%"
            metric="TSR"
            description="Generic wellness messaging wasn't converting. Our customer-language approach revealed users' specific pain points around consistency and motivation."
          />
          
          <CaseStudyCard
            client="RunBuddy"
            category="Running App"
            spend="$203K"
            improvement="+29%"
            metric="CPA reduction"
            description="High acquisition costs were killing their growth. Review-based hooks that spoke to runners' real challenges dropped their CPA significantly."
          />
        </div>
        
        <div className="text-center">
          <Link
            href="/get-featured"
            className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors"
          >
            Want to be our next success story?
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}