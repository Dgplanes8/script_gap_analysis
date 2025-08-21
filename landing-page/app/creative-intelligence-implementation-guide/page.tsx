import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Calendar, Users, Target, BarChart3, FileText, Settings, Clock, Zap, Brain, TrendingUp, Download, BookOpen, PlayCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creative Intelligence Implementation Guide: Step-by-Step Setup for Subscription Businesses | Apsics Media',
  description: 'Complete implementation guide for weekly creative intelligence methodology. Templates, workflows, and systems for subscription business growth teams to systematically improve campaign performance.',
  keywords: 'creative intelligence implementation, weekly creative workflow, subscription marketing implementation, creative team workflow, marketing operations setup, creative process optimization',
  openGraph: {
    title: 'Creative Intelligence Implementation Guide: Step-by-Step Setup for Subscription Businesses',
    description: 'Complete implementation guide for weekly creative intelligence methodology. Templates and workflows for systematic campaign improvement.',
    type: 'article',
  },
  alternates: {
    canonical: '/creative-intelligence-implementation-guide',
  },
};

// Implementation phases
const implementationPhases = [
  {
    phase: 'Week 1-2',
    title: 'Foundation Setup',
    description: 'Establish baseline systems and team alignment',
    duration: '2 weeks',
    effort: 'High',
    tasks: [
      'Audit current creative development process',
      'Install performance tracking and analytics systems',
      'Create baseline performance benchmarks',
      'Train team on 25-point scoring methodology',
      'Set up weekly review and planning meetings'
    ],
    deliverables: [
      'Current state assessment document',
      'Performance baseline report',
      'Team training completion',
      'Weekly meeting calendar established'
    ],
    tools: ['Performance tracking dashboard', 'Team training materials', 'Baseline assessment template']
  },
  {
    phase: 'Week 3-4',
    title: 'Framework Integration',
    description: 'Implement core creative intelligence frameworks',
    duration: '2 weeks',
    effort: 'Medium',
    tasks: [
      'Deploy hook generation methodology',
      'Implement creative brief framework',
      'Set up competitive monitoring system',
      'Create hook library and template repository',
      'Begin weekly trend intelligence gathering'
    ],
    deliverables: [
      'Hook generation system operational',
      'Creative brief templates in use',
      'Competitive monitoring dashboard',
      'Initial hook library (20+ hooks)'
    ],
    tools: ['Hook frameworks', 'Brief templates', 'Competitive analysis tools', 'Content repository']
  },
  {
    phase: 'Week 5-6',
    title: 'Process Optimization',
    description: 'Refine workflows and establish performance patterns',
    duration: '2 weeks',
    effort: 'Medium',
    tasks: [
      'Optimize weekly creative workflow',
      'Implement fatigue prevention protocols',
      'Establish A/B testing procedures',
      'Create performance optimization playbooks',
      'Set up automated reporting systems'
    ],
    deliverables: [
      'Optimized weekly workflow',
      'Fatigue prevention system active',
      'A/B testing protocols documented',
      'Automated performance reports'
    ],
    tools: ['Workflow optimization templates', 'A/B testing frameworks', 'Automated reporting tools']
  },
  {
    phase: 'Week 7-8',
    title: 'Scale & Systematize',
    description: 'Scale successful approaches and systematize learnings',
    duration: '2 weeks',
    effort: 'Low',
    tasks: [
      'Scale winning creative approaches',
      'Document standard operating procedures',
      'Train additional team members',
      'Establish continuous improvement process',
      'Create knowledge management system'
    ],
    deliverables: [
      'Scaled creative production',
      'Complete SOP documentation',
      'Team training materials',
      'Continuous improvement process'
    ],
    tools: ['SOP templates', 'Training materials', 'Knowledge management system']
  }
];

