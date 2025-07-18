#!/usr/bin/env python3
"""
Step 1: Brand Identification and Folder Structure Setup

This script handles the initial setup for a new brand analysis project,
creating the organized folder structure and comprehensive brand information file
based on the brand template requirements.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from typing import List, Dict

def create_brand_template():
    """
    Returns the comprehensive brand template structure
    based on the brand_template.md requirements
    """
    return {
        "brand_overview": {
            "brand_name": "",
            "company_name": "",
            "industry": "",
            "founding_year": "",
            "headquarters": "",
            "website": "",
            "description": ""
        },
        "brand_positioning": {
            "mission_statement": "",
            "vision_statement": "",
            "core_values": [],
            "unique_value_proposition": "",
            "brand_promise": "",
            "positioning_statement": ""
        },
        "target_audience": {
            "primary_audience": {
                "demographics": {
                    "age_range": "",
                    "gender": "",
                    "income_level": "",
                    "education": "",
                    "location": "",
                    "occupation": ""
                },
                "psychographics": {
                    "values": [],
                    "interests": [],
                    "lifestyle": "",
                    "personality_traits": [],
                    "pain_points": [],
                    "motivations": []
                }
            },
            "secondary_audiences": []
        },
        "brand_voice_tone": {
            "brand_personality": [],
            "tone_attributes": [],
            "communication_style": "",
            "language_preferences": {
                "formal_vs_casual": "",
                "technical_vs_simple": "",
                "emotional_vs_rational": ""
            },
            "avoid_language": []
        },
        "competitive_landscape": {
            "direct_competitors": [],
            "indirect_competitors": [],
            "competitive_advantages": [],
            "market_position": "",
            "price_positioning": ""
        },
        "product_service_info": {
            "primary_products_services": [],
            "key_features": [],
            "benefits": [],
            "pricing_model": "",
            "distribution_channels": []
        },
        "brand_guidelines": {
            "visual_identity": {
                "logo_usage": "",
                "color_palette": [],
                "typography": "",
                "imagery_style": ""
            },
            "messaging_guidelines": {
                "key_messages": [],
                "taglines": [],
                "elevator_pitch": "",
                "proof_points": []
            }
        },
        "marketing_context": {
            "current_marketing_channels": [],
            "marketing_objectives": [],
            "budget_range": "",
            "success_metrics": [],
            "campaign_timeline": ""
        }
    }

def collect_brand_information(brand_name: str, competitors: List[str] = None):
    """
    Interactive function to collect comprehensive brand information
    
    Args:
        brand_name: Name of the brand being analyzed
        competitors: List of competitor brand names
    
    Returns:
        Dict with complete brand information
    """
    print(f"\n🎯 Setting up brand analysis for: {brand_name}")
    print("📋 Please provide the following brand information:")
    print("   (Press Enter to skip optional fields)\n")
    
    brand_template = create_brand_template()
    
    # Brand Overview
    print("📝 BRAND OVERVIEW")
    brand_template["brand_overview"]["brand_name"] = brand_name
    brand_template["brand_overview"]["company_name"] = input("Company Name: ") or brand_name
    brand_template["brand_overview"]["industry"] = input("Industry: ")
    brand_template["brand_overview"]["founding_year"] = input("Founding Year: ")
    brand_template["brand_overview"]["headquarters"] = input("Headquarters Location: ")
    brand_template["brand_overview"]["website"] = input("Website URL: ")
    brand_template["brand_overview"]["description"] = input("Brief Company Description: ")
    
    # Brand Positioning
    print("\n🎯 BRAND POSITIONING")
    brand_template["brand_positioning"]["mission_statement"] = input("Mission Statement: ")
    brand_template["brand_positioning"]["vision_statement"] = input("Vision Statement: ")
    
    values_input = input("Core Values (comma-separated): ")
    if values_input:
        brand_template["brand_positioning"]["core_values"] = [v.strip() for v in values_input.split(",")]
    
    brand_template["brand_positioning"]["unique_value_proposition"] = input("Unique Value Proposition: ")
    brand_template["brand_positioning"]["brand_promise"] = input("Brand Promise: ")
    brand_template["brand_positioning"]["positioning_statement"] = input("Positioning Statement: ")
    
    # Target Audience - Primary
    print("\n👥 PRIMARY TARGET AUDIENCE")
    print("Demographics:")
    brand_template["target_audience"]["primary_audience"]["demographics"]["age_range"] = input("  Age Range: ")
    brand_template["target_audience"]["primary_audience"]["demographics"]["gender"] = input("  Gender: ")
    brand_template["target_audience"]["primary_audience"]["demographics"]["income_level"] = input("  Income Level: ")
    brand_template["target_audience"]["primary_audience"]["demographics"]["education"] = input("  Education Level: ")
    brand_template["target_audience"]["primary_audience"]["demographics"]["location"] = input("  Geographic Location: ")
    brand_template["target_audience"]["primary_audience"]["demographics"]["occupation"] = input("  Occupation/Industry: ")
    
    print("Psychographics:")
    values_input = input("  Values (comma-separated): ")
    if values_input:
        brand_template["target_audience"]["primary_audience"]["psychographics"]["values"] = [v.strip() for v in values_input.split(",")]
    
    interests_input = input("  Interests (comma-separated): ")
    if interests_input:
        brand_template["target_audience"]["primary_audience"]["psychographics"]["interests"] = [i.strip() for i in interests_input.split(",")]
    
    brand_template["target_audience"]["primary_audience"]["psychographics"]["lifestyle"] = input("  Lifestyle Description: ")
    
    traits_input = input("  Personality Traits (comma-separated): ")
    if traits_input:
        brand_template["target_audience"]["primary_audience"]["psychographics"]["personality_traits"] = [t.strip() for t in traits_input.split(",")]
    
    pain_points_input = input("  Pain Points (comma-separated): ")
    if pain_points_input:
        brand_template["target_audience"]["primary_audience"]["psychographics"]["pain_points"] = [p.strip() for p in pain_points_input.split(",")]
    
    motivations_input = input("  Motivations (comma-separated): ")
    if motivations_input:
        brand_template["target_audience"]["primary_audience"]["psychographics"]["motivations"] = [m.strip() for m in motivations_input.split(",")]
    
    # Brand Voice & Tone
    print("\n🗣️ BRAND VOICE & TONE")
    personality_input = input("Brand Personality (comma-separated): ")
    if personality_input:
        brand_template["brand_voice_tone"]["brand_personality"] = [p.strip() for p in personality_input.split(",")]
    
    tone_input = input("Tone Attributes (comma-separated): ")
    if tone_input:
        brand_template["brand_voice_tone"]["tone_attributes"] = [t.strip() for t in tone_input.split(",")]
    
    brand_template["brand_voice_tone"]["communication_style"] = input("Communication Style: ")
    
    print("Language Preferences:")
    brand_template["brand_voice_tone"]["language_preferences"]["formal_vs_casual"] = input("  Formal vs Casual: ")
    brand_template["brand_voice_tone"]["language_preferences"]["technical_vs_simple"] = input("  Technical vs Simple: ")
    brand_template["brand_voice_tone"]["language_preferences"]["emotional_vs_rational"] = input("  Emotional vs Rational: ")
    
    avoid_input = input("Language to Avoid (comma-separated): ")
    if avoid_input:
        brand_template["brand_voice_tone"]["avoid_language"] = [a.strip() for a in avoid_input.split(",")]
    
    # Competitive Landscape
    print("\n🏆 COMPETITIVE LANDSCAPE")
    if competitors:
        brand_template["competitive_landscape"]["direct_competitors"] = competitors
        print(f"Direct Competitors (provided): {', '.join(competitors)}")
    else:
        competitors_input = input("Direct Competitors (comma-separated): ")
        if competitors_input:
            brand_template["competitive_landscape"]["direct_competitors"] = [c.strip() for c in competitors_input.split(",")]
    
    indirect_input = input("Indirect Competitors (comma-separated): ")
    if indirect_input:
        brand_template["competitive_landscape"]["indirect_competitors"] = [i.strip() for i in indirect_input.split(",")]
    
    advantages_input = input("Competitive Advantages (comma-separated): ")
    if advantages_input:
        brand_template["competitive_landscape"]["competitive_advantages"] = [a.strip() for a in advantages_input.split(",")]
    
    brand_template["competitive_landscape"]["market_position"] = input("Market Position: ")
    brand_template["competitive_landscape"]["price_positioning"] = input("Price Positioning: ")
    
    # Product/Service Information
    print("\n🛍️ PRODUCT/SERVICE INFORMATION")
    products_input = input("Primary Products/Services (comma-separated): ")
    if products_input:
        brand_template["product_service_info"]["primary_products_services"] = [p.strip() for p in products_input.split(",")]
    
    features_input = input("Key Features (comma-separated): ")
    if features_input:
        brand_template["product_service_info"]["key_features"] = [f.strip() for f in features_input.split(",")]
    
    benefits_input = input("Key Benefits (comma-separated): ")
    if benefits_input:
        brand_template["product_service_info"]["benefits"] = [b.strip() for b in benefits_input.split(",")]
    
    brand_template["product_service_info"]["pricing_model"] = input("Pricing Model: ")
    
    channels_input = input("Distribution Channels (comma-separated): ")
    if channels_input:
        brand_template["product_service_info"]["distribution_channels"] = [c.strip() for c in channels_input.split(",")]
    
    # Marketing Context
    print("\n📢 MARKETING CONTEXT")
    current_channels_input = input("Current Marketing Channels (comma-separated): ")
    if current_channels_input:
        brand_template["marketing_context"]["current_marketing_channels"] = [c.strip() for c in current_channels_input.split(",")]
    
    objectives_input = input("Marketing Objectives (comma-separated): ")
    if objectives_input:
        brand_template["marketing_context"]["marketing_objectives"] = [o.strip() for o in objectives_input.split(",")]
    
    brand_template["marketing_context"]["budget_range"] = input("Budget Range: ")
    
    metrics_input = input("Success Metrics (comma-separated): ")
    if metrics_input:
        brand_template["marketing_context"]["success_metrics"] = [m.strip() for m in metrics_input.split(",")]
    
    brand_template["marketing_context"]["campaign_timeline"] = input("Campaign Timeline: ")
    
    return brand_template

def create_brand_folder_structure(brand_name: str, competitors: List[str] = None, base_path: str = None, interactive: bool = True):
    """
    Creates the complete folder structure for brand analysis with comprehensive brand information
    
    Args:
        brand_name: Name of the brand being analyzed
        competitors: List of competitor brand names
        base_path: Base directory path (defaults to current Ad Workflow directory)
        interactive: Whether to collect brand information interactively
    
    Returns:
        Dict with folder paths and brand info
    """
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    # Sanitize brand name for folder structure
    clean_brand_name = brand_name.replace(" ", "_").lower()
    competitors = competitors or []
    
    # Create main brand folder
    brand_folder = base_path / "Projects" / clean_brand_name
    
    # Define folder structure based on PRD
    folders = [
        "Brand",           # Core brand information and guidelines
        "Perplexity",      # Perplexity MCP research results
        "Reddit",          # Reddit API research and insights
        "Apify",           # Facebook Ads Library scraping results
        "Whisper",         # Video transcription results
        "Guide",           # Script best practices and guidelines
        "Gap_Analysis",    # Competitive gap analysis
        "Script",          # Generated scripts and variations
        "Completed_Analysis"  # Final comprehensive analysis
    ]
    
    # Create all directories
    created_folders = {}
    for folder in folders:
        folder_path = brand_folder / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        created_folders[folder.lower()] = str(folder_path)
        print(f"📁 Created: {folder_path}")
    
    # Collect comprehensive brand information
    if interactive:
        brand_info = collect_brand_information(brand_name, competitors)
    else:
        brand_info = create_brand_template()
        brand_info["brand_overview"]["brand_name"] = brand_name
        brand_info["competitive_landscape"]["direct_competitors"] = competitors
    
    # Add workflow metadata
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    brand_info["workflow_metadata"] = {
        "clean_brand_name": clean_brand_name,
        "created_at": timestamp,
        "folder_structure": folders,
        "folder_paths": created_folders,
        "workflow_version": "1.0",
        "status": "initialized"
    }
    
    # Save comprehensive brand info to JSON file
    brand_info_file = brand_folder / "Brand" / f"{clean_brand_name}_brand_profile.json"
    with open(brand_info_file, "w") as f:
        json.dump(brand_info, f, indent=2)
    
    # Create markdown version for easy reading
    brand_md_content = generate_brand_markdown(brand_info)
    brand_md_file = brand_folder / "Brand" / f"{clean_brand_name}_brand_profile.md"
    with open(brand_md_file, "w") as f:
        f.write(brand_md_content)
    
    # Create workflow tracking file
    workflow_state = {
        "brand_name": brand_name,
        "competitors": brand_info["competitive_landscape"]["direct_competitors"],
        "steps_completed": [1],  # Step 1 is now complete
        "created_at": timestamp,
        "last_updated": timestamp,
        "current_step": 2,
        "next_action": "Execute Perplexity research using MCP"
    }
    
    state_file = brand_folder / f"{clean_brand_name}_workflow_state.json"
    with open(state_file, "w") as f:
        json.dump(workflow_state, f, indent=2)
    
    # Summary output
    summary = {
        "brand_folder": str(brand_folder),
        "folders_created": len(folders),
        "brand_profile_json": str(brand_info_file),
        "brand_profile_md": str(brand_md_file),
        "state_file": str(state_file),
        "next_step": "Execute Step 2: Perplexity Research"
    }
    
    print(f"\n✅ Step 1 Complete!")
    print(f"📁 Project folder: {brand_folder}")
    print(f"📄 Brand profile (JSON): {brand_info_file}")
    print(f"📝 Brand profile (MD): {brand_md_file}")
    print(f"🔄 State tracking: {state_file}")
    print(f"➡️  Next: {summary['next_step']}")
    
    return summary

def generate_brand_markdown(brand_info: Dict) -> str:
    """Generate a markdown version of the brand profile"""
    
    md_content = f"""# {brand_info['brand_overview']['brand_name']} - Brand Profile

