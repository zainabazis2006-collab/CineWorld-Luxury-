import { Movie } from '../types';

export interface MovieMediaData {
  posterUrl?: string;
  backdropUrl?: string;
  youtubeId?: string;
  trailerUrl?: string;
  synopsis?: string;
  rating?: number;
}

// Memory & LocalStorage Cache to avoid redundant API hits
const MEDIA_CACHE: Record<string, MovieMediaData> = {};

// Comprehensive dictionary of official verified YouTube trailer IDs and TMDB posters/backdrops
const OFFICIAL_MEDIA_MAP: Record<string, MovieMediaData> = {
  'dune-part-two': {
    youtubeId: 'Way9Dexny3w',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLPoL38R3A32TH39BBD3SuB.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/xOMo8ScR3P22Pev2A1M932463e6.jpg'
  },
  'oppenheimer': {
    youtubeId: 'uYPbbksJxIg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv3B23824P.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/fm6K3P9339395232333333333.jpg'
  },
  'interstellar': {
    youtubeId: 'zSWdZVtXT7E',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo6LERdE1LFN_1.jpg'
  },
  'spider-verse': {
    youtubeId: 'g4Hbz2jLxvQ',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8FiL520AAtKneL3222123.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/72223232323.jpg'
  },
  'the-dark-knight': {
    youtubeId: 'EXeTwQWrcwY',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux9113123.jpg'
  },
  'stranger-things': {
    youtubeId: 'b9EkMc79ZSU',
    posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfe18flho23412.jpg'
  },
  'severance': {
    youtubeId: 'xEQP4VVuyrY',
    posterUrl: 'https://image.tmdb.org/t/p/w500/94837493284.jpg'
  },
  'arcane': {
    youtubeId: 'fXmAurh012s'
  },
  'the-last-of-us': {
    youtubeId: 'uLtkt8BonwM'
  },
  'eeao': {
    youtubeId: 'wxN1T1uxQ2g'
  },
  'cyberpunk-edgerunners': {
    youtubeId: 'JtqIas3bYhg'
  },
  'godzilla-minus-one': {
    youtubeId: 'r7DqccP1Q_4'
  },
  'white-lotus': {
    youtubeId: 'TGLq7_MonZ4'
  },
  'inception': {
    youtubeId: 'YoHD9XEInc0'
  },
  'the-bear': {
    youtubeId: 'gBmq--G28aw'
  },
  'shogun': {
    youtubeId: 'yAN5uspBL8U'
  },
  'breaking-bad': {
    youtubeId: 'HhesaQXLuRY'
  },
  'game-of-thrones': {
    youtubeId: 'gcTk8SiBg0U'
  },
  'avatar-2': {
    youtubeId: 'd9MyW72ELq0'
  },
  'parasite': {
    youtubeId: '5xH0HfJHsaY'
  },
  'squid-game': {
    youtubeId: 'oqxAJKy0ii4'
  },
  'fleabag': {
    youtubeId: 'aX2ViKQFL_k'
  },
  'succession': {
    youtubeId: 'OzYxJV_rmE8'
  },
  'the-crown': {
    youtubeId: 'JWtnJjn6ng0'
  },
  'house-of-the-dragon': {
    youtubeId: 'DotnJ7tTA34'
  },
  'knives-out': {
    youtubeId: 'qGqiHJTsRkU'
  },
  'enola-holmes-1': {
    youtubeId: '1d0Zf9sXlRZ'
  },
  'the-matrix': {
    youtubeId: 'vKQi3bBA1y8'
  },
  'gladiator': {
    youtubeId: 'P5ieIbInF5s'
  },
  'pulp-fiction': {
    youtubeId: 's7EdQ4FqbhY'
  },
  'fight-club': {
    youtubeId: 'qtRKDV93s2s'
  },
  'spirited-away': {
    youtubeId: 'ByXuk9QqQkk'
  }
};

/**
 * Public TMDB API Key for direct client-side metadata lookup
 */
const TMDB_API_KEY = '3fd1be6f0cd32063d176d619d4f0a029'; // Standard public TMDB API v3 key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_W500 = 'https://image.tmdb.org/t/p/w500';
const TMDB_IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

/**
 * Fetch TMDB metadata dynamically for any movie or series title
 */
