"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, LinkSimple } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { equipmentForJob, formatDate } from "@/lib/selectors";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { jobs, equipment, jobEquipment, assignEquipmentToJob } = useAppState();
  const job = jobs.find((j) => j.id === id);
  const [pickerId, setPickerId] = useState("");

  if (!job) {
    return (
      <div>
        <Link href="/jobs" className="flex items-center gap-1.5 text-[15px] text-brand">
          <ArrowLeft size={14} /> Back to Jobs
        </Link>
        <p className="mt-6 text-text-muted">Job {id} was not found.</p>
      </div>
    );
  }

  const assigned = equipmentForJob(jobEquipment, equipment, job.id);
  const assignedIds = new Set(assigned.map((e) => e.id));
  const available = equipment.filter((e) => e.status === "available" && !assignedIds.has(e.id));

  function handleAssign() {
    if (!pickerId) return;
    assignEquipmentToJob(job!.id, pickerId);
    setPickerId("");
  }

  return (
    <div>
      <Link href="/jobs" className="mb-5 flex items-center gap-1.5 text-[15px] text-brand hover:text-brand-deep">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>

      <PageHeader
        title={job.id}
        subtitle={`${job.well} · ${job.task} · ${job.team} · ${formatDate(job.date)}`}
        action={
          <span
            className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide ${
              job.status === "active" ? "border-info/30 bg-info-bg text-info" : "border-ok/30 bg-ok-bg text-ok"
            }`}
          >
            {job.status}
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="app-card rounded-2xl p-5 lg:col-span-2">
          <h2 className="mb-4 text-[15px] font-semibold">Assigned Equipment</h2>
          <div className="space-y-2">
            {assigned.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3">
                <div>
                  <span className="font-mono font-medium text-brand">{e.id}</span>{" "}
                  <span className="text-text-muted">{e.name}</span>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
            {assigned.length === 0 && (
              <p className="py-4 text-center text-text-muted">No equipment assigned yet.</p>
            )}
          </div>

          {job.status === "active" && (
            <div className="mt-5 border-t border-border pt-5">
              <h3 className="mb-2.5 text-[15px] font-medium text-text-muted">Assign equipment</h3>
              <div className="flex flex-wrap gap-2.5">
                <select
                  value={pickerId}
                  onChange={(e) => setPickerId(e.target.value)}
                  className="min-w-[220px] flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand/60"
                >
                  <option value="">Select available equipment…</option>
                  {available.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.id} — {e.name}
                    </option>
                  ))}
                </select>
                <Button onClick={handleAssign} disabled={!pickerId} className="gap-2">
                  <Plus size={16} weight="bold" /> Assign Equipment
                </Button>
              </div>
              {available.length === 0 && (
                <p className="mt-2 text-sm text-text-dim">
                  No available equipment left to assign right now.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="app-card rounded-2xl p-5">
          <h2 className="mb-3 text-[15px] font-semibold">Tool String</h2>
          <p className="mb-3 text-[15px] text-text-muted">
            Build the connected tool string for this job.
          </p>
          <Link href={`/tool-strings/${job.id}`}>
            <Button variant="ghost" className="w-full gap-2">
              <LinkSimple size={16} /> Open Tool String Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
