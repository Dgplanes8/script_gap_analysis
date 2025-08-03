'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutSection } from '@/components/layout/about-section';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { trackPageView } from '@/components/analytics';
import { useConsultation } from '@/components/contexts/consultation-context';

export default function AboutPage() {
  const { openModal: handleOpenConsultation } = useConsultation();
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  useEffect(() => {
    trackPageView('about');
  }, []);

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section for About Page */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About Monday Morning Marketer
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fortune 100 systematic methodology for subscription businesses ready to scale strategically and profitably.
              </p>
              <div className="bg-white/60 backdrop-blur rounded-xl p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">$100M+</div>
                    <div className="text-sm text-gray-600">Ad Spend Managed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">Fortune 100</div>
                    <div className="text-sm text-gray-600">Proven Methods</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section Content */}
        <AboutSection onOpenApplication={handleOpenConsultation} />

        {/* Strategic Consultation CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Transform Your Marketing Strategy?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Book a strategic consultation to explore how Fortune 100 methodology can accelerate your subscription business growth.
              </p>
              <button
                onClick={handleOpenConsultation}
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg"
              >
                Book Strategic Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </>
  );
}