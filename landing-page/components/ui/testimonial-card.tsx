import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 h-full">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-6 italic">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-brand-600 font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-gray-600 text-sm">{role}</div>
        </div>
      </div>
    </div>
  );
}