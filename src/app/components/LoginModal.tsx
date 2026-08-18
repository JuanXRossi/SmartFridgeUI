"use client"
import { useCallback } from "react";
import { useFormik } from "formik";
import Modal from "./ui/Modal";
import loginSchema from "./schemas/loginSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { username: string, email: string, roles: string }) => void;
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
}

export default function LoginModal({open, onClose, onSuccess} : Props) {
  const formik = useFormik({
    initialValues: {username: "", password: ""},
    validationSchema: loginSchema,
    onSubmit: async (values, {setSubmitting, setErrors, resetForm, setFieldError}) => {
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
            if (data?.fieldErrors) {
              setErrors(data.fieldErrors);
            } else {
              setFieldError("username", data?.message ?? "El inicio de sesión falló");
            }
            return;
          }
          resetForm();
          onClose();
          onSuccess(data.user);
        } catch (err) {
          setFieldError("username", "Error de red. Por favor, inténtalo más tarde");
        } finally {
          setSubmitting(false);
        }
    },
  });
    
  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [onClose]);

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
        </div>

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