**Created:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Brand Overview

- **Company Name:** {brand_info['brand_overview']['company_name']}
- **Industry:** {brand_info['brand_overview']['industry']}
- **Founded:** {brand_info['brand_overview']['founding_year']}
- **Headquarters:** {brand_info['brand_overview']['headquarters']}
- **Website:** {brand_info['brand_overview']['website']}

**Description:** {brand_info['brand_overview']['description']}

## Brand Positioning

**Mission Statement:** {brand_info['brand_positioning']['mission_statement']}

**Vision Statement:** {brand_info['brand_positioning']['vision_statement']}

**Core Values:**
{chr(10).join(f"- {value}" for value in brand_info['brand_positioning']['core_values']) if brand_info['brand_positioning']['core_values'] else "- Not specified"}

**Unique Value Proposition:** {brand_info['brand_positioning']['unique_value_proposition']}

**Brand Promise:** {brand_info['brand_positioning']['brand_promise']}

**Positioning Statement:** {brand_info['brand_positioning']['positioning_statement']}

## Target Audience

### Primary Audience

**Demographics:**
- Age Range: {brand_info['target_audience']['primary_audience']['demographics']['age_range']}
- Gender: {brand_info['target_audience']['primary_audience']['demographics']['gender']}
- Income Level: {brand_info['target_audience']['primary_audience']['demographics']['income_level']}
- Education: {brand_info['target_audience']['primary_audience']['demographics']['education']}
- Location: {brand_info['target_audience']['primary_audience']['demographics']['location']}
- Occupation: {brand_info['target_audience']['primary_audience']['demographics']['occupation']}

