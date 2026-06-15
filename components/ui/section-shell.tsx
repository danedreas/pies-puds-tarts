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
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}>
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
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>
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