// Weekly workflow template
const weeklyWorkflow = [
  {
    day: 'Monday',
    title: 'Intelligence Gathering & Planning',
    timeAllocation: '2-3 hours',
    activities: [
      'Review performance data from previous week',
      'Analyze competitive landscape changes',
      'Identify trending topics and cultural moments',
      'Plan creative concepts for the week',
      'Update hook library with new variations'
    ],
    deliverables: ['Weekly performance report', 'Trend intelligence summary', 'Creative concept briefs'],
    responsibilities: 'Creative strategist, performance analyst'
  },
  {
    day: 'Tuesday',
    title: 'Creative Development',
    timeAllocation: '4-5 hours',
    activities: [
      'Generate hooks using systematic frameworks',
      'Create creative briefs for new concepts',
      'Develop script variations for top performers',
      'Score all creative using 25-point system',
      'Plan A/B testing strategy'
    ],
    deliverables: ['New hook variations (8-12)', 'Creative briefs', 'Performance scores', 'Testing plan'],
    responsibilities: 'Creative team, copywriters'
  },
  {
    day: 'Wednesday',
    title: 'Production & Deployment',
    timeAllocation: '3-4 hours',
    activities: [
      'Produce creative assets (video, image, copy)',
      'Review and approve final creative',
      'Deploy campaigns across platforms',
      'Set up tracking and monitoring',
      'Document creative specifications'
    ],
    deliverables: ['Finished creative assets', 'Campaign deployment', 'Tracking setup'],
    responsibilities: 'Production team, media buyers'
  },
  {
    day: 'Thursday',
    title: 'Monitoring & Optimization',
    timeAllocation: '1-2 hours',
    activities: [
      'Monitor early performance indicators',
      'Identify optimization opportunities',
      'Adjust budgets and targeting',
      'Document performance patterns',
      'Plan mid-week optimizations'
    ],
    deliverables: ['Performance monitoring report', 'Optimization recommendations'],
    responsibilities: 'Performance analyst, media buyers'
  },
  {
    day: 'Friday',
    title: 'Analysis & Learning',
    timeAllocation: '2-3 hours',
    activities: [
      'Comprehensive week performance analysis',
      'Update performance scoring accuracy',
      'Document lessons learned',
      'Plan next week strategy',
      'Update templates and frameworks'
    ],
    deliverables: ['Weekly analysis report', 'Updated frameworks', 'Next week strategy'],
    responsibilities: 'Full creative team'
  }
];

// Team roles and responsibilities
const teamRoles = [
  {
    role: 'Creative Strategist',
    responsibility: 'Framework oversight and strategic direction',
    weeklyHours: '8-10 hours',
    keyTasks: [
      'Trend intelligence gathering and analysis',
      'Competitive landscape monitoring',
      'Strategic framework development',
      'Performance pattern analysis',
      'Team training and development'
    ],
    skills: ['Strategic thinking', 'Trend analysis', 'Framework development', 'Team leadership']
  },
  {
    role: 'Performance Copywriter',
    responsibility: 'Hook and script development using frameworks',
    weeklyHours: '12-15 hours',
    keyTasks: [
      'Generate hooks using systematic frameworks',
      'Create script variations for testing',
      'Score creative using 25-point system',
      'Optimize copy based on performance data',
      'Maintain hook library and templates'
    ],
    skills: ['Direct response copywriting', 'Framework application', 'Performance analysis', 'A/B testing']
  },
  {
    role: 'Creative Producer',
    responsibility: 'Asset production and quality control',
    weeklyHours: '10-12 hours',
    keyTasks: [
      'Produce video and image assets',
      'Ensure brand consistency and quality',
      'Manage production timelines',
      'Coordinate with external vendors',
      'Maintain asset library organization'
    ],
    skills: ['Video production', 'Design systems', 'Project management', 'Brand guidelines']
  },
  {
    role: 'Performance Analyst',
    responsibility: 'Data analysis and optimization recommendations',
    weeklyHours: '6-8 hours',
    keyTasks: [
      'Track and analyze campaign performance',
      'Generate weekly performance reports',
      'Identify optimization opportunities',
      'Validate scoring system accuracy',
      'Provide data-driven recommendations'
    ],
    skills: ['Data analysis', 'Performance marketing', 'Reporting tools', 'Statistical analysis']
  }
];

export default function CreativeIntelligenceImplementationGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Creative Intelligence Implementation Guide: Step-by-Step Setup for Subscription Businesses",
            "description": "Complete implementation guide for weekly creative intelligence methodology. Templates and workflows for systematic campaign improvement.",
            "author": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Settings className="h-4 w-4 mr-2" />
              IMPLEMENTATION FRAMEWORK
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Creative Intelligence Implementation Guide
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Complete step-by-step guide for implementing weekly creative intelligence methodology. 
              Templates, workflows, and systems for systematic performance improvement.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Calendar className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">8 Weeks</div>
                <div className="text-green-200 text-sm">Complete implementation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">4 Roles</div>
                <div className="text-green-200 text-sm">Team structure</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25-40%</div>
                <div className="text-green-200 text-sm">Performance improvement</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const implementationSection = document.getElementById('implementation-phases');
                  if (implementationSection) {
                    implementationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Implementation
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Learn Methodology
                <BookOpen className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Implementation Assessment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pre-Implementation Readiness Assessment
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Before implementing creative intelligence methodology, assess your team's readiness 
                and establish clear success metrics for systematic performance improvement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Team Readiness Checklist</h3>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-start">
                      <input type="checkbox" className="mr-3 mt-1 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Creative Team Capacity</div>
                        <div className="text-gray-600">Dedicated 15-20 hours/week for creative development and optimization</div>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mr-3 mt-1 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Performance Tracking Setup</div>
                        <div className="text-gray-600">Analytics systems capable of tracking conversion metrics and campaign performance</div>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mr-3 mt-1 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Stakeholder Buy-In</div>
                        <div className="text-gray-600">Leadership commitment to 8-week implementation timeline and methodology adoption</div>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mr-3 mt-1 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Budget Allocation</div>
                        <div className="text-gray-600">Testing budget of at least $5K/month for systematic A/B testing and optimization</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Success Metrics Definition</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-semibold text-gray-900">Click-Through Rate (CTR):</span>
                      <span className="text-gray-600">Target +25% improvement</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-semibold text-gray-900">Conversion Rate (CVR):</span>
                      <span className="text-gray-600">Target +30% improvement</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-semibold text-gray-900">Cost Per Acquisition (CAC):</span>
                      <span className="text-gray-600">Target -25% reduction</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-semibold text-gray-900">Creative Testing Velocity:</span>
                      <span className="text-gray-600">Target 3x faster iteration</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-semibold text-gray-900">Hook Performance Score:</span>
                      <span className="text-gray-600">Target 21+ average score</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Common Implementation Challenges & Solutions
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge: Team Resistance to Systematic Approach</h4>
                    <div className="text-sm text-gray-600 mb-3">
                      Creative teams may resist framework-based approach, preferring intuitive creative development.
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-orange-800">Solution:</span> Start with pilot project showcasing performance improvements, 
                      emphasize frameworks enhance rather than replace creativity.
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge: Insufficient Performance Data</h4>
                    <div className="text-sm text-gray-600 mb-3">
                      Limited historical data makes it difficult to establish baselines and measure improvement.
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-orange-800">Solution:</span> Implement tracking systems immediately, 
                      use industry benchmarks as initial comparison points, focus on relative improvements.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section id="implementation-phases" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Implementation Roadmap
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to implementing creative intelligence methodology with clear milestones, 
              deliverables, and success criteria for each phase.
            </p>
            
            <div className="space-y-8">
              {implementationPhases.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm font-semibold text-green-600 mb-1">{phase.phase}</div>
                          <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                          <p className="text-gray-600">{phase.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-500">Duration: {phase.duration}</div>
                          <div className="text-sm text-gray-500">Effort: {phase.effort}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Tasks</h4>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-start text-sm">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Required Tools</h4>
                      <ul className="space-y-2">
                        {phase.tools.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-start text-sm">
                            <Settings className="h-4 w-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Workflow */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Weekly Creative Intelligence Workflow
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Structured weekly workflow ensuring consistent creative development, optimization, 
              and performance improvement. Designed for sustainable team execution.
            </p>
            
            <div className="space-y-6">
              {weeklyWorkflow.map((day, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                          {index + 1}
                        </div>
                        <h3 className="font-bold text-gray-900">{day.day}</h3>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{day.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">Time: {day.timeAllocation}</div>
                      <div className="text-xs text-gray-500">{day.responsibilities}</div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Activities</h5>
                      <ul className="space-y-1">
                        {day.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="text-xs text-gray-600 flex items-start">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Deliverables</h5>
                      <ul className="space-y-1">
                        {day.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="text-xs text-gray-600 flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center">
                        {index === 0 && <Brain className="h-8 w-8 text-green-600" />}
                        {index === 1 && <Zap className="h-8 w-8 text-green-600" />}
                        {index === 2 && <PlayCircle className="h-8 w-8 text-green-600" />}
                        {index === 3 && <BarChart3 className="h-8 w-8 text-green-600" />}
                        {index === 4 && <TrendingUp className="h-8 w-8 text-green-600" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Optimal Team Structure & Roles
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Define clear roles and responsibilities for creative intelligence implementation. 
              Scale team structure based on organization size and campaign volume.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {teamRoles.map((role, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{role.role}</h3>
                      <p className="text-sm text-gray-600">{role.responsibility}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Weekly Commitment: {role.weeklyHours}</div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Tasks</h4>
                    <ul className="space-y-1">
                      {role.keyTasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-xs text-gray-600 flex items-start">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates & Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Implementation Templates & Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Download className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Setup Templates</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Implementation Checklist</h4>
                    <p className="text-xs text-gray-600">Complete task list for 8-week implementation</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Team Training Materials</h4>
                    <p className="text-xs text-gray-600">Onboarding guide for methodology adoption</p>
                  </div>
                  
                  <Link 
                    href="/creative-brief-framework"
                    className="block p-3 bg-white rounded-lg border hover:border-green-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Creative Brief Templates</h4>
                    <p className="text-xs text-gray-600">Strategic frameworks for consistent briefing</p>
                  </Link>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Performance Tracking Dashboard</h4>
                    <p className="text-xs text-gray-600">Analytics setup and KPI monitoring</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Process Documentation</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Weekly Workflow SOP</h4>
                    <p className="text-xs text-gray-600">Standard operating procedures for team execution</p>
                  </div>
                  
                  <Link 
                    href="/hook-generator"
                    className="block p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Hook Generation Guide</h4>
                    <p className="text-xs text-gray-600">Systematic methodology for creating high-converting hooks</p>
                  </Link>
                  
                  <Link 
                    href="/25-point-performance-scoring-system"
                    className="block p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Performance Scoring Manual</h4>
                    <p className="text-xs text-gray-600">Complete guide to 25-point evaluation system</p>
                  </Link>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Troubleshooting Guide</h4>
                    <p className="text-xs text-gray-600">Common issues and solutions during implementation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Creative Intelligence Implementation
            </h2>
            
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Transform your creative development process with systematic methodology. 
              Complete templates, workflows, and support for 25-40% performance improvement.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Settings className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">Complete Framework</div>
                <div className="text-green-200 text-sm">8-week implementation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <FileText className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">Ready Templates</div>
                <div className="text-green-200 text-sm">All documents included</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">Proven Results</div>
                <div className="text-green-200 text-sm">25-40% improvement</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const emailSection = document.getElementById('email-signup');
                  if (emailSection) {
                    emailSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Implementation Package
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Weekly Intelligence
                <Calendar className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Creative Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete strategic methodology guide for systematic creative development and optimization
                </p>
              </Link>
              
              <Link 
                href="/creative-fatigue-prevention-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Creative Fatigue Prevention</h3>
                <p className="text-sm text-gray-600">
                  Systematic framework for preventing audience saturation and maintaining performance
                </p>
              </Link>
              
              <Link 
                href="/52-high-converting-ad-hooks-library"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">High-Converting Hooks Library</h3>
                <p className="text-sm text-gray-600">
                  52 performance-scored hooks with strategic analysis and implementation examples
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}