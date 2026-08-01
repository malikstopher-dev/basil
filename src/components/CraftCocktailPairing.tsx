import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassWater, Sparkles, Trophy, Award, Wine, Flame, ChevronRight, Check, Heart, ShieldCheck, Bookmark, RefreshCw, Volume2 } from 'lucide-react';

export type SkillLevelKey = 'auto' | 'novice' | 'regular' | 'master' | 'highroller';

interface CraftCocktailPairingProps {
  activeWoodId: string;
  activeFeltId: string;
  shotCount: number;
  pottedCount: number;
  onOrderPairing?: (drinkName: string) => void;
}

interface CocktailPairing {
  id: string;
  name: string;
  subTitle: string;
  category: string;
  glassware: string;
  price: string;
  abv: string;
  description: string;
  ingredients: string[];
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

// Custom Pairing Matrix matching Wood Finish & Skill Level
const PAIRING_DATABASE: Record<string, CocktailPairing> = {
  // Mahogany Pairings
  'mahogany-novice': {
    id: 'mah-nov',
    name: 'The Sandton Golden Cue Highball',
    subTitle: 'Refreshed Precision Pour',
    category: 'Craft Highball',
    glassware: 'Hand-Cut Crystal Highball',
    price: 'R125',
    abv: '14% ABV',
    description: 'Bain’s 15-Year Cape Mountain Whisky, Fever-Tree Elderflower Tonic, dehydrated South African lime wheel, edible 24k gold leaf.',
    ingredients: ["Bain's 15yr Whisky", 'Elderflower Tonic', 'Dehydrated Lime', '24k Gold Flakes'],
    tastingNotes: ['Crisp Vanilla', 'Floral Honey', 'Clean Citrus Finish'],
    mixologistCommentary: 'The vibrant elderflower crispness elevates your focus on the mahogany rails, keeping your cue arm relaxed while developing smooth table control.',
    profiles: { smoke: 25, oak: 45, smoothness: 95, citrus: 80 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  },
  'mahogany-regular': {
    id: 'mah-reg',
    name: 'The Break Shot Smoked Old Fashioned',
    subTitle: 'Hickory Infused Executive Classic',
    category: 'Smoked Cocktail',
    glassware: 'Double Old Fashioned Tumbler',
    price: 'R140',
    abv: '28% ABV',
    description: 'Woodford Reserve Bourbon, Angostura & Orange Bitters, demerara sugar syrup, infused with hickory smoke inside a crystal decanter.',
    ingredients: ['Woodford Reserve Bourbon', 'Angostura Bitters', 'Orange Zest', 'Hickory Smoke'],
    tastingNotes: ['Hickory Smoke', 'Vanilla', 'Dark Cherry', 'Toasted Oak'],
    mixologistCommentary: 'Rich mahogany timber demands a drink with deep character. The hickory smoke lingers as smoothly as a clean cushion rebound.',
    profiles: { smoke: 85, oak: 90, smoothness: 80, citrus: 35 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  },
  'mahogany-master': {
    id: 'mah-mas',
    name: 'Royal Mahogany Sazerac 1910',
    subTitle: 'Championship Barrel Strength',
    category: 'Heritage Reserve',
    glassware: 'Chilled Crystal Rocks Glass',
    price: 'R195',
    abv: '34% ABV',
    description: 'Rittenhouse Rye, Hennessy VSOP Cognac, Absinthe rinse, Peychaud’s bitters, expressed lemon oil over hand-carved ice.',
    ingredients: ['Rittenhouse Rye', 'Hennessy VSOP', 'Absinthe Mist', 'Peychaud’s Bitters'],
    tastingNotes: ['Anise Spice', 'Dry Rye', 'Candied Citrus', 'Heavy Oak'],
    mixologistCommentary: 'Crafted for players who calculate multi-cushion bank shots. High rye complexity mirrors the dense grain of polished mahogany.',
    profiles: { smoke: 40, oak: 95, smoothness: 70, citrus: 60 },
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
  },
  'mahogany-highroller': {
    id: 'mah-hr',
    name: 'The Macallan 18 Double Cask & Cuban Sphere',
    subTitle: 'VIP Executive Suite Selection',
    category: 'Rare Single Malt',
    glassware: 'Hand-Carved Crystal Sphere',
    price: 'R380',
    abv: '43% ABV',
    description: 'Sherry-seasoned European and American oak cask whisky poured over a crystal ice sphere with dark chocolate truffles.',
    ingredients: ['Macallan 18 Double Cask', 'Crystal Ice Sphere', '70% Valrhona Truffle'],
    tastingNotes: ['Dried Fruit', 'Soft Spice', 'Toffee', 'Warm Mahogany Oak'],
    mixologistCommentary: 'The ultimate luxury pour. Matches the warmth of polished mahogany in private VIP suites.',
    profiles: { smoke: 30, oak: 100, smoothness: 98, citrus: 20 },
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1000',
  },

  // Walnut Pairings
  'walnut-novice': {
    id: 'wal-nov',
    name: 'Emerald Velvet Spritz',
    subTitle: 'Botanical Velvet Refresh',
    category: 'Lounge Spritz',
    glassware: 'Oversized Goblet',
    price: 'R130',
    abv: '16% ABV',
    description: 'Inverroche Amber Gin, Midori liqueur, prosecco, fresh cucumber ribbons, mint leaves, soda water.',
    ingredients: ['Inverroche Amber Gin', 'Midori Liqueur', 'Prosecco', 'Mint & Cucumber'],
    tastingNotes: ['Melon Zest', 'Cucumber Crisp', 'Effervescent Garden'],
    mixologistCommentary: 'Complements the deep earthy tone of walnut with light, crisp notes that ease first-time players into their rhythm.',
    profiles: { smoke: 10, oak: 20, smoothness: 90, citrus: 85 },
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
  },
  'walnut-regular': {
    id: 'wal-reg',
    name: 'Walnut & Black Cherry Sour',
    subTitle: 'Hand-Rubbed Bitters Blend',
    category: 'Craft Sour',
    glassware: 'Lowball Coupe',
    price: 'R145',
    abv: '24% ABV',
    description: 'Maker’s Mark Bourbon, Nocello walnut liqueur, maraschino cherry reduction, lemon juice, egg white foam.',
    ingredients: ['Maker’s Mark Bourbon', 'Nocello Walnut Liqueur', 'Fresh Lemon', 'Silky Foam'],
    tastingNotes: ['Nutty Spice', 'Tart Cherry', 'Velvety Cream'],
    mixologistCommentary: 'Nocello walnut liqueur mirrors the natural hand-rubbed grain of your table, offering balanced acidity for sustained tactical play.',
    profiles: { smoke: 20, oak: 60, smoothness: 85, citrus: 75 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  },
  'walnut-master': {
    id: 'wal-mas',
    name: 'Dark Walnut Smoked Manhattan',
    subTitle: 'Precision Cueist Reserve',
    category: 'Barrel Aged',
    glassware: 'Etched Vintage Coupe',
    price: 'R175',
    abv: '30% ABV',
    description: 'Bulleit Rye, Antica Formula Vermouth, Black Walnut bitters, flamed orange peel, aged 30 days in charred oak.',
    ingredients: ['Bulleit Rye', 'Antica Formula', 'Black Walnut Bitters', 'Flamed Orange'],
    tastingNotes: ['Dark Cocoa', 'Charred Walnut', 'Rich Botanicals'],
    mixologistCommentary: 'Deep walnut wood provides superior acoustic dampening; this aged Manhattan provides equal depth for master-level focus.',
    profiles: { smoke: 65, oak: 85, smoothness: 88, citrus: 40 },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
  },
  'walnut-highroller': {
    id: 'wal-hr',
    name: 'Bain’s 15yr Single Grain Vintage',
    subTitle: 'South African Heritage Masterpiece',
    category: 'Fine South African Pour',
    glassware: 'Glencairn Crystal Glass',
    price: 'R210',
    abv: '46% ABV',
    description: 'Double cask 15-year South African single grain whisky with dark caramel drizzle and toasted walnut platter.',
    ingredients: ["Bain's 15yr Grain Whisky", 'Artisanal Walnut Cluster'],
    tastingNotes: ['Banana Spice', 'Toasted Oak', 'Caramelized Fig'],
    mixologistCommentary: 'A local triumph matching the earthy luxury of South African dark walnut timber.',
    profiles: { smoke: 35, oak: 90, smoothness: 92, citrus: 30 },
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=1000',
  },

  // Ebony Pairings
  'ebony-novice': {
    id: 'ebo-nov',
    name: 'Obsidian Espresso Martini',
    subTitle: 'High-Gloss Energy Boost',
    category: 'Modern Digestif',
    glassware: 'Chilled V-Shape Martini',
    price: 'R135',
    abv: '19% ABV',
    description: 'Belvedere Vodka, fresh Sandton espresso shot, Kahlúa, vanilla syrup, topped with 3 whole roasted coffee beans.',
    ingredients: ['Belvedere Vodka', 'Fresh Espresso Shot', 'Kahlúa', 'Madagascar Vanilla'],
    tastingNotes: ['Dark Roast', 'Creamy Crema', 'Bitter Cocoa'],
    mixologistCommentary: 'Piano ebony finish has zero room for distraction. The crisp caffeine kick sharpens cue alignment for developing players.',
    profiles: { smoke: 30, oak: 10, smoothness: 90, citrus: 10 },
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
  },
  'ebony-regular': {
    id: 'ebo-reg',
    name: 'Piano Black Truffle Negroni',
    subTitle: 'Monochrome Modern Complexity',
    category: 'Artisanal Bitters',
    glassware: 'Square Crystal Rocks',
    price: 'R160',
    abv: '26% ABV',
    description: 'Tanqueray No. Ten Gin infused with white truffle oil, Campari, Sweet Vermouth, black activated charcoal ice cube.',
    ingredients: ['Tanqueray No. 10', 'Truffle Oil Mist', 'Campari', 'Activated Charcoal Ice'],
    tastingNotes: ['Earthy Truffle', 'Bitter Orange', 'Herbaceous Finish'],
    mixologistCommentary: 'Sleek, black activated-charcoal ice inside piano ebony aesthetics creates a visually striking table-side showpiece.',
    profiles: { smoke: 40, oak: 30, smoothness: 75, citrus: 70 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  },
  'ebony-master': {
    id: 'ebo-mas',
    name: 'The Midnight Break Boulevardier',
    subTitle: 'Sharp Angle Championship Pour',
    category: 'Aged Bitter Cocktail',
    glassware: 'Heavy Crystal Tumbler',
    price: 'R185',
    abv: '32% ABV',
    description: 'WhistlePig 10yr Rye, Campari, Punt e Mes vermouth, dark chocolate bitters, smoked rosemary sprig.',
    ingredients: ['WhistlePig 10yr Rye', 'Campari', 'Punt e Mes', 'Smoked Rosemary'],
    tastingNotes: ['Dark Cocoa', 'Herbal Bitters', 'Pine Smoke', 'Rich Spice'],
    mixologistCommentary: 'For cueists who execute complex massé and jump shots under high-contrast lighting.',
    profiles: { smoke: 70, oak: 80, smoothness: 82, citrus: 50 },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
  },
  'ebony-highroller': {
    id: 'ebo-hr',
    name: 'Dom Pérignon & Black Gold Caviar Spoon',
    subTitle: 'Ultra-Luxury VIP Pairing',
    category: 'Champagne & Caviar',
    glassware: 'Crystal Flute',
    price: 'R650',
    abv: '12.5% ABV',
    description: 'Chilled glass of Dom Pérignon Vintage Champagne paired with a mother-of-pearl spoon of Siberian Sturgeon caviar.',
    ingredients: ['Dom Pérignon Vintage', 'Siberian Sturgeon Caviar'],
    tastingNotes: ['Brioche', 'Mineral Crispness', 'Saline Luxury'],
    mixologistCommentary: 'Exclusive to Piano Ebony tables. High-contrast elegance for high-stakes championship nights.',
    profiles: { smoke: 0, oak: 10, smoothness: 100, citrus: 90 },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
  },

  // Rosewood Pairings
  'rosewood-novice': {
    id: 'ros-nov',
    name: 'Rosewood Botanical Highball',
    subTitle: 'Fragrant Heritage Tonic',
    category: 'Craft Gin Tonic',
    glassware: 'Balloon Copa Glass',
    price: 'R125',
    abv: '15% ABV',
    description: 'Hendrick’s Gin, rose water mist, pink pepper corns, Fever-Tree Indian Tonic, fresh raspberry garnish.',
    ingredients: ["Hendrick's Gin", 'Rose Water Mist', 'Pink Peppercorn', 'Raspberry'],
    tastingNotes: ['Floral Rose', 'Crisp Cucumber', 'Gentle Spice'],
    mixologistCommentary: 'Light rose floral notes echo the rich warm grain of African Rosewood rails, relaxing your alignment stance.',
    profiles: { smoke: 0, oak: 20, smoothness: 95, citrus: 75 },
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
  },
  'rosewood-regular': {
    id: 'ros-reg',
    name: 'Smoked Rosewood Old Fashioned',
    subTitle: 'Warm Timber Spice',
    category: 'Signature Smoked',
    glassware: 'Lowball Cut Glass',
    price: 'R150',
    abv: '27% ABV',
    description: 'Glenmorangie 10yr, cherrywood smoke, orange blossom water, cinnamon bark syrup, maraschino cherry.',
    ingredients: ['Glenmorangie 10yr', 'Cherrywood Smoke', 'Cinnamon Syrup', 'Orange Blossom'],
    tastingNotes: ['Cherrywood Smoke', 'Warm Cinnamon', 'Honeyed Citrus'],
    mixologistCommentary: 'Cherrywood smoke pairs with brass-inlaid Rosewood rails, adding warm aromatic depth as you control speed cloth dynamics.',
    profiles: { smoke: 75, oak: 70, smoothness: 88, citrus: 55 },
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  },
  'rosewood-master': {
    id: 'ros-mas',
    name: 'The Brass Rosewood Penicillin',
    subTitle: 'High-Proof Islay Infusion',
    category: 'Islay Malt Cocktail',
    glassware: 'Weighted Heavy Rocks Glass',
    price: 'R180',
    abv: '31% ABV',
    description: 'Laphroaig 10yr Islay Malt float, Monkey Shoulder scotch, fresh ginger syrup, lemon, local Sandton honey.',
    ingredients: ['Laphroaig 10yr Float', 'Monkey Shoulder', 'Fresh Ginger', 'Sandton Honey'],
    tastingNotes: ['Heavy Peat', 'Fiery Ginger', 'Soothing Honey'],
    mixologistCommentary: 'Peaty Islay smoke meets ginger spice. Designed for tournament strategists who need complete tactical composure.',
    profiles: { smoke: 95, oak: 85, smoothness: 75, citrus: 65 },
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1000',
  },
  'rosewood-highroller': {
    id: 'ros-hr',
    name: 'Meerlust Rubicon 2018 & Smoked Biltong Board',
    subTitle: 'Stellenbosch Executive Pairing',
    category: 'Fine SA Wine & Charcuterie',
    glassware: 'Riedel Bordeaux Glass',
    price: 'R620',
    abv: '14.5% ABV',
    description: 'Iconic Stellenbosch red blend paired with artisanal smoked kudu biltong, dried figs, and aged Gouda.',
    ingredients: ['Meerlust Rubicon Cabernet Blend', 'Artisanal Kudu Biltong', 'Aged SA Gouda'],
    tastingNotes: ['Blackcurrant', 'Cedar Wood', 'Graphite', 'Fine Tannins'],
    mixologistCommentary: 'Cedar and blackcurrant notes mirror the natural warmth of African Rosewood, ideal for private lounge gatherings.',
    profiles: { smoke: 40, oak: 95, smoothness: 90, citrus: 25 },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
  },
};

export const CraftCocktailPairing: React.FC<CraftCocktailPairingProps> = ({
  activeWoodId,
  activeFeltId,
  shotCount,
  pottedCount,
  onOrderPairing,
}) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevelKey>('auto');
  const [orderedSuccess, setOrderedSuccess] = useState(false);

  // Auto-calculated Skill Level based on in-simulator gameplay statistics
  const calculatedSkill: Exclude<SkillLevelKey, 'auto'> = useMemo(() => {
    if (shotCount === 0) return 'novice';
    const accuracy = pottedCount / shotCount;
    if (pottedCount >= 4 || accuracy >= 0.5) return 'master';
    if (pottedCount >= 2 || accuracy >= 0.25) return 'regular';
    return 'novice';
  }, [shotCount, pottedCount]);

  // Effective skill level (user override or auto calculated)
  const effectiveSkill: Exclude<SkillLevelKey, 'auto'> =
    selectedSkillLevel === 'auto' ? calculatedSkill : selectedSkillLevel;

  // Key lookup for cocktail database
  const pairingKey = `${activeWoodId}-${effectiveSkill}`;
  const currentPairing: CocktailPairing =
    PAIRING_DATABASE[pairingKey] || PAIRING_DATABASE['mahogany-regular'];

  // Handle ordering / saving pairing
  const handleOrder = () => {
    setOrderedSuccess(true);
    if (onOrderPairing) {
      onOrderPairing(currentPairing.name);
    }
    setTimeout(() => setOrderedSuccess(false), 4000);
  };

  return (
    <div className="bg-[#121212] border border-[#b29762]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-white/10 gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#0a0a0a] border border-[#b29762]/50 text-[#b29762] shadow-inner">
              <GlassWater className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-[#b29762]">
                  Sommelier & Mixologist Guide
                </span>
                <span className="px-2 py-0.5 bg-[#b29762]/20 border border-[#b29762]/40 text-[#b29762] text-[8px] font-bold uppercase tracking-widest">
                  Live Pairing Engine
                </span>
              </div>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                Craft Cocktail Table Pairing
              </h3>
            </div>
          </div>

          {/* Skill Level Selector Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
              Simulator Skill Level:
            </span>
            <div className="inline-flex p-1 bg-[#0a0a0a] border border-white/15 rounded-none text-[10px] uppercase font-bold tracking-wider">
              <button
                type="button"
                onClick={() => setSelectedSkillLevel('auto')}
                className={`px-2.5 py-1 transition-colors ${
                  selectedSkillLevel === 'auto'
                    ? 'bg-[#b29762] text-black font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Auto ({calculatedSkill.toUpperCase()})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSkillLevel('novice')}
                className={`px-2.5 py-1 transition-colors ${
                  selectedSkillLevel === 'novice'
                    ? 'bg-[#b29762] text-black font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Novice
              </button>
              <button
                type="button"
                onClick={() => setSelectedSkillLevel('regular')}
                className={`px-2.5 py-1 transition-colors ${
                  selectedSkillLevel === 'regular'
                    ? 'bg-[#b29762] text-black font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Regular
              </button>
              <button
                type="button"
                onClick={() => setSelectedSkillLevel('master')}
                className={`px-2.5 py-1 transition-colors ${
                  selectedSkillLevel === 'master'
                    ? 'bg-[#b29762] text-black font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Master
              </button>
              <button
                type="button"
                onClick={() => setSelectedSkillLevel('highroller')}
                className={`px-2.5 py-1 transition-colors ${
                  selectedSkillLevel === 'highroller'
                    ? 'bg-[#b29762] text-black font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                VIP High Roller
              </button>
            </div>
          </div>
        </div>

        {/* Pairing Display Hero Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPairing.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0a0a] border border-[#b29762]/40 p-5 sm:p-7 relative shadow-xl"
          >
            {/* Left Image & Glassware Badge (4 Cols) */}
            <div className="lg:col-span-5 relative group overflow-hidden border border-white/10 min-h-[260px] flex flex-col justify-between p-4">
              <img
                src={currentPairing.imageUrl}
                alt={currentPairing.name}
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Glassware & Category Tags */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#b29762]/50 text-[#b29762] text-[9px] font-bold uppercase tracking-widest">
                  {currentPairing.category}
                </span>
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white/80 text-[9px] font-mono">
                  {currentPairing.abv}
                </span>
              </div>

              {/* Bottom Image Caption */}
              <div className="relative z-10 space-y-1 pt-8">
                <span className="text-[10px] text-[#b29762] font-mono uppercase tracking-wider block">
                  Recommended Glassware: {currentPairing.glassware}
                </span>
                <span className="text-2xl font-bold font-serif italic text-white block drop-shadow-md">
                  {currentPairing.price}
                </span>
              </div>
            </div>

            {/* Right Details & Tasting Profile (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                {/* Title */}
                <div>
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#b29762] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#b29762]" />
                    <span>Curated for {activeWoodId.toUpperCase()} Rails & {effectiveSkill.toUpperCase()} Cueing</span>
                  </div>
                  <h4 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                    {currentPairing.name}
                  </h4>
                  <p className="text-xs text-[#b29762] font-mono tracking-wide mt-0.5">
                    "{currentPairing.subTitle}"
                  </p>
                </div>

                <p className="text-white/75 text-xs leading-relaxed">
                  {currentPairing.description}
                </p>

                {/* Key Ingredients */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
                    Key Ingredients & Infusions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPairing.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#161616] border border-white/10 text-white/80 text-[10px] font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flavor Profile Metrics */}
              <div className="bg-[#121212] p-3.5 border border-white/10 space-y-2.5">
                <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold flex items-center justify-between">
                  <span>Mixology Tasting Metrics</span>
                  <span className="text-white/40 font-mono">Balanced Profile</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
                  {/* Smoke Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/60 text-[9px]">
                      <span>Smoke</span>
                      <span>{currentPairing.profiles.smoke}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 w-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${currentPairing.profiles.smoke}%` }}
                      />
                    </div>
                  </div>

                  {/* Oak Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/60 text-[9px]">
                      <span>Oak Wood</span>
                      <span>{currentPairing.profiles.oak}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 w-full overflow-hidden">
                      <div
                        className="h-full bg-[#b29762] transition-all duration-500"
                        style={{ width: `${currentPairing.profiles.oak}%` }}
                      />
                    </div>
                  </div>

                  {/* Smoothness Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/60 text-[9px]">
                      <span>Smoothness</span>
                      <span>{currentPairing.profiles.smoothness}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 w-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${currentPairing.profiles.smoothness}%` }}
                      />
                    </div>
                  </div>

                  {/* Citrus Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/60 text-[9px]">
                      <span>Citrus / Zest</span>
                      <span>{currentPairing.profiles.citrus}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 w-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500"
                        style={{ width: `${currentPairing.profiles.citrus}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mixologist Rationale Commentary */}
              <div className="p-3 bg-[#171410] border-l-2 border-[#b29762] text-white/80 text-xs italic space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold not-italic block">
                  Mixologist Commentary:
                </span>
                <p>"{currentPairing.mixologistCommentary}"</p>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full sm:w-auto px-6 py-3 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  {orderedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Pairing Added to Lounge Order!</span>
                    </>
                  ) : (
                    <>
                      <Wine className="w-4 h-4" />
                      <span>Order Pairing at Lounge Table</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-white/40 font-mono text-center sm:text-right">
                  Served in the Sandton Lounge & Private VIP Suites
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
