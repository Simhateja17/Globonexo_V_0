"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About Us", href: "/about" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Blogs", href: "/blogs" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-2 left-0 right-0 z-50 flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
      style={{
        top: "8px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      {/*
        Matches hero content width: min(1280px, 96vw)
        Fluid height and padding for all desktop sizes
      */}
      <div
        className="w-full flex items-center justify-between relative"
        style={{
          maxWidth: "min(1400px, 96vw)",
          height: "clamp(56px, 5vh, 72px)",
          paddingLeft: "clamp(1rem, 2vw, 2.5rem)",
          paddingRight: "clamp(1rem, 2vw, 2.5rem)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "clamp(12px, 1.5vw, 20px)",
        }}
      >
        {/* Logo — Layer 1 SVG, 189.15×29.22, at x:40 y:18 */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/navbar-layer1.svg"
              alt="Globonexo"
              width={190}
              height={30}
              priority
            />
          </Link>
        </div>

        {/* Centre nav pill — fluid width, matches hero content scale */}
        <div
          className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
          style={{
            borderRadius: "clamp(40px, 4vw, 60px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            width: "clamp(480px, 48vw, 720px)",
            padding: "clamp(6px, 0.6vw, 12px) clamp(1.5rem, 2.5vw, 2.5rem)",
            gap: "clamp(16px, 2vw, 30px)",
            justifyContent: "center",
          }}
        >
          {/* Home with caret */}
          <Link
            href="/"
            className="flex items-center gap-[3px] text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            Home
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>

          {/* About Us */}
          <Link
            href="/about"
            className="text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            About Us
          </Link>

          {/* Services with caret */}
          <Link
            href="/services"
            className="flex items-center gap-[3px] text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            Services
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </Link>

          {/* Global Presence */}
          <Link
            href="/global-presence"
            className="text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            Global Presence
          </Link>

          {/* Blogs */}
          <Link
            href="/blogs"
            className="text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            Blogs
          </Link>
        </div>

        {/* Right side: Learn More + CTA button */}
        <div className="hidden lg:flex items-center gap-3 sm:gap-4">
          <Link
            href="/learn-more"
            className="text-white/60 hover:text-white transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5 }}
          >
            Learn More
          </Link>

          {/*
            CTA button — fluid sizing for all desktop sizes
            background: #35BC47
          */}
          <div
            style={{
              padding: "clamp(4px, 0.5vw, 6px)",
              borderRadius: "clamp(8px, 1vw, 12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <button
              className="text-white font-normal text-center whitespace-nowrap"
              style={{
                minWidth: "clamp(90px, 8vw, 130px)",
                height: "clamp(28px, 2.5vw, 38px)",
                paddingLeft: "clamp(12px, 1.2vw, 16px)",
                paddingRight: "clamp(12px, 1.2vw, 16px)",
                fontSize: "clamp(13px, 1vw, 15px)",
                lineHeight: 1.5,
                borderRadius: "clamp(6px, 0.6vw, 8px)",
                background: "#35BC47",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "inset 0px 0px 6px 3px rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(14px)",
              }}
            >
              Join waitlist
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full mt-2 left-4 right-4 rounded-2xl p-4"
          style={{
            background: "rgba(5, 2, 8, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-[13px] text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            <button
              className="mt-1 text-white text-sm font-normal text-center py-2 rounded-lg"
              style={{ background: "#35BC47" }}
            >
              Join waitlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
