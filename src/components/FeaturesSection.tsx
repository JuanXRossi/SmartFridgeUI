import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <FeatureCard title="Smart Inventory" desc="Automatically track items and quantities." />
        <FeatureCard title="Auto Shopping Lists" desc="Generate shopping lists when items run low." />
        <FeatureCard title="Family Sharing" desc="Share lists and stock with family members." />
      </div>
    </section>
  );
}
