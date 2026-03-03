"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Loader2 } from "lucide-react";
import { updateSiteSetting } from "@/lib/actions/cms";
import { toast } from "sonner";
import type { SiteSetting } from "@/lib/types/cms";

interface SettingsClientProps {
  settings: SiteSetting[];
}

export function SettingsClient({ settings: initial }: SettingsClientProps) {
  // Parse settings into structured state
  const companySetting = initial.find((s) => s.key === "company");
  const socialSetting = initial.find((s) => s.key === "social");
  const footerSetting = initial.find((s) => s.key === "footer");

  const [company, setCompany] = useState({
    name: (companySetting?.value as Record<string, string>)?.name || "Globonexo",
    tagline:
      (companySetting?.value as Record<string, string>)?.tagline ||
      "International IT & AI Expert Hub",
    email: (companySetting?.value as Record<string, string>)?.email || "",
    phone: (companySetting?.value as Record<string, string>)?.phone || "",
    address: (companySetting?.value as Record<string, string>)?.address || "",
  });

  const [social, setSocial] = useState({
    linkedin: (socialSetting?.value as Record<string, string>)?.linkedin || "",
    twitter: (socialSetting?.value as Record<string, string>)?.twitter || "",
    github: (socialSetting?.value as Record<string, string>)?.github || "",
    facebook: (socialSetting?.value as Record<string, string>)?.facebook || "",
  });

  const [footer, setFooter] = useState({
    text:
      (footerSetting?.value as Record<string, string>)?.text ||
      "2026 Globonexo. All rights reserved.",
  });

  const [saving, setSaving] = useState<string | null>(null);

  const handleSave = async (key: string, value: Record<string, unknown>) => {
    setSaving(key);
    try {
      await updateSiteSetting(key, { value });
      toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} settings saved`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Save failed";
      toast.error(message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage global site configuration.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Company Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="space-y-3">
            <div>
              <Label>Company Name</Label>
              <Input
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={company.tagline}
                onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email</Label>
                <Input
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="mt-1"
                  type="email"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button
              onClick={() => handleSave("company", company)}
              disabled={saving === "company"}
            >
              {saving === "company" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save Company Info
            </Button>
          </div>
        </section>

        <Separator />

        {/* Social Links */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          <div className="space-y-3">
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                className="mt-1"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div>
              <Label>Twitter / X</Label>
              <Input
                value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                className="mt-1"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input
                value={social.github}
                onChange={(e) => setSocial({ ...social, github: e.target.value })}
                className="mt-1"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                className="mt-1"
                placeholder="https://facebook.com/..."
              />
            </div>
            <Button
              onClick={() => handleSave("social", social)}
              disabled={saving === "social"}
            >
              {saving === "social" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save Social Links
            </Button>
          </div>
        </section>

        <Separator />

        {/* Footer */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Footer</h2>
          <div className="space-y-3">
            <div>
              <Label>Footer Text</Label>
              <Input
                value={footer.text}
                onChange={(e) => setFooter({ ...footer, text: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button
              onClick={() => handleSave("footer", footer)}
              disabled={saving === "footer"}
            >
              {saving === "footer" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save Footer Settings
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
