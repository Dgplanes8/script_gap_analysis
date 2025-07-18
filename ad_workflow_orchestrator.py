#!/usr/bin/env python3
"""
Ad Analysis and Script Writer Workflow Orchestrator

This script orchestrates the 9-step ad analysis and script writing process
as defined in the PRD. Each step can be executed independently or as part
of the complete workflow.

Usage:
    python ad_workflow_orchestrator.py --brand "Brand Name" [--step N] [--competitors "Comp1,Comp2"]
"""

import os
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional

class AdWorkflowOrchestrator:
    def __init__(self, brand_name: str, competitors: List[str] = None):
        self.brand_name = brand_name.replace(" ", "_").lower()
        self.competitors = competitors or []
        self.base_path = Path("/Users/nataliebasque/Ad Workflow")
        self.brand_folder = self.base_path / "Projects" / self.brand_name
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Workflow state tracking
        self.workflow_state = {
            "brand_name": brand_name,
            "competitors": self.competitors,
            "steps_completed": [],
            "created_at": self.timestamp,
            "last_updated": self.timestamp
        }
    
    def setup_folder_structure(self):
        """Step 1: Create organized folder structure for the brand"""
        folders = [
            "Brand",
            "Perplexity", 
            "Reddit",
            "Apify",
            "Whisper", 
            "Guide",
            "Gap_Analysis",
            "Script",
            "Completed_Analysis"
        ]
        
        for folder in folders:
            folder_path = self.brand_folder / folder
            folder_path.mkdir(parents=True, exist_ok=True)
            
        # Create brand info file
        brand_info = {
            "brand_name": self.brand_name,
            "competitors": self.competitors,
            "created_at": self.timestamp,
            "folder_structure": folders
        }
        
        with open(self.brand_folder / "Brand" / f"{self.brand_name}_info.json", "w") as f:
            json.dump(brand_info, f, indent=2)
            
        print(f"✅ Step 1 Complete: Folder structure created at {self.brand_folder}")
        return True
    
    def execute_perplexity_research(self):
        """Step 2: Execute Perplexity research using MCP"""
        print("🔍 Step 2: Starting Perplexity research...")
        
        # Read the audience research prompt
        prompt_file = self.base_path / "Prompt_Database" / "audience_perplexity_prompt.md"
        with open(prompt_file, "r") as f:
            base_prompt = f.read()
        
        # Customize prompt for this brand
        research_prompt = f"""
Brand: {self.brand_name}
Competitors: {', '.join(self.competitors)}

{base_prompt}

Focus your research on:
1. Target audience for {self.brand_name} and similar brands
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
        print("💾 Save results as: {}/Perplexity/{}_perplexity_results.md".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def execute_reddit_research(self):
        """Step 3: Execute Reddit research using API"""
        print("🔍 Step 3: Starting Reddit research...")
        
        research_config = {
            "brand": self.brand_name,
            "competitors": self.competitors,
            "subreddits_to_search": [
                "marketing", "advertising", "entrepreneur", "smallbusiness",
                "reviews", "askreddit", "personalfinance", "buyitforlife"
            ],
            "search_terms": [
                self.brand_name,
                *self.competitors,
                "alternatives to " + self.brand_name,
                "vs " + self.brand_name
            ],
            "output_file": f"{self.brand_folder}/Reddit/{self.brand_name}_reddit_results.json"
        }
        
        config_file = self.brand_folder / "Reddit" / f"{self.brand_name}_reddit_config.json"
        with open(config_file, "w") as f:
            json.dump(research_config, f, indent=2)
            
        print(f"📝 Reddit research config saved to: {config_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute Reddit API research")
        print("💾 Save results as: {}/Reddit/{}_reddit_results.json".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def execute_apify_scraping(self):
        """Step 4: Execute Facebook Ads Library scraping using Apify MCP"""
        print("🔍 Step 4: Starting Apify Facebook ads scraping...")
        
        scraping_config = {
            "brands_to_scrape": [self.brand_name] + self.competitors,
            "search_terms": [
                self.brand_name,
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
        print("💾 Save results as: {}/Apify/{}_apify_results.json".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def execute_whisper_transcription(self):
        """Step 5: Execute Whisper transcription for video ads"""
        print("🔍 Step 5: Starting Whisper transcription...")
        
        transcription_config = {
            "input_videos_folder": f"{self.brand_folder}/Apify/videos/",
            "output_folder": f"{self.brand_folder}/Whisper/",
            "naming_convention": f"{self.brand_name}_whisper_{{video_id}}.txt",
            "include_timestamps": True,
            "language": "en"
        }
        
        config_file = self.brand_folder / "Whisper" / f"{self.brand_name}_whisper_config.json"
        with open(config_file, "w") as f:
            json.dump(transcription_config, f, indent=2)
            
        print(f"📝 Whisper transcription config saved to: {config_file}")
        print("🚨 MANUAL ACTION REQUIRED: Execute Whisper API transcription")
        print("💾 Save transcripts to: {}/Whisper/".format(self.brand_folder))
        
        return True
    
    def analyze_scripts_and_create_guide(self):
        """Step 6: Analyze scripts and create best practices guide"""
        print("📊 Step 6: Analyzing scripts and creating guide...")
        
        analysis_prompt = f"""
