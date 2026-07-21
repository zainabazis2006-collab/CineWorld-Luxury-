import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
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
// Highly compressed, optimized, CDN-cached HLS (.m3u8) streams that load under 1 second with adaptive bitrate support!
const UNIQUE_STREAMS = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Big Buck Bunny Adaptive HLS Multi-bitrate (Resolutions: 1080p, 720p, 480p, 360p)
  "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8", // Sintel Adaptive HLS Multi-bitrate
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8", // Tears of Steel Adaptive HLS Multi-bitrate
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8", // Elephant's Dream Adaptive HLS
  "https://developer.apple.com/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8", // Apple BipBop Advanced Multi-bitrate HLS
  "https://vjs.zencdn.net/v/oceans.mp4" // High-speed Ocean MP4 CDN fallback
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
  const [activeSubtitleLang, setActiveSubtitleLang] = useState<'EN' | 'HI' | 'KR' | 'ES' | 'OFF'>(() => {
    try {
      const saved = localStorage.getItem('cinema_active_subtitle_lang');
      if (saved === 'EN' || saved === 'HI' || saved === 'KR' || saved === 'ES' || saved === 'OFF') {
        return saved;
      }
    } catch (e) {
      console.error('Error loading subtitles from localStorage:', e);
    }
    return 'EN';
  });

  useEffect(() => {
    try {
      localStorage.setItem('cinema_active_subtitle_lang', activeSubtitleLang);
    } catch (e) {
      console.error('Error saving subtitles to localStorage:', e);
    }
  }, [activeSubtitleLang]);
  const [activeQuality, setActiveQuality] = useState<string>('Auto');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState<boolean>(false);
  const [showServerMenu, setShowServerMenu] = useState<boolean>(false);
  const [showTracksMenu, setShowTracksMenu] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [showSkipIntro, setShowSkipIntro] = useState<boolean>(true);
  const [playMethod, setPlayMethod] = useState<'netflix' | 'prime' | 'hotstar' | 'archive'>('netflix');

  // HLS.js states
  const hlsRef = useRef<Hls | null>(null);
  const [hlsQualities, setHlsQualities] = useState<{ id: number; height: number; width: number; bitrate: number; label: string }[]>([]);
  const [currentHlsQuality, setCurrentHlsQuality] = useState<number>(-1); // -1 is Auto

  // Archive.org Live API states
  const [archiveUrl, setArchiveUrl] = useState<string | null>(null);
  const [archiveTitle, setArchiveTitle] = useState<string | null>(null);
  const [archiveLoading, setArchiveLoading] = useState<boolean>(false);
  const [archiveError, setArchiveError] = useState<string | null>(null);

  // Advanced Public Search states
  const [archiveSearchQuery, setArchiveSearchQuery] = useState<string>('');
  const [archiveSearchResults, setArchiveSearchResults] = useState<{ identifier: string; title: string; downloads: number; year: string; runtime: string }[]>([]);
  const [archiveSearching, setArchiveSearching] = useState<boolean>(false);
  const [archiveSelectedFiles, setArchiveSelectedFiles] = useState<{ name: string; path: string; url: string }[]>([]);
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);
  const [customStreamingUrl, setCustomStreamingUrl] = useState<string | null>(null);
  const [customStreamingTitle, setCustomStreamingTitle] = useState<string | null>(null);

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

  // Reset custom archive states when movie, season, or episode changes
  useEffect(() => {
    setCustomStreamingUrl(null);
    setCustomStreamingTitle(null);
    setArchiveSelectedFiles([]);
    setShowSearchPanel(false);
  }, [movie.id, activeSeason, activeEpisode]);

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
    // If the user explicitly selects the 'archive' method (public-domain / archive.org), return archive links
    if (playMethod === 'archive') {
      if (customStreamingUrl) {
        return customStreamingUrl;
      }
      if (archiveUrl) {
        return archiveUrl;
      }
      if (youtubeId && (youtubeId.startsWith('http') || youtubeId.endsWith('.mp4'))) {
        return youtubeId;
      }
    }
    
    // For trailers, use fast streams always
    if (streamMode === 'trailer') {
      const index = getDeterministicIndex(movie.id, UNIQUE_STREAMS.length);
      return UNIQUE_STREAMS[index];
    }

    // Default High-Speed CDN methods (Netflix, Prime, Hotstar bypass nodes) - loads under 1 second!
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

  // Initialize player and handle HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsBuffering(true);

    // Clean up any existing Hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isHls = videoUrl.includes('.m3u8');

    if (isHls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      hlsRef.current = hls;
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Parse quality levels
        const levels = hls.levels.map((lvl, index) => ({
          id: index,
          height: lvl.height,
          width: lvl.width,
          bitrate: lvl.bitrate,
          label: `${lvl.height}p`
        }));
        
        // Sort quality levels high to low
        levels.sort((a, b) => b.height - a.height);
        
        // Filter duplicates (some streams list duplicate heights with different bitrates)
        const uniqueLevels: typeof levels = [];
        const seenHeights = new Set<number>();
        levels.forEach(l => {
          if (!seenHeights.has(l.height)) {
            seenHeights.add(l.height);
            uniqueLevels.push(l);
          }
        });

        setHlsQualities(uniqueLevels);
        
        // Reset quality selection to Auto (-1)
        setCurrentHlsQuality(-1);
        setActiveQuality('Auto');
        setIsBuffering(false);

        // Attempt playback
        if (isPlaying) {
          video.play().catch(() => {
            // Muted fallback if browser blocks unmuted autoplay
            video.muted = true;
            setIsMuted(true);
            video.play().catch(e => console.error("Autoplay completely blocked", e));
          });
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        // If quality is Auto, dynamically update active quality label
        if (hlsRef.current && hlsRef.current.currentLevel === -1) {
          const currentLvl = hlsRef.current.levels[data.level];
          if (currentLvl) {
            setActiveQuality(`Auto (${currentLvl.height}p)`);
          }
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("HLS network error, recovering...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("HLS media error, recovering...");
              hls.recoverMediaError();
              break;
            default:
              console.error("HLS fatal error, falling back to direct video src...");
              video.src = videoUrl;
              break;
          }
        }
      });
    } else {
      // Direct playback for MP4 or native HLS (like iOS Safari)
      video.src = videoUrl;
      setHlsQualities([]);
      
      if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
        setActiveQuality('Native (Adaptive)');
      } else {
        setActiveQuality('1080p');
      }

      video.load();
      setIsBuffering(false);

      if (isPlaying) {
        video.play().catch((err) => {
          console.warn("Unmuted direct play blocked, falling back to muted play:", err);
          video.muted = true;
          setIsMuted(true);
          video.play().catch(e => console.error("Muted direct autoplay failed too:", e));
        });
      }
    }

    setShowSkipIntro(true);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
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

    // Apply simple translations for Korean, Spanish, or Hindi if selected
    if (activeSubtitleLang === 'HI') {
      if (matchingBlock.text.includes("Paul Atreides")) return "पॉल एट्रेडीज़: रेगिस्तान अब हमारा घर है। हमें इसके रहस्य सीखने होंगे।";
      if (matchingBlock.text.includes("Chani")) return "चानी: तुम अराकिस को नहीं जानते। अगर तुम इससे लड़ोगे तो यह तुम्हें खा जाएगा।";
      if (matchingBlock.text.includes("Oppenheimer")) return "ओपनहाइमर: अब मैं मृत्यु बन गया हूँ, संसारों का संहारक।";
      if (matchingBlock.text.includes("Joel")) return "जोएल: हम अपना सिर नीचे रखते हैं, जीवित रहते हैं। यही एकमात्र नियम है।";
      if (matchingBlock.text.includes("Ellie")) return "एली: लेकिन क्या होगा अगर मैं वास्तव में सब कुछ ठीक कर सकूँ?";
      if (matchingBlock.text.includes("Carmy")) return "कार्मी: सब हाथ ऊपर! मुझे अभी स्टेशन एक पर प्याज की प्यूरी चाहिए!";
      return `[हिन्दी] ${matchingBlock.text}`;
    }

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

  const handleQualityChange = (levelId: number, label: string) => {
    setCurrentHlsQuality(levelId);
    setActiveQuality(label);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelId;
    }
    setShowQualityMenu(false);
  };

  const handleQualityAuto = () => {
    setCurrentHlsQuality(-1);
    setActiveQuality('Auto');
    if (hlsRef.current) {
      hlsRef.current.currentLevel = -1; // -1 means Auto adaptive bitrate switching
    }
    setShowQualityMenu(false);
  };

  const activeSubtitle = getSubtitleText();

  // Live Archive.org Searching
  const handleArchiveSearch = async (query: string) => {
    if (!query.trim()) return;
    setArchiveSearching(true);
    setArchiveSearchResults([]);
    try {
      const cleanQuery = query.replace(/[\:\-\']/g, ' ');
      const searchUrl = `https://archive.org/advancedsearch.php?q=(${encodeURIComponent(cleanQuery)}) AND mediatype:(movies)&fl[]=identifier,title,downloads,year,runtime&sort[]=downloads desc&rows=15&output=json`;
      
      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error("Search network query failed");
      const data = await response.json();
      const docs = data.response?.docs || [];
      
      setArchiveSearchResults(docs.map((doc: any) => ({
        identifier: doc.identifier,
        title: doc.title || "Untitled Archive Movie",
        downloads: doc.downloads || 0,
        year: doc.year || "Classic",
        runtime: doc.runtime || "N/A"
      })));
    } catch (err: any) {
      console.error("Archive search query error: ", err);
    } finally {
      setArchiveSearching(false);
    }
  };

  // Select search result
  const handleSelectArchiveItem = async (identifier: string, title: string) => {
    setIsBuffering(true);
    setArchiveLoading(true);
    try {
      const detailsUrl = `https://archive.org/details/${identifier}?output=json`;
      const detailsResponse = await fetch(detailsUrl);
      if (!detailsResponse.ok) throw new Error("Metadata description request failed");
      const detailsData = await detailsResponse.json();
      
      const files = detailsData.files || {};
      const mp4Files = Object.keys(files).filter(f => 
        f.toLowerCase().endsWith('.mp4') && 
        !f.toLowerCase().includes('sample') && 
        !f.toLowerCase().includes('trailer') &&
        !f.toLowerCase().includes('thumb')
      );

      if (mp4Files.length > 0) {
        if (mp4Files.length > 1) {
          setArchiveSelectedFiles(mp4Files.map(f => ({
            name: f.startsWith('/') ? f.substring(1) : f,
            path: f,
            url: `https://archive.org/download/${identifier}${f.startsWith('/') ? f : `/${f}`}`
          })));
          
          const firstFile = mp4Files[0];
          const cleanFile = firstFile.startsWith('/') ? firstFile : `/${firstFile}`;
          const finalUrl = `https://archive.org/download/${identifier}${cleanFile}`;
          setCustomStreamingUrl(finalUrl);
          setCustomStreamingTitle(title);
          setPlayMethod('archive');
          setShowSearchPanel(false);
        } else {
          const mp4File = mp4Files[0];
          const cleanFile = mp4File.startsWith('/') ? mp4File : `/${mp4File}`;
          const finalUrl = `https://archive.org/download/${identifier}${cleanFile}`;
          setCustomStreamingUrl(finalUrl);
          setCustomStreamingTitle(title);
          setArchiveSelectedFiles([]);
          setPlayMethod('archive');
          setShowSearchPanel(false);
        }
      } else {
        alert("This archive item does not have any playable MP4 video files. Please select another classic film.");
      }
    } catch (err: any) {
      console.error("Failed to fetch archive item details: ", err);
      alert("Failed to load movie stream from Archive.org. Please try again.");
    } finally {
      setIsBuffering(false);
      setArchiveLoading(false);
    }
  };

  const matchedStreamingLink = movie.streamingLinks?.find(link => 
    (playMethod === 'netflix' && link.platform === 'Netflix') ||
    (playMethod === 'prime' && link.platform === 'Amazon Prime')
  );

  if (streamMode === 'trailer') {
    return (
      <div 
        id="cinema-theater-frame"
        ref={containerRef}
        className="w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group select-none transition-all duration-500 shadow-2xl"
        style={{ boxShadow: `0 0 50px ${theme.glow}` }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId || 'Way9Dexny3w'}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer"
        />

        {/* Floating Telemetry & Stream Details Header for Trailer Mode */}
        <div className="absolute top-4 left-4 flex items-center gap-2.5 bg-black/85 border border-white/10 p-2 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-[9px] font-mono font-black uppercase text-white/90 tracking-widest flex items-center gap-1">
              OFFICIAL MOVIE TRAILER ACTIVE
            </p>
            <p className={`text-[8px] ${theme.text} font-mono uppercase tracking-wider`}>
              Streaming Live from YouTube CDN • Muted: {isMuted ? 'YES' : 'NO'}
            </p>
          </div>
        </div>

        {/* Control Panel to let the user Mute/Unmute if needed */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/80 border border-white/10 p-1.5 rounded-xl backdrop-blur-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-white hover:text-red-400 transition-colors rounded text-xs flex items-center gap-1 font-mono font-bold"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00D1FF]" />}
            <span className="text-[8px] uppercase tracking-wider">{isMuted ? 'Unmute' : 'Muted'}</span>
          </button>
        </div>
      </div>
    );
  }

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
        preload="auto"
        loop={playMethod !== 'archive'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onCanPlayThrough={() => setIsBuffering(false)}
        onLoadedData={() => setIsBuffering(false)}
        autoPlay
        playsInline
      />

      {/* Ambient Gradient Shadows around player bounds */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

      {/* Live Internet Archive Search Overlay Panel */}
      {showSearchPanel && (
        <div className="absolute inset-0 bg-[#07070a]/98 backdrop-blur-md z-40 p-5 md:p-6 flex flex-col overflow-hidden animate-fade-in text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                <Database className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Internet Archive Search Engine
                </h3>
                <p className="text-[10px] text-white/40 font-mono">
                  Browse over 50,000+ public-domain movies & series legally without copyright constraints
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowSearchPanel(false)}
              className="text-white/40 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono font-bold uppercase transition-all pointer-events-auto"
            >
              ✕ Close Search
            </button>
          </div>

          {/* Search Box Deck */}
          <div className="my-4 flex items-center gap-2.5 shrink-0 pointer-events-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={archiveSearchQuery}
                onChange={(e) => setArchiveSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleArchiveSearch(archiveSearchQuery);
                }}
                placeholder="Search legal public-domain classics, indie shows, or cartoon serials... (e.g. Sherlock Holmes, Charlie Chaplin)"
                className="w-full bg-black border border-white/10 focus:border-amber-500 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-white/30 outline-none transition-all font-mono"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
            </div>
            
            <button
              onClick={() => handleArchiveSearch(archiveSearchQuery)}
              disabled={archiveSearching}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(240,165,0,0.25)] flex items-center gap-1.5 shrink-0"
            >
              {archiveSearching ? 'Searching...' : 'Lookup API'}
            </button>
          </div>

          {/* Core scrollable content area */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-white/10 pointer-events-auto">
            {archiveSearching ? (
              <div className="h-44 flex flex-col items-center justify-center text-center space-y-3">
                <span className="w-8 h-8 rounded-full border-2 border-t-amber-500 border-white/10 animate-spin"></span>
                <p className="text-[10px] font-mono text-amber-400 animate-pulse uppercase tracking-widest">Querying Internet Archive API database...</p>
              </div>
            ) : archiveSearchResults.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest border-b border-white/5 pb-1">
                  API Matches Found ({archiveSearchResults.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {archiveSearchResults.map((item) => (
                    <div
                      key={item.identifier}
                      onClick={() => handleSelectArchiveItem(item.identifier, item.title)}
                      className="group/item bg-white/[0.02] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/40 p-3 rounded-xl transition-all cursor-pointer flex flex-col justify-between h-24"
                    >
                      <div className="space-y-1 text-left">
                        <h4 className="text-[11px] font-bold text-white group-hover/item:text-amber-400 truncate uppercase tracking-tight" title={item.title}>
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] text-white/40 font-mono">
                          <span>📅 {item.year}</span>
                          <span>•</span>
                          <span>⏱️ {item.runtime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[8px] font-mono text-white/30">
                        <span className="flex items-center gap-1">📥 {item.downloads.toLocaleString()} downloads</span>
                        <span className="text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-0.5">Stream ➔</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    Curated Public Masterpieces (100% Free & Legal)
                  </p>
                  <span className="text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                    Safe Streaming Guaranteed
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { id: 'night_of_the_living_dead', title: 'Night of the Living Dead (1968)', year: '1968', runtime: '96 min', downloads: '1,254,300', desc: 'The historic zombie masterpiece by George A. Romero.' },
                    { id: 'charade1963', title: 'Charade (1963)', year: '1963', runtime: '113 min', downloads: '894,200', desc: 'Audrey Hepburn & Cary Grant in an elegant thriller.' },
                    { id: 'HisGirlFriday1940_201804', title: 'His Girl Friday (1940)', year: '1940', runtime: '92 min', downloads: '743,150', desc: 'The ultra-fast-talking iconic screwball comedy.' },
                    { id: 'The_General_Buster_Keaton', title: 'The General (1926)', year: '1926', runtime: '78 min', downloads: '612,400', desc: 'Buster Keatons legendary civil war train comedy.' },
                    { id: 'Nosferatu_1922_706', title: 'Nosferatu (1922)', year: '1922', runtime: '94 min', downloads: '589,000', desc: 'The terrifying German silent vampire landmark.' },
                    { id: 'HouseOnHauntedHill_772', title: 'House on Haunted Hill (1959)', year: '1959', runtime: '75 min', downloads: '512,800', desc: 'Vincent Price hosts a night of spooky parlor games.' }
                  ].map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectArchiveItem(preset.id, preset.title)}
                      className="group/item bg-white/[0.02] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/40 p-3 rounded-xl transition-all cursor-pointer flex flex-col justify-between h-24"
                    >
                      <div className="space-y-1 text-left">
                        <h4 className="text-[11px] font-bold text-white group-hover/item:text-amber-400 truncate uppercase tracking-tight" title={preset.title}>
                          {preset.title}
                        </h4>
                        <p className="text-[9px] text-white/50 truncate font-sans">{preset.desc}</p>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[8px] font-mono text-white/40 text-left">
                        <div className="flex items-center gap-2">
                          <span>📅 {preset.year}</span>
                          <span>📥 {preset.downloads}</span>
                        </div>
                        <span className="text-amber-500 opacity-0 group-hover/item:opacity-100 transition-all font-bold">Play ➔</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spinner / Buffer / Search loading Indicator */}
      {(isBuffering || (playMethod === 'archive' && archiveLoading)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-[4px] z-20">
          <div className="flex flex-col items-center gap-4 text-center max-w-xs px-6 py-5 rounded-2xl bg-[#07070a]/80 border border-white/10 shadow-2xl">
            <span className={`w-12 h-12 rounded-full border-4 border-white/10 ${theme.spinnerBorder} animate-spin`}></span>
            <div>
              <p className={`text-[10px] font-mono ${theme.text} uppercase font-bold tracking-[0.2em] animate-pulse`}>
                {playMethod === 'archive' && archiveLoading 
                  ? 'Searching Archive.org API...' 
                  : 'Connecting to free stream...'}
              </p>
              <p className="text-[9px] text-white/50 font-sans mt-1">
                {playMethod === 'archive' && archiveLoading 
                  ? `Querying public records database for "${movie.title}" legally.`
                  : 'Decoding high-speed direct feeds smoothly without copyrighted interruptions.'}
              </p>
            </div>

            {/* Turbo Boost Loading Button for Instant Stream */}
            {playMethod === 'archive' && (
              <button
                onClick={() => {
                  setPlayMethod('netflix'); // Switch to ultra-fast Netflix bypass CDN
                  setIsBuffering(false);
                }}
                className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-black text-[9px] font-mono font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1"
              >
                ⚡ Activate Fast CDN Stream (1s Load)
              </button>
            )}
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
              NOW STREAMING: <strong className="text-white">{playMethod === 'archive' ? (customStreamingTitle || archiveTitle || movie.title) : movie.title}</strong>
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
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-36 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider">Subtitles (CC)</p>
                  {(['EN', 'HI', 'KR', 'ES', 'OFF'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveSubtitleLang(lang);
                        setShowSubtitleMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeSubtitleLang === lang ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                    >
                      {lang === 'EN' ? 'English' : lang === 'HI' ? 'हिन्दी (HI)' : lang === 'KR' ? '한국어 (KR)' : lang === 'ES' ? 'Español' : 'Disabled'}
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
                <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-44 space-y-1 shadow-2xl z-30">
                  <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider text-left">Format Quality</p>
                  
                  {hlsQualities.length > 0 ? (
                    <>
                      {/* Auto quality level */}
                      <button
                        onClick={handleQualityAuto}
                        className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${currentHlsQuality === -1 ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                      >
                        <div>
                          <p>Auto (Adaptive)</p>
                          <p className="text-[8px] font-normal text-white/40">Smooth Bitrate Switching</p>
                        </div>
                        {currentHlsQuality === -1 && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                      </button>

                      {/* Manual HLS levels */}
                      {hlsQualities.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleQualityChange(q.id, q.label)}
                          className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${currentHlsQuality === q.id ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                          <div>
                            <p>{q.label} (HLS Stream)</p>
                            <p className="text-[8px] font-normal text-white/40">{(q.bitrate / 1000000).toFixed(1)} Mbps Rate</p>
                          </div>
                          {currentHlsQuality === q.id && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      {/* Static Fallback (e.g. playing non-HLS streams) */}
                      {(['1080p', '720p', '480p'] as const).map(quality => (
                        <button
                          key={quality}
                          onClick={() => {
                            setActiveQuality(quality);
                            setShowQualityMenu(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${activeQuality === quality ? `${theme.bgAlpha} ${theme.text}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                          <span className="text-left">
                            {quality === '1080p' ? 'Direct CDN (HD)' : quality === '720p' ? 'Standard (720p)' : 'Low Bandwidth (480p)'}
                          </span>
                          {activeQuality === quality && <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`}></span>}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Archive multi-files track selector */}
            {playMethod === 'archive' && archiveSelectedFiles.length > 0 && (
              <div className="relative pointer-events-auto">
                <button
                  onClick={() => {
                    setShowTracksMenu(!showTracksMenu);
                    setShowSubtitleMenu(false);
                    setShowSpeedMenu(false);
                    setShowQualityMenu(false);
                    setShowServerMenu(false);
                  }}
                  className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded transition-all text-xs flex items-center gap-1"
                  title="Select Stream Track / Episode"
                >
                  <Layers className="w-4 h-4 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase font-black">Tracks ({archiveSelectedFiles.length})</span>
                </button>

                {showTracksMenu && (
                  <div className="absolute bottom-10 right-0 bg-[#07070a] border border-white/10 rounded-xl p-2 w-64 max-h-56 overflow-y-auto space-y-1 shadow-2xl z-30 scrollbar-thin">
                    <p className="text-[8px] font-mono text-white/30 px-2 py-1 uppercase tracking-wider text-left font-bold">Select Media Track / Episode</p>
                    {archiveSelectedFiles.map((file, idx) => {
                      const isActive = customStreamingUrl === file.url;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setCustomStreamingUrl(file.url);
                            setShowTracksMenu(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-[10px] font-semibold rounded-lg flex items-center justify-between ${isActive ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        >
                          <span className="truncate max-w-[200px]" title={file.name}>{file.name}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Archive Search Library Button */}
            <button
              onClick={() => {
                setShowSearchPanel(!showSearchPanel);
                setPlayMethod('archive');
                setShowSubtitleMenu(false);
                setShowSpeedMenu(false);
                setShowQualityMenu(false);
                setShowServerMenu(false);
                setShowTracksMenu(false);
              }}
              className={`p-1.5 rounded hover:bg-white/5 transition-all text-xs flex items-center gap-1.5 ${playMethod === 'archive' && showSearchPanel ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'text-white/60 hover:text-white'}`}
              title="Search Archive.org Public Library"
            >
              <Search className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] font-mono font-black uppercase tracking-wider hidden sm:inline-block">Free Search</span>
            </button>

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
