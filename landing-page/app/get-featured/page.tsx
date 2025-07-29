import { Metadata } from 'next';
import { AirtableForm } from '@/components/forms/airtable-form';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export const metadata: Metadata = {
  title: 'Get Featured - Monday Morning Marketer Success Stories',
  description:
    'Share your success story with Monday Morning Marketer and get featured in our case studies. Help other fitness and sports apps learn from your results.',
};

export default function GetFeaturedPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Share Your Success Story
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Did Monday Morning Marketer help improve your fitness/sports app's ad performance? 
              We'd love to feature your results and help other apps learn from your success.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Get featured in our case studies
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Help other apps with similar challenges
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Potential co-marketing opportunities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We're Looking For
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We feature success stories that showcase measurable improvements and can help other fitness/sports apps succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
              <p className="text-gray-600">
                Improved CTR, TSR, conversion rates, or other key metrics that demonstrate clear success.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Specific Challenges</h3>
              <p className="text-gray-600">
                Clear pain points that other fitness/sports apps can relate to and learn from.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Unique Insights</h3>
              <p className="text-gray-600">
                Interesting strategies, creative approaches, or unexpected discoveries worth sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AirtableForm
              title="Tell Us Your Story"
              description="Fill out the form below to share your experience and results. We'll review all submissions and reach out within 24 hours if your story is a good fit."
            />
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Not Ready to Share Your Story Yet?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Monday Morning Ideas for weekly hooks, creative teardowns, and mini test ideas 
              that could become your next success story.
            </p>
            <EmailCaptureForm
              placeholder="Enter your email for weekly marketing insights"
              buttonText="Subscribe to Monday Morning Ideas"
              variant="cta"
              source="get-featured-page"
            />
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Happens Next?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Submit Form</h3>
              <p className="text-sm text-gray-600">
                Complete the application with your story details
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Review Process</h3>
              <p className="text-sm text-gray-600">
                We evaluate your submission within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Interview Call</h3>
              <p className="text-sm text-gray-600">
                If selected, we schedule a brief interview call
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Case Study</h3>
              <p className="text-sm text-gray-600">
                We create and publish your success story
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Questions about the process?
            </p>
            <a 
              href="mailto:mondaymorningmarketer@gmail.com" 
              className="text-gray-900 font-semibold hover:underline"
            >
              Contact us at mondaymorningmarketer@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}