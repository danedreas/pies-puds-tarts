/**
 * Parse `[label](/path)` markers in content strings into text and link segments.
 */

export type InlinePart =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

export function parseInlineContent(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_LINK_PATTERN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    parts.push({ type: "link", label: match[1], href: match[2] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", value: text }];
}
