"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-7 h-7",
};

export default function StarRating({
  rating = 0,
  maxStars = 5,
  interactive = false,
  onRate,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [lockedRating, setLockedRating] = useState(rating);
  const [justClicked, setJustClicked] = useState<number | null>(null);

  const displayRating = hoverRating || lockedRating || rating;

  const handleClick = (starIndex: number) => {
    if (!interactive) return;
    setLockedRating(starIndex);
    setJustClicked(starIndex);
    onRate?.(starIndex);

    setTimeout(() => setJustClicked(null), 600);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const starNum = i + 1;
        const isFilled = starNum <= Math.floor(displayRating);
        const isPartial =
          !isFilled && starNum === Math.ceil(displayRating) && displayRating % 1 !== 0;
        const fillPercent = isPartial ? (displayRating % 1) * 100 : isFilled ? 100 : 0;

        return (
          <motion.button
            key={i}
            type="button"
            disabled={!interactive}
            className={`relative ${interactive ? "cursor-pointer" : "cursor-default"} focus:outline-none`}
            onMouseEnter={() => interactive && setHoverRating(starNum)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => handleClick(starNum)}
            animate={
              justClicked !== null && starNum <= justClicked
                ? {
                    scale: [1, 1.4, 1],
                    transition: { delay: i * 0.06, duration: 0.35 },
                  }
                : { scale: 1 }
            }
          >
            <Star
              className={`${sizeMap[size]} text-zinc-700 transition-colors duration-150`}
              strokeWidth={1.5}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                className={`${sizeMap[size]} text-gold fill-gold`}
                strokeWidth={1.5}
              />
            </div>
          </motion.button>
        );
      })}
      {showValue && displayRating > 0 && (
        <span className="ml-1.5 text-sm font-medium text-gold">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
