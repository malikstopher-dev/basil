import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const LuxuryCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for fluid cursor movement
  const cursorX = useSpring(0, { stiffness: 600, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 35 });

  const ringX = useSpring(0, { stiffness: 300, damping: 28 });
  const ringY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check if target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], [onClick], .interactive, label'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Luxury Halo / Indicator Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#b29762] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 20 : isClicking ? 24 : 36,
          height: isHovered ? 20 : isClicking ? 24 : 36,
          borderColor: isHovered
            ? '#b29762'
            : isClicking
            ? '#ffffff'
            : 'rgba(178, 151, 98, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(178, 151, 98, 0.15)'
            : 'rgba(0, 0, 0, 0)',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* Subtle Crosshair indicator accents when hovering over interactive elements */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-1.5 h-1.5 bg-[#b29762] rounded-full"
          />
        )}
      </motion.div>

      {/* Central Precision Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#b29762] shadow-[0_0_8px_rgba(178,151,98,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 4 : isClicking ? 8 : 6,
          height: isHovered ? 4 : isClicking ? 8 : 6,
          opacity: isHovered ? 0.9 : 1,
          backgroundColor: isClicking ? '#ffffff' : '#b29762',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </>
  );
};
