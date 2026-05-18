"use client";

import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  ShoppingCart,
  Users,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const styles = {
  overlay:
    "fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-20 md:hidden transition-opacity",
  overlayHidden: "opacity-0 pointer-events-none",
  overlayVisible: "opacity-100",

  sidebar:
    "fixed top-0 left-0 h-full z-20 w-64 flex flex-col bg-white border-r border-sky-100 pt-16 transition-transform duration-300 shadow-xl md:shadow-none",
  sidebarHidden: "-translate-x-full md:translate-x-0",
  sidebarVisible: "translate-x-0",

  closeBtn:
    "absolute top-4 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-sky-50 md:hidden",

  navSection: "flex-1 overflow-y-auto py-4 px-3 space-y-1",
  sectionLabel:
    "px-3 pt-4 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-widest",

  navItem:
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group",
  navItemDefault: "text-slate-600 hover:bg-[#EAF4FB] hover:text-slate-800",
  navItemActive:
    "bg-gradient-to-r from-sky-100 to-teal-50 text-teal-700 shadow-sm",

  iconWrapper:
    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
  iconDefault: "bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600",
  iconActive: "bg-teal-100 text-teal-600",

  navLabel: "flex-1",
  navArrow: "opacity-0 group-hover:opacity-100 transition-opacity text-slate-400",
  navArrowActive: "opacity-60 text-teal-500",

  sidebarFooter:
    "p-3 border-t border-sky-50",
  footerItem:
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-[#EAF4FB] hover:text-slate-700 transition-colors cursor-pointer group",
  footerIcon:
    "w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-500 transition-colors",
};

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  {
    label: "Inicio",
    href: "/inicio",
    icon: <LayoutDashboard size={16} />,
  },
  {
    label: "Productos",
    href: "/productos",
    icon: <Package size={16} />,
  },
  {
    label: "Urgencias de Reposición",
    href: "/inicio/urgencias",
    icon: <AlertTriangle size={16} />,
  },
  {
    label: "Lista de Compras",
    href: "/inicio/lista-compras",
    icon: <ShoppingCart size={16} />,
  },
];

const adminNav: NavItem[] = [
  {
    label: "Miembros del Grupo",
    href: "/inicio/miembros",
    icon: <Users size={16} />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={`${styles.navItem} ${isActive ? styles.navItemActive : styles.navItemDefault}`}
      >
        <span className={`${styles.iconWrapper} ${isActive ? styles.iconActive : styles.iconDefault}`}>
          {item.icon}
        </span>
        <span className={styles.navLabel}>{item.label}</span>
        <ChevronRight
          size={14}
          className={isActive ? styles.navArrowActive : styles.navArrow}
        />
      </Link>
    );
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : styles.overlayHidden}`}
        onClick={onClose}
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarVisible : styles.sidebarHidden}`}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar menú">
          <X size={16} />
        </button>

        <nav className={styles.navSection}>
          <p className={styles.sectionLabel}>Principal</p>
          {mainNav.map(renderNavItem)}

          <p className={styles.sectionLabel}>Administración</p>
          {adminNav.map(renderNavItem)}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/inicio/configuracion" onClick={onClose} className={styles.footerItem}>
            <span className={styles.footerIcon}>
              <Settings size={16} />
            </span>
            Configuración
          </Link>
        </div>
      </aside>
    </>
  );
}
