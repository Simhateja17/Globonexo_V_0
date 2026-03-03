"use client";

import { CrudTable } from "@/components/admin/crud-table";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/actions/cms";
import type { Testimonial } from "@/lib/types/cms";

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <CrudTable<Testimonial>
      title="Testimonials"
      description="Manage client testimonials displayed on the homepage."
      items={testimonials}
      enableLocaleFilter
      fields={[
        { key: "author_name", label: "Author Name", type: "text", required: true, placeholder: "Client name" },
        { key: "author_role", label: "Author Role", type: "text", placeholder: "e.g., CEO, CTO" },
        { key: "author_company", label: "Company", type: "text", placeholder: "Company name" },
        { key: "author_photo", label: "Author Photo", type: "image", placeholder: "Upload a photo" },
        { key: "content", label: "Testimonial", type: "textarea", required: true, placeholder: "What they said..." },
        { key: "rating", label: "Rating (1-5)", type: "number", placeholder: "5" },
        {
          key: "locale",
          label: "Locale",
          type: "select",
          required: true,
          options: [
            { label: "English", value: "en" },
            { label: "German", value: "de" },
          ],
        },
        { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        { key: "is_active", label: "Active", type: "switch" },
      ]}
      columns={[
        {
          key: "author_name",
          label: "Author",
          render: (item) => (
            <div>
              <span className="font-medium">{item.author_name}</span>
              {item.author_company && (
                <span className="text-xs text-muted-foreground ml-1">
                  @ {item.author_company}
                </span>
              )}
            </div>
          ),
        },
        {
          key: "content",
          label: "Testimonial",
          render: (item) => (
            <span className="text-sm text-muted-foreground truncate max-w-[300px] block">
              {item.content.length > 80 ? item.content.substring(0, 80) + "..." : item.content}
            </span>
          ),
        },
        {
          key: "rating",
          label: "Rating",
          render: (item) => (
            <span className="text-sm">
              {item.rating ? "★".repeat(item.rating) + "☆".repeat(5 - item.rating) : "—"}
            </span>
          ),
        },
        {
          key: "locale",
          label: "Locale",
          render: (item) => (
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
              {(item.locale ?? "en").toUpperCase()}
            </span>
          ),
        },
        {
          key: "is_active",
          label: "Status",
          render: (item) => (
            <span className={`text-xs px-2 py-0.5 rounded-full ${item.is_active ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
              {item.is_active ? "Active" : "Inactive"}
            </span>
          ),
        },
      ]}
      onCreate={async (data) => createTestimonial(data as Parameters<typeof createTestimonial>[0])}
      onUpdate={async (id, data) => updateTestimonial(id, data as Parameters<typeof updateTestimonial>[1])}
      onDelete={deleteTestimonial}
      defaultValues={{ rating: 5, sort_order: 0, is_active: true, locale: "en" }}
    />
  );
}
