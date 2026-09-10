"use client";

import { useState } from "react";
import { CurrencyDollar, Clock, ShieldCheck, Sparkle } from "@phosphor-icons/react";

export function RoiCalculator() {
  const [crewCount, setCrewCount] = useState(6);
  const [jobsPerMonth, setJobsPerMonth] = useState(35);

  // Realistic slickline oilfield calculations
  // Average lost downhole tool or fishing incident costs ~$18,000 in rig time + hardware
  // SLKTrack eliminates ~2-4 lost tool incidents/year per 5 crews
  const annualJobs = jobsPerMonth * 12;
  const estimatedSavings = Math.round(crewCount * (annualJobs / 40) * 8500);
  const nptHoursSaved = Math.round(crewCount * jobsPerMonth * 3.5);
  const searchHoursEliminated = Math.round(crewCount * jobsPerMonth * 6.0);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d162a]/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-brand">
            Operational Value &amp; ROI Estimator
          </span>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Quantify Your Slickline Cost Savings
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            See how digital asset serialization and automated chain of custody cut field losses.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-3.5 py-1.5 font-mono text-xs text-brand">
          <Sparkle size={14} weight="bold" />
          Field Tested Algorithm
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        {/* Sliders Input */}
        <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-6">
          <div>
            <div className="flex items-center justify-between text-sm font-medium text-white">
              <span>Active Slickline Crews / Units:</span>
              <span className="rounded-md bg-brand/20 px-2.5 py-1 font-mono text-sm font-bold text-brand border border-brand/30">
                {crewCount} Units
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={crewCount}
              onChange={(e) => setCrewCount(Number(e.target.value))}
              className="mt-3 w-full accent-brand cursor-pointer"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-text-dim">
              <span>1 Unit (Single base)</span>
              <span>20 Units (National Fleet)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-medium text-white">
              <span>Monthly Well Interventions:</span>
              <span className="rounded-md bg-brand/20 px-2.5 py-1 font-mono text-sm font-bold text-brand border border-brand/30">
                {jobsPerMonth} Runs / mo
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={jobsPerMonth}
              onChange={(e) => setJobsPerMonth(Number(e.target.value))}
              className="mt-3 w-full accent-brand cursor-pointer"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-text-dim">
              <span>5 Jobs</span>
              <span>120 Jobs (High Density Hub)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-brand/40 bg-gradient-to-b from-brand/15 to-transparent p-5 shadow-lg">
            <div>
              <CurrencyDollar size={24} weight="bold" className="text-brand" />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-dim">
                Tool Loss &amp; Fishing Avoidance
              </div>
            </div>
            <div className="mt-4">
              <div className="font-mono text-2xl font-bold text-white lg:text-3xl">
                ${estimatedSavings.toLocaleString()}
              </div>
              <span className="text-[11px] text-text-muted">Estimated Annual Savings</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-ok/40 bg-gradient-to-b from-ok/15 to-transparent p-5 shadow-lg">
            <div>
              <Clock size={24} weight="bold" className="text-ok" />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-dim">
                Rig NPT Time Eliminated
              </div>
            </div>
            <div className="mt-4">
              <div className="font-mono text-2xl font-bold text-ok lg:text-3xl">
                {nptHoursSaved.toLocaleString()} hrs
              </div>
              <span className="text-[11px] text-text-muted">Zero Waiting on Missing Tools</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-sky-400/40 bg-gradient-to-b from-sky-400/15 to-transparent p-5 shadow-lg">
            <div>
              <ShieldCheck size={24} weight="bold" className="text-sky-400" />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-dim">
                Audit Prep &amp; Search Time
              </div>
            </div>
            <div className="mt-4">
              <div className="font-mono text-2xl font-bold text-white lg:text-3xl">
                {searchHoursEliminated.toLocaleString()} hrs
              </div>
              <span className="text-[11px] text-text-muted">Direct Digital Lookups</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
