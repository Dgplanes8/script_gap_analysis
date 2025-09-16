import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Apsics Media',
  description: 'Terms and conditions for using Apsics Media services.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-6">
                Welcome to Apsics Media. These Terms of Service ("Terms") govern your access to and use of our website, 
                services, and products (collectively, the "Services"). By accessing or using our Services, you agree to be 
                bound by these Terms.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing our website or purchasing our services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-600 mb-4">Apsics Media provides weekly trend intelligence services including:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Trend Tracker ($67/month):</strong> Weekly concept delivery and trend analysis</li>
                <li><strong>Competitive Edge ($197/month):</strong> Enhanced analysis with 4 viral scripts monthly</li>
                <li><strong>Market Intelligence ($497/month):</strong> Comprehensive intelligence with 6 viral scripts monthly</li>
                <li>Newsletter subscriptions and downloadable resources</li>
                <li>Business consultation services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration and Eligibility</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>You must be at least 18 years old to use our Services</li>
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to notify us immediately of any unauthorized use of your account</li>
                <li>One account per person or business entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Subscription Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>All subscriptions are billed monthly in advance</li>
                <li>Payments are due on the subscription start date and monthly thereafter</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>Failed payments may result in service suspension</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Consultation Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Consultation fees are due upon booking confirmation</li>
                <li>Cancellations must be made at least 48 hours in advance for full refund</li>
                <li>No-shows or late cancellations forfeit the full consultation fee</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Our Content</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>All content, scripts, concepts, and analysis provided by Apsics Media are our intellectual property</li>
                <li>You may use our content for your business marketing purposes</li>
                <li>You may not resell, redistribute, or share our content with third parties</li>
                <li>You may not reverse engineer our methodologies or processes</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Your Content</h3>
              <p className="text-gray-600 mb-6">
                You retain ownership of any content you provide to us. By using our Services, you grant us a 
                license to use your content solely for the purpose of providing our Services to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Responsibilities and Prohibited Uses</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">You agree not to:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Share your account credentials with others</li>
                <li>Use our Services for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our Services to spam or harass others</li>
                <li>Create derivative works from our content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability and Modifications</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                <li>We may modify or discontinue Services with reasonable notice</li>
                <li>Scheduled maintenance will be announced in advance when possible</li>
                <li>We reserve the right to refuse service to anyone at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibent text-gray-900 mb-4">8. Cancellation and Termination</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Your Right to Cancel</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>You may cancel your subscription at any time through your account settings</li>
                <li>Cancellation takes effect at the end of your current billing period</li>
                <li>You will retain access to services until the end of your paid period</li>
                <li>No refunds for partial months unless required by law</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Our Right to Terminate</h3>
              <p className="text-gray-600 mb-6">
                We may terminate your access immediately if you violate these Terms, engage in fraudulent activity, 
                or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Disclaimers</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Our Services are provided "as is" without warranties of any kind</li>
                <li>We do not guarantee specific marketing results or ROI from our content</li>
                <li>Marketing trends and effectiveness can vary significantly</li>
                <li>You are responsible for compliance with advertising regulations in your jurisdiction</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Limitation of Liability</h3>
              <p className="text-gray-600 mb-6">
                In no event shall Apsics Media be liable for any indirect, incidental, special, or consequential damages, 
                including lost profits or revenue. Our total liability shall not exceed the amount you paid for our Services 
                in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-600 mb-6">
                You agree to indemnify and hold Apsics Media harmless from any claims, damages, or expenses arising 
                from your use of our Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy Policy</h2>
              <p className="text-gray-600 mb-6">
                Your privacy is important to us. Please review our <a href="/privacy" className="text-brand-600 hover:text-brand-700">Privacy Policy</a>, 
                which governs how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be governed by the laws of [Your State/Country]. Any disputes shall be resolved through:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Good faith negotiation first</li>
                <li>Binding arbitration if negotiation fails</li>
                <li>Small claims court for eligible disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 mb-6">
                We may modify these Terms at any time by posting updated Terms on our website. 
                Material changes will be communicated via email. Your continued use after changes 
                constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-600 mb-6">
                If any provision of these Terms is found to be unenforceable, the remaining provisions 
                shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms or our Services, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Apsics Media</strong><br />
                  Email: <a href="mailto:legal@apsicsmedia.com" className="text-brand-600 hover:text-brand-700">legal@apsicsmedia.com</a><br />
                  Website: <a href="https://apsicsmedia.com" className="text-brand-600 hover:text-brand-700">apsicsmedia.com</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}