#!/usr/bin/env python3
"""
Full Workflow Demo
Demonstrates the complete Reddit outreach process from opportunity detection to response posting
"""

import sys
import os
import logging
from datetime import datetime
import time
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

logging.basicConfig(level=logging.INFO, format='%(message)s')

def demo_full_workflow():
    """Demonstrate the complete Reddit outreach workflow"""
    
    print("🚀 Reddit Outreach Automation - Full Workflow Demo")
    print("=" * 70)
    print(f"Demo started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Simulate realistic Reddit posts
    simulated_reddit_feed = [
        {
            'post_id': 'demo_001',
            'title': 'Facebook creative fatigue is destroying our ROAS - what solutions actually work?',
            'subreddit': 'marketing',
            'author': 'growth_marketer_sarah',
            'upvotes': 47,
            'comments': 12,
            'created_hours_ago': 2,
            'content': 'Our creative performance has dropped 40% over the last month. Tried A/B testing different hooks but nothing seems to stick...',
            'detected_pain_points': ['Creative Fatigue', 'ROAS Decline', 'A/B Testing Issues'],
            'business_context': 'D2C/Performance Marketing',
            'urgency': 'high',
            'opportunity_score': 8.7
        },
        {
            'post_id': 'demo_002', 
            'title': 'SaaS CAC has increased 65% year over year - agency says this is normal?',
            'subreddit': 'SaaS',
            'author': 'startup_founder_mike',
            'upvotes': 89,
            'comments': 23,
            'created_hours_ago': 4,
            'content': 'Our agency keeps saying CAC increases are normal due to iOS changes, but I am seeing competitors doing better...',
            'detected_pain_points': ['Rising CAC', 'Agency Issues', 'iOS Attribution'],
            'business_context': 'SaaS',
            'urgency': 'high',
            'opportunity_score': 9.2
        },
        {
            'post_id': 'demo_003',
            'title': 'Anyone else frustrated with creative agency turnaround times?',
            'subreddit': 'entrepreneur',
            'author': 'ecommerce_owner_alex',
            'upvotes': 31,
            'comments': 8,
            'created_hours_ago': 6,
            'content': 'Our agency takes 2-3 weeks to deliver creative concepts while our current ads are burning money...',
            'detected_pain_points': ['Agency Speed', 'Creative Turnaround', 'Ad Performance'],
            'business_context': 'E-commerce',
            'urgency': 'medium',
            'opportunity_score': 7.8
        }
    ]
    
    print("🔍 STEP 1: Community Monitoring & Opportunity Detection")
    print("-" * 50)
    
    for post in simulated_reddit_feed:
        print(f"📋 r/{post['subreddit']} | Score: {post['opportunity_score']}")
        print(f"   '{post['title']}'")
        print(f"   👤 u/{post['author']} | 🔼 {post['upvotes']} | 💬 {post['comments']} | ⏰ {post['created_hours_ago']}h ago")
        print(f"   🎯 Pain points: {', '.join(post['detected_pain_points'])}")
        print(f"   🏢 Context: {post['business_context']} | ⚡ Urgency: {post['urgency']}")
        print()
    
    # Filter high-value opportunities
    high_value_opportunities = [post for post in simulated_reddit_feed if post['opportunity_score'] >= 8.0]
    
    print(f"✅ Identified {len(high_value_opportunities)} high-value opportunities (score ≥ 8.0)")
    print()
    
    print("🎯 STEP 2: Response Generation & Quality Control")
    print("-" * 50)
    
    try:
        from reddit_automation.enhanced_response_generator import EnhancedResponseGenerator
        generator = EnhancedResponseGenerator()
        
        responses_generated = []
        
        for i, opportunity in enumerate(high_value_opportunities, 1):
            print(f"\\n🔄 Processing Opportunity {i}/{len(high_value_opportunities)}")
            print(f"   Post: {opportunity['title'][:60]}...")
            print(f"   Target: r/{opportunity['subreddit']}")
            
            # Generate response
            response = generator.generate_personalized_response(opportunity)
            
            if response:
                print(f"   ✅ Response generated ({len(response)} characters)")
                
                # Quality control checks
                quality_checks = {
                    'length_ok': len(response) >= 50,
                    'no_emojis': not any(emoji in response for emoji in ['🎯', '💡', '📊', '✅', '❌', '🚀']),
                    'no_bullets': not any(pattern in response for pattern in ['• ', '- ', '1. ', '2. ']),
                    'no_sales': not any(phrase in response.lower() for phrase in ['dm me', 'contact me', 'hire me', 'my service']),
                    'conversational': any(word in response.lower() for word in ['honestly', 'actually', 'and ', 'but ', 'been'])
                }
                
                all_checks_pass = all(quality_checks.values())
                
                print(f"   📋 Quality Control:")
                for check_name, passed in quality_checks.items():
                    status = "✅" if passed else "❌"
                    print(f"      {status} {check_name.replace('_', ' ').title()}")
                
                if all_checks_pass:
                    print(f"   🚀 APPROVED for posting")
                    responses_generated.append({
                        'opportunity': opportunity,
                        'response': response,
                        'approved': True
                    })
                else:
                    print(f"   ⚠️  REJECTED - Failed quality control")
                    
                # Show response preview
                print(f"   📝 Preview: {response[:120]}...")
                
            else:
                print(f"   ❌ Failed to generate response")
            
            time.sleep(0.5)  # Simulate processing time
        
        print(f"\\n✅ Generated {len(responses_generated)} approved responses")
        
    except Exception as e:
        print(f"❌ Error in response generation: {e}")
        return
    
    print("\\n📤 STEP 3: Posting Simulation (Safety Mode)")
    print("-" * 50)
    
    for i, item in enumerate(responses_generated, 1):
        opportunity = item['opportunity']
        response = item['response']
        
        print(f"\\n📌 Posting {i}/{len(responses_generated)}")
        print(f"   Target: r/{opportunity['subreddit']}")
        print(f"   Post: {opportunity['title'][:50]}...")
        print(f"   Response Length: {len(response)} chars")
        print(f"   🔄 Simulating Reddit API call...")
        
        time.sleep(1)  # Simulate API delay
        
        print(f"   ✅ SUCCESS - Comment posted")
        print(f"   📊 Engagement expected: {opportunity['upvotes'] // 10}-{opportunity['upvotes'] // 5} upvotes")
        print(f"   ⏰ Cooldown: 5-10 minutes until next post")
    
    print("\\n📊 STEP 4: Workflow Summary & Analytics")
    print("-" * 50)
    
    total_posts_scanned = len(simulated_reddit_feed)
    opportunities_identified = len(high_value_opportunities)
    responses_approved = len(responses_generated)
    
    print(f"   📈 Performance Metrics:")
    print(f"      • Posts scanned: {total_posts_scanned}")
    print(f"      • High-value opportunities: {opportunities_identified}")
    print(f"      • Responses generated: {responses_approved}")
    print(f"      • Success rate: {(responses_approved/opportunities_identified*100):.1f}%")
    print(f"      • Average response length: {sum(len(r['response']) for r in responses_generated) // len(responses_generated) if responses_generated else 0} chars")
    
    print(f"\\n   🎯 Value Delivered:")
    print(f"      • Zero promotional content")
    print(f"      • Authentic, helpful responses")
    print(f"      • Community-appropriate tone")
    print(f"      • Strategic brand positioning")
    
    print(f"\\n   ⚡ Next Steps:")
    print(f"      • Monitor response engagement")
    print(f"      • Track profile visits and DMs")
    print(f"      • Adjust strategy based on performance")
    print(f"      • Schedule next outreach session")
    
    print("\\n🎉 WORKFLOW COMPLETE!")
    print("=" * 70)
    print(f"Demo finished: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    print("📋 Status: READY FOR PRODUCTION")
    print("⚠️  Note: Requires Reddit API credentials for live posting")

if __name__ == "__main__":
    demo_full_workflow()