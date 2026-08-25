"use client";

import { useEffect, useState } from "react";
import ProductsHeader from "../components/productos/ProductsHeader";
import ProductsTable from "../components/productos/ProductsTable";
import ProductsMobileCard from "../components/productos/ProductsMobileCard";
import ProductModal from "../components/productos/ProductModal";
import DeleteConfirmModal from "../components/productos/DeleteConfirmModal";
import { Product, ProductFormData } from "./types";
import { UrgencyResponse } from "@/app/types/urgencies/object";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";

const styles = {
  page: "py-12",

  statsStrip: "grid grid-cols-3 gap-3 mb-6",

  statCard: [
    "rounded-2xl bg-white border border-[#C8E8F5]",
    "px-4 py-3 flex flex-col gap-0.5",
    "shadow-[0_2px_8px_rgba(100,180,220,0.07)]",
  ].join(" "),

  statLabel: "text-[10px] font-semibold tracking-widest uppercase text-[#8AABB8]",

  statValue: "text-xl font-bold text-[#2E7DA6]",

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
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
    "transition-all duration-150",
  ].join(" "),

  urgencyFilter: [
    "px-4 py-2.5 rounded-xl text-sm text-[#334E5E]",
    "border border-[#C8E8F5] bg-white/80",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
    "cursor-pointer min-w-[130px]",
  ].join(" "),
};

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [urgencies, setUrgencies] = useState<UrgencyResponse[]>([]);
  const { actions: { openToast } } = useVisualNotifications();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const resp = await fetch("/api/product", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!resp.ok) {
          openToast({ severity: 'error', message: 'No se pudieron cargar los productos. Por favor, recargá la página.' });
          return;
        }
        const json = await resp.json();
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else {
          openToast({ severity: 'error', message: 'No se pudieron cargar los productos. Por favor, recargá la página.' });
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          openToast({ severity: 'error', message: 'No se pudieron cargar los productos. Por favor, recargá la página.' });
        }
      }
    }

    async function fetchUrgencies() {
      try {
        const resp = await fetch("/api/urgency", {
          method: "GET",
          signal: controller.signal,
        });

        if (!resp.ok) {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Los filtros pueden no estar completos.' });
          return;
        }

        const json = await resp.json();
        
        if (json.success && Array.isArray(json.data)) {
          setUrgencies(json.data);
        } else {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Los filtros pueden no estar completos.' });
        }
      } catch(err) {
        if ((err as Error).name !== "AbortError") {
          openToast({ severity: 'error', message: 'No se pudieron cargar las urgencias. Los filtros pueden no estar completos.' });
        }
      }
    }

    fetchProducts();
    fetchUrgencies();

    return () => controller.abort();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesUrgency =
      urgencyFilter === "all" || p.urgencyName === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  const handleCreate = async (data: ProductFormData) => {
    try {
      const resp = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, urgencyId: data.urgencyId }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        openToast({ severity: 'error', message: 'No se pudo crear el producto' });
        return;
      }
      setProducts((prev) => [...prev, json.data]);
      setCreateOpen(false);
      openToast({ severity: 'success', message: 'Producto creado correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo crear el producto' });
    }
  };

  const handleEdit = async (data: ProductFormData) => {
    if (!editTarget) return;
    try {
      const resp = await fetch(`/api/product/${editTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, urgencyId: data.urgencyId }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        openToast({ severity: 'error', message: 'No se pudo editar el producto' });
        return;
      }
      setProducts((prev) =>
        prev.map((p) => (p.id === editTarget.id ? json.data : p))
      );
      setEditTarget(null);
      openToast({ severity: 'success', message: 'Producto editado correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo editar el producto' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const resp = await fetch(`/api/product/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        openToast({ severity: 'error', message: 'No se pudo eliminar el producto' });
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      openToast({ severity: 'success', message: 'Producto eliminado correctamente' });
    } catch {
      openToast({ severity: 'error', message: 'No se pudo eliminar el producto' });
    }
  };

  const total = products.length;
  const highCount = products.filter((p) => p.urgencyName === "Alta").length;
  const midCount = products.filter((p) => p.urgencyName === "Mid").length;

  return (
    <>
      <div className={styles.page}>
        <ProductsHeader
          count={total}
          onCreate={() => setCreateOpen(true)}
        />

        <div className={styles.statsStrip}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{total}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Urgencia Alta</span>
            <span className={styles.statValue}>{highCount}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Urgencia Mid</span>
            <span className={styles.statValue}>{midCount}</span>
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
              placeholder="Buscar producto…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar producto"
            />
          </div>
          <select
            className={styles.urgencyFilter}
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            aria-label="Filtrar por urgencia"
          >
            <option value="all">Todas las urgencias</option>
            {urgencies.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.tableSection}>
          <div className="hidden sm:block">
            <ProductsTable
              products={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>

          <div className="block sm:hidden">
            <ProductsMobileCard
              products={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>
        </div>
      </div>

      <ProductModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <ProductModal
        open={!!editTarget}
        product={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
      />
      <DeleteConfirmModal
        open={!!deleteTarget}
        product={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
