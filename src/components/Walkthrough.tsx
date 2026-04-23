export default function Walkthrough() {
  const steps = [
    { title: "Add items", desc: "Add products and quantities to your family fridge." },
    { title: "Track stock", desc: "SmartFridge updates urgency and stock levels." },
    { title: "Generate list", desc: "Request a shopping list and get a ready-to-shop list." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
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
  );
}
