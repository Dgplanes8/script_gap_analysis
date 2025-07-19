#!/usr/bin/env python3
"""
Steps 5-9: Whisper Transcription through Final Analysis

This script handles the remaining workflow steps:
- Step 5: Whisper video transcription
- Step 6: Script analysis and best practices guide
- Step 7: Gap analysis
- Step 8: Script generation
- Step 9: Comprehensive final analysis
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List

def load_brand_profile(brand_name: str, base_path: str = None) -> Dict:
    """Load brand profile from Step 1"""
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    brand_file = brand_folder / "Brand" / f"{clean_brand_name}_brand_profile.json"
    
    with open(brand_file, "r") as f:
        return json.load(f)

def execute_assemblyai_transcription(brand_name: str, base_path: str = None):
    """Step 5: Execute AssemblyAI transcription setup"""
    print(f"🎙️ Step 5: Setting up AssemblyAI transcription for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    transcription_folder = brand_folder / "AssemblyAI"
    
    # Create AssemblyAI folder
    transcription_folder.mkdir(exist_ok=True)
    
    # Load brand profile
    brand_profile = load_brand_profile(brand_name, base_path)
    
    # Create AssemblyAI configuration
    assemblyai_config = {
        "brand_name": brand_name,
        "api_settings": {
            "api_key": "your_assemblyai_api_key_here",
            "api_url": "https://api.assemblyai.com/v2/transcript"
        },
        "input_sources": {
            "apify_videos": f"{brand_folder}/Apify/videos/",
            "manual_uploads": f"{transcription_folder}/input_videos/",
            "supported_formats": [".mp4", ".mov", ".avi", ".mkv", ".webm", ".mp3", ".wav", ".m4a"]
        },
        "transcription_settings": {
            "language_code": "en_us",
            "punctuate": True,
            "format_text": True,
            "speaker_labels": True,
            "sentiment_analysis": True,
            "entity_detection": True,
            "iab_categories": True,
            "content_safety": True,
            "auto_highlights": True
        },
        "analysis_focus": [
            "opening_hooks",
            "problem_identification",
            "solution_presentation", 
            "emotional_triggers",
            "call_to_action_phrases",
            "social_proof_elements",
            "urgency_language",
            "benefits_communication",
            "sentiment_patterns",
            "topic_detection"
        ]
    }
    
    config_file = transcription_folder / f"{clean_brand_name}_assemblyai_config.json"
    with open(config_file, "w") as f:
        json.dump(assemblyai_config, f, indent=2)
    
    # Create input folder
    input_folder = transcription_folder / "input_videos"
    input_folder.mkdir(exist_ok=True)
    
    # Create AssemblyAI transcription analysis prompt
    transcription_prompt = f"""# AssemblyAI Video Transcription Analysis: {brand_name}

## Objective
Analyze transcribed video ad scripts using AssemblyAI's advanced features to identify high-performing patterns, messaging strategies, and creative frameworks with sentiment analysis and entity detection.

## Analysis Framework

### 1. Script Structure Analysis
**Opening Hooks (First 3-5 seconds):**
- Question-based hooks with sentiment scores
- Statement-based hooks with confidence levels
- Problem identification hooks with emotional intensity
- Curiosity gap creation with engagement prediction
- Pattern interrupts with attention-grabbing metrics

**Problem Development:**
- Pain point articulation with sentiment analysis
- Emotional amplification patterns with intensity scoring
- Entity detection for product/brand mentions
- Consequence highlighting with emotional impact
- Frustration expression patterns

**Solution Introduction:**
- Transition techniques
- Solution positioning
- Benefit presentation
- Credibility establishment

**Call to Action:**
- CTA placement and timing
- Urgency creation
- Risk reversal
- Next step clarity

### 2. Language Pattern Analysis
**High-Converting Phrases:**
- Most frequently used phrases
- Emotional trigger words
- Authority and credibility language
- Social proof integration
- Urgency and scarcity language

**Tone and Style:**
- Conversational vs formal
- Educational vs promotional
- Emotional vs logical
- Authoritative vs friendly

### 3. Performance Indicators
**Script Length Patterns:**
- Optimal length for different platforms
- Content density and pacing
- Information hierarchy

**Repetition and Emphasis:**
- Key message repetition
- Benefit reinforcement
- Problem reminder techniques

## Output Requirements

