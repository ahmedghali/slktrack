import type { HTMLAttributes, ReactNode } from "react";

/** Opaque card with soft shadow — used throughout the app shell (not the landing hero, which keeps glassmorphism). */
export function AppCard({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`app-card rounded-2xl ${className}`} {...rest}>
      {children}
    </div>
  );
}
