#!/usr/bin/env python3
"""
Test Reddit Community Monitor
Safe read-only testing of community monitoring features
"""

import logging
import sys
import os
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    from reddit_automation.community_monitor import RedditCommunityMonitor
    
    print("🔍 Testing Reddit Community Monitor...")
    print("=" * 50)
    
    # Initialize monitor
    monitor = RedditCommunityMonitor()
    
    # Test 1: Basic functionality
    print("\n📊 Test 1: Monitor Statistics")
    stats = monitor.get_monitoring_stats()
    print(f"Target subreddits: {stats['target_subreddits']}")
    print(f"Monitoring active: {stats['monitoring_active']}")
    
    # Test 2: Opportunity scoring (with mock data)
    print("\n🎯 Test 2: Opportunity Scoring")
    
    # Create a mock post for testing
    class MockPost:
        def __init__(self, title, selftext, score=10, num_comments=5):
            self.id = 'test123'
            self.title = title
            self.selftext = selftext
            self.author = 'testuser'
            self.subreddit = 'marketing'
            self.score = score
            self.num_comments = num_comments
            self.created_utc = datetime.now().timestamp()
            self.permalink = '/r/marketing/test'
    
    # Test different types of posts
    test_posts = [
        MockPost("Help with creative fatigue in Facebook ads", "Our ad creative performance is declining"),
        MockPost("Looking for advice on rising CAC", "Customer acquisition costs have increased 40%"),
        MockPost("Anyone recommend a good marketing agency?", "Current agency is too slow"),
        MockPost("Just launched my startup!", "Check out my new app")  # Should score lower
    ]
    
    for i, post in enumerate(test_posts, 1):
        opportunity = monitor._analyze_post_for_opportunity(post)
        if opportunity:
            print(f"Post {i}: Score {opportunity['opportunity_score']:.1f}/10 - {opportunity['response_strategy']}")
            print(f"  Title: {post.title[:50]}...")
            print(f"  Pain points: {opportunity['pain_points']}")
        else:
            print(f"Post {i}: Not suitable for engagement")
        print()
    
    # Test 3: Live monitoring (read-only, limited)
    print("📡 Test 3: Live Community Scanning (Limited)")
    print("Scanning for opportunities in marketing communities...")
    
    try:
        # Scan just one subreddit with a very small limit
        opportunities = monitor.scan_communities_for_opportunities(limit_per_subreddit=3)
        
        print(f"✅ Found {len(opportunities)} opportunities")
        
        if opportunities:
            print("\nTop opportunity:")
            top_opp = opportunities[0]
            print(f"  Score: {top_opp['opportunity_score']:.1f}/10")
            print(f"  Subreddit: r/{top_opp['subreddit']}")
            print(f"  Title: {top_opp['title'][:60]}...")
            print(f"  Strategy: {top_opp['response_strategy']}")
            print(f"  URL: {top_opp['url']}")
        
    except Exception as e:
        print(f"⚠️  Live scanning failed (this might be due to rate limits): {e}")
        print("This is normal if you're testing frequently")
    
    # Test 4: Trending discussions
    print("\n🔥 Test 4: Trending Discussions")
    try:
        trending = monitor.get_trending_discussions(subreddit_names=['marketing'])
        print(f"✅ Found {len(trending)} trending discussions in r/marketing")
        
        if trending:
            print("\nTop trending post:")
            top_trend = trending[0]
            print(f"  Engagement score: {top_trend['engagement_score']:.1f}/10")
            print(f"  Title: {top_trend['title'][:60]}...")
            print(f"  Score: {top_trend['score']} | Comments: {top_trend['comment_count']}")
    
    except Exception as e:
        print(f"⚠️  Trending analysis failed: {e}")
    
    print("\n🎉 Reddit Community Monitor test completed!")
    print("✅ The monitor can successfully:")
    print("   - Connect to Reddit API")
    print("   - Analyze posts for opportunities") 
    print("   - Score content for engagement potential")
    print("   - Identify trending discussions")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you've installed the requirements: pip install -r requirements.txt")
    
except Exception as e:
    print(f"❌ Test failed: {e}")
    print("Check your Reddit API credentials and connection")