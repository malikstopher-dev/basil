import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, Menu, X, MapPin, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../data/billiardsData';
import { BasilLogo } from './BasilLogo';

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
    { name: 'Play 3D Table', href: '#playable-table' },
    { name: 'Billiards Tables', href: '#tables' },
    { name: 'Gourmet Dining', href: '#dining' },
    { name: 'Cocktails & Whisky', href: '#bar' },
    { name: 'VIP Club Tiers', href: '#vip-club' },
    { name: 'VIP Guestbook', href: '#guestbook' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Top Notification Bar */}
      <div className="bg-[#05251c]/95 text-xs text-gray-200 border-b border-[#b29762]/30 py-2 px-3 sm:px-6 w-full relative z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-y-1.5 gap-x-4 overflow-x-auto no-scrollbar py-0.5">
          {/* Left Group */}
          <div className="flex items-center space-x-2.5 sm:space-x-4 whitespace-nowrap shrink-0 text-[10.5px] sm:text-[11px]">
            <span className="flex items-center space-x-1.5 text-[#b29762] font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b29762] animate-pulse shrink-0"></span>
              <span>Open Tonight • Paulshof, Sandton</span>
            </span>

            <span className="text-white/20 font-light">|</span>

            <span className="flex items-center space-x-1.5 text-white/85">
              <MapPin className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
              <span>Inside The Boma Café</span>
            </span>

            <span className="text-white/20 font-light">|</span>

            <span className="flex items-center space-x-1.5 text-white/85">
              <Clock className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
              <span>12:00 PM – Late</span>
            </span>
          </div>

          {/* Right Group */}
          <div className="flex items-center space-x-2.5 sm:space-x-4 whitespace-nowrap shrink-0 text-[10.5px] sm:text-[11px]">
            <a
              href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 text-white/90 hover:text-[#b29762] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
              <span>Direct Line: {VENUE_INFO.phone}</span>
            </a>

            <span className="text-white/20 font-light">|</span>

            <span className="flex items-center space-x-1.5 text-[#b29762] font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
              <span>King of Pool Every Thursday</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Concept with 3D Twisting Animation */}
          <a href="#" className="flex items-center space-x-3 group [perspective:1000px]">
            {/* Custom Basil's Billiards Logo with 3D Y-Axis Twist Animation */}
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              whileHover={{
                rotateY: 180,
                scale: 1.15,
                transition: { duration: 0.6, type: 'spring' },
              }}
              className="[transform-style:preserve-3d] relative cursor-pointer"
            >
              <BasilLogo size={46} />
            </motion.div>
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

          {/* Desktop Navigation with 3D Depth Hover Transforms */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-semibold [perspective:800px]">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{
                  translateZ: 12,
                  rotateX: 10,
                  scale: 1.05,
                  color: '#b29762',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="text-white/80 transition-colors relative py-1 [transform-style:preserve-3d]"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Header Action CTAs with 3D Depth */}
          <div className="hidden sm:flex items-center space-x-3 [perspective:800px]">
            <motion.a
              href={`https://wa.me/${VENUE_INFO.whatsapp}?text=Hello%20Basil%27s%20Billiards%20BSS,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ translateZ: 10, rotateY: -8, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 350 }}
              className="px-4 py-2.5 gold-foil-outline-button text-[11px] font-bold uppercase tracking-widest transition-all [transform-style:preserve-3d]"
            >
              <span>WhatsApp</span>
            </motion.a>

            <motion.button
              onClick={onOpenBooking}
              whileHover={{ translateZ: 15, rotateY: 8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 350 }}
              className="px-6 py-2.5 gold-foil-button text-black text-[11px] font-bold uppercase tracking-widest transition-all shadow-md [transform-style:preserve-3d]"
            >
              Book Table
            </motion.button>
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
      </div>
    </header>
  );
};
