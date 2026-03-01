interface ServicesBadgeProps {
  text?: string;
}

export function ServicesBadge({ text = "Our Services" }: ServicesBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
      <span className="text-sm text-white/90">{text}</span>
    </div>
  );
}
