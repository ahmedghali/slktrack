"use client";

import Link from "next/link";
import { Tag } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { EQUIPMENT_CATEGORIES } from "@/lib/types";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function CategoriesPage() {
  const { equipment } = useAppState();

  return (
    <div>
      <PageHeader title="Categories" subtitle="Equipment grouped by category." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EQUIPMENT_CATEGORIES.map((category) => {
          const items = equipment.filter((e) => e.category === category);
          return (
            <Link
              key={category}
              href={`/equipment?category=${encodeURIComponent(category)}`}
              className="app-card flex items-center justify-between rounded-2xl p-5 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-bg text-brand">
                  <Tag size={18} weight="bold" />
                </span>
                <div>
                  <div className="font-medium">{category}</div>
                  <div className="text-sm text-text-muted">
                    {items.length} item{items.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
