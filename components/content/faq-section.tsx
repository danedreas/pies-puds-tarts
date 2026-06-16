import Link from "next/link";
import { faqContent } from "@/config/content/faq";
import { InlineText } from "@/components/content/inline-text";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  return (
    <SectionShell id="faq" tone="muted">
      <SectionHeading
        width="full"
        eyebrow={faqContent.eyebrow}
        title={faqContent.title}
        description={faqContent.description}
      />

      <div className="mt-10 space-y-4">
        {faqContent.items.map((item) => (
          <SoftPanel key={item.question}>
            <h3 className="font-heading text-lg font-semibold">{item.question}</h3>
            <InlineText
              text={item.answer}
              className="mt-3 text-sm leading-relaxed text-muted-foreground"
            />
          </SoftPanel>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild className="rounded-full px-6">
          <Link href="/order">Pre-order for collection</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/contact">Still have a question?</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
