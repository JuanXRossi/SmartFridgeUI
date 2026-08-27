"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "Usa 8+ caracteres con letras y números")
    .matches(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número"),
  confirmPassword: yup
    .string()
    .required("Confirmá tu contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

const styles = {
  container: "min-h-screen flex items-center justify-center bg-[#EAF4FB] p-4",
  card: "bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4",
  title: "text-xl font-bold text-[#2E7DA6]",
  form: "space-y-4 text-left",
  label: "block text-sm font-medium text-slate-700",
  input:
    "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  helpText: "mt-1 text-xs text-slate-400",
  submitButton:
    "w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 font-medium disabled:opacity-60",
  link: "text-sky-600 hover:underline font-medium",
  successMessage: "text-sm text-emerald-600 font-medium",
  errorMessage: "text-sm text-rose-600 font-medium",
  spinner:
    "mx-auto h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin",
};

type PageStatus = "loading" | "form" | "success" | "error";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PageStatus>("loading");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const uid = searchParams.get("userId");
    const tok = searchParams.get("token");

    if (!uid || !tok) {
      setTimeout(() => {
        setStatus("error");
        setMessage("Enlace de restablecimiento inválido o incompleto.");
      }, 0);
      return;
    }

    setTimeout(() => {
      setUserId(uid);
      setToken(tok);
    }, 0);
    setTimeout(() => setStatus("form"), 0);
  }, [searchParams]);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const resp = await fetch("/api/account/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, token, newPassword: values.password }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          setFieldError("password", data?.message ?? "No pudimos restablecer tu contraseña");
          return;
        }
        setStatus("success");
        setMessage(data.message ?? "Contraseña actualizada correctamente.");
        setTimeout(() => router.replace("/"), 3000);
      } catch {
        setFieldError("password", "Error de red. Por favor, inténtalo más tarde.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Restablecer contraseña</h1>

        {status === "loading" && (
          <>
            <div className={styles.spinner} />
            <p className="styles.message">Cargando...</p>
          </>
        )}

        {status === "error" && (
          <>
            <p className={styles.errorMessage}>{message}</p>
            <Link href="/" className={styles.link}>
              Volver al inicio
            </Link>
          </>
        )}

        {status === "success" && (
          <>
            <p className={styles.successMessage}>{message}</p>
            <p className="text-sm text-slate-600">
              Serás redirigido en unos segundos...{" "}
              <Link href="/" className={styles.link}>
                Ir ahora
              </Link>
            </p>
          </>
        )}

        {status === "form" && (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <p className="text-sm text-slate-600">
              Ingresa tu nueva contraseña a continuación.
            </p>

            <div>
              <label className={styles.label}>Nueva contraseña</label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : styles.inputNormal
                }`}
              />
              <p className={styles.helpText}>Usa 8+ caracteres con letras y números.</p>
              {formik.touched.password && formik.errors.password && (
                <p className={styles.errorText} role="alert">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <label className={styles.label}>Confirmar contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? styles.inputError
                    : styles.inputNormal
                }`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className={styles.errorText} role="alert">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={styles.submitButton}
            >
              {formik.isSubmitting ? "Guardando..." : "Restablecer contraseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
