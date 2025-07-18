# Ad Analysis and Script Writer PRD

## Project Overview
A comprehensive ad analysis and script writing workflow that leverages Claude Code to systematically analyze competitor brands, conduct market research, and generate high-converting ad scripts. This semi-automated process guides users through 9 distinct steps to create data-driven advertising strategies.

## Problem Statement
Creating effective ad campaigns requires extensive research across multiple platforms, competitor analysis, and deep understanding of target audiences. Current manual processes are time-intensive and often miss critical insights that could differentiate brands in competitive markets.

## Solution Overview
A structured workflow that uses Claude Code to orchestrate various tools and APIs (Perplexity MCP, Reddit API, Apify MCP, Whisper) to gather comprehensive market intelligence and generate targeted ad scripts based on real audience insights and competitor gap analysis.

## Core Features

### 1. Brand Intelligence & Setup
**Objective**: Establish foundation for analysis
- Identify core brand and key competitors
- Create organized folder structure for data management
- Store brand information using standardized naming convention

### 2. Audience Research (Perplexity)
**Objective**: Deep dive into target audience psychology
- Leverage Perplexity MCP for comprehensive audience research
- Extract demographic and psychographic insights
- Identify emotional drivers and cultural tensions
- Document findings with verbatim quotes and real language patterns

### 3. Social Research (Reddit API)
**Objective**: Capture authentic audience voice
- Mine Reddit discussions for raw audience insights
- Identify pain points, objections, and language patterns
- Extract real testimonials and horror stories
- Build comment heatmaps for tone and messaging

### 4. Competitor Ad Intelligence (Apify)
**Objective**: Systematic competitor analysis
- Scrape Facebook Ads Library for brand and competitor campaigns
- Catalog ad formats, messaging strategies, and creative approaches
- Identify market positioning and differentiation strategies
- Track competitive landscape trends

### 5. Script Transcription (Whisper)
**Objective**: Analyze competitor video content
- Transcribe video ads using Whisper API
- Extract script structures and messaging frameworks
- Identify tone, pacing, and key conversion elements
- Build database of high-performing script patterns

### 6. Script Best Practices Guide
**Objective**: Synthesize learnings into actionable framework
- Analyze transcribed scripts for common patterns
- Identify key points and tone variations
- Create brand-specific script writing guidelines
- Document format preferences and messaging hierarchy

### 7. Gap Analysis
**Objective**: Identify market opportunities
- Compare brand positioning against competitors
- Identify messaging gaps and underserved angles
- Highlight differentiation opportunities
- Map competitive white space for strategic advantage

### 8. Script Generation
**Objective**: Create multiple script variations
- Generate scripts using research insights and best practices
- Apply audience language patterns and emotional drivers
- Create platform-specific adaptations (TikTok, Instagram, Facebook)
- Incorporate gap analysis findings for differentiation

### 9. Comprehensive Strategic Analysis
**Objective**: Deliver complete market intelligence
- SWOT analysis incorporating all research streams
- Target audience expansion opportunities
- Market share capture strategies based on gap analysis
- Actionable recommendations for campaign optimization

## Technical Requirements

### Tools Integration
- **Claude Code**: Primary orchestration and analysis tool
- **Perplexity MCP**: Market and audience research
- **Reddit API**: Social listening and authentic voice capture
- **Apify MCP**: Facebook Ads Library scraping
- **Whisper API**: Video transcription and script analysis

### File Organization Structure
```
Brand_Name/
├── Brand/
├── Perplexity/
├── Reddit/
├── Apify/
├── Whisper/
├── Guide/
├── Gap_Analysis/
├── Script/
└── Completed_Analysis/
```

### Naming Conventions
- Brand folders: `brand_name`
- Research files: `brand_name_[source]`
- Analysis files: `brand_name_[analysis_type]`

## User Workflow

### Phase 1: Research & Data Collection (Steps 1-5)
1. **Brand Setup**: User provides brand name and key competitors
2. **Automated Research**: Claude Code executes research across all platforms
3. **Data Validation**: User reviews collected insights for accuracy
4. **Transcription Processing**: Video ads processed through Whisper
5. **Quality Check**: Ensure all data sources captured effectively

### Phase 2: Analysis & Synthesis (Steps 6-7)
1. **Pattern Recognition**: Claude Code analyzes scripts and identifies best practices
2. **Competitive Mapping**: Gap analysis reveals market opportunities
3. **Strategy Formulation**: User validates findings and strategic direction
4. **Framework Creation**: Brand-specific guidelines established

### Phase 3: Creative Generation (Steps 8-9)
1. **Script Creation**: Multiple script variations generated
2. **Platform Optimization**: Scripts adapted for each social platform
3. **Strategic Summary**: Comprehensive analysis with actionable insights
4. **Campaign Readiness**: Final review and approval process

## Success Metrics
- **Research Depth**: Comprehensive data across 4+ sources
- **Script Quality**: Scripts incorporating audience language and emotional drivers
- **Gap Identification**: Clear competitive differentiation opportunities
- **Time Efficiency**: 70% reduction in manual research time
- **Actionability**: Specific, implementable campaign recommendations

## Constraints & Considerations
- Semi-automated process requiring user oversight at key decision points
- API rate limits may require research to be conducted across multiple sessions
- Quality of insights dependent on data availability across platforms
- User maintains creative control and final approval on all outputs

## Future Enhancements
- Integration with additional social platforms (YouTube, LinkedIn)
- Automated A/B testing recommendations
- Real-time competitor monitoring and alerts
- Performance tracking integration for campaign optimization