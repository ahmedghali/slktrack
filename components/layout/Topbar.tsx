"use client";

import { List, SignOut, Sun, Moon, Bell } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/app-state";
import { useTheme } from "@/lib/theme";
import { pendingUsers } from "@/lib/selectors";
import { RoleSwitcher } from "./RoleSwitcher";

export function Topbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const { logout, users } = useAppState();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const notifications = pendingUsers(users).length;

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3.5 md:px-7">
      <button
        onClick={onOpenMobile}
        aria-label="Open menu"
        className="cursor-pointer rounded-lg p-2 text-text-muted hover:bg-surface-2 md:hidden"
      >
        <List size={22} />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2.5">
        <button
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          className="cursor-pointer rounded-xl border border-border-strong p-2.5 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="relative">
          <button
            aria-label={`${notifications} pending notifications`}
            className="cursor-pointer rounded-xl border border-border-strong p-2.5 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Bell size={18} />
          </button>
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 font-mono text-[9.5px] font-semibold text-white">
              {notifications}
            </span>
          )}
        </div>
        <RoleSwitcher />
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          aria-label="Log out"
          className="cursor-pointer rounded-xl border border-border-strong p-2.5 text-text-muted transition-colors hover:bg-surface-2 hover:text-danger"
        >
          <SignOut size={18} />
        </button>
      </div>
    </header>
  );
}
