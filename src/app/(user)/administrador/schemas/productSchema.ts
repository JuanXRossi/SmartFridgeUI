import * as Yup from "yup";

const productSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("El nombre es obligatorio")
    .min(5, "Mínimo 2 caracteres")
    .max(70, "Máximo 60 caracteres"),
  urgencyId: Yup.number()
    .required("Seleccioná una urgencia")
    .min(1, "Seleccioná una urgencia"),
});

export default productSchema;
