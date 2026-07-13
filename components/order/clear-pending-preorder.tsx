"use client";

import { useEffect } from "react";
import { clearPendingPreorder } from "@/lib/pending-preorder";

/** Clears the in-browser basket after a successful Stripe return. */
export function ClearPendingPreorder() {
  useEffect(() => {
    clearPendingPreorder();
  }, []);

  return null;
}
