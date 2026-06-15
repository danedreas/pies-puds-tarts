/**
 * Home page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export const homeContent = {
  hero: {
    eyebrow: "Norfolk farmers markets",
    headline: "Handmade pies, puds & tarts",
    subheadline:
      "I'm Paul - I bake savoury pies, proper puds and sweet tarts, and sell them at [markets around Norfolk](/events). [Order ahead online](/order) and pick up from the stall.",
    primaryCta: { label: "Pre-order for collection", href: "/order" },
    secondaryCta: { label: "Where to find me", href: "/events" },
    highlights: ["Baked fresh", "Pre-order & collect", "Seasonal specials"],
  },

  about: {
    id: "about",
    title: "Proper baking, sold at the market",
    description:
      "Everything on the stall is made by hand in small batches - the sort of food you'd be pleased to take home from a good market. [More about Paul](/about).",
    positivePanel: {
      title: "What's on the stall",
      items: [
        "Savoury pies with classic and seasonal fillings",
        "Homely puds - sticky toffee, crumble and the rest",
        "Sweet tarts when the fruit is good",
        "Limited batches - when it's gone, it's gone",
      ],
    },
    infoPanel: {
      title: "How to order",
      items: [
        "Pick the [market you're collecting from](/events)",
        "Choose what you want from the [menu](/order)",
        "Pay online",
        "Collect from the stall on the day",
      ],
    },
  },

  services: {
    id: "highlights",
    title: "A few good reasons to come back",
    description:
      "Good ingredients, decent portions, and a bit of chat while you're choosing. Browse the [full menu](/order) or [see where I'm trading](/events).",
    items: [
      {
        title: "At the markets",
        description:
          "I'm at different markets around Norfolk most weeks - worth checking the schedule before you set off.",
        href: "/events",
        imageIndex: 0,
      },
      {
        title: "Changes with the seasons",
        description:
          "Summer fruit tarts, autumn puds, hearty pies when it's cold - the menu never looks quite the same twice.",
        href: "/order",
        imageIndex: 1,
      },
      {
        title: "Order ahead",
        description:
          "Busy market day? Pre-order online and I'll have your bits ready to pick up.",
        href: "/order",
        imageIndex: 2,
      },
    ],
  },

  eventsTeaser: {
    id: "events",
    title: "Where to find me",
    description:
      "Here's where I'm trading over the next few weeks. [See all market dates](/events) before you set off - they can change, especially in bad weather.",
    emptyMessage: "Market dates coming soon. [Get in touch](/contact) if you're wondering where I'll be next.",
    cta: { label: "Market dates", href: "/events" },
  },
} as const;
