#!/usr/bin/env python3
"""
TikTok Video Downloader

Downloads TikTok videos from URLs stored in recent_trending_videos.json
and saves them to the downloaded_tiktok_videos folder with dynamic filenames.

Requirements:
- yt-dlp (install with: pip install yt-dlp)
"""

import json
import os
import subprocess
import sys
import re
from pathlib import Path
from urllib.parse import urlparse

def install_ytdlp():
    """Install yt-dlp if not already installed"""
    try:
        import yt_dlp
        return True
    except ImportError:
        print("yt-dlp not found. Installing...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "yt-dlp"])
            import yt_dlp
            return True
        except Exception as e:
            print(f"Failed to install yt-dlp: {e}")
            return False

def sanitize_filename(text, max_length=50):
    """Sanitize text for use in filename"""
    if not text:
        return "untitled"
    
    # Remove or replace invalid characters
    sanitized = re.sub(r'[<>:"/\\|?*]', '_', text)
    sanitized = re.sub(r'[^\w\s-]', '', sanitized)
    sanitized = re.sub(r'[-\s]+', '_', sanitized)
    
    # Truncate if too long
    if len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    
    return sanitized.strip('_') or "untitled"

def download_tiktok_video(url, output_dir, video_data):
    """Download a single TikTok video using yt-dlp with dynamic filename"""
    try:
        # Extract metadata for filename
        author = video_data.get('authorMeta.name', 'unknown')
        text = video_data.get('text', '')
        digg_count = video_data.get('diggCount', 0)
        create_time = video_data.get('createTimeISO', '')
        
        # Create dynamic filename components
        author_clean = sanitize_filename(author, 20)
        text_clean = sanitize_filename(text, 30)
        date_part = create_time[:10] if create_time else 'unknown_date'  # YYYY-MM-DD
        
        # Build filename template
        filename_template = f"{author_clean}_{text_clean}_{date_part}_likes{digg_count}_%(id)s.%(ext)s"
        
        # Configure yt-dlp options
        ydl_opts = {
            'outtmpl': os.path.join(output_dir, filename_template),
            'format': 'best/worst',  # Get best available format, fallback to worst if needed
            'writeinfojson': True,  # Save metadata
            'writedescription': True,  # Save description
            'ignoreerrors': True,  # Continue on errors
        }
        
        import yt_dlp
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    # Paths
    script_dir = Path(__file__).parent
    json_file = script_dir / "recent_trending_videos.json"
    output_dir = script_dir / "downloaded_tiktok_videos"
    
    # Check if yt-dlp is installed
    if not install_ytdlp():
        print("Cannot proceed without yt-dlp. Please install manually: pip install yt-dlp")
        return
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Check if JSON file exists
    if not json_file.exists():
        print(f"JSON file not found: {json_file}")
        return
    
    # Load JSON data
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            videos = json.load(f)
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        return
    
    if not isinstance(videos, list):
        print("JSON file should contain a list of videos")
        return
    
    # Limit to first 10 videos for testing
    test_videos = videos[:10]
    
    print(f"Found {len(videos)} videos total, testing first {len(test_videos)} videos")
    print(f"Output directory: {output_dir}")
    
    # Download each video
    successful = 0
    failed = 0
    
    for i, video in enumerate(test_videos, 1):
        if not isinstance(video, dict) or 'webVideoUrl' not in video:
            print(f"Video {i}: Missing webVideoUrl field")
            failed += 1
            continue
        
        url = video['webVideoUrl']
        author = video.get('authorMeta.name', 'unknown')
        text_preview = video.get('text', '')[:50] + "..." if len(video.get('text', '')) > 50 else video.get('text', '')
        
        print(f"\nDownloading {i}/{len(videos)}: @{author}")
        print(f"Text: {text_preview}")
        print(f"URL: {url}")
        
        if download_tiktok_video(url, str(output_dir), video):
            successful += 1
            print(f"✓ Successfully downloaded video {i}")
        else:
            failed += 1
            print(f"✗ Failed to download video {i}")
    
    print(f"\n=== Download Summary ===")
    print(f"Successfully downloaded: {successful}")
    print(f"Failed downloads: {failed}")
    print(f"Total videos processed: {len(test_videos)} (out of {len(videos)} total)")
    print(f"Videos saved to: {output_dir}")
    print(f"\nFilename format: [author]_[text]_[date]_likes[count]_[video_id].[ext]")

if __name__ == "__main__":
    main()