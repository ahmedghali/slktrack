"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserCheck, ShieldCheck, HardHat, Compass, Buildings } from "@phosphor-icons/react";
import { Logo } from "@/components/layout/Logo";
import { AppCard } from "@/components/ui/AppCard";
import { Button } from "@/components/ui/Button";
import { Label, Input } from "@/components/ui/Field";
import { useAppState } from "@/lib/app-state";

const QUICK_ROLES = [
  { role: "Supervisor", email: "supervisor@slktrack.com", icon: Buildings, desc: "Full fleet & job control" },
  { role: "Field Engineer", email: "engineer@slktrack.com", icon: HardHat, desc: "BHA tool string builder" },
  { role: "Technician", email: "tech@slktrack.com", icon: Compass, desc: "Mobile QR take & return" },
  { role: "Regional Chief", email: "chief@slktrack.com", icon: ShieldCheck, desc: "Regional approval queue" },
];

export default function LoginPage() {
  const { login } = useAppState();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email);
    router.push("/dashboard");
  }

  function handleQuickLogin(targetEmail: string) {
    login(targetEmail);
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-bg">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8 border-b border-border/80 bg-surface/50 backdrop-blur-md">
        <Logo />
        <Link
          href="/"
          className="rounded-xl border border-border-strong bg-surface-2 px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-border-strong/40"
        >
          &larr; Back to home
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-[480px] space-y-6">
          <AppCard className="anim-rise p-8 shadow-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[11px] font-semibold text-brand mb-3 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-brand anim-pulse" />
              Slickline Fleet Access
            </div>

            <h1 className="text-[26px] font-bold tracking-tight text-text">Sign in to SLKTrack</h1>
            <p className="mt-1.5 text-sm text-text-muted">
              Access your region&rsquo;s digitized Slickline equipment registry.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <Label>Work email</Label>
              <Input
                type="email"
                placeholder="name@operator.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mb-4"
              />
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mb-2"
              />
              <div className="mb-2 min-h-3" />
              <Button type="submit" className="w-full py-3 text-sm font-semibold">
                Sign in with credentials
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-5 text-center text-xs text-text-muted">
              No registered account yet?{" "}
              <Link href="/signup" className="font-semibold text-brand hover:underline">
                Request operator access
              </Link>
            </div>
          </AppCard>

          {/* 1-Click Demo Logins */}
          <AppCard className="p-5 border-dashed">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand mb-3">
              <UserCheck size={16} weight="bold" />
              Instant 1-Click Demo Roles
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ROLES.map((q) => {
                const Icon = q.icon;
                return (
                  <button
                    key={q.role}
                    onClick={() => handleQuickLogin(q.email)}
                    className="flex flex-col items-start rounded-xl border border-border bg-surface-2 p-3 text-left transition-all hover:border-brand/50 hover:bg-brand/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-text">
                      <Icon size={14} className="text-brand" weight="bold" />
                      {q.role}
                    </div>
                    <span className="mt-1 text-[11px] text-text-muted leading-tight">
                      {q.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
