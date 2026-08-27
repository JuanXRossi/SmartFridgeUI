import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(4, "Al menos 4 caracteres"),
  email: Yup.string().email("Correo inválido").required("El correo es requerido"),
  password: Yup.string()
    .min(8, "Al menos 8 caracteres")
    .matches(/[a-zA-Z]/, "Debe contener letras")
    .matches(/[0-9]/, "Debe contener números")
    .required("La contraseña es requerida"),
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "Al menos 3 caracteres")
    .matches(
      /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
      "El nombre debe comenzar con mayúscula, seguido de minúsculas"
    ),
  terms: Yup.boolean().oneOf([true], "Debes aceptar los Términos").required("Debes aceptar los Términos"),
});

export default signupSchema;
