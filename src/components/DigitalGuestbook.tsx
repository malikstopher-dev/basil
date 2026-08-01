import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Sparkles, RefreshCw, CheckCircle2, ShieldCheck, Crown, Award, BookOpen, User, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card3DTilt } from './Card3DTilt';

interface SignatureEntry {
  id: string;
  name: string;
  title: string;
  date: string;
  message: string;
  signatureDataUrl?: string;
  badge: 'Platinum' | 'Gold' | 'VIP Guest' | 'Champion';
}

export const DigitalGuestbook: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [memberTitle, setMemberTitle] = useState('Gold Slate Executive');
  const [badgeType, setBadgeType] = useState<'Platinum' | 'Gold' | 'VIP Guest' | 'Champion'>('Gold');
  const [message, setMessage] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const [entries, setEntries] = useState<SignatureEntry[]>([
    {
      id: '1',
      name: 'Basil Peterson',
      title: 'Founder & Head Craftsman',
      date: 'Aug 2024',
      message: 'Built on precision, preserved in tradition. Welcome to Sandton’s finest cue lounge.',
      badge: 'Platinum',
    },
    {
      id: '2',
      name: 'Marcus Vance',
      title: 'Championship 8-Ball Master',
      date: 'Oct 2024',
      message: 'The slate level here is unmatched anywhere in South Africa. Pure perfection on every shot.',
      badge: 'Champion',
    },
    {
      id: '3',
      name: 'Lady Eleanor Sterling',
      title: 'Executive Club Member',
      date: 'Jan 2025',
      message: 'An exquisite evening of rare single malts and flame-grilled Wagyu. Always a pleasure.',
      badge: 'Gold',
    },
    {
      id: '4',
      name: 'Jonathan Drake',
      title: 'Sovereign VIP Patron',
      date: 'May 2025',
      message: 'The private Chesterfield suite and gold cue lockers set a new standard for luxury.',
      badge: 'Platinum',
    },
  ]);

  // Setup Canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Initial canvas setup
    clearCanvas();
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastPointRef.current = coords;
    setIsSigning(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPoint = getCanvasCoords(e);

    // Gold Ink Styling
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Create Metallic Gold Metallic Gradient stroke
    const gradient = ctx.createLinearGradient(
      lastPointRef.current.x,
      lastPointRef.current.y,
      currentPoint.x,
      currentPoint.y
    );
    gradient.addColorStop(0, '#8a7243');
    gradient.addColorStop(0.5, '#b29762');
    gradient.addColorStop(1, '#f0d486');

    ctx.strokeStyle = gradient;
    ctx.shadowColor = 'rgba(230, 200, 120, 0.6)';
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    lastPointRef.current = currentPoint;
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    setIsSigning(false);
  };

  const handleSubmitSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const canvas = canvasRef.current;
    const signatureDataUrl = canvas ? canvas.toDataURL() : undefined;

    const newEntry: SignatureEntry = {
      id: Date.now().toString(),
      name: guestName.trim(),
      title: memberTitle.trim() || 'VIP Club Member',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      message: message.trim() || 'Honored to leave my mark in the BSS guestbook.',
      signatureDataUrl,
      badge: badgeType,
    };

    setEntries([newEntry, ...entries]);
    setIsSubmitted(true);

    // Trigger Gold Confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#b29762', '#e6c878', '#ffffff', '#8a7243'],
    });
  };

  const resetForm = () => {
    setGuestName('');
    setMessage('');
    setIsSubmitted(false);
    clearCanvas();
  };

  return (
    <section id="guestbook" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/10 select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]" />
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Digital VIP Guestbook</span>
            </div>
            <div className="w-8 h-[1px] bg-[#b29762]" />
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Leave Your Mark in <span className="italic text-[#b29762]">Gold Ink</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            An exclusive digital ledger honoring BSS members, tournament champions, and distinguished guests of Sandton's premier lounge.
          </p>
        </div>

        {/* Guestbook Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Gold Signature Board */}
          <div className="lg:col-span-6">
            <Card3DTilt maxRotation={10}>
              <div className="bg-[#121212] border border-[#b29762]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Metallic Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8a7243] via-[#b29762] to-[#f0d486]" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2.5 bg-black border border-[#b29762]/40 text-[#b29762]">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-white font-serif italic text-xl font-normal">
                          Virtual Signature Canvas
                        </h3>
                        <p className="text-[10px] uppercase tracking-wider text-white/50">
                          Gold Ink Touch & Mouse Pad
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="px-3 py-1.5 bg-black/60 border border-white/10 text-[10px] uppercase tracking-wider text-white/60 hover:text-white hover:border-[#b29762] transition-colors flex items-center space-x-1.5"
                    >
                      <RefreshCw className="w-3 h-3 text-[#b29762]" />
                      <span>Clear</span>
                    </button>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmitSignature} className="space-y-5">
                      {/* Name & Title */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g. Lord Charles Sterling"
                            className="w-full px-4 py-3 bg-black/80 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#b29762] focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1.5">
                            Title / Designation
                          </label>
                          <input
                            type="text"
                            value={memberTitle}
                            onChange={(e) => setMemberTitle(e.target.value)}
                            placeholder="e.g. Gold Executive Member"
                            className="w-full px-4 py-3 bg-black/80 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#b29762] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Badge Selection */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1.5">
                          Member Badge Level
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {(['Gold', 'Platinum', 'Champion', 'VIP Guest'] as const).map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBadgeType(b)}
                              className={`py-2 px-1 text-[9px] font-bold uppercase tracking-wider border transition-all ${
                                badgeType === b
                                  ? 'bg-[#b29762] text-black border-[#b29762] shadow-[0_0_10px_rgba(178,151,98,0.4)]'
                                  : 'bg-black/60 text-white/60 border-white/15 hover:border-[#b29762]'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Canvas Container */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
                          <span>Sign Below in Gold Ink</span>
                          <span className="text-[#b29762] flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Metallic Shimmer Active</span>
                          </span>
                        </div>

                        <div className="relative w-full h-40 bg-black border border-dashed border-[#b29762]/50 overflow-hidden cursor-crosshair group">
                          <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="w-full h-full touch-none"
                          />

                          {!hasDrawn && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/30 text-xs italic font-serif">
                              Sign your signature here using mouse or finger...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1.5">
                          Guest Message / Note
                        </label>
                        <textarea
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Share your experience at Basil's Billiards Supplier..."
                          className="w-full px-4 py-2.5 bg-black/80 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#b29762] focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center space-x-2"
                      >
                        <Sparkles className="w-4 h-4 fill-black" />
                        <span>Sign Guestbook in Gold Ink</span>
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-[#b29762]/20 border border-[#b29762] text-[#b29762] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif italic text-2xl text-white">
                        Signature Recorded in Gold Ink
                      </h4>
                      <p className="text-white/70 text-xs leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong className="text-[#b29762]">{guestName}</strong>. Your entry has been added to the official Basil's Billiards Supplier Digital Ledger.
                      </p>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2.5 border border-white/20 text-white text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
                      >
                        Sign Another Entry
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Signed VIP Entries Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-serif italic text-2xl text-white flex items-center space-x-2">
                <span>Recent Ledger Entries</span>
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-[#b29762] font-mono">
                {entries.length} Verified Signatures
              </span>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar">
              {entries.map((entry) => (
                <Card3DTilt key={entry.id} maxRotation={8}>
                  <div className="p-5 bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all shadow-lg relative overflow-hidden group">
                    {/* Gold Stroke Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#b29762]/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-serif italic text-lg text-white font-normal group-hover:text-[#b29762] transition-colors">
                            {entry.name}
                          </h4>
                          <span className="px-2 py-0.5 bg-black border border-[#b29762]/40 text-[#b29762] text-[8px] uppercase tracking-widest font-bold">
                            {entry.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/50 font-mono">
                          {entry.title} • {entry.date}
                        </p>
                      </div>

                      <div className="w-7 h-7 bg-black border border-[#b29762]/40 text-[#b29762] flex items-center justify-center rounded-full">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <p className="text-white/80 text-xs italic font-serif leading-relaxed mb-4 pl-3 border-l-2 border-[#b29762]/40">
                      "{entry.message}"
                    </p>

                    {/* Custom Signature Output Display */}
                    {entry.signatureDataUrl ? (
                      <div className="h-12 w-48 bg-black/60 border border-white/5 p-1 flex items-center justify-center">
                        <img
                          src={entry.signatureDataUrl}
                          alt={`${entry.name} signature`}
                          className="h-full object-contain filter drop-shadow-[0_0_8px_rgba(230,200,120,0.8)]"
                        />
                      </div>
                    ) : (
                      <div className="h-10 flex items-center text-[#b29762] font-serif italic text-xl tracking-wider opacity-90">
                        {entry.name}
                      </div>
                    )}
                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
