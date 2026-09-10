"use client";

import { useState, useEffect } from "react";
import {
  ArrowsDownUp,
  Gauge,
  Lightning,
  Sparkle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";

export function WellIntervention3DVisualizer() {
  const [depth, setDepth] = useState(2850.0);
  const [runningState, setRunningState] = useState<"idle" | "lowering" | "raising" | "jarring">("idle");
  const [tension, setTension] = useState(380);
  const [speed, setSpeed] = useState(0);
  const [jarSparks, setJarSparks] = useState(false);

  // Depth and tension physics animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (runningState === "lowering") {
      setSpeed(120);
      interval = setInterval(() => {
        setDepth((prev) => +(prev + 1.2).toFixed(1));
        setTension(360 + Math.sin(Date.now() / 200) * 15);
      }, 50);
    } else if (runningState === "raising") {
      setSpeed(140);
      interval = setInterval(() => {
        setDepth((prev) => (prev > 10 ? +(prev - 1.4).toFixed(1) : 0));
        setTension(440 + Math.sin(Date.now() / 200) * 20);
      }, 50);
    } else if (runningState === "jarring") {
      setSpeed(0);
      setJarSparks(true);
      const timer = setTimeout(() => {
        setJarSparks(false);
        setRunningState("idle");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setSpeed(0);
      setTension(380);
    }

    return () => clearInterval(interval);
  }, [runningState]);

  // Normalized visual position of tool in the vertical well schematic (0% to 85%)
  const normalizedPos = Math.min(85, Math.max(10, (depth / 3500) * 85));

  return (
    <div className="rounded-3xl border border-white/15 bg-[#080e1d]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-brand">
            Live Intervention Simulator
          </span>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Real-Time Downhole Run &amp; Tension Telemetry
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Simulate slickline wireline intervention downhole at Well HMD-221.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRunningState("lowering")}
            disabled={runningState === "lowering"}
            className="flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2 text-xs font-semibold text-white cursor-pointer disabled:opacity-50"
          >
            <ArrowDown size={14} weight="bold" /> Run In Hole (RIH)
          </button>
          <button
            onClick={() => setRunningState("jarring")}
            disabled={runningState === "jarring"}
            className="flex items-center gap-1.5 rounded-xl border border-warn bg-warn/20 px-4 py-2 text-xs font-semibold text-warn hover:bg-warn/30 transition-colors cursor-pointer"
          >
            <Lightning size={14} weight="bold" /> Jar Up Impact
          </button>
          <button
            onClick={() => setRunningState("raising")}
            disabled={runningState === "raising"}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            <ArrowUp size={14} weight="bold" /> Pull Out of Hole (POOH)
          </button>
          <button
            onClick={() => setRunningState("idle")}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-text-dim hover:text-white transition-colors cursor-pointer"
          >
            Hold
          </button>
        </div>
      </div>

      {/* Simulator Interface: 3D Well schematic + Real-time Gauges */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        {/* Visual Wellbore Cross-Section Column */}
        <div className="relative h-[380px] rounded-2xl border border-white/10 bg-black/60 p-4 shadow-inner overflow-hidden flex flex-col justify-between">
          {/* Surface Wellhead representation */}
          <div className="border-b border-brand/30 pb-2 flex items-center justify-between font-mono text-[10px] text-text-dim z-10">
            <span className="text-brand font-semibold">SURFACE WELLHEAD &middot; 0.0m</span>
            <span>PRESSURE: 4,250 PSI</span>
          </div>

          {/* Vertical Wellbore Track */}
          <div className="relative flex-1 w-full flex justify-center py-4">
            {/* Casing Tube */}
            <div className="relative w-20 h-full border-x-2 border-dashed border-sky-500/30 bg-sky-950/10 flex flex-col items-center">
              {/* Slickline Wire going down */}
              <div
                className="w-0.5 bg-gradient-to-b from-sky-400 to-brand shadow-[0_0_8px_#38bdf8]"
                style={{ height: `${normalizedPos}%` }}
              />

              {/* Downhole Tool String Representation */}
              <div
                className="relative flex flex-col items-center transition-all duration-75"
                style={{ marginTop: `calc(${normalizedPos}% - 10px)` }}
              >
                {/* Shockwave Jarring Effect */}
                {jarSparks && (
                  <div className="absolute -inset-4 rounded-full border-2 border-warn animate-ping bg-warn/20" />
                )}

                {/* Tool String Stack Graphic */}
                <div className="w-4 h-3 bg-brand rounded-t-sm shadow-md" title="Rope Socket" />
                <div className="w-3.5 h-10 bg-slate-300 shadow-md" title="Stem Weight Bar" />
                <div className="w-4 h-6 bg-amber-500 shadow-md" title="Spang Jar" />
                <div className="w-3.5 h-3 bg-slate-400 rounded-full" title="Knuckle Joint" />
                <div className="w-4.5 h-6 bg-cyan-400 rounded-b-sm shadow-md" title="Pulling Tool" />
              </div>

              {/* Landing Nipple Profile at depth */}
              <div className="absolute bottom-6 w-full border-y border-amber-500/50 bg-amber-500/10 py-1 text-[8px] font-mono text-center text-amber-300">
                NIPPLE 2,850m
              </div>
            </div>
          </div>

          {/* Bottom Hole Target */}
          <div className="border-t border-brand/30 pt-2 flex items-center justify-between font-mono text-[10px] text-text-dim z-10">
            <span className="text-ok font-semibold">TARGET ZONE &middot; 3,200m</span>
            <span>BHT: 118°C</span>
          </div>
        </div>

        {/* Real-time Telemetry & Gauge Cluster */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Depth Gauge */}
          <div className="rounded-2xl border border-brand/40 bg-gradient-to-b from-brand/15 to-transparent p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-text-dim uppercase">Current Wireline Depth</span>
              <Gauge size={20} weight="bold" className="text-brand" />
            </div>
            <div className="mt-3 font-mono text-3xl font-bold text-white tracking-tight">
              {depth.toLocaleString("en-US", { minimumFractionDigits: 1 })} <span className="text-base text-brand">m TVD</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-text-muted">
              <Clock size={13} />
              Run Time: 00:38:24
            </div>
          </div>

          {/* Tension / Weight Indicator */}
          <div className="rounded-2xl border border-sky-400/40 bg-gradient-to-b from-sky-400/15 to-transparent p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-text-dim uppercase">Dynamic Line Tension</span>
              <Lightning size={20} weight="bold" className="text-sky-400" />
            </div>
            <div className="mt-3 font-mono text-3xl font-bold text-sky-400 tracking-tight">
              {Math.round(tension)} <span className="text-base text-text-muted">lbs</span>
            </div>
            <div className="mt-2 font-mono text-xs text-ok">
              ● Normal Pull Limit (Max: 1,200 lbs)
            </div>
          </div>

          {/* Line Speed */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <span className="font-mono text-[11px] text-text-dim uppercase">Winch Speed</span>
            <div className="mt-1 font-mono text-xl font-bold text-white">
              {speed} <span className="text-xs text-text-muted">m/min</span>
            </div>
          </div>

          {/* Operation Status */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <span className="font-mono text-[11px] text-text-dim uppercase">Current Subsurface Operation</span>
            <div className="mt-1 font-mono text-sm font-bold text-ok flex items-center gap-1.5">
              <CheckCircle size={15} weight="bold" />
              {runningState === "jarring" ? "Jar Impact Stroke Active" : "Tool String Tracking Live"}
            </div>
          </div>

          {/* Verification Footnote */}
          <div className="sm:col-span-2 rounded-xl border border-white/5 bg-black/40 p-3 font-mono text-xs text-text-dim">
            All depth intervals and downhole tension spikes are logged directly to the job audit file for Sonatrach verification.
          </div>
        </div>
      </div>
    </div>
  );
}
