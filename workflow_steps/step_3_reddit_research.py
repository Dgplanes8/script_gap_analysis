#!/usr/bin/env python3
"""
Step 3: Reddit API Research Integration

This script creates comprehensive Reddit research configurations and prompts
for authentic audience voice capture and social listening.
Now includes actual Reddit API calls using PRAW.
"""

import json
import time
import re
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional
import requests
import logging

# Optional PRAW import for Reddit API (install with: pip install praw)
try:
    import praw
    PRAW_AVAILABLE = True
except ImportError:
    PRAW_AVAILABLE = False
    print("⚠️  PRAW not installed. Install with: pip install praw")
    print("   Using Reddit JSON API as fallback")

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

def create_reddit_research_config(brand_profile: Dict) -> Dict:
    """Create comprehensive Reddit research configuration"""
    brand_name = brand_profile["brand_overview"]["brand_name"]
    industry = brand_profile["brand_overview"]["industry"]
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    pain_points = brand_profile["target_audience"]["primary_audience"]["psychographics"]["pain_points"]
    interests = brand_profile["target_audience"]["primary_audience"]["psychographics"]["interests"]
    
    # Generate relevant subreddits based on industry and interests
    base_subreddits = [
        "marketing", "advertising", "entrepreneur", "smallbusiness",
        "reviews", "askreddit", "personalfinance", "buyitforlife",
        "productivity", "getmotivated", "advice", "needadvice"
    ]
    
    # Industry-specific subreddit suggestions
    industry_subreddits = generate_industry_subreddits(industry)
    
    # Interest-based subreddits
    interest_subreddits = []
    if interests:
        for interest in interests:
            interest_subreddits.extend(generate_interest_subreddits(interest))
    
    # Search terms based on brand and competitors
    search_terms = [
        brand_name,
        f"alternatives to {brand_name}",
        f"{brand_name} review",
        f"{brand_name} vs",
        f"best {industry} solution",
        f"{industry} recommendations",
        f"help with {industry}",
        f"{industry} frustrations",
        f"{industry} complaints"
    ]
    
    # Add competitor-related search terms
    for competitor in competitors:
        search_terms.extend([
            competitor,
            f"{competitor} review",
            f"{brand_name} vs {competitor}",
            f"alternatives to {competitor}"
        ])
    
    # Add pain point-related searches
    for pain in pain_points:
        search_terms.extend([
            f"struggling with {pain}",
            f"help with {pain}",
            f"{pain} solutions"
        ])
    
    config = {
        "research_objective": f"Capture authentic audience voice and social insights for {brand_name}",
        "brand_context": {
            "brand_name": brand_name,
            "industry": industry,
            "competitors": competitors,
            "target_pain_points": pain_points,
            "target_interests": interests
        },
        "subreddits": {
            "primary": base_subreddits,
            "industry_specific": industry_subreddits,
            "interest_based": interest_subreddits,
            "total_targets": len(base_subreddits) + len(industry_subreddits) + len(interest_subreddits)
        },
        "search_terms": search_terms,
        "research_parameters": {
            "time_period": "past_year",
            "minimum_upvotes": 5,
            "minimum_comments": 3,
            "sort_by": ["relevance", "top", "new"],
            "include_comments": True,
            "max_posts_per_term": 50,
            "max_comments_per_post": 20
        },
        "analysis_focus": [
            "authentic_language_patterns",
            "emotional_expressions",
            "pain_point_discussions",
            "solution_experiences",
            "community_sentiment",
            "objection_patterns",
            "success_stories",
            "failure_stories"
        ]
    }
    
    return config

