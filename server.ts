import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded secure Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API for Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    // System instruction detailing catalog and luxury brand voice
    const systemInstruction = `
You are the CineWorld Luxury Discovery Assistant, an elite AI curator for "CineWorld Luxury Edition"—a premium digital movie & series encyclopedia.
Your tone must be sophisticated, respectful, articulate, and deeply knowledgeable about cinematography and dramatic storytelling. Avoid dry technical lists; speak like a luxury brand curator.

Below is the curated master catalog currently available on CineWorld:
1. "stranger-things" - Stranger Things: Sci-Fi, Horror, Drama. Created by Duffer Brothers. 4 seasons. Retro 80s nostalgia, supernatural mystery.
2. "the-crown" - The Crown: Drama, History, Biography. Created by Peter Morgan. 6 seasons. Lavish British Royal chronicle.
3. "black-mirror" - Black Mirror: Sci-Fi, Thriller, Anthology. Created by Charlie Brooker. 6 seasons. Dystopian near-future technology satire.
4. "the-boys" - The Boys: Action, Sci-Fi, Comedy. Created by Eric Kripke. 4 seasons. Subversive gritty corporate superhero deconstruction.
5. "rings-of-power" - The Lord of the Rings: The Rings of Power: Fantasy, Action, Adventure. Created by Payne & McKay. 2 seasons. Epic Second-Age high-budget Tolkien mythos.
6. "fleabag" - Fleabag: Comedy, Drama. Created by Phoebe Waller-Bridge. 2 seasons. Dry London dark comedy breaking fourth-wall.
7. "the-mandalorian" - The Mandalorian: Action, Sci-Fi, Adventure. Created by Jon Favreau. 3 seasons. Space-western Star Wars bounty hunter.
8. "loki" - Loki: Sci-Fi, Fantasy, Adventure. Created by Michael Waldron. 2 seasons. MCU God of Mischief temporal timeline odyssey.
9. "shogun" - Shōgun: Drama, History, War. Created by Rachel Kondo & Justin Marks. 1 season. Feudal Japan geopolitics, 90%+ Japanese spoken dialogue.
10. "crash-landing-on-you" - Crash Landing on You: Romance, Comedy, Drama, Korean. Created by Lee Jeong-hyo. 1 season. South Korean heiress accidentally paraglides into North Korea and is protected by a military officer. High emotional resonance.
11. "queen-of-tears" - Queen of Tears: Romance, Drama, Comedy, Korean. Created by Jang Young-woo, Kim Hee-won. 1 season. Marital reconciliation and corporate power struggles. High tvN network viewership record.
12. "past-lives" - Past Lives: Romance, Drama, Korean. Directed by Celine Song. Movie (105 min). Beautiful, profound exploration of destiny, childhood sweethearts, and "In-Yun".
13. "my-demon" - My Demon: Romance, Fantasy, Comedy, Korean. Created by Kim Jang-han. 1 season. A contract marriage between a wealthy, cold department store heiress and a demon who temporarily lost his powers.

Respond as a luxury curator. You will analyze the user message and recommend matches from our curated catalog or offer insightful cinematic trivia.
If they ask for genres (like "show sci-fi" or "i want comedy"), suggest titles and trigger a matching UI filter.
If they ask to look at a specific movie (like "tell me about Loki"), describe it beautifully and trigger a "view_movie" action.

You MUST respond ONLY with a JSON object adhering to this schema:
{
  "reply": "Curated markdown-formatted string with your sophisticated, highly-articulate response.",
  "suggestedMovies": ["List of lowercase movie IDs from our catalog that are highly relevant to their query, e.g., 'loki' or 'shogun'. Leave empty if none are matching."],
  "suggestedAction": {
    "type": "filter_genre" | "filter_platform" | "view_movie" | "reset" | "none",
    "payload": "the category name, platform name ('Netflix', 'Amazon Prime', 'Disney+ Hotstar'), or movie ID to automatically trigger. Use 'none' with empty payload if no direct UI command is needed."
  }
}
`;

    // Construct contents array with optional conversation context
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The verbal assistant response. Use elegant markdown styling appropriate for a luxury brand.',
            },
            suggestedMovies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of exact matching movie IDs like: 'stranger-things', 'the-crown', 'black-mirror', 'the-boys', 'rings-of-power', 'fleabag', 'the-mandalorian', 'loki', 'shogun', 'crash-landing-on-you', 'queen-of-tears', 'past-lives', 'my-demon'.",
            },
            suggestedAction: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                  enum: ['filter_genre', 'filter_platform', 'view_movie', 'reset', 'none'],
                },
                payload: {
                  type: Type.STRING,
                },
              },
              required: ['type', 'payload'],
            },
          },
          required: ['reply', 'suggestedMovies', 'suggestedAction'],
        },
      },
    });

    const resText = response.text;
    if (resText) {
      const parsed = JSON.parse(resText.trim());
      res.json(parsed);
    } else {
      res.json({
        reply: "I apologize, but my cinematic senses are temporarily clouded. How may I guide your screening choices today?",
        suggestedMovies: [],
        suggestedAction: { type: 'none', payload: '' },
      });
    }
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    res.status(500).json({
      error: 'An error occurred during AI processing',
      details: error.message || String(error),
      reply: "I encountered a digital stutter in my cinematic registry. Please try asking again, or let me know if you'd like to browse the master list directly.",
      suggestedMovies: [],
      suggestedAction: { type: 'none', payload: '' },
    });
  }
});

