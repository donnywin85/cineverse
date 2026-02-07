"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  Calendar,
  User,
  Star,
} from "lucide-react";
import { getFilmById, getSimilarFilms, genreColors } from "@/lib/data";
import { cn, formatRuntime, formatRating } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import TypewriterText from "@/components/ui/TypewriterText";
import FilmCard from "@/components/ui/FilmCard";
import Carousel from "@/components/ui/Carousel";
import SectionHeader from "@/components/ui/SectionHeader";

/* ================================================================
   MOOD TAG COLORS
   ================================================================ */

const moodTagStyles: Record<string, string> = {
  "mind-bending": "bg-violet/20 text-violet-light border-violet/30",
  cerebral: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  dystopian: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  heartwarming: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  contemplative: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  bittersweet: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  intense: "bg-red-500/20 text-red-400 border-red-500/30",
  stylish: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  adrenaline: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "feel-good": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  charming: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  lighthearted: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  dark: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  "spine-chilling": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  atmospheric: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  gothic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  witty: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  romantic: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  beautiful: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  inspiring: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  powerful: "bg-red-500/20 text-red-300 border-red-500/30",
  epic: "bg-violet/20 text-violet-light border-violet/30",
  haunting: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "slow-burn": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  original: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "visually-stunning": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  emotional: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  uplifting: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  magical: "bg-violet/20 text-violet-light border-violet/30",
  tense: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  philosophical: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  hilarious: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  chaotic: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

function getMoodStyle(tag: string): string {
  return moodTagStyles[tag] || "bg-violet/20 text-violet-light border-violet/30";
}

/* ================================================================
   AVATAR COLOR GENERATOR
   ================================================================ */

const avatarGradients = [
  "linear-gradient(135deg, #8b5cf6, #3b82f6)",
  "linear-gradient(135deg, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #3b82f6, #10b981)",
  "linear-gradient(135deg, #f97316, #eab308)",
  "linear-gradient(135deg, #6d28d9, #ec4899)",
  "linear-gradient(135deg, #10b981, #3b82f6)",
  "linear-gradient(135deg, #ef4444, #f97316)",
  "linear-gradient(135deg, #8b5cf6, #06b6d4)",
];

function getAvatarGradient(index: number): string {
  return avatarGradients[index % avatarGradients.length];
}

function getInitials(name: string): string {
  const parts = name.replace(/Voice:\s*/i, "").trim().split(" ");
  if (parts.length >= 2) return parts[0][0] + parts[parts.length - 1][0];
  return parts[0][0];
}

/* ================================================================
   FILM DETAIL PAGE
   ================================================================ */

export default function FilmDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const film = getFilmById(id);

  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  if (!film) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-white mb-2">
              Film Not Found
            </h1>
            <p className="text-zinc-500 mb-6">
              The film you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-violet-light hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Discover
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const similarFilms = getSimilarFilms(film);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    setRatingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-deep-black">
      {/* ====== BACK BUTTON (fixed) ====== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed top-20 left-4 sm:left-6 z-40"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:border-violet/30 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-sm text-zinc-400 group-hover:text-white transition-colors hidden sm:inline">
            Back to Discover
          </span>
        </Link>
      </motion.div>

      {/* ====== HERO ====== */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden film-grain vignette">
        {/* Gradient background */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ background: film.posterGradient }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent z-[6]" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/60 to-transparent z-[6]" />

        {/* Film info overlay - positioned at bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16">
          <div className="max-w-4xl">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05]"
              style={{
                textShadow:
                  "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.15), 0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              {film.title}
            </motion.h1>

            {/* Meta row: year, runtime, genre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mt-4 sm:mt-5"
            >
              <div className="flex items-center gap-1.5 text-zinc-300 text-sm">
                <Calendar className="w-4 h-4 text-zinc-500" />
                {film.year}
              </div>
              <span className="text-zinc-600">&middot;</span>
              <div className="flex items-center gap-1.5 text-zinc-300 text-sm">
                <Clock className="w-4 h-4 text-zinc-500" />
                {formatRuntime(film.runtime)}
              </div>
              <span className="text-zinc-600">&middot;</span>
              <span
                className={cn(
                  "inline-block text-xs font-medium px-3 py-1 rounded-full border",
                  genreColors[film.genre]
                )}
              >
                {film.genre}
              </span>
              <span className="text-zinc-600">&middot;</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm font-semibold text-gold">
                  {formatRating(film.rating)}
                </span>
              </div>
            </motion.div>

            {/* Director */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-3 text-zinc-300 text-sm sm:text-base"
            >
              <span className="text-zinc-500">Directed by</span>{" "}
              <span className="font-medium text-white">{film.director}</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ====== CONTENT ====== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-8 relative z-30">
          {/* Left column: 2 cols wide */}
          <div className="lg:col-span-2 space-y-8">
            {/* ====== AI REVIEW ====== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass rounded-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-lg bg-violet/10 border border-violet/20">
                  <Sparkles className="w-5 h-5 text-violet-light" />
                </div>
                <h2 className="font-heading text-xl font-bold text-white">
                  AI Analysis
                </h2>
              </div>

              <div className="text-zinc-300 leading-relaxed text-[15px]">
                <TypewriterText
                  text={film.aiSummary}
                  speed={18}
                  className="leading-relaxed"
                />
              </div>

              {/* Mood tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
                {film.moodTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                    className={cn(
                      "inline-block text-xs font-medium px-3 py-1.5 rounded-full border",
                      getMoodStyle(tag)
                    )}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* ====== CAST ====== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="font-heading text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                <User className="w-5 h-5 text-violet-light" />
                Cast
              </h2>
              <Carousel>
                {film.cast.map((actor, i) => (
                  <motion.div
                    key={actor}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center gap-2.5 flex-shrink-0 w-24"
                  >
                    {/* Circular gradient avatar */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-black/30 ring-2 ring-white/10"
                      style={{ background: getAvatarGradient(i) }}
                    >
                      {getInitials(actor)}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white leading-tight">
                        {actor.replace(/Voice:\s*/i, "")}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">Actor</p>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </motion.div>
          </div>

          {/* Right column: 1 col wide */}
          <div className="space-y-8">
            {/* ====== RATING INPUT ====== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                Rate this film
              </h3>
              <div className="flex justify-center mb-3">
                <StarRating
                  rating={userRating}
                  interactive
                  size="lg"
                  onRate={handleRate}
                  showValue
                />
              </div>
              <AnimatePresence>
                {ratingSubmitted && userRating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-sm text-gold mt-3"
                  >
                    You rated this{" "}
                    <span className="font-bold">{userRating}/5</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Stats sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass rounded-xl p-6 space-y-4"
            >
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Film Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Director</span>
                  <span className="text-sm text-white font-medium">
                    {film.director}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Runtime</span>
                  <span className="text-sm text-white font-medium">
                    {formatRuntime(film.runtime)}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Year</span>
                  <span className="text-sm text-white font-medium">
                    {film.year}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Genre</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2.5 py-0.5 rounded-full border",
                      genreColors[film.genre]
                    )}
                  >
                    {film.genre}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    <span className="text-sm font-semibold text-gold">
                      {formatRating(film.rating)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ====== SIMILAR TITLES ====== */}
        {similarFilms.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pb-20"
          >
            <SectionHeader title="Similar Titles" />
            <Carousel>
              {similarFilms.map((f, i) => (
                <FilmCard key={f.id} film={f} variant="large" index={i} />
              ))}
            </Carousel>
          </motion.section>
        )}
      </div>
    </div>
  );
}
