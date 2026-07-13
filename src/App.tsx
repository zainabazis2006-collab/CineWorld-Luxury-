import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Star, 
  Mic, 
  MicOff, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Check, 
  Plus, 
  Globe, 
  Compass, 
  Tv, 
  User, 
  Bookmark, 
  Share2,
  Trash2,
  Sliders,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { CURATED_CATALOG, TRANSLATIONS } from './data';
import { Movie, Review, UserState, ChatMessage } from './types';
import { getSeriesSeasons } from './episodes';
import { motion, AnimatePresence } from 'motion/react';
import ComingSoonSection from './components/ComingSoonSection';
import KoreanRomanceSection from './components/KoreanRomanceSection';
import TrendingChart from './components/TrendingChart';
import HorrorShowcaseSection from './components/HorrorShowcaseSection';
import ComedySection from './components/ComedySection';
import ActionSection from './components/ActionSection';
import TiltCard from './components/TiltCard';
import CinemaPlayer from './components/CinemaPlayer';
import CineWorldLogo from './components/CineWorldLogo';
import CinematicAuth from './components/CinematicAuth';
import GenreCarousel from './components/GenreCarousel';

// Cinematic Official Trailer YouTube Video IDs for every movie & series
const TRAILER_IDS: Record<string, string> = {
  'dune-part-two': 'Way9Dexny3w',
  'oppenheimer': 'uYPbbksJxIg',
  'interstellar': 'zSWdZVtXT7E',
  'spider-verse': 'g4Hbz2jWDvQ',
  'the-dark-knight': 'EXeTwQWrcwY',
  'stranger-things': 'b9EkMc79ZSU',
  'the-crown': 'JWtnJjn6ng0',
  'black-mirror': 'V0XOApF5nLU',
  'the-boys': 'M1bhOaLv4FU',
  'rings-of-power': 'f2Cs-SXZ_f8',
  'fleabag': 'aX2VIv_h9To',
  'the-mandalorian': 'aOC8E8z_ifw',
  'loki': 'nW948VaI4vA',
  'shogun': 'yAN5SbyvTlg',
  'squid-game': 'oqxAJKy0R4I',
  'wednesday': 'Di310WS8zLk',
  'reacher': 'GGf_p_0PymA',
  'the-bear': 'gC7bS_Ibyf8',
  'succession': 't33G-E_QnI0',
  'avatar-way-of-water': 'd9MyW72ELq0',
  'damsel': 'T39_6_S70fU',
  'enola-holmes-1': '1d0Zf9sXlGs',
  'enola-holmes-2': 'KKXNmYoPk6g',
  'enola-holmes-3': 'kLp9A_mN_V0',
  'from-series': 'p77f_z366S8',
  'widows-bay': 'NId1S8vIdO0',
  'alice-in-borderland': '49_44FFKZ1M',
  'if-wishes-could-kill': '_pTzV3vB-y0',
  'all-of-us-are-dead': 'IN5TD4y9FPM',
  'voicemails-by-isabelle': 'Y2p_2hF8r_k',
  'crash-landing-on-you': 'Syk_Y8QD5YQ',
  'queen-of-tears': 'S-e_9tI-N-A',
  'past-lives': 'mGle9Y7-P-c',
  'my-demon': '9kS8_Vf2uLw',
  'shaitaan': 'ypSgS8K8z84',
  'the-last-of-us': 'uLtkt8BonwM',
  'the-conjuring': 'k10ETZ71qbh',
  'jujutsu-kaisen': 'fVzWn-kPz_U',
  'parasite': '5xH0HfJHsaY',
  'breaking-bad': 'HhesaQXLuRY',
  'brooklyn-nine-nine': 'sEOu_PrFi7s',
  'the-office': 'gO8N3m_XMWY',
  'modern-family': 'X0lRj8P6v80',
  'mad-max-fury-road': 'hEJnMQG9ld8',
  'john-wick-4': 'qEVUtrk8_B4',
  'rrr': 'NgBoMJy386M',
  'tumbbad': 'sN7AtRE40UY',
  'hereditary': 'V6wWKNij_1M',
  'panchayat': '91_r0Bf3L-g',
  'schitts-creek': 'W0uM_ZLe9go',
  'goblin': '8Ac0WstXn6g',
  'business-proposal': 'M-PHcxPkYAI'
};

// Pre-populate some historical reviews to make the platform feel like a rich, authoritative encyclopedia
const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    movieId: 'shogun',
    userEmail: 'lord.blackthorne@cineworld.vip',
    rating: 5,
    comment: 'The sheer linguistic precision and commitment to period authenticity elevates this beyond standard television. It is a cinematic triumph that honors historical narrative architecture.',
    createdAt: '2026-07-02T10:14:00Z'
  },
  {
    id: 'rev-2',
    movieId: 'stranger-things',
    userEmail: 'synth.wave84@cineworld.vip',
    rating: 5,
    comment: 'Masterfully weaves nostalgia with genuinely dark, cosmic-horror tension. The analog synthesizer themes and atmospheric focus are unmatched.',
    createdAt: '2026-07-03T18:25:00Z'
  },
  {
    id: 'rev-3',
    movieId: 'fleabag',
    userEmail: 'theatre.critic@cineworld.vip',
    rating: 5,
    comment: 'Brilliant fourth-wall transgression. It creates a confessionary compact with the viewer that is raw, agonizingly funny, and deeply human.',
    createdAt: '2026-07-04T09:40:00Z'
  }
];

// Client-side fallback API fetcher to ensure high-resolution movie posters and backdrops
// even when running in static-only hosting environments like Vercel where custom API proxy routes are not supported.
async function fetchMediaImagesDirectly(title: string, type: string, defaultPoster: string, defaultBackdrop: string) {
  let posterUrl = '';
  let backdropUrl = '';

  // 1. Try iTunes Search API (extremely reliable, clean posters, CORS friendly)
  try {
    const iTunesMedia = type === 'Series' ? 'tvShow' : 'movie';
    const iTunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}&media=${iTunesMedia}&limit=1`;
    const response = await fetch(iTunesUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const item = data.results[0];
        if (item.artworkUrl100) {
          // Convert standard 100x100 artwork to high-resolution (600x900bb)
          posterUrl = item.artworkUrl100.replace(/100x100bb\.(jpg|png|gif)/i, '600x900bb.$1');
        }
      }
    }
  } catch (err) {
    console.error('iTunes client-side fallback failed:', err);
  }

  // 2. Try TVmaze for TV Series or as fallback
  if (type === 'Series' || !posterUrl) {
    try {
      const tvMazeUrl = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}`;
      const response = await fetch(tvMazeUrl);
      if (response.ok) {
        const data = await response.json();
        if (data && data.image) {
          if (!posterUrl) {
            posterUrl = data.image.original || data.image.medium;
          }
          backdropUrl = data.image.original || data.image.medium;
        }
      }
    } catch (err) {
      console.error('TVmaze client-side fallback failed:', err);
    }
  }

  return {
    posterUrl: posterUrl || defaultPoster,
    backdropUrl: backdropUrl || defaultBackdrop
  };
}

