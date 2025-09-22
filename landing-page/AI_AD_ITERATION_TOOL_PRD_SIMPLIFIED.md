# AI Ad Iteration Tool - Simplified PRD

## Overview

An AI-powered tool that analyzes existing ads (static images, videos, or social media links) and generates improved versions using APSICS Media's creative intelligence framework. Built with a single OpenRouter + Gemini 2.0 Flash integration for maximum simplicity and speed.

## Product Vision

Enable marketers to rapidly iterate on their own ad creative by uploading assets or providing social media URLs, receiving comprehensive AI-powered analysis and improved versions through a single, powerful API call.

## Technical Architecture

### Frontend Structure
- **Page Location**: `/app/ai-ad-iteration-tool/`
- **Main Component**: `client-page.tsx` (following existing ai-ad-script-generator pattern)
- **Styling**: Match existing design system and patterns

### Backend Services
- **Edge Function**: `supabase/functions/analyze-and-iterate-ad/index.ts`
- **AI Provider**: OpenRouter API with Gemini 2.0 Flash model
- **Single Prompt**: `iteration_bot_prompt.md` (handles all scenarios)
- **Credit System**: Inherit existing system (1 credit per analysis)

## Core Features

### 1. Asset Input Methods

#### File Upload
- **Supported Formats**:
  - Images: JPG, PNG, WebP (max 10MB)
  - Videos: MP4, MOV, WebM (max 50MB)
- **Processing**: Gemini 2.0 Flash analyzes directly
- **User Flow**: Drag-and-drop or file picker → instant analysis

#### Social Media URL Input
- **Supported Platforms**: Facebook, Instagram, TikTok URLs
- **Content Filtering**: Prompt-level competitor blocking
- **User Flow**: Paste URL → validation → analysis

### 2. Output Format Selection
- **Same Format**: Optimize within current format
- **Format Transitions**: Video↔Static↔Carousel conversions
- **Multi-Format**: Generate variations across formats
- **User Selection**: Radio buttons for desired output

### 3. Single API Call Analysis

Gemini 2.0 Flash provides complete analysis including:
- **Video Transcription**: Complete spoken content extraction
- **Scene Analysis**: Frame-by-frame breakdown and timing
- **Performance Assessment**: Current strengths/weaknesses
- **Iteration Recommendations**: 3 improved versions
- **Platform Optimization**: Facebook/Instagram/TikTok specific
- **Format Transitions**: Cross-format suggestions
- **Brand Consistency**: Voice preservation guidelines

## User Experience Flow

### Primary Journey
1. **Landing**: Value proposition and input options
2. **Upload/URL**: File upload or social media URL input
3. **Format Selection**: Choose desired output format
4. **Single Processing Step**: OpenRouter + Gemini analysis
5. **Complete Results**: Comprehensive iteration analysis
6. **Export Options**: Email delivery, copy to clipboard

### Form State
```typescript
type IterationFormState = {
  inputMethod: 'upload' | 'url';
  file?: File;
  url?: string;
  outputFormat: 'video' | 'static' | 'same' | 'multi';
  primaryPlatform: 'facebook' | 'instagram' | 'tiktok';
  iterationGoal: 'performance' | 'engagement' | 'conversion' | 'awareness';
  additionalContext?: string;
}
```

## Technical Implementation

### Edge Function Structure
```typescript
// supabase/functions/analyze-and-iterate-ad/index.ts
export default async function(req) {
  // 1. Validate input and check credits
  const { assetUrl, companyName, outputFormat, iterationGoal } = await req.json();

  // 2. Build comprehensive prompt
  const prompt = buildIterationPrompt({ /* all parameters */ });

  // 3. Single OpenRouter call to Gemini
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", url: assetUrl } // or video
        ]
      }],
      max_tokens: 2000
    })
  });

  // 4. Return complete iteration analysis
  return response.json();
}
```

### Prompt Strategy
Single comprehensive prompt (`iteration_bot_prompt.md`) handles:
- Asset analysis instructions
- Video transcription requests
- Platform-specific optimizations
- Format transition capabilities
- Competitor content blocking
- Performance improvement frameworks

