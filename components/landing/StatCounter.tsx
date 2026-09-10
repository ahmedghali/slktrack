"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function StatCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const count = useCountUp(value);
  return (
    <div className="rounded-2xl border border-border bg-white/[0.03] p-5 backdrop-blur-md">
      <div className="tabular-nums text-[27px] font-semibold text-text">
        {count}
        {suffix}
      </div>
      <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-muted">
        {label}
      </div>
    </div>
  );
}
