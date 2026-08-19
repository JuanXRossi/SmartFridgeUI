"use client";

const styles = {
  wrapper: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6",

  titlesBlock: "flex flex-col gap-1",

  eyebrow: "text-xs font-semibold tracking-widest uppercase text-[#8AABB8] -mt-12 -mb-10 py-16",

  title: "text-2xl font-bold text-teal-500 tracking-tight leading-tight",

  subtitle: "text-sm text-[#6A8E9C] mt-0.5",

  createBtn: [
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
    "bg-[#2E7DA6] text-white text-sm font-semibold",
    "shadow-[0_2px_10px_rgba(46,125,166,0.25)]",
    "hover:bg-[#256A8E] hover:shadow-[0_4px_16px_rgba(46,125,166,0.35)]",
    "transition-all duration-150",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
    "flex-shrink-0",
  ].join(" "),
};

interface ProductsHeaderProps {
  count: number;
  onCreate: () => void;
}

export default function ProductsHeader({ count, onCreate }: ProductsHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titlesBlock}>
        <span className={styles.eyebrow}>Administración</span>
        <h1 className={styles.title}>Productos</h1>
        <p className={styles.subtitle}>
          {count} {count === 1 ? "producto registrado" : "productos registrados"}
        </p>
      </div>
      <button className={styles.createBtn} onClick={onCreate}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nuevo producto
      </button>
    </div>
  );
}
