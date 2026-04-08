"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Eye, Trash2, CheckCircle2, Mail } from "lucide-react";
import {
  updateJobApplication,
  deleteJobApplication,
  getJobApplicationFileSignedUrl,
} from "@/lib/actions/cms";
import { toast } from "sonner";
import type { JobApplication } from "@/lib/types/cms";

export function ApplicationsClient({
  applications: initial,
}: {
  applications: JobApplication[];
}) {
  const [applications, setApplications] = useState(initial);
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const newCount = applications.filter((a) => a.status === "new").length;

  const statusBadge = (status: JobApplication["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">New</Badge>;
      case "reviewed":
        return <Badge variant="secondary">Reviewed</Badge>;
      case "contacted":
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Contacted</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-rose-500 border-rose-500/30">Rejected</Badge>;
      default:
        return null;
    }
  };

  const updateStatus = async (id: string, status: JobApplication["status"]) => {
    try {
      await updateJobApplication(id, { status });
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteJobApplication(deleteId);
      setApplications((prev) => prev.filter((a) => a.id !== deleteId));
      if (selected?.id === deleteId) setSelected(null);
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
    setDeleteId(null);
  };

  const openFile = async (path: string | null) => {
    if (!path) return;
    try {
      const url = await getJobApplicationFileSignedUrl(path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Could not open file");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {applications.length} application{applications.length !== 1 && "s"}
            {newCount > 0 && ` · ${newCount} new`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No applications yet.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((item) => (
                <TableRow key={item.id} className={item.status === "new" ? "bg-primary/5" : ""}>
                  <TableCell className="font-medium">{item.full_name}</TableCell>
                  <TableCell className="text-sm">{item.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.country || "—"}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelected(item);
                          if (item.status === "new") {
                            void updateStatus(item.id, "reviewed");
                          }
                        }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateStatus(item.id, "contacted")}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateStatus(item.id, "reviewed")}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
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

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              Application from {selected?.full_name}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{selected.email}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{selected.phone || "—"}</p></div>
                <div><p className="text-muted-foreground">Country</p><p className="font-medium">{selected.country || "—"}</p></div>
                <div><p className="text-muted-foreground">City</p><p className="font-medium">{selected.city || "—"}</p></div>
                <div><p className="text-muted-foreground">LinkedIn</p><p className="font-medium break-all">{selected.linkedin_url || "—"}</p></div>
                <div><p className="text-muted-foreground">GitHub</p><p className="font-medium break-all">{selected.github_url || "—"}</p></div>
                <div><p className="text-muted-foreground">Relocation</p><p className="font-medium">{selected.open_to_relocation ? "Yes" : "No"}</p></div>
                <div><p className="text-muted-foreground">Privacy accepted</p><p className="font-medium">{selected.privacy_accepted ? "Yes" : "No"}</p></div>
                <div><p className="text-muted-foreground">Profile photo file</p><p className="font-medium break-all">{selected.profile_picture_file_name || "—"}</p></div>
                <div><p className="text-muted-foreground">CV file</p><p className="font-medium break-all">{selected.cv_file_name || "—"}</p></div>
                <div className="sm:col-span-2"><p className="text-muted-foreground">Additional docs</p><p className="font-medium break-all">{selected.additional_documents_file_names || "—"}</p></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!selected.profile_picture_path}
                  onClick={() => void openFile(selected.profile_picture_path)}
                >
                  Open profile picture
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!selected.cv_path}
                  onClick={() => void openFile(selected.cv_path)}
                >
                  Open CV
                </Button>
                {(() => {
                  let additionalPaths: string[] = [];
                  try {
                    additionalPaths = selected.additional_documents_paths
                      ? JSON.parse(selected.additional_documents_paths)
                      : [];
                  } catch {
                    additionalPaths = [];
                  }
                  return additionalPaths.map((path, idx) => (
                    <Button
                      key={`${path}-${idx}`}
                      variant="outline"
                      size="sm"
                      onClick={() => void openFile(path)}
                    >
                      Open doc {idx + 1}
                    </Button>
                  ));
                })()}
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Motivation</p>
                <p className="rounded-lg bg-muted/50 p-4 whitespace-pre-wrap">
                  {selected.motivation || "—"}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(`mailto:${selected.email}?subject=Application: ${selected.full_name}`);
                    void updateStatus(selected.id, "contacted");
                  }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Contact candidate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this application? This action cannot be undone.
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
