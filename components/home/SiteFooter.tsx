"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const locale = useLocale();
  const isDe = locale === "de";

  const legalLinks = [
    { href: "/legal/privacy-policy", label: isDe ? "Datenschutzerklaerung" : "Privacy Policy" },
    { href: "/legal/terms-of-service", label: isDe ? "Nutzungsbedingungen" : "Terms of Service" },
    { href: "/legal/gdpr-compliance", label: isDe ? "DSGVO-Konformitaet" : "GDPR Compliance" },
    { href: "/legal/cookies-policy", label: isDe ? "Cookie-Richtlinie" : "Cookies Policy" },
    { href: "/legal/imprint", label: isDe ? "Impressum" : "Imprint" },
    { href: "/legal/sitemap", label: isDe ? "Sitemap" : "Sitemap" },
  ];

  const serviceLinks = [
    { href: "/services", label: isDe ? "Services" : "Services" },
    { href: "/services/solutions", label: isDe ? "Loesungen" : "Solutions" },
    { href: "/services/talent-pool", label: isDe ? "Talent Pool" : "Talent Pool" },
    { href: "/products", label: isDe ? "Produkte" : "Products" },
  ];

  return (
    <footer
      className="w-full border-t"
      style={{ borderColor: "var(--border-card)", backgroundColor: "var(--page-bg)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-8 lg:px-10 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <h3
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontFamily: "Roboto, sans-serif",
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 500,
            }}
          >
            Globonexo
          </h3>
          <p
            style={{
              margin: 0,
              color: "var(--text-secondary)",
              fontFamily: "Roboto, sans-serif",
              fontSize: "13px",
              lineHeight: "20px",
            }}
          >
            {isDe
              ? "Globonexo International IT Consulting GmbH"
              : "Globonexo International IT Consulting GmbH"}
          </p>
        </div>

        <div className="space-y-3">
          <h4
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 500,
            }}
          >
            {isDe ? "Rechtliches" : "Legal"}
          </h4>
          <div className="flex flex-col gap-2">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/legal/privacy-policy"}
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  lineHeight: "22px",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 500,
            }}
          >
            {isDe ? "Leistungen" : "Services"}
          </h4>
          <div className="flex flex-col gap-2">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/services"}
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  lineHeight: "22px",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
