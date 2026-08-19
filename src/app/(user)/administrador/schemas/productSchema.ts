import * as Yup from "yup";
import { UrgencyLevel } from "@/app/(user)/administrador/productos/types";

export const URGENCY_OPTIONS: UrgencyLevel[] = ["Alta", "Mid"];

const productSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("El nombre es obligatorio")
    .min(5, "Mínimo 2 caracteres")
    .max(70, "Máximo 60 caracteres"),
  urgencyName: Yup.mixed<UrgencyLevel>()
    .oneOf(URGENCY_OPTIONS, "Urgencia inválida")
    .required("Seleccioná una urgencia"),
});

export default productSchema;
