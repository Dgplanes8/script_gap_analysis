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
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for Growth Leaders Who Can't Wait on Agencies
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Performance marketing expertise for subscription companies scaling beyond basic audiences. 48-hour creative delivery when agencies take weeks.
              </p>
              <div className="bg-white/60 backdrop-blur rounded-xl p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-teal-600">200+</div>
                    <div className="text-sm text-gray-600">Growth Leaders Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-navy-600">48 Hours</div>
                    <div className="text-sm text-gray-600">Creative Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section Content */}
        <AboutSection onOpenApplication={handleOpenConsultation} />

        {/* Strategic Consultation CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Stop Waiting Weeks for Creative Concepts
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Book a growth bottleneck assessment to see how 48-hour creative delivery can accelerate your subscription business growth.
              </p>
              <button
                onClick={handleOpenConsultation}
                className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg"
              >
                Book Growth Assessment
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