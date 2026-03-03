import { getBlogPosts } from "@/lib/actions/cms";
import { BlogListClient } from "@/components/admin/blog-list-client";

export default async function BlogListPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts(true);
  } catch {
    // Tables may not exist yet
  }

  return <BlogListClient posts={posts} />;
}
