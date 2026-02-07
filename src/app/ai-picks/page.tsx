"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { Star, Sparkles, Brain, TrendingUp, User, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import StarRating from "@/components/ui/StarRating";
import FilmCard from "@/components/ui/FilmCard";
import Carousel from "@/components/ui/Carousel";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  films,
  collections,
  userData,
  moodOptions,
  genreColors,
  getFilmById,
  getCollectionFilms,
  getSimilarFilms,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Film, Genre, MoodOption } from "@/lib/types";

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ================================================================
   ANIMATED MATCH PERCENTAGE
   ================================================================ */
function AnimatedPercentage({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="gradient-text-gold font-heading text-2xl font-bold">
      {value}%
    </span>
  );
}

/* ================================================================
   1. HERO SECTION
   ================================================================ */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden film-grain">
      {/* Ambient animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(at 40% 20%, #8b5cf620 0px, transparent 50%), radial-gradient(at 80% 70%, #3b82f620 0px, transparent 50%), radial-gradient(at 20% 80%, #6d28d915 0px, transparent 50%), radial-gradient(at 70% 30%, #a78bfa10 0px, transparent 40%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.7, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary layer with subtle position shift */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(at 60% 50%, #8b5cf610 0px, transparent 60%), radial-gradient(at 30% 60%, #3b82f615 0px, transparent 50%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Darkened base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/50 via-transparent to-deep-black z-[1]" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-violet-light" />
          <span className="text-xs uppercase tracking-[0.3em] text-violet-light font-medium">
            Personalized for you
          </span>
          <Sparkles className="w-5 h-5 text-violet-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-6"
          style={{ textShadow: "0 0 60px rgba(139,92,246,0.2)" }}
        >
          Curated For You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered recommendations based on your taste
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-violet/40 to-transparent"
        />
      </div>
    </section>
  );
}

/* ================================================================
   2. MOOD PICKER SECTION
   ================================================================ */
