# Ad Analysis and Script Writer - Streamlined Workflow Guide

## Overview
This guide provides complete instructions for executing the streamlined 4-phase ad analysis and script writing workflow using Claude Code and the phased orchestrator system, optimized for essential steps only.

## Workflow Structure

### **Phase 1: Foundation** (Brand setup and research collection)
1. **Brand_Setup** - Brand profile creation and folder structure
2. **Research_Perplexity** - Market and audience research using Perplexity MCP
3. **Research_Reddit** - Social listening and authentic voice capture

### **Phase 2: Analysis** (Strategic analysis)
4. **Competitive_Analysis** - Deep dive into competitor strategies and positioning
5. **Gap_Analysis** - Strategic opportunity identification

### **Phase 3: Creative_Development** (Concept, copy, and script generation)
6. **Concept_Generation** - Strategic concept ideation (3 concepts × 3-5 formats)
7. **Copy_Development** - Hook/headline creation with performance scoring
8. **Script_Generation** - Full script variations using validated concepts and copy
9. **Creative_Validation** - Final concept and script validation framework

### **Phase 4: Finalization** (Strategic analysis and implementation roadmap)
10. **Creative_Brief** - Production-ready creative brief for team handoff
11. **Final_Analysis** - Comprehensive strategic analysis and implementation roadmap

## Prerequisites
- Python 3.7+ installed
- Access to the following APIs/tools:
  - Perplexity MCP
  - Reddit API  
  - Claude Code

## Quick Start

### Option 1: Execute Complete Workflow
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --competitors "Competitor1,Competitor2,Competitor3" --full --streamlined
```

### Option 2: Execute Specific Phase
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --phase 1 --streamlined  # Foundation
python phased_workflow_orchestrator.py --brand "Your Brand Name" --phase 2 --streamlined  # Analysis
python phased_workflow_orchestrator.py --brand "Your Brand Name" --phase 3 --streamlined  # Creative Development
python phased_workflow_orchestrator.py --brand "Your Brand Name" --phase 4 --streamlined  # Finalization
```

### Option 3: Execute Individual Steps
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Brand_Setup --streamlined
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Research_Perplexity --streamlined
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Concept_Generation --streamlined
# ... etc
```

### Option 4: Check Workflow Status
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --status --streamlined
```

## Detailed Phase Instructions

## Phase 1: Foundation

### Brand_Setup
**Purpose:** Create organized project structure and comprehensive brand profile

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Brand_Setup --streamlined
```

**What happens:**
- Creates complete folder structure for all phases
- Generates brand profile template
- Sets up workflow state tracking
- Creates project README and organization

**Output files:**
- `Projects/{brand_name}/Brand/{brand_name}_info.json`
- Complete folder structure including Copy folder

### Research_Perplexity
**Purpose:** Conduct comprehensive market and audience research

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Research_Perplexity --streamlined
```

**Manual actions required:**
1. Use Perplexity MCP to execute the generated research prompt
2. Save research results to the Perplexity folder
3. Review and organize findings

**Output files:**
- `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_prompt.md`
- (Manual creation) `Projects/{brand_name}/Perplexity/{brand_name}_perplexity_results.md`

### Research_Reddit  
**Purpose:** Capture authentic audience voice and social listening insights

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Research_Reddit --streamlined
```

**Manual actions required:**
1. Use Reddit API to collect data according to configuration
2. Apply analysis prompts to extract insights
3. Document findings in structured format

**Output files:**
- `Projects/{brand_name}/Reddit/{brand_name}_reddit_config.json`
- (Manual creation) `Projects/{brand_name}/Reddit/{brand_name}_reddit_results.json`

## Phase 2: Analysis

### Competitive_Analysis
**Purpose:** Deep dive into competitor strategies and market positioning

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Competitive_Analysis --streamlined
```

**Manual actions required:**
1. Conduct comprehensive competitive analysis using research data
2. Create competitive positioning map
3. Identify competitive advantages and threats

**Analysis components:**
- Messaging analysis and positioning strategies
- Creative strategy and format analysis
- Audience targeting and segmentation analysis
- Performance indicators and market positioning

**Output files:**
- `Projects/{brand_name}/Gap_Analysis/{brand_name}_competitive_analysis_prompt.md`
- (Manual creation) `Projects/{brand_name}/Gap_Analysis/{brand_name}_competitive_analysis.md`