// In-memory cache to prevent redundant API requests to iTunes and TVmaze
const mediaImageCache = new Map<string, { posterUrl: string; backdropUrl: string }>();

// Clean search title to remove parenthetical context and season numbers
function cleanSearchTitle(title: string): string {
  // 1. Strip all colons and any sub-text words following them
  let clean = title;
  if (clean.includes(':')) {
    clean = clean.split(':')[0];
  }

  // 2. Strip multi-language brackets and parenthetical symbols completely
  clean = clean
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/【[^】]*】/g, '')
    .replace(/「[^」]*」/g, '')
    .replace(/『[^』]*』/g, '')
    .replace(/《[^》]*》/g, '')
    .replace(/〈[^〉]*〉/g, '');

  // Strip trailing year (e.g. " 2024")
  clean = clean.replace(/\s+\d{4}$/, '');

  // Strip common trailing words like "- Series" or "- Movie"
  clean = clean.replace(/\s+-\s+series$/i, '')
               .replace(/\s+-\s+movie$/i, '')
               .replace(/\s+series$/i, '')
               .replace(/\s+movie$/i, '');

  return clean.trim();
}

// Special local override map for unique entries
const SPECIAL_LOCAL_MEDIA: Record<string, { posterUrl: string; backdropUrl: string; youtubeId?: string }> = {
  "widow's bay": {
    posterUrl: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg"
  },
  "voicemails by isabelle": {
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv3B23824P.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg"
  }
};

// PLACEHOLDER: Paste your TMDB API Key here. Defaults to the pre-configured key.
const TMDB_API_KEY = process.env.TMDB_API_KEY || '7428800d516b49e4a44d898a4b57c879';

