import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Sun, Shield, Eye, RefreshCw, ChevronRight, Award } from 'lucide-react';

interface Table3DVisualizationProps {
  onReserveClick?: () => void;
}

export const Table3DVisualization: React.FC<Table3DVisualizationProps> = ({ onReserveClick }) => {
  const [explodedView, setExplodedView] = useState(false);
  const [activeFelt, setActiveFelt] = useState<'emerald' | 'blue' | 'burgundy' | 'charcoal'>('emerald');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(1);
  const [isLightingOn, setIsLightingOn] = useState(true);

  // Motion values for interactive 3D rotation based on mouse hover
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXRaw = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateYRaw = useTransform(mouseX, [-300, 300], [-25, 25]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Felt styling maps
  const feltStyles = {
    emerald: {
      name: 'Sandton Emerald Velvet',
      clothHex: '#0f3d24',
      gradient: 'from-[#144d2e] via-[#0d361f] to-[#082213]',
      spec: 'Hainsworth Match 100% Directionless Wool',
      shadow: 'rgba(15, 61, 36, 0.4)',
    },
    blue: {
      name: 'Royal Imperial Blue',
      clothHex: '#0f2747',
      gradient: 'from-[#173863] via-[#0f2747] to-[#08172c]',
      spec: 'Simonis 860 Fast Speed Tournament Weave',
      shadow: 'rgba(15, 39, 71, 0.4)',
    },
    burgundy: {
      name: 'Vintage Mahogany Wine',
      clothHex: '#4a111a',
      gradient: 'from-[#5e1723] via-[#4a111a] to-[#2e090e]',
      spec: 'Hainsworth Elite Heavyweight Velvet',
      shadow: 'rgba(74, 17, 26, 0.4)',
    },
    charcoal: {
      name: 'Sandton Night Charcoal',
      clothHex: '#1a1d20',
      gradient: 'from-[#282d32] via-[#1a1d20] to-[#0f1113]',
      spec: 'Ultra-Dense Matte Black Competition Felt',
      shadow: 'rgba(26, 29, 32, 0.4)',
    },
  };

  const hotspots = [
    {
      id: 1,
      top: '25%',
      left: '20%',
      title: 'Polished Brass Mitres & Leather Drop Pockets',
      description: 'Solid brass corner castings with hand-stitched South African bovine leather pockets designed for silent ball catch.',
      tag: 'Metallic Craftsmanship'
    },
    {
      id: 2,
      top: '45%',
      left: '50%',
      title: 'Hainsworth Match Refined Velvet Cloth',
      description: 'Zero-pile, high-speed directional felt offering absolute trajectory accuracy, anti-friction play, and lush tactical texture.',
      tag: 'Precision Surface'
    },
    {
      id: 3,
      top: '65%',
      left: '75%',
      title: '45mm Diamond-Honed Italian Slate',
      description: 'Three-piece precision matched slate slab, laser-leveled to within 0.01mm tolerance for true zero-bias roll.',
      tag: 'Substructure Foundation'
    },
    {
      id: 4,
      top: '75%',
      left: '30%',
      title: 'Solid Mahogany Frame & K-55 Cushions',
      description: 'Hardwood base with tournament-grade K-55 rubber cushion profiles providing optimal 82% kinetic energy rebound.',
      tag: 'Rebound Kinetics'
    }
  ];

  return (
    <div className="bg-[#0e0e0e] border border-white/10 p-6 sm:p-10 my-16 shadow-2xl relative overflow-hidden">
      {/* Background Accent Grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#b29762 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#b29762] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b29762] font-bold">
              Interactive 3D Craftsmanship Studio
            </span>
          </div>
          <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-white">
            Table Architecture & <span className="text-[#b29762]">Velvet Inspector</span>
          </h3>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl">
            Hover and move your cursor over the 3D model below to examine our slate composition, solid brass corner fittings, and Hainsworth cloth response.
          </p>
        </div>

        {/* View Mode & Lighting Toggle Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Exploded View Toggle */}
          <button
            type="button"
            onClick={() => setExplodedView(!explodedView)}
            className={`px-4 py-2.5 text-[10px] uppercase font-bold tracking-widest flex items-center space-x-2 border transition-all ${
              explodedView
                ? 'bg-[#b29762] text-black border-[#b29762]'
                : 'bg-[#141414] text-white/70 border-white/15 hover:border-[#b29762]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{explodedView ? 'Collapse Assembly' : 'Explode 3D Layers'}</span>
          </button>

          {/* LED Lighting Toggle */}
          <button
            type="button"
            onClick={() => setIsLightingOn(!isLightingOn)}
            className={`px-4 py-2.5 text-[10px] uppercase font-bold tracking-widest flex items-center space-x-2 border transition-all ${
              isLightingOn
                ? 'bg-[#1a1813] text-[#b29762] border-[#b29762]'
                : 'bg-[#141414] text-white/40 border-white/15'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{isLightingOn ? 'LED Canopy ON' : 'Canopy Dimmed'}</span>
          </button>

          {/* Reset Rotation */}
          <button
            type="button"
            onClick={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            className="p-2.5 bg-[#141414] text-white/60 hover:text-white border border-white/15"
            title="Reset 3D Perspective"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Interactive 3D Canvas Stage */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[380px] sm:h-[460px] bg-gradient-to-b from-[#080808] to-[#121212] border border-white/10 flex items-center justify-center p-4 cursor-grab active:cursor-grabbing overflow-hidden group"
            style={{ perspective: 1000 }}
          >
            {/* Direct Light Beam Projection from Canopy Light */}
            <AnimatePresence>
              {isLightingOn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 235, 190, 0.25) 0%, rgba(178, 151, 98, 0.05) 50%, transparent 80%)'
                  }}
                />
              )}
            </AnimatePresence>

            {/* Instruction Tip Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-[#0a0a0a]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[9px] uppercase tracking-widest text-white/50">
              <Eye className="w-3 h-3 text-[#b29762]" />
              <span>Interactive 3D Canvas • Move Mouse To Tilt</span>
            </div>

            {/* 3D Rotating Table Assembly Card */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-xl h-64 sm:h-80 flex flex-col items-center justify-center transition-shadow duration-300"
            >

              {/* OVERHEAD LED CANOPY LIGHTING FIXTURE (Layer 1 in Exploded View) */}
              <motion.div
                animate={{
                  translateZ: explodedView ? 90 : 30,
                  opacity: explodedView ? 0.9 : 0.7,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="w-[85%] h-8 bg-[#181818] border border-[#b29762]/50 shadow-2xl mb-4 flex items-center justify-between px-6 relative"
              >
                <div className="w-full h-1 bg-[#b29762] shadow-[0_0_12px_#b29762]" />
                <span className="absolute right-3 top-1 text-[8px] font-mono text-[#b29762] uppercase tracking-widest">
                  5500K LED Canopy
                </span>
              </motion.div>

              {/* MAIN TABLE DECK (Layer 2) */}
              <motion.div
                animate={{
                  translateZ: 0,
                  scale: explodedView ? 0.95 : 1,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative w-full h-44 sm:h-56 bg-[#181512] border-4 border-[#2a221b] shadow-2xl p-3 flex flex-col justify-between"
                style={{
                  boxShadow: `0 25px 50px -12px ${feltStyles[activeFelt].shadow}, 0 0 0 1px rgba(178, 151, 98, 0.2)`
                }}
              >
                {/* Metallic Brass Corner Mitres */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-[#d4bf8d] via-[#b29762] to-[#755f36] border-b border-r border-black/50 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-[#b29762]" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#d4bf8d] via-[#b29762] to-[#755f36] border-b border-l border-black/50 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-[#b29762]" />
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-[#d4bf8d] via-[#b29762] to-[#755f36] border-t border-r border-black/50 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-[#b29762]" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[#d4bf8d] via-[#b29762] to-[#755f36] border-t border-l border-black/50 shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-[#b29762]" />
                </div>

                {/* Cushion Rail Inlays (Pearl Diamond Sights) */}
                <div className="absolute top-1 left-1/4 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />
                <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />
                <div className="absolute top-1 left-3/4 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />

                <div className="absolute bottom-1 left-1/4 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />
                <div className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />
                <div className="absolute bottom-1 left-3/4 w-1.5 h-1.5 bg-[#f4ebd0] rotate-45 shadow-sm" />

                {/* REFINED VELVET FELT PLAYING SURFACE */}
                <div
                  className={`w-full h-full bg-gradient-to-br ${feltStyles[activeFelt].gradient} relative border border-black/40 overflow-hidden flex items-center justify-center transition-colors duration-500`}
                >
                  {/* Velvet Texture Overlay Pattern */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)'
                    }}
                  />

                  {/* Foot Spot Marker */}
                  <div className="w-2 h-2 rounded-full bg-black/40 border border-[#b29762] absolute right-16" />

                  {/* Baulk Line */}
                  <div className="w-[1px] h-full bg-white/15 absolute left-20" />

                  {/* Simulated Aramith 8-Ball Rack on Felt */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-1 transform scale-90">
                    <div className="flex space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-white shadow-md border border-gray-300 flex items-center justify-center text-[7px] font-bold text-black">1</div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-md flex items-center justify-center text-[7px] font-bold text-black">2</div>
                      <div className="w-4 h-4 rounded-full bg-red-600 shadow-md flex items-center justify-center text-[7px] font-bold text-white">3</div>
                    </div>
                    <div className="flex space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-blue-600 shadow-md flex items-center justify-center text-[7px] font-bold text-white">4</div>
                      <div className="w-4 h-4 rounded-full bg-black shadow-md border border-[#b29762] flex items-center justify-center text-[7px] font-bold text-white font-mono">8</div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-slate-100 shadow-lg border border-gray-400 flex items-center justify-center text-[6px] font-bold text-black mt-2">
                      CUE
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3-PIECE SLATE LAYER (Layer 3 in Exploded View) */}
              <motion.div
                animate={{
                  translateZ: explodedView ? -70 : 0,
                  opacity: explodedView ? 0.95 : 0,
                  y: explodedView ? 25 : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="w-[96%] h-6 bg-[#33383e] border border-white/20 flex items-center justify-between px-4 text-[8px] font-mono text-white/70 uppercase tracking-widest mt-2"
              >
                <span>Slate Slab 1 (15mm)</span>
                <span className="text-[#b29762] font-bold">Precision Italian Slate Core</span>
                <span>Slate Slab 3 (15mm)</span>
              </motion.div>

              {/* HARDWOOD LEGS & SUB-FRAME (Layer 4 in Exploded View) */}
              <motion.div
                animate={{
                  translateZ: explodedView ? -120 : 0,
                  opacity: explodedView ? 0.8 : 0,
                  y: explodedView ? 45 : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="w-[90%] h-8 bg-[#1f1914] border border-[#b29762]/30 flex items-center justify-between px-6 text-[8px] font-mono text-[#b29762] uppercase tracking-widest mt-1"
              >
                <span>Leveling Foot (L)</span>
                <span>Solid Mahogany Sub-Chassis</span>
                <span>Leveling Foot (R)</span>
              </motion.div>

              {/* HOTSPOT ANCHOR BUTTONS (Visible when NOT exploded) */}
              {!explodedView && (
                <>
                  {hotspots.map((hs) => (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setActiveHotspot(hs.id)}
                      style={{ top: hs.top, left: hs.left }}
                      className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        activeHotspot === hs.id
                          ? 'bg-[#b29762] text-black shadow-[0_0_15px_#b29762] scale-125'
                          : 'bg-black/80 text-[#b29762] border border-[#b29762] hover:scale-110'
                      }`}
                    >
                      <span className="text-[10px] font-bold font-mono">{hs.id}</span>
                    </button>
                  ))}
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Right Inspection Controls & Specs Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Felt Selector */}
          <div className="space-y-3 bg-[#121212] p-5 border border-white/10">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#b29762] block">
              Customize Cloth Velvet & Finish
            </span>

            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(feltStyles) as Array<keyof typeof feltStyles>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFelt(key)}
                  className={`p-2.5 text-left border flex items-center space-x-2.5 transition-all ${
                    activeFelt === key
                      ? 'border-[#b29762] bg-[#1a1813]'
                      : 'border-white/10 bg-[#0a0a0a] hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: feltStyles[key].clothHex }}
                  />
                  <span className="text-[10px] font-semibold text-white/80 truncate">
                    {feltStyles[key].name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 text-xs">
              <span className="text-[#b29762] font-semibold block text-xs">
                {feltStyles[activeFelt].name}
              </span>
              <p className="text-white/50 text-[11px] mt-0.5">
                {feltStyles[activeFelt].spec}
              </p>
            </div>
          </div>

          {/* Active Hotspot Inspector Card */}
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <motion.div
                key={activeHotspot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#121212] p-5 border border-[#b29762]/40 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[#b29762] text-black font-bold text-[9px] uppercase tracking-widest font-mono">
                    Feature #{activeHotspot}
                  </span>
                  <span className="text-[9px] text-[#b29762] uppercase tracking-wider font-bold">
                    {hotspots.find(h => h.id === activeHotspot)?.tag}
                  </span>
                </div>

                <h4 className="font-serif italic text-lg font-normal text-white">
                  {hotspots.find(h => h.id === activeHotspot)?.title}
                </h4>

                <p className="text-white/70 text-xs leading-relaxed">
                  {hotspots.find(h => h.id === activeHotspot)?.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          {onReserveClick && (
            <button
              type="button"
              onClick={onReserveClick}
              className="w-full py-3.5 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Reserve Table With This Cloth</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