**Psychographics:**
- Values: {', '.join(brand_info['target_audience']['primary_audience']['psychographics']['values']) if brand_info['target_audience']['primary_audience']['psychographics']['values'] else 'Not specified'}
- Interests: {', '.join(brand_info['target_audience']['primary_audience']['psychographics']['interests']) if brand_info['target_audience']['primary_audience']['psychographics']['interests'] else 'Not specified'}
- Lifestyle: {brand_info['target_audience']['primary_audience']['psychographics']['lifestyle']}
- Personality Traits: {', '.join(brand_info['target_audience']['primary_audience']['psychographics']['personality_traits']) if brand_info['target_audience']['primary_audience']['psychographics']['personality_traits'] else 'Not specified'}
- Pain Points: {', '.join(brand_info['target_audience']['primary_audience']['psychographics']['pain_points']) if brand_info['target_audience']['primary_audience']['psychographics']['pain_points'] else 'Not specified'}
- Motivations: {', '.join(brand_info['target_audience']['primary_audience']['psychographics']['motivations']) if brand_info['target_audience']['primary_audience']['psychographics']['motivations'] else 'Not specified'}

## Brand Voice & Tone

**Brand Personality:** {', '.join(brand_info['brand_voice_tone']['brand_personality']) if brand_info['brand_voice_tone']['brand_personality'] else 'Not specified'}

