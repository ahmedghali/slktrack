import type {
  Equipment,
  HistoryEvent,
  Job,
  JobEquipmentLink,
  ToolString,
  User,
} from "./types";

export const REGION = "Hassi Messaoud Region";

export const initialEquipment: Equipment[] = [
  { id: "PT-001", name: "Pulling Tool", category: "Pulling Tools", size: "1.5\"", serialNumber: "SN-45821", location: "Hassi Messaoud Base", status: "not_returned", currentJobId: "JOB-001" },
  { id: "PT-002", name: "Pulling Tool", category: "Pulling Tools", size: "2.0\"", serialNumber: "SN-45822", location: "Warehouse", status: "available" },
  { id: "SPT-003", name: "Selective Pulling Tool", category: "Pulling Tools", size: "1.75\"", serialNumber: "SN-45901", location: "Warehouse", status: "available" },
  { id: "IB-004", name: "Impression Block", category: "Pulling Tools", size: "2.25\"", serialNumber: "SN-46010", location: "Workshop", status: "reserved" },
  { id: "RT-005", name: "Running Tool", category: "Running Tools", size: "1.5\"", serialNumber: "SN-46110", location: "Warehouse", status: "available" },
  { id: "LMRT-006", name: "Lock Mandrel Running Tool", category: "Running Tools", size: "1.875\"", serialNumber: "SN-46215", location: "Truck 01", status: "assigned", currentJobId: "JOB-002" },
  { id: "FT-007", name: "Fishing Tool", category: "Fishing Tools", size: "2.5\"", serialNumber: "SN-46310", location: "Workshop", status: "available" },
  { id: "OS-008", name: "Overshot", category: "Fishing Tools", size: "2.125\"", serialNumber: "SN-46418", location: "Warehouse", status: "available" },
  { id: "ST-003", name: "Stem", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-40012", location: "Hassi Messaoud Base", status: "in_job", currentJobId: "JOB-001" },
  { id: "ST-009", name: "Stem", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-40013", location: "Warehouse", status: "available" },
  { id: "JR-014", name: "Jar", category: "Tool String Components", size: "1.75\"", serialNumber: "SN-41120", location: "Hassi Messaoud Base", status: "in_job", currentJobId: "JOB-001" },
  { id: "JR-015", name: "Jar", category: "Tool String Components", size: "1.75\"", serialNumber: "SN-41121", location: "Truck 02", status: "assigned", currentJobId: "JOB-002" },
  { id: "KJ-016", name: "Knuckle Joint", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-41890", location: "Hassi Messaoud Base", status: "in_job", currentJobId: "JOB-001" },
  { id: "RS-011", name: "Rope Socket", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-42410", location: "Hassi Messaoud Base", status: "in_job", currentJobId: "JOB-001" },
  { id: "RS-012", name: "Rope Socket", category: "Tool String Components", size: "1.75\"", serialNumber: "SN-42411", location: "Warehouse", status: "available" },
  { id: "LB-017", name: "Lubricator", category: "Surface Equipment", size: "15 ft", serialNumber: "SN-50110", location: "Truck 01", status: "assigned", currentJobId: "JOB-002" },
  { id: "SB-018", name: "Stuffing Box", category: "Surface Equipment", size: "2\"", serialNumber: "SN-50218", location: "Warehouse", status: "available" },
  { id: "WBOP-019", name: "Wireline BOP", category: "Surface Equipment", size: "3\"", serialNumber: "SN-50320", location: "Workshop", status: "reserved" },
  { id: "WBOP-020", name: "Wireline BOP", category: "Surface Equipment", size: "3\"", serialNumber: "SN-50321", location: "Warehouse", status: "available" },
  { id: "SLW-021", name: "Slickline Wire", category: "Wire", size: "0.108\"", serialNumber: "SN-60110", location: "Hassi Messaoud Base", status: "in_job", currentJobId: "JOB-001" },
  { id: "SLW-022", name: "Slickline Wire", category: "Wire", size: "0.125\"", serialNumber: "SN-60111", location: "Warehouse", status: "available" },
  { id: "PT-023", name: "Pulling Tool", category: "Pulling Tools", size: "1.5\"", serialNumber: "SN-45823", location: "Hassi Messaoud Base", status: "available" },
  { id: "ST-024", name: "Stem", category: "Tool String Components", size: "1.75\"", serialNumber: "SN-40014", location: "Warehouse", status: "available" },
  { id: "JR-025", name: "Jar", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-41122", location: "Workshop", status: "available" },
  { id: "RS-026", name: "Rope Socket", category: "Tool String Components", size: "1.5\"", serialNumber: "SN-42412", location: "Hassi Messaoud Base", status: "available" },
];

export const initialJobs: Job[] = [
  { id: "JOB-001", well: "HMD-221", operation: "Slickline", task: "Gas Lift Valve Retrieval", team: "Team A", date: "2026-08-10", status: "active" },
  { id: "JOB-002", well: "HMD-305", operation: "Slickline", task: "Plug Setting", team: "Team B", date: "2026-08-12", status: "active" },
  { id: "JOB-003", well: "HMD-412", operation: "Slickline", task: "Well Survey", team: "Team C", date: "2026-08-09", status: "completed" },
  { id: "JOB-004", well: "HMD-118", operation: "Slickline", task: "Fishing Operation", team: "Team A", date: "2026-08-05", status: "completed" },
  { id: "JOB-005", well: "HMD-267", operation: "Slickline", task: "Gauge Cutter Run", team: "Team B", date: "2026-08-02", status: "completed" },
  { id: "JOB-006", well: "HMD-334", operation: "Slickline", task: "Impression Block Run", team: "Team C", date: "2026-07-29", status: "completed" },
];

export const initialJobEquipment: JobEquipmentLink[] = [
  { jobId: "JOB-001", equipmentId: "PT-001", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-001", equipmentId: "ST-003", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-001", equipmentId: "JR-014", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-001", equipmentId: "KJ-016", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-001", equipmentId: "RS-011", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-001", equipmentId: "SLW-021", assignedAt: "2026-08-10T08:00:00Z", takenBy: "Karim Ait Ouali" },
  { jobId: "JOB-002", equipmentId: "LMRT-006", assignedAt: "2026-08-12T09:30:00Z", takenBy: "Sonia Bekhti" },
  { jobId: "JOB-002", equipmentId: "JR-015", assignedAt: "2026-08-12T09:30:00Z", takenBy: "Sonia Bekhti" },
  { jobId: "JOB-002", equipmentId: "LB-017", assignedAt: "2026-08-12T09:30:00Z", takenBy: "Sonia Bekhti" },
  { jobId: "JOB-003", equipmentId: "PT-023", assignedAt: "2026-08-09T07:00:00Z", returnedAt: "2026-08-09T16:40:00Z", takenBy: "Yacine Meziane" },
];

export const initialToolStrings: ToolString[] = [
  {
    id: "TS-025",
    jobId: "JOB-001",
    items: [
      { id: "tsi-1", equipmentId: "RS-011", order: 1 },
      { id: "tsi-2", equipmentId: "ST-003", order: 2 },
      { id: "tsi-3", equipmentId: "JR-014", order: 3 },
      { id: "tsi-4", equipmentId: "KJ-016", order: 4 },
      { id: "tsi-5", equipmentId: "PT-001", order: 5 },
    ],
  },
  {
    id: "TS-026",
    jobId: "JOB-002",
    items: [
      { id: "tsi-6", equipmentId: "JR-015", order: 1 },
      { id: "tsi-7", equipmentId: "LMRT-006", order: 2 },
    ],
  },
];

export const initialUsers: User[] = [
  { id: "u-1", name: "Ahmed Khelifi", email: "ahmed.khelifi@slktrack.com", company: "Well Services Co.", role: "Supervisor", region: REGION, approvalStatus: "approved" },
  { id: "u-2", name: "Karim Ait Ouali", email: "karim.aitouali@slktrack.com", company: "Well Services Co.", role: "Field Engineer", region: REGION, approvalStatus: "approved" },
  { id: "u-3", name: "Sonia Bekhti", email: "sonia.bekhti@slktrack.com", company: "Well Services Co.", role: "Field Engineer", region: REGION, approvalStatus: "approved" },
  { id: "u-4", name: "Yacine Meziane", email: "yacine.meziane@slktrack.com", company: "Well Services Co.", role: "Technician", region: REGION, approvalStatus: "approved" },
  { id: "u-5", name: "Mohamed Melihi", email: "mohamed.melihi@slktrack.com", company: "Well Services Co.", role: "Regional Chief", region: REGION, approvalStatus: "approved" },
  { id: "u-6", name: "Alex Morgan", email: "alex.morgan@permianfield.com", company: "Permian Field Services", role: "Field Engineer", region: REGION, approvalStatus: "pending", requestedAt: "2026-08-15T09:40:00Z" },
  { id: "u-7", name: "Sarah Jenkins", email: "s.jenkins@apexenergy.com", company: "Apex Energy", role: "Technician", region: REGION, approvalStatus: "pending", requestedAt: "2026-08-14T14:15:00Z" },
  { id: "u-8", name: "David Miller", email: "d.miller@texasoil.com", company: "Texas Oil Partners", role: "Supervisor", region: REGION, approvalStatus: "pending", requestedAt: "2026-08-13T11:05:00Z" },
];

export const initialHistory: HistoryEvent[] = [
  { id: "h-1", equipmentId: "PT-001", jobId: "JOB-003", action: "assigned", userName: "Ahmed Khelifi", timestamp: "2026-07-02T08:00:00Z" },
  { id: "h-2", equipmentId: "PT-001", jobId: "JOB-003", action: "returned", userName: "Yacine Meziane", timestamp: "2026-07-02T16:30:00Z" },
  { id: "h-3", equipmentId: "PT-001", jobId: "JOB-001", action: "assigned", userName: "Ahmed Khelifi", timestamp: "2026-08-10T08:00:00Z" },
  { id: "h-4", equipmentId: "PT-001", jobId: "JOB-001", action: "taken", userName: "Karim Ait Ouali", timestamp: "2026-08-10T10:15:00Z" },
  { id: "h-5", equipmentId: "ST-003", jobId: "JOB-001", action: "taken", userName: "Karim Ait Ouali", timestamp: "2026-08-10T09:42:00Z" },
  { id: "h-6", equipmentId: "JR-014", jobId: "JOB-001", action: "taken", userName: "Karim Ait Ouali", timestamp: "2026-08-10T09:10:00Z" },
  { id: "h-7", equipmentId: "RS-011", jobId: "JOB-001", action: "taken", userName: "Karim Ait Ouali", timestamp: "2026-08-10T08:55:00Z" },
  { id: "h-8", equipmentId: "PT-023", jobId: "JOB-004", action: "assigned", userName: "Ahmed Khelifi", timestamp: "2026-08-05T07:30:00Z" },
  { id: "h-9", equipmentId: "PT-023", jobId: "JOB-004", action: "returned", userName: "Yacine Meziane", timestamp: "2026-08-05T17:20:00Z" },
  { id: "h-10", equipmentId: "LMRT-006", jobId: "JOB-002", action: "taken", userName: "Sonia Bekhti", timestamp: "2026-08-12T10:30:00Z" },
];

export const heroToolStringPreview = [
  { id: "RS-011", name: "Rope Socket" },
  { id: "ST-003", name: "Stem" },
  { id: "JR-014", name: "Jar" },
  { id: "KJ-016", name: "Knuckle Joint" },
  { id: "PT-001", name: "Pulling Tool" },
];
