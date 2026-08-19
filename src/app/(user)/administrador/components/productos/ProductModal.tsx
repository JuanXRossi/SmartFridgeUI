"use client";
import { useCallback } from "react";
import { useFormik } from "formik";
import Modal from "./ui/Modal";
import productSchema, { URGENCY_OPTIONS } from "../../schemas/productSchema";
import { Product, ProductFormData } from "@/app/(user)/administrador/productos/types";
import UrgencyDropdown from "./UrgencyDropdown";

interface Props {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

const styles = {
  form: "space-y-3",
  label: "block text-sm font-medium text-slate-700",
  input: "mt-1 block w-full rounded-md border p-2 text-slate-900",
  select: "mt-1 block w-full rounded-md border p-2 text-slate-900 bg-white cursor-pointer",
  inputError: "border-rose-500",
  inputNormal: "border-slate-200",
  errorText: "mt-1 text-xs text-rose-600",
  buttonContainer: "flex gap-2 mt-4",
  submitButton: "flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60",
  cancelButton: "px-4 py-2 border rounded-md text-slate-700",
};

export default function ProductModal({ open, product, onClose, onSubmit }: Props) {
  const isEdit = !!product;

  const formik = useFormik<ProductFormData>({
    initialValues: product
      ? { name: product.name, urgencyName: product.urgencyName }
      : { name: "", urgencyName: "Mid" },
    enableReinitialize: true,
    validationSchema: productSchema,
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
      title={isEdit ? "Editar producto" : "Nuevo producto"}
      id="product-modal"
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Nombre</label>
          <input
            name="name"
            type="text"
            placeholder="Ej: Tomate, Arroz, Aceite…"
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
          <label className={styles.label}>Urgencia</label>
          <UrgencyDropdown
            id="product-urgency"
            name="urgencyName"
            value={formik.values.urgencyName}
            options={URGENCY_OPTIONS}
            onChange={(val) => formik.setFieldValue("urgencyName", val)}
            onBlur={() => formik.setFieldTouched("urgencyName", true)}
            hasError={!!(formik.touched.urgencyName && formik.errors.urgencyName)}
          />
          {formik.touched.urgencyName && formik.errors.urgencyName && (
            <p className={styles.errorText} role="alert">{formik.errors.urgencyName}</p>
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
              : "Crear producto"}
          </button>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
