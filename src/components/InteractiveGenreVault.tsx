import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Bookmark, Info, Sparkles, Flame, Film, Tv, ChevronRight, Compass, Shield, Eye, ArrowUpRight, Zap, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Movie, UserState } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface InteractiveGenreVaultProps {
  catalog: Movie[];
  userState: UserState;
  selectedMovieId: string | null;
  handleMovieSelect: (id: string) => void;
  toggleWatchlist: (id: string) => void;
  onShowInfo: (movie: Movie) => void;
  setTheaterMovieId: (id: string) => void;
}

interface GenreConfig {
  name: string;
  icon: string;
  themeColor: string;
  borderColor: string;
  bgGradient: string;
  accentText: string;
  badgeBg: string;
  vibeTag: string;
  description: string;
}

const GENRE_CONFIGS: Record<string, GenreConfig> = {
  'Sci-Fi': {
    name: 'Sci-Fi & Cyberpunk',
    icon: '🚀',
    themeColor: '#00D1FF',
    borderColor: 'border-[#00D1FF]/30',
    bgGradient: 'from-cyan-950/40 via-[#050b18] to-blue-950/50',
    accentText: 'text-[#00D1FF]',
    badgeBg: 'bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30',
    vibeTag: 'Cosmic & Mind-Bending',
    description: 'Futuristic worlds, interstellar exploration, AI, and metaphysical realities.'
  },
  'Action': {
    name: 'Action & Thrillers',
    icon: '💥',
    themeColor: '#EF4444',
    borderColor: 'border-red-500/30',
    bgGradient: 'from-red-950/40 via-[#180505] to-rose-950/50',
    accentText: 'text-red-400',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    vibeTag: 'High Voltage & Adrenaline',
    description: 'High-octane stunt choreography, martial arts combat, and intense chases.'
  },
  'Romance': {
    name: 'Romance & K-Drama',
    icon: '💖',
    themeColor: '#EC4899',
    borderColor: 'border-pink-500/30',
    bgGradient: 'from-pink-950/40 via-[#180512] to-rose-900/50',
    accentText: 'text-pink-400',
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    vibeTag: 'Heartwarming & Emotional',
    description: 'Heartfelt passions, sweeping sagas, Korean romance, and soulmate connections.'
  },
  'Horror': {
    name: 'Horror & Supernatural',
    icon: '👻',
    themeColor: '#A855F7',
    borderColor: 'border-purple-500/30',
    bgGradient: 'from-purple-950/40 via-[#120518] to-slate-950/60',
    accentText: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    vibeTag: 'Eerie & Psychological',
    description: 'Supernatural terrors, psychological suspense, haunted lore, and dark thrillers.'
  },
  'Comedy': {
    name: 'Comedy & Satire',
    icon: '😂',
    themeColor: '#F59E0B',
    borderColor: 'border-amber-500/30',
    bgGradient: 'from-amber-950/40 via-[#181205] to-yellow-950/50',
    accentText: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    vibeTag: 'Witty & Irreverent',
    description: 'Laugh-out-loud humor, sharp social satire, absurd capers, and lighthearted fun.'
  },
  'Drama': {
    name: 'Prestige Drama',
    icon: '🎭',
    themeColor: '#10B981',
    borderColor: 'border-emerald-500/30',
    bgGradient: 'from-emerald-950/40 via-[#051810] to-teal-950/50',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    vibeTag: 'Critically Acclaimed & Deep',
    description: 'Masterfully acted character studies, emotional triumphs, and narrative depth.'
  },
  'Adventure': {
    name: 'Adventure & Fantasy',
    icon: '🔮',
    themeColor: '#8B5CF6',
    borderColor: 'border-violet-500/30',
    bgGradient: 'from-violet-950/40 via-[#100518] to-indigo-950/50',
    accentText: 'text-violet-400',
    badgeBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    vibeTag: 'Epic Quests & Magic',
    description: 'Grand odysseys, mythical realms, treasures, and legendary journeys.'
  },
  'Biography': {
    name: 'Biography & History',
    icon: '📜',
    themeColor: '#D97706',
    borderColor: 'border-amber-600/30',
    bgGradient: 'from-amber-950/30 via-[#140f05] to-stone-900/60',
    accentText: 'text-amber-500',
    badgeBg: 'bg-amber-600/10 text-amber-500 border-amber-600/30',
    vibeTag: 'True Stories & Legacy',
    description: 'Captivating real historical events, iconic figures, and monumental biographies.'
  }
};

