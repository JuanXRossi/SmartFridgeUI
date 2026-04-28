"use client";
import { useCallback } from "react";
import { useFormik } from "formik";
import Modal from "./ui/Modal";
import signupSchema from "./schemas/signupSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // used to show verification banner
}

export default function SignupModal({ open, onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", name: "", terms: false },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm, setFieldError }) => {
      try {
        const resp = await fetch("/api/account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            name: values.name,
            termsAccepted: true,
          }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          if (data?.fieldErrors) {
            setErrors(data.fieldErrors);
          } else {
            // set a global field-level error on the form
            setFieldError("username", data?.message ?? "El registro falló");
          }
          return;
        }
        resetForm();
        onClose();
        onSuccess();
      } catch (err) {
        // set a generic field error
        setFieldError("username", "Error de red. Por favor, inténtalo más tarde.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [onClose, formik]);

  return (
    <Modal open={open} onClose={handleClose} title="Crea tu cuenta SmartFridge" id="signup-modal">
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre de usuario</label>
          <input name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`mt-1 block w-full rounded-md border p-2 text-slate-900 ${formik.touched.username && formik.errors.username ? "border-rose-500" : "border-slate-200"}`} />
          {formik.touched.username && formik.errors.username && <p className="mt-1 text-xs text-rose-600" role="alert">{formik.errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
          <input name="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`mt-1 block w-full rounded-md border p-2 text-slate-900 ${formik.touched.email && formik.errors.email ? "border-rose-500" : "border-slate-200"}`} />
          {formik.touched.email && formik.errors.email && <p className="mt-1 text-xs text-rose-600" role="alert">{formik.errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contraseña</label>
          <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`mt-1 block w-full rounded-md border p-2 text-slate-900 ${formik.touched.password && formik.errors.password ? "border-rose-500" : "border-slate-200"}`} />
          <p className="mt-1 text-xs text-slate-400">Usa 8+ caracteres con letras y números.</p>
          {formik.touched.password && formik.errors.password && <p className="mt-1 text-xs text-rose-600" role="alert">{formik.errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`mt-1 block w-full rounded-md border p-2 text-slate-900 ${formik.touched.name && formik.errors.name ? "border-rose-500" : "border-slate-200"}`} />
          {formik.touched.name && formik.errors.name && <p className="mt-1 text-xs text-rose-600" role="alert">{formik.errors.name}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input id="terms" name="terms" type="checkbox" checked={formik.values.terms} onChange={formik.handleChange} className="h-4 w-4 rounded text-lime-500 focus:ring-lime-300" />
          <label htmlFor="terms" className="text-sm text-slate-700">Acepto los <a className="text-sky-600 underline" href="#">Términos de Servicio</a> y la <a className="text-sky-600 underline" href="#">Política de Privacidad</a>.</label>
        </div>
        {formik.touched.terms && formik.errors.terms && <p className="mt-1 text-xs text-rose-600" role="alert">{formik.errors.terms}</p>}

        {formik.errors.username && !formik.touched.username && <p className="text-sm text-rose-600" role="alert">{formik.errors.username}</p>}

        <div className="flex gap-2 mt-4">
          <button type="submit" disabled={formik.isSubmitting} className="flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60">
            {formik.isSubmitting ? "Creando..." : "Crear cuenta"}
          </button>
          <button type="button" onClick={handleClose} className="px-4 py-2 border rounded-md text-slate-700">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
