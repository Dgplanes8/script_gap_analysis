#!/usr/bin/env python3
"""
Streamlined Reddit API Research for Brand Insights

Dynamic script that adapts to different brands and focuses on 3-4 key search areas:
1. Brand-specific discussions
2. Target audience pain points 
3. Competitor mentions
4. Industry/category discussions

Designed to avoid information overload while capturing essential insights.
"""

import json
import requests
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

def load_brand_info(brand_name: str, base_path: str = None) -> Dict:
    """Load brand profile with flexible structure handling"""
    if base_path is None:
        base_path = Path.cwd()
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name / "Brand"
    
    # Try different possible brand file names
    possible_files = [
        f"{clean_brand_name}_brand_profile.json",
        f"{clean_brand_name}_info.json"
    ]
    
    for filename in possible_files:
        brand_file = brand_folder / filename
        if brand_file.exists():
            with open(brand_file, "r") as f:
                return json.load(f)
    
    raise FileNotFoundError(f"No brand profile found for {brand_name}")

def get_reddit_config(brand_name: str, reddit_config_path: str) -> Dict:
    """Load Reddit configuration with subreddits and search terms"""
    with open(reddit_config_path, "r") as f:
        return json.load(f)

def get_core_search_strategies(brand_info: Dict, reddit_config: Dict) -> List[Dict]:
    """Generate 4 focused search strategies to avoid overload"""
    
    brand_name = brand_info.get("brand_name") or brand_info.get("brand_overview", {}).get("brand_name", "")
    competitors = reddit_config.get("competitors", [])
    
    # Strategy 1: Brand-specific discussions (most targeted)
    brand_strategy = {
        "name": "Brand Mentions",
        "description": f"Direct discussions about {brand_name}",
        "subreddits": ["MakeupAddiction", "beauty"],  # Top 2 most active subreddits
        "search_terms": [brand_name],  # Just the brand name
        "max_posts": 15
    }
    
    # Strategy 2: Target audience pain points (most relevant)
    audience_strategy = {
        "name": "Audience Pain Points", 
        "description": "Target audience discussing their challenges",
        "subreddits": ["workingmoms", "30PlusSkinCare"],  # Most relevant demographics
        "search_terms": ["quick makeup routine", "minimal makeup"],  # Core pain points
        "max_posts": 15
    }
    
    # Strategy 3: Top competitor analysis
    top_competitor = competitors[0] if competitors else "Glossier"
    competitor_strategy = {
        "name": "Competitor Insights",
        "description": f"Discussions about {top_competitor}",
        "subreddits": ["MakeupAddiction", "cleanbeauty"],
        "search_terms": [top_competitor],  # Just the top competitor
        "max_posts": 15
    }
    
    # Strategy 4: Category discussions
    category_strategy = {
        "name": "Category Trends",
        "description": "Clean/natural beauty discussions",
        "subreddits": ["cleanbeauty", "MakeupRehab"],
        "search_terms": ["clean makeup", "natural makeup"],  # Core category terms
        "max_posts": 15
    }
    
    return [brand_strategy, audience_strategy, competitor_strategy, category_strategy]

