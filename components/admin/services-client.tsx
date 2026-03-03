"use client";

import { CrudTable } from "@/components/admin/crud-table";
import {
  createService,
  updateService,
  deleteService,
} from "@/lib/actions/cms";
import type { Service } from "@/lib/types/cms";

export function ServicesClient({ services }: { services: Service[] }) {
  return (
    <CrudTable<Service>
      title="Services"
      description="Manage the services displayed on your website."
      items={services}
      enableLocaleFilter
      fields={[
        { key: "title", label: "Title", type: "text", required: true, placeholder: "Service name" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Describe the service..." },
        { key: "icon", label: "Icon", type: "image", placeholder: "Upload an icon image" },
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
        { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
        {
          key: "description",
          label: "Description",
          render: (item) => (
            <span className="text-sm text-muted-foreground truncate max-w-[300px] block">
              {item.description || "—"}
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
        { key: "sort_order", label: "Order" },
      ]}
      onCreate={async (data) => createService(data as Parameters<typeof createService>[0])}
      onUpdate={async (id, data) => updateService(id, data as Parameters<typeof updateService>[1])}
      onDelete={deleteService}
      defaultValues={{ sort_order: 0, is_active: true, locale: "en" }}
    />
  );
}
