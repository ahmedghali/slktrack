"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { ROLES } from "@/lib/types";

export function RoleSwitcher() {
  const { currentRole, currentUser, switchRole } = useAppState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border-strong bg-surface-2 px-3 py-2 text-left transition-colors hover:bg-border-strong/40"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold"
          style={{ background: "linear-gradient(150deg, var(--brand), var(--brand-deep))" }}
        >
          {currentUser?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "?"}
        </span>
        <span className="hidden sm:block">
          <span className="block text-sm font-medium leading-tight">
            {currentUser?.name ?? "Demo User"}
          </span>
          <span className="block font-mono text-[11px] uppercase tracking-wide text-text-muted leading-tight">
            {currentRole}
          </span>
        </span>
        <CaretDown size={14} className="text-text-muted" />
      </button>

      {open && (
        <div
          role="listbox"
          className="glass-card-solid absolute right-0 top-[calc(100%+8px)] z-40 w-56 rounded-xl p-1.5 anim-fade"
        >
          <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
            Switch role (demo)
          </div>
          {ROLES.map((role) => (
            <button
              key={role}
              role="option"
              aria-selected={role === currentRole}
              onClick={() => {
                switchRole(role);
                setOpen(false);
              }}
              className={`w-full cursor-pointer rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                role === currentRole
                  ? "bg-brand/25 text-white"
                  : "text-white/75 hover:bg-white/8"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
