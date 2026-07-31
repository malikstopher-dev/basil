import React, { useState } from 'react';
import { FAQS } from '../data/billiardsData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Essential Guest Information
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Frequently Asked <span className="italic text-[#b29762]">Questions</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base">
            Everything you need to know before visiting Sandton's premier billiards & dining lounge.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#121212] border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between space-x-4 hover:bg-white/5 transition-colors"
              >
                <span className="font-serif italic text-base sm:text-lg font-normal text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#b29762] shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 text-white/70 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4 duration-200" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
