import Image from "next/image";
import { Navbar, FaqSection, ContactSection } from "@/components/home";

/* ─── gradient heading helper ──────────────────────────────────────────── */
const gradientHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "65px",
  letterSpacing: "-2.53px",
  background:
    "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textAlign: "center",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Section 1 – About Hero
   ═══════════════════════════════════════════════════════════════════════ */
function AboutHero() {
  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        minHeight: "100vh",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Stars overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/stars-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      <div
        className="relative z-10 w-full flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          paddingTop: "clamp(100px, 12vh, 160px)",
          paddingBottom: "clamp(60px, 8vh, 120px)",
        }}
      >
        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{
            maxWidth: "min(1280px, 96vw)",
            gap: "clamp(32px, 4vw, 64px)",
          }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
                lineHeight: "65px",
                letterSpacing: "-2.783px",
                background:
                  "linear-gradient(179deg, #FFF 54%, #95DE64 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About us
            </h1>

            <p
              style={{
                marginTop: "clamp(12px, 1.5vw, 20px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
                lineHeight: "31px",
                color: "#FFFFFF",
              }}
            >
              Although, final stages of the internal network gives a complete
              experience of The Parameter of Speculative Environment
            </p>

            <h2
              style={{
                marginTop: "clamp(24px, 3vw, 40px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.5vw + 0.5rem, 55px)",
                lineHeight: "40px",
                color: "#F0F0F0",
              }}
            >
              The best IT solution since 2015
            </h2>

            <p
              style={{
                marginTop: "clamp(16px, 2vw, 28px)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
                lineHeight: "31px",
                color: "#FFFFFF",
              }}
            >
              At Globonexo, we implement innovative IT solutions focused on the
              evolution, adaptation, and growth of your business. From outstaffing
              and product development to AI-driven automation, we deliver custom
              technology that scales with your ambitions.
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "31px",
                  color: "white",
                  background: "#397D4F",
                  borderRadius: "36px",
                  border: "none",
                  padding: "10px 32px",
                  cursor: "pointer",
                  boxShadow: "0px 16px 64px rgba(57,125,79,0.5)",
                }}
              >
                Join Now
              </button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "480px" }}
          >
            <Image
              src="/images/about-illustration.png"
              alt="IT solutions illustration"
              width={654}
              height={816}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 2 – Journey & Background
   ═══════════════════════════════════════════════════════════════════════ */
function JourneySection() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1200px, 96vw)" }}
      >
        <h2 style={{ ...gradientHeadingStyle, marginBottom: "clamp(32px, 4vw, 56px)" }}>
          The journey and Background of the Company
        </h2>

        <div
          className="mx-auto"
          style={{
            maxWidth: "1100px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
            lineHeight: "32px",
            letterSpacing: "-0.008px",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <p style={{ margin: 0 }}>
            Globonexo was born out of a shared vision between two passionate
            entrepreneurs in Warsaw, Poland. After countless discussions, deep
            research, and leveraging our international experience and expertise, we
            recognised a growing need &ndash; businesses across Europe and the U.S.
            required skilled IT talent to drive innovation, but access to top
            developers was often limited by local availability and high costs.
          </p>
          <p style={{ margin: 0 }}>
            This insight prompted us to start Globonexo: a company that unites
            businesses with global IT talent through strategic outstaffing
            solutions. From its very beginning, our goal was to bridge the gap
            between companies and talented engineers with the help of the
            development services from our Indian, Polish, Ukrainian, and Moldovan
            centres with high-quality service providers.
          </p>
          <p style={{ margin: 0 }}>
            Starting as an idea over brainstorming sessions in Warsaw, the company
            has grown into a firm serving clients from various industries such as
            automotive, fintech, healthcare, and manufacturing.
          </p>
          <p style={{ margin: 0 }}>
            Our story at Globonexo is that of collaboration, growth, and global
            connectivity. We believe that innovation knows no borders, and by
            empowering companies with the right talent, we help them unlock new
            possibilities and scale to greater heights.
          </p>
          <p style={{ margin: 0 }}>
            This is just the beginning &ndash; and we&rsquo;re excited to grow
            alongside our clients, partners, and dedicated team of developers
            worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 3 – Executives
   ═══════════════════════════════════════════════════════════════════════ */
const executives = [
  { name: "Talia Taylor", title: "Digital Marketing Director @ Quantum" },
  { name: "Talia Taylor", title: "Digital Marketing Director @ Quantum" },
  { name: "Talia Taylor", title: "Digital Marketing Director @ Quantum" },
];

function ExecutivesSection() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      {/* Green radial glow behind cards */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.35) 0%, transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1200px, 96vw)" }}
      >
        <h2 style={{ ...gradientHeadingStyle, marginBottom: "clamp(32px, 4vw, 56px)" }}>
          Bios and photos of key executives and managers
        </h2>

        <div
          className="flex flex-wrap justify-center"
          style={{ gap: "clamp(24px, 3vw, 48px)" }}
        >
          {executives.map((exec, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ width: "clamp(180px, 18vw, 240px)" }}
            >
              {/* Green-bordered photo placeholder */}
              <div
                style={{
                  width: "clamp(160px, 16vw, 200px)",
                  height: "clamp(160px, 16vw, 200px)",
                  borderRadius: "16px",
                  border: "2px solid #397D4F",
                  background: "rgba(57,125,79,0.1)",
                  marginBottom: "16px",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.4",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {exec.name}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  marginTop: "4px",
                }}
              >
                {exec.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main
      className="relative min-h-screen bg-[#000000]"
      style={{ overflowX: "hidden", overflowY: "visible" }}
    >
      {/* Page-level green glow (matches homepage pattern) */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "68.75vw",
          aspectRatio: "825.69 / 793.13",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: [
            "radial-gradient(ellipse at 45% 20%,",
            "  rgba(85,255,173,0.92)   0%,",
            "  rgba(85,255,173,0.76)  14%,",
            "  rgba(85,255,173,0.56)  30%,",
            "  rgba(85,255,173,0.33)  48%,",
            "  rgba(85,255,173,0.16)  64%,",
            "  rgba(85,255,173,0.06)  80%,",
            "  rgba(85,255,173,0)    100%",
            ")",
          ].join(""),
          filter: "blur(clamp(200px, 37vw, 534px))",
          zIndex: 0,
        }}
      />

      {/* Secondary green glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "19.8vw",
          aspectRatio: "238 / 231",
          top: "49.8vh",
          left: "65%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(149,222,100,1) 0%, rgba(149,222,100,0) 100%)",
          filter: "blur(200px)",
          zIndex: 0,
        }}
      />

      <Navbar />
      <AboutHero />
      <JourneySection />
      <ExecutivesSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