const DEFAULT_GENRE_CONFIG: GenreConfig = {
  name: 'Cinematic Genre',
  icon: '🍿',
  themeColor: '#00D1FF',
  borderColor: 'border-white/20',
  bgGradient: 'from-zinc-900/60 via-[#0a0a12] to-zinc-950/80',
  accentText: 'text-[#00D1FF]',
  badgeBg: 'bg-white/10 text-white border-white/20',
  vibeTag: 'Premium Selection',
  description: 'Curated titles from our cinema vault.'
};

export default function InteractiveGenreVault({
  catalog,
  userState,
  selectedMovieId,
  handleMovieSelect,
  toggleWatchlist,
  onShowInfo,
  setTheaterMovieId
}: InteractiveGenreVaultProps) {
  // Extract all unique genres from the catalog
  const availableGenres = Array.from(
    new Set(catalog.flatMap((m) => m.genres))
  ).sort();

  // Active genre filter state ('All' or specific genre)
  const [selectedGenreTab, setSelectedGenreTab] = useState<string>('All');
  
  // Interactive view mode state: 'pavilions' (distinct styled sections) or 'single' (focused pavilion)
  const [viewMode, setViewMode] = useState<'pavilions' | 'single'>('pavilions');

  // Internal sort per genre section: 'rating' | 'year' | 'title'
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  // Per-genre expansion state for Matrix Grid (shows 2 rows = 8 cards initially)
  const [expandedGenres, setExpandedGenres] = useState<Record<string, boolean>>({});

  const toggleGenreExpand = (genre: string) => {
    setExpandedGenres((prev) => ({ ...prev, [genre]: !prev[genre] }));
  };

  // Filter movies by genre
  const getGenreMovies = (genre: string) => {
    let list = catalog.filter((m) => m.genres.includes(genre));
    if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      list = [...list].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  };

  // Scroll smoothly to a genre section ID
  const scrollToGenre = (genre: string) => {
    setSelectedGenreTab(genre);
    if (viewMode === 'pavilions') {
      const element = document.getElementById(`genre-pavilion-${genre}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const displayedGenres = selectedGenreTab === 'All' 
    ? availableGenres 
    : [selectedGenreTab];

  return (
    <div className="space-y-12 my-8">
      
      {/* 1. INTERACTIVE GENRE HUB DOCK (Hero Navigation Deck) */}
      <div className="bg-[#0a0a14]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-spin" />
                Interactive Genre Vault
              </span>
              <span className="text-xs font-mono text-white/40">• {availableGenres.length} Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-wider text-white">
              Explore By <span className="text-[#00D1FF] underline decoration-[#00D1FF]/40 decoration-4 underline-offset-8">Genre Pavilion</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-sans mt-2 max-w-xl leading-relaxed">
              Step away from generic streaming rows. Each genre operates as an independent interactive pavilion with custom atmospheric styling, top spotlight titles, and instant streaming access.
            </p>
          </div>

          {/* Interactive View Mode Controls & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 flex items-center gap-1">
              <button
                onClick={() => { setViewMode('pavilions'); setSelectedGenreTab('All'); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'pavilions' && selectedGenreTab === 'All'
                    ? 'bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)] font-black'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>All Pavilions</span>
              </button>
              <button
                onClick={() => setViewMode('single')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)] font-black'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Focus Vault</span>
              </button>
            </div>

            {/* Quick Sort Dropdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 flex items-center gap-2 text-xs font-mono">
              <span className="text-white/40 uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
                className="bg-transparent text-[#00D1FF] font-bold outline-none cursor-pointer"
              >
                <option value="rating" className="bg-zinc-900 text-white">Top Rated ★</option>
                <option value="year" className="bg-zinc-900 text-white">Newest Year 📅</option>
                <option value="title" className="bg-zinc-900 text-white">Alphabetical A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* INTERACTIVE GENRE BADGES MATRIX (Clickable Pavilions) */}
        <div className="relative z-10 pt-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-3">
            Select A Pavilion To Jump Or Filter:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <button
              onClick={() => { setSelectedGenreTab('All'); setViewMode('pavilions'); }}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-22 ${
                selectedGenreTab === 'All'
                  ? 'bg-gradient-to-br from-[#00D1FF]/20 to-indigo-900/40 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)] scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">🌟</span>
                <span className="text-[10px] font-mono font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/80">
                  {catalog.length}
                </span>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-white tracking-wider">All Vaults</p>
                <p className="text-[9px] text-white/40 font-mono truncate">Complete Library</p>
              </div>
            </button>

            {availableGenres.map((genre) => {
              const cfg = GENRE_CONFIGS[genre] || DEFAULT_GENRE_CONFIG;
              const count = catalog.filter((m) => m.genres.includes(genre)).length;
              const isSelected = selectedGenreTab === genre;

              return (
                <button
                  key={genre}
                  onClick={() => {
                    if (viewMode === 'pavilions') {
                      scrollToGenre(genre);
                    } else {
                      setSelectedGenreTab(genre);
                    }
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-22 group relative overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${cfg.bgGradient} ${cfg.borderColor} shadow-xl scale-[1.03] ring-1 ring-white/30`
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">{cfg.icon}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                      {count}
                    </span>
                  </div>
                  <div className="z-10">
                    <p className={`text-xs font-black uppercase tracking-wider ${isSelected ? cfg.accentText : 'text-white group-hover:' + cfg.accentText}`}>
                      {genre}
                    </p>
                    <p className="text-[9px] text-white/40 font-mono truncate">{cfg.vibeTag}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. DISTINCT GENRE PAVILION SECTIONS (Separated Styled Stages) */}
      <div className="space-y-16">
        {displayedGenres.map((genre) => {
          const cfg = GENRE_CONFIGS[genre] || DEFAULT_GENRE_CONFIG;
          const movies = getGenreMovies(genre);
          if (movies.length === 0) return null;

          const spotlightMovie = movies[0]; // Highest rated or sorted title
          const remainingMovies = movies.slice(1);
          
          const isExpanded = !!expandedGenres[genre];
          const INITIAL_LIMIT = 8; // 2 rows in 4-column layout
          const visibleRemaining = isExpanded ? remainingMovies : remainingMovies.slice(0, INITIAL_LIMIT);

          return (
            <section
              key={genre}
              id={`genre-pavilion-${genre}`}
              className={`relative bg-gradient-to-br ${cfg.bgGradient} border ${cfg.borderColor} rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-white/20`}
            >
              {/* Decorative Genre Emblem Accent */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none text-9xl">
                {cfg.icon}
              </div>

              {/* SECTION HEADER */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-lg ${cfg.badgeBg}`}>
                    {cfg.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                        {cfg.vibeTag}
                      </span>
                      <span className="text-xs font-mono text-white/40">{movies.length} Titles Available</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-wider text-white mt-1">
                      {cfg.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-white/60 max-w-md font-sans leading-relaxed">
                  {cfg.description}
                </p>
              </div>

              {/* GENRE SPOTLIGHT HERO TITLE CARD */}
              {spotlightMovie && (
                <div className="relative z-10 mb-8 bg-black/50 border border-white/15 rounded-2xl overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    
                    {/* Backdrop / Poster Visual */}
                    <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                      <BlurUpImage
                        src={spotlightMovie.backdropUrl || spotlightMovie.posterUrl}
                        alt={spotlightMovie.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-amber-400 text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Spotlight Masterpiece</span>
                        </span>
                        <span className="bg-black/80 backdrop-blur-md border border-white/20 text-[#00D1FF] text-xs font-mono font-bold px-2.5 py-1 rounded-full">
                          ★ {spotlightMovie.rating}
                        </span>
                      </div>
                    </div>

                    {/* Content & Direct Action */}
                    <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 bg-black/60 backdrop-blur-md h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                          <span className={cfg.accentText}>{spotlightMovie.year}</span>
                          <span>•</span>
                          <span>{spotlightMovie.runtimeOrSeasons}</span>
                          <span>•</span>
                          <span className="uppercase text-[#00D1FF] font-bold">{spotlightMovie.type}</span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-black italic uppercase text-white group-hover:text-[#00D1FF] transition-colors leading-tight">
                          {spotlightMovie.title}
                        </h4>

                        <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                          {spotlightMovie.synopsis}
                        </p>

                        <div className="pt-2">
                          <p className="text-[10px] uppercase font-mono text-white/40 mb-1">Featured Cast:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {spotlightMovie.cast.slice(0, 3).map((actor) => (
                              <span key={actor} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-white/80">
                                {actor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                        <button
                          onClick={() => {
                            handleMovieSelect(spotlightMovie.id);
                            setTheaterMovieId(spotlightMovie.id);
                          }}
                          className="flex-1 py-3 px-4 bg-[#00D1FF] hover:bg-cyan-300 text-black font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,209,255,0.4)] cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                          <span>Stream Free Now</span>
                        </button>

                        <button
                          onClick={() => onShowInfo(spotlightMovie)}
                          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 transition-all cursor-pointer"
                          title="Detailed Intelligence Briefing"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggleWatchlist(spotlightMovie.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            userState.watchlist.includes(spotlightMovie.id)
                              ? 'bg-amber-400 text-black border-amber-400'
                              : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                          }`}
                          title="Bookmark to Watchlist"
                        >
                          <Bookmark className={`w-4 h-4 ${userState.watchlist.includes(spotlightMovie.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* BENTO MATRIX GRID OF GENRE TITLES */}
              {remainingMovies.length > 0 && (
                <div className="relative z-10 pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-white/70 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#00D1FF]" />
                      More {genre} Masterpieces
                    </h5>
                    <span className="text-[10px] font-mono text-white/40">
                      Showing {visibleRemaining.length} of {remainingMovies.length} titles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {visibleRemaining.map((movie) => {
                      const isSelected = movie.id === selectedMovieId;
                      const isWatchlisted = userState.watchlist.includes(movie.id);

                      return (
                        <TiltCard
                          key={movie.id}
                          onClick={() => handleMovieSelect(movie.id)}
                          className={`bg-black/60 border rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                            isSelected
                              ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)] ring-1 ring-[#00D1FF]'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div>
                            {/* Poster Thumbnail */}
                            <div className="h-56 relative overflow-hidden">
                              <BlurUpImage
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                              {/* Badges */}
                              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-[#00D1FF] text-[10px] font-mono font-bold rounded-full">
                                  ★ {movie.rating}
                                </span>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWatchlist(movie.id);
                                  }}
                                  className={`p-1.5 rounded-full border backdrop-blur-md transition-all ${
                                    isWatchlisted 
                                      ? 'bg-amber-400 text-black border-amber-400' 
                                      : 'bg-black/60 text-white/70 border-white/20 hover:text-white'
                                  }`}
                                >
                                  <Bookmark className={`w-3 h-3 ${isWatchlisted ? 'fill-current' : ''}`} />
                                </button>
                              </div>

                              {/* Hover Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                <div className="w-12 h-12 rounded-full bg-[#00D1FF] text-black flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.8)] transform scale-75 group-hover:scale-100 transition-transform">
                                  <Play className="w-5 h-5 fill-current ml-0.5" />
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <h6 className="text-xs font-black italic uppercase text-white group-hover:text-[#00D1FF] transition-colors truncate">
                                  {movie.title}
                                </h6>
                                <span className="text-[10px] font-mono text-white/50">{movie.year}</span>
                              </div>
                              <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                                {movie.synopsis}
                              </p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="p-4 pt-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMovieSelect(movie.id);
                                setTheaterMovieId(movie.id);
                              }}
                              className="w-full py-2 bg-white/5 hover:bg-[#00D1FF] text-white hover:text-black border border-white/10 hover:border-[#00D1FF] font-mono text-[9px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Stream Movie</span>
                            </button>
                          </div>
                        </TiltCard>
                      );
                    })}
                  </div>

                  {/* EXPLORE MORE GENRE TITLES BUTTON */}
                  {remainingMovies.length > INITIAL_LIMIT && (
                    <div className="mt-8 text-center pt-2">
                      <button
                        onClick={() => toggleGenreExpand(genre)}
                        className="px-6 py-3 bg-white/5 hover:bg-[#00D1FF] text-white hover:text-black border border-white/20 hover:border-[#00D1FF] rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] group"
                      >
                        <span>
                          {isExpanded
                            ? `Collapse ${genre} Pavilion`
                            : `Explore ${remainingMovies.length - INITIAL_LIMIT} More ${genre} Masterpieces`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        ) : (
                          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        )}
                      </button>
                    </div>
                  )}

                </div>
              )}

            </section>
          );
        })}
      </div>

    </div>
  );
}