### Script Best Practices Guide
Create a comprehensive guide including:
- Proven hook templates
- Problem-solution frameworks
- Emotional progression patterns
- CTA optimization strategies
- Platform-specific adaptations

### Message Bank
Compile effective phrases for:
- Opening hooks
- Problem statements
- Solution presentations
- Social proof elements
- Call-to-action variations

Focus on actionable insights for script creation and optimization.
"""
    
    prompt_file = transcription_folder / f"{clean_brand_name}_assemblyai_analysis.md"
    with open(prompt_file, "w") as f:
        f.write(transcription_prompt)
    
    print(f"✅ Step 5 Setup Complete!")
    print(f"📝 AssemblyAI config: {config_file}")
    print(f"📁 Input folder: {input_folder}")
    print(f"📋 Analysis prompt: {prompt_file}")
    print("🚨 MANUAL ACTION: Run AssemblyAI API on video/audio files, then analyze transcripts")
    print("🎯 Enhanced Features: Sentiment analysis, entity detection, auto-highlights")
    
    return True

def execute_script_guide_creation(brand_name: str, base_path: str = None):
    """Step 6: Create script analysis and best practices guide"""
    print(f"📝 Step 6: Creating script guide for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    guide_folder = brand_folder / "Guide"
    
    # Load brand profile and existing prompts
    brand_profile = load_brand_profile(brand_name, base_path)
    
    # Read existing prompt database files
    prompt_db_path = base_path / "Prompt_Database"
    copy_prompt_file = prompt_db_path / "copy_prompt.md"
    concept_prompt_file = prompt_db_path / "concept_ideation.md"
    
    # Create comprehensive script guide prompt
    guide_creation_prompt = f"""# Script Best Practices Guide Creation: {brand_name}

## Objective
Synthesize insights from Whisper transcriptions, competitive analysis, and audience research to create a comprehensive script writing guide for {brand_name}.

## Data Sources to Analyze
1. **Whisper Transcriptions:** {brand_folder}/Whisper/
2. **Competitive Analysis:** {brand_folder}/Apify/
3. **Audience Research:** {brand_folder}/Perplexity/ and {brand_folder}/Reddit/
4. **Brand Profile:** {brand_folder}/Brand/

## Guide Framework

### 1. Brand Voice Guidelines
**Based on brand profile analysis:**
- Tone and personality expression
- Language preferences and restrictions
- Emotional positioning strategy
- Authority vs approachability balance
- Technical vs accessible language usage

### 2. Audience-Specific Messaging
**From audience research:**
- Primary audience language patterns
- Emotional triggers and motivators
- Pain point articulation methods
- Success story and aspiration themes
- Cultural references and shared experiences

### 3. High-Performance Script Structures
**From transcription analysis:**
- Proven opening hook templates
- Problem-solution progression patterns
- Emotional journey frameworks
- Social proof integration methods
- Call-to-action optimization strategies

### 4. Platform-Specific Adaptations
**TikTok Scripts (15-30 seconds):**
- Fast-paced, trend-aware content
- Native platform language
- Quick hook and resolution
- Visual-audio coordination

**Instagram Scripts (15-60 seconds):**
- Aesthetic and aspirational tone
- Discovery-minded messaging
- Community-focused language
- Lifestyle integration

**Facebook Scripts (60-90 seconds):**
- Educational and detailed approach
- Problem-solution depth
- Social sharing optimization
- Community discussion triggers

### 5. Competitive Differentiation
**From competitive analysis:**
- Messaging gaps to exploit
- Overused approaches to avoid
- Unique positioning opportunities
- Creative format innovations

## Output: {brand_name} Script Writing Guide

### Framework Templates
Create ready-to-use templates for:
- 5 proven hook variations
- 3 problem identification approaches
- 3 solution presentation methods
- 5 call-to-action variations
- Platform-specific adaptations

### Do's and Don'ts
**Do:**
- Use authentic audience language
- Follow emotional progression patterns
- Integrate social proof naturally
- Maintain brand voice consistency
- Optimize for platform behavior

**Don't:**
- Copy competitor messaging exactly
- Ignore audience cultural context
- Rush emotional progression
- Forget platform-specific optimization
- Neglect call-to-action clarity

