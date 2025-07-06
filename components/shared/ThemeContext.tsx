"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the current theme class on mount
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const nextTheme = theme === "light" ? "dark" : "light";
    
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  // Prevent hydration mismatches by returning a placeholder or container
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted ? "" : "invisible"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center justify-between gap-2 p-2 rounded-xl border border-glass bg-panel-glass hover:scale-105 active:scale-95 shadow-glow-card transition-all duration-300 w-full group cursor-pointer"
      aria-label="Toggle Theme"
    >
      <span className="p-14-medium text-foreground/80 group-hover:text-foreground pl-2 select-none">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
      <div className="relative size-8 rounded-lg bg-primary-indigo/10 text-primary-indigo flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-primary-indigo group-hover:text-white">
        <div className="absolute transition-transform duration-500 transform ease-out-back flex flex-col gap-8 align-middle justify-center items-center h-full">
          {theme === "light" ? (
            <Sun className="size-4 animate-spin-slow" />
          ) : (
            <Moon className="size-4 animate-pulse" />
          )}
        </div>
      </div>
    </button>
  );
};
