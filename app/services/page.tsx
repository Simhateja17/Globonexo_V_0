import Image from "next/image";
import {
  Navbar,
  WhyChooseSection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from "@/components/home";

/* ─── gradient heading helper ──────────────────────────────────────────── */
const gradientHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "65px",
  letterSpacing: "-2.53px",
  background:
    "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ─── shared body text style ───────────────────────────────────────────── */
const bodyTextStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
  lineHeight: "31px",
  color: "#FFFFFF",
  letterSpacing: "-0.002px",
};

/* ─── shared green button style ────────────────────────────────────────── */
const greenButtonStyle: React.CSSProperties = {
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
};

/* ═══════════════════════════════════════════════════════════════════════════
   Section 1 – Hero
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
            Software Testing
          </h1>

          <p
            style={{
              ...bodyTextStyle,
              marginTop: "clamp(12px, 1.5vw, 20px)",
            }}
          >
            Ensure flawless performance with our comprehensive software testing
            solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 2 – End-to-End Software Testing Solutions
   ═══════════════════════════════════════════════════════════════════════ */
function EndToEndSection() {
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
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1280px, 96vw)" }}
      >
        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              End-to-End Software Testing Solutions
            </h2>

            <p style={{ ...bodyTextStyle, marginTop: "clamp(16px, 2vw, 28px)" }}>
              Our comprehensive testing services cover every aspect of your
              software development lifecycle. From unit testing to integration
              testing, we ensure your applications perform flawlessly under all
              conditions.
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              We employ industry-leading methodologies and tools to identify and
              eliminate bugs before they reach your users, saving you time and
              resources while maintaining the highest quality standards.
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>Get Started</button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src="/images/first_illustration.png"
              alt="End-to-end software testing illustration"
              width={407}
              height={360}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 3 – Automated Testing (illustration left, text right)
   ═══════════════════════════════════════════════════════════════════════ */
function AutomatedSectionLeft() {
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
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1280px, 96vw)" }}
      >
        <h2
          style={{
            ...gradientHeadingStyle,
            textAlign: "center",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          Automated Testing for Continuous Delivery
        </h2>

        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src="/images/second_illustration.png"
              alt="Automated testing illustration"
              width={407}
              height={360}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Right text ~60% */}
          <div
            className="flex flex-col"
            style={{ flex: "1 1 60%", textAlign: "right" }}
          >
            <p style={{ ...bodyTextStyle, marginTop: 0 }}>
              Our comprehensive testing services cover every aspect of your
              software development lifecycle. From unit testing to integration
              testing, we ensure your applications perform flawlessly under all
              conditions.
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              We employ industry-leading methodologies and tools to identify and
              eliminate bugs before they reach your users, saving you time and
              resources while maintaining the highest quality standards.
            </p>

            <div
              style={{
                marginTop: "clamp(24px, 3vw, 40px)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button style={greenButtonStyle}>Learn Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section 4 – Automated Testing (text left, illustration right)
   ═══════════════════════════════════════════════════════════════════════ */
function AutomatedSectionRight() {
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
        className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
        style={{ maxWidth: "min(1280px, 96vw)" }}
      >
        <div
          className="flex flex-col md:flex-row items-center w-full"
          style={{ gap: "clamp(32px, 4vw, 64px)" }}
        >
          {/* Left text ~60% */}
          <div className="flex flex-col" style={{ flex: "1 1 60%" }}>
            <h2
              style={{
                ...gradientHeadingStyle,
                textAlign: "left",
              }}
            >
              Automated Testing for Continuous Delivery
            </h2>

            <p style={{ ...bodyTextStyle, marginTop: "clamp(16px, 2vw, 28px)" }}>
              Accelerate your release cycles with our automated testing
              solutions. We build robust test suites that integrate seamlessly
              with your CI/CD pipeline, enabling faster and more reliable
              deployments.
            </p>

            <p style={{ ...bodyTextStyle, marginTop: "16px" }}>
              Our automation experts work with leading frameworks like Selenium,
              Cypress, and Playwright to create maintainable and scalable test
              automation that grows with your application.
            </p>

            <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
              <button style={greenButtonStyle}>Learn Now</button>
            </div>
          </div>

          {/* Right illustration ~40% */}
          <div
            className="flex items-center justify-center"
            style={{ flex: "1 1 40%", maxWidth: "407px" }}
          >
            <Image
              src="/images/third_illustration.png"
              alt="Continuous delivery illustration"
              width={407}
              height={360}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
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
      <HeroSection />
      <EndToEndSection />
      <AutomatedSectionLeft />
      <AutomatedSectionRight />
      <WhyChooseSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
