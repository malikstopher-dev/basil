import { BilliardTable, MenuItem, DrinkItem, TournamentEvent, SportsBroadcast, GalleryItem, Testimonial } from '../types';

export const VENUE_INFO = {
  name: "Basil's Billiards Supplier (BSS)",
  tagline: "Where Every Shot Becomes an Experience",
  subTagline: "Sandton's Premier Luxury Billiards Lounge, Fine Dining & Executive Social Club",
  phone: "084 574 8577",
  phoneFormatted: "+27 84 574 8577",
  whatsapp: "27845748577",
  email: "reservations@basilsbilliards.co.za",
  location: "Inside The Boma Café, Paulshof, Sandton, Johannesburg, 2056, South Africa",
  shortLocation: "The Boma Café, Paulshof, Sandton",
  hours: [
    { days: "Monday – Thursday", time: "12:00 PM – 11:30 PM" },
    { days: "Friday – Saturday", time: "11:00 AM – 02:00 AM" },
    { days: "Sunday & Holidays", time: "11:00 AM – 11:00 PM" },
  ],
  stats: [
    { label: "Tournament Slate Tables", value: "14" },
    { label: "Rare Whiskies & Cocktails", value: "85+" },
    { label: "VIP Executive Suites", value: "3" },
    { label: "Google Guest Rating", value: "4.9★" },
  ]
};

