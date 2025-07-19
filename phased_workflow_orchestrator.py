#!/usr/bin/env python3
"""
Ad Analysis and Script Writer - Phased Workflow Orchestrator

This script orchestrates the 4-phase ad analysis and script writing process.
Each phase contains multiple steps that can be executed independently or as part
of the complete workflow.

Phases:
1. Foundation: Brand setup and research collection
2. Analysis: Competitive and strategic analysis
3. Creative Development: Concept, copy, and script generation
4. Finalization: Strategic analysis and implementation roadmap

Usage:
    python phased_workflow_orchestrator.py --brand "Brand Name" [--phase N] [--step Step_Name] [--competitors "Comp1,Comp2"]
"""

import os
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional

class PhasedWorkflowOrchestrator:
    def __init__(self, brand_name: str, competitors: List[str] = None):
        self.brand_name = brand_name.replace(" ", "_").lower()
        self.original_brand_name = brand_name
        self.competitors = competitors or []
        self.base_path = Path("/Users/nataliebasque/Ad Workflow")
        self.brand_folder = self.base_path / "Projects" / self.brand_name
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Define workflow phases and steps
        self.workflow_phases = {
            1: {
                "name": "Foundation",
                "description": "Brand setup and research collection",
                "steps": ["Brand_Setup", "Research_Perplexity", "Research_Reddit", "Research_Apify"]
            },
            2: {
                "name": "Analysis", 
                "description": "Competitive and strategic analysis",
                "steps": ["Transcription_Analysis", "Script_Analysis", "Competitive_Analysis", "Gap_Analysis"]
            },
            3: {
                "name": "Creative_Development",
                "description": "Concept, copy, and script generation", 
                "steps": ["Concept_Generation", "Copy_Development", "Script_Generation", "Creative_Validation"]
            },
            4: {
                "name": "Finalization",
                "description": "Strategic analysis and implementation roadmap",
                "steps": ["Creative_Brief", "Final_Analysis"]
            }
        }
        
        # Workflow state tracking
        self.workflow_state = {
            "brand_name": brand_name,
            "competitors": self.competitors,
            "phases_completed": [],
            "steps_completed": [],
            "current_phase": 1,
            "created_at": self.timestamp,
            "last_updated": self.timestamp
        }
        
        # Import required modules
        import sys
        sys.path.append(str(self.base_path / "workflow_steps"))
    
    def setup_folder_structure(self):
        """Phase 1, Step 1: Create organized folder structure for the brand"""
        print(f"📁 Foundation Phase - Brand Setup for {self.original_brand_name}...")
        
        folders = [
            "Brand",
            "Perplexity", 
            "Reddit",
            "Apify",
            "AssemblyAI", 
            "Guide",
            "Gap_Analysis",
            "Concepts",
            "Copy",
            "Script",
            "Completed_Analysis"
        ]
        
        for folder in folders:
            folder_path = self.brand_folder / folder
            folder_path.mkdir(parents=True, exist_ok=True)
            
        # Create brand info file
        brand_info = {
            "brand_name": self.brand_name,
            "original_name": self.original_brand_name,
            "competitors": self.competitors,
            "created_at": self.timestamp,
            "folder_structure": folders,
            "workflow_type": "phased"
        }
        
        with open(self.brand_folder / "Brand" / f"{self.brand_name}_info.json", "w") as f:
            json.dump(brand_info, f, indent=2)
            
        print(f"✅ Brand Setup Complete: Folder structure created at {self.brand_folder}")
        return True
    
    def execute_perplexity_research(self):
        """Phase 1, Step 2: Execute Perplexity research using MCP"""
        print("🔍 Foundation Phase - Perplexity Research...")
        
        # Read the audience research prompt
        prompt_file = self.base_path / "Prompt_Database" / "audience_perplexity_prompt.md"
        with open(prompt_file, "r") as f:
            base_prompt = f.read()
        
        # Customize prompt for this brand
        research_prompt = f"""
Brand: {self.original_brand_name}
Competitors: {', '.join(self.competitors)}

{base_prompt}

Focus your research on:
1. Target audience for {self.original_brand_name} and similar brands
2. Pain points and emotional drivers specific to this market
3. Language patterns and cultural tensions
4. Existing solutions and market perception
5. Competitive landscape insights
"""
        
        # Save prompt for execution
        output_file = self.brand_folder / "Perplexity" / f"{self.brand_name}_perplexity_prompt.md"
        with open(output_file, "w") as f:
            f.write(research_prompt)
            
        print(f"📝 Perplexity research prompt saved to: {output_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute this prompt using Perplexity MCP")
        print(f"💾 Save results as: {self.brand_folder}/Perplexity/{self.brand_name}_perplexity_results.md")
        
        return True
    
    def execute_reddit_research(self):
        """Phase 1, Step 3: Execute Reddit research using API"""
        print("🔍 Foundation Phase - Reddit Research...")
        
        research_config = {
            "brand": self.original_brand_name,
            "competitors": self.competitors,
            "subreddits_to_search": [
                "marketing", "advertising", "entrepreneur", "smallbusiness",
                "reviews", "askreddit", "personalfinance", "buyitforlife"
            ],
            "search_terms": [
                self.original_brand_name,
                *self.competitors,
                "alternatives to " + self.original_brand_name,
                "vs " + self.original_brand_name
            ],
            "output_file": f"{self.brand_folder}/Reddit/{self.brand_name}_reddit_results.json"
        }
        
        config_file = self.brand_folder / "Reddit" / f"{self.brand_name}_reddit_config.json"
        with open(config_file, "w") as f:
            json.dump(research_config, f, indent=2)
            
        print(f"📝 Reddit research config saved to: {config_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute Reddit API research")
        print(f"💾 Save results as: {self.brand_folder}/Reddit/{self.brand_name}_reddit_results.json")
        
        return True
    
    def execute_apify_scraping(self):
        """Phase 1, Step 4: Execute Facebook Ads Library scraping using Apify MCP"""
        print("🔍 Foundation Phase - Apify Facebook Ads Scraping...")
        
        scraping_config = {
            "brands_to_scrape": [self.original_brand_name] + self.competitors,
            "search_terms": [
                self.original_brand_name,
                *self.competitors
            ],
            "output_format": "json",
            "include_images": True,
            "include_videos": True,
            "max_ads_per_brand": 50,
            "output_file": f"{self.brand_folder}/Apify/{self.brand_name}_apify_results.json"
        }
        
        config_file = self.brand_folder / "Apify" / f"{self.brand_name}_apify_config.json"
        with open(config_file, "w") as f:
            json.dump(scraping_config, f, indent=2)
            
        print(f"📝 Apify scraping config saved to: {config_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute Apify MCP for Facebook Ads Library")
        print(f"💾 Save results as: {self.brand_folder}/Apify/{self.brand_name}_apify_results.json")
        
        return True
    
    def execute_assemblyai_transcription(self):
        """Phase 2, Step 1: Execute AssemblyAI transcription for video/audio ads"""
        print("🔍 Analysis Phase - AssemblyAI Transcription...")
        
        transcription_config = {
            "api_settings": {
                "api_key": "your_assemblyai_api_key_here",
                "api_url": "https://api.assemblyai.com/v2/transcript"
            },
            "input_sources": {
                "apify_videos": f"{self.brand_folder}/Apify/videos/",
                "manual_uploads": f"{self.brand_folder}/AssemblyAI/input_videos/",
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
            }
        }
        
        # Create AssemblyAI folder
        assemblyai_folder = self.brand_folder / "AssemblyAI"
        assemblyai_folder.mkdir(exist_ok=True)
        
        config_file = assemblyai_folder / f"{self.brand_name}_assemblyai_config.json"
        with open(config_file, "w") as f:
            json.dump(transcription_config, f, indent=2)
            
        print(f"📝 AssemblyAI transcription config saved to: {config_file}")
        print("🚨 MANUAL ACTION REQUIRED:")
        print("1. Update API key in config file")
        print(f"2. Execute AssemblyAI transcription using: python workflow_steps/assemblyai_integration.py --brand '{self.original_brand_name}' --action transcribe")
        print(f"3. Analyze results using: python workflow_steps/assemblyai_integration.py --brand '{self.original_brand_name}' --action analyze")
        print(f"💾 Results will be saved to: {self.brand_folder}/AssemblyAI/")
        print("🎯 Enhanced features: Sentiment analysis, entity detection, auto-highlights")
        
        return True
    
    def analyze_scripts_and_create_guide(self):
        """Phase 2, Step 2: Analyze scripts and create best practices guide"""
        print("📊 Analysis Phase - Script Analysis and Guide Creation...")
        
        analysis_prompt = f"""
Brand: {self.original_brand_name}

Based on the transcribed video ads in the AssemblyAI folder, analyze:

1. Script Structures:
   - Common opening hooks
   - Problem identification patterns
   - Solution presentation methods
   - Call-to-action formats

2. Tone Analysis:
   - Emotional triggers used
   - Language patterns
   - Urgency creation techniques
   - Trust-building elements

3. Key Performance Indicators:
   - Length patterns of high-performing scripts
   - Repetition and emphasis techniques
   - Visual-audio coordination cues
   - Platform-specific adaptations

4. Brand Voice Guidelines:
   - Recommended tone for {self.original_brand_name}
   - Language patterns to adopt/avoid
   - Emotional positioning strategy
   - Differentiation opportunities

Create a comprehensive script writing guide for {self.original_brand_name} based on this analysis.
"""
        
        guide_file = self.brand_folder / "Guide" / f"{self.brand_name}_script_analysis_prompt.md"
        with open(guide_file, "w") as f:
            f.write(analysis_prompt)
            
        print(f"📝 Script analysis prompt saved to: {guide_file}")
        print("🚨 MANUAL ACTION REQUIRED: Analyze transcripts and create guide")
        print(f"💾 Save guide as: {self.brand_folder}/Guide/{self.brand_name}_script_guide.md")
        
        return True
    
    def execute_competitive_analysis(self):
        """Phase 2, Step 3: Execute deep competitive analysis"""
        print("📊 Analysis Phase - Competitive Analysis...")
        
        competitive_analysis_prompt = f"""
Brand: {self.original_brand_name}
Competitors: {', '.join(self.competitors)}

Using data from Foundation Phase research (Perplexity, Reddit, Apify, AssemblyAI), conduct deep competitive analysis:

## Competitive Landscape Mapping

### 1. Messaging Analysis
- Core value propositions of each competitor
- Emotional positioning strategies
- Unique selling propositions
- Brand voice and tone characteristics

### 2. Creative Strategy Analysis
- Dominant creative formats in the category
- Visual style and brand identity patterns
- Video vs static content preferences
- Platform-specific creative adaptations

### 3. Audience Targeting Analysis
- Primary audience segments targeted by competitors
- Demographics and psychographics focus
- Messaging customization by audience segment
- Awareness level targeting strategies

### 4. Performance Indicators
- High-engagement creative patterns
- Successful campaign structures
- Timing and frequency patterns
- Budget and bidding strategy indicators

### 5. Market Positioning Map
Create a competitive positioning map showing:
- Quality vs Price positioning
- Traditional vs Innovative approaches
- Mass market vs Niche targeting
- Where {self.original_brand_name} fits and opportunities for differentiation

## Strategic Recommendations
Based on competitive analysis, provide:
- Market gaps and opportunities
- Competitive advantages to leverage
- Threats to address
- Strategic positioning recommendations
"""
        
        competitive_file = self.brand_folder / "Gap_Analysis" / f"{self.brand_name}_competitive_analysis_prompt.md"
        with open(competitive_file, "w") as f:
            f.write(competitive_analysis_prompt)
            
        print(f"📝 Competitive analysis prompt saved to: {competitive_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute competitive analysis")
        print(f"💾 Save analysis as: {self.brand_folder}/Gap_Analysis/{self.brand_name}_competitive_analysis.md")
        
        return True
    
    def execute_gap_analysis(self):
        """Phase 2, Step 4: Execute strategic gap analysis"""
        print("📊 Analysis Phase - Gap Analysis...")
        
        gap_analysis_prompt = f"""
Brand: {self.original_brand_name}
Competitors: {', '.join(self.competitors)}

Using data from Foundation Phase and Competitive Analysis, identify strategic opportunities:

## Gap Analysis Framework

### 1. Messaging Gaps
- What messages are competitors using heavily?
- What pain points are underaddressed?
- What emotional drivers are missed?
- What audience segments are overlooked?

### 2. Creative Format Gaps
- What ad formats dominate the space?
- What creative approaches are saturated?
- What untested formats could work?
- What platform-specific opportunities exist?

### 3. Audience Targeting Gaps
- What demographics are over-targeted?
- What psychographics are missed?
- What life moments are unexplored?
- What awareness levels are underserved?

### 4. Positioning Opportunities
- How can {self.original_brand_name} differentiate?
- What competitive weaknesses can be exploited?
- What market tensions can be resolved?
- What cultural trends can be leveraged?

### 5. Strategic Priority Matrix
Rate opportunities by:
- Market size and potential
- Competitive intensity
- Implementation difficulty
- Strategic fit with brand

## Implementation Roadmap
- Priority messaging directions
- Recommended creative formats
- Target audience expansion opportunities
- Campaign sequencing strategy
"""
        
        gap_file = self.brand_folder / "Gap_Analysis" / f"{self.brand_name}_gap_analysis_prompt.md"
        with open(gap_file, "w") as f:
            f.write(gap_analysis_prompt)
            
        print(f"📝 Gap analysis prompt saved to: {gap_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute gap analysis")
        print(f"💾 Save analysis as: {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md")
        
        return True
    
    def execute_concept_generation(self):
        """Phase 3, Step 1: Generate strategic concepts using ideation frameworks"""
        print("💡 Creative Development Phase - Concept Generation...")
        
        # Import the function from steps_5_through_9
        from steps_5_through_9 import execute_concept_generation
        
        # Execute concept generation
        success = execute_concept_generation(self.original_brand_name, str(self.base_path))
        
        if success:
            print("✅ Concept Generation Complete")
            print(f"📁 Concepts saved to: {self.brand_folder}/Concepts/")
            print("🎯 Framework: 3 concepts × 3-5 formats = 15 total ads")
        else:
            print("❌ Concept Generation Failed")
            
        return success
    
    def execute_copy_development(self):
        """Phase 3, Step 2: Develop hooks and headlines with performance scoring"""
        print("✍️ Creative Development Phase - Copy Development...")
        
        # Read copy prompt with scoring framework
        copy_prompt_file = self.base_path / "Prompt_Database" / "copy_prompt.md"
        with open(copy_prompt_file, "r") as f:
            copy_prompt_content = f.read()
        
        copy_development_prompt = f"""
# Strategic Copy Development: {self.original_brand_name}

## Objective
Develop high-converting hooks and headlines for the 3 validated concepts from Concept Generation, using proven direct-response copywriting principles and performance scoring.

## Foundation Review
Before developing copy, review:
1. **Validated Concepts:** {self.brand_folder}/Concepts/{self.brand_name}_validated_concepts.md
2. **Gap Analysis:** {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md
3. **Competitive Analysis:** {self.brand_folder}/Gap_Analysis/{self.brand_name}_competitive_analysis.md
4. **Brand Voice:** {self.brand_folder}/Guide/{self.brand_name}_script_guide.md

## Copy Development Framework

{copy_prompt_content}

## Output Requirements

For each of the 3 validated concepts, develop:

### Concept 1: [Insert Concept Name]
**Target Audience:** [From concept validation]
**Core Emotion:** [From concept validation]
**Platform Formats:** [3-5 formats as validated]

**Headlines/Hooks:**
1. **Primary Hook** (TikTok/Reels - Raw, POV style)
   - Text: 
   - Audio: 
   - Performance Score: ___/25

2. **Secondary Hook** (Facebook - Clear, benefit-led)
   - Text:
   - Performance Score: ___/25

3. **Story Hook** (Instagram - Visual overlay)
   - Text:
   - Performance Score: ___/25

[Repeat for remaining formats]

### Concept 2: [Insert Concept Name]
[Same structure as Concept 1]

### Concept 3: [Insert Concept Name]
[Same structure as Concept 1]

## Performance Validation
Use the 5-dimension scoring framework (1-5 scale) for each hook:
1. **Attention Capture** - Will it stop the scroll?
2. **Emotional Resonance** - Does it trigger specific emotions?
3. **Benefit Clarity** - Is the core promise immediately clear?
4. **Call-to-Action Strength** - Does it create urgency?
5. **Memorability** - Contains "sticky" elements?

**Decision Guide:**
- 21-25: Green light - exceptional potential
- 16-20: Proceed with optimizations
- Below 16: Rework - unlikely to perform

## Final Deliverable
Create a copy bank with 3-5 tested hooks per concept (9-15 total hooks) ready for script development.
"""
        
        # Create Copy folder and save prompt
        copy_folder = self.brand_folder / "Copy"
        copy_folder.mkdir(exist_ok=True)
        
        copy_file = copy_folder / f"{self.brand_name}_copy_development_prompt.md"
        with open(copy_file, "w") as f:
            f.write(copy_development_prompt)
            
        print(f"📝 Copy development prompt saved to: {copy_file}")
        print("🚨 MANUAL ACTION REQUIRED: Develop and score hooks/headlines")
        print(f"💾 Save copy bank as: {self.brand_folder}/Copy/{self.brand_name}_copy_bank.md")
        print("🎯 Output: 9-15 scored hooks ready for script development")
        
        return True
    
    def generate_scripts(self):
        """Phase 3, Step 3: Generate full script variations using validated concepts and copy"""
        print("✍️ Creative Development Phase - Script Generation...")
        
        # Read secondary copy prompt with script frameworks
        secondary_copy_file = self.base_path / "Prompt_Database" / "secondary_copy_prompt.md"
        with open(secondary_copy_file, "r") as f:
            secondary_copy_framework = f.read()
        
        script_generation_prompt = f"""
# Strategic Script Generation: {self.original_brand_name}

## Objective
Generate 15 complete script variations using the validated concepts from Concept Generation and scored copy from Copy Development.

## Foundation Review
Essential inputs for script generation:
1. **Validated Concepts:** {self.brand_folder}/Concepts/{self.brand_name}_validated_concepts.md
2. **Scored Copy Bank:** {self.brand_folder}/Copy/{self.brand_name}_copy_bank.md
3. **Script Guide:** {self.brand_folder}/Guide/{self.brand_name}_script_guide.md
4. **Gap Analysis:** {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md

## Script Development Requirements

### Implementation Strategy
- **Direct Implementation:** Use validated concepts and scored copy (do NOT create new concepts)
- **Performance Focus:** Implement highest-scoring hooks from copy development
- **Strategic Alignment:** Ensure scripts address gap analysis opportunities
- **Brand Consistency:** Follow script guide voice and tone recommendations

## Script Framework Selection & Development

{secondary_copy_framework}

## Script Development Process

### Step 1: Framework Selection
For each of the 15 scripts, select the most appropriate framework from the 10 options above based on:
- **Audience Awareness Level:** (From concept validation)
- **Platform Requirements:** (TikTok vs Facebook vs Instagram)
- **Concept Strategy:** (Authority vs Benefits vs Problem-Solution)
- **Product Complexity:** (Simple vs Complex formulation)

### Step 2: Hook Integration
- Use the highest-scoring hooks from Copy Development step
- Ensure hooks align with selected script framework
- Adapt hook delivery to platform requirements

### Step 3: Complete Script Development
Follow the selected framework structure while incorporating:
- Validated concept messaging
- Scored copy elements
- Platform-specific optimizations
- Brand voice guidelines

### Output Structure: 15 Scripts Total
**Format Distribution:**
- Concept 1: 5 scripts (one per platform format)
- Concept 2: 5 scripts (one per platform format)
- Concept 3: 5 scripts (one per platform format)

**Platform Formats:**
1. **TikTok** (15-30 seconds) - Raw, authentic, UGC-style
2. **Instagram Reels** (15-30 seconds) - Polished, visually appealing
3. **Instagram Feed** (30-60 seconds) - Story-driven, engagement-focused
4. **Facebook Feed** (60-90 seconds) - Detailed, benefit-rich
5. **Facebook Stories** (15 seconds) - Quick, punchy, action-oriented

## Enhanced Script Template Structure

### Script [Number]: [Concept Name] - [Platform]

**Strategic Foundation:**
- **Hook:** [Use validated high-scoring hook from copy bank]
- **Target Audience:** [From concept validation]
- **Core Emotion:** [From concept validation]
- **Awareness Level:** [Unaware/Problem-Aware/Solution-Aware/Product-Aware/Most-Aware]
- **Strategic Gap Addressed:** [From gap analysis]

**Framework Selection:**
- **Selected Framework:** [Choose from 10 frameworks in secondary copy prompt]
- **Framework Rationale:** [Why this framework fits the concept/platform/audience]
- **Building Blocks Used:** [List specific framework elements being implemented]

**Complete Script Structure:**

#### For Video Formats (TikTok, Instagram Reels, Facebook):
Follow selected framework building blocks:

**[Framework Building Block 1]:** [0-3 seconds]
[Exact copy from copy bank or framework requirement]

**[Framework Building Block 2]:** [3-8 seconds]
[Based on selected framework structure]

**[Framework Building Block 3]:** [8-15 seconds]
[Continue framework sequence]

**[Continue framework blocks through completion]**

**[Final CTA Block]:** [Final 3-5 seconds]
[Platform-optimized call to action]

#### For Static/Image Formats (Instagram Feed, Facebook Feed):
**HEADLINE:** [Primary headline from copy bank]

**SUBHEADLINE:** [1 sentence that expands the promise]

**BENEFITS:**
- [Benefit 1 from framework]
- [Benefit 2 from framework]
- [Benefit 3 from framework]

**CTA:** [Clear action statement]

**URGENCY:** [Optional time/quantity limitation]

#### For Carousel Formats (when applicable):
**Slide 1:** Hook + Problem
**Slide 2-4:** Solution elements/benefits (one key point per slide)
**Slide 5:** Proof/testimonial
**Final Slide:** Offer + CTA

**Platform Optimizations:**
- **Visual Direction:** [Platform-specific visual elements]
- **Audio Strategy:** [Music, voiceover, sound effects for video]
- **Text Overlays:** [Key messages, captions, CTAs]
- **Engagement Optimization:** [Comments, shares, saves strategies]

**Performance Prediction:**
- **Copy Score:** [Score from copy development]
- **Framework Fit:** [How well framework matches concept]
- **Platform Alignment:** [Platform-specific success factors]
- **Expected Performance:** [Conversion/engagement prediction]

[Repeat enhanced template for all 15 scripts]

## Quality Checklist
Before finalizing scripts, ensure:
- ✅ All hooks come from validated copy bank
- ✅ Script framework selected based on awareness level and platform
- ✅ Framework building blocks properly implemented
- ✅ Concepts directly implement validated strategies
- ✅ Scripts address identified gap opportunities
- ✅ Platform optimizations are specific and actionable
- ✅ Brand voice aligns with script guide
- ✅ Static/carousel formats follow secondary copy structure
- ✅ Framework rationale clearly documented
- ✅ Clear measurement and optimization plan included

## Framework Quick Reference
**Video Script Frameworks Available:**
1. Quick Product Highlight - For product-aware, quick conversion
2. Problem-Solution with Authority - For unaware, complex products
3. Ingredient-Focused - For solution-aware, unique formulation
4. Concise Conversion - For solution-aware, clear transformation
5. Native Trend Leverager - For problem-aware, trending content
6. Expert Authority - For unaware, complex problems
7. Comprehensive Benefits - For problem-aware, multiple benefits
8. Strong Offer - For solution-aware, clear transformation
9. Soft Sell - For product-aware, trust building
10. Claim-Based - For most-aware, direct claims

**Static/Carousel Formats:**
- Headline + Subheadline + Benefits + CTA structure
- Carousel: Hook → Solution → Proof → CTA progression
"""
        
        script_file = self.brand_folder / "Script" / f"{self.brand_name}_script_generation_prompt.md"
        with open(script_file, "w") as f:
            f.write(script_generation_prompt)
            
        print(f"📝 Enhanced script generation prompt saved to: {script_file}")
        print("🚨 MANUAL ACTION REQUIRED: Generate 15 complete scripts using framework selection")
        print(f"💾 Save scripts as: {self.brand_folder}/Script/{self.brand_name}_complete_scripts.md")
        print("🎯 Features: 10 script frameworks, awareness-level selection, platform optimization")
        print("📋 Process: Select framework → Integrate scored copy → Build complete scripts")
        
        return True
    
    def execute_creative_validation(self):
        """Phase 3, Step 4: Final validation of concepts, copy, and scripts"""
        print("✅ Creative Development Phase - Creative Validation...")
        
        validation_prompt = f"""
# Creative Validation Framework: {self.original_brand_name}

## Validation Objective
Conduct final validation of all creative assets (concepts, copy, scripts) to ensure strategic alignment and performance optimization before finalization.

## Validation Inputs
Review and validate:
1. **Strategic Concepts:** {self.brand_folder}/Concepts/{self.brand_name}_validated_concepts.md
2. **Copy Bank:** {self.brand_folder}/Copy/{self.brand_name}_copy_bank.md  
3. **Complete Scripts:** {self.brand_folder}/Script/{self.brand_name}_complete_scripts.md
4. **Gap Analysis:** {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md

## Comprehensive Validation Framework

### 1. Strategic Alignment Validation
**Criteria:** Do creative assets address identified strategic opportunities?

For each concept:
- ✅ Addresses specific gap from gap analysis
- ✅ Leverages competitive advantages identified
- ✅ Targets underserved audience segments
- ✅ Implements differentiated positioning

**Scoring:** Rate alignment 1-5 for each concept
**Action:** Identify misalignments and recommend adjustments

### 2. Copy Performance Validation
**Criteria:** Do hooks meet performance prediction thresholds?

Review copy bank scores:
- ✅ Attention Capture scores ≥4/5
- ✅ Emotional Resonance scores ≥4/5  
- ✅ Benefit Clarity scores ≥4/5
- ✅ CTA Strength scores ≥3/5
- ✅ Memorability scores ≥3/5

**Action:** Flag low-scoring copy for optimization or replacement

### 3. Script Quality Validation
**Criteria:** Do scripts effectively implement concepts and copy?

For each of 15 scripts:
- ✅ Uses validated high-scoring hooks
- ✅ Implements concept messaging accurately
- ✅ Includes platform-specific optimizations
- ✅ Maintains brand voice consistency
- ✅ Has clear, compelling call-to-action

**Scoring:** Rate script quality 1-10 for each script
**Action:** Prioritize scripts scoring 8+ for immediate production

### 4. Portfolio Balance Validation
**Criteria:** Does the script portfolio provide strategic coverage?

Portfolio analysis:
- ✅ Covers all identified gap opportunities
- ✅ Targets different audience segments
- ✅ Tests various emotional approaches
- ✅ Includes diverse creative formats
- ✅ Balances risk (proven) vs innovation

**Action:** Identify portfolio gaps and recommend additions

### 5. Production Feasibility Validation
**Criteria:** Are scripts realistic for production and budget?

For each script:
- ✅ Production complexity assessment
- ✅ Resource requirements evaluation
- ✅ Timeline feasibility check
- ✅ Budget impact analysis
- ✅ Technical requirements review

**Action:** Create production priority matrix

## Final Recommendations

### Tier 1: Immediate Production (Scores 8-10)
List highest-performing scripts ready for immediate production

### Tier 2: Optimization Required (Scores 6-7)
List scripts needing minor adjustments before production

### Tier 3: Major Revision (Scores <6)
List scripts requiring significant rework or replacement

### Strategic Implementation Plan
- Phase 1: Launch Tier 1 scripts
- Phase 2: Optimize and launch Tier 2 scripts  
- Phase 3: Develop replacements for Tier 3 scripts

## Success Metrics Definition
Define measurement framework for creative performance tracking
"""
        
        validation_file = self.brand_folder / "Script" / f"{self.brand_name}_creative_validation_prompt.md"
        with open(validation_file, "w") as f:
            f.write(validation_prompt)
            
        print(f"📝 Creative validation prompt saved to: {validation_file}")
        print("🚨 MANUAL ACTION REQUIRED: Validate all creative assets")
        print(f"💾 Save validation results as: {self.brand_folder}/Script/{self.brand_name}_creative_validation.md")
        print("🎯 Output: Production-ready script prioritization and optimization plan")
        
        return True
    
    def execute_creative_brief(self):
        """Phase 4, Step 1: Create comprehensive creative brief for production handoff"""
        print("📋 Finalization Phase - Creative Brief Creation...")
        
        # Read brief prompt framework
        brief_prompt_file = self.base_path / "Prompt_Database" / "brief_prompt.md"
        with open(brief_prompt_file, "r") as f:
            brief_framework = f.read()
        
        creative_brief_prompt = f"""
# Comprehensive Creative Brief: {self.original_brand_name}

## Objective
Compile all strategic and creative work into a production-ready creative brief that can be handed off to production teams, ensuring all stakeholders understand the strategic direction and execution requirements.

## Essential Inputs Review
Before creating the brief, consolidate insights from:
1. **Validated Concepts:** {self.brand_folder}/Concepts/{self.brand_name}_validated_concepts.md
2. **Scored Copy Bank:** {self.brand_folder}/Copy/{self.brand_name}_copy_bank.md
3. **Complete Scripts:** {self.brand_folder}/Script/{self.brand_name}_complete_scripts.md
4. **Creative Validation:** {self.brand_folder}/Script/{self.brand_name}_creative_validation.md
5. **Gap Analysis:** {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md
6. **Brand Guidelines:** {self.brand_folder}/Guide/{self.brand_name}_script_guide.md

## Creative Brief Framework

{brief_framework}

## Enhanced Creative Brief Structure

### 1. CAMPAIGN OVERVIEW

**Campaign Name:** [Create memorable campaign name based on core strategy]
**Primary Objective:** [Conversion/Awareness/Engagement - based on gap analysis priorities]
**Campaign Duration:** [Recommended timeline for implementation]
**Budget Allocation:** [Suggested budget distribution across concepts/platforms]

**Target Audience Consolidated:**
- **Primary:** [Demographics + psychographics from validated concepts]
- **Secondary:** [Expansion opportunities identified in analysis]
- **Platform Behavior:** [How audience behaves on each platform]

**Key Message:** [One-sentence core message that addresses primary gap opportunity]
**Unique Value Proposition:** [What makes {self.original_brand_name} uniquely positioned vs competitors]

**Strategic Foundation:**
- **Primary Gap Addressed:** [From gap analysis]
- **Competitive Advantage:** [Key differentiator being leveraged]
- **Market Opportunity:** [Size and potential from research]

### 2. CONCEPT SUMMARY

For each of the 3 validated concepts, provide:

#### Concept 1: [Name from concept validation]
- **Strategic Approach:** [Brief explanation of strategic rationale]
- **Target Persona:** [Specific demographic + psychographic details]
- **Core Emotion:** [Primary emotional driver from LIFE FORCE 8]
- **Life Force 8 Drivers:** [Primary and secondary motivational drivers]
- **Awareness Level:** [Unaware/Problem-Aware/Solution-Aware/Product-Aware/Most-Aware]
- **Platform Priority:** [Primary platforms for this concept]
- **Formats:** [List of 3-5 validated formats]
- **Performance Prediction Score:** [From creative validation framework]
- **Success Metrics:** [How to measure concept performance]

#### Concept 2: [Name from concept validation]
[Same structure as Concept 1]

#### Concept 3: [Name from concept validation]
[Same structure as Concept 1]

### 3. FORMAT EXECUTIONS

For each format within each concept (total 15 formats), provide:

#### Concept [X] - Format [Y]: [Format Name]
- **Format Type:** [UGC/Static/Video/Carousel/etc.]
- **Platform Optimization:** [TikTok/Instagram/Facebook specific notes]
- **Primary Hook/Headline:** [Highest-scoring hook from copy bank]
- **Supporting Copy:** [All supporting copy elements]
- **Script Summary:** [Key script elements and structure]
- **Performance Score:** [Copy performance score from 5-dimension framework]

**Visual Direction:**
- **Key Visuals:** [Description of imagery/scenes/graphics needed]
- **Color Palette:** [Brand-aligned color recommendations]
- **Typography:** [Font and text overlay specifications]
- **Visual Style:** [Photography vs illustration, lighting, mood]

**Production Requirements:**
- **Talent Notes:** [Age, style, personality if applicable]
- **Location/Setting:** [Where content should be filmed/created]
- **Props/Products:** [Required items and styling]
- **Technical Specs:** [Video length, dimensions, audio requirements]

**Messaging Strategy:**
- **Golden Pain Addressed:** [Specific pain point from audience research]
- **Dream Outcome Promised:** [Specific outcome from research]
- **Social Proof Elements:** [Required testimonials/reviews/stats]
- **Call-to-Action:** [Specific CTA and urgency creation]

### 4. BRAND GUIDELINES

**Voice Positioning:** [Where {self.original_brand_name} falls on voice spectrum]
- **Tone Characteristics:** [Professional/Casual, Authoritative/Friendly, etc.]
- **Communication Style:** [Direct/Storytelling, Educational/Emotional]
- **Brand Personality:** [Key personality traits to convey]

**Language Framework:**
- **Power Words:** [Key words that test well and align with brand]
- **Emotional Triggers:** [Specific words/phrases that drive action]
- **Forbidden Language:** [Words/phrases to avoid based on research]
- **Industry Terminology:** [Technical terms to use or avoid]

**Compliance Requirements:**
- **Required Disclaimers:** [Legal requirements if any]
- **Platform Guidelines:** [Specific platform policy considerations]
- **Industry Regulations:** [Any sector-specific compliance needs]

### 5. PRODUCTION PRIORITY MATRIX

Based on creative validation scores, organize formats by priority:

#### Tier 1: Immediate Production (Validation Score 8-10)
- [List highest-scoring formats ready for immediate production]
- **Timeline:** Week 1-2
- **Budget Allocation:** [% of total budget]
- **Success Criteria:** [Performance benchmarks]

#### Tier 2: Optimization & Production (Validation Score 6-7)
- [List formats needing minor optimization before production]
- **Timeline:** Week 3-4
- **Required Optimizations:** [Specific improvements needed]
- **Success Criteria:** [Performance benchmarks]

#### Tier 3: Development Pipeline (Validation Score <6)
- [List formats requiring significant rework or new development]
- **Timeline:** Week 5-8
- **Development Needs:** [Major changes required]
- **Alternative Options:** [Backup concepts if needed]

### 6. MEASUREMENT & OPTIMIZATION FRAMEWORK

**Primary KPIs by Concept:**
- **Concept 1:** [Specific metrics to track]
- **Concept 2:** [Specific metrics to track]
- **Concept 3:** [Specific metrics to track]

**Performance Benchmarks:**
- **Attention Metrics:** [CTR, engagement rate targets]
- **Conversion Metrics:** [CPA, ROAS targets]
- **Brand Metrics:** [Awareness, sentiment targets]

**Optimization Protocol:**
- **Review Cycle:** [How often to assess performance]
- **Optimization Triggers:** [When to make changes]
- **Creative Refresh Schedule:** [When to introduce new variants]

### 7. RISK MANAGEMENT & CONTINGENCIES

**Creative Risk Assessment:**
- **High-Risk Elements:** [Potential creative challenges]
- **Backup Options:** [Alternative approaches if primary fails]
- **Competitive Response:** [How to adapt if competitors copy]

**Performance Risk Mitigation:**
- **Underperformance Protocol:** [Steps if concepts don't meet targets]
- **Creative Fatigue Prevention:** [How to maintain freshness]
- **Budget Reallocation:** [How to shift spend based on performance]

## Implementation Roadmap

### Phase 1: Foundation Launch (Week 1-2)
- Produce and launch Tier 1 formats
- Establish performance tracking systems
- Begin audience targeting optimization

### Phase 2: Expansion & Optimization (Week 3-6)
- Launch optimized Tier 2 formats
- Scale successful Tier 1 concepts
- Conduct format A/B testing

### Phase 3: Innovation & Scale (Week 7-12)
- Develop and test Tier 3 concepts
- Expand winning concepts to new audiences
- Iterate based on performance data

## Deliverable Requirements

The final creative brief should be formatted as:
1. **Executive Summary** (1-2 pages)
2. **Detailed Concept Specifications** (5-10 pages)
3. **Production Guidelines** (2-3 pages)
4. **Appendices** (supporting research and validation data)

**Output:** Production-ready creative brief document for team handoff
"""
        
        # Create Completed_Analysis folder if it doesn't exist
        analysis_folder = self.brand_folder / "Completed_Analysis"
        analysis_folder.mkdir(exist_ok=True)
        
        brief_file = analysis_folder / f"{self.brand_name}_creative_brief_prompt.md"
        with open(brief_file, "w") as f:
            f.write(creative_brief_prompt)
            
        print(f"📝 Creative brief prompt saved to: {brief_file}")
        print("🚨 MANUAL ACTION REQUIRED: Create comprehensive creative brief")
        print(f"💾 Save brief as: {self.brand_folder}/Completed_Analysis/{self.brand_name}_creative_brief.md")
        print("🎯 Deliverable: Production-ready creative brief for team handoff")
        
        return True
    
    def compile_final_analysis(self):
        """Phase 4: Compile comprehensive final analysis"""
        print("📋 Finalization Phase - Final Analysis...")
        
        final_analysis_prompt = f"""
# Comprehensive Strategic Analysis: {self.original_brand_name}
Analysis Date: {datetime.now().strftime('%Y-%m-%d')}

## Executive Summary
Compile strategic findings and recommendations from all phases:

### Key Strategic Insights
- Primary market opportunities identified
- Competitive advantages to leverage  
- Target audience strategic positioning
- Creative strategy recommendations

### Implementation Priority
- Tier 1 immediate actions
- Tier 2 optimization opportunities
- Tier 3 long-term strategic initiatives

## Phase 1: Foundation Insights

### Audience Intelligence (Perplexity & Reddit)
Synthesize findings from:
- {self.brand_folder}/Perplexity/{self.brand_name}_perplexity_results.md
- {self.brand_folder}/Reddit/{self.brand_name}_reddit_results.json

**Key Insights:**
- Primary audience characteristics and motivations
- Authentic language patterns and pain points
- Unmet needs and market opportunities
- Cultural tensions and emotional drivers

### Competitive Landscape (Apify & AssemblyAI)
Synthesize findings from:
- {self.brand_folder}/Apify/{self.brand_name}_apify_results.json
- {self.brand_folder}/AssemblyAI/ (transcription analysis)

**Key Insights:**
- Competitor messaging strategies and positioning
- Creative format performance patterns
- Market saturation and opportunity gaps
- Performance indicators and benchmarks

## Phase 2: Strategic Analysis

### Market Position Assessment
Review analysis from:
- {self.brand_folder}/Gap_Analysis/{self.brand_name}_competitive_analysis.md
- {self.brand_folder}/Gap_Analysis/{self.brand_name}_gap_analysis.md

**Strategic Recommendations:**
- Market positioning strategy
- Competitive differentiation opportunities
- Audience expansion potential
- Campaign sequencing approach

### SWOT Analysis

**Strengths:**
- {self.original_brand_name} unique advantages
- Market position strengths
- Resource and capability advantages

**Weaknesses:**
- Current messaging gaps
- Competitive disadvantages  
- Resource constraints

**Opportunities:**
- Gap analysis findings
- Underserved market segments
- Emerging trends and cultural shifts

**Threats:**
- Competitive pressures
- Market challenges
- Platform and industry changes

## Phase 3: Creative Strategy

### Validated Creative Framework
Review creative assets from:
- {self.brand_folder}/Concepts/{self.brand_name}_validated_concepts.md
- {self.brand_folder}/Copy/{self.brand_name}_copy_bank.md
- {self.brand_folder}/Script/{self.brand_name}_complete_scripts.md
- {self.brand_folder}/Script/{self.brand_name}_creative_validation.md

**Creative Strategy Summary:**
- Core concept themes and strategic rationale
- High-performing copy patterns and hooks
- Script performance predictions and optimization
- Platform-specific creative recommendations

### Campaign Architecture
- Primary campaign concept for launch
- Secondary concepts for testing and optimization
- Creative format distribution and timing
- A/B testing framework and variables

## Implementation Roadmap

### Phase 1: Foundation Launch (Weeks 1-2)
- Tier 1 script production and launch
- Primary audience targeting setup
- Initial performance baseline establishment

### Phase 2: Optimization & Expansion (Weeks 3-6)  
- Tier 2 script optimization and launch
- Audience expansion based on performance
- Creative format testing and refinement

### Phase 3: Scale & Innovation (Weeks 7-12)
- Winning creative scaling and iteration
- New concept development and testing
- Market expansion and strategic positioning

## Success Framework

### Key Performance Indicators
- Primary conversion metrics and targets
- Creative performance benchmarks
- Audience engagement and expansion metrics
- Competitive position tracking

### Optimization Framework  
- Performance review cycles and triggers
- Creative refresh and iteration schedule
- Audience targeting refinement process
- Budget allocation and reallocation triggers

### Risk Management
- Performance decline identification and response
- Competitive response mitigation strategies  
- Creative fatigue prevention and management
- Market change adaptation protocols

## Strategic Recommendations Summary

### Immediate Actions (Next 30 Days)
- Priority tactical implementations
- Resource allocation recommendations
- Performance tracking setup

### Medium-term Strategy (30-90 Days)
- Optimization and expansion opportunities
- Creative development pipeline
- Competitive positioning refinement

### Long-term Vision (90+ Days)
- Market leadership positioning strategy
- Innovation and differentiation roadmap
- Scalability and sustainability framework

## Appendices
- Complete research data summaries
- Creative asset library and performance scores
- Competitive analysis detailed findings
- Implementation templates and checklists
"""
        
        final_file = self.brand_folder / "Completed_Analysis" / f"{self.brand_name}_final_analysis_prompt.md"
        with open(final_file, "w") as f:
            f.write(final_analysis_prompt)
            
        print(f"📝 Final analysis prompt saved to: {final_file}")
        print("🚨 MANUAL ACTION REQUIRED: Compile comprehensive final analysis")
        print(f"💾 Save analysis as: {self.brand_folder}/Completed_Analysis/{self.brand_name}_strategic_analysis.md")
        print("🎯 Deliverable: Complete strategic analysis and implementation roadmap")
        
        return True
    
    def get_step_method(self, step_name: str):
        """Get the method for executing a specific step"""
        step_methods = {
            "Brand_Setup": self.setup_folder_structure,
            "Research_Perplexity": self.execute_perplexity_research,
            "Research_Reddit": self.execute_reddit_research,
            "Research_Apify": self.execute_apify_scraping,
            "Transcription_Analysis": self.execute_assemblyai_transcription,
            "Script_Analysis": self.analyze_scripts_and_create_guide,
            "Competitive_Analysis": self.execute_competitive_analysis,
            "Gap_Analysis": self.execute_gap_analysis,
            "Concept_Generation": self.execute_concept_generation,
            "Copy_Development": self.execute_copy_development,
            "Script_Generation": self.generate_scripts,
            "Creative_Validation": self.execute_creative_validation,
            "Creative_Brief": self.execute_creative_brief,
            "Final_Analysis": self.compile_final_analysis
        }
        return step_methods.get(step_name)
    
    def execute_step(self, step_name: str):
        """Execute a specific step in the workflow"""
        method = self.get_step_method(step_name)
        
        if not method:
            print(f"❌ Invalid step name: {step_name}")
            print("Valid steps:", list(self.get_step_method("").keys())[:-1])  # Exclude the None from get
            return False
            
        print(f"\n🚀 Executing {step_name}...")
        success = method()
        
        if success:
            self.workflow_state["steps_completed"].append(step_name)
            self.workflow_state["last_updated"] = datetime.now().strftime("%Y%m%d_%H%M%S")
            self.save_workflow_state()
            
        return success
    
    def execute_phase(self, phase_number: int):
        """Execute all steps in a specific phase"""
        if phase_number not in self.workflow_phases:
            print(f"❌ Invalid phase number: {phase_number}. Must be 1-4.")
            return False
            
        phase = self.workflow_phases[phase_number]
        print(f"\n🎯 Executing Phase {phase_number}: {phase['name']}")
        print(f"📝 {phase['description']}")
        
        for step_name in phase["steps"]:
            if not self.execute_step(step_name):
                print(f"❌ Phase {phase_number} stopped at step {step_name}")
                return False
                
        # Mark phase as completed
        if phase_number not in self.workflow_state["phases_completed"]:
            self.workflow_state["phases_completed"].append(phase_number)
            self.workflow_state["current_phase"] = phase_number + 1
            self.save_workflow_state()
            
        print(f"✅ Phase {phase_number} Complete: {phase['name']}")
        return True
    
    def execute_full_workflow(self):
        """Execute the complete 4-phase workflow"""
        print(f"\n🎯 Starting complete workflow for: {self.original_brand_name}")
        print(f"📁 Working directory: {self.brand_folder}")
        
        for phase_number in range(1, 5):
            if not self.execute_phase(phase_number):
                print(f"❌ Workflow stopped at phase {phase_number}")
                return False
                
        print("\n✅ Complete workflow executed successfully!")
        print(f"📊 All analysis files saved to: {self.brand_folder}")
        print("🎯 Ready for campaign implementation!")
        return True
    
    def save_workflow_state(self):
        """Save current workflow state to file"""
        state_file = self.brand_folder / f"{self.brand_name}_workflow_state.json"
        with open(state_file, "w") as f:
            json.dump(self.workflow_state, f, indent=2)
    
    def show_workflow_status(self):
        """Display current workflow status"""
        print(f"\n📊 Workflow Status for {self.original_brand_name}")
        print("=" * 50)
        
        for phase_num, phase_info in self.workflow_phases.items():
            phase_status = "✅" if phase_num in self.workflow_state["phases_completed"] else "⏳"
            print(f"\n{phase_status} Phase {phase_num}: {phase_info['name']}")
            
            for step in phase_info["steps"]:
                step_status = "✅" if step in self.workflow_state["steps_completed"] else "⏸️"
                print(f"  {step_status} {step}")
        
        print(f"\nCurrent Phase: {self.workflow_state.get('current_phase', 1)}")
        print(f"Steps Completed: {len(self.workflow_state['steps_completed'])}/14")

