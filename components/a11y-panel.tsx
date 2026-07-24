"use client";

import { useState } from "react";
import { useA11y } from "./a11y-provider";

function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
              value === opt.value
                ? "border-accent bg-accent text-white"
                : "border-border text-text-secondary hover:border-accent-muted"
            }`}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between mb-4 cursor-pointer group">
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </label>
  );
}

export default function A11yPanel() {
  const [open, setOpen] = useState(false);
  const prefs = useA11y();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-surface border border-border shadow-md flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all"
        aria-label="Reading preferences"
        title="Reading preferences"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-80 bg-surface border border-border md:rounded-lg shadow-xl overflow-y-auto max-h-[80vh]"
            role="dialog"
            aria-label="Reading preferences"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-lg font-semibold text-text-primary"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  Reading preferences
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-xs text-text-muted mb-5 leading-relaxed">
                Adjust the reading experience in the way that serves you best.
                Your preferences remain on this device.
              </p>

              <div className="divider !my-4" />

              <RadioGroup
                label="Appearance"
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "sepia", label: "Sepia" },
                ]}
                value={prefs.prefs.theme}
                onChange={prefs.setTheme}
              />

              <div className="mb-5">
                <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  Text size
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      prefs.setTextSize(Math.max(90, prefs.prefs.textSize - 10))
                    }
                    disabled={prefs.prefs.textSize <= 90}
                    className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary hover:border-accent disabled:opacity-30 transition-all"
                    aria-label="Decrease text size"
                  >
                    -
                  </button>
                  <span className="text-sm text-text-primary w-10 text-center font-medium">
                    {prefs.prefs.textSize}%
                  </span>
                  <button
                    onClick={() =>
                      prefs.setTextSize(Math.min(150, prefs.prefs.textSize + 10))
                    }
                    disabled={prefs.prefs.textSize >= 150}
                    className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary hover:border-accent disabled:opacity-30 transition-all"
                    aria-label="Increase text size"
                  >
                    +
                  </button>
                </div>
              </div>

              <RadioGroup
                label="Line spacing"
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "relaxed", label: "Relaxed" },
                  { value: "spacious", label: "Spacious" },
                ]}
                value={prefs.prefs.lineHeight}
                onChange={prefs.setLineHeight}
              />

              <RadioGroup
                label="Spacing"
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "wide", label: "Wide" },
                ]}
                value={prefs.prefs.letterSpacing}
                onChange={prefs.setLetterSpacing}
              />

              <RadioGroup
                label="Font"
                options={[
                  { value: "default", label: "Default" },
                  { value: "reading", label: "Reading" },
                ]}
                value={prefs.prefs.font}
                onChange={prefs.setFont}
              />

              <div className="divider !my-4" />

              <Toggle
                label="Reduce animations"
                checked={prefs.prefs.reduceMotion}
                onChange={prefs.setReduceMotion}
              />

              <Toggle
                label="Hide decorative images"
                checked={prefs.prefs.hideImages}
                onChange={prefs.setHideImages}
              />

              <Toggle
                label="Increased contrast"
                checked={prefs.prefs.highContrast}
                onChange={prefs.setHighContrast}
              />

              <div className="divider !my-4" />

              <button
                onClick={prefs.reset}
                className="w-full py-2 text-xs text-text-muted border border-border rounded-md hover:text-accent hover:border-accent transition-all"
              >
                Restore defaults
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
