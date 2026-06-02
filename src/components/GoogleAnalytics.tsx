"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname + window.location.search
          });
        `}
      </Script>
    </>
  );
}
