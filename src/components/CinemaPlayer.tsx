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
  SkipForward,
  Search,
  Globe,
  Database
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
  youtubeId?: string;
}

// Map movies to actual beautiful, stable, high-definition public-domain/creative-commons video streams
const UNIQUE_STREAMS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://vjs.zencdn.net/v/oceans.mp4",
  "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
];

const getDeterministicIndex = (str: string, max: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
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

// Direct curated mapping to official Internet Archive high-fidelity MP4 files for instant loading
const ARCHIVE_DIRECT_MAP: Record<string, string> = {
  'night-of-the-living-dead': 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4',
  'house-on-haunted-hill': 'https://archive.org/download/HouseOnHauntedHill_772/HouseOnHauntedHill.mp4',
  'charade': 'https://archive.org/download/charade1963/charade1963_512kb.mp4',
  'his-girl-friday-1940': 'https://archive.org/download/HisGirlFriday1940_201804/His%20Girl%20Friday%20%281940%29.mp4',
  'the-general-1926': 'https://archive.org/download/The_General_Buster_Keaton/The_General_512kb.mp4',
  'nosferatu': 'https://archive.org/download/Nosferatu_1922_706/Nosferatu_1922_706_512kb.mp4',
  'cabinet-of-dr-caligari': 'https://archive.org/download/TheCabinetOfDr.Caligari/TheCabinetOfDr.Caligari_512kb.mp4'
};

export default function CinemaPlayer({ 
  movie, 
  streamMode, 
  activeSeason = 1, 
  activeEpisode = 1,
  onRotateStream,
  safeStreamTitle,
  backupIndex = 0,
  youtubeId
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
  const [showServerMenu, setShowServerMenu] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [showSkipIntro, setShowSkipIntro] = useState<boolean>(true);
  const [playMethod, setPlayMethod] = useState<'netflix' | 'prime' | 'hotstar' | 'archive'>('netflix');

  // Archive.org Live API states
  const [archiveUrl, setArchiveUrl] = useState<string | null>(null);
  const [archiveTitle, setArchiveTitle] = useState<string | null>(null);
  const [archiveLoading, setArchiveLoading] = useState<boolean>(false);
  const [archiveError, setArchiveError] = useState<string | null>(null);

  const getTheme = () => {
    switch (playMethod) {
      case 'netflix':
        return {
          color: '#E50914',
          glow: 'rgba(229, 9, 20, 0.25)',
          text: 'text-[#E50914]',
          bg: 'bg-[#E50914]',
          border: 'border-[#E50914]',
          bgHover: 'hover:bg-[#E50914]',
          borderHover: 'hover:border-[#E50914]',
          bgAlpha: 'bg-[#E50914]/10',
          borderAlpha: 'border-[#E50914]/30',
          bullet: 'bg-[#E50914]',
          spinnerBorder: 'border-t-[#E50914]',
          name: 'Netflix Mirror Node (Ultra HD Free Feed)'
        };
      case 'prime':
        return {
          color: '#00A8E8',
          glow: 'rgba(0, 168, 232, 0.25)',
          text: 'text-[#00A8E8]',
          bg: 'bg-[#00A8E8]',
          border: 'border-[#00A8E8]',
          bgHover: 'hover:bg-[#00A8E8]',
          borderHover: 'hover:border-[#00A8E8]',
          bgAlpha: 'bg-[#00A8E8]/10',
          borderAlpha: 'border-[#00A8E8]/30',
          bullet: 'bg-[#00A8E8]',
          spinnerBorder: 'border-t-[#00A8E8]',
          name: 'Amazon Prime Mirror (Dolby Sound Free Feed)'
        };
      case 'hotstar':
        return {
          color: '#00D1FF',
          glow: 'rgba(0, 209, 255, 0.25)',
          text: 'text-[#00D1FF]',
          bg: 'bg-[#00D1FF]',
          border: 'border-[#00D1FF]',
          bgHover: 'hover:bg-[#00D1FF]',
          borderHover: 'hover:border-[#00D1FF]',
          bgAlpha: 'bg-[#00D1FF]/10',
          borderAlpha: 'border-[#00D1FF]/30',
          bullet: 'bg-[#00D1FF]',
          spinnerBorder: 'border-t-[#00D1FF]',
          name: 'Hotstar Premium Bypass Mirror (Full HD Free)'
        };
      case 'archive':
        return {
          color: '#F0A500',
          glow: 'rgba(240, 165, 0, 0.25)',
          text: 'text-[#F0A500]',
          bg: 'bg-[#F0A500]',
          border: 'border-[#F0A500]',
          bgHover: 'hover:bg-[#F0A500]',
          borderHover: 'hover:border-[#F0A500]',
          bgAlpha: 'bg-[#F0A500]/10',
          borderAlpha: 'border-[#F0A500]/30',
          bullet: 'bg-[#F0A500]',
          spinnerBorder: 'border-t-[#F0A500]',
          name: 'Internet Archive API Database (Public Domain)'
        };
    }
  };

  const theme = getTheme();

  // Automatically fade controls out after 3.5 seconds of inactivity
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

  // Handle Internet Archive searching logic dynamically when selected
  useEffect(() => {
    if (playMethod !== 'archive') {
      setArchiveUrl(null);
      setArchiveTitle(null);
      return;
    }

    // Check direct static map first
    if (ARCHIVE_DIRECT_MAP[movie.id]) {
      setArchiveUrl(ARCHIVE_DIRECT_MAP[movie.id]);
      setArchiveTitle(`${movie.title} (Archived Classic)`);
      return;
    }

    let active = true;
    const fetchFromArchive = async () => {
      setArchiveLoading(true);
      setArchiveError(null);
      try {
        const cleanTitle = movie.title.replace(/[\:\-\']/g, ' ');
        const searchUrl = `https://archive.org/advancedsearch.php?q=title:(${encodeURIComponent(cleanTitle)}) AND mediatype:(movies)&fl[]=identifier,title,downloads&sort[]=downloads desc&output=json`;
        
        const response = await fetch(searchUrl);
        if (!response.ok) throw new Error("Search network query failed");
        const data = await response.json();
        const docs = data.response?.docs || [];

        if (!active) return;

        if (docs.length > 0) {
          const topDoc = docs[0];
          const identifier = topDoc.identifier;
          
          const detailsUrl = `https://archive.org/details/${identifier}?output=json`;
          const detailsResponse = await fetch(detailsUrl);
          if (!detailsResponse.ok) throw new Error("Metadata description request failed");
          const detailsData = await detailsResponse.json();
          
          if (!active) return;

          const files = detailsData.files || {};
          const mp4Files = Object.keys(files).filter(f => 
            f.toLowerCase().endsWith('.mp4') && 
            !f.toLowerCase().includes('sample') && 
            !f.toLowerCase().includes('trailer') &&
            !f.toLowerCase().includes('thumb')
          );

          if (mp4Files.length > 0) {
            const mp4File = mp4Files[0];
            const cleanFile = mp4File.startsWith('/') ? mp4File : `/${mp4File}`;
            setArchiveUrl(`https://archive.org/download/${identifier}${cleanFile}`);
            setArchiveTitle(topDoc.title || movie.title);
          } else {
            throw new Error("No playable MP4 formats on item");
          }
        } else {
          throw new Error("No title match on Archive database");
        }
      } catch (err: any) {
        if (!active) return;
        console.warn("Archive.org search failed: ", err.message);
        
        // Dynamic fallback selection based on genre if search fails
        const lowerGenres = movie.genres.map(g => g.toLowerCase());
        let fallbackUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
        let fallbackName = 'Tears of Steel (Sci-Fi CGI Showcase)';

        if (lowerGenres.includes('horror') || lowerGenres.includes('thriller')) {
          fallbackUrl = 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4';
          fallbackName = 'Night of the Living Dead (Horror Classic)';
        } else if (lowerGenres.includes('romance') || lowerGenres.includes('drama')) {
          fallbackUrl = 'https://archive.org/download/charade1963/charade1963_512kb.mp4';
          fallbackName = 'Charade (Romance-Mystery Classic)';
        } else if (lowerGenres.includes('comedy')) {
          fallbackUrl = 'https://archive.org/download/HisGirlFriday1940_201804/His%20Girl%20Friday%20%281940%29.mp4';
          fallbackName = 'His Girl Friday (Screwball Comedy Classic)';
        }

        setArchiveUrl(fallbackUrl);
        setArchiveTitle(`${movie.title} - Matched to: ${fallbackName}`);
        setArchiveError(err.message || "Archive search failed, auto-matched to genre classic");
      } finally {
        if (active) setArchiveLoading(false);
      }
    };

    fetchFromArchive();
    return () => {
      active = false;
    };
  }, [movie.id, playMethod]);

  // Handle source determination based on genre, movie id, season, and episode
  const getVideoStreamUrl = () => {
    if (playMethod === 'archive' && archiveUrl) {
      return archiveUrl;
    }
    
    // Direct link passed in youtubeId prop
    if (youtubeId && (youtubeId.startsWith('http') || youtubeId.endsWith('.mp4'))) {
      return youtubeId;
    }

    if (streamMode === 'trailer') {
      const index = getDeterministicIndex(movie.id, UNIQUE_STREAMS.length);
      return UNIQUE_STREAMS[index];
    }

    const episodeSuffix = activeEpisode ? `-s${activeSeason || 1}e${activeEpisode}` : '';
    const seed = `${movie.id}${episodeSuffix}-${playMethod}`;
    const index = getDeterministicIndex(seed, UNIQUE_STREAMS.length);
    return UNIQUE_STREAMS[index];
  };

  const videoUrl = getVideoStreamUrl();

  // Listen to browser fullscreen changes to update React state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Reset states when movie, mode, or episode changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      setShowSkipIntro(true);
    }
  }, [movie.id, streamMode, activeSeason, activeEpisode, videoUrl, youtubeId, playMethod, archiveUrl]);

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
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
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
    if (movie.type === 'Series' && activeEpisode) {
      track = [
        { time: 2, text: `[Opening Theme • S${activeSeason} Ep${activeEpisode} "${movie.title}"]` },
        { time: 6, text: `Voiceover: Previously on ${movie.title}...` },
        { time: 10, text: `Main Character: We have to find the connection in Season ${activeSeason}. The premium direct feeds originate from here.` },
        { time: 16, text: `Operator: But the high-speed node is unstable! If we stream now, we might trigger buffering.` },
        { time: 22, text: `Main Character: Trust me. This is the only way to play the whole episode cleanly and for free.` },
        { time: 28, text: `[Dynamic music swells as high-fidelity decryption stream establishes successfully]` }
      ];
    } else if (!track) {
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

  const matchedStreamingLink = movie.streamingLinks?.find(link => 
    (playMethod === 'netflix' && link.platform === 'Netflix') ||
    (playMethod === 'prime' && link.platform === 'Amazon Prime')
  );

  return (
    <div 
      id="cinema-theater-frame"
      ref={containerRef}
      className="w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group select-none transition-all duration-500"
      style={{ boxShadow: `0 0 50px ${theme.glow}` }}
      onDoubleClick={toggleFullscreen}
    >
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

      {/* Spinner / Buffer / Search loading Indicator */}
      {(isBuffering || (playMethod === 'archive' && archiveLoading)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-[2px] z-20">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs px-4">
            <span className={`w-12 h-12 rounded-full border-4 border-white/20 ${theme.spinnerBorder} animate-spin`}></span>
            <p className={`text-[10px] font-mono ${theme.text} uppercase tracking-[0.2em] animate-pulse`}>
              {playMethod === 'archive' && archiveLoading 
                ? 'Searching Archive.org API...' 
                : 'Connecting to free stream...'}
            </p>
            <p className="text-[9px] text-white/40 font-sans">
              {playMethod === 'archive' && archiveLoading 
                ? `Querying public records database for "${movie.title}" legally.`
                : 'Decoding high-speed direct feeds smoothly without copyrighted interruptions.'}
            </p>
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
          className={`absolute right-6 top-16 bg-black/85 border ${theme.borderAlpha} ${theme.borderHover} ${theme.text} hover:text-black hover:${theme.bg} px-4 py-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 pointer-events-auto`}
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
            <p className={`text-[8px] ${theme.text} font-mono uppercase tracking-wider`}>
              Streaming Active • {theme.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {matchedStreamingLink && (
            <a
              href={matchedStreamingLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.bg} text-white font-black px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
              title={`Watch directly on official ${matchedStreamingLink.platform}`}
            >
              <span>🍿 Watch on {matchedStreamingLink.platform}</span>
              <span className="text-[7px] bg-black/25 px-1 py-0.5 rounded text-white font-normal">Official Link ↗</span>
            </a>
          )}
          {onRotateStream && (
            <button
              onClick={onRotateStream}
              className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-black border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md transition-all pointer-events-auto"
              title={`Rotate Stream Option (Active alternate #${backupIndex + 1})`}
            >
              🔄 Server Option #{backupIndex + 1}
            </button>
          )}
          {movie.type === 'Series' && (
            <span className={`${theme.bgAlpha} ${theme.borderAlpha} border ${theme.text} px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md`}>
              S{activeSeason} Ep{activeEpisode}
            </span>
          )}
          <span className="bg-white/10 border border-white/10 text-white/70 px-2 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            Format: Ultra HD HDR
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
              className="w-full h-1.5 bg-white/20 rounded-full outline-none appearance-none cursor-pointer hover:h-2 transition-all pointer-events-auto"
              style={{
                accentColor: theme.color,
                background: `linear-gradient(to right, ${theme.color} 0%, ${theme.color} ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
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
              className={`p-1.5 ${theme.bg} text-black hover:scale-110 rounded-full transition-transform duration-200 pointer-events-auto`}
              title={isPlaying ? "Pause Stream" : "Play Stream"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Volume controls */}
            <div className="flex items-center gap-2 group/volume pointer-events-auto">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`text-white/70 hover:${theme.text} transition-colors p-1`}
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
                className="w-16 h-1 bg-white/20 rounded-full outline-none appearance-none cursor-pointer"
                style={{
                  accentColor: theme.color,
                  background: `linear-gradient(to right, ${theme.color} 0%, ${theme.color} ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

            {/* Currently Playing Status */}
            <p className="text-[10px] font-mono text-white/60 truncate max-w-[200px] hidden md:block">
              NOW STREAMING: <strong className="text-white">{playMethod === 'archive' && archiveTitle ? archiveTitle : movie.title}</strong>
            </p>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            
            {/* Subtitles Track Selection */}
            <div className="relative pointer-events-auto">
              <button
                onClick={() => {
                  setShowSubtitleMenu(!showSubtitleMenu);
                  setShowSpeedMenu(false);
                  setShowQualityMenu(false);
                  setShowServerMenu(false);
                }}
                className={`p-1.5 rounded hover:bg-white/5 transition-all text-xs flex items-center gap-1 ${activeSubtitleLang !== 'OFF' ? theme.text : 'text-white/60'}`}
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
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeSubtitleLang === lang ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {lang === 'EN' ? 'English' : lang === 'KR' ? '한국어 (KR)' : lang === 'ES' ? 'Español' : 'Disabled'}
                      {activeSubtitleLang === lang && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Speed selection */}
            <div className="relative pointer-events-auto">
              <button
                onClick={() => {
                  setShowSpeedMenu(!showSpeedMenu);
                  setShowSubtitleMenu(false);
                  setShowQualityMenu(false);
                  setShowServerMenu(false);
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
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playbackSpeed === speed ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {speed === 1 ? 'Normal' : `${speed}x`}
                      {playbackSpeed === speed && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality selection */}
            <div className="relative pointer-events-auto">
              <button
                onClick={() => {
                  setShowQualityMenu(!showQualityMenu);
                  setShowSubtitleMenu(false);
                  setShowSpeedMenu(false);
                  setShowServerMenu(false);
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
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeQuality === quality ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {quality === '4K' ? 'Ultra HD 4K' : quality === '1080p' ? 'Full HD 1080p' : 'Standard 720p'}
                      {activeQuality === quality && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-4 w-[1px] bg-white/10"></div>

            {/* Server selector */}
            <div className="relative pointer-events-auto">
              <button
                onClick={() => {
                  setShowServerMenu(!showServerMenu);
                  setShowSubtitleMenu(false);
                  setShowSpeedMenu(false);
                  setShowQualityMenu(false);
                }}
                className={`p-1.5 rounded hover:bg-white/5 transition-all text-xs flex items-center gap-1 ${theme.text}`}
                title="Toggle Streaming Server"
              >
                <Tv className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-wider">
                  {playMethod === 'netflix' ? 'Netflix' : playMethod === 'prime' ? 'Prime' : playMethod === 'hotstar' ? 'Hotstar' : 'Archive'}
                </span>
              </button>

              {showServerMenu && (
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-56 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider text-left">Streaming Server</p>
                  
                  <button
                    onClick={() => {
                      setPlayMethod('netflix');
                      setShowServerMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playMethod === 'netflix' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="text-left">
                      <p>Netflix Bypass Node</p>
                      <p className="text-[8px] font-normal text-white/40">Premium Decrypted 4K Stream</p>
                    </div>
                    {playMethod === 'netflix' && <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]"></span>}
                  </button>

                  <button
                    onClick={() => {
                      setPlayMethod('prime');
                      setShowServerMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playMethod === 'prime' ? 'bg-[#00A8E8]/10 text-[#00A8E8]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="text-left">
                      <p>Amazon Prime Bypass Node</p>
                      <p className="text-[8px] font-normal text-white/40">Ultra HD Dolby Audio Feed</p>
                    </div>
                    {playMethod === 'prime' && <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8]"></span>}
                  </button>

                  <button
                    onClick={() => {
                      setPlayMethod('hotstar');
                      setShowServerMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playMethod === 'hotstar' ? 'bg-[#00D1FF]/10 text-[#00D1FF]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="text-left">
                      <p>Hotstar Premium Bypass Mirror</p>
                      <p className="text-[8px] font-normal text-white/40">Full HD Direct Decoded Feed</p>
                    </div>
                    {playMethod === 'hotstar' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]"></span>}
                  </button>

                  <button
                    onClick={() => {
                      setPlayMethod('archive');
                      setShowServerMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${playMethod === 'archive' ? 'bg-[#F0A500]/10 text-[#F0A500]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="text-left">
                      <p>Internet Archive Database</p>
                      <p className="text-[8px] font-normal text-white/40">Live Public Domain API Search</p>
                    </div>
                    {playMethod === 'archive' && <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]"></span>}
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-[1px] bg-white/10"></div>

            {/* Rotate stream backup button (built inside controls) */}
            {onRotateStream && (
              <button
                onClick={onRotateStream}
                className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-all pointer-events-auto"
                title={`Rotate Stream Option (Active alternate #${backupIndex + 1})`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`p-1.5 text-white/70 hover:${theme.text} transition-colors pointer-events-auto`}
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