### Performance Optimization Checklist
- [ ] Hook captures attention in first 3 seconds
- [ ] Problem resonates with target audience
- [ ] Solution clearly addresses pain points
- [ ] Benefits are audience-specific and compelling
- [ ] Social proof feels authentic and relevant
- [ ] Call-to-action is clear and low-friction
- [ ] Script length optimized for platform
- [ ] Language matches brand voice guidelines

This guide will serve as the foundation for all script generation in Step 8.
"""
    
    guide_prompt_file = guide_folder / f"{clean_brand_name}_guide_creation_prompt.md"
    with open(guide_prompt_file, "w") as f:
        f.write(guide_creation_prompt)
    
    print(f"✅ Step 6 Setup Complete!")
    print(f"📋 Guide creation prompt: {guide_prompt_file}")
    print("🚨 MANUAL ACTION: Analyze all research data and create comprehensive script guide")
    
    return True

def execute_gap_analysis(brand_name: str, base_path: str = None):
    """Step 7: Execute competitive gap analysis"""
    print(f"📊 Step 7: Creating gap analysis for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    gap_folder = brand_folder / "Gap_Analysis"
    
    brand_profile = load_brand_profile(brand_name, base_path)
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    
    gap_analysis_prompt = f"""# Comprehensive Gap Analysis: {brand_name}

## Objective
Identify strategic opportunities by analyzing gaps in competitor messaging, creative approaches, audience targeting, and market positioning.

## Data Sources Integration
Synthesize insights from all previous research:
1. **Perplexity Research:** Market and audience insights
2. **Reddit Research:** Authentic voice and pain points
3. **Apify Analysis:** Competitive advertising strategies  
4. **Whisper Transcripts:** High-performing script patterns
5. **Brand Profile:** {brand_name} positioning and capabilities

## Gap Analysis Framework

### 1. Messaging Gap Analysis
**Competitor Messaging Saturation:**
- What messages are competitors using heavily?
- Which emotional triggers are overused?
- What value propositions are commoditized?
- Which audience pain points are over-addressed?

**Underexplored Messaging Opportunities:**
- Which audience pain points are underaddressed?
- What emotional drivers are missed by competitors?
- Which benefits lack clear communication?
- What cultural tensions remain unresolved?

**{brand_name} Differentiation Opportunities:**
- How can we uniquely address saturated messages?
- What authentic brand voice can we develop?
- Which competitor weaknesses can we exploit?
- What value propositions can we own?

### 2. Creative Format Gap Analysis
**Saturated Creative Approaches:**
- What ad formats do competitors overuse?
- Which creative styles are commoditized?
- What visual approaches are overdone?
- Which content types lack differentiation?

**Underutilized Creative Opportunities:**
- What formats are competitors avoiding?
- Which creative styles could break through clutter?
- What visual approaches would stand out?
- Which content types could create advantage?

**Innovation Opportunities for {brand_name}:**
- How can we use creative formats differently?
- What visual style could become signature?
- Which content approaches align with brand voice?
- How can we create scroll-stopping differentiation?

### 3. Audience Targeting Gap Analysis
**Over-Targeted Segments:**
- Which demographics are saturated with competitor ads?
- What psychographic profiles see heavy competition?
- Which geographic markets are over-advertised?
- What awareness levels face message fatigue?

**Underserved Audience Opportunities:**
- Which demographic segments are underserved?
- What psychographic profiles are neglected?
- Which geographic markets lack attention?
- What awareness levels need different approaches?

**{brand_name} Audience Strategy:**
- How can we reach underserved segments effectively?
- What messaging would resonate with neglected audiences?
- Which targeting strategies could provide advantage?
- How can we expand beyond traditional segments?

### 4. Platform and Channel Gap Analysis
**Competitor Platform Strategies:**
- Which platforms do competitors dominate?
- What content strategies are they using where?
- Which platforms receive their highest investment?
- What cross-platform strategies do they employ?

**Platform Opportunity Identification:**
- Which platforms are underutilized by competitors?
- What content strategies are missing on each platform?
- Which platforms align best with our audience?
- How can we optimize cross-platform synergy?

### 5. Seasonal and Timing Gap Analysis
**Competitor Campaign Timing:**
- When do competitors launch major campaigns?
- What seasonal patterns do they follow?
- Which times of year see heavy competition?
- What campaign frequencies do they maintain?

