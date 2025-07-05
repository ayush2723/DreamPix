import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-10 w-full animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="hidden sm:block h-72 w-full rounded-2xl border border-glass bg-gradient-to-r from-primary-indigo/5 to-accent-violet/5 dark:from-primary-indigo/10 dark:to-accent-violet/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 -translate-x-full animate-shimmer" />
      </div>

      {/* Grid Header & Search Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="h-10 w-48 rounded-xl bg-muted" />
        <div className="h-12 w-full md:max-w-96 rounded-xl bg-muted" />
      </div>

      {/* Cards List Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-glass bg-panel-glass p-4 shadow-glow-card h-80"
          >
            {/* Image Box */}
            <div className="h-52 w-full rounded-xl bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 -translate-x-full animate-shimmer" />
            </div>
            {/* Title Line */}
            <div className="h-6 w-3/4 rounded-lg bg-muted" />
            {/* Sub/Stats Line */}
            <div className="h-4 w-1/2 rounded-lg bg-muted/65" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
