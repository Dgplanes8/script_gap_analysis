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
        
        # Import steps_5_through_9 module for concept generation
        import sys
        sys.path.append(str(self.base_path / "workflow_steps"))
        from steps_5_through_9 import execute_concept_generation
    
    def setup_folder_structure(self):
        """Step 1: Create organized folder structure for the brand"""
        folders = [
            "Brand",
            "Perplexity", 
            "Reddit",
            "Apify",
            "AssemblyAI", 
            "Guide",
            "Gap_Analysis",
            "Concepts",
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
        
        # Load brand profile for context if available
        try:
            brand_file = self.brand_folder / "Brand" / f"{self.brand_name}_brand_profile.json"
            with open(brand_file, "r") as f:
                brand_profile = json.load(f)
            
            # Extract key information
            target_audience = brand_profile.get("target_audience", {}).get("primary_audience", {})
            demographics = target_audience.get("demographics", {})
            psychographics = target_audience.get("psychographics", {})
            
            target_avatar = f"{demographics.get('age_range', '25-45')} {demographics.get('gender', 'adults')}"
            pain_points = ", ".join(psychographics.get("pain_points", ["market challenges"]))
            industry = brand_profile.get("brand_overview", {}).get("industry", "consumer products")
            
        except (FileNotFoundError, json.JSONDecodeError):
            # Fallback if brand profile doesn't exist
            target_avatar = "target customers"
            pain_points = "market challenges"
            industry = "industry"
        
        # Read the audience research prompt
        prompt_file = self.base_path / "Prompt_Database" / "audience_perplexity_prompt.md"
        with open(prompt_file, "r") as f:
            base_prompt = f.read()
        
        # Replace placeholder variables in the prompt
        customized_prompt = base_prompt.replace("[target avatar]", target_avatar)
        customized_prompt = customized_prompt.replace("[pain]", pain_points)
        
        # Create comprehensive research prompt
        research_prompt = f"""# Perplexity Research Brief: {self.brand_name}

## Brand Context
- **Brand:** {self.brand_name}
- **Industry:** {industry}
- **Target Avatar:** {target_avatar}
- **Key Pain Points:** {pain_points}
- **Competitors:** {', '.join(self.competitors)}

## Research Framework

{customized_prompt}

## Brand-Specific Research Focus

### Target Audience Deep Dive
Focus your research on {target_avatar} who are experiencing challenges with {pain_points}.

### Competitive Intelligence
Research the following competitors for messaging patterns, audience engagement, and market positioning:
{chr(10).join(f"- {comp}" for comp in self.competitors)}

### Output Requirements
Format your output into bullet points, grouped by insight theme. Use exact quotes when possible. Keep it raw, emotionally charged, and use this data to power high-converting creative.

**Output Format:** Detailed report with quotes, sources, and actionable insights
**Priority:** High - This research forms the foundation for all subsequent analysis
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
    
    def execute_assemblyai_transcription(self):
        """Step 5: Execute AssemblyAI transcription for video/audio ads"""
        print("🔍 Step 5: Starting AssemblyAI transcription...")
        
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
        print("2. Execute AssemblyAI transcription using: python workflow_steps/assemblyai_integration.py --brand '{}' --action transcribe".format(self.brand_name))
        print("3. Analyze results using: python workflow_steps/assemblyai_integration.py --brand '{}' --action analyze".format(self.brand_name))
        print("💾 Results will be saved to: {}/AssemblyAI/".format(self.brand_folder))
        print("🎯 Enhanced features: Sentiment analysis, entity detection, auto-highlights")
        
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
    
    def execute_concept_generation(self):
        """Step 7.5: Generate strategic concepts using ideation frameworks"""
        print("💡 Step 7.5: Generating strategic concepts...")
        
        # Import the function from steps_5_through_9
        from steps_5_through_9 import execute_concept_generation
        
        # Execute concept generation
        success = execute_concept_generation(self.brand_name.replace("_", " "), str(self.base_path))
        
        if success:
            print("✅ Step 7.5 Complete: Strategic concepts generated")
            print(f"📁 Concepts saved to: {self.brand_folder}/Concepts/")
            print("🎯 Framework: 3 concepts × 3-5 formats = 15 total ads")
        else:
            print("❌ Step 7.5 Failed: Concept generation error")
            
        return success
    
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
- **Validated concepts ({self.brand_folder}/Concepts/)**

IMPORTANT: Before generating scripts, review the validated concepts from Step 7.5:
- {self.brand_folder}/Concepts/{self.brand_name}_concept_generation_prompt.md
- {self.brand_folder}/Concepts/{self.brand_name}_concept_validation_framework.md

{concept_prompt}

{copy_prompt}

Generate 15 script variations using the 3 validated concepts from Step 7.5:

**Reference the specific concepts identified in Step 7.5 concept generation**
- Use the validated concept titles, messaging frameworks, and strategic positioning
- Implement the recommended formats (3-5 per concept as outlined in validation)
- Follow the priority recommendations from the concept validation framework

For each validated concept, create scripts for the recommended platforms:
1. TikTok (15-30 seconds)
2. Instagram Reels (15-30 seconds)
3. Instagram Feed (30-60 seconds)
4. Facebook Feed (60-90 seconds)
5. Facebook Stories (15 seconds)

Each script should include:
- Hook (first 3 seconds) - aligned with concept strategy
- Problem/tension identification - from concept framework
- Solution presentation - using concept messaging
- Social proof element - tailored to concept audience
- Clear call-to-action - matching concept objectives
- Platform-specific optimizations

**Ensure scripts directly implement the validated concepts rather than creating new ones.**
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
        """Step 9: Compile comprehensive final analysis with competitive matrix"""
        print("📋 Step 9: Compiling final analysis...")
        
        # Read competitive matrix prompt
        competitive_matrix_file = self.base_path / "Prompt_Database" / "competitive_matrix_prompt.md"
        with open(competitive_matrix_file, "r") as f:
            competitive_matrix_framework = f.read()
        
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

### Competitive Advantage Matrix
Use the validated concepts from Step 7.5 to complete this analysis:

{competitive_matrix_framework}

**Analysis Framework:**
For each validated concept from {self.brand_folder}/Concepts/, analyze:
1. **Category Conventions** - Standard messaging patterns all competitors use
2. **Competitive Gap Analysis** - Benefits and territories competitors avoid
3. **Brand Ownership Opportunities** - Unique angles only {self.brand_name} can own
4. **Cultural Tension Resolution** - How concepts resolve audience contradictions

**Output:** Identify unique messaging territories for each concept that competitors have left open.

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
    
    def execute_step(self, step_number):
        """Execute a specific step in the workflow"""
        steps = {
            1: self.setup_folder_structure,
            2: self.execute_perplexity_research,
            3: self.execute_reddit_research,
            4: self.execute_apify_scraping,
            5: self.execute_assemblyai_transcription,
            6: self.analyze_scripts_and_create_guide,
            7: self.execute_gap_analysis,
            7.5: self.execute_concept_generation,
            8: self.generate_scripts,
            9: self.compile_final_analysis
        }
        
        if step_number not in steps:
            print(f"❌ Invalid step number: {step_number}. Must be 1-9 or 7.5.")
            return False
            
        print(f"\n🚀 Executing Step {step_number}...")
        success = steps[step_number]()
        
        if success:
            self.workflow_state["steps_completed"].append(step_number)
            self.workflow_state["last_updated"] = datetime.now().strftime("%Y%m%d_%H%M%S")
            self.save_workflow_state()
            
        return success
    
    def execute_full_workflow(self):
        """Execute the complete workflow including step 7.5"""
        print(f"\n🎯 Starting complete workflow for: {self.brand_name}")
        print(f"📁 Working directory: {self.brand_folder}")
        
        # Execute steps 1-7
        for step in range(1, 8):
            if not self.execute_step(step):
                print(f"❌ Workflow stopped at step {step}")
                return False
        
        # Execute step 7.5 (concept generation)
        if not self.execute_step(7.5):
            print("❌ Workflow stopped at step 7.5")
            return False
            
        # Execute steps 8-9
        for step in range(8, 10):
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
    parser.add_argument("--step", type=float, help="Execute specific step (1-9 or 7.5)")
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