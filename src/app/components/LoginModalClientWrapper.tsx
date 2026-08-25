"use client"
import { ReactNode, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";

export default function LoginModalClientWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { actions: { openToast } } = useVisualNotifications();

  function onOpen() { setOpen(true); }
  function onClose() { setOpen(false); }

  function onSuccess(user: { username: string, email: string, roles: string }) {
    openToast({ severity: 'success', message: 'Has iniciado sesión de manera exitosa' });

    
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
    </>
  );
}
