export type StreamingPlatform = 'Netflix' | 'Amazon Prime' | 'Disney+ Hotstar' | 'Free Cinema';

export interface StreamingLink {
  platform: StreamingPlatform;
  url: string;
  availableRegions: string[]; // e.g., ['US', 'UK', 'IN', 'JP']
  priceTier?: 'Free with Sub' | 'Premium Rent' | 'Included';
}

export interface Review {
  id: string;
  movieId: string;
  userEmail: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Movie {
  id: string;
  title: string;
  type: 'Movie' | 'Series';
  year: number;
  runtimeOrSeasons: string;
  rating: number; // Avg user rating in database
  genres: string[];
  directorOrCreator: string;
  cast: string[];
  synopsis: string;
  criticalAnalysis: string;
  trivia: string[];
  backdropUrl: string;
  posterUrl: string;
  streamingLinks: StreamingLink[];
  productionTrivia?: string;
  seasonsCount?: number;
  trailerYoutubeId?: string;
  isPublicDomain?: boolean;
  fullMovieYoutubeId?: string;
}

export interface UpcomingMovie {
  id: string;
  title: string;
  type: 'Movie' | 'Series';
  expectedRelease: string;
  estimatedBudget: string;
  genres: string[];
  directorOrCreator: string;
  cast: string[];
  synopsis: string;
  hypeMeter: number; // 0-100 percentage
  status: 'Pre-Production' | 'Filming' | 'Post-Production' | 'Teaser Released';
  statusDetails: string;
  backdropUrl: string;
  posterUrl: string;
  behindTheScenesSecrets: string[];
}

export interface UserState {
  ratings: Record<string, number>; // movieId -> rating
  watchlist: string[]; // array of movieIds
  reviews: Record<string, string>; // movieId -> review comment text
  genreClicks: Record<string, number>; // genre -> count of clicks (behavioral tracking)
  clicks: Record<string, number>; // movieId -> count of clicks
  preferredLanguage: string; // 'en' | 'hi' | 'ar' | 'ja' | 'es'
  region: string; // 'US' | 'UK' | 'IN' | 'JP'
  remindedUpcomingIds?: string[]; // persistent 'Remind Me' subscriptions
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedMovies?: string[]; // Movie IDs recommended by AI
  suggestedAction?: {
    type: 'filter_genre' | 'filter_platform' | 'view_movie' | 'reset';
    payload: string;
  };
}
