import Link from 'next/link';
import { Building2, Calculator, TrendingUp, Target, BarChart3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-indigo-400 mr-2" />
              <span className="text-xl font-bold">Apsics Media</span>
            </div>
            <p className="text-gray-400 mb-6">
              Performance marketing acceleration for D2C and subscription businesses. Expert creative strategy 
              with ready-to-develop scripts delivered in 48 hours.
            </p>
            <div className="flex space-x-4">
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">48 Hours</div>
                <div>Script Delivery</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">3 Scripts</div>
                <div>Per Concept</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">10+ Years</div>
                <div>Performance Marketing</div>
              </div>
            </div>
          </div>

          {/* Strategic Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/cac-reduction-guide" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Target className="h-4 w-4 mr-2" />
                  CAC Reduction Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/saas-growth-marketing-guide" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  SaaS Growth Marketing Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/revenue-growth-benchmarking" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Revenue Growth Benchmarking
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketing-attribution-framework" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Attribution Framework
                </Link>
              </li>
            </ul>
          </div>

          {/* Strategic Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools & Calculators</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/cac-optimization-calculator" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  CAC Optimization Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/saas-creative-strategy-roi-calculator" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Creative Strategy ROI Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/revenue-growth-benchmarking" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Benchmark Tool
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketing-attribution-framework" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Attribution Modeling Tool
                </Link>
              </li>
              <li>
                <Link 
                  href="/saas-growth-marketing-guide" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Channel Assessment Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/#service-tiers" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Service Tiers
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/#service-tiers" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Service Tiers
                </Link>
              </li>
              <li>
                <Link 
                  href="/#strategic-process" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Process
                </Link>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Get Started</h4>
              <Link
                href="/#consultation"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Book Strategic Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Apsics Media. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Performance Marketing Acceleration</span>
              <span>•</span>
              <span>Ready-to-Develop Scripts</span>
              <span>•</span>
              <span>D2C & Subscription Focus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}