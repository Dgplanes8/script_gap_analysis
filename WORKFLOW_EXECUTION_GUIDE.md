# Ad Analysis and Script Writer - Workflow Execution Guide

## Overview
This guide provides complete instructions for executing the enhanced ad analysis and script writing workflow (9 steps + Step 7.5) using Claude Code and the provided Python scripts.

## Prerequisites
- Python 3.7+ installed
- Access to the following APIs/tools:
  - Perplexity MCP
  - Reddit API
  - Apify MCP (Facebook Ads Library)
  - AssemblyAI API
  - Claude Code

## Quick Start

### Option 1: Execute Complete Workflow
```bash
python ad_workflow_orchestrator.py --brand "Your Brand Name" --competitors "Competitor1,Competitor2,Competitor3" --full
```

### Option 2: Execute Individual Steps
```bash
python ad_workflow_orchestrator.py --brand "Your Brand Name" --step 1
python ad_workflow_orchestrator.py --brand "Your Brand Name" --step 2
# ... continue through step 7
python ad_workflow_orchestrator.py --brand "Your Brand Name" --step 7.5
python ad_workflow_orchestrator.py --brand "Your Brand Name" --step 8
python ad_workflow_orchestrator.py --brand "Your Brand Name" --step 9
```

### Option 3: Use Individual Step Scripts
```bash
cd workflow_steps/
python step_1_brand_setup.py --brand "Your Brand Name" --competitors "Comp1,Comp2"
python step_2_perplexity_research.py --brand "Your Brand Name"
# ... continue with remaining steps
```

## Detailed Step-by-Step Instructions

### Step 1: Brand Identification and Folder Structure Setup
**Purpose:** Create organized project structure and collect comprehensive brand information

**Execution:**
```bash
python workflow_steps/step_1_brand_setup.py --brand "Your Brand Name" --competitors "Competitor1,Competitor2"
```

**What happens:**
- Interactive brand profile collection (demographics, psychographics, positioning, etc.)
- Folder structure creation for all workflow steps
- Brand profile saved in JSON and Markdown formats
- Project README and tracking files created

**Manual actions required:**
- Answer interactive prompts about brand positioning, target audience, competitive landscape
- Review and validate generated brand profile

**Output files:**
- `Projects/{brand_name}/Brand/{brand_name}_brand_profile.json`
- `Projects/{brand_name}/Brand/{brand_name}_brand_profile.md`
- `Projects/{brand_name}/README.md`
- Complete folder structure for all 9 steps

### Step 2: Perplexity Research Integration
**Purpose:** Conduct comprehensive market and audience research using Perplexity MCP

**Execution:**
```bash
python workflow_steps/step_2_perplexity_research.py --brand "Your Brand Name"
```

**What happens:**
- Customized research prompts created based on brand profile
- Multiple focused research areas generated (competitor analysis, pain points, solution landscape)
- Research configuration and tracking files created

**Manual actions required:**
1. Use Perplexity MCP to execute the generated research prompts
2. Save research results to the Perplexity folder
3. Review and organize findings

**Key prompts generated:**
- Main research prompt (comprehensive audience analysis)
- Competitor analysis prompt
- Pain points research prompt  
- Solution landscape prompt

**Output files:**
- `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_research_prompt.md`
- `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_competitor_analysis.md`
- `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_pain_points_research.md`
- `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_solution_landscape.md`

### Step 3: Reddit API Research Integration
**Purpose:** Capture authentic audience voice and social listening insights

**Execution:**
```bash
python workflow_steps/step_3_reddit_research.py --brand "Your Brand Name"
```

**What happens:**
- Reddit research configuration created with relevant subreddits and search terms
- Analysis prompts generated for extracting insights from Reddit data
- Execution guide created with detailed instructions

**Manual actions required:**
1. Use Reddit API to collect data according to the configuration
2. Apply analysis prompts to extract insights
3. Document findings in structured format

