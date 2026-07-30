import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../data/billiardsData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About BSS', href: '#about' },
    { name: 'Billiards Tables', href: '#tables' },
    { name: 'Gourmet Dining', href: '#dining' },
    { name: 'Cocktails & Whisky', href: '#bar' },
    { name: 'Tournaments', href: '#events' },
    { name: 'VIP Club', href: '#vip-club' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#062c21]/90 text-xs text-gray-300 border-b border-white/10 py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2 text-[#b29762] font-semibold uppercase tracking-widest text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b29762] animate-pulse"></span>
              <span>Open Tonight • Paulshof, Sandton</span>
            </span>
            <span className="flex items-center space-x-1.5 text-white/70 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Inside The Boma Café</span>
            </span>
            <span className="flex items-center space-x-1.5 text-white/70 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#b29762]" />
              <span>12:00 PM – Late</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 text-white/80 hover:text-[#b29762] transition-colors font-medium text-[11px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Direct Line: {VENUE_INFO.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="flex items-center space-x-1.5 text-[#b29762] font-medium text-[11px] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#b29762]" />
              <span>King of Pool Every Thursday</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 md:top-8 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0a0a0a] to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Concept */}
          <a href="#" className="flex items-center space-x-4 group">
            {/* Monogram Emblem */}
            <div className="w-12 h-12 border border-[#b29762] bg-[#0a0a0a] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-serif italic text-xl text-[#b29762] tracking-tighter font-semibold">
                BSS
              </span>
            </div>
            <div className="h-7 w-px bg-white/20 hidden sm:block"></div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium leading-tight text-white/90">
                Basil's Billiards
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#b29762] font-semibold leading-tight">
                Supplier & Lounge
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-[#b29762] transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${VENUE_INFO.whatsapp}?text=Hello%20Basil%27s%20Billiards%20BSS,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-[#b29762] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-md"
            >
              Book Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 bg-[#b29762] text-black font-bold text-xs uppercase tracking-wider"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/20 text-white hover:text-[#b29762]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0f0c] border-b border-emerald-900/60 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#101713] text-gray-200 font-medium hover:bg-emerald-950/60 hover:text-amber-400 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-900/40 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table Now</span>
              </button>

              <a
                href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 rounded-lg bg-[#121c17] text-gray-300 text-center font-medium text-xs flex items-center justify-center space-x-2 border border-emerald-800/40"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Us: {VENUE_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
