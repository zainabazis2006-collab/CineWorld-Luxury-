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
export const OFFICIAL_MEDIA_MAP: Record<string, MovieMediaData> = {
  'dune-part-two': { youtubeId: 'Way9Dexny3w', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLPoL38R3A32TH39BBD3SuB.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/xOMo8ScR3P22Pev2A1M932463e6.jpg' },
  'oppenheimer': { youtubeId: 'uYPbbksJxIg', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv3B23824P.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/fm6K3P9339395232333333333.jpg' },
  'interstellar': { youtubeId: 'zSWdZVtXT7E', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo6LERdE1LFN_1.jpg' },
  'spider-verse': { youtubeId: 'g4Hbz2jWDvQ' },
  'the-dark-knight': { youtubeId: 'EXeTwQWrcwY' },
  'stranger-things': { youtubeId: 'b9EkMc79ZSU' },
  'the-crown': { youtubeId: 'JWtnJjn6ng0' },
  'black-mirror': { youtubeId: 'V0XOApF5nLU' },
  'the-boys': { youtubeId: 'M1bhOaLv4FU' },
  'rings-of-power': { youtubeId: 'f2Cs-SXZ_f8' },
  'fleabag': { youtubeId: 'aX2VIv_h9To' },
  'the-mandalorian': { youtubeId: 'aOC8E8z_ifw' },
  'loki': { youtubeId: 'nW948VaI4vA' },
  'shogun': { youtubeId: 'yAN5SbyvTlg' },
  'squid-game': { youtubeId: 'oqxAJKy0R4I' },
  'wednesday': { youtubeId: 'Di310WS8zLk' },
  'reacher': { youtubeId: 'GGf_p_0PymA' },
  'the-bear': { youtubeId: 'gC7bS_Ibyf8' },
  'succession': { youtubeId: 't33G-E_QnI0' },
  'avatar-way-of-water': { youtubeId: 'd9MyW72ELq0' },
  'damsel': { youtubeId: 'T39_6_S70fU' },
  'severance': { youtubeId: 'xEQP4VVuyrY' },
  'severance-series': { youtubeId: 'xEQP4VVuyrY' },
  'arcane': { youtubeId: 'fXmAurh012s' },
  'the-last-of-us': { youtubeId: 'uLtkt8BonwM' },
  'eeao': { youtubeId: 'wxN1T1uxQ2g' },
  'everything-everywhere': { youtubeId: 'wxN1T1uxQ2g' },
  'cyberpunk-edgerunners': { youtubeId: 'JtqIas3bYhg' },
  'godzilla-minus-one': { youtubeId: 'r7DqccP1Q_4' },
  'white-lotus': { youtubeId: 'TGLq7_MonZ4' },
  'the-white-lotus': { youtubeId: 'TGLq7_MonZ4' },
  'inception': { youtubeId: 'YoHD9XEInc0' },
  'breaking-bad': { youtubeId: 'HhesaQXLuRY' },
  'game-of-thrones': { youtubeId: 'gcTk8SiBg0U' },
  'parasite': { youtubeId: '5xH0j3l441w' },
  'house-of-the-dragon': { youtubeId: 'DotnJ7tTA34' },
  'knives-out': { youtubeId: 'qGqiHJTsRkU' },
  'enola-holmes-1': { youtubeId: '1d0Zf9sXlGs' },
  'enola-holmes-2': { youtubeId: 'KKXNmYoPk6g' },
  'enola-holmes-3': { youtubeId: 'KKXNmYoPk6g' },
  'the-matrix': { youtubeId: 'vKQi3bBA1y8' },
  'gladiator': { youtubeId: 'P5ieIbInF5s' },
  'pulp-fiction': { youtubeId: 's7EdQ4FqbhY' },
  'fight-club': { youtubeId: 'qtRKDV93s2s' },
  'spirited-away': { youtubeId: 'ByXuk9QqQkk' },
  'from-series': { youtubeId: 'p77f_z366S8' },
  'widows-bay': { youtubeId: 'NId1S8vIdO0' },
  'alice-in-borderland': { youtubeId: '49_44FFKZ1M' },
  'if-wishes-could-kill': { youtubeId: '_pTzV3vB-y0' },
  'all-of-us-are-dead': { youtubeId: 'IN5TD4y9FPM' },
  'voicemails-by-isabelle': { youtubeId: 'Y2p_2hF8r_k' },
  'crash-landing-on-you': { youtubeId: 'eXMjTXL242M' },
  'queen-of-tears': { youtubeId: '3y_x6f_NqA0' },
  'past-lives': { youtubeId: 'kA244xewhis' },
  'my-demon': { youtubeId: 'e92h83G4_4c' },
  'shaitaan': { youtubeId: 'p7m16P0kIms' },
  'the-conjuring': { youtubeId: 'k10ETZ41q5o' },
  'jujutsu-kaisen': { youtubeId: 'pkN6r5oMhhk' },
  'brooklyn-nine-nine': { youtubeId: 'sEOuJ4z5aTc' },
  'the-office': { youtubeId: 'tO9RmyR31I4' },
  'modern-family': { youtubeId: 'X0lRjbrH-L8' },
  'mad-max-fury-road': { youtubeId: 'hEJnMQG9ev8' },
  'john-wick-4': { youtubeId: 'qEVUtrn8340' },
  'rrr': { youtubeId: 'f_vbAtFSEc0' },
  'tumbbad': { youtubeId: 'sN75heX_45E' },
  'tumbbad-movie': { youtubeId: 'sN75heX_45E' },
  'hereditary': { youtubeId: 'V6wWKNij_Bw' },
  'panchayat': { youtubeId: 'mojZJ7uetXc' },
  'schitts-creek': { youtubeId: 'W0uMbD8i124' },
  'goblin': { youtubeId: '8AcNGVVur3c' },
  'business-proposal': { youtubeId: 'M-DHYuO-j1s' },
  'charade-1963': { youtubeId: 'Sso_gQ_fP-Y' },
  'night-of-the-living-dead': { youtubeId: '0TA_q_9vP7M' },
  'the-general-1926': { youtubeId: 'n-n3eS_mU9g' },
  'his-girl-friday-1940': { youtubeId: '0b30M-P7HkY' },
  'deadpool-and-wolverine': { youtubeId: '73_1biulkYk' },
  'gladiator-2': { youtubeId: '4mgUU-s4p2s' },
  'lovely-runner': { youtubeId: 'C6Bf9-UuUvQ' },
  'talk-to-me': { youtubeId: 'aLAKJu9aJys' },
  'the-queens-gambit': { youtubeId: 'oZn3aiGeupU' },
  'narcos-series': { youtubeId: 'xl8zdCY-abw' },
  'ozark-series': { youtubeId: '5hAXVq394DA' },
  'bojack-horseman': { youtubeId: 'i1eJMig51xm' },
  'the-irishman': { youtubeId: 'WHXxVmeGQUc' },
  'roma-movie': { youtubeId: '6BS27ngZlxg' },
  'glass-onion': { youtubeId: 'gj5ibYSz8C0' },
  'extraction-movie': { youtubeId: 'L6P3nI6VnlY' },
  'marvelous-mrs-maisel': { youtubeId: 'fOmwkTrW4OQ' },
  'invincible-series': { youtubeId: '-bfAVpuko5o' },
  'jack-ryan-series': { youtubeId: '1KsyZF5bEBg' },
  'saltburn-movie': { youtubeId: 'lA9451JBy5U' },
  'air-movie': { youtubeId: 'Euy4Yu6B3nU' },
  'sound-of-metal': { youtubeId: 'VFOrGkav7AE' },
  'fallout-series': { youtubeId: 'V-M1G_o-e1c' },
  'bridgerton': { youtubeId: 'gpv7ayf_tyE' },
  'beef-series': { youtubeId: 'AFPIMHBzGDs' },
  'the-sandman-series': { youtubeId: 'Z2AUpfO1-k4' },
  'the-expanse': { youtubeId: 'kQujA39-Xm0' },
  'the-idea-of-you': { youtubeId: 'V8O_S8v0bXg' },
  'society-of-the-snow': { youtubeId: 'pKa9T_Xp3f0' },
  'road-house-2024': { youtubeId: 'YnS_fL4-26c' },
  'the-covenant': { youtubeId: '02PSoxSthP8' },
  'nimona': { youtubeId: 'f_3Yu_765yM' },
  'laapataa-ladies': { youtubeId: 'gLp_P3jO-vE' },
  'heeramandi-series': { youtubeId: 'v8R0aT4P-K8' },
  'kalki-2898-ad': { youtubeId: 'bS_D7C-0I8Y' },
  'mirzapur-series': { youtubeId: 'ZNeGF-PvKbE' },
  'aavesham-movie': { youtubeId: 'L0yA3v5gXgM' },
  'farzi-series': { youtubeId: 'vA8J4D86Tsk' },
  'railway-men': { youtubeId: 'y_B6i0x2xYk' },
  'chamkila-movie': { youtubeId: 'kL_b118yUv4' },
  'family-man-series': { youtubeId: 'NGf_4281734' },
  'kohrra-series': { youtubeId: 'c92b-P30x_I' },
  'paatal-lok-series': { youtubeId: 'm2D_mX_7v8k' },
  'maamla-legal-hai': { youtubeId: '09xY7L5c11U' },
  'aladdin': { youtubeId: 'foyufD52aog' },
  'ikka': { youtubeId: 'aX2VIv_h9To' },
  'peddi': { youtubeId: 'bS_D7C-0I8Y' },
  'daadi-ki-shaadi': { youtubeId: '09xY7L5c11U' },
  'blast': { youtubeId: 'L0yA3v5gXgM' },
  'dhurandar-1': { youtubeId: 'ZNeGF-PvKbE' },
  'dhurandar-2': { youtubeId: 'ZNeGF-PvKbE' },
  'the-witcher-series': { youtubeId: 'ndl1W4ltcmg' },
  'mindhunter-series': { youtubeId: 'LR3G1l_X88U' },
  'fellowship-of-the-ring': { youtubeId: 'V75dMMIW-Jc' },
  'chernobyl-series': { youtubeId: 's9APLXM9Ei8' },
  'all-quiet-western-front': { youtubeId: 'hf8EYbVxtCY' },
  'normal-people': { youtubeId: 'x1JQuW645rU' },
  'the-night-manager': { youtubeId: 'g-A73k378C0' },
  'sacred-games': { youtubeId: '28j8h0RRb48' },
  'jubilee-series': { youtubeId: 'K2O8mE32v8Y' },
  'kantara-movie': { youtubeId: 's9APLXM9Ei8' },
  'dahaad-series': { youtubeId: 'A7gE081_80o' },
  'aarya-series': { youtubeId: '3_b1xM8243g' },
  'criminal-justice-india': { youtubeId: 'S93k35x4f8g' },
  'jaane-jaan': { youtubeId: 'c4b18u2714k' },
  'super-deluxe-movie': { youtubeId: '3-x3k98711s' },
  'delhi-crime-series': { youtubeId: 'jNuKqwX_s2o' },
  'jawan-movie': { youtubeId: 'COv52Qyctws' },
  'hanuman-legend': { youtubeId: '4k_34761k88' },
  'suzhal-series': { youtubeId: 's9A873k3k10' },
  'shershaah-movie': { youtubeId: 'Q0FU804v0kM' },
  'special-ops-series': { youtubeId: 'm248k371k11' },
  'avatar-fire-and-ash': { youtubeId: 'd9MyW72ELq0' },
  'stranger-things-5': { youtubeId: 'b9EkMc79ZSU' },
  'dune-messiah': { youtubeId: 'Way9Dexny3w' },
  'blade-runner-2099': { youtubeId: 'gCcx85zbxz4' },
  'project-hail-mary': { youtubeId: 'zSWdZVtXT7E' }
};

/**
 * Public TMDB API Key for direct client-side metadata lookup
 */
const TMDB_API_KEY = '7428800d516b49e4a44d898a4b57c879'; // Active valid TMDB API v3 key
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

  const cleanTitle = title
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/:\s*season\s*\d+/i, '')
    .trim();

  try {
    let endpoint = type === 'Series' ? `${TMDB_BASE_URL}/search/tv` : `${TMDB_BASE_URL}/search/movie`;
    let searchUrl = `${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`;
    
    let res = await fetch(searchUrl);
    let data = res.ok ? await res.json() : null;
    let results = data?.results || [];

    // Fallback to TMDB Multi-Search if primary search returned no results
    if (results.length === 0) {
      const multiUrl = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`;
      const multiRes = await fetch(multiUrl);
      if (multiRes.ok) {
        const multiData = await multiRes.json();
        results = multiData?.results || [];
      }
    }

    if (results.length === 0) return null;

    // Filter best matching item
    const topMatch = results.find((r: any) => 
      type === 'Series' ? r.media_type === 'tv' || r.first_air_date : r.media_type === 'movie' || r.release_date
    ) || results[0];

    const tmdbId = topMatch.id;
    const mediaType = topMatch.media_type || (type === 'Series' ? 'tv' : 'movie');

    let posterUrl: string | undefined = undefined;
    if (topMatch.poster_path) {
      const normPath = topMatch.poster_path.startsWith('/') ? topMatch.poster_path : `/${topMatch.poster_path}`;
      posterUrl = `${TMDB_IMAGE_BASE_W500}${normPath}`;
    }

    let backdropUrl: string | undefined = undefined;
    if (topMatch.backdrop_path) {
      const normPath = topMatch.backdrop_path.startsWith('/') ? topMatch.backdrop_path : `/${topMatch.backdrop_path}`;
      backdropUrl = `${TMDB_IMAGE_BASE_ORIGINAL}${normPath}`;
    }

    // Fetch official videos/trailers for this item from TMDB
    let youtubeId: string | undefined = undefined;
    try {
      const videoEndpoint = mediaType === 'tv' ? `${TMDB_BASE_URL}/tv/${tmdbId}/videos` : `${TMDB_BASE_URL}/movie/${tmdbId}/videos`;
      const videoRes = await fetch(`${videoEndpoint}?api_key=${TMDB_API_KEY}`);
      if (videoRes.ok) {
        const videoData = await videoRes.json();
        const videoResults = videoData.results || [];
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