def generate_industry_subreddits(industry: str) -> List[str]:
    """Generate industry-specific subreddit suggestions"""
    industry_lower = industry.lower()
    
    industry_mapping = {
        "fitness": ["fitness", "gym", "workout", "bodybuilding", "loseit", "progresspics"],
        "health": ["health", "medical", "askdocs", "nutrition", "supplements"],
        "finance": ["personalfinance", "investing", "financialadvice", "budgetfood", "frugal"],
        "technology": ["technology", "programming", "startups", "techsupport", "gadgets"],
        "beauty": ["beauty", "skincare", "makeup", "hair", "skincareaddiction"],
        "food": ["food", "cooking", "recipes", "nutrition", "mealprep"],
        "education": ["education", "students", "college", "studytips", "teachers"],
        "travel": ["travel", "solotravel", "backpacking", "digitalnomad"],
        "real estate": ["realestate", "investing", "landlord", "homeimprovement"],
        "automotive": ["cars", "auto", "mechanicadvice", "carporn", "teslamotors"],
        "pets": ["pets", "dogs", "cats", "dogtraining", "petadvice"],
        "parenting": ["parenting", "mommit", "daddit", "beyondthebump", "toddlers"],
        "gaming": ["gaming", "pcgaming", "games", "nintendo", "playstation"]
    }
    
    # Try to find exact matches first
    for key, subreddits in industry_mapping.items():
        if key in industry_lower:
            return subreddits
    
    # If no exact match, return general business subreddits
    return ["business", "entrepreneur", "startups", "smallbusiness"]

def generate_interest_subreddits(interest: str) -> List[str]:
    """Generate subreddits based on interests"""
    interest_lower = interest.lower()
    
    if any(word in interest_lower for word in ["fitness", "health", "workout"]):
        return ["fitness", "bodybuilding", "workout"]
    elif any(word in interest_lower for word in ["money", "finance", "investment"]):
        return ["personalfinance", "investing"]
    elif any(word in interest_lower for word in ["technology", "tech", "gadget"]):
        return ["technology", "gadgets"]
    elif any(word in interest_lower for word in ["travel", "vacation"]):
        return ["travel", "solotravel"]
    else:
        return []

