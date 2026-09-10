"use client";

import Link from "next/link";
import { CheckCircle, Hourglass, Lock } from "@phosphor-icons/react";
import { Logo } from "@/components/layout/Logo";

const STEPS = [
  {
    title: "Registration Submitted",
    body: "Your sign-up form has been received by the SLKTrack platform.",
    status: "Completed",
    icon: CheckCircle,
    tone: "ok" as const,
  },
  {
    title: "Regional Chief Review",
    body: "The Regional Chief is reviewing your credentials and assigned role.",
    status: "In Progress",
    icon: Hourglass,
    tone: "warn" as const,
  },
  {
    title: "Access Granted",
    body: "You'll receive full access to view regional equipment and assets once approved.",
    status: "Pending",
    icon: Lock,
    tone: "dim" as const,
  },
];

const TONE_CLASS = {
  ok: "text-ok border-ok/40 bg-ok-bg",
  warn: "text-warn border-warn/40 bg-warn-bg",
  dim: "text-text-dim border-border bg-surface-2",
};

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <Link
          href="/"
          className="rounded-xl border border-border-strong bg-surface-2 px-4 py-2 text-[15px] transition-colors hover:bg-border-strong/40"
        >
          Back to home
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <div
          className="anim-pulse flex h-20 w-20 items-center justify-center rounded-full border border-brand/40"
          style={{ background: "rgba(37,99,235,.1)" }}
        >
          <Hourglass size={30} className="text-brand" />
        </div>

        <h1 className="mt-7 text-[27px] font-bold tracking-tight sm:text-[32px]">
          Your Request Is Under Review
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
          Your account registration has been received and forwarded to the
          Regional Chief. You&rsquo;ll gain access once your identity is
          verified and approved.
        </p>

        <ol className="mt-10 w-full space-y-5 text-left">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="app-card flex gap-4 rounded-2xl p-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${TONE_CLASS[step.tone]}`}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <div className="text-base font-semibold">{step.title}</div>
                  <p className="mt-0.5 text-[15px] text-text-muted">{step.body}</p>
                  <span
                    className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-wide ${TONE_CLASS[step.tone]}`}
                  >
                    {step.status}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
