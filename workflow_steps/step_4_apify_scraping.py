#!/usr/bin/env python3
"""
Step 4: Apify Facebook Ads Library Scraping

This script creates comprehensive configurations for scraping Facebook Ads Library
using Apify MCP to analyze competitor campaigns and creative strategies.
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

def create_apify_scraping_config(brand_profile: Dict) -> Dict:
    """Create comprehensive Apify scraping configuration"""
    brand_name = brand_profile["brand_overview"]["brand_name"]
    industry = brand_profile["brand_overview"]["industry"]
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    
    # Create search terms for Facebook Ads Library
    search_terms = [brand_name]
    search_terms.extend(competitors)
    
    # Add industry-related search terms
    industry_terms = generate_industry_search_terms(industry)
    search_terms.extend(industry_terms)
    
    # Add product/service related terms
    products = brand_profile["product_service_info"]["primary_products_services"]
    if products:
        search_terms.extend(products)
    
    config = {
        "scraping_objective": f"Comprehensive Facebook Ads Library analysis for {brand_name} and competitors",
        "brand_context": {
            "brand_name": brand_name,
            "industry": industry,
            "competitors": competitors,
            "products_services": products
        },
        "search_configuration": {
            "search_terms": search_terms,
            "countries": ["US", "CA", "GB", "AU"],  # Primary English-speaking markets
            "ad_type": "all",  # Include all ad types
            "ad_active_status": "all",  # Include active and inactive ads
            "search_time_frame": "past_year",
            "max_ads_per_search": 100
        },
        "data_extraction_targets": {
            "ad_metadata": [
                "ad_id",
                "advertiser_name", 
                "ad_creation_date",
                "ad_start_date",
                "ad_status",
                "platforms",
                "countries_shown",
                "impressions_range"
            ],
            "creative_elements": [
                "ad_text",
                "headline",
                "description", 
                "call_to_action",
                "images",
                "videos",
                "carousel_cards"
            ],
            "targeting_insights": [
                "age_targeting",
                "gender_targeting",
                "location_targeting",
                "interest_targeting",
                "behavior_targeting"
            ],
            "performance_indicators": [
                "impressions_range",
                "spend_range",
                "ad_duration",
                "platform_distribution"
            ]
        },
        "analysis_priorities": [
            "messaging_patterns",
            "creative_formats",
            "emotional_hooks",
            "call_to_action_variations",
            "visual_style_analysis",
            "video_content_analysis",
            "seasonal_patterns",
            "targeting_strategies"
        ]
    }
    
    return config

def generate_industry_search_terms(industry: str) -> List[str]:
    """Generate industry-specific search terms for Facebook Ads Library"""
    industry_lower = industry.lower()
    
    industry_mapping = {
        "fitness": ["fitness", "workout", "gym", "weight loss", "muscle building", "personal trainer"],
        "health": ["health", "wellness", "nutrition", "supplements", "medical", "healthcare"],
        "finance": ["finance", "investment", "loans", "banking", "financial advisor", "wealth"],
        "technology": ["tech", "software", "app", "digital", "innovation", "AI"],
        "beauty": ["beauty", "skincare", "makeup", "cosmetics", "anti-aging", "hair care"],
        "food": ["food", "restaurant", "meal delivery", "nutrition", "organic", "healthy eating"],
        "education": ["education", "online course", "learning", "training", "certification"],
        "travel": ["travel", "vacation", "booking", "hotel", "flight", "destination"],
        "real estate": ["real estate", "home buying", "mortgage", "property", "investment property"],
        "automotive": ["car", "auto", "vehicle", "dealership", "insurance", "maintenance"],
        "pets": ["pet", "dog", "cat", "pet food", "veterinary", "pet care"],
        "parenting": ["parenting", "baby", "kids", "family", "childcare", "education"],
        "gaming": ["gaming", "video game", "mobile game", "console", "streaming"]
    }
    
    # Try to find matching terms
    for key, terms in industry_mapping.items():
        if key in industry_lower:
            return terms
    
    # Return general business terms if no specific match
    return ["business", "service", "solution", "professional"]

def create_apify_analysis_prompts(brand_profile: Dict) -> Dict[str, str]:
    """Create analysis prompts for Apify scraping results"""
    brand_name = brand_profile["brand_overview"]["brand_name"]
    competitors = brand_profile["competitive_landscape"]["direct_competitors"]
    
    prompts = {}
    
    # Main competitive analysis prompt
    prompts["competitive_analysis"] = f"""# Facebook Ads Competitive Analysis: {brand_name}

