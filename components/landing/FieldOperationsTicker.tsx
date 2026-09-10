"use client";

import { Broadcast, CheckCircle, ShieldCheck, Wrench, NavigationArrow, Sparkle } from "@phosphor-icons/react";

const TELEMETRY_ITEMS = [
  {
    icon: Broadcast,
    text: "Hassi Messaoud Base: Fleet Hub Active · 250+ Serialized Downhole Assets",
    tag: "LIVE HUB",
  },
  {
    icon: CheckCircle,
    text: "Well HMD-221: Tool String TS-025 Run Completed · 0 Tools Missing",
    tag: "VERIFIED",
  },
  {
    icon: NavigationArrow,
    text: "Truck Unit T-04: En Route to Well HMD-305 · 5 Scanned Tools Onboard",
    tag: "DISPATCH",
  },
  {
    icon: Wrench,
    text: "Mechanical Jar JR-014: Inspected & Re-certified · Ready for Run",
    tag: "BASE READY",
  },
  {
    icon: ShieldCheck,
    text: "Digital Chain of Custody: 100% Asset Accountability across 6 Active Crews",
    tag: "AUDITED",
  },
  {
    icon: Sparkle,
    text: "Zero Non-Productive Time (NPT) from Missing Downhole Hardware",
    tag: "KPI 0-NPT",
  },
];

export function FieldOperationsTicker() {
  return (
    <div className="relative border-y border-border/80 bg-[#09101f]/90 py-3 backdrop-blur-md overflow-hidden">
      <div className="flex w-max anim-marquee items-center gap-8">
        {[...TELEMETRY_ITEMS, ...TELEMETRY_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-mono tracking-wide text-text-muted"
            >
              <span className="flex items-center gap-1 rounded bg-brand/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand border border-brand/30">
                <span className="h-1.5 w-1.5 rounded-full bg-brand anim-pulse" />
                {item.tag}
              </span>
              <Icon size={14} className="text-brand shrink-0" weight="bold" />
              <span className="text-text/90">{item.text}</span>
              <span className="text-white/20">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
