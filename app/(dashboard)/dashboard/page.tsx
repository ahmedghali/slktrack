"use client";

import Link from "next/link";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Wrench,
  WarningCircle,
  PlusCircle,
  QrCode,
  FileText,
  ArrowSquareOut,
  Package,
} from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { EquipmentStatusDonut } from "@/components/charts/EquipmentStatusDonut";
import { ToolStringPreview } from "@/components/dashboard/ToolStringPreview";
import { ScanPreview } from "@/components/dashboard/ScanPreview";
import { equipmentForJob, equipmentUsageCounts, formatDateTime, toolStringForJob } from "@/lib/selectors";

export default function DashboardPage() {
  const { equipment, jobs, jobEquipment, toolStrings, history, currentUser } = useAppState();

  const counts = {
    total: equipment.length,
    available: equipment.filter((e) => e.status === "available").length,
    reserved: equipment.filter((e) => e.status === "reserved").length,
    in_job: equipment.filter((e) => e.status === "in_job").length,
    not_returned: equipment.filter((e) => e.status === "not_returned").length,
  };

  const activeJobs = jobs.filter((j) => j.status === "active");
  const recentActivity = [...history]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const usage = equipmentUsageCounts(jobEquipment);
  const topUsed = [...equipment]
    .map((e) => ({ ...e, uses: usage.get(e.id) ?? 0 }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, 5);

  const featuredJob = activeJobs[0];
  const featuredToolString = featuredJob ? toolStringForJob(toolStrings, featuredJob.id) : undefined;
  const scanFeatured = equipment.find((e) => e.status === "in_job") ?? equipment[0];

  return (
    <div className="space-y-10">
      <PageHeader
        title={`Welcome back, ${currentUser?.name.split(" ")[0] ?? "there"}`}
        subtitle="Live overview of equipment and active jobs."
      />

      <section>
        <SectionLabel>Fleet at a glance</SectionLabel>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard icon={Briefcase} label="Total Equipment" value={counts.total} />
          <StatCard icon={CheckCircle} label="Available" value={counts.available} tone="ok" />
          <StatCard icon={Clock} label="Reserved" value={counts.reserved} tone="warn" />
          <StatCard icon={Wrench} label="In Job" value={counts.in_job} tone="busy" />
          <StatCard icon={WarningCircle} label="Not Returned" value={counts.not_returned} tone="danger" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="app-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Slickline Jobs</h2>
            <Link href="/jobs" className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-deep">
              View all jobs <ArrowSquareOut size={15} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-border text-text-muted">
                  <th className="pb-3 font-mono text-xs font-medium uppercase tracking-wider">Job</th>
                  <th className="pb-3 font-mono text-xs font-medium uppercase tracking-wider">Well</th>
                  <th className="pb-3 font-mono text-xs font-medium uppercase tracking-wider">Team</th>
                  <th className="pb-3 font-mono text-xs font-medium uppercase tracking-wider">Tools</th>
                  <th className="pb-3 font-mono text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs.map((job) => (
                  <tr key={job.id} className="border-b border-border/60 last:border-0">
                    <td className="py-4">
                      <Link href={`/jobs/${job.id}`} className="font-semibold text-brand hover:text-brand-deep">
                        {job.id}
                      </Link>
                    </td>
                    <td className="py-4 font-mono">{job.well}</td>
                    <td className="py-4">{job.team}</td>
                    <td className="py-4">{equipmentForJob(jobEquipment, equipment, job.id).length}</td>
                    <td className="py-4">
                      <span className="rounded-full border border-info/30 bg-info-bg px-3 py-1 font-mono text-xs font-medium uppercase text-info">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
                {activeJobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-muted">
                      No active jobs right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="app-card rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold">Equipment Status</h2>
          <EquipmentStatusDonut equipment={equipment} />
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {[
              ["Available", "bg-ok"],
              ["Reserved", "bg-warn"],
              ["Assigned", "bg-info"],
              ["In Job", "bg-busy"],
              ["Not Returned", "bg-danger"],
            ].map(([label, cls]) => (
              <div key={label} className="flex items-center gap-2 text-text-muted">
                <span className={`h-2 w-2 rounded-full ${cls}`} aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel>Activity &amp; shortcuts</SectionLabel>
        <div className="mt-3 grid gap-6 lg:grid-cols-3">
          <div className="app-card rounded-2xl p-6">
            <h2 className="mb-4 text-base font-semibold">Recent Equipment Activity</h2>
            <ul className="space-y-4">
              {recentActivity.map((h) => (
                <li key={h.id} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <span className="font-mono font-semibold text-brand">{h.equipmentId}</span>{" "}
                    <span className="text-text-muted">{h.action.replace("_", " ")}</span>{" "}
                    <span className="text-text-muted">by {h.userName}</span>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-text-dim">
                    {formatDateTime(h.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="app-card rounded-2xl p-6">
            <h2 className="mb-4 text-base font-semibold">Top Used Equipment</h2>
            <ul className="space-y-4">
              {topUsed.map((e) => (
                <li key={e.id} className="flex items-center justify-between text-[15px]">
                  <div>
                    <div className="font-medium">{e.name}</div>
                    <div className="font-mono text-xs text-text-muted">{e.id}</div>
                  </div>
                  <span className="tabular-nums font-mono text-sm text-text-muted">
                    {e.uses} job{e.uses === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="app-card rounded-2xl p-6">
              <h2 className="mb-4 text-base font-semibold">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <QuickAction href="/jobs?create=1" icon={PlusCircle} label="Create Job" />
                <QuickAction href="/scan" icon={QrCode} label="Scan QR Code" />
                <QuickAction href="/equipment?add=1" icon={Package} label="Add Equipment" />
                <QuickAction href="/reports" icon={FileText} label="Reports" />
              </div>
            </div>

            {scanFeatured && (
              <div className="app-card rounded-2xl p-4">
                <ScanPreview equipment={scanFeatured} />
              </div>
            )}
          </div>
        </div>
      </section>

      {featuredJob && featuredToolString && featuredToolString.items.length > 0 && (
        <section>
          <ToolStringPreview
            toolString={featuredToolString}
            jobId={featuredJob.id}
            wellLabel={featuredJob.well}
            equipment={equipment}
          />
        </section>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs font-semibold uppercase tracking-[.12em] text-text-dim">
      {children}
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-start gap-2.5 rounded-xl border border-border-strong bg-surface-2 p-4 text-sm font-medium transition-colors hover:bg-border-strong/40"
    >
      <Icon size={20} weight="bold" />
      {label}
    </Link>
  );
}
