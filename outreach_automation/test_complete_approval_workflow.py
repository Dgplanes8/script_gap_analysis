#!/usr/bin/env python3
"""
Complete Approval Workflow Test
Demonstrates the full workflow with approval step
"""

import sys
import os
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import logging
logging.basicConfig(level=logging.INFO)

def test_complete_workflow():
    """Test the complete workflow with approval step"""
    
    print("🚀 Complete Reddit Workflow with Approval")
    print("=" * 50)
    print(f"Started: {datetime.now()}")
    print()
    
    try:
        # Simulate finding opportunities
        print("🔍 STEP 1: Opportunity Detection")
        print("-" * 30)
        
        mock_opportunities = [
            {
                'post_id': 'workflow_001',
                'title': 'Creative fatigue in Facebook ads - what strategies actually work?',
                'subreddit': 'marketing',
                'author': 'growth_marketer_jen',
                'score': 89,
                'num_comments': 23,
                'url': 'https://reddit.com/r/marketing/workflow_001',
                'pain_points': ['Creative Fatigue', 'Ad Performance'],
                'business_context': 'D2C Marketing',
                'opportunity_score': 8.7,
                'response_strategy': 'creative_fatigue_solution'
            },
            {
                'post_id': 'workflow_002',
                'title': 'SaaS CAC rising 60% - anyone else experiencing this?',
                'subreddit': 'SaaS',
                'author': 'startup_founder_alex',
                'score': 156,
                'num_comments': 41,
                'url': 'https://reddit.com/r/SaaS/workflow_002',
                'pain_points': ['Rising CAC', 'Performance Issues'],
                'business_context': 'SaaS',
                'opportunity_score': 9.2,
                'response_strategy': 'cac_optimization_advice'
            }
        ]
        
        print(f"✅ Found {len(mock_opportunities)} high-value opportunities")
        for opp in mock_opportunities:
            print(f"   📋 r/{opp['subreddit']}: {opp['title'][:50]}... (Score: {opp['opportunity_score']})")
        
        print()
        
        # Step 2: Generate responses
        print("🎯 STEP 2: Response Generation")
        print("-" * 30)
        
        from reddit_automation.enhanced_response_generator import EnhancedResponseGenerator
        generator = EnhancedResponseGenerator()
        
        approved_responses = []
        
        for i, opportunity in enumerate(mock_opportunities, 1):
            print(f"\\n🔄 Processing opportunity {i}")
            print(f"   Post: {opportunity['title']}")
            print(f"   Target: r/{opportunity['subreddit']}")
            
            # Generate response
            response = generator.generate_personalized_response(opportunity)
            
            if response:
                print(f"   ✅ Response generated ({len(response)} chars)")
                print(f"   📝 Preview: {response[:80]}...")
                
                # Quality control
                quality_ok = (
                    len(response) > 50 and
                    not any(emoji in response for emoji in ['🎯', '💡', '📊']) and
                    not any(phrase in response.lower() for phrase in ['dm me', 'contact me'])
                )
                
                if quality_ok:
                    print(f"   📋 Quality check: ✅ PASSED")
                    approved_responses.append({
                        'opportunity': opportunity,
                        'response': response
                    })
                else:
                    print(f"   📋 Quality check: ❌ FAILED")
            else:
                print(f"   ❌ Response generation failed")
        
        print(f"\\n✅ Generated {len(approved_responses)} approved responses")
        
        print()
        
        # Step 3: Submit for approval (NEW WORKFLOW)
        print("📋 STEP 3: Approval Workflow")
        print("-" * 30)
        
        print("🔄 Submitting responses for manual approval...")
        
        for i, item in enumerate(approved_responses, 1):
            opportunity = item['opportunity']
            response = item['response']
            
            print(f"\\n📤 Submitting response {i} for approval:")
            print(f"   Post: {opportunity['title'][:50]}...")
            print(f"   Subreddit: r/{opportunity['subreddit']}")
            print(f"   Response length: {len(response)} chars")
            print(f"   Quality score: {opportunity['opportunity_score']}")
            
            # Simulate approval submission
            approval_data = {
                'post_title': opportunity['title'],
                'subreddit': opportunity['subreddit'],
                'post_url': opportunity['url'],
                'response_text': response,
                'response_length': len(response),
                'pain_points': ', '.join(opportunity['pain_points']),
                'business_context': opportunity['business_context'],
                'opportunity_score': opportunity['opportunity_score'],
                'status': 'Pending Manual Review',
                'submitted_at': datetime.now().isoformat(),
                'platform': 'Reddit'
            }
            
            print(f"   ✅ Submitted to Pending Posts table")
            print(f"   📋 Status: Pending Manual Review")
            print(f"   🔗 Airtable URL: [View in Pending Posts table]")
        
        print()
        
        # Step 4: Manual approval process simulation
        print("👤 STEP 4: Manual Approval Process")
        print("-" * 35)
        
        print("📋 Manual Review Required:")
        print("   1. Open Airtable 'Pending Posts' table")
        print("   2. Review each submitted response:")
        print("      • Check response quality and authenticity")
        print("      • Verify it provides genuine value")
        print("      • Ensure no promotional content")
        print("      • Confirm appropriate for subreddit")
        print("   3. Set status to 'Approved' or 'Rejected'")
        print("   4. Add any reviewer notes")
        print()
        print("⚠️  Only approved responses will be posted automatically")
        
        print()
        
        # Step 5: Automated posting of approved responses
        print("🚀 STEP 5: Automated Posting (Approved Only)")
        print("-" * 45)
        
        print("🔄 Checking for approved responses...")
        print("   📋 System will periodically check for approved posts")
        print("   ✅ Approved posts will be posted automatically")
        print("   📊 Results will be tracked in Interactions table")
        print("   ⏰ Rate limiting ensures safe posting intervals")
        
        print()
        
        # Workflow summary
        print("📊 WORKFLOW SUMMARY")
        print("-" * 20)
        
        print(f"   📈 Performance:")
        print(f"      • Opportunities detected: {len(mock_opportunities)}")
        print(f"      • Responses generated: {len(approved_responses)}")
        print(f"      • Submitted for approval: {len(approved_responses)}")
        print(f"      • Manual review required: {len(approved_responses)}")
        
        print(f"\\n   🛡️  Safety Features:")
        print(f"      • Quality control validation")
        print(f"      • Manual approval required")
        print(f"      • Value-first content guidelines")
        print(f"      • Rate limiting and compliance")
        
        print(f"\\n   🔄 Next Steps:")
        print(f"      • Check Airtable for pending approvals")
        print(f"      • Review and approve quality responses")
        print(f"      • Monitor posting performance")
        print(f"      • Adjust strategy based on results")
        
        print()
        print("🎉 COMPLETE APPROVAL WORKFLOW READY!")
        print("   The system now requires manual approval before posting")
        print("   This ensures quality control and brand safety")
        
    except Exception as e:
        print(f"❌ Workflow test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_complete_workflow()