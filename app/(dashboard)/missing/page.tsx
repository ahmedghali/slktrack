"use client";

import Link from "next/link";
import { WarningCircle } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { historyForEquipment, formatDateTime } from "@/lib/selectors";

export default function MissingEquipmentPage() {
  const { equipment, jobs, history, returnEquipment } = useAppState();
  const missing = equipment.filter((e) => e.status === "not_returned");

  return (
    <div>
      <PageHeader
        title="Missing / Not Returned Equipment"
        subtitle={`${missing.length} tool${missing.length === 1 ? "" : "s"} flagged for follow-up.`}
      />

      {missing.length === 0 ? (
        <div className="app-card rounded-2xl p-10 text-center text-text-muted">
          Nothing is currently flagged as not returned.
        </div>
      ) : (
        <div className="space-y-3.5">
          {missing.map((e) => {
            const job = jobs.find((j) => j.id === e.currentJobId);
            const lastEvent = historyForEquipment(history, e.id)[0];
            return (
              <div
                key={e.id}
                className="app-card flex flex-wrap items-center justify-between gap-4 rounded-2xl border-danger/30 p-5"
              >
                <div className="flex items-start gap-3.5">
                  <span className="anim-pulse mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-danger-bg text-danger">
                    <WarningCircle size={19} weight="fill" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/equipment/${e.id}`} className="font-mono font-semibold text-brand hover:text-brand-deep">
                        {e.id}
                      </Link>
                      <span className="text-[15px] font-medium">{e.name}</span>
                    </div>
                    <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-0.5 text-sm text-text-muted sm:grid-cols-4">
                      <span>Job: {job?.id ?? "—"}</span>
                      <span>Well: {job?.well ?? "—"}</span>
                      <span>Team: {job?.team ?? "—"}</span>
                      <span>Last user: {lastEvent?.userName ?? "—"}</span>
                    </div>
                    {lastEvent && (
                      <div className="mt-0.5 font-mono text-xs text-text-dim">
                        Last scan: {formatDateTime(lastEvent.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={() => returnEquipment(e.id)}>Return Equipment</Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
