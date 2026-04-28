"use client";
import { useFormik } from "formik";
import newsletterSchema from "./schemas/newsletterSchema";

export default function NewsletterSignup() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: newsletterSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // No API yet — show success and clear form
      resetForm();
      setSubmitting(false);
      // Use a small side-effect to show a success message via local state (simple approach)
      // We'll use a transient success flag using a timeout
      // But keep implementation simple: render a transient confirmation by setting a local variable
      // To keep component simple and avoid extra state, we'll show a success message immediately after submit via a simple trick below.
      (document.getElementById("newsletter-success") as HTMLDivElement | null)?.classList.remove("hidden");
      setTimeout(() => {
        (document.getElementById("newsletter-success") as HTMLDivElement | null)?.classList.add("hidden");
      }, 4000);
    },
  });

  return (
    <div className="w-full bg-[var(--color-lime-cream)] py-16">
      <section className="max-w-4xl mx-auto px-6">
      <form onSubmit={formik.handleSubmit} className="flex gap-2">
        <input name="email" type="email" placeholder="tu@dominio.com" value={formik.values.email} onChange={formik.handleChange} className="flex-1 rounded-md border p-2" />
        <button type="submit" disabled={formik.isSubmitting} className="bg-sky-600 text-white rounded-md px-4 py-2">Suscribirse</button>
      </form>
      <div id="newsletter-success" className="mt-2 text-sm text-slate-600 hidden">Gracias — recibirás actualizaciones mensualmente.</div>
      </section>
    </div>
  );
}
