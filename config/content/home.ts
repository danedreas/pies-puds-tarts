/**
 * Home page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export const homeContent = {
  hero: {
    headline: "Award-winning pies, puds & tarts",
    subheadline:
      "Savoury bakes, proper puds and sweet tarts from the very best of North Norfolk  -  at [markets around the county](/events). [Order ahead online](/order) for collection, or [get in touch](/contact) about pickup.",
    primaryCta: { label: "Pre-order for collection", href: "/order" },
    secondaryCta: { label: "Market dates", href: "/events" },
    highlights: ["Baked fresh", "Pre-order & collect", "Pickup available"],
  },

  about: {
    id: "about",
    title: "Proper baking, sold at the market",
    description:
      "Everything on the stall is made by hand in small batches  -  the sort of food you'd be pleased to take home from a good market. [More about us](/about).",
    positivePanel: {
      title: "What's on the stall",
      items: [
        "Award-winning savoury pies with classic and seasonal fillings",
        "Homely puds  -  sticky toffee, crumble and the rest",
        "Sweet tarts when the fruit is good",
        "Limited batches  -  when it's gone, it's gone",
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
      "Good ingredients, decent portions, and a warm welcome at the stall. Browse the [full menu](/order) or [see where we're trading](/events).",
    items: [
      {
        title: "At the markets",
        description:
          "Different markets around Norfolk most weeks  -  worth checking the schedule before you set off.",
        href: "/events",
        imageIndex: 0,
      },
      {
        title: "Changes with the seasons",
        description:
          "Summer fruit tarts, autumn puds, hearty pies when it's cold  -  the menu never looks quite the same twice.",
        href: "/order",
        imageIndex: 1,
      },
      {
        title: "Order ahead",
        description:
          "Busy market day? Pre-order online and your order will be ready to pick up.",
        href: "/order",
        imageIndex: 2,
      },
    ],
  },

  eventsTeaser: {
    id: "events",
    title: "Where to find us",
    description:
      "Here's where we're trading over the next few weeks. [See all market dates](/events) before you set off  -  they can change, especially in bad weather.",
    emptyMessage: "Market dates coming soon. [Get in touch](/contact) if you'd like to know more.",
    cta: { label: "Market dates", href: "/events" },
  },
} as const;
