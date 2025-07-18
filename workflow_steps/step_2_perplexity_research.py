#!/usr/bin/env python3
"""
Step 2: Perplexity Research Integration

This script creates customized Perplexity research prompts based on the brand profile
and integrates with Perplexity MCP for comprehensive audience and market analysis.
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

def create_perplexity_research_prompt(brand_profile: Dict) -> str:
    """
    Create a comprehensive Perplexity research prompt based on brand profile
    and the audience_perplexity_prompt.md template
    """
    brand_name = brand_profile["brand_overview"]["brand_name"]
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    industry = brand_profile["brand_overview"]["industry"]
    target_audience = brand_profile["target_audience"]["primary_audience"]
    pain_points = target_audience["psychographics"]["pain_points"]
    
    prompt = f"""# Perplexity Research Brief: {brand_name}

## Research Objective
Conduct comprehensive audience and market research for {brand_name} in the {industry} industry to uncover deep psychological insights, emotional drivers, and authentic audience language patterns.

## Brand Context
- **Brand:** {brand_name}
- **Industry:** {industry}
- **Key Competitors:** {', '.join(competitors) if competitors else 'To be identified'}
- **Target Audience:** {target_audience['demographics']['age_range']} {target_audience['demographics']['gender']} in {target_audience['demographics']['location']}
- **Known Pain Points:** {', '.join(pain_points) if pain_points else 'To be discovered'}

## Research Framework
You are an expert psychographic researcher and emotional insight extractor. Your job is to find the raw, real language and belief systems of {brand_name}'s target audience who are experiencing challenges in {industry}.

Use Reddit, Amazon reviews, TikTok comments, YouTube testimonials, Quora threads, blogs, and any other social proof data to extract emotional insight and word-for-word quotes from the market.

### Research Areas

#### 1. Demographic Deep Dive
**Current Known Demographics:**
- Age: {target_audience['demographics']['age_range']}
- Gender: {target_audience['demographics']['gender']}
- Income: {target_audience['demographics']['income_level']}
- Education: {target_audience['demographics']['education']}
- Location: {target_audience['demographics']['location']}
- Occupation: {target_audience['demographics']['occupation']}

**Research Questions:**
- Who is the actual customer beyond basic demographics?
- What attitudes do they have? (Religious, Political, Social, Economic)?
- What are their hopes and dreams?
- What are their victories and failures?
- What outside forces do THEY believe have prevented their best life?
- What are their prejudices?
- Sum up their core beliefs about life, love, and family in 1–3 sentences.

#### 2. Existing Solutions Analysis
**Research Questions:**
- What is the market already using? (List Out)
- What has their experience been like with current solutions?
- What does the market like about existing solutions?
- What does the market dislike about existing solutions?
- Are there horror stories about existing solutions?
- Does the market believe existing solutions work? If not, why?

**Look for quotes like:**
"I've been using [solution] for years now. I have [problem] and [additional context]. It definitely helps with [benefit] but [limitation]."

#### 3. Cultural Tensions & Emotional Drivers
🧨 **Cultural Tension Layer:** Uncover the invisible emotional contradictions your avatar feels in the {industry} space.

**Research Questions:**
- What cultural tensions exist in this market?
- What contradictions do people feel about their situation?
- What social pressures influence their decisions?
- What generational differences impact their choices?

#### 4. Curiosity & Forgotten Solutions
**Research Questions:**
- Has someone tried to solve the market's pain points before in a unique way? What was the result?
- Is there a conspiratorial story behind why old solutions didn't work?
- Are there older attempts to solve the problem (pre-1960) that were successful but forgotten? Or were they a failure? Why?

#### 5. Corruption & Cultural Pain Drivers
**Research Questions:**
- Is there a belief that the market's pain used to not exist? Or used to not be so bad?
- Is there a belief it's been recently made worse by outside forces? If so, what are those forces and why are they present?
- Are there isolated groups that don't struggle with this problem? What makes them different?

