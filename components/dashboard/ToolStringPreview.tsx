import Link from "next/link";
import { ArrowRight, LinkSimple } from "@phosphor-icons/react/dist/ssr";
import type { Equipment, ToolString } from "@/lib/types";

export function ToolStringPreview({
  toolString,
  jobId,
  wellLabel,
  equipment,
}: {
  toolString: ToolString;
  jobId: string;
  wellLabel: string;
  equipment: Equipment[];
}) {
  const items = [...toolString.items].sort((a, b) => a.order - b.order);

  return (
    <div className="app-card rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-semibold">
          <LinkSimple size={18} className="text-brand" />
          Tool String &mdash; {toolString.id} ({jobId} &middot; {wellLabel})
        </div>
        <Link
          href={`/tool-strings/${jobId}`}
          className="text-sm font-medium text-brand hover:text-brand-deep"
        >
          View Tool String &rarr;
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
        {items.map((item, i) => {
          const eq = equipment.find((e) => e.id === item.equipmentId);
          if (!eq) return null;
          return (
            <div key={item.id} className="flex shrink-0 items-center gap-1.5">
              <div className="flex w-[124px] flex-col items-center gap-2 rounded-xl border border-border bg-surface-2 px-2.5 py-3.5 text-center">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(150deg, var(--brand), var(--brand-deep))" }}
                >
                  {i + 1}
                </span>
                <div className="text-sm font-medium leading-tight">{eq.name}</div>
                <div className="font-mono text-xs text-text-muted">{eq.id}</div>
              </div>
              {i < items.length - 1 && (
                <ArrowRight size={16} className="shrink-0 text-text-dim" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
