"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";

export function TiltCard({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  const tilt = useTilt(7);

  return (
    <div
      {...tilt}
      className={`glass-card rounded-2xl transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}
      style={{ willChange: "transform" }}
      {...rest}
    >
      {children}
    </div>
  );
}
