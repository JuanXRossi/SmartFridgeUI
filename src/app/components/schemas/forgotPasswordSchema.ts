import * as yup from "yup";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
});

export default forgotPasswordSchema;
