export default function Hero() {
  return (
    <div className="w-full bg-[var(--color-sky-cream)] py-16">
      <section className="mx-auto max-w-xl text-center px-6">
      <img src="/SmartFridgeLogo.png" alt="SmartFridge — intelligent kitchen stock manager" className="mx-auto w-40 sm:w-64" />
      <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-sky-900">Keep Your Kitchen Stocked, Effortlessly</h1>
      <p className="mt-3 text-lg text-slate-600">Family-friendly inventory, smart shopping lists, and restock reminders.</p>
      <div className="mt-6">
        <button id="heroSignup" aria-haspopup="dialog" aria-controls="signup-modal" className="inline-flex items-center justify-center rounded-lg px-6 py-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-lime-300">Sign up — it&apos;s free</button>
      </div>
      <p className="mt-3 text-sm text-slate-500"><a href="/auth/login" className="underline">Log in</a></p>
      </section>
    </div>
  );
}
