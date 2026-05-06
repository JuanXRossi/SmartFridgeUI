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

const styles = {
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input: "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  helpText: "mt-1 text-xs text-slate-400",
  checkboxWrapper: "flex items-start gap-3",
  checkbox: "h-4 w-4 rounded text-lime-500 focus:ring-lime-300",
  checkboxLabel: "text-sm text-slate-700",
  link: "text-sky-600 underline",
  buttonContainer: "flex gap-2 mt-4",
  submitButton: "flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
};

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
            setFieldError("username", data?.message ?? "El registro falló");
          }
          return;
        }
        resetForm();
        onClose();
        onSuccess();
      } catch (err) {
        setFieldError("username", "Error de red. Por favor, inténtalo más tarde.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [onClose]);

  return (
    <Modal open={open} onClose={handleClose} title="Crea tu cuenta SmartFridge" id="signup-modal">
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Nombre de usuario</label>
          <input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${formik.touched.username && formik.errors.username ? styles.inputError : styles.inputNormal}`}
          />
          {formik.touched.username && formik.errors.username && (
            <p className={styles.errorText} role="alert">{formik.errors.username}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : styles.inputNormal}`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.errorText} role="alert">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Contraseña</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : styles.inputNormal}`}
          />
          <p className={styles.helpText}>Usa 8+ caracteres con letras y números.</p>
          {formik.touched.password && formik.errors.password && (
            <p className={styles.errorText} role="alert">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Nombre</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : styles.inputNormal}`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorText} role="alert">{formik.errors.name}</p>
          )}
        </div>

        <div className={styles.checkboxWrapper}>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="terms" className={styles.checkboxLabel}>
            Acepto los <a className={styles.link} href="#">Términos de Servicio</a> y la <a className={styles.link} href="#">Política de Privacidad</a>.
          </label>
        </div>
        {formik.touched.terms && formik.errors.terms && (
          <p className={styles.errorText} role="alert">{formik.errors.terms}</p>
        )}

        {formik.errors.username && !formik.touched.username && (
          <p className={styles.errorText} role="alert">{formik.errors.username}</p>
        )}

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={formik.isSubmitting} className={styles.submitButton}>
            {formik.isSubmitting ? "Creando..." : "Crear cuenta"}
          </button>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
