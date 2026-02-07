"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 30,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const indexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= speed) {
        lastTimeRef.current = timestamp;
        indexRef.current++;
        setDisplayedText(text.slice(0, indexRef.current));

        if (indexRef.current >= text.length) {
          setIsComplete(true);
          onComplete?.();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [text, speed, onComplete]
  );

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      indexRef.current = 0;
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, hasStarted, animate]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {!isComplete && hasStarted && (
        <span className="inline-block w-[2px] h-[1em] bg-violet ml-0.5 align-middle animate-typewriter-blink" />
      )}
    </span>
  );
}