### Gap_Analysis
**Purpose:** Identify strategic opportunities through comprehensive gap analysis

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Gap_Analysis --streamlined
```

**Manual actions required:**
1. Conduct systematic gap analysis using all research data
2. Identify priority opportunities for market differentiation
3. Develop strategic recommendations with implementation priorities

**Analysis dimensions:**
- Messaging gaps and opportunities
- Creative format differentiation possibilities
- Audience targeting white space
- Positioning opportunities and competitive advantages

**Output files:**
- `Projects/{brand_name}/Gap_Analysis/{brand_name}_gap_analysis_prompt.md`
- (Manual creation) `Projects/{brand_name}/Gap_Analysis/{brand_name}_gap_analysis.md`

## Phase 3: Creative Development

### Concept_Generation
**Purpose:** Generate 3 strategic ad concepts using comprehensive ideation frameworks

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Concept_Generation --streamlined
```

**What happens:**
- Strategic concept generation framework with comprehensive prompt
- Concept validation framework with scoring matrices
- Integration of concept_ideation.md methodology
- Template structure for 3 concepts × 3-5 formats = 15 total ads

**Manual actions required:**
1. Execute concept generation using comprehensive framework
2. Develop 3 strategic concepts based on gap analysis insights
3. Validate concepts using provided scoring framework
4. Select optimal formats for each concept

**Output files:**
- `Projects/{brand_name}/Concepts/{brand_name}_concept_generation_prompt.md`
- `Projects/{brand_name}/Concepts/{brand_name}_concept_validation_framework.md`
- (Manual creation) `Projects/{brand_name}/Concepts/{brand_name}_validated_concepts.md`

### Copy_Development ⭐ ESSENTIAL STEP
**Purpose:** Develop high-converting hooks and headlines with performance scoring

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Copy_Development --streamlined
```

**What happens:**
- Integration of complete copy_prompt.md framework with scoring system
- Direct-response copywriting principles and guidelines
- Performance prediction framework with 5-dimension scoring
- Platform-native copy development for TikTok, Facebook, Instagram

**Manual actions required:**
1. Review validated concepts from Concept_Generation
2. Develop 3-5 hooks per concept using copy framework
3. Score each hook using 5-dimension framework (25-point scale)
4. Create copy bank with highest-scoring hooks

**Copy scoring framework:**
1. **Attention Capture** (1-5) - Will it stop the scroll?
2. **Emotional Resonance** (1-5) - Triggers specific emotions?
3. **Benefit Clarity** (1-5) - Core promise immediately clear?
4. **Call-to-Action Strength** (1-5) - Creates urgency?
5. **Memorability** (1-5) - Contains "sticky" elements?

**Decision guide:**
- 21-25: Green light - exceptional potential
- 16-20: Proceed with optimizations
- Below 16: Rework - unlikely to perform

**Output files:**
- `Projects/{brand_name}/Copy/{brand_name}_copy_development_prompt.md`
- (Manual creation) `Projects/{brand_name}/Copy/{brand_name}_copy_bank.md`

### Script_Generation ⭐ ENHANCED WITH FRAMEWORKS
**Purpose:** Generate complete script variations using validated concepts, scored copy, and professional script frameworks

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Script_Generation --streamlined
```

**What happens:**
- **10 Professional Script Frameworks** integrated from secondary_copy_prompt.md
- **Framework Selection Guide** based on audience awareness levels
- **Platform-Specific Templates** for video, static, and carousel formats
- **Enhanced Script Structure** with building blocks and timing guidance
- Direct integration of validated concepts and scored copy from previous steps

**Script frameworks available:**
1. **Quick Product Highlight** - Product-aware audiences, quick conversion
2. **Problem-Solution with Authority** - Unaware audiences, complex products
3. **Ingredient-Focused** - Solution-aware, unique formulation emphasis
4. **Concise Conversion** - Solution-aware, clear transformation focus
5. **Native Trend Leverager** - Problem-aware, trending content integration
6. **Expert Authority** - Unaware audiences, complex problem solving
7. **Comprehensive Benefits** - Problem-aware, multiple benefit highlighting
8. **Strong Offer** - Solution-aware, transformation-focused offers
9. **Soft Sell** - Product-aware, trust and relationship building
10. **Claim-Based** - Most-aware audiences, direct claims and proof

**Framework selection process:**
- **Awareness Level Assessment** (from concept validation)
- **Platform Requirements** (TikTok vs Facebook vs Instagram)
- **Product Complexity** (simple vs complex formulations)
- **Marketing Objective** (conversion vs awareness vs trust)

