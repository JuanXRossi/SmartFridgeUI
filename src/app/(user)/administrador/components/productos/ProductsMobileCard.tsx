"use client";

import { Product } from "@/app/(user)/administrador/productos/types";

const styles = {
  list: "flex flex-col gap-3",

  card: [
    "rounded-2xl bg-white border border-[#C8E8F5]",
    "shadow-[0_2px_12px_rgba(100,180,220,0.08)]",
    "p-4 flex items-center justify-between gap-4",
    "transition-shadow hover:shadow-[0_4px_20px_rgba(46,125,166,0.12)]",
  ].join(" "),

  cardLeft: "flex items-center gap-3 min-w-0",

  idBadge: [
    "flex-shrink-0 w-8 h-8 rounded-lg",
    "bg-[#EAF4FB] text-[#2E7DA6]",
    "flex items-center justify-center",
    "text-xs font-bold",
  ].join(" "),

  cardInfo: "min-w-0",

  productName: "text-sm font-semibold text-[#334E5E] truncate",

  urgencyRow: "mt-1 flex items-center gap-1.5",

  badge: {
    Alta: [
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
      "bg-[#FFE8E8] text-[#C0392B] border border-[#F5C6C6]",
    ].join(" "),
    Mid: [
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
      "bg-[#FFF4D9] text-[#B07D00] border border-[#F0D98C]",
    ].join(" "),
    Baja: [
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
      "bg-[#EDFAE6] text-[#2E7D32] border border-[#B5E0A8]",
    ].join(" "),
  } as Record<string, string>,

  badgeDot: {
    Alta: "w-1.5 h-1.5 rounded-full bg-[#C0392B]",
    Mid: "w-1.5 h-1.5 rounded-full bg-[#B07D00]",
    Baja: "w-1.5 h-1.5 rounded-full bg-[#2E7D32]",
  } as Record<string, string>,

  actionsGroup: "flex items-center gap-2 flex-shrink-0",

  editBtn: [
    "p-2 rounded-lg text-[#2E7DA6]",
    "bg-[#EAF4FB] border border-[#C8E8F5]",
    "hover:bg-[#D0EDFB] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
  ].join(" "),

  deleteBtn: [
    "p-2 rounded-lg text-[#C0392B]",
    "bg-[#FFF0F0] border border-[#F5C6C6]",
    "hover:bg-[#FFE0E0] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#F5C6C6]",
  ].join(" "),

  emptyState: [
    "py-12 text-center text-[#8AABB8] text-sm italic",
  ].join(" "),
};

interface ProductsMobileCardProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductsMobileCard({
  products,
  onEdit,
  onDelete,
}: ProductsMobileCardProps) {
  if (products.length === 0) {
    return <p className={styles.emptyState}>No hay productos registrados aún.</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.card}>
          <div className={styles.cardLeft}>
            <span className={styles.idBadge}>#{product.id}</span>
            <div className={styles.cardInfo}>
              <p className={styles.productName}>{product.name}</p>
              <div className={styles.urgencyRow}>
                <span className={styles.badge[product.urgency.name] ?? styles.badge["Baja"]}>
                  <span className={styles.badgeDot[product.urgency.name] ?? styles.badgeDot["Baja"]} />
                  {product.urgency.name}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.actionsGroup}>
            <button
              className={styles.editBtn}
              onClick={() => onEdit(product)}
              aria-label={`Editar ${product.name}`}
            >
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
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(product)}
              aria-label={`Eliminar ${product.name}`}
            >
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
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