**Timing Opportunities:**
- When could we launch with less competition?
- What seasonal angles are underexplored?
- Which timing strategies could provide advantage?
- How can we optimize campaign scheduling?

## Strategic Recommendations

### Priority Gap Opportunities
Rank top 5 opportunities by:
1. Market size and potential impact
2. Competitive advantage sustainability  
3. Alignment with {brand_name} capabilities
4. Implementation feasibility and timeline
5. Resource requirements and ROI potential

### Implementation Strategy
For each priority opportunity:
- Specific messaging recommendations
- Creative format suggestions
- Audience targeting strategy
- Platform and timing optimization
- Success metrics and KPIs
- Risk mitigation considerations

### Competitive Response Preparation
- How competitors might respond to our strategies
- Defensive positioning to maintain advantages
- Long-term sustainability of gap exploitation
- Continuous monitoring and adaptation plans

## Success Metrics
- Market share capture in targeted segments
- Cost efficiency vs competitor campaigns
- Creative performance differentiation
- Audience expansion and engagement
- Brand positioning strengthening
"""
    
    gap_prompt_file = gap_folder / f"{clean_brand_name}_gap_analysis_prompt.md"
    with open(gap_prompt_file, "w") as f:
        f.write(gap_analysis_prompt)
    
    print(f"✅ Step 7 Setup Complete!")
    print(f"📋 Gap analysis prompt: {gap_prompt_file}")
    print("🚨 MANUAL ACTION: Conduct comprehensive gap analysis using all research data")
    
    return True

def execute_script_generation(brand_name: str, base_path: str = None):
    """Step 8: Generate multiple script variations"""
    print(f"✍️ Step 8: Setting up script generation for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    script_folder = brand_folder / "Script"
    
    brand_profile = load_brand_profile(brand_name, base_path)
    
    # Read existing prompt database files for integration
    prompt_db_path = base_path / "Prompt_Database"
    
    script_generation_prompt = f"""# Script Generation: {brand_name}

## Objective
Generate 15 high-converting script variations (3 concepts × 5 platform formats) using insights from all previous research and analysis.

## Research Foundation
Integrate insights from all previous steps:
1. **Brand Profile:** {brand_folder}/Brand/ - Voice, positioning, audience
2. **Audience Research:** {brand_folder}/Perplexity/ and {brand_folder}/Reddit/ - Language, pain points, motivations
3. **Competitive Analysis:** {brand_folder}/Apify/ - Market gaps and opportunities
4. **Script Guide:** {brand_folder}/Guide/ - Best practices and frameworks
5. **Gap Analysis:** {brand_folder}/Gap_Analysis/ - Differentiation opportunities

## Script Generation Framework

### Concept Development (3 Primary Concepts)

**Concept 1: Primary Gap Opportunity**
- Based on highest-priority gap from analysis
- Addresses underserved audience need
- Leverages unique {brand_name} positioning
- Uses authentic audience language patterns

**Concept 2: Emotional Driver Focus**
- Targets primary emotional trigger from research
- Addresses core audience pain point
- Creates strong emotional connection
- Builds toward aspiration and transformation

**Concept 3: Competitive Differentiation**
- Directly contrasts with competitor approach
- Highlights unique {brand_name} advantage
- Uses underutilized messaging angle
- Captures overlooked audience segment

### Platform-Specific Script Formats (5 per concept)

#### 1. TikTok (15-30 seconds)
**Structure:**
- Hook (0-3 seconds): Scroll-stopping opener
- Problem/Tension (3-8 seconds): Quick pain point
- Solution Reveal (8-20 seconds): Product/service intro
- Call-to-Action (20-30 seconds): Clear next step

**Optimization:**
- Fast-paced, trend-aware language
- Visual-audio coordination cues
- Native platform feel
- Shareable moment creation

#### 2. Instagram Reels (15-30 seconds)
**Structure:**
- Visual Hook (0-3 seconds): Aesthetic attention grabber
- Story Development (3-15 seconds): Lifestyle context
- Solution Integration (15-25 seconds): Natural product fit
- Soft CTA (25-30 seconds): Discovery-focused

**Optimization:**
- Aspirational and aesthetic tone
- Community-minded language
- Discovery optimization
- Visual storytelling focus

