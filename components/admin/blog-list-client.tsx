"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { deleteBlogPost } from "@/lib/actions/cms";
import { toast } from "sonner";
import type { BlogPost } from "@/lib/types/cms";
import type { Locale } from "@/lib/types/cms";

const LOCALE_OPTIONS: Locale[] = ["en", "de"];

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts: initialPosts }: BlogListClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterLocale, setFilterLocale] = useState<Locale | "all">("all");

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesLocale =
      filterLocale === "all" || (p.locale ?? "en") === filterLocale;
    return matchesSearch && matchesLocale;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBlogPost(deleteId);
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {posts.length} post{posts.length !== 1 && "s"} total
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-1" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Locale filter tabs */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground mr-1">Locale:</span>
        {(["all", ...LOCALE_OPTIONS] as const).map((loc) => (
          <Button
            key={loc}
            variant={filterLocale === loc ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLocale(loc)}
            className="h-7 px-3 text-xs"
          >
            {loc === "all" ? "All" : loc.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Locale</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {search ? "No posts match your search" : "No blog posts yet. Create your first one!"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">/blogs/{post.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                      {(post.locale ?? "en").toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        post.status === "published"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(post.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
