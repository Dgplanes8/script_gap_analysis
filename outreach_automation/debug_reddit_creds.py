#!/usr/bin/env python3
"""
Debug Reddit Credentials
Show what credentials are being loaded (without exposing full values)
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("🔍 Debug Reddit Credentials Loading...")

client_id = os.getenv('REDDIT_CLIENT_ID')
client_secret = os.getenv('REDDIT_CLIENT_SECRET')
username = os.getenv('REDDIT_USERNAME')
password = os.getenv('REDDIT_PASSWORD')

print(f"Client ID: {client_id[:8] if client_id else 'NOT FOUND'}...")
print(f"Client Secret: {client_secret[:8] if client_secret else 'NOT FOUND'}...")
print(f"Username: {username if username else 'NOT FOUND'}")
print(f"Password: {'*' * len(password) if password else 'NOT FOUND'}")

print(f"\nFull Client ID length: {len(client_id) if client_id else 0}")
print(f"Full Secret length: {len(client_secret) if client_secret else 0}")

# Check if .env file exists and is readable
env_path = ".env"
parent_env_path = "../.env"

print(f"\nChecking .env files:")
print(f"Local .env exists: {os.path.exists(env_path)}")
print(f"Parent .env exists: {os.path.exists(parent_env_path)}")

if os.path.exists(parent_env_path):
    print("Loading from parent directory...")
    load_dotenv(parent_env_path)
    
    client_id = os.getenv('REDDIT_CLIENT_ID')
    client_secret = os.getenv('REDDIT_CLIENT_SECRET')
    username = os.getenv('REDDIT_USERNAME')
    password = os.getenv('REDDIT_PASSWORD')
    
    print(f"Updated Client ID: {client_id[:8] if client_id else 'NOT FOUND'}...")
    print(f"Updated Username: {username if username else 'NOT FOUND'}")