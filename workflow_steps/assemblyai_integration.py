#!/usr/bin/env python3
"""
AssemblyAI Integration for Video/Audio Transcription

This script provides AssemblyAI API integration for the ad analysis workflow,
replacing Whisper with AssemblyAI's advanced transcription features including
sentiment analysis, entity detection, and auto-highlights.
"""

import os
import json
import time
import requests
from pathlib import Path
from typing import Dict, List, Optional

class AssemblyAITranscriber:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.assemblyai.com/v2"
        self.headers = {"authorization": api_key}
    
    def upload_file(self, file_path: str) -> str:
        """Upload audio/video file to AssemblyAI"""
        print(f"📤 Uploading {file_path}...")
        
        with open(file_path, "rb") as f:
            response = requests.post(
                f"{self.base_url}/upload",
                headers=self.headers,
                data=f
            )
        
        if response.status_code == 200:
            upload_url = response.json()["upload_url"]
            print(f"✅ Upload successful: {upload_url}")
            return upload_url
        else:
            raise Exception(f"Upload failed: {response.status_code} - {response.text}")
    
    def create_transcript(self, audio_url: str, config: Dict) -> str:
        """Create transcription job with advanced features"""
        print(f"🎙️ Creating transcription job...")
        
        transcript_request = {
            "audio_url": audio_url,
            "language_code": config.get("language_code", "en_us"),
            "punctuate": config.get("punctuate", True),
            "format_text": config.get("format_text", True),
            "speaker_labels": config.get("speaker_labels", True),
            "sentiment_analysis": config.get("sentiment_analysis", True),
            "entity_detection": config.get("entity_detection", True),
            "iab_categories": config.get("iab_categories", True),
            "content_safety": config.get("content_safety", True),
            "auto_highlights": config.get("auto_highlights", True)
        }
        
        response = requests.post(
            f"{self.base_url}/transcript",
            headers=self.headers,
            json=transcript_request
        )
        
        if response.status_code == 200:
            transcript_id = response.json()["id"]
            print(f"✅ Transcription job created: {transcript_id}")
            return transcript_id
        else:
            raise Exception(f"Transcription request failed: {response.status_code} - {response.text}")
    
    def get_transcript(self, transcript_id: str) -> Dict:
        """Get transcription results with polling"""
        print(f"⏳ Waiting for transcription to complete...")
        
        while True:
            response = requests.get(
                f"{self.base_url}/transcript/{transcript_id}",
                headers=self.headers
            )
            
            if response.status_code == 200:
                result = response.json()
                status = result["status"]
                
                if status == "completed":
                    print(f"✅ Transcription completed!")
                    return result
                elif status == "error":
                    raise Exception(f"Transcription failed: {result.get('error', 'Unknown error')}")
                else:
                    print(f"⏳ Status: {status}... waiting...")
                    time.sleep(10)
            else:
                raise Exception(f"Status check failed: {response.status_code} - {response.text}")
    
    def transcribe_file(self, file_path: str, config: Dict) -> Dict:
        """Complete transcription workflow"""
        try:
            # Upload file
            audio_url = self.upload_file(file_path)
            
            # Create transcription
            transcript_id = self.create_transcript(audio_url, config)
            
            # Get results
            result = self.get_transcript(transcript_id)
            
            return result
            
        except Exception as e:
            print(f"❌ Transcription error: {e}")
            return None

def transcribe_video_folder(brand_name: str, base_path: str = None):
    """Transcribe all videos in brand's video folders using AssemblyAI"""
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    
    # Load AssemblyAI configuration
    config_file = brand_folder / "AssemblyAI" / f"{clean_brand_name}_assemblyai_config.json"
    
    try:
        with open(config_file, "r") as f:
            config = json.load(f)
    except FileNotFoundError:
        print("❌ AssemblyAI config not found. Run Step 5 setup first.")
        return False
    
    # Initialize transcriber
    api_key = config["api_settings"]["api_key"]
    if api_key == "your_assemblyai_api_key_here":
        print("❌ Please update your AssemblyAI API key in the config file")
        return False
    
    transcriber = AssemblyAITranscriber(api_key)
    
    # Find video files
    video_folders = [
        brand_folder / "Apify" / "videos",
        brand_folder / "AssemblyAI" / "input_videos"
    ]
    
    video_extensions = config["input_sources"]["supported_formats"]
    transcription_results = []
    
    for folder in video_folders:
        if folder.exists():
            for video_file in folder.iterdir():
                if video_file.suffix.lower() in video_extensions:
                    print(f"\n🎬 Processing: {video_file.name}")
                    
                    # Transcribe video
                    result = transcriber.transcribe_file(
                        str(video_file),
                        config["transcription_settings"]
                    )
                    
                    if result:
                        # Save individual result
                        output_file = brand_folder / "AssemblyAI" / f"{video_file.stem}_transcript.json"
                        with open(output_file, "w") as f:
                            json.dump(result, f, indent=2)
                        
                        transcription_results.append({
                            "file": video_file.name,
                            "transcript_id": result["id"],
                            "output_file": str(output_file),
                            "text": result["text"],
                            "sentiment_analysis": result.get("sentiment_analysis_results", []),
                            "entities": result.get("entities", []),
                            "auto_highlights": result.get("auto_highlights_result", {}),
                            "iab_categories": result.get("iab_categories_result", {})
                        })
                        
                        print(f"✅ Saved transcript: {output_file}")
    
    # Save summary results
    summary_file = brand_folder / "AssemblyAI" / f"{clean_brand_name}_transcription_summary.json"
    summary = {
        "brand_name": brand_name,
        "transcription_date": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_files": len(transcription_results),
        "results": transcription_results
    }
    
    with open(summary_file, "w") as f:
        json.dump(summary, f, indent=2)
    
    print(f"\n🎯 Transcription Summary:")
    print(f"   - {len(transcription_results)} files processed")
    print(f"   - Results saved to: {summary_file}")
    print(f"   - Individual transcripts in: {brand_folder}/AssemblyAI/")
    
    return True

