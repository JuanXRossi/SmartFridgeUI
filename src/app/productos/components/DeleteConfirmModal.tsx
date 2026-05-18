"use client";

import { Product } from "../types";

const styles = {
  overlay: [
    "fixed inset-0 z-50 flex items-center justify-center",
    "bg-black/30 backdrop-blur-[2px]",
  ].join(" "),

  modal: [
    "relative w-full max-w-sm mx-4 rounded-2xl",
    "bg-white shadow-[0_8px_48px_rgba(46,125,166,0.18)]",
    "border border-[#F5C6C6]",
    "animate-[slideUp_0.22s_cubic-bezier(0.22,1,0.36,1)]",
  ].join(" "),

  body: "px-7 pt-7 pb-4 flex flex-col items-center gap-4 text-center",

  iconWrapper: [
    "flex items-center justify-center",
    "w-14 h-14 rounded-full bg-[#FFF0F0] border border-[#F5C6C6]",
    "text-[#C0392B]",
  ].join(" "),

  title: "text-base font-bold text-[#334E5E]",

  description: "text-sm text-[#6A8E9C] leading-relaxed",

  productName: "font-semibold text-[#334E5E]",

  footer: "flex gap-3 px-7 pb-6 pt-2 justify-center",

  cancelBtn: [
    "px-5 py-2.5 rounded-xl text-sm font-semibold",
    "text-[#4A7A8A] bg-[#EAF4FB] border border-[#C8E8F5]",
    "hover:bg-[#D6EEF9] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
  ].join(" "),

  deleteBtn: [
    "px-5 py-2.5 rounded-xl text-sm font-semibold",
    "text-white bg-[#C0392B]",
    "hover:bg-[#A93226] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#F5C6C6]",
  ].join(" "),
};

interface DeleteConfirmModalProps {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open || !product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className={styles.body}>
          <div className={styles.iconWrapper}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <p className={styles.title}>¿Eliminar producto?</p>
          <p className={styles.description}>
            Estás por eliminar{" "}
            <span className={styles.productName}>{product.name}</span>. Esta
            acción no se puede deshacer.
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
