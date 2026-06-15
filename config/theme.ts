/**
 * Design tokens - override these per client build.
 * Values map to CSS custom properties in app/globals.css.
 *
 * Tip: use oklch() for perceptually even colour shifts.
 * https://oklch.com
 */

import type { CSSProperties } from "react";

export const themeTokens = {
  /** Brand accent - buttons, links, highlights */
  primary: "oklch(0.42 0.09 240)",
  primaryForeground: "oklch(0.99 0 0)",

  /** Page background and body text */
  background: "oklch(0.985 0.006 85)",
  foreground: "oklch(0.22 0.02 260)",

  /** Cards and elevated surfaces */
  card: "oklch(0.995 0.004 85)",
  cardForeground: "oklch(0.22 0.02 260)",

  /** Secondary UI - badges, subtle backgrounds */
  muted: "oklch(0.96 0.008 85)",
  mutedForeground: "oklch(0.48 0.02 260)",

  /** Borders and form inputs */
  border: "oklch(0.91 0.008 85)",
  input: "oklch(0.93 0.008 85)",
  ring: "oklch(0.42 0.09 240)",

  /** Corner radius base - sm/md/lg derive from this in globals.css */
  radius: "1.125rem",
} as const;

export type ThemeTokens = typeof themeTokens;

/** Inline style object for injecting tokens via layout (optional override path) */
export function themeTokensToCssVars(tokens: ThemeTokens): CSSProperties {
  return {
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.card,
    "--card-foreground": tokens.cardForeground,
    "--muted": tokens.muted,
    "--muted-foreground": tokens.mutedForeground,
    "--border": tokens.border,
    "--input": tokens.input,
    "--ring": tokens.ring,
    "--radius": tokens.radius,
  } as CSSProperties;
}