**Research scope:**
- Industry-specific and general subreddits
- Brand and competitor mentions
- Pain point discussions and solution experiences
- Authentic language patterns and emotional expressions

**Output files:**
- `Projects/{brand_name}/Reddit/{brand_name}_reddit_config.json`
- `Projects/{brand_name}/Reddit/{brand_name}_reddit_main_analysis.md`
- `Projects/{brand_name}/Reddit/{brand_name}_reddit_competitive_sentiment.md`
- `Projects/{brand_name}/Reddit/{brand_name}_reddit_execution_guide.md`

### Step 4: Apify Facebook Ads Library Scraping
**Purpose:** Analyze competitor advertising strategies and creative approaches

**Execution:**
```bash
python workflow_steps/step_4_apify_scraping.py --brand "Your Brand Name"
```

**What happens:**
- Apify scraping configuration created for Facebook Ads Library
- Search terms generated for brand, competitors, and industry
- Analysis prompts created for competitive intelligence extraction
- Organized folder structure for data management

**Manual actions required:**
1. Use Apify MCP to execute Facebook Ads Library scraping
2. Download and organize creative assets (images, videos)
3. Apply analysis prompts to extract competitive insights

**Analysis focus:**
- Messaging patterns and emotional hooks
- Creative formats and visual strategies
- Audience targeting approaches
- Performance indicators and optimization evidence

**Output files:**
- `Projects/{brand_name}/Apify/{brand_name}_apify_config.json`
- `Projects/{brand_name}/Apify/{brand_name}_apify_competitive_analysis.md`
- `Projects/{brand_name}/Apify/{brand_name}_apify_creative_format_analysis.md`
- `Projects/{brand_name}/Apify/{brand_name}_apify_execution_guide.md`

### Step 5: AssemblyAI Video/Audio Transcription
**Purpose:** Transcribe and analyze video/audio ad content with advanced AI features

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 5
```

**What happens:**
- AssemblyAI transcription configuration created with advanced features
- Video/audio input folder structure established
- Enhanced transcription analysis prompt generated with sentiment analysis

**Manual actions required:**
1. Update AssemblyAI API key in configuration file
2. Execute transcription: `python workflow_steps/assemblyai_integration.py --brand "Brand Name" --action transcribe`
3. Analyze results: `python workflow_steps/assemblyai_integration.py --brand "Brand Name" --action analyze`

**Advanced features:**
- **Sentiment analysis** - Emotional tone detection throughout content
- **Entity detection** - Brand, product, and competitor mentions
- **Auto-highlights** - Key phrases and important moments
- **Speaker labels** - Multiple speaker identification
- **IAB categories** - Content topic classification
- **Content safety** - Inappropriate content detection

**Analysis focus:**
- Opening hooks with sentiment scoring
- Problem identification with emotional intensity
- Solution presentation with confidence levels
- Call-to-action patterns with engagement prediction
- Entity mentions and brand positioning
- Sentiment progression throughout scripts

**Output files:**
- `Projects/{brand_name}/AssemblyAI/{brand_name}_assemblyai_config.json`
- `Projects/{brand_name}/AssemblyAI/{brand_name}_assemblyai_analysis.md`
- `Projects/{brand_name}/AssemblyAI/input_videos/` (folder for uploads)
- `Projects/{brand_name}/AssemblyAI/{brand_name}_transcription_summary.json`
- `Projects/{brand_name}/AssemblyAI/{brand_name}_transcript_analysis.json`

### Step 6: Script Analysis and Best Practices Guide
**Purpose:** Synthesize all research into actionable script writing guidelines

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 6
```

**What happens:**
- Comprehensive guide creation prompt generated
- Framework for synthesizing insights from all previous steps
- Template structure for brand-specific script guidelines

**Manual actions required:**
1. Analyze all research data using the provided framework
2. Create comprehensive script writing guide for the brand
3. Develop reusable templates and frameworks

