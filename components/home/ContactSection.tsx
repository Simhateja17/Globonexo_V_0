"use client";

import { useState } from "react";

const contactInfo = [
  { text: "conatct.global@globonexo.com" },
  { text: "+49 711 123456" },
  { text: "Headquarters: Koenigstr. 10c, 70173 Stuttgart, Germany" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "19px 16px",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "8px",
  background: "transparent",
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "26px",
  letterSpacing: "-0.0016px",
  color: "white",
  outline: "none",
};

const placeholderId = "contact-placeholder-styles";

function ChevronDouble() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, marginTop: "2px" }}
    >
      <path d="M1 1L5 6L1 11" stroke="#397D4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1L12 6L8 11" stroke="#397D4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", subject: "", email: "", message: "" });

  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      {/* Placeholder color style */}
      <style>{`
        .contact-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
      `}</style>

      {/* Grid lines overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "20% 120px",
          zIndex: 1,
        }}
      />

      {/* Green glow at top center */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "70%",
          height: "60%",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(57,125,79,0.6) 0%, rgba(57,125,79,0.25) 35%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Gradient overlay fading to dark at bottom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,1,3,0) 15.6%, rgb(2,1,3) 99.9%)",
          zIndex: 2,
        }}
      />

      <div
        className="relative z-20 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1200px, 96vw)" }}
      >
        {/* Heading */}
        <h2
          className="text-center"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 50px)",
            lineHeight: "65px",
            letterSpacing: "-0.75px",
            background:
              "linear-gradient(179deg, rgba(255,255,255,1) 23%, rgba(37,93,0,1) 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          Contact Us for any questions
        </h2>

        {/* Content: 3-column layout — info | inputs | message */}
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: "clamp(24px, 3vw, 40px)" }}
        >
          {/* Left — Contact info */}
          <div
            className="flex flex-col justify-center"
            style={{
              flex: "0 0 auto",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "12px" }}>
                <ChevronDouble />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.2vw, 18px)",
                    lineHeight: "26px",
                    letterSpacing: "-0.0018px",
                    color: "white",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Middle — Name, Subject, Email inputs */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              gap: "clamp(12px, 1.5vw, 16px)",
            }}
          >
            <input
              className="contact-input"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
            <input
              className="contact-input"
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              style={inputStyle}
            />
            <input
              className="contact-input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          {/* Right — Message container with Send button inside */}
          <div
            className="relative"
            style={{
              flex: 1,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <textarea
              className="contact-input"
              placeholder="Send message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                ...inputStyle,
                border: "none",
                flex: 1,
                minHeight: "160px",
                resize: "none",
              }}
            />
            <div className="flex justify-end" style={{ padding: "0 16px 12px" }}>
              <button
                type="button"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "31px",
                  letterSpacing: "-0.1515px",
                  color: "black",
                  background: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "5px 15px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
