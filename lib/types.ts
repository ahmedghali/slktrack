export type Role =
  | "Supervisor"
  | "Field Engineer"
  | "Technician"
  | "Regional Chief";

export type EquipmentStatus =
  | "available"
  | "reserved"
  | "assigned"
  | "in_job"
  | "not_returned";

export type EquipmentCategory =
  | "Pulling Tools"
  | "Running Tools"
  | "Fishing Tools"
  | "Tool String Components"
  | "Surface Equipment"
  | "Wire";

export type JobStatus = "active" | "completed";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type HistoryAction =
  | "assigned"
  | "taken"
  | "returned"
  | "reported_missing";

export interface Equipment {
  id: string; // e.g. "PT-001"
  name: string;
  category: EquipmentCategory;
  size: string;
  serialNumber: string;
  location: string;
  status: EquipmentStatus;
  currentJobId?: string;
}

export interface Job {
  id: string; // e.g. "JOB-001"
  well: string; // e.g. "HMD-221"
  operation: string;
  task: string;
  team: string;
  date: string; // ISO date
  status: JobStatus;
}

export interface JobEquipmentLink {
  jobId: string;
  equipmentId: string;
  assignedAt: string;
  returnedAt?: string;
  takenBy?: string;
}

export interface ToolStringItem {
  id: string;
  equipmentId: string;
  order: number;
}

export interface ToolString {
  id: string; // e.g. "TS-025"
  jobId: string;
  items: ToolStringItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: Role;
  region: string;
  approvalStatus: ApprovalStatus;
  requestedAt?: string;
}

export interface HistoryEvent {
  id: string;
  equipmentId: string;
  jobId?: string;
  action: HistoryAction;
  userName: string;
  timestamp: string; // ISO datetime
}

export const EQUIPMENT_STATUS_LABEL: Record<EquipmentStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  assigned: "Assigned",
  in_job: "In Job",
  not_returned: "Not Returned",
};

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  "Pulling Tools",
  "Running Tools",
  "Fishing Tools",
  "Tool String Components",
  "Surface Equipment",
  "Wire",
];

export const ROLES: Role[] = [
  "Supervisor",
  "Field Engineer",
  "Technician",
  "Regional Chief",
];
