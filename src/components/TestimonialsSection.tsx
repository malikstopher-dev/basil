import React from 'react';
import { TESTIMONIALS } from '../data/billiardsData';
import { Star, Quote, Award, Sparkles, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Patron Endorsements
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Loved by Sandton's <span className="italic text-[#b29762]">Elite</span>
          </h2>

          <div className="flex items-center justify-center space-x-2 text-[#b29762] pt-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#b29762] text-[#b29762]" />
              ))}
            </div>
            <span className="text-white font-bold text-sm ml-2">4.9 ★ Rating</span>
            <span className="text-white/40 text-xs">(140+ Google Reviews)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 relative flex flex-col justify-between shadow-xl"
            >
              <Quote className="w-10 h-10 text-white/5 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex space-x-1 text-[#b29762]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#b29762] text-[#b29762]" />
                  ))}
                </div>

                <p className="text-white/80 text-sm leading-relaxed font-serif italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 object-cover border border-[#b29762]"
                />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">{t.name}</h4>
                  <p className="text-[#b29762] text-xs">{t.role}</p>
                  {t.company && (
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">{t.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
