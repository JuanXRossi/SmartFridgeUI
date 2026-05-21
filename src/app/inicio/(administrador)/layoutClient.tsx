"use client";

import { useContext, useState } from "react";
import { Menu } from "lucide-react";
import Headbar from "@/app/components/Headbar";
import Sidebar from "@/app/components/administrador/Sidebar";
import { AuthProvider } from "@/app/context/AuthContext";
import { AuthContext } from "@/app/context/AuthContext";
import { AuthState } from "@/app/types/api/auth";

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
  const { state, actions } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = state.user
    ? {
        userName: state.user.userName,
        name: state.user.name,
        initials: state.user.initials,
        email: state.user.email,
        role: state.user.roles,
      }
    : null;

  return (
    <div className={styles.root}>
      <Headbar user={user} onSignOut={actions.logout} />

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
