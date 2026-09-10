"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function TopEquipmentBar({ data }: { data: { name: string; uses: number }[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 13 }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: "var(--text-muted)", fontSize: 13 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,.04)" }}
            contentStyle={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 14,
            }}
          />
          <Bar dataKey="uses" fill="var(--brand)" radius={[0, 6, 6, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
