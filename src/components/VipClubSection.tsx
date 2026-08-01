import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Crown, CheckCircle2, Sparkles, Trophy, Wine, ShieldCheck, Zap, Star, Shield, Award, ChevronRight, Clock, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberTier {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  glowColor: string;
  borderColor: string;
  isPopular?: boolean;
  benefits: {
    title: string;
    description: string;
    highlighted?: boolean;
  }[];
  accentIcon: typeof Crown;
  bgImage: string;
}

export const VipClubSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<string>('gold');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Tournaments & Competitions',
    'VIP Tasting Events'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const memberTiers: MemberTier[] = [
    {
      id: 'silver',
      name: 'Silver Cue Member',
      subtitle: 'Lounge Enthusiast',
      badge: 'Entry Tier',
      glowColor: 'rgba(192, 192, 192, 0.3)',
      borderColor: 'border-white/20',
      benefits: [
        { title: 'Standard Table Reservations', description: 'Advance booking up to 48h prior' },
        { title: '10% Steakhouse Discount', description: 'Valid for weekday lunch & dinner' },
        { title: 'Weekly Tournament Bulletins', description: 'Early access to bracket registration' },
        { title: 'Complimentary Cue Waxing', description: 'Monthly precision cue check-up' }
      ],
      accentIcon: Shield,
      bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'gold',
      name: 'Gold Slate Executive',
      subtitle: 'Most Preferred Choice',
      badge: 'Most Popular',
      glowColor: 'rgba(178, 151, 98, 0.6)',
      borderColor: 'border-[#b29762]',
      isPopular: true,
      benefits: [
        { title: 'Priority Table Booking', description: 'Guaranteed prime evening table slots', highlighted: true },
        { title: 'Private Queue Access', description: 'Bypass general waiting lists on peak nights', highlighted: true },
        { title: '15% Off Dining & Rare Whiskies', description: 'Applies across all food & bar tabs' },
        { title: 'VIP Tasting Invitations', description: 'Quarterly single-malt & wine events' }
      ],
      accentIcon: Star,
      bgImage: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'platinum',
      name: 'Platinum Sovereign',
      subtitle: 'Ultimate Executive Suite',
      badge: 'By Invitation',
      glowColor: 'rgba(230, 200, 120, 0.8)',
      borderColor: 'border-[#e6c878]',
      benefits: [
        { title: 'Instant Peak Priority Access', description: 'Zero waiting time for table allocation', highlighted: true },
        { title: 'Private Queue & VIP Suite Lockout', description: 'Exclusive entry to Private Chesterfield Lounges', highlighted: true },
        { title: 'Personalized Cue Locker & Bottle Keep', description: 'Climate-controlled storage at Sandton', highlighted: true },
        { title: 'Private Masterclass Invitations', description: 'Direct instruction with national cue masters' }
      ],
      accentIcon: Crown,
      bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const interestOptions = [
    { id: 'Tournaments & Competitions', label: '8-Ball Tournaments', icon: Trophy },
    { id: 'VIP Tasting Events', label: 'Whisky & Culinary Tastings', icon: Wine },
    { id: 'Exclusive Table Perks', label: 'Priority Table Booking', icon: Crown },
  ];

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#b29762', '#ffffff', '#121212']
      });
    }, 600);
  };

  return (
    <section id="vip-club" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/10 select-none">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]" />
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              <Crown className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Membership Privileges</span>
            </div>
            <div className="w-8 h-[1px] bg-[#b29762]" />
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            BSS <span className="italic text-[#b29762]">Member Tiers</span> & Privileges
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Experience elevated priority, private queue bypass, and executive table privileges tailored for billiards connoisseurs at Sandton's finest lounge.
          </p>
        </div>

        {/* Member Tiers Glowing Interactive Visualization Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {memberTiers.map((tier) => {
            const Icon = tier.accentIcon;
            const isSelected = activeTier === tier.id;

            return (
              <motion.div
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`relative cursor-pointer flex flex-col justify-between p-8 bg-[#121212] border ${
                  tier.borderColor
                } transition-all duration-300 overflow-hidden ${
                  tier.isPopular ? 'shadow-[0_0_35px_rgba(178,151,98,0.25)]' : 'shadow-xl'
                }`}
              >
                {/* Glowing Card Ambient Animated Aura */}
                <motion.div
                  animate={{
                    opacity: isSelected || tier.isPopular ? [0.4, 0.8, 0.4] : 0.2,
                    boxShadow: isSelected
                      ? `0 0 45px ${tier.glowColor}`
                      : tier.isPopular
                      ? '0 0 30px rgba(178,151,98,0.3)'
                      : '0 0 0px transparent',
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute inset-0 pointer-events-none rounded-none"
                />

                {/* Card Background Picture Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <img
                    src={tier.bgImage}
                    alt={tier.name}
                    className="w-full h-full object-cover opacity-15 filter brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-[#121212]/95" />
                </div>

                {/* Glowing Top Border Highlight Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 z-10 ${
                    isSelected ? 'bg-[#b29762] shadow-[0_0_15px_#b29762]' : 'bg-white/10'
                  }`}
                />

                <div className="relative z-10 space-y-6">
                  {/* Tier Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#b29762]/40 text-[#b29762] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${
                        tier.isPopular
                          ? 'bg-[#b29762] text-black border-[#b29762] shadow-[0_0_12px_rgba(178,151,98,0.6)]'
                          : 'bg-black/60 text-[#b29762] border-white/20'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  {/* Tier Header Titles */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#b29762] block mb-1">
                      {tier.subtitle}
                    </span>
                    <h3 className="font-serif italic text-2xl text-white font-normal">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    {tier.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border transition-all ${
                          benefit.highlighted
                            ? 'bg-[#b29762]/10 border-[#b29762]/50 shadow-[0_0_12px_rgba(178,151,98,0.15)]'
                            : 'bg-[#0a0a0a]/60 border-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {benefit.highlighted ? (
                            <Zap className="w-3.5 h-3.5 text-[#b29762] animate-pulse flex-shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                          )}
                          <span
                            className={`text-xs font-semibold ${
                              benefit.highlighted ? 'text-[#b29762]' : 'text-white/90'
                            }`}
                          >
                            {benefit.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50 pl-5.5 mt-0.5 leading-tight">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA Button */}
                <div className="relative z-10 pt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTier(tier.id);
                      const el = document.getElementById('club-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 border ${
                      isSelected
                        ? 'bg-[#b29762] text-black border-[#b29762] shadow-[0_0_15px_rgba(178,151,98,0.4)]'
                        : 'bg-black/60 text-white/80 border-white/20 hover:border-[#b29762] hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Active Selection' : 'Select Tier'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Core Privileges Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#121212]/80 border border-white/10 flex items-start space-x-4">
            <div className="p-3 bg-[#0a0a0a] border border-[#b29762]/40 text-[#b29762]">
              <Clock className="w-5 h-5 text-[#b29762]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Priority Booking Guarantee</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Gold & Platinum members receive dedicated table allocations during peak Friday & Saturday evening hours.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#121212]/80 border border-white/10 flex items-start space-x-4">
            <div className="p-3 bg-[#0a0a0a] border border-[#b29762]/40 text-[#b29762]">
              <Zap className="w-5 h-5 text-[#b29762]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Private Queue Bypass</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Skip standard waiting queues with digital host check-in and immediate table priority status.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#121212]/80 border border-white/10 flex items-start space-x-4">
            <div className="p-3 bg-[#0a0a0a] border border-[#b29762]/40 text-[#b29762]">
              <Key className="w-5 h-5 text-[#b29762]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Custom Cue & Bottle Storage</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Climate-controlled personal lockers for custom maple cues and rare single-malt whisky keeps.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div id="club-form" className="max-w-4xl mx-auto bg-[#121212] border border-[#b29762]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Card Background Picture Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=1200"
              alt="VIP Lounge Background"
              className="w-full h-full object-cover opacity-15 filter brightness-50 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/80 to-[#121212]/95" />
          </div>

          <div className="relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-[1px] bg-[#b29762]" />
              <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                <Crown className="w-3.5 h-3.5 text-[#b29762]" />
                <span>Executive Privileges</span>
              </div>
              <div className="w-8 h-[1px] bg-[#b29762]" />
            </div>

            <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
              Join the <span className="italic text-[#b29762]">BSS Officers' Club</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Subscribe to receive private invitations to Thursday 8-Ball championships, rare single malt tastings, and priority table allocations at Sandton's premier lounge.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Interest Selector */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest text-center">
                  Select Your Preferences
                </label>
                <div className="flex flex-wrap justify-center gap-3">
                  {interestOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleInterest(opt.id)}
                        className={`px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 border transition-all ${
                          isSelected
                            ? 'bg-[#b29762] text-black border-[#b29762]'
                            : 'bg-[#0a0a0a] text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="uppercase text-[10px] tracking-wider">{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-1 fill-black text-[#b29762]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Richard Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 px-4 bg-[#0a0a0a] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. richard@sterling.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-4 pl-10 bg-[#0a0a0a] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                    />
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Processing Invitation...' : 'Subscribe to Executive Dispatch'}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center space-x-2 text-white/40 text-[10px] uppercase tracking-wider pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b29762]" />
                <span>Zero Spam • Unsubscribe Anytime • Sandton VIP Privileges</span>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-4 py-8 animate-in fade-in duration-300 max-w-lg mx-auto">
              <div className="w-14 h-14 border border-[#b29762] text-[#b29762] flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-[#b29762]" />
              </div>

              <h3 className="font-serif italic text-2xl text-white">
                Welcome to the BSS Club, {name || 'Honored Guest'}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Your email <strong className="text-[#b29762]">{email}</strong> has been registered on our executive guest list with <strong className="text-[#b29762]">{memberTiers.find(t=>t.id===activeTier)?.name}</strong> tier privileges.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                }}
                className="mt-4 px-6 py-2.5 border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-bold hover:text-white hover:border-white"
              >
                Register Another Email
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