Brand: {self.brand_name}

Based on the transcribed video ads in the Whisper folder, analyze:

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
   - Recommended tone for {self.brand_name}
   - Language patterns to adopt/avoid
   - Emotional positioning strategy
   - Differentiation opportunities

Create a comprehensive script writing guide for {self.brand_name} based on this analysis.
"""
        
        guide_file = self.brand_folder / "Guide" / f"{self.brand_name}_script_analysis_prompt.md"
        with open(guide_file, "w") as f:
            f.write(analysis_prompt)
            
        print(f"📝 Script analysis prompt saved to: {guide_file}")
        print("🚨 MANUAL ACTION REQUIRED: Analyze transcripts and create guide")
        print("💾 Save guide as: {}/Guide/{}_script_guide.md".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def execute_gap_analysis(self):
        """Step 7: Execute competitive gap analysis"""
        print("📊 Step 7: Executing gap analysis...")
        
        gap_analysis_prompt = f"""
Brand: {self.brand_name}
Competitors: {', '.join(self.competitors)}

Using data from Perplexity, Reddit, Apify, and Whisper analysis, conduct a comprehensive gap analysis:

1. Messaging Gaps:
   - What messages are competitors using heavily?
   - What pain points are underaddressed?
   - What emotional drivers are missed?
   - What audience segments are overlooked?

2. Creative Format Gaps:
   - What ad formats dominate the space?
   - What creative approaches are saturated?
   - What untested formats could work?
   - What platform-specific opportunities exist?

3. Audience Targeting Gaps:
   - What demographics are over-targeted?
   - What psychographics are missed?
   - What life moments are unexplored?
   - What awareness levels are underserved?

4. Positioning Opportunities:
   - How can {self.brand_name} differentiate?
   - What competitive weaknesses can be exploited?
   - What market tensions can be resolved?
   - What cultural trends can be leveraged?