export const BILLIARD_TABLES: BilliardTable[] = [
  {
    id: "table-championship-1",
    name: "The Imperial Emerald 9ft Slate",
    category: "championship",
    description: "Precision-engineered 9ft championship table featuring imported Italian 50mm slate, Hainsworth Match wool cloth, and shadowless LED perimeter lighting. Designed for tournament play and true purists.",
    clothColor: "Tournament Emerald Green",
    slateThickness: "50mm Italian Slate",
    lighting: "Overhead 4000K Shadowless LED Canopy",
    capacity: "Up to 6 Players",
    hourlyRate: "R220 / hr",
    features: [
      "Hainsworth Match Pro Cloth",
      "Aramith Tournament Pro Cue Balls",
      "Custom Handcrafted Ash Cues",
      "Dedicated Chesterfield Lounge Seating",
      "Perimeter Beverage Rail & Cigar Tray"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    badge: "Tournament Choice"
  },
  {
    id: "table-vip-suite",
    name: "The Royal Oak Executive VIP Suite",
    category: "vip",
    description: "An isolated private room with mahogany wood panelling, plush velvet green armchairs, private bar service, dedicated hostess, and a 10ft Snooker/Billiards table.",
    clothColor: "Dark Forest Velvet Green",
    slateThickness: "60mm Brazilian Slate",
    lighting: "Hand-blown Crystal Chandelier & Dimmable Canopy",
    capacity: "Up to 12 Guests",
    hourlyRate: "R650 / hr",
    minSpend: "R1,500 Min Beverage Spend",
    features: [
      "Private VIP Host & Dedicated Mixologist",
      "Private 65\" 4K OLED Sports Screen",
      "Subtle Sound Isolation & Custom Playlist Control",
      "Complimentary Welcome Single Malt Pour",
      "Plush Chesterfield Lounge Furniture"
    ],
    imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1200",
    badge: "Exclusive VIP"
  },
  {
    id: "table-english-8ball",
    name: "The Boma Heritage English 8-Ball",
    category: "english",
    description: "Authentic 7ft English Pool Table crafted from solid African Rosewood with high-speed directional directional cloth. Ideal for tactical matches and spirited friendly duels.",
    clothColor: "Deep Emerald Green",
    slateThickness: "38mm Precision Slate",
    lighting: "Warm Vintage Brass Pendant Canopy",
    capacity: "Up to 4 Players",
    hourlyRate: "R180 / hr",
    features: [
      "Super Aramith Pro 2\" Balls",
      "Ergonomic Carbon-Core Cues",
      "Adjacent High-Top Leather Dining Table",
      "Direct Bar Service Access"
    ],
    imageUrl: "https://images.unsplash.com/photo-1615826932727-ed9f182ac67e?auto=format&fit=crop&q=80&w=1200",
    badge: "Most Popular"
  },
  {
    id: "table-patio-lounge",
    name: "The Veranda Open-Air Pool Table",
    category: "patio",
    description: "Located on The Boma Café open-air covered terrace surrounded by fairy-lit greenery and ambient heaters. Enjoy billiards under the Johannesburg evening sky.",
    clothColor: "Slate Charcoal & Green",
    slateThickness: "Weather-Shield Precision Slate",
    lighting: "Warm Filament String Lighting",
    capacity: "Up to 6 Players",
    hourlyRate: "R200 / hr",
    features: [
      "Covered Heated Terrace Setting",
      "Boma Braai & Platter Service Access",
      "Surround Lounge Music System",
      "Fireside Seating Nearby"
    ],
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    badge: "Al Fresco Vibe"
  }
];

export const FOOD_MENU: MenuItem[] = [
  {
    id: "food-steak",
    name: "35-Day Dry-Aged Tomahawk Ribeye (800g)",
    category: "steak",
    description: "Flame-grilled grain-fed South African beef bone-in ribeye with smoked bone marrow butter, charred rosemary, and truffle red wine jus.",
    price: "R480",
    priceNum: 480,
    pairing: "Pairs with Lagavulin 16yr or Stellenbosch Cabernet Sauvignon",
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1000",
    isChefSpecial: true,
    dietary: ["Gluten-Free Option Available"]
  },
  {
    id: "food-burger",
    name: "The BSS Wagyu & Truffle Royale Burger",
    category: "burgers",
    description: "Double 180g Karoo Wagyu beef patties, aged Gruyere cheese, caramelized balsamic onions, black truffle aioli on a toasted brioche bun with hand-cut triple-cooked chips.",
    price: "R225",
    priceNum: 225,
    pairing: "Pairs with BSS Smoked Old Fashioned or Craft IPA",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000",
    isChefSpecial: true,
  },
  {
    id: "food-pizza",
    name: "Wood-Fired Truffle & Wild Mushroom Pizza",
    category: "pizza",
    description: "Slow-fermented 72-hour napolitana dough topped with Fior di Latte mozzarella, porcini paste, wild roasted mushrooms, fresh thyme, and white truffle oil drizzle.",
    price: "R195",
    priceNum: 195,
    pairing: "Pairs with Franschhoek Pinotage",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "food-wings",
    name: "Bourbon & Honey Glazed Charcoal Wings (12pcs)",
    category: "wings",
    description: "Jumbo free-range chicken wings smoked over oak wood, toss-glazed in Maker's Mark bourbon honey sauce, served with blue cheese dip and pickled celery.",
    price: "R185",
    priceNum: 185,
    pairing: "Pairs with Draft Heineken or Bourbon Highball",
    imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=1000",
    isChefSpecial: false
  },
  {
    id: "food-platter",
    name: "The Executive Boma Game & Artisan Platter",
    category: "platters",
    description: "Designed for 4-6 players. Springbok carpaccio, grilled lamb cutlets, peri-peri tiger prawns, cured biltong, artisanal local cheeses, marinated olives, and roasted garlic flatbread.",
    price: "R690",
    priceNum: 690,
    pairing: "Ideal for group table reservations & corporate bookings",
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=1000",
    isChefSpecial: true
  },
  {
    id: "food-dessert",
    name: "Dark Chocolate & Smoked Whiskey Fondant",
    category: "desserts",
    description: "70% Valrhona dark chocolate molten cake infused with Glenfiddich 12, paired with Madagascar vanilla bean gelato and salted caramel brittle.",
    price: "R115",
    priceNum: 115,
    pairing: "Pairs with Espresso Martini or Macallan 12 Double Cask",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1000"
  }
];

export const DRINK_MENU: DrinkItem[] = [
  {
    id: "drink-1",
    name: "The Break Shot Smoked Old Fashioned",
    category: "cocktails",
    description: "Woodford Reserve Bourbon, Angostura & Orange bitters, demerara sugar syrup, infused with hickory smoke inside a crystal decanter.",
    price: "R140",
    origin: "BSS Signature",
    abv: "28% ABV",
    tastingNotes: "Hickory Smoke, Vanilla, Dark Cherry, Oak",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000",
    isPopular: true
  },
  {
    id: "drink-2",
    name: "Emerald Velvet Martini",
    category: "cocktails",
    description: "Inverroche Amber Gin, Midori melon liqueur, fresh lime, clarified apple juice, mint oil drops served in a frozen coupe glass.",
    price: "R135",
    origin: "Sandton Nightlife",
    abv: "22% ABV",
    tastingNotes: "Botanical, Crisp Melon, Lime Zest",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000",
    isPopular: true
  },
  {
    id: "drink-3",
    name: "The Macallan 18 Year Double Cask",
    category: "whisky",
    description: "Poured over a hand-carved crystal ice sphere. Perfectly balanced sherry-seasoned American and European oak casks.",
    price: "R380 / 50ml",
    origin: "Speyside, Scotland",
    abv: "43% ABV",
    tastingNotes: "Dried Fruit, Ginger, Toffee, Soft Spice",
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1000",
    isPopular: true
  },
  {
    id: "drink-4",
    name: "Bain's 15 Year Single Grain (Cape Mountain)",
    category: "whisky",
    description: "South Africa's internationally awarded single grain whisky aged 15 years in double wood casks.",
    price: "R165 / 50ml",
    origin: "Wellington, South Africa",
    abv: "46% ABV",
    tastingNotes: "Banana Crisp, Spice, Soft Vanilla Oak",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "drink-5",
    name: "BSS Artisanal Craft Draft (Pint)",
    category: "beer",
    description: "Unfiltered golden lager brewed locally in Johannesburg with South African hops. Smooth malt backbone with clean crisp finish.",
    price: "R65",
    origin: "Local Craft Brewery",
    abv: "5.0% ABV",
    tastingNotes: "Crisp Malt, Citrus Hops, Clean Finish",
    imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "drink-6",
    name: "Meerlust Rubicon Cabernet Blend 2018",
    category: "wine",
    description: "Iconic Stellenbosch red blend. Deep violet color, intense blackcurrant aromas with cedar wood and graphite complexity.",
    price: "R620 / Bottle",
    origin: "Stellenbosch, SA",
    abv: "14.5% ABV",
    tastingNotes: "Blackcurrant, Plum, Cedar, Fine Tannins",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000"
  }
];

export const EVENTS: TournamentEvent[] = [
  {
    id: "event-king-of-pool",
    title: "King of Pool Tables: Weekly Invitational",
    tag: "Weekly Championship",
    date: "Every Thursday Night",
    time: "19:00 SAST Registration",
    prizePool: "R10,000 Guaranteed Cash + Trophy",
    entryFee: "R150 Entry",
    description: "Sandton's most prestigious weekly pool showdown. Double elimination format, professional referees, 8-Ball rules. Streamed live on venue screens.",
    imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1000",
    isWeekly: true
  },
  {
    id: "event-corporate-night",
    title: "Executive & Corporate Lounge Takeover",
    tag: "Corporate Experience",
    date: "Available Mon – Wed",
    time: "Tailored Hours",
    description: "Host your company team building, product launches, or client entertaining. Private venue hire, custom gourmet platters, whisky masterclasses & dedicated host.",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "event-ladies-night",
    title: "Emerald & Lace: Velvet Ladies Lounge",
    tag: "Special Evening",
    date: "Every Tuesday Night",
    time: "18:30 – 23:00 SAST",
    description: "Complimentary signature cocktails on arrival for ladies, half-price table rates all evening, and live saxophone lounge sets.",
    imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1000",
    isWeekly: true
  }
];

export const SPORTS_SCHEDULE: SportsBroadcast[] = [
  {
    id: "sp-1",
    event: "Premier League: Man City vs Arsenal",
    league: "English Premier League",
    teams: "Man City vs Arsenal",
    date: "Saturday, 18:30 SAST",
    time: "18:30",
    sport: "football",
    isHot: true
  },
  {
    id: "sp-2",
    event: "The Rugby Championship: Springboks vs All Blacks",
    league: "International Rugby",
    teams: "South Africa vs New Zealand",
    date: "Saturday, 17:00 SAST",
    time: "17:00",
    sport: "rugby",
    isHot: true
  },
  {
    id: "sp-3",
    event: "Formula 1 Grand Prix Main Race",
    league: "F1 World Championship",
    teams: "Live 4K Surround Screening",
    date: "Sunday, 15:00 SAST",
    time: "15:00",
    sport: "f1",
    isHot: false
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Main Tournament Arena",
    category: "tables",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    caption: "Custom 9ft Slate Tables under shadowless LED canopies at BSS Paulshof."
  },
  {
    id: "gal-2",
    title: "The Boma Executive Lounge",
    category: "lounge",
    imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1200",
    caption: "Plush emerald velvet Chesterfield sofas and rare whisky display inside The Boma Café."
  },
  {
    id: "gal-3",
    title: "Flame-Grilled Tomahawk Steak",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1200",
    caption: "35-Day dry-aged beef prepared by our executive chefs."
  },
  {
    id: "gal-4",
    title: "Smoked Old Fashioned",
    category: "cocktails",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    caption: "Hickory smoke poured over handcrafted ice spheres."
  },
  {
    id: "gal-5",
    title: "Thursday Tournament Thrills",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1615826932727-ed9f182ac67e?auto=format&fit=crop&q=80&w=1200",
    caption: "King of Pool final frame action with live audience."
  },
  {
    id: "gal-6",
    title: "Outdoor Heated Patio",
    category: "lounge",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    caption: "Fireside drinks and outdoor pool under fairy lights."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "David Van Der Merwe",
    role: "Managing Director",
    company: "Sandton Capital Holdings",
    comment: "Basil's Billiards Supplier is on a totally different level compared to anything in Johannesburg. The tables roll true, the Wagyu burger is world-class, and sipping a Macallan 18 while playing 8-ball is my ideal Friday night.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    date: "July 2026"
  },
  {
    id: "t-2",
    name: "Nokuthula Khumalo",
    role: "Corporate Event Director",
    company: "Standard Bank Group",
    comment: "We hosted our executive end-of-quarter celebration at BSS inside The Boma Café. The staff, food platters, and private VIP lounge exceeded all expectations. Our clients are still talking about it!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    date: "June 2026"
  },
  {
    id: "t-3",
    name: "Brandon Sterling",
    role: "Billiards Enthusiast & SA 8-Ball Player",
    comment: "Finally, a pool venue in Sandton that respects the game. The Hainsworth cloth, 50mm Italian slate, and shadowless canopy lighting are tournament standard. Basil has built a masterpiece.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    date: "May 2026"
  }
];

export const FAQS = [
  {
    question: "Where exactly is Basil's Billiards Supplier (BSS) located?",
    answer: "BSS is situated inside The Boma Café, located in Paulshof, Sandton, Johannesburg. We have ample secure parking with 24/7 security guards on site."
  },
  {
    question: "Do I need to book a billiards table in advance?",
    answer: "While walk-ins are welcome subject to table availability, we highly recommend booking in advance—especially for Thursday tournament nights, Friday and Saturday evenings, and live sports screening match days."
  },
  {
    question: "Is there a dress code at BSS?",
    answer: "We maintain a Smart Casual / Modern Executive dress code after 18:00. Neat denim, collared shirts, and stylish footwear are encouraged. No athletic shorts, beachwear, or flip-flops permitted in the main lounge after dark."
  },
  {
    question: "Can I order food and drinks directly to my pool table?",
    answer: "Absolutely! Every table features a perimeter service rail and dedicated waitrons. You can enjoy full restaurant dining, craft cocktails, and beer right at your table side."
  },
  {
    question: "How do I enter the Thursday 'King of Pool' Tournament?",
    answer: "You can register online using our booking engine or call 084 574 8577. Entry fee is R150 per player with registration starting at 18:30 and first break at 19:00 SAST."
  },
  {
    question: "Can BSS be hired for private corporate events or birthday parties?",
    answer: "Yes! We offer full venue buyouts, private VIP suite bookings, custom catering menus, and structured corporate tournament packages. Contact us via WhatsApp or phone 084 574 8577 for bespoke proposals."
  }
];
