"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Plus, Trash2 } from "lucide-react";
import { menuCategories, formatDisplayPrice } from "@/config/content/products";
import type { SiteContent } from "@/lib/site-content-shared";
import {
  formatMarketDateDisplay,
  formatSiteContentValidationError,
  validateSiteContent,
} from "@/lib/site-content-shared";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const adminShellClassName = "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8";

function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className={adminShellClassName}>{children}</div>;
}

function itemKey(section: "event" | "menu" | "box", id: string, index: number) {
  return `${section}-${id || index}`;
}

function createDraftId(): string {
  return `draft-${crypto.randomUUID()}`;
}

function AdminItemPanel({
  title,
  summary,
  expanded,
  onToggle,
  onRemove,
  children,
}: {
  title: string;
  summary?: string;
  expanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-soft overflow-hidden">
      <div className="flex items-start gap-2 p-4 sm:p-5">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-start gap-3 rounded-lg text-left transition-colors hover:bg-muted/40"
          aria-expanded={expanded}
        >
          <ChevronDown
            className={cn(
              "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform",
              !expanded && "-rotate-90",
            )}
            aria-hidden
          />
          <span className="min-w-0">
            <span className="block text-sm font-medium">{title}</span>
            {summary && (
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {summary}
              </span>
            )}
          </span>
        </button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 text-destructive hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="size-4" aria-hidden />
          Remove
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4 border-t border-border/60 p-4 sm:p-5">{children}</div>
      )}
    </div>
  );
}

function emptyEvent(): SiteContent["events"][number] {
  return {
    id: createDraftId(),
    name: "",
    location: "",
    date: "",
    dateDisplay: "",
    time: "",
    notes: "",
  };
}

function emptyMenuItem(): SiteContent["menuItems"][number] {
  return {
    id: createDraftId(),
    category: "pies",
    name: "",
    description: "",
    displayPrice: "",
  };
}

function emptyBox(): SiteContent["boxes"][number] {
  return {
    id: createDraftId(),
    name: "",
    description: "",
    displayPrice: "",
    features: ["Collect from your chosen market"],
  };
}

