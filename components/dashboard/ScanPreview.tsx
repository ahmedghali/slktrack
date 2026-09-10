import { QRCodeSVG } from "qrcode.react";
import type { Equipment } from "@/lib/types";
import { EQUIPMENT_STATUS_LABEL } from "@/lib/types";

const STATUS_DOT: Record<Equipment["status"], string> = {
  available: "bg-ok",
  reserved: "bg-warn",
  assigned: "bg-info",
  in_job: "bg-busy",
  not_returned: "bg-danger",
};

export function ScanPreview({ equipment }: { equipment: Equipment }) {
  return (
    <div className="flex gap-3">
      {/* Phone mockup */}
      <div className="w-[150px] shrink-0 rounded-2xl border border-border-strong bg-surface-2 p-2">
        <div className="rounded-xl bg-[var(--brand-navy)] p-3.5 text-white">
          <div className="mb-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-white/50">
            Scan Result
          </div>
          <div className="text-base font-bold">{equipment.id}</div>
          <div className="text-xs text-white/60">{equipment.name}</div>
          <div className="mt-2.5 space-y-2 font-mono text-[11px] text-white/70">
            <div className="flex items-center justify-between">
              <span className="text-white/40">Status</span>
              <span className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[equipment.status]}`} />
                {EQUIPMENT_STATUS_LABEL[equipment.status]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Job</span>
              <span>{equipment.currentJobId ?? "—"}</span>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-brand py-2 text-center text-xs font-semibold">
            Return Equipment
          </div>
        </div>
      </div>

      {/* QR tag on equipment */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 rounded-2xl border border-border-strong bg-surface-2 p-3 text-center">
        <div className="rounded-lg bg-white p-2">
          <QRCodeSVG value={equipment.id} size={72} bgColor="#ffffff" fgColor="#0a0e17" />
        </div>
        <div>
          <div className="font-mono text-sm font-semibold">{equipment.id}</div>
          <div className="text-xs text-text-muted">{equipment.name}</div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wide text-text-dim">
          Scan to track equipment
        </div>
      </div>
    </div>
  );
}
