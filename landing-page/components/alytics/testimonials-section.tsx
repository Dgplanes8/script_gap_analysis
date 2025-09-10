'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Founder",
      company: "TechFlow",
      content: "We used these content templates to spot trending opportunities immediately. After implementing their strategies, our organic reach jumped by 340% in just 6 weeks.",
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "Marcus Rodriguez", 
      title: "CEO",
      company: "GrowthLab",
      content: "I've tried nearly every content service out there, and this intelligence is by far the most actionable. Our team was creating viral content independently in days.",
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "Elena Park",
      title: "Head of Growth", 
      company: "StartupCo",
      content: "It's like content intelligence finally caught up with startup needs. We use these insights not just for ads—but for our entire brand story and product launches.",
      avatar: "/api/placeholder/48/48"
    }
  ];

  const companyLogos = [
    "Startup Logo 1",
    "Startup Logo 2", 
    "Startup Logo 3",
    "Startup Logo 4",
    "Startup Logo 5",
    "Startup Logo 6"
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Testimonials
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            Hear What{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              Others Say About Us
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what startup teams say after switching to intelligent content creation and trending analysis.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
              }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-blue-600" />
              </div>

              {/* Profile */}
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mr-4 flex items-center justify-center border-2 border-dashed border-blue-300">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 italic group-hover:text-gray-800 transition-colors">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Asset Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-4">
                <span className="text-xs text-blue-800">[ASSET PLACEHOLDER: Real client photo]</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8">Trusted by startup teams at</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                className="w-32 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm text-gray-500 font-medium">[{logo}]</span>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong className="text-blue-900">[ASSET PLACEHOLDER]:</strong> Actual startup client logos and authentic testimonials with photos
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}