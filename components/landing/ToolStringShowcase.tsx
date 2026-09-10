"use client";

import { useState } from "react";
import { Wrench, Info, CheckCircle, WarningOctagon, Sparkle, LinkSimple, Warning } from "@phosphor-icons/react";

interface ToolComponent {
  id: string;
  name: string;
  category: string;
  standardSize: string;
  threadType: string;
  weight: string;
  stroke?: string;
  purpose: string;
  keyRisk: string;
  fieldVerification: string;
}

const TOOL_COMPONENTS: ToolComponent[] = [
  {
    id: "RS-011",
    name: "Rope Socket (Pear Drop / Wedge)",
    category: "Tool String Cable Head",
    standardSize: '1.500" OD',
    threadType: '15/16"-10 UN Pin/Box',
    weight: "3.2 lbs",
    purpose: "Provides the ultra-secure mechanical connection between the solid slickline wire (.108\" or .125\") and the downhole tool string assembly.",
    keyRisk: "Improper wire knot or damaged wedge sleeve can cause wire parting downhole, requiring an emergency fishing job.",
    fieldVerification: "Pull-test verified & serialized before job dispatch.",
  },
  {
    id: "ST-003",
    name: "Stem (Solid Steel Weight Bar)",
    category: "Downhole Mass Component",
    standardSize: '1.500" OD × 5 ft',
    threadType: '15/16"-10 UN Pin/Box',
    weight: "28.5 lbs",
    purpose: "Supplies essential downward mass required to overcome wellhead stuffing box friction and descend against live wellbore pressure.",
    keyRisk: "Bent stem or galling threads can bind inside tubing or cause tool string misalignment.",
    fieldVerification: "Thread gauge inspection & straightness check.",
  },
  {
    id: "JR-014",
    name: "Spang Mechanical Jar",
    category: "Impact Accelerator",
    standardSize: '1.500" OD',
    threadType: '15/16"-10 UN Pin/Box',
    weight: "16.8 lbs",
    stroke: '20" / 30" Stroke Length',
    purpose: "Delivers powerful upward and downward kinetic jarring impacts to shear release pins, set downhole plugs, or unseat tight subsurface tools.",
    keyRisk: "Worn impact faces or sand-packed sliding linkage cause jar sticking during high-tension pulling.",
    fieldVerification: "Stroke free-travel & linkage clearance certified.",
  },
  {
    id: "KJ-007",
    name: "Knuckle Joint (Ball & Socket)",
    category: "Angular Articulation",
    standardSize: '1.500" OD',
    threadType: '15/16"-10 UN Pin/Box',
    weight: "4.1 lbs",
    purpose: "Grants 360-degree rotational and angular flexibility to ensure the tool string navigates doglegs, tubing bends, and nipple profiles freely.",
    keyRisk: "Excessive lateral play or cracked swivel ball risks downhole structural separation.",
    fieldVerification: "Angular torque & swivel freedom inspected.",
  },
  {
    id: "PT-001",
    name: "Pulling Tool (GS / SB / R Type)",
    category: "Subsurface Retrieval Tool",
    standardSize: '1.500" / 2.000"',
    threadType: '15/16"-10 UN Pin',
    weight: "7.4 lbs",
    purpose: "Latches into the internal or external fishing neck of downhole subsurface safety valves (SCSSV), blanking plugs, or gas lift valves.",
    keyRisk: "Incorrect core size or weakened shear pin results in premature release or unretrieved subsurface plug.",
    fieldVerification: "Core length gauge & brass shear pin spec confirmed.",
  },
];

export function ToolStringShowcase() {
  const [selectedTool, setSelectedTool] = useState<ToolComponent>(TOOL_COMPONENTS[0]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#0d1527]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl schematic-grid">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand">
            <LinkSimple className="h-3.5 w-3.5" />
            BHA Mechanical Anatomy
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Interactive Slickline Downhole Tool String
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Click any component in the downhole sequence to inspect engineering specifications &amp; chain-of-custody tracking.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-xs font-mono text-brand">
          <span className="h-2 w-2 rounded-full bg-brand anim-pulse" />
          Standard 1.500&quot; BHA Stack
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:items-start">
        {/* Visual Assembly Sequence */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-dim mb-2">
            Top of String (Wireline Cable) ↓ Downhole Bit
          </div>

          <div className="relative space-y-2.5">
            {/* Guide line down the left */}
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand via-sky-400 to-brand-deep opacity-40" />

            {TOOL_COMPONENTS.map((tool, idx) => {
              const isSelected = selectedTool.id === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`group relative flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand bg-brand/20 shadow-[0_0_25px_rgba(37,99,235,0.35)] translate-x-1.5"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  {/* Position number pill */}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-brand text-white shadow-md shadow-brand/50"
                        : "bg-white/10 text-text-muted group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-brand">
                        {tool.id}
                      </span>
                      <span className="font-mono text-[11px] text-text-dim">
                        {tool.standardSize}
                      </span>
                    </div>
                    <div className="truncate text-sm font-medium text-white">
                      {tool.name}
                    </div>
                    <div className="truncate text-xs text-text-muted">
                      {tool.category}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="h-2 w-2 shrink-0 rounded-full bg-brand anim-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Component Technical Detail Card */}
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6 sm:p-7 shadow-xl">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand uppercase tracking-wider">
                <Wrench className="h-3.5 w-3.5" />
                Component Inspector · {selectedTool.id}
              </div>
              <h4 className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                {selectedTool.name}
              </h4>
              <p className="mt-0.5 text-xs text-text-muted">
                {selectedTool.category}
              </p>
            </div>
            <span className="rounded-xl border border-ok/40 bg-ok/10 px-3 py-1 font-mono text-xs font-medium text-ok">
              Available in Registry
            </span>
          </div>

          {/* Specs grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <span className="font-mono text-[10px] uppercase text-text-dim">Standard Size</span>
              <div className="mt-1 font-mono text-sm font-semibold text-white">
                {selectedTool.standardSize}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <span className="font-mono text-[10px] uppercase text-text-dim">Connection Thread</span>
              <div className="mt-1 font-mono text-xs font-semibold text-white">
                {selectedTool.threadType}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <span className="font-mono text-[10px] uppercase text-text-dim">Weight / Stroke</span>
              <div className="mt-1 font-mono text-sm font-semibold text-white">
                {selectedTool.stroke ? `${selectedTool.weight} (${selectedTool.stroke})` : selectedTool.weight}
              </div>
            </div>
          </div>

          {/* Functional role */}
          <div className="mt-5 space-y-3.5 text-sm">
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-3.5">
              <div className="flex items-center gap-1.5 font-semibold text-brand text-xs uppercase tracking-wide">
                <Info className="h-4 w-4" /> Operational Purpose
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text/90">
                {selectedTool.purpose}
              </p>
            </div>

            <div className="rounded-xl border border-danger/30 bg-danger-bg/40 p-3.5">
              <div className="flex items-center gap-1.5 font-semibold text-danger text-xs uppercase tracking-wide">
                <WarningOctagon size={16} weight="bold" /> Downhole Risk Without Tracking
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text/90">
                {selectedTool.keyRisk}
              </p>
            </div>

            <div className="rounded-xl border border-ok/30 bg-ok-bg/30 p-3.5">
              <div className="flex items-center gap-1.5 font-semibold text-ok text-xs uppercase tracking-wide">
                <CheckCircle size={16} weight="bold" /> SLKTrack Field Verification
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text/90">
                {selectedTool.fieldVerification}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
