import React from 'react';
import { EVENTS, SPORTS_SCHEDULE } from '../data/billiardsData';
import { Award, Trophy, Calendar, Tv, Users, Flame, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { KingOfPoolCalendar } from './KingOfPoolCalendar';

interface EventsSectionProps {
  onOpenBooking: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="events" className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Tournaments & Nightlife
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Events & <span className="italic text-[#b29762]">Live Sports</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Join Sandton's elite 8-Ball players every Thursday night or catch every Springbok rugby and Premier League match on our 4K OLED screens.
          </p>
        </div>

        {/* Interactive 'King of Pool' Thursday Event Calendar & Brackets */}
        <KingOfPoolCalendar onOpenBooking={onOpenBooking} />

        {/* Featured Tournaments Grid with 3D Card Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <Card3DTilt key={event.id} maxRotation={10}>
              <div
                className="group bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl h-full"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {event.tag}
                    </div>

                    {event.prizePool && (
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#0a0a0a] border border-[#b29762] text-[#b29762] font-mono font-bold text-xs shadow-lg">
                        {event.prizePool}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif italic text-xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-xs text-[#b29762] font-medium uppercase tracking-wider">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.time}</span>
                      </span>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 bg-[#b29762] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Reserve Table / Enter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Live Sports Broadcast Banner */}
        <div className="bg-[#121212] border border-[#b29762]/30 p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 border border-[#b29762] text-[#b29762]">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif italic text-2xl font-normal text-white">
                  Live Sports Screening Lounge
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Broadcasted in 4K Surround Sound across all major lounge screens.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-[#b29762] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all shrink-0"
            >
              Reserve Matchday Table
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SPORTS_SCHEDULE.map((sp) => (
              <div
                key={sp.id}
                className="p-4 bg-[#0a0a0a] border border-white/10 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#b29762] uppercase tracking-widest block">
                    {sp.league}
                  </span>
                  <h4 className="text-white text-sm font-medium truncate max-w-[200px]">
                    {sp.teams}
                  </h4>
                  <p className="text-white/40 text-xs">{sp.date}</p>
                </div>

                {sp.isHot && (
                  <span className="px-2.5 py-1 border border-[#b29762] text-[#b29762] text-[9px] font-bold uppercase tracking-widest">
                    HOT MATCH
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
