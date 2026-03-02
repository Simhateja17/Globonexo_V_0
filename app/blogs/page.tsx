import { Navbar } from "@/components/home";

/* ─── shared card style (glass) ───────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "20px",
  overflow: "hidden",
};

/* ─── card heading gradient (matches "What are we offering?" style) ─── */
const cardHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "1.3em",
  letterSpacing: "-0.0506em",
  background:
    "linear-gradient(180deg, rgba(255,255,255,1) 12%, rgba(37,93,0,1) 100%)",
  backgroundSize: "100% 1.3em",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ─── card body text ──────────────────────────────────────────────────── */
const cardBodyStyle: React.CSSProperties = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "22px",
  color: "#FFFFFF",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative flex justify-center"
      style={{ background: "transparent" }}
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
          paddingTop: "calc(clamp(80px, 10vh, 120px) + 7px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          className="flex flex-col items-start w-full"
          style={{ maxWidth: "min(1280px, 96vw)" }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
              lineHeight: "65px",
              letterSpacing: "-2.783px",
              background:
                "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Blog
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
            Stay updated with the latest insights, trends, and news from the IT
            industry.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Featured Blog Card (full-width, two-column)
   ═══════════════════════════════════════════════════════════════════════ */
function FeaturedBlogCard() {
  return (
    <section className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{ maxWidth: "min(1280px, 96vw)" }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{ ...cardStyle, padding: "0" }}
      >
        {/* Left placeholder image */}
        <div
          style={{
            flex: "1 1 50%",
            minHeight: "300px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "20px 0 0 20px",
          }}
        />

        {/* Right text content */}
        <div
          className="flex flex-col justify-center"
          style={{
            flex: "1 1 50%",
            padding: "clamp(24px, 3vw, 48px)",
          }}
        >
          <h2 style={cardHeadingStyle}>
            What is digital marketing and why is important?
          </h2>

          <div
            style={{
              ...cardBodyStyle,
              marginTop: "clamp(16px, 2vw, 24px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <p style={{ margin: 0 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p style={{ margin: 0 }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p style={{ margin: 0 }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Two Smaller Blog Cards (side by side)
   ═══════════════════════════════════════════════════════════════════════ */
function SmallBlogCards() {
  return (
    <section
      className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{
        maxWidth: "min(1280px, 96vw)",
        marginTop: "clamp(24px, 3vw, 48px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "clamp(20px, 2.5vw, 40px)" }}
      >
        {[0, 1].map((i) => (
          <div key={i} style={cardStyle}>
            {/* Placeholder image area */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                background:
                  "linear-gradient(135deg, rgba(57,125,79,0.3) 0%, rgba(20,20,20,0.8) 100%)",
                borderRadius: "20px 20px 0 0",
              }}
            />

            {/* Text content */}
            <div style={{ padding: "clamp(20px, 2.5vw, 32px)" }}>
              <h3 style={cardHeadingStyle}>
                What is digital marketing and why is important?
              </h3>

              <p
                style={{
                  ...cardBodyStyle,
                  marginTop: "clamp(12px, 1.5vw, 20px)",
                  margin: 0,
                  marginBlockStart: "clamp(12px, 1.5vw, 20px)",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function BlogsPage() {
  return (
    <main
      className="relative min-h-screen bg-[#000000]"
      style={{ overflowX: "hidden", overflowY: "visible" }}
    >
      {/* Page-level green glow */}
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
      <HeroSection />
      <FeaturedBlogCard />
      <SmallBlogCards />
    </main>
  );
}
