import * as Yup from "yup";

const urgencySchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "Mínimo 4 caracteres")
    .max(20, "Máximo 20 caracteres"),
  minAmount: Yup.number()
    .required("La cantidad mínima es obligatoria")
    .min(1, "Mínimo 1")
    .max(10, "Máximo 10"),
});

export default urgencySchema;
