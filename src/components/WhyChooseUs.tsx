import React from 'react';
import { Target, GlassWater, Tv, Flame, Crown } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: "Championship Precision",
      subtitle: "50mm Italian Slate & Shadowless LED Lighting",
      description: "Designed for serious players and casual enthusiasts alike. Every table is laser-leveled with Hainsworth Match wool cloth and Aramith Pro tournament balls.",
      tag: "Tournament Standard"
    },
    {
      icon: Flame,
      title: "Restaurant-Quality Gastronomy",
      subtitle: "35-Day Dry-Aged Beef & Wood-Fired Pizza",
      description: "We don't do microwave pub food. Our executive kitchen serves gourmet Wagyu burgers, flame-grilled Tomahawk steaks, artisan platters, and decadent desserts.",
      tag: "Culinary Excellence"
    },
    {
      icon: GlassWater,
      title: "Master Mixology & Whisky Bar",
      subtitle: "85+ Rare Single Malts & Smoked Cocktails",
      description: "Sip hand-carved ice sphere cocktails, rare Scottish & South African single malts, Stellenbosch Cabernet blends, and crisp craft beers brewed locally.",
      tag: "High-End Spirits"
    },
    {
      icon: Crown,
      title: "Exclusive Lounge Atmosphere",
      subtitle: "Chesterfield Leather & Private VIP Suites",
      description: "Relax in plush velvet and leather seating, enjoy live 4K sport broadcasts, attend weekly tournaments, or host private corporate celebrations in style.",
      tag: "Modern Luxury"
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

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#b29762] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 border border-[#b29762] text-[#b29762] group-hover:bg-[#b29762] group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="px-3 py-1 border border-white/20 text-[9px] font-bold text-[#b29762] uppercase tracking-widest">
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
                  <p className="text-white/70 text-sm leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