def search_reddit_json(subreddit: str, query: str, limit: int = 10) -> List[Dict]:
    """Search Reddit using JSON API (no authentication required)"""
    posts = []
    
    try:
        # Search posts in subreddit
        url = f"https://www.reddit.com/r/{subreddit}/search.json"
        params = {
            "q": query,
            "restrict_sr": "on",
            "sort": "relevance",
            "limit": min(limit, 10),  # Limit to prevent timeouts
            "t": "year"  # Past year
        }
        
        headers = {
            "User-Agent": "brand-research/1.0",
            "Accept": "application/json"
        }
        
        print(f"      Fetching r/{subreddit} for '{query}'...")
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            for post in data.get("data", {}).get("children", []):
                post_data = post.get("data", {})
                
                # Filter for quality posts
                if (post_data.get("score", 0) >= 3 and 
                    post_data.get("num_comments", 0) >= 2):
                    
                    posts.append({
                        "title": post_data.get("title", ""),
                        "selftext": post_data.get("selftext", ""),
                        "score": post_data.get("score", 0),
                        "num_comments": post_data.get("num_comments", 0),
                        "created_utc": post_data.get("created_utc", 0),
                        "subreddit": subreddit,
                        "url": f"https://reddit.com{post_data.get('permalink', '')}",
                        "search_query": query
                    })
            
            print(f"        Found {len(posts)} relevant posts")
        else:
            print(f"        HTTP {response.status_code} for r/{subreddit}")
        
        # Rate limiting - be respectful
        time.sleep(2)
        
    except requests.Timeout:
        print(f"⚠️  Timeout searching r/{subreddit} for '{query}'")
    except Exception as e:
        print(f"⚠️  Error searching r/{subreddit} for '{query}': {e}")
    
    return posts

