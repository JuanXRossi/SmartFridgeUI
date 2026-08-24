import Link from "next/link";

const styles = {
  card:
    "group relative flex flex-col justify-between rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border",
  cardSky:
    "bg-gradient-to-br from-[#EAF4FB] to-sky-100 border-sky-200 hover:border-sky-300",
  cardLime:
    "bg-gradient-to-br from-[#EDFAE6] to-lime-100 border-lime-200 hover:border-lime-300",

  blob: "absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-30 transition-transform duration-500 group-hover:scale-110",
  blobSky: "bg-sky-300",
  blobLime: "bg-lime-300",

  iconWrapper:
    "relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-105",
  iconSky: "bg-white/80 text-sky-600",
  iconLime: "bg-white/80 text-lime-600",

  badge:
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 w-fit",
  badgeSky: "bg-sky-200/60 text-sky-700",
  badgeLime: "bg-lime-200/60 text-lime-700",
  badgeDot: "w-1.5 h-1.5 rounded-full animate-pulse",
  badgeDotSky: "bg-sky-500",
  badgeDotLime: "bg-lime-500",

  title: "text-slate-800 font-bold text-xl mb-1 leading-snug",
  description: "text-slate-500 text-sm leading-relaxed",

  footer: "flex items-center justify-between mt-6 pt-4 border-t",
  footerSky: "border-sky-200/60",
  footerLime: "border-lime-200/60",
  stat: "text-slate-700 font-semibold text-lg",
  statLabel: "text-slate-400 text-xs mt-0.5",
  arrow:
    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110 shadow-sm",
  arrowSky: "bg-sky-500 text-white group-hover:bg-sky-600",
  arrowLime: "bg-lime-500 text-white group-hover:bg-lime-600",
};

export type CardVariant = "sky" | "lime";

export interface DashboardCardProps {
  href: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  stat: string | number;
  statLabel: string;
  variant: CardVariant;
}

export default function DashboardCard({
  href,
  icon,
  badge,
  title,
  description,
  stat,
  statLabel,
  variant,
}: DashboardCardProps) {
  const isSky = variant === "sky";

  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl">
      <div className={`${styles.card} ${isSky ? styles.cardSky : styles.cardLime}`}>
        <div className={`${styles.blob} ${isSky ? styles.blobSky : styles.blobLime}`} />

        <div className="relative">
          <div className={`${styles.iconWrapper} ${isSky ? styles.iconSky : styles.iconLime}`}>
            {icon}
          </div>

          <span className={`${styles.badge} ${isSky ? styles.badgeSky : styles.badgeLime}`}>
            <span className={`${styles.badgeDot} ${isSky ? styles.badgeDotSky : styles.badgeDotLime}`} />
            {badge}
          </span>

          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={`${styles.footer} ${isSky ? styles.footerSky : styles.footerLime}`}>
          <div>
            <p className={styles.stat}>{stat}</p>
            <p className={styles.statLabel}>{statLabel}</p>
          </div>
          <div className={`${styles.arrow} ${isSky ? styles.arrowSky : styles.arrowLime}`}>
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
