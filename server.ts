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

  // 3. Remove leading and trailing whitespace
  return clean.trim();
}

// Special local mappings for fictional, unreleased or highly ambiguous titles to ensure perfect, atmospheric images
const SPECIAL_LOCAL_MEDIA: Record<string, { posterUrl: string; backdropUrl: string }> = {
  "widow's bay": {
    posterUrl: "https://images.unsplash.com/photo-1505852673653-db4fc4aa3dd4?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
  },
  "if wishes could kill": {
    posterUrl: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },
  "voicemails by isabelle": {
    posterUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop"
  },
  "avatar: fire and ash": {
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop"
  },
  "stranger things: season 5": {
    posterUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop"
  },
  "dune: messiah": {
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop"
  },
  "blade runner 2099": {
    posterUrl: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop"
  },
  "project hail mary": {
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  "from": {
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop"
  },
  "goblin (guardian: the lonely and great god)": {
    posterUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop"
  },
  "goblin": {
    posterUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop"
  },
  "lovely runner": {
    posterUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518887570146-0612132dd618?q=80&w=1200&auto=format&fit=crop"
  },
  "queen of tears": {
    posterUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
  },
  "crash landing on you": {
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"
  },
  "my demon": {
    posterUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop"
  },
  "shaitaan": {
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop"
  },
  "panchayat": {
    posterUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1501530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
  },
  "tumbbad": {
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1505852673653-db4fc4aa3dd4?q=80&w=1200&auto=format&fit=crop"
  },
  "enola holmes 3": {
    posterUrl: "https://images.unsplash.com/photo-1511108690759-009324a90311?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop"
  },
  "fallout": {
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  "bridgerton": {
    posterUrl: "https://images.unsplash.com/photo-1518887570146-0612132dd618?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop"
  },
  "beef": {
    posterUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop"
  },
  "the sandman": {
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop"
  },
  "the expanse": {
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop"
  },
  "the idea of you": {
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
  },
  "society of the snow": {
    posterUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop"
  },
  "road house": {
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=1200&auto=format&fit=crop"
  },
  "the covenant": {
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1501530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
  },
  "nimona": {
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
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

    const searchTerm = cleanSearchTitle(title);
    const isSeries = type === 'Series';
    const endpoint = isSeries ? 'tv' : 'movie';
    const searchUrl = `https://api.themoviedb.org/3/search/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json() as any;
        const results = data?.results || [];
        if (results.length > 0) {
          const bestResult = results[0];
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
        }
      }
    } catch (err) {
      console.error(`TMDB search API call failed for ${title}:`, err);
    }

    if (posterUrl && !backdropUrl) {
      // Use the high-quality poster as the backdrop; the UI overlays and blurs beautifully
      backdropUrl = posterUrl;
    }

    if (!posterUrl) {
      posterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
    }
    if (!backdropUrl) {
      backdropUrl = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
    }

    const result = { posterUrl, backdropUrl };
    mediaImageCache.set(cacheKey, result);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/media-images:', error);
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
