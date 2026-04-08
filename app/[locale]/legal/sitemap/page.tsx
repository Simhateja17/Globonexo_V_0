import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/home/Navbar";
import { Link } from "@/i18n/navigation";

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isDe = locale === "de";

  const sections = [
    {
      heading: isDe ? "Unternehmen" : "Company",
      links: [
        { href: "/", label: isDe ? "Startseite" : "Home" },
        { href: "/about", label: isDe ? "Ueber uns" : "About" },
        { href: "/global-presence", label: isDe ? "Globale Praesenz" : "Global Presence" },
        { href: "/join", label: isDe ? "Jetzt beitreten" : "Join Now" },
      ],
    },
    {
      heading: isDe ? "Leistungen und Produkte" : "Services and Products",
      links: [
        { href: "/services", label: isDe ? "Services" : "Services" },
        { href: "/services/solutions", label: isDe ? "Loesungen" : "Solutions" },
        { href: "/services/talent-pool", label: isDe ? "Talent Pool" : "Talent Pool" },
        { href: "/products", label: isDe ? "Produkte" : "Products" },
        { href: "/blogs", label: isDe ? "Blog" : "Blog" },
      ],
    },
    {
      heading: isDe ? "Rechtliches" : "Legal",
      links: [
        { href: "/legal/privacy-policy", label: isDe ? "Datenschutzerklaerung" : "Privacy Policy" },
        { href: "/legal/terms-of-service", label: isDe ? "Nutzungsbedingungen" : "Terms of Service" },
        { href: "/legal/gdpr-compliance", label: isDe ? "DSGVO-Konformitaet" : "GDPR Compliance" },
        { href: "/legal/cookies-policy", label: isDe ? "Cookie-Richtlinie" : "Cookies Policy" },
        { href: "/legal/imprint", label: isDe ? "Impressum" : "Imprint" },
      ],
    },
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
          {isDe ? "Sitemap" : "Sitemap"}
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
            ? "Alle wichtigen Seiten auf einen Blick."
            : "A quick index of all key pages."}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2
                style={{
                  margin: 0,
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "22px",
                  lineHeight: "30px",
                }}
              >
                {section.heading}
              </h2>
              <div className="flex flex-col gap-2">
                {section.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as "/"}
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