#### 3. Instagram Feed (30-60 seconds)
**Structure:**
- Engaging Hook (0-5 seconds): Question or statement
- Problem Exploration (5-20 seconds): Detailed pain point
- Solution Presentation (20-45 seconds): Benefit explanation
- Social Proof (45-55 seconds): Credibility element
- Clear CTA (55-60 seconds): Action step

**Optimization:**
- Community discussion triggers
- Educational value
- Social sharing optimization
- Lifestyle integration

#### 4. Facebook Feed (60-90 seconds)
**Structure:**
- Authority Hook (0-8 seconds): Credibility opener
- Problem Deep Dive (8-30 seconds): Comprehensive pain point
- Solution Explanation (30-60 seconds): Detailed benefits
- Social Proof (60-75 seconds): Testimonials/results
- Strong CTA (75-90 seconds): Clear action with urgency

**Optimization:**
- Educational and detailed approach
- Problem-solution depth
- Community sharing optimization
- Trust-building elements

#### 5. Facebook Stories (15 seconds)
**Structure:**
- Immediate Hook (0-2 seconds): Instant attention
- Quick Problem (2-6 seconds): Rapid pain point
- Fast Solution (6-12 seconds): Benefit highlight
- Urgent CTA (12-15 seconds): Time-sensitive action

**Optimization:**
- Swipe-stopping immediacy
- Urgency and scarcity
- Simple, clear messaging
- Action-oriented focus

## Script Requirements

### For Each Script Include:
1. **Platform-optimized structure**
2. **Audience-authentic language** (from Reddit/Perplexity research)
3. **Brand voice consistency** (from brand profile)
4. **Emotional progression** (from script guide)
5. **Competitive differentiation** (from gap analysis)
6. **Clear value proposition**
7. **Compelling call-to-action**
8. **Social proof element**

### Quality Standards:
- Hook captures attention within platform timeframe
- Problem resonates with target audience pain points
- Solution addresses specific audience needs
- Benefits use audience language and priorities
- CTA is clear, specific, and low-friction
- Overall tone matches brand voice guidelines
- Script length optimized for platform behavior

## Deliverable Structure

### Script Collection Format:
```
## Concept 1: [Concept Name]
### TikTok Script (15-30 seconds)
[Full script with timing cues]

### Instagram Reels Script (15-30 seconds)
[Full script with visual cues]

### Instagram Feed Script (30-60 seconds)
[Full script with engagement optimization]

### Facebook Feed Script (60-90 seconds)
[Full script with educational elements]

### Facebook Stories Script (15 seconds)
[Full script with urgency focus]
```

## Testing and Optimization Framework
For each script, include:
- Primary success metric
- A/B testing recommendations
- Performance optimization suggestions
- Audience segment adaptations
- Seasonal variation possibilities

Generate scripts that are ready for immediate production and testing, incorporating all research insights and best practices identified throughout the workflow.
"""
    
    generation_prompt_file = script_folder / f"{clean_brand_name}_script_generation_prompt.md"
    with open(generation_prompt_file, "w") as f:
        f.write(script_generation_prompt)
    
    print(f"✅ Step 8 Setup Complete!")
    print(f"📋 Script generation prompt: {generation_prompt_file}")
    print("🚨 MANUAL ACTION: Generate 15 script variations using comprehensive research insights")
    
    return True

def execute_final_analysis(brand_name: str, base_path: str = None):
    """Step 9: Compile comprehensive final analysis"""
    print(f"📋 Step 9: Setting up final analysis compilation for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    analysis_folder = brand_folder / "Completed_Analysis"
    
    brand_profile = load_brand_profile(brand_name, base_path)
    
    final_analysis_prompt = f"""# Comprehensive Strategic Analysis: {brand_name}

## Executive Summary
Compile all research insights into a comprehensive strategic analysis and implementation roadmap for {brand_name} advertising campaigns.

## Data Integration Sources
Synthesize insights from complete workflow:
1. **Brand Foundation:** {brand_folder}/Brand/ - Core positioning and guidelines
2. **Market Intelligence:** {brand_folder}/Perplexity/ - Industry and audience insights  
3. **Social Listening:** {brand_folder}/Reddit/ - Authentic voice and community insights
4. **Competitive Analysis:** {brand_folder}/Apify/ - Advertising landscape and opportunities
5. **Script Intelligence:** {brand_folder}/Whisper/ - High-performance content patterns
6. **Best Practices:** {brand_folder}/Guide/ - Optimized frameworks and guidelines
7. **Strategic Gaps:** {brand_folder}/Gap_Analysis/ - Market opportunities and positioning
8. **Creative Assets:** {brand_folder}/Script/ - Ready-to-use campaign scripts