### Output Requirements

#### 🗣️ Comment Heatmap
Include actual TikTok/YouTube/Amazon comment data for:
- Tone and emotional patterns
- Objection handling insights
- Scroll-stopping language
- Real quotes to inform overlays, copy, and scripts

#### ❤️ Emotional Targeting Protocol
Every insight must target a primary emotional driver from:
- **LIFE FORCE 8 (Drew Whitman):**
  1. Survival, enjoyment of life, life extension
  2. Enjoyment of food and beverages
  3. Freedom from fear, pain, and danger
  4. Sexual companionship
  5. Comfortable living conditions
  6. To be superior, winning, keeping up with the Joneses
  7. Care and protection of loved ones
  8. Social approval

#### Format Guidelines
- Group insights by theme using bullet points
- Use exact quotes when possible
- Keep language raw and emotionally charged
- Focus on authentic voice and real problems
- Identify the deeper "why" behind surface-level complaints

### Competitive Intelligence
Research the following competitors for messaging patterns, audience engagement, and market positioning:
{chr(10).join(f"- {competitor}" for competitor in competitors) if competitors else "- Research and identify top 3-5 competitors"}

### Platform-Specific Research
Focus on platforms where the target audience is most active:
- Reddit communities related to {industry}
- Amazon reviews for {industry} products/services
- TikTok content about {industry} challenges
- YouTube testimonials and review videos
- Quora questions about {industry} problems
- Facebook groups discussing {industry} topics

### Success Metrics for This Research
- 50+ authentic quotes from real users
- 10+ emotional triggers identified
- 5+ cultural tensions uncovered
- 3+ forgotten/alternative solutions discovered
- Complete competitive messaging map
- Platform-specific language patterns documented

## Next Steps
After completing this research:
1. Save all findings with source citations
2. Organize insights by emotional driver and audience segment
3. Create word cloud of most frequently used terms
4. Identify the top 3 emotional hooks for campaign development
5. Document any surprising insights that contradict initial assumptions

---

**Research Timeline:** Complete within 2-3 hours of focused research
**Output Format:** Detailed report with quotes, sources, and actionable insights
**Priority:** High - This research forms the foundation for all subsequent analysis
"""
    
    return prompt

def execute_perplexity_research(brand_name: str, base_path: str = None):
    """
    Execute Step 2: Perplexity research with customized prompts
    """
    print(f"🔍 Step 2: Starting Perplexity research for {brand_name}...")
    
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    
    # Load brand profile
    try:
        brand_profile = load_brand_profile(brand_name, base_path)
    except FileNotFoundError:
        print("❌ Brand profile not found. Please run Step 1 first.")
        return False
    
    # Create customized research prompt
    research_prompt = create_perplexity_research_prompt(brand_profile)
    
    # Save main research prompt
    perplexity_folder = brand_folder / "Perplexity"
    main_prompt_file = perplexity_folder / f"{clean_brand_name}_perplexity_research_prompt.md"
    with open(main_prompt_file, "w") as f:
        f.write(research_prompt)
    
    # Create additional focused prompts for specific research areas
    focused_prompts = create_focused_research_prompts(brand_profile)
    
    for prompt_name, prompt_content in focused_prompts.items():
        prompt_file = perplexity_folder / f"{clean_brand_name}_perplexity_{prompt_name}.md"
        with open(prompt_file, "w") as f:
            f.write(prompt_content)
        print(f"📝 Created focused prompt: {prompt_file}")
    
    # Create research tracking file
    research_tracking = {
        "brand_name": brand_name,
        "research_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "prompts_created": list(focused_prompts.keys()) + ["main_research"],
        "status": "prompts_ready",
        "next_action": "Execute Perplexity MCP research using the generated prompts"
    }
    
    tracking_file = perplexity_folder / f"{clean_brand_name}_research_tracking.json"
    with open(tracking_file, "w") as f:
        json.dump(research_tracking, f, indent=2)
    
    print(f"\n✅ Step 2 Preparation Complete!")
    print(f"📝 Main research prompt: {main_prompt_file}")
    print(f"📂 Additional prompts: {len(focused_prompts)} focused research areas")
    print(f"📊 Research tracking: {tracking_file}")
    print("\n🚨 MANUAL ACTION REQUIRED:")
    print("1. Use Perplexity MCP to execute the research prompts")
    print("2. Save results to the Perplexity folder with descriptive filenames")
    print("3. Proceed to Step 3: Reddit Research")
    
    return True

def create_focused_research_prompts(brand_profile: Dict) -> Dict[str, str]:
    """Create focused research prompts for specific areas"""
    brand_name = brand_profile["brand_overview"]["brand_name"]
    industry = brand_profile["brand_overview"]["industry"]
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    
    prompts = {}
    
    # Competitor Analysis Prompt
    prompts["competitor_analysis"] = f"""# Competitor Deep Dive Research: {brand_name}

