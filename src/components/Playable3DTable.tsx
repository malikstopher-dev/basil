import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, Flame, ChevronRight, HelpCircle, Shield, Award, Crown, Palette, Settings2, Sparkle, Share2, Camera, Download, Copy, Check, X, ExternalLink, Maximize2, Minimize2, Target, Sliders, Layers, Search, ZoomIn } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CraftCocktailPairing } from './CraftCocktailPairing';

interface FeltOption {
  id: string;
  name: string;
  gradientStops: [string, string, string];
  previewColor: string;
  tag: string;
}

interface WoodOption {
  id: string;
  name: string;
  fillColor: string;
  grainColor: string;
  trimColor: string;
  previewColor: string;
  tag: string;
  description: string;
}

type DifficultyLevel = 'easy' | 'standard' | 'pro';

interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  pocketRadius: number;
  funnelRadius: number;
  funnelForce: number;
  guideLength: number;
  badge: string;
  description: string;
}

const FELT_OPTIONS: FeltOption[] = [
  {
    id: 'emerald',
    name: 'Sandton Emerald',
    gradientStops: ['#134f2d', '#0d3b21', '#082615'],
    previewColor: '#134f2d',
    tag: 'Classic Championship Velvet',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    gradientStops: ['#1d4ed8', '#1e3a8a', '#172554'],
    previewColor: '#1d4ed8',
    tag: 'Tournament Speed Cloth',
  },
  {
    id: 'burgundy',
    name: 'Classic Burgundy',
    gradientStops: ['#9f1239', '#701a2b', '#4c0519'],
    previewColor: '#9f1239',
    tag: 'Heritage Lounge Cloth',
  },
  {
    id: 'gold-slate',
    name: 'Sandton Slate Gold',
    gradientStops: ['#3a3327', '#282319', '#17140e'],
    previewColor: '#b29762',
    tag: 'Executive Gold Weave',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    gradientStops: ['#333333', '#1c1c1c', '#0a0a0a'],
    previewColor: '#333333',
    tag: 'Ultra-Matte Modern',
  },
];

const WOOD_OPTIONS: WoodOption[] = [
  {
    id: 'mahogany',
    name: 'Royal Mahogany',
    fillColor: '#2b1710',
    grainColor: '#472216',
    trimColor: '#b29762',
    previewColor: '#3d261a',
    tag: 'Polished Imperial Timber',
    description: 'Deep reddish-brown Cuban mahogany with metallic gold border inlays.',
  },
  {
    id: 'walnut',
    name: 'Dark Walnut',
    fillColor: '#1c1511',
    grainColor: '#33241b',
    trimColor: '#d4a373',
    previewColor: '#2b2019',
    tag: 'Hand-Rubbed Deep Grain',
    description: 'American dark walnut featuring heavy figured grain swirls & warm amber bevels.',
  },
  {
    id: 'ebony',
    name: 'Piano Ebony',
    fillColor: '#0a0a0b',
    grainColor: '#1c1d21',
    trimColor: '#e6c878',
    previewColor: '#141416',
    tag: 'High-Gloss Obsidian',
    description: 'Gabon black ebony polished to a mirror-like lacquer finish with gold trim.',
  },
  {
    id: 'rosewood',
    name: 'Brass Rosewood',
    fillColor: '#331310',
    grainColor: '#521d18',
    trimColor: '#f0d486',
    previewColor: '#4a2218',
    tag: 'Brazilian Heritage Wood',
    description: 'Rare Brazilian rosewood timber paired with solid polished brass accents.',
  },
  {
    id: 'golden-oak',
    name: 'Golden Oak',
    fillColor: '#4a3619',
    grainColor: '#6b4f24',
    trimColor: '#f7d380',
    previewColor: '#5c431d',
    tag: 'Honey Amber Grain',
    description: 'Quarter-sawn English white oak with radiant honey golden grain rays.',
  },
  {
    id: 'smoked-ash',
    name: 'Smoked Charcoal Ash',
    fillColor: '#181a1b',
    grainColor: '#2d3034',
    trimColor: '#c0c0c0',
    previewColor: '#222528',
    tag: 'Contemporary Matte',
    description: 'Thermal-smoked ash hardwood framed by brushed platinum metallic trim.',
  },
  {
    id: 'purpleheart',
    name: 'Brazilian Purpleheart',
    fillColor: '#301328',
    grainColor: '#4d1e40',
    trimColor: '#ffd700',
    previewColor: '#3d1833',
    tag: 'Exotic Amethyst Hardwood',
    description: 'Exotic South American purpleheart timber accented with 24k gold leaf trim.',
  },
];

const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Casual (Magnetic Pockets)',
    pocketRadius: 32,
    funnelRadius: 60,
    funnelForce: 0.45,
    guideLength: 350,
    badge: '⭐ Easy (Pocket Assist ON)',
    description: 'Widened pockets with gravitational magnetic pull & extended aiming trajectory.',
  },
  standard: {
    id: 'standard',
    name: 'Standard Lounge',
    pocketRadius: 24,
    funnelRadius: 30,
    funnelForce: 0.15,
    guideLength: 220,
    badge: 'Standard Rules',
    description: 'Authentic 9ft pool room table measurements and natural ball physics.',
  },
  pro: {
    id: 'pro',
    name: 'Tournament Pro',
    pocketRadius: 18,
    funnelRadius: 0,
    funnelForce: 0,
    guideLength: 160,
    badge: 'Strict Championship',
    description: 'Tight pocket mouth clearance requiring precise angle and velocity control.',
  },
};

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isStriped?: boolean;
  number: number;
  isPotted: boolean;
}

interface Pocket {
  x: number;
  y: number;
  radius: number;
}

