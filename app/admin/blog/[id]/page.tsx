import { getBlogPost } from "@/lib/actions/cms";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const post = await getBlogPost(id);
    if (!post) notFound();
    return <BlogPostForm post={post} />;
  } catch {
    notFound();
  }
}
