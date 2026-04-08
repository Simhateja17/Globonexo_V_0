import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/home/Navbar";
import { Link } from "@/i18n/navigation";

export default async function LegalCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isDe = locale === "de";

  const docs = [
    { href: "/legal/privacy-policy", label: isDe ? "Datenschutzerklaerung" : "Privacy Policy" },
    { href: "/legal/terms-of-service", label: isDe ? "Nutzungsbedingungen" : "Terms of Service" },
    { href: "/legal/gdpr-compliance", label: isDe ? "DSGVO-Konformitaet" : "GDPR Compliance" },
    { href: "/legal/cookies-policy", label: isDe ? "Cookie-Richtlinie" : "Cookies Policy" },
    { href: "/legal/imprint", label: isDe ? "Impressum" : "Imprint" },
    { href: "/legal/sitemap", label: isDe ? "Sitemap" : "Sitemap" },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--text-primary)" }}
    >
      <Navbar />
      <section
        className="mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "980px", paddingTop: "120px", paddingBottom: "80px" }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "Space Grotesk, Inter, sans-serif",
            fontSize: "clamp(30px, 4.2vw, 42px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {isDe ? "Rechtliches Zentrum" : "Legal Center"}
        </h1>
        <p
          style={{
            marginTop: "14px",
            marginBottom: "24px",
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: "26px",
            color: "var(--text-secondary)",
          }}
        >
          {isDe
            ? "Alle rechtlichen Dokumente an einem Ort."
            : "All legal documents in one place."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {docs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href as "/legal"}
              style={{
                border: "1px solid var(--border-card)",
                borderRadius: "10px",
                padding: "14px 16px",
                textDecoration: "none",
                color: "var(--text-primary)",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {doc.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
