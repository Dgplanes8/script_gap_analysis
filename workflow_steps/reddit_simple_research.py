#!/usr/bin/env python3
"""
Simplified Reddit Research using read-only access
Uses hot/top posts instead of search to avoid 401 errors
"""

import json
import time
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List
from dotenv import load_dotenv

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
    
    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
            check_for_async=False
        )
        
        print("✅ Reddit API connection successful")
        return reddit
        
    except Exception as e:
        print(f"❌ Failed to connect to Reddit API: {e}")
        exit(1)

def get_subreddit_posts(reddit: praw.Reddit, subreddit_name: str, sort_type: str = "hot", limit: int = 25) -> List[Dict]:
    """Get posts from a subreddit using hot/top sorting"""
    posts = []
    
    try:
        subreddit = reddit.subreddit(subreddit_name)
        print(f"      Fetching {sort_type} posts from r/{subreddit_name}...")
        
        if sort_type == "hot":
            submissions = subreddit.hot(limit=limit)
        elif sort_type == "top":
            submissions = subreddit.top(time_filter="month", limit=limit)
        else:
            submissions = subreddit.new(limit=limit)
        
        relevant_posts = 0
        beauty_keywords = [
            "makeup", "beauty", "routine", "foundation", "clean", "natural", 
            "minimal", "quick", "busy", "mom", "working", "time", "simple",
            "glossier", "ilia", "jones road", "bobbi brown", "effortless"
        ]
        
        for submission in submissions:
            # Check if post is relevant to beauty/makeup
            title_text = (submission.title + " " + submission.selftext).lower()
            
            if any(keyword in title_text for keyword in beauty_keywords):
                relevant_posts += 1
                
                # Get top comments
                submission.comments.replace_more(limit=0)
                top_comments = []
                
                for comment in submission.comments[:3]:
                    if hasattr(comment, 'body') and len(comment.body) > 30 and comment.score >= 1:
                        top_comments.append(comment.body[:200])
                
                posts.append({
                    "title": submission.title,
                    "selftext": submission.selftext[:300] if submission.selftext else "",
                    "score": submission.score,
                    "num_comments": submission.num_comments,
                    "created_utc": submission.created_utc,
                    "url": f"https://reddit.com{submission.permalink}",
                    "subreddit": subreddit_name,
                    "sort_type": sort_type,
                    "top_comments": top_comments,
                    "relevance_score": sum(1 for keyword in beauty_keywords if keyword in title_text)
                })
                
                if relevant_posts >= 8:  # Limit relevant posts per subreddit
                    break
        
        print(f"        Found {len(posts)} relevant posts")
        time.sleep(2)  # Rate limiting
        
    except Exception as e:
        print(f"⚠️  Error accessing r/{subreddit_name}: {e}")
    
    return posts

def execute_simplified_reddit_research(brand_name: str, base_path: str = None) -> bool:
    """Execute simplified Reddit research using hot/top posts"""
    print(f"\n🚀 Starting simplified Reddit research for {brand_name}")
    print("📊 Using hot/top posts with keyword filtering")
    
    reddit = setup_reddit_client()
    
    if base_path is None:
        base_path = Path.cwd()
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    reddit_folder = base_path / "Projects" / clean_brand_name / "Reddit"
    
    # Define focused subreddits for beauty research
    research_targets = [
        {"subreddit": "MakeupAddiction", "sort": "hot", "description": "General makeup discussions"},
        {"subreddit": "SkincareAddiction", "sort": "hot", "description": "Skincare and clean beauty"},
        {"subreddit": "30PlusSkinCare", "sort": "top", "description": "Target demographic discussions"},
        {"subreddit": "workingmoms", "sort": "hot", "description": "Busy mom lifestyle and routines"},
        {"subreddit": "cleanbeauty", "sort": "hot", "description": "Clean beauty community"},
        {"subreddit": "MakeupRehab", "sort": "top", "description": "Minimal makeup approach"}
    ]
    
    all_results = []
    
    for target in research_targets:
        print(f"\n🔍 Researching: r/{target['subreddit']}")
        print(f"   {target['description']}")
        
        posts = get_subreddit_posts(
            reddit=reddit,
            subreddit_name=target["subreddit"],
            sort_type=target["sort"],
            limit=30
        )
        
        if posts:
            # Sort by relevance score and engagement
            posts.sort(key=lambda x: (x["relevance_score"], x["score"] + x["num_comments"]), reverse=True)
            
            result = {
                "subreddit": target["subreddit"],
                "description": target["description"],
                "sort_type": target["sort"],
                "total_posts": len(posts),
                "posts": posts[:5]  # Top 5 most relevant posts
            }
            all_results.append(result)
    
    # Analyze and save results
    insights = {
        "brand_name": brand_name,
        "research_date": datetime.now().isoformat(),
        "total_subreddits": len(research_targets),
        "total_relevant_posts": sum(len(r["posts"]) for r in all_results),
        "research_method": "Hot/Top posts with keyword filtering",
        "subreddit_results": all_results
    }
    
    # Save comprehensive results
    results_file = reddit_folder / f"{clean_brand_name}_reddit_results.json"
    with open(results_file, "w") as f:
        json.dump(insights, f, indent=2)
    
    # Create readable insights
    insights_file = reddit_folder / f"{clean_brand_name}_reddit_insights.md"
    with open(insights_file, "w") as f:
        f.write(f"# Reddit Research Insights: {brand_name}\n\n")
        f.write(f"**Research Date:** {insights['research_date']}\n")
        f.write(f"**Method:** {insights['research_method']}\n")
        f.write(f"**Subreddits Analyzed:** {insights['total_subreddits']}\n")
        f.write(f"**Relevant Posts Found:** {insights['total_relevant_posts']}\n\n")
        
        for result in all_results:
            f.write(f"## r/{result['subreddit']} - {result['description']}\n")
            f.write(f"**Posts analyzed:** {result['total_posts']} | **Sort:** {result['sort_type']}\n\n")
            
            for post in result["posts"][:3]:  # Top 3 posts per subreddit
                f.write(f"### {post['title']}\n")
                f.write(f"**Engagement:** {post['score']} upvotes, {post['num_comments']} comments\n")
                f.write(f"**Relevance Score:** {post['relevance_score']}\n\n")
                
                if post["selftext"]:
                    f.write(f"**Post:** {post['selftext'][:200]}...\n\n")
                
                if post["top_comments"]:
                    f.write("**Top Comments:**\n")
                    for comment in post["top_comments"][:2]:
                        f.write(f"> {comment[:150]}...\n\n")
                
                f.write(f"[View Post]({post['url']})\n\n")
                f.write("---\n\n")
    
    print(f"\n✅ Reddit research completed!")
    print(f"📊 Analyzed {insights['total_relevant_posts']} relevant posts from {len(research_targets)} subreddits")
    print(f"💾 Results: {results_file}")
    print(f"📝 Insights: {insights_file}")
    
    return True

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Simplified Reddit Research")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    execute_simplified_reddit_research(args.brand, args.path)