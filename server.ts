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