interface GoldParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface PocketFlash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const Playable3DTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound state using Web Audio API Synthesizer
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Playable State
  const [activeFeltId, setActiveFeltId] = useState<string>('emerald');
  const [activeWoodId, setActiveWoodId] = useState<string>('mahogany');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameMode, setGameMode] = useState<'8ball' | 'trickshot'>('8ball');
  const [shotCount, setShotCount] = useState(0);
  const [pottedCount, setPottedCount] = useState(0);
  const [aimAngle, setAimAngle] = useState(0); // in degrees
  const [shotPower, setShotPower] = useState(60); // 10 to 100
  const [isAiming, setIsAiming] = useState(true);
  const [isBallsMoving, setIsBallsMoving] = useState(false);
  const [isCuePulling, setIsCuePulling] = useState(false);
  const [cueOffset, setCueOffset] = useState(0); // pull-back offset animation
  const [message, setMessage] = useState<string>('⭐ Casual mode active: Magnetic pockets enable effortless shots! Drag to aim & strike.');
  const [activeTrickShot, setActiveTrickShot] = useState<number>(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [snapshotImageDataUrl, setSnapshotImageDataUrl] = useState<string | null>(null);
  const [copySuccessToast, setCopySuccessToast] = useState(false);

  // HD Texture Magnifying Loupe Inspector State
  const [isLoupeMode, setIsLoupeMode] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{
    clientX: number;
    clientY: number;
    canvasX: number;
    canvasY: number;
  } | null>(null);
  const [isDraggingLoupe, setIsDraggingLoupe] = useState<boolean>(false);
  const loupeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render magnified sub-image onto loupeCanvas whenever loupePos or table options change
  useEffect(() => {
    if (!loupePos || (!isLoupeMode && !isDraggingLoupe)) return;
    const mainCanvas = canvasRef.current;
    const loupeCanvas = loupeCanvasRef.current;
    if (!mainCanvas || !loupeCanvas) return;

    const ctx = loupeCanvas.getContext('2d');
    if (!ctx) return;

    const loupeSize = 200;
    const zoomFactor = 3.5;
    const sourceW = loupeSize / zoomFactor;
    const sourceH = loupeSize / zoomFactor;

    const sourceX = Math.max(0, Math.min(TABLE_WIDTH - sourceW, loupePos.canvasX - sourceW / 2));
    const sourceY = Math.max(0, Math.min(TABLE_HEIGHT - sourceH, loupePos.canvasY - sourceH / 2));

    ctx.clearRect(0, 0, loupeSize, loupeSize);

    // Circular clip path for lens
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 100, 98, 0, Math.PI * 2);
    ctx.clip();

    // Draw magnified image from main canvas
    ctx.drawImage(mainCanvas, sourceX, sourceY, sourceW, sourceH, 0, 0, loupeSize, loupeSize);

    const isOverFelt =
      loupePos.canvasX >= 25 &&
      loupePos.canvasX <= TABLE_WIDTH - 25 &&
      loupePos.canvasY >= 25 &&
      loupePos.canvasY <= TABLE_HEIGHT - 25;

    // Overlay Micro-Texture Patterns
    if (isOverFelt) {
      // Hainsworth worsted wool micro weave grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < loupeSize; x += 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, loupeSize);
        ctx.stroke();
      }
      for (let y = 0; y < loupeSize; y += 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(loupeSize, y);
        ctx.stroke();
      }
    } else {
      // Wood rail timber grain striations
      const currentWood = WOOD_OPTIONS.find((w) => w.id === activeWoodId) || WOOD_OPTIONS[0];
      ctx.strokeStyle = currentWood.trimColor || '#f0d486';
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.25;
      for (let y = 0; y < loupeSize; y += 6) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(y * 0.15) * 4);
        ctx.lineTo(loupeSize, y + Math.cos(y * 0.15) * 4);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    }

    // Lens Crosshair Target
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(90, 100);
    ctx.lineTo(110, 100);
    ctx.moveTo(100, 90);
    ctx.lineTo(100, 110);
    ctx.stroke();

    ctx.restore();
  }, [loupePos, isLoupeMode, isDraggingLoupe, activeFeltId, activeWoodId]);

  // Full Screen Toggle Handler
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  // Generate Branded Social Snapshot Canvas Card
  const handleGenerateShareSnapshot = useCallback(() => {
    const sourceCanvas = canvasRef.current;
    if (!sourceCanvas) return;

    const width = 1200;
    const height = 675;
    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = width;
    snapCanvas.height = height;
    const ctx = snapCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Dark Luxury Background
    ctx.fillStyle = '#070707';
    ctx.fillRect(0, 0, width, height);

    // Background radial gold glow
    const bgGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 600);
    bgGlow.addColorStop(0, 'rgba(178, 151, 98, 0.22)');
    bgGlow.addColorStop(1, 'rgba(7, 7, 7, 0.96)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, width, height);

    // Outer Gold Border Frame
    ctx.strokeStyle = '#b29762';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // 2. Header Branding Banner
    ctx.fillStyle = '#b29762';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText("BASIL'S BILLIARDS • SUPPLIER & LOUNGE", 55, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 32px Georgia, serif';
    ctx.fillText('Sandton Custom 3D Table Snapshot', 55, 100);

    // Active Customization Specs
    const currentFelt = FELT_OPTIONS.find((f) => f.id === activeFeltId) || FELT_OPTIONS[0];
    const currentWood = WOOD_OPTIONS.find((w) => w.id === activeWoodId) || WOOD_OPTIONS[0];

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(55, 118, 540, 32);
    ctx.strokeStyle = 'rgba(178, 151, 98, 0.4)';
    ctx.strokeRect(55, 118, 540, 32);

    ctx.fillStyle = '#b29762';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`FELT: ${currentFelt.name.toUpperCase()}  |  WOOD: ${currentWood.name.toUpperCase()}`, 70, 138);

    // 3. Draw Table Snapshot Canvas (Scaled & Centered with Frame)
    const tableMarginX = 55;
    const tableMarginY = 168;
    const tableDrawW = width - 110;
    const tableDrawH = 430;

    // Draw shadow behind table image
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 15;
    ctx.drawImage(sourceCanvas, tableMarginX, tableMarginY, tableDrawW, tableDrawH);
    ctx.shadowColor = 'transparent';

    // Table Gold Border Accent
    ctx.strokeStyle = '#b29762';
    ctx.lineWidth = 2;
    ctx.strokeRect(tableMarginX, tableMarginY, tableDrawW, tableDrawH);

    // 4. Footer Branding & Match Stats
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px sans-serif';
    ctx.fillText(
      `Mode: ${gameMode === '8ball' ? '8-Ball Championship' : 'Trickshot Challenge'}  •  Balls Potted: ${pottedCount}  •  Shots Taken: ${shotCount}`,
      55,
      height - 38
    );

    ctx.fillStyle = '#b29762';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('SANDTON LOUNGE • OFFICIAL 3D SIMULATOR', width - 55, height - 38);

    const dataUrl = snapCanvas.toDataURL('image/png');
    setSnapshotImageDataUrl(dataUrl);
    setIsShareModalOpen(true);
  }, [activeFeltId, activeWoodId, gameMode, pottedCount, shotCount]);

  // Physics constants
  const TABLE_WIDTH = 700;
  const TABLE_HEIGHT = 380;
  const BALL_RADIUS = 10;
  const FRICTION = 0.982;
  const CUSHION_BOUNCE = 0.78;

  // Dynamic Pockets relative to canvas & active difficulty mode
  const getActivePockets = useCallback((): Pocket[] => {
    const radius = DIFFICULTY_CONFIGS[difficulty].pocketRadius;
    return [
      { x: 25, y: 25, radius }, // Top-Left
      { x: TABLE_WIDTH / 2, y: 18, radius: radius * 0.95 }, // Top-Center
      { x: TABLE_WIDTH - 25, y: 25, radius }, // Top-Right
      { x: 25, y: TABLE_HEIGHT - 25, radius }, // Bottom-Left
      { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 18, radius: radius * 0.95 }, // Bottom-Center
      { x: TABLE_WIDTH - 25, y: TABLE_HEIGHT - 25, radius }, // Bottom-Right
    ];
  }, [difficulty]);

  const ballsRef = useRef<Ball[]>([]);
  const goldParticlesRef = useRef<GoldParticle[]>([]);
  const pocketFlashesRef = useRef<PocketFlash[]>([]);

  // Trigger Gold Dust Particles & Metallic Celebration Effect
  const triggerGoldDustCelebration = useCallback((px: number, py: number) => {
    // 1. Spawn Canvas Metallic Gold Dust Burst
    const colors = ['#b29762', '#e6c878', '#ffd700', '#f0d486', '#ffffff', '#8a7243', '#d4bf8d'];
    const newParticles: GoldParticle[] = [];

    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      newParticles.push({
        x: px + (Math.random() - 0.5) * 8,
        y: py + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        size: 1.5 + Math.random() * 4,
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.018,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    goldParticlesRef.current.push(...newParticles);

    // 2. Add Expanding Metallic Pocket Ring
    pocketFlashesRef.current.push({
      x: px,
      y: py,
      radius: 20,
      maxRadius: 55,
      alpha: 1.0,
    });

    // 3. Screen Gold Confetti Burst
    try {
      const canvasEl = canvasRef.current;
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const originX = (rect.left + (px / TABLE_WIDTH) * rect.width) / window.innerWidth;
        const originY = (rect.top + (py / TABLE_HEIGHT) * rect.height) / window.innerHeight;

        confetti({
          particleCount: 35,
          spread: 55,
          origin: {
            x: Math.max(0.1, Math.min(0.9, originX)),
            y: Math.max(0.1, Math.min(0.9, originY)),
          },
          colors: ['#b29762', '#e6c878', '#ffd700', '#ffffff', '#8a7243'],
          ticks: 180,
          gravity: 0.7,
          scalar: 0.85,
        });
      }
    } catch {
      confetti({
        particleCount: 30,
        spread: 50,
        colors: ['#b29762', '#e6c878', '#ffd700'],
      });
    }
  }, []);

  // Sound Synthesizer function
  const playSound = useCallback((type: 'hit' | 'cushion' | 'pocket' | 'strike') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'hit') {
        // High crisp ball clack
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'cushion') {
        // Soft rubber thud
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'pocket') {
        // Deep pocket drop sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'strike') {
        // Cue tip leather strike
        osc.type = 'square';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch {
      // Ignore web audio browser restriction silently
    }
  }, [soundEnabled]);

  // Rack generator
  const createRack = useCallback((mode: '8ball' | 'trickshot', trickLevel = 1) => {
    const ballColors = [
      '#eab308', '#2563eb', '#dc2626', '#9333ea', '#f97316', '#16a34a', '#854d0e', '#000000',
      '#eab308', '#2563eb', '#dc2626', '#9333ea', '#f97316', '#16a34a', '#854d0e'
    ];

    const newBalls: Ball[] = [];

    // Cue ball
    newBalls.push({
      id: 0,
      x: mode === 'trickshot' ? 140 : 180,
      y: TABLE_HEIGHT / 2,
      vx: 0,
      vy: 0,
      radius: BALL_RADIUS,
      color: '#ffffff',
      number: 0,
      isPotted: false
    });

    if (mode === '8ball') {
      // Standard 8-ball triangle rack
      const startX = 480;
      const startY = TABLE_HEIGHT / 2;
      const spacing = BALL_RADIUS * 2 + 1;
      let count = 1;

      for (let col = 0; col < 5; col++) {
        const rowCount = col + 1;
        const colX = startX + col * (spacing * 0.866);
        const startRowY = startY - (col * spacing) / 2;

        for (let row = 0; row < rowCount; row++) {
          const colY = startRowY + row * spacing;
          const is8Ball = col === 2 && row === 1;
          const num = is8Ball ? 8 : count === 8 ? 15 : count;

          newBalls.push({
            id: num,
            x: colX,
            y: colY,
            vx: 0,
            vy: 0,
            radius: BALL_RADIUS,
            color: is8Ball ? '#000000' : ballColors[num - 1] || '#b29762',
            isStriped: num > 8,
            number: num,
            isPotted: false
          });
          count++;
        }
      }
    } else {
      // Trick shots setup
      if (trickLevel === 1) {
        // Easy line up for a corner pocket bank
        newBalls.push({
          id: 1, x: 380, y: TABLE_HEIGHT / 2 - 40, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#dc2626', number: 1, isPotted: false
        });
        newBalls.push({
          id: 2, x: 500, y: TABLE_HEIGHT / 2 + 50, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#2563eb', number: 2, isPotted: false
        });
      } else if (trickLevel === 2) {
        // Combination double shot
        newBalls.push({
          id: 1, x: 400, y: TABLE_HEIGHT / 2, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#eab308', number: 1, isPotted: false
        });
        newBalls.push({
          id: 2, x: 422, y: TABLE_HEIGHT / 2 + 10, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#dc2626', number: 2, isPotted: false
        });
        newBalls.push({
          id: 3, x: 550, y: 80, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#16a34a', number: 3, isPotted: false
        });
      } else {
        // Sandton Golden Break
        newBalls.push({ id: 1, x: 350, y: 120, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#eab308', number: 1, isPotted: false });
        newBalls.push({ id: 2, x: 450, y: 180, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#dc2626', number: 2, isPotted: false });
        newBalls.push({ id: 3, x: 550, y: 260, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#2563eb', number: 3, isPotted: false });
        newBalls.push({ id: 8, x: 480, y: 200, vx: 0, vy: 0, radius: BALL_RADIUS, color: '#000000', number: 8, isPotted: false });
      }
    }

    ballsRef.current = newBalls;
    setPottedCount(0);
    setShotCount(0);
    setIsAiming(true);
    setIsBallsMoving(false);
    setMessage(mode === '8ball' ? 'Rack assembled. Aim and strike for a clean break!' : `Trick Shot #${trickLevel} initialized. Sink all target balls!`);
  }, []);

  // Initialize on mount
  useEffect(() => {
    createRack('8ball');
  }, [createRack]);

  // Main Physics Simulation Loop
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      const balls = ballsRef.current;
      const currentPockets = getActivePockets();
      const diffConfig = DIFFICULTY_CONFIGS[difficulty];
      let moving = false;

      // Update positions, friction & magnetic funnel assistance
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (b.isPotted) continue;

        // Gravitational magnetic pull towards nearest pocket in Easy/Casual mode
        if (diffConfig.funnelForce > 0) {
          for (const p of currentPockets) {
            const dx = p.x - b.x;
            const dy = p.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < diffConfig.funnelRadius && dist > 2) {
              const pull = diffConfig.funnelForce * (1 - dist / diffConfig.funnelRadius);
              b.vx += (dx / dist) * pull;
              b.vy += (dy / dist) * pull;
            }
          }
        }

        b.x += b.vx;
        b.y += b.vy;

        b.vx *= FRICTION;
        b.vy *= FRICTION;

        if (Math.abs(b.vx) < 0.05) b.vx = 0;
        if (Math.abs(b.vy) < 0.05) b.vy = 0;

        if (b.vx !== 0 || b.vy !== 0) {
          moving = true;
        }

        // Cushion collision
        const minX = 35 + b.radius;
        const maxX = TABLE_WIDTH - 35 - b.radius;
        const minY = 35 + b.radius;
        const maxY = TABLE_HEIGHT - 35 - b.radius;

        if (b.x < minX) {
          b.x = minX;
          b.vx = -b.vx * CUSHION_BOUNCE;
          playSound('cushion');
        } else if (b.x > maxX) {
          b.x = maxX;
          b.vx = -b.vx * CUSHION_BOUNCE;
          playSound('cushion');
        }

        if (b.y < minY) {
          b.y = minY;
          b.vy = -b.vy * CUSHION_BOUNCE;
          playSound('cushion');
        } else if (b.y > maxY) {
          b.y = maxY;
          b.vy = -b.vy * CUSHION_BOUNCE;
          playSound('cushion');
        }

        // Pocket check
        for (const p of currentPockets) {
          const dx = b.x - p.x;
          const dy = b.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + 2) {
            b.isPotted = true;
            b.vx = 0;
            b.vy = 0;

            if (b.id === 0) {
              // Scratch! Reset cue ball
              setTimeout(() => {
                b.isPotted = false;
                b.x = 180;
                b.y = TABLE_HEIGHT / 2;
                setMessage('Scratch! Cue ball restored to baulk area.');
              }, 800);
            } else {
              setPottedCount((prev) => prev + 1);
              playSound('pocket');
              setMessage(`Splendid! Ball #${b.number} potted.`);
              triggerGoldDustCelebration(p.x, p.y);
            }
          }
        }
      }

      // Ball-to-ball collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i];
          const b2 = balls[j];

          if (b1.isPotted || b2.isPotted) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist && dist > 0) {
            // Collision resolution
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate overlapping balls
            const overlap = minDist - dist;
            b1.x -= nx * (overlap / 2);
            b1.y -= ny * (overlap / 2);
            b2.x += nx * (overlap / 2);
            b2.y += ny * (overlap / 2);

            // Velocity component in normal direction
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b1.vx -= p * nx;
            b1.vy -= p * ny;
            b2.vx += p * nx;
            b2.vy += p * ny;

            playSound('hit');
          }
        }
      }

      // Update Gold Dust Particles & Pocket Flashes
      for (let i = goldParticlesRef.current.length - 1; i >= 0; i--) {
        const pt = goldParticlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.95;
        pt.vy *= 0.95;
        pt.vy -= 0.015;
        pt.alpha -= pt.decay;
        if (pt.alpha <= 0) {
          goldParticlesRef.current.splice(i, 1);
        }
      }

      for (let i = pocketFlashesRef.current.length - 1; i >= 0; i--) {
        const pf = pocketFlashesRef.current[i];
        pf.radius += 1.4;
        pf.alpha -= 0.035;
        if (pf.alpha <= 0 || pf.radius >= pf.maxRadius) {
          pocketFlashesRef.current.splice(i, 1);
        }
      }

      setIsBallsMoving(moving || goldParticlesRef.current.length > 0);
      if (!moving && !isAiming && shotCount > 0) {
        setIsAiming(true);
      }

      // Render Canvas Frame
      drawCanvas();
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [playSound, getActivePockets, difficulty, isAiming, shotCount, triggerGoldDustCelebration]);

  // Canvas Renderer
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentFelt = FELT_OPTIONS.find((f) => f.id === activeFeltId) || FELT_OPTIONS[0];
    const currentWood = WOOD_OPTIONS.find((w) => w.id === activeWoodId) || WOOD_OPTIONS[0];
    const currentPockets = getActivePockets();

    // Clear background
    ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    // 1. Table Cushion Rails Frame (Exotic Wood Finish & Procedural Grain Texture)
    ctx.fillStyle = currentWood.fillColor;
    ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    // Render Real-Time Procedural Wood Grain Patterns
    ctx.save();
    ctx.strokeStyle = currentWood.grainColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.45;

    // Horizontal top/bottom cushion rail grain striations
    for (let y = 3; y < 30; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(y * 0.9) * 1.5);
      ctx.lineTo(TABLE_WIDTH, y + Math.cos(y * 0.5) * 1.5);
      ctx.stroke();
    }
    for (let y = TABLE_HEIGHT - 30; y < TABLE_HEIGHT; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(y * 0.9) * 1.5);
      ctx.lineTo(TABLE_WIDTH, y + Math.cos(y * 0.5) * 1.5);
      ctx.stroke();
    }
    // Vertical left/right cushion rail grain striations
    for (let x = 3; x < 30; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(x * 0.9) * 1.5, 0);
      ctx.lineTo(x + Math.cos(x * 0.5) * 1.5, TABLE_HEIGHT);
      ctx.stroke();
    }
    for (let x = TABLE_WIDTH - 30; x < TABLE_WIDTH; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(x * 0.9) * 1.5, 0);
      ctx.lineTo(x + Math.cos(x * 0.5) * 1.5, TABLE_HEIGHT);
      ctx.stroke();
    }
    ctx.restore();

    // Rail Bevel Shadow Accent
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, TABLE_WIDTH - 56, TABLE_HEIGHT - 56);

    // Rail Gold Trim Line (Selected Wood Metallic Accent)
    ctx.strokeStyle = currentWood.trimColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, TABLE_WIDTH - 20, TABLE_HEIGHT - 20);

    // Pearl Diamond Sights
    ctx.fillStyle = '#f5f5f4';
    const diamondPositions = [
      [TABLE_WIDTH * 0.25, 18], [TABLE_WIDTH * 0.5, 18], [TABLE_WIDTH * 0.75, 18],
      [TABLE_WIDTH * 0.25, TABLE_HEIGHT - 18], [TABLE_WIDTH * 0.5, TABLE_HEIGHT - 18], [TABLE_WIDTH * 0.75, TABLE_HEIGHT - 18],
      [18, TABLE_HEIGHT * 0.25], [18, TABLE_HEIGHT * 0.75],
      [TABLE_WIDTH - 18, TABLE_HEIGHT * 0.25], [TABLE_WIDTH - 18, TABLE_HEIGHT * 0.75],
    ];

    for (const [dx, dy] of diamondPositions) {
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Selected Velvet Playing Cloth (Dynamic Felt Color Gradient)
    const feltGrad = ctx.createRadialGradient(
      TABLE_WIDTH / 2, TABLE_HEIGHT / 2, 50,
      TABLE_WIDTH / 2, TABLE_HEIGHT / 2, 350
    );
    feltGrad.addColorStop(0, currentFelt.gradientStops[0]);
    feltGrad.addColorStop(0.7, currentFelt.gradientStops[1]);
    feltGrad.addColorStop(1, currentFelt.gradientStops[2]);

    ctx.fillStyle = feltGrad;
    ctx.fillRect(30, 30, TABLE_WIDTH - 60, TABLE_HEIGHT - 60);

    // Baulk Line & D Zone
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(180, 30);
    ctx.lineTo(180, TABLE_HEIGHT - 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(180, TABLE_HEIGHT / 2, 50, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.stroke();

    // 3. Brass Pocket Holes (Sized by Active Difficulty Mode)
    for (const p of currentPockets) {
      // Outer metallic brass ring
      ctx.fillStyle = currentWood.trimColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner leather drop pocket hole
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Magnetic funnel halo indicator in Easy mode
      if (difficulty === 'easy') {
        ctx.strokeStyle = 'rgba(230, 200, 120, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, DIFFICULTY_CONFIGS.easy.funnelRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // 4. Render Balls
    const cueBall = ballsRef.current.find((b) => b.id === 0);

    for (const b of ballsRef.current) {
      if (b.isPotted) continue;

      // Ball Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.arc(b.x + 3, b.y + 4, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Ball Body
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Striped ball middle band
      if (b.isStriped) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - b.radius * 0.7, b.y - b.radius * 0.3, b.radius * 1.4, b.radius * 0.6);
      }

      // Ball Specular Highlight (Polished Aramith Shine)
      const shineGrad = ctx.createRadialGradient(
        b.x - 3, b.y - 3, 1,
        b.x, b.y, b.radius
      );
      shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      shineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGrad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Ball Number text
      if (b.number > 0) {
        ctx.fillStyle = b.isStriped ? '#000000' : (b.number === 8 ? '#ffffff' : '#000000');
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.number.toString(), b.x, b.y + 0.5);
      }
    }

    // 5. Render Expanding Gold Pocket Flashes
    for (const pf of pocketFlashesRef.current) {
      ctx.save();
      ctx.globalAlpha = pf.alpha;
      ctx.strokeStyle = '#e6c878';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(230, 200, 120, 0.9)';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(pf.x, pf.y, pf.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 6. Render Gold Dust Particle Celebration Burst
    for (const pt of goldParticlesRef.current) {
      ctx.save();
      ctx.globalAlpha = pt.alpha;
      ctx.fillStyle = pt.color;
      ctx.shadowColor = 'rgba(230, 200, 120, 0.85)';
      ctx.shadowBlur = pt.size * 2.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 7. Aim Guideline & Cue Stick (When Aiming)
    if (isAiming && cueBall && !cueBall.isPotted && !isBallsMoving) {
      const rad = (aimAngle * Math.PI) / 180;
      const aimLength = DIFFICULTY_CONFIGS[difficulty].guideLength;

      const targetX = cueBall.x + Math.cos(rad) * aimLength;
      const targetY = cueBall.y + Math.sin(rad) * aimLength;

      // Trajectory Line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = difficulty === 'easy' ? 'rgba(252, 246, 186, 0.95)' : 'rgba(178, 151, 98, 0.85)';
      ctx.lineWidth = difficulty === 'easy' ? 2 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cueBall.x, cueBall.y);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target Impact Ring Indicator
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cueBall.x + Math.cos(rad) * 45, cueBall.y + Math.sin(rad) * 45, BALL_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // 3D Wooden Cue Stick Rendering
      const cueStartDist = 20 + (isCuePulling ? cueOffset : (shotPower / 100) * 20);
      const cueLength = 180;

      const cueStartX = cueBall.x - Math.cos(rad) * cueStartDist;
      const cueStartY = cueBall.y - Math.sin(rad) * cueStartDist;

      const cueEndX = cueBall.x - Math.cos(rad) * (cueStartDist + cueLength);
      const cueEndY = cueBall.y - Math.sin(rad) * (cueStartDist + cueLength);

      // Cue Shadow
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cueStartX + 4, cueStartY + 6);
      ctx.lineTo(cueEndX + 4, cueEndY + 6);
      ctx.stroke();

      // Cue Shaft Gradient (Ash/Maple + Brass Ferrule + Blue Chalk Tip)
      const cueGrad = ctx.createLinearGradient(cueStartX, cueStartY, cueEndX, cueEndY);
      cueGrad.addColorStop(0, '#3b82f6'); // Chalk tip
      cueGrad.addColorStop(0.02, '#d4bf8d'); // Brass ferrule
      cueGrad.addColorStop(0.2, '#fef08a'); // Canadian maple shaft
      cueGrad.addColorStop(1, '#291e18'); // Ebony butt handle

      ctx.strokeStyle = cueGrad;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cueStartX, cueStartY);
      ctx.lineTo(cueEndX, cueEndY);
      ctx.stroke();
    }
  };

  // Shot Trigger
  const handleShoot = () => {
    const cueBall = ballsRef.current.find((b) => b.id === 0);
    if (!cueBall || cueBall.isPotted || isBallsMoving) return;

    // Animate Cue Pull-back and Thrust Strike
    setIsCuePulling(true);
    setCueOffset(40);

    setTimeout(() => {
      setCueOffset(-5);
      playSound('strike');

      setTimeout(() => {
        setIsCuePulling(false);
        setCueOffset(0);

        // Apply impulse velocity
        const rad = (aimAngle * Math.PI) / 180;
        const speed = (shotPower / 100) * 22; // max speed

        cueBall.vx = Math.cos(rad) * speed;
        cueBall.vy = Math.sin(rad) * speed;

        setShotCount((prev) => prev + 1);
        setIsAiming(false);
        setMessage(`Strike executed at ${shotPower}% power!`);
      }, 80);
    }, 180);
  };

  // Update Mouse Position for HD Texture Loupe Inspector
  const updateLoupePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const canvasX = (e.clientX - rect.left) * (TABLE_WIDTH / rect.width);
    const canvasY = (e.clientY - rect.top) * (TABLE_HEIGHT / rect.height);

    setLoupePos({
      clientX: e.clientX,
      clientY: e.clientY,
      canvasX,
      canvasY,
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isLoupeMode || e.shiftKey) {
      setIsDraggingLoupe(true);
      updateLoupePosition(e);
      return;
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    updateLoupePosition(e);

    if (isLoupeMode || isDraggingLoupe) return;
    if (!isAiming || isBallsMoving) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (TABLE_WIDTH / rect.width);
    const mouseY = (e.clientY - rect.top) * (TABLE_HEIGHT / rect.height);

    const cueBall = ballsRef.current.find((b) => b.id === 0);
    if (!cueBall) return;

    const dx = mouseX - cueBall.x;
    const dy = mouseY - cueBall.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    setAimAngle(angle);
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingLoupe(false);
  };

  const handleCanvasMouseLeave = () => {
    setIsDraggingLoupe(false);
    setLoupePos(null);
  };

  return (
    <section
      ref={containerRef}
      id="playable-table"
      className={`py-20 bg-[#070707] border-t border-[#b29762]/30 relative overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto p-6 sm:p-10 bg-[#070707]' : ''
      }`}
    >
      {/* Background Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]" />
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              <Crown className="w-3.5 h-3.5 text-[#b29762]" />
              <span>Interactive 3D Playable Simulator</span>
            </div>
            <div className="w-8 h-[1px] bg-[#b29762]" />
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            Take a Shot at <span className="italic text-[#b29762]">Sandton Velvet</span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto">
            Test your cue ball precision right now. Swap exotic timber finishes in real-time, toggle magnetic casual mode, dial in shot velocity, or play in immersive full screen mode.
          </p>
        </div>

        {/* Game Mode Selector, Difficulty Assistant, and Full Screen Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121212] p-4 border border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            {/* Game Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setGameMode('8ball');
                  createRack('8ball');
                }}
                className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-1.5 border transition-all ${
                  gameMode === '8ball'
                    ? 'bg-[#b29762] text-black border-[#b29762]'
                    : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Standard 8-Ball</span>
              </button>

              <button
                onClick={() => {
                  setGameMode('trickshot');
                  createRack('trickshot', activeTrickShot);
                }}
                className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-1.5 border transition-all ${
                  gameMode === 'trickshot'
                    ? 'bg-[#b29762] text-black border-[#b29762]'
                    : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Trick Shot</span>
              </button>
            </div>

            {/* Difficulty Assistant Modes */}
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center space-x-1.5 bg-[#0a0a0a] p-1 border border-white/10">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold px-2 hidden md:inline">
                Difficulty:
              </span>
              {(['easy', 'standard', 'pro'] as DifficultyLevel[]).map((level) => {
                const conf = DIFFICULTY_CONFIGS[level];
                const isActive = difficulty === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setDifficulty(level);
                      setMessage(`Switched physics mode to: ${conf.name}. ${conf.description}`);
                    }}
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border transition-all ${
                      isActive
                        ? 'bg-[#b29762]/20 border-[#b29762] text-[#b29762]'
                        : 'border-transparent text-white/50 hover:text-white'
                    }`}
                    title={conf.description}
                  >
                    {level === 'easy' ? '⭐ Easy' : level === 'standard' ? 'Standard' : 'Pro'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Screen & Action Controls */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            {/* HD Texture Loupe Inspector Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextState = !isLoupeMode;
                setIsLoupeMode(nextState);
                setMessage(
                  nextState
                    ? '🔍 HD Loupe active: Drag over table surface to magnify velvet nap & timber grain in 3.5x HD!'
                    : 'Aiming mode restored: Drag to align cue shot & click canvas to strike.'
                );
              }}
              className={`px-3.5 py-2 text-[10px] font-bold font-sans uppercase tracking-wider flex items-center space-x-1.5 border transition-all ${
                isLoupeMode
                  ? 'bg-[#b29762] text-black border-[#b29762] shadow-[0_0_15px_rgba(178,151,98,0.5)] font-extrabold'
                  : 'bg-[#171717] border-[#b29762]/40 text-[#b29762] hover:bg-[#b29762] hover:text-black'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isLoupeMode ? 'Exit Loupe (3.5x)' : 'HD Texture Loupe'}</span>
            </button>

            {/* Full Screen Mode Toggle */}
            <button
              onClick={toggleFullscreen}
              type="button"
              className="px-4 py-2 bg-[#b29762] text-black hover:bg-white transition-all text-[10px] font-bold font-sans uppercase tracking-widest flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Full Screen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Play Full Screen</span>
                </>
              )}
            </button>

            <button
              onClick={handleGenerateShareSnapshot}
              type="button"
              className="px-3.5 py-2 bg-[#171717] border border-[#b29762]/40 text-[#b29762] hover:bg-[#b29762] hover:text-black transition-colors text-[10px] font-bold font-sans uppercase tracking-wider hidden md:flex items-center space-x-1.5 shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <div className="bg-[#0a0a0a] px-3 py-1.5 border border-white/10 flex items-center space-x-2">
              <span className="text-white/40 uppercase text-[9px]">Shots:</span>
              <span className="text-[#b29762] font-bold text-sm">{shotCount}</span>
            </div>

            <div className="bg-[#0a0a0a] px-3 py-1.5 border border-white/10 flex items-center space-x-2">
              <span className="text-white/40 uppercase text-[9px]">Potted:</span>
              <span className="text-[#b29762] font-bold text-sm">{pottedCount}</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 bg-[#0a0a0a] border border-white/10 text-white/60 hover:text-white"
              title={soundEnabled ? 'Mute Web Audio SFX' : 'Enable Web Audio SFX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#b29762]" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>
          </div>
        </div>

        {/* Main Canvas & Cue Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Canvas Viewport */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="relative w-full max-w-[700px] border-2 border-[#b29762]/40 bg-black p-2 shadow-2xl rounded-sm group">
              <canvas
                ref={canvasRef}
                width={TABLE_WIDTH}
                height={TABLE_HEIGHT}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseLeave}
                onClick={(e) => {
                  if (isLoupeMode) return;
                  handleShoot();
                }}
                className={`w-full h-auto block rounded-xs ${
                  isLoupeMode ? 'cursor-zoom-in' : 'cursor-crosshair'
                }`}
              />

              {/* Status Message Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a0a0a]/90 backdrop-blur-md px-4 py-2 border border-white/10 text-[11px] font-mono text-[#b29762] flex items-center justify-between">
                <span className="truncate">{message}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-sans">
                  {isLoupeMode ? 'Drag Loupe on Table' : 'Click Canvas to Shoot'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-[#121212] border border-white/10 p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#b29762] block">
                Shot Calibration Console
              </span>
              <h3 className="font-serif italic text-xl text-white">
                Cue Stick Controls
              </h3>
            </div>

            {/* Aim Angle Fine-tune Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60 uppercase text-[10px]">Aim Angle:</span>
                <span className="text-[#b29762] font-bold">{Math.round(aimAngle)}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={aimAngle}
                onChange={(e) => setAimAngle(Number(e.target.value))}
                className="w-full accent-[#b29762] bg-[#0a0a0a] cursor-pointer"
              />
            </div>

            {/* Power Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60 uppercase text-[10px]">Strike Power:</span>
                <span className="text-[#b29762] font-bold">{shotPower}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={shotPower}
                onChange={(e) => setShotPower(Number(e.target.value))}
                className="w-full accent-[#b29762] bg-[#0a0a0a] cursor-pointer"
              />
            </div>

            {/* Trick Shot Difficulty Selector (when in trick shot mode) */}
            {gameMode === 'trickshot' && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[9px] uppercase tracking-widest font-bold text-white/50 block">
                  Select Trick Shot Layout
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setActiveTrickShot(lvl);
                        createRack('trickshot', lvl);
                      }}
                      className={`py-2 text-[10px] font-bold uppercase tracking-wider border ${
                        activeTrickShot === lvl
                          ? 'bg-[#b29762] text-black border-[#b29762]'
                          : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      Stage {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleShoot}
                disabled={isBallsMoving}
                className="w-full py-3.5 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Execute Cue Shot</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => createRack(gameMode, activeTrickShot)}
                  className="w-full py-2.5 bg-[#0a0a0a] border border-white/15 text-white/70 font-bold text-[10px] uppercase tracking-widest hover:text-white hover:border-white/40 transition-all flex items-center justify-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Rack</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateShareSnapshot}
                  className="w-full py-2.5 bg-[#171717] border border-[#b29762]/40 text-[#b29762] font-bold text-[10px] uppercase tracking-widest hover:bg-[#b29762] hover:text-black transition-all flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Share Game</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Customize Your Table Interface Panel */}
        <div className="mt-12 bg-[#121212] border border-[#b29762]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b29762]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Customizer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#0a0a0a] border border-[#b29762]/40 text-[#b29762]">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#b29762]">
                      Real-Time Customizer
                    </span>
                    <span className="px-2 py-0.5 bg-[#b29762]/20 border border-[#b29762]/40 text-[#b29762] text-[8px] font-bold uppercase tracking-widest">
                      Live Preview
                    </span>
                  </div>
                  <h3 className="font-serif italic text-2xl text-white font-normal">
                    Customize Your Billiards Table
                  </h3>
                </div>
              </div>

              <p className="text-white/60 text-xs max-w-sm sm:text-right">
                Select your preferred Hainsworth championship felt weave and hand-rubbed timber finish to customize the simulator in real-time.
              </p>
            </div>

            {/* Felt Color Selection Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/70 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#b29762]" />
                  <span>Championship Felt Cloth Weave</span>
                </span>
                <span className="text-white/40 font-mono text-[10px]">
                  Active: <strong className="text-[#b29762]">{FELT_OPTIONS.find(f => f.id === activeFeltId)?.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {FELT_OPTIONS.map((felt) => {
                  const isSelected = activeFeltId === felt.id;
                  return (
                    <button
                      key={felt.id}
                      type="button"
                      onClick={() => setActiveFeltId(felt.id)}
                      className={`p-3.5 bg-[#0a0a0a] border text-left transition-all duration-300 relative group ${
                        isSelected
                          ? 'border-[#b29762] shadow-[0_0_15px_rgba(178,151,98,0.3)] bg-[#b29762]/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Swatch Color Circle */}
                      <div className="flex items-center space-x-2.5 mb-2">
                        <div
                          className="w-5 h-5 rounded-full border border-white/30 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: felt.previewColor }}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-[#b29762] transition-colors truncate">
                          {felt.name}
                        </span>
                      </div>

                      <p className="text-[9px] text-white/50 leading-tight">
                        {felt.tag}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wood Rail Finish Selection Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/70 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#b29762]" />
                  <span>Timber Cushion Rail Finish</span>
                </span>
                <span className="text-white/40 font-mono text-[10px]">
                  Active: <strong className="text-[#b29762]">{WOOD_OPTIONS.find(w => w.id === activeWoodId)?.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WOOD_OPTIONS.map((wood) => {
                  const isSelected = activeWoodId === wood.id;
                  return (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => setActiveWoodId(wood.id)}
                      className={`p-3.5 bg-[#0a0a0a] border text-left transition-all duration-300 relative group ${
                        isSelected
                          ? 'border-[#b29762] shadow-[0_0_15px_rgba(178,151,98,0.3)] bg-[#b29762]/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Timber Color Swatch */}
                      <div className="flex items-center space-x-2.5 mb-2">
                        <div
                          className="w-6 h-5 border shadow-inner transition-transform group-hover:scale-110 relative overflow-hidden"
                          style={{
                            backgroundColor: wood.previewColor,
                            borderColor: wood.trimColor,
                          }}
                        >
                          <div
                            className="absolute inset-x-0 top-0 h-[1px]"
                            style={{ backgroundColor: wood.trimColor }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-[#b29762] transition-colors truncate">
                          {wood.name}
                        </span>
                      </div>

                      <p className="text-[9px] text-white/50 leading-tight">
                        {wood.tag}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Craft Cocktail Pairing Guide */}
            <CraftCocktailPairing
              activeWoodId={activeWoodId}
              activeFeltId={activeFeltId}
              shotCount={shotCount}
              pottedCount={pottedCount}
            />
          </div>
        </div>
      </div>

      {/* Branded Social Snapshot Modal */}
      <AnimatePresence>
        {isShareModalOpen && snapshotImageDataUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#0f0f0f] border border-[#b29762]/50 shadow-[0_0_50px_rgba(178,151,98,0.3)] p-6 sm:p-8 space-y-6 my-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-black/50 border border-white/10 hover:border-[#b29762] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#b29762]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High-Resolution Social Card</span>
                </div>
                <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
                  Share Your Customized Billiards Table
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Your custom 3D snapshot has been rendered with official Basil's Billiards branding and match telemetry ready for social sharing.
                </p>
              </div>

              {/* Card Snapshot Preview Image */}
              <div className="relative border border-[#b29762]/30 overflow-hidden shadow-2xl bg-black">
                <img
                  src={snapshotImageDataUrl}
                  alt="Basil's Billiards Table Customization Snapshot"
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (!snapshotImageDataUrl) return;
                      const link = document.createElement('a');
                      link.download = `basils-billiards-snapshot-${Date.now()}.png`;
                      link.href = snapshotImageDataUrl;
                      link.click();
                    }}
                    type="button"
                    className="px-6 py-3 bg-[#b29762] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download High-Res Snapshot</span>
                  </button>

                  <button
                    onClick={async () => {
                      const shareText = `Check out my customized table at Basil's Billiards Sandton Lounge! Balls Potted: ${pottedCount} 🎱✨`;
                      try {
                        if (navigator.clipboard) {
                          await navigator.clipboard.writeText(shareText);
                          setCopySuccessToast(true);
                          setTimeout(() => setCopySuccessToast(false), 3000);
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    type="button"
                    className="px-5 py-3 bg-[#1a1a1a] border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-[#b29762] transition-all flex items-center space-x-2"
                  >
                    {copySuccessToast ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Caption Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center space-x-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out my custom pool table at Basil's Billiards Sandton Lounge! 🎱✨`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#1da1f2]/10 border border-[#1da1f2]/40 text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Twitter / X</span>
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Check out my custom pool table at Basil's Billiards Sandton Lounge! 🎱`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#25d366]/10 border border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366] hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating 3.5x HD Magnifying Glass Loupe Lens */}
      <AnimatePresence>
        {(isLoupeMode || isDraggingLoupe) && loupePos && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            style={{
              position: 'fixed',
              left: loupePos.clientX - 100,
              top: loupePos.clientY - 100,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
            className="flex flex-col items-center"
          >
            {/* Gold-Rimmed Lens Frame */}
            <div className="relative w-[200px] h-[200px] rounded-full border-4 border-[#b29762] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden bg-black/90 ring-2 ring-[#fcf6ba]/70">
              <canvas ref={loupeCanvasRef} width={200} height={200} className="w-full h-full block" />
              {/* Glass Glare Highlight Arc */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-black/30 pointer-events-none" />
              {/* Center Target Reticle Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#b29762] rounded-full shadow-[0_0_8px_#b29762]" />
              {/* Magnification Badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md border border-[#b29762]/70 text-[#b29762] text-[8px] font-mono font-bold uppercase tracking-widest rounded-full shadow-lg">
                3.5x HD MAGNIFICATION
              </div>
            </div>

            {/* Surface Metric Callout Tag */}
            <div className="mt-2 bg-[#080808]/95 backdrop-blur-md border border-[#b29762] px-3.5 py-1.5 shadow-2xl text-center space-y-0.5 min-w-[200px] rounded-xs">
              <div className="text-[9px] font-mono uppercase font-bold text-[#b29762] flex items-center justify-center space-x-1">
                <Search className="w-3 h-3 text-[#b29762]" />
                <span>
                  {loupePos.canvasX >= 25 &&
                  loupePos.canvasX <= TABLE_WIDTH - 25 &&
                  loupePos.canvasY >= 25 &&
                  loupePos.canvasY <= TABLE_HEIGHT - 25
                    ? 'Hainsworth® Velvet Nap'
                    : 'Exotic Hardwood Grain'}
                </span>
              </div>
              <div className="text-[10px] text-white font-semibold">
                {loupePos.canvasX >= 25 &&
                loupePos.canvasX <= TABLE_WIDTH - 25 &&
                loupePos.canvasY >= 25 &&
                loupePos.canvasY <= TABLE_HEIGHT - 25
                  ? `${FELT_OPTIONS.find((f) => f.id === activeFeltId)?.name} (300g/m²)`
                  : `${WOOD_OPTIONS.find((w) => w.id === activeWoodId)?.name}`}
              </div>
              <div className="text-[8px] text-white/50 uppercase tracking-widest font-mono">
                Micro-Calibrated Finish
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
