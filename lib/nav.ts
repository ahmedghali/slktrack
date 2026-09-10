import type { Role } from "./types";
import {
  SquaresFour,
  ListBullets,
  PlusCircle,
  Tag,
  MapPin,
  ClipboardText,
  CheckSquare,
  Plus,
  Link as LinkIcon,
  QrCode,
  ClockCounterClockwise,
  FileText,
  ChartLine,
  WarningCircle,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  roles: Role[];
}

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    label: null,
    items: [
      { href: "/dashboard", label: "Dashboard", icon: SquaresFour, roles: ["Supervisor", "Field Engineer", "Regional Chief"] },
    ],
  },
  {
    label: "Equipment",
    items: [
      { href: "/equipment", label: "All Equipment", icon: ListBullets, roles: ["Supervisor", "Field Engineer", "Technician"] },
      { href: "/equipment?add=1", label: "Add Equipment", icon: PlusCircle, roles: ["Supervisor"] },
      { href: "/categories", label: "Categories", icon: Tag, roles: ["Supervisor", "Field Engineer"] },
      { href: "/locations", label: "Locations", icon: MapPin, roles: ["Supervisor", "Field Engineer"] },
    ],
  },
  {
    label: "Jobs",
    items: [
      { href: "/jobs", label: "Active Jobs", icon: ClipboardText, roles: ["Supervisor", "Field Engineer", "Technician"] },
      { href: "/jobs?tab=completed", label: "Completed Jobs", icon: CheckSquare, roles: ["Supervisor", "Field Engineer", "Technician"] },
      { href: "/jobs?create=1", label: "Create Job", icon: Plus, roles: ["Supervisor"] },
    ],
  },
  {
    label: "Tool String",
    items: [
      { href: "/tool-strings", label: "Tool String Builder", icon: LinkIcon, roles: ["Supervisor", "Field Engineer"] },
    ],
  },
  {
    label: "QR Scanner",
    items: [
      { href: "/scan", label: "Scan Equipment", icon: QrCode, roles: ["Supervisor", "Field Engineer", "Technician"] },
    ],
  },
  {
    label: "History",
    items: [
      { href: "/equipment", label: "Equipment History", icon: ClockCounterClockwise, roles: ["Supervisor", "Field Engineer"] },
      { href: "/missing", label: "Missing Equipment", icon: WarningCircle, roles: ["Supervisor", "Field Engineer", "Technician"] },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: "/reports", label: "Reports & Export", icon: FileText, roles: ["Supervisor"] },
      { href: "/analytics", label: "Analytics", icon: ChartLine, roles: ["Supervisor"] },
    ],
  },
  {
    label: null,
    items: [
      { href: "/regional-chief", label: "Regional Chief", icon: ShieldCheck, roles: ["Regional Chief"] },
    ],
  },
];

export function navGroupsForRole(role: Role): NavGroup[] {
  return GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}
