"use client";

import { Check, X, UsersThree, Package, Clock } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { pendingUsers, formatDate } from "@/lib/selectors";
import { REGION } from "@/lib/mock-data";

export default function RegionalChiefPage() {
  const { equipment, users, approveSignup, rejectSignup } = useAppState();
  const pending = pendingUsers(users);
  const operational = equipment.filter((e) => e.status !== "not_returned").length;

  return (
    <div>
      <PageHeader
        title={`${REGION} Operations`}
        subtitle="Regional asset and user management overview."
      />

      <div className="grid gap-3.5 sm:grid-cols-3">
        <StatCard icon={Package} label="Total Equipment" value={equipment.length} />
        <StatCard icon={Clock} label="Operational" value={operational} tone="ok" />
        <StatCard icon={UsersThree} label="Pending Sign-ups" value={pending.length} tone="warn" />
      </div>

      <div className="app-card mt-6 rounded-2xl">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold">User Sign-Up Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Applicant</th>
                <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Requested</th>
                <th className="px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((u) => (
                <tr key={u.id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-3 font-medium">{u.name}</td>
                  <td className="px-5 py-3 text-text-muted">{u.email}</td>
                  <td className="px-5 py-3">{u.role}</td>
                  <td className="px-5 py-3 text-text-muted">
                    {u.requestedAt ? formatDate(u.requestedAt) : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveSignup(u.id)}
                        aria-label={`Approve ${u.name}`}
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-ok/30 bg-ok-bg px-2.5 py-1.5 text-sm text-ok transition-colors hover:bg-ok/20"
                      >
                        <Check size={14} weight="bold" /> Approve
                      </button>
                      <button
                        onClick={() => rejectSignup(u.id)}
                        aria-label={`Reject ${u.name}`}
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-danger/30 bg-danger-bg px-2.5 py-1.5 text-sm text-danger transition-colors hover:bg-danger/20"
                      >
                        <X size={14} weight="bold" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-text-muted">
                    No pending requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
