"use client";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  id?: string;
}

const styles = {
  overlay: [
    "fixed inset-0 z-50 flex items-center justify-center overflow-auto",
    "bg-slate-900/50 backdrop-blur-[2px] p-4",
    "animate-[fadeIn_0.18s_ease]",
  ].join(" "),

  dialog: [
    "w-full max-w-lg mx-auto bg-white rounded-2xl",
    "shadow-[0_8px_48px_rgba(46,125,166,0.18)]",
    "border border-[#C8E8F5]",
    "p-7",
    "animate-[slideUp_0.22s_cubic-bezier(0.22,1,0.36,1)]",
  ].join(" "),

  title: "text-lg font-bold text-[#2E7DA6] tracking-tight",

  content: "mt-5",
};

export default function Modal({ open, onClose, title, children, id = "modal" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      const prev = document.activeElement as HTMLElement | null;
      setTimeout(() => {
        const el = overlayRef.current?.querySelector<HTMLElement>("input,button,[tabindex]:not([tabindex='-1'])");
        if (el) el.focus();
      }, 0);
      return () => {
        document.removeEventListener("keydown", onKey);
        prev?.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden={!open} onClick={onClose}>
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 id={`${id}-title`} className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}