"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film as FilmIcon,
  Clock,
  Star,
  TrendingUp,
  Search,
  ChevronDown,
  X,
  Bookmark,
  Trash2,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { userData, getFilmsByIds, genreColors } from "@/lib/data";
import { Film } from "@/lib/types";
import StarRating from "@/components/ui/StarRating";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn, formatRating } from "@/lib/utils";

/* ================================================================
   TYPES & CONSTANTS
   ================================================================ */

type FilterTab = "All" | "Watchlist" | "Rated";
type SortOption = "rating" | "date" | "title" | "year";

const PIE_COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#eab308",
  "#ec4899",
  "#10b981",
  "#f97316",
];

const SORT_LABELS: Record<SortOption, string> = {
  rating: "Rating",
  date: "Date Added",
  title: "Title",
  year: "Year",
};

/* ================================================================
   ANIMATED COUNTER HOOK
   ================================================================ */

function useAnimatedCounter(target: number, duration = 1400, decimals = 0) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration, decimals]);

  return value;
}

/* ================================================================
   STAT CARD
   ================================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  decimals = 0,
  suffix = "",
  showStars = false,
  delay = 0,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  showStars?: boolean;
  delay?: number;
}) {
  const animated = useAnimatedCounter(value, 1400, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="glass rounded-xl p-5 border-b-2 border-violet relative overflow-hidden group"
    >
      {/* Subtle ambient glow on hover */}
      <div className="absolute inset-0 bg-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-4 h-4 text-violet-light" />
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
            {label}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-white tabular-nums">
            {decimals > 0 ? animated.toFixed(decimals) : Math.round(animated)}
            {suffix}
          </span>
          {showStars && (
            <div className="mb-0.5">
              <StarRating rating={value} size="sm" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   LIBRARY FILM CARD
   ================================================================ */

function LibraryCard({
  film,
  userRating,
  index,
}: {
  film: Film;
  userRating?: number;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="group relative rounded-xl overflow-hidden bg-charcoal border border-white/5 hover:-translate-y-1 hover:border-l-2 hover:border-l-violet transition-all duration-300"
    >
      <Link href={`/film/${film.id}`} className="block">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: film.posterGradient }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />

          {/* Rating badge */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-[11px] font-bold text-gold">
              {formatRating(film.rating)}
            </span>
          </div>

          {/* Action buttons - fade in on hover */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 bg-violet/90 hover:bg-violet text-white text-xs font-semibold py-2 rounded-lg backdrop-blur-sm transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Star className="w-3.5 h-3.5" />
              Rate
            </button>
            <button
              className="flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg backdrop-blur-sm transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="p-4">
          <h3 className="font-heading font-bold text-white text-sm leading-tight truncate">
            {film.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-zinc-500">{film.year}</span>
            <span
              className={cn(
                "inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border",
                genreColors[film.genre]
              )}
            >
              {film.genre}
            </span>
          </div>

          {/* User rating or "Not rated" */}
          <div className="mt-3 flex items-center gap-1.5">
            {userRating ? (
              <>
                <StarRating rating={userRating} size="sm" />
                <span className="text-xs text-gold font-medium ml-1">
                  {formatRating(userRating)}
                </span>
              </>
            ) : (
              <span className="text-xs text-zinc-600 italic">Not rated</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================================================
   RECHARTS CUSTOM TOOLTIP
   ================================================================ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name?: string }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="text-zinc-400 mb-0.5">{label || payload[0]?.name}</p>
      <p className="text-white font-semibold">{payload[0].value}</p>
    </div>
  );
}

/* ================================================================
   MAIN LIBRARY PAGE
   ================================================================ */

export default function LibraryPage() {
  /* ---- state ---- */
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  /* ---- close sort dropdown on outside click ---- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---- derived data ---- */
  const watchlistFilms = useMemo(
    () => getFilmsByIds(userData.watchlist),
    []
  );
  const ratedFilmIds = useMemo(
    () => userData.ratings.map((r) => r.filmId),
    []
  );
  const ratedFilms = useMemo(
    () => getFilmsByIds(ratedFilmIds),
    [ratedFilmIds]
  );

  /* Map filmId -> user rating */
  const ratingMap = useMemo(() => {
    const m: Record<string, number> = {};
    userData.ratings.forEach((r) => {
      m[r.filmId] = r.rating;
    });
    return m;
  }, []);

  /* Combined unique films */
  const allFilms = useMemo(() => {
    const map = new Map<string, Film>();
    watchlistFilms.forEach((f) => map.set(f.id, f));
    ratedFilms.forEach((f) => map.set(f.id, f));
    return Array.from(map.values());
  }, [watchlistFilms, ratedFilms]);

  /* Filtered films */
  const filteredFilms = useMemo(() => {
    let pool: Film[];
    switch (activeFilter) {
      case "Watchlist":
        pool = watchlistFilms;
        break;
      case "Rated":
        pool = ratedFilms;
        break;
      default:
        pool = allFilms;
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.director.toLowerCase().includes(q) ||
          f.genre.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...pool];
    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "year":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "date":
        // date added: watchlist order, then rated order
        break;
    }

    return sorted;
  }, [activeFilter, sortBy, searchQuery, allFilms, watchlistFilms, ratedFilms]);

  /* ---- Chart data ---- */
  const genreDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    allFilms.forEach((f) => {
      counts[f.genre] = (counts[f.genre] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [allFilms]);

  const ratingDistribution = useMemo(() => {
    const buckets: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    userData.ratings.forEach((r) => {
      const rounded = Math.round(r.rating);
      const clamped = Math.min(5, Math.max(1, rounded));
      buckets[clamped] = (buckets[clamped] || 0) + 1;
    });
    return Object.entries(buckets).map(([stars, count]) => ({
      stars: `${stars} star${Number(stars) > 1 ? "s" : ""}`,
      count,
    }));
  }, []);

  const monthlyActivity = userData.stats.monthlyActivity;

  /* ---- filter tab data ---- */
  const tabs: { label: FilterTab; count: number }[] = [
    { label: "All", count: allFilms.length },
    { label: "Watchlist", count: watchlistFilms.length },
    { label: "Rated", count: ratedFilms.length },
  ];

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <div className="min-h-screen bg-deep-black">
      {/* ====== PAGE HEADER ====== */}
      <section className="relative pt-28 pb-12 px-4 sm:px-8 overflow-hidden">
        {/* Spotlight background */}
        <div className="absolute inset-0 spotlight" />

        {/* Decorative radial rings */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-violet/5 opacity-40 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-violet/10 opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold gradient-text text-center">
              My Library
            </h1>
            <p className="text-center text-zinc-500 mt-3 text-sm sm:text-base tracking-wide">
              {userData.stats.totalHoursWatched} hours watched &middot;{" "}
              {userData.stats.totalFilmsWatched} films rated &middot; Avg rating{" "}
              {formatRating(userData.stats.averageRating)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            icon={FilmIcon}
            label="Total Watched"
            value={userData.stats.totalFilmsWatched}
            delay={0}
          />
          <StatCard
            icon={Clock}
            label="Hours Spent"
            value={userData.stats.totalHoursWatched}
            delay={0.1}
          />
          <StatCard
            icon={Star}
            label="Average Rating"
            value={userData.stats.averageRating}
            decimals={1}
            showStars
            delay={0.2}
          />

          {/* Top Genre - custom card with text instead of counter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="glass rounded-xl p-5 border-b-2 border-violet relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-violet-light" />
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Top Genre
                </span>
              </div>
              <span className="text-2xl font-bold text-white">
                {userData.stats.favoriteGenre}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== FILTER / SORT BAR ====== */}
      <section className="sticky top-16 z-30 bg-deep-black/80 backdrop-blur-xl py-3 mt-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeFilter === tab.label
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {activeFilter === tab.label && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-violet/20 border border-violet/40 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab.label}
                    <span className="ml-1 text-xs text-zinc-600">
                      ({tab.count})
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-violet/30 transition-colors"
              >
                {SORT_LABELS[sortBy]}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    sortOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-40 glass rounded-lg py-1 overflow-hidden"
                  >
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm transition-colors",
                          sortBy === opt
                            ? "text-violet-light bg-violet/10"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {SORT_LABELS[opt]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search input */}
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet/40 transition-all duration-300",
                  searchFocused || searchQuery ? "w-64" : "w-10 sm:w-10"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== FILM GRID ====== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Bookmark className="w-5 h-5 text-violet-light" />
          <h2 className="font-heading text-xl font-bold text-white">
            {activeFilter === "All"
              ? "All Films"
              : activeFilter === "Watchlist"
              ? "My Watchlist"
              : "Rated Films"}
          </h2>
          <span className="text-xs text-zinc-600">
            {filteredFilms.length} film{filteredFilms.length !== 1 ? "s" : ""}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredFilms.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredFilms.map((film, i) => (
                <LibraryCard
                  key={film.id}
                  film={film}
                  userRating={ratingMap[film.id]}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FilmIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">No films match your search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ====== WATCH STATS SECTION ====== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <SectionHeader title="Watch Stats" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* --- Genre Distribution Pie --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-zinc-400 mb-4 tracking-wide">
              Genre Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {genreDistribution.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => (
                    <CustomTooltip
                      active={active}
                      payload={payload as Array<{ value: number; name?: string }>}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {genreDistribution.map((g, idx) => (
                <div key={g.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: PIE_COLORS[idx % PIE_COLORS.length],
                    }}
                  />
                  <span className="text-[10px] text-zinc-500">{g.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Monthly Activity Bar --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-zinc-400 mb-4 tracking-wide">
              Monthly Activity
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyActivity}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <CustomTooltip
                      active={active}
                      payload={payload as Array<{ value: number; name?: string }>}
                      label={label}
                    />
                  )}
                />
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* --- Rating Distribution Horizontal Bar --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-zinc-400 mb-4 tracking-wide">
              Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ratingDistribution} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="stars"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <CustomTooltip
                      active={active}
                      payload={payload as Array<{ value: number; name?: string }>}
                      label={label}
                    />
                  )}
                />
                <Bar
                  dataKey="count"
                  fill="#eab308"
                  radius={[0, 4, 4, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