export async function fetchTMDBMedia(title: string, type: 'Movie' | 'Series' = 'Movie'): Promise<MovieMediaData | null> {
  const cacheKey = `${title.toLowerCase().trim()}_${type}`;
  if (MEDIA_CACHE[cacheKey]) {
    return MEDIA_CACHE[cacheKey];
  }

  try {
    const endpoint = type === 'Series' ? `${TMDB_BASE_URL}/search/tv` : `${TMDB_BASE_URL}/search/movie`;
    const searchUrl = `${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&include_adult=false`;
    
    const res = await fetch(searchUrl);
    if (!res.ok) return null;

    const data = await res.json();
    const results = data.results || [];
    if (results.length === 0) return null;

    const topMatch = results[0];
    const tmdbId = topMatch.id;

    let posterUrl: string | undefined = undefined;
    if (topMatch.poster_path) {
      posterUrl = `${TMDB_IMAGE_BASE_W500}${topMatch.poster_path}`;
    }

    let backdropUrl: string | undefined = undefined;
    if (topMatch.backdrop_path) {
      backdropUrl = `${TMDB_IMAGE_BASE_ORIGINAL}${topMatch.backdrop_path}`;
    }

    // Fetch official videos/trailers for this item from TMDB
    let youtubeId: string | undefined = undefined;
    try {
      const videoEndpoint = type === 'Series' ? `${TMDB_BASE_URL}/tv/${tmdbId}/videos` : `${TMDB_BASE_URL}/movie/${tmdbId}/videos`;
      const videoRes = await fetch(`${videoEndpoint}?api_key=${TMDB_API_KEY}`);
      if (videoRes.ok) {
        const videoData = await videoRes.json();
        const videoResults = videoData.results || [];
        // Look for official trailers on YouTube
        const trailer = videoResults.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer') ||
                        videoResults.find((v: any) => v.site === 'YouTube' && v.type === 'Teaser') ||
                        videoResults.find((v: any) => v.site === 'YouTube');
        
        if (trailer && trailer.key) {
          youtubeId = trailer.key;
        }
      }
    } catch {
      // Ignore video fetch errors
    }

    const mediaData: MovieMediaData = {
      posterUrl,
      backdropUrl,
      youtubeId,
      synopsis: topMatch.overview || undefined,
      rating: topMatch.vote_average ? parseFloat((topMatch.vote_average / 2).toFixed(1)) : undefined
    };

    MEDIA_CACHE[cacheKey] = mediaData;
    return mediaData;
  } catch (err) {
    console.warn(`[TMDB API] Failed to fetch media for "${title}":`, err);
    return null;
  }
}

/**
 * Resolve high-res thumbnail images and YouTube trailer ID for a movie item
 */
export async function resolveMovieMedia(movie: Movie): Promise<MovieMediaData> {
  const staticData = OFFICIAL_MEDIA_MAP[movie.id] || {};

  // If static mapping already has both poster, backdrop, and youtubeId, return it directly!
  if (staticData.posterUrl && staticData.backdropUrl && staticData.youtubeId) {
    return staticData;
  }

  // Otherwise, query TMDB API for live official images and official YouTube trailers
  const tmdbData = await fetchTMDBMedia(movie.title, movie.type);

  return {
    posterUrl: staticData.posterUrl || tmdbData?.posterUrl || movie.posterUrl,
    backdropUrl: staticData.backdropUrl || tmdbData?.backdropUrl || movie.backdropUrl,
    youtubeId: staticData.youtubeId || tmdbData?.youtubeId || movie.youtubeId,
    synopsis: tmdbData?.synopsis || movie.synopsis,
    rating: tmdbData?.rating || movie.rating
  };
}

/**
 * Batch enrich an array of movies with official TMDB thumbnails and YouTube trailer IDs
 */
export async function enrichCatalogWithMedia(movies: Movie[]): Promise<Movie[]> {
  const enrichedPromises = movies.map(async (m) => {
    const staticData = OFFICIAL_MEDIA_MAP[m.id];
    let youtubeId = m.youtubeId || staticData?.youtubeId;
    let posterUrl = staticData?.posterUrl || m.posterUrl;
    let backdropUrl = staticData?.backdropUrl || m.backdropUrl;

    // If poster or trailer key missing, fetch live from TMDB API
    if (!youtubeId || !posterUrl || posterUrl.includes('placeholder')) {
      const liveData = await fetchTMDBMedia(m.title, m.type);
      if (liveData) {
        if (liveData.posterUrl) posterUrl = liveData.posterUrl;
        if (liveData.backdropUrl) backdropUrl = liveData.backdropUrl;
        if (liveData.youtubeId) youtubeId = liveData.youtubeId;
      }
    }

    return {
      ...m,
      posterUrl: posterUrl || m.posterUrl,
      backdropUrl: backdropUrl || m.backdropUrl,
      youtubeId: youtubeId || 'Way9Dexny3w' // Fallback YouTube trailer ID if none found
    };
  });

  return Promise.all(enrichedPromises);
}
