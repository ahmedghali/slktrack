"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function UtilizationArea({ data }: { data: { label: string; jobs: number }[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -16, right: 16 }}>
          <defs>
            <linearGradient id="utilFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "var(--text-muted)", fontSize: 13 }} />
          <YAxis tick={{ fill: "var(--text-muted)", fontSize: 13 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 14,
            }}
          />
          <Area
            type="monotone"
            dataKey="jobs"
            stroke="var(--brand)"
            strokeWidth={2}
            fill="url(#utilFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
