import type { HeroSection } from "@/lib/types/cms";

interface FeaturesSectionProps {
  data?: HeroSection | null;
}

function StatCard({ value, label }: { value: string; label: string }) {
  const conicBorder: React.CSSProperties = {
    background:
      "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
    borderRadius: "36px",
    padding: "1px",
    aspectRatio: "1 / 1",
  };

  const statCardInner: React.CSSProperties = {
    background: "rgba(6, 10, 6, 1)",
    borderRadius: "36px",
    boxShadow: "0px 16px 64px 0px rgba(57,125,79,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "clamp(12px, 1.5vw, 24px)",
  };

  return (
    <div style={conicBorder}>
      <div style={statCardInner}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.5vw, 56px)",
            lineHeight: 1.1,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(11px, 1vw, 16px)",
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.6)",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

const defaultStats = [
  { value: "9", label: "Countries" },
  { value: "3", label: "Continents" },
  { value: "320", label: "IT talents in our pool" },
  { value: "15", label: "Industries" },
];

export function FeaturesSection({ data }: FeaturesSectionProps) {
  const heading = data?.title ?? "The Best IT Solutions Since 2015";
  const body1 =
    data?.description ??
    "At Globonexo, we implement innovative IT solutions focused on the evolution, adaptation, and growth of your business.";
  const extra = data?.extra_data as Record<string, unknown> | null;
  const body2 =
    (extra?.body2 as string) ??
    "Our emphasis on quality, efficiency, and long-term partnerships ensures that every project delivers tangible results and lasting success.";
  const stats = (extra?.stats as Array<{ value: string; label: string }>) ?? defaultStats;
  const ctaText = data?.cta_text ?? "Join Now";
  const ctaLink = data?.cta_link ?? "#";

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Green radial glow behind entire section */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.5) 0%, transparent 70%)",
          filter: "blur(250px)",
          zIndex: 0,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1300px, 96vw)" }}
      >
        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 50px)",
            lineHeight: "1.3em",
            letterSpacing: "-0.0506em",
            marginBottom: "clamp(32px, 4vw, 56px)",
            background:
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>

        {/* Two-column layout: text left, stats right */}
        <div
          style={{
            display: "flex",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Left column — body text + CTA */}
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(15px, 1.3vw, 20px)",
                lineHeight: "1.55em",
                color: "white",
                marginBottom: "1.2em",
              }}
            >
              {body1}
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(15px, 1.3vw, 20px)",
                lineHeight: "1.55em",
                color: "white",
                marginBottom: "clamp(28px, 3vw, 48px)",
              }}
            >
              {body2}
            </p>

            <a
              href={ctaLink}
              style={{
                display: "inline-block",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px, 1.1vw, 18px)",
                color: "white",
                background: "#397D4F",
                border: "1px solid #397D4F",
                borderRadius: "36px",
                padding: "14px 40px",
                textDecoration: "none",
                boxShadow: "0px 16px 64px 0px rgba(57,125,79,0.5)",
                cursor: "pointer",
              }}
            >
              {ctaText}
            </a>
          </div>

          {/* Right column — 2x2 stat cards */}
          <div
            style={{
              flex: "0 1 clamp(300px, 30vw, 440px)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(12px, 1.5vw, 20px)",
            }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