def analyze_transcription_results(brand_name: str, base_path: str = None):
    """Analyze AssemblyAI transcription results for ad insights"""
    if base_path is None:
        base_path = Path("/Users/nataliebasque/Ad Workflow")
    else:
        base_path = Path(base_path)
    
    clean_brand_name = brand_name.replace(" ", "_").lower()
    brand_folder = base_path / "Projects" / clean_brand_name
    
    # Load transcription summary
    summary_file = brand_folder / "AssemblyAI" / f"{clean_brand_name}_transcription_summary.json"
    
    try:
        with open(summary_file, "r") as f:
            summary = json.load(f)
    except FileNotFoundError:
        print("❌ Transcription summary not found. Run transcription first.")
        return False
    
    analysis = {
        "brand_name": brand_name,
        "analysis_date": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_files_analyzed": len(summary["results"]),
        "insights": {
            "common_hooks": [],
            "emotional_patterns": [],
            "entity_mentions": [],
            "sentiment_distribution": {},
            "topic_categories": [],
            "call_to_action_patterns": []
        }
    }
    
    # Analyze each transcript
    for result in summary["results"]:
        # Extract hooks (first 10 words)
        text = result["text"]
        if text:
            words = text.split()
            hook = " ".join(words[:10]) if len(words) >= 10 else text
            analysis["insights"]["common_hooks"].append({
                "file": result["file"],
                "hook": hook
            })
        
        # Analyze sentiment
        sentiment_results = result.get("sentiment_analysis", [])
        for sentiment in sentiment_results:
            sentiment_label = sentiment.get("sentiment")
            if sentiment_label in analysis["insights"]["sentiment_distribution"]:
                analysis["insights"]["sentiment_distribution"][sentiment_label] += 1
            else:
                analysis["insights"]["sentiment_distribution"][sentiment_label] = 1
        
        # Extract entities
        entities = result.get("entities", [])
        for entity in entities:
            analysis["insights"]["entity_mentions"].append({
                "file": result["file"],
                "entity": entity.get("text"),
                "type": entity.get("entity_type"),
                "confidence": entity.get("confidence")
            })
        
        # Extract highlights
        highlights = result.get("auto_highlights", {})
        if highlights.get("results"):
            for highlight in highlights["results"]:
                analysis["insights"]["call_to_action_patterns"].append({
                    "file": result["file"],
                    "text": highlight.get("text"),
                    "rank": highlight.get("rank")
                })
    
    # Save analysis
    analysis_file = brand_folder / "AssemblyAI" / f"{clean_brand_name}_transcript_analysis.json"
    with open(analysis_file, "w") as f:
        json.dump(analysis, f, indent=2)
    
    print(f"\n📊 Transcription Analysis Complete:")
    print(f"   - {analysis['total_files_analyzed']} files analyzed")
    print(f"   - {len(analysis['insights']['common_hooks'])} hooks extracted")
    print(f"   - {len(analysis['insights']['entity_mentions'])} entities found")
    print(f"   - Analysis saved to: {analysis_file}")
    
    return True

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="AssemblyAI Transcription Integration")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--action", choices=["transcribe", "analyze"], required=True, help="Action to perform")
    parser.add_argument("--path", help="Base path for project")
    
    args = parser.parse_args()
    
    if args.action == "transcribe":
        transcribe_video_folder(args.brand, args.path)
    elif args.action == "analyze":
        analyze_transcription_results(args.brand, args.path)