export default function App() {
  // Load state from localStorage if available, otherwise default
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('cineworld_user_state_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      ratings: {},
      watchlist: ['shogun', 'fleabag'],
      reviews: {},
      genreClicks: { 'Sci-Fi': 2, 'Drama': 1 },
      clicks: {},
      preferredLanguage: 'en',
      region: 'IN'
    };
  });

  // Save state updates to localStorage
  useEffect(() => {
    localStorage.setItem('cineworld_user_state_v1', JSON.stringify(userState));
  }, [userState]);

  // General App states
  const [selectedMovieId, setSelectedMovieId] = useState<string>('shogun');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [theaterMovieId, setTheaterMovieId] = useState<string | null>(null); // Full screen modal trailer player state
  const [isCarouselPlaying, setIsCarouselPlaying] = useState<boolean>(true);

  // Free Stream Match Mode and Backup Stream Index state
  const [streamMode, setStreamMode] = useState<'full' | 'trailer'>('full');
  const [backupIndex, setBackupIndex] = useState<number>(0);

  // Series Season & Episode State
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  // Dynamic images state resolved from our custom proxy API
  const [resolvedImages, setResolvedImages] = useState<Record<string, { posterUrl: string; backdropUrl: string }>>(() => {
    try {
      const saved = localStorage.getItem('cineworld_resolved_images_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save resolved images to localStorage
  useEffect(() => {
    localStorage.setItem('cineworld_resolved_images_v3', JSON.stringify(resolvedImages));
  }, [resolvedImages]);

  // Prioritize active selected movie resolution
  useEffect(() => {
    if (!selectedMovieId || (resolvedImages[selectedMovieId]?.posterUrl && resolvedImages[selectedMovieId]?.backdropUrl)) return;
    const movie = CURATED_CATALOG.find(m => m.id === selectedMovieId);
    if (!movie) return;

    let active = true;
    async function resolveActive() {
      try {
        let data = null;
        try {
          const response = await fetch(`/api/media-images?title=${encodeURIComponent(movie.title)}&type=${encodeURIComponent(movie.type)}`);
          if (response.ok) {
            data = await response.json();
          } else {
            throw new Error('Backend dynamic API not available, falling back');
          }
        } catch (fetchErr) {
          // If custom Express backend is not serving this route (e.g., on Vercel), query direct APIs on the client
          data = await fetchMediaImagesDirectly(movie.title, movie.type, movie.posterUrl, movie.backdropUrl);
        }

        if (active && data && (data.posterUrl || data.backdropUrl)) {
          setResolvedImages(prev => ({
            ...prev,
            [movie.id]: {
              posterUrl: data.posterUrl || prev[movie.id]?.posterUrl || movie.posterUrl,
              backdropUrl: data.backdropUrl || prev[movie.id]?.backdropUrl || movie.backdropUrl
            }
          }));
        }
      } catch (err) {
        console.error(`Failed to prioritize resolve for ${movie.title}:`, err);
      }
    }
    resolveActive();
    return () => { active = false; };
  }, [selectedMovieId]);

  // Sequential background pre-fetcher for all movies in the catalog
  useEffect(() => {
    let active = true;
    const moviesToResolve = CURATED_CATALOG.filter(m => !resolvedImages[m.id]);

    async function resolveNext(index: number) {
      if (!active || index >= moviesToResolve.length) return;
      const movie = moviesToResolve[index];

      try {
        let data = null;
        try {
          const response = await fetch(`/api/media-images?title=${encodeURIComponent(movie.title)}&type=${encodeURIComponent(movie.type)}`);
          if (response.ok) {
            data = await response.json();
          } else {
            throw new Error('Backend dynamic API not available, falling back');
          }
        } catch (fetchErr) {
          // Fallback to client-side public APIs if Express proxy fails or is not present
          data = await fetchMediaImagesDirectly(movie.title, movie.type, movie.posterUrl, movie.backdropUrl);
        }

        if (active && data && (data.posterUrl || data.backdropUrl)) {
          setResolvedImages(prev => ({
            ...prev,
            [movie.id]: {
              posterUrl: data.posterUrl || prev[movie.id]?.posterUrl || movie.posterUrl,
              backdropUrl: data.backdropUrl || prev[movie.id]?.backdropUrl || movie.backdropUrl
            }
          }));
        }
      } catch (err) {
        console.error(`Failed to background resolve for ${movie.title}:`, err);
      }

      // Add a 300ms delay to keep it fast but polite to external search APIs
      setTimeout(() => {
        if (active) resolveNext(index + 1);
      }, 300);
    }

    if (moviesToResolve.length > 0) {
      resolveNext(0);
    }

    return () => { active = false; };
  }, []); // Run on mount only to prevent infinite loop

  // Dynamic display catalog mapping depending on the chosen posterSafetyMode and resolved images
  const displayCatalog = CURATED_CATALOG.map(movie => {
    const resolved = resolvedImages[movie.id];
    let poster = userState.posterSafetyMode === 'safe' ? (movie.safePosterUrl || movie.posterUrl) : movie.posterUrl;
    let backdrop = userState.posterSafetyMode === 'safe' ? (movie.safeBackdropUrl || movie.backdropUrl) : movie.backdropUrl;

    // Use our high-resolution, hotlink-friendly resolved images if available
    if (resolved?.posterUrl) poster = resolved.posterUrl;
    if (resolved?.backdropUrl) backdrop = resolved.backdropUrl;

    return {
      ...movie,
      posterUrl: poster,
      backdropUrl: backdrop
    };
  });

  // Automatically reset stream mode, backup index, season, and episode when the theater movie changes
  useEffect(() => {
    if (theaterMovieId) {
      setStreamMode('full');
      setBackupIndex(0);
      setActiveSeason(1);
      setActiveEpisode(1);
    }
  }, [theaterMovieId]);

  // Automated 10-second carousel timer for the Hero Showcase Section
  useEffect(() => {
    if (!isCarouselPlaying) return;
    
    const timer = setInterval(() => {
      setSelectedMovieId((prevId) => {
        const currentIndex = displayCatalog.findIndex(m => m.id === prevId);
        const nextIndex = (currentIndex + 1) % displayCatalog.length;
        return displayCatalog[nextIndex].id;
      });
    }, 10000);
    
    return () => clearInterval(timer);
  }, [selectedMovieId, isCarouselPlaying, displayCatalog]);
  
  // Custom reviews state
  const [allReviews, setAllReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('cineworld_reviews_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('cineworld_reviews_v1', JSON.stringify(allReviews));
  }, [allReviews]);

  // Review Input fields
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewerEmail, setReviewerEmail] = useState<string>('cinephile@cineworld.vip');

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-init',
        sender: 'assistant',
        text: 'Welcome, esteemed guest, to the CineWorld Luxury Discovery Salon. I am your personal AI curator, fully tuned to our live catalog metadata. How may I direct your screening priorities today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Voice Command Routing State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [speechError, setSpeechError] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  // Translate helper
  const t = (key: string): string => {
    const lang = userState.preferredLanguage || 'en';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  // Find currently selected movie
  const currentMovie = displayCatalog.find(m => m.id === selectedMovieId) || displayCatalog[0];

  // Record a click on a movie to train recommendation engine
  const handleMovieSelect = (movieId: string) => {
    setSelectedMovieId(movieId);
    setTheaterMovieId(movieId); // Automatically start playing trailer in theater modal
    
    // Find movie to increment genre clicks
    const movie = displayCatalog.find(m => m.id === movieId);
    if (movie) {
      setUserState(prev => {
        const nextClicks = { ...prev.clicks, [movieId]: (prev.clicks[movieId] || 0) + 1 };
        const nextGenreClicks = { ...prev.genreClicks };
        movie.genres.forEach(g => {
          nextGenreClicks[g] = (nextGenreClicks[g] || 0) + 1;
        });
        return {
          ...prev,
          clicks: nextClicks,
          genreClicks: nextGenreClicks
        };
      });
    }
  };

  // Record a click on a genre directly
  const handleGenreSelect = (genre: string) => {
    setActiveGenre(genre);
    if (genre !== 'All') {
      setUserState(prev => {
        const nextGenreClicks = { ...prev.genreClicks, [genre]: (prev.genreClicks[genre] || 0) + 1 };
        return { ...prev, genreClicks: nextGenreClicks };
      });
    }
  };

  // Toggle Watchlist
  const toggleWatchlist = (movieId: string) => {
    setUserState(prev => {
      const exists = prev.watchlist.includes(movieId);
      let nextWatchlist: string[];
      if (exists) {
        nextWatchlist = prev.watchlist.filter(id => id !== movieId);
      } else {
        nextWatchlist = [...prev.watchlist, movieId];
      }
      return { ...prev, watchlist: nextWatchlist };
    });
  };

  // Submit dynamic rating from the stars
  const submitRating = (movieId: string, stars: number) => {
    setUserState(prev => {
      const nextRatings = { ...prev.ratings, [movieId]: stars };
      return { ...prev, ratings: nextRatings };
    });
  };

  // Submit written review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      movieId: selectedMovieId,
      userEmail: reviewerEmail.trim() || 'anonymous@cineworld.vip',
      rating: reviewRating,
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString()
    };

    setAllReviews(prev => [newReview, ...prev]);
    
    // Update ratings matrix
    setUserState(prev => {
      const nextRatings = { ...prev.ratings, [selectedMovieId]: reviewRating };
      return { ...prev, ratings: nextRatings };
    });

    setReviewComment('');
  };

  // Delete a self-written review
  const handleDeleteReview = (reviewId: string) => {
    setAllReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  // Voice recognition logic
  const handleVoiceListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is not supported in this browser environment.");
      setTimeout(() => setSpeechError(""), 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = userState.preferredLanguage === 'hi' ? 'hi-IN' : 
                       userState.preferredLanguage === 'es' ? 'es-ES' :
                       userState.preferredLanguage === 'ja' ? 'ja-JP' :
                       userState.preferredLanguage === 'ar' ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setVoiceTranscript('');

    recognition.onresult = (event: any) => {
      const transcriptText = event.results[0][0].transcript;
      setVoiceTranscript(transcriptText);
      processVoiceCommand(transcriptText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Error", event.error);
      setSpeechError(`Voice Error: ${event.error}`);
      setTimeout(() => setSpeechError(""), 3000);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Process natural voice keywords
  const processVoiceCommand = (command: string) => {
    const lower = command.toLowerCase().trim();
    
    // Check for movie titles
    let matchedMovie: Movie | undefined = undefined;
    
    if (lower.includes('stranger') || lower.includes('things')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'stranger-things');
    } else if (lower.includes('crown')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'the-crown');
    } else if (lower.includes('mirror') || lower.includes('black')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'black-mirror');
    } else if (lower.includes('boys')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'the-boys');
    } else if (lower.includes('rings') || lower.includes('power') || lower.includes('lord')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'rings-of-power');
    } else if (lower.includes('fleabag')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'fleabag');
    } else if (lower.includes('mandalorian') || lower.includes('star wars')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'the-mandalorian');
    } else if (lower.includes('loki')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'loki');
    } else if (lower.includes('shogun') || lower.includes('shōgun')) {
      matchedMovie = CURATED_CATALOG.find(m => m.id === 'shogun');
    }

    if (matchedMovie) {
      handleMovieSelect(matchedMovie.id);
      // Give feedback in chat
      pushSystemChatMessage(`Voice Command detected: "view ${matchedMovie.title}". Switching hero layout view.`);
      return;
    }

    // Check for platforms
    if (lower.includes('netflix')) {
      setActivePlatform('Netflix');
      pushSystemChatMessage('Voice Command detected: Filter platform "Netflix".');
      return;
    } else if (lower.includes('prime') || lower.includes('amazon')) {
      setActivePlatform('Amazon Prime');
      pushSystemChatMessage('Voice Command detected: Filter platform "Amazon Prime".');
      return;
    } else if (lower.includes('disney') || lower.includes('hotstar')) {
      setActivePlatform('Disney+ Hotstar');
      pushSystemChatMessage('Voice Command detected: Filter platform "Disney+ Hotstar".');
      return;
    }

    // Check for genres
    const genres = ['Sci-Fi', 'Horror', 'Drama', 'History', 'Adventure', 'Fantasy', 'Comedy', 'Thriller', 'War'];
    const matchedGenre = genres.find(g => lower.includes(g.toLowerCase()));
    if (matchedGenre) {
      handleGenreSelect(matchedGenre);
      pushSystemChatMessage(`Voice Command detected: Filter genre "${matchedGenre}".`);
      return;
    }

    if (lower.includes('coming soon') || lower.includes('upcoming') || lower.includes('soon')) {
      document.getElementById("coming-soon-section")?.scrollIntoView({ behavior: 'smooth' });
      pushSystemChatMessage('Voice Command detected: Navigating to Coming Soon Premium Telemetry.');
      return;
    }

    if (lower.includes('korean') || lower.includes('romance') || lower.includes('love') || lower.includes('hallyu')) {
      document.getElementById("korean-romance-section")?.scrollIntoView({ behavior: 'smooth' });
      pushSystemChatMessage('Voice Command detected: Navigating to Korean Romantic Masterpieces Portal.');
      return;
    }

    if (lower.includes('reset') || lower.includes('all') || lower.includes('clear')) {
      setActiveGenre('All');
      setActivePlatform('All');
      setSearchQuery('');
      pushSystemChatMessage('Voice Command detected: Resetting all filters.');
      return;
    }

    // If no command match, feed it to the chatbot directly
    pushUserChatMessage(command);
  };

  const pushSystemChatMessage = (text: string) => {
    setChatMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'assistant',
        text: `✨ ${text}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const pushUserChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          // Feed the last 4 messages for conversational context
          history: chatMessages.slice(-4)
        })
      });

      if (!response.ok) {
        throw new Error('API server returned an error state');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I apologize, my premium telemetry failed to generate a reply.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedMovies: data.suggestedMovies || [],
        suggestedAction: data.suggestedAction || undefined
      };

      setChatMessages(prev => [...prev, assistantMsg]);

      // Automatically apply suggested UI actions if the model proposed them
      if (data.suggestedAction && data.suggestedAction.type !== 'none') {
        const { type, payload } = data.suggestedAction;
        if (type === 'filter_genre' && payload) {
          // find matching genre capitalization
          const found = ['Sci-Fi', 'Horror', 'Drama', 'History', 'Adventure', 'Fantasy', 'Comedy', 'Thriller', 'War', 'Biography', 'Anthology']
            .find(g => g.toLowerCase() === payload.toLowerCase());
          if (found) handleGenreSelect(found);
        } else if (type === 'filter_platform' && payload) {
          const found = ['Netflix', 'Amazon Prime', 'Disney+ Hotstar']
            .find(p => p.toLowerCase() === payload.toLowerCase());
          if (found) setActivePlatform(found);
        } else if (type === 'view_movie' && payload) {
          const foundMovie = displayCatalog.find(m => m.id === payload || m.title.toLowerCase().includes(payload.toLowerCase()));
          if (foundMovie) {
            handleMovieSelect(foundMovie.id);
          }
        } else if (type === 'reset') {
          setActiveGenre('All');
          setActivePlatform('All');
          setSearchQuery('');
        }
      }

    } catch (err) {
      console.error('Chat submission failure', err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: "I encountered a transient latency error communicating with the CineWorld server core. Feel free to browse using our luxurious dashboard filters manually or try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Calculate the "Suggested For You" recommendations mathematically as requested by the PRD
  // Base recommendation logic:
  // - Calculate alignment score for all movies
  // - High score = highly relevant
  const recommendationMatrix = displayCatalog.map(movie => {
    let score = 0;
    
    // 1. Explicit Rating correlation:
    const userRating = userState.ratings[movie.id];
    if (userRating) {
      score += userRating * 15; // Higher stars significantly boost score
    }

    // 2. Behavioral Click frequency on same genres:
    movie.genres.forEach(genre => {
      const clicks = userState.genreClicks[genre] || 0;
      score += clicks * 8; // Prioritize categories the user repeatedly explores
    });

    // 3. User explicit Watchlist:
    if (userState.watchlist.includes(movie.id)) {
      score += 25; // Watchlist implies strong interest
    }

    // 4. Specific movie clicks tracking:
    const specificClicks = userState.clicks[movie.id] || 0;
    score += specificClicks * 5;

    // 5. Normalization offset to ensure beautiful, realistic percentage matches (between 65% and 99%)
    const baseMatchPercent = Math.min(99, 65 + score);

    return {
      movie,
      matchPercentage: baseMatchPercent,
      reason: userRating && userRating >= 4 ? t('highlyRecommended') : t('suggestedMatch')
    };
  })
  // Sort recommendations descending by match percentage, then rating
  .sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Filter main list based on:
  // - search query
  // - genre filter
  // - platform filter
  const filteredCatalog = displayCatalog.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.directorOrCreator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = activeGenre === 'All' || movie.genres.includes(activeGenre);
    
    const matchesPlatform = activePlatform === 'All' || 
                            movie.streamingLinks.some(link => link.platform === activePlatform);
    
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  // Collect all unique genres
  const allGenres = ['All', ...Array.from(new Set(displayCatalog.flatMap(m => m.genres)))];

  if (!userState.isLoggedIn) {
    return (
      <CinematicAuth 
        userState={userState} 
        onAuthSuccess={(updatedState) => setUserState(prev => ({ ...prev, ...updatedState }))} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-[#F5F5F5] font-sans relative overflow-x-hidden flex flex-col selection:bg-[#00D1FF]/30 selection:text-white">
      
      {/* Immersive Atmospheric Ambient Glows */}
      <div className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#1A3A5F] blur-[150px] opacity-35 animate-pulse-glow-1 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[700px] h-[700px] rounded-full bg-[#4A1D2C] blur-[180px] opacity-25 animate-pulse-glow-2 pointer-events-none z-0"></div>
      <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0"></div>

      {/* Luxury Decorative Top Banner / Status Indicator */}
      <div className="relative z-30 bg-black/40 border-b border-white/5 text-[11px] uppercase tracking-[0.25em] text-white/40 px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></span>
            CineWorld Authority Server: Connected
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline">Precision Metadata Feed v2.4</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <CineWorldLogo showText={false} size="sm" onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setSearchQuery(''); }} />
          
          {/* User Profile Avatar badge & Email */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="text-xs sm:text-sm">
              {userState.selectedAvatar === 'director' ? '🎬' :
               userState.selectedAvatar === 'critic' ? '🧐' :
               userState.selectedAvatar === 'scifi' ? '🚀' :
               userState.selectedAvatar === 'horror' ? '👻' :
               userState.selectedAvatar === 'romance' ? '💖' :
               userState.selectedAvatar === 'action' ? '💥' : '👤'}
            </span>
            <span className="text-white/80 font-semibold text-xs capitalize hidden sm:inline truncate max-w-[100px]">
              {userState.userName || 'Cinephile'}
            </span>
            <span className="text-white/40 font-mono text-[10px] hidden md:inline">
              ({userState.email || 'zainab.azis2006@gmail.com'})
            </span>
          </div>

          {/* Logout Action */}
          <button 
            onClick={() => setUserState(prev => ({ ...prev, isLoggedIn: false }))}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d03050]/10 hover:bg-[#d03050]/25 border border-[#d03050]/25 text-[#ff4c6c] hover:text-[#ff6a85] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shrink-0"
            title="Exit Screening Session"
          >
            <span>Exit Theater</span>
          </button>
        </div>
      </div>

      {/* Top Header Navigation bar */}
      <header className="relative z-20 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-12 flex-1 max-w-xl">
            <CineWorldLogo 
              size="md" 
              onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setSearchQuery(''); }} 
            />
            
            {/* Quick-Filter Navigation */}
            <nav className="hidden xl:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/60">
              <button 
                onClick={() => { setActiveGenre('All'); setActivePlatform('All'); }} 
                className={`transition-colors duration-200 hover:text-white pb-1 border-b-2 ${activeGenre === 'All' && activePlatform === 'All' ? 'text-white border-[#00D1FF]' : 'border-transparent'}`}
              >
                {t('allShows')}
              </button>
              <button 
                onClick={() => handleGenreSelect('Sci-Fi')} 
                className={`transition-colors duration-200 hover:text-white pb-1 border-b-2 ${activeGenre === 'Sci-Fi' ? 'text-white border-[#00D1FF]' : 'border-transparent'}`}
              >
                Sci-Fi
              </button>
              <button 
                onClick={() => handleGenreSelect('Drama')} 
                className={`transition-colors duration-200 hover:text-white pb-1 border-b-2 ${activeGenre === 'Drama' ? 'text-white border-[#00D1FF]' : 'border-transparent'}`}
              >
                Drama
              </button>
              <button 
                onClick={() => { setActivePlatform('Disney+ Hotstar'); }} 
                className={`transition-colors duration-200 hover:text-white pb-1 border-b-2 ${activePlatform === 'Disney+ Hotstar' ? 'text-white border-[#00D1FF]' : 'border-transparent'}`}
              >
                Disney+
              </button>
            </nav>
          </div>

          {/* Premium Header Search bar */}
          <div className="flex-1 max-w-xs md:max-w-md mx-2 relative group z-30">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shows, creators, cast..."
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#00D1FF] focus:bg-black/80 rounded-xl px-4 py-2 pl-10 pr-8 text-xs text-white placeholder-white/30 outline-none transition-all duration-300"
              />
              <Compass className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#00D1FF] transition-colors" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Floating Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-11 left-0 w-full bg-[#0b0b12]/95 border border-white/15 rounded-xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.9)] backdrop-blur-md z-50 max-h-72 overflow-y-auto space-y-1">
                <div className="text-[10px] font-bold text-[#00D1FF]/70 uppercase tracking-widest px-2 pb-1.5 border-b border-white/5 flex justify-between items-center">
                  <span>Instant Results ({filteredCatalog.length})</span>
                  <span className="text-[8px] text-white/30 font-mono">Dynamic suggestions</span>
                </div>
                {filteredCatalog.length === 0 ? (
                  <div className="text-center py-4 text-xs text-white/40 italic">
                    No results found
                  </div>
                ) : (
                  filteredCatalog.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => {
                        handleMovieSelect(movie.id);
                        setSearchQuery('');
                        // Smoothly scroll to player showcase
                        document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-[#00D1FF]/10 text-white transition-all group"
                    >
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        referrerPolicy="no-referrer" 
                        className="w-8 h-10 object-cover rounded border border-white/10 shrink-0" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-[#00D1FF] truncate transition-colors">{movie.title}</p>
                        <p className="text-[10px] text-white/40 font-mono truncate">{movie.directorOrCreator} • {movie.runtimeOrSeasons}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-0.5">
                        <span className="text-[9px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-[#00D1FF]">WATCH</span>
                        <span className="text-[8px] text-white/30 font-mono">★ {movie.rating}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Settings & Switchers Grid */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* Geolocation Region Selector */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
              <Globe className="w-3.5 h-3.5 text-[#00D1FF]" />
              <select 
                value={userState.region} 
                onChange={(e) => setUserState(prev => ({ ...prev, region: e.target.value }))}
                className="bg-transparent border-none outline-none text-white font-mono cursor-pointer text-xs pr-1"
                aria-label={t('regionLabel')}
              >
                <option value="IN" className="bg-[#0b0b12]">IN (Hotstar-Region)</option>
                <option value="US" className="bg-[#0b0b12]">US (Global-West)</option>
                <option value="UK" className="bg-[#0b0b12]">UK (Europe-HQ)</option>
                <option value="JP" className="bg-[#0b0b12]">JP (Asia-East)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
              <Sliders className="w-3.5 h-3.5 text-red-500" />
              <select 
                value={userState.preferredLanguage} 
                onChange={(e) => setUserState(prev => ({ ...prev, preferredLanguage: e.target.value }))}
                className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs pr-1"
                aria-label={t('languageLabel')}
              >
                <option value="en" className="bg-[#0b0b12]">English</option>
                <option value="hi" className="bg-[#0b0b12]">हिन्दी (Hindi)</option>
                <option value="ar" className="bg-[#0b0b12]">العربية (Arabic)</option>
                <option value="ja" className="bg-[#0b0b12]">日本語 (Japanese)</option>
                <option value="es" className="bg-[#0b0b12]">Español (Spanish)</option>
              </select>
            </div>

            {/* Poster Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
              <select 
                value={userState.posterSafetyMode || 'original'} 
                onChange={(e) => setUserState(prev => ({ ...prev, posterSafetyMode: e.target.value as 'safe' | 'original' }))}
                className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs pr-1"
                aria-label="Poster Safety Mode"
              >
                <option value="original" className="bg-[#0b0b12]">Original Art</option>
                <option value="safe" className="bg-[#0b0b12]">Safe Art</option>
              </select>
            </div>
            
            {/* Watchlist Counter Badge */}
            <div className="relative bg-white/5 p-2 rounded-full border border-white/10 hidden sm:block">
              <Bookmark className="w-4 h-4 text-white/70" />
              {userState.watchlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-black animate-bounce">
                  {userState.watchlist.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Voice Helper Bar (Hidden if speech error, shows voice listening overlay) */}
      {speechError && (
        <div className="bg-red-950/80 border-b border-red-500/20 text-red-300 text-xs py-2 px-6 text-center relative z-40 animate-pulse">
          {speechError}
        </div>
      )}

      {/* HERO SHOWCASE - Atmospheric Display of Currently Active Movie in Automated Carousel */}
      <section className="relative w-full overflow-hidden border-b border-white/5 z-10" id="hero-showcase">
        {/* Dynamic High-Fidelity Backdrop image with heavy gradient vignette */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={currentMovie.backdropUrl} 
                alt={currentMovie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 filter saturate-[1.1] contrast-[1.05]"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
                }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* Main Hero Metadata Info Box */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Metadata Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] font-black uppercase tracking-widest rounded border border-[#00D1FF]/30">
                  {currentMovie.type}
                </span>
                <span className="text-white/40 text-xs font-mono">
                  IMDb {currentMovie.rating}
                </span>
                <span className="text-white/40 text-xs font-mono">•</span>
                <span className="text-white/40 text-xs font-mono">
                  {currentMovie.year}
                </span>
                <span className="text-white/40 text-xs font-mono">•</span>
                <span className="text-white/60 text-xs font-mono">
                  {currentMovie.runtimeOrSeasons}
                </span>
                
                {/* Regional Streaming Info */}
                {currentMovie.streamingLinks.some(link => link.availableRegions.includes(userState.region)) ? (
                  <span className="ml-auto px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-mono rounded tracking-wider uppercase">
                    Available in Your Geolocation
                  </span>
                ) : (
                  <span className="ml-auto px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-mono rounded tracking-wider uppercase">
                    {t('noStreamRegion')}
                  </span>
                )}
              </div>

              {/* Title display */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter">
                {currentMovie.title.split(': ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/30 font-black">
                  {currentMovie.title.split(': ')[1] || 'PREMIUM'}
                </span>
              </h1>

              {/* Synopsis */}
              <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed font-sans">
                {currentMovie.synopsis}
              </p>

              {/* Interactive Rating Metric System */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-xl backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-bold">{t('personalizedMatrix')}</span>
                  <span className="text-[11px] font-mono text-[#00D1FF]">
                    {userState.ratings[currentMovie.id] ? `Your Star Grade: ${userState.ratings[currentMovie.id]}/5` : 'Rate to synchronize recommendations'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => {
                          submitRating(currentMovie.id, star);
                          pushSystemChatMessage(`Recorded ${star}-star rating for ${currentMovie.title}. Recommendation scores recalculated!`);
                        }}
                        className="group transition-transform hover:scale-125 focus:outline-none"
                        title={`Rate ${star} Stars`}
                      >
                        <Star 
                          className={`w-6 h-6 transition-all duration-200 ${
                            star <= (userState.ratings[currentMovie.id] || 0) 
                              ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                              : 'text-white/20 group-hover:text-yellow-400/50'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                  
                  <span className="text-white/20">|</span>

                  {/* Bookmark Watchlist Button */}
                  <button 
                    onClick={() => toggleWatchlist(currentMovie.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      userState.watchlist.includes(currentMovie.id)
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                        : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${userState.watchlist.includes(currentMovie.id) ? 'fill-red-400' : ''}`} />
                    {userState.watchlist.includes(currentMovie.id) ? 'In Watchlist' : 'Add Watchlist'}
                  </button>
                </div>
              </div>

              {/* Action Buttons & Streaming Integration Hub */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{t('streamingHub')}</div>
                <div className="flex flex-wrap gap-4">
                  
                  {/* Play Now Button */}
                  <button
                    onClick={() => {
                      setStreamMode('full');
                      setBackupIndex(0);
                      setTheaterMovieId(currentMovie.id);
                    }}
                    className="px-5 py-3 rounded border font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center gap-2.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <Play className="w-4 h-4 fill-current animate-pulse" />
                    {currentMovie.type === 'Series' ? '🍿 Play Season 1 Ep 1' : (currentMovie.isPublicDomain ? '🍿 Play Free Movie' : '🎬 Play Now (Free Full Match)')}
                  </button>

                  {/* Launch Links */}
                  {currentMovie.streamingLinks
                    .filter(link => link.platform !== 'Free Cinema')
                    .map((link, idx) => {
                      const isAvailable = link.availableRegions.includes(userState.region);
                      return (
                        <a
                          key={idx}
                          href={isAvailable ? link.url : '#'}
                          target={isAvailable ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`px-5 py-3 rounded border font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                            isAvailable 
                              ? 'bg-[#00D1FF] text-black border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.4)] hover:bg-white hover:border-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                              : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed'
                          }`}
                          onClick={(e) => {
                            if (!isAvailable) {
                              e.preventDefault();
                              alert("This streaming link is restricted for your selected Geolocation Telemetry region.");
                            }
                          }}
                        >
                          <Play className="w-4 h-4 fill-current" />
                          {`${t('streamBadgeLabel')} on ${link.platform}`}
                          <span className="text-[9px] px-1 py-0.5 rounded bg-black/20">
                            {link.priceTier || 'Included'}
                          </span>
                        </a>
                      );
                    })}

                  <a 
                    href="#critic-hub"
                    className="px-5 py-3 border border-white/10 text-white hover:border-[#00D1FF] hover:text-[#00D1FF] hover:bg-[#00D1FF]/5 transition-all duration-300 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Read Critic Reports
                  </a>
                </div>
              </div>

            </div>

            {/* Large Poster View / Cinema Lineage Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Ambient Poster Glow container */}
              <div className="relative group w-full max-w-[340px] aspect-[2/3] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#00D1FF] hover:shadow-[0_0_30px_rgba(0,209,255,0.25)]">
                
                {/* Backing image */}
                <img 
                  src={currentMovie.posterUrl} 
                  alt={currentMovie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                
                {/* Gradient card label overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-6">
                  
                  {/* Director details */}
                  <p className="text-[#00D1FF] text-xs font-bold uppercase tracking-widest mb-1">
                    {t('creatorLabel')} {currentMovie.directorOrCreator}
                  </p>
                  <h3 className="text-xl font-black italic uppercase text-white tracking-tight leading-tight">
                    {currentMovie.title}
                  </h3>

                  {/* Genre chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {currentMovie.genres.map((g, i) => (
                      <span 
                        key={i} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenreSelect(g);
                        }}
                        className="text-[9px] bg-white/10 hover:bg-[#00D1FF]/20 hover:text-[#00D1FF] cursor-pointer font-semibold uppercase px-2 py-0.5 rounded text-white/70"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dynamic matching watermark index badge */}
                <div className="absolute top-4 right-4 bg-black/75 border border-[#00D1FF]/30 backdrop-blur-md rounded-lg px-3 py-1.5 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Simulated Fit</p>
                  <p className="text-lg font-black text-[#00D1FF] font-mono leading-none">
                    {recommendationMatrix.find(item => item.movie.id === currentMovie.id)?.matchPercentage || 85}%
                  </p>
                </div>
              </div>

              {/* Micro production trivia card behind poster */}
              <div className="absolute -bottom-6 -right-6 hidden xl:block max-w-[220px] bg-black/80 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-xl">
                <span className="text-[9px] text-[#00D1FF] font-bold uppercase tracking-wider block mb-1">PROD TRIVIA</span>
                <p className="text-[10px] text-white/60 leading-snug font-mono italic">
                  {currentMovie.productionTrivia || 'Recreations built with pixel-perfect structural accuracy.'}
                </p>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Dynamic Carousel Navigation Bar */}
        <div className="absolute bottom-6 left-6 md:left-12 z-20 flex items-center gap-4 bg-black/85 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md">
          {/* Play/Pause Button */}
          <button 
            onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
            className="text-white/60 hover:text-[#00D1FF] transition-colors p-1 flex items-center justify-center w-5 h-5"
            title={isCarouselPlaying ? "Pause Autoplay" : "Resume Autoplay"}
          >
            {isCarouselPlaying ? (
              <span className="flex gap-0.5 items-center justify-center w-3 h-3">
                <span className="w-1 h-2.5 bg-white/80 rounded-full"></span>
                <span className="w-1 h-2.5 bg-white/80 rounded-full"></span>
              </span>
            ) : (
              <Play className="w-3 h-3 fill-current text-white/80" />
            )}
          </button>

          <div className="h-4 w-[1px] bg-white/10"></div>

          {/* Previous Button */}
          <button
            onClick={() => {
              const currentIndex = displayCatalog.findIndex(m => m.id === currentMovie.id);
              const prevIndex = (currentIndex - 1 + displayCatalog.length) % displayCatalog.length;
              handleMovieSelect(displayCatalog[prevIndex].id);
            }}
            className="text-white/50 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
            title="Previous Slide"
          >
            PREV
          </button>

          {/* Slide Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-white/40">
            <span className="text-[#00D1FF] font-black">
              {String(displayCatalog.findIndex(m => m.id === currentMovie.id) + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(displayCatalog.length).padStart(2, '0')}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              const currentIndex = displayCatalog.findIndex(m => m.id === currentMovie.id);
              const nextIndex = (currentIndex + 1) % displayCatalog.length;
              handleMovieSelect(displayCatalog[nextIndex].id);
            }}
            className="text-white/50 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
            title="Next Slide"
          >
            NEXT
          </button>
        </div>

        {/* Decorative Side Rail from Immersive UI mockup */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center pointer-events-none z-10">
          <div className="h-28 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <span className="vertical-text text-[9px] font-black text-white/25 tracking-[0.6em] uppercase">
            EXPERIENCE CINEMATIC LUXURY
          </span>
          <div className="h-28 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        </div>
      </section>

      {/* SEARCH AND BROWSE CONTROL DECK */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-10">
        
        {/* Row 1: Search and voice microphone */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-black/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          
          <div className="w-full md:w-1/2 space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#00D1FF]/70 block">
              {t('allShows')}
            </label>
            
            {/* Search Input field */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#050508] border border-white/10 focus:border-[#00D1FF] rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-white/30 outline-none transition-all"
              />
              <Compass className="absolute left-4 top-3.5 w-4.5 h-4.5 text-white/30" />
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Native Web Speech API Microphone component */}
          <div className="w-full md:w-auto flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3 justify-between md:justify-start">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-[#00D1FF]'}`}></span>
                Voice Command System
              </p>
              <p className="text-[10px] text-white/40 font-mono">
                {isListening ? t('voiceActive') : 'Click mic to command catalog'}
              </p>
            </div>
            
            <button
              onClick={handleVoiceListen}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20 hover:bg-[#00D1FF]/20'
              }`}
              title={t('speakTooltip')}
            >
              {isListening ? <MicOff className="w-5 h-5 animate-bounce" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Voice transcript display */}
        {voiceTranscript && (
          <div className="mt-3 bg-[#00D1FF]/5 border border-[#00D1FF]/20 rounded-lg p-3 text-xs text-white/80 font-mono text-center">
            🎤 Transcript heard: <span className="text-[#00D1FF] font-bold">"{voiceTranscript}"</span>
          </div>
        )}

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-8 items-center">
          <span className="text-xs uppercase tracking-widest text-white/40 font-bold mr-2">Genres:</span>
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                activeGenre === genre
                  ? 'bg-[#00D1FF] text-black font-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Interactive Platform Filter */}
        <div className="flex flex-wrap gap-2.5 mt-4 items-center">
          <span className="text-xs uppercase tracking-widest text-white/40 font-bold mr-2">Streaming On:</span>
          {['All', 'Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'Free Cinema'].map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                activePlatform === platform
                  ? 'bg-red-700 text-white font-black border border-red-600'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {platform === 'Free Cinema' ? '🍿 Free Full Movies' : platform}
            </button>
          ))}
        </div>

        {/* MASTER GRID - MOVIES & SERIES SECTIONS */}
        <div className="mt-10 space-y-16">
          
          {/* Movies Section */}
          {filteredCatalog.some(m => m.type === 'Movie') && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg border border-[#00D1FF]/20 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current text-[#00D1FF]" />
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white">
                      Premium Cinematic Movies
                    </h3>
                    <p className="text-[10px] text-white/40 font-mono">Curated feature masterpieces and blockbuster titles organized by genre</p>
                  </div>
                </div>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/60 font-mono">
                  {filteredCatalog.filter(m => m.type === 'Movie').length} titles
                </span>
              </div>

              {/* Genre-based Carousels */}
              <div className="space-y-4">
                {(activeGenre === 'All'
                  ? Array.from(new Set(filteredCatalog.filter(m => m.type === 'Movie').flatMap(m => m.genres)))
                  : [activeGenre]
                ).map((genre) => {
                  const genreMovies = filteredCatalog.filter(m => m.type === 'Movie' && m.genres.includes(genre));
                  if (genreMovies.length === 0) return null;
                  
                  return (
                    <GenreCarousel
                      key={genre}
                      genre={genre}
                      movies={genreMovies}
                      selectedMovieId={selectedMovieId}
                      handleMovieSelect={handleMovieSelect}
                      recommendationMatrix={recommendationMatrix}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Series Section */}
          {filteredCatalog.some(m => m.type === 'Series') && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg border border-[#00D1FF]/20 flex items-center justify-center">
                    <Compass className="w-3.5 h-3.5 text-[#00D1FF]" />
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white">
                      Exclusive Prestige Series
                    </h3>
                    <p className="text-[10px] text-white/40 font-mono">Award-winning television series, premium anthologies, and high-fidelity series</p>
                  </div>
                </div>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/60 font-mono">
                  {filteredCatalog.filter(m => m.type === 'Series').length} titles
                </span>
              </div>

              {/* Genre-based Carousels */}
              <div className="space-y-4">
                {(activeGenre === 'All'
                  ? Array.from(new Set(filteredCatalog.filter(m => m.type === 'Series').flatMap(m => m.genres)))
                  : [activeGenre]
                ).map((genre) => {
                  const genreSeries = filteredCatalog.filter(m => m.type === 'Series' && m.genres.includes(genre));
                  if (genreSeries.length === 0) return null;
                  
                  return (
                    <GenreCarousel
                      key={genre}
                      genre={genre}
                      movies={genreSeries}
                      selectedMovieId={selectedMovieId}
                      handleMovieSelect={handleMovieSelect}
                      recommendationMatrix={recommendationMatrix}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Global Empty State */}
          {filteredCatalog.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 animate-fade-in">
              <Compass className="w-12 h-12 text-white/20 mx-auto mb-4 animate-spin" />
              <p className="text-white/60 font-semibold uppercase tracking-wider">No matching cinematic masterpieces found.</p>
              <button 
                onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Reset Filter Parameters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* COMING SOON / ANTICIPATION SECTION */}
      <ComingSoonSection userState={userState} setUserState={setUserState} />

      {/* KOREAN ROMANCE SPECIALTY SECTION */}
      <KoreanRomanceSection 
        catalog={displayCatalog} 
        userState={userState} 
        handleMovieSelect={handleMovieSelect} 
        toggleWatchlist={toggleWatchlist} 
      />

      {/* HORROR SHOWCASE SECTION */}
      <HorrorShowcaseSection 
        catalog={displayCatalog} 
        userState={userState} 
        handleMovieSelect={handleMovieSelect} 
        toggleWatchlist={toggleWatchlist} 
      />

      {/* COMEDY SHOWCASE SECTION */}
      <ComedySection 
        catalog={displayCatalog} 
        userState={userState} 
        handleMovieSelect={handleMovieSelect} 
        toggleWatchlist={toggleWatchlist} 
      />

      {/* ACTION SHOWCASE SECTION */}
      <ActionSection 
        catalog={displayCatalog} 
        userState={userState} 
        handleMovieSelect={handleMovieSelect} 
        toggleWatchlist={toggleWatchlist} 
      />

      {/* TRENDING NOW TELEMETRY CHART */}
      <TrendingChart 
        catalog={displayCatalog} 
        userState={userState} 
        handleMovieSelect={handleMovieSelect} 
      />

      {/* SPECIAL PERSONALIZATION & SUGGESTED MATRIX BAR (Durable recommendation engine) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-t border-white/5">
        <div className="bg-gradient-to-r from-blue-950/20 via-black/40 to-red-950/20 border border-[#00D1FF]/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00D1FF]" />
                {t('suggestedForYou')}
              </h2>
              <p className="text-xs text-white/50 leading-relaxed font-sans max-w-2xl">
                Our luxury on-device AI tracks your specific star grades, watchlist additions, and genre navigation behaviors to formulate real-time mathematical correlation coefficients.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00D1FF] animate-ping"></div>
              <span className="text-xs text-[#00D1FF] uppercase tracking-widest font-mono">Dynamic Rec Matrix Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendationMatrix
              .filter(item => item.movie.id !== selectedMovieId)
              .slice(0, 3)
              .map(({ movie, matchPercentage, reason }) => {
                const inWatchlist = userState.watchlist.includes(movie.id);
                
                return (
                  <div 
                    key={movie.id}
                    onClick={() => handleMovieSelect(movie.id)}
                    className="bg-black/50 border border-white/10 hover:border-[#00D1FF]/70 rounded-xl p-5 relative overflow-hidden group cursor-pointer transition-all duration-300"
                  >
                    {/* Matching score badge */}
                    <div className="absolute top-4 right-4 bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] px-2 py-1 rounded text-xs font-mono font-bold">
                      {matchPercentage}% Fit
                    </div>

                    <span className="text-[9px] uppercase font-bold text-[#00D1FF]/80 tracking-wider block mb-2">
                      {reason}
                    </span>

                  <h3 className="text-lg font-black italic uppercase text-white mb-2 group-hover:text-[#00D1FF] transition-colors">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                    {movie.synopsis}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-white/40 font-mono pt-3 border-t border-white/5">
                    <span>{movie.year} • {movie.runtimeOrSeasons}</span>
                    <span className="text-[#00D1FF] font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1">
                      Explore Details &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro Telemetry Graph depicting genre clicking behaviors */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Your Genre Interaction Matrix</h4>
            <div className="flex flex-wrap gap-4 items-center">
              {Object.entries(userState.genreClicks).length === 0 ? (
                <p className="text-xs text-white/40 italic">No interaction metrics collected yet. Browse the catalog to feed telemetry.</p>
              ) : (
                Object.entries(userState.genreClicks).map(([genre, count]) => {
                  const numCount = Number(count);
                  const barWidth = Math.min(100, numCount * 20);
                  return (
                    <div key={genre} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-3">
                      <span className="text-[10px] text-white/70 font-mono uppercase">{genre}</span>
                      <div className="w-16 h-1.5 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full" style={{ width: `${barWidth}%` }}></div>
                      </div>
                      <span className="text-[9px] text-[#00D1FF] font-mono">{numCount} clicks</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </section>

      {/* WATCHLIST DRAWER SECTION */}
      {userState.watchlist.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
              {t('watchlist')} ({userState.watchlist.length})
            </h3>
            <button 
              onClick={() => setUserState(prev => ({ ...prev, watchlist: [] }))}
              className="text-xs text-white/30 hover:text-red-400 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear Queue
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayCatalog.filter(m => userState.watchlist.includes(m.id)).map(movie => (
              <div 
                key={movie.id}
                onClick={() => handleMovieSelect(movie.id)}
                className="bg-[#0b0b12] border border-white/5 hover:border-red-500/50 rounded-xl overflow-hidden cursor-pointer group relative transition-all"
              >
                <div className="h-28 overflow-hidden relative">
                  <img src={movie.posterUrl} alt={movie.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(movie.id);
                    }}
                    className="absolute top-2 right-2 bg-black/85 p-1 rounded-full text-white/40 hover:text-red-400 border border-white/10"
                    title="Remove from queue"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-black uppercase italic text-white truncate">{movie.title}</h4>
                  <p className="text-[10px] text-[#00D1FF] font-mono mt-0.5">{movie.runtimeOrSeasons}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CRITICAL REVIEWS & INTELLECTUAL LEDGER */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5" id="critic-hub">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Write a critique form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-[#00D1FF] uppercase font-black tracking-widest font-mono">ENLIGHTEN THE MATRIX</span>
              <h2 className="text-2xl font-black uppercase italic text-white">{t('ratingsAndReviews')}</h2>
              <p className="text-xs text-white/50 leading-relaxed font-sans">
                Submit an intellectual critique. Your rating modifies on-device recommendation algorithms and records your analysis inside the local browser ledger.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-white/40 block">Currently Reviewing</label>
                <p className="text-sm font-bold text-white uppercase italic">{currentMovie.title}</p>
              </div>

              {/* Star selection for critique */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-white/40 block">Grade of Star Assessment</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-white/40 block">Reviewer Signature Email</label>
                <input
                  type="email"
                  required
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  placeholder="name@cineworld.vip"
                  className="w-full bg-[#050508] border border-white/10 focus:border-[#00D1FF] rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-white/40 block">Your Critique Summary</label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={t('writeReview')}
                  className="w-full bg-[#050508] border border-white/10 focus:border-[#00D1FF] rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00D1FF] text-black font-black uppercase tracking-wider text-xs py-2.5 rounded-lg hover:bg-white hover:text-black transition-all"
              >
                {t('submitReview')}
              </button>
            </form>
          </div>

          {/* List of custom critiques in ledger */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
              LEDGER OF INTELLECTUAL CRITIQUES FOR {currentMovie.title.toUpperCase()}
            </h3>

            {allReviews.filter(r => r.movieId === selectedMovieId).length === 0 ? (
              <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center italic text-white/40 text-xs">
                No custom critiques compiled for this showcase title yet. Be the first to enlighten our metadata.
              </div>
            ) : (
              <div className="space-y-4">
                {allReviews.filter(r => r.movieId === selectedMovieId).map((review) => (
                  <div key={review.id} className="bg-[#0b0b12] border border-white/10 rounded-xl p-5 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] flex items-center justify-center text-xs font-bold text-white text-[10px]">
                          {review.userEmail.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white/80 font-mono">{review.userEmail}</p>
                          <p className="text-[9px] text-white/40 font-mono">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold font-mono text-white/80">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans italic">
                      "{review.comment}"
                    </p>

                    {/* Delete button for user's own reviews */}
                    {review.userEmail === reviewerEmail && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="absolute right-4 bottom-4 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete critique"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/5 bg-black/60 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-lg font-black tracking-tighter text-white">
              CINE<span className="text-[#00D1FF]">WORLD</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">
              {t('subtitle')}
            </p>
          </div>
          <div className="text-[10px] text-white/30 font-mono text-center md:text-right space-y-1">
            <p>© 2026 CineWorld Premium Platform Architecture. All rights reserved.</p>
            <p className="tracking-widest">ZERO COPYRIGHTED CONTENT STORING • PROGRAMMATIC METADATA DIRECTORY</p>
          </div>
        </div>
      </footer>

      {/* PERSISTENT LUXURY ASSISTANT VIEWPORT BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-tr from-[#00D1FF] to-[#7000FF] text-white p-4 rounded-full shadow-[0_0_20px_rgba(0,209,255,0.45)] hover:shadow-[0_0_25px_rgba(0,209,255,0.7)] transform hover:scale-105 transition-all flex items-center gap-2 group border border-white/20"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider pr-1 hidden md:inline">Discover AI</span>
            
            <span className="absolute -top-1 -right-1 bg-red-600 w-3 h-3 rounded-full border border-black animate-ping"></span>
          </button>
        ) : (
          <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#050508] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-950/80 to-black/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D1FF] animate-pulse" />
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">{t('chatbotTitle')}</h4>
                  <p className="text-[9px] text-[#00D1FF] font-mono tracking-wider">{t('chatbotSubtitle')}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Instruction tooltip */}
            <div className="bg-[#00D1FF]/5 px-4 py-2 border-b border-[#00D1FF]/10 text-[9px] font-mono text-[#00D1FF] leading-snug">
              💡 {t('voiceInstruction')}
            </div>

            {/* Chat message body list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-red-700 text-white font-medium rounded-tr-none' 
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                    
                    {/* Suggested movies floating recommendation badge in chat */}
                    {msg.suggestedMovies && msg.suggestedMovies.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1">
                        <p className="text-[9px] text-[#00D1FF] font-mono font-bold uppercase tracking-wider">Matched Titles:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedMovies.map(id => {
                            const title = displayCatalog.find(m => m.id === id)?.title || id;
                            return (
                              <button
                                key={id}
                                onClick={() => {
                                  handleMovieSelect(id);
                                  pushSystemChatMessage(`Displaying "${title}" from AI recommendation.`);
                                }}
                                className="bg-black/60 border border-[#00D1FF]/30 hover:border-[#00D1FF] text-[#00D1FF] px-2 py-0.5 rounded text-[9px] font-bold transition-all uppercase"
                              >
                                View {title.split(':')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[8px] text-white/30 mt-1 font-mono">{msg.timestamp}</span>
                </div>
              ))}
              
              {isAiTyping && (
                <div className="flex items-start gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none px-3 py-2 text-xs text-white/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-[10px] font-mono text-white/30 italic">Curating answer...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Floating Quick Macros */}
            <div className="px-3 py-2 bg-black/80 border-t border-white/5 flex gap-1.5 overflow-x-auto shrink-0 select-none">
              <button 
                onClick={() => pushUserChatMessage("What is Shogun about?")}
                className="bg-white/5 border border-white/10 hover:border-[#00D1FF] text-[9px] font-mono text-white/60 hover:text-[#00D1FF] px-2 py-1 rounded whitespace-nowrap"
              >
                About Shōgun 🏮
              </button>
              <button 
                onClick={() => pushUserChatMessage("Recommend me a dark sci-fi thriller")}
                className="bg-white/5 border border-white/10 hover:border-[#00D1FF] text-[9px] font-mono text-white/60 hover:text-[#00D1FF] px-2 py-1 rounded whitespace-nowrap"
              >
                Dark Sci-Fi 🧪
              </button>
              <button 
                onClick={() => pushUserChatMessage("Which series has the highest budget?")}
                className="bg-white/5 border border-white/10 hover:border-[#00D1FF] text-[9px] font-mono text-white/60 hover:text-[#00D1FF] px-2 py-1 rounded whitespace-nowrap"
              >
                Highest Budget? 💰
              </button>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); pushUserChatMessage(chatInput); }}
              className="p-3 bg-[#050508] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 bg-black border border-white/10 focus:border-[#00D1FF] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="bg-[#00D1FF] text-black p-2 rounded-xl hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* CINEMATIC FULL-SCREEN THEATER OVERLAY */}
      {theaterMovieId && (() => {
        const theaterMovie = displayCatalog.find(m => m.id === theaterMovieId);
        if (!theaterMovie) return null;
        
        // Resolve Copyright-Safe Full-Length free movie/episode ID with rotating backup options
        const getCopyrightSafeFullMovie = (movie: Movie, index: number = 0) => {
          if (movie.isPublicDomain && movie.fullMovieYoutubeId) {
            const options = [
              {
                id: movie.fullMovieYoutubeId,
                title: `${movie.title} (Original Full Movie)`,
                desc: "Authentic, Uncut Public Domain Cinematic Masterpiece",
                isAlternative: false,
                altMovieName: movie.title
              }
            ];
            // Add classic backups for extra robustness
            const lowerGenres = movie.genres.map(g => g.toLowerCase());
            if (lowerGenres.includes('horror')) {
              options.push(
                {
                  id: 'zZ9W0M-gBwU',
                  title: 'House on Haunted Hill (1959)',
                  desc: 'Classic backup gothic horror movie',
                  isAlternative: true,
                  altMovieName: 'House on Haunted Hill'
                },
                {
                  id: 'h8s8P9LCHV8',
                  title: 'Night of the Living Dead (1968)',
                  desc: 'Classic backup zombie horror movie',
                  isAlternative: true,
                  altMovieName: 'Night of the Living Dead'
                }
              );
            } else {
              options.push(
                {
                  id: 'W3i60M-k2wY',
                  title: 'Charade (1963)',
                  desc: 'Classic backup romantic thriller/comedy movie',
                  isAlternative: true,
                  altMovieName: 'Charade'
                },
                {
                  id: '9eB3N6e0Sdg',
                  title: 'His Girl Friday (1940)',
                  desc: 'Classic backup fast screwball comedy movie',
                  isAlternative: true,
                  altMovieName: 'His Girl Friday'
                }
              );
            }
            return options[index % options.length] || options[0];
          }

          // Modern movies/series mapped to gorgeous, 100% legal, free-to-stream full movie equivalents
          const lowerGenres = movie.genres.map(g => g.toLowerCase());
          const streams: { id: string; title: string; desc: string; isAlternative: boolean; altMovieName: string; }[] = [];

          if (lowerGenres.includes('horror') || lowerGenres.includes('thriller') || lowerGenres.includes('mystery')) {
            streams.push(
              {
                id: 'h8s8P9LCHV8',
                title: 'Night of the Living Dead (1968)',
                desc: 'Matched as a 100% legal, copyright-safe, free full-length horror masterpiece.',
                isAlternative: true,
                altMovieName: 'Night of the Living Dead'
              },
              {
                id: 'zZ9W0M-gBwU',
                title: 'House on Haunted Hill (1959)',
                desc: 'Matched as a 100% legal, copyright-safe, free full-length gothic horror masterpiece.',
                isAlternative: true,
                altMovieName: 'House on Haunted Hill'
              },
              {
                id: 'Y70vsh_N_P4',
                title: 'The Cabinet of Dr. Caligari (1920)',
                desc: 'Matched as a 100% legal, copyright-safe, silent German Expressionist horror classic.',
                isAlternative: true,
                altMovieName: 'The Cabinet of Dr. Caligari'
              },
              {
                id: 'fS_j7w2C_9k',
                title: 'Nosferatu (1922)',
                desc: 'Matched as a 100% legal, copyright-safe, silent vampire horror masterpiece.',
                isAlternative: true,
                altMovieName: 'Nosferatu'
              }
            );
          } else if (lowerGenres.includes('romance') || lowerGenres.includes('korean') || lowerGenres.includes('drama') || movie.id === 'the-crown') {
            streams.push(
              {
                id: 'W3i60M-k2wY',
                title: 'Charade (1963)',
                desc: 'Matched as a 100% legal, copyright-safe, free full-length romantic mystery comedy masterpiece.',
                isAlternative: true,
                altMovieName: 'Charade'
              },
              {
                id: 'aI8P62qGj-A',
                title: 'Royal Wedding (1951)',
                desc: 'Matched as a 100% legal, copyright-safe, free full-length musical romance classic.',
                isAlternative: true,
                altMovieName: 'Royal Wedding'
              },
              {
                id: 'S7pP42X_6uY',
                title: 'The Last Time I Saw Paris (1954)',
                desc: 'Matched as a 100% legal, copyright-safe, romantic drama starring Elizabeth Taylor.',
                isAlternative: true,
                altMovieName: 'The Last Time I Saw Paris'
              },
              {
                id: 'W47O7L8L_h0',
                title: 'Love Affair (1939)',
                desc: 'Matched as a 100% legal, copyright-safe, classic romance tragedy film.',
                isAlternative: true,
                altMovieName: 'Love Affair'
              }
            );
          } else if (lowerGenres.includes('comedy') || lowerGenres.includes('crime') || movie.id === 'fleabag' || movie.id === 'the-bear' || movie.id === 'succession') {
            streams.push(
              {
                id: '9eB3N6e0Sdg',
                title: 'His Girl Friday (1940)',
                desc: 'Matched as a 100% legal, copyright-safe, fast screwball romance comedy classic.',
                isAlternative: true,
                altMovieName: 'His Girl Friday'
              },
              {
                id: 'k-Fp_8AasgU',
                title: 'Meet John Doe (1941)',
                desc: 'Matched as a 100% legal, copyright-safe, Frank Capra comedy-drama classic.',
                isAlternative: true,
                altMovieName: 'Meet John Doe'
              },
              {
                id: 'WJ_rGzL8pGg',
                title: 'Steamboat Bill Jr. (1928)',
                desc: 'Matched as a 100% legal, copyright-safe, physical comedy masterpiece by Buster Keaton.',
                isAlternative: true,
                altMovieName: 'Steamboat Bill Jr.'
              }
            );
          } else {
            // Default Sci-Fi / Action / Adventure / Fantasy
            streams.push(
              {
                id: 'R6MlUcmg5sg',
                title: 'Tears of Steel (2012)',
                desc: 'Matched as a 100% legal, copyright-safe, open-source science fiction cinematic CGI showcase.',
                isAlternative: true,
                altMovieName: 'Tears of Steel'
              },
              {
                id: 'eRsGyyHalQA',
                title: 'Sintel (2010)',
                desc: 'Matched as a 100% legal, copyright-safe, open-source fantasy drama animated masterpiece.',
                isAlternative: true,
                altMovieName: 'Sintel'
              },
              {
                id: 'iH7H8wYp_D8',
                title: 'The General (1926)',
                desc: 'Matched as a 100% legal, copyright-safe, silent action-adventure train chase masterpiece.',
                isAlternative: true,
                altMovieName: 'The General'
              },
              {
                id: 'g_wE_bQe-xM',
                title: 'Metropolis (1927)',
                desc: 'Matched as a 100% legal, copyright-safe, monumental silent sci-fi dystopia classic.',
                isAlternative: true,
                altMovieName: 'Metropolis'
              }
            );
          }

          return streams[index % streams.length] || streams[0];
        };

        const seasons = getSeriesSeasons(theaterMovie);
        const isFullStream = streamMode === 'full';
        const streamOffset = theaterMovie.type === 'Series' ? (activeEpisode - 1) + (activeSeason - 1) * 8 : 0;
        const safeStream = getCopyrightSafeFullMovie(theaterMovie, backupIndex + streamOffset);
        const videoId = isFullStream ? safeStream.id : (TRAILER_IDS[theaterMovie.id] || 'Way9Dexny3w');
        const matchPercent = recommendationMatrix.find(item => item.movie.id === theaterMovie.id)?.matchPercentage || 85;
        const inWatchlist = userState.watchlist.includes(theaterMovie.id);

        // Get next movie in recommendations to keep user watching
        const nextRecs = recommendationMatrix.filter(item => item.movie.id !== theaterMovie.id);
        const nextMovie = nextRecs[0]?.movie;

        return (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-6 overflow-y-auto animate-fade-in">
            {/* Close Button */}
            <button 
              onClick={() => setTheaterMovieId(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-[#00D1FF] hover:text-black border border-white/15 hover:border-transparent text-white p-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] z-[110]"
              title="Exit Cinema Screen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-5xl flex flex-col gap-6 py-8">
              {/* Cinema Screen Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 text-[9px] font-mono rounded tracking-wider uppercase inline-block">
                      {theaterMovie.isPublicDomain ? '🍿 ORIGINAL FREE MASTERPIECE' : '🛡️ COPYRIGHT-SAFE DIRECT STREAM MATCH'}
                    </span>
                    {!theaterMovie.isPublicDomain && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded tracking-wider uppercase inline-block">
                        100% LEGAL & FREE FULL-LENGTH MOVIE
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white tracking-tight flex items-center gap-2 flex-wrap">
                    {theaterMovie.title}
                    {theaterMovie.type === 'Series' && (
                      <span className="text-sm font-mono normal-case font-extrabold text-black bg-[#00D1FF] px-2.5 py-1 rounded-md shadow-[0_0_15px_rgba(0,209,255,0.3)]">
                        Season {activeSeason}, Episode {activeEpisode}
                      </span>
                    )}
                    {isFullStream && !theaterMovie.isPublicDomain && (
                      <span className="text-xs font-mono normal-case font-medium text-white/50">
                        (streaming <strong className="text-[#00D1FF]">{safeStream.altMovieName}</strong>)
                      </span>
                    )}
                  </h2>
                </div>
                
                {/* Mode Selector Tabs */}
                <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl self-start md:self-auto gap-1">
                  <button
                    onClick={() => {
                      setStreamMode('full');
                      setBackupIndex(0);
                      pushSystemChatMessage(`Switched streaming mode of ${theaterMovie.title} to: Free Full-Length safe match (${safeStream.altMovieName}).`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isFullStream
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    🍿 Full Movie
                  </button>
                  <button
                    onClick={() => {
                      setStreamMode('trailer');
                      pushSystemChatMessage(`Switched streaming mode of ${theaterMovie.title} to: Official Cinematic Trailer.`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      !isFullStream
                        ? 'bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.3)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    🎬 Official Trailer
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 font-mono">Simulated Fit:</span>
                  <span className="text-xl font-black text-[#00D1FF] font-mono bg-[#00D1FF]/5 px-3 py-1 rounded border border-[#00D1FF]/20">
                    {matchPercent}%
                  </span>
                </div>
              </div>

              {/* 16:9 Video Canvas Frame */}
              <CinemaPlayer
                movie={theaterMovie}
                streamMode={streamMode}
                activeSeason={activeSeason}
                activeEpisode={activeEpisode}
                onRotateStream={() => {
                  const nextIndex = backupIndex + 1;
                  setBackupIndex(nextIndex);
                  pushSystemChatMessage(`Rotating to alternate backup streaming server (Index: #${nextIndex + 1}).`);
                }}
                safeStreamTitle={safeStream.title}
                backupIndex={backupIndex}
              />

              {/* Info Panel & Interactive Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-2">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-white/60 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">{theaterMovie.year}</span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/60 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">{theaterMovie.runtimeOrSeasons}</span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/60 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">Directed by {theaterMovie.directorOrCreator}</span>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {theaterMovie.synopsis}
                  </p>

                  {/* Season & Episode Selector for Series */}
                  {theaterMovie.type === 'Series' && seasons.length > 0 && (
                    <div className="mt-6 space-y-5 bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg border border-[#00D1FF]/20 flex items-center justify-center">
                            <Tv className="w-4 h-4 text-[#00D1FF]" />
                          </span>
                          <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">
                              Seasons & Episodes
                            </h3>
                            <p className="text-[10px] text-white/40 font-mono">Select any season and episode to play immediately</p>
                          </div>
                        </div>

                        {/* Season selector tabs */}
                        <div className="flex flex-wrap gap-1.5">
                          {seasons.map((s) => (
                            <button
                              key={s.seasonNumber}
                              onClick={() => {
                                setActiveSeason(s.seasonNumber);
                                setActiveEpisode(1); // Reset to episode 1 on season change
                                pushSystemChatMessage(`Selected Season ${s.seasonNumber} of ${theaterMovie.title}.`);
                              }}
                              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all duration-300 ${
                                activeSeason === s.seasonNumber
                                  ? 'bg-[#00D1FF] text-black border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.25)]'
                                  : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              Season {s.seasonNumber}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Episode cards grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                        {seasons.find(s => s.seasonNumber === activeSeason)?.episodes.map((ep) => {
                          const isCurrentEpisode = activeEpisode === ep.number;
                          return (
                            <div
                              key={ep.number}
                              onClick={() => {
                                setActiveEpisode(ep.number);
                                pushSystemChatMessage(`Now playing Season ${activeSeason}, Episode ${ep.number}: "${ep.title}".`);
                              }}
                              className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                                isCurrentEpisode
                                  ? 'bg-[#00D1FF]/5 border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.1)]'
                                  : 'bg-black/35 border-white/5 hover:border-white/20 hover:bg-black/50'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                                    isCurrentEpisode
                                      ? 'bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30'
                                      : 'bg-white/5 text-white/40 border-white/5'
                                  }`}>
                                    S{activeSeason} E{ep.number}
                                  </span>
                                  <span className="text-[9px] font-mono text-white/30">{ep.runtime}</span>
                                </div>
                                <h4 className={`text-xs font-black uppercase tracking-wider group-hover:text-[#00D1FF] transition-colors ${
                                  isCurrentEpisode ? 'text-[#00D1FF]' : 'text-white'
                                }`}>
                                  {ep.title}
                                </h4>
                                <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">
                                  {ep.synopsis}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[9px] text-[#00D1FF]/60 font-mono flex items-center gap-1">
                                  {isCurrentEpisode ? (
                                    <>
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-ping"></span>
                                      Now Streaming
                                    </>
                                  ) : (
                                    'Click to Stream'
                                  )}
                                </span>
                                <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                                  isCurrentEpisode 
                                    ? 'bg-[#00D1FF] text-black scale-110' 
                                    : 'bg-white/5 text-white/40 group-hover:bg-[#00D1FF]/10 group-hover:text-[#00D1FF] group-hover:scale-105'
                                }`}>
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isFullStream ? (
                    theaterMovie.isPublicDomain ? (
                      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex gap-3 items-start">
                        <span className="text-lg">🛡️</span>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Copyright-Safe & Legal Classic</p>
                          <p className="text-[11px] text-emerald-300/70 leading-relaxed">
                            This cinematic work has legally entered the public domain. It is 100% free, legal, and copyright-compliant to play and distribute worldwide. Enjoy pure cinematic legacy without restrictions.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 rounded-xl p-4 flex gap-3 items-start">
                        <span className="text-lg">✨</span>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-[#00D1FF] uppercase tracking-wider font-mono">Copyright-Safe Cinema Match Engine Active</p>
                          <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                            To comply with copyright guidelines (no pirated feeds/illegal streams) while providing a fully functional free movie streaming experience, our engine has matched this modern title with <strong className="text-white">{safeStream.title}</strong>, an original full-length cinematic masterpiece of the exact same genre (<strong className="text-[#00D1FF]">{theaterMovie.genres.join(', ')}</strong>). Stream the entire movie legally, in full, and free of cost!
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 rounded-xl p-4 flex gap-3 items-start">
                      <span className="text-lg">🎬</span>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#00D1FF] uppercase tracking-wider font-mono">Official Cinematic Promo Active</p>
                        <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                          You are watching the official high-definition theatrical trailer for <strong className="text-white">{theaterMovie.title}</strong>, curated directly from official studios. Switch back to the "Full Movie" mode to stream our matched legal cinema equivalents!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {theaterMovie.genres.map((g) => (
                      <span key={g} className="text-[10px] uppercase font-bold tracking-wider text-white/40 bg-white/5 px-2.5 py-1 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 space-y-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold font-mono">Cinema Controls</p>
                  
                  {/* Interactive Watchlist, Rotating backup and Rating */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => toggleWatchlist(theaterMovie.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        inWatchlist
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                          : 'bg-white/10 text-white/90 border border-white/10 hover:bg-[#00D1FF] hover:text-black hover:border-transparent'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-red-400' : ''}`} />
                      {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                    </button>

                    {/* Rotate Alternate Stream Button to bypass blocked/unavailable videos */}
                    {isFullStream && (
                      <button
                        onClick={() => {
                          setBackupIndex(prev => prev + 1);
                          const nextSafeStream = getCopyrightSafeFullMovie(theaterMovie, backupIndex + 1);
                          pushSystemChatMessage(`Rotated stream of ${theaterMovie.title} to alternate stream option: ${nextSafeStream.title}.`);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black hover:border-transparent font-mono"
                        title="Rotate to an alternate copyright-safe legal full-length video to solve geo-restrictions or blocked videos"
                      >
                        🔄 Alternate Stream Option
                      </button>
                    )}

                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                        <span>GRADE CRITIQUE:</span>
                        <span className="text-[#00D1FF]">{userState.ratings[theaterMovie.id] ? `${userState.ratings[theaterMovie.id]}/5` : 'UNRATED'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-black/40 p-2 rounded-lg">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => {
                              submitRating(theaterMovie.id, star);
                              pushSystemChatMessage(`Recorded ${star}-star rating for ${theaterMovie.title} inside Cinema Mode.`);
                            }}
                            className="group transition-transform hover:scale-125 focus:outline-none"
                            title={`Rate ${star} Stars`}
                          >
                            <Star 
                              className={`w-5 h-5 transition-all duration-200 ${
                                star <= (userState.ratings[theaterMovie.id] || 0) 
                                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' 
                                  : 'text-white/20 group-hover:text-yellow-400/50'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Next suggestion quick button */}
                  {nextMovie && (
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-2">Up Next</p>
                      <button
                        onClick={() => {
                          setTheaterMovieId(nextMovie.id);
                          setSelectedMovieId(nextMovie.id);
                        }}
                        className="w-full text-left bg-black/40 hover:bg-[#00D1FF]/10 p-3 rounded-xl border border-white/5 hover:border-[#00D1FF]/30 transition-all group flex items-center gap-3"
                      >
                        <div className="w-8 h-10 rounded overflow-hidden shrink-0 border border-white/10 relative">
                          <img 
                            src={nextMovie.posterUrl} 
                            alt={nextMovie.title} 
                            referrerPolicy="no-referrer" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-2.5 h-2.5 fill-white text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-white group-hover:text-[#00D1FF] truncate transition-colors">{nextMovie.title}</p>
                          <p className="text-[8px] text-white/40 font-mono truncate">{nextMovie.genres.join(' • ')}</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