## Content Processing

### Simplified Workflow
1. **User Input**: Upload file or provide social URL
2. **Validation**: Check format, size, competitor filtering
3. **API Call**: Send to Gemini 2.0 Flash with comprehensive prompt
4. **Analysis**: Gemini provides complete iteration package
5. **Display**: Show results with copy/email options

### What Gemini Handles Natively
- ✅ Video transcription and scene analysis
- ✅ Image text extraction (OCR)
- ✅ Visual composition analysis
- ✅ Performance prediction
- ✅ Platform-specific recommendations
- ✅ Format transition suggestions
- ✅ Brand voice consistency

## Credit System

### Simplified Pricing
- **All Analyses**: 1 credit regardless of complexity
- **Free Tier**: 1 analysis without account + 3 with signup
- **No Complexity Tiers**: Consistent user experience

## Success Metrics

### Technical Performance
- **Processing Speed**: <45 seconds for complete analysis
- **Accuracy**: 90%+ transcription and analysis accuracy
- **Uptime**: 99.5% availability
- **Cost Efficiency**: <$0.10 per analysis

### User Experience
- **Completion Rate**: >85% of started analyses
- **Format Transition Usage**: >40% users select different output
- **Satisfaction**: >4.5/5 rating
- **Retention**: >50% monthly usage

## Security & Content Filtering

### Competitor Prevention
- **Prompt Instructions**: Direct Gemini to identify competitor content
- **User Confirmation**: "Confirm this is your company's content"
- **Clear Messaging**: Explain why competitor analysis is blocked

### Privacy
- **No Permanent Storage**: Content deleted after analysis
- **Secure Processing**: Encrypted API calls
- **GDPR Compliant**: No retention of user creative assets

## Launch Strategy

### Day 1-2: MVP
- ✅ OpenRouter + Gemini integration
- ✅ File upload (images + videos)
- ✅ Complete iteration analysis
- ✅ Credit system integration
- ✅ Basic UI following existing patterns

### Day 3-5: Enhanced Features
- ✅ Social media URL support
- ✅ Enhanced results display
- ✅ Email delivery integration
- ✅ Format transition options

### Week 2: Optimization
- Performance monitoring
- Prompt optimization
- User feedback integration
- A/B testing recommendations

## Key Benefits of Simplified Approach

### Development Speed
- **2 days to MVP** vs 2-4 weeks for complex pipeline
- **Single integration point** vs multiple service orchestration
- **Proven technology** vs custom video processing

### Operational Benefits
- **Lower costs**: One API call vs multiple services
- **Better reliability**: Fewer failure points
- **Easier maintenance**: One prompt to optimize
- **Native capabilities**: Leverages Gemini's strengths

### User Experience
- **Faster results**: No multi-step processing delays
- **Comprehensive output**: Everything in one response
- **Consistent pricing**: Simple 1-credit model
- **Professional quality**: Leverages best-in-class AI

## Implementation Requirements

### Required Integrations
1. **OpenRouter Account**: API key for Gemini access
2. **File Upload**: Supabase storage for temporary files
3. **UI Components**: Reuse from ai-ad-script-generator
4. **Email Service**: Existing send-ad-email API

### Environment Variables
```
OPENROUTER_API_KEY=your_openrouter_key
```

### File Structure
```
/app/ai-ad-iteration-tool/
├── page.tsx (main route)
├── client-page.tsx (main component)
/supabase/functions/analyze-and-iterate-ad/
├── index.ts (edge function)
├── prompt.ts (iteration prompt)
/prompts/
└── iteration_bot_prompt.md (comprehensive prompt)
```

## Success Criteria

### Technical
- ✅ <45 second response time
- ✅ >90% analysis accuracy
- ✅ <$0.10 cost per analysis
- ✅ 99.5% uptime

### Business
- ✅ >80% completion rate
- ✅ >40% format transition usage
- ✅ >4.5/5 user satisfaction
- ✅ Integration with existing credit system

This simplified approach delivers the same comprehensive ad iteration capabilities with dramatically reduced complexity, faster development time, and better reliability by leveraging Gemini 2.0 Flash's native multimodal capabilities.