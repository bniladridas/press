"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface A11yPreferences {
  theme: "light" | "dark" | "sepia";
  textSize: number;
  lineHeight: "normal" | "relaxed" | "spacious";
  letterSpacing: "normal" | "wide";
  font: "default" | "reading";
  reduceMotion: boolean;
  hideImages: boolean;
  highContrast: boolean;
}

const defaults: A11yPreferences = {
  theme: "light",
  textSize: 100,
  lineHeight: "normal",
  letterSpacing: "normal",
  font: "default",
  reduceMotion: false,
  hideImages: false,
  highContrast: false,
};

interface A11yContextValue {
  prefs: A11yPreferences;
  setTheme: (t: A11yPreferences["theme"]) => void;
  setTextSize: (s: number) => void;
  setLineHeight: (l: A11yPreferences["lineHeight"]) => void;
  setLetterSpacing: (l: A11yPreferences["letterSpacing"]) => void;
  setFont: (f: A11yPreferences["font"]) => void;
  setReduceMotion: (v: boolean) => void;
  setHideImages: (v: boolean) => void;
  setHighContrast: (v: boolean) => void;
  reset: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

const STORAGE_KEY = "press-a11y";

function loadPrefs(): A11yPreferences {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return defaults;
}

function savePrefs(p: A11yPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

function applyPrefs(p: A11yPreferences) {
  const root = document.documentElement;
  root.setAttribute("data-theme", p.theme);
  root.style.setProperty("--text-size-factor", `${p.textSize / 100}`);
  root.setAttribute("data-line-height", p.lineHeight);
  root.setAttribute("data-letter-spacing", p.letterSpacing);
  root.setAttribute("data-font", p.font);
  if (p.reduceMotion) root.classList.add("reduce-motion");
  else root.classList.remove("reduce-motion");
  if (p.hideImages) root.classList.add("hide-images");
  else root.classList.remove("hide-images");
  if (p.highContrast) root.classList.add("high-contrast");
  else root.classList.remove("high-contrast");
}

export function A11yProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<A11yPreferences>(() => loadPrefs());

  useEffect(() => {
    applyPrefs(prefs);
  }, [prefs]);

  function update<K extends keyof A11yPreferences>(
    key: K,
    value: A11yPreferences[K]
  ) {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      savePrefs(next);
      return next;
    });
  }

  const value: A11yContextValue = {
    prefs,
    setTheme: (t) => update("theme", t),
    setTextSize: (s) => update("textSize", s),
    setLineHeight: (l) => update("lineHeight", l),
    setLetterSpacing: (l) => update("letterSpacing", l),
    setFont: (f) => update("font", f),
    setReduceMotion: (v) => update("reduceMotion", v),
    setHideImages: (v) => update("hideImages", v),
    setHighContrast: (v) => update("highContrast", v),
    reset: () => {
      setPrefs(defaults);
      savePrefs(defaults);
    },
  };

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within A11yProvider");
  return ctx;
}
