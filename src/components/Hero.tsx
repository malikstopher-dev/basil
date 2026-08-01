import React from 'react';
import { Calendar, Utensils } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/poster-lobby.jpg"
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-lobby.mp4" type="video/mp4" />
        </video>
        {/* Dark scrim for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Hero Content — Full Width, Centered Vertically */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-2xl space-y-8">
          {/* Subheader Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Est. 2024 • Sandton's Premier Billiards
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[0.92] tracking-tight text-white">
            Where Every <br className="hidden sm:inline" />
            <span className="italic text-[#b29762]">Shot</span> Becomes <br />
            An Experience.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-[520px]">
            A masterclass in modern luxury. Basil's Billiards Supplier (BSS) combines professional tournament-grade slate billiards with an executive steakhouse dining & rare whisky lounge experience inside <strong className="text-white font-normal">The Boma Café, Paulshof, Sandton</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 bg-[#b29762] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book A Table</span>
            </button>

            <a
              href="#dining"
              className="px-8 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <Utensils className="w-4 h-4 text-[#b29762]" />
              <span>Explore Menu</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg">
            <div className="flex flex-col">
              <span className="text-[28px] sm:text-[36px] font-serif italic text-white leading-none mb-1">14</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Custom Slate Tables</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[28px] sm:text-[36px] font-serif italic text-white leading-none mb-1">50+</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Rare Whiskies</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[28px] sm:text-[36px] font-serif italic text-[#b29762] leading-none mb-1">01</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Elite Venue</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
