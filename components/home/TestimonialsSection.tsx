"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/types/cms";

function getDefaultTestimonials(t: (key: string) => string) {
  return [
    {
      quote: t("testimonial1Quote"),
      name: t("testimonial1Name"),
      title: t("testimonial1Title"),
    },
    {
      quote: t("testimonial2Quote"),
      name: t("testimonial2Name"),
      title: t("testimonial2Title"),
    },
    {
      quote: t("testimonial3Quote"),
      name: t("testimonial3Name"),
      title: t("testimonial3Title"),
    },
  ];
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  heading?: string;
}

export function TestimonialsSection({ testimonials, heading }: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");

  const items =
    testimonials && testimonials.length > 0
      ? testimonials.map((tm) => ({
          quote: tm.content,
          name: tm.author_name,
          title: [tm.author_role, tm.author_company].filter(Boolean).join(" @ "),
        }))
      : getDefaultTestimonials(t);

  const [active, setActive] = useState(0);
  const current = items[active];

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
            marginBottom: "clamp(32px, 4vw, 56px)",
            background:
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {heading ?? t("defaultHeading")}
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
                width: "clamp(120px, 30vw, 200px)",
                height: "clamp(120px, 30vw, 200px)",
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
                  lineHeight: "clamp(24px, 3vw, 34px)",
                  color: "white",
                  letterSpacing: "-0.0023px",
                  margin: 0,
                  marginBottom: "clamp(16px, 2vw, 24px)",
                }}
              >
                &ldquo;{current.quote}&rdquo;
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
                {current.name}
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
                {current.title}
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
              setActive((prev) => (prev - 1 + items.length) % items.length)
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
            {items.map((_, i) => (
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
              setActive((prev) => (prev + 1) % items.length)
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
