/**
 * Design tokens - override these per client build.
 * Values map to CSS custom properties in app/globals.css.
 *
 * Tip: use oklch() for perceptually even colour shifts.
 * https://oklch.com
 */

import type { CSSProperties } from "react";

export const themeTokens = {
  /** Brand accent - warm orange from the logo */
  primary: "oklch(0.68 0.19 45)",
  primaryForeground: "oklch(0.99 0 0)",

  /** Page background and body text - warm cream and soft charcoal */
  background: "oklch(0.985 0.012 85)",
  foreground: "oklch(0.24 0.02 50)",

  /** Cards and elevated surfaces */
  card: "oklch(0.995 0.008 85)",
  cardForeground: "oklch(0.24 0.02 50)",

  /** Secondary UI - badges, subtle backgrounds */
  muted: "oklch(0.955 0.015 85)",
  mutedForeground: "oklch(0.48 0.03 50)",

  /** Borders and form inputs */
  border: "oklch(0.90 0.015 85)",
  input: "oklch(0.93 0.012 85)",
  ring: "oklch(0.68 0.19 45)",

  /** Footer - a touch deeper than the page, same warm cream family as everything else */
  footer: "oklch(0.968 0.014 85)",
  footerForeground: "oklch(0.24 0.02 50)",

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
    "--footer": tokens.footer,
    "--footer-foreground": tokens.footerForeground,
  } as CSSProperties;
}
