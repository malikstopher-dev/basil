import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxRotation?: number;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  glowColor = 'rgba(178, 151, 98, 0.25)',
  maxRotation = 14,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid mouse tracking
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Dynamic glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02, zIndex: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full h-full relative group transition-shadow duration-300"
      >
        {/* Dynamic 3D Glare / Light Reflection Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.3) 0%, transparent 70%), ${glowColor}`,
          }}
        />

        {/* Card Content with 3D Depth */}
        <div className="w-full h-full relative z-10 [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
