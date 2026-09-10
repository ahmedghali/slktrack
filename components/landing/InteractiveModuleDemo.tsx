"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  LinkSimple,
  QrCode,
  FileText,
  CheckCircle,
  Scan,
  ArrowRight,
  ArrowSquareOut,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import { QRCodeSVG } from "qrcode.react";

export function InteractiveModuleDemo() {
  const [activeTab, setActiveTab] = useState<"registry" | "builder" | "scan" | "reports">("registry");
  const [simulatedToolStatus, setSimulatedToolStatus] = useState<"available" | "in_job">("available");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d1629]/95 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-brand">
            Interactive Product Preview
          </span>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Experience the Core SLKTrack Platform
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Test the live capabilities of our slickline asset management modules.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-black/40 p-1.5">
          {[
            { id: "registry", label: "Fleet Registry", icon: Package },
            { id: "builder", label: "Tool String CAD", icon: LinkSimple },
            { id: "scan", label: "QR Engine", icon: QrCode },
            { id: "reports", label: "Field Tickets", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-brand text-white shadow-md shadow-brand/40"
                    : "text-text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={15} weight={isCurrent ? "bold" : "regular"} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="mt-8">
        {/* Tab 1: Fleet Registry */}
        {activeTab === "registry" && (
          <div className="anim-fade space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-muted">Viewing:</span>
                <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-brand border border-white/10">
                  Hassi Messaoud Regional Registry (25 Tools Demo)
                </span>
              </div>
              <Link
                href="/equipment"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-sky-400"
              >
                Open Full Registry <ArrowSquareOut size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-text-dim">
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Tool Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Size / Thread</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Live Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-text">
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-brand">PT-001</td>
                    <td className="p-3.5 font-sans font-medium text-white">Pulling Tool (GS Type)</td>
                    <td className="p-3.5 text-text-muted">Pulling Tools</td>
                    <td className="p-3.5">1.500&quot; · 15/16&quot;-10</td>
                    <td className="p-3.5">Well HMD-221</td>
                    <td className="p-3.5">
                      <span className="rounded-full border border-busy/40 bg-busy-bg px-2.5 py-0.5 text-[11px] font-semibold text-busy">
                        IN JOB
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-brand">JR-014</td>
                    <td className="p-3.5 font-sans font-medium text-white">Spang Mechanical Jar</td>
                    <td className="p-3.5 text-text-muted">Tool String</td>
                    <td className="p-3.5">1.500&quot; · 15/16&quot;-10</td>
                    <td className="p-3.5">Hassi Messaoud Base</td>
                    <td className="p-3.5">
                      <span className="rounded-full border border-ok/40 bg-ok-bg px-2.5 py-0.5 text-[11px] font-semibold text-ok">
                        AVAILABLE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-brand">ST-003</td>
                    <td className="p-3.5 font-sans font-medium text-white">Stem Weight Bar</td>
                    <td className="p-3.5 text-text-muted">Tool String</td>
                    <td className="p-3.5">1.500&quot; × 5ft</td>
                    <td className="p-3.5">Truck Unit T-02</td>
                    <td className="p-3.5">
                      <span className="rounded-full border border-info/40 bg-info-bg px-2.5 py-0.5 text-[11px] font-semibold text-info">
                        ASSIGNED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-brand">RS-011</td>
                    <td className="p-3.5 font-sans font-medium text-white">Rope Socket Cable Head</td>
                    <td className="p-3.5 text-text-muted">Tool String</td>
                    <td className="p-3.5">1.500&quot; · .108&quot; Wire</td>
                    <td className="p-3.5">Hassi Messaoud Base</td>
                    <td className="p-3.5">
                      <span className="rounded-full border border-ok/40 bg-ok-bg px-2.5 py-0.5 text-[11px] font-semibold text-ok">
                        AVAILABLE
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Tool String CAD Builder */}
        {activeTab === "builder" && (
          <div className="anim-fade space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-brand">Well Job: HMD-221 (Active)</span>
                <h4 className="text-base font-bold text-white">5-Piece Bottom Hole Assembly Schematic</h4>
              </div>
              <Link
                href="/tool-strings/JOB-001"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-sky-400"
              >
                Launch Builder <ArrowSquareOut size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="flex min-w-[700px] items-center justify-between gap-3">
                {[
                  { pos: 1, id: "RS-011", name: "Rope Socket", type: "Cable Head" },
                  { pos: 2, id: "ST-003", name: "Stem (5ft)", type: "Mass Bar" },
                  { pos: 3, id: "JR-014", name: "Spang Jar", type: "Impact Unit" },
                  { pos: 4, id: "KJ-007", name: "Knuckle Joint", type: "Swivel" },
                  { pos: 5, id: "PT-001", name: "Pulling Tool", type: "GS Latch" },
                ].map((item, idx, arr) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex w-[125px] flex-col items-center rounded-xl border border-brand/40 bg-brand/10 p-3.5 text-center shadow-lg">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-mono font-bold text-white">
                        {item.pos}
                      </span>
                      <div className="mt-2 text-xs font-semibold text-white leading-tight">
                        {item.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-brand">
                        {item.id}
                      </div>
                      <span className="mt-1 rounded bg-white/5 px-2 py-0.5 text-[9px] font-mono text-text-muted">
                        {item.type}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight size={16} className="text-brand shrink-0" weight="bold" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mobile QR Engine */}
        {activeTab === "scan" && (
          <div className="anim-fade grid gap-6 md:grid-cols-[280px_1fr] md:items-center">
            {/* Interactive Scanner Box */}
            <div className="relative flex flex-col items-center rounded-2xl border border-brand/40 bg-black/60 p-6 text-center shadow-xl">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-2xl border-2 border-dashed border-brand/50 bg-brand/5">
                {/* Laser animation bar */}
                <div className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent anim-laser shadow-[0_0_12px_#38bdf8]" />
                <QRCodeSVG value="PT-001" size={100} bgColor="transparent" fgColor="#60a5fa" />
              </div>
              <span className="mt-3 font-mono text-xs text-brand">Simulated Hardware Tag: PT-001</span>
              <button
                onClick={() =>
                  setSimulatedToolStatus((prev) => (prev === "available" ? "in_job" : "available"))
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl btn-primary py-2.5 text-xs font-bold cursor-pointer"
              >
                <ArrowsLeftRight size={14} weight="bold" />
                Simulate {simulatedToolStatus === "available" ? "Take Tool" : "Return Tool"}
              </button>
            </div>

            {/* Instant State Response */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-xs text-text-dim">Asset Telemetry</span>
                  <h4 className="text-lg font-bold text-white">Pulling Tool (PT-001)</h4>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase ${
                    simulatedToolStatus === "available"
                      ? "border-ok/40 bg-ok-bg text-ok"
                      : "border-busy/40 bg-busy-bg text-busy"
                  }`}
                >
                  {simulatedToolStatus === "available" ? "AVAILABLE AT BASE" : "IN JOB AT WELL HMD-221"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-text-dim">Assigned Well:</span>
                  <div className="font-semibold text-white">Well HMD-221</div>
                </div>
                <div>
                  <span className="text-text-dim">Operator / Crew:</span>
                  <div className="font-semibold text-white">Team Alpha (Lead Tech)</div>
                </div>
                <div>
                  <span className="text-text-dim">Serial Number:</span>
                  <div className="font-semibold text-white">SN-45821-2025</div>
                </div>
                <div>
                  <span className="text-text-dim">Audit Stamp:</span>
                  <div className="font-semibold text-ok">Verified 100% Chain</div>
                </div>
              </div>

              <p className="text-xs text-text-muted pt-2">
                Clicking the simulate button triggers real-time state mutation and instantly reflects across all supervisors&apos; dashboards.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Field Tickets */}
        {activeTab === "reports" && (
          <div className="anim-fade space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-brand">Sonatrach / Operator Job Packet</span>
                <h4 className="text-base font-bold text-white">Printable Digital Field Ticket (JOB-001)</h4>
              </div>
              <Link
                href="/reports/JOB-001"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-sky-400"
              >
                View Print Ticket <ArrowSquareOut size={14} />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-xs text-brand">SLKTRACK FIELD CERTIFICATION</div>
                  <div className="text-sm font-bold text-white">Well: HMD-221 · Slickline Plug Retrieval</div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-ok/10 border border-ok/30 px-3 py-1.5 text-xs font-mono text-ok">
                  <CheckCircle size={15} weight="bold" />
                  0 Missing Tools · 100% Reconciled
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono sm:grid-cols-4">
                <div className="rounded-lg bg-black/40 p-2.5">
                  <span className="text-text-dim">Tools Mobilized</span>
                  <div className="text-sm font-bold text-white">5 Components</div>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5">
                  <span className="text-text-dim">Tools Returned</span>
                  <div className="text-sm font-bold text-ok">5 Verified (100%)</div>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5">
                  <span className="text-text-dim">Total Run Depth</span>
                  <div className="text-sm font-bold text-white">2,850 m TVD</div>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5">
                  <span className="text-text-dim">Non-Productive Time</span>
                  <div className="text-sm font-bold text-brand">0.0 Hours</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
