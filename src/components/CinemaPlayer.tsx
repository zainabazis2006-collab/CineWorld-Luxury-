import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Captions, 
  Sliders, 
  RotateCcw, 
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  Tv,
  SkipForward
} from 'lucide-react';
import { Movie } from '../types';

interface CinemaPlayerProps {
  movie: Movie;
  streamMode: 'full' | 'trailer';
  activeSeason?: number;
  activeEpisode?: number;
  onRotateStream?: () => void;
  safeStreamTitle?: string;
  backupIndex?: number;
}

// Map movies to actual beautiful, stable, high-definition public-domain/creative-commons video streams
const STREAM_ASSETS: Record<string, string> = {
  scifi: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Gorgeous 1080p CGI sci-fi movie
  fantasy: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", // Breathtaking fantasy animation
  comedy: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Fun, playful animation
  classic: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Surreal mechanical classic
  action: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback.mp4" // High-intensity road action
};

// Map movie categories or specific movie IDs to custom subtitles for immersive realistic playback
const SUBTITLE_TRACKS: Record<string, { time: number; text: string }[]> = {
  'dune-part-two': [
    { time: 2, text: "[Deep booming synth resonance]" },
    { time: 5, text: "Paul Atreides: The desert is our home now. We must learn its secrets." },
    { time: 10, text: "Chani: You do not know Arrakis. It will consume you if you fight it." },
    { time: 15, text: "Paul Atreides: I am not fighting it. I am leading it." },
    { time: 20, text: "[Massive sandstorm winds howling in distance]" },
    { time: 25, text: "Stilgar: He is the Lisan al-Gaib! The voice from the outer world!" },
    { time: 30, text: "Paul Atreides: Ride the worm, Chani. Let us show them the power of Arrakis!" }
  ],
  'oppenheimer': [
    { time: 2, text: "[Intense tick-tick-ticking clock sound builds]" },
    { time: 5, text: "J. Robert Oppenheimer: We are imagining a future that we cannot yet see..." },
    { time: 10, text: "General Groves: Is it safe? Will it ignite the entire atmosphere?" },
    { time: 15, text: "Oppenheimer: The chances are near zero." },
    { time: 20, text: "Groves: 'Near zero' is not zero!" },
    { time: 25, text: "[Sound of mathematical formulas being rapidly written on slate]" },
    { time: 30, text: "Oppenheimer: Now I am become Death, the destroyer of worlds." }
  ],
  'stranger-things': [
    { time: 2, text: "[Retro 1980s analog synthesizer music swells]" },
    { time: 5, text: "Dustin: Guys, my compass is pointing the wrong way! It's reacting to the gate." },
    { time: 10, text: "Mike: The gate to the Upside Down... it's close." },
    { time: 15, text: "Eleven: [Whispers] Demogorgon." },
    { time: 20, text: "[Eerie flesh-slithering sound echoes from walls]" },
    { time: 25, text: "Lucas: Get your slingshots ready. Something is coming!" }
  ],
  'the-last-of-us': [
    { time: 2, text: "[Gustavo Santaolalla melancholy acoustic guitar solo]" },
    { time: 5, text: "Joel: We keep our heads down, we survive. That's the only rule." },
    { time: 10, text: "Ellie: But what if I can actually fix everything? What if I'm the cure?" },
    { time: 15, text: "Joel: I've heard that story before, Ellie. It doesn't end well." },
    { time: 20, text: "[Terrifying clicker screeches echo in the abandoned subway]" },
    { time: 25, text: "Joel: [Grips rifle] Get behind me. Don't make a sound." }
  ],
  'the-bear': [
    { time: 2, text: "[Rapid metal pans clattering, high-stress kitchen noise]" },
    { time: 5, text: "Carmy: Hands! I need the onion puree on station one, NOW!" },
    { time: 10, text: "Richie: Carmy, the ticket machine is going absolutely nuts! We have 40 orders!" },
    { time: 15, text: "Carmy: Just fire the steaks, Richie! Stop talking! Fire the steaks!" },
    { time: 20, text: "Ayo Edebiri (Sydney): Chef, sauce is broken! We need to remount it!" },
    { time: 25, text: "Carmy: Corner! Hot pan! YES CHEF! Keep the energy!" }
  ]
};

