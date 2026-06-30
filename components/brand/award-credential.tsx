import { brandAward } from "@/config/brand";
import { cn } from "@/lib/utils";

type AwardCredentialProps = {
  className?: string;
};

/** Text-only award credential  -  sits in content flow, not as a floating graphic. */
export function AwardCredential({ className }: AwardCredentialProps) {
  return (
    <aside
      className={cn(
        "border-l-[3px] border-brand-stone pl-4",
        className,
      )}
      aria-label={brandAward.claim}
    >
      <p className="font-heading text-sm font-semibold text-brand-pies">
        British Pie Awards Class Champion
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Norfolk Plough Pudding, Regional Pie Class · {brandAward.year}
      </p>
    </aside>
  );
}
