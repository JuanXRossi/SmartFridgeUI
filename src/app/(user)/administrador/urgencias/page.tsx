"use client";

import { useEffect, useState } from "react";
import UrgenciesHeader from "../components/urgencias/UrgenciesHeader";
import UrgenciesTable from "../components/urgencias/UrgenciesTable";
import UrgenciesMobileCard from "../components/urgencias/UrgenciesMobileCard";
import UrgencyModal from "../components/urgencias/UrgencyModal";
import DeleteConfirmModal from "../components/urgencias/DeleteConfirmModal";
import { UrgencyResponse, UrgencyRequest } from "@/app/types/urgencies/object";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";

const styles = {
  page: "py-12",

  statsStrip: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6",

  statCard: [
    "rounded-2xl bg-white border border-[#C8E8F5]",
    "px-4 py-3 flex flex-col gap-0.5",
    "shadow-[0_2px_8px_rgba(100,180,220,0.07)]",
  ].join(" "),

  statLabel: "text-[10px] font-semibold tracking-widest uppercase text-[#8AABB8]",

  statValue: "text-xl font-bold text-amber-600",

  tableSection: "relative z-10",

  filterRow: "flex flex-col sm:flex-row gap-3 mb-4",

  searchWrapper: "relative flex-1",

  searchIcon: [
    "absolute left-3 top-1/2 -translate-y-1/2",
    "text-[#8AABB8] pointer-events-none",
  ].join(" "),

  searchInput: [
    "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-[#334E5E]",
    "border border-[#C8E8F5] bg-white/80",
    "placeholder:text-[#AACBD8]",
    "focus:outline-none focus:ring-2 focus:ring-amber-300",
    "transition-all duration-150",
  ].join(" "),
};

export default function UrgenciasPage() {
  const [urgencies, setUrgencies] = useState<UrgencyResponse[]>([]);
  const [search, setSearch] = useState("");
  const { actions: { openToast } } = useVisualNotifications();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<UrgencyResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UrgencyResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUrgencies() {
      try {
        const resp = await fetch("/api/urgency", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!resp.ok) {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Por favor, recargá la página.' });
          return;
        }
        const json = await resp.json();
        if (json.success && Array.isArray(json.data)) {
          setUrgencies(json.data);
        } else {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Por favor, recargá la página.' });
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Por favor, recargá la página.' });
        }
      }
    }

    fetchUrgencies();
    return () => controller.abort();
  }, []);

  const filtered = urgencies.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleCreate = async (data: UrgencyRequest) => {
    try {
      const resp = await fetch("/api/urgency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, minAmount: data.minAmount }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        openToast({ severity: 'error', message: 'No se pudo crear la urgencia' });
        return;
      }
      setUrgencies((prev) => [...prev, json.data]);
      setCreateOpen(false);
      openToast({ severity: 'success', message: 'Urgencia creada correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo crear la urgencia' });
    }
  };

  const handleEdit = async (data: UrgencyRequest) => {
    if (!editTarget) return;
    try {
      const resp = await fetch(`/api/urgency/${editTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, minAmount: data.minAmount }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        openToast({ severity: 'error', message: 'No se pudo editar la urgencia' });
        return;
      }
      setUrgencies((prev) =>
        prev.map((u) => (u.id === editTarget.id ? json.data : u))
      );
      setEditTarget(null);
      openToast({ severity: 'success', message: 'Urgencia editada correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo editar la urgencia' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const resp = await fetch(`/api/urgency/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (resp.status === 400) {
        const json = await resp.json();
        openToast({ severity: 'error', message: json.message || 'No se puede eliminar: la urgencia está en uso por uno o más productos.' });
        setDeleteTarget(null);
        return;
      }
      if (!resp.ok) {
        openToast({ severity: 'error', message: 'No se pudo eliminar la urgencia' });
        return;
      }
      setUrgencies((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
      openToast({ severity: 'success', message: 'Urgencia eliminada correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo eliminar la urgencia' });
    }
  };

  const total = urgencies.length;

  return (
    <>
      <div className={styles.page}>
        <UrgenciesHeader
          count={total}
          onCreate={() => setCreateOpen(true)}
        />

        <div className={styles.statsStrip}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{total}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Cant. Mínima Promedio</span>
            <span className={styles.statValue}>
              {total > 0
                ? (urgencies.reduce((sum, u) => sum + u.minAmount, 0) / total).toFixed(1)
                : "0"}
            </span>
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Buscar urgencia…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar urgencia"
            />
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className="hidden sm:block">
            <UrgenciesTable
              urgencies={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>

          <div className="block sm:hidden">
            <UrgenciesMobileCard
              urgencies={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>
        </div>
      </div>

      <UrgencyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <UrgencyModal
        open={!!editTarget}
        urgency={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
      />
      <DeleteConfirmModal
        open={!!deleteTarget}
        urgency={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
