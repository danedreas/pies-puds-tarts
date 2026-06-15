/**
 * Home page content - edit per client build.
 * Copy is intentionally neutral so it works across trades, retail, and services.
 */

export const homeContent = {
  hero: {
    eyebrow: "Local & trusted",
    headline: "Quality work, clearly communicated",
    subheadline:
      "Whether you run a trade, a shop, or a service business - customers should understand what you do, trust your expertise, and know how to reach you.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    secondaryCta: { label: "About us", href: "/about" },
    highlights: ["Free quotes", "Fully insured", "Local team"],
  },

  about: {
    id: "about",
    title: "Built around how you work",
    description:
      "Every business is different. We focus on what matters to your customers - who you are, what you offer, and how to get hold of you - without unnecessary fuss.",
    fitFor: [
      "Trades and skilled professionals",
      "Shops, salons, and local retail",
      "Consultants and service providers",
      "New businesses finding their feet",
    ],
    notFor: [
      "Large catalogues you manage day-to-day",
      "Complex multi-branch operations",
      "Projects needing months of discovery",
    ],
  },

  services: {
    id: "services",
    title: "What customers can expect",
    description:
      "Swap these for your real services. Short, clear descriptions help visitors decide quickly.",
    items: [
      {
        title: "Reliable delivery",
        description:
          "Turn up on time, communicate clearly, and finish the job to a standard you are happy to stand behind.",
        imageIndex: 0,
      },
      {
        title: "Transparent pricing",
        description:
          "No surprises - explain your rates or packages so customers know what they are booking.",
        imageIndex: 1,
      },
      {
        title: "Ongoing support",
        description:
          "Leave a straightforward way to get back in touch for repeat work, questions, or follow-ups.",
        imageIndex: 2,
      },
    ],
  },

  pricingIntro: {
    title: "Optional: Simple offers",
    description:
      "Fixed packages with secure checkout. Ideal for a few clear offers - not a full shop to manage.",
  },

  productsIntro: {
    title: "Optional: Products",
    description:
      "Individual items with a price and short description. Swap for real products, vouchers, or add-ons.",
  },

  cta: {
    title: "Ready to talk?",
    description:
      "Send a message with a few details about your business. No pressure - just a straightforward conversation.",
    buttonLabel: "Contact us",
    href: "/contact",
  },
} as const;
