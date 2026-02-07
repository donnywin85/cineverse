"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  gradient = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight ${gradient ? "gradient-text" : "text-white"}`}
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
      </div>
      {subtitle && (
        <p className="text-center text-sm text-zinc-500 mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
}
