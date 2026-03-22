"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

function NavDropdown({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavLink;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-[3px] transition-colors whitespace-nowrap"
        style={{
          fontSize: "clamp(13px, 1vw, 15px)",
          lineHeight: 1.5,
          color: "var(--nav-text)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {item.label}
        <ChevronDown
          className="w-3.5 h-3.5 opacity-60 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: "220px",
            borderRadius: "12px",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-glass)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "8px",
            zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          {item.dropdown!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href as "/services"}
              className="block px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              style={{
                fontSize: "14px",
                color: "var(--nav-text)",
              }}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--nav-text-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--nav-text)";
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navLinks: NavLink[] = [
    { label: t("home"), href: "/" },
    { label: t("aboutUs"), href: "/about" },
    {
      label: t("services"),
      href: "/services",
      dropdown: [
        { label: t("servicesConsulting"), href: "/services" },
        { label: t("servicesSolutions"), href: "/services/hardware-testing" },
        { label: t("servicesTalentPool"), href: "/services/talent-pool" },
      ],
    },
    {
      label: t("products"),
      href: "/products/defense",
      dropdown: [
        { label: t("productsDefense"), href: "/products/defense" },
        { label: t("productsResearch"), href: "/products/research" },
        { label: t("productsAdvertising"), href: "/products/advertising" },
      ],
    },
    { label: t("contact"), href: "/#contact" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
      <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Translucent strip above the pill bar */}
      <div
        className="w-full"
        style={{
          height: "8px",
          background: "var(--surface-glass-strip)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      <div className="flex justify-center px-3 sm:px-5 md:px-8 lg:px-10">
      <div
        className="w-full flex items-center justify-between relative rounded-[clamp(12px,1.5vw,20px)]"
        style={{
          maxWidth: "min(1400px, 96vw)",
          height: "clamp(56px, 5vh, 72px)",
          paddingLeft: "clamp(1rem, 2vw, 2.5rem)",
          paddingRight: "clamp(1rem, 2vw, 2.5rem)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--surface-glass)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/navbar-layer1.svg"
              alt="Globonexo"
              width={190}
              height={30}
              priority
              className="dark:brightness-100 brightness-0"
            />
          </Link>
        </div>

        {/* Centre nav pill */}
        <div
          className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
          style={{
            borderRadius: "clamp(40px, 4vw, 60px)",
            border: "1px solid var(--border-subtle)",
            width: "clamp(480px, 48vw, 720px)",
            padding: "clamp(6px, 0.6vw, 12px) clamp(1.5rem, 2.5vw, 2.5rem)",
            gap: "clamp(16px, 2vw, 30px)",
            justifyContent: "center",
          }}
        >
          {navLinks.map((item) =>
            item.dropdown ? (
              <NavDropdown
                key={item.href}
                item={item}
                open={openDropdown === item.href}
                onOpen={() => setOpenDropdown(item.href)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href as "/"}
                className="transition-colors whitespace-nowrap"
                style={{
                  fontSize: "clamp(13px, 1vw, 15px)",
                  lineHeight: 1.5,
                  color: "var(--nav-text)",
                }}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right side: Language switcher + Theme toggle + CTA button */}
        <div className="hidden lg:flex items-center gap-3 sm:gap-4">
          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5, color: "var(--nav-text)" }}
            title={tLang("switchTo")}
          >
            <Globe className="w-4 h-4" />
            {tLang("current")}
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full transition-colors"
              style={{
                width: "36px",
                height: "36px",
                color: "var(--nav-text)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* CTA button */}
          <div
            style={{
              padding: "clamp(4px, 0.5vw, 6px)",
              borderRadius: "clamp(8px, 1vw, 12px)",
              border: "1px solid var(--border-subtle)",
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
              {t("joinWaitlist")}
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden"
          style={{ color: "var(--text-primary)" }}
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
            background: "var(--mobile-menu-bg)",
            border: "1px solid var(--border-card)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div key={item.href}>
                  {/* Parent with chevron */}
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.href ? null : item.href
                      )
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-[13px] rounded-lg transition-colors"
                    style={{ color: "var(--nav-text)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {item.label}
                    <ChevronDown
                      className="w-4 h-4 opacity-60 transition-transform"
                      style={{
                        transform:
                          mobileExpanded === item.href
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {/* Sub-links */}
                  {mobileExpanded === item.href && (
                    <div className="flex flex-col gap-0.5 pl-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href as "/services"}
                          className="px-4 py-2.5 text-[13px] rounded-lg transition-colors"
                          style={{ color: "var(--nav-text)" }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className="flex items-center justify-between px-4 py-3 text-[13px] rounded-lg transition-colors"
                  style={{ color: "var(--nav-text)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Mobile language switcher */}
            <button
              onClick={() => {
                switchLocale();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 text-[13px] rounded-lg transition-colors"
              style={{ color: "var(--nav-text)" }}
            >
              <Globe className="w-4 h-4" />
              {tLang("switchTo")}
            </button>

            {/* Mobile theme toggle */}
            {mounted && (
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 text-[13px] rounded-lg transition-colors"
                style={{ color: "var(--nav-text)" }}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            )}

            <hr style={{ borderColor: "var(--border-card)" }} className="my-2" />
            <button
              className="mt-1 text-white text-sm font-normal text-center py-2 rounded-lg"
              style={{ background: "#35BC47" }}
            >
              {t("joinWaitlist")}
            </button>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
}
