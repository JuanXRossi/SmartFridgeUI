"use client";

import { useState } from "react";
import ProductsHeader from "./components/ProductsHeader";
import ProductsTable from "./components/ProductsTable";
import ProductsMobileCard from "./components/ProductsMobileCard";
import ProductModal from "./components/ProductModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { Product, ProductFormData } from "./types";
import LayoutClient from "./layoutClient";

// ─── Mock initial data matching the API payload shape ─────────────────────────
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Tomate", urgencyName: "Alta" },
  { id: 2, name: "Cuadril", urgencyName: "Mid" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  heightDisplacement: "py-12",

  // Scrollable area below the headbar
  content: [
    "flex-1 px-4 py-6 sm:px-8 sm:py-8",
    "max-w-5xl w-full mx-auto",
  ].join(" "),

  // Decorative top-right mesh blob
  decorBlob: [
    "pointer-events-none fixed top-0 right-0 w-[420px] h-[320px] opacity-30",
    "bg-[radial-gradient(ellipse_at_top_right,#B8E4F9_0%,#EDFAE6_60%,transparent_100%)]",
    "blur-3xl z-0",
  ].join(" "),

  // Stats strip
  statsStrip: [
    "grid grid-cols-3 gap-3 mb-6",
  ].join(" "),

  statCard: [
    "rounded-2xl bg-white border border-[#C8E8F5]",
    "px-4 py-3 flex flex-col gap-0.5",
    "shadow-[0_2px_8px_rgba(100,180,220,0.07)]",
  ].join(" "),

  statLabel: "text-[10px] font-semibold tracking-widest uppercase text-[#8AABB8]",

  statValue: "text-xl font-bold text-[#2E7DA6]",

  // Table section wrapper
  tableSection: "relative z-10",

  // Search / filter row
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // ── Derived filtered list ────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesUrgency =
      urgencyFilter === "all" || p.urgencyName === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  // ── CRUD handlers ────────────────────────────────────────────────────────
  const handleCreate = (data: ProductFormData) => {
    const next: Product = {
      id: Date.now(),
      name: data.name.trim(),
      urgencyName: data.urgencyName,
    };
    setProducts((prev) => [...prev, next]);
    setCreateOpen(false);
  };

  const handleEdit = (data: ProductFormData) => {
    if (!editTarget) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editTarget.id
          ? { ...p, name: data.name.trim(), urgencyName: data.urgencyName }
          : p
      )
    );
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // ── Stats ────────────────────────────────────────────────────────────────
  const total = products.length;
  const highCount = products.filter((p) => p.urgencyName === "Alta").length;
  const midCount = products.filter((p) => p.urgencyName === "Mid").length;

  return (
    <>
      {/* ── Page content ──────────────────────────────────────────────── */}
      <LayoutClient className={styles.heightDisplacement}>
        {/* Page title + create button */}
        <ProductsHeader
          count={total}
          onCreate={() => setCreateOpen(true)}
        />

        {/* Quick-stat strip */}
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

        {/* Search + filter row */}
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
            <option value="Alta">Alta</option>
            <option value="Mid">Mid</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        {/* Table (md+) / Cards (sm-) */}
        <div className={styles.tableSection}>
          {/* Desktop table */}
          <div className="hidden sm:block">
            <ProductsTable
              products={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>
          {/* Mobile cards */}
          <div className="block sm:hidden">
            <ProductsMobileCard
              products={filtered}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          </div>
        </div>
      </LayoutClient>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
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
