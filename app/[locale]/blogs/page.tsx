import { Navbar } from "@/components/home";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { fetchBlogPosts } from "@/lib/queries/cms";
import type { BlogPost, Locale } from "@/lib/types/cms";
import { Suspense } from "react";

/* ─── shared card style (glass) ───────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: "var(--surface-card)",
  border: "1px solid var(--border-card)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "20px",
  overflow: "hidden",
};

/* ─── card heading gradient (matches "What are we offering?" style) ─── */
const cardHeadingStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.2vw, 50px)",
  lineHeight: "1.3em",
  letterSpacing: "-0.0506em",
  background:
    "linear-gradient(180deg, var(--gradient-heading-start) 12%, var(--gradient-heading-end) 100%)",
  backgroundSize: "100% 1.3em",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const smallCardHeadingStyle: React.CSSProperties = {
  ...cardHeadingStyle,
  fontSize: "clamp(20px, 2.5vw, 36px)",
};

/* ─── card body text ──────────────────────────────────────────────────── */
const cardBodyStyle: React.CSSProperties = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "22px",
  color: "var(--text-primary)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════════════════ */
async function HeroSection() {
  const t = await getTranslations("blog");
  return (
    <section
      className="relative flex justify-center"
      style={{ background: "transparent" }}
    >
      {/* Stars overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/stars-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      <div
        className="relative z-10 w-full flex justify-center px-5 sm:px-6 md:px-8 lg:px-10"
        style={{
          paddingTop: "calc(clamp(80px, 10vh, 120px) + 7px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <div
          className="flex flex-col items-start w-full"
          style={{ maxWidth: "min(1400px, 96vw)" }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw + 1rem, 55px)",
              lineHeight: "clamp(40px, 5vw, 65px)",
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(180deg, var(--gradient-heading-start) 54%, #95DE64 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </h1>

          <p
            style={{
              marginTop: "clamp(12px, 1.5vw, 20px)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.25vw + 0.25rem, 20px)",
              lineHeight: "31px",
              color: "var(--text-primary)",
            }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Featured Blog Card (full-width, two-column)
   ═══════════════════════════════════════════════════════════════════════ */
async function FeaturedBlogCard({ post, locale }: { post: BlogPost; locale: string }) {
  const t = await getTranslations("blog");
  return (
    <section className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{ maxWidth: "min(1400px, 96vw)" }}
    >
      <Link href={`/blogs/${post.slug}`}>
        <div
          className="flex flex-col md:flex-row hover:border-white/20 transition-colors cursor-pointer"
          style={{ ...cardStyle, padding: "0" }}
        >
          {/* Left image */}
          <div
            style={{
              flex: "1 1 50%",
              minHeight: "300px",
              background: post.cover_image
                ? `url(${post.cover_image}) center/cover no-repeat`
                : "rgba(255, 255, 255, 0.03)",
            }}
          />

          {/* Right text content */}
          <div
            className="flex flex-col justify-center"
            style={{
              flex: "1 1 50%",
              padding: "clamp(24px, 3vw, 48px)",
            }}
          >
            <h2 style={cardHeadingStyle}>{post.title}</h2>

            <div
              style={{
                ...cardBodyStyle,
                marginTop: "clamp(16px, 2vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <p style={{ margin: 0 }}>
                {post.excerpt || t("readMore")}
              </p>
            </div>

            <div style={{ marginTop: "clamp(16px, 2vw, 24px)" }}>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Blog Cards Grid
   ═══════════════════════════════════════════════════════════════════════ */
async function BlogCards({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  if (posts.length === 0) return null;
  const t = await getTranslations("blog");

  return (
    <section
      className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{
        maxWidth: "min(1400px, 96vw)",
        marginTop: "clamp(24px, 3vw, 48px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "clamp(20px, 2.5vw, 40px)" }}
      >
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.slug}`}>
            <div style={cardStyle} className="hover:border-white/20 transition-colors cursor-pointer h-full">
              {/* Image area */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: post.cover_image
                    ? `url(${post.cover_image}) center/cover no-repeat`
                    : "linear-gradient(135deg, rgba(57,125,79,0.3) 0%, rgba(20,20,20,0.8) 100%)",
                }}
              />

              {/* Text content */}
              <div style={{ padding: "clamp(20px, 2.5vw, 32px)" }}>
                <h3 style={smallCardHeadingStyle}>{post.title}</h3>

                <p
                  style={{
                    ...cardBodyStyle,
                    marginTop: "clamp(12px, 1.5vw, 20px)",
                    margin: 0,
                    marginBlockStart: "clamp(12px, 1.5vw, 20px)",
                  }}
                >
                  {post.excerpt ||
                    t("clickReadMore")}
                </p>

                <span
                  style={{
                    display: "block",
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString(locale === "de" ? "de-DE" : "en-US")
                    : ""}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Empty State
   ═══════════════════════════════════════════════════════════════════════ */
async function EmptyState() {
  const t = await getTranslations("blog");
  return (
    <section
      className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{
        maxWidth: "min(1400px, 96vw)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      <div
        className="text-center"
        style={{
          ...cardStyle,
          padding: "clamp(40px, 5vw, 80px)",
        }}
      >
        <h2
          style={{
            ...cardHeadingStyle,
            fontSize: "clamp(24px, 2.5vw, 36px)",
          }}
        >
          {t("comingSoon")}
        </h2>
        <p
          style={{
            ...cardBodyStyle,
            marginTop: "16px",
            color: "var(--text-secondary)",
          }}
        >
          {t("comingSoonMessage")}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Blog Content (async, fetches data)
   ═══════════════════════════════════════════════════════════════════════ */
async function BlogContent({ locale }: { locale: Locale }) {
  let posts: BlogPost[] = [];
  try {
    const result = await fetchBlogPosts(locale);
    posts = result as BlogPost[];
  } catch {
    // Tables may not exist yet — show empty state
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {featured && <FeaturedBlogCard post={featured} locale={locale} />}
          {rest.length > 0 && <BlogCards posts={rest} locale={locale} />}
        </>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════ */
export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsLocale = locale as Locale;

  return (
    <main
      className="relative min-h-screen"
      style={{ overflowX: "hidden", overflowY: "visible", backgroundColor: "var(--page-bg)" }}
    >
      {/* Page-level green glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "68.75vw",
          aspectRatio: "825.69 / 793.13",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
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
          filter: "blur(clamp(200px, 37vw, 534px))",
          zIndex: 0,
        }}
      />

      {/* Secondary green glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: "19.8vw",
          aspectRatio: "238 / 231",
          top: "49.8vh",
          left: "65%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(149,222,100,1) 0%, rgba(149,222,100,0) 100%)",
          filter: "blur(200px)",
          zIndex: 0,
        }}
      />

      <Navbar />
      <HeroSection />
      <Suspense fallback={
        <section className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10" style={{ maxWidth: "min(1400px, 96vw)", paddingBottom: "clamp(60px, 8vw, 120px)" }}>
          <div className="text-center py-20 text-white/50" />
        </section>
      }>
        <BlogContent locale={cmsLocale} />
      </Suspense>
    </main>
  );
}
