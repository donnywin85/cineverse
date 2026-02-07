import { Film, Collection, UserData, MoodOption } from "./types";

export const films: Film[] = [
  {
    id: "1",
    title: "Void Protocol",
    year: 2024,
    rating: 4.7,
    genre: "Sci-Fi",
    director: "Anya Novak",
    cast: ["Marcus Dellacroix", "Leena Sato", "Viktor Holm", "Priya Nair"],
    runtime: 148,
    aiSummary:
      "A quantum physicist discovers that reality is a layered simulation, each tier more hostile than the last. As she descends through recursive dimensions, the line between creator and creation dissolves into existential terror. A masterwork of cerebral science fiction that rewards multiple viewings.",
    moodTags: ["mind-bending", "cerebral", "dystopian"],
    posterGradient: "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #0f172a 100%)",
  },
  {
    id: "2",
    title: "The Last Meridian",
    year: 2023,
    rating: 4.5,
    genre: "Drama",
    director: "Samuel Beaumont",
    cast: ["Clara Fontaine", "Idris Kenyatta", "Maren Voss"],
    runtime: 137,
    aiSummary:
      "Three strangers converge at the edge of a dying coastal town, each carrying secrets heavy enough to sink them. Their intersecting stories weave a tapestry of loss, redemption, and the quiet courage it takes to start again. Beaumont's direction is painterly and unhurried.",
    moodTags: ["heartwarming", "contemplative", "bittersweet"],
    posterGradient: "linear-gradient(135deg, #1c1917 0%, #b45309 50%, #292524 100%)",
  },
  {
    id: "3",
    title: "Neon Ronin",
    year: 2024,
    rating: 4.3,
    genre: "Action",
    director: "Kenji Takahashi",
    cast: ["Ryo Tanaka", "Sofia Guerrero", "Dmitri Volkov", "Amara Osei"],
    runtime: 126,
    aiSummary:
      "In a rain-soaked cyberpunk Tokyo, a disgraced bodyguard takes one final contract that plunges him into a war between rival AI corporations. Every frame pulses with neon-drenched choreography and philosophical weight. The action sequences alone redefine the genre.",
    moodTags: ["intense", "stylish", "adrenaline"],
    posterGradient: "linear-gradient(135deg, #0c0a09 0%, #dc2626 50%, #1e1b4b 100%)",
  },
  {
    id: "4",
    title: "Sunlit Detour",
    year: 2023,
    rating: 4.1,
    genre: "Comedy",
    director: "Margot Chevalier",
    cast: ["Felix Andersson", "Luna Park", "Roberto Diaz"],
    runtime: 104,
    aiSummary:
      "A perfectionist wedding planner accidentally ends up on the wrong flight and lands in a remote village where nothing goes according to plan—including falling for the local mechanic. A fizzy, sun-drenched comedy with genuine emotional depth beneath the laughs.",
    moodTags: ["feel-good", "charming", "lighthearted"],
    posterGradient: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 50%, #92400e 100%)",
  },
  {
    id: "5",
    title: "Hollow Saints",
    year: 2024,
    rating: 4.8,
    genre: "Thriller",
    director: "Irina Volskaya",
    cast: ["Caspian Rhys", "Nadia Petrova", "Oscar Lindgren", "Yuki Morimoto"],
    runtime: 141,
    aiSummary:
      "A celebrated forensic psychologist realizes her latest patient's confessions mirror crimes that haven't happened yet. The deeper she investigates, the more her own past becomes the primary evidence. A labyrinthine thriller that trusts its audience's intelligence completely.",
    moodTags: ["mind-bending", "intense", "dark"],
    posterGradient: "linear-gradient(135deg, #0f172a 0%, #475569 50%, #020617 100%)",
  },
  {
    id: "6",
    title: "The Bone Garden",
    year: 2023,
    rating: 4.4,
    genre: "Horror",
    director: "Ezra Blackwell",
    cast: ["Sienna Marsh", "Tobias Crane", "Lila Aronov"],
    runtime: 118,
    aiSummary:
      "An archaeologist unearths a Victorian garden where the flowers grow from human remains—and the dead are not finished growing. Blackwell crafts atmospheric dread with patience, letting each revelation bloom into genuine, visceral horror. Not for the faint of heart.",
    moodTags: ["spine-chilling", "atmospheric", "gothic"],
    posterGradient: "linear-gradient(135deg, #1a0f0f 0%, #7f1d1d 50%, #0a0a0a 100%)",
  },
  {
    id: "7",
    title: "Parallax Hearts",
    year: 2024,
    rating: 4.2,
    genre: "Romance",
    director: "Elena Vasquez",
    cast: ["Julian Cross", "Amira Hassan", "Theo Chen"],
    runtime: 119,
    aiSummary:
      "Two rival architects competing for the same commission discover their anonymous online confidant is each other. A modern romance that understands the architecture of connection—how we build walls and, occasionally, doors. Witty, warm, and architecturally gorgeous.",
    moodTags: ["heartwarming", "witty", "romantic"],
    posterGradient: "linear-gradient(135deg, #4c1d95 0%, #ec4899 50%, #7c2d12 100%)",
  },
  {
    id: "8",
    title: "Chromatic",
    year: 2024,
    rating: 4.9,
    genre: "Animation",
    director: "Suki Hayashi",
    cast: ["Voice: Iris Kwan", "Voice: Omar Sterling", "Voice: Fern Lightly"],
    runtime: 98,
    aiSummary:
      "In a world where emotions manifest as colors, a young artist born in grayscale must paint her way to feeling. Hayashi's animation team creates visuals so stunning they redefine what the medium can achieve. A masterpiece of visual storytelling that speaks to every age.",
    moodTags: ["visually-stunning", "emotional", "uplifting"],
    posterGradient: "linear-gradient(135deg, #312e81 0%, #6d28d9 30%, #2dd4bf 70%, #fbbf24 100%)",
  },
  {
    id: "9",
    title: "Signal Lost",
    year: 2023,
    rating: 4.0,
    genre: "Sci-Fi",
    director: "Marcus Webb",
    cast: ["Stellan Dufresne", "Kira Nakamura", "Bodhi Patel", "Elsa Thornton"],
    runtime: 155,
    aiSummary:
      "The crew of a deep-space relay station intercepts a message from a civilization that went extinct millennia ago—but the message is addressed to them by name. A slow-burn cosmic mystery that builds to a shattering climax about the nature of time and memory.",
    moodTags: ["cerebral", "haunting", "epic"],
    posterGradient: "linear-gradient(135deg, #020617 0%, #1e3a5f 50%, #0d1b2a 100%)",
  },
  {
    id: "10",
    title: "Bitter Honey",
    year: 2024,
    rating: 4.6,
    genre: "Drama",
    director: "Ousmane Diallo",
    cast: ["Celeste Morin", "Kwame Asante", "Ingrid Solheim"],
    runtime: 132,
    aiSummary:
      "A beekeeper in rural Senegal fights to save her ancestral land from a mining corporation, armed only with community bonds and stubborn grace. Diallo captures landscapes and faces with equal reverence, creating an intimate epic about what we owe the earth and each other.",
    moodTags: ["inspiring", "contemplative", "powerful"],
    posterGradient: "linear-gradient(135deg, #422006 0%, #ca8a04 50%, #1c1917 100%)",
  },
  {
    id: "11",
    title: "Fracture State",
    year: 2024,
    rating: 4.4,
    genre: "Action",
    director: "Nikolai Petrov",
    cast: ["Axel Storm", "Zara Okonkwo", "Henrik Larsen"],
    runtime: 134,
    aiSummary:
      "When a seismic weapon test goes wrong, a geological engineer and a special forces operative must cross a continent that is literally breaking apart. Petrov stages action at tectonic scale—cities splitting in real time—while keeping the human stakes intimate and urgent.",
    moodTags: ["adrenaline", "epic", "intense"],
    posterGradient: "linear-gradient(135deg, #1e1e1e 0%, #ef4444 40%, #f97316 100%)",
  },
  {
    id: "12",
    title: "The Understudies",
    year: 2023,
    rating: 3.9,
    genre: "Comedy",
    director: "Patrick Holloway",
    cast: ["Bea Kingston", "Miles Okoro", "Tanya Bergström", "Raj Kapoor"],
    runtime: 111,
    aiSummary:
      "Four chronically overlooked backup actors at a prestigious theater conspire to sabotage the leads and claim their spotlight. What begins as a screwball caper evolves into a surprisingly tender meditation on ambition, friendship, and the roles we play offstage.",
    moodTags: ["feel-good", "witty", "charming"],
    posterGradient: "linear-gradient(135deg, #581c87 0%, #c084fc 50%, #fef08a 100%)",
  },
  {
    id: "13",
    title: "Whisperwood",
    year: 2024,
    rating: 4.7,
    genre: "Horror",
    director: "Morrigan Falk",
    cast: ["Hazel Brynn", "Corin Ashford", "Petra Engel"],
    runtime: 123,
    aiSummary:
      "A folklore researcher retreats to an isolated Scandinavian forest to study ancient myths, only to discover the myths are studying her back. Falk builds terror through sound design and negative space, proving that what you don't see is infinitely more frightening.",
    moodTags: ["spine-chilling", "atmospheric", "slow-burn"],
    posterGradient: "linear-gradient(135deg, #052e16 0%, #166534 50%, #0a0a0a 100%)",
  },
  {
    id: "14",
    title: "Daybreak Equation",
    year: 2023,
    rating: 4.3,
    genre: "Sci-Fi",
    director: "Anya Novak",
    cast: ["Marcus Dellacroix", "Zhen Li", "Astrid Holm"],
    runtime: 139,
    aiSummary:
      "A mathematician discovers an equation that predicts exactly when each person will have their most pivotal day. When she calculates her own, she has 72 hours to decide whether knowing the future is a gift or a prison. Novak's follow-up to Void Protocol is equally mesmerizing.",
    moodTags: ["mind-bending", "philosophical", "emotional"],
    posterGradient: "linear-gradient(135deg, #0c4a6e 0%, #38bdf8 50%, #fef3c7 100%)",
  },
  {
    id: "15",
    title: "Velvet Reckoning",
    year: 2024,
    rating: 4.5,
    genre: "Thriller",
    director: "Carmen Reyes",
    cast: ["Dominic Ashworth", "Valentina Cruz", "Jasper Wren", "Mei Tanaka"],
    runtime: 145,
    aiSummary:
      "A retired jewel thief is blackmailed into one last heist—stealing a painting from the private collection of the crime lord who betrayed her. Reyes directs with velvet precision, every scene draped in tension and impeccable style. The final act is a masterclass in misdirection.",
    moodTags: ["stylish", "intense", "cerebral"],
    posterGradient: "linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #b91c1c 100%)",
  },
  {
    id: "16",
    title: "Paper Lanterns",
    year: 2024,
    rating: 4.6,
    genre: "Romance",
    director: "Hana Mizuki",
    cast: ["Sora Ito", "Gabriel Restrepo", "Chloe Beaumont"],
    runtime: 115,
    aiSummary:
      "Two pen pals who've written to each other for a decade finally agree to meet at a lantern festival in Kyoto—but neither looks like the other expects. Mizuki crafts a love story illuminated by paper and firelight, where vulnerability becomes the most radical act of courage.",
    moodTags: ["heartwarming", "romantic", "beautiful"],
    posterGradient: "linear-gradient(135deg, #7c2d12 0%, #fb923c 40%, #fde68a 100%)",
  },
  {
    id: "17",
    title: "Iron Chorus",
    year: 2023,
    rating: 4.1,
    genre: "Action",
    director: "Kenji Takahashi",
    cast: ["Ryo Tanaka", "Nia Okafor", "Sebastian Varga"],
    runtime: 131,
    aiSummary:
      "In a near-future where sound is weaponized, a deaf soldier leads a rebellion using the one frequency the regime cannot control: silence. Takahashi inverts the action genre's sonic obsession to create something thrillingly original. The silent battle sequences are breathtaking.",
    moodTags: ["intense", "original", "powerful"],
    posterGradient: "linear-gradient(135deg, #18181b 0%, #a1a1aa 40%, #3f3f46 100%)",
  },
  {
    id: "18",
    title: "The Cartographer's Dream",
    year: 2024,
    rating: 4.8,
    genre: "Animation",
    director: "Luca Fontana",
    cast: ["Voice: Pearl Adams", "Voice: Diego Santos", "Voice: Minako Abe"],
    runtime: 106,
    aiSummary:
      "An elderly mapmaker discovers her childhood drawings have become a real, living world—one that's now in danger of being erased. Fontana blends hand-drawn and digital animation to create a universe of staggering beauty. A love letter to imagination and the maps we carry in our hearts.",
    moodTags: ["visually-stunning", "emotional", "magical"],
    posterGradient: "linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 40%, #fcd34d 70%, #6d28d9 100%)",
  },
  {
    id: "19",
    title: "Cold Geometry",
    year: 2023,
    rating: 4.2,
    genre: "Thriller",
    director: "Henrik Strand",
    cast: ["Elsa Thornton", "Viktor Holm", "Nadia Petrova"],
    runtime: 128,
    aiSummary:
      "An architect realizes her award-winning building was designed to be a trap—and the first tenants are moving in tomorrow. Strand constructs suspense with the precision of a blueprint, where every corridor leads deeper into paranoia. Claustrophobia has never been so elegantly rendered.",
    moodTags: ["cerebral", "tense", "dark"],
    posterGradient: "linear-gradient(135deg, #0f172a 0%, #64748b 50%, #1e293b 100%)",
  },
  {
    id: "20",
    title: "Monsoon Wedding Crashers",
    year: 2024,
    rating: 3.8,
    genre: "Comedy",
    director: "Anika Sharma",
    cast: ["Dev Patel Jr.", "Fatima Al-Rashid", "Leo Marchetti", "Priya Nair"],
    runtime: 108,
    aiSummary:
      "Three best friends accidentally RSVP to the wrong destination wedding and decide to play along rather than admit their mistake. As the monsoon rolls in and secrets pour out, chaos becomes the best wedding gift of all. A riotous ensemble comedy with genuine heart.",
    moodTags: ["hilarious", "feel-good", "chaotic"],
    posterGradient: "linear-gradient(135deg, #365314 0%, #84cc16 40%, #fbbf24 70%, #f97316 100%)",
  },
];

