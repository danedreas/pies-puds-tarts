"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

/**
 * FSA food hygiene rating badge. The official embed script inserts the badge
 * into its own parent element, so it is appended to this container on mount.
 */
export function FoodHygieneBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { businessId, ratingStyle } = siteConfig.foodHygiene;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.childElementCount > 0) return;

    const script = document.createElement("script");
    script.src = "https://ratings.food.gov.uk/embed/embed-badge.js";
    script.dataset.businessId = businessId;
    script.dataset.ratingStyle = ratingStyle;
    script.dataset.welsh = "false";
    container.appendChild(script);
  }, [businessId, ratingStyle]);

  return (
    <div
      ref={containerRef}
      className="[&_img]:h-auto [&_img]:w-44 [&_img]:min-w-0!"
    />
  );
}
