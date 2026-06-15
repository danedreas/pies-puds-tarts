import Link from "next/link";
import { parseInlineContent } from "@/lib/inline-content";
import { cn } from "@/lib/utils";

const linkClassName = "text-foreground underline-offset-4 hover:underline";

type InlineTextProps = {
  text: string;
  className?: string;
  as?: "p" | "span";
};

export function InlineText({ text, className, as: Component = "p" }: InlineTextProps) {
  const parts = parseInlineContent(text);

  return (
    <Component className={className}>
      {parts.map((part, index) =>
        part.type === "link" ? (
          <Link key={index} href={part.href} className={linkClassName}>
            {part.label}
          </Link>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </Component>
  );
}
