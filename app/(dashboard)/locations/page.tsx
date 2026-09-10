"use client";

import Link from "next/link";
import { MapPin } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/ui/Badge";

export default function LocationsPage() {
  const { equipment } = useAppState();

  const byLocation = new Map<string, typeof equipment>();
  for (const e of equipment) {
    const list = byLocation.get(e.location) ?? [];
    list.push(e);
    byLocation.set(e.location, list);
  }

  return (
    <div>
      <PageHeader title="Locations" subtitle="Where equipment is currently based." />
      <div className="space-y-5">
        {Array.from(byLocation.entries()).map(([location, items]) => (
          <div key={location} className="app-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={17} className="text-brand" />
              <h2 className="text-[15px] font-semibold">{location}</h2>
              <span className="font-mono text-xs text-text-muted">
                ({items.length})
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((e) => (
                <Link
                  key={e.id}
                  href={`/equipment/${e.id}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-[15px] transition-colors hover:bg-border-strong/40"
                >
                  <span>
                    <span className="font-mono text-brand">{e.id}</span> {e.name}
                  </span>
                  <StatusBadge status={e.status} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