5. Strategic Recommendations:
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
        print("💾 Save analysis as: {}/Gap_Analysis/{}_gap_analysis.md".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def generate_scripts(self):
        """Step 8: Generate multiple script variations"""
        print("✍️ Step 8: Generating scripts...")
        
        # Read existing prompt templates
        copy_prompt_file = self.base_path / "Prompt_Database" / "copy_prompt.md"
        concept_prompt_file = self.base_path / "Prompt_Database" / "concept_ideation.md"
        
        with open(copy_prompt_file, "r") as f:
            copy_prompt = f.read()
        with open(concept_prompt_file, "r") as f:
            concept_prompt = f.read()
        
        script_generation_prompt = f"""
Brand: {self.brand_name}

Using insights from:
- Perplexity research ({self.brand_folder}/Perplexity/)
- Reddit research ({self.brand_folder}/Reddit/)
- Script guide ({self.brand_folder}/Guide/)
- Gap analysis ({self.brand_folder}/Gap_Analysis/)

{concept_prompt}

{copy_prompt}

Generate 15 script variations (3 concepts × 5 formats each):

Concept 1: [Based on primary gap opportunity]
Concept 2: [Based on emotional driver insight] 
Concept 3: [Based on audience language pattern]

For each concept, create scripts for:
1. TikTok (15-30 seconds)
2. Instagram Reels (15-30 seconds)
3. Instagram Feed (30-60 seconds)
4. Facebook Feed (60-90 seconds)
5. Facebook Stories (15 seconds)

Each script should include:
- Hook (first 3 seconds)
- Problem/tension identification
- Solution presentation
- Social proof element
- Clear call-to-action
- Platform-specific optimizations
"""
        
        script_file = self.brand_folder / "Script" / f"{self.brand_name}_script_generation_prompt.md"
        with open(script_file, "w") as f:
            f.write(script_generation_prompt)
            
        print(f"📝 Script generation prompt saved to: {script_file}")
        print("🚨 MANUAL ACTION REQUIRED: Generate scripts using Claude Code")
        print("💾 Save scripts as: {}/Script/{}_scripts.md".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def compile_final_analysis(self):
        """Step 9: Compile comprehensive final analysis"""
        print("📋 Step 9: Compiling final analysis...")
        
        final_analysis_prompt = f"""
Brand: {self.brand_name}
Analysis Date: {datetime.now().strftime('%Y-%m-%d')}

Compile a comprehensive strategic analysis using all research and insights:

## Executive Summary
- Key findings overview
- Strategic recommendations
- Priority action items

## Market Intelligence
### Audience Insights (from Perplexity & Reddit)
- Primary audience characteristics
- Pain points and emotional drivers
- Language patterns and cultural tensions
- Unmet needs and opportunities

### Competitive Landscape (from Apify & Whisper)
- Competitor messaging strategies
- Creative format analysis
- Market positioning map
- Performance indicators

## Strategic Analysis
### SWOT Analysis
**Strengths:**
- {self.brand_name} advantages
- Unique value propositions
- Market positioning strengths

**Weaknesses:**
- Current messaging gaps
- Competitive disadvantages
- Resource constraints

**Opportunities:**
- Gap analysis findings
- Underserved audiences
- Emerging trends

**Threats:**
- Competitive pressures
- Market challenges
- Platform changes

### Gap Analysis Summary
- Primary differentiation opportunities
- Messaging white space
- Creative format opportunities
- Audience expansion potential

## Campaign Strategy
### Target Audience Strategy
- Primary personas
- Secondary opportunities
- Awareness level targeting
- Platform-specific adaptations

### Messaging Framework
- Core value propositions
- Emotional positioning
- Language guidelines
- Tone and voice

### Creative Strategy
- Recommended ad formats
- Script frameworks
- Visual direction
- Platform optimizations

## Implementation Roadmap
### Phase 1: Foundation (Weeks 1-2)
- Creative asset development
- Audience setup and testing
- Campaign structure

### Phase 2: Testing (Weeks 3-4)
- A/B testing key messages
- Format performance evaluation
- Audience validation

### Phase 3: Scale (Weeks 5-8)
- Winning creative expansion
- Audience broadening
- Budget optimization

## Success Metrics
- KPI tracking framework
- Performance benchmarks
- Optimization triggers

## Appendices
- Research data summaries
- Script library
- Competitive analysis details
"""
        
        final_file = self.brand_folder / "Completed_Analysis" / f"{self.brand_name}_final_analysis_prompt.md"
        with open(final_file, "w") as f:
            f.write(final_analysis_prompt)
            
        print(f"📝 Final analysis prompt saved to: {final_file}")
        print("🚨 MANUAL ACTION REQUIRED: Compile final analysis")
        print("💾 Save analysis as: {}/Completed_Analysis/{}_analysis.md".format(
            self.brand_folder, self.brand_name))
        
        return True
    
    def execute_step(self, step_number: int):
        """Execute a specific step in the workflow"""
        steps = {
            1: self.setup_folder_structure,
            2: self.execute_perplexity_research,
            3: self.execute_reddit_research,
            4: self.execute_apify_scraping,
            5: self.execute_whisper_transcription,
            6: self.analyze_scripts_and_create_guide,
            7: self.execute_gap_analysis,
            8: self.generate_scripts,
            9: self.compile_final_analysis
        }
        
        if step_number not in steps:
            print(f"❌ Invalid step number: {step_number}. Must be 1-9.")
            return False
            
        print(f"\n🚀 Executing Step {step_number}...")
        success = steps[step_number]()
        
        if success:
            self.workflow_state["steps_completed"].append(step_number)
            self.workflow_state["last_updated"] = datetime.now().strftime("%Y%m%d_%H%M%S")
            self.save_workflow_state()
            
        return success
    
    def execute_full_workflow(self):
        """Execute the complete 9-step workflow"""
        print(f"\n🎯 Starting complete workflow for: {self.brand_name}")
        print(f"📁 Working directory: {self.brand_folder}")
        
        for step in range(1, 10):
            if not self.execute_step(step):
                print(f"❌ Workflow stopped at step {step}")
                return False
                
        print("\n✅ Complete workflow executed successfully!")
        print(f"📊 All analysis files saved to: {self.brand_folder}")
        return True
    
    def save_workflow_state(self):
        """Save current workflow state to file"""
        state_file = self.brand_folder / f"{self.brand_name}_workflow_state.json"
        with open(state_file, "w") as f:
            json.dump(self.workflow_state, f, indent=2)

def main():
    parser = argparse.ArgumentParser(description="Ad Analysis and Script Writer Workflow")
    parser.add_argument("--brand", required=True, help="Brand name to analyze")
    parser.add_argument("--competitors", help="Comma-separated list of competitors")
    parser.add_argument("--step", type=int, help="Execute specific step (1-9)")
    parser.add_argument("--full", action="store_true", help="Execute complete workflow")
    
    args = parser.parse_args()
    
    competitors = []
    if args.competitors:
        competitors = [c.strip() for c in args.competitors.split(",")]
    
    orchestrator = AdWorkflowOrchestrator(args.brand, competitors)
    
    if args.step:
        orchestrator.execute_step(args.step)
    elif args.full:
        orchestrator.execute_full_workflow()
    else:
        print("Please specify --step N or --full to execute the workflow")

if __name__ == "__main__":
    main()