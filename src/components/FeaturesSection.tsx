import FeatureCard from "./FeatureCard";

const styles = {
    container: "w-full bg-[var(--color-lime-cream)] py-16",
    section: "max-w-6xl mx-auto px-6",
    grid: "grid gap-6 grid-cols-1 md:grid-cols-3",
  };

export default function FeaturesSection() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.grid}>
          <FeatureCard title="Inventario Inteligente" desc="Realiza un seguimiento automático de artículos y cantidades." />
          <FeatureCard title="Listas de Compra Automáticas" desc="Genera listas de compra cuando los artículos se agotan." />
          <FeatureCard title="Uso Compartido Familiar" desc="Comparte listas e inventario con los miembros de la familia." />
        </div>
      </section>
    </div>
  );
}