**Guide components:**
- Brand voice and tone guidelines
- Audience-specific messaging recommendations  
- High-performance script structures
- Platform-specific adaptations
- Competitive differentiation strategies

**Output files:**
- `Projects/{brand_name}/Guide/{brand_name}_guide_creation_prompt.md`
- (Manual creation) `Projects/{brand_name}/Guide/{brand_name}_script_guide.md`

### Step 7: Gap Analysis
**Purpose:** Identify strategic opportunities through competitive gap analysis

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 7
```

**What happens:**
- Comprehensive gap analysis framework created
- Integration strategy for all research data sources
- Strategic opportunity identification methodology

**Manual actions required:**
1. Conduct systematic gap analysis using all research data
2. Identify priority opportunities for market differentiation
3. Develop strategic recommendations with implementation priorities

**Analysis dimensions:**
- Messaging gaps and opportunities
- Creative format differentiation possibilities
- Audience targeting white space
- Platform and timing optimization opportunities
- Competitive positioning advantages

**Output files:**
- `Projects/{brand_name}/Gap_Analysis/{brand_name}_gap_analysis_prompt.md`
- (Manual creation) `Projects/{brand_name}/Gap_Analysis/{brand_name}_gap_analysis.md`

### Step 7.5: Strategic Concept Generation
**Purpose:** Generate 3 strategic ad concepts using comprehensive ideation frameworks

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 7.5
```

**What happens:**
- Strategic concept generation framework created with comprehensive prompt
- Concept validation framework developed with scoring matrices
- Integration of concept_ideation.md framework for systematic approach
- Template structure for 3 concepts × 3-5 formats = 15 total ads

**Manual actions required:**
1. Execute concept generation using the comprehensive framework prompt
2. Develop 3 strategic concepts based on gap analysis insights
3. Validate concepts using the provided scoring framework
4. Select optimal formats for each concept (3-5 formats per concept)

**Concept development focus:**
- **Strategic Foundation:** Gap analysis insights and competitive positioning
- **Audience Alignment:** Research-backed pain points and emotional drivers
- **Creative Innovation:** Differentiated approaches and format experimentation
- **Validation Criteria:** Market fit, production feasibility, and strategic alignment

**Framework components:**
- Concept ideation methodology with 8 strategic approaches
- Validation matrices for market fit, audience appeal, and strategic alignment
- Format optimization for platform-specific performance
- Implementation priority and resource allocation guidance

**Output files:**
- `Projects/{brand_name}/Concepts/{brand_name}_concept_generation_prompt.md`
- `Projects/{brand_name}/Concepts/{brand_name}_concept_validation_framework.md`
- (Manual creation) `Projects/{brand_name}/Concepts/{brand_name}_validated_concepts.md`

