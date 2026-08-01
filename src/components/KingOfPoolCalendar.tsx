import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Trophy,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  UserCheck,
  Zap,
  Flame,
  X,
  Share2,
  Check,
  ChevronLeft,
  Search,
  Target
} from 'lucide-react';

interface BracketMatch {
  id: string;
  round: 'round1' | 'quarter' | 'semi' | 'final';
  player1: { name: string; seed: number; rank: string; score?: number; isWinner?: boolean };
  player2: { name: string; seed: number; rank: string; score?: number; isWinner?: boolean };
  table: string;
  time: string;
  status: 'completed' | 'live' | 'upcoming' | 'open_spot';
}

interface ThursdayEvent {
  id: string;
  dateStr: string;
  fullDate: string;
  title: string;
  subtitle: string;
  prizePool: string;
  spotsTotal: number;
  spotsFilled: number;
  status: 'filling_fast' | 'open' | 'high_stakes' | 'championship';
  bracket: BracketMatch[];
}

const THURSDAY_EVENTS: ThursdayEvent[] = [
  {
    id: 'kop-aug-06',
    dateStr: 'AUG 06',
    fullDate: 'Thursday, August 6, 2026',
    title: 'Season 12 Opener: The Gold Crown Clash',
    subtitle: 'Standard WPA 8-Ball Singles • Race to 5',
    prizePool: 'R15,000 + Custom Cue',
    spotsTotal: 32,
    spotsFilled: 28,
    status: 'filling_fast',
    bracket: [
      {
        id: 'm1',
        round: 'quarter',
        player1: { name: 'Thabo "The Falcon" Mkoena', seed: 1, rank: 'Defending Champ', score: 5, isWinner: true },
        player2: { name: 'Pieter van der Merwe', seed: 8, rank: 'Sandton Seed #8', score: 3 },
        table: 'Table 1 (Championship Honed Slate)',
        time: '19:00 SAST',
        status: 'completed'
      },
      {
        id: 'm2',
        round: 'quarter',
        player1: { name: 'Marcus "Spin Doctor" Vance', seed: 4, rank: 'Joburg Masters #4', score: 5, isWinner: true },
        player2: { name: 'Sipho Ndlovu', seed: 5, rank: 'Paulshof Regular', score: 4 },
        table: 'Table 2 (Hainsworth Match Worsted)',
        time: '19:45 SAST',
        status: 'completed'
      },
      {
        id: 'm3',
        round: 'quarter',
        player1: { name: 'David "Ghost Ball" Ross', seed: 2, rank: 'Gauteng Top 5', score: 2 },
        player2: { name: 'Kabelo "Speedy" Zulu', seed: 7, rank: 'Rising Star', score: 5, isWinner: true },
        table: 'Table 3 (English 8-Ball Felt)',
        time: '20:30 SAST',
        status: 'completed'
      },
      {
        id: 'm4',
        round: 'quarter',
        player1: { name: 'Jacques Du Preez', seed: 3, rank: 'BSS Club Pro', score: 5, isWinner: true },
        player2: { name: 'YOU (RSVP Open)', seed: 6, rank: 'Challenger Slot', score: 0 },
        table: 'Table 4 (VIP Lounge Suite)',
        time: '21:15 SAST',
        status: 'open_spot'
      },
      {
        id: 'm5',
        round: 'semi',
        player1: { name: 'Thabo "The Falcon" Mkoena', seed: 1, rank: 'Defending Champ', score: 5, isWinner: true },
        player2: { name: 'Marcus "Spin Doctor" Vance', seed: 4, rank: 'Joburg Masters #4', score: 3 },
        table: 'Table 1 (Center Arena)',
        time: '22:00 SAST',
        status: 'completed'
      },
      {
        id: 'm6',
        round: 'semi',
        player1: { name: 'Kabelo "Speedy" Zulu', seed: 7, rank: 'Rising Star' },
        player2: { name: 'Jacques Du Preez', seed: 3, rank: 'BSS Club Pro' },
        table: 'Table 2 (Center Arena)',
        time: '22:45 SAST',
        status: 'live'
      },
      {
        id: 'm7',
        round: 'final',
        player1: { name: 'Thabo "The Falcon" Mkoena', seed: 1, rank: 'Defending Champ' },
        player2: { name: 'TBD (Winner Match 6)', seed: 0, rank: 'Finalist' },
        table: 'Table 1 (Championship Main Stage)',
        time: '23:30 SAST',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'kop-aug-13',
    dateStr: 'AUG 13',
    fullDate: 'Thursday, August 13, 2026',
    title: 'Speed 8-Ball Blitz Tournament',
    subtitle: '30-Second Shot Clock • Express Elimination',
    prizePool: 'R10,000 Cash',
    spotsTotal: 32,
    spotsFilled: 19,
    status: 'open',
    bracket: [
      {
        id: 'm13-1',
        round: 'quarter',
        player1: { name: 'Gareth "Bullet" Smith', seed: 1, rank: 'Speed Specialist' },
        player2: { name: 'Lethabo Dlamini', seed: 8, rank: 'Paulshof Qualifier' },
        table: 'Table 1',
        time: '19:00 SAST',
        status: 'upcoming'
      },
      {
        id: 'm13-2',
        round: 'quarter',
        player1: { name: 'Riaan Botha', seed: 4, rank: 'Club Player' },
        player2: { name: 'YOUR NAME (RSVP)', seed: 5, rank: 'Open Contender Slot' },
        table: 'Table 2',
        time: '19:30 SAST',
        status: 'open_spot'
      },
      {
        id: 'm13-3',
        round: 'semi',
        player1: { name: 'TBD (Match 1 Winner)', seed: 0, rank: 'Semi Finalist' },
        player2: { name: 'TBD (Match 2 Winner)', seed: 0, rank: 'Semi Finalist' },
        table: 'Table 1',
        time: '21:00 SAST',
        status: 'upcoming'
      },
      {
        id: 'm13-4',
        round: 'final',
        player1: { name: 'TBD', seed: 0, rank: 'Finalist' },
        player2: { name: 'TBD', seed: 0, rank: 'Finalist' },
        table: 'Main Arena Table',
        time: '22:15 SAST',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'kop-aug-20',
    dateStr: 'AUG 20',
    fullDate: 'Thursday, August 20, 2026',
    title: 'Doubles Masters Scotch-Doubles Clash',
    subtitle: '2-Player Alternate Shot • Trophy & Ring Championship',
    prizePool: 'R20,000 Dual Purse',
    spotsTotal: 16,
    spotsFilled: 11,
    status: 'open',
    bracket: [
      {
        id: 'm20-1',
        round: 'quarter',
        player1: { name: 'Duo: Mkoena & Vance', seed: 1, rank: 'Seed #1 Team' },
        player2: { name: 'Duo: Botha & Ross', seed: 4, rank: 'Seed #4 Team' },
        table: 'Table 1',
        time: '19:30 SAST',
        status: 'upcoming'
      },
      {
        id: 'm20-2',
        round: 'quarter',
        player1: { name: 'Duo: Zulu & Dlamini', seed: 2, rank: 'Seed #2 Team' },
        player2: { name: 'YOUR DUO (RSVP Open)', seed: 3, rank: 'Open Challenger' },
        table: 'Table 2',
        time: '20:15 SAST',
        status: 'open_spot'
      },
      {
        id: 'm20-3',
        round: 'final',
        player1: { name: 'TBD', seed: 0, rank: 'Finalist Team 1' },
        player2: { name: 'TBD', seed: 0, rank: 'Finalist Team 2' },
        table: 'VIP Suite Table 1',
        time: '22:00 SAST',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'kop-aug-27',
    dateStr: 'AUG 27',
    fullDate: 'Thursday, August 27, 2026',
    title: 'August Grand Monthly Championship Final',
    subtitle: 'Top 16 Qualified Masters + 2 Wildcard Seeds',
    prizePool: 'R35,000 + Diamond Cue Trophy',
    spotsTotal: 16,
    spotsFilled: 14,
    status: 'high_stakes',
    bracket: [
      {
        id: 'm27-1',
        round: 'semi',
        player1: { name: 'Thabo Mkoena', seed: 1, rank: 'Aug Rank #1' },
        player2: { name: 'David Ross', seed: 4, rank: 'Aug Rank #4' },
        table: 'Table 1',
        time: '20:00 SAST',
        status: 'upcoming'
      },
      {
        id: 'm27-2',
        round: 'semi',
        player1: { name: 'Jacques Du Preez', seed: 2, rank: 'Aug Rank #2' },
        player2: { name: 'Wildcard Winner (RSVP)', seed: 3, rank: 'Wildcard Qualifier' },
        table: 'Table 2',
        time: '20:45 SAST',
        status: 'open_spot'
      },
      {
        id: 'm27-3',
        round: 'final',
        player1: { name: 'TBD', seed: 0, rank: 'August Champion' },
        player2: { name: 'TBD', seed: 0, rank: 'August Runner-Up' },
        table: 'Championship Main Stage',
        time: '22:30 SAST',
        status: 'upcoming'
      }
    ]
  }
];

export const KingOfPoolCalendar: React.FC<{ onOpenBooking?: () => void }> = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(THURSDAY_EVENTS[0].id);
  const [selectedMatch, setSelectedMatch] = useState<BracketMatch | null>(null);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [rsvpType, setRsvpType] = useState<'player' | 'spectator'>('player');

  // RSVP Form State
  const [playerName, setPlayerName] = useState('');
  const [playerHandle, setPlayerHandle] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate / Regular');
  const [rsvpConfirmedTicket, setRsvpConfirmedTicket] = useState<{
    id: string;
    name: string;
    eventDate: string;
    eventTitle: string;
    type: 'player' | 'spectator';
  } | null>(null);

  const activeEvent = THURSDAY_EVENTS.find((e) => e.id === selectedEventId) || THURSDAY_EVENTS[0];

  const handleOpenRsvp = (type: 'player' | 'spectator' = 'player') => {
    setRsvpType(type);
    setIsRsvpModalOpen(true);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !phone) return;

    const ticketId = `KOP-${Math.floor(100000 + Math.random() * 900000)}`;
    setRsvpConfirmedTicket({
      id: ticketId,
      name: playerName,
      eventDate: activeEvent.fullDate,
      eventTitle: activeEvent.title,
      type: rsvpType
    });
  };

  return (
    <div className="bg-[#0e0e0e] border border-[#b29762]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Top Gold Lighting Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b29762] to-transparent" />

      {/* Header & Badging */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-[#181818] border border-[#b29762]/50 text-[#b29762]">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#b29762] block">
                Official Thursday Night Championship
              </span>
              <h3 className="font-serif italic text-2xl sm:text-4xl text-white font-normal">
                King of Pool <span className="not-italic text-[#b29762] font-semibold">Event Calendar & Brackets</span>
              </h3>
            </div>
          </div>
          <p className="text-white/60 text-xs sm:text-sm max-w-2xl pl-1">
            Every Thursday from 19:00 at BSS Sandton (Inside The Boma Café). Watch real-time elimination brackets, track top local seeds, or claim an open contender slot.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleOpenRsvp('spectator')}
            className="px-4 py-3 bg-[#181818] border border-white/20 text-white hover:border-[#b29762] hover:text-[#b29762] text-[11px] font-bold uppercase tracking-widest transition-all flex items-center space-x-2"
          >
            <Users className="w-4 h-4 text-[#b29762]" />
            <span>Spectator VIP Pass</span>
          </button>

          <button
            onClick={() => handleOpenRsvp('player')}
            className="px-6 py-3 bg-[#b29762] text-black hover:bg-white font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center space-x-2"
          >
            <Trophy className="w-4 h-4" />
            <span>RSVP As Player (R150)</span>
          </button>
        </div>
      </div>

      {/* Thursday Dates Interactive Selector */}
      <div className="space-y-3">
        <span className="text-[9px] uppercase tracking-widest font-bold text-white/40 block">
          Select Thursday Tournament Date:
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {THURSDAY_EVENTS.map((event) => {
            const isSelected = event.id === activeEvent.id;
            return (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEventId(event.id);
                  setSelectedMatch(null);
                }}
                className={`p-4 text-left border transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#181818] border-[#b29762] shadow-[0_0_20px_rgba(178,151,98,0.25)]'
                    : 'bg-[#101010] border-white/10 hover:border-white/30 hover:bg-[#141414]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#b29762] transform translate-x-1.5 -translate-y-1.5 rotate-45" />
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#b29762] uppercase tracking-wider">
                    {event.dateStr}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 text-[8px] font-mono uppercase font-bold ${
                      event.status === 'filling_fast'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : event.status === 'high_stakes'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {event.spotsTotal - event.spotsFilled} Left
                  </span>
                </div>

                <div className="font-serif italic text-white text-base mt-1 line-clamp-1">
                  {event.title.split(':')[0]}
                </div>

                <div className="text-[10px] text-white/50 mt-1 font-mono flex items-center justify-between">
                  <span>Purse: {event.prizePool.split(' ')[0]}</span>
                  <span className="text-[#b29762] font-semibold">{event.spotsFilled}/{event.spotsTotal} Players</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Thursday Event Summary Banner */}
      <div className="p-5 bg-[#141414] border border-[#b29762]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="text-white font-serif italic text-xl sm:text-2xl">
              {activeEvent.title}
            </span>
            <span className="px-2 py-0.5 bg-[#b29762]/20 border border-[#b29762] text-[#b29762] text-[9px] font-mono font-bold">
              {activeEvent.prizePool}
            </span>
          </div>
          <p className="text-white/60 text-xs flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#b29762]" />
            <span>{activeEvent.fullDate} • Matches Start at 19:00 SAST</span>
            <span>•</span>
            <span className="text-[#b29762] font-semibold">{activeEvent.subtitle}</span>
          </p>
        </div>

        <button
          onClick={() => handleOpenRsvp('player')}
          className="px-5 py-2.5 bg-[#b29762] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center space-x-2 shrink-0"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Claim Bracket Seat</span>
        </button>
      </div>

      {/* Visual Tournament Bracket Viewer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#b29762]">
            <Target className="w-4 h-4 text-[#b29762]" />
            <span>Interactive 16-Player Elimination Bracket</span>
          </div>
          <span className="text-[10px] text-white/40 font-mono">
            Click any match for details or open seed RSVP
          </span>
        </div>

        {/* Bracket Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-2">
          {/* Column 1: Quarterfinals */}
          <div className="space-y-3">
            <div className="text-center p-2 bg-[#121212] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#b29762]">
              Quarterfinals (Race to 5)
            </div>

            <div className="space-y-3">
              {activeEvent.bracket
                .filter((m) => m.round === 'quarter')
                .map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`p-3 bg-[#121212] border transition-all cursor-pointer relative space-y-2 ${
                      selectedMatch?.id === match.id
                        ? 'border-[#b29762] bg-[#1a1a1a] shadow-[0_0_15px_rgba(178,151,98,0.2)]'
                        : match.status === 'open_spot'
                        ? 'border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/5'
                        : 'border-white/10 hover:border-white/30 hover:bg-[#161616]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono text-white/40 border-b border-white/10 pb-1">
                      <span>{match.time}</span>
                      <span className="text-[#b29762] font-semibold">{match.table.split(' ')[0]} {match.table.split(' ')[1]}</span>
                    </div>

                    {/* Player 1 */}
                    <div
                      className={`flex items-center justify-between p-1.5 text-xs font-medium ${
                        match.player1.isWinner
                          ? 'bg-[#b29762]/20 border-l-2 border-[#b29762] text-white font-bold'
                          : 'text-white/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="text-[9px] font-mono text-white/40">#{match.player1.seed}</span>
                        <span className="truncate">{match.player1.name}</span>
                      </div>
                      {match.player1.score !== undefined && (
                        <span className="font-mono font-bold text-sm text-[#b29762]">
                          {match.player1.score}
                        </span>
                      )}
                    </div>

                    {/* Player 2 */}
                    <div
                      className={`flex items-center justify-between p-1.5 text-xs font-medium ${
                        match.player2.isWinner
                          ? 'bg-[#b29762]/20 border-l-2 border-[#b29762] text-white font-bold'
                          : match.status === 'open_spot'
                          ? 'text-amber-400 font-bold animate-pulse'
                          : 'text-white/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="text-[9px] font-mono text-white/40">#{match.player2.seed}</span>
                        <span className="truncate">{match.player2.name}</span>
                      </div>
                      {match.player2.score !== undefined ? (
                        <span className="font-mono font-bold text-sm text-[#b29762]">
                          {match.player2.score}
                        </span>
                      ) : match.status === 'open_spot' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenRsvp('player');
                          }}
                          className="px-2 py-0.5 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-wider hover:bg-white"
                        >
                          RSVP
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: Semifinals */}
          <div className="space-y-3">
            <div className="text-center p-2 bg-[#121212] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#b29762]">
              Semifinals (Race to 7)
            </div>

            <div className="space-y-3 my-auto pt-4 md:pt-8">
              {activeEvent.bracket
                .filter((m) => m.round === 'semi')
                .map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`p-3 bg-[#121212] border transition-all cursor-pointer space-y-2 ${
                      selectedMatch?.id === match.id
                        ? 'border-[#b29762] bg-[#1a1a1a]'
                        : match.status === 'live'
                        ? 'border-emerald-500/60 bg-emerald-500/5'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono text-white/40 border-b border-white/10 pb-1">
                      <span>{match.time}</span>
                      {match.status === 'live' && (
                        <span className="px-1.5 py-0.2 bg-emerald-500 text-black font-bold uppercase text-[8px] animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-1.5 text-xs text-white/80">
                      <span className="truncate font-medium">{match.player1.name}</span>
                      {match.player1.score !== undefined && (
                        <span className="font-mono font-bold text-[#b29762]">{match.player1.score}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-1.5 text-xs text-white/80">
                      <span className="truncate font-medium">{match.player2.name}</span>
                      {match.player2.score !== undefined && (
                        <span className="font-mono font-bold text-[#b29762]">{match.player2.score}</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 3: Championship Final */}
          <div className="space-y-3">
            <div className="text-center p-2 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest">
              Championship Crown Final (Race to 9)
            </div>

            <div className="my-auto pt-6 md:pt-16">
              {activeEvent.bracket
                .filter((m) => m.round === 'final')
                .map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className="p-4 bg-[#181818] border-2 border-[#b29762] shadow-[0_0_30px_rgba(178,151,98,0.3)] space-y-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between border-b border-[#b29762]/40 pb-2">
                      <span className="text-[10px] font-mono text-[#b29762] font-bold uppercase">
                        {match.time} • Grand Stage
                      </span>
                      <Trophy className="w-4 h-4 text-[#b29762]" />
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 bg-[#0a0a0a] border border-white/10 text-white font-serif italic text-base flex justify-between items-center">
                        <span>{match.player1.name}</span>
                        <span className="text-xs text-[#b29762] font-mono not-italic font-bold">SEED 1</span>
                      </div>
                      <div className="text-center text-[10px] uppercase tracking-widest font-mono text-white/40">VS</div>
                      <div className="p-2 bg-[#0a0a0a] border border-white/10 text-white font-serif italic text-base flex justify-between items-center">
                        <span>{match.player2.name}</span>
                        <span className="text-xs text-white/40 font-mono not-italic font-bold">TBD</span>
                      </div>
                    </div>

                    <div className="text-center pt-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#b29762] font-bold block">
                        Winner Crowned King of Pool
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match Details Drawer/Overlay when clicked */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 bg-[#141414] border border-[#b29762] relative space-y-3"
          >
            <button
              onClick={() => setSelectedMatch(null)}
              className="absolute top-3 right-3 text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#b29762]">
              <Sparkles className="w-4 h-4 text-[#b29762]" />
              <span>Match Inspection • {selectedMatch.table}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#0a0a0a] border border-white/10 space-y-1">
                <span className="text-white/40 text-[9px] uppercase font-bold block">Contender 1</span>
                <p className="text-white font-bold text-sm font-serif">{selectedMatch.player1.name}</p>
                <p className="text-[#b29762] font-mono text-[10px]">{selectedMatch.player1.rank}</p>
              </div>

              <div className="p-3 bg-[#0a0a0a] border border-white/10 space-y-1">
                <span className="text-white/40 text-[9px] uppercase font-bold block">Contender 2</span>
                <p className="text-white font-bold text-sm font-serif">{selectedMatch.player2.name}</p>
                <p className="text-[#b29762] font-mono text-[10px]">{selectedMatch.player2.rank}</p>
              </div>
            </div>

            {selectedMatch.status === 'open_spot' && (
              <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/50">
                <span className="text-amber-300 text-xs font-semibold">
                  This seed is currently unallocated! You can register as the contender.
                </span>
                <button
                  onClick={() => handleOpenRsvp('player')}
                  className="px-4 py-2 bg-amber-500 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Claim Seed Slot
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct RSVP Modal */}
      <AnimatePresence>
        {isRsvpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border-2 border-[#b29762] shadow-[0_0_50px_rgba(178,151,98,0.3)] p-6 sm:p-8 space-y-6 my-auto"
            >
              {/* Close Modal Button */}
              <button
                onClick={() => {
                  setIsRsvpModalOpen(false);
                  setRsvpConfirmedTicket(null);
                }}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {!rsvpConfirmedTicket ? (
                /* RSVP Form */
                <form onSubmit={handleRsvpSubmit} className="space-y-5">
                  <div className="space-y-1 pr-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#b29762] block">
                      Thursday Night RSVP Portal
                    </span>
                    <h3 className="font-serif italic text-2xl text-white">
                      {activeEvent.title}
                    </h3>
                    <p className="text-white/60 text-xs">
                      {activeEvent.fullDate} • Paulshof, Sandton
                    </p>
                  </div>

                  {/* Toggle RSVP Type */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#141414] border border-white/10">
                    <button
                      type="button"
                      onClick={() => setRsvpType('player')}
                      className={`py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        rsvpType === 'player'
                          ? 'bg-[#b29762] text-black shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Tournament Contender (R150)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpType('spectator')}
                      className={`py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        rsvpType === 'spectator'
                          ? 'bg-[#b29762] text-black shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Spectator VIP Pass (Free)
                    </button>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#b29762] block mb-1">
                        Full Name / Player Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="e.g. Thabo 'The Falcon' Mkoena"
                        className="w-full bg-[#121212] border border-white/20 text-white px-4 py-2.5 text-xs focus:outline-none focus:border-[#b29762]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#b29762] block mb-1">
                          Phone Number (For SMS Bracket Updates) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 084 574 8577"
                          className="w-full bg-[#121212] border border-white/20 text-white px-4 py-2.5 text-xs focus:outline-none focus:border-[#b29762]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#b29762] block mb-1">
                          Skill Tier
                        </label>
                        <select
                          value={skillLevel}
                          onChange={(e) => setSkillLevel(e.target.value)}
                          className="w-full bg-[#121212] border border-white/20 text-white px-4 py-2.5 text-xs focus:outline-none focus:border-[#b29762]"
                        >
                          <option value="Novice">Novice / Social Player</option>
                          <option value="Intermediate">Intermediate / Regular</option>
                          <option value="Club Competitor">Club Competitor</option>
                          <option value="BSS Master">BSS Master Grandmaster</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Perks Summary */}
                  <div className="p-3 bg-[#141414] border border-white/10 text-[10px] text-white/70 space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#b29762] font-bold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rsvpType === 'player' ? 'Contender Entry Includes:' : 'Spectator Pass Includes:'}</span>
                    </div>
                    <p>
                      {rsvpType === 'player'
                        ? 'Guaranteed single-elimination seed match, complimentary welcome craft cocktail, and WPA points registration.'
                        : 'Reserved arena bar seating, access to live broadcast audio, and complimentary gourmet snack bowl.'}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#b29762] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Thursday RSVP</span>
                  </button>
                </form>
              ) : (
                /* Confirmed Digital RSVP Pass Card */
                <div className="space-y-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#b29762]/20 border border-[#b29762] text-[#b29762] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-[#b29762]">
                      RSVP CONFIRMED #{rsvpConfirmedTicket.id}
                    </span>
                    <h3 className="font-serif italic text-2xl text-white">
                      Welcome to the Arena, {rsvpConfirmedTicket.name}!
                    </h3>
                    <p className="text-white/60 text-xs max-w-sm mx-auto">
                      Your spot for <strong className="text-white">{rsvpConfirmedTicket.eventTitle}</strong> on {rsvpConfirmedTicket.eventDate} is locked in.
                    </p>
                  </div>

                  {/* Ticket Badge Card */}
                  <div className="p-5 bg-[#141414] border-2 border-[#b29762] space-y-3 text-left relative">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 text-[10px] font-mono">
                      <span className="text-white/50 uppercase">PASS TYPE:</span>
                      <span className="text-[#b29762] font-bold uppercase">
                        {rsvpConfirmedTicket.type === 'player' ? 'TOURNAMENT PLAYER PASS' : 'VIP SPECTATOR PASS'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-white/40 block uppercase">VENUE LOCATION</span>
                      <p className="text-white text-xs font-semibold">
                        Inside The Boma Café, Paulshof, Sandton
                      </p>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[9px] text-white/40 block uppercase">MATCHDAY CHECK-IN TIME</span>
                      <p className="text-[#b29762] font-mono text-xs font-bold">
                        Thursday @ 18:30 SAST (Player Briefing)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsRsvpModalOpen(false);
                      setRsvpConfirmedTicket(null);
                    }}
                    className="w-full py-3 bg-[#b29762] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Done & Return to Calendar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
