import React from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { VENUE_INFO } from '../data/billiardsData';

interface AboutProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Editorial Visual Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 border border-[#b29762]/30 bg-[#121212] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1200"
                alt="Basil's Billiards Supplier Lounge Area"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0a0a0a]/95 border border-[#b29762]/40 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="p-2 border border-[#b29762] text-[#b29762]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic text-base">Inside The Boma Café</h4>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">Paulshof, Sandton • Johannesburg, SA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 -z-0 hidden sm:block" />
          </div>

          {/* Right Column - Brand Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-[#b29762]"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                The BSS Distinction
              </span>
            </div>

            <h2 className="font-serif font-light text-3xl sm:text-5xl text-white leading-tight">
              A New Era of <br />
              <span className="italic text-[#b29762]">Executive Billiards</span> & Gastronomy
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              <strong className="text-white font-normal">Basil's Billiards Supplier (BSS)</strong> was conceived to redefine the South African pool venue. We replaced traditional arcade halls with an intimate, luxury lounge where tournament precision, culinary arts, and high-end mixology coexist.
            </p>

            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Nestled inside <strong className="text-white font-normal">The Boma Café</strong> in Paulshof, Sandton, BSS offers a sanctuary for both seasoned tournament players and discerning groups seeking an unforgettable night out. Every detail—from our Hainsworth Match cloth to our 35-day dry-aged steaks—is curated for perfection.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#b29762] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Tournament-Grade Slate</h4>
                  <p className="text-white/50 text-xs">Italian & Brazilian precision slate tables.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#b29762] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Gourmet Steak & Wings</h4>
                  <p className="text-white/50 text-xs">Full restaurant menu cooked to order.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#b29762] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Curated Whiskies & Gin</h4>
                  <p className="text-white/50 text-xs">85+ single malts, craft drafts, and fine wines.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#b29762] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Executive VIP Suites</h4>
                  <p className="text-white/50 text-xs">Private hosting, dedicated host, OLED screens.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#b29762] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-md"
              >
                Reserve Your Experience
              </button>

              <a
                href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#b29762]" />
                <span>Call {VENUE_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
