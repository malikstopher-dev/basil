import React from 'react';

interface BasilLogoProps {
  className?: string;
  size?: number;
  showTextLabel?: boolean;
  rotateBalls?: boolean;
}

export const BasilLogo: React.FC<BasilLogoProps> = ({
  className = '',
  size = 56,
  showTextLabel = false,
  rotateBalls = true,
}) => {
  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <style>{`
            @keyframes basilOrbitSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes basilBallUpright {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            .basil-orbit-ring {
              transform-origin: 120px 122px;
              animation: basilOrbitSpin 18s linear infinite;
            }
            .basil-upright-num {
              transform-origin: center;
              animation: basilBallUpright 18s linear infinite;
            }
          `}</style>

          {/* Metallic Frame Gradient */}
          <linearGradient id="bsss-frame-grad" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c2c2c" />
            <stop offset="50%" stopColor="#111111" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          {/* Cyan Script Text Gradient */}
          <linearGradient id="bsss-cyan-text" x1="0" y1="40" x2="240" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>

          {/* Gold Ball #9 Gradient */}
          <radialGradient id="ball9-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          {/* Cyan Ball #10 Gradient */}
          <radialGradient id="ball10-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#164e63" />
          </radialGradient>

          {/* Black Ball #8 Gradient */}
          <radialGradient id="ball8-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#525252" />
            <stop offset="60%" stopColor="#171717" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>

          {/* Metallic Gold Outer Ring */}
          <linearGradient id="bsss-gold-ring" x1="40" y1="40" x2="200" y2="200">
            <stop offset="0%" stopColor="#f0d486" />
            <stop offset="50%" stopColor="#b29762" />
            <stop offset="100%" stopColor="#8a7243" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Curved Triangle Rack Base */}
        <path
          d="M 120 18 Q 124 16 128 22 L 222 178 Q 228 188 218 196 L 22 196 Q 12 188 18 178 Z"
          fill="url(#bsss-frame-grad)"
          stroke="#333333"
          strokeWidth="3"
        />
        {/* Inner Curved Triangle cutout edge */}
        <path
          d="M 120 32 L 206 178 L 34 178 Z"
          fill="#000000"
          stroke="#1f1f1f"
          strokeWidth="2"
        />

        {/* Center Black Circle Background */}
        <circle cx="120" cy="122" r="66" fill="#030712" />

        {/* Stylized Cyan Cursive Text: "Basil's Billiards" */}
        <g filter="url(#cyan-glow)">
          {/* "Basil's" Script */}
          <text
            x="120"
            y="110"
            textAnchor="middle"
            fill="url(#bsss-cyan-text)"
            fontFamily="'Playfair Display', 'Brush Script MT', 'Georgia', cursive, serif"
            fontSize="32"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="-0.5"
            stroke="#002b36"
            strokeWidth="1"
          >
            Basil's
          </text>
          {/* "Billiards" Script */}
          <text
            x="120"
            y="140"
            textAnchor="middle"
            fill="url(#bsss-cyan-text)"
            fontFamily="'Playfair Display', 'Brush Script MT', 'Georgia', cursive, serif"
            fontSize="28"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="-0.5"
            stroke="#002b36"
            strokeWidth="1"
          >
            Billiards
          </text>
        </g>

        {/* --- ROTATING GOLD CIRCLE RING & 3 BILLIARD BALLS --- */}
        <g className={rotateBalls ? 'basil-orbit-ring' : ''}>
          {/* Outer Circular Ring Frame */}
          <circle cx="120" cy="122" r="76" fill="none" stroke="url(#bsss-gold-ring)" strokeWidth="4" />
          <circle cx="120" cy="122" r="70" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" />

          {/* 1. Top Ball #8 (At 12 o'clock, y=46) */}
          <g transform="translate(120, 46)">
            <circle cx="0" cy="0" r="16" fill="url(#ball8-grad)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <g className={rotateBalls ? 'basil-upright-num' : ''}>
              <text x="0" y="3.5" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="900" fontFamily="sans-serif">
                8
              </text>
            </g>
          </g>

          {/* 2. Bottom-Left Ball #9 (At ~7 o'clock, x=62, y=168) */}
          <g transform="translate(62, 168)">
            <circle cx="0" cy="0" r="16" fill="url(#ball9-grad)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <g className={rotateBalls ? 'basil-upright-num' : ''}>
              <text x="0" y="3.5" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="900" fontFamily="sans-serif">
                9
              </text>
            </g>
          </g>

          {/* 3. Bottom-Right Ball #10 (At ~5 o'clock, x=178, y=168) */}
          <g transform="translate(178, 168)">
            <circle cx="0" cy="0" r="16" fill="url(#ball10-grad)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <g className={rotateBalls ? 'basil-upright-num' : ''}>
              <text x="0" y="3" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                10
              </text>
            </g>
          </g>
        </g>
      </svg>

      {showTextLabel && (
        <div className="flex flex-col">
          <span className="font-serif italic text-lg sm:text-xl text-[#b29762] tracking-wide font-normal leading-tight">
            Basil's Billiards
          </span>
          <span className="text-[8px] uppercase tracking-[0.35em] text-white/60 font-medium">
            Supplier & Lounge
          </span>
        </div>
      )}
    </div>
  );
};
