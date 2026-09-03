"use client";

import { UrgencyResponse } from "@/app/types/urgencies/object";

const styles = {
  list: "flex flex-col gap-3",

  card: [
    "rounded-2xl bg-white/80 backdrop-blur-sm",
    "border border-[#C8E8F5]",
    "shadow-[0_2px_12px_rgba(100,180,220,0.08)]",
    "p-4",
  ].join(" "),

  top: "flex items-start justify-between gap-3",

  info: "flex flex-col gap-1 min-w-0",

  name: "text-sm font-bold text-[#334E5E] truncate",

  id: "text-xs text-[#8AABB8] font-medium",

  minBadge: [
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
    "bg-[#FFF4D9] text-[#92600A] border border-[#F0D98C]",
  ].join(" "),

  actions: "flex items-center gap-2 mt-3 pt-3 border-t border-[#EAF4FB]",

  editBtn: [
    "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold",
    "bg-[#EAF4FB] text-[#2E7DA6] border border-[#C8E8F5]",
    "hover:bg-[#D0EDFB] transition-colors duration-150",
  ].join(" "),

  deleteBtn: [
    "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold",
    "bg-[#FFF0F0] text-[#C0392B] border border-[#F5C6C6]",
    "hover:bg-[#FFE0E0] transition-colors duration-150",
  ].join(" "),
};

interface UrgenciesMobileCardProps {
  urgencies: UrgencyResponse[];
  onEdit: (urgency: UrgencyResponse) => void;
  onDelete: (urgency: UrgencyResponse) => void;
}

export default function UrgenciesMobileCard({
  urgencies,
  onEdit,
  onDelete,
}: UrgenciesMobileCardProps) {
  if (urgencies.length === 0) {
    return (
      <p className="text-center text-[#8AABB8] text-sm italic py-12">
        No hay urgencias registradas aún.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {urgencies.map((urgency) => (
        <div key={urgency.id} className={styles.card}>
          <div className={styles.top}>
            <div className={styles.info}>
              <span className={styles.name}>{urgency.name}</span>
              <span className={styles.id}>ID: {urgency.id}</span>
            </div>
            <span className={styles.minBadge}>
              Min: {urgency.minAmount}
            </span>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => onEdit(urgency)}
              aria-label={`Editar ${urgency.name}`}
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
              onClick={() => onDelete(urgency)}
              aria-label={`Eliminar ${urgency.name}`}
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
        </div>
      ))}
    </div>
  );
}
