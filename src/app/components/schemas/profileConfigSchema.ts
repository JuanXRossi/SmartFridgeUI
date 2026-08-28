import * as Yup from "yup";

const profileConfigSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "Al menos 3 caracteres")
    .matches(
      /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
      "El nombre debe comenzar con mayúscula, seguido de minúsculas"
    ),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(4, "Al menos 4 caracteres"),
  password: Yup.string()
    .optional()
    .min(8, "Al menos 8 caracteres")
    .matches(/[a-zA-Z]/, "Debe contener letras")
    .matches(/[0-9]/, "Debe contener números"),
  confirmPassword: Yup.string()
    .optional()
    .when("password", {
      is: (password: string) => Boolean(password),
      then: (schema) =>
        schema
          .required("Debes confirmar la contraseña")
          .oneOf(
            [Yup.ref("password")],
            "Las contraseñas no coinciden"
          ),
    }),
});

export default profileConfigSchema;
