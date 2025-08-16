#!/usr/bin/env python3
"""
Live Reddit Workflow Test
Test the actual Reddit workflow with real API calls
"""

import sys
import os
import logging
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import praw
from config.settings import REDDIT_CONFIG

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_live_reddit_workflow():
    """Test the live Reddit workflow"""
    
    print("🚀 Live Reddit Workflow Test")
    print("=" * 50)
    print(f"Started: {datetime.now()}")
    print()
    
    try:
        # Initialize Reddit API
        print("🔄 Initializing Reddit API...")
        reddit = praw.Reddit(
            client_id=REDDIT_CONFIG['client_id'],
            client_secret=REDDIT_CONFIG['client_secret'],
            username=REDDIT_CONFIG['username'],
            password=REDDIT_CONFIG['password'],
            user_agent=REDDIT_CONFIG['user_agent']
        )
        
        # Test connection
        user = reddit.user.me()
        print(f"✅ Connected as: {user.name}")
        print()
        
        # Step 1: Find real opportunities
        print("🔍 STEP 1: Finding Real Opportunities")
        print("-" * 30)
        
        target_subreddits = ['marketing', 'entrepreneur', 'startups']
        opportunities_found = []
        
        for subreddit_name in target_subreddits:
            print(f"📡 Scanning r/{subreddit_name}...")
            
            try:
                subreddit = reddit.subreddit(subreddit_name)
                
                # Search for relevant posts (last 24 hours, hot posts)
                for post in subreddit.hot(limit=10):
                    # Simple keyword matching for opportunities
                    title_lower = post.title.lower()
                    
                    # Look for marketing/growth pain points
                    pain_keywords = [
                        'creative fatigue', 'cac', 'acquisition cost', 'conversion rate',
                        'agency', 'ad performance', 'marketing', 'growth', 'roas'
                    ]
                    
                    found_keywords = [keyword for keyword in pain_keywords if keyword in title_lower]
                    
                    if found_keywords and len(post.title) > 20:
                        opportunity = {
                            'post_id': post.id,
                            'title': post.title,
                            'subreddit': subreddit_name,
                            'author': post.author.name if post.author else 'deleted',
                            'score': post.score,
                            'num_comments': post.num_comments,
                            'created_utc': post.created_utc,
                            'url': f"https://reddit.com{post.permalink}",
                            'keywords_found': found_keywords,
                            'selftext': post.selftext[:200] if post.selftext else ''
                        }
                        opportunities_found.append(opportunity)
                        print(f"   🎯 Found: {post.title[:60]}...")
                        print(f"      Keywords: {', '.join(found_keywords)}")
                        print(f"      Score: {post.score} | Comments: {post.num_comments}")
                        
                        if len(opportunities_found) >= 3:  # Limit for testing
                            break
                
                if len(opportunities_found) >= 3:
                    break
                    
            except Exception as e:
                print(f"   ❌ Error scanning r/{subreddit_name}: {e}")
                continue
        
        print(f"\\n✅ Found {len(opportunities_found)} opportunities")
        
        if not opportunities_found:
            print("❌ No opportunities found. Using mock opportunity for testing...")
            opportunities_found = [{
                'post_id': 'mock_test',
                'title': 'Facebook creative fatigue is killing our performance',
                'subreddit': 'marketing',
                'author': 'test_user',
                'score': 45,
                'num_comments': 8,
                'keywords_found': ['creative fatigue'],
                'selftext': 'Our creative performance has been declining...'
            }]
        
        print()
        
        # Step 2: Generate responses for opportunities
        print("🎯 STEP 2: Generating Responses")
        print("-" * 30)
        
        try:
            from reddit_automation.enhanced_response_generator import EnhancedResponseGenerator
            generator = EnhancedResponseGenerator()
            
            responses_generated = []
            
            for i, opportunity in enumerate(opportunities_found[:2], 1):  # Test first 2
                print(f"\\n🔄 Processing opportunity {i}")
                print(f"   Title: {opportunity['title']}")
                print(f"   Subreddit: r/{opportunity['subreddit']}")
                print(f"   Keywords: {', '.join(opportunity['keywords_found'])}")
                
                # Generate response
                response = generator.generate_personalized_response(opportunity)
                
                if response:
                    print(f"   ✅ Response generated ({len(response)} chars)")
                    print(f"   📝 Preview: {response[:100]}...")
                    
                    # Quality check
                    quality_ok = (
                        len(response) > 50 and
                        not any(emoji in response for emoji in ['🎯', '💡', '📊']) and
                        not any(phrase in response.lower() for phrase in ['dm me', 'contact me'])
                    )
                    
                    print(f"   📋 Quality check: {'✅ PASS' if quality_ok else '❌ FAIL'}")
                    
                    if quality_ok:
                        responses_generated.append({
                            'opportunity': opportunity,
                            'response': response
                        })
                        print(f"   🚀 APPROVED for posting")
                    else:
                        print(f"   ⚠️  REJECTED - Quality issues")
                else:
                    print(f"   ❌ Failed to generate response")
            
            print(f"\\n✅ Generated {len(responses_generated)} approved responses")
            
        except Exception as e:
            print(f"❌ Error in response generation: {e}")
            return
        
        print()
        
        # Step 3: Simulate posting (DRY RUN for safety)
        print("📤 STEP 3: Posting Simulation (DRY RUN)")
        print("-" * 30)
        
        for i, item in enumerate(responses_generated, 1):
            opportunity = item['opportunity']
            response = item['response']
            
            print(f"\\n📌 Would post response {i}:")
            print(f"   Target: r/{opportunity['subreddit']}")
            print(f"   Post: {opportunity['title'][:50]}...")
            print(f"   Response length: {len(response)} chars")
            print(f"   🔗 URL: {opportunity.get('url', 'N/A')}")
            
            # In a real run, this would be:
            # post = reddit.submission(id=opportunity['post_id'])
            # comment = post.reply(response)
            
            print(f"   ✅ DRY RUN - Comment ready for posting")
        
        print()
        
        # Step 4: Summary
        print("📊 STEP 4: Workflow Summary")
        print("-" * 30)
        
        print(f"   📈 Results:")
        print(f"      • Subreddits scanned: {len(target_subreddits)}")
        print(f"      • Opportunities found: {len(opportunities_found)}")
        print(f"      • Responses generated: {len(responses_generated)}")
        print(f"      • Ready for posting: {len(responses_generated)}")
        
        if responses_generated:
            avg_length = sum(len(r['response']) for r in responses_generated) // len(responses_generated)
            print(f"      • Average response length: {avg_length} chars")
        
        print(f"\\n   ✅ Status: WORKFLOW SUCCESSFUL")
        print(f"   ⚠️  Note: Actual posting disabled for safety (DRY RUN mode)")
        
        print()
        print("🎉 Live Reddit Workflow Test Complete!")
        
    except Exception as e:
        print(f"❌ Workflow error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_live_reddit_workflow()