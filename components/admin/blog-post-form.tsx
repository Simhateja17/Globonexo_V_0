"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { MediaPicker } from "@/components/admin/media-library";
import { createBlogPost, updateBlogPost } from "@/lib/actions/cms";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types/cms";

interface BlogPostFormProps {
  post?: BlogPost;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState<Record<string, unknown> | null>(
    post?.content || null
  );
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description || ""
  );
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status || "draft"
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publishStatus?: "draft" | "published") => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    setSaving(true);
    const saveStatus = publishStatus || status;

    try {
      const data = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image: coverImage || null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        status: saveStatus,
        published_at:
          saveStatus === "published" && !post?.published_at
            ? new Date().toISOString()
            : post?.published_at || null,
        author_id: post?.author_id || null,
      };

      if (post) {
        await updateBlogPost(post.id, data);
        toast.success("Post updated");
      } else {
        await createBlogPost(data);
        toast.success("Post created");
        router.push("/admin/blog");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to save post";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">
            {post ? "Edit Post" : "New Blog Post"}
          </h1>
          {post && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                status === "published"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-amber-500/10 text-amber-500"
              }`}
            >
              {status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave("draft")}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-1" />
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSave("published")}
            disabled={saving}
          >
            <Eye className="w-4 h-4 mr-1" />
            {status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title..."
              className="mt-1.5 text-lg"
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm text-muted-foreground">/blogs/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                placeholder="post-slug"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <Label>Content</Label>
            <div className="mt-1.5">
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Write your blog post..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="rounded-lg border border-border p-4">
            <Label>Cover Image</Label>
            {coverImage ? (
              <div className="mt-2 relative group">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setCoverImage("")}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setMediaPickerOpen(true)}
                className="mt-2 w-full aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Select cover image
                </span>
              </button>
            )}
          </div>

          {/* Excerpt */}
          <div className="rounded-lg border border-border p-4">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the post..."
              className="mt-1.5"
              rows={3}
            />
          </div>

          {/* SEO */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-medium text-sm">SEO</h3>
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || "Meta title..."}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta description for search engines..."
                className="mt-1"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>

      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => setCoverImage(url)}
      />
    </div>
  );
}
