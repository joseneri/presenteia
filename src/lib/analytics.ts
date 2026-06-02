"use client";

import { track } from "@vercel/analytics/react";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      target: string,
      params?: AnalyticsParams
    ) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as AnalyticsParams;

  track(name, cleanParams);
  window.gtag?.("event", name, cleanParams);
}

export function trackPageView(path: string) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return;
  }

  window.gtag?.("config", measurementId, {
    page_path: path
  });
}
