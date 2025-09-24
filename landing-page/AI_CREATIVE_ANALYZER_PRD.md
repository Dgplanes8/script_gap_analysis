# AI Creative Analyzer PRD

## Overview

The AI Creative Analyzer provides professional-grade creative scoring and analysis using APSICS Media's proven performance frameworks. Brands and agencies can upload their ad creative or provide social media URLs to receive a comprehensive 25-point analysis based on direct response legends' methodologies.

This tool solves the critical need for objective creative evaluation before launch, helping marketers identify strengths and weaknesses in their ad creative using the same frameworks that drive APSICS' $250M+ performance intelligence.

## Problem Statement

### Current Pain Points:
- **Subjective Creative Evaluation**: Internal teams lack objective frameworks for scoring creative quality
- **Performance Prediction Gaps**: No reliable way to predict ad performance before spending budget
- **Strategic Blind Spots**: Missing critical elements that separate high-performing from mediocre creative
- **Expensive Expert Analysis**: Agency creative audits cost $3K-10K with weeks of turnaround
- **Post-Launch Learning**: Discovering creative weaknesses only after poor performance

### Quantified Impact:
- 70% of ad creative fails to meet performance benchmarks
- Average $15K wasted per campaign on underperforming creative
- 3-4 week delays waiting for expert creative feedback
- 40% of marketing budgets allocated to creative that scores below 15/25

## Solution

A specialized AI analysis tool powered by Gemini 2.0 Flash that evaluates ad creative using the proven "Ad Crucible" scoring framework, delivering professional-grade analysis in under 60 seconds.

### Core Capabilities:
- **25-Point Scoring System**: Five categories worth 5 points each based on direct response frameworks
- **Multi-Format Analysis**: Static images, videos, and social media posts
- **Expert-Level Evaluation**: Analysis quality matching $10K agency audits
- **Instant Results**: Complete scoring and rationale in under 60 seconds

### Input Methods:
1. **File Upload**: Direct creative asset upload (images/videos)
2. **Social Media URL**: Extract and analyze ads from Facebook, Instagram, TikTok
3. **Competitor Blocking**: Prevent analysis of non-owned content

## Target Users

### Primary Audience:
- **Brand Marketers** (1-50M revenue) who need objective creative evaluation
- **Marketing Agencies** analyzing client creative before launch
- **Creative Directors** seeking performance-based feedback frameworks
- **Performance Marketers** optimizing creative for specific KPIs

### Secondary Audience:
- **Freelance Creatives** wanting to improve their work quality
- **Marketing Consultants** providing strategic creative guidance
- **In-house Teams** without access to senior creative strategy expertise

## Core Features

### AI-Powered Scoring Framework

#### Five Evaluation Categories (5 points each):

**1. Foundational Insight & Research (5 pts)**
- Evaluates depth of audience understanding and pain point targeting
- Assesses use of customer language and emotional resonance
- Identifies Golden Pain Bank and Dream Outcome alignment

**2. Strategic Concept & Angle (5 pts)**
- Analyzes target persona clarity and core emotion targeting
- Evaluates Life Force 8 drivers and awareness level appropriateness
- Assesses format choice and market gap exploitation

**3. Headline & Hook Potency (5 pts)**
- Tests scroll-stopping power and curiosity generation
- Evaluates benefit clarity and platform-native delivery
- Applies the "Punch Test" framework for effectiveness

**4. Copywriting & Emotional Resonance (5 pts)**
- Analyzes language power and visceral impact
- Evaluates emotional appeal and mind movie creation
- Assesses benefit focus vs feature listing

**5. Platform-Native Execution (5 pts)**
- Evaluates platform-specific optimization
- Analyzes tone, pacing, and visual style appropriateness
- Assesses organic vs advertisement feel

### Content Processing Pipeline

#### File Upload Processing:
- **Supported Formats**: JPG, PNG, WebP (max 10MB), MP4, MOV, WebM (max 50MB)
- **AI Analysis**: Gemini 2.0 Flash direct processing
- **Content Extraction**: OCR, audio transcription, visual analysis

#### Social Media URL Processing:
- **Platform Support**: Facebook, Instagram, TikTok URLs
- **Content Extraction**: Download and format for Gemini analysis
- **Competitor Filtering**: Block non-owned content analysis

### Analysis Output

