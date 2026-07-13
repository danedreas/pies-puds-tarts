import { randomInt } from "node:crypto";

/**
 * Unambiguous alphabet for verbal quoting at the stall
 * (no 0/O, 1/I/L).
 */
const COLLECTION_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Stripe Checkout Session metadata key for the collection auth code. */
export const COLLECTION_CODE_METADATA_KEY = "collectionCode" as const;

/**
 * Cryptographically random collection code for pre-order pickup.
 * Not sequential - hard to guess from other orders.
 */
export function generateCollectionCode(length = 8): string {
  if (length < 6 || length > 16) {
    throw new Error("Collection code length must be between 6 and 16.");
  }

  let raw = "";
  for (let i = 0; i < length; i += 1) {
    raw += COLLECTION_CODE_ALPHABET[randomInt(COLLECTION_CODE_ALPHABET.length)];
  }

  // Group for easier quoting: ABCD-EFGH
  const mid = Math.ceil(raw.length / 2);
  return `${raw.slice(0, mid)}-${raw.slice(mid)}`;
}
