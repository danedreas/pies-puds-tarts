/**
 * About page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export const aboutContent = {
  eyebrow: "About Paul",
  title: "Paul Stretton",
  intro:
    "I run Pies, Puds & Tarts from Norfolk - baking for [farmers markets](/events) and selling straight from the stall.",

  paragraphs: [
    "I've worked in kitchens and hospitality for years. These days I'm out at the markets instead, baking pies, puds and tarts in small batches and serving the people who come back week after week.",
    "You'll find the usual favourites on the stall, plus whatever fits the season. The [menu](/order) moves through the year - summer tarts, autumn puds, proper hearty pies when the weather turns.",
    "If you want something waiting for you on market day, you can [pre-order through the site](/order). For wholesale, a big order, or just a question about what's baking this week, [drop me a line](/contact).",
  ],

  values: {
    title: "How I work",
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
