"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Plus,
  Sparkles,
  Brain,
  Film as FilmIcon,
  Library,
} from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import TypewriterText from "@/components/ui/TypewriterText";
import FilmCard from "@/components/ui/FilmCard";
import Carousel from "@/components/ui/Carousel";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  films,
  collections,
  allGenres,
  genreColors,
  getFilmsByGenre,
  getFilmsByIds,
  getFilmById,
} from "@/lib/data";
import { cn, formatRuntime } from "@/lib/utils";
import type { Film } from "@/lib/types";

/* ================================================================
   ANIMATED MATCH PERCENTAGE
   ================================================================ */
function AnimatedPercentage({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setValue(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="gradient-text-gold font-heading text-3xl font-bold">
      {value}%
    </span>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */
function HeroSection() {
  const featuredFilm = films[0]; // Void Protocol
  const [watchlistAdded, setWatchlistAdded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden film-grain vignette">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{ background: featuredFilm.posterGradient }}
      />

      {/* Extra atmospheric layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent z-[6]" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-black/70 via-transparent to-deep-black/50 z-[6]" />

      {/* Spotlight glow */}
      <div className="spotlight absolute inset-0 z-[7]" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-violet-light" />
          <span className="text-xs uppercase tracking-[0.25em] text-violet-light font-medium">
            Featured Tonight
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] mb-4"
          style={{
            textShadow: "0 0 40px rgba(139,92,246,0.3)",
          }}
        >
          {featuredFilm.title}
        </motion.h1>

        {/* Year + Genre badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-3 mb-5 flex-wrap"
        >
          <span className="text-sm text-zinc-400 font-medium">
            {featuredFilm.year}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full border",
              genreColors[featuredFilm.genre]
            )}
          >
            {featuredFilm.genre}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-sm text-zinc-400">
            {formatRuntime(featuredFilm.runtime)}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-sm text-zinc-400">
            Dir. {featuredFilm.director}
          </span>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-2xl mb-6"
        >
          <TypewriterText
            text={featuredFilm.aiSummary}
            speed={18}
            className="text-sm sm:text-base text-zinc-300 leading-relaxed"
          />
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-6"
        >
          <StarRating rating={featuredFilm.rating} size="lg" showValue />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center gap-4 flex-wrap"
        >
          {/* Add to Watchlist */}
          <button
            onClick={() => setWatchlistAdded(!watchlistAdded)}
            className={cn(
              "group relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 overflow-hidden",
              watchlistAdded
                ? "bg-violet/20 text-violet-light border border-violet/40"
                : "bg-transparent border border-violet/50 text-white hover:border-violet hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            )}
          >
            {/* Gradient border glow on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-violet-dark via-violet to-electric-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
            <span className="relative flex items-center gap-2">
              <Plus
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  watchlistAdded && "rotate-45"
                )}
              />
              {watchlistAdded ? "On Watchlist" : "Add to Watchlist"}
            </span>
          </button>

          {/* View Details */}
          <Link
            href={`/film/${featuredFilm.id}`}
            className="group px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-violet-dark to-violet text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2">
              <FilmIcon className="w-4 h-4" />
              View Details
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bouncing scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-zinc-500" />
      </motion.div>
    </section>
  );
}

/* ================================================================
   TRENDING NOW SECTION
   ================================================================ */
function TrendingSection() {
  const trendingFilms = films.slice(0, 10);

  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader title="Trending Now" subtitle="What the world is watching right now" />
      <Carousel>
        {trendingFilms.map((film, index) => (
          <div key={film.id} style={{ scrollSnapAlign: "start" }}>
            <FilmCard film={film} variant="large" index={index} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

/* ================================================================
   AI RECOMMENDATIONS SECTION
   ================================================================ */
const recommendations = [
  {
    film: films[0],
    matchPercent: 97,
    reasoning:
      "Because you enjoyed Sci-Fi films with mind-bending mood and cerebral narratives that challenge perception.",
    moods: ["mind-bending", "cerebral", "dystopian"],
  },
  {
    film: films[4],
    matchPercent: 94,
    reasoning:
      "Because you gravitate toward Thriller films with intense psychological tension and dark, layered storytelling.",
    moods: ["mind-bending", "intense", "dark"],
  },
  {
    film: films[7],
    matchPercent: 91,
    reasoning:
      "Because your love for visually-stunning Animation and emotionally rich stories makes this a perfect match.",
    moods: ["visually-stunning", "emotional", "uplifting"],
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function AIRecommendationsSection() {
  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet/5 rounded-full blur-[120px]" />
      </div>

      <SectionHeader
        title="Your Next Watch"
        subtitle="AI-curated picks tailored to your taste profile"
      />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.film.id}
            variants={staggerItem}
            className="group glass rounded-xl overflow-hidden hover:border-violet/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
          >
            <div className="flex h-full">
              {/* Left: Poster gradient */}
              <div className="w-1/3 relative min-h-[260px]">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: rec.film.posterGradient }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/80 z-10" />
                {/* Film title overlay on poster */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                    #{index + 1} Pick
                  </span>
                </div>
              </div>

              {/* Right: Info */}
              <div className="w-2/3 p-5 flex flex-col justify-between">
                <div>
                  {/* Match percentage */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-violet-light" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                        AI Match
                      </span>
                    </div>
                    <AnimatedPercentage target={rec.matchPercent} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
                    {rec.film.title}
                  </h3>

                  {/* Year + Genre */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-zinc-500">{rec.film.year}</span>
                    <span
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                        genreColors[rec.film.genre]
                      )}
                    >
                      {rec.film.genre}
                    </span>
                  </div>

                  {/* Reasoning */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {rec.reasoning}
                  </p>
                </div>

                {/* Mood pills */}
                <div className="flex flex-wrap gap-1.5">
                  {rec.moods.map((mood) => (
                    <span
                      key={mood}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-violet/10 text-violet-light border border-violet/20 font-medium"
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ================================================================
   GENRE EXPLORER SECTION
   ================================================================ */
function GenreExplorerSection() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const filteredFilms = getFilmsByGenre(selectedGenre);

  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader
        title="Explore by Genre"
        subtitle="Dive into any world that calls to you"
      />

      {/* Genre pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2 justify-center mb-10"
      >
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={cn(
              "px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300",
              selectedGenre === genre
                ? "bg-violet text-white border-violet shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105"
                : cn(
                    genreColors[genre],
                    "hover:brightness-125 hover:scale-105"
                  )
            )}
          >
            {genre}
          </button>
        ))}
      </motion.div>

      {/* Film grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredFilms.map((film, index) => (
            <motion.div
              key={film.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
            >
              <FilmCard film={film} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ================================================================
   COLLECTIONS PREVIEW SECTION
   ================================================================ */
function CollectionsSection() {
  return (
    <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <SectionHeader
        title="Curated Collections"
        subtitle="Hand-picked journeys through cinema, crafted by our AI"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {collections.map((collection, colIdx) => {
          const collectionFilms = getFilmsByIds(collection.filmIds);
          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
            >
              <Link href="/ai-picks" className="block group">
                <div className="glass rounded-xl p-6 transition-all duration-500 hover:border-violet/30 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Library className="w-4 h-4 text-violet-light" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
                          Collection
                        </span>
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-violet-light transition-colors duration-300">
                        {collection.name}
                      </h3>
                    </div>

                    {/* Film count badge */}
                    <span className="ml-3 flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet/15 text-violet-light border border-violet/20">
                      {collection.filmIds.length} Films
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-2">
                    {collection.description}
                  </p>

                  {/* Mini poster thumbnails - overlapping circles */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {collectionFilms.slice(0, 5).map((film, i) => (
                        <div
                          key={film.id}
                          className="w-8 h-8 rounded-full border-2 border-charcoal transition-transform duration-300 group-hover:translate-x-0.5"
                          style={{
                            background: film.posterGradient,
                            zIndex: 5 - i,
                          }}
                          title={film.title}
                        />
                      ))}
                    </div>

                    {/* "Explore" hint */}
                    <span className="ml-auto text-xs text-zinc-600 group-hover:text-violet-light transition-colors duration-300 font-medium">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================
   MAIN DISCOVER PAGE
   ================================================================ */
export default function DiscoverPage() {
  return (
    <div className="bg-deep-black min-h-screen">
      <HeroSection />

      {/* Divider glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <TrendingSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <AIRecommendationsSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <GenreExplorerSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet/20 to-transparent" />

      <CollectionsSection />

      {/* Bottom spacer with fade */}
      <div className="h-24 bg-gradient-to-b from-transparent to-deep-black" />
    </div>
  );
}
