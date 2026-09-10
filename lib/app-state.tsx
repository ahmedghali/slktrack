"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialEquipment,
  initialHistory,
  initialJobEquipment,
  initialJobs,
  initialToolStrings,
  initialUsers,
  REGION,
} from "./mock-data";
import type {
  Equipment,
  HistoryEvent,
  Job,
  JobEquipmentLink,
  Role,
  ToolString,
  User,
} from "./types";

interface AppState {
  // session
  isAuthenticated: boolean;
  currentUser: User | null;
  currentRole: Role;
  login: (email?: string) => void;
  logout: () => void;
  switchRole: (role: Role) => void;

  // collections
  equipment: Equipment[];
  jobs: Job[];
  jobEquipment: JobEquipmentLink[];
  toolStrings: ToolString[];
  users: User[];
  history: HistoryEvent[];

  // actions
  addEquipment: (data: Omit<Equipment, "status"> & { status?: Equipment["status"] }) => void;
  createJob: (data: Omit<Job, "status">) => Job;
  assignEquipmentToJob: (jobId: string, equipmentId: string) => void;
  takeEquipment: (equipmentId: string) => void;
  returnEquipment: (equipmentId: string) => void;
  reportMissing: (equipmentId: string) => void;
  addToolStringItem: (jobId: string, equipmentId: string) => void;
  removeToolStringItem: (jobId: string, itemId: string) => void;
  approveSignup: (userId: string) => void;
  rejectSignup: (userId: string) => void;
  requestSignup: (data: { name: string; email: string; company: string; role: Role }) => User;
}

const AppStateContext = createContext<AppState | null>(null);

let idCounter = 1000;
function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

const SESSION_KEY = "slktrack-session";

interface StoredSession {
  userId: string;
  role: Role;
}

function readStoredSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const stored = readStoredSession();
  const storedUser = stored ? initialUsers.find((u) => u.id === stored.userId) ?? null : null;

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(storedUser));
  const [currentUser, setCurrentUser] = useState<User | null>(storedUser);
  const [currentRole, setCurrentRole] = useState<Role>(stored?.role ?? "Field Engineer");

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      window.sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ userId: currentUser.id, role: currentRole })
      );
    } else {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  }, [isAuthenticated, currentUser, currentRole]);

  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [jobEquipment, setJobEquipment] = useState<JobEquipmentLink[]>(initialJobEquipment);
  const [toolStrings, setToolStrings] = useState<ToolString[]>(initialToolStrings);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [history, setHistory] = useState<HistoryEvent[]>(initialHistory);

  const login = useCallback((email?: string) => {
    const match = email
      ? initialUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
      : undefined;
    const demoUser =
      match ?? initialUsers.find((u) => u.role === "Field Engineer" && u.approvalStatus === "approved")!;
    setCurrentUser(demoUser);
    setCurrentRole(demoUser.role);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const switchRole = useCallback((role: Role) => {
    setCurrentRole(role);
    setCurrentUser((prev) => {
      const match = users.find((u) => u.role === role && u.approvalStatus === "approved");
      return match ?? prev;
    });
  }, [users]);

  const logEvent = useCallback(
    (equipmentId: string, action: HistoryEvent["action"], jobId?: string, userName?: string) => {
      setHistory((prev) => [
        {
          id: nextId("h"),
          equipmentId,
          jobId,
          action,
          userName: userName ?? currentUser?.name ?? "Demo User",
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [currentUser]
  );

  const addEquipment: AppState["addEquipment"] = useCallback((data) => {
    setEquipment((prev) => [
      { ...data, status: data.status ?? "available" },
      ...prev,
    ]);
  }, []);

  const createJob: AppState["createJob"] = useCallback((data) => {
    const job: Job = { ...data, status: "active" };
    setJobs((prev) => [job, ...prev]);
    setToolStrings((prev) => [...prev, { id: nextId("TS"), jobId: job.id, items: [] }]);
    return job;
  }, []);

  const assignEquipmentToJob: AppState["assignEquipmentToJob"] = useCallback(
    (jobId, equipmentId) => {
      setEquipment((prev) =>
        prev.map((e) =>
          e.id === equipmentId && e.status === "available"
            ? { ...e, status: "assigned", currentJobId: jobId }
            : e
        )
      );
      setJobEquipment((prev) => [
        ...prev,
        { jobId, equipmentId, assignedAt: new Date().toISOString() },
      ]);
      logEvent(equipmentId, "assigned", jobId);
    },
    [logEvent]
  );

  const takeEquipment: AppState["takeEquipment"] = useCallback(
    (equipmentId) => {
      setEquipment((prev) =>
        prev.map((e) => (e.id === equipmentId ? { ...e, status: "in_job" } : e))
      );
      const jobId = equipment.find((e) => e.id === equipmentId)?.currentJobId;
      logEvent(equipmentId, "taken", jobId);
    },
    [equipment, logEvent]
  );

  const returnEquipment: AppState["returnEquipment"] = useCallback(
    (equipmentId) => {
      setEquipment((prev) =>
        prev.map((e) =>
          e.id === equipmentId
            ? { ...e, status: "available", currentJobId: undefined, location: "Hassi Messaoud Base" }
            : e
        )
      );
      const jobId = equipment.find((e) => e.id === equipmentId)?.currentJobId;
      setJobEquipment((prev) =>
        prev.map((je) =>
          je.equipmentId === equipmentId && !je.returnedAt
            ? { ...je, returnedAt: new Date().toISOString() }
            : je
        )
      );
      logEvent(equipmentId, "returned", jobId);
    },
    [equipment, logEvent]
  );

  const reportMissing: AppState["reportMissing"] = useCallback(
    (equipmentId) => {
      setEquipment((prev) =>
        prev.map((e) => (e.id === equipmentId ? { ...e, status: "not_returned" } : e))
      );
      const jobId = equipment.find((e) => e.id === equipmentId)?.currentJobId;
      logEvent(equipmentId, "reported_missing", jobId);
    },
    [equipment, logEvent]
  );

  const addToolStringItem: AppState["addToolStringItem"] = useCallback(
    (jobId, equipmentId) => {
      setToolStrings((prev) =>
        prev.map((ts) =>
          ts.jobId === jobId
            ? {
                ...ts,
                items: [
                  ...ts.items,
                  { id: nextId("tsi"), equipmentId, order: ts.items.length + 1 },
                ],
              }
            : ts
        )
      );
    },
    []
  );

  const removeToolStringItem: AppState["removeToolStringItem"] = useCallback(
    (jobId, itemId) => {
      setToolStrings((prev) =>
        prev.map((ts) =>
          ts.jobId === jobId
            ? {
                ...ts,
                items: ts.items
                  .filter((it) => it.id !== itemId)
                  .map((it, idx) => ({ ...it, order: idx + 1 })),
              }
            : ts
        )
      );
    },
    []
  );

  const approveSignup: AppState["approveSignup"] = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, approvalStatus: "approved" } : u))
    );
  }, []);

  const rejectSignup: AppState["rejectSignup"] = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, approvalStatus: "rejected" } : u))
    );
  }, []);

  const requestSignup: AppState["requestSignup"] = useCallback((data) => {
    const user: User = {
      id: nextId("u"),
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      region: REGION,
      approvalStatus: "pending",
      requestedAt: new Date().toISOString(),
    };
    setUsers((prev) => [user, ...prev]);
    return user;
  }, []);

  const value = useMemo<AppState>(
    () => ({
      isAuthenticated,
      currentUser,
      currentRole,
      login,
      logout,
      switchRole,
      equipment,
      jobs,
      jobEquipment,
      toolStrings,
      users,
      history,
      addEquipment,
      createJob,
      assignEquipmentToJob,
      takeEquipment,
      returnEquipment,
      reportMissing,
      addToolStringItem,
      removeToolStringItem,
      approveSignup,
      rejectSignup,
      requestSignup,
    }),
    [
      isAuthenticated,
      currentUser,
      currentRole,
      login,
      logout,
      switchRole,
      equipment,
      jobs,
      jobEquipment,
      toolStrings,
      users,
      history,
      addEquipment,
      createJob,
      assignEquipmentToJob,
      takeEquipment,
      returnEquipment,
      reportMissing,
      addToolStringItem,
      removeToolStringItem,
      approveSignup,
      rejectSignup,
      requestSignup,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
