import React, { useState } from 'react';
import { DRINK_MENU } from '../data/billiardsData';
export const BarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'cocktails' | 'whisky' | 'beer' | 'wine'>('all');

  const filteredDrinks = activeTab === 'all'
    ? DRINK_MENU
    : DRINK_MENU.filter((d) => d.category === activeTab);

  return (
    <section id="bar" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              High-End Mixology & Spirits
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            The Cocktail & <span className="italic text-[#b29762]">Whisky Lounge</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            From hand-carved ice sphere old fashioneds to 18-year Speyside single malts and South African craft drafts on tap. Our master mixologists elevate every sip.
          </p>
        </div>

        {/* Drink Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Drinks' },
            { id: 'cocktails', label: 'Signature Cocktails' },
            { id: 'whisky', label: 'Rare Whiskies' },
            { id: 'beer', label: 'Craft Beers' },
            { id: 'wine', label: 'South African Wines' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#b29762] text-black shadow-md'
                  : 'bg-[#121212] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drink Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="group bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={drink.imageUrl}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

                  {drink.isPopular && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      House Favorite
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#0a0a0a] border border-[#b29762] text-[#b29762] font-mono font-bold text-base shadow-lg">
                    {drink.price}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif italic text-xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                      {drink.name}
                    </h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {drink.description}
                  </p>

                  {/* Tasting notes */}
                  {drink.tastingNotes && (
                    <div className="p-3 bg-[#0a0a0a] border border-white/10 text-[11px] space-y-1">
                      <span className="text-white/40 block font-bold text-[9px] uppercase tracking-wider">Tasting Profile</span>
                      <span className="text-[#b29762] font-medium">{drink.tastingNotes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-white/40 border-t border-white/10 mt-3 pt-3">
                <span className="text-[#b29762] font-medium text-[11px] uppercase tracking-wider">{drink.origin}</span>
                {drink.abv && <span className="text-white/40 text-[10px] uppercase tracking-wider">{drink.abv}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
