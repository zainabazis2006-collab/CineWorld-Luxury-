import React, { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { 
  Play, 
  Info, 
  Star, 
  Search,
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
  VolumeX,
  Flame,
  Menu,
  Settings,
  Image as LucideImage,
  MapPin,
  Users,
  Shuffle,
  RotateCcw
} from 'lucide-react';
import { CURATED_CATALOG, TRANSLATIONS, getProxiedUrl } from './data';
import { Movie, Review, UserState, ChatMessage } from './types';
import { getSeriesSeasons } from './episodes';
import { OFFICIAL_MEDIA_MAP, fetchMovieTrailer, fetchContentVideo } from './services/movieApi';
import { motion, AnimatePresence } from 'motion/react';
import LazySection from './components/LazySection';
import UserDatabaseConsole from './components/UserDatabaseConsole';

const TrendingChart = lazy(() => import('./components/TrendingChart'));
import TiltCard from './components/TiltCard';
const CinemaPlayer = lazy(() => import('./components/CinemaPlayer'));
import CineWorldLogo from './components/CineWorldLogo';
import CinematicAuth from './components/CinematicAuth';
import GenreCarousel from './components/GenreCarousel';
import BlurUpImage from './components/BlurUpImage';
import InteractiveGenreVault from './components/InteractiveGenreVault';
import { LuxuryScrollProgressAndElevator } from './components/LuxuryScrollProgressAndElevator';

interface CinematicStill {
  url: string;
  caption: string;
  location?: string;
}

const CINEMATIC_STILLS: Record<string, CinematicStill[]> = {
  'dune-part-two': [
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      caption: 'The sweeping desert landscape of Arrakis under twin suns.',
      location: "Rub' al Khali Desert"
    },
    {
      url: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1000&q=80',
      caption: 'Fremen legions advancing through high canyon ridges.',
      location: 'Wadi Rum Sanctuary'
    },
    {
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
      caption: 'A deep atmospheric sunset illuminating spice clouds.',
      location: 'Arrakis Outer Basin'
    }
  ],
  'oppenheimer': [
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      caption: 'A simulated particle reaction capturing the kinetic fire of Trinity.',
      location: 'Los Alamos Laboratory'
    },
    {
      url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1000&q=80',
      caption: 'Theoretical quantum formulas written in high-contrast chalk.',
      location: 'Princeton University Study'
    },
    {
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      caption: 'An elegant vintage portrait frame capturing the solemnity of the era.',
      location: 'Cabinet Hearing Room'
    }
  ],
  'interstellar': [
    {
      url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1000&q=80',
      caption: 'Wormhole curvature warping the surrounding starlight spectrum.',
      location: 'Deep Space Coordinate Zero'
    },
    {
      url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=80',
      caption: 'Ethereal accretion disk emissions of the Gargantua black hole.',
      location: 'Event Horizon Boundaries'
    },
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1000&q=80',
      caption: "The vast, endless tidal swells of Miller's ocean planet.",
      location: "Miller's Aquatic Surface"
    }
  ],
  'spider-verse': [
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Glitch-heavy chromatic aberrations of a multi-dimensional Brooklyn.',
      location: 'Brooklyn Earth-1610'
    },
    {
      url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
      caption: 'Halftone dot patterns and vibrant street art typography collage.',
      location: 'Spider-Society Hub'
    },
    {
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
      caption: 'High-velocity gravity defiance through a neon-lit skyline.',
      location: 'Nueva York Earth-928'
    }
  ],
  'the-dark-knight': [
    {
      url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1000&q=80',
      caption: "A brooding, high-contrast silhouette overlooking Gotham's skyline.",
      location: 'Wayne Enterprises Tower'
    },
    {
      url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1000&q=80',
      caption: 'Rain-slicked asphalt reflecting emergency cruiser signals.',
      location: 'Lower Wacker Drive'
    },
    {
      url: 'https://images.unsplash.com/photo-1484156818044-c040038b0719?auto=format&fit=crop&w=1000&q=80',
      caption: "An eerie, deserted street capturing Gotham's psychological tension.",
      location: 'GCPD Jurisdiction'
    }
  ],
  'stranger-things': [
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
      caption: 'Dense, misty woodlands cloaking supernatural gateway energy.',
      location: 'Hawkins National Forest'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      caption: 'Fluorescent neon signs of an 80s mall cast in deep shadow.',
      location: 'Starcourt Mall Arcade'
    },
    {
      url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
      caption: 'A retro film projector flashing ominous red and blue hues.',
      location: 'The Upside Down Entrance'
    }
  ],
  'the-crown': [
    {
      url: 'https://images.unsplash.com/photo-1581442163989-130a1df27725?auto=format&fit=crop&w=1000&q=80',
      caption: 'Gilded gold-leaf crown moldings and high historical arches.',
      location: 'Buckingham Palace'
    },
    {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      caption: 'A solemn royal mahogany study filled with official dispatches.',
      location: 'Balmoral Castle Estate'
    },
    {
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      caption: 'Imperial gates draped in mist and historical prestige.',
      location: 'Windsor Sovereign Ground'
    }
  ],
  'black-mirror': [
    {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
      caption: 'A glowing surveillance mainframe parsing human emotions into data.',
      location: 'TCKR Systems Facility'
    },
    {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      caption: 'User interactive interfaces rendering digital consciousness.',
      location: 'San Junipero Servers'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Glitch-art feed flickering between analog static and cybernetics.',
      location: 'Nosedive Social Network'
    }
  ],
  'the-boys': [
    {
      url: 'https://images.unsplash.com/photo-1496568818309-53d7c7753022?auto=format&fit=crop&w=1000&q=80',
      caption: 'Corporate steel monoliths towering over decaying city streets.',
      location: 'Vought International HQ'
    },
    {
      url: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1000&q=80',
      caption: 'An energetic high-contrast purple light flare highlighting chaos.',
      location: 'Flatiron Safehouse'
    },
    {
      url: 'https://images.unsplash.com/photo-1524140525287-0155a331100e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Raw graffiti detailing civilian rebellion against corrupt figures.',
      location: 'New York Underbelly'
    }
  ],
  'rings-of-power': [
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      caption: 'The majestic, cloud-shrouded peaks of legendary alpine ranges.',
      location: 'Ered Luin Highlands'
    },
    {
      url: 'https://images.unsplash.com/photo-1519074069444-1ba4e6664104?auto=format&fit=crop&w=1000&q=80',
      caption: 'Ancient elven stone pillars moss-draped and untouched by time.',
      location: 'Lindon Forest Realms'
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      caption: 'A deep, magical forest canopy glowing with natural luminescence.',
      location: 'Rhûn Wilderness Border'
    }
  ],
  'fleabag': [
    {
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      caption: 'A warm, cluttered London cafe capturing everyday eccentricities.',
      location: 'Guinea Pig Cafe, London'
    },
    {
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
      caption: 'Warm, intimate interior lighting ideal for breaking the fourth wall.',
      location: "St. Mary's Confessional"
    },
    {
      url: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=80',
      caption: 'Rain-washed brick walls of high-end galleries and residences.',
      location: 'Exhibition Hallway'
    }
  ],
  'the-mandalorian': [
    {
      url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1000&q=80',
      caption: 'A remote cosmic system dotted with asteroid belts and dust rings.',
      location: 'Outer Rim Territories'
    },
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      caption: 'The barren, sun-parched plains of a desolate volcanic planet.',
      location: 'Nevarro Badlands'
    },
    {
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      caption: 'The cold steel cockpit illumination of the Razor Crest vessel.',
      location: 'Hyperspace Transit'
    }
  ],
  'loki': [
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      caption: 'The hyper-complex cosmic tree weaving timeline threads.',
      location: 'The Temporal Loom'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      caption: 'Retro-futuristic mid-century office corridors cast in deep orange.',
      location: 'Time Variance Authority'
    },
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Vibrant neon purple and blue timeline nexus flares.',
      location: 'The Citadel at the End of Time'
    }
  ],
  'shogun': [
    {
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Misty pine-covered slopes overlooking ancestral castle grounds.',
      location: 'Osaka Province Borders'
    },
    {
      url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Elegant Japanese shoji screens diffusing natural, soft morning light.',
      location: 'Council Regents Hall'
    },
    {
      url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
      caption: 'A scenic coastline draped in dense forest and heavy ocean fog.',
      location: 'Anjiro Fishing Village'
    }
  ],
  'squid-game': [
    {
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
      caption: 'A colorful, surreal pastel staircase labyrinth defying physical logic.',
      location: 'The Pastel Stairwells'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      caption: 'An eerie, minimalist playground ringed by towering security walls.',
      location: 'Red Light, Green Light Arena'
    },
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Flickering, high-intensity fluorescent neon framing player quarters.',
      location: 'The Dormitory Complex'
    }
  ]
};

