"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { AppCard } from "@/components/ui/AppCard";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select } from "@/components/ui/Field";
import { useAppState } from "@/lib/app-state";
import { ROLES, type Role } from "@/lib/types";

export default function SignupPage() {
  const { requestSignup } = useAppState();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<Role>("Field Engineer");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match. Re-enter and try again.");
      return;
    }
    requestSignup({ name, email, company, role });
    router.push("/pending-approval");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <Link
          href="/"
          className="rounded-xl border border-border-strong bg-surface-2 px-4 py-2 text-[13.5px] transition-colors hover:bg-border-strong/40"
        >
          Back to home
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <AppCard className="anim-rise w-full max-w-[520px] p-8">
          <h1 className="text-[27px] font-bold tracking-tight">Create account</h1>
          <p className="mt-2 text-[13.5px] text-text-muted">
            Registrations are approved by your Regional Chief.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Amine Belkacem"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <Label>Work email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@operator.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Well Services Co."
                  required
                  autoComplete="organization"
                />
              </div>
              <div>
                <Label>Role requested</Label>
                <Select value={role} onChange={(e) => setRole(e.target.value as Role)}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label>Confirm password</Label>
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-[13px] text-danger">
                {error}
              </p>
            )}

            <Button type="submit" className="mt-6 w-full py-3.5 text-[15px]">
              Create account &amp; start
            </Button>
          </form>

          <div className="mt-5 text-center text-[13px] text-text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-brand hover:text-brand-deep">
              Sign in
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
