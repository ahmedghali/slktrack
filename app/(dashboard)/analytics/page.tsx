"use client";

import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TopEquipmentBar } from "@/components/charts/TopEquipmentBar";
import { UtilizationArea } from "@/components/charts/UtilizationArea";
import { equipmentUsageCounts } from "@/lib/selectors";

export default function AnalyticsPage() {
  const { equipment, jobs, jobEquipment } = useAppState();

  const usage = equipmentUsageCounts(jobEquipment);
  const topUsed = [...equipment]
    .map((e) => ({ name: `${e.name} (${e.id})`, uses: usage.get(e.id) ?? 0 }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, 6);

  const byMonth = new Map<string, number>();
  for (const job of jobs) {
    const month = new Date(job.date).toLocaleDateString("en-US", { month: "short" });
    byMonth.set(month, (byMonth.get(month) ?? 0) + 1);
  }
  const utilization = Array.from(byMonth.entries()).map(([label, jobsCount]) => ({
    label,
    jobs: jobsCount,
  }));

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Equipment usage trends across jobs." />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="app-card rounded-2xl p-5">
          <h2 className="mb-4 text-[15px] font-semibold">Most Used Equipment</h2>
          <TopEquipmentBar data={topUsed} />
        </div>
        <div className="app-card rounded-2xl p-5">
          <h2 className="mb-4 text-[15px] font-semibold">Job Volume by Month</h2>
          <UtilizationArea data={utilization} />
        </div>
      </div>
    </div>
  );
}
