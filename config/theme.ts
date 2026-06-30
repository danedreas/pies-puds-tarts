/**
 * Design tokens - override these per client build.
 * Values map to CSS custom properties in app/globals.css.
 *
 * Tip: use oklch() for perceptually even colour shifts.
 * https://oklch.com
 */

import type { CSSProperties } from "react";
import { brandColors } from "@/config/brand";

export { brandColors };

export const themeTokens = {
  /** Brand accent - Tarts maroon (CTAs, links) */
  primary: "oklch(0.494 0.137 23.6)",
  primaryForeground: "oklch(0.99 0 0)",

  /** Page background and body text - cream and Pies navy */
  background: "oklch(0.99 0.004 85)",
  foreground: "oklch(0.316 0.115 269.0)",

  /** Cards and elevated surfaces */
  card: "oklch(1 0.002 85)",
  cardForeground: "oklch(0.316 0.115 269.0)",

  /** Secondary UI - stone-taupe family */
  muted: "oklch(0.955 0.012 73)",
  mutedForeground: "oklch(0.48 0.04 269)",

  /** Borders and form inputs */
  border: "oklch(0.88 0.022 73)",
  input: "oklch(0.93 0.015 73)",
  ring: "oklch(0.687 0.098 237.9)",

  /** Footer */
  footer: "oklch(0.975 0.008 85)",
  footerForeground: "oklch(0.316 0.115 269.0)",

  /** Stall skirting block colour */
  royal: "oklch(0.379 0.138 265.5)",

  /** Corner radius - modest, not overly slick */
  radius: "0.875rem",
} as const;

export type ThemeTokens = typeof themeTokens;

/** Inline style object for injecting tokens via layout */
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
    "--royal": tokens.royal,
    "--brand-pies": brandColors.pies,
    "--brand-puds": brandColors.puds,
    "--brand-tarts": brandColors.tarts,
    "--brand-stone": brandColors.stone,
    "--brand-royal": brandColors.royal,
  } as CSSProperties;
}
