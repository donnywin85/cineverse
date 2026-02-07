export interface Film {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: Genre;
  director: string;
  cast: string[];
  runtime: number;
  aiSummary: string;
  moodTags: string[];
  posterGradient: string;
}

export type Genre =
  | "Action"
  | "Drama"
  | "Sci-Fi"
  | "Comedy"
  | "Thriller"
  | "Horror"
  | "Romance"
  | "Animation";

export interface Collection {
  id: string;
  name: string;
  description: string;
  filmIds: string[];
}

export interface UserRating {
  filmId: string;
  rating: number;
  dateRated: string;
}

export interface UserData {
  watchlist: string[];
  ratings: UserRating[];
  stats: {
    totalHoursWatched: number;
    filmsWatchedThisMonth: number;
    averageRating: number;
    favoriteGenre: Genre;
    totalFilmsWatched: number;
    monthlyActivity: { month: string; count: number }[];
  };
}

export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  genres: Genre[];
  description: string;
}
