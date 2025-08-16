#!/usr/bin/env python3
"""
Test Reddit API Connection
Quick test to verify Reddit credentials work
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    import praw
    
    print("🔴 Testing Reddit API Connection...")
    
    # Initialize Reddit connection
    reddit = praw.Reddit(
        client_id=os.getenv('REDDIT_CLIENT_ID'),
        client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
        username=os.getenv('REDDIT_USERNAME'),
        password=os.getenv('REDDIT_PASSWORD'),
        user_agent='ApsicsMedia:test:v1.0'
    )
    
    # Test connection
    print(f"✅ Connected as: {reddit.user.me()}")
    print(f"✅ Account karma: {reddit.user.me().comment_karma + reddit.user.me().link_karma}")
    
    # Test subreddit access
    test_subreddit = reddit.subreddit('test')
    print(f"✅ Can access r/test: {test_subreddit.display_name}")
    
    # Test search capability
    print("🔍 Testing search functionality...")
    search_results = list(test_subreddit.search('test', limit=1))
    if search_results:
        print(f"✅ Search works: Found post '{search_results[0].title[:50]}...'")
    else:
        print("⚠️  Search returned no results (this is normal for r/test)")
    
    print("\n🎉 Reddit API connection successful!")
    print("You can now run Reddit automation components.")
    
except ImportError:
    print("❌ praw library not installed. Run: pip install praw")
    sys.exit(1)
    
except Exception as e:
    print(f"❌ Reddit API connection failed: {e}")
    print("\nTroubleshooting:")
    print("1. Check your Reddit credentials in .env file")
    print("2. Verify your Reddit account is in good standing")
    print("3. Make sure app type is set to 'script' in Reddit preferences")
    sys.exit(1)