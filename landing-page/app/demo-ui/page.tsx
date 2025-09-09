'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ConsultationProvider } from '@/components/contexts/consultation-context';

export default function DemoUIPage() {
  return (
    <ConsultationProvider>
      <div data-theme="fullfan">
        <Header />
        <main className="min-h-screen pt-16 lg:pt-20">
          {/* Hero Section with DaisyUI */}
          <section className="hero bg-gradient-to-br from-base-100 to-base-200 py-20">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold text-primary">DaisyUI Fullfan Theme</h1>
                <p className="py-6 text-base-content">
                  Demonstrating the fullfan theme with DaisyUI components and custom color scheme.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-base-content">Component Showcase</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Primary Card */}
                <div className="card bg-primary text-primary-content">
                  <div className="card-body">
                    <h3 className="card-title">Primary Theme</h3>
                    <p>This card uses the primary color from our fullfan theme.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-outline btn-primary-content">Learn More</button>
                    </div>
                  </div>
                </div>

                {/* Secondary Card */}
                <div className="card bg-secondary text-secondary-content">
                  <div className="card-body">
                    <h3 className="card-title">Secondary Theme</h3>
                    <p>This card showcases the secondary color palette.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-outline btn-secondary-content">Explore</button>
                    </div>
                  </div>
                </div>

                {/* Accent Card */}
                <div className="card bg-accent text-accent-content">
                  <div className="card-body">
                    <h3 className="card-title">Accent Theme</h3>
                    <p>Highlighting content with the accent color scheme.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-outline btn-accent-content">Discover</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Variants */}
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-6 text-base-content">Button Variations</h3>
                <div className="space-x-4 space-y-2">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-accent">Accent</button>
                  <button className="btn btn-neutral">Neutral</button>
                  <button className="btn btn-info">Info</button>
                  <button className="btn btn-success">Success</button>
                  <button className="btn btn-warning">Warning</button>
                  <button className="btn btn-error">Error</button>
                </div>
              </div>

              {/* Alert Examples */}
              <div className="space-y-4 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-base-content">Alert Components</h3>
                <div role="alert" className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Info alert using the fullfan theme info color.</span>
                </div>
                
                <div role="alert" className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Success alert with fullfan success colors.</span>
                </div>
                
                <div role="alert" className="alert alert-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>Warning alert with custom theme colors.</span>
                </div>
                
                <div role="alert" className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Error alert using fullfan error theme.</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="stats shadow bg-base-200 mb-12 w-full">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title text-base-content">Downloads</div>
                  <div className="stat-value text-primary">31K</div>
                  <div className="stat-desc text-base-content">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <div className="stat-title text-base-content">New Users</div>
                  <div className="stat-value text-secondary">4,200</div>
                  <div className="stat-desc text-base-content">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div className="stat-title text-base-content">New Registers</div>
                  <div className="stat-value text-accent">1,200</div>
                  <div className="stat-desc text-base-content">↘︎ 90 (14%)</div>
                </div>
              </div>

              {/* Form Example */}
              <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
                <div className="card-body">
                  <h3 className="card-title text-base-content">Contact Form</h3>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Your name" className="input input-bordered input-primary w-full" />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="your@email.com" className="input input-bordered input-secondary w-full" />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea className="textarea textarea-bordered textarea-accent" placeholder="Your message"></textarea>
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary">Send Message</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ConsultationProvider>
  );
}