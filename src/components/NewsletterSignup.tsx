"use client";
import { useState } from "react";
import { useFormik } from "formik";
import newsletterSchema from "./schemas/newsletterSchema";

export default function NewsletterSignup() {
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: newsletterSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // No API yet — show success and clear form
      resetForm();
      setSent(true);
      setSubmitting(false);
      setTimeout(() => setSent(false), 4000);
    },
  });

  return (
    <div className="w-full bg-[var(--color-lime-cream)] py-16">
      <section className="max-w-4xl mx-auto px-6">
      <form onSubmit={formik.handleSubmit} className="flex gap-2">
        <input name="email" type="email" placeholder="tu@dominio.com" value={formik.values.email} onChange={formik.handleChange} className="flex-1 rounded-md border p-2" />
        <button type="submit" disabled={formik.isSubmitting} className="bg-sky-600 text-white rounded-md px-4 py-2">Suscribirse</button>
      </form>
      {sent && (
        <div
          className="mt-2 text-sm text-slate-600"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          Gracias — recibirás actualizaciones mensualmente.
        </div>
      )}
      </section>
    </div>
  );
}
