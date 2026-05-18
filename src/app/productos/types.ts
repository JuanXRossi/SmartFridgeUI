export type UrgencyLevel = "Alta" | "Mid" | "Baja";

export interface Product {
  id: number;
  name: string;
  urgencyName: UrgencyLevel;
}

export interface ProductFormData {
  name: string;
  urgencyName: UrgencyLevel;
}
