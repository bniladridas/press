"use client";

import { useState, useEffect } from "react";

export default function ReadingModeToggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.documentElement.classList.add("reading-mode");
    } else {
      document.documentElement.classList.remove("reading-mode");
    }
    return () => {
      document.documentElement.classList.remove("reading-mode");
    };
  }, [active]);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`a11y-panel-trigger inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border transition-all ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border text-text-secondary hover:border-accent-muted"
      }`}
      aria-pressed={active}
      aria-label={active ? "Exit reading mode" : "Enter reading mode"}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      {active ? "Exit reading" : "Reading mode"}
    </button>
  );
}
