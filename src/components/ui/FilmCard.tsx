"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import { Film } from "@/lib/types";
import { genreColors } from "@/lib/data";

interface FilmCardProps {
  film: Film;
  variant?: "default" | "large";
  index?: number;
}

export default function FilmCard({ film, variant = "default", index = 0 }: FilmCardProps) {
  const isLarge = variant === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`group relative flex-shrink-0 ${isLarge ? "w-56 sm:w-64" : "w-40 sm:w-48"}`}
    >
      <Link href={`/film/${film.id}`} className="block">
        {/* Poster */}
        <div
          className={`relative overflow-hidden rounded-lg ${isLarge ? "aspect-[2/3]" : "aspect-[2/3]"}`}
        >
          {/* Gradient Background */}
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{ background: film.posterGradient }}
          />

          {/* Title Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10">
            <h3
              className={`font-heading font-bold text-white leading-tight ${isLarge ? "text-lg" : "text-sm"}`}
            >
              {film.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{film.year}</p>
            {isLarge && (
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {film.aiSummary.split(".")[0]}.
              </p>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 z-20 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-[10px] font-bold text-gold">
              {film.rating.toFixed(1)}
            </span>
          </div>

          {/* Curtain Lift Hover Reveal */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="bg-charcoal/95 backdrop-blur-sm p-3 border-t border-violet/20">
              <span
                className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${genreColors[film.genre]}`}
              >
                {film.genre}
              </span>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">{film.runtime}min</span>
                <span className="text-[10px] font-medium text-violet-light">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
