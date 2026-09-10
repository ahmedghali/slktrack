"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { useAppState } from "@/lib/app-state";
import { EQUIPMENT_CATEGORIES, type EquipmentCategory, type EquipmentStatus } from "@/lib/types";
import { EQUIPMENT_STATUS_LABEL } from "@/lib/types";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Label, Input, Select } from "@/components/ui/Field";

function EquipmentPageInner() {
  const { equipment, addEquipment } = useAppState();
  const params = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | EquipmentCategory>(
    (params.get("category") as EquipmentCategory) || "all"
  );
  const [status, setStatus] = useState<"all" | EquipmentStatus>("all");
  const [modalOpen, setModalOpen] = useState(params.get("add") === "1");

  const filtered = useMemo(() => {
    return equipment.filter((e) => {
      const matchesSearch =
        !search ||
        e.id.toLowerCase().includes(search.toLowerCase()) ||
        e.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || e.category === category;
      const matchesStatus = status === "all" || e.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [equipment, search, category, status]);

  return (
    <div>
      <PageHeader
        title="Equipment"
        subtitle={`${equipment.length} tools registered`}
        action={
          <Button onClick={() => setModalOpen(true)} className="gap-2">
            <Plus size={16} weight="bold" /> Add New Equipment
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <MagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
          />
          <Input
            placeholder="Search by ID or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          className="w-auto"
        >
          <option value="all">All categories</option>
          {EQUIPMENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-auto">
          <option value="all">All statuses</option>
          {(Object.keys(EQUIPMENT_STATUS_LABEL) as EquipmentStatus[]).map((s) => (
            <option key={s} value={s}>
              {EQUIPMENT_STATUS_LABEL[s]}
            </option>
          ))}
        </Select>
      </div>

      <div className="app-card overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Size</Th>
              <Th>Serial No.</Th>
              <Th>Location</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-surface-2">
                <td className="px-4 py-3.5">
                  <Link href={`/equipment/${e.id}`} className="font-mono font-medium text-brand hover:text-brand-deep">
                    {e.id}
                  </Link>
                </td>
                <td className="px-4 py-3.5">{e.name}</td>
                <td className="px-4 py-3.5 text-text-muted">{e.category}</td>
                <td className="px-4 py-3.5 font-mono text-text-muted">{e.size}</td>
                <td className="px-4 py-3.5 font-mono text-text-muted">{e.serialNumber}</td>
                <td className="px-4 py-3.5 text-text-muted">{e.location}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                  No equipment matches your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddEquipmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addEquipment}
      />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3.5 font-mono text-xs font-medium uppercase tracking-wider">
      {children}
    </th>
  );
}

function AddEquipmentModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    id: string;
    name: string;
    category: EquipmentCategory;
    size: string;
    serialNumber: string;
    location: string;
    status?: EquipmentStatus;
  }) => void;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<EquipmentCategory>("Pulling Tools");
  const [size, setSize] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [location, setLocation] = useState("Hassi Messaoud Base");

  function reset() {
    setId("");
    setName("");
    setSize("");
    setSerialNumber("");
    setLocation("Hassi Messaoud Base");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !name) return;
    onAdd({ id, name, category, size, serialNumber, location, status: "available" });
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Add New Equipment">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Equipment Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Pulling Tool" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Equipment ID</Label>
            <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="PT-027" required />
          </div>
          <div>
            <Label>Size</Label>
            <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="1.5&quot;" />
          </div>
        </div>
        <div>
          <Label>Type / Category</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value as EquipmentCategory)}>
            {EQUIPMENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Serial Number</Label>
            <Input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="SN-00000" />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Equipment</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function EquipmentPage() {
  return (
    <Suspense>
      <EquipmentPageInner />
    </Suspense>
  );
}
