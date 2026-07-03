/**
 * About page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export const aboutContent = {
  eyebrow: "About us",
  title: "Pies, Puds & Tarts",
  intro:
    "A family-run business founded by chef Paul Stretton, with over 30 years working in kitchens across London, Germany, and Norfolk.",

  paragraphs: [
    "After years in restaurants, Paul moved into running his own food business  -  starting with a catering trailer, then a small \"pie shed\" at home. That led to making pies for a local butcher, then selling at markets and supplying farm shops and delis across North Norfolk.",
    "As demand grew, he moved into a café and production site in Great Walsingham, which he ran for around 12 years before stepping back to focus on [markets](/events), shows, and events.",
    "Today, Paul runs Pies, Puds & Tarts with his wife Nisa and daughter Esme, keeping it a hands-on family operation. His pies have received 13 Great British Pie Awards over the years.",
    "At its simplest, it's just good food made and sold by family.",
  ],

  values: {
    title: "How we work",
    items: [
      {
        title: "Family-run",
        description: "A hands-on operation run by Paul, Nisa and Esme. No corporate layers, just family.",
      },
      {
        title: "30+ years experience",
        description: "Decades of professional kitchen experience across London, Germany, and Norfolk.",
      },
      {
        title: "Award-winning",
        description: "13 Great British Pie Awards and counting. Recognition for doing things properly.",
      },
    ],
  },

  cta: {
    label: "Get in touch",
    href: "/contact",
  },
} as const;
