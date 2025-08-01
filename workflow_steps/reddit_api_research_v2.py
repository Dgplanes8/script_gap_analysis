#!/usr/bin/env python3
"""
Reddit API Research with Proper Authentication

Uses PRAW (Python Reddit API Wrapper) for reliable Reddit data collection.
Requires Reddit API credentials in .env file.
"""

import json
import time
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    import praw
    PRAW_AVAILABLE = True
except ImportError:
    print("❌ PRAW not installed. Install with: pip install praw python-dotenv")
    exit(1)

def setup_reddit_client() -> praw.Reddit:
    """Initialize Reddit client with credentials from .env"""
    
    client_id = os.getenv('REDDIT_CLIENT_ID')
    client_secret = os.getenv('REDDIT_CLIENT_SECRET')
    user_agent = os.getenv('REDDIT_USER_AGENT')
    
    if not all([client_id, client_secret, user_agent]):
        print("❌ Missing Reddit API credentials in .env file")
        print("   Required: REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT")
        exit(1)
    
    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
            check_for_async=False
        )
        
        # Test connection
        reddit.auth.limits
        print("✅ Reddit API connection successful")
        return reddit
        
    except Exception as e:
        print(f"❌ Failed to connect to Reddit API: {e}")
        exit(1)

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

def get_focused_search_strategies(brand_info: Dict, reddit_config: Dict) -> List[Dict]:
    """Generate 4 highly focused search strategies"""
    
    brand_name = brand_info.get("brand_name") or brand_info.get("brand_overview", {}).get("brand_name", "")
    competitors = reddit_config.get("competitors", [])
    
    strategies = [
        {
            "name": "Brand Mentions",
            "description": f"Direct discussions about {brand_name}",
            "subreddits": ["MakeupAddiction", "beauty"],
            "search_terms": [f'"{brand_name}"'],  # Exact phrase search
            "max_posts": 10
        },
        {
            "name": "Audience Pain Points",
            "description": "Target audience challenges and routines",
            "subreddits": ["workingmoms", "30PlusSkinCare"],
            "search_terms": ["quick makeup routine", "minimal makeup routine"],
            "max_posts": 15
        },
        {
            "name": "Competitor Analysis",
            "description": f"Analysis of {competitors[0] if competitors else 'Glossier'}",
            "subreddits": ["MakeupAddiction", "cleanbeauty"],
            "search_terms": [competitors[0] if competitors else "Glossier"],
            "max_posts": 10
        },
        {
            "name": "Category Insights",
            "description": "Clean beauty and natural makeup discussions",
            "subreddits": ["cleanbeauty", "MakeupRehab"],
            "search_terms": ["clean makeup", "natural makeup"],
            "max_posts": 15
        }
    ]
    
    return strategies

def search_subreddit_posts(reddit: praw.Reddit, subreddit_name: str, query: str, limit: int = 10) -> List[Dict]:
    """Search for posts in a specific subreddit"""
    posts = []
    
    try:
        subreddit = reddit.subreddit(subreddit_name)
        print(f"      Searching r/{subreddit_name} for '{query}'...")
        
        # Search posts
        search_results = subreddit.search(query, limit=limit, time_filter="year", sort="relevance")
        
        for submission in search_results:
            # Filter for quality posts
            if submission.score >= 3 and submission.num_comments >= 2:
                
                # Get top comments
                submission.comments.replace_more(limit=0)  # Remove "more comments"
                top_comments = []
                
                for comment in submission.comments[:3]:  # Top 3 comments
                    if hasattr(comment, 'body') and len(comment.body) > 30 and comment.score >= 1:
                        top_comments.append(comment.body[:200])
                
                posts.append({
                    "title": submission.title,
                    "selftext": submission.selftext[:500] if submission.selftext else "",
                    "score": submission.score,
                    "num_comments": submission.num_comments,
                    "created_utc": submission.created_utc,
                    "url": f"https://reddit.com{submission.permalink}",
                    "subreddit": subreddit_name,
                    "search_query": query,
                    "top_comments": top_comments
                })
        
        print(f"        Found {len(posts)} relevant posts")
        time.sleep(1)  # Rate limiting
        
    except Exception as e:
        print(f"⚠️  Error searching r/{subreddit_name}: {e}")
    
    return posts

