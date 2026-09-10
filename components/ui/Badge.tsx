import type { EquipmentStatus } from "@/lib/types";
import { EQUIPMENT_STATUS_LABEL } from "@/lib/types";

const STYLES: Record<EquipmentStatus, string> = {
  available: "bg-ok-bg text-ok border-ok/30",
  reserved: "bg-warn-bg text-warn border-warn/30",
  assigned: "bg-info-bg text-info border-info/30",
  in_job: "bg-busy-bg text-busy border-busy/30",
  not_returned: "bg-danger-bg text-danger border-danger/40 anim-pulse",
};

export function StatusBadge({ status }: { status: EquipmentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-medium tracking-wide uppercase ${STYLES[status]}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "currentColor" }}
        aria-hidden="true"
      />
      {EQUIPMENT_STATUS_LABEL[status]}
    </span>
  );
}

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "brand" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-medium tracking-wider uppercase ${
        tone === "brand"
          ? "border-brand/40 bg-brand/10 text-brand"
          : "border-border-strong bg-surface-2 text-text-muted"
      }`}
    >
      {children}
    </span>
  );
}
