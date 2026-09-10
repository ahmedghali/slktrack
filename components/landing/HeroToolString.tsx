"use client";

import { useTilt } from "@/hooks/useTilt";
import { heroToolStringPreview } from "@/lib/mock-data";
import { useAppState } from "@/lib/app-state";

export function HeroToolString() {
  const stringTilt = useTilt(4);
  const statTilt = useTilt(5);
  const { equipment } = useAppState();
  const notReturned = equipment.filter((e) => e.status === "not_returned").length;

  return (
    <div className="relative h-[460px] [perspective:1400px] sm:h-[520px]">
      <div
        className="absolute inset-0 rounded-[24px]"
        style={{
          background:
            "radial-gradient(520px 380px at 60% 30%, rgba(37,99,235,.28), transparent 68%)",
        }}
        aria-hidden="true"
      />

      <div
        {...stringTilt}
        className="glass-card absolute left-[4%] top-[2%] w-[68%] overflow-hidden rounded-[20px] transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          boxShadow: "0 40px 80px rgba(0,0,0,.6), 0 0 60px rgba(37,99,235,.22)",
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted">
            Tool String &middot; Well HMD-221
          </span>
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2.5 p-4 sm:p-5">
          {heroToolStringPreview.map((part, i) => (
            <div
              key={part.id}
              className="anim-rise flex items-center gap-3 rounded-[11px] border border-border p-3"
              style={{
                animationDelay: `${300 + i * 110}ms`,
                background:
                  "linear-gradient(120deg, rgba(37,99,235,.18), rgba(255,255,255,.02))",
              }}
            >
              <span
                className="h-6 w-6 shrink-0 rounded-[7px]"
                style={{
                  background:
                    "linear-gradient(150deg, var(--brand), var(--brand-deep))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.3)",
                }}
                aria-hidden="true"
              />
              <span className="flex-1 text-[13.5px] font-medium">{part.name}</span>
              <span className="font-mono text-[11px] text-text-muted">{part.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        {...statTilt}
        className="glass-card-solid anim-rise absolute bottom-0 right-0 w-[42%] rounded-[18px] p-5 transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          animationDelay: "900ms",
          boxShadow: "0 30px 60px rgba(0,0,0,.65), 0 0 40px rgba(220,38,38,.22)",
        }}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted">
          Not Returned
        </div>
        <div className="mt-1.5 tabular-nums text-[34px] font-bold text-danger">
          {notReturned}
        </div>
        <div className="mt-1 text-[12.5px] text-text-muted">
          flagged across active wells
        </div>
      </div>
    </div>
  );
}
