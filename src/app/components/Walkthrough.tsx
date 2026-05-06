const styles = {
    container: "w-full bg-[var(--color-sky-cream)] py-16",
    section: "max-w-6xl mx-auto px-6",
    grid: "grid md:grid-cols-3 gap-6",
    stepCard: "p-4 text-center",
    stepNumber: "mx-auto h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center font-bold text-sky-700",
    stepTitle: "mt-3 font-semibold text-slate-800",
    stepDescription: "mt-2 text-sm text-slate-600",
  };

export default function Walkthrough() {
  const steps = [
    { title: "Agrega artículos", desc: "Agrega productos y cantidades a tu heladera familiar." },
    { title: "Controla el stock", desc: "SmartFridge actualiza la urgencia y los niveles de stock." },
    { title: "Genera lista", desc: "Solicita una lista de compra y obtén una lista lista para comprar." },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.grid}>
          {steps.map((s, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <h4 className={styles.stepTitle}>{s.title}</h4>
              <p className={styles.stepDescription}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
