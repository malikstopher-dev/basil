import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Calendar, Volume2, VolumeX, ChevronDown, Crown, Sparkles, Trophy, ShieldCheck } from 'lucide-react';
import { BasilLogo } from './BasilLogo';

import heroLobbyVideo from '../../site assets/videos/hero-lobby.mp4';
import heroAmbientVideo from '../../site assets/videos/hero-ambient.mp4';
import heroTablesVideo from '../../site assets/videos/hero-tables.mp4';
import heroExteriorVideo from '../../site assets/videos/hero-exterior.mp4';
import posterLobby from '../../site assets/images/poster-lobby.jpg';
import posterTables from '../../site assets/images/poster-tables.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement[]>([]);

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    if (el) videoRef.current[index] = el;
  };

  // Scroll Parallax Hooks
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Layer Transforms (Multi-layered parallax speeds & depth-of-field blur intensity)
  const layer1Y = useTransform(smoothScrollY, [0, 800], [0, 220]);   // Far background particles
  const layer2Y = useTransform(smoothScrollY, [0, 800], [0, 140]);   // Floating 3D Billiard balls left/right
  const layer3Y = useTransform(smoothScrollY, [0, 800], [0, -60]);   // Core center logo & hero text
  const layer4Y = useTransform(smoothScrollY, [0, 800], [0, -180]);  // Foreground floating 3D Cue Stick
  const logoRotateY = useTransform(smoothScrollY, [0, 800], [0, 180]); // 3D rotational twist on scroll

  // Scroll-Triggered Depth of Field & Intensity Filters
  const videoFilter = useTransform(
    smoothScrollY,
    [0, 600],
    ['brightness(75%) contrast(110%) scale(105%) blur(0px)', 'brightness(35%) contrast(125%) scale(115%) blur(16px)']
  );
  const ballsBlur = useTransform(
    smoothScrollY,
    [0, 500],
    ['blur(0px)', 'blur(12px)']
  );
  const ballsOpacity = useTransform(
    smoothScrollY,
    [0, 500],
    [1, 0.35]
  );
  const cueBlur = useTransform(
    smoothScrollY,
    [0, 500],
    ['blur(0px)', 'blur(14px)']
  );
  const darkOverlayOpacity = useTransform(
    smoothScrollY,
    [0, 600],
    [0.4, 0.85]
  );

  const toggleMute = () => {
    videoRef.current.forEach((video) => {
      if (video) video.muted = isMuted;
    });
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a] select-none [perspective:1200px]">
      {/* --- LAYER 0: Full-Bleed Video Background with Dynamic Depth-of-Field Blur --- */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Hero Video (md+) - Lobby primary, Ambient fallback */}
        <motion.video
          ref={setVideoRef(0)}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          disablePictureInPicture
          preload="auto"
          poster={posterLobby}
          style={{ filter: videoFilter }}
          className="w-full h-full object-cover scale-105 hidden md:block"
        >
          <source src={heroLobbyVideo} type="video/mp4" />
          <source src={heroAmbientVideo} type="video/mp4" />
        </motion.video>

        {/* Mobile Hero Video (<md) - Tables primary, Exterior fallback */}
        <motion.video
          ref={setVideoRef(1)}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          disablePictureInPicture
          preload="auto"
          poster={posterTables}
          style={{ filter: videoFilter }}
          className="w-full h-full object-cover scale-105 md:hidden"
        >
          <source src={heroTablesVideo} type="video/mp4" />
          <source src={heroExteriorVideo} type="video/mp4" />
        </motion.video>

        {/* Multi-layered luxury gradient overlays & scroll-triggered darkening intensity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-[#0a0a0a]/80 pointer-events-none" />
        <motion.div
          style={{ opacity: darkOverlayOpacity }}
          className="absolute inset-0 bg-[#0a0a0a] pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(10,10,10,0.85)_100%)] pointer-events-none" />
      </div>

      {/* --- LAYER 1: Deep Parallax Ambient Gold Glow & Dust Orbs --- */}
      <motion.div
        style={{ y: layer1Y }}
        className="absolute inset-0 z-1 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] bg-[#b29762]/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* --- LAYER 2: Floating 3D Billiard Balls Parallax with Scroll Blur --- */}
      <motion.div
        style={{ y: layer2Y, filter: ballsBlur, opacity: ballsOpacity }}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      >
        {/* Floating 8-Ball Top-Right */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
            rotateY: { duration: 16, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-28 right-[12%] w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 via-neutral-900 to-black shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.1)] border border-white/20 flex items-center justify-center [transform-style:preserve-3d]"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="font-bold text-black text-sm">8</span>
          </div>
        </motion.div>

        {/* Floating 9-Ball Bottom-Left */}
        <motion.div
          animate={{
            y: [12, -14, 12],
            rotate: [0, -360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            rotateY: { duration: 14, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute bottom-36 left-[8%] w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-600 to-yellow-900 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(178,151,98,0.4)] border border-yellow-200/40 flex items-center justify-center [transform-style:preserve-3d]"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="font-bold text-black text-xs">9</span>
          </div>
        </motion.div>

        {/* Floating Cyan 10-Ball Mid-Right */}
        <motion.div
          animate={{
            y: [-14, 10, -14],
            rotate: [0, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
            rotateY: { duration: 12, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-1/2 right-[6%] w-18 h-18 rounded-full bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-950 shadow-[0_12px_30px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.4)] border border-cyan-200/40 flex items-center justify-center [transform-style:preserve-3d]"
        >
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="font-bold text-black text-[10px]">10</span>
          </div>
        </motion.div>
      </motion.div>

      {/* --- LAYER 3: Core Centerpiece Logo & Hero Content (Scroll Controlled) --- */}
      <div className="pt-24 relative z-20" />

      <motion.div
        style={{ y: layer3Y }}
        className="relative z-20 text-center flex-1 flex flex-col items-center justify-center px-4 space-y-6"
      >
        {/* Animated Custom Logo Emblem */}
        <motion.div
          animate={{
            rotateY: [-8, 8, -8],
            scale: [1, 1.04, 1],
          }}
          transition={{
            rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ rotateY: logoRotateY }}
          whileHover={{ scale: 1.12, rotateY: 180 }}
          className="relative group cursor-pointer [transform-style:preserve-3d]"
        >
          {/* Gold Halo Glow Effect */}
          <div className="absolute inset-0 bg-[#b29762]/20 rounded-full blur-2xl group-hover:bg-[#b29762]/40 transition-all duration-500" />

          {/* Render Custom Logo with Rotating Circle & 3 Balls */}
          <div className="relative z-10 p-3 bg-black/60 backdrop-blur-md border border-[#b29762]/50 shadow-[0_0_40px_rgba(178,151,98,0.3)]">
            <BasilLogo size={150} rotateBalls={true} />
          </div>
        </motion.div>

        {/* Top Editorial Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-5 py-2 bg-black/60 backdrop-blur-md border border-[#b29762]/40 text-[#b29762] text-[10px] font-bold uppercase tracking-[0.45em] flex items-center space-x-2.5 shadow-xl"
        >
          <Crown className="w-3.5 h-3.5 text-[#b29762]" />
          <span>Basil's Billiards Supplier • Sandton Lounge</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3 max-w-4xl"
        >
          <h1 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight gold-foil-header">
            Precision Slate. <span className="italic text-[#b29762] font-normal">Unrivaled Luxury.</span>
          </h1>

          <p className="text-white/70 text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
            Home to South Africa's finest championship 8-ball tables, flame-grilled gastronomy, and rare single malts in an exclusive private atmosphere.
          </p>
        </motion.div>
      </motion.div>

      {/* --- LAYER 4: Foreground 3D Floating Cue Stick with Scroll Depth Blur --- */}
      <motion.div
        style={{ y: layer4Y, filter: cueBlur }}
        className="absolute top-1/3 -left-16 z-30 pointer-events-none hidden lg:block opacity-60 hover:opacity-100 transition-opacity"
      >
        <div className="w-[500px] h-[6px] bg-gradient-to-r from-transparent via-[#b29762] to-[#3a2818] rounded-full transform -rotate-45 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(178,151,98,0.6)]" />
      </motion.div>

      {/* --- Bottom Controls & CTA Section --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Video Audio Control */}
        <button
          onClick={toggleMute}
          type="button"
          className="px-4 py-2.5 bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#b29762] text-white/80 hover:text-white text-[10px] font-mono uppercase tracking-widest flex items-center space-x-2.5 transition-all shadow-xl"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-white/40" />
              <span>Lounge Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#b29762] animate-pulse" />
              <span className="text-[#b29762] font-bold">Lounge Audio Playing</span>
            </>
          )}
        </button>

        {/* Center: Scroll Down Indicator */}
        <a
          href="#playable-table"
          className="flex flex-col items-center text-white/60 hover:text-[#b29762] transition-colors group text-[9px] uppercase tracking-[0.3em] font-medium"
        >
          <span className="mb-1">Scroll to Experience</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#b29762]" />
        </a>

        {/* Right: Quick Reserve Table Button */}
        <button
          onClick={onOpenBooking}
          type="button"
          className="px-8 py-3.5 gold-foil-button text-black font-bold text-[11px] uppercase tracking-widest transition-all shadow-2xl flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4 fill-black" />
          <span>Reserve Table</span>
        </button>
      </div>
    </section>
  );
};
