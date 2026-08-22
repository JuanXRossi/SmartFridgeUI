"use client";

import { Product } from "@/app/(user)/administrador/productos/types";

const styles = {
  tableWrapper: [
    "w-full overflow-x-auto rounded-2xl",
    "shadow-[0_4px_24px_rgba(100,180,220,0.10)]",
    "border border-[#C8E8F5]",
    "bg-white/80 backdrop-blur-sm",
  ].join(" "),

  table: "min-w-full text-sm",

  thead: "bg-[#D6EEF9] text-[#2E7DA6]",

  th: [
    "px-5 py-4 text-left font-semibold tracking-wide uppercase text-xs",
    "first:rounded-tl-2xl last:rounded-tr-2xl",
  ].join(" "),

  thCenter: [
    "px-5 py-4 text-center font-semibold tracking-wide uppercase text-xs",
  ].join(" "),

  tbody: "divide-y divide-[#EAF4FB]",

  tr: [
    "group transition-colors duration-150",
    "hover:bg-[#F3FAF7] even:bg-[#F7FCFE] odd:bg-white/60",
  ].join(" "),

  td: "px-5 py-4 text-[#334E5E] font-medium whitespace-nowrap",

  tdCenter: "px-5 py-4 text-center whitespace-nowrap",

  badge: {
    Alta: [
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
      "bg-[#FFE8E8] text-[#C0392B] border border-[#F5C6C6]",
    ].join(" "),
    Mid: [
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
      "bg-[#FFF4D9] text-[#B07D00] border border-[#F0D98C]",
    ].join(" "),
    Baja: [
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
      "bg-[#EDFAE6] text-[#2E7D32] border border-[#B5E0A8]",
    ].join(" "),
  } as Record<string, string>,

  badgeDot: {
    Alta: "w-1.5 h-1.5 rounded-full bg-[#C0392B]",
    Mid: "w-1.5 h-1.5 rounded-full bg-[#B07D00]",
    Baja: "w-1.5 h-1.5 rounded-full bg-[#2E7D32]",
  } as Record<string, string>,

  actionsGroup: "flex items-center justify-center gap-2",

  editBtn: [
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
    "bg-[#EAF4FB] text-[#2E7DA6] border border-[#C8E8F5]",
    "hover:bg-[#D0EDFB] hover:border-[#8EC9E8] transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
  ].join(" "),

  deleteBtn: [
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
    "bg-[#FFF0F0] text-[#C0392B] border border-[#F5C6C6]",
    "hover:bg-[#FFE0E0] hover:border-[#E09090] transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-[#F5C6C6]",
  ].join(" "),

  emptyRow: "px-5 py-12 text-center text-[#8AABB8] text-sm italic",
};

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>#</th>
            <th className={styles.th}>Nombre del producto</th>
            <th className={styles.thCenter}>Urgencia</th>
            <th className={styles.thCenter}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyRow}>
                No hay productos registrados aún.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className={styles.tr}>
                <td className={styles.td}>{product.id}</td>
                <td className={styles.td}>{product.name}</td>
                <td className={styles.tdCenter}>
                  <span className={styles.badge[product.urgencyName] ?? styles.badge["Baja"]}>
                    <span className={styles.badgeDot[product.urgencyName] ?? styles.badgeDot["Baja"]} />
                    {product.urgencyName}
                  </span>
                </td>
                <td className={styles.tdCenter}>
                  <div className={styles.actionsGroup}>
                    <button
                      className={styles.editBtn}
                      onClick={() => onEdit(product)}
                      aria-label={`Editar ${product.name}`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(product)}
                      aria-label={`Eliminar ${product.name}`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
