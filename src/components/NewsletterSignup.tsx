"use client";
import { useState } from "react";
import { useFormik } from "formik";
import newsletterSchema from "./schemas/newsletterSchema";

const styles = {
    container: "w-full bg-[var(--color-lime-cream)] py-8",
    section: "max-w-4xl mx-auto px-6",
    form: "flex gap-2",
    input: "flex-1 rounded-md border p-2 bg-white",
    button: "bg-sky-600 text-white rounded-md px-4 py-2",
    successMessage: "mt-2 text-sm text-slate-600",
  };

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
    <div className={styles.container}>
      <section className={styles.section}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <input name="email" type="email" placeholder="tu@dominio.com" value={formik.values.email} onChange={formik.handleChange} className={styles.input} />
          <button type="submit" disabled={formik.isSubmitting} className={styles.button}>Suscribirse</button>
        </form>
        {sent && (
          <div className={styles.successMessage} role="status" aria-live="polite" aria-atomic="true">
            Gracias — recibirás actualizaciones mensualmente.
          </div>
        )}
      </section>
    </div>
  );
}
