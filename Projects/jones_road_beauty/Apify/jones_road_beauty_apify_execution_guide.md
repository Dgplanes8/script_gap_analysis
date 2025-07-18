# Apify Facebook Ads Library Scraping Guide

## Research Overview
**Brand:** Jones Road Beauty
**Industry:** Clean Beauty & Cosmetics
**Objective:** Comprehensive Facebook Ads Library analysis for Jones Road Beauty and competitors

## Scraping Configuration

### Search Terms
- "Jones Road Beauty"
- "Glossier"
- "Fenty Beauty"
- "Rare Beauty"
- "Ilia Beauty"
- "Tower 28"
- "Kosas"
- "beauty"
- "skincare"
- "makeup"
- "cosmetics"
- "anti-aging"
- "hair care"
- "Everyday Sunscreen"
- "What The Foundation"
- "Miracle Balm"
- "The Best Pencil"
- "Face Oil"

### Geographic Scope
**Countries:** US, CA, GB, AU

### Data Collection Parameters
- **Ad Type:** all
- **Ad Status:** all
- **Time Frame:** past_year
- **Max Ads per Search:** 100

## Data Extraction Targets

### Essential Metadata
- ad_id
- advertiser_name
- ad_creation_date
- ad_start_date
- ad_status
- platforms
- countries_shown
- impressions_range

### Creative Elements
- ad_text
- headline
- description
- call_to_action
- images
- videos
- carousel_cards

### Targeting Information
- age_targeting
- gender_targeting
- location_targeting
- interest_targeting
- behavior_targeting

### Performance Indicators
- impressions_range
- spend_range
- ad_duration
- platform_distribution

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
│   ├── jones road beauty_ads_raw.json
│   ├── competitor_1_ads_raw.json
│   └── industry_terms_ads_raw.json
├── processed_data/
│   ├── competitive_analysis.json
│   └── messaging_patterns.json
├── images/
│   ├── jones road beauty/
│   └── competitors/
├── videos/
│   ├── jones road beauty/
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
- messaging_patterns
- creative_formats
- emotional_hooks
- call_to_action_variations
- visual_style_analysis
- video_content_analysis
- seasonal_patterns
- targeting_strategies

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
