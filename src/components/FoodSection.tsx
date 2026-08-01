import React, { useState } from 'react';
import { FOOD_MENU } from '../data/billiardsData';
import { MenuItem } from '../types';
import { Utensils, Flame, Sparkles, ChefHat, Check, Heart } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const FoodSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'steak', label: 'Steaks & Flame' },
    { id: 'burgers', label: 'Wagyu Burgers' },
    { id: 'pizza', label: 'Wood-Fired Pizza' },
    { id: 'wings', label: 'Glazed Wings' },
    { id: 'platters', label: 'Executive Platters' },
    { id: 'desserts', label: 'Artisan Desserts' },
  ];

  const filteredMenu = activeCategory === 'all'
    ? FOOD_MENU
    : FOOD_MENU.filter((item) => item.category === activeCategory);

  return (
    <section id="dining" className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              5-Star Gastronomy Experience
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight gold-foil-header">
            Culinary Excellence at <span className="italic text-[#b29762]">The Boma</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Food is never secondary at BSS. Prepared by executive chefs using dry-aged South African beef, artisanal mozzarella, and hand-smoked oak glazes.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#b29762] text-black shadow-md'
                  : 'bg-[#121212] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Food Items Grid with 3D Card Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <Card3DTilt key={item.id} maxRotation={10}>
              <div
                className="group bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl h-full"
              >
                <div>
                  {/* Large Dish Photography */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

                    {item.isChefSpecial && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center space-x-1">
                        <Flame className="w-3 h-3 fill-black" />
                        <span>Chef's Signature</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#0a0a0a] border border-[#b29762] text-[#b29762] font-mono font-bold text-base shadow-lg">
                      {item.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif italic text-xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Sommelier & Beverage Pairing */}
                    {item.pairing && (
                      <div className="p-3 bg-[#0a0a0a] border border-white/10 text-[11px] text-[#b29762] font-medium flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
                        <span className="truncate">{item.pairing}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-white/40 border-t border-white/10 mt-4 pt-4">
                  <span className="capitalize text-[#b29762] font-medium text-[11px] uppercase tracking-wider">{item.category}</span>
                  <span className="text-[10px] uppercase tracking-wider">Freshly Prepared</span>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
};