## Objective
Analyze Facebook Ads Library data to understand competitive landscape, messaging strategies, and creative opportunities for {brand_name}.

## Analysis Framework

### 1. Messaging Pattern Analysis
**For each competitor, analyze:**
- Core value propositions in ad copy
- Emotional hooks and triggers used
- Problem identification language
- Solution positioning approaches
- Proof points and credibility elements
- Call-to-action variations and urgency tactics

### 2. Creative Format Analysis
**Document patterns across:**
- Image vs video ad distribution
- Carousel usage and content strategy
- Video length and pacing patterns
- Visual style and brand consistency
- User-generated content integration
- Before/after and transformation content

### 3. Audience Targeting Insights
**Analyze targeting strategies:**
- Age and demographic targeting patterns
- Geographic focus and localization
- Interest-based targeting approaches
- Behavior and lifecycle targeting
- Lookalike audience strategies
- Retargeting and funnel approaches

### 4. Campaign Performance Indicators
**Evaluate performance signals:**
- Ad longevity and duration patterns
- Impression volume trends
- Platform distribution strategies
- Seasonal campaign timing
- A/B testing evidence
- Creative iteration patterns

### 5. Competitive Positioning Map
**Create positioning matrix showing:**
- Price positioning messaging
- Quality/premium vs budget messaging
- Feature differentiation emphasis
- Target audience focus differences
- Emotional vs rational appeal balance
- Brand personality expression

## Competitive Intelligence Report

### Brand-by-Brand Analysis
For {brand_name} and each competitor: {', '.join(competitors)}

**Messaging Analysis:**
- Primary value proposition
- Secondary benefits emphasized
- Emotional positioning
- Rational benefits highlighted
- Differentiation strategy
- Target audience messaging

**Creative Strategy:**
- Dominant creative formats
- Visual style and branding
- Video content approach
- User-generated content use
- Social proof integration
- Creative testing evidence

**Campaign Strategy:**
- Campaign frequency and timing
- Seasonal pattern recognition
- Geographic targeting focus
- Platform preference patterns
- Budget allocation signals
- Performance optimization signs

### Gap Analysis & Opportunities
**Identify opportunities where {brand_name} can:**
- Target underserved audience segments
- Use underutilized creative formats
- Address unmet emotional needs
- Differentiate from competitor messaging
- Optimize targeting strategies
- Improve creative performance

Document all findings with specific examples and quantifiable insights.
"""

    # Creative format analysis
    prompts["creative_format_analysis"] = f"""# Creative Format Deep Dive: {brand_name}

## Objective
Analyze creative formats, visual strategies, and content approaches across the competitive landscape.

## Creative Format Categories

### 1. Static Image Ads
**Analyze:**
- Image composition and layout patterns
- Text overlay usage and positioning
- Color scheme and visual hierarchy
- Product showcase vs lifestyle imagery
- Before/after comparison usage
- Infographic and data visualization

### 2. Video Content Analysis
**Document:**
- Video length distribution and patterns
- Opening hook strategies (first 3 seconds)
- Storytelling structure and pacing
- Music and audio strategy
- Text overlay and caption usage
- Call-to-action placement and timing

### 3. Carousel Ad Strategy
**Examine:**
- Number of cards typically used
- Content progression and storytelling
- Product showcase vs feature explanation
- Mixed media usage (images + videos)
- Interactive element integration
- Swipe-through narrative structure

### 4. User-Generated Content (UGC)
**Identify:**
- UGC integration frequency and style
- Testimonial video vs photo usage
- Review and rating showcase methods
- Before/after transformation content
- Community and social proof elements
- Influencer collaboration patterns

## Visual Style Analysis

### Brand Consistency Patterns
- Logo placement and size conventions
- Color palette usage across campaigns
- Typography and font selection
- Image filter and editing style
- Layout template consistency
- Visual brand guideline adherence

### Industry Visual Trends
- Common visual themes and metaphors
- Popular color schemes and aesthetics
- Lifestyle vs product-focused imagery
- Demographic representation patterns
- Cultural and seasonal adaptation
- Platform-specific visual optimization

## Content Performance Indicators
**Look for signals of high performance:**
- Long-running creative campaigns
- Multiple creative variations of same concept
- Cross-platform creative adaptation
- Seasonal creative evolution
- A/B testing evidence in creative variations

Use this analysis to inform {brand_name} creative strategy and identify differentiation opportunities.
"""

    # Messaging and copy analysis
    prompts["messaging_copy_analysis"] = f"""# Messaging and Copy Analysis: {brand_name}