export const collections: Collection[] = [
  {
    id: "col-1",
    name: "Mind-Bending Sci-Fi",
    description: "Films that challenge perception, bend reality, and leave you questioning everything you thought you knew.",
    filmIds: ["1", "9", "14", "5", "19"],
  },
  {
    id: "col-2",
    name: "Feel-Good Comfort",
    description: "Warm, uplifting stories perfect for when you need a cinematic hug and a reminder that the world can be beautiful.",
    filmIds: ["4", "7", "12", "16", "20"],
  },
  {
    id: "col-3",
    name: "Edge-of-Seat Thrillers",
    description: "White-knuckle tension from the first frame to the last. Sleep with the lights on.",
    filmIds: ["5", "15", "6", "13", "19"],
  },
  {
    id: "col-4",
    name: "Cinematic Masterpieces",
    description: "The finest achievements in visual storytelling. Every frame a painting, every scene a revelation.",
    filmIds: ["8", "18", "10", "1", "2"],
  },
];

export const userData: UserData = {
  watchlist: ["1", "3", "5", "8", "9", "14", "15", "18"],
  ratings: [
    { filmId: "2", rating: 4.5, dateRated: "2024-12-15" },
    { filmId: "4", rating: 4.0, dateRated: "2024-12-20" },
    { filmId: "7", rating: 4.5, dateRated: "2025-01-03" },
    { filmId: "10", rating: 5.0, dateRated: "2025-01-10" },
    { filmId: "12", rating: 3.5, dateRated: "2025-01-18" },
    { filmId: "16", rating: 4.5, dateRated: "2025-01-25" },
  ],
  stats: {
    totalHoursWatched: 142,
    filmsWatchedThisMonth: 8,
    averageRating: 4.2,
    favoriteGenre: "Sci-Fi",
    totalFilmsWatched: 47,
    monthlyActivity: [
      { month: "Aug", count: 5 },
      { month: "Sep", count: 7 },
      { month: "Oct", count: 9 },
      { month: "Nov", count: 6 },
      { month: "Dec", count: 8 },
      { month: "Jan", count: 8 },
    ],
  },
};

