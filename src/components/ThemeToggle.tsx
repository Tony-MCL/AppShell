// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "mcl-progress-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const applyTheme = (t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (t === "dark") {
      root.dataset.theme = "dark";
    } else {
      delete root.dataset.theme;
    }
  };

  const handleToggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    }
    applyTheme(next);
  };

  return (
    <button
      type="button"
      className="mcl-header-icon-button"
      onClick={handleToggle}
      aria-label={theme === "light" ? "Bytt til mørk modus" : "Bytt til lys modus"}
    >
      <span className="mcl-theme-icon" aria-hidden="true">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