// Generic subtitle backups based on genres
const GENRE_SUBTITLES: Record<string, { time: number; text: string }[]> = {
  horror: [
    { time: 3, text: "[Eerie wind whispers through the corridor]" },
    { time: 8, text: "What was that? Did you hear someone calling us?" },
    { time: 13, text: "Don't open that door. We need to leave this house right now." },
    { time: 18, text: "[Sound of heavy floorboards creaking slowly overhead]" },
    { time: 24, text: "Look, the shadows... they are moving by themselves!" }
  ],
  scifi: [
    { time: 3, text: "[System telemetry reading online • Bitrate: 14.8 Mbps]" },
    { time: 8, text: "Captain: Calibrate the quantum drive! We are entering the event horizon." },
    { time: 13, text: "AI Core: Core temp critical. Spacetime warp integrity at 88%." },
    { time: 18, text: "[Loud electromagnetic hum reverberates]" },
    { time: 24, text: "Navigator: Warp successful. This star system is completely unexplored!" }
  ],
  action: [
    { time: 3, text: "[Engines revving • High-speed chase music swells]" },
    { time: 8, text: "Get down! They are tracking our transponder!" },
    { time: 13, text: "Hold onto something! I'm taking the highway ramp at full speed!" },
    { time: 18, text: "[Tires screeching • Helicopters circling overhead]" },
    { time: 24, text: "Punch it! We have 30 seconds before they lock down the bridge!" }
  ],
  drama: [
    { time: 3, text: "[Soft, melancholy piano melody plays]" },
    { time: 8, text: "I waited for you... but time moved on without us." },
    { time: 13, text: "Sometimes, the hardest choices we make are the ones that save us." },
    { time: 18, text: "[A long, emotional silence falls between them]" },
    { time: 24, text: "We cannot go back to how we were. But we can build something new." }
  ]
};