**Tone Attributes:** {', '.join(brand_info['brand_voice_tone']['tone_attributes']) if brand_info['brand_voice_tone']['tone_attributes'] else 'Not specified'}

**Communication Style:** {brand_info['brand_voice_tone']['communication_style']}

**Language Preferences:**
- Formal vs Casual: {brand_info['brand_voice_tone']['language_preferences']['formal_vs_casual']}
- Technical vs Simple: {brand_info['brand_voice_tone']['language_preferences']['technical_vs_simple']}
- Emotional vs Rational: {brand_info['brand_voice_tone']['language_preferences']['emotional_vs_rational']}

**Language to Avoid:** {', '.join(brand_info['brand_voice_tone']['avoid_language']) if brand_info['brand_voice_tone']['avoid_language'] else 'Not specified'}

## Competitive Landscape

**Direct Competitors:** {', '.join(brand_info['competitive_landscape']['direct_competitors']) if brand_info['competitive_landscape']['direct_competitors'] else 'Not specified'}

**Indirect Competitors:** {', '.join(brand_info['competitive_landscape']['indirect_competitors']) if brand_info['competitive_landscape']['indirect_competitors'] else 'Not specified'}

**Competitive Advantages:** {', '.join(brand_info['competitive_landscape']['competitive_advantages']) if brand_info['competitive_landscape']['competitive_advantages'] else 'Not specified'}