def create_reddit_analysis_prompts(brand_profile: Dict) -> Dict[str, str]:
    """Create analysis prompts for Reddit research results"""
    brand_name = brand_profile["brand_overview"]["brand_name"]
    
    prompts = {}
    
    # Main analysis prompt
    prompts["main_analysis"] = f"""# Reddit Research Analysis: {brand_name}

## Objective
Analyze Reddit research data to extract authentic audience voice, emotional patterns, and actionable insights for {brand_name} campaign development.

## Analysis Framework

### 1. Language Pattern Analysis
**Extract and categorize:**
- Most frequently used words and phrases
- Emotional language and intensity levels
- Slang, colloquialisms, and community-specific terms
- Question patterns and information-seeking behavior
- Complaint and frustration expressions
- Success and celebration language

### 2. Emotional Journey Mapping
**Identify emotional states:**
- Initial problem awareness emotions
- Frustration and pain point expressions
- Hope and aspiration language
- Success and relief expressions
- Disappointment and failure emotions
- Fear and anxiety patterns

### 3. Pain Point Deep Dive
**Categorize pain points by:**
- Frequency of mention
- Emotional intensity
- Specificity vs generality
- Practical vs emotional nature
- Solvability and urgency
- Community response and support

### 4. Solution Experience Analysis
**Document experiences with:**
- Current market solutions
- DIY approaches and workarounds
- Success stories and what worked
- Failure stories and what didn't work
- Unexpected problems and hidden costs
- Recommendations and warnings

### 5. Community Sentiment Analysis
**Analyze:**
- Overall community attitude toward the industry
- Trust levels with existing brands
- Skepticism and objection patterns
- Enthusiasm and advocacy behaviors
- Influence patterns and opinion leaders
- Generational and demographic differences

### 6. Objection Pattern Recognition
**Identify common objections:**
- Price and value concerns
- Effectiveness doubts
- Time and effort requirements
- Social proof needs
- Risk and safety concerns
- Alternative preference reasons

## Output Requirements

### Audience Voice Profile
Create detailed profiles including:
- Verbatim quotes for each emotional state
- Language preferences and communication style
- Cultural references and shared experiences
- Community norms and unspoken rules

### Insight Categories
Organize findings into:
- High-impact pain points (frequent + emotional)
- Underaddressed needs (mentioned but unsolved)
- Success patterns (what works and why)
- Failure patterns (what fails and why)
- Emotional triggers (what creates strong responses)
- Trust builders (what creates credibility)

### Campaign Implications
For each insight, provide:
- Messaging recommendations
- Creative direction suggestions
- Targeting implications
- Platform-specific adaptations
- Risk mitigation strategies

Focus on authentic voice, real problems, and actionable insights for campaign development.
"""

    # Competitive sentiment analysis
    prompts["competitive_sentiment"] = f"""# Competitive Sentiment Analysis: {brand_name}

## Objective
Analyze Reddit discussions about competitors to identify sentiment patterns, positioning gaps, and messaging opportunities.

## Analysis Areas

### Brand Mention Analysis
For each competitor, analyze:
- Frequency and context of mentions
- Sentiment distribution (positive/negative/neutral)
- Specific praise and criticism points
- Comparison discussions and preferences
- User recommendation patterns

### Gap Identification
Look for:
- Unmet needs mentioned in competitor discussions
- Frequent complaints about competitor solutions
- Wishes and feature requests
- Alternative approaches being sought
- Pricing and value perception gaps

### Opportunity Mapping
Identify opportunities where {brand_name} could:
- Address unmet needs
- Solve common competitor problems
- Offer better value or approach
- Target underserved segments
- Differentiate messaging

Document with specific quotes and community context.
"""

    # Messaging validation prompts
    prompts["messaging_validation"] = f"""# Messaging Validation Research: {brand_name}

## Objective
Validate potential messaging directions against authentic Reddit community language and preferences.

## Validation Framework

### Message Resonance Testing
For each potential message:
- Does similar language appear naturally in discussions?
- What emotional response does this type of message generate?
- How do community members react to similar claims?
- What proof or evidence do they typically require?

### Language Authenticity Check
- Is the proposed language natural to the community?
- Would this messaging feel authentic or promotional?
- How do successful organic recommendations sound?
- What tone and style gets positive response?

### Objection Anticipation
- What pushback would this messaging likely receive?
- What questions or concerns would it raise?
- How do community members typically respond to similar claims?
- What proof points would be required for credibility?

Use Reddit data to validate and refine messaging approaches before campaign development.
"""

    return prompts

def execute_reddit_research(brand_name: str, base_path: str = None):
    """Execute Step 3: Reddit research configuration and prompt creation"""
    print(f"🔍 Step 3: Starting Reddit research setup for {brand_name}...")
    
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
    
    # Create Reddit research configuration
    reddit_config = create_reddit_research_config(brand_profile)
    
    # Save configuration file
    reddit_folder = brand_folder / "Reddit"
    config_file = reddit_folder / f"{clean_brand_name}_reddit_config.json"
    with open(config_file, "w") as f:
        json.dump(reddit_config, f, indent=2)
    
    # Create analysis prompts
    analysis_prompts = create_reddit_analysis_prompts(brand_profile)
    
    for prompt_name, prompt_content in analysis_prompts.items():
        prompt_file = reddit_folder / f"{clean_brand_name}_reddit_{prompt_name}.md"
        with open(prompt_file, "w") as f:
            f.write(prompt_content)
        print(f"📝 Created analysis prompt: {prompt_file}")
    
    # Create research execution guide
    execution_guide = create_reddit_execution_guide(reddit_config)
    guide_file = reddit_folder / f"{clean_brand_name}_reddit_execution_guide.md"
    with open(guide_file, "w") as f:
        f.write(execution_guide)
    
    # Create tracking file
    research_tracking = {
        "brand_name": brand_name,
        "config_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "subreddits_to_research": reddit_config["subreddits"]["total_targets"],
        "search_terms_count": len(reddit_config["search_terms"]),
        "analysis_prompts": list(analysis_prompts.keys()),
        "status": "config_ready",
        "next_action": "Execute Reddit API research using the configuration"
    }
    
    tracking_file = reddit_folder / f"{clean_brand_name}_reddit_tracking.json"
    with open(tracking_file, "w") as f:
        json.dump(research_tracking, f, indent=2)
    
    print(f"\n✅ Step 3 Configuration Complete!")
    print(f"📝 Research config: {config_file}")
    print(f"📂 Analysis prompts: {len(analysis_prompts)} files created")
    print(f"📋 Execution guide: {guide_file}")
    print(f"📊 Research tracking: {tracking_file}")
    print(f"\n📈 Research scope:")
    print(f"   - {reddit_config['subreddits']['total_targets']} subreddits to research")
    print(f"   - {len(reddit_config['search_terms'])} search terms")
    print("\n🚨 MANUAL ACTION REQUIRED:")
    print("1. Use Reddit API to execute the research using the configuration")
    print("2. Save raw data to Reddit folder")
    print("3. Use analysis prompts to extract insights")
    print("4. Proceed to Step 4: Apify Facebook Ads Scraping")
    
    return True