def execute_search_strategy(reddit: praw.Reddit, strategy: Dict) -> Dict:
    """Execute a single search strategy"""
    print(f"\n🔍 Executing: {strategy['name']}")
    print(f"   {strategy['description']}")
    
    all_posts = []
    
    for subreddit in strategy["subreddits"]:
        for search_term in strategy["search_terms"]:
            posts = search_subreddit_posts(
                reddit=reddit,
                subreddit_name=subreddit,
                query=search_term,
                limit=strategy["max_posts"] // len(strategy["search_terms"])
            )
            all_posts.extend(posts)
    
    # Sort by engagement and remove duplicates
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
        "posts": unique_posts[:strategy["max_posts"]]
    }

def analyze_reddit_results(results: List[Dict]) -> Dict:
    """Analyze Reddit research results for insights"""
    
    insights = {
        "summary": {
            "total_posts": sum(len(r["posts"]) for r in results),
            "total_strategies": len(results),
            "research_date": datetime.now().isoformat()
        },
        "key_findings": [],
        "user_quotes": [],
        "themes": []
    }
    
    # Extract insights from each strategy
    for result in results:
        strategy_findings = {
            "strategy": result["strategy"],
            "post_count": len(result["posts"]),
            "top_posts": []
        }
        
        for post in result["posts"][:3]:  # Top 3 posts per strategy
            post_summary = {
                "title": post["title"],
                "engagement": post["score"] + post["num_comments"],
                "text_preview": post["selftext"][:150] if post["selftext"] else "",
                "user_comments": post.get("top_comments", [])[:2]  # Top 2 comments
            }
            strategy_findings["top_posts"].append(post_summary)
        
        insights["key_findings"].append(strategy_findings)
    
    return insights

def execute_reddit_research(brand_name: str, base_path: str = None) -> bool:
    """Main function to execute Reddit research with proper API credentials"""
    print(f"\n🚀 Starting Reddit API research for {brand_name}")
    print("🔑 Using authenticated Reddit API access")
    
    # Setup Reddit client
    reddit = setup_reddit_client()
    
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
        strategies = get_focused_search_strategies(brand_info, reddit_config)
        
        # Execute each strategy
        results = []
        for strategy in strategies:
            result = execute_search_strategy(reddit, strategy)
            results.append(result)
        
        # Analyze results
        insights = analyze_reddit_results(results)
        
        # Save comprehensive results
        results_file = reddit_folder / f"{clean_brand_name}_reddit_results.json"
        with open(results_file, "w") as f:
            json.dump({
                "brand_name": brand_name,
                "research_summary": insights["summary"],
                "strategies_executed": [r["strategy"] for r in results],
                "detailed_results": results,
                "insights": insights
            }, f, indent=2)
        
        # Save readable insights
        insights_file = reddit_folder / f"{clean_brand_name}_reddit_insights.md"
        with open(insights_file, "w") as f:
            f.write(f"# Reddit Research Insights: {brand_name}\n\n")
            f.write(f"**Research Date:** {insights['summary']['research_date']}\n")
            f.write(f"**Total Posts Analyzed:** {insights['summary']['total_posts']}\n\n")
            
            for finding in insights["key_findings"]:
                f.write(f"## {finding['strategy']} ({finding['post_count']} posts)\n\n")
                for post in finding["top_posts"]:
                    f.write(f"### {post['title']}\n")
                    f.write(f"**Engagement:** {post['engagement']}\n\n")
                    if post["text_preview"]:
                        f.write(f"{post['text_preview']}\n\n")
                    for comment in post["user_comments"]:
                        f.write(f"> {comment}\n\n")
        
        print(f"\n✅ Reddit research completed successfully!")
        print(f"📊 Analyzed {insights['summary']['total_posts']} posts across {len(strategies)} strategies")
        print(f"💾 Results: {results_file}")
        print(f"📝 Insights: {insights_file}")
        
        return True
        
    except Exception as e:
        print(f"❌ Reddit research failed: {e}")
        return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Reddit API Research with Authentication")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_reddit_research(args.brand, args.path)