**Manual actions required:**
1. **Framework Selection:** Choose appropriate framework for each of 15 scripts
2. **Copy Integration:** Use highest-scoring hooks from Copy_Development
3. **Building Block Implementation:** Follow framework structure with brand voice
4. **Platform Optimization:** Adapt scripts for platform-specific performance

**Enhanced script structure:**
- **Strategic Foundation:** Concept alignment and gap addressing
- **Framework Rationale:** Why specific framework was selected
- **Complete Building Blocks:** Step-by-step framework implementation
- **Platform Optimizations:** Visual, audio, and engagement strategies
- **Performance Predictions:** Expected metrics based on copy scores

**Output files:**
- `Projects/{brand_name}/Script/{brand_name}_script_generation_prompt.md`
- (Manual creation) `Projects/{brand_name}/Script/{brand_name}_complete_scripts.md`

### Creative_Validation
**Purpose:** Final validation of all creative assets for production readiness

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Creative_Validation --streamlined
```

**What happens:**
- Comprehensive validation framework for concepts, copy, and scripts
- Strategic alignment validation against gap analysis
- Copy performance validation using scoring thresholds
- Script quality and production feasibility assessment

**Manual actions required:**
1. Validate strategic alignment of all creative assets
2. Confirm copy performance meets minimum thresholds
3. Assess script quality and production feasibility
4. Create production priority matrix

**Validation framework:**
- Strategic alignment validation (1-5 scale)
- Copy performance threshold validation
- Script quality scoring (1-10 scale)
- Portfolio balance and coverage assessment
- Production feasibility and resource planning

**Output files:**
- `Projects/{brand_name}/Script/{brand_name}_creative_validation_prompt.md`
- (Manual creation) `Projects/{brand_name}/Script/{brand_name}_creative_validation.md`

## Phase 4: Finalization

### Creative_Brief ⭐ ESSENTIAL STEP
**Purpose:** Create comprehensive creative brief for production team handoff

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Creative_Brief --streamlined
```

**What happens:**
- Integration of complete brief_prompt.md framework for production handoff
- Comprehensive campaign overview with strategic foundation
- Detailed concept summaries with performance predictions
- Complete format executions with production requirements
- Production priority matrix with tier-based timeline

**Manual actions required:**
1. Review all validated creative assets from previous phases
2. Consolidate strategic insights into campaign overview
3. Create detailed format specifications for production
4. Establish measurement and optimization framework

**Creative brief structure:**
1. **Campaign Overview** - Strategic foundation and target audience
2. **Concept Summary** - 3 validated concepts with performance scores
3. **Format Executions** - 15 detailed format specifications
4. **Brand Guidelines** - Voice, language, and compliance requirements
5. **Production Priority Matrix** - Tier-based implementation timeline
6. **Measurement Framework** - KPIs and optimization protocol
7. **Risk Management** - Contingencies and backup plans

**Production handoff includes:**
- **Visual Direction:** Imagery, color palette, typography specifications
- **Production Requirements:** Talent notes, locations, technical specs
- **Messaging Strategy:** Pain points, outcomes, social proof elements
- **Performance Predictions:** Expected metrics based on validation scores

**Output files:**
- `Projects/{brand_name}/Completed_Analysis/{brand_name}_creative_brief_prompt.md`
- (Manual creation) `Projects/{brand_name}/Completed_Analysis/{brand_name}_creative_brief.md`

### Final_Analysis
**Purpose:** Compile comprehensive strategic analysis and implementation roadmap

**Execution:**
```bash
python phased_workflow_orchestrator.py --brand "Your Brand Name" --step Final_Analysis --streamlined
```

**What happens:**
- Comprehensive synthesis of all phase insights
- Strategic SWOT analysis and market positioning
- Implementation roadmap with 3-phase timeline
- Success metrics and optimization framework

**Manual actions required:**
1. Synthesize all research and analysis into executive summary
2. Create comprehensive strategic recommendations
3. Develop detailed implementation roadmap
4. Define success metrics and optimization protocols

**Analysis components:**
- Executive summary with key strategic insights
- Market intelligence and competitive positioning
- Creative strategy summary and recommendations
- Implementation roadmap (Foundation → Optimization → Scale)
- Success framework and risk management

**Output files:**
- `Projects/{brand_name}/Completed_Analysis/{brand_name}_final_analysis_prompt.md`
- (Manual creation) `Projects/{brand_name}/Completed_Analysis/{brand_name}_strategic_analysis.md`

