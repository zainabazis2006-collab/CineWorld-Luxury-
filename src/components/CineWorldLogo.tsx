import React from 'react';

interface CineWorldLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export default function CineWorldLogo({ className = '', showText = true, size = 'md', onClick }: CineWorldLogoProps) {
  // Determine dimensions based on size prop
  const iconSize = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }[size];

  return (
    <div 
      className={`flex items-center gap-3 select-none cursor-pointer transition-all duration-300 hover:opacity-95 active:scale-95 ${className}`}
      onClick={onClick}
    >
      {/* 3D CW Logo Icon */}
      <svg
        className={`${iconSize} shrink-0 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Chrome Blue Outer Ring Gradient */}
          <linearGradient id="blueMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a2a4a" />
            <stop offset="30%" stopColor="#005a9c" />
            <stop offset="50%" stopColor="#00d1ff" />
            <stop offset="70%" stopColor="#005a9c" />
            <stop offset="100%" stopColor="#021424" />
          </linearGradient>

          {/* Silver Bevel Edge Gradient */}
          <linearGradient id="silverChrome" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#a6b0c3" />
            <stop offset="50%" stopColor="#4c566a" />
            <stop offset="75%" stopColor="#e5e9f0" />
            <stop offset="100%" stopColor="#8892b0" />
          </linearGradient>

          {/* Deep Maroon Play Button Gradient */}
          <linearGradient id="maroonPlay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800020" />
            <stop offset="50%" stopColor="#4a0e17" />
            <stop offset="100%" stopColor="#1a0005" />
          </linearGradient>
          
          <linearGradient id="maroonHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d03050" />
            <stop offset="100%" stopColor="#800020" />
          </linearGradient>

          {/* Shadow filters for realistic depth */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.6"/>
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* Circular beveled "C" outer outline */}
          <path
            d="M 135 155 A 72 72 0 1 1 135 45"
            stroke="url(#silverChrome)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner "C" Ring in Deep Blue & Cyan Metal */}
          <path
            d="M 130 150 A 65 65 0 1 1 130 50"
            stroke="url(#blueMetal)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Inside "C" Highlight bevel line */}
          <path
            d="M 125 145 A 58 58 0 1 1 125 55"
            stroke="url(#silverChrome)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Stylized Interlocked Beveled "W" */}
          {/* Outer edge shadow layer of W */}
          <path
            d="M 90 60 L 115 145 L 138 90 L 160 145 L 185 60"
            stroke="#000000"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
          />

          {/* Base stroke of W in Deep Blue Metal */}
          <path
            d="M 90 60 L 115 145 L 138 90 L 160 145 L 185 60"
            stroke="url(#blueMetal)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* High-contrast silver shine of W (Bevel highlight) */}
          <path
            d="M 90 60 L 115 145 L 138 90 L 160 145 L 185 60"
            stroke="url(#silverChrome)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Central Play Button Triangle (Maroon/Crimson 3D) */}
          <polygon
            points="85,75 125,100 85,125"
            fill="url(#maroonPlay)"
            stroke="url(#maroonHighlight)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Inner reflective play button accent */}
          <polygon
            points="88,83 115,100 88,117"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </g>
      </svg>

      {/* Brand Typography mimicking CineWorld logo */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline leading-none">
            <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#d03050] to-[#800020] bg-clip-text text-transparent">
              Cine
            </span>
            <span className="text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-[#ffffff] via-[#e5e9f0] to-[#a6b0c3] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              World
            </span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#00D1FF]/70 font-mono font-bold mt-1">
            LUXURY EDITION
          </span>
        </div>
      )}
    </div>
  );
}
