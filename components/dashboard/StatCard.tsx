import type { Icon } from "@phosphor-icons/react";

const CARD_CLASS: Record<string, string> = {
  neutral: "bg-neutral-bg",
  ok: "bg-ok-bg",
  warn: "bg-warn-bg",
  info: "bg-info-bg",
  busy: "bg-busy-bg",
  danger: "bg-danger-bg",
};

const CHIP_CLASS: Record<string, string> = {
  neutral: "text-brand bg-surface/70",
  ok: "text-ok bg-surface/70",
  warn: "text-warn bg-surface/70",
  info: "text-info bg-surface/70",
  busy: "text-busy bg-surface/70",
  danger: "text-danger bg-surface/70",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: Icon;
  label: string;
  value: number | string;
  tone?: keyof typeof CARD_CLASS;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${CARD_CLASS[tone]}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-105 ${CHIP_CLASS[tone]}`}
        >
          <Icon size={18} weight="bold" />
        </span>
      </div>
      <div className="tabular-nums mt-3 text-[32px] font-bold tracking-tight text-text">
        {value}
      </div>
    </div>
  );
}
