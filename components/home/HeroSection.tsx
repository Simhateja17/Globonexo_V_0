import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: "transparent" }}
    >

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          paddingTop: "clamp(100px, 12vh, 160px)",
          paddingBottom: "clamp(60px, 8vh, 120px)",
        }}
      >
        <div
          className="flex flex-col items-center w-full"
          style={{ maxWidth: "min(1280px, 96vw)" }}
        >

          <h1
            className="w-full text-center gradient-text"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 3.5vw + 1rem, 55px)",
              lineHeight: "1.2",
              letterSpacing: "-0.05em",
            }}
          >
            International IT &amp; AI Expert Hub For{" "}
            <br className="hidden sm:block" />
            Your Universal Success
          </h1>

          <p
            className="text-center w-full"
            style={{
              marginTop: "clamp(20px, 2.5vw, 36px)",
              maxWidth: "100%",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.25vw + 0.5rem, 20px)",
              lineHeight: "1.55",
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            Globonexo is an international IT consulting company that helps European
            businesses grow through AI-driven technologies and strong engineering expertise.
            We partner closely with organisations to build intelligent, efficient, and
            future-ready systems, using AI, automation, and modern IT practices to drive
            real business results and long-term growth.
          </p>

          <div
            className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
            style={{ marginTop: "clamp(24px, 3vw, 48px)" }}
          >
            <div
              className="relative"
              style={{
                padding: "1px",
                borderRadius: "clamp(24px, 2.5vw, 36px)",
                background: "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
                boxShadow: "0px 16px 64px 0px rgba(104, 1, 255, 0.12)",
              }}
            >
              <Link
                href="/join"
                className="relative flex items-center justify-center overflow-hidden px-6"
                style={{
                  minWidth: "clamp(110px, 10vw, 143px)",
                  height: "clamp(36px, 3.2vw, 44px)",
                  paddingLeft: "clamp(16px, 1.5vw, 24px)",
                  paddingRight: "clamp(16px, 1.5vw, 24px)",
                  borderRadius: "clamp(22px, 2.2vw, 35px)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: "inherit",
                    background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                  }}
                />
                <span className="relative z-10">Join Us</span>
              </Link>
            </div>

            <Link
              href="/consultation"
              className="flex items-center justify-center px-5"
              style={{
                minWidth: "clamp(160px, 14vw, 202px)",
                height: "clamp(36px, 3.2vw, 44px)",
                paddingLeft: "clamp(16px, 1.5vw, 20px)",
                paddingRight: "clamp(16px, 1.5vw, 20px)",
                borderRadius: "clamp(24px, 2.5vw, 36px)",
                background: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(13px, 1.1vw, 16px)",
                letterSpacing: "-0.01em",
                color: "#000000",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Schedule a Consultation
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
