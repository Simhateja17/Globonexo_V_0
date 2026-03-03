"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Pencil, Trash2, Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { MediaPicker } from "@/components/admin/media-library";

// ============================================================
// Generic CRUD table for simple content types
// (Services, Team Members, Testimonials, FAQs)
// ============================================================

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "switch" | "image";
  placeholder?: string;
  required?: boolean;
}

// ============================================================
// Inline Image Upload Field
// ============================================================

export function ImageUploadField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const supabase = createClient();
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file);

        if (uploadError) {
          toast.error(`Upload failed: ${uploadError.message}`);
          return;
        }

        // Get public URL
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/media/${filePath}`;

        // Save media record
        await supabase.from("media").insert({
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          alt_text: null,
          bucket: "media",
        });

        onChange(publicUrl);
        toast.success("Image uploaded");
      } catch {
        toast.error("Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value ? (
        <div className="relative group w-full">
          <img
            src={value}
            alt={label}
            className="w-full max-h-40 object-contain rounded-lg border border-border bg-muted"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setMediaPickerOpen(true)}
            >
              Change
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onChange("")}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Click to upload or drag an image
              </span>
            </>
          )}
        </div>
      )}

      {/* Actions row */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5 mr-1" />
          )}
          Upload
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setMediaPickerOpen(true)}
        >
          <ImageIcon className="w-3.5 h-3.5 mr-1" />
          Media Library
        </Button>
      </div>

      {/* URL input (still editable for manual URLs / local paths) */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or enter image URL / path..."
        className="text-xs"
      />

      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => onChange(url)}
      />
    </div>
  );
}

interface CrudTableProps<T extends { id: string }> {
  title: string;
  description: string;
  items: T[];
  fields: FieldConfig[];
  columns: { key: string; label: string; render?: (item: T) => React.ReactNode }[];
  onCreate: (data: Record<string, unknown>) => Promise<T>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<T>;
  onDelete: (id: string) => Promise<void>;
  defaultValues?: Record<string, unknown>;
}

export function CrudTable<T extends { id: string }>({
  title,
  description,
  items: initialItems,
  fields,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  defaultValues = {},
}: CrudTableProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>(defaultValues);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditItem(null);
    setFormData(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (item: T) => {
    setEditItem(item);
    const data: Record<string, unknown> = {};
    fields.forEach((f) => {
      data[f.key] = (item as Record<string, unknown>)[f.key] ?? defaultValues[f.key] ?? "";
    });
    setFormData(data);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate required fields
    for (const field of fields) {
      if (field.required && !formData[field.key]) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    setSaving(true);
    try {
      if (editItem) {
        const updated = await onUpdate(editItem.id, formData);
        setItems((prev) => prev.map((i) => (i.id === editItem.id ? updated : i)));
        toast.success(`${title.replace(/s$/, "")} updated`);
      } else {
        const created = await onCreate(formData);
        setItems((prev) => [...prev, created]);
        toast.success(`${title.replace(/s$/, "")} created`);
      }
      setDialogOpen(false);
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
      await onDelete(deleteId);
      setItems((prev) => prev.filter((i) => i.id !== deleteId));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
    setDeleteId(null);
  };

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <Button onClick={openCreate} className="w-full sm:w-auto shrink-0">
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-muted-foreground"
                >
                  No items yet. Click &quot;Add New&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => openEdit(item)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(item.id)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editItem ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {fields.map((field) => (
              <div key={field.key}>
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "image" ? (
                  <div className="mt-1">
                    <ImageUploadField
                      value={String(formData[field.key] ?? "")}
                      onChange={(url) => updateField(field.key, url)}
                      label={field.label}
                    />
                  </div>
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={field.key}
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="mt-1"
                    rows={3}
                  />
                ) : field.type === "switch" ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Switch
                      id={field.key}
                      checked={Boolean(formData[field.key])}
                      onCheckedChange={(v) => updateField(field.key, v)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData[field.key] ? "Active" : "Inactive"}
                    </span>
                  </div>
                ) : (
                  <Input
                    id={field.key}
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) =>
                      updateField(
                        field.key,
                        field.type === "number" ? Number(e.target.value) : e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    className="mt-1"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editItem ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
