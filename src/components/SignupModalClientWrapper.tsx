"use client";
import { ReactNode, useState } from "react";
import SignupModal from "./SignupModal";

export default function SignupModalClientWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  function onOpen() { setOpen(true); }
  function onClose() { setOpen(false); }

  function onSuccess() {
    setShowVerification(true);
  }

  return (
    <>
      <div onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target?.id === "heroSignup" || target.closest?.("#heroSignup")) {
          e.preventDefault();
          onOpen();
        }
      }}>
        {children}
      </div>

      <SignupModal open={open} onClose={onClose} onSuccess={onSuccess} />

        {showVerification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2 rounded-md shadow">
            <span>Gracias — revisa tu correo para verificar tu cuenta</span>
            <button className="ml-3 text-slate-600" aria-label="Descartar" onClick={() => setShowVerification(false)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