## Comprehensive Analysis Framework

### 1. Executive Summary
**Key Findings Overview:**
- Most significant market opportunities identified
- Primary competitive advantages for {brand_name}
- Highest-impact audience insights discovered
- Critical success factors for campaign performance

**Strategic Recommendations Summary:**
- Priority messaging directions (top 3)
- Recommended creative formats (top 3)  
- Target audience expansion opportunities (top 2)
- Immediate implementation priorities (next 30 days)

### 2. Market Intelligence Report

#### Audience Insights Synthesis
**Primary Audience Profile:**
- Demographic and psychographic summary
- Core pain points and emotional drivers
- Authentic language patterns and preferences
- Cultural context and community dynamics
- Purchase motivation and decision factors

**Secondary Audience Opportunities:**
- Underserved segments identified
- Expansion potential and approach
- Messaging adaptations required
- Platform and targeting recommendations

#### Competitive Landscape Analysis
**Market Positioning Map:**
- Where competitors position themselves
- Messaging saturation and gaps
- Creative format distribution
- Pricing and value positioning

**Competitive Intelligence:**
- Competitor strengths and vulnerabilities
- Market share opportunities
- Messaging differentiation requirements
- Creative innovation possibilities

### 3. Strategic Analysis

#### SWOT Analysis for {brand_name}
**Strengths:**
- Unique value propositions vs competitors
- Brand advantages and capabilities
- Market positioning opportunities
- Resource and expertise advantages

**Weaknesses:**
- Areas requiring improvement or attention
- Competitive disadvantages to address
- Resource or capability constraints
- Market positioning challenges

**Opportunities:**
- Market gaps ready for exploitation
- Audience segments ripe for capture
- Emerging trends to leverage
- Competitive weaknesses to exploit

**Threats:**
- Competitive responses to anticipate
- Market challenges to navigate
- Resource limitations to manage
- External factors to monitor

#### Gap Analysis Summary
**Priority Opportunities (Top 5):**
1. [Highest impact opportunity with specific approach]
2. [Second priority with implementation strategy]
3. [Third priority with resource requirements]
4. [Fourth priority with timeline considerations]
5. [Fifth priority with risk assessment]

**Competitive Differentiation Strategy:**
- Primary differentiation angle
- Supporting differentiation elements
- Sustainable advantage development
- Competitive response preparation

### 4. Campaign Strategy Framework

#### Messaging Strategy
**Core Value Proposition:**
- Primary benefit and differentiation
- Supporting benefits hierarchy
- Proof points and credibility elements
- Emotional connection framework

**Audience-Specific Messaging:**
- Primary audience messaging approach
- Secondary audience adaptations
- Platform-specific optimizations
- Cultural and contextual considerations

#### Creative Strategy
**Recommended Ad Formats:**
- Priority format selection and rationale
- Creative approach and style guidelines
- Visual and audio direction
- Performance optimization framework

**Content Strategy:**
- Content themes and variations
- Storytelling frameworks
- Social proof integration
- User-generated content approach

#### Targeting Strategy
**Audience Segmentation:**
- Primary targeting parameters
- Secondary audience expansion
- Lookalike and interest targeting
- Behavioral and retargeting approach

**Platform Strategy:**
- Platform prioritization and budget allocation
- Platform-specific optimizations
- Cross-platform synergy approach
- Performance tracking framework

### 5. Implementation Roadmap

#### Phase 1: Foundation (Weeks 1-2)
**Creative Development:**
- Script finalization and production
- Visual asset creation
- Video production planning
- Creative testing preparation

**Campaign Setup:**
- Audience research and setup
- Targeting configuration
- Budget allocation and bidding
- Tracking and measurement setup

#### Phase 2: Testing and Optimization (Weeks 3-4)
**A/B Testing Framework:**
- Creative variation testing
- Audience segment validation
- Message optimization
- Performance benchmark establishment

**Data Collection and Analysis:**
- Performance monitoring setup
- Optimization trigger identification
- Feedback collection systems
- Competitive monitoring

#### Phase 3: Scale and Expansion (Weeks 5-8)
**Performance Scaling:**
- Winning creative expansion
- Audience broadening strategy
- Budget optimization
- Cross-platform expansion