#### Structured Scoring Report:
```
The Crucible Scorecard
Final Score: [X]/25

1. Foundational Insight & Research: [X]/5
Rationale: [Analysis based on Golden Pain Bank, Dream Outcomes, customer language]

2. Strategic Concept & Angle: [X]/5
Rationale: [Analysis of avatar clarity, emotion targeting, LFE8, format choice]

3. Headline & Hook Potency: [X]/5
Rationale: [Punch Test evaluation, curiosity, benefit clarity, platform delivery]

4. Copywriting & Emotional Resonance: [X]/5
Rationale: [Language power, emotional appeal, visceral descriptions]

5. Platform-Native Execution: [X]/5
Rationale: [Platform optimization, tone/pacing, organic vs ad feel]

Overall Legendary Feedback & Analysis
[Expert-level summary highlighting biggest strength, biggest weakness, and strategic insights]
```

## User Journey

### Primary Flow:
1. **Landing**: Value proposition and analysis options
2. **Input Selection**: Choose upload vs URL method
3. **Content Upload**: File upload or social media URL input
4. **Ownership Confirmation**: Verify content ownership (competitor blocking)
5. **Analysis Processing**: Gemini 2.0 Flash evaluation (45-60 seconds)
6. **Scoring Results**: Complete 25-point breakdown with rationales
7. **Export Options**: Copy results, email delivery, save for reference

### Form State:
```typescript
type AnalysisFormState = {
  inputMethod: 'upload' | 'url';
  file?: File;
  url?: string;
  companyName: string;
  contentOwnership: boolean; // Confirms user owns the content
  additionalContext?: string; // Optional context about the ad
}
```

## Technical Implementation

### AI Integration via OpenRouter

#### Model Selection:
- **Primary Model**: `google/gemini-2.0-flash-exp:free` for multimodal analysis
- **Cost Advantage**: Free tier model for maximum cost efficiency
- **Performance**: Maintains quality while eliminating per-analysis costs

### Edge Function Structure:
```typescript
// supabase/functions/analyze-creative/index.ts
export default async function(req) {
  // 1. Validate input and check credits
  const { assetUrl, companyName, contentOwnership } = await req.json();

  // 2. Competitor content blocking
  if (!contentOwnership) {
    return { error: "Analysis limited to owned content only" };
  }

  // 3. Build analysis prompt using ad_tool_analysis_prompt.md
  const prompt = buildAnalysisPrompt({ companyName });

  // 4. Single OpenRouter call to Gemini
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", url: assetUrl } // or video
        ]
      }],
      max_tokens: 1500
    })
  });

  // 5. Return structured analysis
  return response.json();
}
```

### Form Fields:

```typescript
[
  {
    key: 'inputMethod',
    label: 'Analysis Method',
    type: 'select',
    required: true,
    options: [
      { value: 'upload', label: 'Upload Creative File' },
      { value: 'url', label: 'Social Media URL' },
    ],
  },
  {
    key: 'companyName',
    label: 'Your Company/Brand Name',
    type: 'text',
    placeholder: 'e.g. APSICS Media',
    required: true,
  },
  {
    key: 'file',
    label: 'Upload Creative Asset',
    type: 'file',
    accept: 'image/*,video/*',
    required: true, // when inputMethod === 'upload'
  },
  {
    key: 'url',
    label: 'Social Media Post URL',
    type: 'url',
    placeholder: 'https://www.instagram.com/p/...',
    required: true, // when inputMethod === 'url'
  },
  {
    key: 'contentOwnership',
    label: 'Content Ownership Confirmation',
    type: 'checkbox',
    required: true,
    description: 'I confirm this is my company\'s creative content',
  },
  {
    key: 'additionalContext',
    label: 'Additional Context',
    type: 'textarea',
    placeholder: 'Any specific details about the campaign, target audience, or objectives',
    rows: 3,
    optional: true,
  },
]
```

## Template Configuration

Add to `lib/template-configs.ts`:

