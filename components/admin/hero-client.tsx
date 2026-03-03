"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { upsertHeroSection, deleteHeroSection } from "@/lib/actions/cms";
import { toast } from "sonner";
import type { HeroSection } from "@/lib/types/cms";
import type { Locale } from "@/lib/types/cms";
import { ImageUploadField } from "@/components/admin/crud-table";

const PAGE_OPTIONS = ["home", "about", "services", "blogs", "global-presence"];
const LOCALE_OPTIONS: Locale[] = ["en", "de"];

export function HeroClient({ sections: initial }: { sections: HeroSection[] }) {
  const [sections, setSections] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<HeroSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterLocale, setFilterLocale] = useState<Locale | "all">("all");

  const [formData, setFormData] = useState({
    page_key: "home",
    section_key: "hero",
    locale: "en" as Locale,
    title: "",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_link: "",
    background_image: "",
    is_active: true,
    sort_order: 0,
  });

  const openCreate = () => {
    setEditItem(null);
    setFormData({
      page_key: "home",
      section_key: "hero",
      locale: "en",
      title: "",
      subtitle: "",
      description: "",
      cta_text: "",
      cta_link: "",
      background_image: "",
      is_active: true,
      sort_order: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: HeroSection) => {
    setEditItem(item);
    setFormData({
      page_key: item.page_key,
      section_key: item.section_key,
      locale: item.locale,
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      cta_text: item.cta_text || "",
      cta_link: item.cta_link || "",
      background_image: item.background_image || "",
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.page_key || !formData.section_key) {
      toast.error("Page and section keys are required");
      return;
    }
    setSaving(true);
    try {
      const result = await upsertHeroSection({
        page_key: formData.page_key,
        section_key: formData.section_key,
        locale: formData.locale,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
        description: formData.description || null,
        cta_text: formData.cta_text || null,
        cta_link: formData.cta_link || null,
        background_image: formData.background_image || null,
        extra_data: null,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      });
      setSections((prev) => {
        const existing = prev.findIndex(
          (s) => s.page_key === result.page_key && s.section_key === result.section_key && s.locale === result.locale
        );
        if (existing >= 0) {
          const copy = [...prev];
          copy[existing] = result;
          return copy;
        }
        return [...prev, result];
      });
      setDialogOpen(false);
      toast.success("Section saved");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteHeroSection(deleteId);
      setSections((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success("Section deleted");
    } catch {
      toast.error("Delete failed");
    }
    setDeleteId(null);
  };

  // Filter sections by locale
  const filtered = filterLocale === "all"
    ? sections
    : sections.filter((s) => (s.locale ?? "en") === filterLocale);

  // Group sections by page
  const grouped = filtered.reduce(
    (acc, s) => {
      if (!acc[s.page_key]) acc[s.page_key] = [];
      acc[s.page_key].push(s);
      return acc;
    },
    {} as Record<string, HeroSection[]>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Hero Sections</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage hero sections and page content blocks.
          </p>
        </div>
        <Button onClick={openCreate} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-1" />
          Add Section
        </Button>
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

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No hero sections yet. Create your first one.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([pageKey, pageSections]) => (
            <div key={pageKey}>
              <h2 className="text-lg font-semibold capitalize mb-3">
                {pageKey} Page
              </h2>
              <div className="grid gap-3">
                {pageSections.map((section) => (
                   <div
                    key={section.id}
                    className="rounded-lg border border-border p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs px-1.5 py-0.5 rounded bg-muted">
                          {section.section_key}
                        </code>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                          {(section.locale ?? "en").toUpperCase()}
                        </span>
                        {!section.is_active && (
                          <span className="text-xs text-muted-foreground">(inactive)</span>
                        )}
                      </div>
                      {section.title && (
                        <p className="font-medium">{section.title}</p>
                      )}
                      {section.subtitle && (
                        <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => openEdit(section)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(section.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editItem ? "Edit Section" : "New Section"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label>Page</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.page_key}
                  onChange={(e) => setFormData({ ...formData, page_key: e.target.value })}
                >
                  {PAGE_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Section Key</Label>
                <Input
                  value={formData.section_key}
                  onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                  placeholder="hero, cta, features_intro..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Locale</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.locale}
                  onChange={(e) => setFormData({ ...formData, locale: e.target.value as Locale })}
                >
                  {LOCALE_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>CTA Text</Label>
                <Input
                  value={formData.cta_text}
                  onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                  className="mt-1"
                  placeholder="Get Started"
                />
              </div>
              <div>
                <Label>CTA Link</Label>
                <Input
                  value={formData.cta_link}
                  onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                  className="mt-1"
                  placeholder="/contact"
                />
              </div>
            </div>
            <div>
              <Label>Background Image</Label>
              <div className="mt-1">
                <ImageUploadField
                  value={formData.background_image}
                  onChange={(url) => setFormData({ ...formData, background_image: url })}
                  label="Background Image"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
              />
              <Label>Active</Label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-1" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this section?
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
