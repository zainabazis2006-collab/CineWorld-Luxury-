import React, { useRef, useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Movie } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface GenreCarouselProps {
  key?: any;
  genre: string;
  movies: Movie[];
  selectedMovieId: string;
  handleMovieSelect: (id: string) => void;
  recommendationMatrix: any[];
  exploreByTalent?: boolean;
  onShowInfo?: (movie: Movie) => void;
}

export default function GenreCarousel({
  genre,
  movies,
  selectedMovieId,
  handleMovieSelect,
  recommendationMatrix,
  exploreByTalent = false,
  onShowInfo
}: GenreCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Check scroll position to show/hide arrow buttons
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Show left arrow if scrolled more than a few pixels
      setCanScrollLeft(scrollLeft > 10);
      // Show right arrow if there's still content left to scroll
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check in case content fits completely
      checkScrollPosition();
      
      // Also observe resize to update arrow states
      const observer = new ResizeObserver(() => checkScrollPosition());
      observer.observe(container);

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        observer.disconnect();
      };
    }
  }, [movies]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel my-8">
      {/* Genre Heading */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm md:text-base font-black uppercase tracking-[0.15em] text-white/90 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
          {genre}
        </h4>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          {movies.length} {movies.length === 1 ? 'Title' : 'Titles'}
        </span>
      </div>

      {/* Carousel Wrapper with Hover Arrows */}
      <div className="relative">
        {/* Left Arrow button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/80 border border-white/10 text-white/70 hover:text-white hover:bg-black/90 hover:scale-110 active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Right Arrow button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/80 border border-white/10 text-white/70 hover:text-white hover:bg-black/90 hover:scale-110 active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 select-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {movies.map((movie) => {
            const isSelected = movie.id === selectedMovieId;
            const matchPercent = recommendationMatrix.find(item => item.movie.id === movie.id)?.matchPercentage || 85;

            return (
              <div 
                key={movie.id} 
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              >
                <TiltCard
                  onClick={() => {
                    handleMovieSelect(movie.id);
                    document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative group bg-[#0b0b12] border rounded-xl overflow-hidden cursor-pointer h-full flex flex-col justify-between transition-all duration-300 ${
                    isSelected 
                      ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]' 
                      : 'border-white/10 hover:border-[#00D1FF]/40'
                  }`}
                >
                  <div className="absolute top-0 left-0 h-1 bg-[#00D1FF] transition-all" style={{ width: isSelected ? '100%' : '20%' }} />

                  {/* Image Frame */}
                  <div className="h-44 sm:h-48 overflow-hidden relative">
                    {/* Floating Info Button */}
                    {onShowInfo && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowInfo(movie);
                        }}
                        className="absolute top-3 left-3 z-30 p-1.5 rounded-full bg-black/85 hover:bg-[#00D1FF] border border-white/15 hover:border-[#00D1FF] text-white/80 hover:text-black hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all cursor-pointer flex items-center justify-center"
                        title="View Cast & Director"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <BlurUpImage 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[1px]">
                      <div className="bg-[#00D1FF] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Top Floating Match Badge */}
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <span className="bg-black/85 text-[#00D1FF] text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-[#00D1FF]/30">
                        {matchPercent}% Match
                      </span>
                    </div>

                    {/* Genres tag */}
                    <div className="absolute bottom-3 left-4">
                      <p className="text-[9px] font-bold text-[#00D1FF] uppercase tracking-widest">
                        {movie.genres.slice(0, 2).join(' / ')}
                      </p>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-sm sm:text-base font-black italic uppercase text-white truncate max-w-[75%] group-hover:text-[#00D1FF] transition-colors">
                          {movie.title}
                        </h5>
                        <span className="text-xs text-white/40 font-mono shrink-0">{movie.year}</span>
                      </div>
                      <p className="text-xs text-white/50 line-clamp-2 leading-relaxed h-8">
                        {movie.synopsis}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="pt-2.5 border-t border-white/5 flex flex-col gap-1 text-[9px] font-mono text-white/40 uppercase">
                        <div className="flex items-center justify-between">
                          <span className="truncate max-w-[150px]">
                            By: <strong className="text-white/60">{movie.directorOrCreator}</strong>
                          </span>
                          <span>{movie.runtimeOrSeasons}</span>
                        </div>
                        {exploreByTalent && (
                          <div className="text-[8.5px] text-[#00D1FF] truncate normal-case font-medium">
                            Cast: <span className="text-white/70">{movie.cast.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieSelect(movie.id);
                          document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-2 bg-gradient-to-r from-[#00D1FF]/10 to-[#00D1FF]/20 hover:from-[#00D1FF] hover:to-[#00D1FF] border border-[#00D1FF]/30 hover:border-[#00D1FF] text-[#00D1FF] hover:text-black font-mono text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{movie.type === 'Movie' ? (movie.isPublicDomain ? 'Play Free' : 'Play Movie') : 'Play Episode'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