export default function CinemaPlayer({ 
  movie, 
  streamMode, 
  activeSeason = 1, 
  activeEpisode = 1,
  onRotateStream,
  safeStreamTitle,
  backupIndex = 0
}: CinemaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeSubtitleLang, setActiveSubtitleLang] = useState<'EN' | 'KR' | 'ES' | 'OFF'>('EN');
  const [activeQuality, setActiveQuality] = useState<'1080p' | '4K' | '720p'>('1080p');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [showSkipIntro, setShowSkipIntro] = useState<boolean>(true);

  // Automatically fade controls out after 3 seconds of inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  // Handle source determination based on genre
  const getVideoStreamUrl = () => {
    const genres = movie.genres.map(g => g.toLowerCase());
    if (genres.includes('sci-fi') || genres.includes('adventure')) {
      return STREAM_ASSETS.scifi;
    } else if (genres.includes('fantasy')) {
      return STREAM_ASSETS.fantasy;
    } else if (genres.includes('comedy')) {
      return STREAM_ASSETS.comedy;
    } else if (genres.includes('horror') || genres.includes('thriller')) {
      return STREAM_ASSETS.classic;
    } else {
      return STREAM_ASSETS.action;
    }
  };

  const videoUrl = getVideoStreamUrl();

  // Reset states when movie, mode, or episode changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      setShowSkipIntro(true);
    }
  }, [movie.id, streamMode, activeSeason, activeEpisode, videoUrl]);

  // Synchronize playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Synchronize volume & mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Playback handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Hide skip intro after 30s
      if (videoRef.current.currentTime > 30) {
        setShowSkipIntro(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Skip Intro / Recap feature
  const handleSkipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 45; // Jump past the intro sequence
      setCurrentTime(45);
      setShowSkipIntro(false);
    }
  };

  // Fetch matched subtitle text based on current playback time
  const getSubtitleText = () => {
    if (activeSubtitleLang === 'OFF') return null;

    // Retrieve specific dialogues or default to genre subtitles
    let track = SUBTITLE_TRACKS[movie.id];
    if (!track) {
      const genres = movie.genres.map(g => g.toLowerCase());
      if (genres.includes('horror') || genres.includes('thriller')) track = GENRE_SUBTITLES.horror;
      else if (genres.includes('sci-fi') || genres.includes('fantasy')) track = GENRE_SUBTITLES.scifi;
      else if (genres.includes('action')) track = GENRE_SUBTITLES.action;
      else track = GENRE_SUBTITLES.drama;
    }

    // Find active subtitle block
    const matchingBlock = [...track]
      .reverse()
      .find(sub => currentTime >= sub.time && currentTime <= sub.time + 5.5);

    if (!matchingBlock) return null;

    // Apply simple translations for Korean or Spanish if selected
    if (activeSubtitleLang === 'KR') {
      if (matchingBlock.text.includes("Paul Atreides")) return "폴 아트레이디스: 사막은 이제 우리의 고향이다. 그 비밀을 배워야 한다.";
      if (matchingBlock.text.includes("Chani")) return "챠니: 당신은 아라키스를 모른다. 저항하면 삼켜질 것이다.";
      if (matchingBlock.text.includes("Oppenheimer")) return "오펜하이머: 나는 이제 죽음이요, 세상의 파괴자가 되었다.";
      if (matchingBlock.text.includes("Synthesizer")) return "[아날로그 신디사이저 사운드 고조]";
      if (matchingBlock.text.includes("Joel")) return "조엘: 머리 숙이고 살아남는 것, 그것이 유일한 규칙이다.";
      if (matchingBlock.text.includes("Ellie")) return "엘리: 내가 모든 것을 바로잡을 수 있다면요?";
      if (matchingBlock.text.includes("Carmy")) return "카미: 스태프들 주목! 양파 소스 빨리 올려!";
      return `[한국어 자막] ${matchingBlock.text}`;
    }

    if (activeSubtitleLang === 'ES') {
      if (matchingBlock.text.includes("Paul Atreides")) return "Paul Atreides: El desierto es nuestro hogar ahora. Debemos aprender sus secretos.";
      if (matchingBlock.text.includes("Chani")) return "Chani: No conoces Arrakis. Te consumirá si luchas contra él.";
      if (matchingBlock.text.includes("Oppenheimer")) return "Oppenheimer: Ahora me he convertido en la Muerte, el destructor de mundos.";
      if (matchingBlock.text.includes("Joel")) return "Joel: Mantenemos la cabeza baja, sobrevivimos. Es la única regla.";
      return `[ES] ${matchingBlock.text}`;
    }

    return matchingBlock.text;
  };

  const activeSubtitle = getSubtitleText();

  return (
    <div 
      id="cinema-theater-frame"
      ref={containerRef}
      className={`w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(0,209,255,0.25)] group select-none transition-all duration-500`}
      onDoubleClick={toggleFullscreen}
    >
      {/* Actual HTML5 Video Tag with custom events */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain pointer-events-none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        autoPlay
        playsInline
      />

      {/* Ambient Gradient Shadows around player bounds */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

      {/* Spinner/Buffer Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px] z-20">
          <div className="flex flex-col items-center gap-3">
            <span className="w-12 h-12 rounded-full border-4 border-[#00D1FF]/20 border-t-[#00D1FF] animate-spin"></span>
            <p className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-[0.2em] animate-pulse">Establishing CineWorld Stream 1080p...</p>
          </div>
        </div>
      )}

      {/* Live Synchronized Cinematic Subtitles Overlay */}
      {activeSubtitle && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-5 py-2.5 rounded-xl shadow-2xl text-center pointer-events-none z-10 max-w-[85%] md:max-w-[70%] animate-fade-in">
          <p className="text-white text-xs md:text-sm font-sans font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {activeSubtitle}
          </p>
        </div>
      )}

      {/* Floating Skip Intro Button */}
      {showSkipIntro && duration > 0 && currentTime > 4 && currentTime < 25 && (
        <button
          onClick={handleSkipIntro}
          className="absolute right-6 top-16 bg-black/85 border border-[#00D1FF]/30 hover:border-[#00D1FF] text-[#00D1FF] hover:text-black hover:bg-[#00D1FF] px-4 py-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.2)] z-10"
        >
          <SkipForward className="w-3.5 h-3.5 fill-current" />
          Skip Intro / Recap
        </button>
      )}

      {/* Top Floating Telemetry & Stream Details Header */}
      <div className={`absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none transition-all duration-300 z-10 ${showControls ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
        <div className="flex items-center gap-2.5 bg-black/75 border border-white/5 p-2 rounded-xl backdrop-blur-md">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
          <div>
            <p className="text-[9px] font-mono font-black uppercase text-white/90 tracking-widest flex items-center gap-1">
              {movie.type === 'Series' ? `PRESERVED SEASON ${activeSeason} • EPISODE ${activeEpisode}` : 'ORIGINAL PRESTIGE DIGITAL WORK'}
            </p>
            <p className="text-[8px] text-[#00D1FF] font-mono">CineWorld Direct Player v2.6 • Active HD Stream</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {movie.type === 'Series' && (
            <span className="bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
              S{activeSeason} Ep{activeEpisode}
            </span>
          )}
          <span className="bg-white/10 border border-white/10 text-white/70 px-2 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            Format: {activeQuality}
          </span>
        </div>
      </div>

      {/* Interactive Control Console Overlay Bar */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 flex flex-col gap-3 transition-all duration-300 z-20 ${showControls ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
        
        {/* Custom Progress Scrubber bar */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-white/50">{formatTime(currentTime)}</span>
          
          <div className="flex-1 relative flex items-center group/scrub">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-full outline-none appearance-none cursor-pointer accent-[#00D1FF] hover:h-2 transition-all"
              style={{
                background: `linear-gradient(to right, #00D1FF 0%, #00D1FF ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>

          <span className="text-[9px] font-mono text-white/50">{formatTime(duration)}</span>
        </div>

        {/* Lower Button Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            {/* Play / Pause button */}
            <button
              onClick={handlePlayPause}
              className="p-1.5 bg-[#00D1FF] text-black hover:scale-110 rounded-full transition-transform duration-200"
              title={isPlaying ? "Pause Stream" : "Play Stream"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Volume controls */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/70 hover:text-[#00D1FF] transition-colors p-1"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 h-1 bg-white/20 rounded-full outline-none appearance-none cursor-pointer accent-[#00D1FF]"
                style={{
                  background: `linear-gradient(to right, #00D1FF 0%, #00D1FF ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

            {/* Currently Playing Status */}
            <p className="text-[10px] font-mono text-white/60 truncate max-w-[200px] hidden md:block">
              NOW STREAMING: <strong className="text-white">{movie.title}</strong>
            </p>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            
            {/* Subtitles Track Selection */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubtitleMenu(!showSubtitleMenu);
                  setShowSpeedMenu(false);
                  setShowQualityMenu(false);
                }}
                className={`p-1.5 rounded hover:bg-white/5 transition-all text-xs flex items-center gap-1 ${activeSubtitleLang !== 'OFF' ? 'text-[#00D1FF]' : 'text-white/60'}`}
                title="Subtitles/CC Selection"
              >
                <Captions className="w-4 h-4" />
                <span className="text-[9px] font-mono font-bold uppercase">{activeSubtitleLang}</span>
              </button>

              {showSubtitleMenu && (
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-32 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider">Subtitles (CC)</p>
                  {(['EN', 'KR', 'ES', 'OFF'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveSubtitleLang(lang);
                        setShowSubtitleMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeSubtitleLang === lang ? 'bg-[#00D1FF]/10 text-[#00D1FF]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {lang === 'EN' ? 'English' : lang === 'KR' ? '한국어 (KR)' : lang === 'ES' ? 'Español' : 'Disabled'}
                      {activeSubtitleLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Speed selection */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSpeedMenu(!showSpeedMenu);
                  setShowSubtitleMenu(false);
                  setShowQualityMenu(false);
                }}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-all text-xs flex items-center gap-1"
                title="Playback Speed"
              >
                <Sliders className="w-4 h-4" />
                <span className="text-[9px] font-mono">{playbackSpeed}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-28 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider">Speed</p>
                  {[0.5, 1, 1.25, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        setShowSpeedMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playbackSpeed === speed ? 'bg-[#00D1FF]/10 text-[#00D1FF]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {speed === 1 ? 'Normal' : `${speed}x`}
                      {playbackSpeed === speed && <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality selection */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowQualityMenu(!showQualityMenu);
                  setShowSubtitleMenu(false);
                  setShowSpeedMenu(false);
                }}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-all text-xs flex items-center gap-1"
                title="Format Quality"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[9px] font-mono">{activeQuality}</span>
              </button>

              {showQualityMenu && (
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-32 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider">Format Quality</p>
                  {(['4K', '1080p', '720p'] as const).map(quality => (
                    <button
                      key={quality}
                      onClick={() => {
                        setActiveQuality(quality);
                        setShowQualityMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeQuality === quality ? 'bg-[#00D1FF]/10 text-[#00D1FF]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {quality === '4K' ? 'Ultra HD 4K' : quality === '1080p' ? 'Full HD 1080p' : 'Standard 720p'}
                      {activeQuality === quality && <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-4 w-[1px] bg-white/10"></div>

            {/* Rotate stream backup button (built inside controls) */}
            {onRotateStream && (
              <button
                onClick={onRotateStream}
                className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-all"
                title={`Rotate Stream Option (Active alternate #${backupIndex + 1})`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-white/70 hover:text-[#00D1FF] transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
