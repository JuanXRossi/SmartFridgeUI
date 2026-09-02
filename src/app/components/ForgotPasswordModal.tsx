"use client";

import { useCallback } from "react";
import { useFormik } from "formik";
import Modal from "./ui/Modal";
import forgotPasswordSchema from "./schemas/forgotPasswordSchema";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";

interface Props {
  open: boolean;
  onClose: () => void;
}

const styles = {
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input:
    "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  successText: "mt-1 text-xs text-emerald-600",
  helpText: "mt-1 text-xs text-slate-400",
  buttonContainer: "flex gap-2 mt-4",
  submitButton:
    "flex-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
};

export default function ForgotPasswordModal({ open, onClose }: Props) {
  const { actions: { openToast } } = useVisualNotifications();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const resp = await fetch("/api/account/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          openToast({
            severity: "error",
            message: data?.message ?? "No pudimos procesar tu solicitud",
          })
          return;
        }
        resetForm();
        openToast({
          severity: "success",
          message: data.message,
        });
        onClose();
      } catch {
        openToast({
          severity: "error",
          message: "Error de red. Por favor, inténtalo más tarde",
        })
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
    <Modal
      open={open}
      onClose={handleClose}
      title="Recuperar contraseña"
      id="forgot-password-modal"
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <p className={styles.helpText}>
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          restablecer tu contraseña.
        </p>

        <div>
          <label className={styles.label}>Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email
                ? styles.inputError
                : styles.inputNormal
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.errorText} role="alert">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={styles.submitButton}
          >
            {formik.isSubmitting ? "Enviando..." : "Enviar instrucciones"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
