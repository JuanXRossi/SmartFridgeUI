"use client";

import { useCallback, useContext, useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff, Shield } from "lucide-react";
import Modal from "./ui/Modal";
import profileConfigSchema from "./schemas/profileConfigSchema";
import useVisualNotifications from "@/app/hooks/useVisualNotifications";
import { AuthUser, UpdateAccountRequest, UpdateAccountResponse } from "../types/api/auth";
import { AuthContext } from "../context/AuthContext";
import { buildAuthUser } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  user: {
    userName: string;
    name: string;
    email: string;
  };
}

const styles = {
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input:
    "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  toggleRow:
    "flex items-center gap-2 pt-1 cursor-pointer select-none",
  toggleLabel: "text-sm text-sky-700 font-medium",
  buttonContainer: "flex gap-2 mt-4",
  submitButton:
    "flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
  fieldsWrapper: "space-y-3 overflow-hidden transition-all duration-200",
};

export default function ProfileConfigModal({
  open,
  onClose,
  user,
}: Props) {
  const {
    actions: { openToast },
  } = useVisualNotifications();
  const [showPassword, setShowPassword] = useState(false);
  const { actions } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      username: user.userName,
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: profileConfigSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload: UpdateAccountRequest = {
          name: values.name,
          email: values.email,
          username: values.username,
        };
        if (values.password) {
          payload.password = values.password;
        }

        const resp = await fetch("/api/account/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        
        const data: UpdateAccountResponse = await resp.json();

        if (!resp.ok) {
          if (data?.fieldErrors) {
            const first = Object.values(data.fieldErrors)[0];
            openToast({
              severity: "error",
              message: Array.isArray(first) ? first[0] : "Error al actualizar",
            });
          } else {
            openToast({
              severity: "error",
              message: data?.message ?? "Error al actualizar",
            });
          }
          return;
        }

        const userInfoResp = await fetch("/api/account/me", {
          method: "GET"
        });

        if (userInfoResp.ok) {
          const json: { data: AuthUser } = await userInfoResp.json();
          actions.setInfo(buildAuthUser(json.data));
        } else if (userInfoResp.status === 401) {
          console.warn("Session invalidated after profile update; re-auth may be required.");
        } else {
          console.error("Failed to refresh session user:", {
            status: userInfoResp.status,
            statusText: userInfoResp.statusText,
          });
        }

        openToast({
          severity: "success",
          message: "Perfil actualizado correctamente",
        });
        onClose();
      } catch {
        openToast({
          severity: "error",
          message: "Error de red. Por favor, inténtalo más tarde",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    setShowPassword(false);
    onClose();
  }, [onClose]);

  const inputClass = (field: keyof typeof formik.values) =>
    `${styles.input} ${
      formik.touched[field] && formik.errors[field]
        ? styles.inputError
        : styles.inputNormal
    }`;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Configurar perfil"
      id="profile-config-modal"
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Nombre</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputClass("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorText} role="alert">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={styles.label}>
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputClass("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.errorText} role="alert">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={styles.label}>
            Nombre de usuario
          </label>
          <input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputClass("username")}
          />
          {formik.touched.username &&
            formik.errors.username && (
              <p className={styles.errorText} role="alert">
                {formik.errors.username}
              </p>
            )}
        </div>

        <button
          type="button"
          className={styles.toggleRow}
          onClick={() => setShowPassword((v) => !v)}
        >
          <Shield size={15} className="text-sky-600" />
          <span className={styles.toggleLabel}>
            {showPassword
              ? "Ocultar contraseña"
              : "Cambiar contraseña"}
          </span>
        </button>

        {showPassword && (
          <div className={styles.fieldsWrapper}>
            <div>
              <label className={styles.label}>Contraseña</label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("password")}
                placeholder="Dejar vacío para no cambiar"
              />
              {formik.touched.password &&
                formik.errors.password && (
                  <p className={styles.errorText} role="alert">
                    {formik.errors.password}
                  </p>
                )}
            </div>

            <div>
              <label className={styles.label}>
                Confirmar contraseña
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className={styles.errorText} role="alert">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={styles.submitButton}
          >
            {formik.isSubmitting ? "Guardando..." : "Guardar"}
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
