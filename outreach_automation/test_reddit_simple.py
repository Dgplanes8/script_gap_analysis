#!/usr/bin/env python3
"""
Simple Reddit API Connection Test
Just one API call to test credentials
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    import praw
    
    print("🔴 Testing Reddit API Connection (single ping)...")
    
    # Initialize Reddit connection
    reddit = praw.Reddit(
        client_id=os.getenv('REDDIT_CLIENT_ID'),
        client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
        username=os.getenv('REDDIT_USERNAME'),
        password=os.getenv('REDDIT_PASSWORD'),
        user_agent='ApsicsMedia:test:v1.0'
    )
    
    # Single API call to test connection
    user = reddit.user.me()
    print(f"✅ SUCCESS: Connected as u/{user.name}")
    print(f"Account created: {user.created_utc}")
    
except Exception as e:
    print(f"❌ Connection failed: {e}")
    
    # More specific error info
    if "401" in str(e):
        print("\n401 = Invalid credentials. Check:")
        print("1. Client ID and Secret are correct")
        print("2. App type is 'script' in Reddit")
        print("3. Username/password are correct")
    elif "403" in str(e):
        print("\n403 = Access denied. Your account may be restricted")
    elif "429" in str(e):
        print("\n429 = Rate limited. Wait a few minutes and try again")