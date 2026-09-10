"use client";

import Link from "next/link";
import {
  Wrench,
  Briefcase,
  QrCode,
  ChartLine,
  ShieldCheck,
  ClockCounterClockwise,
  ArrowRight,
  Sparkle,
  CheckCircle,
  Cube,
  Gauge,
  ArrowsLeftRight,
  HardHat,
  Buildings,
  Compass,
  ShieldChevron,
  Lightning,
  Barcode,
  TreeStructure,
} from "@phosphor-icons/react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { ToolString3DCanvas } from "@/components/landing/ToolString3DCanvas";
import { WellIntervention3DVisualizer } from "@/components/landing/WellIntervention3DVisualizer";
import { useAppState } from "@/lib/app-state";

const THREE_PILLARS = [
  {
    icon: QrCode,
    title: "1-Second Mobile QR Scan",
    desc: "Scan physical tags at truck loading, rig-up, and base return. Live status updates instantly with automated user timestamps and audit records.",
    badge: "Sub-Second Check-In",
    color: "cyan",
  },
  {
    icon: Cube,
    title: "3D Tool String CAD Builder",
    desc: "Configure 5-piece downhole BHA assemblies (Rope Socket → Stem → Mechanical Jar → Knuckle → Pulling Tool) with verified pin/box threads.",
    badge: "CAD Schematic Stack",
    color: "amber",
  },
  {
    icon: ShieldCheck,
    title: "Zero Lost Tools & Anti-Conflict",
    desc: "Smart availability locks prevent scheduling double-booking and instantly flag any unreturned equipment with live technician accountability.",
    badge: "100% Custody Reconciled",
    color: "emerald",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Base Registry",
    desc: "Serialized tools & calibrated thread specs",
    tone: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  },
  {
    step: "02",
    title: "Job Allocation",
    desc: "Conflict-free well & crew assignment",
    tone: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  },
  {
    step: "03",
    title: "Truck QR Dispatch",
    desc: "1-second scan transfers custody to team",
    tone: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  },
  {
    step: "04",
    title: "Downhole Well Run",
    desc: "Live status updates to 'In Job' on rig",
    tone: "border-sky-500/40 text-sky-300 bg-sky-500/10",
  },
  {
    step: "05",
    title: "Workshop Return",
    desc: "Automated reconciliation & audit closeout",
    tone: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  },
];