def main():
    parser = argparse.ArgumentParser(description="Ad Analysis and Script Writer - Phased Workflow")
    parser.add_argument("--brand", required=True, help="Brand name to analyze")
    parser.add_argument("--competitors", help="Comma-separated list of competitors")
    parser.add_argument("--phase", type=int, help="Execute specific phase (1-4)")
    parser.add_argument("--step", help="Execute specific step by name")
    parser.add_argument("--full", action="store_true", help="Execute complete workflow")
    parser.add_argument("--status", action="store_true", help="Show workflow status")
    
    args = parser.parse_args()
    
    competitors = []
    if args.competitors:
        competitors = [c.strip() for c in args.competitors.split(",")]
    
    orchestrator = PhasedWorkflowOrchestrator(args.brand, competitors)
    
    if args.status:
        orchestrator.show_workflow_status()
    elif args.phase:
        orchestrator.execute_phase(args.phase)
    elif args.step:
        orchestrator.execute_step(args.step)
    elif args.full:
        orchestrator.execute_full_workflow()
    else:
        print("Usage options:")
        print("  --full                    Execute complete workflow")
        print("  --phase N                 Execute specific phase (1-4)")
        print("  --step Step_Name          Execute specific step")
        print("  --status                  Show current workflow status")
        print("\nPhases:")
        for phase_num, phase_info in orchestrator.workflow_phases.items():
            print(f"  {phase_num}. {phase_info['name']}: {phase_info['description']}")

if __name__ == "__main__":
    main()