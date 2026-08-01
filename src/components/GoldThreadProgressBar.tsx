import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const GoldThreadProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-black/40">
      <motion.div
        className="h-full bg-gradient-to-r from-[#8a7243] via-[#b29762] to-[#e6c878] shadow-[0_0_12px_rgba(178,151,98,0.8)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
