export default function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-slate-100">
      <div className="h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center">{icon}</div>
      <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
