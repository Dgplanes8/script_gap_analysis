import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Apsics Media',
  description: 'How Apsics Media collects, uses, and protects your personal information.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-6">
                At Apsics Media ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                or use our services.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Information You Provide</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Email Address:</strong> When you subscribe to our newsletter or download resources</li>
                <li><strong>Contact Information:</strong> Name, email, company details when you book consultations</li>
                <li><strong>Business Information:</strong> Company size, ad spend, marketing challenges in forms</li>
                <li><strong>Communication Data:</strong> Messages you send us through contact forms or email</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Usage Data:</strong> Pages viewed, time spent, clicks, and navigation patterns</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong>IP Address:</strong> For security and analytics purposes</li>
                <li><strong>Cookies:</strong> To enhance user experience and track website performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Provide our weekly trend intelligence services and resources</li>
                <li>Send you our newsletter and marketing communications (with consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze website usage to improve our services</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Prevent fraud and ensure website security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">We do not sell, trade, or rent your personal information. We may share information only in these circumstances:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Service Providers:</strong> Third parties who help us operate our business (email services, analytics, hosting)</li>
                <li><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with merger, acquisition, or sale of assets</li>
                <li><strong>Your Consent:</strong> When you explicitly agree to share your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
              <p className="text-gray-600 mb-6">
                You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-6">
                We implement appropriate security measures to protect your information against unauthorized access, alteration, 
                disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain processing activities</li>
              </ul>
              <p className="text-gray-600 mb-6">
                To exercise these rights, contact us at <a href="mailto:privacy@apsicsmedia.com" className="text-orange-600 hover:text-orange-700">privacy@apsicsmedia.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-600 mb-6">
                We retain your information only as long as necessary to provide our services, comply with legal obligations, 
                or resolve disputes. Marketing data is typically retained until you unsubscribe or request deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Transfers</h2>
              <p className="text-gray-600 mb-6">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information during such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 mb-6">
                Our services are not intended for individuals under 18 years of age. 
                We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 mb-6">
                We may update this Privacy Policy periodically. We will notify you of significant changes by email 
                or through a prominent notice on our website. Your continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Apsics Media</strong><br />
                  Email: <a href="mailto:privacy@apsicsmedia.com" className="text-orange-600 hover:text-orange-700">privacy@apsicsmedia.com</a><br />
                  Website: <a href="https://apsicsmedia.com" className="text-orange-600 hover:text-orange-700">apsicsmedia.com</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}