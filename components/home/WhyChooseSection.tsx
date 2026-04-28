import { getTranslations } from "next-intl/server";
import type { HeroSection } from "@/lib/types/cms";

interface WhyChooseSectionProps {
  data?: HeroSection | null;
}

function getDefaultCards(t: (key: string) => string) {
  return [
    {
      title: t("card1Title"),
      description: t("card1Desc"),
    },
    {
      title: t("card2Title"),
      description: t("card2Desc"),
    },
    {
      title: t("card3Title"),
      description: t("card3Desc"),
    },
    {
      title: t("card4Title"),
      description: t("card4Desc"),
    },
    {
      title: t("card5Title"),
      description: t("card5Desc"),
    },
  ];
}

const conicBorder: React.CSSProperties = {
  borderRadius: "36px",
  background:
    "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
  padding: "1px",
  overflow: "hidden",
  display: "flex",
};

const cardInner: React.CSSProperties = {
  background: "var(--surface-card)",
  borderRadius: "36px",
  boxShadow: "0px 16px 64px 0px var(--glow-green)",
  padding: "clamp(24px, 3vw, 32px)",
  minHeight: "180px",
  flex: 1,
};

function WhyCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div style={conicBorder}>
      <div style={cardInner}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(20px, 2vw, 30px)",
            lineHeight: 1.03,
            letterSpacing: "-0.003px",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.3vw, 20px)",
            lineHeight: 1.3,
            color: "var(--text-tertiary)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export async function WhyChooseSection({ data }: WhyChooseSectionProps) {
  const t = await getTranslations("whyChoose");

  const heading = data?.title ?? t("defaultHeading");
  const subtitle = data?.subtitle ?? t("defaultSubtitle");
  const extra = data?.extra_data as Record<string, unknown> | null;
  const cards = (extra?.cards as Array<{ title: string; description: string }>) ?? getDefaultCards(t);


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
      {/* Green radial glow */}
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
            marginBottom: "clamp(16px, 2vw, 24px)",
            background:
              "linear-gradient(179deg, var(--gradient-heading-start) 23%, var(--gradient-heading-end) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {heading}
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(15px, 1.3vw, 20px)",
            lineHeight: 1.6,
            color: "var(--text-primary)",
            maxWidth: "778px",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          {subtitle}
        </p>

        {/* 2x2 grid for first 4 cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            gap: "clamp(16px, 2vw, 24px)",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          {cards.slice(0, 4).map((card) => (
            <WhyCard
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* 5th card centered */}
        {cards[4] && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "min(100%, 588px)" }}>
              <WhyCard title={cards[4].title} description={cards[4].description} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