## Objective
Deep dive into advertising copy, messaging strategies, and language patterns to identify opportunities and best practices.

## Copy Analysis Framework

### 1. Hook and Headlines Analysis
**Examine opening elements:**
- Attention-grabbing headline patterns
- Question vs statement vs command usage
- Urgency and scarcity language
- Curiosity gap creation techniques
- Benefit vs feature leading approaches
- Problem vs solution opening strategies

### 2. Value Proposition Communication
**Analyze how competitors communicate:**
- Primary benefit emphasis
- Secondary benefit layering
- Unique selling proposition clarity
- Competitive advantage communication
- Price value relationship messaging
- Quality and premium positioning

### 3. Emotional Trigger Analysis
**Document emotional appeals:**
- Fear, uncertainty, doubt (FUD) usage
- Aspiration and transformation language
- Social proof and belonging appeals
- Authority and expertise positioning
- Urgency and FOMO creation
- Trust and safety communication

### 4. Call-to-Action Optimization
**Review CTA strategies:**
- Action verb variations and testing
- Urgency language integration
- Benefit reinforcement in CTAs
- Risk reversal and guarantee mentions
- Multiple CTA placement and testing
- Platform-specific CTA optimization

### 5. Social Proof Integration
**Examine social proof usage:**
- Customer testimonial integration
- Review and rating presentation
- Case study and success story usage
- Expert endorsement and authority
- Community and user count mentions
- Media mention and award references

## Language Pattern Analysis

### Competitor Voice Comparison
For each major competitor, document:
- Brand voice and personality expression
- Formality vs casual communication style
- Technical vs simplified language usage
- Emotional vs rational appeal balance
- Industry jargon vs accessible language
- Cultural and demographic adaptation

### Message Testing Evidence
Look for signs of message optimization:
- Multiple headline variations for same campaign
- A/B testing evidence in copy variations
- Seasonal message adaptation
- Geographic message localization
- Audience-specific messaging
- Performance-driven copy evolution

## Messaging Gap Analysis
**Identify opportunities for {brand_name}:**
- Underutilized emotional appeals
- Unaddressed pain points
- Differentiated value proposition angles
- Authentic voice positioning
- Underserved audience messaging
- Creative headline and hook opportunities

Focus on actionable insights that can directly inform {brand_name} messaging strategy.
"""

    return prompts

def execute_apify_scraping(brand_name: str, base_path: str = None):
    """Execute Step 4: Apify Facebook Ads Library scraping setup"""
    print(f"🔍 Step 4: Starting Apify Facebook Ads scraping setup for {brand_name}...")
    
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
    
    # Create Apify scraping configuration
    apify_config = create_apify_scraping_config(brand_profile)
    
    # Save configuration file
    apify_folder = brand_folder / "Apify"
    config_file = apify_folder / f"{clean_brand_name}_apify_config.json"
    with open(config_file, "w") as f:
        json.dump(apify_config, f, indent=2)
    
    # Create analysis prompts
    analysis_prompts = create_apify_analysis_prompts(brand_profile)
    
    for prompt_name, prompt_content in analysis_prompts.items():
        prompt_file = apify_folder / f"{clean_brand_name}_apify_{prompt_name}.md"
        with open(prompt_file, "w") as f:
            f.write(prompt_content)
        print(f"📝 Created analysis prompt: {prompt_file}")
    
    # Create execution guide
    execution_guide = create_apify_execution_guide(apify_config)
    guide_file = apify_folder / f"{clean_brand_name}_apify_execution_guide.md"
    with open(guide_file, "w") as f:
        f.write(execution_guide)
    
    # Create data organization structure
    create_apify_folder_structure(apify_folder)
    
    # Create tracking file
    research_tracking = {
        "brand_name": brand_name,
        "config_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "search_terms_count": len(apify_config["search_configuration"]["search_terms"]),
        "competitors_count": len(apify_config["brand_context"]["competitors"]),
        "analysis_prompts": list(analysis_prompts.keys()),
        "status": "config_ready",
        "next_action": "Execute Apify MCP scraping using the configuration"
    }
    
    tracking_file = apify_folder / f"{clean_brand_name}_apify_tracking.json"
    with open(tracking_file, "w") as f:
        json.dump(research_tracking, f, indent=2)
    
    print(f"\n✅ Step 4 Configuration Complete!")
    print(f"📝 Apify config: {config_file}")
    print(f"📂 Analysis prompts: {len(analysis_prompts)} files created")
    print(f"📋 Execution guide: {guide_file}")
    print(f"📊 Research tracking: {tracking_file}")
    print(f"\n📈 Scraping scope:")
    print(f"   - {len(apify_config['search_configuration']['search_terms'])} search terms")
    print(f"   - {len(apify_config['brand_context']['competitors'])} competitors")
    print("\n🚨 MANUAL ACTION REQUIRED:")
    print("1. Use Apify MCP to execute Facebook Ads Library scraping")
    print("2. Save raw data to Apify folder structure")
    print("3. Use analysis prompts to extract insights")
    print("4. Proceed to Step 5: Whisper Video Transcription")
    
    return True

def create_apify_folder_structure(apify_folder: Path):
    """Create organized folder structure for Apify data"""
    subfolders = [
        "raw_data",
        "processed_data", 
        "images",
        "videos",
        "analysis_reports"
    ]
    
    for folder in subfolders:
        folder_path = apify_folder / folder
        folder_path.mkdir(exist_ok=True)
        print(f"📁 Created subfolder: {folder_path}")

def create_apify_execution_guide(config: Dict) -> str:
    """Create execution guide for Apify scraping"""
    
    guide = f"""# Apify Facebook Ads Library Scraping Guide

