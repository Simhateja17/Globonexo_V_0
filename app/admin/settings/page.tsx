import { getSiteSettings } from "@/lib/actions/cms";
import { SettingsClient } from "@/components/admin/settings-client";

export default async function SettingsPage() {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> = [];
  try {
    settings = await getSiteSettings();
  } catch {
    // Tables may not exist yet
  }

  return <SettingsClient settings={settings} />;
}
