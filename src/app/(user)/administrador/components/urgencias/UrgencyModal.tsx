"use client";

import { useCallback } from "react";
import { useFormik } from "formik";
import Modal from "../productos/ui/Modal";
import urgencySchema from "../../schemas/urgencySchema";
import { UrgencyResponse, UrgencyRequest } from "@/app/types/urgencies/object";

interface Props {
  open: boolean;
  urgency?: UrgencyResponse | null;
  onClose: () => void;
  onSubmit: (data: UrgencyRequest) => void;
}

const styles = {
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input: "mt-1 block w-full rounded-md border p-2 text-slate-900",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  buttonContainer: "flex gap-2 mt-4",
  submitButton: "flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
};

export default function UrgencyModal({ open, urgency, onClose, onSubmit }: Props) {
  const isEdit = !!urgency;

  const formik = useFormik<UrgencyRequest>({
    initialValues: urgency
      ? { name: urgency.name, minAmount: urgency.minAmount }
      : { name: "", minAmount: 0 },
    enableReinitialize: true,
    validationSchema: urgencySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        onSubmit(values);
        resetForm();
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
      title={isEdit ? "Editar urgencia" : "Nueva urgencia"}
      id="urgency-modal"
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Nombre</label>
          <input
            name="name"
            type="text"
            placeholder="Ej: Alta, Media, Baja…"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoFocus
            className={`${styles.input} ${
              formik.touched.name && formik.errors.name ? styles.inputError : styles.inputNormal
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorText} role="alert">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>Cantidad mínima</label>
          <input
            name="minAmount"
            type="number"
            min={0}
            max={4}
            placeholder="Valor entre 0 y 4"
            value={formik.values.minAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.minAmount && formik.errors.minAmount ? styles.inputError : styles.inputNormal
            }`}
          />
          {formik.touched.minAmount && formik.errors.minAmount && (
            <p className={styles.errorText} role="alert">{formik.errors.minAmount}</p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={styles.submitButton}
          >
            {formik.isSubmitting
              ? "Guardando..."
              : isEdit
              ? "Guardar cambios"
              : "Crear urgencia"}
          </button>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
