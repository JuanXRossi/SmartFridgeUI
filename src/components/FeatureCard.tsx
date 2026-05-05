const styles = {
    card: "p-5 bg-white rounded-lg shadow-sm border border-slate-100",
    iconBox: "h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center",
    title: "mt-3 font-semibold text-slate-800",
    description: "mt-2 text-sm text-slate-600",
  };

export default function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{desc}</p>
    </div>
  );
}
