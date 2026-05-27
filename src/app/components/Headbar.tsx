"use client";

import { Bell, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const styles = {
  header:
    "fixed top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-4 md:px-8 border-b border-sky-100 bg-[#EAF4FB]/80 backdrop-blur-md",
  logoWrapper: "flex items-center gap-2 select-none ml-7 sm:ml-0",
  logoMark: "mt-4",
  rightSection: "flex items-center gap-3",
  notifBtn:
    "relative w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-sky-100 transition-colors",
  notifDot:
    "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 border-2 border-[#EAF4FB]",
  userBtn:
    "flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-sky-100 transition-colors cursor-pointer",
  avatar:
    "w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-lime-400 flex items-center justify-center text-white font-bold text-xs shadow shrink-0",
  userName: "text-slate-700 text-sm font-medium hidden sm:block",
  userRole: "text-slate-400 text-xs hidden sm:block leading-tight",
  chevron: "text-slate-400 transition-transform shrink-0",
  chevronOpen: "rotate-180",
  overlay: "fixed inset-0 z-40",
  dropdown:
    "fixed top-14 right-4 md:right-8 w-52 bg-white rounded-2xl shadow-xl border border-sky-100 overflow-hidden z-50",
  dropdownHeader: "px-4 py-3 bg-[#EAF4FB]/60 border-b border-sky-100",
  dropdownName: "text-slate-700 font-semibold text-sm",
  dropdownEmail: "text-slate-400 text-xs mt-0.5",
  dropdownItem:
    "flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-[#EDFAE6] transition-colors cursor-pointer w-full",
  dropdownItemIcon: "text-rose-400",
};

interface HeadbarProps {
  user: {
    userName: string;
    name: string;
    initials: string;
    email: string;
    role: string;
  } | null;
  onSignOut?: () => void;
}

export default function Headbar({ user, onSignOut }: HeadbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image
          src="/SmartFridgeHeadbarLogo.png"
          alt="SmartFridge"
          width={128}
          height={128}
          className={styles.logoMark}
          priority
        />
      </div>

      <div className={styles.rightSection}>
        <button className={styles.notifBtn} aria-label="Notificaciones">
          <Bell size={18} />
          <span className={styles.notifDot} />
        </button>

        {user && (
          <div ref={menuRef}>
            <button
              className={styles.userBtn}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label="Menú de usuario"
            >
              <div className={styles.avatar}>{user.initials}</div>
              <div className="flex-col items-start leading-tight hidden sm:flex">
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>{user.role}</span>
              </div>
              <ChevronDown
                size={14}
                className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ""}`}
              />
            </button>

            {menuOpen && (
              <>
                <div
                  className={styles.overlay}
                  onClick={() => setMenuOpen(false)}
                  aria-hidden="true"
                />

                <div className={styles.dropdown} role="menu">
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user.name}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                  <button
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onSignOut?.();
                    }}
                  >
                    <LogOut size={15} className={styles.dropdownItemIcon} />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