**Market Position:** {brand_info['competitive_landscape']['market_position']}

**Price Positioning:** {brand_info['competitive_landscape']['price_positioning']}

## Products & Services

**Primary Products/Services:** {', '.join(brand_info['product_service_info']['primary_products_services']) if brand_info['product_service_info']['primary_products_services'] else 'Not specified'}

**Key Features:** {', '.join(brand_info['product_service_info']['key_features']) if brand_info['product_service_info']['key_features'] else 'Not specified'}

**Key Benefits:** {', '.join(brand_info['product_service_info']['benefits']) if brand_info['product_service_info']['benefits'] else 'Not specified'}

**Pricing Model:** {brand_info['product_service_info']['pricing_model']}

**Distribution Channels:** {', '.join(brand_info['product_service_info']['distribution_channels']) if brand_info['product_service_info']['distribution_channels'] else 'Not specified'}

## Marketing Context

**Current Marketing Channels:** {', '.join(brand_info['marketing_context']['current_marketing_channels']) if brand_info['marketing_context']['current_marketing_channels'] else 'Not specified'}

**Marketing Objectives:** {', '.join(brand_info['marketing_context']['marketing_objectives']) if brand_info['marketing_context']['marketing_objectives'] else 'Not specified'}

**Budget Range:** {brand_info['marketing_context']['budget_range']}

**Success Metrics:** {', '.join(brand_info['marketing_context']['success_metrics']) if brand_info['marketing_context']['success_metrics'] else 'Not specified'}

**Campaign Timeline:** {brand_info['marketing_context']['campaign_timeline']}

---

*This brand profile was generated as part of the Ad Analysis and Script Writer workflow.*
"""
    
    return md_content

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Step 1: Brand Setup")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--competitors", help="Comma-separated competitor list")
    parser.add_argument("--path", help="Base path for project creation")
    parser.add_argument("--non-interactive", action="store_true", help="Skip interactive brand information collection")
    
    args = parser.parse_args()
    
    competitors = []
    if args.competitors:
        competitors = [c.strip() for c in args.competitors.split(",")]
    
    create_brand_folder_structure(
        args.brand, 
        competitors, 
        args.path, 
        interactive=not args.non_interactive
    )