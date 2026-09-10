"use client";

import { useRef } from "react";
import type { MouseEventHandler } from "react";

interface TiltBind {
  ref: React.RefObject<HTMLDivElement | null>;
  onMouseMove: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}

/** Mouse-position-driven 3D tilt. Respects prefers-reduced-motion. Spread the returned `bind` object directly onto the element. */
export function useTilt(maxDeg = 8): TiltBind {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * maxDeg * 2}deg) rotateX(${-y * maxDeg * 2}deg)`;
  };

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
