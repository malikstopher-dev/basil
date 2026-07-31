import React, { useState } from 'react';
import { Mail, Crown, CheckCircle2, Sparkles, Trophy, Wine, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VipClubSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Tournaments & Competitions',
    'VIP Tasting Events'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <section id="vip-club" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/10">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#121212] border border-[#b29762]/30 p-8 sm:p-12 shadow-2xl relative">
          
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
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-[#b29762]" style={{ fill: 'black' }} />}
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
                Your email <strong className="text-[#b29762]">{email}</strong> has been registered on our executive guest list. You will receive priority notifications for championship fixtures and private tasting evenings.
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
    </section>
  );
};
