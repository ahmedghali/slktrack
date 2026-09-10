"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { equipmentForJob, toolStringForJob, formatDate } from "@/lib/selectors";
import { Button } from "@/components/ui/Button";

export default function ReportDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { jobs, equipment, jobEquipment, toolStrings } = useAppState();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div>
        <Link href="/reports" className="flex items-center gap-1.5 text-[15px] text-brand">
          <ArrowLeft size={14} /> Back
        </Link>
        <p className="mt-6 text-text-muted">Report for {jobId} not found.</p>
      </div>
    );
  }

  const assigned = equipmentForJob(jobEquipment, equipment, jobId);
  const returned = assigned.filter((e) => e.status === "available");
  const notReturned = assigned.filter((e) => e.status === "not_returned");
  const toolString = toolStringForJob(toolStrings, jobId);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between print:hidden">
        <Link href="/reports" className="flex items-center gap-1.5 text-[15px] text-brand hover:text-brand-deep">
          <ArrowLeft size={14} /> Back to Reports
        </Link>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer size={16} weight="bold" /> Export PDF
        </Button>
      </div>

      <div className="app-card mx-auto max-w-2xl rounded-2xl p-8 print:border-0 print:bg-white print:p-0 print:text-black">
        <div className="mb-6 border-b border-border pb-5 print:border-black/20">
          <div className="font-mono text-xs uppercase tracking-wider text-brand print:text-black">
            Slickline Equipment Report
          </div>
          <h1 className="mt-1.5 text-[24px] font-bold">{job.id}</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[15px] sm:grid-cols-4">
          <Field label="Well" value={job.well} />
          <Field label="Team" value={job.team} />
          <Field label="Date" value={formatDate(job.date)} />
          <Field label="Status" value={job.status} />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3.5 text-center">
          <Stat label="Assigned" value={assigned.length} />
          <Stat label="Returned" value={returned.length} tone="ok" />
          <Stat label="Not Returned" value={notReturned.length} tone={notReturned.length ? "danger" : "ok"} />
        </div>

        {toolString && toolString.items.length > 0 && (
          <div className="mt-7">
            <h2 className="mb-2.5 text-base font-semibold">Tool String Used</h2>
            <div className="space-y-1.5">
              {[...toolString.items]
                .sort((a, b) => a.order - b.order)
                .map((item, i) => {
                  const eq = equipment.find((e) => e.id === item.equipmentId);
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-[15px]">
                      <span className="font-mono text-text-dim print:text-black/60">{i + 1}.</span>
                      {eq?.name} <span className="font-mono text-text-muted print:text-black/60">({eq?.id})</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        <div className="mt-7">
          <h2 className="mb-2.5 text-base font-semibold">Equipment</h2>
          <div className="space-y-1.5 text-[15px]">
            {assigned.map((e) => (
              <div key={e.id} className="flex items-center justify-between">
                <span>
                  <span className="font-mono">{e.id}</span> — {e.name}
                </span>
                <span className="text-text-muted print:text-black/60">{e.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wider text-text-muted print:text-black/50">
        {label}
      </div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "ok" | "danger" }) {
  const toneClass = tone === "ok" ? "text-ok" : tone === "danger" ? "text-danger" : "text-text";
  return (
    <div className="rounded-xl border border-border p-3.5 print:border-black/20">
      <div className={`tabular-nums text-[22px] font-bold ${toneClass} print:text-black`}>{value}</div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted print:text-black/50">
        {label}
      </div>
    </div>
  );
}
