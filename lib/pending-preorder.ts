/**
 * Client-side pending pre-order payload for embedded Stripe Checkout.
 * Stored in sessionStorage between /order and /checkout.
 */

export const PENDING_PREORDER_STORAGE_KEY = "ppt_pending_preorder";

export type PendingPreorderItem = {
  productId: string;
  quantity: number;
};

export type PendingPreorder = {
  eventId: string;
  items: PendingPreorderItem[];
};

export function writePendingPreorder(order: PendingPreorder): void {
  sessionStorage.setItem(PENDING_PREORDER_STORAGE_KEY, JSON.stringify(order));
}

export function readPendingPreorder(): PendingPreorder | null {
  try {
    const raw = sessionStorage.getItem(PENDING_PREORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPreorder;
    if (!parsed?.eventId || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingPreorder(): void {
  sessionStorage.removeItem(PENDING_PREORDER_STORAGE_KEY);
}
