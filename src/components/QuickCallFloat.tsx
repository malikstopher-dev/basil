import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { VENUE_INFO } from '../data/billiardsData';

interface QuickCallFloatProps {
  onOpenBooking: () => void;
}

export const QuickCallFloat: React.FC<QuickCallFloatProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
      <div className="p-2 rounded-2xl bg-[#0a100d]/95 backdrop-blur-md border border-amber-500/40 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#121c16] border border-emerald-800/60 text-amber-300 text-xs font-bold flex items-center justify-center space-x-1.5"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call 084 574 8577</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Table</span>
        </button>
      </div>
    </div>
  );
};
