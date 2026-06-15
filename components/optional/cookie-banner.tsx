"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { modules } from "@/config/modules";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

type ConsentState = "pending" | "accepted" | "rejected";

function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return "pending";
}

function setStoredConsent(value: "accepted" | "rejected") {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("cookie-consent-change"));
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getStoredConsent,
    () => "pending" as ConsentState,
  );
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (!modules.cookieConsent) return;

    function openPreferences() {
      setShowPreferences(true);
    }

    document.querySelectorAll("[data-cookie-preferences]").forEach((el) => {
      el.addEventListener("click", openPreferences);
    });

    return () => {
      document.querySelectorAll("[data-cookie-preferences]").forEach((el) => {
        el.removeEventListener("click", openPreferences);
      });
    };
  }, []);

  if (!modules.cookieConsent) return null;

  const visible = consent === "pending" || showPreferences;
  if (!visible) return null;

  function accept() {
    setStoredConsent("accepted");
    setShowPreferences(false);
  }

  function reject() {
    setStoredConsent("rejected");
    setShowPreferences(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg sm:p-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl space-y-2">
          <p id="cookie-banner-title" className="font-medium">
            Cookie preferences
          </p>
          <p className="text-sm text-muted-foreground">
            We use essential cookies for site functionality. With your consent, we may also use
            analytics cookies to understand how the site is used.{" "}
            <Link href="/cookies" className="underline-offset-4 hover:underline">
              Cookie policy
            </Link>
          </p>
          {consent !== "pending" && (
            <p className="text-xs text-muted-foreground">
              Current preference: {consent === "accepted" ? "Analytics accepted" : "Analytics rejected"}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={reject}>
            Reject analytics
          </Button>
          <Button onClick={accept}>Accept analytics</Button>
        </div>
      </div>
    </div>
  );
}

export function hasAnalyticsConsent(): boolean {
  if (!modules.cookieConsent) return modules.gtm;
  return getStoredConsent() === "accepted";
}

export { CONSENT_KEY };
