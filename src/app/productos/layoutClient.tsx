"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Headbar from "@/app/components/Headbar";
import Sidebar from "@/app/components/administrador/Sidebar";

const styles = {
  root: "min-h-screen bg-gradient-to-br from-[#EAF4FB] via-white to-[#EDFAE6]",
  menuBtn:
    "fixed top-4 left-4 z-40 w-9 h-9 rounded-full bg-white border border-sky-100 shadow flex items-center justify-center text-slate-600 hover:bg-sky-50 transition-colors md:hidden",
  mainWrapper: "flex pt-16",
  sidebar: "hidden md:flex md:w-64 md:flex-shrink-0",
  content:
    "flex-1 min-w-0 md:ml-64 transition-all duration-300",
  inner: "max-w-5xl mx-auto px-4 md:px-8 py-8",
};

const mockUser = {
  name: "María García",
  email: "maria@familiagarcia.com",
  initials: "MG",
  role: "Administradora",
};

interface LayoutClientProps {
  children: React.ReactNode;
  className?: string;

}

export default function LayoutClient({ children, className = "", }: LayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    // TODO: integrate with auth provider
    console.log("Sign out");
  };

  return (
    <div className={styles.root}>
      <Headbar user={mockUser} onSignOut={handleSignOut} />

      <button
        className={styles.menuBtn}
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu size={18} />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={`${styles.content} ${className}`}>
        <div className={styles.inner}>{children}</div>
      </main>
    </div>
  );
}
