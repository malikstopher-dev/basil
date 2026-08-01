export interface TableStats {
  slateThickness: string;
  clothGrade: string;
  cushionBounceRating: string;
  clothVelocityRating: string;
  levelingPrecision: string;
  pocketSpecs: string;
  tableDimensions: string;
  chassisFrame: string;
}

export interface BilliardTable {
  id: string;
  name: string;
  category: 'championship' | 'english' | 'vip' | 'patio';
  description: string;
  clothColor: string;
  slateThickness: string;
  lighting: string;
  capacity: string;
  hourlyRate: string;
  minSpend?: string;
  features: string[];
  imageUrl: string;
  badge?: string;
  stats?: TableStats;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'pizza' | 'wings' | 'steak' | 'platters' | 'desserts';
  description: string;
  price: string;
  priceNum: number;
  pairing?: string;
  imageUrl: string;
  isChefSpecial?: boolean;
  dietary?: string[];
}

export interface DrinkItem {
  id: string;
  name: string;
  category: 'cocktails' | 'whisky' | 'beer' | 'wine';
  description: string;
  price: string;
  origin?: string;
  abv?: string;
  tastingNotes?: string;
  imageUrl: string;
  isPopular?: boolean;
}

export interface TournamentEvent {
  id: string;
  title: string;
  tag: string;
  date: string;
  time: string;
  prizePool?: string;
  entryFee?: string;
  description: string;
  imageUrl: string;
  isWeekly?: boolean;
}

export interface SportsBroadcast {
  id: string;
  event: string;
  league: string;
  teams: string;
  date: string;
  time: string;
  sport: 'football' | 'rugby' | 'f1' | 'golf';
  isHot?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'tables' | 'lounge' | 'food' | 'cocktails' | 'events';
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface BookingFormData {
  bookingType: 'table' | 'dining' | 'vip_lounge' | 'corporate';
  tableId?: string;
  date: string;
  time: string;
  guests: number;
  durationHours: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  preOrders?: string[];
}
