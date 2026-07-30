import React, { useState, useEffect } from 'react';
import { ChevronUp, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../types';

interface LuxuryScrollProgressAndElevatorProps {
  totalMovies: number;
  onRandomPick: (movie: Movie) => void;
  catalog: Movie[];
}

export const LuxuryScrollProgressAndElevator: React.FC<LuxuryScrollProgressAndElevatorProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sound generator using Web Audio API for subtle luxury haptic click feedback
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Audio context fallbacks
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ULTRA LUXURY TOP SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00D1FF] via-purple-500 to-amber-400 transition-all duration-150 shadow-[0_0_12px_#00D1FF]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* MINIMAL FLOATING SCROLL CONTROLS */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-black/80 border border-white/15 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl flex items-center gap-1">
          {/* AUDIO SYNTH FEEDBACK TOGGLE */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound();
            }}
            className={`p-2 rounded-xl transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 text-white/40 border-white/10 hover:text-white'
            }`}
            title={soundEnabled ? 'Click Audio Effects Active' : 'Enable Subtle UI Audio Click Effects'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* BACK TO TOP BUTTON */}
          <button
            onClick={() => {
              playClickSound();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-2 bg-white/10 hover:bg-[#00D1FF] text-white hover:text-black rounded-xl transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