const ROLES = [
  {
    role: "Base Supervisor",
    desc: "Complete fleet oversight, job dispatch, and maintenance tracking.",
    icon: Buildings,
    tag: "Dispatch Hub",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    role: "Field Engineer",
    desc: "Builds 3D tool strings, verifies shear pin specs, and generates field tickets.",
    icon: HardHat,
    tag: "BHA Staging",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    role: "Slickline Operator",
    desc: "Mobile QR scanner for fast tool checkout, wellsite run, and tool return.",
    icon: Compass,
    tag: "Wellhead Run",
    badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    role: "Regional Chief",
    desc: "Multi-base oversight across Hassi Messaoud, In Amenas, and Rhourde Nouss.",
    icon: ShieldChevron,
    tag: "Executive HQ",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
];

export default function LandingPage() {
  const { equipment, jobs } = useAppState();
  const totalTools = equipment.length;
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const notReturned = equipment.filter((e) => e.status === "not_returned").length;

  return (
    <div className="landing-dark flex min-h-screen flex-col bg-[#070b16] text-slate-100 selection:bg-brand selection:text-white">
      {/* Luminous ambient background lights */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#070b16]/90 px-5 py-3.5 backdrop-blur-xl sm:px-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-slate-300">
          <a href="#hero-3d" className="transition-colors hover:text-cyan-400 flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-cyan-400 anim-pulse" />
            3D Tool String
          </a>
          <a href="#simulator" className="transition-colors hover:text-white">
            Well Simulator
          </a>
          <a href="#pillars" className="transition-colors hover:text-white">
            Core Capabilities
          </a>
          <a href="#workflow" className="transition-colors hover:text-white">
            Custody Workflow
          </a>
          <a href="#roles" className="transition-colors hover:text-white">
            Roles
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-[13.5px] font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white"
          >
            Sign in
          </Link>
          <Link href="/signup">
            <Button className="px-5 py-2 text-[13.5px] font-bold shadow-lg shadow-brand/30">
              Live Demo
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section: 3D Canvas DIRECTLY ON FIRST VIEW */}
      <section id="hero-3d" className="relative z-10 mx-auto max-w-[1500px] px-5 pt-8 pb-14 sm:px-8 lg:pt-10 lg:pb-16 w-full">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          {/* Left Column: Headline, subhead, CTA, KPIs */}
          <div className="anim-rise space-y-6">
            {/* Multi-tone Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 font-mono text-[11.5px] uppercase tracking-wider text-cyan-300 shadow-sm shadow-cyan-500/20">
              <span className="anim-pulse h-2 w-2 rounded-full bg-cyan-400" />
              <span>Slickline Asset Tracking &middot; Hassi Messaoud Hub</span>
            </div>

            {/* Clear, Multi-tone Gradient Title */}
            <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-bold leading-[1.06] tracking-tight text-white">
              Zero Lost Tools Downhole.{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                Total Traceability.
              </span>
            </h1>

            {/* High Contrast Subhead */}
            <p className="text-[16px] sm:text-[17px] leading-relaxed text-slate-300 max-w-xl font-normal">
              Track preparation, truck transit, wellsite run, and base return of Slickline equipment in real time.
              Eliminate lost downhole tools and prevent dispatch scheduling conflicts.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/dashboard">
                <Button className="px-7 py-3.5 text-[15px] font-bold shadow-xl shadow-brand/40">
                  Launch Dashboard Demo <ArrowRight size={17} weight="bold" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="px-6 py-3.5 text-[15px] border-white/20 text-slate-100 hover:bg-white/10">
                  Sign In to Fleet
                </Button>
              </Link>
            </div>

            {/* Live Metrics Row with Color Accents */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-lg border-t border-white/10 pt-5">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                <div className="tabular-nums font-mono text-2xl sm:text-3xl font-bold text-white">
                  {totalTools}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Tools Serialized</div>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-3 text-center">
                <div className="tabular-nums font-mono text-2xl sm:text-3xl font-bold text-cyan-400">
                  {activeJobs}
                </div>
                <div className="text-xs text-cyan-300 mt-1 font-medium">Active Well Runs</div>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
                <div className="tabular-nums font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                  100%
                </div>
                <div className="text-xs text-emerald-300 mt-1 font-medium">Chain Verified</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Model DIRECTLY on the Hero */}
          <div className="anim-rise">
            <ToolString3DCanvas />
          </div>
        </div>
      </section>

      {/* 3 Core Visual Pillars with Petroleum Gold & Cyan Colors */}
      <section id="pillars" className="relative z-10 border-t border-white/10 px-5 py-16 sm:px-8 lg:py-20 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              Core Capabilities
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Everything You Need for Wellsite Intervention
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Purpose-built modules to eliminate lost downhole tools and optimize field operations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {THREE_PILLARS.map((p) => {
              const Icon = p.icon;
              const isCyan = p.color === "cyan";
              const isAmber = p.color === "amber";
              const isEmerald = p.color === "emerald";

              return (
                <div
                  key={p.title}
                  className={`relative overflow-hidden rounded-3xl border p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                    isCyan
                      ? "border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-black/60 shadow-cyan-950/30"
                      : isAmber
                      ? "border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/60 shadow-amber-950/30"
                      : "border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-black/60 shadow-emerald-950/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg ${
                        isCyan
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-cyan-500/20"
                          : isAmber
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-amber-500/20"
                          : "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20"
                      }`}
                    >
                      <Icon size={24} weight="bold" />
                    </div>
                    <span
                      className={`font-mono text-[11px] font-bold rounded-full px-3 py-1 border ${
                        isCyan
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                          : isAmber
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downhole Intervention & Telemetry Simulator */}
      <section id="simulator" className="relative z-10 border-t border-white/10 px-5 py-16 sm:px-8 lg:py-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
            Interactive Telemetry Simulator
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Downhole Run &amp; Tension Simulation
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Test the live wireline winch depth runner, tension meter, and kinetic jarring impact on Well HMD-221.
          </p>
        </div>
        <WellIntervention3DVisualizer />
      </section>

      {/* 5-Step Digital Custody Journey with Distinct Colored Steps */}
      <section id="workflow" className="relative z-10 border-t border-white/10 px-5 py-16 sm:px-8 lg:py-20 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              End-to-End Traceability
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              5-Step Digital Chain of Custody
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Clear handover stages from central warehouse base to wellhead return.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((w) => (
              <div
                key={w.step}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition-transform hover:-translate-y-1"
              >
                <span className={`inline-flex items-center justify-center h-8 w-8 rounded-xl font-mono text-xs font-bold border ${w.tone}`}>
                  {w.step}
                </span>
                <h4 className="mt-3 text-base font-bold text-white">{w.title}</h4>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Role Workspaces */}
      <section id="roles" className="relative z-10 border-t border-white/10 px-5 py-16 sm:px-8 lg:py-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            Role-Based Access
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Built for Every Crew Member
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Dedicated multi-tier workspaces designed for each operational responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.role}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cyan-400 border border-white/10">
                    <Icon size={22} weight="bold" />
                  </div>
                  <span className={`font-mono text-[10px] font-bold rounded-full px-2.5 py-0.5 border ${r.badgeColor}`}>
                    {r.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{r.role}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Impact CTA Banner */}
      <section className="relative z-10 border-t border-white/10 px-5 py-16 text-center sm:px-8 lg:py-20 bg-gradient-to-b from-blue-950/30 to-black/80">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 font-mono text-xs font-bold text-amber-300 uppercase tracking-wider mb-4">
            <Sparkle size={14} weight="bold" /> Ready for Field Testing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Start Digitizing Your Slickline Fleet
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Test the live interactive dashboard, build 3D tool strings, and simulate mobile QR field handovers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button className="px-8 py-3.5 text-[15px] font-bold shadow-xl shadow-brand/40">
                Launch Live Dashboard <ArrowRight size={17} weight="bold" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="px-7 py-3.5 text-[15px] border-white/20 text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Enterprise Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040814] text-slate-300 pt-16 pb-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Footer Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Hub Info */}
            <div className="lg:col-span-2 space-y-4">
              <Logo />
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Digital chain-of-custody and real-time tracking platform for Slickline well-intervention equipment across Algerian and international oil &amp; gas basins.
              </p>
              <div className="flex flex-col gap-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 anim-pulse" />
                  <span>Hassi Messaoud Hub Telemetry: Operational</span>
                </div>
                <div className="text-slate-400">
                  Standards: API Spec 7-1 &middot; NORSOK D-010 &middot; ATEX Zone 1
                </div>
              </div>
            </div>

            {/* Column 2: Platform Modules */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Platform Modules
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li><Link href="/equipment" className="hover:text-cyan-400 transition-colors">Fleet Registry</Link></li>
                <li><Link href="/tool-strings" className="hover:text-cyan-400 transition-colors">3D BHA CAD Builder</Link></li>
                <li><Link href="/scan" className="hover:text-cyan-400 transition-colors">Mobile QR Scanner</Link></li>
                <li><Link href="/jobs" className="hover:text-cyan-400 transition-colors">Well Dispatcher</Link></li>
                <li><Link href="/missing" className="hover:text-cyan-400 transition-colors">Audit Watchdog</Link></li>
                <li><Link href="/analytics" className="hover:text-cyan-400 transition-colors">Fleet Analytics</Link></li>
              </ul>
            </div>

            {/* Column 3: Slickline Fleet Categories */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
                Tool Categories
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li><Link href="/equipment?category=Pulling Tools" className="hover:text-amber-400 transition-colors">Pulling Tools (GS / SB)</Link></li>
                <li><Link href="/equipment?category=Tool String" className="hover:text-amber-400 transition-colors">Spang Mechanical Jars</Link></li>
                <li><Link href="/equipment?category=Tool String" className="hover:text-amber-400 transition-colors">Stem Weight Bars</Link></li>
                <li><Link href="/equipment?category=Tool String" className="hover:text-amber-400 transition-colors">Rope Sockets &amp; Heads</Link></li>
                <li><Link href="/equipment?category=Running Tools" className="hover:text-amber-400 transition-colors">Running Tools &amp; Plugs</Link></li>
                <li><Link href="/equipment?category=Fishing Tools" className="hover:text-amber-400 transition-colors">Impression Blocks</Link></li>
              </ul>
            </div>

            {/* Column 4: Regional Field Hubs */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                Field Base Nodes
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> Base 01: Hassi Messaoud</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> Base 02: In Amenas Basin</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> Base 03: Rhourde Nouss</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> Base 04: Hassi R&rsquo;Mel Hub</li>
                <li className="pt-2 text-slate-400 font-sans text-[11px]">Sonatrach Basin Compatible</li>
              </ul>
            </div>
          </div>

          {/* Bottom Sub-Footer Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} <strong className="text-slate-200">SLKTrack</strong>. Master Degree Project &middot; <span className="text-slate-300 font-semibold">Abdelmadjid Merzoug</span>.
            </div>
            <div className="flex items-center gap-6 text-slate-300">
              <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Demo Dashboard</Link>
              <Link href="/login" className="hover:text-cyan-400 transition-colors">Sign In</Link>
              <Link href="/signup" className="hover:text-cyan-400 transition-colors">Register</Link>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-semibold">99.98% Fleet Telemetry Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
