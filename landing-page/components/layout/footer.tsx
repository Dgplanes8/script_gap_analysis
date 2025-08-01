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
              <span className="text-xl font-bold">Strategic Ad Intelligence</span>
            </div>
            <p className="text-gray-400 mb-6">
              Fortune 100 methodology for subscription businesses. Transform your growth with 
              systematic ad intelligence and strategic optimization.
            </p>
            <div className="flex space-x-4">
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">$100M+</div>
                <div>Ad Spend Managed</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">11-Phase</div>
                <div>Methodology</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="font-semibold text-white">Fortune 100</div>
                <div>Proven Methods</div>
              </div>
            </div>
          </div>

          {/* Strategic Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Strategic Resources</h3>
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
                  href="/revenue-growth-benchmarking" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
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
              <li>
                <Link 
                  href="/1m-arr-marketing-playbook" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  $1M ARR Marketing Playbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Strategic Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Strategic Tools</h3>
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
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/pilot" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pilot Program
                </Link>
              </li>
              <li>
                <Link 
                  href="/990" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Strategic Scripts
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
              © {new Date().getFullYear()} Strategic Ad Intelligence System. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Fortune 100 Methodology</span>
              <span>•</span>
              <span>$100M+ Ad Spend Managed</span>
              <span>•</span>
              <span>Subscription Business Focus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}