"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select } from "@/components/ui/Field";
import { equipmentForJob, formatDate } from "@/lib/selectors";

type Tab = "active" | "completed" | "create";

function JobsPageInner() {
  const { jobs, equipment, jobEquipment, createJob } = useAppState();
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>(
    params.get("create") === "1" ? "create" : params.get("tab") === "completed" ? "completed" : "active"
  );

  const shown = jobs.filter((j) => (tab === "completed" ? j.status === "completed" : j.status === "active"));

  return (
    <div>
      <PageHeader title="Jobs" subtitle="Manage Slickline operations and equipment assignment." />

      <div className="mb-5 flex gap-2 border-b border-border">
        {(["active", "completed", "create"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`cursor-pointer border-b-2 px-4 py-2.5 text-[15px] font-medium capitalize transition-colors ${
              tab === t ? "border-brand text-brand" : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            {t === "create" ? "Create Job" : `${t} Jobs`}
          </button>
        ))}
      </div>

      {tab === "create" ? (
        <CreateJobForm
          onCreate={(data) => {
            createJob(data);
            setTab("active");
          }}
        />
      ) : (
        <div className="app-card overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <Th>Job ID</Th>
                <Th>Well</Th>
                <Th>Task</Th>
                <Th>Team</Th>
                <Th>Date</Th>
                <Th>Tools</Th>
              </tr>
            </thead>
            <tbody>
              {shown.map((job) => (
                <tr key={job.id} className="border-b border-border/60 last:border-0 hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <Link href={`/jobs/${job.id}`} className="font-medium text-brand hover:text-brand-deep">
                      {job.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono">{job.well}</td>
                  <td className="px-4 py-3">{job.task}</td>
                  <td className="px-4 py-3">{job.team}</td>
                  <td className="px-4 py-3 text-text-muted">{formatDate(job.date)}</td>
                  <td className="px-4 py-3">{equipmentForJob(jobEquipment, equipment, job.id).length}</td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                    No {tab} jobs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">{children}</th>
  );
}

function CreateJobForm({
  onCreate,
}: {
  onCreate: (data: { id: string; well: string; operation: string; task: string; team: string; date: string }) => void;
}) {
  const [id, setId] = useState("");
  const [well, setWell] = useState("");
  const [task, setTask] = useState("");
  const [team, setTeam] = useState("Team A");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !well || !task) return;
    onCreate({ id, well, operation: "Slickline", task, team, date });
  }

  return (
    <form onSubmit={handleSubmit} className="app-card max-w-xl space-y-4 rounded-2xl p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Job ID</Label>
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="JOB-007" required />
        </div>
        <div>
          <Label>Well</Label>
          <Input value={well} onChange={(e) => setWell(e.target.value)} placeholder="HMD-450" required />
        </div>
      </div>
      <div>
        <Label>Task</Label>
        <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Gas Lift Valve Retrieval" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Team</Label>
          <Select value={team} onChange={(e) => setTeam(e.target.value)}>
            <option>Team A</option>
            <option>Team B</option>
            <option>Team C</option>
          </Select>
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" className="gap-2">
          <Plus size={16} weight="bold" /> Create Job
        </Button>
      </div>
    </form>
  );
}

export default function JobsPage() {
  return (
    <Suspense>
      <JobsPageInner />
    </Suspense>
  );
}
