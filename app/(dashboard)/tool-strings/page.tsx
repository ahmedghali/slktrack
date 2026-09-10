"use client";

import Link from "next/link";
import { LinkSimple } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { toolStringForJob } from "@/lib/selectors";

export default function ToolStringsIndexPage() {
  const { jobs, toolStrings } = useAppState();
  const activeJobs = jobs.filter((j) => j.status === "active");

  return (
    <div>
      <PageHeader title="Tool String Builder" subtitle="Pick a job to build or edit its tool string." />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {activeJobs.map((job) => {
          const ts = toolStringForJob(toolStrings, job.id);
          return (
            <Link
              key={job.id}
              href={`/tool-strings/${job.id}`}
              className="app-card flex items-center justify-between rounded-2xl p-4 transition-colors hover:bg-surface-2"
            >
              <div>
                <div className="font-medium">{job.id}</div>
                <div className="text-sm text-text-muted">{job.well} · {job.team}</div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                <LinkSimple size={13} />
                {ts?.items.length ?? 0} parts
              </div>
            </Link>
          );
        })}
        {activeJobs.length === 0 && (
          <p className="text-text-muted">No active jobs to build a tool string for.</p>
        )}
      </div>
    </div>
  );
}