export function AdminEditor() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => new Set());

  function isExpanded(key: string) {
    return expandedItems.has(key);
  }

  function toggleItem(key: string) {
    setExpandedItems((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function expandItem(key: string) {
    setExpandedItems((current) => new Set(current).add(key));
  }

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/admin/content");
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load content.");
        }

        setContent((await response.json()) as SiteContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load content.");
      } finally {
        setLoading(false);
      }
    }

    void loadContent();
  }, [router]);

  async function handleSave() {
    if (!content) {
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      let payload: SiteContent;

      try {
        payload = validateSiteContent(content);
      } catch (err) {
        if (err instanceof ZodError) {
          throw new Error(formatSiteContentValidationError(err));
        }
        throw err;
      }

      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Unable to save content.");
      }

      const saved = (await response.json()) as SiteContent;
      setContent(saved);
      router.refresh();
      setMessage("Saved. The live site has been updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save content.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading content…
        </div>
      </AdminShell>
    );
  }

  if (!content) {
    return (
      <AdminShell>
        <p className="text-sm text-destructive">{error ?? "Unable to load content."}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Site admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit market dates and the pre-order menu. Prices are taken from what you enter here at
            checkout.
          </p>
          {content.updatedAt && (
            <p className="mt-2 text-xs text-muted-foreground">
              Last saved: {new Date(content.updatedAt).toLocaleString("en-GB")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full" onClick={() => void handleLogout()}>
            Sign out
          </Button>
          <Button className="rounded-full" onClick={() => void handleSave()} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>

      {message && <p className="text-sm text-primary">{message}</p>}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold">Market dates</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              const draft = emptyEvent();
              expandItem(itemKey("event", draft.id, content.events.length));
              setContent((current) =>
                current ? { ...current, events: [...current.events, draft] } : current,
              );
            }}
          >
            <Plus className="size-4" aria-hidden />
            Add market
          </Button>
        </div>

        <div className="space-y-4">
          {content.events.map((event, index) => {
            const key = itemKey("event", event.id, index);
            const summary = [event.dateDisplay || event.date, event.location, event.time]
              .filter(Boolean)
              .join(" · ");

            return (
              <AdminItemPanel
                key={key}
                title={event.name || `Market ${index + 1}`}
                summary={summary || "New market - add details below"}
                expanded={isExpanded(key)}
                onToggle={() => toggleItem(key)}
                onRemove={() =>
                  setContent((current) =>
                    current
                      ? {
                          ...current,
                          events: current.events.filter((_, itemIndex) => itemIndex !== index),
                        }
                      : current,
                  )
                }
              >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Market name">
                  <Input
                    value={event.name}
                    onChange={(e) =>
                      setContent((current) => {
                        if (!current) return current;
                        const events = [...current.events];
                        const name = e.target.value;
                        events[index] = {
                          ...events[index],
                          name,
                        };
                        return { ...current, events };
                      })
                    }
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={event.location}
                    onChange={(e) =>
                      updateEvent(setContent, index, { location: e.target.value })
                    }
                  />
                </Field>
                <Field label="Date">
                  <Input
                    type="date"
                    value={event.date}
                    onChange={(e) => {
                      const date = e.target.value;
                      updateEvent(setContent, index, {
                        date,
                        dateDisplay: date ? formatMarketDateDisplay(date) : "",
                      });
                    }}
                  />
                </Field>
                <Field label="Time">
                  <Input
                    value={event.time}
                    onChange={(e) => updateEvent(setContent, index, { time: e.target.value })}
                    placeholder="9am - 3pm"
                  />
                </Field>
              </div>

              <Field label="Notes (optional)">
                <Textarea
                  rows={2}
                  value={event.notes ?? ""}
                  onChange={(e) =>
                    updateEvent(setContent, index, { notes: e.target.value || undefined })
                  }
                />
              </Field>
              </AdminItemPanel>
            );
          })}

          {content.events.length === 0 && (
            <p className="text-sm text-muted-foreground">No markets yet. Add one above.</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold">Menu items</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              const draft = emptyMenuItem();
              expandItem(itemKey("menu", draft.id, content.menuItems.length));
              setContent((current) =>
                current
                  ? { ...current, menuItems: [...current.menuItems, draft] }
                  : current,
              );
            }}
          >
            <Plus className="size-4" aria-hidden />
            Add item
          </Button>
        </div>

        <div className="space-y-4">
          {content.menuItems.map((item, index) => {
            const key = itemKey("menu", item.id, index);
            const category =
              menuCategories.find((entry) => entry.id === item.category)?.label ?? item.category;
            const summary = [
              formatDisplayPrice(item.displayPrice) || item.displayPrice,
              category,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <AdminItemPanel
                key={key}
                title={item.name || `Menu item ${index + 1}`}
                summary={summary || "New menu item - add details below"}
                expanded={isExpanded(key)}
                onToggle={() => toggleItem(key)}
                onRemove={() =>
                  setContent((current) =>
                    current
                      ? {
                          ...current,
                          menuItems: current.menuItems.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        }
                      : current,
                  )
                }
              >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      setContent((current) => {
                        if (!current) return current;
                        const menuItems = [...current.menuItems];
                        const name = e.target.value;
                        menuItems[index] = {
                          ...menuItems[index],
                          name,
                        };
                        return { ...current, menuItems };
                      })
                    }
                  />
                </Field>
                <Field label="Price (GBP)">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={item.displayPrice}
                    onChange={(e) =>
                      updateMenuItem(setContent, index, { displayPrice: e.target.value })
                    }
                    placeholder="5.50"
                  />
                </Field>
                <Field label="Category">
                  <select
                    className="h-10 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
                    value={item.category}
                    onChange={(e) =>
                      updateMenuItem(setContent, index, {
                        category: e.target.value as SiteContent["menuItems"][number]["category"],
                      })
                    }
                  >
                    {menuCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Description">
                <Textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) =>
                    updateMenuItem(setContent, index, { description: e.target.value })
                  }
                />
              </Field>
              </AdminItemPanel>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold">Mixed boxes</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              const draft = emptyBox();
              expandItem(itemKey("box", draft.id, content.boxes.length));
              setContent((current) =>
                current ? { ...current, boxes: [...current.boxes, draft] } : current,
              );
            }}
          >
            <Plus className="size-4" aria-hidden />
            Add box
          </Button>
        </div>

        <div className="space-y-4">
          {content.boxes.map((box, index) => {
            const key = itemKey("box", box.id, index);
            const summary = [
              formatDisplayPrice(box.displayPrice) || box.displayPrice,
              box.highlighted ? "Popular" : "",
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <AdminItemPanel
                key={key}
                title={box.name || `Box ${index + 1}`}
                summary={summary || "New mixed box - add details below"}
                expanded={isExpanded(key)}
                onToggle={() => toggleItem(key)}
                onRemove={() =>
                  setContent((current) =>
                    current
                      ? {
                          ...current,
                          boxes: current.boxes.filter((_, itemIndex) => itemIndex !== index),
                        }
                      : current,
                  )
                }
              >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={box.name}
                    onChange={(e) =>
                      setContent((current) => {
                        if (!current) return current;
                        const boxes = [...current.boxes];
                        const name = e.target.value;
                        boxes[index] = {
                          ...boxes[index],
                          name,
                        };
                        return { ...current, boxes };
                      })
                    }
                  />
                </Field>
                <Field label="Price (GBP)">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={box.displayPrice}
                    onChange={(e) =>
                      updateBox(setContent, index, { displayPrice: e.target.value })
                    }
                    placeholder="18"
                  />
                </Field>
              </div>

              <Field label="Description">
                <Textarea
                  rows={2}
                  value={box.description}
                  onChange={(e) => updateBox(setContent, index, { description: e.target.value })}
                />
              </Field>

              <Field label="Features (one per line)">
                <Textarea
                  rows={3}
                  value={box.features.join("\n")}
                  onChange={(e) =>
                    updateBox(setContent, index, {
                      features: e.target.value.split("\n"),
                    })
                  }
                />
              </Field>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(box.highlighted)}
                  onChange={(e) =>
                    updateBox(setContent, index, { highlighted: e.target.checked || undefined })
                  }
                />
                Mark as popular
              </label>
              </AdminItemPanel>
            );
          })}
        </div>
      </section>
      </div>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function updateEvent(
  setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>,
  index: number,
  patch: Partial<SiteContent["events"][number]>,
) {
  setContent((current) => {
    if (!current) return current;
    const events = [...current.events];
    events[index] = { ...events[index], ...patch };
    return { ...current, events };
  });
}

function updateMenuItem(
  setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>,
  index: number,
  patch: Partial<SiteContent["menuItems"][number]>,
) {
  setContent((current) => {
    if (!current) return current;
    const menuItems = [...current.menuItems];
    menuItems[index] = { ...menuItems[index], ...patch };
    return { ...current, menuItems };
  });
}

function updateBox(
  setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>,
  index: number,
  patch: Partial<SiteContent["boxes"][number]>,
) {
  setContent((current) => {
    if (!current) return current;
    const boxes = [...current.boxes];
    boxes[index] = { ...boxes[index], ...patch };
    return { ...current, boxes };
  });
}