const getMovieStills = (movie: Movie): CinematicStill[] => {
  if (CINEMATIC_STILLS[movie.id]) {
    return CINEMATIC_STILLS[movie.id];
  }
  const genreKeyword = movie.genres && movie.genres.length > 0 ? movie.genres[0] : 'Cinematic';
  return [
    {
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
      caption: `Atmospheric theatrical scene matching ${movie.title}'s ${genreKeyword} theme.`,
      location: 'Studio Production Lot'
    },
    {
      url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1000&q=80',
      caption: `Intimate composition emphasizing focal depth and character focus in ${movie.title}.`,
      location: 'Principal Photography Set'
    },
    {
      url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1000&q=80',
      caption: 'Aesthetic, high-contrast visual cue mirroring the emotional tone of this curation.',
      location: 'Scenic Master Shot'
    }
  ];
};
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
  'enola-holmes-3': 'KKXNmYoPk6g',
  'from-series': 'p77f_z366S8',
  'widows-bay': 'NId1S8vIdO0',
  'alice-in-borderland': '49_44FFKZ1M',
  'if-wishes-could-kill': '_pTzV3vB-y0',
  'all-of-us-are-dead': 'IN5TD4y9FPM',
  'voicemails-by-isabelle': 'Y2p_2hF8r_k',
  'crash-landing-on-you': 'eXMjTXL242M',
  'queen-of-tears': '3y_x6f_NqA0',
  'past-lives': 'kA244xewhis',
  'my-demon': 'e92h83G4_4c',
  'shaitaan': 'p7m16P0kIms',
  'the-conjuring': 'k10ETZ71qbh',
  'jujutsu-kaisen': 'pkN6r5oMhhk',
  'parasite': '5xH0HfJHsaY',
  'breaking-bad': 'HhesaQXLuRY',
  'brooklyn-nine-nine': 'sEOu_PrFi7s',
  'the-office': 'gO8N3m_XMWY',
  'modern-family': 'X0lRj8P6v80',
  'mad-max-fury-road': 'hEJnMQG9ld8',
  'john-wick-4': 'qEVUtrk8_B4',
  'rrr': 'NgBoMJy386M',
  'tumbbad': 'sN7AtRE40UY',
  'tumbbad-movie': 'sN7AtRE40UY',
  'hereditary': 'V6wWKNij_1M',
  'panchayat': '91_r0Bf3L-g',
  'schitts-creek': 'W0uM_ZLe9go',
  'goblin': '8Ac0WstXn6g',
  'business-proposal': 'M-PHcxPkYAI',
  'charade-1963': 'Sso_gQ_fP-Y',
  'night-of-the-living-dead': '0TA_q_9vP7M',
  'the-general-1926': 'n-n3eS_mU9g',
  'his-girl-friday-1940': '0b30M-P7HkY',
  'deadpool-and-wolverine': '73_1biulkYk',
  'gladiator-2': '4mgUU-s4p2s',
  'severance': 'xEQP4VVuyrY',
  'severance-series': 'xEQP4VVuyrY',
  'house-of-the-dragon': 'DotnJ7tTA34',
  'lovely-runner': 'C6Bf9-UuUvQ',
  'talk-to-me': 'aLAKJu9aJys',
  'the-queens-gambit': 'oZn3aiGeupU',
  'narcos-series': 'xl8zdCY-abw',
  'ozark-series': '5hAXVq394DA',
  'bojack-horseman': 'i1eJMig51xm',
  'the-irishman': 'WHXxVmeGQUc',
  'roma-movie': '6BS27ngZlxg',
  'glass-onion': 'gj5ibYSz8C0',
  'extraction-movie': 'L6P3nI6VnlY',
  'marvelous-mrs-maisel': 'fOmwkTrW4OQ',
  'invincible-series': '-bfAVpuko5o',
  'jack-ryan-series': '1KsyZF5bEBg',
  'saltburn-movie': 'lA9451JBy5U',
  'air-movie': 'Euy4Yu6B3nU',
  'sound-of-metal': 'VFOrGkav7AE',
  'fallout-series': 'V-M1G_o-e1c',
  'bridgerton': 'gpv7ayf_tyE',
  'beef-series': 'AFPIMHBzGDs',
  'the-sandman-series': 'Z2AUpfO1-k4',
  'the-expanse': 'kQujA39-Xm0',
  'the-idea-of-you': 'V8O_S8v0bXg',
  'society-of-the-snow': 'pKa9T_Xp3f0',
  'road-house-2024': 'YnS_fL4-26c',
  'the-covenant': '02PSoxSthP8',
  'nimona': 'f_3Yu_765yM',
  'laapataa-ladies': 'gLp_P3jO-vE',
  'heeramandi-series': 'v8R0aT4P-K8',
  'kalki-2898-ad': 'bS_D7C-0I8Y',
  'mirzapur-series': 'ZNeGF-PvKbE',
  'aavesham-movie': 'L0yA3v5gXgM',
  'farzi-series': 'vA8J4D86Tsk',
  'railway-men': 'y_B6i0x2xYk',
  'chamkila-movie': 'kL_b118yUv4',
  'family-man-series': 'NGf_4281734',
  'kohrra-series': 'c92b-P30x_I',
  'paatal-lok-series': 'm2D_mX_7v8k',
  'maamla-legal-hai': '09xY7L5c11U',
  'aladdin': 'foyufD52aog',
  'ikka': 'aX2VIv_h9To',
  'peddi': 'bS_D7C-0I8Y',
  'daadi-ki-shaadi': '09xY7L5c11U',
  'blast': 'L0yA3v5gXgM',
  'dhurandar-1': 'ZNeGF-PvKbE',
  'dhurandar-2': 'ZNeGF-PvKbE',
  'the-witcher-series': 'ndl1W4ltcmg',
  'mindhunter-series': 'LR3G1l_X88U',
  'arcane': 'fXmAurh012s',
  'the-last-of-us': 'uLtkt8BonwM',
  'eeao': 'wxN1T1uxQ2g',
  'everything-everywhere': 'wxN1T1uxQ2g',
  'cyberpunk-edgerunners': 'JtqIas3bYhg',
  'godzilla-minus-one': 'r7DqccP1Q_4',
  'white-lotus': 'TGLq7_MonZ4',
  'the-white-lotus': 'TGLq7_MonZ4',
  'fellowship-of-the-ring': 'V75dMMIW-Jc',
  'chernobyl-series': 's9APLXM9Ei8',
  'all-quiet-western-front': 'hf8EYbVxtCY',
  'normal-people': 'x1JQuW645rU',
  'the-night-manager': 'g-A73k378C0',
  'sacred-games': '28j8h0RRb48',
  'jubilee-series': 'K2O8mE32v8Y',
  'kantara-movie': 's9APLXM9Ei8',
  'dahaad-series': 'A7gE081_80o',
  'aarya-series': '3_b1xM8243g',
  'criminal-justice-india': 'S93k35x4f8g',
  'jaane-jaan': 'c4b18u2714k',
  'super-deluxe-movie': '3-x3k98711s',
  'delhi-crime-series': 'jNuKqwX_s2o',
  'jawan-movie': 'COv52Qyctws',
  'hanuman-legend': '4k_34761k88',
  'suzhal-series': 's9A873k3k10',
  'shershaah-movie': 'Q0FU804v0kM',
  'special-ops-series': 'm248k371k11',
  'avatar-fire-and-ash': 'd9MyW72ELq0',
  'stranger-things-5': 'b9EkMc79ZSU',
  'dune-messiah': 'Way9Dexny3w',
  'blade-runner-2099': 'gCcx85zbxz4',
  'project-hail-mary': 'zSWdZVtXT7E'
};;

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

// Clean search title to remove parenthetical context and season numbers
function cleanSearchTitle(title: string): string {
  let clean = title;

  // 1. Strip multi-language brackets and parenthetical symbols completely
  clean = clean
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/【[^】]*】/g, '')
    .replace(/「[^」]*」/g, '')
    .replace(/『[^』]*』/g, '')
    .replace(/《[^》]*》/g, '')
    .replace(/〈[^〉]*〉/g, '');

  // Strip trailing season tags like ": Season 5" or "Season 2"
  clean = clean.replace(/:\s*season\s*\d+/i, '').replace(/\s+season\s*\d+/i, '');

  // Strip trailing year (e.g. " 2024")
  clean = clean.replace(/\s+\d{4}$/, '');

  // Strip common trailing words like "- Series" or "- Movie"
  clean = clean.replace(/\s+-\s+series$/i, '')
               .replace(/\s+-\s+movie$/i, '')
               .replace(/\s+series$/i, '')
               .replace(/\s+movie$/i, '');

  return clean.trim();
}

// Special local mappings for unreleased or special titles
const SPECIAL_LOCAL_MEDIA: Record<string, { posterUrl: string; backdropUrl: string }> = {
  "widow's bay": {
    posterUrl: "https://image.tmdb.org/t/p/w500/vKq8XEJKxQTHd2Bm5zZMFPUrke7.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/u6XtMg9Ai9siEbEs0UudPS3EaZY.jpg"
  },
  "if wishes could kill": {
    posterUrl: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  }
};

// PLACEHOLDER: Paste your TMDB API Key here. Defaults to the pre-configured key.
const TMDB_API_KEY = '7428800d516b49e4a44d898a4b57c879';

// Helper to validate image dimensions (>100x100px) before displaying
function validateImageDimensions(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(false);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.naturalWidth > 100 && img.naturalHeight > 100);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = url;
  });
}

// Helper to fetch images from TVmaze API (free, no-key, very reliable for TV shows/series)
async function fetchTVmazeImageDirectly(title: string): Promise<{ posterUrl: string; backdropUrl: string } | null> {
  try {
    const cleanTitle = cleanSearchTitle(title);
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(cleanTitle)}`;
    const response = await fetch(url);
    if (response.ok) {
      const show = await response.json();
      if (show && show.image) {
        const originalImage = show.image.original || show.image.medium;
        if (originalImage) {
          return { posterUrl: originalImage, backdropUrl: originalImage };
        }
      }
    }
  } catch (e) {
    console.error(`TVmaze search failed for ${title}:`, e);
  }
  return null;
}

// Helper to fetch images from iTunes Search API (free, no-key, very reliable for both movies and tv shows)
async function fetchiTunesImageDirectly(title: string, type: string): Promise<{ posterUrl: string; backdropUrl: string } | null> {
  try {
    const cleanTitle = cleanSearchTitle(title);
    const entity = type === 'Series' ? 'tvShow' : 'movie';
    let url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTitle)}&entity=${entity}&limit=1`;
    let response = await fetch(url);
    let data = response.ok ? await response.json() : null;

    if (!data || !data.results || data.results.length === 0) {
      // General broad search without specific entity constraint
      url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTitle)}&limit=1`;
      response = await fetch(url);
      data = response.ok ? await response.json() : null;
    }

    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      const artworkUrl = result.artworkUrl100 || result.artworkUrl60;
      if (artworkUrl) {
        // Upgrade the low-res 100x100 artwork to extremely high-res (e.g., 600x600 or 1000x1000)
        const highResPoster = artworkUrl.replace(/100x100bb|100x100|60x60bb|60x60/g, '600x600bb');
        return {
          posterUrl: highResPoster,
          backdropUrl: highResPoster
        };
      }
    }
  } catch (e) {
    console.error(`iTunes search failed for ${title}:`, e);
  }
  return null;
}

// Client-side fallback API fetcher to ensure high-resolution movie posters and backdrops using TMDB, TVmaze, and iTunes
async function fetchMediaImagesDirectly(title: string, type: string, defaultPoster: string, defaultBackdrop: string) {
  const normTitle = title.toLowerCase().trim();
  const POSTER_COMING_SOON_FALLBACK = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
  const BACKDROP_COMING_SOON_FALLBACK = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';

  let posterUrl = defaultPoster;
  let backdropUrl = defaultBackdrop;

  if (SPECIAL_LOCAL_MEDIA[normTitle]) {
    posterUrl = SPECIAL_LOCAL_MEDIA[normTitle].posterUrl;
    backdropUrl = SPECIAL_LOCAL_MEDIA[normTitle].backdropUrl;
  } else {
    // 1. Try TMDB Search first using Multi-Search
    const apiKey = TMDB_API_KEY;
    const searchTerm = cleanSearchTitle(title);
    const isSeries = type === 'Series';
    const tmdbMultiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

    let tmdbSuccess = false;
    try {
      const res = await fetch(tmdbMultiUrl);
      if (res.ok) {
        const data = await res.json();
        const results = data?.results || [];
        if (results.length > 0) {
          const bestResult = results.find((r: any) => (r.media_type === 'movie' || r.media_type === 'tv') && r.poster_path) || results[0];
          const posterPath = bestResult.poster_path;
          const backdropPath = bestResult.backdrop_path;

          if (posterPath) {
            const normPath = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
            posterUrl = `https://image.tmdb.org/t/p/w500${normPath}`;
          }
          if (backdropPath) {
            const normPath = backdropPath.startsWith('/') ? backdropPath : `/${backdropPath}`;
            backdropUrl = `https://image.tmdb.org/t/p/w1280${normPath}`;
          } else if (posterPath) {
            const normPath = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
            backdropUrl = `https://image.tmdb.org/t/p/w1280${normPath}`;
          }
          tmdbSuccess = true;
        }
      }
    } catch (err) {
      console.error(`TMDB multi search lookup failed for ${title}:`, err);
    }

    // 2. Validate TMDB results; if invalid or failed, proceed to keyless, robust open APIs (iTunes / TVmaze)
    const isTmdbPosterValid = tmdbSuccess ? await validateImageDimensions(posterUrl) : false;

    if (!isTmdbPosterValid) {
      console.log(`TMDB image invalid/missing for "${title}". Trying robust fallback APIs...`);

      // If it is a TV series, prioritize TVmaze API which has stellar exact-match accuracy
      if (type === 'Series') {
        const tvmazeResult = await fetchTVmazeImageDirectly(title);
        if (tvmazeResult && (await validateImageDimensions(tvmazeResult.posterUrl))) {
          posterUrl = tvmazeResult.posterUrl;
          backdropUrl = tvmazeResult.backdropUrl;
        } else {
          // Fall back to iTunes
          const iTunesResult = await fetchiTunesImageDirectly(title, type);
          if (iTunesResult && (await validateImageDimensions(iTunesResult.posterUrl))) {
            posterUrl = iTunesResult.posterUrl;
            backdropUrl = iTunesResult.backdropUrl;
          }
        }
      } else {
        // If it is a Movie, prioritize iTunes Search API
        const iTunesResult = await fetchiTunesImageDirectly(title, type);
        if (iTunesResult && (await validateImageDimensions(iTunesResult.posterUrl))) {
          posterUrl = iTunesResult.posterUrl;
          backdropUrl = iTunesResult.backdropUrl;
        } else {
          // Fall back to TVmaze search as final attempt
          const tvmazeResult = await fetchTVmazeImageDirectly(title);
          if (tvmazeResult && (await validateImageDimensions(tvmazeResult.posterUrl))) {
            posterUrl = tvmazeResult.posterUrl;
            backdropUrl = tvmazeResult.backdropUrl;
          }
        }
      }
    }
  }

  // Perform final explicit checks for valid image dimensions (>100x100px)
  const isPosterValid = await validateImageDimensions(posterUrl);
  const isBackdropValid = await validateImageDimensions(backdropUrl);

  return {
    posterUrl: isPosterValid ? posterUrl : POSTER_COMING_SOON_FALLBACK,
    backdropUrl: isBackdropValid ? backdropUrl : BACKDROP_COMING_SOON_FALLBACK
  };
}

