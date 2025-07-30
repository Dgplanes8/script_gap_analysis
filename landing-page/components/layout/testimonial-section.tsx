import { TestimonialCard } from '@/components/ui/testimonial-card';

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Monday Morning Marketer completely transformed our approach to customer acquisition. In just 4 months, we increased our MRR by 240% and reduced our CAC by 35%.",
      author: 'Sarah Chen',
      role: 'CEO, TechFlow Solutions',
      rating: 5,
    },
    {
      quote:
        "The strategic insights and execution were flawless. Our conversion rates improved by 89% and we finally have a predictable revenue engine.",
      author: 'Marcus Johnson',
      role: 'Founder, EcoLife Products', 
      rating: 5,
    },
    {
      quote:
        "Working with Monday Morning Marketer was the best investment we made this year. They helped us scale from $500K to $2M ARR in just 8 months.",
      author: 'Lisa Rodriguez',
      role: 'CMO, FinanceFirst',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our clients have to say about their transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}