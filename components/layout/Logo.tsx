import Link from "next/link";

const MARK_STYLE = {
  background: "linear-gradient(150deg, var(--brand), var(--brand-deep) 62%, var(--brand-navy))",
  boxShadow: "0 8px 18px rgba(37,99,235,.4), inset 0 1px 0 rgba(255,255,255,.28)",
};

function DerrickIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M12 2 L7 20 M12 2 L17 20 M8.6 8 H15.4 M7.9 12 H16.1 M7.2 16 H16.8 M4 21 H20"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="2" r="1.15" fill="white" />
    </svg>
  );
}

function Mark() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
      style={MARK_STYLE}
      aria-hidden="true"
    >
      <DerrickIcon />
    </span>
  );
}

/** Theme-aware logo — for use on the landing page and auth screens, where the surrounding text color flips with the page theme. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <Mark />
      <span className="text-[18px] font-semibold tracking-tight text-text">
        SLK<span className="text-brand">Track</span>
      </span>
    </Link>
  );
}

/** Fixed-white-text logo — for the sidebar, which is always navy chrome regardless of the app's light/dark theme. */
export function SidebarLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <Mark />
      <span className="leading-tight">
        <span className="block text-[16px] font-semibold tracking-tight text-white">
          SLK<span className="text-[#7fb0ff]">Track</span>
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-wide text-white/45">
          Equipment Tracking
        </span>
      </span>
    </Link>
  );
}
