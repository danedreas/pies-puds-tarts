/**
 * About page content - edit per client build.
 */

export const aboutContent = {
  eyebrow: "About us",
  title: "A local business you can trust",
  intro:
    "We are a small team serving customers across the local area. This page is where you tell your story - who you are, how you work, and why people choose you.",

  paragraphs: [
    "Replace this with your own background: when you started, what you specialise in, and the kind of customers you work with most.",
    "Keep it honest and straightforward. Visitors want to know you are real, reliable, and easy to deal with - not read corporate filler.",
    "A photo of you, your team, or your work helps build trust. Swap the placeholder image in config/content/images.ts when you are ready.",
  ],

  values: {
    title: "What we stand for",
    items: [
      {
        title: "Clear communication",
        description: "We explain what we do, what it costs, and when you can expect us.",
      },
      {
        title: "Quality work",
        description: "We take pride in doing the job properly - the first time where we can.",
      },
      {
        title: "Local focus",
        description: "We know the area and build long-term relationships with customers.",
      },
    ],
  },

  cta: {
    label: "Get in touch",
    href: "/contact",
  },
} as const;
