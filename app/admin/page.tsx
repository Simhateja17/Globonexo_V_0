import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  ClipboardList,
  Image,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/cms";

export default async function AdminDashboard() {
  let stats = {
    blogPosts: 0,
    services: 0,
    teamMembers: 0,
    testimonials: 0,
    faqs: 0,
    newApplications: 0,
    newContacts: 0,
    mediaFiles: 0,
  };

  try {
    stats = await getDashboardStats();
  } catch {
    // Tables may not exist yet — show zeros
  }

  const cards = [
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      href: "/admin/blog",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Services",
      value: stats.services,
      icon: Briefcase,
      href: "/admin/services",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      href: "/admin/team",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "FAQs",
      value: stats.faqs,
      icon: HelpCircle,
      href: "/admin/faqs",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      label: "New Applications",
      value: stats.newApplications,
      icon: ClipboardList,
      href: "/admin/applications",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "New Messages",
      value: stats.newContacts,
      icon: Mail,
      href: "/admin/contact",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Media Files",
      value: stats.mediaFiles,
      icon: Image,
      href: "/admin/media",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Globonexo CMS. Manage your website content from here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="text-3xl font-bold">{card.value}</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <FileText className="w-4 h-4" />
            New Blog Post
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Image className="w-4 h-4" />
            Upload Media
          </Link>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            View Applications
            {stats.newApplications > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-violet-500/10 text-violet-500">
                {stats.newApplications}
              </span>
            )}
          </Link>
          <Link
            href="/admin/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Mail className="w-4 h-4" />
            View Messages
            {stats.newContacts > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-rose-500/10 text-rose-500">
                {stats.newContacts}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mt-8 p-6 rounded-xl border border-border bg-muted/30">
        <h2 className="text-lg font-semibold mb-2">Database Setup</h2>
        <p className="text-sm text-muted-foreground mb-3">
          To get started, run the SQL migration in your Supabase dashboard:
        </p>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Go to your Supabase project &rarr; SQL Editor</li>
          <li>
            Copy the contents of{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">
              supabase/migrations/001_cms_schema.sql
            </code>
          </li>
          <li>Run the query to create all CMS tables</li>
          <li>
            Create a storage bucket named{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">media</code>{" "}
            with public access enabled
          </li>
        </ol>
      </div>
    </div>
  );
}