// Utility function to map movie genres to high-definition sample streams for preloading
function getVideoStreamUrl(movie: Movie): string {
  if (!movie) return '';
  const genres = (movie.genres || []).map(g => g.toLowerCase());
  if (genres.includes('sci-fi') || genres.includes('adventure')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  } else if (genres.includes('fantasy')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  } else if (genres.includes('comedy')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (genres.includes('horror') || genres.includes('thriller')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  } else {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback.mp4";
  }
}

// Fisher-Yates array shuffle for non-repeating hero carousel decks
function shuffleArray<T>(array: T[], avoidFirstItem?: T): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  if (avoidFirstItem && result.length > 1 && result[0] === avoidFirstItem) {
    const swapIndex = 1 + Math.floor(Math.random() * (result.length - 1));
    [result[0], result[swapIndex]] = [result[swapIndex], result[0]];
  }
  return result;
}

export default function App() {
  // Load state from localStorage if available, otherwise default
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('cineworld_user_state_v1');
    const now = Date.now();
    const defaultHistory = [
      { genre: 'Sci-Fi', timestamp: now - 3600000 },
      { genre: 'Sci-Fi', timestamp: now - 7200000 },
      { genre: 'Sci-Fi', timestamp: now - 10800000 },
      { genre: 'Sci-Fi', timestamp: now - 14400000 },
      { genre: 'Drama', timestamp: now - 18000000 },
      { genre: 'Drama', timestamp: now - 21600000 },
      { genre: 'Drama', timestamp: now - 25200000 },
      { genre: 'Action', timestamp: now - 28800000 },
      { genre: 'Action', timestamp: now - 32400000 }
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.genreClickHistory) {
          parsed.genreClickHistory = defaultHistory;
        }
        if (parsed.autoplayTrailers === undefined) {
          parsed.autoplayTrailers = true;
        }
        return parsed;
      } catch (e) {}
    }
    return {
      ratings: {},
      watchlist: ['shogun', 'fleabag'],
      reviews: {},
      genreClicks: { 'Sci-Fi': 2, 'Drama': 1 },
      clicks: {},
      preferredLanguage: 'en',
      region: 'IN',
      autoplayTrailers: true,
      genreClickHistory: defaultHistory
    };
  });

  // Save state updates to localStorage
  useEffect(() => {
    localStorage.setItem('cineworld_user_state_v1', JSON.stringify(userState));
  }, [userState]);

  // Calculate 24-hour trending genres from local interaction history
  const trendingGenres = useMemo(() => {
    const history = userState.genreClickHistory || [];
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    // Count clicks in the last 24 hours
    const counts: Record<string, number> = {};
    history.forEach(item => {
      if (item.timestamp >= oneDayAgo) {
        counts[item.genre] = (counts[item.genre] || 0) + 1;
      }
    });
    
    // Determine which are "high click volume"
    // Criteria: A genre is trending if it has at least 3 clicks/interactions in the last 24 hours
    return Object.entries(counts)
      .filter(([_, count]) => count >= 3)
      .map(([genre]) => genre);
  }, [userState.genreClickHistory]);

  // General App states
  const [selectedMovieId, setSelectedMovieId] = useState<string>('shogun');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState<boolean>(false);
  const headerSearchInputRef = useRef<HTMLInputElement | null>(null);

  // Global keyboard shortcut: Press "/" or "Ctrl+K" / "Cmd+K" to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.getAttribute('contenteditable') === 'true';

      if (!isTyping && e.key === '/') {
        e.preventDefault();
        headerSearchInputRef.current?.focus();
        headerSearchInputRef.current?.select();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        headerSearchInputRef.current?.focus();
        headerSearchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Non-repeating Hero Showcase Shuffle Engine States
  const [shuffledDeck, setShuffledDeck] = useState<string[]>([]);
  const [deckHistory, setDeckHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Trigger loading spinner for perceived API search requests in progress
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearchLoading(false);
      return;
    }
    setIsSearchLoading(true);
    const timer = setTimeout(() => {
      setIsSearchLoading(false);
    }, 450); // Simulates TMDB multi-search query latency and premium lookup
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [exploreByTalent, setExploreByTalent] = useState<boolean>(false);
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [theaterMovieId, setTheaterMovieId] = useState<string | null>(null); // Full screen modal trailer player state
  const [isCarouselPlaying, setIsCarouselPlaying] = useState<boolean>(true);

  // Free Stream Match Mode and Backup Stream Index state
  const [streamMode, setStreamMode] = useState<'full' | 'trailer'>('trailer');
  const [backupIndex, setBackupIndex] = useState<number>(0);
  const [activeTrailerKey, setActiveTrailerKey] = useState<string>('Way9Dexny3w');
  const [activeDirectStreamUrl, setActiveDirectStreamUrl] = useState<string>('');
  const [isTrailerLoading, setIsTrailerLoading] = useState<boolean>(false);

  // Series Season & Episode State
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  // Track if Hero Showcase is visible to optimize rendering/scrolling performance
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true);

  useEffect(() => {
    const heroElement = document.getElementById('hero-showcase');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.02 } // Trigger as soon as the top/bottom 2% of the hero is on screen
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);


  // Talent Info Modal State
  const [infoMovie, setInfoMovie] = useState<Movie | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<string>('All'); // 'All' | 'Movie' | 'Series'
  const [isHeaderSettingsOpen, setIsHeaderSettingsOpen] = useState<boolean>(false);

  // Interactive Dashboard Layout & View Mode States
  const [activeLayoutTab, setActiveLayoutTab] = useState<'all' | 'genres' | 'trending' | 'community'>('all');

  // Dynamic images & media state resolved from our custom proxy API
  const [resolvedImages, setResolvedImages] = useState<Record<string, { posterUrl?: string; backdropUrl?: string; youtubeId?: string }>>(() => {
    try {
      const saved = localStorage.getItem('cineworld_resolved_images_v12');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save resolved images to localStorage
  useEffect(() => {
    localStorage.setItem('cineworld_resolved_images_v12', JSON.stringify(resolvedImages));
  }, [resolvedImages]);

  // Prioritize active selected movie resolution
  useEffect(() => {
    if (!selectedMovieId || (resolvedImages[selectedMovieId]?.posterUrl && resolvedImages[selectedMovieId]?.backdropUrl && resolvedImages[selectedMovieId]?.youtubeId)) return;
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

        if (active && data && (data.posterUrl || data.backdropUrl || data.youtubeId)) {
          setResolvedImages(prev => ({
            ...prev,
            [movie.id]: {
              posterUrl: data.posterUrl || prev[movie.id]?.posterUrl || movie.posterUrl,
              backdropUrl: data.backdropUrl || prev[movie.id]?.backdropUrl || movie.backdropUrl,
              youtubeId: data.youtubeId || prev[movie.id]?.youtubeId || movie.youtubeId
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

  // Highly optimized parallel/concurrent background pre-fetcher for all movies in the catalog
  useEffect(() => {
    let active = true;
    const moviesToResolve = CURATED_CATALOG.filter(m => !resolvedImages[m.id]);

    async function resolveAllInParallel() {
      const concurrencyLimit = 10;
      let currentIndex = 0;

      async function worker() {
        while (currentIndex < moviesToResolve.length && active) {
          const index = currentIndex++;
          if (index >= moviesToResolve.length) break;
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

            if (active && data && (data.posterUrl || data.backdropUrl || data.youtubeId)) {
              setResolvedImages(prev => ({
                ...prev,
                [movie.id]: {
                  posterUrl: data.posterUrl || prev[movie.id]?.posterUrl || movie.posterUrl,
                  backdropUrl: data.backdropUrl || prev[movie.id]?.backdropUrl || movie.backdropUrl,
                  youtubeId: data.youtubeId || prev[movie.id]?.youtubeId || movie.youtubeId
                }
              }));
            }
          } catch (err) {
            console.error(`Failed to background resolve for ${movie.title}:`, err);
          }

          // Polite throttle gap to prevent complete network congestion
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      const workers = [];
      for (let i = 0; i < Math.min(concurrencyLimit, moviesToResolve.length); i++) {
        workers.push(worker());
      }
      await Promise.all(workers);
    }

    if (moviesToResolve.length > 0) {
      resolveAllInParallel();
    }

    return () => { active = false; };
  }, []); // Run on mount only to prevent infinite loop

  // Dynamic display catalog mapping depending on the chosen posterSafetyMode and resolved images
  // Respect activeType filter globally (Movies vs. Series)
  const displayCatalog = useMemo(() => {
    return CURATED_CATALOG
      .filter(movie => activeType === 'All' || movie.type === activeType)
      .map(movie => {
        const resolved = resolvedImages[movie.id];
        let poster = movie.posterUrl;
        let backdrop = movie.backdropUrl;

        // Use resolved images if available and valid TMDB links or if catalog link is missing
        if (resolved?.posterUrl && (resolved.posterUrl.includes('tmdb.org') || !poster.includes('tmdb.org'))) {
          poster = getProxiedUrl(resolved.posterUrl);
        } else {
          poster = getProxiedUrl(poster);
        }

        if (resolved?.backdropUrl && (resolved.backdropUrl.includes('tmdb.org') || !backdrop.includes('tmdb.org'))) {
          backdrop = getProxiedUrl(resolved.backdropUrl);
        } else {
          backdrop = getProxiedUrl(backdrop);
        }

        return {
          ...movie,
          posterUrl: poster,
          backdropUrl: backdrop,
          youtubeId: resolved?.youtubeId || movie.youtubeId
        };
      });
  }, [resolvedImages, activeType]);

  // Automatically reset stream mode, backup index, season, and episode when the theater movie changes
  // and dynamically fetch high-definition official trailer and direct HD video stream from API
  useEffect(() => {
    if (theaterMovieId) {
      setStreamMode('trailer');
      setBackupIndex(0);
      setActiveSeason(1);
      setActiveEpisode(1);

      const targetMovie = displayCatalog.find(m => m.id === theaterMovieId) || CURATED_CATALOG.find(m => m.id === theaterMovieId);
      if (targetMovie) {
        // 1. Instant synchronous lookup for zero delay
        const instantKey = OFFICIAL_MEDIA_MAP[targetMovie.id]?.youtubeId || TRAILER_IDS[targetMovie.id] || targetMovie.youtubeId;
        if (instantKey && !instantKey.startsWith('http') && !instantKey.endsWith('.mp4')) {
          setActiveTrailerKey(instantKey);
        }

        // 2. Dynamic live API lookup to guarantee content playback across YouTube and Direct HD Stream API
        setIsTrailerLoading(true);
        fetchContentVideo(targetMovie).then((videoData) => {
          if (videoData?.youtubeId) {
            setActiveTrailerKey(videoData.youtubeId);
          }
          if (videoData?.directStreamUrl) {
            setActiveDirectStreamUrl(videoData.directStreamUrl);
          }
        }).catch((err) => {
          console.warn('Failed to resolve content video stream:', err);
        }).finally(() => {
          setIsTrailerLoading(false);
        });
      }
    }
  }, [theaterMovieId, displayCatalog]);

  // Reset and synchronize hero deck whenever displayCatalog / activeType changes
  useEffect(() => {
    if (displayCatalog.length === 0) return;
    
    // Check if the currently selected movie is still within the active catalog
    const isCurrentInDeck = displayCatalog.some(m => m.id === selectedMovieId);
    
    const allIds = displayCatalog.map(m => m.id);
    const initialShuffled = shuffleArray(allIds);
    const firstMovieId = isCurrentInDeck && selectedMovieId ? selectedMovieId : initialShuffled[0];
    const remainingDeck = initialShuffled.filter(id => id !== firstMovieId);

    setShuffledDeck(remainingDeck);
    setDeckHistory([firstMovieId]);
    setHistoryIndex(0);
    setSelectedMovieId(firstMovieId);
  }, [activeType, displayCatalog.length]);

  // Advance to next un-repeated title in the hero shuffle
  const advanceHeroShuffleNext = useCallback(() => {
    if (displayCatalog.length === 0) return;

    // If stepping forward in history
    if (historyIndex < deckHistory.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setSelectedMovieId(deckHistory[nextIdx]);
      return;
    }

    // Need a new un-repeated movie from shuffledDeck
    const currentDeck = shuffledDeck.filter(id => !deckHistory.includes(id));

    if (currentDeck.length === 0) {
      // Full catalog deck exhausted! Re-shuffle full catalog for a new cycle.
      const allIds = displayCatalog.map(m => m.id);
      const lastShownId = deckHistory[deckHistory.length - 1];
      const newShuffled = shuffleArray(allIds, lastShownId);

      const nextId = newShuffled[0];
      const remaining = newShuffled.slice(1);

      setShuffledDeck(remaining);
      setDeckHistory([nextId]);
      setHistoryIndex(0);
      setSelectedMovieId(nextId);
    } else {
      // Pick next un-repeated item from current shuffled deck
      const nextId = currentDeck[0];
      const remaining = currentDeck.slice(1);

      const newHistory = [...deckHistory, nextId];
      setShuffledDeck(remaining);
      setDeckHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setSelectedMovieId(nextId);
    }
  }, [displayCatalog, shuffledDeck, deckHistory, historyIndex]);

  // Step back to previously shown item in history
  const advanceHeroShufflePrev = useCallback(() => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setSelectedMovieId(deckHistory[prevIdx]);
    } else {
      const currentIndex = displayCatalog.findIndex(m => m.id === selectedMovieId);
      const prevIndex = (currentIndex - 1 + displayCatalog.length) % displayCatalog.length;
      setSelectedMovieId(displayCatalog[prevIndex].id);
    }
  }, [historyIndex, deckHistory, displayCatalog, selectedMovieId]);

  // Force reshuffle deck manually
  const resetAndReshuffleHeroDeck = useCallback(() => {
    if (displayCatalog.length === 0) return;
    const allIds = displayCatalog.map(m => m.id);
    const newShuffled = shuffleArray(allIds, selectedMovieId);
    const nextId = newShuffled[0];
    const remaining = newShuffled.slice(1);

    setShuffledDeck(remaining);
    setDeckHistory([nextId]);
    setHistoryIndex(0);
    setSelectedMovieId(nextId);
  }, [displayCatalog, selectedMovieId]);

  // Automated 10-second carousel timer for the Hero Showcase Section using non-repeating shuffle
  useEffect(() => {
    if (!isCarouselPlaying) return;
    
    const timer = setInterval(() => {
      advanceHeroShuffleNext();
    }, 10000);
    
    return () => clearInterval(timer);
  }, [isCarouselPlaying, advanceHeroShuffleNext]);

  // Preload currently selected movie's high-res poster and backdrop images for instant visual presentation
  useEffect(() => {
    if (!selectedMovieId) return;
    const movie = displayCatalog.find(m => m.id === selectedMovieId);
    if (!movie) return;

    // Preload backdrop image
    if (movie.backdropUrl) {
      const imgBackdrop = new Image();
      imgBackdrop.src = movie.backdropUrl;
    }
    // Preload poster image
    if (movie.posterUrl) {
      const imgPoster = new Image();
      imgPoster.src = movie.posterUrl;
    }
  }, [selectedMovieId, displayCatalog]);
  
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
  const [isUserDatabaseOpen, setIsUserDatabaseOpen] = useState<boolean>(false);
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

  // Calculate "More Like This" recommended movies based on shared genres and ratings
  const moreLikeThisMovies = displayCatalog
    .filter(m => m.id !== currentMovie.id)
    .map(m => {
      const sharedGenresCount = m.genres.filter(g => currentMovie.genres.includes(g)).length;
      return { movie: m, sharedGenresCount };
    })
    .sort((a, b) => b.sharedGenresCount - a.sharedGenresCount || b.movie.rating - a.movie.rating)
    .map(item => item.movie)
    .slice(0, 6);

  // Record a click on a movie to train recommendation engine
  const handleMovieSelect = (movieId: string) => {
    setSelectedMovieId(movieId);
    setTheaterMovieId(movieId); // Automatically start playing trailer in theater modal
    
    // Sync with hero shuffle deck so manually chosen movie isn't repeated in the shuffle cycle
    setDeckHistory(prevHistory => {
      if (prevHistory.includes(movieId)) {
        const idx = prevHistory.indexOf(movieId);
        setHistoryIndex(idx);
        return prevHistory;
      } else {
        const newHistory = [...prevHistory, movieId];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      }
    });

    setShuffledDeck(prevDeck => prevDeck.filter(id => id !== movieId));

    // Find movie to increment genre clicks
    const movie = displayCatalog.find(m => m.id === movieId);
    if (movie) {
      setUserState(prev => {
        const nextClicks = { ...prev.clicks, [movieId]: (prev.clicks[movieId] || 0) + 1 };
        const nextGenreClicks = { ...prev.genreClicks };
        const now = Date.now();
        const cutoff = now - 48 * 60 * 60 * 1000;
        
        // Clean history older than 48 hours and add new interaction events
        const nextHistory = (prev.genreClickHistory || []).filter(h => h.timestamp >= cutoff);
        
        movie.genres.forEach(g => {
          nextGenreClicks[g] = (nextGenreClicks[g] || 0) + 1;
          nextHistory.push({ genre: g, timestamp: now });
        });
        
        return {
          ...prev,
          clicks: nextClicks,
          genreClicks: nextGenreClicks,
          genreClickHistory: nextHistory
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
        const now = Date.now();
        const cutoff = now - 48 * 60 * 60 * 1000;
        
        // Clean history older than 48 hours and add new interaction event
        const nextHistory = (prev.genreClickHistory || []).filter(h => h.timestamp >= cutoff);
        nextHistory.push({ genre, timestamp: now });
        
        return { 
          ...prev, 
          genreClicks: nextGenreClicks,
          genreClickHistory: nextHistory
        };
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

  const navigateToSection = (sectionId: string, requiredLayoutTab?: string) => {
    if (requiredLayoutTab && activeLayoutTab !== 'all' && activeLayoutTab !== requiredLayoutTab) {
      setActiveLayoutTab('all');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
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
    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      if (exploreByTalent) {
        matchesSearch = movie.directorOrCreator.toLowerCase().includes(query) ||
                        movie.cast.some(actor => actor.toLowerCase().includes(query));
      } else {
        matchesSearch = movie.title.toLowerCase().includes(query) ||
                        movie.directorOrCreator.toLowerCase().includes(query) ||
                        movie.cast.some(actor => actor.toLowerCase().includes(query));
      }
    }
    
    const matchesGenre = activeGenre === 'All' || movie.genres.includes(activeGenre);
    
    const matchesPlatform = activePlatform === 'All' || 
                            movie.streamingLinks.some(link => link.platform === activePlatform);
    
    const matchesType = activeType === 'All' || movie.type === activeType;
    
    return matchesSearch && matchesGenre && matchesPlatform && matchesType;
  });

  // Collect all unique genres
  const allGenres: string[] = ['All', ...Array.from(new Set<string>(displayCatalog.flatMap(m => m.genres)))];

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
      
      {/* FLOATING LUXURY ELEVATOR NAVIGATOR & SCROLL PROGRESS */}
      <LuxuryScrollProgressAndElevator 
        totalMovies={filteredCatalog.length} 
        onRandomPick={(movie) => handleMovieSelect(movie.id)} 
        catalog={CURATED_CATALOG} 
      />
      
      {/* Immersive Atmospheric Ambient Glows */}
      <div className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#1A3A5F] blur-[150px] opacity-35 animate-pulse-glow-1 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[700px] h-[700px] rounded-full bg-[#4A1D2C] blur-[180px] opacity-25 animate-pulse-glow-2 pointer-events-none z-0"></div>
      <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0"></div>

      {/* Luxury Decorative Top Banner / Status Indicator */}
      <div className="relative z-30 bg-[#07070d]/80 border-b border-white/10 backdrop-blur-md text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 px-4 md:px-8 py-2.5 flex flex-col sm:flex-row gap-2 justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse"></span>
            LIVE STREAM SERVER ONLINE
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/40 font-mono">100% Free • Unlimited HD Movies & Series</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <CineWorldLogo showText={false} size="sm" onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setSearchQuery(''); }} />
          
          {/* User Profile Avatar badge & Email */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:border-[#00D1FF]/40 transition-all cursor-pointer">
            <span className="text-xs sm:text-sm">
              {userState.selectedAvatar === 'director' ? '🎬' :
               userState.selectedAvatar === 'critic' ? '🧐' :
               userState.selectedAvatar === 'scifi' ? '🚀' :
               userState.selectedAvatar === 'horror' ? '👻' :
               userState.selectedAvatar === 'romance' ? '💖' :
               userState.selectedAvatar === 'action' ? '💥' : '👤'}
            </span>
            <span className="text-white/90 font-bold text-xs capitalize hidden sm:inline truncate max-w-[100px]">
              {userState.userName || 'Cinephile'}
            </span>
            <span className="text-[#00D1FF] font-mono text-[9px] hidden md:inline">
              [PRO MEMBER]
            </span>
          </div>

          {/* Logout Action */}
          <button 
            onClick={() => setUserState(prev => ({ ...prev, isLoggedIn: false }))}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shrink-0"
            title="Exit Screening Session"
          >
            <span>Exit Theater</span>
          </button>
        </div>
      </div>

      {/* Top Header Navigation bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06060c]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
            <CineWorldLogo 
              size="md" 
              onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setSearchQuery(''); setActiveType('All'); }} 
            />
            
            {/* Quick-Filter Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full">
              <button 
                onClick={() => { 
                  setActiveType('All'); 
                  setActiveGenre('All'); 
                  setActivePlatform('All'); 
                }} 
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeType === 'All' && activePlatform === 'All' ? 'bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.4)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                All Content
              </button>
              <button 
                onClick={() => { 
                  setActiveType('Movie'); 
                  setActiveGenre('All'); 
                  setActivePlatform('All'); 
                }} 
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeType === 'Movie' ? 'bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.4)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                Movies
              </button>
              <button 
                onClick={() => { 
                  setActiveType('Series'); 
                  setActiveGenre('All'); 
                  setActivePlatform('All'); 
                }} 
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeType === 'Series' ? 'bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.4)]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                Series
              </button>
            </nav>
          </div>

          {/* Premium High-Visibility Header Search bar */}
          <div className="flex-grow max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-1 sm:mx-3 relative group z-30">
            <div className="relative flex items-center">
              <input
                ref={headerSearchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsHeaderSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsHeaderSearchFocused(false), 250)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={exploreByTalent ? t('talentSearchPlaceholder') : "Search movies, series, actors, directors, genres..."}
                className="w-full bg-[#0b101e] border-2 border-[#00D1FF]/50 hover:border-[#00D1FF] focus:border-[#00D1FF] focus:bg-[#060a14] rounded-full px-4 py-2.5 sm:py-3 pl-11 pr-32 text-xs sm:text-sm font-medium text-white placeholder-white/60 outline-none transition-all duration-300 shadow-[0_0_18px_rgba(0,209,255,0.22)] focus:shadow-[0_0_28px_rgba(0,209,255,0.45)] focus:ring-2 focus:ring-[#00D1FF]/40"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#00D1FF] drop-shadow-[0_0_6px_rgba(0,209,255,0.7)] group-focus-within:scale-110 transition-transform" />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isSearchLoading && (
                  <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-[#00D1FF] animate-spin" title="Searching TMDB & Local Database..." />
                )}
                {searchQuery && !isSearchLoading && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Voice Search Button */}
                <button
                  type="button"
                  onClick={handleVoiceListen}
                  className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.7)]' 
                      : 'text-[#00D1FF] hover:bg-[#00D1FF]/15 hover:text-white'
                  }`}
                  title="Voice Search"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>

                {/* Talent Search Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setExploreByTalent(!exploreByTalent)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    exploreByTalent 
                      ? 'bg-gradient-to-r from-[#00D1FF] to-indigo-500 text-black shadow-[0_0_12px_rgba(0,209,255,0.5)]' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  title={t('exploreByTalent')}
                >
                  <span className="hidden xs:inline">{exploreByTalent ? 'Talent' : 'Talent'}</span>
                  <span className="xs:hidden">★</span>
                </button>

                {/* Keyboard Shortcut Badge */}
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/50 border border-white/10" title="Press / or Ctrl+K to search">
                  /
                </span>
              </div>
            </div>

            {/* Instant Floating Results & Trending Suggestions Dropdown */}
            {(searchQuery || isHeaderSearchFocused) && (
              <div className="absolute top-12 sm:top-14 left-0 w-full min-w-[280px] bg-[#090d19]/98 border-2 border-[#00D1FF]/40 rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl z-50 max-h-80 overflow-y-auto space-y-1">
                {searchQuery ? (
                  <>
                    <div className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-widest px-2 pb-2 border-b border-white/10 flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Search className="w-3 h-3" />
                        Live Results ({filteredCatalog.length})
                      </span>
                      <span className="text-[9px] text-white/50 font-mono">Real-time filter active</span>
                    </div>
                    {filteredCatalog.length === 0 ? (
                      <div className="text-center py-6 space-y-2">
                        <p className="text-xs text-white/60">No titles match <span className="text-[#00D1FF] font-bold">"{searchQuery}"</span></p>
                        <p className="text-[10px] text-white/40 font-mono">Try searching for an actor, genre (e.g. Sci-Fi, Horror, Comedy), or platform</p>
                      </div>
                    ) : (
                      filteredCatalog.slice(0, 8).map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => {
                            handleMovieSelect(movie.id);
                            setSearchQuery('');
                            navigateToSection('hero-showcase');
                          }}
                          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#00D1FF]/15 text-white transition-all group cursor-pointer border border-transparent hover:border-[#00D1FF]/30"
                        >
                          <BlurUpImage 
                            src={movie.posterUrl} 
                            alt={movie.title} 
                            referrerPolicy="no-referrer" 
                            className="w-9 h-12 object-cover rounded-md border border-white/15 shrink-0 shadow" 
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white group-hover:text-[#00D1FF] truncate transition-colors flex items-center gap-1.5">
                              <span>{movie.title}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/10 text-white/80 rounded uppercase font-normal">{movie.type}</span>
                            </p>
                            {exploreByTalent ? (
                              <p className="text-[10px] text-[#00D1FF]/90 font-mono truncate">
                                Dir: {movie.directorOrCreator} • Cast: {movie.cast.slice(0, 3).join(', ')}
                              </p>
                            ) : (
                              <p className="text-[10px] text-white/50 font-mono truncate">
                                {movie.year} • {movie.genres.slice(0, 2).join(', ')} • {movie.directorOrCreator}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end shrink-0 gap-1">
                            <span className="text-[9px] font-mono font-bold bg-[#00D1FF]/20 border border-[#00D1FF]/40 px-2 py-0.5 rounded text-[#00D1FF] group-hover:bg-[#00D1FF] group-hover:text-black transition-colors">
                              WATCH
                            </span>
                            <span className="text-[9px] text-yellow-400 font-mono font-bold">★ {movie.rating}</span>
                          </div>
                        </button>
                      ))
                    )}
                  </>
                ) : (
                  <div className="p-2 space-y-3">
                    <div className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-widest flex items-center gap-1.5 border-b border-white/10 pb-2">
                      <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      Popular & Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Stree 2', 'Kalki 2898 AD', 'Pushpa 2', 'Mirzapur', 'Panchayat', 'Interstellar', 'Aavesham', 'Dark', 'Sci-Fi', 'Horror'].map((tag) => (
                        <button
                          key={tag}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(tag);
                          }}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-[#00D1FF]/20 hover:text-[#00D1FF] text-white/80 border border-white/10 hover:border-[#00D1FF]/40 transition-all cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings & Watchlist (Hidden on Mobile/Tablet) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Unified Settings Option */}
            <div className="relative">
              <button
                onClick={() => setIsHeaderSettingsOpen(!isHeaderSettingsOpen)}
                className={`flex items-center gap-2 bg-white/5 border rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${isHeaderSettingsOpen ? 'border-[#00D1FF] text-[#00D1FF] bg-[#00D1FF]/10 shadow-[0_0_15px_rgba(0,209,255,0.25)]' : 'border-white/10 text-white/80 hover:bg-white/10 hover:text-white'}`}
                title="Settings"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
              
              <AnimatePresence>
                {isHeaderSettingsOpen && (
                  <>
                    {/* Backdrop to close settings */}
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setIsHeaderSettingsOpen(false)}
                    />
                    
                    {/* Settings Dropdown Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-72 bg-[#0b0b12]/95 border border-white/15 rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.9)] backdrop-blur-md z-50 space-y-4 text-left"
                    >
                      <div className="text-[10px] font-bold text-[#00D1FF]/70 uppercase tracking-widest pb-2 border-b border-white/5 flex justify-between items-center">
                        <span>Application Settings</span>
                        <Settings className="w-3.5 h-3.5 text-white/30" />
                      </div>

                      {/* Region Select */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-[#00D1FF]" /> {t('regionLabel')}
                        </label>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 flex items-center">
                          <select 
                            value={userState.region} 
                            onChange={(e) => setUserState(prev => ({ ...prev, region: e.target.value }))}
                            className="bg-transparent border-none outline-none text-white font-mono cursor-pointer text-xs w-full"
                          >
                            <option value="IN" className="bg-[#0b0b12]">IN (Hotstar-Region)</option>
                            <option value="US" className="bg-[#0b0b12]">US (Global-West)</option>
                            <option value="UK" className="bg-[#0b0b12]">UK (Europe-HQ)</option>
                            <option value="JP" className="bg-[#0b0b12]">JP (Asia-East)</option>
                          </select>
                        </div>
                      </div>

                      {/* Language Select */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                          <Sliders className="w-3 h-3 text-red-500" /> {t('languageLabel')}
                        </label>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 flex items-center">
                          <select 
                            value={userState.preferredLanguage} 
                            onChange={(e) => setUserState(prev => ({ ...prev, preferredLanguage: e.target.value }))}
                            className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs w-full"
                          >
                            <option value="en" className="bg-[#0b0b12]">English</option>
                            <option value="hi" className="bg-[#0b0b12]">हिन्दी (Hindi)</option>
                            <option value="ar" className="bg-[#0b0b12]">العربية (Arabic)</option>
                            <option value="ja" className="bg-[#0b0b12]">日本語 (Japanese)</option>
                            <option value="es" className="bg-[#0b0b12]">Español (Spanish)</option>
                          </select>
                        </div>
                      </div>

                      {/* Poster Safety Mode */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#00D1FF]" /> Poster Mode
                        </label>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 flex items-center">
                          <select 
                            value={userState.posterSafetyMode || 'original'} 
                            onChange={(e) => setUserState(prev => ({ ...prev, posterSafetyMode: e.target.value as 'safe' | 'original' }))}
                            className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs w-full"
                          >
                            <option value="original" className="bg-[#0b0b12]">Original Art</option>
                            <option value="safe" className="bg-[#0b0b12]">Safe Art</option>
                          </select>
                        </div>
                      </div>

                      {/* Auto-play Trailers Toggle */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                            <Tv className="w-3 h-3 text-[#00D1FF]" /> Auto-play Trailers
                          </label>
                          <span className="text-[8px] font-mono text-[#00D1FF] bg-[#00D1FF]/10 px-1 py-0.5 rounded">
                            Hero Section
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between">
                          <span className="text-xs text-white/70">Enable Trailer Previews</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = !userState.autoplayTrailers;
                              setUserState(prev => ({ ...prev, autoplayTrailers: newValue }));
                              pushSystemChatMessage(newValue ? "Auto-play trailers enabled for Hero Showcase." : "Auto-play trailers disabled.");
                            }}
                            className={`w-9 h-5 rounded-full transition-colors relative flex items-center focus:outline-none ${userState.autoplayTrailers ? 'bg-[#00D1FF]' : 'bg-white/10'}`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute ${userState.autoplayTrailers ? 'right-0.5' : 'left-0.5'}`} />
                          </button>
                        </div>

                        {/* Authority Center Access */}
                        <div className="pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsUserDatabaseOpen(true);
                              setIsHeaderSettingsOpen(false);
                            }}
                            className="w-full py-2 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 border border-[#00D1FF]/30 hover:border-[#00D1FF]/50 text-[#00D1FF] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Users className="w-4 h-4" />
                            <span>View User Database</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Watchlist Counter Badge */}
            <button 
              onClick={() => {
                navigateToSection("watchlist-section", "community");
              }}
              className="relative bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title="View Watchlist"
            >
              <Bookmark className="w-4 h-4 text-white/70" />
              {userState.watchlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-black animate-bounce">
                  {userState.watchlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Watchlist trigger */}
            <button 
              onClick={() => {
                navigateToSection("watchlist-section", "community");
              }}
              className="relative bg-white/5 text-white/70 hover:text-white border border-white/10 rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              title="View Watchlist"
            >
              <Bookmark className="w-4.5 h-4.5" />
              {userState.watchlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black">
                  {userState.watchlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburg Trigger (With 48px Touch Target) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/5 border border-white/10 text-white rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5 text-[#00D1FF]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-[#050508]/98 border-l border-white/10 shadow-2xl z-[101] flex flex-col p-6 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                  <span className="text-xs font-black uppercase tracking-widest text-white">CineWorld Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-white/5 rounded-full border border-white/10 text-white/70 hover:text-white min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95 transition-all"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Navigation Filters */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Quick Navigation</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { setActiveGenre('All'); setActivePlatform('All'); setActiveType('All'); setIsMobileMenuOpen(false); }} 
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between min-h-[48px] ${activeType === 'All' && activeGenre === 'All' && activePlatform === 'All' ? 'bg-[#00D1FF]/20 text-white border border-[#00D1FF]/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      <span>All Shows</span>
                      <Play className="w-3.5 h-3.5 opacity-50" />
                    </button>
                    <button 
                      onClick={() => { setActiveType('Movie'); setActiveGenre('All'); setActivePlatform('All'); setIsMobileMenuOpen(false); }} 
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between min-h-[48px] ${activeType === 'Movie' ? 'bg-[#00D1FF]/20 text-white border border-[#00D1FF]/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      <span>Movies</span>
                      <Play className="w-3.5 h-3.5 opacity-50" />
                    </button>
                    <button 
                      onClick={() => { setActiveType('Series'); setActiveGenre('All'); setActivePlatform('All'); setIsMobileMenuOpen(false); }} 
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between min-h-[48px] ${activeType === 'Series' ? 'bg-[#00D1FF]/20 text-white border border-[#00D1FF]/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      <span>Series</span>
                      <Play className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  </div>
                </div>

                {/* Configurations */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Preferences</h4>
                  
                  {/* Region Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-[#00D1FF]" /> {t('regionLabel')}
                    </label>
                    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-h-[48px] flex items-center">
                      <select 
                        value={userState.region} 
                        onChange={(e) => setUserState(prev => ({ ...prev, region: e.target.value }))}
                        className="bg-transparent border-none outline-none text-white font-mono cursor-pointer text-xs w-full"
                        aria-label={t('regionLabel')}
                      >
                        <option value="IN" className="bg-[#0b0b12]">IN (Hotstar-Region)</option>
                        <option value="US" className="bg-[#0b0b12]">US (Global-West)</option>
                        <option value="UK" className="bg-[#0b0b12]">UK (Europe-HQ)</option>
                        <option value="JP" className="bg-[#0b0b12]">JP (Asia-East)</option>
                      </select>
                    </div>
                  </div>

                  {/* Language Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-red-500" /> {t('languageLabel')}
                    </label>
                    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-h-[48px] flex items-center">
                      <select 
                        value={userState.preferredLanguage} 
                        onChange={(e) => setUserState(prev => ({ ...prev, preferredLanguage: e.target.value }))}
                        className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs w-full"
                        aria-label={t('languageLabel')}
                      >
                        <option value="en" className="bg-[#0b0b12]">English</option>
                        <option value="hi" className="bg-[#0b0b12]">हिन्दी (Hindi)</option>
                        <option value="ar" className="bg-[#0b0b12]">العربية (Arabic)</option>
                        <option value="ja" className="bg-[#0b0b12]">日本語 (Japanese)</option>
                        <option value="es" className="bg-[#0b0b12]">Español (Spanish)</option>
                      </select>
                    </div>
                  </div>

                  {/* Safety Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#00D1FF]" /> Poster Mode
                    </label>
                    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-h-[48px] flex items-center">
                      <select 
                        value={userState.posterSafetyMode || 'original'} 
                        onChange={(e) => setUserState(prev => ({ ...prev, posterSafetyMode: e.target.value as 'safe' | 'original' }))}
                        className="bg-transparent border-none outline-none text-white cursor-pointer font-sans text-xs w-full"
                        aria-label="Poster Safety Mode"
                      >
                        <option value="original" className="bg-[#0b0b12]">Original Art</option>
                        <option value="safe" className="bg-[#0b0b12]">Safe Art</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Mobile Admin Center */}
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      setIsUserDatabaseOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 border border-[#00D1FF]/30 text-[#00D1FF] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all min-h-[48px] cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>View User Database</span>
                  </button>
                </div>

                {/* Profile Display */}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl min-h-[48px]">
                    <span className="text-lg">
                      {userState.selectedAvatar === 'director' ? '🎬' :
                       userState.selectedAvatar === 'critic' ? '🧐' :
                       userState.selectedAvatar === 'scifi' ? '🚀' :
                       userState.selectedAvatar === 'horror' ? '👻' :
                       userState.selectedAvatar === 'romance' ? '💖' :
                       userState.selectedAvatar === 'action' ? '💥' : '👤'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-bold truncate capitalize">{userState.userName || 'Cinephile'}</p>
                      <p className="text-[10px] text-white/40 font-mono truncate">{userState.email || 'zainab.azis2006@gmail.com'}</p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button 
                    onClick={() => {
                      setUserState(prev => ({ ...prev, isLoggedIn: false }));
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#d03050]/10 hover:bg-[#d03050]/25 border border-[#d03050]/25 text-[#ff4c6c] hover:text-[#ff6a85] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all min-h-[48px]"
                  >
                    <span>Exit Theater</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Interactive Voice Helper Bar (Hidden if speech error, shows voice listening overlay) */}
      {speechError && (
        <div className="bg-red-950/80 border-b border-red-500/20 text-red-300 text-xs py-2 px-6 text-center relative z-40 animate-pulse">
          {speechError}
        </div>
      )}

      {/* HERO SHOWCASE - Atmospheric Display of Currently Active Movie in Automated Carousel */}
      <section className="relative w-full overflow-hidden border-b border-white/5 z-10" id="hero-showcase">
        {/* Dynamic High-Fidelity Content Poster Backdrop behind Content Name */}
        <div className="absolute inset-0 z-0 bg-[#050508] overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`backdrop-${currentMovie.id}`}
              initial={{ opacity: 0, scale: 1.15, x: 10, y: -6 }}
              animate={{ 
                opacity: 0.7, 
                scale: [1.12, 1.03],
                x: [8, -8],
                y: [-4, 4]
              }}
              exit={{ opacity: 0, scale: 1.0, transition: { duration: 0.8, ease: "easeOut" } }}
              transition={{ 
                opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" },
                x: { duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                y: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
              }}
              className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] origin-center"
            >
              <BlurUpImage 
                src={currentMovie.backdropUrl || currentMovie.posterUrl} 
                alt={currentMovie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[1.18] contrast-[1.10]"
              />
            </motion.div>
          </AnimatePresence>
          {/* Multi-layered cinematic gradient vignettes to make content title & details pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/65 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-transparent to-[#050508]"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-6 pt-16 pb-28 relative z-10"
          >
            
            {/* Main Hero Metadata Info Box */}
            <div className="max-w-3xl space-y-6 text-left">
              
              {/* Metadata Tags */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#00D1FF] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(0,209,255,0.4)]">
                  {currentMovie.type}
                </span>
                <span className="px-2.5 py-1 bg-white/10 text-white text-[10px] font-mono font-bold rounded-full border border-white/10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  IMDb {currentMovie.rating}
                </span>
                <span className="px-2.5 py-1 bg-white/5 text-white/70 text-[10px] font-mono rounded-full border border-white/10">
                  {currentMovie.year}
                </span>
                <span className="px-2.5 py-1 bg-white/5 text-white/70 text-[10px] font-mono rounded-full border border-white/10">
                  {currentMovie.runtimeOrSeasons}
                </span>
                <span className="px-2.5 py-1 bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] text-[10px] font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></span>
                  Ultra HD Presentation
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  100% Free Stream
                </span>
              </div>

              {/* Title display */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.88] tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                {currentMovie.title.split(': ')[0]} <br />
                {currentMovie.title.split(': ')[1] && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] via-white to-white/60 font-black">
                    {currentMovie.title.split(': ')[1]}
                  </span>
                )}
              </h1>

              {/* Synopsis */}
              <motion.p 
                key={currentMovie.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed font-sans backdrop-blur-sm bg-black/20 p-3 rounded-xl border border-white/5"
              >
                {currentMovie.synopsis}
              </motion.p>

              {/* Genre chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentMovie.genres.map((g, i) => (
                  <span 
                    key={i} 
                    onClick={() => handleGenreSelect(g)}
                    className="text-[10px] bg-white/5 hover:bg-[#00D1FF]/20 border border-white/10 hover:border-[#00D1FF]/40 text-white/80 hover:text-[#00D1FF] cursor-pointer font-bold uppercase px-3 py-1 rounded-full transition-all duration-200"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Interactive Rating Metric System */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 max-w-xl backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-bold">{t('personalizedMatrix')}</span>
                  <span className="text-[11px] font-mono text-[#00D1FF] font-bold">
                    {userState.ratings[currentMovie.id] ? `Your Star Grade: ${userState.ratings[currentMovie.id]}/5` : 'Rate title'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
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
                              ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]' 
                              : 'text-white/20 group-hover:text-yellow-400/50'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Streaming Integration Hub */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-3.5">
                  
                  {/* Play Now Button */}
                  <button
                    onClick={() => {
                      setStreamMode('trailer');
                      setBackupIndex(0);
                      setTheaterMovieId(currentMovie.id);
                    }}
                    className="px-6 py-3.5 rounded-full font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center gap-2.5 bg-[#00D1FF] text-black hover:bg-white hover:scale-105 shadow-[0_0_25px_rgba(0,209,255,0.5)] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current animate-pulse" />
                    <span>Watch Trailer</span>
                  </button>

                  {/* Cast & Crew Info Button */}
                  <button
                    type="button"
                    onClick={() => setInfoMovie(currentMovie)}
                    className="px-5 py-3.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-[#00D1FF] hover:text-[#00D1FF] transition-all duration-300 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 cursor-pointer backdrop-blur-md"
                  >
                    <Info className="w-4 h-4 text-[#00D1FF]" />
                    Cast & Crew Info
                  </button>

                  <a 
                    href="#critic-hub"
                    className="px-5 py-3.5 border border-white/10 bg-black/40 text-white/80 hover:text-white hover:border-white/30 transition-all duration-300 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-white/50" />
                    Critics & Reviews
                  </a>
                </div>
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

          {/* Quick Toggle Auto-play Trailers */}
          <button
            onClick={() => {
              const newValue = !userState.autoplayTrailers;
              setUserState(prev => ({ ...prev, autoplayTrailers: newValue }));
              pushSystemChatMessage(newValue ? "Auto-play trailers enabled for Hero Showcase." : "Auto-play trailers disabled.");
            }}
            className={`transition-all duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-wider ${
              userState.autoplayTrailers 
                ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20 shadow-[0_0_10px_rgba(0,209,255,0.15)]' 
                : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/70 hover:bg-white/10'
            }`}
            title={userState.autoplayTrailers ? "Turn Off Auto-play Trailers" : "Turn On Auto-play Trailers"}
          >
            <Tv className="w-3 h-3" />
            <span>Trailers: {userState.autoplayTrailers ? "ON" : "OFF"}</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10"></div>

          {/* Previous Button */}
          <button
            onClick={advanceHeroShufflePrev}
            className="text-white/50 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
            title="Previous Shuffled Title"
          >
            PREV
          </button>

          {/* Shuffled Slide Indicator */}
          <div 
            className="flex items-center gap-1.5 font-mono text-xs text-white/50 bg-black/50 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md"
            title="Non-repeating shuffle cycle progress"
          >
            <Shuffle className="w-3 h-3 text-[#00D1FF]" />
            <span className="text-[#00D1FF] font-black">
              {String(historyIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{String(displayCatalog.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={resetAndReshuffleHeroDeck}
            className="text-white/40 hover:text-[#00D1FF] transition-colors p-1"
            title="Reshuffle Full Catalog Deck"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Next Button */}
          <button
            onClick={advanceHeroShuffleNext}
            className="text-white/50 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
            title="Next Shuffled Title"
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

      {/* MORE LIKE THIS SECTION */}
      {moreLikeThisMovies.length > 0 && (
        <section className="relative z-20 max-w-7xl mx-auto px-6 pt-10 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                <h2 className="text-xs font-black uppercase tracking-widest text-[#00D1FF]">
                  More Like This
                </h2>
              </div>
              <p className="text-[10px] text-white/40 font-mono">
                Recommended titles matching {currentMovie.title.split(': ')[0]} genres & vibe
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {moreLikeThisMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => {
                  handleMovieSelect(movie.id);
                }}
                className="group/card cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg group-hover/card:border-[#00D1FF] group-hover/card:shadow-[0_0_20px_rgba(0,209,255,0.2)] transition-all duration-300">
                  {/* Poster Image */}
                  <BlurUpImage 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  
                  {/* Hover play button overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#00D1FF] fill-[#00D1FF]" />
                  </div>

                  {/* Rating Indicator badge */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-white/10 rounded text-[9px] font-mono text-white/80">
                    ★ {movie.rating}
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 border border-white/10 rounded text-[8px] font-black uppercase tracking-widest text-[#00D1FF]">
                    {movie.type}
                  </div>
                </div>

                {/* Movie Title & Info */}
                <h4 className="text-xs font-black uppercase text-white truncate mt-3 tracking-tight group-hover/card:text-[#00D1FF] transition-colors">
                  {movie.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[9px] text-white/40 font-mono mt-0.5">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.runtimeOrSeasons}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* SPOTLIGHT UNIVERSAL SEARCH BAR & DISCOVERY HUB */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="bg-gradient-to-r from-[#0d1527]/90 via-[#070b14]/95 to-[#160e29]/90 border-2 border-[#00D1FF]/40 hover:border-[#00D1FF]/70 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(0,209,255,0.18)] backdrop-blur-2xl transition-all duration-300">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00D1FF]/15 border border-[#00D1FF]/40 text-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.3)]">
                  <Search className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  Universal Cinema Search
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 uppercase tracking-widest">
                  Live Index
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans">
                Search through 80+ blockbusters, web series, directors, and actors with real-time instant filtering.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setExploreByTalent(!exploreByTalent)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
                  exploreByTalent 
                    ? 'bg-gradient-to-r from-[#00D1FF] to-indigo-500 text-black border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.4)]' 
                    : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                }`}
                title="Search specifically for Directors, Creators, and Cast members"
              >
                <User className="w-4 h-4" />
                <span>{exploreByTalent ? 'Talent Mode: Active' : 'Filter by Talent'}</span>
              </button>

              <button
                type="button"
                onClick={handleVoiceListen}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border-red-500 animate-pulse' 
                    : 'bg-[#00D1FF]/15 text-[#00D1FF] border-[#00D1FF]/40 hover:bg-[#00D1FF]/25 hover:text-white'
                }`}
                title="Voice Search: Click and speak any movie title or actor"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
              </button>
            </div>
          </div>

          {/* Large High-Contrast Search Input Bar */}
          <div className="relative group/search">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={exploreByTalent ? "Type director (e.g. Rajamouli, Christopher Nolan) or actor (e.g. Shah Rukh Khan, Prabhas)..." : "Type movie title, series name, director, cast, or genre (e.g. Stree 2, Pushpa 2, Mirzapur, Sci-Fi)..."}
                className="w-full bg-[#050811]/95 border-2 border-[#00D1FF]/60 hover:border-[#00D1FF] focus:border-[#00D1FF] focus:bg-black rounded-2xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-24 sm:pr-28 text-sm sm:text-base md:text-lg font-medium text-white placeholder-white/50 outline-none transition-all duration-300 shadow-[0_0_25px_rgba(0,209,255,0.2)] focus:shadow-[0_0_35px_rgba(0,209,255,0.45)] focus:ring-4 focus:ring-[#00D1FF]/20"
              />
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[#00D1FF] drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]" />

              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isSearchLoading && (
                  <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#00D1FF] animate-spin" title="Searching catalog..." />
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
                    title="Clear query"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Voice transcript notification */}
          {voiceTranscript && (
            <div className="mt-3 bg-[#00D1FF]/15 border border-[#00D1FF]/40 rounded-xl px-4 py-2 text-xs text-white font-mono flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-[#00D1FF]" />
                Voice Recognized: <strong className="text-[#00D1FF]">"{voiceTranscript}"</strong>
              </span>
              <button 
                onClick={() => setVoiceTranscript('')}
                className="text-white/50 hover:text-white text-[10px] uppercase font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Instant Quick-Search Tags */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold flex items-center gap-1 mr-1">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
              Quick Searches:
            </span>
            {[
              { label: '🔥 Stree 2', val: 'Stree 2' },
              { label: '🎬 Kalki 2898 AD', val: 'Kalki 2898 AD' },
              { label: '⚡ Pushpa 2', val: 'Pushpa 2' },
              { label: '👑 Mirzapur 3', val: 'Mirzapur' },
              { label: '✨ Panchayat', val: 'Panchayat' },
              { label: '🌌 Interstellar', val: 'Interstellar' },
              { label: '💥 Aavesham', val: 'Aavesham' },
              { label: '❤️ Safed Sagar', val: 'Safed Sagar' },
              { label: '🚀 Sci-Fi', val: 'Sci-Fi' },
              { label: '👻 Horror', val: 'Horror' },
              { label: '🍿 Free Stream', val: 'Free' }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => {
                  setSearchQuery(item.val);
                  navigateToSection('interactive-genre-vault');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  searchQuery.toLowerCase() === item.val.toLowerCase()
                    ? 'bg-[#00D1FF] text-black font-black shadow-[0_0_12px_rgba(0,209,255,0.4)]'
                    : 'bg-white/5 text-white/80 hover:bg-[#00D1FF]/20 hover:text-[#00D1FF] border border-white/10 hover:border-[#00D1FF]/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Real-time search status info */}
          {searchQuery && (
            <div className="mt-4 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-white/90 font-mono">
                Found <strong className="text-[#00D1FF] text-sm">{filteredCatalog.length}</strong> matching title{filteredCatalog.length === 1 ? '' : 's'} for <strong className="text-[#00D1FF]">"{searchQuery}"</strong>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#00D1FF] hover:text-white font-bold uppercase underline underline-offset-4 cursor-pointer"
              >
                Reset Search (Show All {displayCatalog.length} Titles)
              </button>
            </div>
          )}

        </div>
      </section>

      {/* INTERACTIVE NAVIGATION LAYOUT SWITCHER BAR */}
      <section className="sticky top-20 z-30 bg-[#06060c]/90 backdrop-blur-xl border-y border-white/10 py-3.5 px-4 sm:px-8 shadow-2xl my-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 mr-1 hidden lg:inline">Layout View:</span>
            <button
              onClick={() => { setActiveLayoutTab('all'); navigateToSection('interactive-genre-vault', 'all'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeLayoutTab === 'all' 
                  ? 'bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)] font-black' 
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🌟 All Content Hub</span>
            </button>
            <button
              onClick={() => { setActiveLayoutTab('genres'); navigateToSection('interactive-genre-vault', 'genres'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeLayoutTab === 'genres' 
                  ? 'bg-gradient-to-r from-[#00D1FF] to-cyan-400 text-black shadow-[0_0_15px_rgba(0,209,255,0.5)] font-black' 
                  : 'bg-white/5 text-[#00D1FF] hover:bg-white/10 border border-[#00D1FF]/30'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>🏛️ Cinematic Genre Pavilions</span>
            </button>
            <button
              onClick={() => { setActiveLayoutTab('trending'); navigateToSection('trending-section', 'trending'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeLayoutTab === 'trending' 
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] font-black' 
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>⚡ Trends & Premieres</span>
            </button>
            <button
              onClick={() => { setActiveLayoutTab('community'); navigateToSection('community-section', 'community'); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeLayoutTab === 'community' 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] font-black' 
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>💬 Reviews & Watchlist</span>
            </button>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {displayCatalog.length} Titles Fitted By Genre
            </span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE GENRE PAVILIONS VAULT (Fitted by Respective Genres) */}
      {(activeLayoutTab === 'all' || activeLayoutTab === 'genres') && (
        <section id="interactive-genre-vault" className="relative z-20 max-w-7xl mx-auto px-6 py-4 scroll-mt-28">
          <InteractiveGenreVault
            catalog={displayCatalog}
            userState={userState}
            selectedMovieId={selectedMovieId}
            handleMovieSelect={handleMovieSelect}
            toggleWatchlist={toggleWatchlist}
            onShowInfo={setInfoMovie}
            setTheaterMovieId={setTheaterMovieId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            exploreByTalent={exploreByTalent}
            setExploreByTalent={setExploreByTalent}
            activePlatform={activePlatform}
            setActivePlatform={setActivePlatform}
            isListening={isListening}
            handleVoiceListen={handleVoiceListen}
            voiceTranscript={voiceTranscript}
            isSearchLoading={isSearchLoading}
            t={t}
          />
        </section>
      )}

      {/* VIEW SECTION 3: TRENDS, TELEMETRY & AI RECOMMENDATIONS */}
      {(activeLayoutTab === 'all' || activeLayoutTab === 'trending') && (
        <section id="trending-section" className="relative z-20 max-w-7xl mx-auto px-6 py-8 border-t border-white/10 space-y-12 scroll-mt-28">
          
          {/* TRENDING NOW TELEMETRY CHART */}
          <LazySection height="300px">
            <Suspense fallback={<div className="h-56 w-full flex items-center justify-center text-[#00D1FF] font-mono text-xs">Loading Section...</div>}>
              <TrendingChart 
                catalog={displayCatalog} 
                userState={userState} 
                handleMovieSelect={handleMovieSelect} 
              />
            </Suspense>
          </LazySection>

          {/* SPECIAL PERSONALIZATION & SUGGESTED MATRIX BAR */}
          <div className="bg-gradient-to-r from-blue-950/30 via-black/50 to-purple-950/30 border border-[#00D1FF]/30 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00D1FF]" />
                  {t('suggestedForYou')}
                </h2>
                <p className="text-xs text-white/60 leading-relaxed font-sans max-w-2xl">
                  Our luxury on-device AI tracks your specific star grades, watchlist additions, and genre navigation behaviors to formulate real-time mathematical correlation coefficients.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00D1FF] animate-ping"></div>
                <span className="text-xs text-[#00D1FF] uppercase tracking-widest font-mono font-bold">Dynamic Rec Matrix Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendationMatrix
                .filter(item => item.movie.id !== selectedMovieId)
                .slice(0, 3)
                .map(({ movie, matchPercentage, reason }) => {
                  return (
                    <div 
                      key={movie.id}
                      onClick={() => handleMovieSelect(movie.id)}
                      className="bg-black/60 border border-white/10 hover:border-[#00D1FF]/70 rounded-2xl p-5 relative overflow-hidden group cursor-pointer transition-all duration-300 shadow-lg"
                    >
                      <span className="text-[9px] uppercase font-bold text-[#00D1FF] tracking-wider block mb-2 font-mono">
                        {reason} ({matchPercentage}% Match)
                      </span>

                      <h3 className="text-lg font-black italic uppercase text-white mb-2 group-hover:text-[#00D1FF] transition-colors">
                        {movie.title}
                      </h3>

                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                        {movie.synopsis}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono pt-3 border-t border-white/10">
                        <span>{movie.year} • {movie.runtimeOrSeasons}</span>
                        <span className="text-[#00D1FF] font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1">
                          Stream Details &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Micro Telemetry Graph depicting genre clicking behaviors */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Your Genre Interaction Matrix</h4>
              <div className="flex flex-wrap gap-4 items-center">
                {Object.entries(userState.genreClicks).length === 0 ? (
                  <p className="text-xs text-white/40 italic">No interaction metrics collected yet. Browse the catalog to feed telemetry.</p>
                ) : (
                  Object.entries(userState.genreClicks).map(([genre, count]) => {
                    const numCount = Number(count);
                    const barWidth = Math.min(100, numCount * 20);
                    return (
                      <div key={genre} className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3">
                        <span className="text-[10px] text-white/80 font-mono uppercase font-bold">{genre}</span>
                        <div className="w-16 h-1.5 bg-black rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#00D1FF] to-blue-500 rounded-full" style={{ width: `${barWidth}%` }}></div>
                        </div>
                        <span className="text-[9px] text-[#00D1FF] font-mono font-bold">{numCount} clicks</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </section>
      )}

      {/* VIEW SECTION 4: REVIEWS & WATCHLIST */}
      {(activeLayoutTab === 'all' || activeLayoutTab === 'community') && (
        <section id="community-section" className="relative z-20 max-w-7xl mx-auto px-6 py-8 border-t border-white/10 space-y-12 scroll-mt-28">
          
          {/* WATCHLIST DRAWER SECTION */}
          <div id="watchlist-section" className="scroll-mt-28">
            {userState.watchlist.length > 0 && (
              <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#00D1FF]" />
                  {t('watchlist')} ({userState.watchlist.length})
                </h3>
                <button 
                  onClick={() => setUserState(prev => ({ ...prev, watchlist: [] }))}
                  className="text-xs text-white/40 hover:text-red-400 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Queue
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayCatalog.filter(m => userState.watchlist.includes(m.id)).map(movie => (
                  <div 
                    key={movie.id}
                    onClick={() => handleMovieSelect(movie.id)}
                    className="bg-[#0b0b12] border border-white/10 hover:border-[#00D1FF] rounded-2xl overflow-hidden cursor-pointer group relative transition-all shadow-md"
                  >
                    <div className="h-32 overflow-hidden relative">
                      <BlurUpImage src={movie.posterUrl} alt={movie.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(movie.id);
                        }}
                        className="absolute top-2 right-2 bg-black/80 p-1.5 rounded-full text-white/60 hover:text-red-400 border border-white/10 cursor-pointer"
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
            </div>
          )}
          </div>

      {/* CRITICAL REVIEWS & INTELLECTUAL LEDGER */}
      <div className="relative z-10 py-8 border-t border-white/5" id="critic-hub">
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
      </div>
        </section>
      )}

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
        
        // Resolve Copyright-Safe Full-Length free movie/episode ID or official YouTube stream
        const getCopyrightSafeFullMovie = (movie: Movie, index: number = 0) => {
          if (movie.isPublicDomain) {
            if (movie.id === 'charade' || movie.id === 'charade-1963' || movie.fullMovieYoutubeId === 'W3i60M-k2wY') {
              return {
                id: 'https://archive.org/download/charade1963/charade1963_512kb.mp4',
                title: `${movie.title} (Original Full Movie)`,
                desc: 'Authentic Public Domain Film on Archive.org',
                isAlternative: false,
                altMovieName: movie.title
              };
            } else if (movie.id === 'night-of-the-living-dead' || movie.fullMovieYoutubeId === 'h8s8P9LCHV8') {
              return {
                id: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4',
                title: `${movie.title} (Original Full Movie)`,
                desc: 'Authentic Public Domain Film on Archive.org',
                isAlternative: false,
                altMovieName: movie.title
              };
            } else if (movie.id === 'the-general-1926' || movie.fullMovieYoutubeId === 'iH7H8wYp_D8') {
              return {
                id: 'https://archive.org/download/The_General_Buster_Keaton/The_General_512kb.mp4',
                title: `${movie.title} (Original Full Movie)`,
                desc: 'Authentic Public Domain Film on Archive.org',
                isAlternative: false,
                altMovieName: movie.title
              };
            } else if (movie.id === 'his-girl-friday-1940' || movie.fullMovieYoutubeId === '9eB3N6e0Sdg') {
              return {
                id: 'https://archive.org/download/HisGirlFriday1940_201804/His%20Girl%20Friday%20%281940%29.mp4',
                title: `${movie.title} (Original Full Movie)`,
                desc: 'Authentic Public Domain Film on Archive.org',
                isAlternative: false,
                altMovieName: movie.title
              };
            }
          }

          const mediaId = movie.fullMovieYoutubeId || movie.youtubeId || movie.trailerYoutubeId || TRAILER_IDS[movie.id] || OFFICIAL_MEDIA_MAP[movie.id]?.youtubeId || 'Way9Dexny3w';
          return {
            id: mediaId,
            title: movie.title,
            desc: `Official stream for ${movie.title}`,
            isAlternative: false,
            altMovieName: movie.title
          };
        };

        const seasons = getSeriesSeasons(theaterMovie);
        const isFullStream = streamMode === 'full';
        const streamOffset = theaterMovie.type === 'Series' ? (activeEpisode - 1) + (activeSeason - 1) * 8 : 0;
        const safeStream = getCopyrightSafeFullMovie(theaterMovie, backupIndex + streamOffset);
        const videoId = isFullStream 
          ? safeStream.id 
          : (activeTrailerKey || theaterMovie.youtubeId || OFFICIAL_MEDIA_MAP[theaterMovie.id]?.youtubeId || TRAILER_IDS[theaterMovie.id] || theaterMovie.trailerYoutubeId || 'Way9Dexny3w');
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
              </div>

              {/* 16:9 Video Canvas Frame */}
              <Suspense fallback={
                <div className="aspect-video w-full bg-[#0b0b12] border border-[#00D1FF]/20 rounded-2xl flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-t-[#00D1FF] border-white/10 animate-spin" />
                  <span className="text-sm text-white/50 font-mono tracking-widest uppercase">Loading Digital Stream Player...</span>
                </div>
              }>
                <CinemaPlayer
                  movie={theaterMovie}
                  streamMode={streamMode}
                  youtubeId={videoId}
                  directStreamUrl={activeDirectStreamUrl}
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
              </Suspense>

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
                  
                  {/* Rotating backup and Rating */}
                  <div className="space-y-3">

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
                          <BlurUpImage 
                            src={nextMovie.posterUrl} 
                            alt={nextMovie.title} 
                            referrerPolicy="no-referrer" 
                            className="w-full h-full object-cover"
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

      {/* EXCLUSIVE TALENT & MOVIE INFO OVERLAY MODAL */}
      <AnimatePresence>
        {infoMovie && (
          <motion.div 
            id="talent-info-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => {
              setInfoMovie(null);
              setLightboxImageIndex(null);
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0b0b12] border border-[#00D1FF]/30 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,209,255,0.35)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient luxury visual layers - subtle dark red/cyan gradient glow borders */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-[#00D1FF] to-blue-600 z-30" />
              
              {/* Close button */}
              <button 
                onClick={() => {
                  setInfoMovie(null);
                  setLightboxImageIndex(null);
                }}
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all border border-white/10 z-30 cursor-pointer"
                title="Close Panel"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Modal Content Container */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Column: Movie Poster */}
                  <div className="w-32 md:w-40 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border border-white/10 relative shadow-2xl mx-auto md:mx-0 bg-black">
                    <BlurUpImage 
                      src={infoMovie.posterUrl} 
                      alt={infoMovie.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 text-[#00D1FF] text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded border border-[#00D1FF]/20">
                      {infoMovie.year}
                    </div>
                  </div>

                  {/* Right Column: Information & Talent Bios */}
                  <div className="flex-1 space-y-4 text-left">
                    <div>
                      <span className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-[0.2em] font-black">
                        {infoMovie.type === 'Movie' ? 'Cinematic Presentation' : 'Exclusive Series'}
                      </span>
                      <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white mt-1 leading-tight">
                        {infoMovie.title}
                      </h4>
                      <p className="text-[10px] text-white/40 font-mono mt-1">★ {infoMovie.rating} Rating • {infoMovie.runtimeOrSeasons}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Director / Creator
                        </p>
                        <p className="text-sm font-bold text-white mt-1">{infoMovie.directorOrCreator}</p>
                        <p className="text-[11px] text-white/60 leading-relaxed mt-1">
                          An accomplished visionary maestro orchestrating the aesthetic execution and emotional narrative of this curation.
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></span> Starring Cast / Talent
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {infoMovie.cast.map((actor, idx) => (
                            <span 
                              key={idx} 
                              className="bg-white/5 border border-white/10 hover:border-[#00D1FF]/40 text-white/90 text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-default"
                            >
                              {actor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Atmospheric Cinematography Gallery */}
                <div className="pt-5 border-t border-white/5 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></span> Atmospheric Cinematography
                    </p>
                    <span className="text-[8px] font-mono text-[#00D1FF]/80 bg-[#00D1FF]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      Interactive Stills
                    </span>
                  </div>
                  
                  {/* 3-Column Grid of Curated Image Stills */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {getMovieStills(infoMovie).map((still, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setLightboxImageIndex(idx)}
                        className="group aspect-[16/10] bg-zinc-950 rounded-xl overflow-hidden border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 relative cursor-pointer shadow-md"
                      >
                        <BlurUpImage 
                          src={still.url}
                          alt={still.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Subtle hover overlay and zoom effect */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/75 border border-[#00D1FF]/30 p-1.5 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Maximize2 className="w-3.5 h-3.5 text-[#00D1FF]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer View Controls - Sticky at bottom */}
              <div className="bg-black/60 px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="text-left w-full sm:max-w-[65%]">
                  <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">Premise & Core Narrative</p>
                  <p className="text-[11px] text-white/60 italic truncate mt-0.5" title={infoMovie.synopsis}>
                    "{infoMovie.synopsis}"
                  </p>
                </div>
                <button 
                  onClick={() => {
                    handleMovieSelect(infoMovie.id);
                    setStreamMode('trailer');
                    setTheaterMovieId(infoMovie.id);
                    setInfoMovie(null);
                    setLightboxImageIndex(null);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#00D1FF] to-blue-500 hover:from-white hover:to-white text-black font-mono text-[10px] font-black uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,209,255,0.35)] shrink-0 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ATMOSPHERIC CINEMA GALLERY LIGHTBOX */}
      {infoMovie && lightboxImageIndex !== null && (() => {
        const stills = getMovieStills(infoMovie);
        const currentStill = stills[lightboxImageIndex];
        if (!currentStill) return null;

        return (
          <div 
            className="fixed inset-0 z-[160] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-fade-in"
            onClick={() => setLightboxImageIndex(null)}
          >
            {/* Close button */}
            <button 
              onClick={() => setLightboxImageIndex(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white p-2 md:p-3 rounded-full transition-all cursor-pointer z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              title="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Stage */}
            <div 
              className="relative max-w-4xl w-full aspect-[16/10] md:aspect-[16/9] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]" 
              onClick={(e) => e.stopPropagation()}
            >
              <BlurUpImage 
                src={currentStill.url}
                alt={currentStill.caption}
                className="w-full h-full object-cover"
              />

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <button
                  onClick={() => setLightboxImageIndex((lightboxImageIndex - 1 + stills.length) % stills.length)}
                  className="bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#00D1FF] text-white p-2 rounded-full transition-all cursor-pointer shadow-lg group"
                >
                  <span className="sr-only">Previous Still</span>
                  <svg className="w-5 h-5 text-white/70 group-hover:text-[#00D1FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <button
                  onClick={() => setLightboxImageIndex((lightboxImageIndex + 1) % stills.length)}
                  className="bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#00D1FF] text-white p-2 rounded-full transition-all cursor-pointer shadow-lg group"
                >
                  <span className="sr-only">Next Still</span>
                  <svg className="w-5 h-5 text-white/70 group-hover:text-[#00D1FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Image Footer Details */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                <div className="text-left space-y-1 max-w-xl">
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Atmospheric Scene Detail</p>
                  <h5 className="text-white font-bold text-sm md:text-base leading-snug">{currentStill.caption}</h5>
                </div>
                {currentStill.location && (
                  <div className="flex items-center gap-1.5 shrink-0 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-3 py-1 font-mono text-[9px] text-[#00D1FF]">
                    <MapPin className="w-3 h-3" />
                    <span>{currentStill.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom thumbnail selector indicator dots */}
            <div className="flex gap-2.5 mt-6 z-10" onClick={(e) => e.stopPropagation()}>
              {stills.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxImageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === lightboxImageIndex ? 'bg-[#00D1FF] w-6 shadow-[0_0_8px_rgba(0,209,255,0.8)]' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Dynamic Invisible Preloader for the Currently Selected Movie/Series Video Stream */}
      {currentMovie && (
        <video 
          key={`preload-video-${currentMovie.id}`}
          src={getVideoStreamUrl(currentMovie)} 
          preload="auto" 
          muted 
          className="hidden" 
          style={{ display: 'none', width: 0, height: 0 }}
        />
      )}

      {/* Authority Center User Database Console Modal */}
      <UserDatabaseConsole 
        isOpen={isUserDatabaseOpen} 
        onClose={() => setIsUserDatabaseOpen(false)} 
      />

    </div>
  );
}
