"use client";

interface SkeletonProps {
  className?: string;
}

export function CardSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`flex-shrink-0 w-40 sm:w-48 ${className}`}>
      <div className="skeleton aspect-[2/3] rounded-lg" />
      <div className="skeleton h-4 w-3/4 mt-2 rounded" />
      <div className="skeleton h-3 w-1/2 mt-1 rounded" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full">
      <div className="skeleton absolute inset-0" />
      <div className="absolute bottom-20 left-8 sm:left-16 z-20 space-y-4">
        <div className="skeleton h-16 w-96 rounded" />
        <div className="skeleton h-6 w-64 rounded" />
        <div className="skeleton h-24 w-[500px] rounded" />
        <div className="flex gap-4">
          <div className="skeleton h-12 w-40 rounded-full" />
          <div className="skeleton h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="glass rounded-xl p-5 space-y-3">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton h-8 w-16 rounded" />
    </div>
  );
}
