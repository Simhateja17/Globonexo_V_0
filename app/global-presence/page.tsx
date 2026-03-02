import Image from "next/image";
import { Navbar } from "@/components/home";

export default function GlobalPresencePage() {
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

      <Navbar />

      {/* Hero */}
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
          className="relative z-10 w-full flex flex-col px-5 sm:px-6 md:px-8 lg:px-10"
          style={{
            paddingTop: "calc(clamp(80px, 10vh, 120px) + 7px)",
            paddingBottom: "clamp(60px, 8vw, 120px)",
            maxWidth: "min(1400px, 96vw)",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
              lineHeight: "clamp(40px, 5vw, 65px)",
              letterSpacing: "-0.05em",
              background: "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Global Presence
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
            Explore our international footprint across Europe, India, and North
            America.
          </p>

          {/* World map */}
          <div style={{ marginTop: "clamp(40px, 5vw, 80px)" }}>
            <Image
              src="/images/map.webp"
              alt="Globonexo world map showing presence across Europe, India, and North America"
              width={2400}
              height={1312}
              sizes="(max-width: 768px) 96vw, min(1400px, 96vw)"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