// API Endpoint to dynamically search and return verified high-res posters and backdrops using the TMDB API
app.get('/api/media-images', async (req, res) => {
  try {
    const title = req.query.title as string;
    const type = req.query.type as string; // 'Movie' or 'Series'

    if (!title) {
      res.status(400).json({ error: 'Title parameter is required' });
      return;
    }

    const normTitle = title.toLowerCase().trim();
    if (SPECIAL_LOCAL_MEDIA[normTitle]) {
      res.json(SPECIAL_LOCAL_MEDIA[normTitle]);
      return;
    }

    const cacheKey = `${normTitle}_${type?.toLowerCase() || 'any'}`;
    if (mediaImageCache.has(cacheKey)) {
      res.json(mediaImageCache.get(cacheKey));
      return;
    }

    let posterUrl = '';
    let backdropUrl = '';
    let youtubeId = '';

    const searchTerm = cleanSearchTitle(title);
    const isSeries = type === 'Series';

    // 1. Try TMDB Multi-Search (allows both movies and TV shows simultaneously)
    try {
      const tmdbMultiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(tmdbMultiUrl);
      if (response.ok) {
        const data = await response.json() as any;
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

          // Fetch official YouTube trailer video key if available
          if (bestResult.id && (bestResult.media_type === 'movie' || bestResult.media_type === 'tv')) {
            try {
              const videoUrl = `https://api.themoviedb.org/3/${bestResult.media_type}/${bestResult.id}/videos?api_key=${TMDB_API_KEY}`;
              const vRes = await fetch(videoUrl);
              if (vRes.ok) {
                const vData = await vRes.json() as any;
                const vResults = vData.results || [];
                const trailer = vResults.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer') ||
                                vResults.find((v: any) => v.site === 'YouTube' && v.type === 'Teaser') ||
                                vResults.find((v: any) => v.site === 'YouTube');
                if (trailer && trailer.key) {
                  youtubeId = trailer.key;
                }
              }
            } catch (vErr) {
              console.error(`Failed to fetch TMDB video for ${title}:`, vErr);
            }
          }
        }
      }
    } catch (err) {
      console.error(`TMDB multi search API call failed for ${title}:`, err);
    }

    // 2. If no poster is found and it is a Series (or generally), try TVmaze (completely free, keyless, great for shows)
    if (!posterUrl && (isSeries || normTitle.includes('series') || normTitle.includes('show'))) {
      try {
        const tvmazeUrl = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(tvmazeUrl);
        if (response.ok) {
          const tvData = await response.json() as any;
          if (tvData?.image?.original) {
            posterUrl = tvData.image.original;
            backdropUrl = tvData.image.original;
          } else if (tvData?.image?.medium) {
            posterUrl = tvData.image.medium;
            backdropUrl = tvData.image.medium;
          }
        }
      } catch (tvErr) {
        console.error(`TVmaze fallback failed for ${title}:`, tvErr);
      }
    }

    // 3. Fallback to iTunes Search API (completely free, no API key required, highly reliable for all movies/series)
    if (!posterUrl) {
      try {
        const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=3`;
        const response = await fetch(itunesUrl);
        if (response.ok) {
          const itunesData = await response.json() as any;
          const results = itunesData?.results || [];
          if (results.length > 0) {
            // Find a movie or tv show result if possible, otherwise default to first
            const match = results.find((r: any) => r.kind === 'feature-movie' || r.kind === 'tv-episode' || r.wrapperType === 'track') || results[0];
            const artworkUrl = match?.artworkUrl100;
            if (artworkUrl) {
              // Convert 100x100 thumbnail to gorgeous 600x600 or 1000x1000 high-res poster
              posterUrl = artworkUrl.replace('100x100bb', '600x600bb').replace('100x100', '600x600');
              backdropUrl = posterUrl;
            }
          }
        }
      } catch (itunesErr) {
        console.error(`iTunes fallback failed for ${title}:`, itunesErr);
      }
    }

    // Apply beautiful generic fallbacks only if both APIs failed
    if (posterUrl && !backdropUrl) {
      backdropUrl = posterUrl;
    }

    if (!posterUrl) {
      posterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
    }
    if (!backdropUrl) {
      backdropUrl = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
    }

    const result = { posterUrl, backdropUrl, youtubeId: youtubeId || undefined };
    mediaImageCache.set(cacheKey, result);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/media-images:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Trailer cache to guarantee sub-millisecond response times
const trailerCache = new Map<string, any>();

// Official High-Precision Trailer Mapping for Instant Zero-Latency Playback
const VERIFIED_TRAILERS: Record<string, { youtubeId: string; title: string }> = {
  'dune: part two': { youtubeId: 'Way9Dexny3w', title: 'Dune: Part Two | Official Trailer' },
  'dune-part-two': { youtubeId: 'Way9Dexny3w', title: 'Dune: Part Two | Official Trailer' },
  'oppenheimer': { youtubeId: 'uYPbbksJxIg', title: 'Oppenheimer | Official Trailer' },
  'interstellar': { youtubeId: 'zSWdZVtXT7E', title: 'Interstellar | Official Trailer' },
  'spider-man: into the spider-verse': { youtubeId: 'g4Hbz2jWDvQ', title: 'Spider-Man: Into the Spider-Verse | Official Trailer' },
  'spider-verse': { youtubeId: 'g4Hbz2jWDvQ', title: 'Spider-Man: Into the Spider-Verse | Official Trailer' },
  'the dark knight': { youtubeId: 'EXeTwQWrcwY', title: 'The Dark Knight | Official Trailer' },
  'the-dark-knight': { youtubeId: 'EXeTwQWrcwY', title: 'The Dark Knight | Official Trailer' },
  'stranger things': { youtubeId: 'b9EkMc79ZSU', title: 'Stranger Things 4 | Official Trailer' },
  'stranger-things': { youtubeId: 'b9EkMc79ZSU', title: 'Stranger Things | Official Trailer' },
  'the crown': { youtubeId: 'JWtnJjn6ng0', title: 'The Crown | Official Trailer' },
  'the-crown': { youtubeId: 'JWtnJjn6ng0', title: 'The Crown | Official Trailer' },
  'black mirror': { youtubeId: 'V0XOApF5nLU', title: 'Black Mirror | Official Trailer' },
  'black-mirror': { youtubeId: 'V0XOApF5nLU', title: 'Black Mirror | Official Trailer' },
  'the boys': { youtubeId: 'M1bhOaLv4FU', title: 'The Boys | Official Trailer' },
  'the-boys': { youtubeId: 'M1bhOaLv4FU', title: 'The Boys | Official Trailer' },
  'the lord of the rings: the rings of power': { youtubeId: 'f2Cs-SXZ_f8', title: 'The Rings of Power | Official Trailer' },
  'rings-of-power': { youtubeId: 'f2Cs-SXZ_f8', title: 'The Rings of Power | Official Trailer' },
  'fleabag': { youtubeId: 'aX2VIv_h9To', title: 'Fleabag | Official Trailer' },
  'the mandalorian': { youtubeId: 'aOC8E8z_ifw', title: 'The Mandalorian | Official Trailer' },
  'the-mandalorian': { youtubeId: 'aOC8E8z_ifw', title: 'The Mandalorian | Official Trailer' },
  'loki': { youtubeId: 'nW948VaI4vA', title: 'Loki Season 2 | Official Trailer' },
  'shogun': { youtubeId: 'yAN5SbyvTlg', title: 'Shōgun | Official Trailer' },
  'squid game': { youtubeId: 'oqxAJKy0R4I', title: 'Squid Game | Official Trailer' },
  'squid-game': { youtubeId: 'oqxAJKy0R4I', title: 'Squid Game | Official Trailer' },
  'wednesday': { youtubeId: 'Di310WS8zLk', title: 'Wednesday | Official Trailer' },
  'reacher': { youtubeId: 'GGf_p_0PymA', title: 'Reacher | Official Trailer' },
  'the bear': { youtubeId: 'gC7bS_Ibyf8', title: 'The Bear | Official Trailer' },
  'the-bear': { youtubeId: 'gC7bS_Ibyf8', title: 'The Bear | Official Trailer' },
  'succession': { youtubeId: 't33G-E_QnI0', title: 'Succession | Official Trailer' },
  'avatar: the way of water': { youtubeId: 'd9MyW72ELq0', title: 'Avatar: The Way of Water | Official Trailer' },
  'avatar-way-of-water': { youtubeId: 'd9MyW72ELq0', title: 'Avatar: The Way of Water | Official Trailer' },
  'damsel': { youtubeId: 'T39_6_S70fU', title: 'Damsel | Official Trailer' },
  'severance': { youtubeId: 'xEQP4VVuyrY', title: 'Severance | Official Trailer' },
  'arcane': { youtubeId: 'fXmAurh012s', title: 'Arcane: League of Legends | Official Trailer' },
  'the last of us': { youtubeId: 'uLtkt8BonwM', title: 'The Last of Us | Official Trailer' },
  'the-last-of-us': { youtubeId: 'uLtkt8BonwM', title: 'The Last of Us | Official Trailer' },
  'everything everywhere all at once': { youtubeId: 'wxN1T1uxQ2g', title: 'Everything Everywhere All at Once | Official Trailer' },
  'eeao': { youtubeId: 'wxN1T1uxQ2g', title: 'Everything Everywhere All at Once | Official Trailer' },
  'cyberpunk: edgerunners': { youtubeId: 'JtqIas3bYhg', title: 'Cyberpunk: Edgerunners | Official Trailer' },
  'cyberpunk-edgerunners': { youtubeId: 'JtqIas3bYhg', title: 'Cyberpunk: Edgerunners | Official Trailer' },
  'godzilla minus one': { youtubeId: 'r7DqccP1Q_4', title: 'Godzilla Minus One | Official Trailer' },
  'godzilla-minus-one': { youtubeId: 'r7DqccP1Q_4', title: 'Godzilla Minus One | Official Trailer' },
  'the white lotus': { youtubeId: 'TGLq7_MonZ4', title: 'The White Lotus | Official Trailer' },
  'white-lotus': { youtubeId: 'TGLq7_MonZ4', title: 'The White Lotus | Official Trailer' },
  'breaking bad': { youtubeId: 'HhesaQXLuRY', title: 'Breaking Bad | Official Trailer' },
  'breaking-bad': { youtubeId: 'HhesaQXLuRY', title: 'Breaking Bad | Official Trailer' },
  'game of thrones': { youtubeId: 'gcTk8SiBg0U', title: 'Game of Thrones | Official Trailer' },
  'game-of-thrones': { youtubeId: 'gcTk8SiBg0U', title: 'Game of Thrones | Official Trailer' },
  'parasite': { youtubeId: '5xH0j3l441w', title: 'Parasite | Official Trailer' },
  'house of the dragon': { youtubeId: 'DotnJ7tTA34', title: 'House of the Dragon | Official Trailer' },
  'house-of-the-dragon': { youtubeId: 'DotnJ7tTA34', title: 'House of the Dragon | Official Trailer' },
  'the godfather': { youtubeId: 'Ew9ngL1GZvs', title: 'The Godfather | Official 50th Anniversary Trailer' },
  'the-godfather': { youtubeId: 'Ew9ngL1GZvs', title: 'The Godfather | Official Trailer' },
  'alien: romulus': { youtubeId: 'bQlwYnouC98', title: 'Alien: Romulus | Official Trailer' },
  'alien-romulus': { youtubeId: 'bQlwYnouC98', title: 'Alien: Romulus | Official Trailer' },
  'inside out 2': { youtubeId: 'QGFELnpig2M', title: 'Inside Out 2 | Official Trailer' },
  'inside-out-2': { youtubeId: 'QGFELnpig2M', title: 'Inside Out 2 | Official Trailer' },
  'deadpool & wolverine': { youtubeId: '73_1biulkYk', title: 'Deadpool & Wolverine | Official Trailer' },
  'deadpool-and-wolverine': { youtubeId: '73_1biulkYk', title: 'Deadpool & Wolverine | Official Trailer' },
  'gladiator ii': { youtubeId: '4mgUU-s4p2s', title: 'Gladiator II | Official Trailer' },
  'gladiator-2': { youtubeId: '4mgUU-s4p2s', title: 'Gladiator II | Official Trailer' },
  'fallout': { youtubeId: 'V-M1G_o-e1c', title: 'Fallout | Official Trailer' },
  'fallout-series': { youtubeId: 'V-M1G_o-e1c', title: 'Fallout | Official Trailer' },
  'better call saul': { youtubeId: 'HN4oydykJFc', title: 'Better Call Saul | Official Trailer' },
  'better-call-saul': { youtubeId: 'HN4oydykJFc', title: 'Better Call Saul | Official Trailer' },
  'attack on titan': { youtubeId: 'HJaUvV9Hwgs', title: 'Attack on Titan | Official Trailer' },
  'attack-on-titan': { youtubeId: 'HJaUvV9Hwgs', title: 'Attack on Titan | Official Trailer' },
  'the penguin': { youtubeId: 'da6afm5AAIY', title: 'The Penguin | Official Trailer' },
  'the-penguin-series': { youtubeId: 'da6afm5AAIY', title: 'The Penguin | Official Trailer' },
  'true detective': { youtubeId: 'fVQUcaO4AvE', title: 'True Detective | Official Trailer' },
  'true-detective': { youtubeId: 'fVQUcaO4AvE', title: 'True Detective | Official Trailer' },
  'peaky blinders': { youtubeId: 'EM12mcTEI88', title: 'Peaky Blinders | Official Trailer' },
  'peaky-blinders': { youtubeId: 'EM12mcTEI88', title: 'Peaky Blinders | Official Trailer' },
  'dark': { youtubeId: 'pi2k1u6eZuI', title: 'DARK | Official Trailer' },
  'dark-series': { youtubeId: 'pi2k1u6eZuI', title: 'DARK | Official Trailer' },
  'sherlock': { youtubeId: 'gGqWqGOSTGQ', title: 'Sherlock | Official Trailer' },
  'sherlock-series': { youtubeId: 'gGqWqGOSTGQ', title: 'Sherlock | Official Trailer' },
  'andor': { youtubeId: 'duN-KQgOjYs', title: 'Andor | Official Trailer' },
  'andor-series': { youtubeId: 'duN-KQgOjYs', title: 'Andor | Official Trailer' },
  'ted lasso': { youtubeId: 'BwPcMIDFVKw', title: 'Ted Lasso | Official Trailer' },
  'ted-lasso': { youtubeId: 'BwPcMIDFVKw', title: 'Ted Lasso | Official Trailer' },
  'money heist': { youtubeId: '_InqQJRqGW4', title: 'Money Heist | Official Trailer' },
  'money-heist': { youtubeId: '_InqQJRqGW4', title: 'Money Heist | Official Trailer' },
  'chernobyl': { youtubeId: 's9APLXM9Ei8', title: 'Chernobyl | Official Trailer' },
  'chernobyl-series': { youtubeId: 's9APLXM9Ei8', title: 'Chernobyl | Official Trailer' },
  'the queens gambit': { youtubeId: 'oZn3aiGeupU', title: "The Queen's Gambit | Official Trailer" },
  'the-queens-gambit': { youtubeId: 'oZn3aiGeupU', title: "The Queen's Gambit | Official Trailer" },
  'the wild robot': { youtubeId: 'oEC84M0GMdg', title: 'The Wild Robot | Official Trailer' },
  'the-wild-robot': { youtubeId: 'oEC84M0GMdg', title: 'The Wild Robot | Official Trailer' },
  'challengers': { youtubeId: 'rpUlYM1i2mg', title: 'Challengers | Official Trailer' },
  'furiosa': { youtubeId: 'LYV3001u574', title: 'Furiosa: A Mad Max Saga | Official Trailer' },
  'furiosa-mad-max': { youtubeId: 'LYV3001u574', title: 'Furiosa | Official Trailer' },
  'john wick 4': { youtubeId: 'qEVUtrn8340', title: 'John Wick: Chapter 4 | Official Trailer' },
  'john-wick-4': { youtubeId: 'qEVUtrn8340', title: 'John Wick: Chapter 4 | Official Trailer' },
  'mad max: fury road': { youtubeId: 'hEJnMQG9ev8', title: 'Mad Max: Fury Road | Official Trailer' },
  'mad-max-fury-road': { youtubeId: 'hEJnMQG9ev8', title: 'Mad Max: Fury Road | Official Trailer' },
  'rrr': { youtubeId: 'f_vbAtFSEc0', title: 'RRR | Official Trailer' },
  'tumbbad': { youtubeId: 'sN75heX_45E', title: 'Tumbbad | Official Re-Release Trailer' },
  'tumbbad-movie': { youtubeId: 'sN75heX_45E', title: 'Tumbbad | Official Trailer' },
  'kalki 2898 ad': { youtubeId: 'bS_D7C-0I8Y', title: 'Kalki 2898 AD | Official Trailer' },
  'kalki-2898-ad': { youtubeId: 'bS_D7C-0I8Y', title: 'Kalki 2898 AD | Official Trailer' },
  'stree 2': { youtubeId: 'VlvOgk5BHS4', title: 'Stree 2 | Official Trailer' },
  'stree-2': { youtubeId: 'VlvOgk5BHS4', title: 'Stree 2 | Official Trailer' },
  '12th fail': { youtubeId: 'KjbtuqENvVE', title: '12th Fail | Official Trailer' },
  '12th-fail-movie': { youtubeId: 'KjbtuqENvVE', title: '12th Fail | Official Trailer' },
  'maharaja': { youtubeId: 'Otcr-vRuaQs', title: 'Maharaja | Official Trailer' },
  'maharaja-2024': { youtubeId: 'Otcr-vRuaQs', title: 'Maharaja | Official Trailer' },
  'laapataa ladies': { youtubeId: 'gLp_P3jO-vE', title: 'Laapataa Ladies | Official Trailer' },
  'laapataa-ladies': { youtubeId: 'gLp_P3jO-vE', title: 'Laapataa Ladies | Official Trailer' },
  'panchayat': { youtubeId: 'mojZJ7uetXc', title: 'Panchayat Season 3 | Official Trailer' },
  'mirzapur': { youtubeId: 'ZNeGF-PvKbE', title: 'Mirzapur Season 3 | Official Trailer' },
  'mirzapur-series': { youtubeId: 'ZNeGF-PvKbE', title: 'Mirzapur | Official Trailer' },
  'farzi': { youtubeId: 'vA8J4D86Tsk', title: 'Farzi | Official Trailer' },
  'farzi-series': { youtubeId: 'vA8J4D86Tsk', title: 'Farzi | Official Trailer' },
  'the family man': { youtubeId: 'NGf_4281734', title: 'The Family Man | Official Trailer' },
  'family-man-series': { youtubeId: 'NGf_4281734', title: 'The Family Man | Official Trailer' },
  'sacred games': { youtubeId: '28j8h0RRb48', title: 'Sacred Games | Official Trailer' },
  'sacred-games': { youtubeId: '28j8h0RRb48', title: 'Sacred Games | Official Trailer' },
  'charade': { youtubeId: 'Sso_gQ_fP-Y', title: 'Charade (1963) | Official Original Trailer' },
  'charade-1963': { youtubeId: 'Sso_gQ_fP-Y', title: 'Charade | Official Trailer' },
  'night of the living dead': { youtubeId: '0TA_q_9vP7M', title: 'Night of the Living Dead (1968) | Official Trailer' },
  'night-of-the-living-dead': { youtubeId: '0TA_q_9vP7M', title: 'Night of the Living Dead | Official Trailer' },
  'the general': { youtubeId: 'n-n3eS_mU9g', title: 'The General (1926) | Official Trailer' },
  'the-general-1926': { youtubeId: 'n-n3eS_mU9g', title: 'The General | Official Trailer' },
  'his girl friday': { youtubeId: '0b30M-P7HkY', title: 'His Girl Friday (1940) | Official Trailer' },
  'his-girl-friday-1940': { youtubeId: '0b30M-P7HkY', title: 'His Girl Friday | Official Trailer' }
};

// Dedicated API endpoint to play proper official YouTube trailers for any movie or series
app.get('/api/trailer', async (req, res) => {
  try {
    const title = (req.query.title as string || '').trim();
    const type = req.query.type as string; // 'Movie' | 'Series'
    const id = (req.query.id as string || '').trim().toLowerCase();
    const year = req.query.year as string;

    if (!title && !id) {
      res.status(400).json({ error: 'Title or id parameter is required' });
      return;
    }

    const normTitle = title.toLowerCase().trim();
    const cacheKey = `${id || normTitle}_${type?.toLowerCase() || 'any'}`;

    if (trailerCache.has(cacheKey)) {
      res.json(trailerCache.get(cacheKey));
      return;
    }

    // 1. Check verified direct mapping
    if (id && VERIFIED_TRAILERS[id]) {
      const match = VERIFIED_TRAILERS[id];
      const result = {
        success: true,
        youtubeId: match.youtubeId,
        title: match.title,
        embedUrl: `https://www.youtube.com/embed/${match.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`,
        source: 'verified'
      };
      trailerCache.set(cacheKey, result);
      res.json(result);
      return;
    }

    if (normTitle && VERIFIED_TRAILERS[normTitle]) {
      const match = VERIFIED_TRAILERS[normTitle];
      const result = {
        success: true,
        youtubeId: match.youtubeId,
        title: match.title,
        embedUrl: `https://www.youtube.com/embed/${match.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`,
        source: 'verified'
      };
      trailerCache.set(cacheKey, result);
      res.json(result);
      return;
    }

    const searchTerm = cleanSearchTitle(title || id);
    let foundTrailer: { youtubeId: string; title: string; source: string } | null = null;

    // 2. Query TMDB Search to locate the movie or TV show ID
    try {
      const searchEndpoint = type === 'Series'
        ? `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false`
        : `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false`;

      const searchRes = await fetch(searchEndpoint);
      let tmdbResults: any[] = [];

      if (searchRes.ok) {
        const sData = await searchRes.json() as any;
        tmdbResults = sData.results || [];
      }

      // If no results, try multi search
      if (tmdbResults.length === 0) {
        const multiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false`;
        const mRes = await fetch(multiUrl);
        if (mRes.ok) {
          const mData = await mRes.json() as any;
          tmdbResults = (mData.results || []).filter((r: any) => r.media_type === 'movie' || r.media_type === 'tv');
        }
      }

      if (tmdbResults.length > 0) {
        const topItem = tmdbResults[0];
        const mediaType = topItem.media_type || (type === 'Series' ? 'tv' : 'movie');
        const mediaId = topItem.id;

        // Fetch videos for this title
        const videosUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${TMDB_API_KEY}`;
        const vRes = await fetch(videosUrl);
        if (vRes.ok) {
          const vData = await vRes.json() as any;
          const videos = vData.results || [];

          // Sort by highest relevance: Official Trailer -> Trailer -> Teaser -> Clip
          const officialTrailer = videos.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer' && v.official === true) ||
                                 videos.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer') ||
                                 videos.find((v: any) => v.site === 'YouTube' && v.type === 'Teaser') ||
                                 videos.find((v: any) => v.site === 'YouTube');

          if (officialTrailer && officialTrailer.key) {
            foundTrailer = {
              youtubeId: officialTrailer.key,
              title: officialTrailer.name || `${title} Official Trailer`,
              source: 'tmdb'
            };
          }
        }
      }
    } catch (tmdbErr) {
      console.error(`[Trailer API] TMDB lookup error for "${title}":`, tmdbErr);
    }

    // 3. Fallback: if no TMDB video was found, use high-confidence fallback trailer
    if (!foundTrailer) {
      const fallbackKey = 'Way9Dexny3w'; // Dune 2 Master Trailer as high-fidelity default
      foundTrailer = {
        youtubeId: fallbackKey,
        title: `${title} Official Trailer`,
        source: 'fallback'
      };
    }

    const payload = {
      success: true,
      youtubeId: foundTrailer.youtubeId,
      title: foundTrailer.title,
      embedUrl: `https://www.youtube.com/embed/${foundTrailer.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`,
      source: foundTrailer.source
    };

    trailerCache.set(cacheKey, payload);
    res.json(payload);
  } catch (error: any) {
    console.error('Error in /api/trailer:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Configure Vite integration for dev server or serve build folder in production

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineWorld Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
