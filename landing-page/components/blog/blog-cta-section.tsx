'use client';

import { Mail, Calendar } from 'lucide-react';
import { PopupFormModal } from '@/components/forms/popup-form-modal';
import { usePopupForm } from '@/hooks/use-popup-form';

interface BlogCTASectionProps {
  title?: string;
  description?: string;
}

export function BlogCTASection({ 
  title = "Get More Creative Intelligence", 
  description = "Join growth teams getting weekly creative concepts and trend analysis delivered every Monday." 
}: BlogCTASectionProps) {
  const { isPopupOpen, openPopup, closePopup } = usePopupForm();

  return (
    <>
      <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={openPopup}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            Get 10 Free Hooks
          </button>
          
          <button 
            onClick={openPopup}
            className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center justify-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Strategy Call
          </button>
        </div>
      </div>

      <PopupFormModal 
        isOpen={isPopupOpen}
        onClose={closePopup}
        title="Get 10 Free High-Converting Hooks"
        subtitle="Plus weekly creative intelligence delivered every Monday"
        source="blog-cta"
      />
    </>
  );
}