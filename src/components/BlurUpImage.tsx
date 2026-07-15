import React, { useState, useEffect } from 'react';

interface BlurUpImageProps {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  [key: string]: any;
}

export default function BlurUpImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop',
  onError,
  onLoad,
  ...props
}: BlurUpImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setIsLoaded(false);
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoaded(false);
    }
    if (onError) onError(e);
  };

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0f] ${className} ${containerClassName}`}>
      {/* Elegant Pulsing Skeleton Shimmer overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-[#12121e]/50 to-zinc-950/90 animate-pulse z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-white/5 bg-white/5 animate-ping opacity-25" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded 
            ? 'blur-0 scale-100 opacity-100' 
            : 'blur-2xl scale-105 opacity-30'
        }`}
        {...props}
      />
    </div>
  );
}
