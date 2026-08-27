"use client"
import { useCallback, useState } from "react";
import { useFormik } from "formik";
import Modal from "./ui/Modal";
import loginSchema from "./schemas/loginSchema";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { username: string, email: string, roles: string }) => void;
  onForgotPassword: () => void;
}

const styles ={
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input: "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  helpText: "mt-1 text-xs text-slate-400",
  buttonContainer: "flex gap-2 mt-4",
  submitButton: "flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
  forgotPasswordLink: "text-sm text-sky-600 hover:underline cursor-pointer mt-1",
  resendSection: "mt-2 p-3 bg-sky-50 border border-sky-200 rounded-md",
  resendLink: "text-sm text-sky-600 hover:underline cursor-pointer",
  resendButton: "mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 text-sm font-medium disabled:opacity-60",
  resendSuccess: "mt-2 text-xs text-emerald-600",
}

export default function LoginModal({open, onClose, onSuccess, onForgotPassword} : Props) {
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "success">("idle");
  const { actions: { openToast } } = useVisualNotifications();

  const formik = useFormik({
    initialValues: {username: "", password: ""},
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          const resp = await fetch("/api/account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
            }),
          });
          const data = await resp.json();
          if (!resp.ok) {
            if (data?.code === "EMAIL_NOT_CONFIRMED") {
              openToast({ severity: "error", message: data.message });
              setEmailNotConfirmed(true);
              return;
            }
            
            if (data?.fieldErrors) {
              openToast({ severity: "error", message: data.fieldErrors.Name.length == 1 ? data.fieldErrors.Name[0] : "El inicio de sesión falló" });
            } else {
              openToast({ severity: "error", message: data?.message ?? "El inicio de sesión falló" });
            }
            return;
          }
          resetForm();
          onClose();
          onSuccess(data.user);
        } catch (err) {
          openToast({ severity: "error", message: "Error de red. Por favor, inténtalo más tarde" });
        } finally {
          setSubmitting(false);
        }
    },
  });
    
  const handleClose = useCallback(() => {
    formik.resetForm();
    setEmailNotConfirmed(false);
    setResendEmail("");
    setResendStatus("idle");
    onClose();
  }, [onClose]);

  async function handleResendConfirmation() {
    if (!resendEmail) return;
    setResendStatus("sending");
    try {
      const resp = await fetch("/api/account/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });
      if (resp.ok) {
        setResendStatus("success");
      } else {
        setResendStatus("idle");
      }
    } catch {
      setResendStatus("idle");
    }
  }

  return(
    <Modal open={open} onClose={handleClose} title="Inicia sesión en SmartFridge" id="login-modal">
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
          <label className={styles.label}>Contraseña</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : styles.inputNormal}`}
          />
          <p className={styles.helpText}>Usa 8+ caracteres con letras y números</p>
          {formik.touched.password && formik.errors.password && (
            <p className={styles.errorText} role="alert">{formik.errors.password}</p>
          )}
          <p
            className={styles.forgotPasswordLink}
            onClick={onForgotPassword}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onForgotPassword()}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </div>

        {emailNotConfirmed && (
          <div className={styles.resendSection}>
            {resendStatus === "success" ? (
              <p className={styles.resendSuccess}>
                Te enviamos un nuevo enlace de confirmación. Revisá tu correo electrónico.
              </p>
            ) : (
              <>
                <label className={styles.label}>Correo electrónico</label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Tu correo de registro"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={!resendEmail || resendStatus === "sending"}
                  className={styles.resendButton}
                >
                  {resendStatus === "sending" ? "Enviando..." : "Reenviar correo de confirmación"}
                </button>
              </>
            )}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={formik.isSubmitting} className={styles.submitButton}>
            {formik.isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
