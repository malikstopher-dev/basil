import React from 'react';
import { ShieldCheck, Target, GlassWater, Tv, Users, Flame, Crown, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: "Championship Precision",
      subtitle: "50mm Italian Slate & Shadowless LED Lighting",
      description: "Designed for serious players and casual enthusiasts alike. Every table is laser-leveled with Hainsworth Match wool cloth and Aramith Pro tournament balls.",
      tag: "Tournament Standard",
      bgImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Flame,
      title: "Restaurant-Quality Gastronomy",
      subtitle: "35-Day Dry-Aged Beef & Wood-Fired Pizza",
      description: "We don't do microwave pub food. Our executive kitchen serves gourmet Wagyu burgers, flame-grilled Tomahawk steaks, artisan platters, and decadent desserts.",
      tag: "Culinary Excellence",
      bgImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: GlassWater,
      title: "Master Mixology & Whisky Bar",
      subtitle: "85+ Rare Single Malts & Smoked Cocktails",
      description: "Sip hand-carved ice sphere cocktails, rare Scottish & South African single malts, Stellenbosch Cabernet blends, and crisp craft beers brewed locally.",
      tag: "High-End Spirits",
      bgImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Crown,
      title: "Exclusive Lounge Atmosphere",
      subtitle: "Chesterfield Leather & Private VIP Suites",
      description: "Relax in plush velvet and leather seating, enjoy live 4K sport broadcasts, attend weekly tournaments, or host private corporate celebrations in style.",
      tag: "Modern Luxury",
      bgImage: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Unrivalled Hospitality
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Why Sandton Chooses <span className="italic text-[#b29762]">BSS</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Outperforming traditional pool halls with precision, distinction, and a 5-star atmosphere inside The Boma Café.
          </p>
        </div>

        {/* 4 Pillars Grid with 3D Card Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxRotation={12}>
                <div
                  className="group relative p-8 bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 shadow-2xl overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Card Background Picture with Subtle Luxury Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 filter brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#121212]/80 to-[#121212]/90" />
                  </div>

                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#b29762] opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 border border-[#b29762] text-[#b29762] group-hover:bg-[#b29762] group-hover:text-black transition-colors bg-black/40 backdrop-blur-sm">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="px-3 py-1 border border-white/20 bg-black/50 backdrop-blur-sm text-[9px] font-bold text-[#b29762] uppercase tracking-widest">
                        {item.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif italic text-2xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[#b29762] text-xs font-semibold uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed pt-2">
                        {item.description}
                      </p>
                    </div>
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
