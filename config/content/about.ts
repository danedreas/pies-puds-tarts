/**
 * About page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export const aboutContent = {
  eyebrow: "About us",
  title: "Pies, Puds & Tarts",
  intro:
    "Award-winning pies, savoury bakes, sweet tarts and more  -  baked in Norfolk for [farmers markets](/events) across the county.",

  paragraphs: [
    "Everything is made by hand in small batches, using the very best of North Norfolk produce where the season allows. The sort of baking people come back for week after week.",
    "On the stall you'll find savoury pies, proper puds and sweet tarts, plus whatever fits the season. The [menu](/order) moves through the year  -  summer tarts, autumn puds, hearty pies when the weather turns.",
    "Pre-order for [market collection](/order), or [get in touch](/contact) about pickup, wholesale, or a larger order. Please contact for more information  -  we're happy to help.",
  ],

  values: {
    title: "How we bake",
    items: [
      {
        title: "Made by hand",
        description: "Small batches, baked properly. Nothing factory-made or rushed out the door.",
      },
      {
        title: "Seasonal",
        description: "What's on the stall depends on the time of year and what's worth baking with.",
      },
      {
        title: "Generous portions",
        description: "Nobody should walk away from a market stall still hungry.",
      },
    ],
  },

  cta: {
    label: "Send a message",
    href: "/contact",
  },
} as const;
