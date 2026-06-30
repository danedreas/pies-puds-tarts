/**
 * FAQ page content - edit per client build.
 *
 * Inline links use `[label](/path)` in strings - rendered by InlineText.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqContent = {
  eyebrow: "Help",
  title: "Frequently asked questions",
  description:
    "Everything you need to know about pre-ordering and collecting at a [Norfolk farmers market](/events).",
  items: [
    {
      question: "How does pre-order work?",
      answer:
        "Choose the [market you're collecting from](/events), add items from the [menu](/order), and pay online. Your order is baked for that market day and ready at the stall.",
    },
    {
      question: "When do I collect my order?",
      answer:
        "On the market day you selected at checkout. Times vary by market  -  see the [events schedule](/events) for start and finish times. Head to the Pies, Puds & Tarts stall and give your name.",
    },
    {
      question: "How far in advance should I order?",
      answer:
        "Please order at least 48 hours before the market. For a large order or something special, [get in touch](/contact) earlier so there's time to plan the bake.",
    },
    {
      question: "Can you help with allergen information?",
      answer:
        "Yes. Ingredients change with the season, so ask before you order if you need allergen details. Use the [contact form](/contact) or ask at the stall on market day.",
    },
    {
      question: "What if a market is cancelled or the date changes?",
      answer:
        "Outdoor markets can shift because of weather or organiser changes. Check the [events page](/events) before you travel, or [contact us](/contact) if you're unsure.",
    },
    {
      question: "Do you deliver?",
      answer:
        "No home delivery at the moment. Everything is sold from the stall, collected from a pre-order at a farmers market, or by pickup  -  please contact for more information.",
    },
    {
      question: "Can I order for wholesale or catering?",
      answer:
        "Yes  -  larger orders and catering enquiries are welcome. [Send a message](/contact) with what you need, which date, and how many people you're feeding.",
    },
    {
      question: "How do I pay?",
      answer:
        "Pre-orders are paid online by card at checkout. On market day you can also buy from the stall if something is still available.",
    },
  ] satisfies FaqItem[],
} as const;

/** Plain text for FAQ structured data (strips inline markdown links). */
export function faqAnswerPlainText(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
