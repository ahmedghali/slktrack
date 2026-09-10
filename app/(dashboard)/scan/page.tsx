"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Scan, ArrowClockwise } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { AppCard } from "@/components/ui/AppCard";

export default function ScanPage() {
  const { equipment, jobs, takeEquipment, returnEquipment } = useAppState();
  const [scannedId, setScannedId] = useState<string | null>(null);

  const scanned = equipment.find((e) => e.id === scannedId);
  const scannedJob = scanned?.currentJobId ? jobs.find((j) => j.id === scanned.currentJobId) : undefined;

  function simulateScan() {
    // Pick a plausible target: prefer something assigned or in-job so both actions are demoable
    const candidates = equipment.filter((e) => e.status === "assigned" || e.status === "in_job" || e.status === "available");
    const pick = candidates[Math.floor(Math.random() * candidates.length)] ?? equipment[0];
    setScannedId(pick.id);
  }

  return (
    <div>
      <PageHeader title="QR Scanner" subtitle="Scan a tool's tag to take or return it." />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <AppCard className="p-6 text-center">
          <div
            className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand/50 shadow-inner"
            style={{
              background:
                "radial-gradient(320px 240px at 50% 40%, rgba(37,99,235,.2), var(--surface-2) 75%)",
            }}
          >
            {/* Animated Laser Bar */}
            <div className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent anim-laser shadow-[0_0_12px_#38bdf8]" />
            <Scan size={76} className="text-brand/80" />
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Simulates optical camera decoding of 316L stainless steel serialized barcode tags.
          </p>
          <Button onClick={simulateScan} className="mt-5 w-full gap-2 font-semibold">
            <ArrowClockwise size={16} weight="bold" /> Random Simulate Scan
          </Button>
        </AppCard>

        <AppCard className="p-6">
          {!scanned ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center text-text-muted">
              <Scan size={36} className="mb-3 opacity-40 text-brand" />
              <div className="font-medium text-text">No active scan loaded</div>
              <div className="text-xs text-text-muted mt-1">
                Click &quot;Simulate Scan&quot; or select any serialized tag below.
              </div>
            </div>
          ) : (
            <div className="anim-fade">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {scanned.category}
                  </div>
                  <h2 className="mt-1 text-[22px] font-bold">{scanned.name}</h2>
                  <div className="mt-1 font-mono text-[15px] text-brand">{scanned.id}</div>
                </div>
                <StatusBadge status={scanned.status} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                <Field label="Job" value={scannedJob?.id ?? "—"} />
                <Field label="Well" value={scannedJob?.well ?? "—"} />
                <Field label="Team" value={scannedJob?.team ?? "—"} />
                <Field label="Location" value={scanned.location} />
                <Field label="Serial No." value={scanned.serialNumber} />
                <Field label="Size" value={scanned.size} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => takeEquipment(scanned.id)}
                  disabled={scanned.status === "in_job"}
                >
                  Take Equipment
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => returnEquipment(scanned.id)}
                  disabled={scanned.status === "available"}
                >
                  Return Equipment
                </Button>
                <Link href={`/equipment/${scanned.id}`} className="ml-auto self-center text-sm text-brand hover:text-brand-deep">
                  View full history →
                </Link>
              </div>
            </div>
          )}
        </AppCard>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-[15px] font-semibold">Equipment QR Tags</h2>
        <p className="mb-4 text-[15px] text-text-muted">
          Each tool gets a printable QR tag encoding its equipment ID — scan
          any of these with a phone to see the raw code SLKTrack would read
          in the field.
        </p>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {equipment.slice(0, 8).map((e) => (
            <button
              key={e.id}
              onClick={() => setScannedId(e.id)}
              className={`app-card flex flex-col items-center gap-2.5 rounded-2xl p-4 text-left transition-all hover:border-brand/60 hover:shadow-md cursor-pointer ${
                scannedId === e.id ? "ring-2 ring-brand border-brand" : ""
              }`}
            >
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <QRCodeSVG value={e.id} size={88} bgColor="#ffffff" fgColor="#0a0708" />
              </div>
              <div className="text-center">
                <div className="font-mono text-sm font-semibold text-brand">{e.id}</div>
                <div className="text-xs text-text-muted line-clamp-1">{e.name}</div>
                <span className="mt-1 inline-block font-mono text-[10px] uppercase text-text-dim">
                  Click to scan
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-0.5 text-[15px] font-medium">{value}</div>
    </div>
  );
}
