"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types/cms";

const defaultFaqs = [
  {
    question: "What services does Globonexo offer?",
    answer:
      "We provide IT consulting, product development, team augmentation, and AI-driven automation solutions. Our services span across web and mobile development, cloud architecture, and digital transformation.",
  },
  {
    question: "How does Globonexo ensure project quality?",
    answer:
      "We follow industry-standard methodologies with rigorous code reviews, automated testing, and continuous integration. Our teams maintain transparent communication and regular progress updates throughout every engagement.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across fintech, healthcare, e-commerce, SaaS, and enterprise sectors. Our diverse experience allows us to bring cross-industry insights and best practices to every project.",
  },
  {
    question: "How quickly can you scale a development team?",
    answer:
      "We can onboard skilled professionals within 1-2 weeks depending on the role requirements. Our talent pool across India and Eastern Europe ensures we find the right fit for your project needs.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "We offer flexible models including dedicated teams, time & materials, and fixed-price engagements. Each model is designed to give you full transparency, predictable costs, and the ability to scale as needed.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M1 1L11 11L21 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FaqSectionProps {
  faqs?: FAQ[];
  heading?: string;
}

export function FaqSection({ faqs, heading }: FaqSectionProps) {
  const items =
    faqs && faqs.length > 0
      ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : defaultFaqs;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      {/* Green radial glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          top: "20%",
          left: "20%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.3) 0%, transparent 70%)",
          filter: "blur(200px)",
          zIndex: 0,
        }}
      />

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
            lineHeight: "clamp(40px, 5vw, 65px)",
            letterSpacing: "-0.05em",
            marginBottom: "clamp(32px, 4vw, 56px)",
            background:
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {heading ?? "Frequently Asked Questions"}
        </h2>

        {/* Accordion */}
        <div
          className="mx-auto"
          style={{
            maxWidth: "780px",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: "10px",
                  background: isOpen ? "#397D4F" : "rgba(66,66,66,0.5)",
                  backdropFilter: "blur(14px)",
                  boxShadow: isOpen
                    ? "0px 3px 20px 5px rgba(57,125,79,0.2)"
                    : "0px 3px 49px 9px rgba(0,0,0,0.06)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex items-center w-full text-left"
                  style={{
                    padding: "clamp(16px, 2vw, 24px) clamp(20px, 3vw, 40px)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(16px, 1.5vw, 24px)",
                      lineHeight: "normal",
                      color: "white",
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
                    overflow: "hidden",
                    padding: isOpen
                      ? "0 clamp(20px, 3vw, 40px) clamp(16px, 2vw, 24px)"
                      : "0 clamp(20px, 3vw, 40px) 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.3vw, 20px)",
                      lineHeight: "normal",
                      color: "white",
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
