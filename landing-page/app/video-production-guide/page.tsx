import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { Play, Camera, Edit, Smartphone, Monitor, Mic, Lightbulb, CheckCircle, ArrowRight, Target, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Video Production Guide for Business Growth | DIY Video Creation Tips | APSICS Media',
  description: 'Learn to create professional-looking ad videos on any budget. Step-by-step guide for businesses: equipment, shooting, editing, and optimization tips.',
  keywords: 'business video production, DIY ad videos, video marketing for businesses, budget video production, video equipment guide, video editing tips',
  openGraph: {
    title: 'Video Production Guide for Business Growth | DIY Video Creation Tips',
    description: 'Learn to create professional-looking ad videos on any budget. Step-by-step guide for businesses.',
    type: 'website',
    images: [
      {
        url: '/images/video-guide-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Video Production Guide for Business Growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Production Guide for Business Growth | DIY Video Creation Tips',
    description: 'Create professional ad videos on any budget. Complete DIY guide for businesses.',
    images: ['/images/video-guide-og.jpg'],
  },
  alternates: {
    canonical: '/video-production-guide',
  },
};

export default function VideoProductionGuidePage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="article"
        title="Video Production Guide for Business Growth"
        description="Learn to create professional-looking ad videos on any budget. Step-by-step guide for businesses: equipment, shooting, editing, and optimization tips."
        slug="/video-production-guide"
        additionalSchemas={[
          {
            '@type': 'HowTo',
            name: 'How to Create Professional Ad Videos for Business Growth',
            description: 'Complete guide for creating professional-looking advertising videos on any budget',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Plan Your Video',
                text: 'Define objectives, script, and shot list'
              },
              {
                '@type': 'HowToStep',
                name: 'Set Up Equipment',
                text: 'Configure camera, lighting, and audio setup'
              },
              {
                '@type': 'HowToStep',
                name: 'Record Content',
                text: 'Shoot video following professional techniques'
              },
              {
                '@type': 'HowToStep',
                name: 'Edit and Optimize',
                text: 'Edit video and optimize for each platform'
              }
            ]
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Play className="h-4 w-4 mr-2" />
                VIDEO PRODUCTION GUIDE
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Create Professional Ad Videos on Any Budget
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Step-by-step guide for founders to create high-converting video ads without expensive equipment or agencies. Learn the techniques used by professional video marketers.
              </p>
              
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">$200-800</div>
                    <div className="text-sm text-gray-600">Total equipment cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2-4 hrs</div>
                    <div className="text-sm text-gray-600">Per video (including editing)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">90%+</div>
                    <div className="text-sm text-gray-600">Quality vs. $5K+ production</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Essential Equipment for Business Video Production
                </h2>
                <p className="text-xl text-gray-600">
                  Professional results without the professional price tag
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Budget Setup</h3>
                  <p className="text-gray-600 text-center mb-6">$200-400 total investment</p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Camera:</strong> iPhone 12+ or Android equivalent</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Audio:</strong> Lavalier mic ($30-50)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Lighting:</strong> Ring light or softbox ($40-80)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Tripod:</strong> Smartphone tripod ($20-40)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Editing:</strong> CapCut (free) or DaVinci Resolve (free)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Standard Setup</h3>
                  <p className="text-gray-600 text-center mb-6">$400-600 total investment</p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Camera:</strong> DSLR or mirrorless ($300-400 used)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Audio:</strong> Wireless mic system ($100-150)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Lighting:</strong> 3-point lighting kit ($80-120)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Tripod:</strong> Professional tripod ($60-100)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Editing:</strong> Adobe Premiere ($20/mo) or Final Cut Pro ($300)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Pro Setup</h3>
                  <p className="text-gray-600 text-center mb-6">$600-800 total investment</p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Camera:</strong> Professional mirrorless + lens ($500-600)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Audio:</strong> Shotgun mic + recorder ($150-200)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Lighting:</strong> LED panel kit ($120-180)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Tripod:</strong> Fluid head tripod ($100-150)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Editing:</strong> Professional software + plugins</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Pro Tip: Start Small, Upgrade Smart</h3>
                <p className="text-gray-600 mb-4">
                  Begin with the Budget Setup and reinvest your ad revenue into better equipment. Many successful business video ads are shot entirely on smartphones with good lighting and audio.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-semibold text-gray-900">Month 1-2</div>
                    <div className="text-gray-600">Start with smartphone + basic lighting</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-semibold text-gray-900">Month 3-4</div>
                    <div className="text-gray-600">Upgrade audio equipment first</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-semibold text-gray-900">Month 5+</div>
                    <div className="text-gray-600">Consider camera upgrade if budget allows</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The 4-Step Video Production Process
                </h2>
                <p className="text-xl text-gray-600">
                  From concept to published ad in 2-4 hours
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Pre-Production Planning</h3>
                      <p className="text-gray-600 mb-4">Time investment: 30-45 minutes</p>
                    </div>
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Script Preparation</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Break script into 3-5 second segments</li>
                          <li>• Mark key emotion points</li>
                          <li>• Plan visual transitions</li>
                          <li>• Time each section</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Shot Planning</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Create simple shot list</li>
                          <li>• Plan camera angles (close-up, medium, wide)</li>
                          <li>• Note any product/screen shots needed</li>
                          <li>• Prepare props and backgrounds</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-600">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipment Setup & Recording</h3>
                      <p className="text-gray-600 mb-4">Time investment: 60-90 minutes</p>
                    </div>
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Setup (15-20 mins)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Position lighting for even face illumination</li>
                          <li>• Set up tripod at eye level</li>
                          <li>• Connect and test audio equipment</li>
                          <li>• Frame shot (rule of thirds)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Recording (45-70 mins)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Record each segment 3-5 times</li>
                          <li>• Vary energy and pacing</li>
                          <li>• Capture B-roll footage</li>
                          <li>• Record screen captures if needed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-600">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Editing & Post-Production</h3>
                      <p className="text-gray-600 mb-4">Time investment: 45-90 minutes</p>
                    </div>
                    <Edit className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Basic Editing</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cut and arrange best takes</li>
                          <li>• Add transitions (2-3 max)</li>
                          <li>• Sync and adjust audio levels</li>
                          <li>• Color correct for consistency</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Platform Optimization</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Create 9:16 (TikTok/Reels) version</li>
                          <li>• Create 1:1 (Instagram) version</li>
                          <li>• Create 16:9 (Facebook/YouTube) version</li>
                          <li>• Add captions for accessibility</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-600">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Export & Platform Upload</h3>
                      <p className="text-gray-600 mb-4">Time investment: 15-30 minutes</p>
                    </div>
                    <Monitor className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Export Settings</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• H.264 format for compatibility</li>
                          <li>• 1080p resolution minimum</li>
                          <li>• 30fps frame rate</li>
                          <li>• High-quality bitrate settings</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Platform Upload</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Upload to ad platform creative library</li>
                          <li>• Add to campaign with proper targeting</li>
                          <li>• Set initial budget and schedule</li>
                          <li>• Monitor first few hours for performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Professional Video Techniques for Businesses
                </h2>
                <p className="text-xl text-gray-600">
                  Make your videos look professional without the professional budget
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Camera Techniques</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Keep camera at eye level</li>
                    <li>• Use rule of thirds for framing</li>
                    <li>• Maintain consistent distance from camera</li>
                    <li>• Clean, simple background</li>
                    <li>• Lock focus to avoid hunting</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Lighting Setup</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Face the light source (window/light)</li>
                    <li>• Avoid harsh shadows under eyes</li>
                    <li>• Use diffuser for softer light</li>
                    <li>• Consistent lighting temperature</li>
                    <li>• Avoid backlit situations</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Audio Quality</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Record in quiet environment</li>
                    <li>• Use external microphone</li>
                    <li>• Test audio levels before recording</li>
                    <li>• Record room tone for editing</li>
                    <li>• Monitor audio while recording</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Speak 10% slower than normal</li>
                    <li>• Emphasize key words with pauses</li>
                    <li>• Maintain energy throughout</li>
                    <li>• Use hand gestures naturally</li>
                    <li>• Make eye contact with camera</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Editing Best Practices</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Keep cuts tight and purposeful</li>
                    <li>• Use jump cuts to maintain energy</li>
                    <li>• Add captions for 85% of viewers</li>
                    <li>• Color grade for consistency</li>
                    <li>• Export in multiple aspect ratios</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Optimization</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Vertical (9:16) for TikTok/Reels</li>
                    <li>• Square (1:1) for Instagram feed</li>
                    <li>• Horizontal (16:9) for Facebook</li>
                    <li>• Hook in first 3 seconds</li>
                    <li>• Call-to-action in last 5 seconds</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Common Video Production Mistakes to Avoid
                </h2>
                <p className="text-xl text-gray-600">
                  Learn from the mistakes that cost other businesses thousands in wasted ad spend
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Poor Audio Quality</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Problem:</h4>
                      <p className="text-gray-600 text-sm mb-4">Using camera's built-in microphone, recording in noisy environments, inconsistent audio levels.</p>
                      <p className="text-red-600 text-sm"><strong>Impact:</strong> 67% of viewers skip videos with poor audio within 5 seconds.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Solution:</h4>
                      <p className="text-gray-600 text-sm">Invest in a $30-50 lavalier microphone, record in quiet spaces, test audio levels before recording, use audio editing to normalize levels.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Weak Opening Hook</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Problem:</h4>
                      <p className="text-gray-600 text-sm mb-4">Starting with "Hi, I'm..." or company introduction instead of addressing viewer pain point immediately.</p>
                      <p className="text-red-600 text-sm"><strong>Impact:</strong> 73% of viewers decide to skip within first 3 seconds.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Solution:</h4>
                      <p className="text-gray-600 text-sm">Start with a problem statement, surprising fact, or direct question. Example: "If you're spending $2K/month on ads with zero results..."</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Over-Editing and Effects</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Problem:</h4>
                      <p className="text-gray-600 text-sm mb-4">Using too many transitions, effects, text animations that distract from the message and look amateurish.</p>
                      <p className="text-red-600 text-sm"><strong>Impact:</strong> Viewers focus on effects instead of message, reducing conversion rates.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Solution:</h4>
                      <p className="text-gray-600 text-sm">Keep editing simple and purposeful. Use jump cuts, simple fades, and minimal text overlays. Focus on message clarity.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Wrong Aspect Ratio for Platform</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Problem:</h4>
                      <p className="text-gray-600 text-sm mb-4">Using same horizontal video across all platforms instead of optimizing for each platform's native format.</p>
                      <p className="text-red-600 text-sm"><strong>Impact:</strong> Up to 60% reduction in engagement and reach on mobile-first platforms.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">The Solution:</h4>
                      <p className="text-gray-600 text-sm">Create multiple versions: 9:16 for TikTok/Reels, 1:1 for Instagram feed, 16:9 for Facebook. Plan shots to work in multiple ratios.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Professional Video Ads?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get our proven video scripts that you can film with these techniques. Professional creative strategy meets DIY production.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/free-hooks"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Get Video Scripts Free
                </Link>
                <Link
                  href="/#service-tiers"
                  className="bg-purple-800 hover:bg-purple-900 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  See Weekly Plans
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p className="text-lg opacity-90 mb-2">
                  <strong>Equipment + Strategy = Results.</strong> Get the scripts designed for DIY video production.
                </p>
                <p className="text-sm opacity-75">
                  Professional creative templates that work with smartphone cameras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}