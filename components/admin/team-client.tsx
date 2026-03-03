"use client";

import { CrudTable } from "@/components/admin/crud-table";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/actions/cms";
import type { TeamMember } from "@/lib/types/cms";

export function TeamClient({ members }: { members: TeamMember[] }) {
  return (
    <CrudTable<TeamMember>
      title="Team Members"
      description="Manage your team members displayed on the About page."
      items={members}
      fields={[
        { key: "name", label: "Name", type: "text", required: true, placeholder: "Full name" },
        { key: "role", label: "Role", type: "text", placeholder: "e.g., CEO, CTO, Designer" },
        { key: "bio", label: "Bio", type: "textarea", placeholder: "Short bio..." },
        { key: "photo_url", label: "Photo", type: "image", placeholder: "Upload a photo" },
        { key: "linkedin_url", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/in/..." },
        { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        { key: "is_active", label: "Active", type: "switch" },
      ]}
      columns={[
        {
          key: "name",
          label: "Name",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.photo_url ? (
                <img src={item.photo_url} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {item.name.charAt(0)}
                </div>
              )}
              <span className="font-medium">{item.name}</span>
            </div>
          ),
        },
        { key: "role", label: "Role", render: (item) => <span className="text-sm">{item.role || "—"}</span> },
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
      onCreate={async (data) => createTeamMember(data as Parameters<typeof createTeamMember>[0])}
      onUpdate={async (id, data) => updateTeamMember(id, data as Parameters<typeof updateTeamMember>[1])}
      onDelete={deleteTeamMember}
      defaultValues={{ sort_order: 0, is_active: true }}
    />
  );
}