### Step 8: Script Generation
**Purpose:** Generate multiple script variations using validated concepts from Step 7.5

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 8
```

**What happens:**
- Script generation framework created based on validated concepts from Step 7.5
- Template structure for 15 script variations using the 3 validated concepts
- Integration strategy for concept messaging, brand voice, and audience insights
- Direct reference to concept validation framework and strategic positioning

**Manual actions required:**
1. Review validated concepts from Step 7.5 before script generation
2. Implement the 3 validated concepts across recommended platform formats
3. Follow concept-specific messaging frameworks and strategic positioning
4. Ensure scripts align with concept validation criteria and priority recommendations

**Script formats:**
- TikTok (15-30 seconds)
- Instagram Reels (15-30 seconds)
- Instagram Feed (30-60 seconds)
- Facebook Feed (60-90 seconds)
- Facebook Stories (15 seconds)

**Output files:**
- `Projects/{brand_name}/Script/{brand_name}_script_generation_prompt.md`
- (Manual creation) `Projects/{brand_name}/Script/{brand_name}_scripts.md`

### Step 9: Comprehensive Final Analysis
**Purpose:** Compile complete strategic analysis and implementation roadmap

**Execution:**
```bash
python workflow_steps/steps_5_through_9.py --brand "Your Brand Name" --step 9
```

**What happens:**
- Final analysis framework created for complete data integration
- Strategic synthesis methodology for all research phases
- Implementation roadmap template with phases and timelines

**Manual actions required:**
1. Synthesize all research into executive summary
2. Create comprehensive SWOT analysis
3. Develop detailed implementation roadmap
4. Document success metrics and optimization framework

**Analysis components:**
- Executive summary with key findings
- Market intelligence and audience insights
- Competitive landscape and positioning strategy
- Campaign strategy framework
- Implementation roadmap (3 phases)
- Success metrics and KPIs
- Risk management and contingencies

**Output files:**
- `Projects/{brand_name}/Completed_Analysis/{brand_name}_final_analysis_prompt.md`
- (Manual creation) `Projects/{brand_name}/Completed_Analysis/{brand_name}_analysis.md`

## Workflow State Tracking

Each project includes workflow state tracking:
- `Projects/{brand_name}/{brand_name}_workflow_state.json`

This file tracks:
- Completed steps
- Current progress
- Next recommended actions
- Timestamps and workflow version

## File Organization

```
Ad Workflow/
├── ad_workflow_orchestrator.py          # Main orchestrator script
├── workflow_steps/                      # Individual step scripts
│   ├── step_1_brand_setup.py
│   ├── step_2_perplexity_research.py
│   ├── step_3_reddit_research.py
│   ├── step_4_apify_scraping.py
│   └── steps_5_through_9.py
├── Projects/{brand_name}/               # Brand-specific project folder
│   ├── Brand/                          # Brand profile and guidelines
│   ├── Perplexity/                     # Market research results
│   ├── Reddit/                         # Social listening insights
│   ├── Apify/                          # Competitive ad analysis
│   ├── AssemblyAI/                     # Video/audio transcription with AI analysis
│   ├── Guide/                          # Script writing guidelines
│   ├── Gap_Analysis/                   # Strategic opportunities
│   ├── Concepts/                       # Strategic concept generation and validation
│   ├── Script/                         # Generated script variations
│   └── Completed_Analysis/             # Final strategic analysis
└── Prompt_Database/                    # Reusable prompt templates
```

## Best Practices

### Research Quality
- Ensure comprehensive data collection at each step
- Validate insights across multiple data sources
- Document sources and methodology for all research
- Review findings for consistency and accuracy

### Manual Execution
- Each step requires manual review and validation
- Use Claude Code to execute analysis prompts
- Maintain quality standards for all outputs
- Document any deviations or additional insights

### Workflow Continuity
- Complete steps in sequential order for best results
- Each step builds upon previous research and insights
- Review previous findings when executing later steps
- Update workflow state tracking regularly

### Output Quality
- Follow naming conventions for all files
- Use provided templates and frameworks
- Ensure outputs are actionable and specific
- Include source references and supporting data

## Troubleshooting

### Common Issues
- **Missing brand profile:** Ensure Step 1 is completed before proceeding
- **Incomplete research:** Verify all manual research actions are completed
- **File organization:** Follow exact naming conventions and folder structure
- **API limitations:** Account for rate limits and data availability

### Getting Help
- Review individual step scripts for detailed configurations
- Check execution guides for step-specific instructions
- Verify all prerequisites and API access
- Ensure Python environment and dependencies are properly configured

## Expected Timeline
- **Step 1:** 30-60 minutes (interactive brand profile collection)
- **Steps 2-4:** 2-4 hours each (research execution and analysis)
- **Steps 5-7:** 1-3 hours each (analysis and synthesis)
- **Step 7.5:** 2-3 hours (strategic concept generation and validation)
- **Steps 8-9:** 2-4 hours each (creative generation and strategic compilation)

**Total estimated time:** 17-28 hours of focused work over 1-2 weeks

This comprehensive workflow provides a systematic approach to developing high-converting ad campaigns based on thorough market research, competitive intelligence, and audience insights.