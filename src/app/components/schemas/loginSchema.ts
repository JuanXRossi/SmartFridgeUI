import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    password: Yup.string()
        .min(8, "Al menos 8 caracteres")
        .matches(/[a-zA-Z]/, "Debe contener letras")
        .matches(/[0-9]/, "Debe contener números")
        .required("La contraseña es requerida"),
});

export default loginSchema;