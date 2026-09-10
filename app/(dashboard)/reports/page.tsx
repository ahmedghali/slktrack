"use client";

import Link from "next/link";
import { FileText } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { equipmentForJob, formatDate } from "@/lib/selectors";

export default function ReportsPage() {
  const { jobs, equipment, jobEquipment } = useAppState();

  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate an end-of-job equipment report." />
      <div className="app-card overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[600px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">Job</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">Well</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">Team</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">Equipment</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-border/60 last:border-0 hover:bg-surface-2">
                <td className="px-4 py-3 font-medium">{job.id}</td>
                <td className="px-4 py-3 font-mono">{job.well}</td>
                <td className="px-4 py-3">{job.team}</td>
                <td className="px-4 py-3 text-text-muted">{formatDate(job.date)}</td>
                <td className="px-4 py-3">{equipmentForJob(jobEquipment, equipment, job.id).length}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/reports/${job.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-deep"
                  >
                    <FileText size={14} /> View report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
