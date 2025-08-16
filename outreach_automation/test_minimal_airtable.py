#!/usr/bin/env python3
"""
Test Minimal Airtable Submission
Start with basic fields and build up to identify valid values
"""

import sys
import os
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_minimal_airtable():
    """Test minimal Airtable submission"""
    
    print("🧪 Testing Minimal Airtable Submission")
    print("=" * 40)
    
    try:
        from airtable_manager import AirtableManager
        airtable = AirtableManager()
        
        # Test 1: Absolute minimum fields
        print("📋 Test 1: Minimal Required Fields")
        print("-" * 35)
        
        minimal_data = {
            'Name': f"Test - {datetime.now().strftime('%H:%M')}",
            'Post Title': 'Test submission',
            'Generated Response': 'This is a test response for validation',
            'Platform': 'Reddit'
        }
        
        print(f"🔄 Trying with minimal fields: {list(minimal_data.keys())}")
        
        try:
            record_id = airtable.create_pending_post(minimal_data)
            print(f"✅ SUCCESS! Minimal record created: {record_id}")
            
            # If minimal works, try adding more fields one by one
            print(f"\\n📋 Test 2: Adding Optional Fields")
            print("-" * 35)
            
            enhanced_data = minimal_data.copy()
            enhanced_data.update({
                'Subreddit': 'r/marketing',
                'Created Date': datetime.now().strftime('%Y-%m-%d'),
                'Post ID': 'test_minimal_001'
            })
            
            print(f"🔄 Adding basic optional fields...")
            record_id_2 = airtable.create_pending_post(enhanced_data)
            print(f"✅ Enhanced record created: {record_id_2}")
            
            # Try with URL
            print(f"\\n📋 Test 3: Adding URL Fields")
            print("-" * 30)
            
            url_data = enhanced_data.copy()
            url_data.update({
                'Post URL': 'https://reddit.com/r/marketing/test_minimal_001'
            })
            
            record_id_3 = airtable.create_pending_post(url_data)
            print(f"✅ URL record created: {record_id_3}")
            
            print(f"\\n🎉 All tests passed! Airtable integration working.")
            
        except Exception as e:
            print(f"❌ Minimal test failed: {e}")
            
            # If even minimal fails, there might be a required field we're missing
            print(f"\\n🔍 Troubleshooting: Required field missing")
            print(f"   Attempted fields: {list(minimal_data.keys())}")
            print(f"   Error suggests field validation or permission issue")
        
    except Exception as e:
        print(f"❌ Could not initialize Airtable: {e}")

if __name__ == "__main__":
    test_minimal_airtable()