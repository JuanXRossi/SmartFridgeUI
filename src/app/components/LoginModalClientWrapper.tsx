"use client"
import { ReactNode, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

const styles = {
    bannerContainer: "fixed top-20 left-1/2 transform -translate-x-1/2 z-50",
    bannerBox: "flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2 rounded-md shadow",
    closeButton: "ml-3 text-slate-600",
  };

export default function LoginModalClientWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  function onOpen() { setOpen(true); }
  function onClose() { setOpen(false); }

  function onSuccess(user: { username: string, email: string, roles: string }) {
    setShowVerification(true);

    
    setTimeout(() => {
      if(user.roles === "Admin") {
        router.replace("/administrador/inicio");
      } else {
        router.replace("/member/inicio");
      }
    }, 1500);
  }

  return (
    <>
      <div onClick={(e) => {
        const target = e.target as HTMLElement;

        if (target?.id === "heroLogin" || target.closest?.("#heroLogin")) {
          e.preventDefault();
          onOpen();
        }
      }}>
        {children}
      </div>

      <LoginModal open={open} onClose={onClose} onSuccess={onSuccess} />

      {showVerification && (
        <div className={styles.bannerContainer}>
          <div className={styles.bannerBox}>
            <span>Has iniciado sesión de manera exitosa</span>
            <button className={styles.closeButton} aria-label="Descartar" onClick={() => setShowVerification(false)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