## File Organization (Streamlined)

```
Ad Workflow/
├── phased_workflow_orchestrator.py     # Phased orchestrator with --streamlined flag
├── workflow_steps/                     # Individual step scripts
└── Projects/{brand_name}/              # Brand-specific project folder
    ├── Brand/                          # Brand profile and guidelines
    ├── Perplexity/                     # Market research results
    ├── Reddit/                         # Social listening insights
    ├── Gap_Analysis/                   # Strategic and competitive analysis
    ├── Concepts/                       # Strategic concept generation
    ├── Copy/                           # Hook/headline development
    ├── Script/                         # Complete script variations
    └── Completed_Analysis/             # Final strategic analysis
```

## Key Improvements in Streamlined Version

### 1. **Removed Steps**
- **Research_Apify** - Facebook Ads Library scraping (can be done manually if needed)
- **Transcription_Analysis** - AssemblyAI video/audio analysis
- **Script_Analysis** - Script guidelines from transcripts

### 2. **Essential Step Focus**
- **Copy_Development** - Critical for high-converting hooks
- **Script_Generation** - Enhanced with 10 professional frameworks
- **Creative_Validation** - Ensures production readiness
- **Competitive_Analysis** - Manual research-based analysis
- **Gap_Analysis** - Strategic opportunity identification

### 3. **Streamlined Benefits**
- **Faster execution** - 11 steps vs 14 steps
- **Essential focus** - Only critical path steps included
- **Lower complexity** - Fewer API dependencies
- **Higher efficiency** - Concentrate on highest-impact activities

### 4. **Maintained Quality**
- All essential frameworks and methodologies preserved
- Copy performance scoring system included
- Professional script frameworks integrated
- Strategic analysis depth maintained

## Best Practices

### Workflow Execution
- Complete phases in sequential order for optimal results
- Each step builds upon previous research and insights
- Use `--streamlined` flag for focused execution
- Review previous findings when executing later steps

### Quality Standards
- Follow comprehensive frameworks for each step
- Use Claude Code to execute analysis prompts effectively
- Maintain quality standards for all outputs
- Focus on manual research for competitive analysis

### Creative Development
- **Phase 3 is critical** - follow the sequence exactly:
  1. Generate concepts based on gap analysis
  2. Develop scored copy for validated concepts
  3. Create scripts using validated concepts and scored copy
  4. Validate all assets before production

## Expected Timeline (Streamlined)
- **Phase 1 (Foundation):** 4-6 hours (research execution and analysis)
- **Phase 2 (Analysis):** 3-5 hours (strategic analysis without transcription)
- **Phase 3 (Creative Development):** 8-12 hours (concept, copy, script development)
- **Phase 4 (Finalization):** 4-6 hours (creative brief + strategic compilation)

**Total estimated time:** 19-29 hours of focused work over 1-2 weeks

## Manual Research Guidance

### Competitive Analysis (Without Apify)
1. **Manual Facebook Ads Library Search:**
   - Visit Facebook Ads Library directly
   - Search competitor brand names and industry terms
   - Document messaging patterns and creative approaches
   - Analyze targeting strategies and performance indicators

2. **Alternative Research Sources:**
   - Competitor websites and landing pages
   - Social media content analysis
   - Industry reports and case studies
   - Marketing intelligence platforms (if available)

### Script Analysis (Without Transcription)
1. **Manual Video Analysis:**
   - Review competitor video ads manually
   - Document script structures and messaging patterns
   - Identify effective hooks and call-to-actions
   - Note visual and audio strategies

2. **Industry Best Practices:**
   - Research platform-specific best practices
   - Review case studies and successful campaigns
   - Apply proven script frameworks from the system

## Troubleshooting

### Common Issues
- **Missing prerequisites:** Ensure Perplexity MCP and Reddit API are configured
- **Phase dependencies:** Complete phases in order - later phases depend on earlier work
- **Manual research:** Plan extra time for manual competitive analysis
- **File organization:** Follow exact naming conventions and folder structure

### Getting Help
- Use `--status --streamlined` flag to check current progress
- Review individual step prompts for detailed instructions
- Focus on essential steps for maximum impact with minimum complexity
- Leverage Claude Code for comprehensive analysis execution

This streamlined workflow provides a focused, efficient approach to developing high-converting ad campaigns while maintaining the essential strategic frameworks and creative development processes.