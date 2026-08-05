import React, { useState } from 'react';
import { CircleDot, Skull, Volleyball, Gamepad2 } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: CircleDot,
      title: "Pool Tables",
      subtitle: "Tournament Slate & Championship Cloth",
      description: "9ft and 8ft tournament-slate pool tables with Hainsworth Match wool cloth, Aramith Pro tournament balls, and shadowless LED canopy lighting for serious games and friendly rounds alike.",
      tag: "14 Tables",
      bgImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000",
      points: ["8-Ball & 9-Ball Rules", "Handcrafted Ash Cues", "Perimeter Service Rails"]
    },
    {
      icon: Skull,
      title: "Snooker Tables",
      subtitle: "Full-Size 10ft Executive Snooker",
      description: "Reserved 10ft snooker tables with 60mm slate and precision cloth. Step into a classic green-felt duel backed by refined lounge seating and dedicated table service.",
      tag: "Championship",
      bgImage: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1000",
      points: ["Full-Size 10ft Field", "Dedicated Snooker Cues", "Private Lounge Options"]
    },
    {
      icon: Volleyball,
      title: "Soccer Tables",
      subtitle: "High-Speed Foosball Action",
      description: "Tournament-grade foosball / table soccer setups for fast, social competition. Ring-framed bars, weighted players, and smooth bearings for lightning-fast rallies.",
      tag: "Social Play",
      bgImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000",
      points: ["Tournament-Grade Tables", "1v1 & 2v2 Matches", "Bar-Side Positioning"]
    },
    {
      icon: Gamepad2,
      title: "Arcade Games",
      subtitle: "Classic Cabinets & Modern Classics",
      description: "A retro arcade corner of classic cabinets and modern classics — perfect to keep the games flowing between table breaks, for kids' parties and after-hours fun.",
      tag: "Retro Fun",
      bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000",
      points: ["Classic Cabinets", "Family Friendly", "Open Till Late"]
    }
  ];

  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Our Services
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Games For <span className="italic text-[#b29762]">Every Player</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            From championship pool and snooker to fast-paced soccer tables and classic arcade action — there&apos;s a table waiting for you at BSS.
          </p>
        </div>

        {/* Interactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isActive = activeService === idx;
            return (
              <Card3DTilt key={idx} maxRotation={10}>
                <div
                  onClick={() => setActiveService(idx)}
                  className="group relative p-8 bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-colors duration-300 shadow-2xl overflow-hidden h-full flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Background Picture with Subtle Luxury Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={service.bgImage}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 filter brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#121212]/80 to-[#121212]/90" />
                  </div>

                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#b29762] opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 border transition-colors ${isActive ? 'bg-[#b29762] text-black' : 'border-[#b29762] text-[#b29762]'} group-hover:bg-[#b29762] group-hover:text-black bg-black/40 backdrop-blur-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className={`px-3 py-1 border ${isActive ? 'border-[#b29762] text-[#b29762]' : 'border-white/20'} bg-black/50 backdrop-blur-sm text-[9px] font-bold text-[#b29762] uppercase tracking-widest`}>
                        {service.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif italic text-2xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#b29762] text-xs font-semibold uppercase tracking-wider">
                        {service.subtitle}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed pt-2">
                        {service.description}
                      </p>
                    </div>

                    <ul className="mt-6 pt-6 border-t border-white/10 space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-white/70 text-xs font-medium tracking-wide">
                          <span className="w-1.5 h-1.5 bg-[#b29762] rotate-45"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};