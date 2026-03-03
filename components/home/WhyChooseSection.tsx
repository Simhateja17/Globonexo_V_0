import type { HeroSection } from "@/lib/types/cms";

interface WhyChooseSectionProps {
  data?: HeroSection | null;
}

const defaultCards = [
  {
    title: "Proven Technical Expertise",
    description:
      "Our team brings strong engineering foundations and hands-on experience across consulting, product development, and team augmentation. We focus on building solutions that work in real business environments.",
  },
  {
    title: "Global Talent, Local Alignment",
    description:
      "We provide access to skilled professionals from India and Eastern Europe who work in sync with your business context, ensuring smooth collaboration, clear communication, and reliable execution.",
  },
  {
    title: "Cost - Effective Delivery",
    description:
      "Our delivery models help optimize costs without compromising on quality, security, or timelines, giving you predictable outcomes and better control over IT spend.",
  },
  {
    title: "Flexibility and Scalability",
    description:
      "Scale teams and services based on your project needs, whether short-term support or long-term collaboration, with full transparency and control.",
  },
  {
    title: "Practical Use of Automation & AI",
    description:
      "We apply automation and AI selectively where they improve efficiency, accuracy, or decision-making, focusing on measurable impact rather than experimentation.",
  },
];

const conicBorder: React.CSSProperties = {
  borderRadius: "36px",
  background:
    "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
  padding: "1px",
  overflow: "hidden",
  display: "flex",
};

const cardInner: React.CSSProperties = {
  background: "rgba(6, 10, 6, 1)",
  borderRadius: "36px",
  boxShadow: "0px 16px 64px 0px rgba(57,125,79,0.5)",
  padding: "clamp(24px, 3vw, 32px)",
  minHeight: "180px",
  flex: 1,
};

function WhyCard({ title, description }: { title: string; description: string }) {
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
            color: "white",
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
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function WhyChooseSection({ data }: WhyChooseSectionProps) {
  const heading = data?.title ?? "Why our clients choose Globonexo";
  const subtitle =
    data?.subtitle ??
    "We enable seamless collaboration by applying AI-driven tools, intelligent automation, and modern IT architectures. Our focus on quality, innovation, and long-term value helps businesses achieve faster decision-making, improved efficiency, and stronger competitive positioning.";
  const extra = data?.extra_data as Record<string, unknown> | null;
  const cards = (extra?.cards as Array<{ title: string; description: string }>) ?? defaultCards;

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
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
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
            color: "white",
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
            <WhyCard key={card.title} title={card.title} description={card.description} />
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
