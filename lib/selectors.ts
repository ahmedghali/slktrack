import type { Equipment, HistoryEvent, Job, JobEquipmentLink, ToolString, User } from "./types";

export function equipmentById(equipment: Equipment[], id: string) {
  return equipment.find((e) => e.id === id);
}

export function jobById(jobs: Job[], id: string) {
  return jobs.find((j) => j.id === id);
}

export function equipmentForJob(jobEquipment: JobEquipmentLink[], equipment: Equipment[], jobId: string) {
  const ids = jobEquipment.filter((je) => je.jobId === jobId).map((je) => je.equipmentId);
  return equipment.filter((e) => ids.includes(e.id));
}

export function toolStringForJob(toolStrings: ToolString[], jobId: string) {
  return toolStrings.find((ts) => ts.jobId === jobId);
}

export function historyForEquipment(history: HistoryEvent[], equipmentId: string) {
  return history
    .filter((h) => h.equipmentId === equipmentId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function pendingUsers(users: User[]) {
  return users.filter((u) => u.approvalStatus === "pending");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function equipmentUsageCounts(jobEquipment: JobEquipmentLink[]) {
  const counts = new Map<string, number>();
  for (const je of jobEquipment) {
    counts.set(je.equipmentId, (counts.get(je.equipmentId) ?? 0) + 1);
  }
  return counts;
}
