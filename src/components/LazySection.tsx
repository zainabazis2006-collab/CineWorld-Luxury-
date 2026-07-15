import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string;
  rootMargin?: string;
}

export default function LazySection({ children, height = '350px', rootMargin = '300px' }: LazySectionProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin, // Pre-loads before the element actually scrolls into view for an invisible, fluid transition
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasBeenVisible, rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: hasBeenVisible ? 'auto' : height }}>
      {hasBeenVisible ? children : (
        <div className="w-full flex items-center justify-center bg-black/20 border border-white/5 rounded-2xl animate-pulse" style={{ height }}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-t-[#00D1FF] border-white/10 animate-spin" />
            <span className="text-xs text-white/40 font-mono tracking-widest uppercase">Initializing Canvas...</span>
          </div>
        </div>
      )}
    </div>
  );
}
