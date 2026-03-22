import { getTranslations } from "next-intl/server";

interface ServicesBadgeProps {
  text?: string;
}

export async function ServicesBadge({ text }: ServicesBadgeProps) {
  const t = await getTranslations("services");
  const displayText = text ?? t("badge");

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
      <span className="text-sm" style={{ color: "var(--text-primary)" }}>{displayText}</span>
    </div>
  );
}
