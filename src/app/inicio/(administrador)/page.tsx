"use client"

import { Package, AlertTriangle, ShoppingCart, Users } from "lucide-react";
import DashboardCard from "./components/DashboardCard";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

const styles = {
  greetingSection: "mb-10",
  eyebrow:
    "text-xs font-semibold uppercase tracking-widest text-teal-500 -mb-6 py-16",
  heading:
    "text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight mb-2",
  headingAccent: "text-teal-500",
  subheading: "text-slate-500 text-base",

  chipsRow: "flex flex-wrap gap-3 mt-5",
  chip: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-sky-100 text-slate-600 shadow-sm",
  chipDot: "w-2 h-2 rounded-full",
  chipDotGreen: "bg-lime-400",
  chipDotAmber: "bg-amber-400",
  chipDotSky: "bg-sky-400",

  divider: "border-t border-sky-100 my-8",

  sectionTitle: "text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5",
  cardsGrid:
    "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10",

  quickRow: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  quickCard:
    "group flex items-center gap-4 p-4 rounded-2xl bg-white border border-sky-100 hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer",
  quickIconWrapper:
    "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
  quickIconSky: "bg-[#EAF4FB] text-sky-600",
  quickIconLime: "bg-[#EDFAE6] text-lime-600",
  quickText: "flex-1 min-w-0",
  quickTitle: "text-slate-700 font-semibold text-sm",
  quickDesc: "text-slate-400 text-xs mt-0.5 truncate",
  quickArrow: "text-slate-300 group-hover:text-slate-500 transition-colors text-lg",
};

export default function AdminHomePage() {
  const { state } = useContext(AuthContext);

  return (
    <>
      <section className={styles.greetingSection}>
        <p className={styles.eyebrow}>Panel de administración</p>
        <h1 className={styles.heading}>
          Hola, <span className={styles.headingAccent}>{state.user?.name}</span> 👋
        </h1>
        <p className={styles.subheading}>
          Aquí tenés el resumen del estado del hogar de hoy.
        </p>

        <div className={styles.chipsRow}>
          <span className={styles.chip}>
            <span className={`${styles.chipDot} ${styles.chipDotGreen}`} />
            42 productos registrados
          </span>
          <span className={styles.chip}>
            <span className={`${styles.chipDot} ${styles.chipDotAmber}`} />
            5 con reposición urgente
          </span>
          <span className={styles.chip}>
            <span className={`${styles.chipDot} ${styles.chipDotSky}`} />
            3 miembros activos
          </span>
        </div>
      </section>

      <hr className={styles.divider} />

      <p className={styles.sectionTitle}>Acceso rápido</p>
      <div className={styles.cardsGrid}>
        <DashboardCard
          href="/inicio/productos"
          variant="sky"
          icon={<Package size={26} />}
          badge="Inventario"
          title="Productos del Hogar"
          description="Gestioná el inventario familiar: categorías, cantidades mínimas y stock actual de cada producto."
          stat={42}
          statLabel="productos registrados"
        />
        <DashboardCard
          href="/inicio/urgencias"
          variant="lime"
          icon={<AlertTriangle size={26} />}
          badge="Reposición"
          title="Urgencias de Reposición"
          description="Productos que están por debajo del mínimo. Generá la lista de compras en un clic."
          stat={5}
          statLabel="productos urgentes"
        />
      </div>

      <p className={styles.sectionTitle}>Más opciones</p>
      <div className={styles.quickRow}>
        <a href="/inicio/lista-compras" className={styles.quickCard}>
          <span className={`${styles.quickIconWrapper} ${styles.quickIconSky}`}>
            <ShoppingCart size={20} />
          </span>
          <div className={styles.quickText}>
            <p className={styles.quickTitle}>Lista de Compras</p>
            <p className={styles.quickDesc}>Generá y compartí la lista semanal</p>
          </div>
          <span className={styles.quickArrow}>›</span>
        </a>
        <a href="/inicio/miembros" className={styles.quickCard}>
          <span className={`${styles.quickIconWrapper} ${styles.quickIconLime}`}>
            <Users size={20} />
          </span>
          <div className={styles.quickText}>
            <p className={styles.quickTitle}>Miembros del Grupo</p>
            <p className={styles.quickDesc}>Administrá usuarios y permisos</p>
          </div>
          <span className={styles.quickArrow}>›</span>
        </a>
      </div>
    </>
  );
}
