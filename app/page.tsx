import { Navbar, HeroSection, ServicesSection, GlobalPresenceSection } from "@/components/home";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#000000]" style={{ overflowX: "hidden", overflowY: "visible" }}>

      {/* ── Figma node 1:6104 "blur2" — page-level glow ──────────────────────
          Lives here (not in HeroSection) so it bleeds across the hero
          boundary into the ServicesSection below, matching the Figma reference.
          Figma frame: 1201 × 1120px
          Glow:  825.69 × 793.13px  at  top:269.18  left:188.16
          As % of frame: 68.75% wide, 70.83% tall, center-x=50%, center-y=59.44%
          Positioned on <main> (position:relative) so top/left are page-relative.
          backdrop-filter:blur(534px) in Figma → simulated via filter:blur below.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width:        "68.75vw",
          aspectRatio:  "825.69 / 793.13",
          /* top: 59.44% of 100vh (center-y) - half-height (35.4vh) ≈ 24vh */
          top:          "0",
          left:         "50%",
          transform:    "translateX(-50%)",
          borderRadius: "50%",
          /* #55FFAD = rgb(85, 255, 173) */
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
          /* Figma blur2 has backdrop-filter:blur(534px) — simulated here.
             534px is very large; we scale it proportionally to viewport. */
          filter: "blur(clamp(200px, 37vw, 534px))",
          /* Ensure it sits behind all content */
          zIndex: 0,
        }}
      />

      {/* ── Figma node 1:6140 "blur" — secondary green glow ──────────────────
          Figma frame: 1201 × 1120px
          Ellipse: 238 × 231px  at  top:558  left:475
          center-x: (475+119)/1201 ≈ 49.5% → horizontally centered
          top: 558/1120 ≈ 49.8vh
          background: #95DE64 (rgb 149,222,100)  backdrop-filter:blur(200px)
          At blur(200px) the visual extends ~600px beyond element bounds,
          creating the soft bright-center spot visible in the Figma reference.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width:        "19.8vw",
          aspectRatio:  "238 / 231",
          top:          "49.8vh",
          left:         "65%",
          transform:    "translateX(-50%)",
          borderRadius: "50%",
          /* #95DE64 = rgb(149, 222, 100) */
          background:   "radial-gradient(ellipse at 50% 50%, rgba(149,222,100,1) 0%, rgba(149,222,100,0) 100%)",
          filter:       "blur(200px)",
          zIndex:       0,
        }}
      />

      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GlobalPresenceSection />
    </main>
  );
}
