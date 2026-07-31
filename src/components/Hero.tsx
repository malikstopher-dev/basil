import React from 'react';
import { Calendar, Utensils, MapPin } from 'lucide-react';
import { VENUE_INFO } from '../data/billiardsData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0a0a0a]">
      {/* Dark Editorial Background with Video + Emerald Radial Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/poster-lobby.jpg"
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 brightness-50 contrast-125 saturate-75"
        >
          <source src="/videos/hero-lobby.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#062c21]/50 via-transparent to-[#0a0a0a]" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Editorial Typography */}
        <div className="lg:col-span-7 space-y-8">
          {/* Subheader Badge with Editorial Divider */}
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
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-[480px]">
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

          {/* Stats Bar - Editorial Style */}
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

        {/* Right Column - Deep Forest Accent Card with Luxury Framing */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <div className="p-8 rounded-none bg-[#062c21]/90 border border-[#b29762]/30 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,_#b29762_0%,_transparent_70%)] opacity-20 pointer-events-none"></div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#b29762] font-bold block">
                Sandton's Finest
              </span>
              <h3 className="font-serif italic text-3xl text-white">
                Inside The Boma Café
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Paulshof, Sandton • Johannesburg
              </p>
            </div>

            <p className="text-xs text-white/70 leading-relaxed border-t border-white/10 pt-4">
              Step into an enclave designed for pool connoisseurs and culinary enthusiasts. Featuring custom mahogany trim, dry-aged South African Wagyu steaks, and signature smoke-infused Old Fashioneds.
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-white/80 font-mono">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b29762]" />
                <span>Paulshof, Sandton</span>
              </span>
              <span className="text-[#b29762]">Open Daily 12:00 – Late</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
