"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { MarketEvent } from "@/config/content/events";
import {
  formatDisplayPrice,
  formatGbp,
  menuCategories,
  parseDisplayPrice,
  type MenuItem,
} from "@/config/content/products";
import {
  orderContent,
  isUnitCollection,
  buildPreorderContactHref,
  unitCollection,
} from "@/config/content/order";
import type { PreorderBox } from "@/lib/site-content-shared";
import { readPendingPreorder } from "@/lib/pending-preorder";
import { cn } from "@/lib/utils";
import { EventSelector } from "@/components/order/event-selector";
import { InlineText } from "@/components/content/inline-text";
import { Button } from "@/components/ui/button";
import { SectionShell, SoftPanel } from "@/components/ui/section-shell";

type Quantities = Record<string, number>;

const MAX_QUANTITY = 20;

function emptyQuantities(
  menuItems: MenuItem[],
  boxes: PreorderBox[],
  includeBoxes: boolean,
): Quantities {
  const ids = menuItems.map((item) => item.id);

  if (includeBoxes) {
    ids.push(...boxes.map((box) => box.id));
  }

  return Object.fromEntries(ids.map((id) => [id, 0]));
}

type OrderPageClientProps = {
  events: MarketEvent[];
  menuItems: MenuItem[];
  boxes: PreorderBox[];
  showBoxes: boolean;
};

export function OrderPageClient({ events, menuItems, boxes, showBoxes }: OrderPageClientProps) {
  const searchParams = useSearchParams();
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventError, setEventError] = useState(false);
  const [quantities, setQuantities] = useState<Quantities>(() =>
    emptyQuantities(menuItems, boxes, showBoxes),
  );
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const fromQuery = searchParams.get("event");
    if (fromQuery && events.some((event) => event.id === fromQuery)) {
      setSelectedEventId(fromQuery);
      setEventError(false);
    }
  }, [searchParams, events]);

  useEffect(() => {
    if (restored) return;
    const pending = readPendingPreorder();
    if (!pending) {
      setRestored(true);
      return;
    }

    if (events.some((event) => event.id === pending.eventId) || isUnitCollection(pending.eventId)) {
      setSelectedEventId(pending.eventId);
      setEventError(false);
    }

    setQuantities((current) => {
      const next = { ...current };
      for (const item of pending.items) {
        if (item.productId in next) {
          next[item.productId] = Math.max(0, Math.min(MAX_QUANTITY, item.quantity));
        }
      }
      return next;
    });
    setRestored(true);
  }, [events, restored]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId),
    [events, selectedEventId],
  );

  function handleEventChange(eventId: string) {
    setSelectedEventId(eventId);
    setEventError(false);
  }

  return (
    <MenuOrderForm
      events={events}
      menuItems={menuItems}
      boxes={boxes}
      selectedEventId={selectedEventId}
      selectedEvent={selectedEvent}
      onEventChange={handleEventChange}
      eventError={eventError}
      showBoxes={showBoxes}
      quantities={quantities}
      onQuantitiesChange={setQuantities}
    />
  );
}

type MenuOrderFormProps = {
  events: MarketEvent[];
  menuItems: MenuItem[];
  boxes: PreorderBox[];
  selectedEventId: string;
  selectedEvent: MarketEvent | undefined;
  onEventChange: (eventId: string) => void;
  eventError: boolean;
  showBoxes: boolean;
  quantities: Quantities;
  onQuantitiesChange: (value: Quantities | ((current: Quantities) => Quantities)) => void;
};

