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
    overlay: "fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-slate-900/60 p-4",
    dialog: "mx-auto mt-16 max-w-md bg-white rounded-lg shadow-xl p-6",
    title: "text-lg font-semibold text-sky-900",
    content: "mt-4",
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
    <div ref={overlayRef} className={styles.overlay} aria-hidden={!open}>
      <div id={id} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className={styles.dialog}>
        {title && <h2 id={`${id}-title`} className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
