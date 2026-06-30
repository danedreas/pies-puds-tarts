/**
 * Brand style guide tokens  -  Pies, Puds & Tarts
 * Colours read from stall photography; logotype uses per-word colour shifts.
 */

export const brandColors = {
  /** "Pies" logotype navy */
  pies: "#1B2A6B",
  /** "Puds" logotype sky blue */
  puds: "#5BA3D0",
  /** "& Tarts" script maroon */
  tarts: "#A13A3A",
  /** Seal badge ring, muted secondary */
  stone: "#B5A99A",
  /** Stall skirting / tablecloth block colour */
  royal: "#1E3A8A",
} as const;

export const brandAward = {
  sealCenter: "Pies",
  rimText: "AWARD WINNING",
  /** Load-bearing credibility claim  -  always pair seal graphic with this detail */
  claim:
    "British Pie Awards Class Champion  -  Norfolk Plough Pudding, Regional Pie Class, 2017",
  year: 2017,
} as const;