function MenuOrderForm({
  events,
  menuItems,
  boxes,
  selectedEventId,
  selectedEvent,
  onEventChange,
  eventError,
  showBoxes,
  quantities,
  onQuantitiesChange,
}: MenuOrderFormProps) {
  const lineItems = useMemo(() => {
    const menuLines = menuItems
      .filter((item) => (quantities[item.id] ?? 0) > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        quantity: quantities[item.id] ?? 0,
        lineTotal: parseDisplayPrice(item.displayPrice) * (quantities[item.id] ?? 0),
      }));

    const boxLines = showBoxes
      ? boxes
          .filter((box) => (quantities[box.id] ?? 0) > 0)
          .map((box) => ({
            id: box.id,
            name: box.name,
            quantity: quantities[box.id] ?? 0,
            lineTotal: parseDisplayPrice(box.displayPrice) * (quantities[box.id] ?? 0),
          }))
      : [];

    return [...menuLines, ...boxLines];
  }, [boxes, menuItems, quantities, showBoxes]);

  const orderTotal = lineItems.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lineItems.reduce((sum, line) => sum + line.quantity, 0);
  const unitSelected = isUnitCollection(selectedEventId);
  const canContinue = itemCount > 0 && Boolean(selectedEventId) && (unitSelected || Boolean(selectedEvent));
  const contactHref = canContinue
    ? buildPreorderContactHref(lineItems, {
        unit: unitSelected,
        event: selectedEvent,
      })
    : "/contact";
  const contactLabel = unitSelected
    ? unitCollection.contactButtonLabel
    : orderContent.contactButtonLabel;
  const summaryRef = useRef<HTMLElement>(null);
  const [summaryInView, setSummaryInView] = useState(false);

  useEffect(() => {
    const target = summaryRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSummaryInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -72px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const showMobileCartBar = itemCount > 0 && !summaryInView;

  function scrollToSummary() {
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setQuantity(id: string, next: number) {
    onQuantitiesChange((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(MAX_QUANTITY, next)),
    }));
  }

  return (
    <SectionShell tone="muted" className={cn("pt-8", showMobileCartBar && "pb-28")}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-12">
        <div className="space-y-10">
          {menuCategories.map((category) => {
            const items = menuItems.filter((item) => item.category === category.id);
            if (items.length === 0) {
              return null;
            }

            return (
              <MenuCategorySection
                key={category.id}
                id={category.id}
                label={category.label}
                items={items}
                quantities={quantities}
                onQuantityChange={setQuantity}
              />
            );
          })}

          {showBoxes && boxes.length > 0 && (
            <BoxesCategorySection
              boxes={boxes}
              quantities={quantities}
              onQuantityChange={setQuantity}
            />
          )}

          <InlineText
            text={orderContent.allergenNotice}
            className="text-sm leading-relaxed text-muted-foreground"
          />
        </div>

        <aside ref={summaryRef} className="scroll-mt-24 lg:sticky lg:top-24">
          <SoftPanel className="space-y-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" aria-hidden />
              <h2 className="font-heading text-xl font-semibold">{orderContent.summaryTitle}</h2>
            </div>

            <EventSelector
              events={events}
              value={selectedEventId}
              onChange={onEventChange}
              invalid={eventError}
            />

            {lineItems.length > 0 ? (
              <ul className="space-y-3 border-b border-border/60 pb-4 text-sm">
                {lineItems.map(({ id, name, quantity, lineTotal }) => (
                  <li key={id} className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{quantity}x</span> {name}
                    </span>
                    <span className="shrink-0 font-medium">{formatGbp(lineTotal)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{orderContent.emptyCartMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-heading text-2xl font-bold">{formatGbp(orderTotal)}</span>
            </div>

            <InlineText
              text={unitSelected ? unitCollection.collectionNote : orderContent.collectionNote}
              className="text-xs leading-relaxed text-muted-foreground"
            />

            <Button
              asChild={canContinue}
              disabled={!canContinue}
              className="w-full rounded-full"
              size="lg"
            >
              {canContinue ? (
                <Link href={contactHref}>{contactLabel}</Link>
              ) : (
                <span>{contactLabel}</span>
              )}
            </Button>

            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/events">View market dates</Link>
            </Button>
          </SoftPanel>
        </aside>
      </div>

      {showMobileCartBar && (
        <MobileCartBar
          itemCount={itemCount}
          orderTotal={orderTotal}
          onViewOrder={scrollToSummary}
        />
      )}
    </SectionShell>
  );
}

function MobileCartBar({
  itemCount,
  orderTotal,
  onViewOrder,
}: {
  itemCount: number;
  orderTotal: number;
  onViewOrder: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
      <button
        type="button"
        onClick={onViewOrder}
        className="surface-soft pointer-events-auto flex w-full max-w-md items-center justify-between gap-4 px-5 py-3.5 shadow-lg shadow-foreground/10 transition-transform active:scale-[0.98]"
        aria-label={`View order: ${itemCount} items, total ${formatGbp(orderTotal)}`}
      >
        <div className="flex items-center gap-2.5 text-sm">
          <ShoppingBag className="size-4 text-primary" aria-hidden />
          <span className="font-medium">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
        <span className="font-heading text-xl font-bold tabular-nums">{formatGbp(orderTotal)}</span>
      </button>
    </div>
  );
}

function BoxesCategorySection({
  boxes,
  quantities,
  onQuantityChange,
}: {
  boxes: PreorderBox[];
  quantities: Quantities;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  return (
    <section aria-labelledby="menu-mixed-boxes">
      <h2
        id="menu-mixed-boxes"
        className="font-heading border-b border-primary/20 pb-2 text-2xl font-semibold tracking-tight"
      >
        {orderContent.boxesTitle}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {orderContent.boxesDescription}
      </p>
      <ul className="mt-4 divide-y divide-border/60">
        {boxes.map((box) => (
          <BoxMenuRow
            key={box.id}
            box={box}
            quantity={quantities[box.id] ?? 0}
            onQuantityChange={(next) => onQuantityChange(box.id, next)}
          />
        ))}
      </ul>
    </section>
  );
}

function BoxMenuRow({
  box,
  quantity,
  onQuantityChange,
}: {
  box: PreorderBox;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <li className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-heading text-lg font-semibold">{box.name}</h3>
          {box.highlighted && (
            <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Popular
            </span>
          )}
          <span className="font-heading text-lg font-bold text-primary">
            {formatDisplayPrice(box.displayPrice)}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {box.description}
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {box.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <QuantityControl quantity={quantity} onChange={onQuantityChange} label={box.name} />
    </li>
  );
}

function MenuCategorySection({
  id,
  label,
  items,
  quantities,
  onQuantityChange,
}: {
  id: string;
  label: string;
  items: MenuItem[];
  quantities: Quantities;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  return (
    <section aria-labelledby={`menu-${id}`}>
      <h2
        id={`menu-${id}`}
        className="font-heading border-b border-primary/20 pb-2 text-2xl font-semibold tracking-tight"
      >
        {label}
      </h2>
      <ul className="mt-4 divide-y divide-border/60">
        {items.map((item) => (
          <MenuRow
            key={item.id}
            item={item}
            quantity={quantities[item.id] ?? 0}
            onQuantityChange={(next) => onQuantityChange(item.id, next)}
          />
        ))}
      </ul>
    </section>
  );
}

function MenuRow({
  item,
  quantity,
  onQuantityChange,
}: {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <li className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-1">
          <h3 className="font-heading text-lg font-semibold">{item.name}</h3>
          <span className="font-heading text-lg font-bold text-primary">
            {formatDisplayPrice(item.displayPrice)}
          </span>
        </div>
        {item.description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        ) : null}
        {item.allergens ? (
          <p className="mt-1.5 text-xs text-muted-foreground/80">
            <span className="font-medium">Allergens:</span> {item.allergens}
          </p>
        ) : null}
      </div>

      <QuantityControl quantity={quantity} onChange={onQuantityChange} label={item.name} />
    </li>
  );
}

function QuantityControl({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 rounded-full"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 0}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="size-4" aria-hidden />
      </Button>
      <span
        className="min-w-8 text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
        aria-label={`Quantity of ${label}`}
      >
        {quantity}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 rounded-full"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
