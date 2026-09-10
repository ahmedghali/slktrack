"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash, ArrowRight, LinkSimple } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { equipmentForJob, toolStringForJob } from "@/lib/selectors";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";

export default function ToolStringBuilderPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { jobs, equipment, jobEquipment, toolStrings, addToolStringItem, removeToolStringItem } = useAppState();
  const job = jobs.find((j) => j.id === jobId);
  const toolString = toolStringForJob(toolStrings, jobId);
  const [pickerId, setPickerId] = useState("");

  if (!job || !toolString) {
    return (
      <div>
        <Link href="/tool-strings" className="flex items-center gap-1.5 text-[15px] text-brand">
          <ArrowLeft size={14} /> Back
        </Link>
        <p className="mt-6 text-text-muted">Tool string for {jobId} was not found.</p>
      </div>
    );
  }

  const jobEquip = equipmentForJob(jobEquipment, equipment, jobId);
  const usedIds = new Set(toolString.items.map((it) => it.equipmentId));
  const candidates = jobEquip.filter((e) => !usedIds.has(e.id));

  const items = [...toolString.items].sort((a, b) => a.order - b.order);

  return (
    <div>
      <Link href="/tool-strings" className="mb-5 flex items-center gap-1.5 text-[15px] text-brand hover:text-brand-deep">
        <ArrowLeft size={14} /> Back to Tool Strings
      </Link>

      <PageHeader title={`Tool String — ${toolString.id}`} subtitle={`${job.id} · ${job.well}`} />

      <div className="app-card mb-6 rounded-2xl p-6">
        <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
          <LinkSimple size={13} />
          Connected string, in run order
        </div>

        {items.length === 0 ? (
          <p className="py-10 text-center text-text-muted">
            No components yet. Add a piece below to start building the string.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-1 overflow-x-auto pb-2">
            {items.map((item, i) => {
              const eq = equipment.find((e) => e.id === item.equipmentId);
              if (!eq) return null;
              return (
                <div key={item.id} className="flex shrink-0 items-center gap-1">
                  <div className="app-card group flex w-[132px] flex-col items-center gap-2 rounded-xl px-3 py-4 text-center">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-semibold text-white"
                      style={{ background: "linear-gradient(150deg, var(--brand), var(--brand-deep))" }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium leading-tight">{eq.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-text-muted">{eq.id}</div>
                    </div>
                    <button
                      onClick={() => removeToolStringItem(jobId, item.id)}
                      aria-label={`Remove ${eq.name} from tool string`}
                      className="cursor-pointer rounded-lg p-1.5 text-text-dim opacity-0 transition-opacity hover:bg-danger-bg hover:text-danger group-hover:opacity-100"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                  {i < items.length - 1 && (
                    <ArrowRight size={16} className="shrink-0 text-text-dim" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="app-card max-w-xl rounded-2xl p-5">
        <h2 className="mb-3 text-[15px] font-semibold">Add component</h2>
        <p className="mb-3 text-sm text-text-muted">
          Only equipment already assigned to {job.id} can be added to the string.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <select
            value={pickerId}
            onChange={(e) => setPickerId(e.target.value)}
            className="min-w-[220px] flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-brand/60"
          >
            <option value="">Select a component…</option>
            {candidates.map((e) => (
              <option key={e.id} value={e.id}>
                {e.id} — {e.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() => {
              if (!pickerId) return;
              addToolStringItem(jobId, pickerId);
              setPickerId("");
            }}
            disabled={!pickerId}
            className="gap-2"
          >
            <Plus size={16} weight="bold" /> Add
          </Button>
        </div>
        {candidates.length === 0 && (
          <p className="mt-2.5 text-sm text-text-dim">
            All assigned equipment for this job is already in the string.
          </p>
        )}
      </div>
    </div>
  );
}
