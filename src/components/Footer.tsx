import React, { useState, useEffect } from 'react';
import { VENUE_INFO } from '../data/billiardsData';
import { Phone, MapPin, Mail, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [sastTime, setSastTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Johannesburg',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSastTime(new Intl.DateTimeFormat('en-ZA', options).format(now) + ' SAST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seoKeywords = [
    'Billiards Sandton',
    'Pool Tables Johannesburg',
    'Billiards Lounge Johannesburg',
    'Premium Pool Hall Sandton',
    'Pool and Restaurant Johannesburg',
    'Cocktail Bar Sandton',
    'Sports Lounge Johannesburg',
    'Corporate Team Building Sandton'
  ];

  return (
    <footer className="bg-[#121212] text-gray-400 text-xs border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          <div className="flex flex-col space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold">The Cuisine</span>
            <p className="text-[14px] font-serif italic text-white/80 leading-tight">Artisanal Wagyu Burgers & Aged Steaks</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold">The Bar</span>
            <p className="text-[14px] font-serif italic text-white/80 leading-tight">Curated Cocktails & Vintage Malts</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold">The Game</span>
            <p className="text-[14px] font-serif italic text-white/80 leading-tight">Professional Grade Tournament Slate</p>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-[#b29762] bg-[#0a0a0a] flex items-center justify-center">
                <span className="font-serif italic text-base text-[#b29762] font-bold">BSS</span>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white">BASIL'S BILLIARDS</h3>
                <span className="text-[9px] tracking-[0.3em] text-[#b29762] uppercase block font-medium">SUPPLIER & LOUNGE</span>
              </div>
            </div>

            <p className="text-white/60 leading-relaxed text-xs">
              Sandton's premier luxury billiards venue inside <strong>The Boma Café, Paulshof</strong>. Tournament slate tables, dry-aged steaks, craft cocktails, and executive hospitality.
            </p>

            <div className="flex items-center space-x-2 text-[#b29762] font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Johannesburg Time: {sastTime || '11:00 SAST'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b29762]">
              Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#tables" className="hover:text-[#b29762] transition-colors text-white/70">Championship Slate Tables</a></li>
              <li><a href="#dining" className="hover:text-[#b29762] transition-colors text-white/70">Gourmet Steakhouse & Pizza</a></li>
              <li><a href="#bar" className="hover:text-[#b29762] transition-colors text-white/70">Rare Whiskies & Cocktails</a></li>
              <li><a href="#events" className="hover:text-[#b29762] transition-colors text-white/70">King of Pool Tournaments</a></li>
              <li><a href="#gallery" className="hover:text-[#b29762] transition-colors text-white/70">Venue Gallery</a></li>
            </ul>
          </div>

          {/* Location & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b29762]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#b29762] shrink-0 mt-0.5" />
                <span>Inside The Boma Café, Paulshof, Sandton, Johannesburg, SA</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#b29762] shrink-0" />
                <a href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`} className="text-white hover:text-[#b29762] font-medium">
                  {VENUE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#b29762] shrink-0" />
                <span>reservations@basilsbilliards.co.za</span>
              </p>
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="space-y-3 p-5 bg-[#0a0a0a] border border-[#b29762]/30">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b29762]">
              Reserve Your Table
            </h4>
            <p className="text-white/60 text-xs">
              Secure your preferred pool table or VIP lounge suite ahead of time.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-md"
            >
              Book Table Online
            </button>
          </div>
        </div>

        {/* SEO Keywords Pills (Natural Integration) */}
        <div className="pt-8 border-t border-white/10 space-y-3">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#b29762] block text-center">
            Premier Sandton Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
            {seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#0a0a0a] border border-white/10 text-white/60 text-[10px] uppercase tracking-wider"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[11px]">
          <p>© {new Date().getFullYear()} Basil's Billiards Supplier (BSS). All Rights Reserved. Inside The Boma Café, Sandton.</p>

          <button
            onClick={scrollToTop}
            className="p-2 border border-white/20 hover:border-[#b29762] text-white/60 hover:text-[#b29762] transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
