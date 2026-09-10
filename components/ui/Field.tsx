import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
      {children}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim outline-none transition-colors focus:border-brand/60 ${props.className ?? ""}`}
    />
  );
}

export function Select({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand/60 ${props.className ?? ""}`}
    >
      {children}
    </select>
  );
}
