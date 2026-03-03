import Image from "next/image";
import type { HeroSection } from "@/lib/types/cms";

interface GlobalPresenceSectionProps {
  data?: HeroSection | null;
}

export function GlobalPresenceSection({ data }: GlobalPresenceSectionProps) {
  const heading = data?.title ?? "Global Presence";
  const extra = data?.extra_data as Record<string, string> | null;
  const mapImage = extra?.map_image ?? "/images/map.webp";

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
          {heading}
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
            src={mapImage}
            alt="World map showing global presence"
            width={2400}
            height={1312}
            sizes="(max-width: 768px) 96vw, min(1300px, 96vw)"
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
