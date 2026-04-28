import * as Yup from "yup";

const newsletterSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("El correo es requerido"),
});

export default newsletterSchema;
