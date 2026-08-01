import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassWater, Sparkles, Trophy, Wine, Flame, ChevronRight, Check, Heart, ShieldCheck, RefreshCw, Volume2, Eye, Filter, Sparkle, Award } from 'lucide-react';

export type SkillLevelKey = 'auto' | 'novice' | 'regular' | 'master' | 'highroller';

interface CraftCocktailPairingProps {
  activeWoodId?: string;
  activeFeltId?: string;
  shotCount?: number;
  pottedCount?: number;
  onOrderPairing?: (drinkName: string) => void;
}

export interface CocktailPairing {
  id: string;
  name: string;
  subTitle: string;
  category: 'Craft Highball' | 'Smoked Classic' | 'Heritage Reserve' | 'VIP Single Malt' | 'Botanical Spritz' | 'Modern Digestif';
  glassware: string;
  price: string;
  abv: string;
  woodMatch: 'mahogany' | 'walnut' | 'ebony' | 'rosewood' | 'all';
  skillMatch: SkillLevelKey;
  description: string;
  ingredients: {
    name: string;
    portion: string;
    notes: string;
  }[];
  tastingNotes: string[];
  mixologistCommentary: string;
  profiles: {
    smoke: number;      // 0 to 100
    oak: number;        // 0 to 100
    smoothness: number; // 0 to 100
    citrus: number;     // 0 to 100
  };
  imageUrl: string;
}

