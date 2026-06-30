import { Award } from "lucide-react";
import { brandAward } from "@/config/brand";
import { cn } from "@/lib/utils";

type AwardBadgeBarProps = {
  className?: string;
};

/** Contained horizontal award badge  -  sits between hero and page content. */
export function AwardBadgeBar({ className }: AwardBadgeBarProps) {
  return (
    <div className={cn("mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8", className)}>
      <div
        className="mx-auto flex w-fit max-w-full flex-col items-center gap-2 rounded-lg border border-brand-stone/50 bg-muted/30 px-5 py-3.5 sm:flex-row sm:gap-x-4 sm:px-6 sm:py-3"
        aria-label={brandAward.claim}
      >
        <Award className="size-4 shrink-0 text-brand-tarts" aria-hidden strokeWidth={1.75} />

        <p className="font-heading text-sm font-semibold tracking-[0.12em] text-brand-pies uppercase">
          British Pie Awards
        </p>

        <span className="hidden text-brand-stone sm:inline" aria-hidden>
          ·
        </span>

        <p className="font-heading text-sm font-semibold text-brand-pies">Class Champion</p>

        <span className="hidden text-brand-stone sm:inline" aria-hidden>
          ·
        </span>

        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Norfolk Plough Pudding, Regional Pie Class · {brandAward.year}
        </p>
      </div>
    </div>
  );
}