```typescript
'ai-creative-analyzer': {
  template: {
    header: {
      title: 'Get professional creative analysis in 60 seconds',
      subtitle: 'Upload your ad creative or social media URL to receive a comprehensive 25-point analysis using proven direct response frameworks.',
      badgeText: 'APSICS Creative Intelligence',
    },
    sections: {
      showFoundersClub: true,
      showProcessSection: true,
      showPricingSection: true,
    },
    exitIntent: {
      title: 'Download Our Creative Scoring Framework',
      subtitle: 'Get the same 25-point analysis framework used by top performance marketers.',
    },
  },
  form: {
    title: 'Analyze your creative performance potential',
    description: 'Upload your ad creative or provide a social media URL. Our AI will evaluate it using the same frameworks that drive $250M+ in ad performance.',
    submitButtonText: 'Analyze Creative',
    highlights: [
      {
        title: 'Expert-level analysis',
        description: 'Professional creative evaluation matching $10K agency audits in under 60 seconds.',
        variant: 'primary',
      },
      {
        title: 'Performance prediction',
        description: 'Identify creative strengths and weaknesses before spending your media budget.',
        variant: 'success',
      },
    ],
    freePlan: {
      title: 'Creative analysis plan',
      features: [
        '1 complete analysis without signup',
        '+3 additional analyses with free account',
        'Upgrade for unlimited creative scoring',
      ],
      note: 'Professional scoring framework based on $250M+ performance data.',
    },
  },
  fields: [
    // Fields from above configuration
  ],
  foundersClub: {
    badge: 'Creative Pro Access',
    title: 'Unlock unlimited creative analysis for $20/month',
    description: 'Get unlimited creative scoring, priority processing, and exclusive access to our creative performance database.',
    ctaText: 'Upgrade to Creative Pro',
    ctaHref: '/#service-tiers',
    footerText: 'Includes performance benchmarking and competitive analysis features.',
  },
  process: {
    title: 'How we score creative like the legends',
    description: 'Every analysis applies proven frameworks from direct response masters like Eugene Schwartz, David Ogilvy, and Gary Halbert.',
    highlights: [
      {
        title: 'Foundational research',
        description: 'Evaluate audience insight depth and emotional pain point targeting.',
      },
      {
        title: 'Strategic framework',
        description: 'Analyze concept clarity, format choice, and market positioning.',
        variant: 'gradient',
      },
      {
        title: 'Hook potency',
        description: 'Test scroll-stopping power and platform-native delivery effectiveness.',
      },
      {
        title: 'Performance prediction',
        description: 'Score based on proven elements that drive conversion and engagement.',
      },
    ],
    showAccordion: true,
  },
  secondaryHeader: {
    links: [
      { label: 'Overview', href: '#overview' },
      { label: 'Scoring', href: '#workflow' },
      { label: 'Pricing', href: '#service-tiers' },
    ],
    ctaHref: '#service-tiers',
    ctaLabel: 'Start Analysis',
  },
}
```

## Prompt Integration

### Analysis Prompt Strategy:
- **Source**: Use `ad_tool_analysis_prompt.md` exactly as provided
- **Context Injection**: Add company name and additional context to prompt
- **Structured Output**: Ensure Gemini follows the exact scoring format
- **Consistency**: Maintain scoring criteria across all analyses

### Prompt Enhancement:
```typescript
function buildAnalysisPrompt(context: { companyName: string; additionalContext?: string }) {
  const basePrompt = readPromptFile('ad_tool_analysis_prompt.md');

  const contextualPrompt = `
${basePrompt}

ANALYSIS CONTEXT:
Company/Brand: ${context.companyName}
${context.additionalContext ? `Additional Context: ${context.additionalContext}` : ''}

Please analyze the provided creative asset and return your evaluation in the exact format specified above.
  `;

  return contextualPrompt;
}
```

## Content Processing & Security

### Competitor Content Blocking:
- **User Confirmation**: Require explicit ownership confirmation
- **Content Validation**: Basic checks for obvious competitor content
- **Clear Messaging**: Explain why analysis is limited to owned content
- **Graceful Handling**: Informative error messages for blocked content

### Privacy & Security:
- **Temporary Storage**: Content deleted immediately after analysis
- **Secure Processing**: Encrypted API communication
- **No Data Retention**: Creative assets not stored permanently
- **GDPR Compliance**: Full data protection compliance

## Success Metrics

### Technical Performance:
- **Analysis Speed**: <60 seconds for complete evaluation
- **Accuracy Consistency**: 95%+ scoring framework adherence
- **Uptime**: 99.5% availability
- **Cost Efficiency**: $0.00 per analysis (free model)

### User Experience:
- **Completion Rate**: >80% of started analyses
- **Scoring Satisfaction**: >4.3/5 rating on analysis quality
- **Repeat Usage**: >35% monthly return rate
- **Export Rate**: >70% of users export/save results