// Signature Craft Cocktail Catalog
export const CRAFT_COCKTAILS: CocktailPairing[] = [
  {
    id: 'mah-nov',
    name: 'The Sandton Golden Cue Highball',
    subTitle: 'Refreshed Precision Pour',
    category: 'Craft Highball',
    glassware: 'Hand-Cut Crystal Highball',
    price: 'R125',
    abv: '14% ABV',
    woodMatch: 'mahogany',
    skillMatch: 'novice',
    description: 'Bain’s 15-Year Cape Mountain Whisky, Fever-Tree Elderflower Tonic, dehydrated South African lime wheel, edible 24k gold leaf.',
    ingredients: [
      { name: "Bain's 15yr Cape Grain Whisky", portion: '50ml', notes: 'Single barrel South African cask' },
      { name: 'Fever-Tree Elderflower Tonic', portion: '120ml', notes: 'Artisanal spring water effervescence' },
      { name: 'Dehydrated Sandton Lime', portion: '1 Wheel', notes: 'Sun-cured citrus intensity' },
      { name: '24k Edible Gold Leaf', portion: '1 Flake', notes: 'Floating gold foil luxury finish' }
    ],
    tastingNotes: ['Crisp Vanilla', 'Floral Honey', 'Clean Citrus Finish'],
    mixologistCommentary: 'The vibrant elderflower crispness elevates your focus on the mahogany rails, keeping your cue arm relaxed while developing smooth table control.',
    profiles: { smoke: 25, oak: 45, smoothness: 95, citrus: 80 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'mah-reg',
    name: 'The Break Shot Smoked Old Fashioned',
    subTitle: 'Hickory Infused Executive Classic',
    category: 'Smoked Classic',
    glassware: 'Double Old Fashioned Tumbler',
    price: 'R140',
    abv: '28% ABV',
    woodMatch: 'mahogany',
    skillMatch: 'regular',
    description: 'Woodford Reserve Bourbon, Angostura & Orange Bitters, demerara sugar syrup, infused with hickory smoke inside a decanter.',
    ingredients: [
      { name: 'Woodford Reserve Bourbon', portion: '60ml', notes: 'Triple-distilled oak complexity' },
      { name: 'Angostura & Orange Bitters', portion: '3 Dashes', notes: 'Aromatic clove and citrus zest' },
      { name: 'Demerara Molasses Syrup', portion: '10ml', notes: 'Raw unrefined sugar velvetiness' },
      { name: 'Hickory Wood Smoke Mist', portion: 'Decanted', notes: 'Cold-smoked tabletop presentation' }
    ],
    tastingNotes: ['Hickory Smoke', 'Vanilla', 'Dark Cherry', 'Toasted Oak'],
    mixologistCommentary: 'Rich mahogany timber demands a drink with deep character. The hickory smoke lingers as smoothly as a clean cushion rebound.',
    profiles: { smoke: 85, oak: 90, smoothness: 80, citrus: 35 },
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'mah-mas',
    name: 'Royal Mahogany Sazerac 1910',
    subTitle: 'Championship Barrel Strength',
    category: 'Heritage Reserve',
    glassware: 'Chilled Crystal Rocks Glass',
    price: 'R195',
    abv: '34% ABV',
    woodMatch: 'mahogany',
    skillMatch: 'master',
    description: 'Rittenhouse Rye, Hennessy VSOP Cognac, Absinthe rinse, Peychaud’s bitters, expressed lemon oil over hand-carved ice.',
    ingredients: [
      { name: 'Rittenhouse 100-Proof Rye', portion: '35ml', notes: 'Peppery rye backbone' },
      { name: 'Hennessy VSOP Cognac', portion: '25ml', notes: 'Velvety French oak fruitiness' },
      { name: 'St. George Absinthe Rinse', portion: '5ml Mist', notes: 'Aniseed rim aromatic mist' },
      { name: 'Peychaud’s Heritage Bitters', portion: '4 Dashes', notes: 'Floral gentian spice' }
    ],
    tastingNotes: ['Anise Spice', 'Dry Rye', 'Candied Citrus', 'Heavy Oak'],
    mixologistCommentary: 'Crafted for players who calculate multi-cushion bank shots. High rye complexity mirrors the dense grain of polished mahogany.',
    profiles: { smoke: 40, oak: 95, smoothness: 70, citrus: 60 },
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'wal-nov',
    name: 'Emerald Velvet Botanical Spritz',
    subTitle: 'Botanical Velvet Refresh',
    category: 'Botanical Spritz',
    glassware: 'Oversized Crystal Goblet',
    price: 'R130',
    abv: '16% ABV',
    woodMatch: 'walnut',
    skillMatch: 'novice',
    description: 'Inverroche Amber Gin, Midori liqueur, prosecco, fresh cucumber ribbons, mint leaves, artisanal soda water.',
    ingredients: [
      { name: 'Inverroche Amber Fynbos Gin', portion: '45ml', notes: 'Coastal South African botanicals' },
      { name: 'Midori Melon Liqueur', portion: '20ml', notes: 'Vibrant honeydew sweetness' },
      { name: 'Valdobbiadene Prosecco', portion: '75ml', notes: 'Crisp dry effervescent bubbles' },
      { name: 'Hand-Sliced Cucumber & Mint', portion: 'Garnish', notes: 'Garden fresh aromatic crunch' }
    ],
    tastingNotes: ['Melon Zest', 'Cucumber Crisp', 'Effervescent Garden'],
    mixologistCommentary: 'Complements the deep earthy tone of walnut with light, crisp notes that ease first-time players into their rhythm.',
    profiles: { smoke: 10, oak: 20, smoothness: 90, citrus: 85 },
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ebo-nov',
    name: 'Obsidian Espresso Martini',
    subTitle: 'High-Gloss Energy Boost',
    category: 'Modern Digestif',
    glassware: 'Chilled V-Shape Martini Glass',
    price: 'R135',
    abv: '19% ABV',
    woodMatch: 'ebony',
    skillMatch: 'novice',
    description: 'Belvedere Vodka, fresh Sandton espresso shot, Kahlúa, vanilla syrup, topped with 3 whole roasted coffee beans.',
    ingredients: [
      { name: 'Belvedere Intense Vodka', portion: '50ml', notes: 'Quadruple-distilled rye purity' },
      { name: 'Fresh Single-Origin Espresso', portion: '30ml', notes: 'Freshly pulled crema foam' },
      { name: 'Kahlúa Coffee Liqueur', portion: '20ml', notes: 'Mexican arabica coffee sweetness' },
      { name: 'Madagascar Vanilla Bean Syrup', portion: '10ml', notes: 'Warm floral aromatic balance' }
    ],
    tastingNotes: ['Dark Roast', 'Creamy Crema', 'Bitter Cocoa'],
    mixologistCommentary: 'Piano ebony finish has zero room for distraction. The crisp caffeine kick sharpens cue alignment for developing players.',
    profiles: { smoke: 30, oak: 10, smoothness: 90, citrus: 10 },
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ebo-reg',
    name: 'Piano Black Truffle Negroni',
    subTitle: 'Monochrome Modern Complexity',
    category: 'Smoked Classic',
    glassware: 'Square Cut Crystal Rocks',
    price: 'R160',
    abv: '26% ABV',
    woodMatch: 'ebony',
    skillMatch: 'regular',
    description: 'Tanqueray No. Ten Gin infused with white truffle oil, Campari, Sweet Vermouth, black activated charcoal ice cube.',
    ingredients: [
      { name: 'Tanqueray No. Ten Gin', portion: '30ml', notes: 'Fresh whole citrus botanical gin' },
      { name: 'White Truffle Infused Campari', portion: '30ml', notes: 'Piedmont truffle oil infusion' },
      { name: 'Carpano Antica Formula Vermouth', portion: '30ml', notes: 'Rich dark vanilla herbal vermouth' },
      { name: 'Activated Charcoal Ice Sphere', portion: '1 Cube', notes: 'High-contrast obsidian melt' }
    ],
    tastingNotes: ['Earthy Truffle', 'Bitter Orange', 'Herbaceous Finish'],
    mixologistCommentary: 'Sleek, black activated-charcoal ice inside piano ebony aesthetics creates a visually striking table-side showpiece.',
    profiles: { smoke: 40, oak: 30, smoothness: 75, citrus: 70 },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ros-hr',
    name: 'Dom Pérignon & Black Gold Caviar Spoon',
    subTitle: 'Ultra-Luxury VIP Pairing',
    category: 'VIP Single Malt',
    glassware: 'Crystal Champagne Flute',
    price: 'R650',
    abv: '12.5% ABV',
    woodMatch: 'rosewood',
    skillMatch: 'highroller',
    description: 'Chilled glass of Dom Pérignon Vintage Champagne paired with a mother-of-pearl spoon of Siberian Sturgeon caviar.',
    ingredients: [
      { name: 'Dom Pérignon Vintage 2013', portion: '150ml', notes: 'Precision aged French champagne' },
      { name: 'Siberian Sturgeon Caviar', portion: '15g Spoon', notes: 'Mother-of-pearl pearls' },
      { name: 'Gold-Dust Brioche Toast', portion: '2 Points', notes: 'Toasted brioche crunch' }
    ],
    tastingNotes: ['Brioche', 'Mineral Crispness', 'Saline Luxury'],
    mixologistCommentary: 'Exclusive to Piano Ebony and African Rosewood tables. High-contrast elegance for high-stakes championship nights.',
    profiles: { smoke: 0, oak: 10, smoothness: 100, citrus: 90 },
    imageUrl: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ros-reg',
    name: 'Smoked Rosewood Old Fashioned',
    subTitle: 'Warm Timber Spice',
    category: 'Smoked Classic',
    glassware: 'Lowball Cut Glass',
    price: 'R150',
    abv: '27% ABV',
    woodMatch: 'rosewood',
    skillMatch: 'regular',
    description: 'Glenmorangie 10yr, cherrywood smoke, orange blossom water, cinnamon bark syrup, maraschino cherry.',
    ingredients: [
      { name: 'Glenmorangie 10yr Single Malt', portion: '60ml', notes: 'Highland malt vanilla sweetness' },
      { name: 'Cherrywood Smoke Infusion', portion: 'Mist', notes: 'Cold smoked timber aroma' },
      { name: 'Cinnamon Bark Syrup', portion: '10ml', notes: 'Warm spice reduction' },
      { name: 'Orange Blossom Water', portion: '2 Dashes', notes: 'Floral citrus spray' }
    ],
    tastingNotes: ['Cherrywood Smoke', 'Warm Cinnamon', 'Honeyed Citrus'],
    mixologistCommentary: 'Cherrywood smoke pairs with brass-inlaid Rosewood rails, adding warm aromatic depth as you control speed cloth dynamics.',
    profiles: { smoke: 75, oak: 70, smoothness: 88, citrus: 55 },
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1200',
  }
];

export const CraftCocktailPairing: React.FC<CraftCocktailPairingProps> = ({
  activeWoodId = 'mahogany',
  activeFeltId = 'green',
  shotCount = 0,
  pottedCount = 0,
  onOrderPairing,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderedDrinkId, setOrderedDrinkId] = useState<string | null>(null);

  // Auto-calculated Skill Level based on in-simulator gameplay statistics
  const calculatedSkill: Exclude<SkillLevelKey, 'auto'> = useMemo(() => {
    if (shotCount === 0) return 'novice';
    const accuracy = pottedCount / shotCount;
    if (pottedCount >= 4 || accuracy >= 0.5) return 'master';
    if (pottedCount >= 2 || accuracy >= 0.25) return 'regular';
    return 'novice';
  }, [shotCount, pottedCount]);

  // Filter cocktails based on active timber match or category selection
  const filteredCocktails = useMemo(() => {
    if (selectedCategory === 'timber-recommended') {
      return CRAFT_COCKTAILS.filter(
        (c) => c.woodMatch === activeWoodId || c.woodMatch === 'all'
      );
    }
    if (selectedCategory === 'all') return CRAFT_COCKTAILS;
    return CRAFT_COCKTAILS.filter((c) => c.category === selectedCategory);
  }, [selectedCategory, activeWoodId]);

  const handleOrder = (drink: CocktailPairing) => {
    setOrderedDrinkId(drink.id);
    if (onOrderPairing) {
      onOrderPairing(drink.name);
    }
    setTimeout(() => setOrderedDrinkId(null), 4000);
  };

  return (
    <section id="craft-cocktails" className="py-20 bg-[#070707] border-t border-[#b29762]/30 relative overflow-hidden">
      {/* Background Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]" />
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              <GlassWater className="w-3.5 h-3.5" />
              <span>Sommelier & Mixologist Guide</span>
            </div>
            <div className="w-8 h-[1px] bg-[#b29762]" />
          </div>

          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white tracking-tight">
            Craft Cocktail <span className="gold-foil-typography not-italic font-bold">Table Pairing</span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Curated mixology engineered to match your billiard table's timber grain, speed felt dynamics, and player cue precision. Hover over any signature drink to reveal its ingredient profile in <span className="text-[#fcf6ba] font-semibold">gold-foil typography</span>.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-[#121212] p-3 border border-white/10 max-w-4xl mx-auto">
          {[
            { id: 'all', label: 'All Signature Pairings' },
            { id: 'timber-recommended', label: `Matched to ${activeWoodId.toUpperCase()} Rails` },
            { id: 'Craft Highball', label: 'Craft Highballs' },
            { id: 'Smoked Classic', label: 'Smoked Old Fashioneds' },
            { id: 'Heritage Reserve', label: 'Heritage Reserve Sazeracs' },
            { id: 'Botanical Spritz', label: 'Botanical Spritzes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#b29762] text-black border-[#b29762] shadow-lg'
                  : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Visually Stunning Drink Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCocktails.map((cocktail) => {
            const isOrdered = orderedDrinkId === cocktail.id;

            return (
              <div
                key={cocktail.id}
                className="group relative bg-[#0f0f0f] border border-white/10 hover:border-[#b29762]/70 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl rounded-xs min-h-[480px]"
              >
                {/* High-Definition Drink Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                  <img
                    src={cocktail.imageUrl}
                    alt={cocktail.name}
                    className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-black/40 pointer-events-none" />

                  {/* Glassware & Category Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 bg-black/85 backdrop-blur-md border border-[#b29762]/60 text-[#b29762] text-[9px] font-bold uppercase tracking-widest shadow-md">
                      {cocktail.category}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white/80 text-[9px] font-mono">
                      {cocktail.abv}
                    </span>
                  </div>

                  {/* Hover Callout Tag */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/90 backdrop-blur-md border border-[#b29762]/80 text-[#fcf6ba] text-[9px] font-mono font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-lg group-hover:opacity-0 transition-opacity z-10">
                    <Sparkles className="w-3 h-3 text-[#b29762]" />
                    <span>Hover for Gold Foil Profile</span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-4 text-2xl font-serif italic font-bold text-white drop-shadow-lg z-10 group-hover:opacity-0 transition-opacity">
                    {cocktail.price}
                  </div>

                  {/* HOVER ANIMATED OVERLAY REVEALING INGREDIENT PROFILE IN GOLD-FOIL TYPOGRAPHY */}
                  <div className="absolute inset-0 bg-[#080808]/95 backdrop-blur-md p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 overflow-y-auto no-scrollbar border-b border-[#b29762]/40">
                    <div className="space-y-3">
                      {/* Gold Foil Header */}
                      <div className="flex items-center justify-between border-b border-[#b29762]/30 pb-2">
                        <div className="flex items-center space-x-2">
                          <Sparkle className="w-4 h-4 text-[#fcf6ba] animate-pulse" />
                          <span className="gold-foil-typography font-serif text-sm font-bold tracking-wider uppercase">
                            Ingredient Profile
                          </span>
                        </div>
                        <span className="gold-foil-badge text-[8px] px-2 py-0.5 font-mono uppercase font-bold">
                          24k Gold Infusion
                        </span>
                      </div>

                      {/* Ingredient Profile List in Gold-Foil Typography */}
                      <div className="space-y-2 pt-1">
                        {cocktail.ingredients.map((ing, idx) => (
                          <div
                            key={idx}
                            className="bg-[#12100d] border border-[#b29762]/30 p-2 flex items-center justify-between shadow-inner"
                          >
                            <div className="space-y-0.5">
                              <span className="gold-foil-typography font-serif text-xs font-semibold block leading-tight">
                                {ing.name}
                              </span>
                              <span className="text-[9px] text-white/50 block font-mono">
                                {ing.notes}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-[#b29762]/20 border border-[#b29762]/50 text-[#fcf6ba] text-[9px] font-mono font-bold whitespace-nowrap ml-2">
                              {ing.portion}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Mixologist Commentary */}
                      <div className="p-2.5 bg-[#171410] border-l-2 border-[#b29762] text-white/80 text-[10px] italic leading-relaxed">
                        <span className="gold-foil-typography not-italic font-bold block text-[8px] uppercase tracking-widest mb-0.5">
                          Mixologist Pairing Note:
                        </span>
                        "{cocktail.mixologistCommentary}"
                      </div>
                    </div>

                    {/* Glassware Footer Note */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
                      <span>Glassware: {cocktail.glassware}</span>
                      <span className="gold-foil-typography font-bold">{cocktail.price}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body & Specs */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[9px] uppercase tracking-widest font-bold text-[#b29762]">
                      <Award className="w-3.5 h-3.5" />
                      <span>Curated for {cocktail.woodMatch.toUpperCase()} Timber</span>
                    </div>

                    <h3 className="font-serif italic text-xl sm:text-2xl text-white font-normal group-hover:text-[#b29762] transition-colors">
                      {cocktail.name}
                    </h3>

                    <p className="text-[#b29762] text-[11px] font-mono tracking-wide italic">
                      "{cocktail.subTitle}"
                    </p>

                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                      {cocktail.description}
                    </p>
                  </div>

                  {/* Flavor Metrics Sliders */}
                  <div className="bg-[#080808] p-3 border border-white/10 space-y-2">
                    <span className="text-[8px] uppercase tracking-widest text-[#b29762] font-bold block">
                      Tasting Profile Metrics
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-white/60">
                          <span>Smoke</span>
                          <span>{cocktail.profiles.smoke}%</span>
                        </div>
                        <div className="h-1 bg-white/10 w-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500"
                            style={{ width: `${cocktail.profiles.smoke}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex justify-between text-white/60">
                          <span>Oak</span>
                          <span>{cocktail.profiles.oak}%</span>
                        </div>
                        <div className="h-1 bg-white/10 w-full overflow-hidden">
                          <div
                            className="h-full bg-[#b29762]"
                            style={{ width: `${cocktail.profiles.oak}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex justify-between text-white/60">
                          <span>Smoothness</span>
                          <span>{cocktail.profiles.smoothness}%</span>
                        </div>
                        <div className="h-1 bg-white/10 w-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${cocktail.profiles.smoothness}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex justify-between text-white/60">
                          <span>Citrus</span>
                          <span>{cocktail.profiles.citrus}%</span>
                        </div>
                        <div className="h-1 bg-white/10 w-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${cocktail.profiles.citrus}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <button
                    type="button"
                    onClick={() => handleOrder(cocktail)}
                    className="w-full py-3 bg-[#b29762] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isOrdered ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Pairing Added to Lounge Order!</span>
                      </>
                    ) : (
                      <>
                        <Wine className="w-4 h-4" />
                        <span>Order Pairing at Table ({cocktail.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
