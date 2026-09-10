"use client";

import { useState } from "react";
import {
  Barcode,
  CalendarCheck,
  LinkSimple,
  Truck,
  ArrowsDownUp,
  ArrowCounterClockwise,
  CheckCircle,
  CaretRight,
} from "@phosphor-icons/react";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Serialization & Base Tagging",
    subtitle: "Central Warehouse Hub",
    icon: Barcode,
    description:
      "Every Pulling Tool, Jar, Stem, and Valve is inscribed with high-contrast QR & industrial serial numbers. Calibrated OD, pin/box connections, and service history are registered instantly.",
    badge: "API 7-1 Specs",
    metric: "100% Tools Serialized",
  },
  {
    step: "02",
    title: "Job Staging & Conflict Filter",
    subtitle: "Dispatcher & Supervisor",
    icon: CalendarCheck,
    description:
      "When a job is planned for Well HMD-221, the system checks real-time equipment availability across all hubs. Impossible to double-book tools already assigned or out in the field.",
    badge: "Zero Double-Booking",
    metric: "Automated Allocation",
  },
  {
    step: "03",
    title: "BHA Tool String Assembly",
    subtitle: "Field Engineering",
    icon: LinkSimple,
    description:
      "The engineering crew configures the exact downhole sequence: Rope Socket → Stem → Mechanical Jar → Knuckle Joint → Pulling Tool. Stack order is locked to the specific well job ticket.",
    badge: "CAD-Style Sequence",
    metric: "5-Piece Run Stack",
  },
  {
    step: "04",
    title: "Truck Mobilization & Mobile QR Scan",
    subtitle: "Field Operator / Driver",
    icon: Truck,
    description:
      "Before leaving the base, the technician scans each physical QR tag using the mobile interface. Custody instantly transfers to the field team and transit status updates live.",
    badge: "Sub-Second Scan",
    metric: "Instant Handover",
  },
  {
    step: "05",
    title: "Wellsite Run & Downhole Work",
    subtitle: "Wellhead Intervention",
    icon: ArrowsDownUp,
    description:
      "During downhole intervention, the asset status updates to 'In Job' on the central operational dashboard. Supervisors at headquarters see exactly which tools are downhole in real time.",
    badge: "Live Telemetry",
    metric: "Real-Time Tracking",
  },
  {
    step: "06",
    title: "Return, Inspection & Closeout",
    subtitle: "Base Workshop Audit",
    icon: ArrowCounterClockwise,
    description:
      "Upon wellsite completion, tools are scanned back at the base workshop. The system verifies every serialized component; any unreturned tool is flagged in red with an audit trail.",
    badge: "Audit Guard",
    metric: "Zero Missing Gear",
  },
];

export function WorkflowSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0b1222]/90 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-brand">
            End-to-End Chain of Custody
          </span>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            From Warehouse Dispatch to Downhole Return
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <span>6-Step Operational Cycle</span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand anim-pulse" />
        </div>
      </div>

      {/* Step Progress Pills */}
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {WORKFLOW_STEPS.map((s, idx) => {
          const isActive = idx === activeStep;
          const Icon = s.icon;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                isActive
                  ? "border-brand bg-brand/20 shadow-lg shadow-brand/20"
                  : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className={`font-mono text-xs font-bold ${isActive ? "text-brand" : "text-text-dim"}`}>
                  {s.step}
                </span>
                <Icon
                  size={16}
                  weight={isActive ? "bold" : "regular"}
                  className={isActive ? "text-brand" : "text-text-muted"}
                />
              </div>
              <span className="mt-2 text-xs font-semibold text-white leading-tight">
                {s.title.split("&")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-mono font-bold text-sm shadow-md shadow-brand/40">
              {WORKFLOW_STEPS[activeStep].step}
            </span>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-brand">
                {WORKFLOW_STEPS[activeStep].subtitle}
              </div>
              <h4 className="text-xl font-bold text-white">
                {WORKFLOW_STEPS[activeStep].title}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 font-mono text-xs text-brand">
              {WORKFLOW_STEPS[activeStep].badge}
            </span>
            <span className="rounded-full border border-ok/30 bg-ok/10 px-3.5 py-1 font-mono text-xs text-ok">
              {WORKFLOW_STEPS[activeStep].metric}
            </span>
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-text/90 max-w-3xl">
          {WORKFLOW_STEPS[activeStep].description}
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
            <CheckCircle size={15} weight="bold" className="text-ok" />
            Zero manual paper logs required at any stage.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : WORKFLOW_STEPS.length - 1))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 cursor-pointer"
            >
              Previous Phase
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < WORKFLOW_STEPS.length - 1 ? prev + 1 : 0))}
              className="flex items-center gap-1 rounded-xl btn-primary px-4 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Next Phase <CaretRight size={13} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
