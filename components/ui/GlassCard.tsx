import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`glass-card rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
