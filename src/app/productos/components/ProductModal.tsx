"use client";

import { useEffect, useState } from "react";
import { Product, ProductFormData, UrgencyLevel } from "../types";

const styles = {
  overlay: [
    "fixed inset-0 z-50 flex items-center justify-center",
    "bg-black/30 backdrop-blur-[2px]",
    "animate-[fadeIn_0.18s_ease]",
  ].join(" "),

  modal: [
    "relative w-full max-w-md mx-4 rounded-2xl",
    "bg-white shadow-[0_8px_48px_rgba(46,125,166,0.18)]",
    "border border-[#C8E8F5]",
    "animate-[slideUp_0.22s_cubic-bezier(0.22,1,0.36,1)]",
  ].join(" "),

  header: [
    "flex items-center justify-between",
    "px-7 pt-6 pb-4 border-b border-[#EAF4FB]",
  ].join(" "),

  title: "text-lg font-bold text-[#2E7DA6] tracking-tight",

  closeBtn: [
    "p-1.5 rounded-lg text-[#8AABB8]",
    "hover:bg-[#EAF4FB] hover:text-[#2E7DA6] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
  ].join(" "),

  body: "px-7 py-6 flex flex-col gap-5",

  fieldGroup: "flex flex-col gap-1.5",

  label: "text-xs font-semibold text-[#4A7A8A] tracking-wide uppercase",

  input: [
    "w-full px-4 py-2.5 rounded-xl text-sm text-[#334E5E]",
    "border border-[#C8E8F5] bg-[#F7FCFE]",
    "placeholder:text-[#AACBD8]",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8] focus:border-[#8EC9E8]",
    "transition-all duration-150",
  ].join(" "),

  select: [
    "w-full px-4 py-2.5 rounded-xl text-sm text-[#334E5E]",
    "border border-[#C8E8F5] bg-[#F7FCFE]",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8] focus:border-[#8EC9E8]",
    "transition-all duration-150 cursor-pointer appearance-none",
  ].join(" "),

  selectWrapper: "relative",

  selectIcon: [
    "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
    "text-[#8AABB8]",
  ].join(" "),

  footer: [
    "flex justify-end gap-3 px-7 pb-6 pt-2",
  ].join(" "),

  cancelBtn: [
    "px-5 py-2.5 rounded-xl text-sm font-semibold",
    "text-[#4A7A8A] bg-[#EAF4FB] border border-[#C8E8F5]",
    "hover:bg-[#D6EEF9] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
  ].join(" "),

  submitBtn: [
    "px-5 py-2.5 rounded-xl text-sm font-semibold",
    "text-white bg-[#2E7DA6]",
    "hover:bg-[#256A8E] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
    "disabled:opacity-60 disabled:cursor-not-allowed",
  ].join(" "),
};

const URGENCY_OPTIONS: UrgencyLevel[] = ["Alta", "Mid", "Baja"];

interface ProductModalProps {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

export default function ProductModal({
  open,
  product,
  onClose,
  onSubmit,
}: ProductModalProps) {
  const isEdit = !!product;
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    urgencyName: "Mid",
  });

  useEffect(() => {
    if (product) {
      setForm({ name: product.name, urgencyName: product.urgencyName });
    } else {
      setForm({ name: "", urgencyName: "Mid" });
    }
  }, [product, open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="product-name">
              Nombre
            </label>
            <input
              id="product-name"
              className={styles.input}
              type="text"
              placeholder="Ej: Tomate, Arroz, Aceite…"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoFocus
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="product-urgency">
              Urgencia
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="product-urgency"
                className={styles.select}
                value={form.urgencyName}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    urgencyName: e.target.value as UrgencyLevel,
                  }))
                }
              >
                {URGENCY_OPTIONS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <span className={styles.selectIcon}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!form.name.trim()}
          >
            {isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>
      </div>
    </div>
  );
}
