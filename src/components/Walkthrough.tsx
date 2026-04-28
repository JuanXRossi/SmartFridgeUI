export default function Walkthrough() {
  const steps = [
    { title: "Agrega artículos", desc: "Agrega productos y cantidades a tu nevera familiar." },
    { title: "Controla el stock", desc: "SmartFridge actualiza la urgencia y los niveles de stock." },
    { title: "Genera lista", desc: "Solicita una lista de compra y obtén una lista lista para comprar." },
  ];

  return (
    <div className="w-full bg-[var(--color-sky-cream)] py-16">
      <section className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="p-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center font-bold text-sky-700">{i + 1}</div>
            <h4 className="mt-3 font-semibold text-slate-800">{s.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}
