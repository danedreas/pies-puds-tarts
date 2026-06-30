import { InlineText } from "@/components/content/inline-text";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "default" | "muted" | "accent";
};

const toneClasses = {
  default: "",
  muted: "bg-muted/35",
  accent: "bg-gradient-to-b from-muted/50 via-background to-background",
};

export function SectionShell({
  id,
  children,
  className,
  innerClassName,
  tone = "default",
}: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}>
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  width = "full",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  width?: "narrow" | "full";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-4",
        width === "narrow" && "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="inline-flex rounded-full bg-brand-stone/25 px-3 py-1 text-xs font-medium tracking-wide text-brand-pies uppercase">
          {eyebrow}
        </p>
      )}
      <Heading className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <InlineText
          text={description}
          className="text-lg leading-relaxed text-muted-foreground text-pretty"
        />
      )}
    </div>
  );
}

export function SoftPanel({
  children,
  className,
  highlighted = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-soft h-full p-6 sm:p-7",
        highlighted && "ring-primary/25 shadow-md shadow-primary/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