export const moodOptions: MoodOption[] = [
  {
    id: "mind-bending",
    emoji: "🎯",
    label: "Mind-Bending",
    genres: ["Sci-Fi", "Thriller"],
    description: "Reality-warping narratives that challenge perception",
  },
  {
    id: "feel-good",
    emoji: "☀️",
    label: "Feel-Good",
    genres: ["Comedy", "Romance"],
    description: "Warm stories that leave you smiling",
  },
  {
    id: "adrenaline",
    emoji: "⚡",
    label: "Adrenaline Rush",
    genres: ["Action", "Thriller"],
    description: "Heart-pounding action and tension",
  },
  {
    id: "deep-moving",
    emoji: "🎭",
    label: "Deep & Moving",
    genres: ["Drama"],
    description: "Emotionally rich stories with lasting impact",
  },
  {
    id: "spine-chilling",
    emoji: "👻",
    label: "Spine-Chilling",
    genres: ["Horror", "Thriller"],
    description: "Atmospheric terror and supernatural dread",
  },
  {
    id: "visually-stunning",
    emoji: "✨",
    label: "Visually Stunning",
    genres: ["Sci-Fi", "Animation"],
    description: "Breathtaking visual artistry and world-building",
  },
];

export function getFilmById(id: string): Film | undefined {
  return films.find((f) => f.id === id);
}

export function getFilmsByGenre(genre: string): Film[] {
  if (genre === "All") return films;
  return films.filter((f) => f.genre === genre);
}

export function getFilmsByIds(ids: string[]): Film[] {
  return ids.map((id) => films.find((f) => f.id === id)).filter(Boolean) as Film[];
}

export function getSimilarFilms(film: Film, count: number = 5): Film[] {
  return films
    .filter((f) => f.id !== film.id && f.genre === film.genre)
    .slice(0, count);
}

export function getCollectionFilms(collection: Collection): Film[] {
  return getFilmsByIds(collection.filmIds);
}

export const allGenres = [
  "All",
  "Action",
  "Drama",
  "Sci-Fi",
  "Comedy",
  "Thriller",
  "Horror",
  "Romance",
  "Animation",
] as const;

export const genreColors: Record<string, string> = {
  Action: "bg-red-500/20 text-red-400 border-red-500/30",
  Drama: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Sci-Fi": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Comedy: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Thriller: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Horror: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Romance: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Animation: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  All: "bg-white/10 text-white border-white/20",
};