### Business Performance:
- **Credits per User**: Target 6-10 analyses monthly
- **Free to Paid Conversion**: Target 22%+
- **User Retention**: >45% at 30 days
- **Revenue per User**: Target $25+ monthly

## Competitive Differentiation

### vs Manual Creative Reviews:
- ✅ **Speed**: 60 seconds vs 1-2 weeks
- ✅ **Cost**: Credits vs $3K-10K fees
- ✅ **Consistency**: Objective frameworks vs subjective opinions
- ✅ **Availability**: 24/7 access vs scheduling constraints

### vs Generic AI Tools:
- ✅ **Specialized Framework**: Purpose-built for ad creative analysis
- ✅ **Performance Focus**: Based on proven conversion frameworks
- ✅ **Expert Methodology**: Direct response legends' approaches
- ✅ **Structured Output**: Actionable scoring vs general feedback

### vs Competitor Tools:
- ✅ **Proven Frameworks**: APSICS $250M+ performance intelligence
- ✅ **Comprehensive Scoring**: 25-point detailed analysis
- ✅ **Multi-Format Support**: Video, static, and social media content
- ✅ **Professional Quality**: Agency-level analysis depth

## Future Enhancements

### Phase 2 (Months 3-6):
- **Benchmark Comparison**: Score against industry/category averages
- **Historical Tracking**: Track creative performance over time
- **Batch Analysis**: Multiple creative evaluation in single session
- **Advanced Export**: PDF reports with detailed breakdowns

### Phase 3 (Months 6-12):
- **Performance Correlation**: Link scores to actual campaign results
- **Predictive Modeling**: Machine learning performance prediction
- **Team Collaboration**: Multi-user analysis and sharing
- **Integration APIs**: Connect with creative workflow tools

### Phase 4 (Year 2):
- **Live Campaign Analysis**: Real-time creative performance monitoring
- **Competitive Intelligence**: Anonymous market creative benchmarking
- **Creative Optimization**: AI-suggested improvements based on scoring
- **White-Label Solution**: Agency and enterprise deployment

## Technical Architecture

### Backend Implementation:
- **OpenRouter Integration**: Single model strategy with `google/gemini-2.0-flash-exp:free`
- **Content Processing**: Unified pipeline for files and social URLs
- **Scoring Engine**: Structured prompt system for consistent evaluation
- **Credit Management**: Existing APSICS credit system integration

### Frontend Implementation:
- **File Upload**: Drag-and-drop with progress indicators
- **URL Processing**: Real-time validation and content extraction
- **Results Display**: Structured scorecard with category breakdowns
- **Export Options**: Copy, email, and save functionality

### Data Flow:
1. **Content Input**: File upload or URL submission
2. **Preprocessing**: Format validation and competitor filtering
3. **AI Analysis**: Gemini 2.0 Flash (free) evaluation using framework prompt
4. **Score Processing**: Structured output parsing and validation
5. **Results Delivery**: Formatted scorecard with analysis rationales

## Risk Mitigation

### Technical Risks:
- **Model Availability**: OpenRouter provides reliable Gemini access
- **Content Processing**: Robust file handling and validation
- **Analysis Quality**: Extensive prompt testing and validation
- **Performance**: Optimized token usage and response caching

### Business Risks:
- **User Adoption**: Clear value proposition and expert methodology
- **Competitive Response**: Focus on APSICS framework differentiation
- **Content Quality**: Professional-grade analysis matching agency standards
- **Pricing Pressure**: Demonstrate ROI through performance prediction

### Legal/Compliance Risks:
- **Copyright**: Clear ownership requirements and competitor blocking
- **Privacy**: No permanent storage and encrypted processing
- **Data Protection**: GDPR-compliant data handling
- **Content Filtering**: Robust competitor and inappropriate content blocking

## Launch Strategy

### Pre-Launch (Week 1):
- Beta testing with 25 APSICS customers
- Framework validation with creative experts
- Prompt optimization and scoring consistency testing
- Integration with existing platform and credit system

### Launch (Week 2):
- Soft launch to existing user base
- Case studies showing analysis accuracy and value
- Content marketing around creative evaluation frameworks
- Social proof from beta users and agencies

### Growth (Months 1-3):
- Performance data sharing and success stories
- Partnership with creative agencies and consultants
- Educational content on creative scoring methodology
- Feature expansion based on user feedback and usage patterns

This tool positions APSICS as the definitive source for creative performance intelligence, providing professional-grade analysis that democratizes access to expert-level creative evaluation.