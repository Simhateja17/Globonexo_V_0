"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "Globonexo transformed our digital strategy completely. Their team delivered a scalable platform that increased our conversion rates by 40% within the first quarter. The collaboration was seamless from day one.",
    name: "Talia Taylor",
    title: "Digital Marketing Director @ Quantum",
  },
  {
    quote:
      "Working with Globonexo has been a game-changer for our engineering team. They provided top-tier talent that integrated perfectly with our workflows and helped us ship critical features ahead of schedule.",
    name: "Marcus Chen",
    title: "VP of Engineering @ Nexora",
  },
  {
    quote:
      "The AI-driven solutions Globonexo implemented reduced our operational costs by 35%. Their practical approach to automation meant we saw real results without unnecessary complexity.",
    name: "Sarah Mitchell",
    title: "COO @ Verdant Systems",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

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
        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 50px)",
            lineHeight: "1.3em",
            letterSpacing: "-0.0506em",
            marginBottom: "clamp(32px, 4vw, 56px)",
            background:
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Customer Testimonials
        </h2>

        {/* Testimonial card */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            padding: "clamp(24px, 3vw, 48px)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start"
            style={{ gap: "clamp(24px, 3vw, 40px)" }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: "200px",
                height: "200px",
                minWidth: "200px",
                borderRadius: "20px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#397D4F",
                  filter: "blur(10px)",
                  borderRadius: "20px",
                  transform: "scale(1.1)",
                }}
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center">
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(16px, 1.6vw, 23px)",
                  lineHeight: "34px",
                  color: "white",
                  letterSpacing: "-0.0023px",
                  margin: 0,
                  marginBottom: "clamp(16px, 2vw, 24px)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "white",
                  margin: 0,
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "26px",
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                }}
              >
                {t.title}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation: arrows + dots */}
        <div
          className="flex justify-center items-center"
          style={{ gap: "16px", marginTop: "clamp(20px, 2.5vw, 32px)" }}
        >
          {/* Left arrow */}
          <button
            onClick={() =>
              setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            }
            aria-label="Previous testimonial"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              transition: "border-color 0.2s ease",
            }}
          >
            &#8592;
          </button>

          {/* Dots */}
          <div className="flex" style={{ gap: "10px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: i === active ? "#397D4F" : "rgba(255,255,255,0.3)",
                  transition: "background 0.2s ease",
                }}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() =>
              setActive((prev) => (prev + 1) % testimonials.length)
            }
            aria-label="Next testimonial"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              transition: "border-color 0.2s ease",
            }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
