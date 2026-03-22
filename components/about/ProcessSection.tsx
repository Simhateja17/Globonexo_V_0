"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export function ProcessSection() {
  const t = useTranslations("about");
  const [openIndex, setOpenIndex] = useState(0);

  const steps: ProcessStep[] = [
    { number: "01", title: t("process1Title"), description: t("process1Desc") },
    { number: "02", title: t("process2Title"), description: t("process2Desc") },
    { number: "03", title: t("process3Title"), description: t("process3Desc") },
    { number: "04", title: t("process4Title"), description: t("process4Desc") },
    { number: "05", title: t("process5Title"), description: t("process5Desc") },
    { number: "06", title: t("process6Title"), description: t("process6Desc") },
  ];

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
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(57,125,79,0.3) 0%, transparent 70%)",
          filter: "blur(200px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(960px, 96vw)" }}
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
              "linear-gradient(179deg, var(--gradient-heading-start) 23%, var(--gradient-heading-end) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("processHeading")}
        </h2>

        {/* Accordion steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 2vw, 30px)",
          }}
        >
          {steps.map((step, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={step.number}
                style={{
                  borderRadius: "clamp(20px, 3vw, 45px)",
                  background: isOpen ? "#397D4F" : "var(--faq-closed-bg)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: isOpen
                    ? "0px 5px 0px 0px var(--border-subtle)"
                    : "0px 5px 0px 0px var(--border-subtle)",
                  overflow: "hidden",
                  transition: "background 0.3s ease",
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex items-center w-full text-left"
                  style={{
                    padding: "clamp(20px, 2.5vw, 41px) clamp(24px, 4vw, 60px)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "clamp(16px, 2vw, 25px)",
                  }}
                >
                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(32px, 4vw, 60px)",
                      lineHeight: 1,
                      color: isOpen ? "white" : "var(--text-primary)",
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Step title */}
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(18px, 2vw, 30px)",
                      lineHeight: 1.2,
                      color: isOpen ? "white" : "var(--text-primary)",
                      flex: 1,
                    }}
                  >
                    {step.title}
                  </span>

                  {/* Plus/Minus icon */}
                  <div
                    style={{
                      width: "clamp(36px, 4vw, 58px)",
                      height: "clamp(36px, 4vw, 58px)",
                      borderRadius: "50%",
                      border: `1px solid ${isOpen ? "rgba(255,255,255,0.3)" : "var(--border-subtle)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: isOpen ? "rgba(255,255,255,0.1)" : "transparent",
                    }}
                  >
                    {isOpen ? (
                      <Minus
                        style={{
                          width: "clamp(16px, 1.5vw, 24px)",
                          height: "clamp(16px, 1.5vw, 24px)",
                          color: "white",
                        }}
                      />
                    ) : (
                      <Plus
                        style={{
                          width: "clamp(16px, 1.5vw, 24px)",
                          height: "clamp(16px, 1.5vw, 24px)",
                          color: "var(--text-primary)",
                        }}
                      />
                    )}
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
                    overflow: "hidden",
                    padding: isOpen
                      ? "0 clamp(24px, 4vw, 60px) clamp(20px, 2.5vw, 41px)"
                      : "0 clamp(24px, 4vw, 60px) 0",
                  }}
                >
                  {/* Divider line */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "rgba(255,255,255,0.3)",
                      marginBottom: "clamp(16px, 2vw, 30px)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.2vw, 18px)",
                      lineHeight: 1.6,
                      color: "white",
                      margin: 0,
                    }}
                  >
                    {step.description}
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