## Objective
Analyze competitive landscape and messaging strategies for {brand_name} in the {industry} industry.

## Competitors to Research
{chr(10).join(f"- {competitor}" for competitor in competitors) if competitors else "Research and identify top 5 competitors"}

## Research Areas

### 1. Competitive Messaging Analysis
For each competitor, research:
- Core value propositions
- Primary emotional hooks
- Language patterns and tone
- Target audience messaging
- Differentiation strategies

### 2. Audience Overlap & Gaps
- Which audiences do competitors target heavily?
- What demographic segments are underserved?
- What psychographic profiles are missed?
- Where are the messaging gaps?

### 3. Creative Format Analysis
- What ad formats do competitors use most?
- What creative approaches dominate?
- What formats are underutilized?
- What trends are emerging?

### 4. Performance Indicators
- Which competitors get the most engagement?
- What types of content perform best?
- What messaging generates the most response?
- What complaints do customers have about competitors?

Find real examples, quotes, and specific tactics being used in the market.
"""

    # Audience Pain Points Research
    prompts["pain_points_research"] = f"""# Pain Points Deep Research: {brand_name}

## Objective
Uncover the deepest, most emotionally charged pain points in the {industry} industry.

## Research Focus
Target audience experiencing challenges with {industry} solutions.

## Research Questions

### Current Frustrations
- What are people complaining about most?
- What solutions have failed them?
- What promises were broken?
- What unexpected problems arose?

### Emotional Impact
- How do these problems make people feel?
- What fears do these problems create?
- What hopes have been dashed?
- What dreams are being blocked?

### Social & Cultural Impact
- How do these problems affect relationships?
- What social embarrassment or judgment exists?
- What cultural pressures make problems worse?
- What generational differences create tension?

### Financial & Practical Impact
- What money has been wasted?
- What time has been lost?
- What opportunities were missed?
- What practical limitations exist?

Find specific quotes, stories, and real examples from forums, reviews, and social media.
"""

    # Solution Landscape Research
    prompts["solution_landscape"] = f"""# Solution Landscape Research: {brand_name}

## Objective
Map the complete landscape of existing solutions in the {industry} space.

## Research Areas

### Current Market Solutions
- What products/services dominate the market?
- What are the price points and positioning?
- What promises do they make?
- What results do they deliver?

### User Experience Analysis
- What do users love about current solutions?
- What do they hate or find frustrating?
- What unexpected benefits have they discovered?
- What hidden costs or problems exist?

### Alternative & Emerging Solutions
- What new approaches are gaining traction?
- What unconventional solutions are people trying?
- What DIY or workaround methods exist?
- What professional vs amateur solutions compete?

### Historical Solutions
- What older methods used to be popular?
- Why did they fall out of favor?
- What lessons from the past could be valuable?
- What forgotten wisdom exists?

Document with specific examples, user testimonials, and market data.
"""

    return prompts

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Step 2: Perplexity Research")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_perplexity_research(args.brand, args.path)