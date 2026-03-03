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
import { Mail, MailOpen, Trash2, Eye, Reply } from "lucide-react";
import {
  updateContactSubmission,
  deleteContactSubmission,
} from "@/lib/actions/cms";
import { toast } from "sonner";
import type { ContactSubmission } from "@/lib/types/cms";

export function ContactClient({
  submissions: initial,
}: {
  submissions: ContactSubmission[];
}) {
  const [submissions, setSubmissions] = useState(initial);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleView = async (item: ContactSubmission) => {
    setSelected(item);
    if (item.status === "new") {
      try {
        await updateContactSubmission(item.id, { status: "read" });
        setSubmissions((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: "read" as const } : s))
        );
      } catch {
        // Ignore
      }
    }
  };

  const handleMarkReplied = async (id: string) => {
    try {
      await updateContactSubmission(id, { status: "replied" });
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "replied" as const } : s))
      );
      toast.success("Marked as replied");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteContactSubmission(deleteId);
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success("Deleted");
      if (selected?.id === deleteId) setSelected(null);
    } catch {
      toast.error("Delete failed");
    }
    setDeleteId(null);
  };

  const newCount = submissions.filter((s) => s.status === "new").length;

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">New</Badge>;
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "replied":
        return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Replied</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Contact Submissions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {submissions.length} message{submissions.length !== 1 && "s"}
            {newCount > 0 && ` · ${newCount} new`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No messages yet.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((item) => (
                <TableRow
                  key={item.id}
                  className={item.status === "new" ? "bg-primary/5" : ""}
                >
                  <TableCell>
                    {item.status === "new" ? (
                      <Mail className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-sm">{item.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">
                    {item.message}
                  </TableCell>
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
                        onClick={() => handleView(item)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleMarkReplied(item.id)}
                      >
                        <Reply className="w-3.5 h-3.5" />
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

      {/* View Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Message from {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selected.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{selected.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <div className="mt-0.5">{statusBadge(selected.status)}</div>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Message</p>
                <p className="text-sm whitespace-pre-wrap rounded-lg bg-muted/50 p-4">
                  {selected.message}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(`mailto:${selected.email}?subject=Re: Contact from Globonexo`);
                    handleMarkReplied(selected.id);
                  }}
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this message? This action cannot be undone.
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
