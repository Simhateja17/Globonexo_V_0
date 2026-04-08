"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const CONSENT_STORAGE_KEY = "globonexo_cookie_consent_v1";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function getLocaleFromPath(pathname: string): "en" | "de" {
  return pathname.startsWith("/de") ? "de" : "en";
}

function loadGtag(measurementId: string) {
  if (!document.getElementById("ga-script")) {
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }
}

function deleteGoogleAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((chunk) => chunk.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const hostParts = location.hostname.split(".");
  const domainCandidates = new Set<string>(["", location.hostname]);
  if (hostParts.length >= 2) {
    domainCandidates.add(`.${hostParts.slice(-2).join(".")}`);
  }

  names.forEach((name) => {
    domainCandidates.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; ${
        domain ? `domain=${domain};` : ""
      } SameSite=Lax`;
    });
  });
}

export function CookieConsentManager({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || "/");

  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const copy = useMemo(() => {
    if (locale === "de") {
      return {
        title: "Cookie-Einstellungen",
        body:
          "Wir verwenden notwendige Cookies fuer den sicheren Betrieb der Website. Optionale Analyse- und Marketing-Cookies verwenden wir nur mit Ihrer Einwilligung.",
        necessary: "Notwendige Cookies (immer aktiv)",
        analytics: "Analyse-Cookies (Google Analytics)",
        marketing: "Marketing-Cookies",
        acceptAll: "Alle akzeptieren",
        reject: "Nur notwendige",
        settings: "Einstellungen",
        save: "Auswahl speichern",
        policy: "Cookie-Richtlinie lesen",
      };
    }

    return {
      title: "Cookie Preferences",
      body:
        "We use necessary cookies to run this website securely. Optional analytics and marketing cookies are used only with your consent.",
      necessary: "Necessary cookies (always on)",
      analytics: "Analytics cookies (Google Analytics)",
      marketing: "Marketing cookies",
      acceptAll: "Accept all",
      reject: "Necessary only",
      settings: "Settings",
      save: "Save choices",
      policy: "Read cookies policy",
    };
  }, [locale]);

  function persistConsent(next: ConsentState) {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  }

  function applyConsent(next: ConsentState) {
    if (next.analytics) {
      window[`ga-disable-${measurementId}`] = false;
      loadGtag(measurementId);
    } else {
      window[`ga-disable-${measurementId}`] = true;
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
      deleteGoogleAnalyticsCookies();
    }
  }

  function save(next: Omit<ConsentState, "updatedAt">) {
    const payload: ConsentState = {
      ...next,
      updatedAt: new Date().toISOString(),
    };
    persistConsent(payload);
    applyConsent(payload);
    setShowBanner(false);
    setShowSettings(false);
  }

  useEffect(() => {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      setShowBanner(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ConsentState;
      if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
        setConsent(parsed);
        setAnalyticsEnabled(parsed.analytics);
        setMarketingEnabled(parsed.marketing);
        applyConsent(parsed);
        setShowBanner(false);
        return;
      }
    } catch {
      // Ignore parse errors and show consent banner again.
    }

    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setShowBanner(true);
  }, [measurementId]);

  const policyHref = locale === "de" ? "/de/legal/cookies-policy" : "/en/legal/cookies-policy";

  if (!showBanner && !showSettings && consent) {
    return (
      <button
        type="button"
        onClick={() => {
          setShowBanner(true);
          setShowSettings(true);
          setAnalyticsEnabled(consent.analytics);
          setMarketingEnabled(consent.marketing);
        }}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          border: "1px solid var(--border-card)",
          borderRadius: 999,
          background: "var(--surface-glass)",
          color: "var(--text-primary)",
          height: 36,
          padding: "0 12px",
          fontFamily: "Roboto, sans-serif",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        {copy.settings}
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "min(920px, 100%)",
          background: "var(--surface-glass)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 14,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "16px 18px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
          pointerEvents: "auto",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "Space Grotesk, Inter, sans-serif",
            fontSize: 20,
            lineHeight: "28px",
            color: "var(--text-primary)",
          }}
        >
          {copy.title}
        </h3>
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            fontFamily: "Roboto, sans-serif",
            fontSize: 14,
            lineHeight: "22px",
            color: "var(--text-secondary)",
          }}
        >
          {copy.body}
        </p>

        {showSettings ? (
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span style={{ color: "var(--text-primary)", fontFamily: "Roboto, sans-serif" }}>
                {copy.necessary}
              </span>
              <span style={{ color: "var(--text-secondary)", fontFamily: "Roboto, sans-serif" }}>
                On
              </span>
            </div>
            <label style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span style={{ color: "var(--text-primary)", fontFamily: "Roboto, sans-serif" }}>
                {copy.analytics}
              </span>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                style={{ accentColor: "#389E0D" }}
              />
            </label>
            <label style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span style={{ color: "var(--text-primary)", fontFamily: "Roboto, sans-serif" }}>
                {copy.marketing}
              </span>
              <input
                type="checkbox"
                checked={marketingEnabled}
                onChange={(e) => setMarketingEnabled(e.target.checked)}
                style={{ accentColor: "#389E0D" }}
              />
            </label>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: true, marketing: true })}
            style={{
              border: "none",
              borderRadius: 8,
              background: "#389E0D",
              color: "#fff",
              height: 38,
              padding: "0 14px",
              fontFamily: "Roboto, sans-serif",
              cursor: "pointer",
            }}
          >
            {copy.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: false, marketing: false })}
            style={{
              border: "1px solid var(--border-card)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--text-primary)",
              height: 38,
              padding: "0 14px",
              fontFamily: "Roboto, sans-serif",
              cursor: "pointer",
            }}
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!showSettings) {
                setShowSettings(true);
                setAnalyticsEnabled(consent?.analytics ?? false);
                setMarketingEnabled(consent?.marketing ?? false);
              } else {
                save({ necessary: true, analytics: analyticsEnabled, marketing: marketingEnabled });
              }
            }}
            style={{
              border: "1px solid var(--border-card)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--text-primary)",
              height: 38,
              padding: "0 14px",
              fontFamily: "Roboto, sans-serif",
              cursor: "pointer",
            }}
          >
            {showSettings ? copy.save : copy.settings}
          </button>
          <NextLink
            href={policyHref}
            style={{
              marginLeft: "auto",
              color: "var(--text-secondary)",
              fontFamily: "Roboto, sans-serif",
              fontSize: 14,
              lineHeight: "22px",
              textDecoration: "none",
            }}
          >
            {copy.policy}
          </NextLink>
        </div>
      </div>
    </div>
  );
}