## Research Overview
**Brand:** {config['brand_context']['brand_name']}
**Industry:** {config['brand_context']['industry']}
**Objective:** {config['scraping_objective']}

## Scraping Configuration

### Search Terms
{chr(10).join(f"- \"{term}\"" for term in config['search_configuration']['search_terms'])}

### Geographic Scope
**Countries:** {', '.join(config['search_configuration']['countries'])}

### Data Collection Parameters
- **Ad Type:** {config['search_configuration']['ad_type']}
- **Ad Status:** {config['search_configuration']['ad_active_status']}
- **Time Frame:** {config['search_configuration']['search_time_frame']}
- **Max Ads per Search:** {config['search_configuration']['max_ads_per_search']}

## Data Extraction Targets

### Essential Metadata
{chr(10).join(f"- {item}" for item in config['data_extraction_targets']['ad_metadata'])}

### Creative Elements
{chr(10).join(f"- {item}" for item in config['data_extraction_targets']['creative_elements'])}

### Targeting Information
{chr(10).join(f"- {item}" for item in config['data_extraction_targets']['targeting_insights'])}

### Performance Indicators
{chr(10).join(f"- {item}" for item in config['data_extraction_targets']['performance_indicators'])}

## Apify MCP Execution Steps

### Step 1: Configure Apify Actor
1. Use Facebook Ads Library Scraper actor
2. Input search terms from configuration
3. Set geographic and time parameters
4. Configure data extraction fields

### Step 2: Execute Scraping
1. Run scraper for each search term
2. Monitor progress and data quality
3. Handle rate limits and errors
4. Verify data completeness

### Step 3: Data Organization
1. Download raw data files
2. Organize by search term and brand
3. Separate creative assets (images/videos)
4. Create metadata summaries

## File Organization Structure

```
Apify/
├── raw_data/
│   ├── {config['brand_context']['brand_name'].lower()}_ads_raw.json
│   ├── competitor_1_ads_raw.json
│   └── industry_terms_ads_raw.json
├── processed_data/
│   ├── competitive_analysis.json
│   └── messaging_patterns.json
├── images/
│   ├── {config['brand_context']['brand_name'].lower()}/
│   └── competitors/
├── videos/
│   ├── {config['brand_context']['brand_name'].lower()}/
│   └── competitors/
└── analysis_reports/
    ├── competitive_landscape.md
    └── creative_insights.md
```

## Quality Assurance Checklist
- [ ] All search terms successfully scraped
- [ ] Data quality verified (no corrupted files)
- [ ] Creative assets properly downloaded
- [ ] Metadata fields complete
- [ ] Competitive coverage adequate
- [ ] Time range requirements met
- [ ] Geographic scope satisfied
- [ ] Data organized by folder structure

## Analysis Priorities
{chr(10).join(f"- {priority}" for priority in config['analysis_priorities'])}

## Next Steps
1. Use analysis prompts to extract insights
2. Create competitive positioning map
3. Identify creative format opportunities
4. Document messaging patterns
5. Prepare for Step 5: Whisper Transcription

## Troubleshooting
- **Rate Limits:** Implement delays between requests
- **Data Quality:** Verify ad content completeness
- **Creative Assets:** Ensure images/videos download correctly
- **Missing Data:** Retry failed searches with adjusted parameters
"""
    
    return guide

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Step 4: Apify Facebook Ads Scraping")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_apify_scraping(args.brand, args.path)