**Continuous Optimization:**
- Performance improvement cycles
- Creative refresh planning
- Audience expansion testing
- Competitive response adaptation

### 6. Success Metrics and KPIs

#### Performance Tracking Framework
**Primary Metrics:**
- Campaign-specific KPIs and targets
- Conversion tracking and attribution
- Customer acquisition cost optimization
- Return on ad spend targets

**Secondary Metrics:**
- Brand awareness and consideration
- Engagement and interaction rates
- Audience growth and retention
- Competitive positioning indicators

#### Optimization Triggers
**Performance Thresholds:**
- When to pause underperforming creative
- When to scale successful campaigns
- When to expand to new audiences
- When to adjust messaging or creative

### 7. Risk Management and Contingencies

#### Risk Assessment
**Campaign Risks:**
- Creative performance risks
- Audience response risks
- Competitive response risks
- Market condition risks

**Mitigation Strategies:**
- Backup creative and messaging options
- Alternative audience strategies
- Competitive response plans
- Budget flexibility frameworks

### 8. Long-term Strategic Considerations

#### Sustainable Advantage Development
- Building long-term brand positioning
- Audience loyalty and retention
- Creative innovation pipeline
- Market leadership establishment

#### Continuous Improvement Framework
- Regular research and analysis cycles
- Creative testing and innovation
- Audience insight development
- Competitive intelligence monitoring

## Appendices

### A. Research Data Summaries
- Key findings from each research phase
- Critical insights and supporting data
- Methodology and source documentation

### B. Creative Asset Library  
- Complete script collection
- Creative framework templates
- Visual and messaging guidelines

### C. Competitive Intelligence Details
- Detailed competitor analysis
- Market positioning documentation
- Ongoing monitoring framework

### D. Implementation Checklists
- Phase-by-phase execution checklists
- Quality assurance frameworks
- Performance optimization guides

---

**Analysis Completion Date:** {datetime.now().strftime('%Y-%m-%d')}
**Prepared for:** {brand_name} Marketing Team
**Workflow Version:** 1.0
**Next Review:** [30 days from implementation start]

This comprehensive analysis provides {brand_name} with a complete strategic foundation for high-performing advertising campaigns based on thorough market research, competitive intelligence, and audience insights.
"""
    
    final_prompt_file = analysis_folder / f"{clean_brand_name}_final_analysis_prompt.md"
    with open(final_prompt_file, "w") as f:
        f.write(final_analysis_prompt)
    
    print(f"✅ Step 9 Setup Complete!")
    print(f"📋 Final analysis prompt: {final_prompt_file}")
    print("🚨 MANUAL ACTION: Compile comprehensive strategic analysis from all research")
    
    return True

def execute_remaining_steps(brand_name: str, step_range: str = "5-9", base_path: str = None):
    """Execute Steps 5-9 setup"""
    print(f"\n🚀 Setting up Steps {step_range} for: {brand_name}")
    
    steps = {
        5: execute_assemblyai_transcription,
        6: execute_script_guide_creation, 
        7: execute_gap_analysis,
        8: execute_script_generation,
        9: execute_final_analysis
    }
    
    success_count = 0
    
    for step_num in range(5, 10):
        try:
            if steps[step_num](brand_name, base_path):
                success_count += 1
                print(f"✅ Step {step_num} setup complete")
            else:
                print(f"❌ Step {step_num} setup failed")
        except Exception as e:
            print(f"❌ Step {step_num} error: {e}")
    
    print(f"\n📊 Steps 5-9 Setup Summary:")
    print(f"   - {success_count}/5 steps configured successfully")
    print(f"   - All prompts and configurations ready")
    print(f"   - Manual execution required for each step")
    
    return success_count == 5

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Steps 5-9: Complete Workflow")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--step", type=int, help="Execute specific step (5-9)")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    if args.step:
        steps = {
            5: execute_assemblyai_transcription,
            6: execute_script_guide_creation,
            7: execute_gap_analysis, 
            8: execute_script_generation,
            9: execute_final_analysis
        }
        if args.step in steps:
            steps[args.step](args.brand, args.path)
        else:
            print(f"Invalid step: {args.step}. Must be 5-9.")
    else:
        execute_remaining_steps(args.brand, "5-9", args.path)