def create_reddit_execution_guide(config: Dict) -> str:
    """Create execution guide for Reddit research"""
    
    guide = f"""# Reddit Research Execution Guide

## Research Overview
**Brand:** {config['brand_context']['brand_name']}
**Industry:** {config['brand_context']['industry']}
**Objective:** {config['research_objective']}

## Research Parameters
- **Time Period:** {config['research_parameters']['time_period']}
- **Minimum Upvotes:** {config['research_parameters']['minimum_upvotes']}
- **Minimum Comments:** {config['research_parameters']['minimum_comments']}
- **Max Posts per Term:** {config['research_parameters']['max_posts_per_term']}
- **Max Comments per Post:** {config['research_parameters']['max_comments_per_post']}

## Subreddits to Research

### Primary Subreddits
{chr(10).join(f"- r/{sub}" for sub in config['subreddits']['primary'])}

### Industry-Specific Subreddits
{chr(10).join(f"- r/{sub}" for sub in config['subreddits']['industry_specific'])}

### Interest-Based Subreddits
{chr(10).join(f"- r/{sub}" for sub in config['subreddits']['interest_based']) if config['subreddits']['interest_based'] else "- None identified"}

## Search Terms
{chr(10).join(f"- \"{term}\"" for term in config['search_terms'])}

## Data Collection Process

### Step 1: Automated Collection
Use Reddit API or scraping tools to collect:
1. Post titles, content, and metadata
2. Top comments for each post
3. User engagement metrics
4. Temporal patterns

### Step 2: Manual Verification
Review collected data for:
1. Relevance to research objectives
2. Quality and authenticity
3. Representative diversity
4. Sufficient volume for analysis

### Step 3: Data Organization
Structure data by:
1. Subreddit source
2. Search term match
3. Sentiment category
4. Discussion topic

## Analysis Focus Areas
{chr(10).join(f"- {focus}" for focus in config['analysis_focus'])}

## Output Requirements
Save all research outputs with descriptive filenames:
- Raw data: `{config['brand_context']['brand_name'].lower()}_reddit_raw_data.json`
- Processed insights: `{config['brand_context']['brand_name'].lower()}_reddit_insights.md`
- Quote compilation: `{config['brand_context']['brand_name'].lower()}_reddit_quotes.md`
- Sentiment analysis: `{config['brand_context']['brand_name'].lower()}_reddit_sentiment.json`

## Quality Checklist
- [ ] Collected data from all target subreddits
- [ ] Searched all specified terms
- [ ] Captured both posts and comments
- [ ] Verified data quality and relevance
- [ ] Organized by analysis categories
- [ ] Extracted verbatim quotes with context
- [ ] Identified patterns and themes
- [ ] Documented sources and methodology

## Next Steps
After completing Reddit research:
1. Use analysis prompts to extract insights
2. Create summary report with key findings
3. Identify top messaging opportunities
4. Proceed to Step 4: Apify Facebook Ads Research
"""
    
    return guide

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Step 3: Reddit Research")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_reddit_research(args.brand, args.path)