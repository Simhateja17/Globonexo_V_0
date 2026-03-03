"use client";

import { CrudTable } from "@/components/admin/crud-table";
import { createFAQ, updateFAQ, deleteFAQ } from "@/lib/actions/cms";
import type { FAQ } from "@/lib/types/cms";

export function FAQsClient({ faqs }: { faqs: FAQ[] }) {
  return (
    <CrudTable<FAQ>
      title="FAQs"
      description="Manage frequently asked questions displayed on the homepage."
      items={faqs}
      fields={[
        { key: "question", label: "Question", type: "text", required: true, placeholder: "What is...?" },
        { key: "answer", label: "Answer", type: "textarea", required: true, placeholder: "The answer..." },
        { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        { key: "is_active", label: "Active", type: "switch" },
      ]}
      columns={[
        { key: "question", label: "Question", render: (item) => <span className="font-medium">{item.question}</span> },
        {
          key: "answer",
          label: "Answer",
          render: (item) => (
            <span className="text-sm text-muted-foreground truncate max-w-[400px] block">
              {item.answer.length > 100 ? item.answer.substring(0, 100) + "..." : item.answer}
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
      onCreate={async (data) => createFAQ(data as Parameters<typeof createFAQ>[0])}
      onUpdate={async (id, data) => updateFAQ(id, data as Parameters<typeof updateFAQ>[1])}
      onDelete={deleteFAQ}
      defaultValues={{ sort_order: 0, is_active: true }}
    />
  );
}
