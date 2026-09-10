"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Equipment } from "@/lib/types";
import { EQUIPMENT_STATUS_LABEL } from "@/lib/types";

const COLOR: Record<Equipment["status"], string> = {
  available: "#16a34a",
  reserved: "#d97706",
  assigned: "#0891b2",
  in_job: "#ea580c",
  not_returned: "#dc2626",
};

export function EquipmentStatusDonut({ equipment }: { equipment: Equipment[] }) {
  const counts = (Object.keys(EQUIPMENT_STATUS_LABEL) as Equipment["status"][]).map((status) => ({
    status,
    name: EQUIPMENT_STATUS_LABEL[status],
    value: equipment.filter((e) => e.status === status).length,
  }));
  const total = equipment.length;

  return (
    <div className="relative h-[220px] w-full min-w-[220px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={220} minHeight={220} debounce={1}>
        <PieChart>
          <Pie
            data={counts}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
          >
            {counts.map((c) => (
              <Cell key={c.status} fill={COLOR[c.status]} stroke="var(--surface)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 14,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular-nums text-3xl font-bold">{total}</span>
        <span className="font-mono text-xs uppercase tracking-wider text-text-muted">Total</span>
      </div>
    </div>
  );
}
