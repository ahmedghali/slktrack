"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { historyForEquipment, formatDateTime } from "@/lib/selectors";
import { StatusBadge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { equipment, history } = useAppState();
  const item = equipment.find((e) => e.id === id);
  const events = historyForEquipment(history, id);

  if (!item) {
    return (
      <div>
        <Link href="/equipment" className="flex items-center gap-1.5 text-[15px] text-brand">
          <ArrowLeft size={14} /> Back to Equipment
        </Link>
        <p className="mt-6 text-text-muted">Equipment {id} was not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/equipment" className="mb-5 flex items-center gap-1.5 text-[15px] text-brand hover:text-brand-deep">
        <ArrowLeft size={14} /> Back to Equipment
      </Link>

      <PageHeader
        title={`${item.id} — ${item.name}`}
        subtitle={`${item.category} · ${item.size}`}
        action={<StatusBadge status={item.status} />}
      />

      <div className="grid gap-3.5 sm:grid-cols-3">
        <InfoCard label="Serial Number" value={item.serialNumber} />
        <InfoCard label="Location" value={item.location} />
        <InfoCard label="Current Job" value={item.currentJobId ?? "—"} />
      </div>

      <div className="app-card mt-5 overflow-x-auto rounded-2xl">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold">Equipment History</h2>
        </div>
        <table className="w-full min-w-[560px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Job</th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Action</th>
              <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">By</th>
            </tr>
          </thead>
          <tbody>
            {events.map((h) => (
              <tr key={h.id} className="border-b border-border/60 last:border-0">
                <td className="px-5 py-3 font-mono text-text-muted">{formatDateTime(h.timestamp)}</td>
                <td className="px-5 py-3 font-mono">{h.jobId ?? "—"}</td>
                <td className="px-5 py-3 capitalize">{h.action.replace("_", " ")}</td>
                <td className="px-5 py-3 text-text-muted">{h.userName}</td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-text-muted">
                  No history recorded yet for this tool.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="app-card rounded-2xl p-4">
      <div className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-1.5 text-base font-medium">{value}</div>
    </div>
  );
}
