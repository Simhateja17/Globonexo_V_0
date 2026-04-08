import { Navbar } from "@/components/home/Navbar";
import { Link } from "@/i18n/navigation";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

type LegalPageTemplateProps = {
  locale: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPageTemplate({
  locale,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageTemplateProps) {
  const isDe = locale === "de";

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
        <div
          className="mb-6"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            lineHeight: "22px",
            color: "var(--text-secondary)",
          }}
        >
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
            {isDe ? "Startseite" : "Home"}
          </Link>
          <span>{` / ${isDe ? "Rechtliches" : "Legal"}`}</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "Space Grotesk, Inter, sans-serif",
            fontSize: "clamp(30px, 4.2vw, 42px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            marginTop: "14px",
            marginBottom: "8px",
            fontFamily: "Space Grotesk, Inter, sans-serif",
            fontSize: "18px",
            lineHeight: "28px",
            color: "var(--text-secondary)",
          }}
        >
          {description}
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            lineHeight: "22px",
            color: "var(--text-secondary)",
          }}
        >
          {updatedAt}
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <article key={section.heading} className="space-y-3">
              <h2
                style={{
                  margin: 0,
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "24px",
                  lineHeight: "32px",
                }}
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={`${section.heading}-${paragraph.slice(0, 24)}`}
                  style={{
                    margin: 0,
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul
                  className="pl-5 space-y-2"
                  style={{
                    marginTop: "6px",
                    marginBottom: 0,
                    color: "var(--text-secondary)",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    lineHeight: "26px",
                  }}
                >
                  {section.list.map((item) => (
                    <li key={`${section.heading}-${item.slice(0, 24)}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
