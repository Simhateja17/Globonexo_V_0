import { Navbar } from "@/components/home";
import { getBlogPostBySlug } from "@/lib/actions/cms";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { Suspense } from "react";

// Generate HTML from Tiptap JSON content
function renderContent(content: Record<string, unknown> | null): string {
  if (!content) return "";
  try {
    return generateHTML(content as Parameters<typeof generateHTML>[0], [
      StarterKit,
      ImageExtension,
      LinkExtension,
    ]);
  } catch {
    return "<p>Content could not be rendered.</p>";
  }
}

async function BlogPostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  const html = renderContent(post.content);

  return (
    <article
      className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10"
      style={{
        maxWidth: "min(800px, 96vw)",
        paddingTop: "calc(clamp(80px, 10vh, 120px) + 40px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Cover Image */}
      {post.cover_image && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "clamp(24px, 3vw, 40px)",
          }}
        >
          <img
            src={post.cover_image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Title */}
      <h1
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(28px, 3.5vw + 0.5rem, 48px)",
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          background: "linear-gradient(180deg, #FFF 54%, #95DE64 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div
        style={{
          marginTop: "16px",
          marginBottom: "clamp(24px, 3vw, 40px)",
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {post.published_at &&
          new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </div>

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none"
        style={{
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main
      className="relative min-h-screen bg-[#000000]"
      style={{ overflowX: "hidden", overflowY: "visible" }}
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

      <Navbar />

      <Suspense fallback={
        <div className="relative z-10 mx-auto px-5 sm:px-6 md:px-8 lg:px-10 text-center py-20 text-white/50" style={{ maxWidth: "min(800px, 96vw)", paddingTop: "calc(clamp(80px, 10vh, 120px) + 40px)" }}>
          Loading article...
        </div>
      }>
        <BlogPostContent params={params} />
      </Suspense>
    </main>
  );
}