def get_top_comments(post_url: str, max_comments: int = 5) -> List[str]:
    """Get top comments for a post using JSON API"""
    comments = []
    
    try:
        # Convert Reddit URL to JSON API URL
        json_url = post_url + ".json"
        headers = {
            "User-Agent": "brand-research/1.0",
            "Accept": "application/json"
        }
        
        response = requests.get(json_url, headers=headers, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            
            if len(data) >= 2:
                comments_data = data[1].get("data", {}).get("children", [])
                
                for comment in comments_data[:max_comments]:
                    comment_data = comment.get("data", {})
                    body = comment_data.get("body", "")
                    
                    # Filter quality comments
                    if (len(body) > 30 and len(body) < 500 and 
                        comment_data.get("score", 0) >= 1 and
                        body not in ["[deleted]", "[removed]"] and
                        not body.startswith("http")):
                        comments.append(body[:200])  # Truncate long comments
        
        time.sleep(1)  # Rate limiting
        
    except requests.Timeout:
        print(f"        Timeout getting comments for post")
    except Exception as e:
        print(f"        Error getting comments: {e}")
    
    return comments

def execute_search_strategy(strategy: Dict) -> Dict:
    """Execute a single search strategy with optimized limits"""
    print(f"\n🔍 Executing: {strategy['name']}")
    print(f"   {strategy['description']}")
    
    all_posts = []
    posts_per_search = max(2, strategy["max_posts"] // (len(strategy["subreddits"]) * len(strategy["search_terms"])))
    
    # Limit to top 2 subreddits and 2 search terms to avoid overload
    limited_subreddits = strategy["subreddits"][:2]
    limited_search_terms = strategy["search_terms"][:2]
    
    for subreddit in limited_subreddits:
        for search_term in limited_search_terms:
            print(f"   Searching r/{subreddit} for '{search_term}'...")
            
            posts = search_reddit_json(
                subreddit=subreddit,
                query=search_term,
                limit=posts_per_search
            )
            
            all_posts.extend(posts)
            
            # Get comments for only the top post per search to save time
            if posts:
                top_post = posts[0]
                print(f"      Getting comments for top post...")
                comments = get_top_comments(top_post["url"])
                top_post["top_comments"] = comments
    
    # Sort by relevance and engagement
    all_posts.sort(key=lambda x: x["score"] + x["num_comments"], reverse=True)
    
    # Remove duplicates by title
    seen_titles = set()
    unique_posts = []
    for post in all_posts:
        if post["title"] not in seen_titles:
            seen_titles.add(post["title"])
            unique_posts.append(post)
    
    return {
        "strategy": strategy["name"],
        "description": strategy["description"],
        "total_posts": len(unique_posts),
        "posts": unique_posts[:15]  # Limit to 15 posts per strategy
    }

def analyze_reddit_data(results: List[Dict]) -> Dict:
    """Extract key insights from Reddit research results"""
    
    insights = {
        "summary": {
            "total_posts_analyzed": sum(len(r["posts"]) for r in results),
            "total_strategies": len(results),
            "research_date": datetime.now().isoformat()
        },
        "key_themes": [],
        "user_quotes": [],
        "pain_points": [],
        "sentiment_patterns": {},
        "recommendations": []
    }
    
    # Extract insights from each strategy
    for result in results:
        strategy_insights = {
            "strategy": result["strategy"],
            "post_count": len(result["posts"]),
            "top_discussions": []
        }
        
        for post in result["posts"][:5]:  # Top 5 posts per strategy
            discussion = {
                "title": post["title"],
                "engagement": post["score"] + post["num_comments"],
                "key_points": [],
                "user_voice": []
            }
            
            # Extract key points from post content
            if post["selftext"]:
                discussion["key_points"].append(post["selftext"][:200] + "...")
            
            # Extract user voice from comments
            for comment in post.get("top_comments", [])[:3]:
                if len(comment) > 50:
                    discussion["user_voice"].append(comment[:150] + "...")
            
            strategy_insights["top_discussions"].append(discussion)
        
        insights["key_themes"].append(strategy_insights)
    
    return insights

def execute_reddit_research(brand_name: str, base_path: str = None) -> bool:
    """Main function to execute focused Reddit research"""
    print(f"\n🚀 Starting focused Reddit research for {brand_name}")
    print("📊 Using 4 strategic search areas to avoid information overload")
    
    if base_path is None:
        base_path = Path.cwd()
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    reddit_folder = base_path / "Projects" / clean_brand_name / "Reddit"
    
    try:
        # Load brand info and Reddit config
        brand_info = load_brand_info(brand_name, base_path)
        reddit_config_path = reddit_folder / f"{clean_brand_name}_reddit_config.json"
        reddit_config = get_reddit_config(brand_name, reddit_config_path)
        
        # Generate focused search strategies
        strategies = get_core_search_strategies(brand_info, reddit_config)
        
        # Execute each strategy
        results = []
        for strategy in strategies:
            result = execute_search_strategy(strategy)
            results.append(result)
        
        # Analyze and compile insights
        insights = analyze_reddit_data(results)
        
        # Save results
        results_file = reddit_folder / f"{clean_brand_name}_reddit_results.json"
        with open(results_file, "w") as f:
            json.dump({
                "brand_name": brand_name,
                "research_summary": insights["summary"],
                "strategies_executed": [r["strategy"] for r in results],
                "detailed_results": results,
                "key_insights": insights
            }, f, indent=2)
        
        # Save insights summary
        insights_file = reddit_folder / f"{clean_brand_name}_reddit_insights.md"
        with open(insights_file, "w") as f:
            f.write(f"# Reddit Research Insights: {brand_name}\n\n")
            f.write(f"**Research Date:** {insights['summary']['research_date']}\n")
            f.write(f"**Total Posts Analyzed:** {insights['summary']['total_posts_analyzed']}\n\n")
            
            f.write("## Key Themes by Strategy\n\n")
            for theme in insights["key_themes"]:
                f.write(f"### {theme['strategy']} ({theme['post_count']} posts)\n\n")
                for discussion in theme["top_discussions"][:3]:
                    f.write(f"**{discussion['title']}** (Engagement: {discussion['engagement']})\n")
                    for voice in discussion["user_voice"][:2]:
                        f.write(f"> {voice}\n")
                    f.write("\n")
        
        print(f"\n✅ Reddit research completed!")
        print(f"📊 Analyzed {insights['summary']['total_posts_analyzed']} posts across 4 focused strategies")
        print(f"💾 Results saved to: {results_file}")
        print(f"📝 Insights saved to: {insights_file}")
        
        return True
        
    except Exception as e:
        print(f"❌ Reddit research failed: {e}")
        return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Focused Reddit Research for Brand Insights")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_reddit_research(args.brand, args.path)