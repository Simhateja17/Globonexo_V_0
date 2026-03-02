import Image from "next/image";

export function GlobalPresenceSection() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(40px, 5vw, 80px)",
        background: "transparent",
      }}
    >
      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1300px, 96vw)" }}
      >
        <h2
          className="mb-8"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 50px)",
            lineHeight: "1.3em",
            letterSpacing: "-0.0506em",
            background: "linear-gradient(180deg, #FFFFFF 54.17%, #95DE64 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Global Presence
        </h2>

        {/* Map container */}
        <div className="relative w-full">
          {/* Green radial glow behind map */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: "60%",
              height: "50%",
              bottom: 0,
              left: "20%",
              background:
                "radial-gradient(ellipse, rgba(55,200,100,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: 0,
            }}
          />

          <Image
            src="/images/map.png"
            alt="World map showing global presence"
            width={1200}
            height={600}
            className="relative w-full h-auto"
            style={{ zIndex: 1 }}
          />

          {/* Bottom fade overlay */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}