function MoodPickerSection() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const selectedMoodOption = useMemo(
    () => moodOptions.find((m) => m.id === selectedMood),
    [selectedMood]
  );

  const filteredFilms = useMemo(() => {
    if (!selectedMoodOption) return [];
    return films.filter((film) =>
      selectedMoodOption.genres.includes(film.genre)
    );
  }, [selectedMoodOption]);

  const handleMoodClick = (moodId: string) => {
    setSelectedMood((prev) => (prev === moodId ? null : moodId));
  };

  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet/5 rounded-full blur-[120px]" />
      </div>

      <SectionHeader
        title="What are you in the mood for?"
        subtitle="Select a mood and discover films tailored to your vibe"
      />

      {/* Mood Cards Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10 mb-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {moodOptions.map((mood) => {
          const isSelected = selectedMood === mood.id;
          const hasSelection = selectedMood !== null;

          return (
            <motion.button
              key={mood.id}
              variants={staggerItem}
              onClick={() => handleMoodClick(mood.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "glass rounded-xl p-5 cursor-pointer text-left transition-all duration-300",
                isSelected && "ring-2 ring-violet bg-violet/10",
                hasSelection && !isSelected && "opacity-60"
              )}
            >
              <span className="text-3xl block mb-2">{mood.emoji}</span>
              <h3 className="font-heading font-bold text-lg text-white mb-1">
                {mood.label}
              </h3>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                {mood.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {mood.genres.map((genre) => (
                  <span
                    key={genre}
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                      genreColors[genre]
                    )}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Filtered Films */}
      <div className="relative z-10 min-h-[200px]">
        <AnimatePresence mode="wait">
          {selectedMood === null ? (
            <motion.div
              key="no-mood"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center py-16"
            >
              <div className="text-center">
                <Brain className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-600 text-sm font-medium">
                  Select a mood to discover films
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedMood}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Results header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-violet/30 to-transparent" />
                <span className="text-sm text-zinc-400">
                  <span className="text-violet-light font-bold">
                    {filteredFilms.length}
                  </span>{" "}
                  films match your mood
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-violet/30 to-transparent" />
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filteredFilms.map((film, index) => (
                    <motion.div
                      key={film.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                      <Link href={`/film/${film.id}`} className="block group">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                          {/* Poster gradient */}
                          <div
                            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                            style={{ background: film.posterGradient }}
                          />

                          {/* Title overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
                            <h4 className="font-heading font-bold text-white text-lg leading-tight">
                              {film.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1">
                              {film.year} &middot; {film.director}
                            </p>
                          </div>

                          {/* Rating badge */}
                          <div className="absolute top-2 right-2 z-20 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="w-3 h-3 text-gold fill-gold" />
                            <span className="text-[11px] font-bold text-gold">
                              {film.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================
   3. CURATED COLLECTIONS SECTION
   ================================================================ */
function CuratedCollectionsSection() {
  return (
    <section className="relative py-16 sm:py-24">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[400px] bg-electric-blue/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-violet/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <SectionHeader
          title="Curated Collections"
          subtitle="AI-assembled film journeys for every cinematic appetite"
        />
      </div>

      <div className="space-y-16 relative z-10">
        {collections.map((collection, colIdx) => {
          const collectionFilms = getCollectionFilms(collection);

          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: colIdx * 0.15,
                ease: "easeOut",
              }}
              className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20"
            >
              {/* Collection header with left accent border */}
              <div className="border-l-2 border-violet/30 pl-6 mb-6">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {collection.name}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  {collection.description}
                </p>
              </div>

              {/* Carousel of films */}
              <Carousel>
                {collectionFilms.map((film, filmIdx) => (
                  <div key={film.id} style={{ scrollSnapAlign: "start" }}>
                    <FilmCard film={film} variant="large" index={filmIdx} />
                  </div>
                ))}
              </Carousel>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================
   4. "BECAUSE YOU WATCHED" SECTION
   ================================================================ */
function BecauseYouWatchedSection() {
  // Pick the first 2 rated films
  const ratedFilmEntries = userData.ratings.slice(0, 2);

  const watchedFilms = ratedFilmEntries
    .map((entry) => getFilmById(entry.filmId))
    .filter(Boolean) as Film[];

  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-violet/5 rounded-full blur-[130px]" />
      </div>

      <SectionHeader
        title="Because You Watched"
        subtitle="Films we think you will love based on your history"
      />

      <div className="space-y-16 relative z-10">
        {watchedFilms.map((watchedFilm, sectionIdx) => {
          // Find similar films by matching genre
          const similarFilms = getSimilarFilms(watchedFilm, 4);

          return (
            <motion.div
              key={watchedFilm.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: sectionIdx * 0.2 }}
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ background: watchedFilm.posterGradient }}
                />
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                    Because you watched{" "}
                    <span className="gradient-text">{watchedFilm.title}</span>
                  </h3>
                </div>
              </div>

              {/* Recommendation cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {similarFilms.map((film, cardIdx) => {
                  // Deterministic match score: (film.rating * 20 + film.runtime % 10)
                  const rawScore = film.rating * 20 + (film.runtime % 10);
                  const matchScore = Math.min(
                    97,
                    Math.max(82, Math.round(rawScore))
                  );

                  // Pick a representative mood tag
                  const primaryMoodTag =
                    film.moodTags[0] || "cinematic";

                  return (
                    <motion.div
                      key={film.id}
                      variants={staggerItem}
                      className="glass rounded-xl p-4 hover:border-violet/30 transition-all duration-300 group"
                    >
                      <div className="flex gap-4">
                        {/* Small poster square */}
                        <Link href={`/film/${film.id}`} className="flex-shrink-0">
                          <div
                            className="w-16 h-16 rounded-lg transition-transform duration-300 group-hover:scale-105"
                            style={{ background: film.posterGradient }}
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/film/${film.id}`}>
                            <h4 className="font-heading font-bold text-white text-sm leading-tight group-hover:text-violet-light transition-colors duration-200 truncate">
                              {film.title}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                                genreColors[film.genre]
                              )}
                            >
                              {film.genre}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-gold fill-gold" />
                              <span className="text-[11px] font-bold text-gold">
                                {film.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Match score */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <AnimatedPercentage target={matchScore} />
                          <span className="text-[10px] text-zinc-500 ml-0.5">
                            match
                          </span>
                        </div>
                      </div>

                      {/* Reasoning */}
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                        Strong match for {film.genre.toLowerCase()} fans who
                        enjoy {primaryMoodTag} stories
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================
   5. TASTE PROFILE SECTION
   ================================================================ */
function TasteProfileSection() {
  // Calculate genre counts from user's watchlist + rated films
  const allUserFilmIds = [
    ...userData.watchlist,
    ...userData.ratings.map((r) => r.filmId),
  ];
  // Deduplicate
  const uniqueFilmIds = Array.from(new Set(allUserFilmIds));
  const userFilms = uniqueFilmIds
    .map((id) => getFilmById(id))
    .filter(Boolean) as Film[];

  // Genre counts
  const genreCounts: Record<string, number> = {};
  userFilms.forEach((film) => {
    genreCounts[film.genre] = (genreCounts[film.genre] || 0) + 1;
  });

  // Radar chart data: 6 axes
  const radarAxes: Genre[] = [
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Thriller",
    "Romance",
  ];
  const maxCount = Math.max(...Object.values(genreCounts), 1);
  const radarData = radarAxes.map((genre) => ({
    genre,
    value: Math.round(((genreCounts[genre] || 0) / maxCount) * 100),
  }));

  // Top 3 genres
  const sortedGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Preferred mood tags: collect from user's watchlist/rated films, get unique top 5
  const allMoodTags: string[] = [];
  userFilms.forEach((film) => {
    film.moodTags.forEach((tag) => allMoodTags.push(tag));
  });
  const tagCounts: Record<string, number> = {};
  allMoodTags.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  const topMoodTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);

  // Average rating from user's ratings
  const avgRating =
    userData.ratings.reduce((sum, r) => sum + r.rating, 0) /
    userData.ratings.length;

  // Mood tag pill colors
  const tagColors = [
    "bg-violet/20 text-violet-light border-violet/30",
    "bg-electric-blue/20 text-blue-400 border-electric-blue/30",
    "bg-gold/20 text-gold-light border-gold/30",
    "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ];

  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-violet/5 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-electric-blue/3 rounded-full blur-[100px]" />
      </div>

      <SectionHeader title="Your Taste Profile" subtitle="A cinematic portrait of your preferences" />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        {/* Left: Radar Chart */}
        <motion.div variants={fadeInUp} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-violet-light" />
            <h3 className="font-heading text-lg font-bold text-white">
              Genre Affinity
            </h3>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid
                  stroke="rgba(139, 92, 246, 0.15)"
                  strokeDasharray="3 3"
                />
                <PolarAngleAxis
                  dataKey="genre"
                  tick={{
                    fill: "#a1a1aa",
                    fontSize: 12,
                    fontFamily: "var(--font-body)",
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Taste"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#8b5cf6"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right: Taste summary card */}
        <motion.div variants={fadeInUp} className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-4 h-4 text-violet-light" />
            <h3 className="font-heading text-lg font-bold text-white">
              Your Taste Profile
            </h3>
          </div>

          {/* Top Genres */}
          <div className="mb-6">
            <span className="font-heading text-xs uppercase tracking-widest text-zinc-500 mb-3 block">
              Top Genres
            </span>
            <div className="space-y-3">
              {sortedGenres.map(([genre, count], idx) => {
                const percentage = Math.round(
                  (count / uniqueFilmIds.length) * 100
                );
                return (
                  <div key={genre}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={cn(
                          "text-xs font-medium px-2.5 py-0.5 rounded-full border",
                          genreColors[genre]
                        )}
                      >
                        {genre}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {count} films &middot; {percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-charcoal-light rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            idx === 0
                              ? "linear-gradient(90deg, #8b5cf6, #3b82f6)"
                              : idx === 1
                              ? "linear-gradient(90deg, #6d28d9, #8b5cf6)"
                              : "linear-gradient(90deg, #475569, #64748b)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + idx * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Favorite Decade */}
          <div className="mb-6">
            <span className="font-heading text-xs uppercase tracking-widest text-zinc-500 mb-2 block">
              Favorite Decade
            </span>
            <span className="font-heading text-2xl font-bold gradient-text">
              2020s
            </span>
          </div>

          {/* Preferred Mood Tags */}
          <div className="mb-6">
            <span className="font-heading text-xs uppercase tracking-widest text-zinc-500 mb-3 block">
              Preferred Moods
            </span>
            <div className="flex flex-wrap gap-2">
              {topMoodTags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 rounded-full border",
                    tagColors[idx % tagColors.length]
                  )}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Average Rating */}
          <div>
            <span className="font-heading text-xs uppercase tracking-widest text-zinc-500 mb-2 block">
              Average Rating
            </span>
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} size="md" showValue />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   MAIN AI PICKS PAGE
   ================================================================ */
export default function AIPicksPage() {
  return (
    <div className="bg-deep-black min-h-screen">
      <HeroSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <MoodPickerSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <CuratedCollectionsSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <BecauseYouWatchedSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <TasteProfileSection />

      {/* Bottom spacer with fade */}
      <div className="h-24 bg-gradient-to-b from-transparent to-deep-black" />
    </div>
  );
}
