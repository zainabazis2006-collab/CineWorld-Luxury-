import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: string | number;
}

export default function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track normalized coordinates (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Rotations mapped from coordinate space
  // We use spring physics for a silky smooth, responsive luxury-grade feel
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { damping: 20, stiffness: 150 });

  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Update coordinates for spotlight effect
    const percentX = (mouseX / width) * 100;
    const percentY = (mouseY / height) * 100;
    setSpotlightPos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        perspective: 1000
      }}
      animate={{
        scale: isHovered ? 1.025 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
    >
      {/* Luxury moving spotlight glare overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-25 mix-blend-screen transition-all duration-100 ease-out"
          style={{
            background: `radial-gradient(circle 160px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 255, 255, 0.3), transparent 80%)`
          }}
        />
      )}
      
      {/* Translate inner contents on Z-axis during hover to complete the 3D hologram look */}
      <div 
        style={{ 
          transform: isHovered ? 'translateZ(12px)' : 'translateZ(0px)', 
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d' 
        }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
