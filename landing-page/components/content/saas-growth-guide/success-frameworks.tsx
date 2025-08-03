'use client';

const caseStudyResults = [
  {
    company: 'B2B Analytics Platform',
    challenge: 'Over-reliance on paid search with increasing costs',
    solution: 'Diversified into content marketing and product-led growth',
    results: {
      cacReduction: '35%',
      channelDiversification: '5 channels',
      growthRate: '+127% MRR'
    }
  },
  {
    company: 'Marketing Automation SaaS',
    challenge: 'Low trial-to-paid conversion and poor attribution',
    solution: 'Implemented funnel optimization and attribution system',
    results: {
      conversionImprovement: '+89%',
      attributionAccuracy: '92%',
      roiImprovement: '+156%'
    }
  },
  {
    company: 'Enterprise CRM Platform', 
    challenge: 'Long sales cycles and complex buying committees',
    solution: 'Built account-based marketing system with multi-touch nurturing',
    results: {
      salesCycleReduction: '28%',
      dealSizeIncrease: '+67%',
      winRateImprovement: '+43%'
    }
  }
];

export function SuccessFrameworks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Channel Optimization Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Real results from SaaS companies that optimized their growth channels
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudyResults.map((study, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{study.company}</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                <p className="text-gray-700 text-sm">{study.challenge}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                <p className="text-gray-700 text-sm">{study.solution}</p>
              </div>
              
              <div className="space-y-3">
                {Object.entries(study.results).map(([key, value], resultIndex) => (
                  <div key={resultIndex} className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className="text-lg font-bold text-emerald-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}