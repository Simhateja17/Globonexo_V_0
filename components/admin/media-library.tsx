"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Trash2, Copy, Check, Image as ImageIcon, X, Loader2, FolderSync } from "lucide-react";
import { toast } from "sonner";
import type { Media } from "@/lib/types/cms";

interface MediaLibraryProps {
  initialMedia: Media[];
  /** If true, shows as a picker (modal mode) */
  picker?: boolean;
  onSelect?: (url: string) => void;
}

export function MediaLibrary({ initialMedia, picker, onSelect }: MediaLibraryProps) {
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with parent when initialMedia changes (e.g. after async fetch in MediaPicker)
  useEffect(() => {
    setMedia(initialMedia);
  }, [initialMedia]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const getPublicUrl = (filePath: string) => {
    return `${supabaseUrl}/storage/v1/object/public/media/${filePath}`;
  };

  const getMimeType = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    const mimeMap: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/webp",
      svg: "image/svg+xml",
      gif: "image/gif",
      ico: "image/x-icon",
    };
    return mimeMap[ext] || "application/octet-stream";
  };

  const handleSyncPublicImages = useCallback(async () => {
    setSyncing(true);
    setSyncProgress("Fetching image list...");

    try {
      // 1. Get list of public images from API
      const res = await fetch("/api/public-images");
      const { files } = await res.json() as {
        files: { path: string; name: string; size: number }[];
      };

      if (!files || files.length === 0) {
        toast.error("No public images found");
        setSyncing(false);
        setSyncProgress("");
        return;
      }

      // 2. Filter out files already in the media library (by file_name)
      const existingNames = new Set(media.map((m) => m.file_name));
      const toUpload = files.filter((f) => !existingNames.has(f.name));

      if (toUpload.length === 0) {
        toast.success("All public images are already synced!");
        setSyncing(false);
        setSyncProgress("");
        return;
      }

      setSyncProgress(`Uploading ${toUpload.length} of ${files.length} images...`);

      const supabase = createClient();
      const newMedia: Media[] = [];
      let uploaded = 0;

      for (const file of toUpload) {
        uploaded++;
        setSyncProgress(
          `Uploading ${uploaded}/${toUpload.length}: ${file.name}`
        );

        try {
          // Fetch the image from the public folder
          const imgRes = await fetch(file.path);
          const blob = await imgRes.blob();

          // Determine storage path: preserve subfolder structure
          // e.g. /images/services/laptop.png -> public-images/services/laptop.png
          const relativePath = file.path.replace(/^\/images\//, "");
          const storagePath = `public-images/${relativePath}`;

          const { error: uploadError } = await supabase.storage
            .from("media")
            .upload(storagePath, blob, {
              contentType: getMimeType(file.name),
              upsert: false,
            });

          if (uploadError) {
            // If file already exists in storage but not in DB, skip silently
            if (uploadError.message?.includes("already exists")) {
              continue;
            }
            console.error(`Failed to upload ${file.name}:`, uploadError.message);
            continue;
          }

          const { data: record, error: dbError } = await supabase
            .from("media")
            .insert({
              file_name: file.name,
              file_path: storagePath,
              file_type: getMimeType(file.name),
              file_size: file.size,
              alt_text: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
              bucket: "media",
            })
            .select()
            .single();

          if (dbError) {
            console.error(`Failed to save record for ${file.name}:`, dbError.message);
            continue;
          }

          newMedia.push(record);
        } catch (err) {
          console.error(`Error processing ${file.name}:`, err);
        }
      }

      if (newMedia.length > 0) {
        setMedia((prev) => [...newMedia, ...prev]);
        toast.success(
          `Synced ${newMedia.length} image${newMedia.length > 1 ? "s" : ""} from public folder`
        );
      } else {
        toast.info("No new images were synced (may already exist in storage)");
      }
    } catch (err) {
      console.error("Sync failed:", err);
      toast.error("Failed to sync public images");
    } finally {
      setSyncing(false);
      setSyncProgress("");
    }
  }, [media]);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setUploading(true);

      const supabase = createClient();
      const newMedia: Media[] = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file);

        if (uploadError) {
          toast.error(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        const { data: record, error: dbError } = await supabase
          .from("media")
          .insert({
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
            alt_text: null,
            bucket: "media",
          })
          .select()
          .single();

        if (dbError) {
          toast.error(`Failed to save record for ${file.name}`);
          continue;
        }

        newMedia.push(record);
      }

      if (newMedia.length > 0) {
        setMedia((prev) => [...newMedia, ...prev]);
        toast.success(
          `Uploaded ${newMedia.length} file${newMedia.length > 1 ? "s" : ""}`
        );
      }
      setUploading(false);
    },
    []
  );

  const handleDelete = async (item: Media) => {
    const supabase = createClient();
    const { error: storageError } = await supabase.storage
      .from("media")
      .remove([item.file_path]);

    if (storageError) {
      toast.error(`Failed to delete file: ${storageError.message}`);
      return;
    }

    const { error } = await supabase.from("media").delete().eq("id", item.id);
    if (error) {
      toast.error("Failed to delete record");
      return;
    }

    setMedia((prev) => prev.filter((m) => m.id !== item.id));
    setDeleteId(null);
    toast.success("File deleted");
  };

  const handleCopyUrl = (item: Media) => {
    const url = getPublicUrl(item.file_path);
    navigator.clipboard.writeText(url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("URL copied to clipboard");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpload(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = (type: string | null) =>
    type?.startsWith("image/") ?? false;

  return (
    <div>
      {/* Upload area */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-4 sm:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer mb-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
          accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, PDFs, and documents
            </p>
          </div>
        )}
      </div>

      {/* Sync Public Images button — only in full library mode */}
      {!picker && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleSyncPublicImages}
            disabled={syncing || uploading}
            className="w-full sm:w-auto"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FolderSync className="w-4 h-4 mr-2" />
            )}
            {syncing ? syncProgress : "Sync Public Images"}
          </Button>
          {!syncing && (
            <p className="text-xs text-muted-foreground mt-1.5">
              Upload all images from the public/images folder to the media library.
            </p>
          )}
        </div>
      )}

      {/* Media grid */}
      {media.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No media files yet. Upload your first file above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => {
                if (picker && onSelect) {
                  onSelect(getPublicUrl(item.file_path));
                }
              }}
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {isImage(item.file_type) ? (
                  <img
                    src={getPublicUrl(item.file_path)}
                    alt={item.alt_text || item.file_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-[10px] uppercase">
                      {item.file_type?.split("/")[1] || "file"}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-medium truncate">{item.file_name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {formatFileSize(item.file_size)}
                </p>
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(item);
                  }}
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                {!picker && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(item.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this file? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                const item = media.find((m) => m.id === deleteId);
                if (item) handleDelete(item);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ======================== MEDIA PICKER DIALOG ========================

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
}

export function MediaPicker({ open, onOpenChange, onSelect }: MediaPickerProps) {
  const [media, setMedia] = useState<Media[]>([]);

  const loadMedia = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMedia(data);
  }, []);

  // Fetch media every time the dialog opens
  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open, loadMedia]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        <MediaLibrary
          initialMedia={media}
          picker
          onSelect={(url) => {
            onSelect(url);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
