"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { X } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { navGroupsForRole } from "@/lib/nav";
import { SidebarLogo } from "./Logo";

function SidebarInner({
  onCloseMobile,
}: {
  onCloseMobile: () => void;
}) {
  const { currentRole } = useAppState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groups = navGroupsForRole(currentRole);

  function isActive(href: string) {
    const [hrefPath, hrefQuery] = href.split("?");
    if (pathname !== hrefPath) return false;
    if (!hrefQuery) return !searchParams.toString();
    const target = new URLSearchParams(hrefQuery);
    for (const [key, value] of target) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <SidebarLogo href="/dashboard" />
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="cursor-pointer rounded-lg p-1.5 text-white/70 hover:bg-white/10 md:hidden"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
        {groups.map((group, gi) => (
          <div key={group.label ?? `g${gi}`}>
            {group.label && (
              <div className="px-3 pb-1.5 pt-1 font-mono text-[11px] font-semibold uppercase tracking-[.12em] text-white/40">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                      active
                        ? "bg-[var(--sidebar-active-bg)] text-white border border-white/10"
                        : "text-[var(--sidebar-text)] hover:bg-white/8 hover:text-white border border-transparent"
                    }`}
                  >
                    <Icon size={18} weight={active ? "fill" : "regular"} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-5 py-4 font-mono text-xs text-white/40">
        SLKTrack &middot; Demo build
      </div>
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const content = (
    <Suspense>
      <SidebarInner onCloseMobile={onCloseMobile} />
    </Suspense>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="sidebar-chrome hidden md:flex md:w-64 md:flex-col md:border-r">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={onCloseMobile} />
          <aside className="sidebar-chrome absolute inset-y-0 left-0 w-72 anim-fade">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
