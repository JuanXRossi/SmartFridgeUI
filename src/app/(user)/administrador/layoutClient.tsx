"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import Headbar from "@/app/components/Headbar";
import Sidebar from "@/app/components/administrador/Sidebar";
import { AuthProvider } from "@/app/context/AuthContext";
import { AuthState } from "@/app/types/api/auth";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";
import useAuth from "@/app/hooks/useAuth";

const styles = {
  root: "min-h-screen bg-gradient-to-br from-[#EAF4FB] via-white to-[#EDFAE6]",
  menuBtn:
    "fixed top-4 left-4 z-40 w-9 h-9 rounded-full bg-white border border-sky-100 shadow flex items-center justify-center text-slate-600 hover:bg-sky-50 transition-colors md:hidden",
  mainWrapper: "flex pt-16",
  sidebar: "hidden md:flex md:w-64 md:flex-shrink-0",
  content:
    "flex-1 min-w-0 md:ml-64 transition-all duration-300",
  inner: "w-full px-4 md:px-8 py-8",
};

interface LayoutClientProps {
  children: React.ReactNode;
  initialState: AuthState
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { actions: { logout } } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { actions: { openToast } } = useVisualNotifications();

  async function handleLogout () {
    try {
      const resp = await fetch("/api/account/logout", { method: "POST" });

      if (!resp.ok) {
        openToast({ severity: 'error', message: 'Error al cerrar sesión. Por favor, inténtalo de nuevo.' });
        return;
      }

      logout();
      openToast({ severity: 'success', message: 'Has cerrado sesión de manera exitosa' });
      router.replace("/");
    } catch {
      openToast({ severity: 'error', message: 'Error al cerrar sesión. Por favor, inténtalo de nuevo.' });
    }
  }

  return (
    <div className={styles.root}>
      <Headbar onSignOut={() => handleLogout()} />

      <button
        className={styles.menuBtn}
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu size={18} />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </main>
    </div>
  );
}

export default function LayoutClient({ children, initialState }: LayoutClientProps) {
  return (
    <AuthProvider initialState={initialState}>
      <LayoutShell>{children}</LayoutShell>
    </AuthProvider>
  );
}
