import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronRight, Award, ShieldCheck, Target, Lightbulb } from 'lucide-react';

interface ProTip {
  id: number;
  category: string;
  title: string;
  tip: string;
  masteryLevel: string;
}

const BILLIARD_PRO_TIPS: ProTip[] = [
  {
    id: 1,
    category: 'Stance & Alignment',
    title: 'The Pendulum Stroke',
    tip: 'Keep your rear forearm vertical at cue contact. A relaxed grip with zero wrist tension produces consistent, true ball roll.',
    masteryLevel: 'Mastery Level 1',
  },
  {
    id: 2,
    category: 'Cloth Dynamics',
    title: 'Hainsworth Speed Cloth',
    tip: 'Precision Hainsworth worsted wool reduces surface friction by 22%. Dial back shot velocity by 10% for superior position control.',
    masteryLevel: 'Table Physics',
  },
  {
    id: 3,
    category: 'Break Execution',
    title: 'Maximum Break Transfer',
    tip: 'Strike the head ball dead-center with 85% controlled velocity. Overpowering degrades accuracy and scatters cue control.',
    masteryLevel: 'Break Technique',
  },
  {
    id: 4,
    category: 'English & Spin Control',
    title: 'Managing Squirt & Deflection',
    tip: 'When applying extreme left or right spin, aim 2mm inside the desired contact point to compensate for cue ball deflection.',
    masteryLevel: 'Advanced Spin',
  },
  {
    id: 5,
    category: 'Bank & Cushion Math',
    title: 'Diamond System Reflection',
    tip: 'On Italian slate cushions, the rebound angle equals the entrance angle plus 0.5 diamonds when shot with natural rolling spin.',
    masteryLevel: 'Bank Strategy',
  },
  {
    id: 6,
    category: 'Tactical Play',
    title: 'The Safety Lock',
    tip: 'When a direct pocket path is blocked, place the cue ball frozen against the short rail to force your opponent into a low-percentage kick.',
    masteryLevel: 'Defense Strategy',
  },
  {
    id: 7,
    category: 'Preshot Mental Routine',
    title: 'Visualize the Ghost Ball',
    tip: 'Stand 3 feet behind your shot line, visualize the exact spot where the cue ball must rest at contact, then step down into your stance.',
    masteryLevel: 'Mental Focus',
  },
];

export const ProTipToast: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show first toast after 4 seconds, then show every 28 seconds if not permanently closed
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 4000);

    const intervalTimer = setInterval(() => {
      if (!isDismissed) {
        setCurrentTipIndex((prev) => (prev + 1) % BILLIARD_PRO_TIPS.length);
        setIsVisible(true);
      }
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isDismissed]);

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % BILLIARD_PRO_TIPS.length);
  };

  const currentTip = BILLIARD_PRO_TIPS[currentTipIndex];

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full bg-[#0a0a0a] border border-[#b29762]/60 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(178,151,98,0.25)] p-4 sm:p-5 select-none"
        >
          {/* Subtle Ambient Gold Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b29762] to-transparent" />

          <div className="flex items-start justify-between gap-3">
            {/* Header Icon & Category */}
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-[#141414] border border-[#b29762]/40 text-[#b29762]">
                <Lightbulb className="w-4 h-4 text-[#b29762]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#b29762]">
                    Billiard Mastery Pro Tip
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#b29762]/15 text-[#b29762] text-[8px] font-mono">
                    {currentTip.masteryLevel}
                  </span>
                </div>
                <h4 className="font-serif italic text-base sm:text-lg text-white font-normal leading-tight">
                  {currentTip.title}
                </h4>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/40 hover:text-white p-1 hover:bg-white/10 transition-colors"
              title="Dismiss tip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tip Body Text */}
          <p className="mt-3 text-white/75 text-xs sm:text-sm font-light leading-relaxed pl-1">
            "{currentTip.tip}"
          </p>

          {/* Bottom Controls Bar */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-mono text-white/50">
            <span className="text-[#b29762]/80 font-bold">
              Tip {currentTipIndex + 1} of {BILLIARD_PRO_TIPS.length}
            </span>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleNextTip}
                className="text-[#b29762] hover:text-white transition-colors flex items-center space-x-1 font-sans font-bold uppercase tracking-wider text-[9px]"
              >
                <span>Next Tip</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  setIsVisible(false);
                  setIsDismissed(true);
                }}
                className="hover:text-white/80 transition-colors"
              >
                Hide All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
